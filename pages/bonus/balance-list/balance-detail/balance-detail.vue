<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="panel-center bg-white">
				<block v-for="(item,index) in tradingList" :key="index">
					<view class="panel-item sale-item" v-if="item.status==0">
						<view class="pay-num">
							<view class="sell">买入余额: {{item.b1}}</view>
							<view class="pay">支付: {{item.amount}}</view>
							<view class="time">{{item.time}} </view>
						</view>
						<view class="right-operate">
							<view class="buy"><text>买入</text></view>
						</view>
					</view>
					<view class="panel-item buy-item" v-else>
						<view class="pay-num">
							<view class="sell">卖出数量: {{item.b1}}</view>
							<view class="pay">收益: {{item.amount}}</view>
							<view class="time">{{item.time}} </view>
						</view>
						<view class="right-operate">
							<view class="buy"><text>卖出</text></view>
						</view>
					</view>
				</block>
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
		data() {
			return {
				tradingList:[],
				pageSize:10,
				pages:0, //总页数
				loadingType: 0, //0--上拉显示更多 1--正在加载... 2--没有更多了
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
			}
		},
		components: {
			uniLoadMore
		},
		computed: {
			...mapState(['token'])
		},
		onLoad(){
			this.getTradingList();
		},
		methods: {
			getTradingList(flag){
				uni.request({
					url: this.websiteUrl + 'finance/my_trading_list',
					method: 'POST',
					data:{
						status: -1,
						pageSize: this.pageSize,
						pageIndex:pageIndex
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("通证挂卖列表数据成功："+JSON.stringify(res.data));
							let list = res.data.list;
							let data = res.data;
							list.forEach((item)=>{
								item.time = this.timestampToTimeHour(item.addTime);
							})
							console.log('list',JSON.stringify(list));
							if(flag){
								this.tradingList = this.tradingList.concat(list);
							}else {
								this.tradingList = list;
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
					this.getTradingList(true);
				},500)
				
			},
			timestampToTimeHour(timestamp) {
				var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '年';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
				var D = (date.getDate() < 10) ? '0'+date.getDate()+ ' ': date.getDate() + '日   ';
				var hh = (date.getHours() < 10) ? '0'+date.getHours(): date.getHours();
				if(Number(hh) > 12){
					hh = '下午';
				}else {
					hh = '上午';
				}
				var h = (date.getHours() < 10) ? '0'+date.getHours()+ ':' : date.getHours()+ ':';
				var m = (date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes();
		//      s = (date.getSeconds() < 10) ? '0' + date.getSeconds() :date.getSeconds();
		//      return Y+M+D+h+m+s;
				return Y+M+D+hh+h+m;
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.scroll-view {
		background-color: #f4f4f4;
		height: 100%;
		width:100%;
		.sale-item {
			color:#4eb772 !important;
		}
		.buy-item {
			color:#ea3f37 !important;
		}
		.panel-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left:10px;
			padding-right: 10px;
			height: 240upx;
			border-bottom: 2upx solid #f4f4f4;;
		}
		.pay-num {
			margin-left:5px;
			display: block;
			display: flex;
			flex-direction: column;
		}
		.sell {
			font-size: 32upx;
		}
		.pay {
			font-size: 32upx;
			margin-top: 10px;
			margin-left: 30px;
			display: inline-block;
		}
		.time {
			font-size: 26upx;
			margin-top: 10px;
			display: inline-block;
		}
		.right-oprate {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
		.buy {
			display: inline-block;
			width: 66px;
			height: 66px; 
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			border: 5px solid #4eb772;
			/*color: green;*/
			font-size: 14px;
			margin-top:10px;
			text {
				font-size: 44upx;
			}
			
		}
		.buy-item .buy {
			border-color:#ea3f37 !important;
		}
	}
</style>
