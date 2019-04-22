<template>
	<view class="wrap-container">
		<view class="scroll-view">
			<scroll-view style="height: 100%;" scroll-y>
				<view class="pay-panel">
					<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
					<view class="panel-inner">
						<view class="pay-title">充值类型:    <picker @change="bindPickerChange" :value="index" :range="array">
						        <text>{{array[index]}}</text>
						    </picker>
							</view>
						<view class="pay-inputs">
							<input class="uni-input" type="number" placeholder="输入充值余额" v-model="rechargeMoney" placeholder-style="opacity:.7;"/>
						</view>
						<view class="pay-extra">
							<input class="uni-input" type="text" placeholder="添加备注:" v-model="remark" placeholder-style="opacity:.7;">
						</view>
					</view>
				</view>
				<view class="pay-card">
					<view class="pay-card-title">
						充值账户
					</view>
					<view class="pay-panel" v-for="(item,index) in bankList" :key="index">
						<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
						<view class="panel-inner">
							<view class="card-name">{{item.bank}}</view>
							<image src="../../../static/img/card/card.png" class="card-image" mode="widthFix"></image>
							<view class="card-number">{{item.zhanghao}}</view>
							<view class="card-username">{{item.huzhu}}</view>
							<image src="../../../static/img/card/card_sign.png" class="sign-image" mode="widthFix"></image>
							<text class="uni-icon uni-icon-arrowright"></text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer" @click="getPay">
			<view>提交申请</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				rechargeMoney:'',
				remark:'' ,//是余额支付还是消费券支付1--余额 2--消费券
				array: ['余额'],
				index:0,
				pageIndex: 1,
				pageSize: 10,
				bankList:[]
			}
		},
		computed: {
			...mapState(['token'])
		},
		onShow(){
			// this.getShopcar();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"/pages/bonus/user-recharge/recharge-list/recharge-list"
			})
		},
		onLoad(e){
			this.getBankList();
		},
		methods:{
			getBankList(){
				uni.request({
					url: this.websiteUrl + 'finance/bank_list',
					method: 'POST',
					data:{
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("用户finance/bank_list成功："+JSON.stringify(res.data));
							let list = res.data.list;
							this.bankList = list;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getPay(){
				let that = this;
				let money = this.rechargeMoney;
				if(money == 0 || !money){
					uni.showToast({
						title:'充值金额不为空!',
						icon:'none'
					})
					return;
				}
				let moneyType = this.index == 0?1:2;
				let remark = this.remark;
				let dataInfo = {
					money:money,
					moneyType:moneyType,
					remark:remark
				}
				console.log(JSON.stringify(dataInfo))
				uni.showToast({
					icon: 'loading',
					title: '正在充值...'
				});
				uni.request({
					url: this.websiteUrl + 'finance/recharge_apply',
					method: 'POST',
					data:dataInfo,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '充值成功':res.message;
						if(res.code == 200){
							console.log("充值提交成功："+JSON.stringify(res.data));
							setTimeout(()=>{
								uni.showToast({
									icon: 'success',
									title: title,
									duration:2000,
									success:function(){
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
									}
								});
							},2000)
							
						}else {
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
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
	  height: 100%;
	}
	
	.wrap-container {
		height: 100%;
		.scroll-view {
			position: absolute;
			top:0;
			bottom:110upx;
			width:100%;
		}
		.pay-panel{
			width: 86%;
			height: 320upx;
			margin:20upx auto;
			border-radius:16upx;
			position:relative;
			overflow:hidden;
			image {
				width:100%;
				height: 100%;
			}
			.panel-inner {
				position: absolute;
				left:0;
				right:0;
				bottom:0;
				top:0;
				padding:24upx;
				.pay-title {
					color:#808080;
					display:flex;
					align-items:center;
					text {
						color:#333;
						margin-left:10upx;
					}
				}
				.pay-extra {
					color:#808080;
					input {
						font-size: 32upx;
						background-color: transparent;
					}
				}
				.pay-inputs {
					
					input {
						background-color: transparent;
						border-bottom: 2upx solid #999;;
						width:76%;
						display: block;
						margin:0 auto;
						text-align: center;
						height: 66upx;
						line-height: 66upx;
						font-size: 44upx;
					}
				}
				
			}
		}
		.pay-card {
			margin-top:40upx;
			.pay-card-title {
				padding-left:80upx;
				font-size: 32upx;
				color:#808080;
			}
			.pay-panel {
				position: relative;
				height: 400upx;
				color:#666;
				border: #ccc 1px solid;
				box-shadow: 0 0 10px #999;
				margin-bottom:20upx;
				.card-name {
					font-size: 40upx;
					padding-top:20upx;
				}
				
				.card-image {
					width:100upx;
					margin:24upx 0;
					margin-left:12upx;
				}
				
				.card-number {
					font-size: 48upx;
				}
				.card-username {
					font-size: 40upx;
					margin-top:20upx;
				}
				.sign-image {
					position: absolute;
					right:30upx;
					bottom:30upx;
					width:120upx;
				}
				.uni-icon {
					position: absolute;
					right:30upx;
					top:30upx;
					font-size: 80upx;
					color:#808080;
				}
			}
			
		}
		.fixed-footer {
			position: fixed;
			bottom:0;
			height: 110upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #dd524d;
			width:100%;
			view {
				font-size: 36upx;
				color:#fff;
			}
		}
	}
</style>
