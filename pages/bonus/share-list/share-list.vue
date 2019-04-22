<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<view class="list-item" v-for="(item,index) in shareList" :key="index" @click="turnToPage(item)">
					<view class="item-others">
						<view class="item-others-four">
							账号： <text class="darker-color">{{item.userName}}</text>
						</view>
						<view class="item-others-four">
							级别：<text :style="item.style">{{item.rankName}}</text>
						</view>
						<view class="item-others-four">
							姓名：<text class="darker-color">{{item.trueName}}</text>
						</view>
						<view class="item-others-four" v-if="item.state != 0">
							启动时间：<text class="">{{item.confirmTime?item.confirmTime:''}}</text>
						</view>
						<view class="item-others-four start-btn" v-else>
							启动 >
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</scroll-view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	var pageIndex=1;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				shareList:[], //银行卡列表
				moneyType:'',
				pageSize:10,
				pages:0, //总页数
				loadingType: 0, //0--上拉显示更多 1--正在加载... 2--没有更多了
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
				
			}
		},
		computed: {
			...mapState(['token','userName']),
		},
		onShow(){
		},
		onLoad(e) {
			this.loadShareList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadShareList(flag){
				console.log('发送的参数',pageIndex,this.pageSize);
				uni.request({
					url: this.websiteUrl + 'team/tj_list',
					method: 'POST',
					data:{
						userName: this.userName,
						pageIndex: pageIndex,
						pageSize: 10
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取shareList成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							list.map((item)=>{
								if(item.confirmTime){
									item.confirmTime = this.customMethods.getDate(item.confirmTime);
								}
								item.rankName = this.customMethods.getRankName(item.rank);
								item.style = this.customMethods.getRankStyle(item);
							})
							if(flag){
								this.shareList = this.shareList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.shareList = list;
								this.pages = data.pages;
							}
							
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadMore(){
				this.loadingType = 1;
				setTimeout(()=>{
					pageIndex++;
					if(pageIndex > this.pages){
						this.loadingType = 2;
						return;
					}
					this.loadRewardList(true);
				},500)
				
			},
			turnToPage(item){
				if(item.state == 0){
					uni.navigateTo({
						url:'/pages/bonus/user-machine/machine-active/machine-active?userName='+item.userName
					})
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../../static/css/reward.css");
	page{
	  height: 100%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	
	.item-others-four {
		color:#999;
		font-size: 26upx;
	}
	.item-others-four .darker-color {
		color:#333;
	}
	.start-btn {
		font-size: 34upx;
		color:cadetblue;
		text-align: right;
		padding-right:40upx;
	}
</style>
