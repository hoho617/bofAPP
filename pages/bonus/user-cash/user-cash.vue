<template>
	<view class="scroll-view">
		<view class="pay-panel">
			<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
			<view class="panel-inner">
				<view class="pay-inputs">
					<input class="uni-input" type="digit" placeholder="输入挂卖通证" v-model="payMoney" @blur="checkMoney" placeholder-style="opacity:.7;"/>
				</view>
				<view class="pay-extra">
					<view class="pay-fee" v-if="showFee">手续费:5%</view>
					<view class="pay-fee" v-else>平台挂卖 九折</view>
					<view class="pay-all">
						<view class="all-money">可挂卖通证: {{balance}}</view>
						<view class="all-btn" @click="cashAll">全部挂卖</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay-card">
			<view class="pay-card-title">
				收款账户
			</view>
			<view class="pay-panel" @click="chooseCard">
				<image src="../../../static/img/card/cardWhiteBg.jpg"></image>
				<view class="panel-inner">
					<view class="card-name">{{bankInfo.bankName}}</view>
					<image src="../../../static/img/card/card.png" class="card-image" mode="widthFix"></image>
					<view class="card-number">{{bankInfo.bankNo}}</view>
					<view class="card-username">{{bankInfo.bankUser}}</view>
					<image src="../../../static/img/card/card_sign.png" class="sign-image" mode="widthFix"></image>
					<text class="uni-icon uni-icon-arrowright"></text>
				</view>
			</view>
		</view>
		<view class="fixed-footer" @click="showInput">
			<view>确认挂卖</view>
		</view>
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
			<view class="popup-head">
				<view class="close-btn"  @click="hidePopup"><text class="icon">&#xe732;</text></view>
				<view class="popup-title">请输入支付密码</view>
			</view>
			<view class="popup-middle">
				<view class="middle-item">挂卖金额: {{payMoney}}</view>
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
				bankInfo:'',
				balance:'', //可挂卖通证
				showFee:true
			}
		},
		computed: {
			...mapState(['token'])
		},
		onShow(){
			// this.getShopcar();
		},
		onNavigationBarButtonTap(e) {
			if(this.showFee){
				uni.navigateTo({
					url:"/pages/bonus/user-transfer/transfer-list/transfer-list"
				})
			}else {
				uni.navigateTo({
					url:"/pages/bonus/balance-list/balance-detail/balance-detail"
				})
			}
			
		},
		onLoad(e){
			console.log(JSON.stringify(e))
			if(e['balance']){
				let balance = e['balance'];
				console.log('可挂卖通证',balance);
				this.balance = balance;
			}else {
				this.loadFinanceStatistics();
			}
			if(e['flag'] == 2){
				this.showFee = false;
				uni.setNavigationBarTitle({
					title: '通证挂卖'
				});
			}
			this.isCanCash();
		},
		methods:{
			isCanCash(){
				uni.request({
					url: this.websiteUrl + 'user/info',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("用户信息获取成功："+JSON.stringify(res.data));
							let isCanCash = res.canCash;
							if(isCanCash == 0){
								uni.showModal({
									title: '挂卖暂停',
									content: '请联系客服',
									success: function (res) {
										if (res.confirm) {
											console.log('用户点击确定');
											uni.navigateBack();
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}else {
								this.getBankList();
							}
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadFinanceStatistics(){
				uni.request({
					url: this.websiteUrl + 'finance/statistics',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("挂卖通证获取成功："+JSON.stringify(res.data));
							let moneyPrice = res.data.b1.toFixed(2);
							
							this.balance = moneyPrice;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getBankList(){
				uni.request({
					url: this.websiteUrl + 'user/bank_list',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("用户银行列表成功："+JSON.stringify(res.data));
							let bankInfo = res.data[0];
							this.bankInfo = bankInfo;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			cashAll(){
				if(this.balance < 100){
					uni.showToast({
						icon: 'none',
						title: '挂卖余额不足100，无法挂卖',
						duration:2000,
						success:function(){
							return false;
						}
					});
				}
				
				this.payMoney = parseInt(this.balance / 100) * 100
				
			},
			getPay(){
				let that = this;
				let money = this.payMoney;
				let bankId = this.bankInfo.id;
				console.log(bankId)
				let dataInfo = {
					money:money,
					secPwd:this.password,
					bankId:bankId
				}
				console.log(JSON.stringify(dataInfo))
				uni.showToast({
					icon: 'loading',
					title: '正在挂卖'
				});
				this.hidePopup();
				let url;
				if(this.showFee){
					url = 'finance/cash_apply';
				}else {
					url = 'finance/trading_apply';
				}
				uni.request({
					url: this.websiteUrl + url,
					method: 'POST',
					data:dataInfo,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '挂卖提交成功':res.message;
						if(res.code == 200){
							console.log("挂卖提交成功："+JSON.stringify(res.data));
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
						that.getPay();
					}
				}
			},
			showInput(){
				if(this.payMoney && this.payMoney != 0){
					
					if(this.payMoney%100 != 0 || this.payMoney < 100){
						uni.showToast({
							icon: 'none',
							title: '挂卖金额请输入100的整数倍',
							duration:2000
						});
						return;
					}
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
			checkMoney(){
				if(this.payMoney%100 != 0 || this.payMoney < 100){
					uni.showToast({
						icon: 'none',
						title: '挂卖金额请输入100的整数倍',
						duration:2000
					});
					return;
				}
			},
			chooseCard(){
				uni.navigateTo({
					url:'/pages/mycenter/card/card-manage/card-manage'
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
				.pay-extra {
					color:#808080;
					.pay-fee {
						font-size: 28upx;
						margin-bottom:16upx;
					}
					.pay-all {
						display: flex;
						align-items: center;
						justify-content: space-between;
						
						.all-btn {
							color:#5F9950;
						}
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
