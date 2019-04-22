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
					<view class="input-row border">
						<text class="icon input-icon-psd">&#xe63d;</text>
						<input type="text" password="true" v-model="password" placeholder="请输入登录密码">
					</view>
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="bindLogin">登录</button>
				</view>
				<view class="action-row" @click="toFindPassword">
					<text>忘记密码</text> 
					<!-- <navigator url="../findpassword/findpassword">忘记密码</navigator> -->
				</view>   
			</view>
		</view>
	</view>
</template>

<script>
	// var util = require('../../../common/util.js')
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				account: '',
				password:''
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			bindLogin(){
				if(!this.account){
					uni.showToast({
						icon: 'none',
						title: '请填写会员账号或手机号',
					});
					this.account = '';
					return;
				}
				if(!this.password){
					uni.showToast({
						icon: 'none',
						title: '请填写登录密码',
					});
					this.password = '';
					return;
				}
				uni.request({
					url:this.websiteUrl + 'auth',
					method:'POST',
					data:{
						phone:this.account,
						password:this.password
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json'},
					success:res=>{
						console.log("登录："+JSON.stringify(res))
						var data = res.data;
						//服务器返回响应，根据响应结果，分析是否登录成功；
						var that = this;
						if(data.code == 200){
							var token = data.data.token;
							console.log("登录成功数据"+JSON.stringify(data));
							this.customMethods.createState(this.account,function(){
								that.customMethods.setState(data.data);
								var state = that.customMethods.getState();
								console.log("登录成功数据"+JSON.stringify(state));
								// that.toLogin(that.account,token);
							})
							that.toLogin(that.account,token);
							this.loadRankNames(token);
						}else if(data.code == 401){
							uni.showToast({
								icon: 'none',
								title: '登录密码错误',
							});
						}else if(data.code == 404){
							uni.showToast({
								icon: 'none',
								title: '用户不存在',
							});
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
			loadRankNames(token){
				uni.request({
					url: this.websiteUrl + 'finance/get_rank_list',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'content-type':'application/json','Token':token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取rank-list成功："+JSON.stringify(res));
							let settings = this.customMethods.getSettings();
							settings.rankNames = res.data;
							this.customMethods.setSettings(settings);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toLogin(username,token){
				console.log("login_phone.html:toMain");
				var that = this;
				var userName = this.account;
				this.login({userName,token});
				uni.showToast({
					icon: 'success',
					title: '登录成功',
					duration:2000,
					success:function(){
						that.account = '';
						that.password = '';
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/tabbar/index/index',
							});
						},1000)
					}
				});
				
			},
			toFindPassword(){
				uni.navigateTo({
					url:"/pages/login/findpassword/findpassword"
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
	.logo-content {
		text-align: center;
		padding-top:100upx;
	}
	.logo {
		width:140upx;
		height: 140upx;
	}
	.form-content {
		width:70%;
		margin:120upx auto 0;
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
		font-size: 32rpx;
		padding:0;
	}
	.action-row {
		width:100%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.action-row text {
		font-size: 26upx;
		color:#fff;
	}
</style>
