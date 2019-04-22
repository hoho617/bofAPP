<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<view class="list-item" v-for="(item,index) in buyerList" :key="index">
					<view class="list-item-top">
						<view class="item-title">账号：<text> {{item.fUserName}}</text></view>
						<view class="item-money">消费：<text class="red"> {{item.money}}</text></view>
					</view>
					<view class="item-memo">姓名：<text> {{item.fTrueName}}</text></view>
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
				buyerList:[], //银行卡列表
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
			this.loadBuyerList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadBuyerList(flag){
				uni.request({
					url: this.websiteUrl + 'finance/buyer_list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize: this.pageSize,
					    transferType:1
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取buyer_list成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							list.forEach((item)=>{
								item.addTime = this.customMethods.getLocalTime(item.addTime);
							})
							if(flag){
								this.buyerList = this.buyerList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.buyerList = list;
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
					this.loadBuyerList(true);
				},500)
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../../static/css/bonus.css");
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
	
	.list-item {
		color:#808080;
		padding-left:50upx;
		padding-right:50upx;
		view {
			font-size: 29upx;
		}
		text {
			color:#333;
		}
	}
	

</style>
