<template>
	<view class="content-page">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="padding-box">
					<view class="container_of_slide" v-for="(item,index) in shopcarList" :key="index">
						<view class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)"
						 @tap="recover(index)" :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}">
							<view class="now-message-info" :style="{width:Screen_width+'px'}">
								<view class="select-btn" :data-id="item.id" @click="selectGoods">
									<image src="/static/selected.png" v-if="item.selected" />
									<image src="/static/select.png" v-else />
								</view>
								<view class="centerInfo">
									<view class="goods-img" @click="toGoodsDetail(item)">
										<!-- <image src="/static/loginBg.png" /> -->
										<my-image :data="item.shopGoods.goodsPics"></my-image> <!-- :src="imgUrl" -->
									</view>
									<view class="goods-intro">
										<view class="goods-name overflow-ellipsis">{{item.shopGoods.goodsName}}</view>
										<view class="option-text">{{item.optionText ? item.optionText : ''}}</view>
										<view class="data-num">
											<view class="price pull-left">
												<text class="bold-font">￥{{item.shopGoods.price}}.00</text></text>
											</view>
											<view class="right-operate pull-right">
												<!-- <uni-number-box :min="1" :value="item.total" @change="onNumberChange"></uni-number-box> -->
												<view class="uni-numbox">
													<view class="uni-numbox-minus" :data-id="item.id" data-type="subtract" :class="{'uni-numbox-disabled': disableSubtract}" @click="_calcValue">-</view>
													<!-- <input class="uni-numbox-value" type="number" :disabled="disabled" :value="item.total" @blur="_onBlur"> -->
													<view class="uni-numbox-value">{{item.total}}</view>
													<view class="uni-numbox-plus" :data-id="item.id" data-type="add" :class="{'uni-numbox-disabled': disableAdd}" @click="_calcValue">+</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="group-btn">
								<view class="removeM" @tap="deleteItem(item.id)">
									删除
								</view>
							</view>
							<view style="clear:both"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="count-left">
				<view class="select-all" @click="selectAll">
					<image src="/static/selected.png" v-if="selectAllStatus" />
					<image src="/static/select.png" v-else />
					<text>全选</text>
				</view>
				<view class="total-price">
					合计: <text class="red-font bold-font">￥{{allPrice}}.00</text>
				</view>
			</view>
			<view class="count-right" @click="toPlaceOrder">去结算</view>
		</view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import myImage from '@/components/my-image.vue';
	
	export default {
		components: {
			myImage
		},
		data() {
			return {
				shopcarList:[], //购物车列表
				pageIndex:1,
				pageSize:50,
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				count:1,
				selectAllStatus:false,
				allPrice:0,
				
			}
		},
		computed: {
			...mapState(['token']),
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		onShow(){
			this.getShopcartList();
		},
		onLoad(e) {
			
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			getShopcartList(){
				uni.request({
					url: this.websiteUrl + 'shop/cart_list',
					method: 'POST',
					data:{
						pageIndex: this.pageIndex,
						pageSize:this.pageSize
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取购物车列表成功："+JSON.stringify(res.data));
							let data = res.data;
							let shopcarList = data.list;
							shopcarList.forEach((item)=>{
								item.slide_x = 0;
								item.selected = false;
								return item;
							})
							this.shopcarList = shopcarList;
							console.log('修改数据结构之后的shopcarList',shopcarList);
							this.countAllPrice(shopcarList);
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			cartGoodsCountEdit(data){
				uni.request({
					url: this.websiteUrl + 'shop/cart_goods_count_edit',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("购物车商品数量修改成功："+JSON.stringify(res));
							var that = this;
							uni.showToast({
								icon: 'success',
								title: '操作成功',
								duration:1000,
								success:function(){
									that.getShopcartList();
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			deleteItem(cartid){
				let cartId = cartid;
				let cartIds = [];
				cartIds.push(cartId);
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确认要删除这些选项？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.request({
								url: that.websiteUrl + 'shop/cart_goods_del',
								method: 'POST',
								data:{
									cartIds:cartIds
								},
								dataType:'json',//服务器返回json格式数据
								header:{'Content-Type':'application/json','Token':that.token},
								success: res => {
									var res = res.data;
									if(res.code == 200){
										console.log("删除商品成功："+JSON.stringify(res));
										var that2 = that;
										uni.showToast({
											icon: 'success',
											title: '删除商品成功',
											duration:2000,
											success:function(){
												that2.getShopcartList();
											}
										});
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
							that.getShopcartList();
						}
					}
				});
				
			},
			toGoodsDetail(item){
				uni.navigateTo({
				    url: '/pages/shops/shop-goods-detail/shop-goods-detail?data-goods-id=' + item.shopGoodsId+'&data-goods-optionId=' + item.optionId
				})
			},
			toPlaceOrder(){
				let placeList = this.shopcarList.filter((item)=>{
					if(item.selected == true){
						return item;
					}
				})
				if(placeList.length == 0){
					uni.showToast({
						icon: 'none',
						title: '请选择要结算的商品',
						duration:1500,
						success:function(){
							// that2.getShopcartList();
						}
					});
				}else {
					console.log(placeList);
					uni.setStorageSync('placeList',placeList);
					uni.navigateTo({
						url: '/pages/shops/shop-order-place/shop-order-place'
					})	
				}
				
			},
			_calcValue(e) {
				let count;
				let type = e.target.dataset.type;
				let id = e.target.dataset.id;
				if (type === 'subtract') {
					// 减
					count = -1;
				} else if (type === 'add') {
					//加
					count = 1;
				}
				var data = {
					count:count,
					id:id
				}
				this.cartGoodsCountEdit(data);
			},
			selectGoods(e){  //单选
				var dataid = e.currentTarget.dataset.id;
				var shopcartList = this.shopcarList.filter((item)=>{
					if(item.id === dataid){
						item.selected = !item.selected
					}
					return item
				})
				this.shopcarList = shopcartList;
				this.countAllPrice(this.shopcarList);
				
			},
			selectAll(){ //全选
				let selectAllList = this.shopcarList.map((item=>{
					item.selected = !item.selected;
					return item;
				}))
				this.selectAllStatus = !this.selectAllStatus;
				this.shopcarList = selectAllList;
				this.countAllPrice(selectAllList);
			},
			countAllPrice(list){  //合计
				let allPrice = 0;
				let countList = list.filter((item)=>{
					return item.selected == true;
				})
				if(countList.length == list.length && countList != 0){
					this.selectAllStatus = true;
				}else {
					this.selectAllStatus = false;
				}
				countList.forEach((item,inde)=>{
					let itemPrice = parseFloat(item.shopGoods.price);
					let num = item.total;
					let itemAllPrice = itemPrice * num;
					allPrice += itemAllPrice;
				})
				this.allPrice = allPrice;
			},
				// 滑动开始
			touchStart(e, index) {
			    //记录手指放上去的时间
			    this.startTime = e.timeStamp;
			    //记录滑块的初始位置
			    this.start_slide_x = this.shopcarList[index].slide_x;
			    // 按钮宽度
			    uni.createSelectorQuery()
			        .selectAll('.group-btn')
			        .boundingClientRect()
			        .exec(res => {
			            if (res[0] != null) {
			                this.btnWidth = res[0][index].width * -1;
			            }
			        });
			    // 记录上一次开始时手指所处位置
			    this.startX = e.touches[0].pageX;
			    // 记录上一次手指位置
			    this.lastX = this.startX;
			    //初始化非当前滑动消息列的位置
			    this.shopcarList.forEach((item, eq) => {
			        if (eq !== index) {
			            item.slide_x = 0;
			        }
			    });
			},
			// 滑动中
			touchMove(e, index) {
			    const endX = e.touches[0].pageX;
			    const distance = endX - this.lastX;
			    // 预测滑块所处位置
			    const duang = this.shopcarList[index].slide_x + distance;
			    // 如果在可行区域内
			    if (duang <= 0 && duang >= this.btnWidth) {
			        this.shopcarList[index].slide_x = duang;
			    }
			    // 此处手指所处位置将成为下次手指移动时的上一次位置
			    this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
			    let distance = 10;
			    const endTime = e.timeStamp;
			    const x_end_distance = this.startX - this.lastX;
			    if (Math.abs(endTime - this.startTime) > 200) {
			        distance = this.btnWidth / -2;
			    }
			    // 判断手指最终位置与手指开始位置的位置差距
			    if (x_end_distance > distance) {
			        this.shopcarList[index].slide_x = this.btnWidth;
			    } else if (x_end_distance < distance * -1) {
			        this.shopcarList[index].slide_x = 0;
			    } else {
			        this.shopcarList[index].slide_x = this.start_slide_x;
			    }
			},
			// 点击回复原状
			recover(index) {
			    this.shopcarList[index].slide_x = 0;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
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
		background-color: #f4f4f4;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	.padding-box {
		// padding:0 24upx;
		
	}
	.container_of_slide {
	    width: 100%;
	    overflow: hidden;
	    .slide_list {
	        transition: all 100ms;
	        transition-timing-function: ease-out;
	        min-width: 200%;
	        height: 220upx;
	        border-bottom: 1px solid #eee;
			background-color: #fff;
	        .now-message-info {
	            display: flex;
	            align-items: center;
	            justify-content: space-between;
				padding:0 24upx;
				.select-btn {
					width:70upx;
					height: 160upx;
					display: flex;
					align-items: center;
					image {
						width:34upx;
						height: 34upx;
					}
				}
	            .centerInfo {
	                height: 220upx;
	                display: flex;
	                align-items: center;
	                text-align: left;
	                width: 100%;
					.goods-img {
						width:160upx;
						height: 160upx;
						margin-right:24upx;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						border:2upx solid #f5f5f5;
						image {
							width:100%;
							height: 100%
						}
					}
	                .goods-intro {
						line-height: 1;
						width:460upx;
						height: 160upx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						.goods-name {
							color:#333;
							font-weight: bold;  
							width:100%;
							height: 40upx;
							font-size: 30upx;
						}
						.data-num {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width:100%;
						}
						.price .bold-font {
							color:#db4c3f;
							font-size: 32upx;
							font-weight: bold;
						}
						.stock {
							font-size: 26upx;
						}
						.find-box {
							width:90upx;
							height: 36upx;
							text-align: center;
							line-height: 36rpx;
							font-size: 26upx;
							border-radius:10upx;
						}
					}
	            }
	        }
	        .now-message-info,
	        .group-btn {
	            float: left;
	        }
	        .group-btn {
	            display: flex;
	            flex-direction: row;
	            height: 100%;
	            min-width: 100upx;
	            align-items: center;
	            view {
	                height: 100%;
	                color: #fff;
	                text-align: center;
	                display: flex;
					align-items: center;
					justify-content: center;
	                font-size: 28upx;
					padding:0 50upx;
	            }
	            .top {
	                background-color: #2a0000;
	            }
	            .removeM {
	                background-color: #db4c3f;
	            }
	        }
	    }
	}
	
	.fixed-footer {
		position: fixed;
		bottom:0;
		width:100%;
		height: 98upx;
		line-height: 98upx;
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
		justify-content: space-between;
	}
	.select-all {
		font-size: 28upx;
		color:#666;
		display: flex;
		align-items: center;
		margin-right:48upx;
	}
	.select-all image {
		width:34upx;
		height: 34upx;
		margin-right:12upx;
	}
	.total-price {
		font-size: 32upx;
		color:#333;
	}
	.total-price .red-font {
		color:#db4c3f;
		font-size: 28upx;
		font-weight: bold;
	}
	.count-right {
		flex: 1;
		background-color: #db4c3f;
		color:#fff;
		font-size: 32upx;
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
