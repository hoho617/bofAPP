<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="address-box white-block border-bottom">
					<view class="address-box-left">
						<view class="address-top">
							<view class="status-name pull-left">{{status == 0?'待付款':(status == 1?'待发货':(status == 2?'待收货':(status == 3?'已完成':(status == 4?'已取消':'已退货'))))}}</view>
						</view>
						<view class="address-bottom">订单金额(含运费):￥{{orderAmount}}</view>
					</view>
					<view class="right-icon icon">{{status == 0?'&#xe60d;':(status == 1?'&#xe6cc;':(status == 2?'&#xe626;':(status == 3?'&#xe610;':(status == 4?'&#xe608;':'&#xe629;'))))}}</view>
				</view>
				<view class="address-box white-block">
					<view class="address-box-left">
						<view class="address-top">
							<view class="user-name pull-left">{{realname}}</view>
							<view class="user-mobile pull-right">{{mobile}}</view>
						</view>
						<view class="address-bottom">{{address}}</view>
					</view>
					<!-- <view class="right-arrow icon">&#xe606;</view> -->
				</view> 
				<view class="border-img" style="background-image: url(/static/border.png);"></view>
				<view class="shopcar-list">
					<block v-for="(item,index) in goodsList" :key="index">
						<view class="shopcar-item">
							<view class="goods-detail">
								<view class="goods-img">
									<my-image :data="item.goodsPic" modeData="scaleToFill"></my-image> <!-- :src="imgUrl" -->
								</view>
								<view class="goods-intro">
									<view class="goods-name overflow-ellipsis">{{item.goodsName}}</view>
									<view class="option-text">{{item.goodsOption ? item.goodsOption : ''}}</view>
									<view class="data-num">
										<view class="price pull-left">
											<text class="bold-font">￥{{item.price}}.00</text></text>
										</view>
										<view class="right-operate pull-right">
											x {{item.total}}
										</view>
									</view>
								</view>
							</view>
							
						</view>
					</block>
					<view class="row-data white-block">
						<view>共<text class="margin-small">{{allNum}}</text>件商品  合计:  <text class="margin-small">￥{{allPrice}}.00</text></view>
					</view>
				</view>
				<view class="row-total white-block">
					<view class="left-txt">商品小计</view>
					<view class="right-data">￥{{allPrice}}.00</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer" v-if="status == 0" >
			<view class="count-left yellow-btn" @click="cancelOrder">
				取消订单
			</view>
			<view class="count-right red-btn" @click="submitOrder">支付订单</view>
		</view>
		<view class="fixed-footer" v-if="status == 2">
			<view class="count-right red-btn" @click="receiptOrder">确认收货</view>
		</view>
	</view>
	
	
</template>

