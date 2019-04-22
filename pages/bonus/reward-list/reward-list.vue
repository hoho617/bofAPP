<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<view class="list-item" v-for="(item,index) in rewardList" :key="index">
					<view class="list-item-top">
						<view class="item-title">{{item.addTime}}</view>
						<view class="item-money" :class="item.money >= 0?'red':'green'">+{{item.money}}</view>
					</view>
					<view class="item-others">
						<view class="item-others-four">
							个人算力:{{item.kfj}}
						</view>
						<view class="item-others-four">
							私有算力:{{item.cpj}}
						</view>
						<view class="item-others-four">
							消费券:{{item.fhj}}
						</view>
						<view class="item-others-four">
							共票:{{item.lpj}}
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
				rewardList:[], //银行卡列表
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
			...mapState(['token'])
		},
		onShow(){
		},
		onLoad(e) {
			if(e['title']) {
				var title = e['title']
				uni.setNavigationBarTitle({
					title: title
				});
			}
			this.loadRewardList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadRewardList(flag){
				console.log('发送的参数',pageIndex,this.pageSize);
				uni.request({
					url: this.websiteUrl + 'finance/reward_list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize: this.pageSize
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取rewardList成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							list.map((item)=>{
								item.addTime = this.customMethods.getDate(item.addTime);
								item.money = (item.kfj+item.cpj).toFixed(2);
							})
							if(flag){
								this.rewardList = this.rewardList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.rewardList = list;
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
	
	

</style>
