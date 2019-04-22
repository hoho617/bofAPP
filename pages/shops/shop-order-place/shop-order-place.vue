<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="address-box white-block" @click="toAddressManage">
					<view class="address-box-left">
						<view class="address-top">
							<view class="user-name pull-left">{{realname}}</view>
							<view class="user-mobile pull-right">{{mobile}}</view>
						</view>
						<view class="address-bottom">{{address}}</view>
					</view>
					<view class="right-arrow icon">&#xe606;</view>
				</view> 
				<view class="border-img" style="background-image: url(/static/border.png);"></view>
				<view class="shopcar-list">
					<block v-for="(item,index) in shopcarList" :key="index">
						<view class="shopcar-item">
							<view class="goods-detail">
								<view class="goods-img">
									<my-image :data="item.shopGoods.goodsPics" modeData="scaleToFill"></my-image> <!-- :src="imgUrl" -->
								</view>
								<view class="goods-intro">
									<view class="goods-name overflow-ellipsis">{{item.shopGoods.goodsName}}</view>
									<view class="option-text">{{item.optionText ? item.optionText : ''}}</view>
									<view class="data-num">
										<view class="price pull-left">
											<text class="bold-font">￥{{item.shopGoods.price}}.00</text></text>
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
		<view class="fixed-footer">
			<view class="count-left">
				
				<view class="total-price">
					合计: <text class="red-font bold-font">￥{{allPrice}}.00</text>
				</view>
			</view>
			<view class="count-right" @click="submitOrder">立即结算</view>
		</view>
	</view>
	
	
</template>

<script>
	import myImage from '@/components/my-image.vue';
	import {mapState,mapMutations} from 'vuex';
	var area = require('../../../common/area.js');
	export default {
		components: {
			myImage
		},
		data() {
			return {
				shopcarList:[],
				shopcart:[],
				pageIndex:1,
				pageSize:50,
				addressId:'', //地址ID
				realname:'',
				mobile:'',
				address:'',
				allPrice:'',
				allNum:''
				
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
			if(this.addressId){
				this.getDetailAddress(this.addressId);
			}else {
				this.loadDefaultAddress();
			}
			
		},
		async onLoad() {
			let placeList = await uni.getStorageSync('placeList');
			console.log('placeList',placeList)
			this.shopcarList = placeList;
			this.countAllPrice(placeList);
			this.countAllNum(placeList);
			
		},
		methods: {
			loadDefaultAddress(){
				uni.request({
					url: this.websiteUrl + 'user/default_address',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户默认地址成功："+JSON.stringify(res.data));
							let data = res.data;
							let arrObj = area.getAddress(data.province,data.city,data.area);
							let address = arrObj.province +' '+ arrObj.city +' '+ arrObj.area +' '+ data.address;
							let realname = data.realname;
							let mobile = data.mobile;
							this.addressId = data.id;
							this.realname = realname;
							this.mobile = mobile;
							this.address = address;
						}else {
							this.loadAddressList();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadAddressList(){ //获取用户地址列表
				uni.request({
					url: this.websiteUrl + 'user/address_list',
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
							this.getDetailAddress(addressId);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getDetailAddress(addressId){ //获取用户地址列表
				uni.request({
					url: this.websiteUrl + 'user/address_detail',
					method: 'POST',
					data:{
						id:addressId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取第一个地址成功："+JSON.stringify(res.data));
							let data = res.data;
							let arrObj = area.getAddress(data.province,data.city,data.area);
							let address = arrObj.province +' '+ arrObj.city +' '+ arrObj.area +' '+ data.address;
							let realname = data.realname;
							let mobile = data.mobile;
							this.realname = realname;
							this.mobile = mobile;
							this.address = address;
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toAddressManage(){ //mode==1代表是要去选择地址
				uni.navigateTo({
				    url: '/pages/mycenter/address/address-manage/address-manage?mode=1'
				})
			},
			countAllPrice(list){  //合计
				let allPrice = 0;
				list.forEach((item,inde)=>{
					let itemPrice = parseFloat(item.shopGoods.price);
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
			},
			submitOrder(){
				let addressId = this.addressId;
				let amount = this.allPrice;
				let cartIds = [];
				this.shopcarList.forEach((item)=>{
					cartIds.push(item.id);
				})
				console.log(addressId,amount,cartIds);
// 				uni.navigateTo({
// 					url:'/pages/shops/shop-cashier/shop-cashier?type=place'
// 				})	
				uni.request({
					url: this.websiteUrl + 'shop/order_submit',
					method: 'POST',
					data:{
						addressId:addressId,
						amount:amount,
						cartIds:cartIds,
						memo:''
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("提交订单成功："+JSON.stringify(res.data));
							let data = res.data;
							uni.showToast({
								icon: 'success',
								title: '下单成功!',
								duration:2000,
								success:function(){
									setTimeout(()=>{
										uni.navigateTo({
											url:'/pages/shops/shop-cashier/shop-cashier?orderId='+data.orderId+'&orderSn='+data.orderSn+'&payAmount='+data.totalPrice
										})	
									},1500)
									
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
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
	.address-top {
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		display: flex;
		flex: 2;
		padding-left:24upx;
		padding-right:24upx;
		align-items: center;
		justify-content: flex-end;
	}
	.total-price {
		font-size: 30upx;
		color:#333;
	}
	.total-price .red-font {
		color:#db4c3f;
		font-size: 26upx;
		font-weight: bold;
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