<script>
	import myImage from '@/components/my-image.vue';
	import {mapState,mapMutations} from 'vuex';
	var area = require('../../../../common/area.js');
	export default {
		components: {
			myImage
		},
		data() {
			return {
				goodsList:[],
				pageIndex:1,
				pageSize:10,
				addressId:'', //地址ID
				realname:'',
				mobile:'',
				address:'',
				allPrice:'',
				allNum:'',
				status:'',
				orderAmount:'',
				orderId:'',
				orderSn:''
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
			var that = this;
			this.$eventHub.$on('fire', function (data) {
				that.addressId = data;
				console.log('data',data)
			});
			
		},
		async onLoad(e) {
			if(e['orderId']){
				let orderId = e['orderId'];
				let status = e['status'];
				this.orderId = orderId;
				console.log(orderId,status);
				this.getOrderDetail(orderId,status);
			}
			
		},
		methods: {
			getOrderDetail(orderId,status){
				uni.request({
					url: this.websiteUrl + 'user_order/order_detail',
					method: 'POST',
					data:{
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						status: status,
						orderId: orderId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户详情成功："+JSON.stringify(res.data));
							let status = res.data.status;
							 let data = res.data;
							let orderAmount = data.orderAmount;
							this.status = status;
							this.orderAmount = orderAmount;
							let arrObj = area.getAddress(data.addressObj.province,data.addressObj.city,data.addressObj.area);
							let address = arrObj.province +' '+ arrObj.city +' '+ arrObj.area +' '+ data.addressObj.address;
							let realname = data.addressObj.realname;
							let mobile = data.addressObj.mobile;
							let goodsList = data.goodsList;
							this.addressId = data.addressObj.id;
							this.realname = realname;
							this.mobile = mobile;
							this.address = address; /**/
							this.goodsList = goodsList;
							this.orderSn = data.orderSn;
							this.countAllPrice(goodsList);
							this.countAllNum(goodsList);
						}else {
							// this.loadAddressList();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			cancelOrder(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '您确认要取消该订单吗？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.request({
								url: that.websiteUrl + 'shop/order_cancel',
								method: 'POST',
								data:{
									orderId:that.orderId
								},
								dataType:'json',//服务器返回json格式数据
								header:{'Content-Type':'application/json','Token':that.token},
								success: res => {
									var res = res.data;
									if(res.code == 200){
										console.log("取消订单成功："+JSON.stringify(res));
										var that2 = that;
										uni.showToast({
											icon: 'success',
											title: '取消订单成功',
											duration:2000,
											success:function(){
												uni.navigateBack({
													delta:1
												})
											}
										});
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			submitOrder(){
				uni.navigateTo({
					url:'/pages/shops/shop-cashier/shop-cashier?orderId='+this.orderId+'&orderSn='+this.orderSn+'&payAmount='+this.orderAmount
				})
			},
			countAllPrice(list){  //合计
				let allPrice = 0;
				list.forEach((item,inde)=>{
					let itemPrice = parseFloat(item.price);
					let num = item.total;
					let itemAllPrice = itemPrice * num;
					allPrice += itemAllPrice;
				})
				this.allPrice = allPrice;
			},
			countAllNum(list){
				let allNum = 0;
				list.forEach((item,inde)=>{
					let num = item.total;
					allNum += num;
				})
				this.allNum = allNum;
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
	.address-box {
		padding:30upx 24upx;
		display: flex;
		align-items: center;
	}
	.address-box-left {
		width:90%;
		margin-right:20upx;
	}
	.right-arrow {
		font-size: 46upx;
	}
	.right-icon {
		font-size: 52upx;
		color:#d81e06;
	}
	.address-top {
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.border-bottom {
		border-bottom: 2upx solid #eee;
	}
	.status-name {
		font-size: 32upx;
	}
	.border-img {
		width:100%;
		height: 6upx;
		background-repeat: repeat-x;
		background-size: 160upx 6upx;
		background-position: left bottom;
	}
	.list-inner {
		position: relative;
		overflow: hidden;
		height: 212upx;
	}
	.shopcar-list {
		border-bottom: 2upx solid #eee;
	}
	.shopcar-item {
		display: flex;
		align-items: center;
		padding:26upx 24upx;
		background-color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.shopcar-item:after {
		content:"";
		display: block;
		position: absolute;
		bottom:0;
		left:20upx;
		right:0;
		height: 2upx;
		background-color: #eee;
	}
	.shopcar-item:last-child:after{
		display: none;
	}
	.goods-detail {
		/* position: relative; */
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.goods-img {
		width:160upx;
		height: 160upx;
		margin-right:24upx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border:2upx solid #f5f5f5;
	}
	.goods-img image {
		width:100%;
		height: 100%;
	}
	.goods-intro {
		line-height: 1;
		width:500upx;
		height: 160upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.goods-name {
		color:#333;
		font-weight: bold;  
		width:100%;
		height: 40upx;
		font-size: 28upx;
	}
	.data-num {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width:100%;
	}
	.price .bold-font {
		color:#db4c3f;
		font-size: 30upx;
		font-weight: bold;
	}
	.right-operate {
		font-size: 26upx;
		color:#666;
	}
	.stock {
		font-size: 24rpx;
	}
	.row-data {
		height: 72upx;
		text-align: right;
		padding:0 24upx;
		font-size: 30upx;
		line-height: 72upx;
	}
	.row-data text {
		font-size: 24upx;
		color:#DB4C3F
	}
	.row-total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:28upx 24upx;
	}
	.row-total .left-txt {
		font-size: 28upx;
	}
	.row-total .right-data {
		font-size: 24upx;
	}
	.fixed-footer {
		position: fixed;
		bottom:0;
		width:100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding-top:14upx;
		box-sizing: border-box;
	}
	.count-left {
		flex: 1;
		background-color: #f2a12e;
		color:#fff;
		font-size: 30upx;
		line-height: 82upx;
		height: 82upx;
		text-align: center;
	}
	.count-right {
		flex: 1;
		background-color: #db4c3f;
		color:#fff;
		font-size: 30upx;
		line-height: 82upx;
		height: 82upx;
		text-align: center;
	}

	
	
	/* 计数器 */
	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 60upx;
		position: relative;
	}
	
	.uni-numbox::after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border: 1px solid #c8c7cc;
		transform: scale(.5);
	}
	
	.uni-numbox-minus,
	.uni-numbox-plus {
		margin: 0;
		background-color: #fafafa;
		width: 60upx;
		height: 100%;
		line-height: 60upx;
		text-align: center;
		color: #555555;
		position: relative;
		font-size: 32upx;
	}
	
	.uni-numbox-minus {
		border-right: none;
		border-top-left-radius: 6upx;
		border-bottom-left-radius: 6upx;
	}
	
	.uni-numbox-plus {
		border-left: none;
		border-top-right-radius: 6upx;
		border-bottom-right-radius: 6upx;
	}
	
	.uni-numbox-value {
		position: relative;
		background-color: #ffffff;
		width: 80upx;
		height: 100%;
		line-height: 60upx;
		text-align: center;
	}
	
	.uni-numbox-value::after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-style: solid;
		border-color: #cccccc;
		border-left-width: 1px;
		border-right-width: 1px;
		border-top-width: 0;
		border-bottom-width: 0;
		transform: scale(.5);
	}
	
	.uni-numbox-disabled {
		color: #c0c0c0;
	}
</style>
