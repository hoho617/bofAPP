<template>
	<view>
		<view class="prompt-area" v-show="show">
			<view class="prompt-inner">
				<view class="prompt-title">温馨提示</view>
				<view class="prompt-subtitle">{{tips}}</view>
				<view class="prompt-input">
					<input type="text" :value="value" placeholder="请输入原因等留言" @input="$emit('input', $event.target.value)" />
				</view>
				<view class="prompt-btns">
					<view class="prompt-btn" @click="cancleConfirm">确定</view>
					<view class="prompt-btn" @click="closePrompt">取消</view>
				</view>
			</view>
		</view>
		<!-- <view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
		<view :class="['uni-popup','uni-popup-'+type]" v-show="show">
			{{msg}}
			<slot></slot>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ""
			},
			tips:{
				type: String,
				default: ""
			}
		},
		data() {
			return {
				message:''
			}
		},
		methods: {
			closePrompt: function() {
				this.$emit('cancleEvent');
			},
			cancleConfirm: function() {
				this.$emit('confirmEvent');
			}
		}
	}
</script>
<style lang="scss">
	/* .uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	} */
	.prompt-area {
		position: fixed;
		top:0;
		bottom:0;
		width:100%;
		background-color: rgba(0,0,0,.3);
		
		.prompt-inner {
			width:70%;
			position: absolute;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			border-radius: 20upx;
			background-color: #fff;
			text-align:center;
			padding-top:20upx;
			.prompt-title {
				font-size: 32upx;
				font-weight: bold;
				padding:18upx 0;
			}
			.prompt-subtitle {
				font-size: 28upx;
				color:#444;
			}
			
			.prompt-input {
				margin:18upx 0;
				padding:10upx 28upx;
				input {
					background-color: transparent;
					border:2upx solid #eee;
					height: 100%;
					text-align: left;
					height: 74upx;
					padding:10upx 0;
					padding-left:10upx;
					box-sizing: border-box;
				}
			}
			.prompt-btns {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 2upx solid #f4f4f4;
				.prompt-btn {
					flex: 1;
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32upx;
					color:#0081FF;
					position: relative;
				}
				.prompt-btn:first-child:after {
					content:"";
					display: block;
					height: 100%;
					width:2upx;
					background-color: #f4f4f4;
					right:0;
					position: absolute;
					top:0;
				}
			}
		}
	}
</style>
