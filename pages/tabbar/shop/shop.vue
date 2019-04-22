<template>
	<view class="content uni-tab-bar">
        <view class="header">
			<view class="searchbox">
			  <view class="search-box">
				<image src="/static/search_icon.png" />
				<input type="text" placeholder="请输入关键词"/> <!-- auto-focus -->
			  </view>
			  <view class="top-links">
				<text class="icon" @tap="toShopCartList">&#xe607;</text>
				<text class="icon" @tap="toMine">&#xe601;</text>
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
			<swiper-item v-for="(tab,index1) in tabBars" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore">
					<view class="goods-list">
						<block v-for="(item,index2) in goodsList" :key="index2">
							<!-- <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list> -->
							<!-- <view class="good-item">
								<my-image :data="item.goodsPics" />
								<view class="goods-name">{{item.goodsName}}</view>
							</view> -->
							<media-list :data="item" @click="goDetail(item)"></media-list>
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
				tabBars:[],
				tabIndex:0,
				catagoryIdList:[], //分类id
				// pageIndex:1,
				goodsList:[],
				isClickChange:false,
				scrollLeft:0,
				classId:'',
				loadingType: 0,
				totalPage:1,
				pageSize:10,
				hasNextPage:false,
				loadingText: '加载中...',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onShow(){
			uni.showTabBar({
				animation:true
			})
		},
		onHide(){
			uni.setStorageSync("$pageIndex",3);
		},
		computed: mapState(['hasLogin', 'userName','token']),
		onLoad() {
			_self = this;
			if(!this.hasLogin){
				uni.reLaunch({
					url:'/pages/login/login/login'
				})
			}else {
				console.log('已经登录过了');
				this.getBabBars();
			}
		},
		methods: {
			toMine(){
				uni.navigateTo({
					url:"/pages/mycenter/mine/mine"
				})
			},
			getBabBars(){
				uni.request({
					url: this.websiteUrl + 'shop/goods_class_list',
					method: 'POST',
					data:{
						pid: 122
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("获取tabBar列表成功："+JSON.stringify(res))
							this.tabBars = res.data;
							this.getCatagoryId(res.data);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getCatagoryId(list){ //获取到每个tabar下的id
				let ary = [];
				for(var i = 0;i < list.length;i++){
					// this.catagoryIdList.push(list[i].id);
					ary.push(list[i].id)
				}
				this.catagoryIdList = ary;
				// console.log(this.catagoryIdList)
				this.classId = ary[this.tabIndex];
				this.getGoodsList();
			},
			getGoodsList(){
				pageIndex = 1;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'shop/goods_list',
					method: 'POST',
					data:{
						classId:this.classId,
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
							this.goodsList = list;
							this.hasNextPage = data.hasNextPage;
							if(!data.hasNextPage){
								_self.loadingType = 2;
							}
							uni.hideNavigationBarLoading();
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getMoreGoodsList(){
				/* if(_self.loadingType != 0){
					return false;
				} */
				// _self.loadingType = 1;
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'shop/goods_list',
					method: 'POST',
					data:{
						classId:this.classId,
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
							_self.goodsList = _self.goodsList.concat(list);
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
					_self.getMoreGoodsList();
				}else {
					_self.loadingType = 2;
				}
			},
			async tabTab(e){  //点击tabbar
				pageIndex = 1;
				// console.log(e.target.dataset.catogoryId)
				if(this.tabIndex === e.target.dataset.current){
					return false;
				}else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft;  //点击的时候记录并设置scrollLeft
						// console.log(tabBarScrollLeft);
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
					var catagoryId = e.target.dataset.catogoryId;
					this.classId = catagoryId;
					// this.getGoodsList();
					console.log('点击')
				}
			},
			async changeTab(e){
				let index = e.target.current;
				this.pageIndex = 1;
				this.setScrollLeft(index);
				this.classId = this.catagoryIdList[index]
				this.getGoodsList();
                this.tabIndex = index; //一旦访问data就会出问题
				
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

<style>
	page{
	  height: 100%;
	}
	.content {
		/* text-align: center;
		height: 400upx; */
		height: 100%;
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
	  height: 60upx;
	  /*border-radius:60rpx;*/
	  border-radius:10upx;
	  background-color: #EDEDED;
	  display: flex;
	  font-size: 28upx;
	  color:#333;
	  align-items: center;
	  padding-left:14upx;
	  box-sizing:border-box;
	}
	.search-box input {
	  display: block;
	  width:500upx;
	  height: 100%;
	  padding:10upx 0;
	}
	.search-box image {
	  width:44upx;
	  height: 44upx;
	  margin-right:10upx;
	}
	.top-links .icon{
	  font-size: 46upx;
	  color:#333;
	  padding-left:20upx;
	}
	
	.selectbox {
	  width: 100%;
	  height: 80upx;
	}
	.scroll-row {
	  display: flex;
	  white-space: nowrap;
	}
	.header .selectbox  .option{
	  padding:0 34upx;
	  display: inline-block;
	  height: 100%;
	  /*display: flex;*/
	  align-items: center;
	  justify-content: center;
	}
	.selectbox .option{
	  /*color: #666;*/
	  color: #333;
	  font-size: 26upx;
	  height: 80upx;
	  line-height: 80upx;
	  display: block;
	}
	.selectbox .option.active{
	  color: #007aff;/*f5565a*/
	  /*border-bottom: 2px solid #007aff;*/
	  box-sizing: border-box;
	}

	.main-content {
	  width:100%;
	  position:absolute;
	  top:160upx;
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
		padding:0 34upx !important;
		box-sizing: content-box;
	}
	.uni-tab-bar .swiper-box {
		padding-top:160upx;
		height: auto;
	}
	/* .list{
		width:100%;
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		overflow: hidden;
	} */
</style>
