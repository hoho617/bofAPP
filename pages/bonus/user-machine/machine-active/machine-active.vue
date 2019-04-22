<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="gap-height-div"></view>
				<view class="info-block">
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">会员账号</view>
							<input class="value" disabled type="text" name="account" placeholder="请输入会员姓名" v-model="account" :value="account" />
						</view>
						<view class="block-info-item">
							<view class="title">会员姓名</view>
							<!-- <input class="value" disabled type="text" name="trueName" placeholder="请输入会员姓名" v-model="trueName" :value="trueName" /> -->
							<view class="value">{{trueName}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">报单金额</view>
							<input class="value" @blur="checkBdmoney" type="text" name="bdmoney" placeholder="请输入报单金额" v-model="bdmoney" :value="bdmoney" />
							<!-- <view class="value">{{bdmoney}}</view> -->
						</view>
						<view class="block-info-item">
							<view class="title">节点账号</view>
							<!-- <view class="value">{{rUserName}}</view> -->
							<input class="value" disabled type="text" name="rUserName" placeholder="请输入节点账号" v-model="rUserName" :value="rUserName" />
						</view>
						<view class="block-info-item">
							<view class="title">市场位置</view>
							<view class="value">
								{{pos == 1?'公有社区':'私有社区'}}
							</view>
						</view>
						<view class="block-collapse-item" v-show="showService">
							<view class="title">服务区域</view>
							<view class="uni-list">
							    <view class="uni-list-cell uni-collapse" v-for="(list,index) in serviceLists" :key="index" :class="index === serviceLists.length - 1 ? 'uni-list-cell-last' : ''">
							        <view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
							            @click="trigerCollapse(index)">
							            {{list.title}}
							        </view>
							        <view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
							            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key" :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
							                <view class="uni-list-cell-navigate uni-navigate-right"> {{item}} </view>
							            </view>
							        </view>
							    </view>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="applyConfirm">确认激活</view>
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
				userId:'',
				bdmoney:0,
				account:'',
				trueName:'',
				rUserName:'',
				rank:'',
				pos:'',
				serviceLists: [{
				        title: "卓越世纪城一期",
				        show: false,
				        item: ["卓越世纪城A栋", "卓越世纪城A栋群楼", "卓越世纪城B栋","卓越世纪城C栋","卓越世纪城C栋楼","卓越世纪城E栋"]
				    },
				    {
				        title: "福田保税区",
				        show: false,
				        item: ["长平商务大厦", "万乘储运大厦", "赛格储运大厦","深福保科技公园","深装总大厦"]
				    },
				    {
				        title: "万德大厦",
				        show: false,
				        item: ["万德大厦", "万德大厦群楼"]
				    }
				],
				pUserName:'',
				showService:false
			}
		},
		computed: {
			...mapState(['token'])
		},
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			if(e['id']){
				let userId = e['id'];
				console.log('userId',userId);
				this.userId = userId;
			}
			if(e['bdmoney']){
				let bdmoney = e['bdmoney'];
				console.log('bdmoney',bdmoney);
				this.bdmoney = bdmoney;
			}
			if(e['userName']){
				let userName = e['userName'];
				console.log('userName',userName);
				this.account = userName;
				this.bindInfo(userName);
			}
			this.getUserInfo();
			this.loadRankMoneyList();
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
							let pUserName = data.userName;
							this.pUserName = pUserName;
							if(pUserName == 'Y88888'){
								this.showService = true;
							}else {
								this.showService = false;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bindInfo(userName){
				uni.request({
					url: this.websiteUrl + 'team/user_info',
					method: 'POST',
					data: {
						userName: userName
					},
					dataType: 'json', //服务器返回json格式数据
					header: {
						'content-type': 'application/json',
						'Token': this.token
					},
					success: res => {
						var res = res.data;
						if (res.code == 200) {
							console.log("获取team user info成功："+JSON.stringify(res));
							var data = res.data;
							this.userId = data.id;
							this.trueName = data.trueName;
							this.rUserName = data.rUserName;
							this.rank = data.rank;
							this.pos = String(data.pos);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadRankMoneyList(){
				uni.request({
					url: this.websiteUrl + 'finance/get_rank_list',
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
							console.log('ranklist为---',JSON.stringify(res))
							var data = res.data;
							this.levelList = data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			checkBdmoney(){
				let bdmoney = this.bdmoney;
				if(bdmoney % 10 != 0){
					uni.showToast({
						title:'报单金额请输入10的整数倍',
						icon:'none',
					})
					this.bdmoney = '';
					return false;
				}
			},
			trigerCollapse(e) {
			    for (let i = 0, len = this.serviceLists.length; i < len; ++i) {
			        if (e === i) {
			            this.serviceLists[i].show = !this.serviceLists[i].show;
			        } else {
			            this.serviceLists[i].show = false;
			        }
			    }
			
			},
			applyConfirm(){
				var userInfo = {
					userId: this.userId,
					trueName: this.trueName,
					rUserName: this.rUserName,
					pos: this.pos,
					rank: this.rank,
					bdmoney: this.bdmoney
				};
				let bdmoney = this.bdmoney;
				if(bdmoney % 10 != 0 || bdmoney == 0){
					uni.showToast({
						title:'报单金额请输入10的整数倍',
						icon:'none',
					})
					this.bdmoney = '';
					return false;
				}
				console.log('矿机激活的请求数据为',JSON.stringify(userInfo));
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要激活该会员吗?',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({
								title:'正在激活中...'
							})
							uni.request({
								url: that.websiteUrl + 'team/user_check',
								method: 'POST',
								data:userInfo,
								dataType:'json',//服务器返回json格式数据
								header:{'Content-Type':'application/json','Token':that.token},
								success: res => {
									var res = res.data;
									console.log("激活："+JSON.stringify(res));
									let title = !res.message ? '激活成功！':res.message;
									if(res.code == 200){
										// console.log("激活："+JSON.stringify(res));
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			showSinglePicker(){
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			showMulLinkageThreePicker(e){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				let addressSuffix = e.label.split('-').join(' ');
				this.addressSuffix = addressSuffix;
				console.log(e.cityCode);
				let addressCodeArr = [];
				let areaCode = e.cityCode;
				let provinceCode = areaCode.substr(0,2);
				let cityCode = areaCode.substr(0,4);
				addressCodeArr[0] = provinceCode;
				addressCodeArr[1] = cityCode;
				addressCodeArr[2] = areaCode;
				console.log(addressCodeArr)
				this.addressCodeArr = addressCodeArr;
				
			},
			onConfirmSex(e){
				this.sexText = e.label;
				this.sexCode = e.value;
			},
			editUserInfo(){
				let userName = this.account;
				let trueName = this.trueName;
				let addressCodeArr = this.addressCodeArr;
				let province = addressCodeArr[0]?addressCodeArr[0]:'11';
				let city = addressCodeArr[1]?addressCodeArr[1]:'1101';
				let area = addressCodeArr[2]?addressCodeArr[2]:'110101';
				let sex = this.sexCode;
				let idcard = this.idcard;
				let mobile = this.mobile;
				let data = {
					userName:userName,
					trueName:trueName,
					mobile:mobile,
					province:province,
					city:city,
					area:area,
					sex:sex,
					idcard:idcard
				}
				console.log(data)
				if(!trueName || !mobile || !sex){
					uni.showToast({
						icon: 'none',
						title: '请先完善您的信息!',
						duration:2000
					});
					return false;
				}else {
					this.requestModifyUserInfo(data);
				}
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
