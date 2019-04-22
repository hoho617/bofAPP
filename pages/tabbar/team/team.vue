<template>
	<view class="wrap-container">
			<view class="scroll-view" v-if="!isClose">
				<scroll-view scroll-y style="height: 100%;">
					<view class="scroll-inner">
						<!-- <block v-for="(item,index) in teamIndexList" :key="index"> -->
							<view class="inner-video" v-if="showVideo">
							    <video id="myVideo" :poster="videoInfo.poster" :src="videoInfo.link[0]"
							        @error="videoErrorCallback" controls></video>
							</view>
							<view class="inner-learnings" v-if="showLearning">
								<view class="learning-title">
									<text class="big-fontsize">学习历程 </text>——跟着我，成为BOF精英会员
								</view>
								<view class="learning-links">
									<view class="link-item">
										<view class="link-item-icon cuIcon-profilefill"></view>
										<view class="link-item-name">新手上路</view>
									</view>
									<view class="link-item">
										<view class="link-item-icon cuIcon-selectionfill"></view>
										<view class="link-item-name">高手进阶</view>
									</view>
									<view class="link-item">
										<view class="link-item-icon cuIcon-taoxiaopu"></view>
										<view class="link-item-name">实战案例</view>
									</view>
									<view class="link-item">
										<view class="link-item-icon cuIcon-right"></view>
										<view class="link-item-name">更多</view>
									</view>
								</view>
							</view>
							<view class="gap-height-div"></view>
							<view class="inner-articles">
								<view class="articles-item" v-if="showActivity">
									<view class="article-title">
										<text class="cuIcon-notice"></text>{{activityData.name}}
									</view>
									<view class="article-lists">
										<view class="article-item" v-for="(item,index) in activityData.list" :key="index">
											<view class="article-item-title">{{item.title}}</view>
											<view class="article-item-imgs">
													<view class="item-img" v-for="(imgItem,index1) in item.srcList" :key="index1">
														<image :src="imgItem" mode="widthFix"></image>
													</view>
											</view>
											<view class="article-item-time">时间：{{item.dateTime}}</view>
										</view>
									</view>
								</view>
							</view>
						<!-- </block> -->
						<!-- <wxParse :content="content" @preview="preview" @navigate="navigate" /> -->
					</view>
				</scroll-view>
			</view>
      <view class="bottom-tabbar cu-bar tabbar margin-bottom-xl bg-white">
      	<view class="action text-orange">
      		<view class="cuIcon-hotfill"></view> 学苑
      	</view>
      	
      	<view class="action text-blue add-action">
      		<button class="cu-btn cuIcon-recordfill bg-white shadow text-blue"></button>
      		直播
      	</view>
				<view class="action text-gray">
					<view class="cuIcon-similar"></view> 分类
				</view>
      	<view class="action text-gray">
      		<view class="cuIcon-read">
      			<!-- <view class="cu-tag badge"></view> -->
      		</view>
      		课程
      	</view>
      </view>
			
			<view class="team-empty-area" v-if="isClose">
				<view class="cuIcon-service team-empty-icon"></view>
				<view class="team-empty-text">会员们，该功能暂未开放，敬请期待！</view>
			</view>
	</view>
</template>

