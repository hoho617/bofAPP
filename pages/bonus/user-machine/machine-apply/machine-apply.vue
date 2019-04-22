<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="gap-height-div"></view>
				<view class="info-block">
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">会员账号</view>
							<view class="value">{{account}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">会员姓名</view>
							<input class="value" type="text" name="trueName" placeholder="请输入会员姓名" v-model="trueName" :value="trueName" />
						</view>
						<view class="block-info-item">
							<view class="title">以太坊地址</view>
							<view class="value">{{ethAddress}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">手 机 号</view>
							<input class="value" type="number" name="mobile" placeholder="请输入手机号" v-model="mobile" :value="mobile" />
						</view>
						<view class="block-info-item" v-show="false">
							<view class="title">矿机级别</view>
							<view class="value">{{rankLevel}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">消费金额</view>
							<view class="value picker-value">
								 <picker @change="bindPickerChange" :value="index" :range="array">
								        <text class="picker-text">{{array[index]}}</text>
								 </picker>
								 <text class="uni-icon uni-icon-arrowdown"></text>
							</view>
						</view>
						<view class="block-info-item" v-show="false">
							<view class="title">分享人账号</view>
							<view class="value">{{pUserName}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">市场位置</view>
							<view class="value picker-value">
								<picker @change="bindPickerChange1" :value="index1" :range="array1">
								       <text>{{array1[index1]}}</text>
								</picker>
								<text class="uni-icon uni-icon-arrowdown"></text>
							</view>
						</view>
						<view class="block-info-item">
							<view class="title">登录密码</view>
							<input class="value" type="number" name="password" placeholder="请输入密码" v-model="password" :value="password" />
						</view>
						<view class="block-info-item">
							<view class="title">安全密码</view>
							<input class="value" type="number" name="payPsd" placeholder="请输入6位数字密码" v-model="payPsd" :value="payPsd" />
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
			<view class="red-btn-bottom" @click="applyConfirm">确认申请</view>
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
				account:'',
				ethAddress:'',
				trueName:'',
				password:'',
				mobile:'',
				payPsd: '',
				rank:'0',
				rankName:'',
				rankMoney:'',
				bdmoney:100,
				array: [100, 1000,5000,10000,30000,50000],
				index:0,
				array1: ['公共社区','私有社区'],
				index1:0,
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
				showService:false,
				levelList:[]
			}
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
			if(e['pos']){
				let pos = e['pos'];
				console.log(pos);
				this.index1 = pos;
			}
			this.getUserInfo();
			this.getRegUsername();
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
			getRegUsername() {
				uni.request({
					url: this.websiteUrl + 'get_reg_username',
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
							console.log("获取reg init info成功："+JSON.stringify(res));
							var data = res.data;
							let account = data.userName;
							let ethAddress = data.ethAddress;
							this.account = account;
							this.ethAddress = ethAddress;
							
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				let sel_money = Number(this.array[e.target.value]);
				this.bdmoney = sel_money;
				let moneys = [];
				let rankNames = [];
				let ranks = [];
				this.levelList.forEach((item)=>{
					moneys.push(item.money);
					rankNames.push(item.rankName);
					ranks.push(item.rank)
				})
				let rank = ranks[e.target.value];
				if(e.target.value >= 3){
					rank = 3;
				}
				this.rank = rank;
				console.log('rank',this.rank);
			},
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
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
					userName: this.account,
					trueName: this.trueName,
					mobile: this.mobile,
					pUserName: this.pUserName,
					pos: this.index1 == 0?4:3,
					pwd: this.password,
					secPwd: this.payPsd,
					rank: this.rank,
					bdmoney: this.bdmoney
				};
				console.log('矿机申请的请求数据为',JSON.stringify(userInfo));
				uni.showLoading({
					title:'正在申请中...',
				})
				uni.request({
					url: this.websiteUrl + 'team/user_reg',
					method: 'POST',
					data:userInfo,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						let title = !res.message ? '注册成功，请尽快激活会员！':res.message;
						if(res.code == 200){
							console.log("注册："+JSON.stringify(res));
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
