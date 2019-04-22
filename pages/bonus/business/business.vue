<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;">
			<view class="view-top bg-white">
				<view class="total-txt">今日收款 {{receivedTotalNum}} 笔，合计</view>
				<view class="bigest-font">{{receivedTotalMoney}}</view>
			</view>
			<view class="gap-height-div"></view>
			<view class="view-block bg-white">
				<view class="block-item" @click="turnToPage">
					<view class="item-left">
						<text class="icon2 icon-formfill"></text>
						收款记录
					</view>
				</view>
				<view class="block-item">
					<view class="item-left">
						<text class="icon2 icon-noticefill"></text>
						收款语音提醒
					</view>
					<view class="item-right">
						<switch />
					</view>
				</view>
			</view>
			<view></view>
			<view></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				receivedTotalNum:0,
				receivedTotalMoney:0
			}
		},
		onLoad(){
			this.getTotal();
		},
		methods: {
			getTotal(){
				uni.request({
					url: this.websiteUrl + 'seller_index',
					method: 'POST',
					data: {},
					dataType: 'json', //服务器返回json格式数据
					header: {
						'content-type': 'application/json',
						'Token': this.token
					},
					success: res => {
						var res = res.data;
						if (res.code == 200) {
							console.log("商家的当天收款统计：" + JSON.stringify(res));
							var data = res.data;
							this.receivedTotalNum = data.num;
							this.receivedTotalMoney = data.money;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			turnToPage(){
				uni.navigateTo({
					url:'/pages/bonus/business/business-list/business-list'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/colorui/main.css");
	page {
		height: 100%;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		.view-top {
			height: 400upx;
			text-align: center;
			padding-top:120upx;
			.total-txt {
				font-size: 30upx;
				opacity: .5;
				margin-bottom:40upx;
			}
			.bigest-font {
				font-size: 66upx;
				opacity: 1;
				font-weight: bold;
			}
		}
		.view-block {
			
			.block-item {
				height: 120upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:0 24upx;
				color:#808080;
				.item-left {
					font-size: 32upx;
					display: flex;
					align-items: center;
					.icon2 {
						font-size: 44upx;
						margin-right:8upx;
						color:var(--yellow)
					}
				}
			}
		}
	}
</style>
