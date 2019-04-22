<template>
	<view class="wrap-container">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="add-pic-area panel-center bg-white" v-if="addPic" @click="chooseImage">
					<view class="addpic-btn">
						<text class="icon2 icon-add"></text>
					</view>
					<view class="addpic-txt">上传汇款凭证</view>
				</view>
				<view class="preview-area" v-else>
					<image :src="imageUrl" mode="widthFix"></image>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-bottom">
			提交
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				addPic:true,
				tradingId:'',
				imageUrl:''
			}
		},
		computed: {
			...mapState(['token'])
		},
		onLoad(e){
			if(e['tradingId']){
				console.log('tradingId',e['tradingId']);
				this.tradingId = e['tradingId'];
			}
		},
		methods: {
			chooseImage(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						that.addPic = false;
						that.imageUrl = res.tempFilePaths[0];
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.wrap-container {
		height: 100%;
		
		.scroll-view{
			position: absolute;
			top:0;
			bottom:100upx;
			width:100%;
			
			
			.add-pic-area {
				text-align: center;
				padding:40upx 0;
				.addpic-btn {
					
					.icon-add {
						font-size: 400upx;
						color:#808080;
					}
				}
				.addpic-txt {
					font-size: 38upx;
					color:#666;
				}
			}
			
			.preview-area {
				padding:40upx;
				image {
					width:100%;
				}
			}
		}
		
		.fixed-bottom {
			position: fixed;
			bottom:0;
			width:100%;
			height: 100upx;
			font-size: 36upx;
			color:#fff;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #dd524d;
		}
	}
</style>
