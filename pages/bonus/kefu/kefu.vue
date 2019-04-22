<template>
	<view class="scroll-view">
		<view class="kefu bg-white">
			<image src="../../../static/img/share/kefu2.png" class="person"></image>
			<image src="../../../static/img/share/text_bj.png" class="box" ></image>
			<view class="hello">Hi,我是您的BOF客服小浠,我为您准备了以下服务!</view>
		</view>
		<view class="contact bg-white">
			<view class="contact-item" @click="call('4009626580')">
				<view class="contact-methods">
					<image src="../../../static/img/share/phone.png" mode="widthFix" class="box icon-image" ></image>
					<view class="title">客服热线</view>
				</view>
				<view class="num">400&nbsp;9626&nbsp;580</view>
			</view>
			<view class="contact-item" @click="setClipboard('LAN819951541')">
				<view class="contact-methods">
					<image src="../../../static/img/share/weixin.png" mode="widthFix" class="box icon-image" ></image>
					<view class="title">微信</view>
				</view>
				<view class="num">LAN819951541</view>
			</view>
		</view>
		<view class="contact bg-white codeimg-box">
			<view class="code-item" v-for="(item,index) in codeImgList" :key="index" @click="showPreviewImg(item)">
				<image :src="item.path" mode="widthFix"></image>
			</view>
		</view>
		<view class="swiper-area bg-black" v-show="previewImg">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current">
				<swiper-item v-for="(item,index) in codeImgList" :key="index">
					<view class="swiper-item">
						<view class="save-btn" @click="saveImg(item)">保存</view>
						<image :src="item.path" mode="widthFix" @click="hidePreviewImg"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="qrcode-area">
				<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
			</view>
		</view>
		<!-- <view class="saveimg-area" v-show="saveImage">
			<canvas style="width: 100%; height: 100%;margin:0 auto;" canvas-id="shareCanvas"></canvas>
		</view> -->
		<view class="fixed-footer" @click="openQQ">
			<image src="../../../static/img/share/btn_bj.png" style="width:100%;height: 100%;position: absolute;bottom:0;left:0;" mode="widthFix"></image>
			<view class="footer-btn">
				<image src="../../../static/img/share/kefu1.png" style="width:40upx;margin-right:10upx;" mode="widthFix"></image>
				<text>找不到答案,向小浠提问吧</text>
			</view>
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
				codeImgList:[
					{
						id:1,
						path:'../../../static/img/share/dow_android.png'
					},
					{
						id:2,
						path:'../../../static/img/share/don_ios.png'
					},
					{
						id:3,
						path:'../../../static/img/share/weixin_zgh.png'
					}
				], //
				filePath:'',
				saveImage:false,
				indicatorDots: true,
				previewImg:false,
				current:0, //当前滑块的位置
			}
		},
		computed: {
			...mapState(['token','userName'])
		},
		onShow(){
			
		},
		onLoad(e) {
			
		},
		methods: {
			showPreviewImg(item){
				this.previewImg = true;
				this.current = item.id-1;
			},
			hidePreviewImg(){
				this.previewImg = false;
			},
			saveImg(item){
				uni.showLoading({
					title: '正在保存'
				});
				let self = this;
				uni.saveImageToPhotosAlbum({
					filePath: item.path,
					success: function () {
						setTimeout(()=>{
							uni.showToast({
								title: '图片保存成功～'
							});
							self.previewImg = false;
						},1000)
					}
				});
			},
			call(number){
				uni.makePhoneCall({
					phoneNumber: number
				});
			},
			setClipboard(data){
				uni.setClipboardData({
					data: data,
					success: function () {
						uni.showToast({
							title: '复制成功'
						});
					}
				});
			},
			openQQ(){
				//#ifdef APP-PLUS
				console.log(plus.os.name)
				if (plus.os.name == "Android") {
					var main = plus.android.runtimeMainActivity();
					var Intent = plus.android.importClass('android.content.Intent');
					var Uri = plus.android.importClass('android.net.Uri');
					var intent = new Intent(Intent.ACTION_VIEW, Uri.parse(
						"mqqwpa://im/chat?chat_type=wpa&uin=819951541"));
					try {
						main.startActivity(intent);
					} catch (a) {
						mui.toast("检查到您未安装QQ，请先下载QQ");
					}

				}
				if (plus.os.name == "iOS") {
					plus.runtime.launchApplication({
						action: "mqq://im/chat?chat_type=wpa&uin=1301255937&version=1&src_type=web"
					}, function (e) {
						plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function (i) {
							if (i.index == 0) {
								iosAppstore("itunes.apple.com/cn/app/mqq/");
							}
						});
					});
				}
				//#endif
				/* uni.navigateTo({
					url:'/pages/bonus/qq/qq'
				}); */
			},
			createCode(){
				this.$refs.qrcode.creatQrcode();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../../static/css/kefu.css");
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
			position: fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			z-index: 99;
			.swiper {
				height: 100%;
				width:100%;
				.swiper-item {
					position: absolute;
					top:0;
					left:0;
					right:0;
					bottom:0;
					text-align: center;
					.save-btn {
						font-size: 32upx;
						color:#fff;
						text-align: right;
						padding-top:40upx;
						padding-right:60upx;
					}
					image {
						margin-top:160upx;
						width:70%;
						height: 100%;
						border-radius: 10upx;
						vertical-align: middle;
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
