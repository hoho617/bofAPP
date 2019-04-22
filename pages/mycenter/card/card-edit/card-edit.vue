<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="form-wrap white-block">
					<view class="form-item">
						<view class="title">开户银行</view>
						<input class="uni-input" type="text" name="bankname" placeholder="请输入开户银行" v-model="bankname" :value="bankname" />
					</view>
					<view class="form-item">
						<view class="title">银行账号</view>
						<input class="uni-input" maxlength="19" type="number" name="account" v-model="account" placeholder="请输入银行账号" :value="account" />
					</view>
					<view class="form-item">
						<view class="title">开户姓名</view>
						<input class="uni-input" type="text" name="username" placeholder="请输入开户姓名" v-model="username" :value="username" />
					</view>
					<view class="form-item">
						<view class="title">开户行地址</view>
						<input class="uni-input" type="text" name="address" v-model="address" :value="address" placeholder="请输入开户行地址" />
					</view>
					<view class="form-item">
						<view class="title">设为默认银行</view>
						<view class="uni-input" @click="setDefaultCard">
							<image src="/static/selected.png" v-if="isDefault" />
							<image src="/static/select.png" v-else />
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="modifyCard">{{bottomBtnText}}</view>
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
				addressList:[],
				cardId:'', 
				bankname:'',
				account:'',
				username:'',
				address:'',
				isDefault:false,
				bottomBtnText:'新增',
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			if(e['cardId']) {
				var cardId = e['cardId'];
				this.cardId = cardId;
				this.bottomBtnText = '编辑';
				uni.setNavigationBarTitle({
					title: '编辑银行卡'
				})
			}
			this.getDetailCard(this.cardId);
		},
		methods: {
			getDetailCard(cardId){ //获取银行卡信息
				uni.request({
					url: this.websiteUrl + 'user/bank_detail',
					method: 'POST',
					data:{
						id:cardId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取银行卡详情成功："+JSON.stringify(res.data));
							let data = res.data;
							let bankname = data.bankName;
							let account = data.bankNo;
							let username = data.bankUser;
							let address = data.bankAddress;
							let isDefault = data.typeState;
							this.bankname = bankname;
							this.account = account;
							this.username = username;
							this.address = address;
							this.isDefault = isDefault == 0?false:true;
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			modifyCard(){
				let id = this.cardId;
				let url;
				if(id){
					url = this.websiteUrl + 'user/bank_edit';
				}else {
					url = this.websiteUrl + 'user/bank_add';
					id = null;
				}
				let bankName = this.bankname;
				let bankNo = this.account;
				let bankUser = this.username;
				let bankAddress = this.address;
				let isDefault = this.isDefault == true?1:0;
				let data = {
					id:id,
					bankName:bankName,
					bankNo:bankNo,
					bankUser:bankUser,
					bankAddress:bankAddress,
					typeState:isDefault
				}
				console.log(data)
				if(!bankName || !bankNo || !bankUser || !bankAddress){
					uni.showToast({
						icon: 'none',
						title: '请先完善您的银行卡信息!',
						duration:2000
					});
					return false;
				}else {
					this.requestCardEdit(data,url);
				}
			},
			requestCardEdit(data,url){
				uni.request({
					url: url,
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("银行卡编辑成功："+JSON.stringify(res));
							let msg = '银行卡新增成功!';
							if(this.cardId){
								msg = '银行卡修改成功!'
							}
							uni.showToast({
								icon: 'success',
								title: msg,
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
			setDefaultCard(){
				this.isDefault = !this.isDefault;
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
		height: 88upx;
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
