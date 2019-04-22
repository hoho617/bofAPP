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
						<text class="icon input-icon-psd">&#xe63d;</text>
						<input type="text" v-model="newPwd" placeholder="请设置密码" auto-focus>
					</view>
				</view>
				<view class="input-row border margin-bottom">
					<text class="icon input-icon-psd">&#xe63d;</text>
					<input type="text" v-model="reNewPwd" placeholder="请再次确认密码">
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="setPassword">下一步</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// var util = require('../../../common/util.js')
	export default {
		data() {
			return {
				newPwd: '',
				reNewPwd:'',
				userName:'',
				mobile:''
			}
		},
		onLoad(e) {
			if(e['userName']) {
				console.log(e);
				var userName = e['userName'];
				var mobile = e['mobile'];
				var pwd = e['pwd'];
				this.userName = userName;
				this.mobile = mobile;
				this.pwd = pwd;
			}
		},
		methods: {
			modifyCode(data){
				uni.request({
					url:this.websiteUrl + '/user_pwd_reset',
					method:'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':''},
					success:res=>{
						var res = res.data;
						//服务器返回响应，根据响应结果，分析是否登录成功；
						var that = this;
						if(res.code == 200){
							console.log("修改密码成功："+JSON.stringify(res))
							uni.showToast({
								icon: 'success',
								title: '修改密码成功',
								duration:1000
							});
							uni.navigateTo({
								url:'/pages/login/login/login'
							})
						}else {
							uni.showToast({
								icon: 'none',
								title: res.message,
							});
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			toSetPassword(){
				console.log("点击下一步，修改密码");
				let that = this;
				let userName = this.userName;
				let pwd = this.pwd;
				let reNewPwd = this.reNewPwd;
				let newPwd = this.newPwd;
				let data = {
					'userName': userName,
					'pwd': pwd,
					'newPwd': newPwd,
					'reNewPwd': newPwd,
					'type': 1
				}
				if(!newPwd) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码',
					});
					return;
				}else if(reNewPwd != newPwd){
					uni.showToast({
						icon: 'none',
						title: '两次密码不正确',
					});
				}else {
					this.modifyCode(data);
				}
				
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
