<template>
	<view class="wrap-container">
		<view class="grid-table">
			<view class="grid-table-row">
				<view class="grid-table-item">社区</view>
				<view class="grid-table-item">二维码</view>
				<view class="grid-table-item">社区业绩</view>
			</view>
			<view class="grid-table-row">
				<view class="grid-table-item">公有</view>
				<view class="grid-table-item qrcode-inner" @click="register(0)">
					<qrcode :val="qrval1" :size="qrsize" ref="qrcode1" :codeType="2"></qrcode>
				</view>
				<view class="grid-table-item"><view class="red-btn-item">{{total1}}</view></view>
			</view>
			<view class="grid-table-row">
				<view class="grid-table-item">私有</view>
				<view class="grid-table-item qrcode-inner" @click="register(1)">
					<qrcode :val="qrval2" :size="qrsize" ref="qrcode2" :codeType="2"></qrcode>
				</view>
				<view class="grid-table-item"><view class="red-btn-item">{{total2}}</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import qrcode from '@/components/qrcode/qrcode.vue'
	export default {
		components:{
			qrcode
		},
		onLoad(e){
			let text1 = 'pos=4';
			let text2 = 'pos=3';
			this.qrval1 = text1;
			this.qrval2 = text2;
			
			setTimeout(()=>{
					this.createCode();
			},500)
		
			this.loadAzMap();
		},
		data() {
			return {
				qrval1:'',
				qrval2:'',
				qrsize:56,
				total1:0,
				total2:0,
				userName:''
			};
		},
		methods:{
			loadAzMap(){
				uni.request({
					url: this.websiteUrl + 'team/az_map',
					method: 'POST',
					data: {},
					dataType:'json',//服务器返回json格式数据
					headers:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取az_map数据成功："+JSON.stringify(res.data));
							let data = res.data;
							let total1 = data.total1;
							let total2 = data.total2;
							let userName = data.userName;
							if(userName){
								this.userName = userName;
							}
							if(total1 || total1 == 0){
								this.total1 = total1;
							}
							if(total2 || total2 ==0){
								this.total2 = total2;
							}
							if(total1 < total2) {
								this.total1 = total2;
								this.total2 = total1;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			register(pos){
				uni.navigateTo({
					url:'/pages/bonus/user-machine/machine-apply/machine-apply?pos='+pos
				})
			},
			hideCode(){
				this.$refs.qrcode.clearQrcode();
			},
			createCode(){
				this.$refs.qrcode1.creatQrcode();
				this.$refs.qrcode2.creatQrcode();
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.wrap-container {
		height: 100%;
		.grid-table {
			width:86%;
			margin:0 auto;
			.grid-table-row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.grid-table-item {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 140upx;
					font-size: 34upx;
					color:#333;
					flex: 1;
				}
				.grid-table-item:nth-child(2){
					border-left:2upx solid #ccc;
					border-right:2upx solid #ccc;
				}
				.red-btn-item {
					width:88%;
					margin:0 auto;
					background-color: red;
					height: 68upx;
					color:#fff;
					text-align: center;
					line-height: 68upx;
					border-radius:10upx;
					font-size: 32upx;
				}
			}
			
			.grid-table-row:nth-child(2){
				border-top:2upx solid #ccc;
				border-bottom:2upx solid #ccc;
			}
		}
	}
</style>
