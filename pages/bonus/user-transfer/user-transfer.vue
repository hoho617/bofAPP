<template>
	<view class="scroll-view">
		<view class="pay-panel">
			<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
			<view class="panel-inner">
				<view class="pay-title">支付类型:    <picker @change="bindPickerChange" :value="index" :range="array">
                        <text>{{array[index]}}</text>
                    </picker>
					</view>
				<view class="pay-inputs">
					<input class="uni-input" type="text" placeholder="转入会员账号"  v-model="userAccount" placeholder-style="opacity:.7;" />
					<input class="uni-input" type="digit" placeholder="转账数额" v-model="payMoney" placeholder-style="opacity:.7;"/>
				</view>
			</view>
		</view>
		<view class="fixed-footer" @click="showInput">
			<view>提交申请</view>
		</view>
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
			<view class="popup-head">
				<view class="close-btn"  @click="hidePopup"><text class="icon">&#xe732;</text></view>
				<view class="popup-title">请输入支付密码</view>
			</view>
			<view class="popup-middle">
				<view class="middle-item">{{array[index]}}: {{payMoney}}</view>
			</view>
			<view class="pay-inputs">
				<input type="tel" maxlength="6" class="real-input" :focus="isFocus" @input="realInput" adjust-position="true">
				<view class="surface-inputs">
					<view class="surface-input">
						<input type="password" :value="realInputs[0]">
						<input type="password" :value="realInputs[1]">
						<input type="password" :value="realInputs[2]">
						<input type="password" :value="realInputs[3]">
						<input type="password" :value="realInputs[4]">
						<input type="password" :value="realInputs[5]">
					</view>
				</view>
			</view>
		</uni-popup>
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
				showCollapse:false,
				userAccount:'',
				trueName:'',
				payMoney:'',
				showPopupMiddle:false,
				isFocus:false,
				realInputs:[],
				password:'',
				type:'' ,//是余额支付还是消费券支付1--余额 2--消费券
				isPaySuccess:false,
				array: ['转通证', '转消费券'],
				index:0
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
				url:"/pages/bonus/user-transfer/transfer-list/transfer-list"
			})
		},
		onLoad(e){
			
		},
		methods:{
			getPay(){
				let that = this;
				let money = this.payMoney;
				let moneyType = this.index == 0?1:4;
				let data = {
					moneyType:moneyType,
					money:money,
					secPwd:this.password,
					tUserName:this.userAccount
				}
				console.log(JSON.stringify(data))
				uni.showToast({
					icon: 'loading',
					title: '正在支付'
				});
				this.hidePopup();
				uni.request({
					url: this.websiteUrl + 'finance/transfer_apply',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '转账成功':res.message;
						if(res.code == 200){
							console.log("转账成功："+JSON.stringify(res.data));
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
			},
			hidePopup(){
				this.showPopupMiddle = false;
				this.isFocus = false;
				this.realInputs = [];
			},
			realInput(e){
				console.log(e)
				let value = e.detail.value;
				let len = value.length;
				let that = this;
				if(/^[0-9]*$/g.test(value)) {
					this.password = value;
					this.realInputs = [];
					for(let i in this.password){
						that.realInputs[i] = that.password[i];
					}
					if(len === 6){
						console.log('开始支付了')
						uni.hideKeyboard()
						this.getPay();
					}
				}
			},
			showInput(){
				if(this.payMoney && this.payMoney != 0 && this.userAccount){
					this.showPopupMiddle = true;
					this.isFocus = true;
						
				}else {
					uni.showToast({
						icon: 'none',
						title: '输入内容不为空',
						duration:2000
					});
					return;
				}
				
			},
			closePay(){
				uni.navigateBack()
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
	  height: 100%;
	}
	
	.scroll-view {
		height: 100%;
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
			
		.pay-success-panel {
			position: fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			z-index: 99;
			background-color: #fff;
			text-align: center;
			padding-top:80upx;
			.suc-image {
				width:120upx;
			}
			.success-txt {
				font-size: 32upx;
				color:#00FF00;
				font-weight: bold;
				margin-top:10px;
			}
			.balance {
				font-size: 32upx;
				margin-top:40px;
				.biger-font {
					vertical-align: -webkit-baseline-middle;
					margin-left:4px;
					font-size: 48upx !important;
				}
			}
			.biger-font {
				font-size: 48upx !important;
				font-weight: bold;
			}
			.receivable-area {
				margin-top:110upx;
				.receivable-title {
					font-size: 32upx;
				}
				.uni-icon-contact {
					color:#f00;
					font-size: 90upx;
					margin:20upx 0;
				}
				.receivable-user {
					font-size: 36upx;
				}
			}
			
			.close-btn {
				height: 68upx;
				border: 1px solid #ff0000;
				color:#FF0000;
				width:240upx;
				text-align: center;
				position: absolute;
				bottom:110upx;
				left:50%;
				margin-left:-120upx;
				line-height: 68upx;
				font-size: 30upx;
				border-radius: 10upx;
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
