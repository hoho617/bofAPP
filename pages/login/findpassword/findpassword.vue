<template>
	<view class="content">
		<image src="/static/loginBg.png" class="img-bg"/>
		<view class="page-bg">
			<view class="logo-content">
				<image src="/static/logo.png" class="logo" />
			</view>
			<view class="form-content">
				<view class="input-group">
					<view class="input-row border margin-bottom">
						<text class="icon input-icon-account">&#xe622;</text>
						<input type="text" v-model="account" placeholder="请输入会员账号">
					</view>
					<view class="input-row border margin-bottom">
						<text class="icon input-icon-psd">&#xe6a6;</text>
						<input type="number" v-model="phone" placeholder="请输入手机号码">
						<button type="primary" class="send-btn" v-if="!isSend" @tap="getCode">获取验证码</button>
						<button type="primary" class="sended-btn send-btn" v-else>{{seconds}}s后重新发送</button>
					</view>
					<view class="input-row border">
						<text class="icon input-icon-psd">&#xe6f5;</text>
						<input type="number" v-model="code" placeholder="请输入验证码">
					</view>
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="toSetPassword">下一步</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				phone:'',
				code:'',
				realcode:'',
				isSend:false,
				seconds:30
			}
		},
		onLoad() {
			
		},
		methods: {
			getCode(){
				if(!this.account){
					uni.showToast({
						icon: 'none',
						title: '请填写会员账号或手机号',
					});
					this.account = '';
					return;
				}
				if(!this.customMethods.isPoneAvailable(this.phone)){
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确，请重新输入',
					});
					this.phone = '';
					return;
				}
				var data = {
					'mobile':this.phone,
					'smstype':3,
					'userName':this.account
				}
				this.isSend = true;
				this.cutDown();
				this.sendCode(data);
				
			},
			sendCode(data){
				uni.request({
					url:this.websiteUrl + 'getcaptcha',
					method:'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':''},
					success:res=>{
						console.log("发送验证码成功："+JSON.stringify(res))
						var data = res.data;
						//服务器返回响应，根据响应结果，分析是否登录成功；
						var that = this;
						if(data.code == 200){
							uni.showToast({
								icon: 'success',
								title: '验证码发送成功',
								duration:1000
							});
							this.realcode = data.data.code;
						}else {
							uni.showToast({
								icon: 'none',
								title: data.message,
							});
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			cutDown(){
				setInterval(()=>{
					var second = this.seconds--;
					if(second ==0){
						this.isSend = false;
						this.seconds = 30;
					}
				},1000)
			},
			toSetPassword(){
				console.log("点击下一步，跳到修改密码页面");
				var that = this;
				var code = Number(this.code);
				var realcode = this.realcode;
				console.log(typeof code);
				console.log(typeof realcode)
				if(!this.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
					});
					return;
				}else if(Number(this.code) != Number(this.realcode)){
					uni.showToast({
						icon: 'none',
						title: '验证码不正确',
					});
					return;
				}
				uni.navigateTo({
					url:"/pages/login/setpassword/setpassword?userName="+this.account+'&mobile='+this.mobile+'&pwd='+this.realcode
				})
				
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	.content {
		position: relative;
		height: 100%;
	}
	.img-bg {
		position: absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		width:100%;
		height: 100%;
	}
	.logo-content {
		text-align: center;
		padding-top:100upx;
	}
	.logo {
		width:140upx;
		height: 140upx;
	}
	.content {
	}
	.page-bg {
		position: absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.form-content {
		width:70%;
		padding-top:140upx;
		margin:0 auto;
	}
	.input-group {
		width:100%;
	}
	.input-row {
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		height: 64upx;
		padding-left:10upx;
	}
    .input-row .icon {
		font-size: 40upx;
		color:#fff;
		margin-right:24upx;
	}
	.input-row input {
		color:#fff;
		font-size: 30upx;
		width:100%;
	}
	.input-placeholder {
		color:#fff;
		font-size: 30upx;
	}
	.border {
		border-bottom:2upx solid #fff;
	}
	.margin-bottom {
		margin-bottom:60upx;
	}
	.btn-row {
		width:100%;
		height: 68upx;
		
	}
	.btn-row button {
		height: 68upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2d97fa;
		margin:90upx 0 40upx;
		font-size: 30rpx;
		padding:0;
	}
	.action-row {
		width:100%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.action-row navigator {
		font-size: 26upx;
		color:#fff;
	}
	
	.send-btn {
		min-width:180upx;
		padding:0 16upx;
		height: 58upx;
		font-size: 28upx;
		background-color: #2D97FA !important;
		/* color:#2D97FA; */
		padding:0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sended-btn {
		min-width:210upx;
		opacity: .8;
	}
</style>
