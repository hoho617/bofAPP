<template>
	<view class="scroll-view bg-white">
		<view class="code-area" v-show="!saveImage">
			<view class="code-title">无需加好友，扫二维码向我支付</view>
			<view class="code-box">
				<qrcode :val="qrval" :size="qrsize" ref="qrcode" :codeType="1"></qrcode>
			</view>
			<view class="code-btns">
				<view class="btn-setting" @click="showToast">设置数额</view>
				<view class="btn-save" @click="savePic">保存收款码</view>
			</view>
		</view>
		<view class="code-area saveimg-area" v-show="saveImage">
			<canvas style="width: 100%; height: 100%;margin:0 auto;" canvas-id="codeCanvas"></canvas>
			<!-- <view class="code-title code-title-green">欢迎使用 BOF 支付</view>
			<view class="code-box">
				<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
			</view>
			<view class="code-infos">
				<view class="btn-setting">账户：<text>{{userName}}({{trueName}})</text></view>
				<view class="btn-save">手机：<text>{{mobile}}</text></view>
			</view> -->
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
				userName:'', //
				trueName:'', //
				mobile:'', //
				qrval:'',
				qrsize:240,
				filePath:'',
				saveImage:false
			}
		},
		computed: {
			...mapState(['token','userName'])
		},
		onShow(){
			
		},
		onLoad(e) {
			
			this.getUserInfo();
			ctx = uni.createCanvasContext("codeCanvas");
			
			
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"/pages/bonus/code-receivable/receive-list/receive-list"
			})
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			getUserInfo() {
				uni.request({
					url: this.websiteUrl + 'user/info',
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
							// console.log("获取用户信息成功："+JSON.stringify(res));
							var data = res.data;
							let userName = data.userName;
							let trueName = data.trueName;
							let mobile = data.mobile;
							
							this.userName = userName;
							this.trueName = trueName;
							this.mobile = mobile;
							
							let userTrueName = encodeURIComponent(trueName)
							let text = 'http://m.bof.kim?pos=3&pUserName=' + userName+ '&version=1&' + '&userName='+userTrueName;
							// let text = 'http://m.bof.kim?pos=3&pUserName=' + this.userName + '&version=1';
							this.qrval = text;
			
							setTimeout(this.createCode,1000)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			savePic(){
				this.saveImage = true;
				
				let _self = this;
				let windowWidth,windowHeight;
				uni.getSystemInfo({
					success(res) {
						windowWidth = res.windowWidth;
						windowHeight = res.windowHeight;
					}
				})
				console.log(windowHeight,windowWidth)
				
				let codeSrc = uni.getStorageSync('$codePaySrc');
				console.log(codeSrc)
				// ctx.drawImage('/static/img/share/share.PNG', 0, 0, windowWidth, windowHeight);
				ctx.setFontSize(20);
				ctx.setFillStyle('#008000');
				ctx.setTextAlign('center');
				ctx.fillText('欢迎使用 BOF 支付', windowWidth/2, 30)//270就是x坐标的中心点位置
				
				ctx.beginPath();
				ctx.drawImage(codeSrc,windowWidth/2-120,windowHeight/2-250,240,240);
				ctx.beginPath();
				ctx.setFontSize(14);
				ctx.setFillStyle('#444');
				ctx.setTextAlign('center');
				ctx.fillText('账户：'+this.userName+ '('+this.trueName+')', windowWidth/2-30, windowHeight/2+20)//270就是x坐标的中心点位置
				ctx.fillText('手机：'+this.mobile, windowWidth/2-30, windowHeight/2+40)//270就是x坐标的中心点位置
				ctx.draw();
				setTimeout(()=>{
					uni.canvasToTempFilePath({
						canvasId: 'codeCanvas',
						success: function(res) {
							this.filePath = res.tempFilePath
							// callback&&callback(res.tempFilePath)
							uni.showLoading({
								title: '正在保存'
							});
							uni.saveImageToPhotosAlbum({
								filePath: this.filePath,
								success: function () {
									setTimeout(()=>{
										uni.hideLoading()
										uni.showToast({
											title: '图片保存成功～'
										});
										_self.saveImage = false;
									},500)
								},
								fail: function (e) {
									//TODO
								},
								complete: function (){
									
								}
							});
							
						},
						fail:function () {
							//TODO
						}
					})
				},500)
			},
			hideCode(){
				this.$refs.qrcode.clearQrcode();
			},
			createCode(){
				this.$refs.qrcode.creatQrcode();
			},
			showToast(){
				uni.showToast({
					title: '尊敬的会员：此功能暂未开放,敬请期待！',
					icon:'none',
					mask:true,
					duration: 2000
				});
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
		z-index: 99;
		color:#333;
		.code-area {
			padding:38px 0;
			border-radius: 5px;
			.code-title {
				font-size: 30upx;
				text-align: center;
			}
			.code-title-green {
				font-size: 40upx;
				color:#008000
			}
			.code-box {
				/* width:440upx;
				height: 440upx; */
				margin:50upx auto;
			}
			.code-btns {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width:100%;
				view {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
					font-size: 30upx;
				}
			}
			.code-infos {
				padding-left:200upx;
				view {
					color:#808080;
					font-size: 28upx;
					margin-bottom:12upx;
					text {
						color:#333;
					}
				}
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
