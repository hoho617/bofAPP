<template>
	<view class="wrap-container">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="view-inner">
					<view class="view-title">买入详情</view>
					<view class="view-content">
						<view class="content-item">
							<text>卖出数量：</text> ￥{{tradingDetail.amount}}
						</view>
						<view class="content-item">
							<text>卖出收益：</text> {{tradingDetail.b1}}
						</view>
						<view class="content-item">
							<text>买入时间：</text> {{tradingDetail.time}}
						</view>
					</view>
					<view class="view-media" v-if="tradingDetail.imageUrl">
						<view class="view-title">汇款凭证</view>
						<view class="view-image">
							<image :src="tradingDetail.imageUrl"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-btns" v-if="tradingDetail.userId == tradingDetail.tSaleId">
			<view class="write-btns">
			   <view class="write-item" @click="receive">收到</view>
			   <view class="write-item" @click="reject">拒付</view>
		    </view>
		</view>
		
		<!-- <view class="prompt-area" v-if="showPrompt">
			<view class="prompt-inner">
				<view class="prompt-title">温馨提示</view>
				<view class="prompt-subtitle">该操作将取消交易</view>
				<view class="prompt-input">
					<input type="text" placeholder="请输入原因等留言" v-model="message" />
				</view>
				<view class="prompt-btns">
					<view class="prompt-btn" @click="cancleConfirm">确定</view>
					<view class="prompt-btn" @click="closePrompt">取消</view>
				</view>
			</view>
		</view> -->
		<uni-prompt :show="showReceivePrompt" @cancleEvent="closePrompt" @confirmEvent="cancleReceiveConfirm" :tips="'该操作将确认收款'" v-model="receivemMessage"></uni-prompt>
		<uni-prompt :show="showRejectPrompt" @cancleEvent="closePrompt" @confirmEvent="cancleRejectConfirm" :tips="'该操作将拒收交易'" v-model="rejectMessage"></uni-prompt>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniPrompt from '@/components/uni-prompt.vue'
	export default {
		data() {
			return {
				tradingDetail:'',
				showReceivePrompt:false,
				showRejectPrompt:false,
				tradingId:'',
				receivemMessage:'',
				rejectMessage:''
			}
		},
		components: {
			uniPrompt
		},
		computed: {
			...mapState(['token'])
		},
		onLoad(e){
			if(e['tradingId']){
				console.log('tradingId',e['tradingId']);
				this.loadTradingDetail(e['tradingId']);
				this.tradingId = e['tradingId'];
			}
		},
		methods: {
			loadTradingDetail(tradingId){
				uni.request({
					url: this.websiteUrl + 'finance/trading_detail',
					method: 'POST',
					data:{
						tradingId: tradingId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取通证挂买详情成功："+JSON.stringify(res.data));
							let data = res.data;
							data.time = this.timestampToTimeHour(data.addTime);
							let $state = JSON.parse(uni.getStorageSync('$state'));
							let id = $state.id;
							data.tSaleId = id;
							this.tradingDetail = data;
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			receive(){
				this.showReceivePrompt = true;
			},
			reject(){
				this.showRejectPrompt = true;
			},
			closePrompt(){
				this.showReceivePrompt = false;
				this.showRejectPrompt = false;
			},
			cancleReceiveConfirm(){
				this.closePrompt();
				let cancelData = {
					tradingId:this.tradingId,
					message:this.receivemMessage
				}
				uni.showLoading({
					title:'正在进行中...'
				})
				uni.request({
					url: this.websiteUrl + 'finance/trading_confirm',
					method: 'POST',
					data:cancelData,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '通证确认收款成功！':res.message;
						if(res.code == 200){
							console.log("通证确认收款成功："+JSON.stringify(res.data));
							setTimeout(()=>{
								uni.showToast({
									icon: 'none',
									title: title,
									duration:2000,
									success:function(){
										uni.hideLoading();
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
									}
								});
							},1500)
							
						}else {
							setTimeout(()=>{
								uni.showToast({
									icon: 'none',
									title: title,
									duration:2000,
									success:function(){
										uni.hideLoading();
										setTimeout(()=>{
											return false;
										},1000)
									}
								});
							},1000)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			cancleRejectConfirm(){
				this.closePrompt();
				let cancelData = {
					tradingId:this.tradingId,
					message:this.rejectMessage
				}
				uni.showLoading({
					title:'正在拒付中...'
				})
				uni.request({
					url: this.websiteUrl + 'finance/trading_reject',
					method: 'POST',
					data:cancelData,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '通证交易拒收成功！':res.message;
						if(res.code == 200){
							console.log("通证交易拒收成功："+JSON.stringify(res.data));
							setTimeout(()=>{
								uni.showToast({
									icon: 'none',
									title: title,
									duration:2000,
									success:function(){
										uni.hideLoading();
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
									}
								});
							},1500)
							
						}else {
							setTimeout(()=>{
								uni.showToast({
									icon: 'none',
									title: title,
									duration:2000,
									success:function(){
										uni.hideLoading();
										setTimeout(()=>{
											return false;
										},1000)
									}
								});
							},1000)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			turnToPage(){
				uni.navigateTo({
					url:'/pages/bonus/balance-list/voucher-fill/voucher-fill?tradingId='+this.tradingDetail.id
				})
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
	.wrap-container {
		height: 100%;
		
		.scroll-view {
			position: absolute;
			top:0;
			bottom:100upx;
			width:100%;
			.view-inner {
				padding:30upx;
			}
			.view-title {
				font-size: 34upx;
				color:#808080;
				padding:30upx 0;
			}
			.view-content {
				border-top:2upx solid #f4f4f4;
				border-bottom:2upx solid #f4f4f4;
				color:#808080;
				padding:10upx;
				.content-item {
					height: 68upx;
					line-height: 68upx;
					font-size: 28upx;
					
					text {
						display: inline-block;;
						min-width:160upx;
						text-align: right;
					}
				}
			}
		}
		.fixed-btns {
			position: fixed;
			bottom:100upx;
			width:100%;
			
		}
		.write-btns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width:80%;
			margin:0 auto;
		}
		.write-btns .write-item {
			width:250upx;
			text-align: center;
			height: 90upx;
			line-height: 90upx;
			border: 2upx solid #ea3f37;
			font-size: 32upx;
			color:#ea3f37;
			border-radius: 10upx;
		}
		
		
		.prompt-area {
			position: fixed;
			top:0;
			bottom:0;
			width:100%;
			background-color: rgba(0,0,0,.5);
			
			.prompt-inner {
				width:70%;
				position: absolute;
				top:50%;
				left:50%;
				transform: translate(-50%,-50%);
				border-radius: 20upx;
				background-color: #fff;
				text-align:center;
				padding-top:20upx;
				.prompt-title {
					font-size: 32upx;
					font-weight: bold;
					padding:18upx 0;
				}
				.prompt-subtitle {
					font-size: 28upx;
					color:#444;
				}
				
				.prompt-input {
					margin:18upx 0;
					padding:10upx 28upx;
					input {
						background-color: transparent;
						border:2upx solid #eee;
						height: 100%;
						text-align: left;
						height: 74upx;
						padding:10upx 0;
						padding-left:10upx;
						box-sizing: border-box;
					}
				}
				.prompt-btns {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 2upx solid #f4f4f4;
					.prompt-btn {
						flex: 1;
						height: 80upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 32upx;
						color:#0081FF;
						position: relative;
					}
					.prompt-btn:first-child:after {
						content:"";
						display: block;
						height: 100%;
						width:2upx;
						background-color: #f4f4f4;
						right:0;
						position: absolute;
						top:0;
					}
				}
			}
		}
	}
</style>
