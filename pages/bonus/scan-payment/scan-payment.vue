<template>
	<view class="scroll-view">
		<view class="pay-panel">
			<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
			<view class="panel-inner">
				<view class="pay-title">支付类型:   <text>余额</text></view>
				<view class="pay-inputs">
					<input class="uni-input" type="text"  readonly :value="userAccount"/>
					<input class="uni-input" type="digit" placeholder="支付金额" v-model="payMoney" placeholder-style="opacity:.7;"/>
				</view>
			</view>
		</view>
		<view class="fixed-footer" @click="showInput">
			<view>支付</view>
		</view>
		<view class="pay-success-panel" v-show="isPaySuccess">
			<image src="../../../static/img/index/icon-success.png" class="suc-image" mode="widthFix"></image>
			<view class="success-txt">支付成功</view>
			<view class="balance">余额 <text class="biger-font">{{payMoney}}</text></view>
			<view class="receivable-area">
				<view class="receivable-title">收款人</view>
				<text class="uni-icon uni-icon-contact"></text>
				<view class="receivable-user">
					账号：{{userAccount}} <text class="biger-font">({{trueName}})</text>
				</view>
			</view>
			<view class="close-btn" @click="closePay">完成</view>
		</view>
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
			<view class="popup-head">
				<view class="close-btn"  @click="hidePopup"><text class="icon">&#xe732;</text></view>
				<view class="popup-title">请输入支付密码</view>
			</view>
			<view class="popup-middle">
				<view class="middle-item">余额支付: {{payMoney}}</view>
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
				url:"/pages/bonus/scan-payment/payment-list/payment-list"
			})
		},
		onLoad(e){
			if(e['userAccount']){
				let userAccount = e['userAccount'];
				let trueName = e['trueName'];
				console.log(userAccount,trueName)
				this.userAccount = userAccount;
				this.trueName = trueName;
			}
		},
		methods:{
			getPay(){
				let that = this;
				let money = this.payMoney;
				let data = {
					moneyType:5,
					money:money,
					secPwd:this.password,
					tUserName:this.userAccount
				}
				console.log(data)
				uni.showToast({
					icon: 'loading',
					title: '正在支付'
				});
				this.hidePopup();
				uni.request({
					url: this.websiteUrl + 'finance/barpay_apply',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("支付成功："+JSON.stringify(res.data));
							setTimeout(()=>{
								uni.showToast({
									icon: 'success',
									title: '支付成功',
									duration:2000,
									success:function(){
										that.isPaySuccess = true;
									}
								});
							},2000)
							
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
				this.showPopupMiddle = true;
				this.isFocus = true;
			},
			closePay(){
				this.isPaySuccess = false;
				uni.navigateBack({
					delta:-1
				})
			}
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
					text {
						color:#333;
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
