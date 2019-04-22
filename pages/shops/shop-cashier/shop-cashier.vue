<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="white-block block-group">
					<view class="item-inner">
						<view class="item-title">订单编号</view>
						<view class="item-value">{{orderSn}}</view>
					</view>
					<view class="item-inner">
						<view class="item-title">订单金额</view>
						<view class="item-value red-price">￥{{payAmount}}</view>
					</view>
				</view>
				<view class="white-block block-group gap-height">
					<view class="item-inner item-icon" @click="showPayPopup(1)">
						<view class="item-title"><text class="icon">&#xe66b;</text>余额支付</view>
						<view class="item-value"><text class="icon">&#xe606;</text></view>
					</view>
					<view class="item-collapse item-icon">
						<view class="item-inner" @click="showCollapseBox">
							<view class="item-title"><text class="icon">&#xe628;</text>消费券支付</view>
							<view class="item-value">
								<text class="icon" v-if="!showCollapse">&#xe606;</text>
								<text class="icon" v-else>&#xe643;</text>
							</view>
						</view>
						<view class="item-collapse-box" v-if="showCollapse">
							<view class="collapse-inner">
								<view class="item-title">消费券</view>
								<view class="item-value">{{ticketMoney}}</view>
							</view>
							<view class="collapse-inner">
								<view class="item-title">余额</view>
								<view class="item-value">
									<uni-number-box :min="minExtraPrice" :max="maxExtraPrice" @change="onNumberChange" :step="10" :value="extraMoney"></uni-number-box>
								</view>
							</view>
							<view class="pay-btn red-btn" @click="showPayPopup(2)">立即支付</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
				<view class="popup-head">
					<view class="close-btn"  @click="hidePopup"><text class="icon">&#xe732;</text></view>
					<view class="popup-title">请输入支付密码</view>
				</view>
				<view class="popup-middle">
					<view class="middle-item">消费券支付: {{ticketMoney}}</view>
					<view class="middle-item">余额支付: {{extraMoney}}</view>
				</view>
				<view class="pay-inputs">
					<input type="tel" maxlength="6" class="real-input" :focus="isFocus" @input="realInput">
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
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue';
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		components: {
			uniNumberBox,
			uniPopup
		},
		data() {
			return {
				showCollapse:false,
				orderId:'',
				orderSn:'',
				payAmount:'',
				showPopupMiddle:false,
				isFocus:false,
				realInputs:[],
				password:'',
				ticketMoney:0,
				minExtraPrice:'',
				maxExtraPrice:'',
				type:'' //是余额支付还是消费券支付1--余额 2--消费券
			}
		},
		computed: {
			...mapState(['token']),
			extraMoney(){
				return this.payAmount - this.ticketMoney
			}
		},
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			console.log(e);
			if(e['orderId']){
				this.orderId = e['orderId'];
				this.orderSn = e['orderSn'];
				this.payAmount = e['payAmount'];
			}
			// this.reckon(this.payAmount);
			
		},
		onUnload(){
			if(this.loadType == 'place'){
				uni.switchTab({
					url:'/pages/tabBar/index/index'
				})
			}
		},
		onHide(){
			
		},
		methods: {
			reckon(allPrice){
				uni.request({
					url: this.websiteUrl + 'user/is_first_time',
					method: 'POST',
					data:{
						type:1
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("是否为第一次消费券支付："+JSON.stringify(res.data));
							let isFirstTime = res.data;
							let recTicket;
							if(isFirstTime == 1){ //0代表第一次消费劵消费，则可以全部用消费券支付
								recTicket = parseInt(allPrice)
							}else { //1代表不是第一次消费券消费，最多只能用90%的消费券
								recTicket = parseInt(allPrice*0.9);
							}
							this.minExtraPrice = this.payAmount - recTicket;
							this.ticketMoney = recTicket;
						}else {
							// this.loadAddressList();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			onNumberChange(value){
				console.log(value);
				this.ticketMoney = this.payAmount - value;
			},
			showCollapseBox(){
				this.showCollapse = !this.showCollapse;
				this.maxExtraPrice = this.payAmount;
				this.reckon(this.payAmount);
			},
			showPayPopup(type){
				this.type = type;
				if(type == 1){ //余额支付
					this.extraMoney = this.payAmount;
					this.ticketMoney = 0;
				}else { //消费券支付
					// this.extraMoney = this.payAmount
				}
				this.showPopupMiddle = true;
				this.isFocus = true;
			},
			hidePopup(){
				this.showPopupMiddle = false;
				this.isFocus = false;
				this.reckon(this.payAmount);
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
						this.getPay();
					}
				}
			},
			getPay(){
				let type = this.type;
				let money;
				if(type == 1){//money传订单金额
					money = this.payAmount;
				}else {
					money = this.ticketMoney;
				}
				let data = {
					orderId:this.orderId,
					payType:type,
					money:money,
					secPwd:this.password
				}
				console.log(data)
				uni.request({
					url: this.websiteUrl + 'shop/order_pay',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("支付成功："+JSON.stringify(res.data));
							uni.showToast({
								icon: 'success',
								title: '支付成功',
								duration:2000,
								success:function(){
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadAddressList(){ //获取用户地址列表
				uni.request({
					url: this.websiteUrl + '/user/address_list',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取地址列表成功："+JSON.stringify(res.data));
							let addressId = res.data.list[0].id;
							this.addressId = addressId;
							this.getFirstAddress(addressId);
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
	/* @import '../../../uni.scss'; */
	page{
	  height: 100%;
	  background-color: #f4f4f4;
	}
	view {
		box-sizing: border-box;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		z-index: 99;
	}
	.block-group {
		width:96%;
		margin:0 auto;
		.item-inner {
			padding:0 24upx;
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			&:after {
				content:"";
				display: block;
				height: 2upx;
				position: absolute;
				left:20upx;
				right:0;
				bottom:0;
				background-color: #f4f4f4;
			}
			.item-title {
				// font-size: 30upx;
			}
			.red-price {
				color:#db4c3f;
			}
		}
		.item-icon {
			.item-title {
				.icon {
					color:#f00;
					margin-right:10upx;
					font-size: 28upx;
				}
			}
			.icon {
				font-size: 34upx;
				color:#999;
			}
		}
		.item-collapse-box {
			padding:0 24upx 30upx 50upx;
			.collapse-inner {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 88upx;
			}
			.pay-btn {
				width:280upx;
				height: 66upx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #ea3f37;
				color:#fff;
				font-size: 30upx;
				margin:40upx auto 0;
				border-radius:10upx;
			}
		}
	}
	.gap-height {
		margin-top:14upx;
	}
	.popup-head {
		position: relative;
		
		.close-btn {
			position: absolute;
			width:80upx;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon {
				font-size: 34upx;
				color:#333;
			}
		}
		.popup-title {
			width:100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			font-size: 30upx;
			height: 100upx;
		}
	}
	.popup-middle {
		border-top:2upx solid #f1f1f1;
		border-bottom:2upx solid #f1f1f1;
		padding-left:80upx;
		padding:30upx 0 20upx 80upx;
		.middle-item {
			display: flex;
			height: 56upx;
			align-items: center
		}
	}
	.pay-inputs {
		position: relative;
		width:90%;
		margin:40upx auto;
		.real-input {
			position: absolute;
			top:0;
			left:0;
			width:100%;
			height: 72upx;
			padding:0;
			opacity: 0;
			z-index: 3;
			background: none;
			text-indent: -999em;
			// margin-left:-100%;
		}
		.surface-inputs {
			position: absolute;
			top:0;
			left:0;
			width:100%;
			height: 74upx;
			line-height: 74upx;
			z-index: 1;
			overflow: hidden;
			.surface-input {
				height: 74upx;
				line-height: 74upx;
				display: flex;
				width: 100%;
				justify-content: space-between;
				border: 2upx solid #eee;
				input {
					flex: 1;
					height: 36px;
					line-height: 36px;
					border: 0;
					border-right: 2upx solid #eee;
					font-size: 16px;
					text-align: center;
					padding: 0;
					background: none;
				}
			}
		}
	}
	
</style>
