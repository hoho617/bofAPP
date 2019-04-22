<template>
	<view class="wrap-container index-container" :class="colorClass">
		<view class="fixed-top">
			<view class="top-left">
				<view class="uni-icon uni-icon-contact user-profile notactive" :class="'rank'+rank" @click="goToPage('/pages/mycenter/mine/mine')"></view>
				<view class="user-info" @click="goToPage('/pages/bonus/bonus-list/bonus-list','矿池明细',5)">
					<view class="user-name">{{userName}}</view>
					<view class="user-rank">{{rankName + '/' + rankPrefix}}</view>
				</view>
			</view>
			<view class="top-right uni-icon uni-icon-plusempty" @click="showPopover"></view>
		</view>
		<view class="scroll-view">
			<scroll-view scroll-y style="height: 100%;" @scroll="navbarGradient">
				<view class="canvas-area">
					<view class="remote-area" @click="toPage('/pages/bonus/share/share')">
						<text class="icon icon-tuiguangrenguanli-"></text>
						<view class="remote-txt">分享 ({{ztNum1}})</view>
					</view>
					<view class="canvas" @click="turnToPage">
						<canvas style="width: 400upx; height: 200upx;margin:0 auto;" canvas-id="firstCanvas"></canvas>
					</view>
					<view class="chest-container" v-if="showChest">
						<view class="chest-btn">
							<image src="../../../static/img/index/chest.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="box-area" v-if="profix">
						<view class="jiantou">
							<image src="../../../static/img/index/icon-jt.png" mode="widthFix"></image>
						</view>
						<view class="touzi-txt">
							<view class="touzi-box">
								投资:{{unfrezzeMoney}}
							</view>
							<view class="restart-box">
								重启:{{zfdMoney}}
							</view>
						</view>
						
					</view>
					
				</view>
				<view class="block-row index-row">
					<view class="item-col-4">
						<view class="item-container" @click="goToPage('/pages/bonus/bonus-list/bonus-list','收入明细',1)">
							<view class="item-data">{{moneyPrice}}</view>
							<view class="item-title">通证</view>
						</view>

					</view>
					<view class="item-col-4">
						<view class="item-container" @click="goToPage('/pages/bonus/bonus-list/bonus-list','共票明细',11)">
							<view class="item-data">{{ztNum}}</view>
							<view class="item-title">共票</view>
						</view>

					</view>
					<view class="item-col-4">
						<view class="item-container" @click="goToPage('/pages/bonus/bonus-list/bonus-list','消费券明细',2,4)">
							<view class="item-data">{{balance}}</view>
							<view class="item-title">消费券</view>
						</view>
					</view>
				</view>
				<view class="uni-swiper-msg bg-white">
					<view class="uni-swiper-msg-icon">
						<text class="msg-text">头条</text>
						<image src="/static/img/index/icon-msg-notice.png" mode="widthFix"></image>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<navigator>{{item.title}}</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="gap-height-div"></view>
				<view class="block-row bg-white">
					<view class="item-col-3">
						<view class="item-container-tranparent" @click="goToPage('/pages/bonus/user-transfer/user-transfer')">
							<view class="item-title">
								<text class="icon icon-zhuanzhang red" style="font-size: 38upx;margin-right:6upx;"></text>
								<text>转账</text>
							</view>
							<view class="item-data">0.0</view>
						</view>

					</view>
					<view class="item-col-3">
						<view class="item-container-tranparent" @click="goToPage('/pages/bonus/user-cash/user-cash?balance='+moneyPrice)">
							<view class="item-title">
								<text class="icon icon-tixian-copy royalblue" style="font-size: 38upx;margin-right:6upx;"></text>
								<text>挂卖</text>
							</view>
							<view class="item-data">{{totalCash}}</view>
						</view>

					</view>
					<view class="item-col-3">
						<view class="item-container-tranparent" @click="goToPage('/pages/bonus/user-community/user-community')">
							<view class="item-title">
								<text class="icon icon-wankeicon- orange-dark" style="font-size: 44upx;margin-right:6upx;"></text>
								<text>社区</text>
							</view>
							<view class="item-data">{{azTeamNum}}</view>
						</view>
					</view>
					<view class="item-col-3">
						<view class="item-container-tranparent" @click="goToPage('/pages/bonus/user-machine/machine-start/machine-start?flag=1')">
							<view class="item-title">
								<text class="icon icon-tuandui green" style="font-size: 44upx;margin-right:6upx;"></text>
								<text>启动矿机</text>
							</view>
							<view class="item-data">{{ztNum1}}</view>
						</view>
					</view>
				</view>
				<view class="gap-height-div"></view>
				<view class="slide-wrap bg-white">
					<view class="container_of_slide" v-for="(item,index) in noticeList" :key="index">
						<view class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)"
						 :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}" @click="toMessage(index)">
							<view class="now-message-info" :style="{width:Screen_width+'px'}" @click="chooseAddress" :data-address-id="item.id">
								<view class="pull-left notice-data-icon">
									<text class="iconfont" :class="item.noticeIcon"></text>
									<text class="uni-badge">{{item.noticeNum}}</text>
								</view>
								<view class="flex-column">
									<h4 class="body-inner-title">{{item.title}}</h4>
									<p class="uni-ellipsis">{{item.content}}</p>
								</view>
								<view class="notice-time dark-grey-color" style="position: absolute;top:24upx;right:20upx;">{{item.noticeTime}}</view>
							</view>
							<view class="group-btn">
								<view class="top" @tap="toCardEdit(item.id)">
									标为已读
								</view>
								<view class="removeM" @tap="deleteAddress(item.id)">
									删除
								</view>
							</view>
							<view style="clear:both"></view>
						</view>
					</view>
				</view>
				<view class="gap-height-div"></view>
				<view class="swiper-area bg-white">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in bannerListSrc" :key="index">
							<view class="swiper-item">
								<image :src="item" mode="widthFix" :alt="item" @error="errorMsg"></image>
							</view>
						</swiper-item>
						<!-- <swiper-item>
                            <view class="swiper-item uni-bg-green">B</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item uni-bg-blue">C</view>
                        </swiper-item> -->
					</swiper>
				</view>
				<view class="bottom-line-area">
					<view class="bottom-line bottom-line-color"></view>
					<view class="bottom-line-text bottom-text-color">我是有底线的</view>
					<view class="bottom-line bottom-line-color"></view>
				</view>
			</scroll-view>
		</view>

		<view class="uni-popover" v-if="popover">
			<view class="uni-popover-arrow"></view>
			<view class="uni-table-view">
				<view class="uni-table-view-cell">
					<navigator class="icon-item" url="/pages/bonus/kefu/kefu">
						<image class="icon-image" src="../../../static/img/index/icon-kefu.png" mode="widthFix"></image>
						客服中心
					</navigator>
				</view>
				<view class="uni-table-view-cell">
					<navigator class="icon-item" url="/pages/bonus/share/share">
						<image class="icon-image" src="../../../static/img/index/icon-share2.png" mode="widthFix"></image>
						分&nbsp;享
					</navigator>
				</view>
				<view class="uni-table-view-cell" @click="startScan">
					<view class="icon-item">
						<image class="icon-image" src="../../../static/img/index/icon-scan.png" mode="widthFix"></image>
						扫一扫
					</view>
				</view>
				<view class="uni-table-view-cell">
					<navigator class="icon-item" url="/pages/bonus/code-receivable/code-receivable">
						<image class="icon-image" src="../../../static/img/index/icon-code.png" mode="widthFix"></image>
						收款码
					</navigator>
				</view>
			</view>
		</view>
		<view class="mask-wrap" v-if="popover" @click="popover = false;"></view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var context = null;
	export default {
		components: {

		},
		computed: {
			...mapState(['token','colorIndex','classArr','hasLogin','colorArr']),
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			},
			bannerListSrc() {
				return this.bannerList.map((item) => {
					return this.getImageUrl(item);
				})
			},
			colorClass(){
				// console.log(this.classArr[this.colorIndex])
				return this.classArr[this.colorIndex]
			}
		},
		data() {
			return {
				userName: '',
				rank: '',
				rankName: '', //等级名称
				azTeamNum: '', //社区
				ztNum1: '', //分享
				totalCash: '', //挂卖
				moneyPrice: '', //通证
				balance: '', //消费券
				ztNum: '', //共票
				rankPrefix: '', //矿池明细
				canvasWidth: 200,
				canvasHeight: 200,
				msg: [],
				noticeList: [],
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				bannerList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				popover: false,
				profix:false, //是否收益封顶
				unfrezzeMoney:0, //投资
				zfdMoney:0 ,//重启
				showChest:false , //是否显示宝箱
				nowIndex:0,
				pageFlag:0, //0代表跳到reward-list 1代表跳到重启矿机
				canTransfer:0, //是否可以扫码支付
			}
		},
		onLoad(options) {
			console.log(this.hasLogin);
			if(!this.hasLogin){
				uni.reLaunch({
					url:'/pages/login/login/login'
				})
			}else {
				console.log('已经登录过了');
				context = uni.createCanvasContext("firstCanvas");
				
				this.getUserInfo();
				this.loadUserStatistics();
				this.loadFinanceStatistics();
				this.loadTeamStatistics();
				this.loadMsgList();
				this.loadBannerInfo();
			}
			
		},
		onShow(){
			this.popover = false;
			uni.showTabBar({
				animation:true
			})
		},
		onHide(){
			console.log('隐藏了首页');
			uni.setStorageSync("$pageIndex",0);
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(()=>{
				this.selectColor();
				uni.stopPullDownRefresh();
			},1000)
		},
		methods: {
			...mapMutations(['selectColor']),
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
							let userName = data.userName;
							let trueName = data.trueName;
							let mobile = data.mobile;
							let rank = data.rank;
							let canTransfer = data.canTransfer;
							console.log('canTran',canTransfer)
							this.userName = userName;
							this.trueName = trueName;
							this.mobile = mobile;
							let rankName = this.customMethods.getRankName(rank);
							this.rankName = rankName;
							this.rank = rank;
							this.canTransfer = canTransfer;
							/* canvas */
							var state = data.state;
							var isGetGems = data.isGetGems;
							this.unfrezzeMoney = data.unfrezzeMoney;
							this.zfdMoney = data.zfdMoney;
							console.log('是否领取宝石券,0:未领取,1:已领取', isGetGems);
							if (isGetGems == 1) {
								this.showChest = false;
								if(state == 2){ //冻结
									this.profix = true;
									this.reCreate(0, 0, 120,1);
									this.pageFlag = 1;
								}else {
									this.profix = false;
								}
							} else {
								this.showChest = true;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadUserStatistics() {
				uni.request({
					url: this.websiteUrl + 'user/statistics',
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
							// console.log("获取user statistics成功："+JSON.stringify(res));
							var data = res.data;

							this.azTeamNum = data.azTeamNum;
							this.ztNum1 = data.ztNum;
							this.totalCash = data.totalCash.toFixed(2);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadFinanceStatistics() {
				uni.request({
					url: this.websiteUrl + 'finance/statistics',
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
							// console.log("获取finance statistics成功："+JSON.stringify(res));
							var data = res.data;
							this.moneyPrice = data.b1.toFixed(2);
							this.balance = data.b4.toFixed(2);
							this.ztNum = data.b11.toFixed(2);
							this.rankPrefix = data.b5.toFixed(2);
							uni.setStorageSync("$b5",data.b5.toFixed(2));
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadTeamStatistics(){
				uni.request({
					url: this.websiteUrl + 'team/statistics',
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
							console.log("获取team statistics成功："+JSON.stringify(res));
							var data = res.data;
							var current = data.glj;
							var max = data.ldj;
							var yesterday = data.kfj;
							var nowday = data.cpj;
							var yestordayIncome = data.yestordayIncome;
							var percent = ((current / max).toFixed(4)) * 100;
							this.reCreate(yestordayIncome ? yestordayIncome : 0, 0,percent,0);
							this.pageFlag = 0;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadMsgList() {
				uni.request({
					url: this.websiteUrl + 'article/list',
					method: 'POST',
					data: {
						classId: 9,
						pageIndex: 1,
						pageSize: 10000
					},
					dataType: 'json', //服务器返回json格式数据
					header: {
						'content-type': 'application/json',
						'Token': this.token
					},
					success: res => {
						var res = res.data;
						if (res.code == 200) {
							// console.log("获取消息列表成功："+JSON.stringify(res));
							var data = res.data;
							this.msg = data.list.slice(0, 5);
							var msgNum = data.total;
							var lastestObj = data.list[msgNum - 1];
							var latestMsg = lastestObj.title;
							var noticeTime = this.customMethods.getLocalTime(lastestObj.addTime);
							this.noticeList = [{
									title: '公告消息',
									content: latestMsg,
									noticeTime: noticeTime,
									noticeNum: msgNum,
									noticeIcon: 'icon-wenzhang',
									slide_x: msgNum
								},
								{
									title: '审核消息',
									content: '提现已处理，请查收',
									noticeTime: new Date().toLocaleDateString(),
									noticeNum: 1,
									noticeIcon: 'icon-shenheicon',
									slide_x: 0
								}
							];
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadBannerInfo() {
				uni.request({
					url: this.websiteUrl + 'icon/shop_decorate',
					method: 'POST',
					data: {
						"pageSize": 1,
						"type": 11,
						"moduleType": 1,
						"moduleCode": "swiper_banner_header"
					},
					dataType: 'json', //服务器返回json格式数据
					header: {
						'content-type': 'application/json',
						'Token': this.token
					},
					success: res => {
						var res = res.data;
						if (res.code == 200) {
							console.log("获取banner成功：" + JSON.stringify(res));
							var data = res.data;
							var data1 = data[0].content;
							var content = eval('(' + data1 + ')');
							this.bannerList = content.pic;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			reCreate(values, values2, percent, flag) {
				//清空画布
				context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				this.drawCanvas(values, values2, percent, flag);
			},
			drawCanvas(values, values2, percent, flag) {

				var tip = percent;
				var canvasWidth = this.canvasWidth;
				var canvasHeight = this.canvasHeight / 2;
				var r = canvasWidth / 2;
				var r1 = canvasWidth / 2 - 20;
				var x1 = canvasWidth / 2;
				var y1 = canvasWidth / 2;
				// context.save();
				var angle = tip * Math.PI / 100 + Math.PI;
				var init = 180;
				var preM = Math.PI;
				var initM = 0.9 * Math.PI; //因为是半圆  所以初始角度是Math.PI;
				var s = 2 * Math.PI / 180;
				context.lineWidth = 3; //边框宽度
				var speed = 1;
				var radius = canvasWidth / 2 - 2;
				var ball = {
					x: 0,
					y: 0,
					speed: 2
				};
				var T1;

				T1 = setInterval(() => {
					context.fillStyle = "transparent";
					context.fillRect(0, 0, canvasWidth, canvasHeight);
					//创建圆环与虚线
					//底圆
					context.beginPath();
					context.strokeStyle="#fff";
					// cxt.strokeStyle="#999";
					context.arc(x1, y1 - 10, r1 - 6, 0.9 * Math.PI, 2.1 * Math.PI);
					context.stroke(); //先执行stroke  就不会出现横线
					context.closePath();
					//画实线
					if (initM < angle) {
						initM += s;
					} else {
						initM = angle;
					}
					context.beginPath();
					if(flag == 0){
						// context.strokeStyle = "rgb(44,144,236)";
						context.strokeStyle = this.colorArr[this.colorIndex];
					}else if(flag == 1){
						context.strokeStyle = "#f00";
					}else {
						context.strokeStyle = this.colorArr[this.colorIndex];
					}
					// context.strokeStyle = "rgb(44,144,236)";
					context.arc(x1, y1 - 10, r1 - 6, 0.9 * Math.PI, initM-0.3);
					context.stroke(); //先执行stroke  就不会出现横线
					context.closePath();
					//百分比文字
					context.font = "16px sans";
					context.textBaseline = "middle";
					context.textAlign = "center";
					context.fillStyle = "#FFFFFF";
					var messT = values * initM / angle;
					// if(drawOne!="ture"){
					messT = values * (initM) / angle;
					// }
					if (messT > values) {
						messT = values
					}
					var mess = messT.toFixed(2);
					var messT2 = values2 * initM / angle;
					// if(drawOne!="ture"){
					messT2 = values2 * (initM) / angle;
					// }
					if (messT2 > values2) {
						messT2 = values2
					}
					switch (flag) {
						case 0:
							var mess = values.toFixed(2);
							var mess2 = ""; /**/
							var messvalue = "收益";
							context.fillText(messvalue, x1, x1 / 2 + 5);
							//              cxt.fillText(mess,x1,x1/2+20);
							context.fillText(mess, x1, x1 / 2 + 40);
							context.fillText(mess2, x1, x1 / 2 + 40);
							break;
						case 1:
							var mess="重启矿机";
							var messvalue="收益已封顶";
							context.beginPath();
							context.fillStyle="#ccc";
							context.fillText(messvalue, x1, x1 / 2 + 5);
							context.closePath() //注意此处
			//              cxt.fillText(mess,x1,x1/2+20);
							context.beginPath();
							context.font="18px sans";
							context.fillStyle="#eee";
							context.fillText(mess, x1, x1 / 2 + 40);
							context.closePath() //注意此处
							break;
						case 2:
							var mess = values;
							var messvalue = values2;
							context.beginPath();
							context.font = "14px sans";
							context.fillStyle = "#ccc"
							context.fillText(messvalue, x1, x1 / 2 + 5);
							context.closePath() //注意此处
							//              cxt.fillText(mess,x1,x1/2+20);
							context.beginPath();
							context.font = "16px sans";
							context.fillStyle = "#eee";
							context.fillText(mess, x1, x1 / 2 + 40);
							context.closePath() //注意此处
							break;
						default:
							break;
					}
					context.draw()
				}, 30)
			},
			// 滑动开始
			touchStart(e, index) {
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.noticeList[index].slide_x;
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
				this.noticeList.forEach((item, eq) => {
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
				const duang = this.noticeList[index].slide_x + distance;
				// 如果在可行区域内
				if (duang >= -50) {
					return;
				}
				if (duang <= 0 && duang >= this.btnWidth) {
					this.noticeList[index].slide_x = duang;
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
					this.noticeList[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.noticeList[index].slide_x = 0;
				} else {
					this.noticeList[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.noticeList[index].slide_x = 0;
			},
			errorMsg(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			showPopover() {
				this.popover = true;
			},
			goToPage(url,title,moneyType,moneyType2) {
				if (!url) return;
				if(moneyType2){
					uni.navigateTo({
						url:url+'?title='+title+'&moneyType='+moneyType+'&moneyType2='+moneyType2
					});
				}else {
					uni.navigateTo({
						url:url+'?title='+title+'&moneyType='+moneyType
					});
				}
			},
			turnToPage(){
				if(this.pageFlag == 0){
					uni.navigateTo({
						url:'/pages/bonus/reward-list/reward-list'
					});
				}
			},
			toPage(url){
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			startScan(){
				this.popover = false;
				let that = this;
				if(this.canTransfer == 0){
					uni.showModal({
						title: '扫码暂停',
						content: '请联系客服',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else {
					uni.scanCode({
						success: function (res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							let scanType = res.scanType;
							let result = res.result;
							if(scanType == 'QR_CODE' || scanType == ''){
								console.log(result.indexOf('http'),result.indexOf('http://m.bof.kim'))
								if(result.indexOf('http://m.bof.kim') == 0){
									console.log('扫描结果以http://m.bof.kim开头');
									let resultArr = result.split("&");
									let pUserNameStr = resultArr[1];
									let pTrueNameStr = resultArr[resultArr.length-1];
									let userAccount = pUserNameStr.split("=")[1];
									let userTrueName = pTrueNameStr.split("=")[1];
									console.log(userAccount)
									console.log(that.userName)
									console.log(userTrueName)
									
									if(userAccount == that.userName){
										uni.showToast({
											title: '无法向自己支付',
											icon:"none",
											duration: 1000
										});
									}else {
										uni.showLoading({
											title: '正在处理...'
										});
										setTimeout(()=>{
											uni.navigateTo({
												url:'/pages/bonus/scan-payment/scan-payment?userAccount='+userAccount + '&trueName='+userTrueName
											})
											uni.hideLoading();
										},1500)
									}
									
								}else {
									uni.showToast({
										title: '该二维码无效,请重新扫描',
										icon:"none",
										duration: 1000
									});
								}
								
							}else {
								uni.showToast({
									title: '二维码类型不正确',
									icon:"none",
									duration: 1000
								});
							}
							
						},
						fail(error){
							console.log(error);
						}
					});
				}
				
			},
			toMessage(index){
				if(index == 0){
					uni.navigateTo({
						url:'/pages/mycenter/message/message'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/home.css");

	page {
		height: 100%;
	}

	view {
		box-sizing: border-box;
	}

	.container_of_slide {
		width: 100%;
		overflow: hidden;
	}

	.slide_list {
		transition: all 100ms;
		transition-timing-function: ease-out;
		min-width: 200%;
		height: 140upx;
		background-color: #fff;
	}

	.now-message-info {
		padding: 20upx 24upx;
		position: relative;
	}

	.now-message-info,
	.group-btn {
		float: left;
	}

	.group-btn {
		display: flex;
		flex-direction: row;
		height: 100%;
		min-width: 400upx;
		width: 400upx;
		align-items: center;
	}

	.group-btn view {
		height: 100%;
		color: #fff;
		flex: 1;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		/* padding:0 50upx; */

	}

	.top {
		background-color: #2a0000;
	}

	.removeM {
		background-color: #db4c3f;
	}
</style>
