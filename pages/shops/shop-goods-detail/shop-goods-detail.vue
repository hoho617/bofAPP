<template>
	<view class="uni-tab-bar">
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
                :id="tab.id" :data-current="index" @tap="tapTab">
								{{tab.name}}
							</view>
        </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item v-for="(tab,index1) in tabsitem" :key="index1">
                <scroll-view class="list" scroll-y v-if="index1 === 0">
                    <view class="slider">
						<swiper class="swiper" :autoplay="autoplay" :duration="duration">
							<block v-for="(item,index) in swiperList" :key="index">
								<swiper-item>
									<view class="swiper-item">
										<my-image :data="item" />
									</view>
								</swiper-item>
							</block>
						</swiper>
						<view class="goods-intro">
							<view class="goods-name">
								{{goodsName}}
							</view>
							<view class="goods-data">
								<view class="left-price">
									<text class="discount-price">{{price}}.00</text>
									<text class="origin-price">{{marketPrice}}.00</text>
								</view>
								<view class="right-amount">
									<text>库存:{{stock}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="gap-height row-block">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="showOptionBox">
							<view class="uni-list-cell-navigate uni-navigate-right">
								已选一份   请选择
							</view>
						</view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right">
								自提点
							</view>
						</view>
					</view>
					<view class="gap-height row-block">
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover" @click="toGoodDetail">
							<view class="uni-list-cell-navigate uni-navigate-right">
								商品详情
							</view>
						</view>
					</view>
                </scroll-view>
				<scroll-view class="list memo-list" scroll-y v-if="index1 === 1">
					<block v-for="(newsitem,index2) in tab.data" :key="index2">
							<wxParse :content="memo" @preview="preview" @navigate="navigate" />
						<!-- <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list> -->
					</block>
				</scroll-view>
            </swiper-item>
        </swiper>
		<view class="fixed-bottom">
			<view class="shopcar-left" @click="gotoShopCartList">
				<view class="top-icon"><text class="icon" @tap="toShopCar">&#xe607;</text><uni-badge :text="totalNumber" type="danger"></uni-badge></view>
				<text class="bottom-txt">购物车</text>
			</view>
			<view class="btns-group">
				<view class="yellow-btn" @click="addToCart">加入购物车</view>
				<view class="red-btn" @click="goLinks">立即购买</view>
			</view>
		</view>
		
		<!-- 选择商品属性弹框 -->
		<view class="popover-box" v-if="isShowOption"></view>
		<view class="popover-inner" :animation="animationData">
			<view class="head-close" @click="closeOptionBox"><text class="icon">&#xe732;</text></view>
			<view class="scroll-goods">
				<scroll-view scroll-y style="height: 100%;">
					<view class="goods-detail">
						<view class="goods-img">
							<image :src="imgUrl" />
						</view>
						<view class="goods-poperty">
							<view class="inner-goods-name overflow-ellipsis">{{goodsName}}</view>
							<view class="inner-goods-price">
								￥<text>{{price}}.00</text>元,市场价 <text class="uni-text-small">￥{{marketPrice}}.00</text>元
							</view>
							<view class="inner-gooods-amount">库存: {{stock}}</view>
						</view>
					</view>
					<view class="amount-box">
						<view class="left-txt pull-left">数量</view>
						<view class="right-operate pull-right">
							<uni-number-box :min="1" :value="goodNum" @change="onNumberChange"></uni-number-box>
						</view>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		<!-- 只能消费一次 -->
		<view class="my-popover" v-if="isShowFirst">
		 	尊敬的会员：您当前消费券只能全额购买一次,敬请使用。
		 	<view class="close-show" @click="closePopover">知道了</view>
		</view>
		<!-- <view :animation="animationData" style="background:red;height:100upx;width:100upx"></view> -->
    </view>
</template>

<script>
	import uniBadge from "@/components/uni-badge.vue";
	import uniNumberBox from '@/components/uni-number-box.vue';
	import myImage from '@/components/my-image.vue';
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import marked from '../../../components/marked'
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
			uniBadge,
			uniNumberBox,
			myImage,
			wxParse
		},
		data() {
			return {
				tabIndex:0,
				tabBars:[{
					id:'tabNum1',
					name:'商品'
				},{
					id:'tabNum2',
					name:'详情'
				}],
				tabsitem:[
					{data:['','','','',]},
					{data:['','','','',]}
				],
				swiperList:[],
				animationData: {},
				isShowOption:false,
				isShowFirst:false,
				goodsName:'',
				price:'',
				marketPrice:'',
				stock:'',
				imgUrl:'',
				memo:'',
				totalNumber:'', //购物车数量
				goodNum:1, //默认商品数量
				goodsId:'',
				optionId:''
			}
		},
		computed: mapState(['token']),
		onShow(){
			this.getShopcar();
		},
		onLoad(e) {
			if(e['data-goods-id']) {
				console.log(e);
				var goodsId = e['data-goods-id'];
				var optionId = e['data-option-id'];
				this.goodsId = goodsId;
				this.optionId = optionId;
			}
			this.isFirst();
			this.loadPagingData(goodsId)
		},
		methods: {
			isFirst(){ //是否为第一次消
				uni.request({
					url: this.websiteUrl + 'user/is_first_time',
					method: 'POST',
					data:{
						type: 1
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取是否为第一次消费成功："+JSON.stringify(res));
							let isFirstTime = res.data;
							if(isFirstTime == 0){
								this.isShowFirst = true;
								this.isShowOption = true;
							}
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			closePopover(){
				this.isShowFirst = false;
				this.isShowOption = false;
			},
			loadPagingData(goodsId){
				uni.request({
					url: this.websiteUrl + 'shop/goods_detail',
					method: 'POST',
					data:{
						id: goodsId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取商品信息成功："+JSON.stringify(res));
							var data = res.data;
							var goodsName = data.goodsName;
							var price = data.price;
							var marketPrice = data.marketPrice;
							var stock = data.stock;
							var sliders = data.goodsPics.split(',');
							var imgUrl = this.getImageUrl(sliders[0]);
							var memo = this.customMethods.escape2Html(data.memo);
							this.goodsName = goodsName;
							this.price = price;
							this.marketPrice = marketPrice;
							this.stock = stock;
							this.imgUrl = imgUrl;
							this.swiperList = sliders;
							this.memo = marked(memo);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getShopcar(){ //获取购物车数量
				uni.request({
					url: this.websiteUrl + 'shop/cart_goods_count',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取购物车数量成功："+JSON.stringify(res));
							var data = res.data;
							let totalNumber = data.totalNumber?data.totalNumber:0;
							console.log(totalNumber)
							this.totalNumber = totalNumber;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			addToCart(){
				if(this.optionId == "undefined"){this.optionId=null;}
				uni.request({
					url: this.websiteUrl + 'shop/goods_add_to_cart',
					method: 'POST',
					data:{
						goodsId:this.goodsId,
						count:this.goodNum,
						optionId:this.optionId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("加入购物车成功："+JSON.stringify(res));
							var that = this;
							this.optionId = null;
							var msg = '加入购物车成功';
							uni.showToast({
								icon: 'success',
								title: '加入购物车成功',
								duration:2000,
								success:function(){
									that.getShopcar();
									that.animationOptionBox('100%',false);
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goLinks(){
				if(this.optionId == "undefined"){this.optionId=null;}
				uni.request({
					url: this.websiteUrl + 'shop/goods_add_to_cart',
					method: 'POST',
					data:{
						goodsId:this.goodsId,
						count:this.goodNum,
						optionId:this.optionId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("加入购物车成功："+JSON.stringify(res));
							var that = this;
							this.optionId = null;
							var msg = '加入购物车成功';
							uni.showToast({
								icon: 'success',
								title: '加入购物车成功',
								duration:2000,
								success:function(){
									that.gotoShopCartList()
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoShopCartList(){
				uni.navigateTo({
				    url: '/pages/shops/shop-cart-list/shop-cart-list'
				})
			},
			onNumberChange(value){
				this.goodNum = value; 
			},
			showOptionBox(){
				this.animationOptionBox(0,true)
			},
			closeOptionBox(){
				this.animationOptionBox('100%',false)
			},
			animationOptionBox(distance,flag){
				var animation = uni.createAnimation({
					duration:300,
					timingFunction:'ease'
				})
				this.animation = animation;
				animation.translateY(distance).step();
				this.animation = animation.export();
					
				setTimeout(()=>{
					animation.translateY(distance).step();
					this.isShowOption = flag;
					this.animationData = animation.export()
				},200)
			},
			async tapTab(e){
				let index = e.target.dataset.current;
				if(this.tabIndex == index) {
					return false;
				}else {
					this.tabIndex = index;
				}
			},
			changeTab(e){
				let index = e.target.current;
				this.tabIndex = index;
			},
			toGoodDetail(){
				this.tabIndex = 1;
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
	


	.uni-tab-bar {
		/* padding-top:80upx; */
	}
	.uni-swiper-tab {
		border: none;
		height: 92upx;
		line-height: 92upx;
	}
	.swiper-tab-list {
		width:50%;
		color:#222;
		position: relative;
		padding-bottom:10upx;
	}
	.swiper-tab-list.active:after {
		content:'';
		display: block;
		width:36%;
		height: 4upx;
		background-color: #db4c3f;
		position: absolute;
		bottom:0;
		left:50%;
		transform: translateX(-50%);
	}
	.uni-tab-bar .swiper-tab-list.active {
		/* border-bottom: 4upx solid #db4c3f; */
		color:#db4c3f;
	}
	.uni-tab-bar .swiper-box {
		
	}
	.uni-tab-bar .active{
		
	}
	
	.slider {
		background-color: #fff;
	}
	.slider .swiper {
		height: 750upx;
	}
	.uni-tab-bar .swiper-box {
		position: absolute;
		bottom:112upx;
		top:92upx;
		left:0;
		right:0;
		height: auto;
	}
	.slider .swiper .swiper-item {
		height: 750upx;
		display: flex;
		align-items: center;
	}
	.slider .swiper image{
		width:100%;
	}
	.goods-intro {
		padding:24upx;
	}
	.goods-name {
		font-size: 30upx;
		margin-bottom: 16upx;
	}
	.goods-data {
		height: 48upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left-price {
		
	}
	.discount-price {
		font-size: 30upx;
		color:#db4c3f;
	}
	.origin-price {
		text-decoration: line-through;
		font-size: 24upx;
		color:#999;
		margin-left:10upx;
	}
	.right-amount {
		font-size: 28upx;
		color:#666;
	}
	.gap-height {
		margin-top:16upx;
	}
	.row-block {
		background-color: #fff;
	}
	.uni-list-cell-hover {
		background-color: #f9f9f9;
	}
	.uni-list-cell-navigate {
		font-size: 28upx;
	}
	.uni-list-cell .uni-navigate-right:after {
		color:#999;
		font-size: 36upx;
	}
	
	
	
	
	
	.fixed-bottom {
		position: fixed;
		bottom: 0;
		left:0;
		right:0;
		height: 112upx;
		display: flex;
		align-items: center;
		padding-top:10upx;
		border-top: 2upx solid #eee;
		background-color: #f4f4f4;
		z-index: 111;
		box-sizing: border-box;
	}
	.shopcar-left {
		flex: 1;
		background-color: #fff;
		text-align: center;
	}
	.top-icon {
		position: relative;
		width:60upx;
		margin:0 auto;
		height: 60upx;
	}
	.top-icon .icon {
		font-size: 52upx;
		color:#999;
	}
	.top-icon .uni-badge {
		position: absolute;
		right:-16upx;
		top:6upx;
	}
	.bottom-txt {
		font-size: 26upx;
		color:#222;
	}
	.btns-group {
		flex: 5;
		display: flex;
		align-items: center;
		height: 100%;
	}
	.btns-group view {
		flex: 1;
		color:#fff;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}
	.yellow-btn {
		background-color: #f2a12e;
	}
	.red-btn {
		background-color: #db4c3f;
	}
	
	
	.popover-box {
		position: fixed;
		bottom:0;
		top:0;
		left:0;
		right:0;
		background-color: rgba(0,0,0,.4);
		z-index:99;
	}
	.popover-inner {
		position: fixed;
		bottom:112upx;
		/* height: 600upx; */
		height: 540upx;
		left:0;
		right:0;
		background-color: #fff;
		z-index:100;
		transform: translateY(100%);
	}
	.head-close {
		text-align: right;
		color:#666;
		padding-right:20upx;
	}
	.head-close .icon {
		font-size: 40upx;
	}
	
	.scroll-goods {
		position: absolute;
		top:80upx;
		bottom:0;
		left:0;
		right:0;
	}
	.goods-detail {
		display: flex;
		padding:20upx 24upx;
	}
	.goods-img {
		margin-right:20upx;
	}
	.goods-img image {
		width:220upx;
		height: 220upx;
		border:2upx solid #eee;
	}
	.goods-poperty {
		width:460upx;
		height: 220upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.goods-poperty .inner-goods-name {
		width:100%;
		height: 40upx;
		font-size: 28upx;
	}
	.inner-goods-price {
		color:#db4c3f;
		font-size: 30upx;
	}
	.inner-gooods-amount {
		font-size: 28upx;
		color:#666;
	}
	.amount-box {
		border-top:2upx solid #efefef;
		padding:40upx 24upx 0;
		font-size: 26upx;
		color:#333;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.memo-list{
		width:96% !important;
		margin:0 auto;
	}
	.memo-list image {
		width:100%;
		height: auto;
		display: block;
	}
</style>
