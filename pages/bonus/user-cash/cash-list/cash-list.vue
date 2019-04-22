<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<view class="list-item" v-for="(item,index) in cashList" :key="index">
					<view class="list-item-top">
						<view class="item-addTime">{{item.addTime}}</view>
						<view class="item-status">{{item.paymentState == 1 ? '已结算' : item.paymentState == 2 ? '挂单退回' : '挂单中'}}</view>
					</view>
					<view class="list-item-bottom">
						<view class="item-number">{{item.cashSn}}</view>
						<view class="item-money">{{item.amount}}</view>
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
				cashList:[], 
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
			this.loadBarpayList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadBarpayList(flag){
				uni.request({
					url: this.websiteUrl + 'finance/cash_list',
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
							console.log("获取cashList成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							list.forEach((item)=>{
								item.addTime = this.customMethods.getDate(item.addTime);
							})
							if(flag){
								this.cashList = this.cashList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.cashList = list;
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
					this.loadBarpayList(true);
				},500)
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
	  height: 100%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		z-index: 99;
		
		.list-item {
			padding:28upx 24upx;
			position: relative;
			.list-item-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.list-item-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.item-addTime {
				font-size: 28upx;
				margin-bottom:14upx;
			}
			.item-number {
				font-size: 28upx;
			}
		}
		.list-item:after {
			content:"";
			display: block;
			position: absolute;
			left:24upx;
			right:24upx;
			bottom:0;
			height: 2upx;
			background-color: #f9f9f9;
		}
	}
	
	

</style>
