(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/bonus/kefu/kefu"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _vuex = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\nvar _qrcode = _interopRequireDefault(__webpack_require__(/*! @/components/qrcode/qrcode.vue */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\components\\\\qrcode\\\\qrcode.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}\nvar ctx = null;var _default =\n{\n  components: {\n    qrcode: _qrcode.default },\n\n  data: function data() {\n    return {\n      codeImgList: [\n      {\n        id: 1,\n        path: '../../../static/img/share/dow_android.png' },\n\n      {\n        id: 2,\n        path: '../../../static/img/share/don_ios.png' },\n\n      {\n        id: 3,\n        path: '../../../static/img/share/weixin_zgh.png' }],\n\n      //\n      filePath: '',\n      saveImage: false,\n      indicatorDots: true,\n      previewImg: false,\n      current: 0 //当前滑块的位置\n    };\n  },\n  computed: _objectSpread({},\n  (0, _vuex.mapState)(['token', 'userName'])),\n\n  onShow: function onShow() {\n\n  },\n  onLoad: function onLoad(e) {\n\n  },\n  methods: {\n    showPreviewImg: function showPreviewImg(item) {\n      this.previewImg = true;\n      this.current = item.id - 1;\n    },\n    hidePreviewImg: function hidePreviewImg() {\n      this.previewImg = false;\n    },\n    saveImg: function saveImg(item) {\n      uni.showLoading({\n        title: '正在保存' });\n\n      var self = this;\n      uni.saveImageToPhotosAlbum({\n        filePath: item.path,\n        success: function success() {\n          setTimeout(function () {\n            uni.showToast({\n              title: '图片保存成功～' });\n\n            self.previewImg = false;\n          }, 1000);\n        } });\n\n    },\n    call: function call(number) {\n      uni.makePhoneCall({\n        phoneNumber: number });\n\n    },\n    setClipboard: function setClipboard(data) {\n      uni.setClipboardData({\n        data: data,\n        success: function success() {\n          uni.showToast({\n            title: '复制成功' });\n\n        } });\n\n    },\n    openQQ: function openQQ() {\n\n      console.log(plus.os.name);\n      if (plus.os.name == \"Android\") {\n        var main = plus.android.runtimeMainActivity();\n        var Intent = plus.android.importClass('android.content.Intent');\n        var Uri = plus.android.importClass('android.net.Uri');\n        var intent = new Intent(Intent.ACTION_VIEW, Uri.parse(\n        \"mqqwpa://im/chat?chat_type=wpa&uin=819951541\"));\n        try {\n          main.startActivity(intent);\n        } catch (a) {\n          mui.toast(\"检查到您未安装QQ，请先下载QQ\");\n        }\n\n      }\n      if (plus.os.name == \"iOS\") {\n        plus.runtime.launchApplication({\n          action: \"mqq://im/chat?chat_type=wpa&uin=1301255937&version=1&src_type=web\" },\n        function (e) {\n          plus.nativeUI.confirm(\"检查到您未安装qq，请先到appstore搜索下载？\", function (i) {\n            if (i.index == 0) {\n              iosAppstore(\"itunes.apple.com/cn/app/mqq/\");\n            }\n          });\n        });\n      }\n\n      /* uni.navigateTo({\n        \turl:'/pages/bonus/qq/qq'\n        }); */\n    },\n    createCode: function createCode() {\n      this.$refs.qrcode.creatQrcode();\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ \"./node_modules/@dcloudio/uni-app-plus/dist/index.js\")[\"default\"]))\n\n//# sourceURL=uni-app:///pages/bonus/kefu/kefu.vue?vue&type=script&lang=js&?9255");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=template&id=14c0bb10&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=template&id=14c0bb10&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"view\", { staticClass: \"scroll-view\" }, [\n    _vm._m(0),\n    _c(\"view\", { staticClass: \"contact bg-white\" }, [\n      _c(\n        \"view\",\n        {\n          staticClass: \"contact-item\",\n          attrs: { eventid: \"b6e7f4a2-0\" },\n          on: {\n            click: function($event) {\n              _vm.call(\"4009626580\")\n            }\n          }\n        },\n        [\n          _vm._m(1),\n          _c(\"view\", { staticClass: \"num\" }, [_vm._v(\"400 9626 580\")])\n        ]\n      ),\n      _c(\n        \"view\",\n        {\n          staticClass: \"contact-item\",\n          attrs: { eventid: \"b6e7f4a2-1\" },\n          on: {\n            click: function($event) {\n              _vm.setClipboard(\"LAN819951541\")\n            }\n          }\n        },\n        [\n          _vm._m(2),\n          _c(\"view\", { staticClass: \"num\" }, [_vm._v(\"LAN819951541\")])\n        ]\n      )\n    ]),\n    _c(\n      \"view\",\n      { staticClass: \"contact bg-white codeimg-box\" },\n      _vm._l(_vm.codeImgList, function(item, index) {\n        return _c(\n          \"view\",\n          {\n            key: index,\n            staticClass: \"code-item\",\n            attrs: { eventid: \"b6e7f4a2-2-\" + index },\n            on: {\n              click: function($event) {\n                _vm.showPreviewImg(item)\n              }\n            }\n          },\n          [_c(\"image\", { attrs: { src: item.path, mode: \"widthFix\" } })]\n        )\n      })\n    ),\n    _c(\n      \"view\",\n      {\n        directives: [\n          {\n            name: \"show\",\n            rawName: \"v-show\",\n            value: _vm.previewImg,\n            expression: \"previewImg\"\n          }\n        ],\n        staticClass: \"swiper-area bg-black\"\n      },\n      [\n        _c(\n          \"swiper\",\n          {\n            staticClass: \"swiper\",\n            attrs: {\n              \"indicator-dots\": _vm.indicatorDots,\n              autoplay: _vm.autoplay,\n              interval: _vm.interval,\n              duration: _vm.duration,\n              current: _vm.current\n            }\n          },\n          _vm._l(_vm.codeImgList, function(item, index) {\n            return _c(\n              \"swiper-item\",\n              { key: index, attrs: { mpcomid: \"b6e7f4a2-0-\" + index } },\n              [\n                _c(\"view\", { staticClass: \"swiper-item\" }, [\n                  _c(\n                    \"view\",\n                    {\n                      staticClass: \"save-btn\",\n                      attrs: { eventid: \"b6e7f4a2-3-\" + index },\n                      on: {\n                        click: function($event) {\n                          _vm.saveImg(item)\n                        }\n                      }\n                    },\n                    [_vm._v(\"保存\")]\n                  ),\n                  _c(\"image\", {\n                    attrs: {\n                      src: item.path,\n                      mode: \"widthFix\",\n                      eventid: \"b6e7f4a2-4-\" + index\n                    },\n                    on: { click: _vm.hidePreviewImg }\n                  })\n                ])\n              ]\n            )\n          })\n        ),\n        _c(\n          \"view\",\n          { staticClass: \"qrcode-area\" },\n          [\n            _c(\"qrcode\", {\n              ref: \"qrcode\",\n              attrs: { val: _vm.qrval, size: _vm.qrsize, mpcomid: \"b6e7f4a2-1\" }\n            })\n          ],\n          1\n        )\n      ],\n      1\n    ),\n    _c(\n      \"view\",\n      {\n        staticClass: \"fixed-footer\",\n        attrs: { eventid: \"b6e7f4a2-5\" },\n        on: { click: _vm.openQQ }\n      },\n      [\n        _c(\"image\", {\n          staticStyle: {\n            width: \"100%\",\n            height: \"100%\",\n            position: \"absolute\",\n            bottom: \"0\",\n            left: \"0\"\n          },\n          attrs: {\n            src: \"../../../static/img/share/btn_bj.png\",\n            mode: \"widthFix\"\n          }\n        }),\n        _vm._m(3)\n      ]\n    )\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"kefu bg-white\" }, [\n      _c(\"image\", {\n        staticClass: \"person\",\n        attrs: { src: \"../../../static/img/share/kefu2.png\" }\n      }),\n      _c(\"image\", {\n        staticClass: \"box\",\n        attrs: { src: \"../../../static/img/share/text_bj.png\" }\n      }),\n      _c(\"view\", { staticClass: \"hello\" }, [\n        _vm._v(\"Hi,我是您的BOF客服小浠,我为您准备了以下服务!\")\n      ])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"contact-methods\" }, [\n      _c(\"image\", {\n        staticClass: \"box icon-image\",\n        attrs: { src: \"../../../static/img/share/phone.png\", mode: \"widthFix\" }\n      }),\n      _c(\"view\", { staticClass: \"title\" }, [_vm._v(\"客服热线\")])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"contact-methods\" }, [\n      _c(\"image\", {\n        staticClass: \"box icon-image\",\n        attrs: { src: \"../../../static/img/share/weixin.png\", mode: \"widthFix\" }\n      }),\n      _c(\"view\", { staticClass: \"title\" }, [_vm._v(\"微信\")])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"footer-btn\" }, [\n      _c(\"image\", {\n        staticStyle: { width: \"40rpx\", \"margin-right\": \"10rpx\" },\n        attrs: { src: \"../../../static/img/share/kefu1.png\", mode: \"widthFix\" }\n      }),\n      _c(\"text\", [_vm._v(\"找不到答案,向小浠提问吧\")])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=template&id=14c0bb10&scoped=true&");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fbonus%2Fkefu%2Fkefu\"}":
/*!*********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fbonus%2Fkefu%2Fkefu"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("__webpack_require__(/*! uni-pages */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages.json\");\nvar _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ \"./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js\"));\nvar _kefu = _interopRequireDefault(__webpack_require__(/*! ./pages/bonus/kefu/kefu.vue */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory.default)(_kefu.default));\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/main.js?%7B%22page%22:%22pages%252Fbonus%252Fkefu%252Fkefu%22%7D");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue":
/*!************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kefu.vue?vue&type=template&id=14c0bb10&scoped=true& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=template&id=14c0bb10&scoped=true&\");\n/* harmony import */ var _kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kefu.vue?vue&type=script&lang=js& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"14c0bb10\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/kefu/kefu.vue");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./kefu.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=uni-app:///pages/bonus/kefu/kefu.vue?vue&type=script&lang=js&?6bae");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!./kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_style_index_0_id_14c0bb10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=style&index=0&id=14c0bb10&lang=scss&scoped=true&");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\kefu\\kefu.vue?vue&type=template&id=14c0bb10&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=template&id=14c0bb10&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./kefu.vue?vue&type=template&id=14c0bb10&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\kefu\\\\kefu.vue?vue&type=template&id=14c0bb10&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_kefu_vue_vue_type_template_id_14c0bb10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/kefu/kefu.vue?vue&type=template&id=14c0bb10&scoped=true&");

/***/ })

},[["G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fbonus%2Fkefu%2Fkefu\"}","common/runtime","common/vendor"]]]);