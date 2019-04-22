<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<block  v-for="(item,index) in balanceList" :key="index">
					<view class="list-item purchase" v-if="item.status == 0">
						<view class="table-cell-top">
							<view class="left-info">
								<view class="user-img">
									<view class="uni-icon uni-icon-contact"></view>
									<view class="F">F4</view>
								</view>
								<view class="pay-num">
									<view class="sell">卖出数量: <span class="num">{{item.b1}}</span></view>
									<view class="pay">应付：<span>￥</span><span>{{item.amount}}</span></view>
									<view class="time">{{item.time}}</view>
								</view>
							</view>
							<view class="right-oprate" @click="buyComfirm(item)">
								<view class="discount">{{item.discount}}折</view>
								<view class="buy buyConfirm">我要<span>买</span></view>
							</view>
						</view>
						<view class="table-cell-bottom">
							<view class="state">
								<!-- <text class="my-order">我的订单</text> -->
								<!-- <text class="order-state" v-if="item.diffTime<0">限时：00: 00: 00</text>
								<text class="order-state time-out" v-else>限时：11: 00: 00</text> -->
								<text class="order-state">限时:</text>
								<uni-countdown fontColor="#FFFFFF" bgrColor="#a5a5a5" borderColor="#FFFFFF"  :timer="item.outTime"></uni-countdown>
							</view>
						</view>
					</view>
					<view class="list-item confirm-receivable" v-if="item.status == 2">
						<view class="table-cell-top">
							<view class="left-info">
								<view class="user-img">
									<view class="uni-icon uni-icon-contact"></view>
									<view class="F">F4</view>
								</view>
								<view class="pay-num">
									<view class="sell">卖出数量: <span class="num">{{item.b1}}</span></view>
									<view class="pay">应付：<span>￥</span><span>{{item.amount}}</span></view>
									<view class="time">{{item.time}}</view>
								</view>
							</view>
							<view class="right-oprate square-box" @click="turnToPage('/pages/bonus/balance-list/receive-confirm/receive-confirm?tradingId='+item.id)">
								<view class="square-top">
									<text class="icon2 icon-loading2"></text>
									<view class="operate-text"><text class="big-font">通证</text>收款</view>
								</view>
								<view class="status-receive">
									<text class="grey-font" v-if="!item.imageUrl">等待汇款</text>
									<text class="red-font" v-else>汇款凭证已收</text>
								</view>
							</view>
						</view>
						<view class="table-cell-bottom">
							<view class="state">
								<text class="red-button deliverying">交割中</text>
								<text class="order-state">限时:</text>
								<uni-countdown fontColor="#FFFFFF" bgrColor="#a5a5a5" borderColor="#FFFFFF"  :timer="item.outTime"></uni-countdown>
								<!-- <text class="remittance-timeout" v-if="item.diffTime<0">限时：00: 00: 00</text>
								<text class="remittance-timeout time-out" v-else>限时：11: 00: 00</text> -->
							</view>
						</view>
					</view>
					<view class="list-item delivery-cell" v-if="item.status == 6">
						<view class="table-cell-top">
							<view class="left-info">
								<view class="user-img">
									<view class="admin-identity bg-white buyer box-shadow">买方</view>
									<view class="uni-icon uni-icon-contact"></view>
									<view class="F">F4</view>
								</view>
								<view class="pay-num">
									<view class="sell">卖出数量: <span class="num">{{item.b1}}</span></view>
									<view class="pay">支付：<span>￥</span><span>{{item.amount}}</span></view>
									<view class="time">{{item.time}}</view>
								</view>
							</view>
							<view class="right-oprate delivery-button">
								<view class="delivery-text appealButton" v-if="item.tUserId == item.tSaleId" @click="turnToPage('/pages/bonus/kefu/kefu')">申诉</view>
								<view class="delivery-text deliveryButton" v-else @click="turnToPage('/pages/bonus/balance-list/buyer-detail/buyer-detail?tradingId='+item.id)">兑汇</view>
								<view class="round">
									<view class="out-round img-circle"></view>
									<view class="emp-round bg-white r1"></view>
									<view class="emp-round bg-white r2"></view>
								</view>
							</view>
						</view>
						<view class="table-cell-bottom">
							<view class="state">
								<!-- <span class="remittance-timeout">汇款限时：15: 33: 44</span> -->
							</view>
						</view>
					</view>
					<view class="list-item delivery-cell" v-if="item.status != 0 && item.status != 2 && item.status != 6">
						<view class="table-cell-top">
							<view class="left-info">
								<view class="user-img">
									<view class="admin-identity bg-white buyer box-shadow">买方</view>
									<view class="uni-icon uni-icon-contact"></view>
									<view class="F">F4</view>
								</view>
								<view class="pay-num">
									<view class="sell">卖出数量: <span class="num">{{item.b1}}</span></view>
									<view class="pay">支付：<span>￥</span><span>{{item.amount}}</span></view>
									<view class="time">{{item.time}}</view>
								</view>
							</view>
							<view class="right-oprate delivery-button">
								<view class="delivery-text deliveryButton" @click="turnToPage('/pages/bonus/balance-list/buyer-detail/buyer-detail?tradingId='+item.id)">兑汇</view>
								<view class="round">
									<view class="out-round img-circle"></view>
									<view class="emp-round bg-white r1"></view>
									<view class="emp-round bg-white r2"></view>
								</view>
							</view>
						</view>
						<view class="table-cell-bottom">
							<view class="state">
								<!-- <span class="remittance-timeout">汇款限时：15: 33: 44</span> -->
							</view>
						</view>
					</view>
					
				</block>
				
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</scroll-view>
		<view class="fixed-footer" @click="getPay">
			<view class="service" @click="turnToPage('/pages/bonus/kefu/kefu')">
				<text class="icon2 icon-service"></text> 
				<view>客服</view>
			</view>
			<view class="Hang-sell" id="hangSell" @click="turnToPage('/pages/bonus/user-cash/user-cash?flag=2')">
				挂卖
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniCountdown from "@/components/uni-countdown.vue";
	var pageIndex=1;
	export default {
		components: {
			uniLoadMore,
			uniCountdown
		},
		data() {
			return {
				balanceList:[],
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
		computed: {
			...mapState(['token'])
		},
		onShow(){
			this.getTradingList();
		},
		onLoad(){
			
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"/pages/bonus/balance-list/balance-detail/balance-detail"
			})
		},
		methods: {
			getTradingList(flag){
				uni.request({
					url: this.websiteUrl + 'finance/trading_list',
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
							let $state = JSON.parse(uni.getStorageSync('$state'));
							let list = res.data.list;
							let data = res.data;
							list.forEach((item)=>{
								var nowTime = this.timest();
								var timestamp = Date.parse(new Date());
								var expireTime = item.expireTime;
								var diffTime = expireTime - nowTime;
								var id = $state.id;
								console.log('id',expireTime)
								item.time = this.timestampToTimeHour(item.addTime);
								item.discount = this.numberToText(item.discount);
								item.diffTime = diffTime;
								item.tSaleId = id;
								item.outTime = this.formatDateTime(item.expireTime)
							})
							console.log('list',JSON.stringify(list));
							if(flag){
								this.balanceList = this.balanceList.concat(list);
							}else {
								this.balanceList = list;
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
			buyComfirm(item){
				uni.showModal({
					title: '温馨提示',
					content: '请确认是否买入?',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({
								title:'正在跳转中...'
							})
							setTimeout(()=>{
								uni.hideLoading();
								uni.navigateTo({
									url:'/pages/bonus/balance-list/buyer-detail/buyer-detail?tradingId='+item.id
								})
							},1000)
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			turnToPage(url){
				console.log('url',url)
				if(url){
					uni.navigateTo({
						url
					})
				}
				
			},
			formatDateTime(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
				var date = new Date(inputTime*1000);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			timest() {
				var tmp = Date.parse(new Date()).toString();
				tmp = tmp.substr(0,10);
				return tmp;
			},
			numberToText(number){
				var texts = ["零","一","二","三","四","五","六","七","八","九"];
				var numbers = number*10;
				return texts[numbers];
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
	@import url("../../../static/css/balance-list.css");
	
	page {
		height: 100%;
		
		.scroll-view {
			position: absolute;
			top: 0;
			width: 100%;
			bottom: 110upx;
			background: #f4f4f4;
		
			.list-item {
				padding:24upx 10upx;
				position: relative;
			}
			.list-item:after {
				content:"";
				display: block;
				height:2upx;
				position: absolute;
				bottom:0;
				left:30upx;
				right:0;
				background-color: #f4f4f4;
			}
		}
	}
.uni-countdown {
	display: flex;
	justify-content: flex-start;
	padding-left:12upx;
}
	
</style>
