<template>
	<view class="content uni-tab-bar">
        <view class="selectbox">
        	<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" lower-threshold="20">
        		<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex == index?'active':'']" :id="'tabNum'+tab.id" :data-current="index" :data-catogory-id="tab.id" @tap="tabTab">
        			{{tab.name}}
        		</view>
        	</scroll-view>
        </view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in orderList" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore">
					<view class="goods-list">
						<block v-for="(item,index2) in tab.data" :key="index2">
							<view class="order-item">
								<view class="order-item-top">
									<view class="order-no">订单 {{item.orderSn}}</view>
									<view class="order-status">{{item.status == 0?'待付款':(item.status == 1?'待发货':(item.status == 2?'待收货':(item.status == 3?'已完成':(item.status == 4?'已取消':'已退货'))))}} <text class="icon">&#xe606;</text></view>
								</view>
								<block v-for="(good,index3) in item.goodsList" :key="index3">
									<view class="order-item-middle">
										<view class="img-box">
											<my-image :data="good.goodsPic" modeData="scaleToFill" />
										</view>
										<view class="details">
											<view class="goods-name overflow-ellipsis">{{good.goodsName}}</view>
											<view class="option-text">{{good.goodsOption ? good.goodsOption : ''}}</view>
											<view class="goods-datas">
												<view class="price">￥{{good.price}}</view>
												<view class="num">x{{good.total}}</view>
											</view>
										</view>
									</view>
								</block>
								
								<view class="order-item-bottom">
									<view class="btn-item grey-btn" @click="toOrderDetail(item.id)">查看详情</view>
									<view class="btn-item red-btn" v-if="item.status == 0" @click="toPayOrder(item.id,item.orderSn,item.payAmount)">支付订单</view>
									<view class="btn-item normal-btn" v-if="item.status == 0" @click="toCancelPay(item.id)">取消订单</view>
									<view class="btn-item red-btn" v-if="item.status == 2">确认收货</view>
								</view>
							</view>
						</block>
					</view>
					<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import mediaList from '@/components/media-list.vue';
	
	import myImage from '@/components/my-image.vue';
	var _self,timer = null,pageIndex=1;
	export default {
		components:{
			myImage,
			uniLoadMore,
			mediaList
		},
		data() {
			return {
				tabBars:[
					{id:0,name:'全部'},
					{id:1,name:'待付款'},
					{id:2,name:'待发货'},
					{id:3,name:'待收货'},
					{id:4,name:'已完成'},
				],
				tabIndex:0,
				statusList:[], //分类id
				// pageIndex:1,
				orderList:[],
				isClickChange:false,
				scrollLeft:0,
				classId:'',
				loadingType: 0,
				totalPage:1,
				pageSize:20,
				hasNextPage:false,
				loadingText: '加载中...',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		computed: mapState(['hasLogin', 'userName','token']),
		async onLoad(e) {
			if(e['status']) {
				this.tabIndex = e['status']
			}
		},
		async onShow(){
			_self = this;
			this.orderList = [];
			this.loadOrderList();
		},
		methods: {
			async loadOrderList(){
				for(let i = 0;i < 5;i++){
					await this.getOrderLists(i);
				}
			},
			toOrderDetail(orderId){
				uni.navigateTo({
					url:'/pages/mycenter/order/order-detail/order-detail?orderId='+orderId+'&status='+this.tabIndex
				})
			},
			toPayOrder(orderId,orderSn,payAmount){
				console.log(orderId,orderSn,payAmount);
				uni.navigateTo({
					url:'/pages/shops/shop-cashier/shop-cashier?orderId='+orderId+'&orderSn='+orderSn+'&payAmount='+payAmount
				})
			},
			toCancelPay(orderId){
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
									orderId:orderId
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
												that2.orderList = [];
												that2.loadOrderList();
											}
										});
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			ajaxRequest(url,obj){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:this.websiteUrl+url,
						data:obj,
						method: 'POST',
						dataType:'json',//服务器返回json格式数据
						header:{'Content-Type':'application/json','Token':this.token},
						success:(result)=>{
							resolve(result.data)
						},
						fail:(e)=>{
							reject(e)
						}
					})
				})
			},
			async getOrderLists(status){
				var data = {
					status: status,
					pageIndex:pageIndex,
					pageSize:this.pageSize
				}
				let res = await this.ajaxRequest('user_order/order_list',data)/* .then((data)=>{
					console.log('获取订单列表成功',data);
					
				}) */
				// this.orderList.push();
				let orderList = this.orderList;
				orderList.push({'data':res.data.list});
				this.orderList = orderList;
				this.hasNextPage = res.data.hasNextPage;
				if(!res.hasNextPage){
					_self.loadingType = 2;
				}
				uni.hideNavigationBarLoading();
			},
			
			getMoreOrderList(){
				/* if(_self.loadingType != 0){
					return false;
				} */
				// _self.loadingType = 1;
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'user_order/order_list',
					method: 'POST',
					data:{
						status: this.tabIndex,
						pageIndex:pageIndex,
						pageSize:this.pageSize
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							var list = res.data.list;
							var data = res.data;
							if(data == null){
								_self.loadingType = 2;
								uni.hideNavigationBarLoading();
								return;
							}
							_self.orderList = _self.goodsList[_self.tabIndex].concat(list);
							// _self.goodsList = _self.goodsList.concat(list);
							_self.loadingType = 0;
							this.hasNextPage = data.hasNextPage;
							uni.hideNavigationBarLoading();
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getElSize(id){ //得到元素的size
				return new Promise((res,rej)=>{
					uni.createSelectorQuery().select("#" + id).fields({
						size:true,
						scrollOffset:true,
					},(data)=>{
						res(data);
					}).exec();
				})
			},
			async loadMore(){
				console.log('加载',pageIndex,_self.hasNextPage)
				pageIndex++;
				_self.loadingType = 1;
				if(_self.hasNextPage){
					_self.getMoreOrderList();
					
				}else {
					_self.loadingType = 2;
				}
			},
			async tabTab(e){  //点击tabbar
				pageIndex = 1;
				console.log(e)
				// console.log(e.target.dataset.catogoryId)
				if(this.tabIndex === e.target.dataset.current){
					return false;
				}else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft;  //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
				}
			},
			async changeTab(e){
				 let index = e.target.current;
				pageIndex = 1;
				this.setScrollLeft(index);
				this.tabIndex = index;
				/*this.classId = this.catagoryIdList[index]
				this.getGoodsList();
                this.tabIndex = index; */ //一旦访问data就会出问题
				
			},
			async setScrollLeft(tabIndex){  //设置swiper滑动时顶部tab随着滑动
				let leftWidthSum = 0;
				for(let i = 0;i <= tabIndex;i++){
					let nowElement = await this.getElSize('tabNum'+this.tabBars[i].id);
					leftWidthSum = leftWidthSum + nowElement.width;
					// console.log(nowElement)
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth?(leftWidthSum - winWidth) : 0;
			},
			goDetail(item){
				uni.navigateTo({
                    url: '/pages/shops/shop-goods-detail/shop-goods-detail?data-goods-id=' + item.id+'&data-goods-optionId=' + item.optionId
                })
			},
			toShopCartList(){
				uni.navigateTo({
				    url: '/pages/shops/shop-cart-list/shop-cart-list'
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
	  height: 100%;
	}
	.content {
		height: 100%;
	}
    .header {
	  width:100%;
	  position: fixed;
	  top:0;
	  background: #fff;
	  z-index: 100;
	}
	
	.selectbox {
	  width: 100%;
	  height: 80upx;
	}
	.scroll-row {
	  display: flex;
	  white-space: nowrap;
	}
	.selectbox .option.active{
	  color: #007aff;/*f5565a*/
	  /*border-bottom: 2px solid #007aff;*/
	  box-sizing: border-box;
	}

	.main-content {
	  width:100%;
	  position:absolute;
	  top:80upx;
	  bottom:0;
	  background:#fff;

	}
	.goods-list {
	  width:100%;
	  display: flex;
	  align-items: center;
	  flex-wrap:wrap;
	  overflow: hidden;
	}
	
	.uni-tab-bar {
		/* padding-top:80upx; */
	}
	.uni-swiper-tab {
		border: none;
		/* position: fixed; */
	}
	.swiper-tab-list {
		padding:0 34upx;
		width:100upx;
		box-sizing: content-box;
	}
	.uni-tab-bar .swiper-box {
		padding-top:0;
		height: auto;
	}
	.order-item {
		padding:30upx 24upx;
		width:100%;
		position: relative;
	}
	.order-item::after {
		content:"";
		display: block;
		height: 2upx;
		position: absolute;
		bottom:0;
		left:20upx;
		right:0;
		background-color: #eee;
	}
	.order-item-top {
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order-status {
			color:#db4c3f;
		}
		.icon {
			font-size: 30upx;
			color:#999;
			margin-left:6upx;
		}
	}
	.order-item-middle {
		display: flex;
		align-items: center;
		
		.img-box {
			width:180upx;
			height: 180upx;
			margin:20upx 30upx;
			margin-left:0;
			image {
				width:100%;
				height: 100%
			}
		}
		.details {
			height: 180upx;
			width:460upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 30upx;
			}
			
			.goods-datas {
				display: flex;
				align-items: center;
				height: 66upx;
				justify-content: space-between;
				.price {
					font-size: 32upx;
					color:#db4c3f;
					font-weight: bold;
				}
				.num {
					font-size: 28upx;
					color:#666;
				}
			}
		}
	}
	.order-item-bottom {
		margin-top:20upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.btn-item {
			height: 56upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			margin-right:20upx;
			border-radius: 10upx;
			border-style: solid;
			border-width: 2upx;
			padding:0 16upx;
		}
		.grey-btn {
			color:#666;
			border-color:#666;
		}
		.red-btn {
			color:#db4c3f;
			border-color:#db4c3f;
		}
		.normal-btn {
			color:#333;
			border-color:#333;
		}
	}
</style>
