<template>
	<view class="content uni-tab-bar">
      <view class="cu-bar tabbar margin-bottom-xl bg-white">
      	<view class="action text-green">
      		<view class="cuIcon-homefill"></view> 首页
      	</view>
      	<view class="action text-gray">
      		<view class="cuIcon-similar"></view> 分类
      	</view>
      	<view class="action text-gray add-action">
      		<button class="cu-btn cuIcon-add bg-green shadow"></button>
      		发布
      	</view>
      	<view class="action text-gray">
      		<view class="cuIcon-cart">
      			<view class="cu-tag badge">99</view>
      		</view>
      		购物车
      	</view>
      	<view class="action text-gray">
      		<view class="cuIcon-my">
      			<view class="cu-tag badge"></view>
      		</view>
      		我的
      	</view>
      </view>
	</view>
</template>

<script>
	
		import {mapState,mapMutations} from 'vuex';
		import cuCustom  from '@/static/colorui/components/cu-custom.vue';
	export default {
		data() {
			return {
				
			}
		},
		components: {
			cuCustom
		},
		computed: {
			...mapState(['token'])
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../static/colorui/main.css");
	page{
	  height: 100%;
	}
	
</style>
