<template>
	<!-- <view> -->
		<view class="good-item" hover-class="" @click="bindClick">
			<view class="img-wrap">
				<my-image :data="data.goodsPics" />
			</view>
			<view class="goods-name">{{data.goodsName}}</view>
		</view>
	<!-- </view> -->
</template>

<script>
	import myImage from '@/components/my-image.vue';
	export default {
		name : "media-list",
		components:{
			myImage
		},
		props: {
            data: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
		data(){
			return {}
		},
		methods:{
			bindClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
	.good-item {
	  width:50%;
	}
	.img-wrap {
		width:100%;
		height:330upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.good-item image {
	  width:330upx;
	}
	.good-item .goods-name {
	  font-size: 28upx;
	  padding:0 20upx;
	  color:#333;
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap
	}
</style>
