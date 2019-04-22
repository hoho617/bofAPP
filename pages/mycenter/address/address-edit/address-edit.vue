<template>
	<view class="content-shopcar">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="form-wrap white-block">
					<view class="form-item">
						<view class="title">收货人</view>
						<input class="uni-input" type="text" name="userName" placeholder="请输入收货人" v-model="realname" :value="realname" />
					</view>
					<view class="form-item">
						<view class="title">手机号码</view>
						<input class="uni-input" maxlength="11" type="number" name="mobile" v-model="mobile" placeholder="请输入手机号码" :value="mobile" />
					</view>
					<view class="form-item">
						<view class="title">地址</view>
						<view class="uni-flex address-info" @click="showMulLinkageThreePicker" >
							<view class="address-detail">{{addressSuffix ? addressSuffix : '请选择地址'}}</view>
							<view class="right-arrow icon">&#xe606;</view>
						</view>
					</view>
					<view class="form-item">
						<view class="title">详细地址</view>
						<input class="uni-input" type="text" name="mobile" v-model="addressPreffix" :value="addressPreffix" placeholder="请输入详细地址" />
					</view>
					<view class="form-item">
						<view class="title">是否默认地址</view>
						<view class="uni-input" @click="setDefaultAddress">
							<image src="/static/selected.png" v-if="isDefault" />
							<image src="/static/select.png" v-else />
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="modifyAddress">{{bottomBtnText}}</view>
		</view>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	var area = require('../../../../common/area.js');
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../../common/city.data.js';
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				addressList:[],
				addressId:'', 
				realname:'',
				mobile:'',
				addressSuffix:'',
				addressPreffix:'',
				isDefault:false,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
				bottomBtnText:'新增',
				addressCodeArr:[]
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			if(e['addressId']) {
				var addressId = e['addressId'];
				this.addressId = addressId;
				this.bottomBtnText = '编辑';
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				})
			}
			this.getDetailAddress(this.addressId);
		},
		methods: {
			getDetailAddress(addressId){ //获取用户地址列表
				uni.request({
					url: this.websiteUrl + 'user/address_detail',
					method: 'POST',
					data:{
						id:addressId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取地址详情成功："+JSON.stringify(res.data));
							let data = res.data;
							let arrObj = area.getAddress(data.province,data.city,data.area);
							let addressSuffix = arrObj.province +' '+ arrObj.city +' '+ arrObj.area;
							let addressPreffix =  data.address;
							let realname = data.realname;
							let mobile = data.mobile;
							let isDefault = data.isDefault;
							let addressCodeArr = [];
							addressCodeArr[0] = data.province;
							addressCodeArr[1] = data.city;
							addressCodeArr[2] = data.area;
							this.realname = realname;
							this.mobile = mobile;
							this.isDefault = isDefault;
							this.addressSuffix = addressSuffix;
							this.addressPreffix = addressPreffix;
							this.addressCodeArr = addressCodeArr;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			requestAddress(data,url){
				uni.request({
					url: url,
					method: 'POST',
					data:data,
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("地址编辑成功："+JSON.stringify(res));
							let msg = '地址新增成功!';
							if(this.addressId){
								msg = '地址修改成功!'
							}
							uni.showToast({
								icon: 'success',
								title: msg,
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
			setDefaultAddress(){
				this.isDefault = !this.isDefault;
			},
			showMulLinkageThreePicker(e){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				console.log('eee',e);
				let addressSuffix = e.label.split('-').join(' ');
				this.addressSuffix = addressSuffix;
				console.log(e.cityCode);
				let addressCodeArr = [];
				let areaCode = e.areaCode;
				let cityCode = e.cityCode;
				let provinceCode = e.provinceCode;
				/* let provinceCode = areaCode.substr(0,2);
				let cityCode = areaCode.substr(0,4); */
				addressCodeArr[0] = provinceCode;
				addressCodeArr[1] = cityCode;
				addressCodeArr[2] = areaCode;
				console.log(addressCodeArr)
				this.addressCodeArr = addressCodeArr;
				
			},
			modifyAddress(){
				let id = this.addressId;
				let url;
				if(id){
					url = this.websiteUrl + 'user/address_edit';
				}else {
					url = this.websiteUrl + 'user/address_add';
					id = null;
				}
				let realname = this.realname;
				let mobile = this.mobile;
				let addressCodeArr = this.addressCodeArr;
				let province = addressCodeArr[0];
				let city = addressCodeArr[1];
				let area = addressCodeArr[2];
				let address = this.addressPreffix;
				let isDefault = this.isDefault;
				let data = {
					id:id,
					realname:realname,
					mobile:mobile,
					country:'',
					province:province,
					city:city,
					area:area,
					address:address,
					isDefault:isDefault
				}
				console.log(data)
				if(!realname || !mobile || addressCodeArr.length ==0 || !address){
					uni.showToast({
						icon: 'none',
						title: '请先完善您的地址信息!',
						duration:2000
					});
					return false;
				}else {
					this.requestAddress(data,url);
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
	.form-wrap {
		
	}
	.form-item {
		display: flex;
		align-items: center;
		padding:0 24upx;
		position: relative;
		height: 88upx;
	}
	.form-item .title {
		width:180upx;
		/* text-align: right; */
	}
	.form-item:after {
		content:"";
		display: block;
		height: 2upx;
		background-color: #eee;
		left:24upx;
		position: absolute;
		bottom:0;
		right:0;
	}
	.uni-input {
		display: flex;
		align-items: center;
	}
	.uni-input image {
		width:40upx;
		height: 40upx;
	}
	.address-info {
		color:#808080;
		padding:0 25upx;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	.right-arrow {
		font-size: 34upx;
		color:#ccc;
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
