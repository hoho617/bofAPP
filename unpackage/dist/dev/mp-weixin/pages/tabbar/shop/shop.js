(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/tabbar/shop/shop"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));









































var _vuex = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var uniLoadMore = function uniLoadMore() {return __webpack_require__.e(/*! import() | components/uni-load-more */ "components/uni-load-more").then(__webpack_require__.bind(null, /*! @/components/uni-load-more.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\uni-load-more.vue"));};var mediaList = function mediaList() {return __webpack_require__.e(/*! import() | components/media-list */ "components/media-list").then(__webpack_require__.bind(null, /*! @/components/media-list.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\media-list.vue"));};var myImage = function myImage() {return __webpack_require__.e(/*! import() | components/my-image */ "components/my-image").then(__webpack_require__.bind(null, /*! @/components/my-image.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\my-image.vue"));};




var _self,timer = null,pageIndex = 1;var _default =
{
  components: {
    myImage: myImage,
    uniLoadMore: uniLoadMore,
    mediaList: mediaList },

  data: function data() {
    return {
      tabBars: [],
      tabIndex: 0,
      catagoryIdList: [], //分类id
      // pageIndex:1,
      goodsList: [],
      isClickChange: false,
      scrollLeft: 0,
      classId: '',
      loadingType: 0,
      totalPage: 1,
      pageSize: 10,
      hasNextPage: false,
      loadingText: '加载中...',
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了" } };


  },
  computed: (0, _vuex.mapState)(['hasLogin', 'userName', 'token']),
  onLoad: function onLoad() {
    _self = this;
    if (!this.hasLogin) {
      uni.reLaunch({
        url: '/pages/login/login/login' });

    } else {
      console.log('已经登录过了');
      this.getBabBars();
    }
  },
  methods: {
    toMine: function toMine() {
      uni.switchTab({
        url: "/pages/tabBar/mine/mine" });

    },
    getBabBars: function getBabBars() {var _this = this;
      uni.request({
        url: this.websiteUrl + 'shop/goods_class_list',
        method: 'POST',
        data: {
          pid: 122 },

        dataType: 'json', //服务器返回json格式数据
        header: { 'Content-Type': 'application/json', 'Token': this.token },
        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            // console.log("获取tabBar列表成功："+JSON.stringify(res))
            _this.tabBars = res.data;
            _this.getCatagoryId(res.data);
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    getCatagoryId: function getCatagoryId(list) {//获取到每个tabar下的id
      var ary = [];
      for (var i = 0; i < list.length; i++) {
        // this.catagoryIdList.push(list[i].id);
        ary.push(list[i].id);
      }
      this.catagoryIdList = ary;
      // console.log(this.catagoryIdList)
      this.classId = ary[this.tabIndex];
      this.getGoodsList();
    },
    getGoodsList: function getGoodsList() {var _this2 = this;
      pageIndex = 1;
      this.loadingType = 0;
      uni.showNavigationBarLoading();
      uni.request({
        url: this.websiteUrl + 'shop/goods_list',
        method: 'POST',
        data: {
          classId: this.classId,
          pageIndex: pageIndex,
          pageSize: this.pageSize },

        dataType: 'json', //服务器返回json格式数据
        header: { 'Content-Type': 'application/json', 'Token': this.token },
        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            var list = res.data.list;
            var data = res.data;
            _this2.goodsList = list;
            _this2.hasNextPage = data.hasNextPage;
            if (!data.hasNextPage) {
              _self.loadingType = 2;
            }
            uni.hideNavigationBarLoading();
          }

        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    getMoreGoodsList: function getMoreGoodsList() {var _this3 = this;
      /* if(_self.loadingType != 0){
                                                                      	return false;
                                                                      } */
      // _self.loadingType = 1;
      uni.showNavigationBarLoading();
      uni.request({
        url: this.websiteUrl + 'shop/goods_list',
        method: 'POST',
        data: {
          classId: this.classId,
          pageIndex: pageIndex,
          pageSize: this.pageSize },

        dataType: 'json', //服务器返回json格式数据
        header: { 'Content-Type': 'application/json', 'Token': this.token },
        success: function success(res) {
          var res = res.data;
          if (res.code == 200) {
            var list = res.data.list;
            var data = res.data;
            if (data == null) {
              _self.loadingType = 2;
              uni.hideNavigationBarLoading();
              return;
            }
            _self.goodsList = _self.goodsList.concat(list);
            _self.loadingType = 0;
            _this3.hasNextPage = data.hasNextPage;
            uni.hideNavigationBarLoading();
          }

        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    getElSize: function getElSize(id) {//得到元素的size
      return new Promise(function (res, rej) {
        uni.createSelectorQuery().select("#" + id).fields({
          size: true,
          scrollOffset: true },
        function (data) {
          res(data);
        }).exec();
      });
    },
    loadMore: function () {var _loadMore = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                console.log('加载', pageIndex, _self.hasNextPage);
                pageIndex++;
                _self.loadingType = 1;
                if (_self.hasNextPage) {
                  _self.getMoreGoodsList();
                } else {
                  _self.loadingType = 2;
                }case 4:case "end":return _context.stop();}}}, _callee, this);}));function loadMore() {return _loadMore.apply(this, arguments);}return loadMore;}(),

    tabTab: function () {var _tabTab = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {var tabBar, tabBarScrollLeft, catagoryId;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0: //点击tabbar
                pageIndex = 1;
                // console.log(e.target.dataset.catogoryId)
                if (!(this.tabIndex === e.target.dataset.current)) {_context2.next = 5;break;}return _context2.abrupt("return",
                false);case 5:_context2.next = 7;return (

                  this.getElSize("tab-bar"));case 7:tabBar = _context2.sent;
                tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                // console.log(tabBarScrollLeft);
                this.scrollLeft = tabBarScrollLeft;
                this.isClickChange = true;
                this.tabIndex = e.target.dataset.current;
                catagoryId = e.target.dataset.catogoryId;
                this.classId = catagoryId;
                // this.getGoodsList();
                console.log('点击');case 15:case "end":return _context2.stop();}}}, _callee2, this);}));function tabTab(_x) {return _tabTab.apply(this, arguments);}return tabTab;}(),


    changeTab: function () {var _changeTab = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {var index;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                index = e.target.current;
                this.pageIndex = 1;
                this.setScrollLeft(index);
                this.classId = this.catagoryIdList[index];
                this.getGoodsList();
                this.tabIndex = index; //一旦访问data就会出问题
              case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function changeTab(_x2) {return _changeTab.apply(this, arguments);}return changeTab;}(),

    setScrollLeft: function () {var _setScrollLeft = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(tabIndex) {var leftWidthSum, i, nowElement, winWidth;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0: //设置swiper滑动时顶部tab随着滑动
                leftWidthSum = 0;
                i = 0;case 2:if (!(i <= tabIndex)) {_context4.next = 10;break;}_context4.next = 5;return (
                  this.getElSize('tabNum' + this.tabBars[i].id));case 5:nowElement = _context4.sent;
                leftWidthSum = leftWidthSum + nowElement.width;
                // console.log(nowElement)
              case 7:i++;_context4.next = 2;break;case 10:
                winWidth = uni.getSystemInfoSync().windowWidth;
                this.scrollLeft = leftWidthSum > winWidth ? leftWidthSum - winWidth : 0;case 12:case "end":return _context4.stop();}}}, _callee4, this);}));function setScrollLeft(_x3) {return _setScrollLeft.apply(this, arguments);}return setScrollLeft;}(),

    goDetail: function goDetail(item) {
      uni.navigateTo({
        url: '/pages/shops/shop-goods-detail/shop-goods-detail?data-goods-id=' + item.id + '&data-goods-optionId=' + item.optionId });

    },
    toShopCartList: function toShopCartList() {
      uni.navigateTo({
        url: '/pages/shops/shop-cart-list/shop-cart-list' });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=template&id=07529d1d&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=template&id=07529d1d& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue":
/*!*************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shop.vue?vue&type=template&id=07529d1d& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=template&id=07529d1d&");
/* harmony import */ var _shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shop.vue?vue&type=script&lang=js& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shop.vue?vue&type=style&index=0&lang=css& */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./shop.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./shop.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=template&id=07529d1d&":
/*!********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/tabbar/shop/shop.vue?vue&type=template&id=07529d1d& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./shop.vue?vue&type=template&id=07529d1d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue?vue&type=template&id=07529d1d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_shop_vue_vue_type_template_id_07529d1d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Fshop%2Fshop\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabbar/shop/shop.js.map