<template>
	<view class="wrap-container grey-body">
      <view class="panel-center">
				<view class="panel-item bg-white">
					<view class="panel-title">
						<image src="../../../static/img/index/money.png" class="icon-image" mode="widthFix"></image>
						<text>基本管理</text>
					</view>
					<view class="grid-box">
						<view class="grid-col-3">
							<navigator url="/pages/bonus/reward-list/reward-list">
								<text class="icon2 icon-flashlightopen color-red"></text>
								<view class="grid-title">分红明细</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<view class="event-view" @click="showErrorToast">
								<text class="icon2 icon-moneybag color-orange"></text>
								<view class="grid-title">国际钱包</view>
							</view>
						</view>
						<view class="grid-col-3">
							<navigator url="/pages/bonus/share-list/share-list">
								<text class="icon2 icon-upstage color-yellow"></text>
								<view class="grid-title">分享</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<navigator url="/pages/bonus/user-recharge/user-recharge">
								<text class="icon2 icon-sponsor color-olive"></text>
								<view class="grid-title">充值</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<navigator url="/pages/bonus/user-machine/machine-upgrade/machine-upgrade">
								<text class="icon2 icon-upblock color-cyan"></text>
								<view class="grid-title">升级矿机</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<navigator url="/pages/bonus/user-machine/machine-start/machine-start">
								<text class="icon2 icon-camerarotate color-blue"></text>
								<view class="grid-title">启动矿机</view>
							</navigator>
						</view>
						<!-- <view class="grid-col-3">
							<navigator url="">
								<text class="icon2 icon-read color-purple"></text>
								<view class="grid-title">找项目</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<navigator url="">
								<text class="icon2 icon-profile color-mauve"></text>
								<view class="grid-title">我的账户</view>
							</navigator>
						</view> -->
					</view>
				</view>
				<view class="gap-height-div"></view>
				<view class="panel-item bg-white">
					<view class="panel-title">
						<image src="../../../static/img/index/smile.png" class="icon-image" mode="widthFix"></image>
						<text>商家管理</text>
					</view>
					<view class="grid-box">
						<view class="grid-col-3">
							<navigator url="/pages/bonus/business/business">
								<text class="icon2 icon-shop color-brown"></text>
								<view class="grid-title">商家</view>
							</navigator>
						</view>
						<view class="grid-col-3">
							<navigator url="/pages/bonus/buyer-list/buyer-list">
								<text class="icon2 icon-goods color-pink"></text>
								<view class="grid-title">买家</view>
							</navigator>
						</view>
					</view>
				</view>
				
			</view>
	</view>
</template>

<script>
	
	export default {
		components:{
			
		},
		data() {
			return {
				
			}
		},
		onShow(){
			uni.showTabBar({
				animation:true
			})
		},
		onLoad() {
			
		},
		onHide(){
			uni.setStorageSync("$pageIndex",1);
		},
		methods: {
			showErrorToast(){
				uni.showToast({
					title:'该功能暂未开放，敬请期待！',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/css/finance.css");
	@import url("../../../static/colorui/main.css");
	page{
	  height: 100%;
	}
	.color-red {
		color:var(--red);
	}
	.color-orange {
		color:var(--orange);
	}
	.color-yellow {
		color:var(--yellow);
	}
	.color-green {
		color:var(--green);
	}
	.color-cyan {
		color:var(--cyan);
	}
	.color-olive {
		color:var(--olive);
	}
	.color-blue {
		color:var(--blue);
	}
	.color-purple {
		color:var(--purple);
	}
	.color-mauve {
		color:var(--mauve);
	}
	.color-pink {
		color:var(--pink);
	}
	.color-brown {
		color:var(--brown);
	}
</style>
