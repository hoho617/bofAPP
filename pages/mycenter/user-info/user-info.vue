<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="info-block">
					<view class="block-title">基本信息</view>
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">会员账号</view>
							<view class="value">{{account}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">会员姓名</view>
							<view class="value">{{trueName}}</view>
						</view>
						<view class="block-info-item">
							<view class="title"><text :decode="true">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</text></view>
							<view class="value">{{sex}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">注册时间</view>
							<view class="value">{{regTime}}</view>
						</view>
					</view>
				</view>
				<view class="info-block">
					<view class="block-title">其他信息</view>
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">身份证号</view>
							<view class="value">{{idcard}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">手 机 号</view>
							<view class="value">{{mobile}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="modifyUserInfo">编辑</view>
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
				account:'',
				trueName:'',
				sex:'',
				regTime:'',
				mobile:'',
				idcard:'',
				addressPreffix:'',
				isDefault:false,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				bottomBtnText:'新增',
				addressCodeArr:[]
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			this.getUserInfo();
		},
		onLoad() {
			
		},
		methods: {
			getUserInfo(){ //获取用户信息
				uni.request({
					url: this.websiteUrl + 'user/info',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户信息成功："+JSON.stringify(res.data));
							let data = res.data;
							let account = data.userName;
							let trueName = data.trueName;
							let sex = data.sex == 1?'男':'女';
							var date = new Date(data.regTime * 1000);
							var m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
							var d = (date.getDate() < 10) ? '0'+date.getDate()+ ' ': date.getDate() + '日';
							let regTime = m + d;
							let idcard = data.idcard;
							let mobile = data.mobile;
							this.account = account;
							this.trueName = trueName;
							this.sex = sex;
							this.regTime = regTime;
							this.idcard = idcard;
							this.mobile = mobile;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			modifyUserInfo(){
				uni.navigateTo({
					url:'/pages/mycenter/user-info/user-info-edit/user-info-edit'
				})
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
	.info-block {
		padding:0 20upx;
	}
	.block-title {
		height: 80upx;
		display: flex;
		align-items: center;
	}
	.block-wrap {
		
	}
	.block-info-item {
		display: flex;
		align-items: center;
		padding:0 24upx;
		position: relative;
		height: 88upx;
	}
	.block-info-item .title {
		width:180upx;
		font-size: 30upx;
		/* text-align: right; */
	}
	.block-info-item:after {
		content:"";
		display: block;
		height: 2upx;
		background-color: #eee;
		left:24upx;
		position: absolute;
		bottom:0;
		right:0;
	}
	.block-info-item .value {
		display: flex;
		align-items: center;
		color:#999;
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
