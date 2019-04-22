<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="list-box panel-center bg-white">
				<view class="list-item" v-for="(item,index) in bonusList" :key="index">
					<view class="list-item-top">
						<view class="item-title">{{item.addTime}}</view>
						<view class="item-money" :class="item.money >= 0?'red':'green'">{{item.momey > 0?'+':''}}{{item.money}}</view>
					</view>
					<view class="item-memo">{{item.memo}}</view>
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
				bonusList:[], //银行卡列表
				moneyType:'',
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
			var moneyType1 = parseInt(e['moneyType']);
			var moneyType = [];
			if(e['moneyType2']) {
				console.log(typeof e['moneyType']);
				var moneyType2 = parseInt(e['moneyType2']);
				moneyType = [moneyType1,moneyType2];
			}else {
				moneyType = [moneyType1];
			}
			this.moneyType = moneyType;
			var title = e['title']
			uni.setNavigationBarTitle({
				title: title
			});
			this.loadBonusList();
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			loadBonusList(flag){
				console.log('发送的参数',pageIndex,this.pageSize,[this.moneyType]);
				uni.request({
					url: this.websiteUrl + 'finance/balance_list',
					method: 'POST',
					data:{
						pageIndex: pageIndex,
						pageSize: this.pageSize,
						moneyType: this.moneyType
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取bonusList成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = data.list;
							list.forEach((item)=>{
								item.addTime = this.customMethods.getDate(item.addTime);
							})
							if(flag){
								this.bonusList = this.bonusList.concat(list);
								console.log('取到的data长度',list.length);
							}else {
								this.bonusList = list;
								this.pages = data.pages;
							}
							
							
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
					this.loadBonusList(true);
				},500)
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../../static/css/bonus.css");
	page{
	  height: 100%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		background-color: #f4f4f4;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	
	

</style>
