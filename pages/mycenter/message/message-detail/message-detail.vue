<template>
	<view class="scroll-view">
		<scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
			<view class="message-detail">
				<view class="message-detail-title">{{title}}</view>
				<view class="message-detail-time">{{time}}</view>
				<view class="message-detail-content">
					<wxParse :content="content" @preview="preview" @navigate="navigate" />
				</view>
				
			</view>
			
		</scroll-view>
	</view>
	
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue';
	import marked from '../../../../components/marked';
	export default {
		components: {
			wxParse
		},
		data() {
			return {
				title:'',
				time:'',
				content:''
				
			}
		},
		computed: mapState(['token']),
		onShow(){
			// this.getShopcar();
		},
		onLoad(e) {
			if(e['messageId']){
				this.getMessageDetail(e['messageId']);
			}
			
		},
		methods: {
			getMessageDetail(messageId){
				uni.request({
					url: this.websiteUrl + 'article/detail',
					method: 'POST',
					data:{
						id:messageId
					},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取消息详情成功："+JSON.stringify(res.data));
							let title = res.data.title;
							let time = this.customMethods.getLocalTime(res.data.addTime);
							let content = this.customMethods.escape2Html(res.data.content);
							this.title = title;
							this.time = time;
							this.content = marked(content);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* @import '../../../uni.scss'; */
	page{
	  height: 100%;
	  // background-color: #f4f4f4;
	}
	view {
		box-sizing: border-box;
	}
	.scroll-view {
		position: absolute;
		top:0;
		bottom:0;
		width:100%;
		z-index: 99;
	}
	.message-detail {
		padding:0 24upx;
		.message-detail-title {
			font-size: 34upx;
			font-weight: bold;
		}
		.message-detail-time {
			font-size: 28upx;
			color:#666;
			margin:20upx 0;
		}
		.message-detail-content view{
			font-size: 30upx;
			color:#666;
		}
	}
	
</style>
