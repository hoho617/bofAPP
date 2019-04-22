<template>
	<view class="content">
        <view class="content-top white-block" @click="toSelfInfo">
			<view class="user-box">
				<view class="profile-box">
					<text class="icon">&#xe602;</text>
				</view>
				<view class="other-info">
					<view>{{userName}} {{trueName}}</view>
					<view>{{mobile}}</view>
				</view>
			</view>
			<view class="rank-box">
				{{rankName}}
			</view>
		</view>
		<view class="gap-height white-block">
			<view class="uni-list-cell block-height order-all-block" hover-class="uni-list-cell-hover" @click="toOrderList(0)">
				<text class="icon icon-red">&#xe65b;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					全部订单
				</view>
			</view>
			<view class="status-box">
				<view class="status-item" @click="toOrderList(1)">
					<text class="icon">&#xe697;</text>
					<view class="status-text">待付款</view>
					<uni-badge :text="waitPay" type="danger"></uni-badge>
				</view>
				<view class="status-item" @click="toOrderList(2)">
					<text class="icon">&#xe684;</text>
					<view class="status-text">待发货</view>
					<uni-badge :text="payed" type="danger"></uni-badge>
				</view>
				<view class="status-item" @click="toOrderList(3)">
					<text class="icon">&#xe619;</text>
					<view class="status-text">已发货</view>
					<uni-badge :text="shipping" type="danger"></uni-badge>
				</view>
				<view class="status-item" @click="toOrderList(4)">
					<text class="icon">&#xe701;</text>
					<view class="status-text">已完成</view>
					<uni-badge :text="finished" type="danger"></uni-badge>
				</view>
			</view>
			
		</view>
		<view class="gap-height white-block">
			<view class="uni-list-cell block-height item-block" hover-class="uni-list-cell-hover" @click="toModifyPsd(1)">
				<text class="icon icon-red">&#xe617;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					登录密码
				</view>
			</view>
			<view class="uni-list-cell block-height item-block" hover-class="uni-list-cell-hover" @click="toModifyPsd(2)">
				<text class="icon icon-green">&#xe617;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					安全密码
				</view>
			</view>
			<view class="uni-list-cell block-height item-block" hover-class="uni-list-cell-hover" @click="toAddressManage">
				<text class="icon icon-blue">&#xe616;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					地址管理
				</view>
			</view>
			<view class="uni-list-cell block-height item-block uni-list-cell-last" hover-class="uni-list-cell-hover" @click="toCardManage">
				<text class="icon icon-red">&#xe605;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					银行账号
				</view>
			</view>
		</view>
		<view class="gap-height white-block">
			<view class="uni-list-cell block-height item-block uni-list-cell-last" hover-class="uni-list-cell-hover" @click="toMessageCenter">
				<text class="icon icon-red">&#xe659;</text>
				<view class="uni-list-cell-navigate uni-navigate-right">
					公告消息
				</view>
			</view>
		</view>
		<view class="exist-button white-block" @click="exsit">
			退出
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge.vue";
	import {mapState,mapMutations} from 'vuex';
	export default {
		components:{
			uniBadge
		},
		computed: mapState(['token','hasLogin']),
		data() {
			return {
				userName: '',
				trueName:'',
				mobile:'',
				rankName:'',
				waitPay:'', //
				payed:'',
				shipping:'',
				finished:''
			}
		},
		onLoad() {
			this.getUserInfo();
			this.getOrderStatistics();
		},
		methods: {
			...mapMutations(['logout']),
			getUserInfo(){
				uni.request({
					url: this.websiteUrl + 'user/info',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'content-type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户信息成功："+JSON.stringify(res));
							var data = res.data;
							let userName = data.userName;
							let trueName = data.trueName;
							let mobile = data.mobile;
							let rank = data.rank;
							this.userName = userName;
							this.trueName = trueName;
							this.mobile = mobile;
							let rankName = this.customMethods.getRankName(rank);
							this.rankName = rankName;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getOrderStatistics(){
				uni.request({
					url: this.websiteUrl + 'user_order/order_statistics',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'content-type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户订单统计成功："+JSON.stringify(res));
							let waitPay = res.data.waitPay;
							let payed = res.data.payed;
							let shipping = res.data.shipping;
							let finished = res.data.finished;
							this.waitPay = waitPay;
							this.payed = payed;
							this.shipping = shipping;
							this.finished = finished;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toSelfInfo(){
				uni.navigateTo({
					url:'/pages/mycenter/user-info/user-info'
				})
			},
			toModifyPsd(passwordType){
				uni.navigateTo({
					url:'/pages/mycenter/password/password?passwordType=' + passwordType
				})
			},
			toAddressManage(){
				uni.navigateTo({
					url:'/pages/mycenter/address/address-manage/address-manage'
				})
			},
			toCardManage(){
				uni.navigateTo({
					url:'/pages/mycenter/card/card-manage/card-manage'
				})
			},
			toMessageCenter(){
				uni.navigateTo({
					url:'/pages/mycenter/message/message'
				})
			},
			toOrderList(status){
				uni.navigateTo({
					url:'/pages/mycenter/order/order-list?status='+status
				})
			},
			exsit(){
				this.customMethods.setState({});
				this.logout();
				console.log(this.hasLogin);
				uni.showLoading({
					title:'正在注销中...'
				})
				setTimeout(()=>{
					uni.showToast({
						icon: 'none',
						title: '注销成功',
						duration:2000,
						success:function(){
							uni.hideLoading();
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/login/login/login'
								})
							},1000);
						}
					});
				},1500)
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
		height: 100%;
	}
	.content {
		
	}
	.content-top {
		padding:30upx 24upx;
		position: relative;
	}
	.user-box {
		display: flex;
		align-items: center;
	}
	.profile-box {
		margin-right:30upx;
	}
	.profile-box .icon {
		font-size: 100upx;
		color:#2D97FA;
		/* color:#007AFF */
	}
	.other-info {
	}
	.other-info view {
		line-height: 1.8;
		font-size: 32upx;
	}
	.rank-box {
		position: absolute;
		right:0;
		bottom:80upx;
		width:120upx;
		height: 60upx;
		line-height: 60upx;
		background: linear-gradient(to left,#2D97FA,#007AFF);
		color:#fff;
		border-radius: 30upx 0 0 30upx;
		text-align: center;
		box-shadow: 0px 0px 30upx rgba(0,0,0,.3);
	}
	.uni-list-cell {
		padding-left:20upx;
	}
	.uni-list-cell-navigate {
		padding-left:10upx;
		font-size: 30upx;
	}
	.uni-list-cell-hover {
		background-color: #fafafa;
	}
	.uni-list-cell-navigate {
		font-size: 28upx;
	}
	.uni-list-cell:after {
		background-color:#eee;
	}
	.uni-list-cell .uni-navigate-right:after {
		color:#999;
		font-size: 36upx;
	}
	
	.order-all-block .icon {
		font-size: 30upx;
	}
	.item-block .icon {
		font-size: 36upx;
	}
	.status-box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		padding:30upx 0;
	}
	.status-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: relative;
		height: 86upx;
	}
	.status-item .icon {
		font-size: 40upx;
		line-height: 1;
	}
	.status-item .status-text {
		font-size: 30upx;
		line-height: 1.2;
	}
	.status-item .uni-badge {
		position: absolute;
		top:-16upx;
		right:30upx;
	}
	.exist-button {
		color:red;
		font-size: 32upx;
		text-align: center;
		padding:30upx 0;
		position: fixed;
		bottom:0;
		width:100%;
	}
</style>
