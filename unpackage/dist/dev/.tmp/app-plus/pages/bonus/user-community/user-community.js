(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/bonus/user-community/user-community"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _qrcode = _interopRequireDefault(__webpack_require__(/*! @/components/qrcode/qrcode.vue */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\components\\\\qrcode\\\\qrcode.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =\n{\n  components: {\n    qrcode: _qrcode.default },\n\n  onLoad: function onLoad(e) {var _this = this;\n    var text1 = 'pos=4';\n    var text2 = 'pos=3';\n    this.qrval1 = text1;\n    this.qrval2 = text2;\n\n    setTimeout(function () {\n      _this.createCode();\n    }, 500);\n\n    this.loadAzMap();\n  },\n  data: function data() {\n    return {\n      qrval1: '',\n      qrval2: '',\n      qrsize: 56,\n      total1: 0,\n      total2: 0,\n      userName: '' };\n\n  },\n  methods: {\n    loadAzMap: function loadAzMap() {var _this2 = this;\n      uni.request({\n        url: this.websiteUrl + 'team/az_map',\n        method: 'POST',\n        data: {},\n        dataType: 'json', //服务器返回json格式数据\n        headers: { 'Content-Type': 'application/json', 'Token': this.token },\n        success: function success(res) {\n          var res = res.data;\n          if (res.code == 200) {\n            console.log(\"获取az_map数据成功：\" + JSON.stringify(res.data));\n            var data = res.data;\n            var total1 = data.total1;\n            var total2 = data.total2;\n            var userName = data.userName;\n            if (userName) {\n              _this2.userName = userName;\n            }\n            if (total1 || total1 == 0) {\n              _this2.total1 = total1;\n            }\n            if (total2 || total2 == 0) {\n              _this2.total2 = total2;\n            }\n            if (total1 < total2) {\n              _this2.total1 = total2;\n              _this2.total2 = total1;\n            }\n          }\n        },\n        fail: function fail() {},\n        complete: function complete() {} });\n\n    },\n    register: function register(pos) {\n      uni.navigateTo({\n        url: '/pages/bonus/user-machine/machine-apply/machine-apply?pos=' + pos });\n\n    },\n    hideCode: function hideCode() {\n      this.$refs.qrcode.clearQrcode();\n    },\n    createCode: function createCode() {\n      this.$refs.qrcode1.creatQrcode();\n      this.$refs.qrcode2.creatQrcode();\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ \"./node_modules/@dcloudio/uni-app-plus/dist/index.js\")[\"default\"]))\n\n//# sourceURL=uni-app:///pages/bonus/user-community/user-community.vue?vue&type=script&lang=js&?44cb");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=template&id=384b0150&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=template&id=384b0150&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"view\", { staticClass: \"wrap-container\" }, [\n    _c(\"view\", { staticClass: \"grid-table\" }, [\n      _vm._m(0),\n      _c(\"view\", { staticClass: \"grid-table-row\" }, [\n        _c(\"view\", { staticClass: \"grid-table-item\" }, [_vm._v(\"公有\")]),\n        _c(\n          \"view\",\n          {\n            staticClass: \"grid-table-item qrcode-inner\",\n            attrs: { eventid: \"2505aa6f-0\" },\n            on: {\n              click: function($event) {\n                _vm.register(0)\n              }\n            }\n          },\n          [\n            _c(\"qrcode\", {\n              ref: \"qrcode1\",\n              attrs: {\n                val: _vm.qrval1,\n                size: _vm.qrsize,\n                codeType: 2,\n                mpcomid: \"2505aa6f-0\"\n              }\n            })\n          ],\n          1\n        ),\n        _c(\"view\", { staticClass: \"grid-table-item\" }, [\n          _c(\"view\", { staticClass: \"red-btn-item\" }, [\n            _vm._v(_vm._s(_vm.total1))\n          ])\n        ])\n      ]),\n      _c(\"view\", { staticClass: \"grid-table-row\" }, [\n        _c(\"view\", { staticClass: \"grid-table-item\" }, [_vm._v(\"私有\")]),\n        _c(\n          \"view\",\n          {\n            staticClass: \"grid-table-item qrcode-inner\",\n            attrs: { eventid: \"2505aa6f-1\" },\n            on: {\n              click: function($event) {\n                _vm.register(1)\n              }\n            }\n          },\n          [\n            _c(\"qrcode\", {\n              ref: \"qrcode2\",\n              attrs: {\n                val: _vm.qrval2,\n                size: _vm.qrsize,\n                codeType: 2,\n                mpcomid: \"2505aa6f-1\"\n              }\n            })\n          ],\n          1\n        ),\n        _c(\"view\", { staticClass: \"grid-table-item\" }, [\n          _c(\"view\", { staticClass: \"red-btn-item\" }, [\n            _vm._v(_vm._s(_vm.total2))\n          ])\n        ])\n      ])\n    ])\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"grid-table-row\" }, [\n      _c(\"view\", { staticClass: \"grid-table-item\" }, [_vm._v(\"社区\")]),\n      _c(\"view\", { staticClass: \"grid-table-item\" }, [_vm._v(\"二维码\")]),\n      _c(\"view\", { staticClass: \"grid-table-item\" }, [_vm._v(\"社区业绩\")])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=template&id=384b0150&scoped=true&");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fbonus%2Fuser-community%2Fuser-community\"}":
/*!*****************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fbonus%2Fuser-community%2Fuser-community"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("__webpack_require__(/*! uni-pages */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages.json\");\nvar _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ \"./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js\"));\nvar _userCommunity = _interopRequireDefault(__webpack_require__(/*! ./pages/bonus/user-community/user-community.vue */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory.default)(_userCommunity.default));\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/main.js?%7B%22page%22:%22pages%252Fbonus%252Fuser-community%252Fuser-community%22%7D");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue":
/*!********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-community.vue?vue&type=template&id=384b0150&scoped=true& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=template&id=384b0150&scoped=true&\");\n/* harmony import */ var _user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-community.vue?vue&type=script&lang=js& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true& */ \"G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"384b0150\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/user-community/user-community.vue");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./user-community.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=uni-app:///pages/bonus/user-community/user-community.vue?vue&type=script&lang=js&?ce4f");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!./user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&\");\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_style_index_0_id_384b0150_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=style&index=0&id=384b0150&lang=scss&scoped=true&");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\bonus\\user-community\\user-community.vue?vue&type=template&id=384b0150&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=template&id=384b0150&scoped=true& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./user-community.vue?vue&type=template&id=384b0150&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\\\BOF项目\\\\bof小程序\\\\bof-uniapp\\\\pages\\\\bonus\\\\user-community\\\\user-community.vue?vue&type=template&id=384b0150&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_user_community_vue_vue_type_template_id_384b0150_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=G:/BOF%E9%A1%B9%E7%9B%AE/bof%E5%B0%8F%E7%A8%8B%E5%BA%8F/bof-uniapp/pages/bonus/user-community/user-community.vue?vue&type=template&id=384b0150&scoped=true&");

/***/ })

},[["G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fbonus%2Fuser-community%2Fuser-community\"}","common/runtime","common/vendor"]]]);