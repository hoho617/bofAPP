<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center">
				<view class="list-item" v-for="(item,index) in rechargeList" :key="index">
					<view class="item-addTime">{{item.time}}</view>
					<view class="list-item-title bg-white">
						<view class="list-item-top">
							<view class="item-num">收款笔数</view>
							<view class="item-num">合计</view>
						</view>
						<view class="list-item-bottom">
							<view class="item-total">{{item.totalNum}}</view>
							<view class="item-total">￥{{item.totalMoney}}</view>
						</view>
					</view>
					<view class="list-item-list bg-white">
						<view class="list-item-inner" v-for="(item,index1) in item.list" :key="index1">
							<view class="item-inner-left">
								<view class="item-username">{{item.fUserName}}</view>
								<view class="item-time">{{item.hourTime}}</view>
							</view>
							<view class="item-money">￥{{item.money}}</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</scroll-view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more.vue';
	var pageIndex=1;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				rechargeList:[], 
				pageSize:10,
				pages:0, //总页数
				loadingType: 0, //0--上拉显示更多 1--正在加载... 2--没有更多了
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
				
			}
		},
		computed: {
			...mapState(['token'])
		},
		onShow(){
		},
		onLoad(e) {
			this.loadRechargeList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadRechargeList(flag){
				uni.request({
					url: this.websiteUrl + 'finance/barpay_list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize: this.pageSize,
						moneyType: 5,
						transferType: 1
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取收款记录列表数据成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							this.formateData(data,flag);
							/* list.forEach((item)=>{
								item.addTime = this.customMethods.getDate(item.addTime);
							})
							if(flag){
								this.rechargeList = this.rechargeList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.rechargeList = list;
								this.pages = data.pages;
							} */
							
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadMore(){
				this.loadingType = 1;
				setTimeout(()=>{
					pageIndex++;
					if(pageIndex > this.pages){
						this.loadingType = 2;
						return;
					}
					this.loadRechargeList(true);
				},500)
				
			},
			formateData(data,flag){
				let that = this;
				let timesArr = [];
				data.list.forEach((item)=>{
					let time = that.customMethods.getDate(item.addTime);
					timesArr.push(time)
				})
				console.log(timesArr)
				let uniqueTimesArr = [...new Set(timesArr)];
				console.log('去重后的时间数组为',uniqueTimesArr);
				let dataArr = [];
				uniqueTimesArr.forEach((item1)=>{
					let dataListArr = [];
					dataListArr = data.list.filter((item2)=>{
						let time = that.customMethods.getDate(item2.addTime);
						return time == item1;
					})
					console.log('dataListArr',dataListArr);
					let totalMoney = 0;
					dataListArr.forEach((item)=>{
						totalMoney += item.money;
						item.hourTime = that.customMethods.timestampToTimeHour(item.addTime);
					})
					dataArr.push({
						time:item1,
						totalNum:dataListArr.length,
						totalMoney:totalMoney,
						list:dataListArr
					})
				})
				console.log(JSON.stringify(dataArr))
				if(flag) {
					this.rechargeList = this.rechargeList.concat(dataArr)
				}else {
					this.rechargeList = dataArr;
				}
				
			}
			/* formateData(data){
				let that = this;
				var dataArr = [];
				var dataInnerArr = [];
				var timesArr = [];
				data.list.forEach((item)=>{
					var timeStr = that.customMethods.getDate(item.addTime);
					timesArr.push(timeStr)
				})
				console.log(timesArr)
				var timesUniqueArr = [ ...new Set(timesArr)]
				// var timesUniqueArr = unique(timesArr);
				console.log(timesUniqueArr)
				timesUniqueArr.forEach((item1)=>{
					dataInnerArr = data.list.filter(item => {
						var timeStr = that.customMethods.getDate(item.addTime);
						return timeStr == item1;
					})
					var totalMoney = 0;
					dataInnerArr.forEach(function(val, index) {
						totalMoney += val.money;
					})
					dataArr.push({
						timeStr: item1,
						total: dataInnerArr.length,
						totalMoney: totalMoney,
						list: dataInnerArr
					})
					console.log('dataInnerArr', dataInnerArr)
				})
				console.log('dataArr', JSON.stringify(dataArr))
				
				
			} */
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
	  height: 100%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		z-index: 99;
		
		.list-item {
			padding:0 24upx;
			color:#333;
			.item-addTime {
				font-size: 30upx;
				height: 88upx;
				line-height: 88upx;
				color:#000;
			}
			.list-item-title {
				padding:24upx;
				position: relative;
			}
			.list-item-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom:20upx;
			}
			.list-item-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.item-num {
				font-size: 28upx;
				color:#999;
			}
			.item-total {
				font-size: 34upx;
				color:#000;
			}
			.list-item-list {
				padding:0 24upx;
				
				.list-item-inner {
					padding:24upx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.item-inner-left {
						
						.item-username {
							font-size: 30upx;
							color:#333;
							margin-bottom:14upx;
						}
						.item-time {
							font-size: 28upx;
							color:#aaa;
						}
						.item-money {
							font-size: 32upx;
							color:#333;
						}
					}
				}
			}
		}
		.list-item-title:after {
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
	
	

</style>
