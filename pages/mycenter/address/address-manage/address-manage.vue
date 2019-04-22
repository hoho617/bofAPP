<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
				<view class="container_of_slide" v-for="(item,index) in addressList" :key="index">
					<view class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)"
					 @tap="recover(index)" :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}">
						<view class="now-message-info" :style="{width:Screen_width+'px'}" @click="chooseAddress" :data-address-id="item.id">
							<view class="item-top">
								<view class="address-name">{{item.realname}}</view>
								<view class="address-mobile">{{item.mobile}}</view>
							</view>
							<view class="address-detail">{{item.address}}</view>
							<view class="address-default">
								<image src="/static/selected.png" mode="widthFix" v-if="item.isDefault"/>
								<image src="/static/select.png" mode="widthFix" v-else/>
								<text>默认地址</text>
							</view>
						</view>
						<view class="group-btn">
							<!-- <view class="top" @tap="toCardEdit(item.id)">
								修改
							</view> -->
							<view class="removeM" @tap="deleteAddress(item.id)">
								删除
							</view>
						</view>
						<view style="clear:both"></view>
					</view>
				</view>
				<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="toAddAddress">新增收货地址</view>
		</view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	var area = require('../../../../common/area.js');
	import uniLoadMore from '@/components/uni-load-more.vue';
	var _self,pageIndex=1;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				addressList:[],
				mode:'', //如果mode==1，则返回到确认订单页面
				// pageIndex:1,
				hasNextPage:false,
				loadingType: 0, //0--上拉显示更多 1--正在加载... 2--没有更多了
				pageSize:8,
				pages:0,
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		computed: {
			...mapState(['token']),
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		onShow(){
			this.getAddressList();
		},
		onLoad(e) {
			if(e['mode']) {
				console.log(e);
				var mode = e['mode'];
				this.mode = mode;
			}
			_self = this;
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			getAddressList(flag){ //获取用户地址列表
				// pageIndex = 1;
				// this.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'user/address_list',
					method: 'POST',
					data:{
						pageIndex:pageIndex,
						pageSize:this.pageSize
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取地址列表成功："+JSON.stringify(res.data));
							uni.hideNavigationBarLoading();
							let list = res.data.list;
							let pages = res.data.pages;
							let hasNextPage = res.data.hasNextPage;
							this.hasNextPage = hasNextPage;
							list.forEach((item)=>{
								item.slide_x = 0;
								let arrObj = area.getAddress(item.province,item.city,item.area);
								item.address = arrObj.province +' '+ arrObj.city +' '+ arrObj.area +' '+ item.address;
								return item;
							})
							if(flag){
								this.addressList = this.addressList.concat(list);
							}else {
								this.addressList = list;
								this.pages = pages;
							}
							
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getMoreAddress(){ //获取用户地址列表
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + '/user/address_list',
					method: 'POST',
					data:{
						pageIndex:pageIndex,
						pageSize:this.pageSize
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("加载更多地址成功："+JSON.stringify(res.data));
							 let list = res.data.list;
							 if(list.length == 0){
							 	_self.loadingType = 2;
							 	uni.hideNavigationBarLoading();
							 	return;
							 }
							 _self.hasNextPage = res.data.hasNextPage;
							list.forEach((item)=>{
								item.slide_x = 0;
								let arrObj = area.getAddress(item.province,item.city,item.area);
								item.address = arrObj.province +' '+ arrObj.city +' '+ arrObj.area +' '+ item.address;
								return item;
							})
							this.addressList = this.addressList.concat(list); 
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			deleteAddress(addressId){
				var that = this;
			    uni.showModal({
			    	title: '温馨提示',
			    	content: '确认删除该条银行卡信息？',
			    	success: function (res) {
			    		if (res.confirm) {
			    			console.log('用户点击确定');
			    			uni.request({
			    				url: that.websiteUrl + 'user/address_del',
			    				method: 'POST',
			    				data:{
			    					id:addressId
			    				},
			    				dataType:'json',//服务器返回json格式数据
			    				header:{'Content-Type':'application/json','Token':that.token},
			    				success: res => {
			    					var res = res.data;
			    					if(res.code == 200){
			    						console.log("删除地址成功："+JSON.stringify(res));
			    						var that2 = that;
			    						uni.showToast({
			    							icon: 'success',
			    							title: '删除地址成功',
			    							duration:2000,
			    							success:function(){
			    								that2.getAddressList();
			    							}
			    						});
			    					}
			    				},
			    				fail: () => {},
			    				complete: () => {}
			    			});
			    		} else if (res.cancel) {
			    			console.log('用户点击取消');
			    			that.getCardList();
			    		}
			    	}
			    });
			},
			loadMore(){
				pageIndex++;
				this.loadingType = 1;
				if(pageIndex > this.pages){
					console.log('没有更多了');
					this.loadingType = 2;
				}else {
					console.log('加载更多');
					this.getAddressList(true);
				}
// 				if(this.hasNextPage){
// 					console.log('加载更多');
// 					this.getMoreAddress();
// 				}else {
// 					console.log('没有更多了');
// 					this.loadingType = 2;
// 				}
			},
			chooseAddress(e){
				let addressId = e.currentTarget.dataset.addressId;
				console.log(addressId);
				if(this.mode == 1){
					
					uni.navigateBack({
						delta:1
					})
					this.$eventHub.$emit('fire',addressId);
				}else {
					uni.navigateTo({
						url:'/pages/mycenter/address/address-edit/address-edit?addressId='+addressId
					})
				}
			},
			toAddAddress(){
				uni.navigateTo({
					url:'/pages/mycenter/address/address-edit/address-edit'
				})
			},
				// 滑动开始
			touchStart(e, index) {
			    //记录手指放上去的时间
			    this.startTime = e.timeStamp;
			    //记录滑块的初始位置
			    this.start_slide_x = this.addressList[index].slide_x;
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
			    this.addressList.forEach((item, eq) => {
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
			    const duang = this.addressList[index].slide_x + distance;
			    // 如果在可行区域内
			    if (duang <= 0 && duang >= this.btnWidth) {
			        this.addressList[index].slide_x = duang;
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
			        this.addressList[index].slide_x = this.btnWidth;
			    } else if (x_end_distance < distance * -1) {
			        this.addressList[index].slide_x = 0;
			    } else {
			        this.addressList[index].slide_x = this.start_slide_x;
			    }
			},
			// 点击回复原状
			recover(index) {
			    this.addressList[index].slide_x = 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* @import '../../../uni.scss'; */
	page{
	  height: 100%;
	}
	view {
		box-sizing: border-box;
		line-height: 1.8;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:100upx;
		width:100%;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	.container_of_slide {
	    width: 100%;
	    overflow: hidden;
	    .slide_list {
	        transition: all 100ms;
	        transition-timing-function: ease-out;
	        min-width: 200%;
	        height: 180upx;
	        border-bottom: 1px solid #eee;
			background-color: #fff;
	        .now-message-info {
				padding:20upx 24upx;
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
	                font-size: 28rpx;
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
	.address-item {
		padding:26upx 24upx;
		background-color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
	}
	.item-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.address-default {
		color:#999;
		display: flex;
		align-items: center;
	}
	.address-default image {
		width:40upx;
		margin-right:14upx;
	}
	.list-del-btn {
		background-color: #e64340;
		width:180upx;
		text-align: center;
		z-index: 4;
		right:0;
		color:#fff;
		position: absolute;
		top:0;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.address-item:after {
		content:"";
		display: block;
		position: absolute;
		bottom:0;
		left:20upx;
		right:0;
		height: 2upx;
		background-color: #eee;
	}
	.address-item:last-child:after{
		display: none;
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
