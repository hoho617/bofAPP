(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/tabbar/index/index"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











































































































































































































var _vuex = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var context = null;var _default =
{
  components: {},


  computed: _objectSpread({},
  (0, _vuex.mapState)(['token', 'colorIndex', 'classArr', 'hasLogin', 'colorArr']), {
    Screen_width: function Screen_width() {
      return uni.getSystemInfoSync().windowWidth;
    },
    bannerListSrc: function bannerListSrc() {var _this = this;
      return this.bannerList.map(function (item) {
        return _this.getImageUrl(item);
      });
    },
    colorClass: function colorClass() {
      console.log(this.classArr[this.colorIndex]);
      return this.classArr[this.colorIndex];
    } }),

  data: function data() {
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
      profix: false, //是否收益封顶
      unfrezzeMoney: 0, //投资
      zfdMoney: 0, //重启
      showChest: false, //是否显示宝箱
      nowIndex: 0 };

  },
  onLoad: function onLoad(options) {
    /* setTimeout(()=>{
                                    	console.log('开始下拉')
                                    },1000)
                                    
                                    uni.startPullDownRefresh({
                                    	success: (res) => {
                                    		console.log(res);
                                    	}
                                    }) */
    console.log(this.hasLogin);
    if (!this.hasLogin) {
      uni.reLaunch({
        url: '/pages/login/login/login' });

    } else {
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
  onPullDownRefresh: function onPullDownRefresh() {var _this2 = this;
    console.log('refresh');
    setTimeout(function () {
      _this2.selectColor();
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['selectColor']), {
    getUserInfo: function getUserInfo() {var _this3 = this;
      uni.request({
        url: this.websiteUrl + 'user/info',
        method: 'POST',
        data: {},
        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            // console.log("获取用户信息成功："+JSON.stringify(res));
            var data = res.data;
            var userName = data.userName;
            var trueName = data.trueName;
            var mobile = data.mobile;
            var rank = data.rank;
            _this3.userName = userName;
            _this3.trueName = trueName;
            _this3.mobile = mobile;
            var rankName = _this3.customMethods.getRankName(rank);
            _this3.rankName = rankName;
            _this3.rank = rank;

            /* canvas */
            var state = data.state;
            var isGetGems = data.isGetGems;
            _this3.unfrezzeMoney = data.unfrezzeMoney;
            _this3.zfdMoney = data.zfdMoney;
            console.log('是否领取宝石券,0:未领取,1:已领取', isGetGems);
            if (isGetGems == 1) {
              _this3.showChest = false;
              if (state == 2) {//冻结
                _this3.profix = true;
                _this3.reCreate(0, 0, 120, 1);
              } else {
                _this3.profix = false;
              }
            } else {
              _this3.showChest = true;
            }
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    loadUserStatistics: function loadUserStatistics() {var _this4 = this;
      uni.request({
        url: this.websiteUrl + 'user/statistics',
        method: 'POST',
        data: {},
        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            // console.log("获取user statistics成功："+JSON.stringify(res));
            var data = res.data;

            _this4.azTeamNum = data.azTeamNum;
            _this4.ztNum1 = data.ztNum;
            _this4.totalCash = data.totalCash.toFixed(2);
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    loadFinanceStatistics: function loadFinanceStatistics() {var _this5 = this;
      uni.request({
        url: this.websiteUrl + 'finance/statistics',
        method: 'POST',
        data: {},
        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            // console.log("获取finance statistics成功："+JSON.stringify(res));
            var data = res.data;
            _this5.moneyPrice = data.b1.toFixed(2);
            _this5.balance = data.b4.toFixed(2);
            _this5.ztNum = data.b11.toFixed(2);
            _this5.rankPrefix = data.b5.toFixed(2);
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    loadTeamStatistics: function loadTeamStatistics() {var _this6 = this;
      uni.request({
        url: this.websiteUrl + 'team/statistics',
        method: 'POST',
        data: {},
        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            console.log("获取team statistics成功：" + JSON.stringify(res));
            var data = res.data;
            var current = data.glj;
            var max = data.ldj;
            var yesterday = data.kfj;
            var nowday = data.cpj;
            var yestordayIncome = data.yestordayIncome;
            var percent = (current / max).toFixed(4) * 100;
            _this6.reCreate(yestordayIncome ? yestordayIncome : 0, 0, percent, 0);
            /* this.moneyPrice = data.b1.toFixed(2);
                                                                                   this.balance = data.b4.toFixed(2);
                                                                                   this.ztNum = data.b11.toFixed(2);
                                                                                   this.rankPrefix = data.b5.toFixed(2); */
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    loadMsgList: function loadMsgList() {var _this7 = this;
      uni.request({
        url: this.websiteUrl + 'article/list',
        method: 'POST',
        data: {
          classId: 9,
          pageIndex: 1,
          pageSize: 10000 },

        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            // console.log("获取消息列表成功："+JSON.stringify(res));
            var data = res.data;
            _this7.msg = data.list.slice(0, 5);
            var msgNum = data.total;
            var lastestObj = data.list[msgNum - 1];
            var latestMsg = lastestObj.title;
            var noticeTime = _this7.customMethods.getLocalTime(lastestObj.addTime);
            _this7.noticeList = [{
              title: '公告消息',
              content: latestMsg,
              noticeTime: noticeTime,
              noticeNum: 1,
              noticeIcon: 'icon-wenzhang',
              slide_x: msgNum },

            {
              title: '审核消息',
              content: '提现已处理，请查收',
              noticeTime: new Date().toLocaleDateString(),
              noticeNum: 1,
              noticeIcon: 'icon-shenheicon',
              slide_x: 0 }];


          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    loadBannerInfo: function loadBannerInfo() {var _this8 = this;
      uni.request({
        url: this.websiteUrl + 'icon/shop_decorate',
        method: 'POST',
        data: {
          "pageSize": 1,
          "type": 11,
          "moduleType": 1,
          "moduleCode": "swiper_banner_header" },

        dataType: 'json', //服务器返回json格式数据
        header: {
          'content-type': 'application/json',
          'Token': this.token },

        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            console.log("获取banner成功：" + JSON.stringify(res));
            var data = res.data;
            var data1 = data[0].content;
            var content = eval('(' + data1 + ')');
            _this8.bannerList = content.pic;
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    reCreate: function reCreate(values, values2, percent, flag) {
      //清空画布
      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.drawCanvas(values, values2, percent, flag);
    },
    drawCanvas: function drawCanvas(values, values2, percent, flag) {var _this9 = this;

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
        speed: 2 };

      var T1;

      T1 = setInterval(function () {
        context.fillStyle = "transparent";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        //创建圆环与虚线
        //底圆
        context.beginPath();
        context.strokeStyle = "#fff";
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
        if (flag == 0) {
          // context.strokeStyle = "rgb(44,144,236)";
          context.strokeStyle = _this9.colorArr[_this9.colorIndex];
        } else if (flag == 1) {
          context.strokeStyle = "#f00";
        } else {
          context.strokeStyle = _this9.colorArr[_this9.colorIndex];
        }
        // context.strokeStyle = "rgb(44,144,236)";
        context.arc(x1, y1 - 10, r1 - 6, 0.9 * Math.PI, initM - 0.3);
        context.stroke(); //先执行stroke  就不会出现横线
        context.closePath();
        //百分比文字
        context.font = "16px sans";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillStyle = "#FFFFFF";
        var messT = values * initM / angle;
        // if(drawOne!="ture"){
        messT = values * initM / angle;
        // }
        if (messT > values) {
          messT = values;
        }
        var mess = messT.toFixed(2);
        var messT2 = values2 * initM / angle;
        // if(drawOne!="ture"){
        messT2 = values2 * initM / angle;
        // }
        if (messT2 > values2) {
          messT2 = values2;
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
            var mess = "重启矿机";
            var messvalue = "收益已封顶";
            context.beginPath();
            context.fillStyle = "#ccc";
            context.fillText(messvalue, x1, x1 / 2 + 5);
            context.closePath(); //注意此处
            //              cxt.fillText(mess,x1,x1/2+20);
            context.beginPath();
            context.font = "18px sans";
            context.fillStyle = "#eee";
            context.fillText(mess, x1, x1 / 2 + 40);
            context.closePath(); //注意此处
            break;
          case 2:
            var mess = values;
            var messvalue = values2;
            context.beginPath();
            context.font = "14px sans";
            context.fillStyle = "#ccc";
            context.fillText(messvalue, x1, x1 / 2 + 5);
            context.closePath(); //注意此处
            //              cxt.fillText(mess,x1,x1/2+20);
            context.beginPath();
            context.font = "16px sans";
            context.fillStyle = "#eee";
            context.fillText(mess, x1, x1 / 2 + 40);
            context.closePath(); //注意此处
            break;
          default:
            break;}

        context.draw();
      }, 30);
    },
    // 滑动开始
    touchStart: function touchStart(e, index) {var _this10 = this;
      //记录手指放上去的时间
      this.startTime = e.timeStamp;
      //记录滑块的初始位置
      this.start_slide_x = this.noticeList[index].slide_x;
      // 按钮宽度
      uni.createSelectorQuery().
      selectAll('.group-btn').
      boundingClientRect().
      exec(function (res) {
        if (res[0] != null) {
          _this10.btnWidth = res[0][index].width * -1;
        }
      });
      // 记录上一次开始时手指所处位置
      this.startX = e.touches[0].pageX;
      // 记录上一次手指位置
      this.lastX = this.startX;
      //初始化非当前滑动消息列的位置
      this.noticeList.forEach(function (item, eq) {
        if (eq !== index) {
          item.slide_x = 0;
        }
      });
    },
    // 滑动中
    touchMove: function touchMove(e, index) {
      var endX = e.touches[0].pageX;
      var distance = endX - this.lastX;
      // 预测滑块所处位置
      var duang = this.noticeList[index].slide_x + distance;
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
    touchEnd: function touchEnd(e, index) {
      var distance = 10;
      var endTime = e.timeStamp;
      var x_end_distance = this.startX - this.lastX;
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
    recover: function recover(index) {
      this.noticeList[index].slide_x = 0;
    },
    errorMsg: function errorMsg(e) {
      console.error('image发生error事件，携带值为' + e.detail.errMsg);
    },
    showPopover: function showPopover() {
      this.popover = true;
    },
    goToPage: function goToPage(url) {
      if (!url) return;
      uni.navigateTo({
        url: url });

    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=template&id=52a12383&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=template&id=52a12383& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.popover = false
    }
  }
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue":
/*!***************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=52a12383& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=template&id=52a12383&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=template&id=52a12383&":
/*!**********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/index/index.vue?vue&type=template&id=52a12383& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=52a12383& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue?vue&type=template&id=52a12383&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_52a12383___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Findex%2Findex\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabbar/index/index.js.map