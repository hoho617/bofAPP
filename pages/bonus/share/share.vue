<template>
	<view class="scroll-view">
		<view class="swiper-area bg-white">
			<swiper class="swiper" @animationfinish="createCode" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" @change="hideCode">
				<swiper-item v-for="(item,index) in swiperListSrc" :key="index">
					<view class="swiper-item">
						<image :src="item" :alt="item" @error="errorMsg"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="qrcode-area">
				<qrcode :val="qrval" :size="qrsize" ref="qrcode" :codeType="0"></qrcode>
			</view>
		</view>
		<view class="saveimg-area" v-show="saveImage">
			<canvas style="width: 100%; height: 100%;margin:0 auto;" canvas-id="shareCanvas"></canvas>
		</view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import qrcode from '@/components/qrcode/qrcode.vue'
	var ctx = null;
	export default {
		components: {
			qrcode
		},
		data() {
			return {
				swiperList:[], //
				qrval:'',
				qrsize:140,
				filePath:'',
				saveImage:false
			}
		},
		computed: {
			...mapState(['token','userName']),
			swiperListSrc(){
				return this.swiperList.map((item) => {
					return this.getImageUrl(item);
				})
			}
		},
		onShow(){
			
		},
		onLoad(e) {
			if(e['title']) {
				var title = e['title']
				uni.setNavigationBarTitle({
					title: title
				});
			}
			this.getImageList();
			let text = 'http://m.bof.kim?pos=3&pUserName=' + this.userName + '&version=1';
			this.qrval = text;
			
		},
		onNavigationBarButtonTap(e) {
			let _self = this;
			this.saveImage = true;
			let windowWidth,windowHeight;
			uni.getSystemInfo({
				success(res) {
					windowWidth = res.windowWidth;
					windowHeight = res.windowHeight;
				}
			})
			console.log(windowHeight,windowWidth)
			
			ctx = uni.createCanvasContext("shareCanvas");
			ctx.clearRect(0, 0, windowWidth, windowWidth);
			let codeSrc = uni.getStorageSync('$codeSrc');
			console.log(codeSrc)
			ctx.drawImage('/static/img/share/share.PNG', 0, 0, windowWidth, windowHeight);
			ctx.drawImage(codeSrc,130,418,120,110)
			ctx.draw();
			setTimeout(()=>{
				uni.canvasToTempFilePath({
					canvasId: 'shareCanvas',
					success: function(res) {
						this.filePath = res.tempFilePath
						// callback&&callback(res.tempFilePath)
						uni.showLoading({
							title: '正在保存'
						});
						uni.saveImageToPhotosAlbum({
							filePath: this.filePath,
							success: function () {
								uni.showToast({
									title: '图片保存成功～'
								});
							},
							fail: function (e) {
								//TODO
							},
							complete: function (){
								uni.hideLoading()
								_self.saveImage = false;
							}
						});
					},
					fail:function () {
						//TODO
					}
				})
			},500)
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			getImageList(){
				uni.request({
					url: this.websiteUrl + 'icon/shop_decorate',
					method: 'POST',
					data: {
						pageSize: 1,
						type: 11,
						moduleType: 1,
						moduleCode: 'swiper_banner'
					},
					dataType:'json',//服务器返回json格式数据
					headers:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取轮播图数据成功："+JSON.stringify(res.data));
							let data = res.data;
							let list = eval('(' + data[0].content + ')').pic;
							console.log(list)
							this.swiperList = list;
							this.createCode();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			drawScreen(){
				
			},
			savePic(){
				
				
			},
			hideCode(){
				this.$refs.qrcode.clearQrcode();
			},
			createCode(){
				this.$refs.qrcode.creatQrcode();
			}
			
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
		.swiper-area {
			height: 90%;
			width:86%;
			margin:60upx auto 0;
			position: relative;
			.swiper {
				height: 100%;
				width:100%;
				.swiper-item {
					position: absolute;
					top:0;
					left:0;
					right:0;
					bottom:0;
					image {
						width:100%;
						height: 100%;
						border-radius: 10upx;
					}
				}
			}
			.qrcode-area {
				position: absolute;
				bottom:128upx;
				left:50%;
				transform: translateX(-50%);
			}
		}
		
		
	}
	.saveimg-area {
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom: 0;
		z-index: 999;
		.saveimg-area canvas {
			z-index: 1000;
		}
	}

</style>
