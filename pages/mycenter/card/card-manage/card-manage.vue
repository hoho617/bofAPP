<template>
	<view class="content-page">
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;">
				<view class="padding-box">
					<view class="container_of_slide" v-for="(item,index) in bankList" :key="index">
						<view class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)"
						 @tap="recover(index)" :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}">
							<view class="now-message-info" :style="{width:Screen_width+'px'}">
								<view class="centerInfo">
									<view class="name">
										{{item.bankName}}
									</view>
									<view class="message">
										({{item.bankNo}})
									</view>
								</view>
							</view>
							<view class="group-btn">
								<view class="top" @tap="toCardEdit(item.id)">
									修改
								</view>
								<view class="removeM" @tap="deleteCard(item.id)">
									删除
								</view>
							</view>
							<view style="clear:both"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-footer">
			<view class="red-btn-bottom" @click="toCardEdit()">新增银行卡</view>
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
				bankList:[], //银行卡列表
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				mode:''
				
			}
		},
		computed: {
			...mapState(['token']),
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		onShow(){
			this.getCardList();
		},
		onLoad(e) {
			if(e['mode']) {
				console.log(e);
				var mode = e['mode'];
				this.mode = mode;
			}
		},
		onUnload(){
			this.$eventHub.$off('fire');
		},
		methods: {
			getCardList(){
				uni.request({
					url: this.websiteUrl + 'user/bank_list',
					method: 'POST',
					data:{},
					dataType:'json',//服务器返回json格式数据
					header:{'Content-Type':'application/json','Token':this.token},
					success: res => {
						var res = res.data;
						if(res.code == 200){
							console.log("获取银行卡列表成功："+JSON.stringify(res.data));
							let data = res.data;
							let bankList = res.data;
							bankList.forEach((item)=>{
								item.slide_x = 0;
								var account = item.bankNo;
								var bankNo = account.substr(account.length-4,4);
								item.bankNo = bankNo;
								return item;
							})
							this.bankList = bankList;
							console.log('修改数据结构之后的bankList',bankList)
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 删除
			deleteCard(cardId) {
				var that = this;
			    uni.showModal({
			    	title: '温馨提示',
			    	content: '确认删除该条银行卡信息？',
			    	success: function (res) {
			    		if (res.confirm) {
			    			console.log('用户点击确定');
			    			uni.request({
			    				url: that.websiteUrl + 'user/bank_del',
			    				method: 'POST',
			    				data:{
			    					id:cardId
			    				},
			    				dataType:'json',//服务器返回json格式数据
			    				header:{'Content-Type':'application/json','Token':that.token},
			    				success: res => {
			    					var res = res.data;
			    					if(res.code == 200){
			    						console.log("删除银行卡成功："+JSON.stringify(res));
			    						var that2 = that;
			    						uni.showToast({
			    							icon: 'success',
			    							title: '删除银行卡成功',
			    							duration:2000,
			    							success:function(){
			    								that2.getCardList();
			    							}
			    						});
			    					}
			    				},
			    				fail: () => {},
			    				complete: () => {}
			    			});
			    		} else if (res.cancel) {
			    			console.log('用户点击取消');
			    			that.getCardList();
			    		}
			    	}
			    });
			},
			// 编辑银行账号
			toCardEdit(cardId) {
				console.log(cardId);
				if(cardId){
					uni.navigateTo({
						url:'/pages/mycenter/card/card-edit/card-edit?cardId='+cardId
					})
				}else {
					uni.navigateTo({
						url:'/pages/mycenter/card/card-edit/card-edit'
					})
				}
			   
			},
				// 滑动开始
			touchStart(e, index) {
			    //记录手指放上去的时间
			    this.startTime = e.timeStamp;
			    //记录滑块的初始位置
			    this.start_slide_x = this.bankList[index].slide_x;
			    // 按钮宽度
			    uni.createSelectorQuery()
			        .selectAll('.group-btn')
			        .boundingClientRect()
			        .exec(res => {
			            if (res[0] != null) {
			                this.btnWidth = res[0][index].width * -1;
			            }
			        });
			    // 记录上一次开始时手指所处位置
			    this.startX = e.touches[0].pageX;
			    // 记录上一次手指位置
			    this.lastX = this.startX;
			    //初始化非当前滑动消息列的位置
			    this.bankList.forEach((item, eq) => {
			        if (eq !== index) {
			            item.slide_x = 0;
			        }
			    });
			},
			// 滑动中
			touchMove(e, index) {
			    const endX = e.touches[0].pageX;
			    const distance = endX - this.lastX;
			    // 预测滑块所处位置
			    const duang = this.bankList[index].slide_x + distance;
			    // 如果在可行区域内
			    if (duang <= 0 && duang >= this.btnWidth) {
			        this.bankList[index].slide_x = duang;
			    }
			    // 此处手指所处位置将成为下次手指移动时的上一次位置
			    this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
			    let distance = 10;
			    const endTime = e.timeStamp;
			    const x_end_distance = this.startX - this.lastX;
			    if (Math.abs(endTime - this.startTime) > 200) {
			        distance = this.btnWidth / -2;
			    }
			    // 判断手指最终位置与手指开始位置的位置差距
			    if (x_end_distance > distance) {
			        this.bankList[index].slide_x = this.btnWidth;
			    } else if (x_end_distance < distance * -1) {
			        this.bankList[index].slide_x = 0;
			    } else {
			        this.bankList[index].slide_x = this.start_slide_x;
			    }
			},
			// 点击回复原状
			recover(index) {
			    this.bankList[index].slide_x = 0;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
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
		background-color: #f4f4f4;
		/* background-color: #f5f5f5; */
		z-index: 99;
	}
	.padding-box {
		// padding:0 24upx;
		
	}
	.container_of_slide {
	    width: 100%;
	    overflow: hidden;
	    .slide_list {
	        transition: all 100ms;
	        transition-timing-function: ease-out;
	        min-width: 200%;
	        height: 110upx;
	        border-bottom: 1px solid #eee;
			background-color: #fff;
	        .now-message-info {
	            display: flex;
	            align-items: center;
	            justify-content: space-between;
				padding:0 24upx;
	            .centerInfo {
	                height: 110upx;
	                display: flex;
	                align-items: center;
	                text-align: left;
	                width: 80%;
	                view {
						font-size: 30rpx;
	                    /* overflow: hidden;
	                    white-space: nowrap;
	                    text-overflow: ellipsis;
	                    max-width: 100%; */
	                }
	                .name {
	                    // font-size: 30rpx;
	                }
	                .message {
// 	                    font-size: 24rpx;
// 	                    color: #7c8489;
	                }
	            }
	        }
	        .now-message-info,
	        .group-btn {
	            float: left;
	        }
	        .group-btn {
	            display: flex;
	            flex-direction: row;
	            height: 100%;
	            min-width: 100upx;
	            align-items: center;
	            view {
	                height: 100%;
	                color: #fff;
	                text-align: center;
	                display: flex;
					align-items: center;
					justify-content: center;
	                font-size: 28rpx;
					padding:0 50upx;
	            }
	            .top {
	                background-color: #2a0000;
	            }
	            .removeM {
	                background-color: #db4c3f;
	            }
	        }
	    }
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
		font-size: 32upx;
	}
	

</style>
