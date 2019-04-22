<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="gap-height-div"></view>
				<view class="info-block">
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">转账类型</view>
							<view class="value picker-value">
								<picker @change="bindPickerChange1" :value="index1" :range="array1">
								       <text>{{array1[index1]}}</text>
								</picker>
								<text class="uni-icon uni-icon-arrowdown"></text>
							</view>
						</view>
						<view class="block-info-item">
							<view class="title">安全密码</view>
							<input class="value" type="number" placeholder="请输入安全密码" v-model="secPwd" :value="secPwd" />
						</view>
						<view class="block-info-item">
							<view class="title">矿机</view>
							<input class="value" type="number" disabled v-model="machineNumber" :value="machineNumber" />
						</view>
						<view class="block-info-item">
							<view class="title">转换金额</view>
							<view class="value picker-value">
								 <picker @change="bindPickerChange" :value="index" :range="array">
								        <text class="picker-text">{{array[index]}}</text>
								 </picker>
								 <text class="uni-icon uni-icon-arrowdown"></text>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="applyConfirm">提交申请</view>
		</view>
	
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
		
		},
		data() {
			return {
				nowPri:1,
				machineNumber:0,
				b5:'',
				secPwd: '',
				rank:'0',
				rankName:'',
				rankMoney:'',
				array: [1000,5000,10000,30000,50000],
				index:0,
				// array1: ['余额转矿机','收益转宝石劵','收益转余额'],
				array1: ['余额转矿机'],
				index1:0,
				levelList:[]
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"/pages/bonus/user-machine/upgrade-list/upgrade-list"
			})
		},
		computed: {
			...mapState(['token']),
			rankLevel(){
				let moneys = [];
				let rankNames = [];
				let ranks = [];
				this.levelList.forEach((item)=>{
					moneys.push(item.money);
					rankNames.push(item.rankName);
					ranks.push(item.rank)
				})
				let index = this.index;
				if(index >=3){
					index =3;
				}
				return rankNames[index] + '    ('+ moneys[index] + ')' 
			}
		},
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			let b5 = uni.getStorageSync("$b5");
			this.machineNumber = parseFloat(b5);
			this.b5 = parseFloat(b5);
			this.getNowPri();
		},
		methods: {
			getNowPri() {
				uni.request({
					url: this.websiteUrl + 'finance/get_now_pri',
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
							console.log("获取k line onedata成功："+JSON.stringify(res));
							var data = res.data;
							this.nowPri = data.nowPri;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				let sel_money = Number(this.array[e.target.value]);
				let machineNumber;
				if(this.nowPri){
					machineNumber = ((sel_money/this.nowPri) + this.b5);
					this.machineNumber = machineNumber.toFixed(2);
				}
				
			},
			applyConfirm(){
				let secPwd = this.secPwd;
				if(!secPwd){
					uni.showToast({
						icon: 'none',
						title: '密码不为空',
						duration:2000,
						success:function(){
						}
					});
					return false;
				}
				var userInfo = {
					transferType: this.index1 == 0?1:2,
					money: this.machineNumber,
					secPwd: this.secPwd,
				};
				console.log('矿机升级的请求数据为',JSON.stringify(userInfo));
				uni.showLoading({
					title:'正在升级中...',
				})
				uni.request({
					url: this.websiteUrl + 'finance/bonus_transfer',
					method: 'POST',
					data:userInfo,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '转换成功！':res.message;
						if(res.code == 200){
							console.log("转换成功！："+JSON.stringify(res));
							setTimeout(()=>{
								uni.showToast({
									icon: 'none',
									title: title,
									duration:2000,
									success:function(){
										uni.hideLoading();
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
									}
								});
							},2000)
						}else {
							uni.showToast({
								icon: 'none',
								title: title,
								duration:2000,
								success:function(){
									uni.hideLoading();
									setTimeout(()=>{
										return false;
									},1000)
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	/* @import '../../../uni.scss'; */
	page{
	  height: 100%;
	  background-color: #f4f4f4;
	}
	view {
		box-sizing: border-box;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:100upx;
		width:100%;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	.info-block {
		padding:0 20upx;
	}
	.block-title {
		height: 80upx;
		display: flex;
		align-items: center;
	}
	.block-wrap {
		
	}
	.address-info {
		color:#808080;
		padding:0 25upx 0 0;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	.right-arrow {
		font-size: 34upx;
		color:#ccc;
	}
	.block-info-item {
		display: flex;
		align-items: center;
		padding:0 24upx;
		position: relative;
		height: 88upx;
	}
	.block-info-item .title {
		width:200upx;
		font-size: 32upx;
		/* text-align: right; */
	}
	.block-info-item:after {
		content:"";
		display: block;
		height: 2upx;
		background-color: #eee;
		left:24upx;
		position: absolute;
		bottom:0;
		right:0;
	}
	.block-info-item .value {
		display: flex;
		align-items: center;
		color:#333;
		font-size: 32upx;
	}
	.block-info-item .picker-value {
		flex: 2;
		display: flex;
		justify-content: space-between;
	}
	.picker-text {
		width:400upx;
		display: inline-block;
	}
	.picker-value .uni-icon {
		font-size: 40upx;
		opacity: .5;
	}
	
	.block-collapse-item {
		padding:0 24upx;
	}
	.block-collapse-item .title {
		height: 88upx;
		font-size: 32upx;
		line-height: 88upx;
	}
	
	
	
	.fixed-footer {
		position: fixed;
		bottom:0;
		width:100%;
		height: 110upx;
		line-height: 110upx;
		z-index: 99;
	}
	.red-btn-bottom {
		background-color: #db4c3f;
		color:#fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
		height: 100%;
		font-size: 34upx;
	}
	

</style>
