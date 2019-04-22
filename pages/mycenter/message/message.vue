<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="message-list panel-center bg-white">
				<block v-for="(item,index) in messageList" :key="index">
					<view class="message-item" @tap="toMessageDetail(item.id)">
						<view class="message-title">{{item.title}}</view>
						<view class="message-time">{{item.addTime}}</view>
					</view>
				</block>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</scroll-view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	// var util = require('../../../common/util.js')
	var _self,timer = null,pageIndex=1;
	export default {
		components: {
			uniLoadMore,
		},
		data() {
			return {
				messageList:[],
				loadingType: 0,
				totalPage:1,
				hasNextPage:false,
				pageIndex:1,
				pageSize:10,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			_self = this;
			this.getMessageList();
		},
		methods: {
			getMessageList(){
				pageIndex = 1;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'article/list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize:this.pageSize,
						classId:9
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("获取消息列表成功："+JSON.stringify(res.data));
							let list = res.data.list;
							uni.hideNavigationBarLoading();
							let totalPage = Math.ceil(res.data.total / this.pageSize);
							this.totalPage = totalPage;
							list.forEach((item)=>{
								let time = this.customMethods.getLocalTime(item.addTime);
								item.addTime = time;
								return item;
							})
							this.messageList = list;
							this.hasNextPage = res.data.hasNextPage;
							if(!res.data.hasNextPage){
								this.loadingType = 2;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getMoreMessageList(){
				uni.showNavigationBarLoading();
				uni.request({
					url: this.websiteUrl + 'article/list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize:this.pageSize,
						classId:9
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							// console.log("获取消息列表成功："+JSON.stringify(res.data));
							
							let list = res.data.list;
							if(list.length){
								_self.loadingType = 2;
								uni.hideNavigationBarLoading();
								return;
							}
							let totalPage = Math.ceil(res.data.total / this.pageSize);
							this.totalPage = totalPage;
							list.forEach((item)=>{
								let time = this.customMethods.getLocalTime(item.addTime);
								item.addTime = time;
								return item;
							})
							_self.loadingType = 0;
							uni.hideNavigationBarLoading();
							this.hasNextPage = res.data.hasNextPage;
							this.messageList = this.messageList.concat(list);
		
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadMore(){
				this.loadingType = 1;
				pageIndex++;
				if(this.hasNextPage){
					this.getMoreMessageList();
				}else {
					this.loadingType = 2;
				}
			},
			toMessageDetail(messageId){
				uni.navigateTo({
					url: '/pages/mycenter/message/message-detail/message-detail?messageId='+messageId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		z-index: 99;
	}
	view {
		line-height: 1.4;
	}
	.message-list {
		width:98%;
		margin:0 auto;
		border-radius: 10upx;
		overflow: hidden;
		.message-item {
			background-color: #fff;
			padding:20upx 24upx;
			color:#808080;
			position: relative;
			.message-title {
				font-size: 30upx;
			}
			.message-time {
				font-size: 28upx;
			}
			&:after {
				content:"";
				display: block;
				position: absolute;
				bottom:0;
				height: 2upx;
				background-color: #eee;
				left:20upx;
				right:0;
			}
		}
	}
</style>
