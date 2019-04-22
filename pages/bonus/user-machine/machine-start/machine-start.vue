<template>
	<view class="content uni-tab-bar">
		<view class="header">
			<view class="searchbox">
			  <view class="search-box">
				<image src="/static/search_icon.png" />
				<input type="text" v-model="searchValue" placeholder="请输入查询账号"/> <!-- auto-focus -->
			  </view>
			  <view class="right-search-btn" @click="searchItem">
				搜索
			  </view>
			</view>
			<view class="selectbox">
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" lower-threshold="20">
					<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex == index?'active':'']" :id="'tabNum'+tab.id" :data-current="index" :data-catogory-id="tab.id" @tap="tabTab">
						{{tab.name}}
					</view>
				</scroll-view>
			</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item  v-for="(tab,index1) in tabBars" :key="index1">
				<view class="scroll-view">
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
						<view class="list-box panel-center bg-white">
							<view class="list-item" v-for="(item,index) in transferList" :key="index">
								<view class="list-item-top">
									{{item.regTime}}
								</view>
								<view class="list-item-middle">
									<view class="item-icon"><text class="uni-icon uni-icon-contact"></text></view>
									<view class="item-info">
										<view class="info-top">
											<view class="info-account">账号：<text class="darker-color">{{item.userName}}</text></view>
											<view class="info-money">报单金额：<text  class="darker-color">{{item.bdmoney}}</text></view>
										</view>
										<view class="info-bom">
											<view class="info-name">姓名：<text class="darker-color">{{item.trueName}}</text></view>
										</view>
									</view>
								</view>
								
								<view class="list-item-bottom" v-if="tabIndex == 0">
									<view class="bottom-btn btn-start" @click="turnToActive(item)">启动</view>
									<view class="bottom-btn btn-cancle">删除</view>
								</view>
							</view>
						</view>
						<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	var _self,pageIndex=1;
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				tabBars:[
					{id:0,name:'待启动'},
					{id:1,name:'已启动'}
				],
				tabList:['',''],
				tabIndex:0,
				transferList:[],
				loadingType: 0,
				pageSize:10,
				pages:0,
				loadingText: '加载中...',
				searchValue:'',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		computed: mapState(['hasLogin', 'userName','token']),
		onLoad(e) {
			
		},
		onShow(){
			_self = this;
			this.loadTransferList();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"/pages/bonus/share-list/share-list"
			})
		},
		methods: {
			loadTransferList(flag,searchValue){
				let url = this.tabIndex == 0 ? 'team/wait_audit_user':'team/already_audit_user';
				var data;
				if(searchValue){
					data = {
						pageIndex:pageIndex,
						pageSize:this.pageSize,
						userName:searchValue
					}
				}else {
					data = {
						pageIndex:pageIndex,
						pageSize:this.pageSize
					}
				}
				
				console.log('发送的请求信息为',JSON.stringify(data))
				uni.request({
					url: this.websiteUrl + url,
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							var list = res.data.list;
							var data = res.data;
							// console.log('矿机启动列表获取成功',JSON.stringify(data));
							let list = data.list;
							let pages = data.pages;
						    this.pages = pages;
							list.forEach((item)=>{
								item.regTime = this.customMethods.getDate(item.regTime);
								return item;
							})
							
							if(flag){
								this.transferList = this.transferList.concat(list);
							}else {
								this.transferList = list;
							}
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			turnToActive(item){
				let id = item.id;
				let userName = item.userName;
				let bdmoney = item.bdmoney;
				console.log(id,userName,bdmoney)
				uni.navigateTo({
					url:'/pages/bonus/user-machine/machine-active/machine-active?id='+id+'&userName='+userName+'&bdmoney='+bdmoney
				})
			},
			loadMore(){
				_self.loadingType = 1;
				setTimeout(()=>{
					pageIndex++;
					if(pageIndex >= this.pages){
						_self.loadingType = 2;
					}else {
						_self.loadTransferList(true);
					}
				},500)
			},
			tabTab(e){  //点击tabbar
				pageIndex = 1;
				console.log(e)
				// console.log(e.target.dataset.catogoryId)
				if(this.tabIndex === e.target.dataset.current){
					return false;
				}else{
					this.tabIndex = e.target.dataset.current;
					this.loadTransferList();
				}
			},
			changeTab(e){
				 let index = e.target.current;
				pageIndex = 1;
				this.tabIndex = index;
				this.loadTransferList();
			},
			searchItem(){
				console.log('开始搜索了')
				this.loadTransferList(false,this.searchValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
	  height: 100%;
	}
	.content {
		height: 100%;
		background-color: #f4f4f4;;
	}
	 .header {
	  width:100%;
	  position: fixed;
	  top:0;
	  background: #fff;
	  z-index: 100;
	}
	.header .searchbox{
	  width: 100%;
	  padding:0 24upx;
	  box-sizing:border-box;
	  height: 80upx;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	}
	.search-box {
	  width:560upx;
	  height: 76upx;
	  /*border-radius:60rpx;*/
	  border-radius:10upx;
	  background-color: #EDEDED;
	  display: flex;
	  font-size: 26upx;
	  color:#333;
	  align-items: center;
	  padding-left:14upx;
	  box-sizing:border-box;
	  padding:14upx 0;
	}
	.search-box input {
	  display: block;
	  width:420upx;
	  height: 100%;
	  font-size: 30upx;
	}
	.search-box image {
	  width:44upx;
	  height: 44upx;
	  margin-right:10upx;
	}
	.right-search-btn {
		text-align: center;
		line-height: 76upx;
		height: 76upx;
		background-color: #007aff;
		width:200upx;
		color:#fff;
		border-radius:10upx;
		margin-left:20upx;
	}
	
	.selectbox {
	  width: 100%;
	  height: 90upx;
	  margin-top:20upx;
	}
	.selectbox .option.active{
	  color: #007aff;
	  box-sizing: border-box;
	}
	.swiper-tab-list {
		width:50%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		z-index: 99;
		
		.list-item {
			padding:28upx 24upx;
			position: relative;
			.list-item-top {
				
			}
			.list-item-middle {
				display: flex;
				align-items: center;
				padding:30upx 24upx;
				.item-icon .uni-icon{
					font-size: 80upx
				}
				.item-info {
					margin-left:20upx;
					flex: 2;
					color:#999;
					.info-top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 60upx;
					}
				}
				.darker-color {
					color: #333 !important;
				}
			}
			
			.list-item-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.bottom-btn {
					height: 60upx;
					padding:0 24upx;
					border-radius:8upx;
					color:#fff;
					font-size: 28upx;
					line-height: 60upx
				}
				.btn-start {
					border: 1px solid #f0ad4e;
					background-color: #f0ad4e;
				}
				.btn-cancle {
					 border: 1px solid #dd524d;
    background-color: #dd524d;
				}
			}
			.item-name {
				font-size: 30upx;
				margin-bottom:14upx;
			}
			.item-memo {
				font-size: 26upx;
				opacity: .5
			}
			.list-item-right {
				font-size: 34upx;
			}
		}
		.list-item:after {
			content:"";
			display: block;
			position: absolute;
			left:24upx;
			right:24upx;
			bottom:0;
			height: 2upx;
			background-color: #f9f9f9;
		}
	}
	
	.uni-tab-bar {
		/* padding-top:80upx; */
	}
	.uni-swiper-tab {
		border: none;
		background-color: #fff;
		height: 80upx;
		line-height: 80upx;
		/* position: fixed; */
	}
	.swiper-tab-list {
		padding:0 34upx;
	}
	.uni-tab-bar .swiper-box {
		width:100%;
		position: absolute;
		top:180upx;
		bottom:0;
		
	}

</style>
