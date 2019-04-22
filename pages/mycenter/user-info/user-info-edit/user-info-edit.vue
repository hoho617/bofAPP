<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="info-block">
					<view class="block-title">基本信息</view>
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">会员账号</view>
							<view class="value">{{account}}</view>
						</view>
						<view class="block-info-item">
							<view class="title">省 市 区</view>
							<view class="uni-flex address-info" @click="showMulLinkageThreePicker" >
								<view class="address-detail">{{addressSuffix ? addressSuffix : '请选择地址'}}</view>
								<view class="right-arrow icon">&#xe606;</view>
							</view>
						</view>
						<view class="block-info-item" @click="showSinglePicker">
							<view class="title"><text :decode="true">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</text></view>
							<view class="value">{{sexText}}</view>
						</view>
					</view>
				</view>
				<view class="info-block">
					<view class="block-title">其他信息</view>
					<view class="block-wrap white-block">
						<view class="block-info-item">
							<view class="title">会员姓名</view>
							<input class="value" type="text" name="userName" placeholder="请输入收货人" v-model="trueName" :value="trueName" />
						</view>
						<view class="block-info-item">
							<view class="title">身份证号</view>
							<input class="value" type="text" name="userName" placeholder="请输入身份证号" v-model="idcard" :value="idcard" />
						</view>
						<view class="block-info-item">
							<view class="title">手 机 号</view>
							<input class="value" type="number" name="userName" placeholder="请输入手机号" v-model="mobile" :value="mobile" />
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="editUserInfo">提交保存</view>
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmSex" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	var area = require('../../../../common/area.js');
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../../common/city.data.js';
	export default {
		components: {
			mpvueCityPicker,
			mpvuePicker
		},
		data() {
			return {
				account:'',
				trueName:'',
				sexCode:'',
				mobile:'',
				idcard:'',
				addressPreffix:'',
				addressSuffix:'',
				isDefault:false,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				bottomBtnText:'新增',
				addressCodeArr:[],
				
				pickerSingleArray: [{ //选择性别
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: 2
					}
				],
				sexText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){ //获取用户信息
				uni.request({
					url: this.websiteUrl + 'user/info',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取用户信息成功："+JSON.stringify(res.data));
							let data = res.data;
							let account = data.userName;
							let trueName = data.trueName;
							let sexText = data.sex == 1?'男':'女';
							this.sexCode = data.sex;
							let idcard = data.idcard;
							let mobile = data.mobile;
							let arrObj = area.getAddress(data.province,data.city,data.area);
							let addressSuffix = arrObj.province +' '+ arrObj.city +' '+ arrObj.area;
							let addressPreffix =  data.address;
							let addressCodeArr = [];
							addressCodeArr[0] = data.province;
							addressCodeArr[1] = data.city;
							addressCodeArr[2] = data.area;
							this.addressSuffix = addressSuffix;
							this.addressPreffix = addressPreffix;
							this.account = account;
							this.trueName = trueName;
							this.sexText = sexText;
							this.idcard = idcard;
							this.mobile = mobile;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			requestModifyUserInfo(data){
				uni.request({
					url: this.websiteUrl + 'user/info_edit',
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("用户信息编辑成功："+JSON.stringify(res));
							uni.showToast({
								icon: 'success',
								title: '信息修改成功',
								duration:2000,
								success:function(){
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
							});
							
						}
					},
					fail: () => {},
					complete: () => {}
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
		width:180upx;
		font-size: 30upx;
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
		color:#999;
	}
	
	.fixed-footer {
		position: fixed;
		bottom:0;
		width:100%;
		height: 98rpx;
		line-height: 98rpx;
	}
	.red-btn-bottom {
		background-color: #db4c3f;
		color:#fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
		height: 100%;
		font-size: 30upx;
	}
	

</style>