<script>
	
		import {mapState,mapMutations} from 'vuex';
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import marked from '../../../components/marked'
	export default {
		data() {
			return {
				isClose:false,
				showVideo:false, //头条视频
				videoInfo:'',
				showLearning:false, //学习历程
				showActivity:false, //市场活动
				activityData:'', //市场活动数据
				showTodayClass:false ,//今日上课
				pageIndex:0,
			}
		},
		components: {
			wxParse
		},
		computed: {
			...mapState(['token'])
		},
		onNavigationBarButtonTap:function(e){
					console.log(JSON.stringify(e))
					let pageIndex = this.pageIndex;
					switch(pageIndex){
						case 0:
							uni.switchTab({
								url:'/pages/tabbar/index/index'
							})
						break;
						case 1:
							uni.switchTab({
								url:'/pages/tabbar/finance/finance'
							})
						break;
						case 2:
							uni.switchTab({
								url:'/pages/tabbar/deal/deal'
							})
						break;
						case 3:
							uni.switchTab({
								url:'/pages/tabbar/shop/shop'
							})
						break;
					}
		},
		onShow(){
			console.log('显示了商学院页')
			let pageIndex = uni.getStorageSync("$pageIndex");
			this.pageIndex = pageIndex;
			console.log(pageIndex)
			this.showIndexContent();
			uni.hideTabBar({
				animation:true
			})
		},
		onLoad() {
			
			
		},
		methods: {
			showIndexContent(){
				uni.request({
					url: this.websiteUrl + 'article/class_home',
					method: 'POST',
					data:{
							pageIndex:1,
					    pageSize:10,
					    classId:15
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let that = this;
						if(res.code == 200){
							// console.log("获取首页是否显示成功："+JSON.stringify(res.data));
							let list = res.data.list;
							let data = res.data;
							if(data.total == 0){
								console.log('首页关闭');
								this.isClose = true;
							}else {
								that.showLearningPart();
								list.forEach((item)=>{
									let name = item.name;
									console.log('name',name)
									switch(name){
										case '头条视频':
											that.showVideo = true;
											that.loadIconData(item,'swiper_video_header')
											break;
										case '今日上课':
											that.showTodayClass = true;
										break;
										case '市场动态':
											that.showActivity = true;
											let activityDataList = item.list;
											activityDataList.forEach((item)=>{
												item.dateTime = that.customMethods.timestampToTime(item.addTime);
												let content = that.customMethods.escape2Html(item.content);
												
												let imgReg = /<img[^>]+>/g;
												var imgArr = content.match(imgReg);
												if(imgArr.length >= 3){
													imgArr = imgArr.splice(0,3);
												}
												// let srcReg = /src=[^>]+>/g;
												let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
												
												let srcArr = [];
												imgArr.forEach((item)=>{
													srcArr.push(item.match(srcReg)[1]);
												})
												if(srcArr.length >= 3){
													srcArr = srcArr.splice(0,3);
												}
												item.imgList = imgArr;
												item.srcList = srcArr;
												console.log(JSON.stringify(srcArr))
											})
											that.activityData = item;
											// console.log(JSON.stringify(item.list))
											break;
										default:
										
									}
								})
							}
						}else if(res.code == 401){
							uni.reLaunch({
								url:'/pages/login/login/login'
							})
						}
					},
					fail: () => {
					},
					complete: () => {}
				});
			},
			showLearningPart(){
				uni.request({
					url: this.websiteUrl + 'article/class_home',
					method: 'POST',
					data:{
							pageIndex:1,
					    pageSize:10,
					    classId:19
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let that = this;
						if(res.code == 200){
							// console.log("获取首页是否显示成功："+JSON.stringify(res.data));
							let list = res.data.list;
							let data = res.data;
							if(data.total != 0){
								this.showLearning = true;
							}
						}else if(res.code == 401){
							uni.reLaunch({
								url:'/pages/login/login/login'
							})
						}
					},
					fail: () => {
					},
					complete: () => {}
				});
			},
			loadIconData(item,type){
				uni.request({
					url: this.websiteUrl + 'icon/shop_decorate',
					method: 'POST',
					data:{
							pageSize: 5,
					    type: 11,
					    moduleType: 1,
					    moduleCode: type
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let that = this;
						if(res.code == 200){
							console.log("获取幻灯片数据列表成功："+JSON.stringify(res.data));
							let data = res.data;
							let videoInfo = JSON.parse(data[0].content);
							videoInfo.poster = this.getImageUrl(videoInfo.pic);
							console.log(JSON.stringify(videoInfo))
							this.videoInfo = videoInfo;
// 							let list = res.data.list;
// 							let data = res.data;
// 							if(data.total == 0){
// 								console.log('首页关闭');
// 								this.isClose = true;
// 							}else {
// 								list.forEach((item)=>{
// 									let name = item.name;
// 									console.log('name',name)
// 									switch(name){
// 										case '头条视频':
// 											that.showVideo = true;
// 											break;
// 										case '今日上课':
// 											that.showTodayClass = true;
// 										break;
// 										case '市场动态':
// 											that.showActivity = true;
// 											break;
// 										default:
// 										
// 									}
// 								})
// 							}
						}else if(res.code == 401){
							uni.reLaunch({
								url:'/pages/login/login/login'
							})
						}
					},
					fail: () => {
					},
					complete: () => {}
				});
			},
			 videoErrorCallback: function(e) {
				 // console.log(JSON.stringify(e.target.errMsg))
            uni.showModal({
                content: '视频播放错误',
                showCancel: false
            })
        },
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/colorui/main.css");
	@import url("../../../static/css/team.css");
	// @import url("../../../components/mpvue-wxparse/src/wxParse.css");
	page{
	  height: 100%;
	}
	
	.wrap-container {
		height: 100%;
		background-color: #fff;
		
		.scroll-view {
			position: absolute;
			top:0;
			bottom:100upx;
			width:100%;
			.scroll-inner {
				
				
				
			}
			
		}
		.bottom-tabbar {
			position: fixed;
			bottom:0;
			width:100%;
			margin:0;
			
		}
	}
</style>
