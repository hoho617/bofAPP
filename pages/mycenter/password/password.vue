<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="form-wrap white-block">
					<view class="form-item">
						<view class="title">原密码</view>
						<input class="" type="password" name="pwd" placeholder="请输入原密码" v-model="pwd" :value="pwd" />
					</view>
					<view class="form-item">
						<view class="title">新密码</view>
						<input class="" type="password" name="newPwd" v-model="newPwd" placeholder="请输入新密码" :value="newPwd" />
					</view>
					<view class="form-item">
						<view class="title">确认新密码</view>
						<input class="" type="password" name="reNewPwd" v-model="reNewPwd" :value="reNewPwd" placeholder="请确认新密码" />
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="modifyPassword">修改</view>
		</view>
		
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
			
		},
		data() {
			return {
				passwordType:'',
				pwd:'',
				newPwd:'',
				reNewPwd:''
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			let passwordType = e['passwordType'];
			this.passwordType = passwordType;
			if(passwordType == 2) {
				uni.setNavigationBarTitle({
					title: '修改安全密码'
				})
			}
		},
		methods: {
			requestModifyPsd(data){ //获取用户地址列表
				uni.request({
					url: this.websiteUrl + 'user/pwd_edit',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("密码修改成功："+JSON.stringify(res.data));
							uni.showToast({
								icon: 'success',
								title: '密码修改成功',
								duration:2000,
								success:function(){
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
							});
							
						}else if (res.code == 401) {
							uni.navigateTo({
								url:'/pages/login/login/login'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message,
								duration:2000
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			modifyPassword(){
				let pwd = this.pwd;
				let newPwd = this.newPwd;
				let reNewPwd = this.reNewPwd;
				let passwordType = this.passwordType;
				var data = {
					pwd:pwd,
					newPwd:newPwd,
					reNewPwd:reNewPwd,
					type:passwordType
				}
				if(newPwd != reNewPwd){
					uni.showToast({
						icon: 'none',
						title: '两次输入的新密码不一致',
						duration:2000
					});
					return false;
				}
				if(passwordType == 2){
					if(this.customMethods.six_num_ver(newPwd)==0){
						uni.showToast({
							icon: 'none',
							title: '请输入6位数字',
							duration:2000
						});
						return false;
					}else {
						this.requestModifyPsd(data)
					}
				}else {
					this.requestModifyPsd(data)
				}
			}
		}
	}
</script>

<style>
	/* @import '../../../uni.scss'; */
	page{
	  height: 100%;
	  background-color: #f4f4f4;
	}
	view {
		box-sizing: border-box;
		font-size: 30upx;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:100upx;
		width:100%;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	.form-wrap {
		
	}
	.form-item {
		display: flex;
		align-items: center;
		padding:0 24upx;
		position: relative;
		height: 98upx;
	}
	.form-item .title {
		width:180upx;
		/* text-align: right; */
	}
	.form-item:after {
		content:"";
		display: block;
		height: 2upx;
		background-color: #eee;
		left:24upx;
		position: absolute;
		bottom:0;
		right:0;
	}
	.uni-input {
		display: flex;
		align-items: center;
	}
	.uni-input image {
		width:40upx;
		height: 40upx;
	}
	.address-info {
		color:#808080;
		padding:0 25upx;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	.right-arrow {
		font-size: 34upx;
		color:#ccc;
	}
	.fixed-footer {
		position: fixed;
		bottom:0;
		width:100%;
		height: 98rpx;
		line-height: 98rpx;
	}
	.red-btn-bottom {
		background-color: #db4c3f;
		color:#fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
		height: 100%;
		font-size: 30upx;
	}
	

</style>
