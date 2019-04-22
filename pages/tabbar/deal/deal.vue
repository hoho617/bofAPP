<template>
	<view class="wrap-container grey-body" :class="{'active':active}">
		<!-- <image class="logo" :class="{'active':active}" src="../../../static/logo.png"  mode="aspectFit"></image> -->
		<view class="tabbar-box-wrap">
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/bonus/user-exchange/user-exchange')">
					<text class="ticket">DXE-店小二 <text class="bg-grey" style="display:inline-block;font-size:13px;margin-top:8px;height: 28px;line-height:28px;border-radius:5px;padding:0 5px;">距开盘:100日</text></text>
					<text class="num">10000.08</text>
					<text class="li-right">1.30</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/bonus/user-exchange/user-exchange')">
					<text class="ticket">BOF-宝石券</text>
					<text class="num">{{dealNum}}</text>
					<text class="li-right">{{nowPri}}</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/bonus/user-exchange/user-exchange')">
					<text class="ticket">麦优厨房</text>
					<text class="num">16208.08</text>
					<text class="li-right">1.46</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/bonus/user-exchange/user-exchange')">
					<text class="ticket">茶品荟</text>
					<text class="num">32000.84</text>
					<text class="li-right">1.60</text>
				</view>
				<view class="tabbar-box-item" @click="goToPage('/pages/bonus/balance-list/balance-list')">
					<text class="ticket">通证</text>
					<text class="num">{{moneyPrice}}</text>
					<view class="line" style="display: flex;align-items: center;justify-content: center;">
						<text style="height: 2px;background: #fff;width:80%;display: inline-block;" v-if="!dealPri"></text>
						<text v-else>{{dealPri}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template> 

<script>
	import {mapState,mapMutations} from 'vuex';
export default {
	data() {
		return {
			active: false,
			dealPri:0,
			dealNum:0,
			nowPri:0,
			moneyPrice:0
		};
	},
	computed: mapState(['token']),
	onLoad() {
	},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		this.getNowPri();
		this.loadFinanceStatistics();
		uni.showTabBar({
			animation:true
		})
		// }, 500);
	},
	onHide() {
		this.active = false;
		uni.setStorageSync("$pageIndex",2);
	},
	methods: {
		getNowPri(){
			uni.request({
				url: this.websiteUrl + 'finance/get_now_pri',
				method: 'POST',
				data:{},
				dataType:'json',//服务器返回json格式数据
				header:{'Content-Type':'application/json','Token':this.token},
				success: res => {
					var res = res.data;
					console.log("获取24小时内K线明细记录："+JSON.stringify(res))
					if(res.code == 200){
						this.dealNum = res.data.dealNum;
						this.dealPri = res.data.dealPri;
						this.nowPri = res.data.nowPri;
					}
					
				},
				fail: () => {},
				complete: () => {}
			});
		},
		loadFinanceStatistics() {
			uni.request({
				url: this.websiteUrl + 'finance/statistics',
				method: 'POST',
				data: {},
				dataType: 'json', //服务器返回json格式数据
				header: {
					'content-type': 'application/json',
					'Token': this.token
				},
				success: res => {
					var res = res.data;
					if(res.code==200){
						console.log("获取finance statistics成功："+JSON.stringify(res));
						this.moneyPrice = res.data.b1.toFixed(2);
					}
					
				},
				fail: () => {},
				complete: () => {}
			});
		},
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	@import url("../../../static/css/deal.css");
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: #999;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -400upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 1;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
