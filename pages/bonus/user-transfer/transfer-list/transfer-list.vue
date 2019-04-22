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
			<swiper-item  v-for="(tab,index1) in tabBars" :key="index1">
				<view class="scroll-view">
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
						<view class="list-box panel-center bg-white">
							<view class="list-item" v-for="(item,index) in transferList" :key="index">
								<view class="list-item-left">
									<view class="item-name">{{item.addTime}}</view>
									<view class="item-memo">{{item.meno}}</view>
								</view>
								<view class="list-item-right">￥{{item.money}}</view>
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
	import mediaList from '@/components/media-list.vue';
	
	import myImage from '@/components/my-image.vue';
	var _self,pageIndex=1;
	export default {
		components:{
			myImage,
			uniLoadMore,
			mediaList
		},
		data() {
			return {
				tabBars:[
					{id:0,name:'转出记录'},
					{id:1,name:'转入记录'}
				],
				tabList:['',''],
				tabIndex:0,
				transferList:[],
				loadingType: 0,
				pageSize:20,
				pages:0,
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
			
		},
		async onShow(){
			_self = this;
			this.loadTransferList();
		},
		methods: {
			loadTransferList(flag){
				let transferType = this.tabIndex == 0?2:1;
				var data = {
					transferType: transferType,
					pageIndex:pageIndex,
					pageSize:this.pageSize
				}
				uni.request({
					url: this.websiteUrl + 'finance/transfer_list',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							var list = res.data.list;
							var data = res.data;
							console.log('转账记录列列表获取成功',JSON.stringify(data));
							let list = data.list;
							let pages = data.pages;
						    this.pages = pages;
							list.forEach((item)=>{
								item.addTime = this.customMethods.getDate(item.addTime);
								return item;
							})
							
							if(flag){
								this.transferList = this.transferList.concat(list);
							}else {
								console.log('list',list);
								this.transferList = list;
							}
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
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
	.selectbox {
	  width: 100%;
	  height: 80upx;
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
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:28upx 24upx;
			position: relative;
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
		top:100upx;
		bottom:0;
		
	}

</style>
