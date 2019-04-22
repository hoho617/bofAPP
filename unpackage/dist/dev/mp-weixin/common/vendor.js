(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

var SYNC_API_RE = /requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (isSyncApi(name)) {
    return false;
  }
  if (isCallbackApi(name)) {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.includes(key)) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });




var api = /*#__PURE__*/Object.freeze({});



var MOCKS = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function initMocks(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  MOCKS.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  Object.keys(methods).forEach(function (methodName) {
    if (!hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getProperties(props) {
  var properties = {
    vueSlots: { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } } };


  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }
        properties[key] = {
          type: PROP_TYPES.includes(opts.type) ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        properties[key] = {
          type: PROP_TYPES.includes(opts) ? opts : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};
  event.detail = event.detail || {};

  // TODO 又得兼容 mpvue 的 mp 对象
  event.mp = event;
  event.target = Object.assign({}, event.target, event.detail);
  return event;
}

function processEventArgs(event) {var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];var isCustom = arguments.length > 2 ? arguments[2] : undefined;var methodName = arguments.length > 3 ? arguments[3] : undefined;
  if (isCustom && !args.length) {// 无参数，直接传入 detail 数组
    if (!Array.isArray(event.detail)) {// 应该是使用了 wxcomponent 原生组件，为了向前兼容，传递原始 event 对象
      return [event];
    }
    return event.detail;
  }
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        ret.push(isCustom ? event.detail[0] : event);
      }
    } else {
      ret.push(arg);
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        var handler = _this.$vm[methodName];
        if (!isFn(handler)) {
          throw new Error(" _vm.".concat(methodName, " is not a function"));
        }
        if (isOnce) {
          if (handler.once) {
            return;
          }
          handler.once = true;
        }
        handler.apply(_this.$vm, processEventArgs(event, eventArray[1], isCustom, methodName));
      });
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = Object.create(null);
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm);
      });
      return $refs;
    } });

}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function createApp(vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      this.$vm = vm;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    } };


  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {

        this.$vm = new VueComponent({
          mpType: 'page',
          mpInstance: this });


        this.$vm.__call_hook('created');
        this.$vm.$mount();
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  return Component(pageOptions);
}

function initVueComponent(mpInstace, VueComponent) {var extraOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (mpInstace.$vm) {
    return;
  }

  var options = Object.assign({
    mpType: 'component',
    mpInstance: mpInstace,
    propsData: mpInstace.properties },
  extraOptions);
  // 初始化 vue 实例
  mpInstace.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = mpInstace.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    mpInstace.$vm.$scopedSlots = mpInstace.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  mpInstace.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var properties = getProperties(vueOptions.props);

  var VueComponent = _vue.default.extend(vueOptions);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVueComponent(this, VueComponent);
      },
      ready: function ready() {
        initVueComponent(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  return Component(componentOptions);
}

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$mp && vm.$mp[vm.mpType]){
        return vm.$mp[vm.mpType].is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    // initInjections(vm) // resolve injections before data/props
    initState(vm);
    // initProvide(vm) // resolve provide after data/props
    // callHook(vm, 'created')

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    //remove observer
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$mp[this.mpType];
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            mpInstance.setData(diffData,function(){
                //TODO
            });
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */


var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

var customizeRE = /:/g;

var customize = cached(function (str) {
    return camelize(str.replace(customizeRE, '-'))
});

function getTarget(obj, path) {
    var parts = path.split('.');
    if (parts.length === 1) {
        return obj[parts[0]]
    }
    return getTarget(obj[parts[0]], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$mp && event) {
            //click-left,click:left => clickLeft
            this.$mp[this.mpType]['triggerEvent'](customize(event), toArray(arguments, 1));
        }
        return oldEmit.apply(this, arguments)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$mp) {
                return this.$mp[this.mpType][method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.includes('trim')) {
                value = value.trim();
            }
            if (modifiers.includes('number')) {
                value = this._n(value);
            }
        }
        if (target.indexOf('.') === -1) {
            this[target] = value;
        } else {
            var paths = target.split('.');
            var key = paths.pop();
            this.$set(getTarget(this, paths.join('.')), key, value);
        }
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        if (!target) {
            this[key] = value;
        } else {
            this.$set(getTarget(this, target), key, value);
        }
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.includes(methodName)) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }
        
        return oldExtend.call(this,extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\common\\area.js":
/*!*************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/common/area.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cityData3 = [{ "text": "北京市", "value": "2", "children": [{ "text": "市辖区", "value": "3", "children": [{ "text": "东城区", "value": "4" }, { "text": "西城区", "value": "5" }, { "text": "朝阳区", "value": "6" }, { "text": "丰台区", "value": "7" }, { "text": "石景山区", "value": "8" }, { "text": "海淀区", "value": "9" }, { "text": "门头沟区", "value": "10" }, { "text": "房山区", "value": "11" }, { "text": "通州区", "value": "12" }, { "text": "顺义区", "value": "13" }, { "text": "昌平区", "value": "14" }, { "text": "大兴区", "value": "15" }, { "text": "怀柔区", "value": "16" }, { "text": "平谷区", "value": "17" }, { "text": "密云区", "value": "18" }, { "text": "延庆区", "value": "19" }] }] }, { "text": "天津市", "value": "20", "children": [{ "text": "市辖区", "value": "21", "children": [{ "text": "和平区", "value": "22" }, { "text": "河东区", "value": "23" }, { "text": "河西区", "value": "24" }, { "text": "南开区", "value": "25" }, { "text": "河北区", "value": "26" }, { "text": "红桥区", "value": "27" }, { "text": "东丽区", "value": "28" }, { "text": "西青区", "value": "29" }, { "text": "津南区", "value": "30" }, { "text": "北辰区", "value": "31" }, { "text": "武清区", "value": "32" }, { "text": "宝坻区", "value": "33" }, { "text": "滨海新区", "value": "34" }, { "text": "宁河区", "value": "35" }, { "text": "静海区", "value": "36" }, { "text": "蓟州区", "value": "37" }] }] }, { "text": "河北省", "value": "38", "children": [{ "text": "石家庄市", "value": "39", "children": [{ "text": "市辖区", "value": "40" }, { "text": "长安区", "value": "41" }, { "text": "桥西区", "value": "42" }, { "text": "新华区", "value": "43" }, { "text": "井陉矿区", "value": "44" }, { "text": "裕华区", "value": "45" }, { "text": "藁城区", "value": "46" }, { "text": "鹿泉区", "value": "47" }, { "text": "栾城区", "value": "48" }, { "text": "井陉县", "value": "49" }, { "text": "正定县", "value": "50" }, { "text": "行唐县", "value": "51" }, { "text": "灵寿县", "value": "52" }, { "text": "高邑县", "value": "53" }, { "text": "深泽县", "value": "54" }, { "text": "赞皇县", "value": "55" }, { "text": "无极县", "value": "56" }, { "text": "平山县", "value": "57" }, { "text": "元氏县", "value": "58" }, { "text": "赵县", "value": "59" }, { "text": "晋州市", "value": "60" }, { "text": "新乐市", "value": "61" }] }, { "text": "唐山市", "value": "62", "children": [{ "text": "市辖区", "value": "63" }, { "text": "路南区", "value": "64" }, { "text": "路北区", "value": "65" }, { "text": "古冶区", "value": "66" }, { "text": "开平区", "value": "67" }, { "text": "丰南区", "value": "68" }, { "text": "丰润区", "value": "69" }, { "text": "曹妃甸区", "value": "70" }, { "text": "滦县", "value": "71" }, { "text": "滦南县", "value": "72" }, { "text": "乐亭县", "value": "73" }, { "text": "迁西县", "value": "74" }, { "text": "玉田县", "value": "75" }, { "text": "遵化市", "value": "76" }, { "text": "迁安市", "value": "77" }] }, { "text": "秦皇岛市", "value": "78", "children": [{ "text": "市辖区", "value": "79" }, { "text": "海港区", "value": "80" }, { "text": "山海关区", "value": "81" }, { "text": "北戴河区", "value": "82" }, { "text": "抚宁区", "value": "83" }, { "text": "青龙满族自治县", "value": "84" }, { "text": "昌黎县", "value": "85" }, { "text": "卢龙县", "value": "86" }] }, { "text": "邯郸市", "value": "87", "children": [{ "text": "市辖区", "value": "88" }, { "text": "邯山区", "value": "89" }, { "text": "丛台区", "value": "90" }, { "text": "复兴区", "value": "91" }, { "text": "峰峰矿区", "value": "92" }, { "text": "邯郸县", "value": "93" }, { "text": "临漳县", "value": "94" }, { "text": "成安县", "value": "95" }, { "text": "大名县", "value": "96" }, { "text": "涉县", "value": "97" }, { "text": "磁县", "value": "98" }, { "text": "肥乡县", "value": "99" }, { "text": "永年县", "value": "100" }, { "text": "邱县", "value": "101" }, { "text": "鸡泽县", "value": "102" }, { "text": "广平县", "value": "103" }, { "text": "馆陶县", "value": "104" }, { "text": "魏县", "value": "105" }, { "text": "曲周县", "value": "106" }, { "text": "武安市", "value": "107" }] }, { "text": "邢台市", "value": "108", "children": [{ "text": "市辖区", "value": "109" }, { "text": "桥东区", "value": "110" }, { "text": "桥西区", "value": "111" }, { "text": "邢台县", "value": "112" }, { "text": "临城县", "value": "113" }, { "text": "内丘县", "value": "114" }, { "text": "柏乡县", "value": "115" }, { "text": "隆尧县", "value": "116" }, { "text": "任县", "value": "117" }, { "text": "南和县", "value": "118" }, { "text": "宁晋县", "value": "119" }, { "text": "巨鹿县", "value": "120" }, { "text": "新河县", "value": "121" }, { "text": "广宗县", "value": "122" }, { "text": "平乡县", "value": "123" }, { "text": "威县", "value": "124" }, { "text": "清河县", "value": "125" }, { "text": "临西县", "value": "126" }, { "text": "南宫市", "value": "127" }, { "text": "沙河市", "value": "128" }] }, { "text": "保定市", "value": "129", "children": [{ "text": "市辖区", "value": "130" }, { "text": "竞秀区", "value": "131" }, { "text": "莲池区", "value": "132" }, { "text": "满城区", "value": "133" }, { "text": "清苑区", "value": "134" }, { "text": "徐水区", "value": "135" }, { "text": "涞水县", "value": "136" }, { "text": "阜平县", "value": "137" }, { "text": "定兴县", "value": "138" }, { "text": "唐县", "value": "139" }, { "text": "高阳县", "value": "140" }, { "text": "容城县", "value": "141" }, { "text": "涞源县", "value": "142" }, { "text": "望都县", "value": "143" }, { "text": "安新县", "value": "144" }, { "text": "易县", "value": "145" }, { "text": "曲阳县", "value": "146" }, { "text": "蠡县", "value": "147" }, { "text": "顺平县", "value": "148" }, { "text": "博野县", "value": "149" }, { "text": "雄县", "value": "150" }, { "text": "涿州市", "value": "151" }, { "text": "安国市", "value": "152" }, { "text": "高碑店市", "value": "153" }] }, { "text": "张家口市", "value": "154", "children": [{ "text": "市辖区", "value": "155" }, { "text": "桥东区", "value": "156" }, { "text": "桥西区", "value": "157" }, { "text": "宣化区", "value": "158" }, { "text": "下花园区", "value": "159" }, { "text": "万全区", "value": "160" }, { "text": "崇礼区", "value": "161" }, { "text": "张北县", "value": "162" }, { "text": "康保县", "value": "163" }, { "text": "沽源县", "value": "164" }, { "text": "尚义县", "value": "165" }, { "text": "蔚县", "value": "166" }, { "text": "阳原县", "value": "167" }, { "text": "怀安县", "value": "168" }, { "text": "怀来县", "value": "169" }, { "text": "涿鹿县", "value": "170" }, { "text": "赤城县", "value": "171" }] }, { "text": "承德市", "value": "172", "children": [{ "text": "市辖区", "value": "173" }, { "text": "双桥区", "value": "174" }, { "text": "双滦区", "value": "175" }, { "text": "鹰手营子矿区", "value": "176" }, { "text": "承德县", "value": "177" }, { "text": "兴隆县", "value": "178" }, { "text": "平泉县", "value": "179" }, { "text": "滦平县", "value": "180" }, { "text": "隆化县", "value": "181" }, { "text": "丰宁满族自治县", "value": "182" }, { "text": "宽城满族自治县", "value": "183" }, { "text": "围场满族蒙古族自治县", "value": "184" }] }, { "text": "沧州市", "value": "185", "children": [{ "text": "市辖区", "value": "186" }, { "text": "新华区", "value": "187" }, { "text": "运河区", "value": "188" }, { "text": "沧县", "value": "189" }, { "text": "青县", "value": "190" }, { "text": "东光县", "value": "191" }, { "text": "海兴县", "value": "192" }, { "text": "盐山县", "value": "193" }, { "text": "肃宁县", "value": "194" }, { "text": "南皮县", "value": "195" }, { "text": "吴桥县", "value": "196" }, { "text": "献县", "value": "197" }, { "text": "孟村回族自治县", "value": "198" }, { "text": "泊头市", "value": "199" }, { "text": "任丘市", "value": "200" }, { "text": "黄骅市", "value": "201" }, { "text": "河间市", "value": "202" }] }, { "text": "廊坊市", "value": "203", "children": [{ "text": "市辖区", "value": "204" }, { "text": "安次区", "value": "205" }, { "text": "广阳区", "value": "206" }, { "text": "固安县", "value": "207" }, { "text": "永清县", "value": "208" }, { "text": "香河县", "value": "209" }, { "text": "大城县", "value": "210" }, { "text": "文安县", "value": "211" }, { "text": "大厂回族自治县", "value": "212" }, { "text": "霸州市", "value": "213" }, { "text": "三河市", "value": "214" }] }, { "text": "衡水市", "value": "215", "children": [{ "text": "市辖区", "value": "216" }, { "text": "桃城区", "value": "217" }, { "text": "冀州区", "value": "218" }, { "text": "枣强县", "value": "219" }, { "text": "武邑县", "value": "220" }, { "text": "武强县", "value": "221" }, { "text": "饶阳县", "value": "222" }, { "text": "安平县", "value": "223" }, { "text": "故城县", "value": "224" }, { "text": "景县", "value": "225" }, { "text": "阜城县", "value": "226" }, { "text": "深州市", "value": "227" }] }, { "text": "省直辖县级行政区划", "value": "228", "children": [{ "text": "定州市", "value": "229" }, { "text": "辛集市", "value": "230" }] }] }, { "text": "山西省", "value": "231", "children": [{ "text": "太原市", "value": "232", "children": [{ "text": "市辖区", "value": "233" }, { "text": "小店区", "value": "234" }, { "text": "迎泽区", "value": "235" }, { "text": "杏花岭区", "value": "236" }, { "text": "尖草坪区", "value": "237" }, { "text": "万柏林区", "value": "238" }, { "text": "晋源区", "value": "239" }, { "text": "清徐县", "value": "240" }, { "text": "阳曲县", "value": "241" }, { "text": "娄烦县", "value": "242" }, { "text": "古交市", "value": "243" }] }, { "text": "大同市", "value": "244", "children": [{ "text": "市辖区", "value": "245" }, { "text": "城区", "value": "246" }, { "text": "矿区", "value": "247" }, { "text": "南郊区", "value": "248" }, { "text": "新荣区", "value": "249" }, { "text": "阳高县", "value": "250" }, { "text": "天镇县", "value": "251" }, { "text": "广灵县", "value": "252" }, { "text": "灵丘县", "value": "253" }, { "text": "浑源县", "value": "254" }, { "text": "左云县", "value": "255" }, { "text": "大同县", "value": "256" }] }, { "text": "阳泉市", "value": "257", "children": [{ "text": "市辖区", "value": "258" }, { "text": "城区", "value": "259" }, { "text": "矿区", "value": "260" }, { "text": "郊区", "value": "261" }, { "text": "平定县", "value": "262" }, { "text": "盂县", "value": "263" }] }, { "text": "长治市", "value": "264", "children": [{ "text": "市辖区", "value": "265" }, { "text": "城区", "value": "266" }, { "text": "郊区", "value": "267" }, { "text": "长治县", "value": "268" }, { "text": "襄垣县", "value": "269" }, { "text": "屯留县", "value": "270" }, { "text": "平顺县", "value": "271" }, { "text": "黎城县", "value": "272" }, { "text": "壶关县", "value": "273" }, { "text": "长子县", "value": "274" }, { "text": "武乡县", "value": "275" }, { "text": "沁县", "value": "276" }, { "text": "沁源县", "value": "277" }, { "text": "潞城市", "value": "278" }] }, { "text": "晋城市", "value": "279", "children": [{ "text": "市辖区", "value": "280" }, { "text": "城区", "value": "281" }, { "text": "沁水县", "value": "282" }, { "text": "阳城县", "value": "283" }, { "text": "陵川县", "value": "284" }, { "text": "泽州县", "value": "285" }, { "text": "高平市", "value": "286" }] }, { "text": "朔州市", "value": "287", "children": [{ "text": "市辖区", "value": "288" }, { "text": "朔城区", "value": "289" }, { "text": "平鲁区", "value": "290" }, { "text": "山阴县", "value": "291" }, { "text": "应县", "value": "292" }, { "text": "右玉县", "value": "293" }, { "text": "怀仁县", "value": "294" }] }, { "text": "晋中市", "value": "295", "children": [{ "text": "市辖区", "value": "296" }, { "text": "榆次区", "value": "297" }, { "text": "榆社县", "value": "298" }, { "text": "左权县", "value": "299" }, { "text": "和顺县", "value": "300" }, { "text": "昔阳县", "value": "301" }, { "text": "寿阳县", "value": "302" }, { "text": "太谷县", "value": "303" }, { "text": "祁县", "value": "304" }, { "text": "平遥县", "value": "305" }, { "text": "灵石县", "value": "306" }, { "text": "介休市", "value": "307" }] }, { "text": "运城市", "value": "308", "children": [{ "text": "市辖区", "value": "309" }, { "text": "盐湖区", "value": "310" }, { "text": "临猗县", "value": "311" }, { "text": "万荣县", "value": "312" }, { "text": "闻喜县", "value": "313" }, { "text": "稷山县", "value": "314" }, { "text": "新绛县", "value": "315" }, { "text": "绛县", "value": "316" }, { "text": "垣曲县", "value": "317" }, { "text": "夏县", "value": "318" }, { "text": "平陆县", "value": "319" }, { "text": "芮城县", "value": "320" }, { "text": "永济市", "value": "321" }, { "text": "河津市", "value": "322" }] }, { "text": "忻州市", "value": "323", "children": [{ "text": "市辖区", "value": "324" }, { "text": "忻府区", "value": "325" }, { "text": "定襄县", "value": "326" }, { "text": "五台县", "value": "327" }, { "text": "代县", "value": "328" }, { "text": "繁峙县", "value": "329" }, { "text": "宁武县", "value": "330" }, { "text": "静乐县", "value": "331" }, { "text": "神池县", "value": "332" }, { "text": "五寨县", "value": "333" }, { "text": "岢岚县", "value": "334" }, { "text": "河曲县", "value": "335" }, { "text": "保德县", "value": "336" }, { "text": "偏关县", "value": "337" }, { "text": "原平市", "value": "338" }] }, { "text": "临汾市", "value": "339", "children": [{ "text": "市辖区", "value": "340" }, { "text": "尧都区", "value": "341" }, { "text": "曲沃县", "value": "342" }, { "text": "翼城县", "value": "343" }, { "text": "襄汾县", "value": "344" }, { "text": "洪洞县", "value": "345" }, { "text": "古县", "value": "346" }, { "text": "安泽县", "value": "347" }, { "text": "浮山县", "value": "348" }, { "text": "吉县", "value": "349" }, { "text": "乡宁县", "value": "350" }, { "text": "大宁县", "value": "351" }, { "text": "隰县", "value": "352" }, { "text": "永和县", "value": "353" }, { "text": "蒲县", "value": "354" }, { "text": "汾西县", "value": "355" }, { "text": "侯马市", "value": "356" }, { "text": "霍州市", "value": "357" }] }, { "text": "吕梁市", "value": "358", "children": [{ "text": "市辖区", "value": "359" }, { "text": "离石区", "value": "360" }, { "text": "文水县", "value": "361" }, { "text": "交城县", "value": "362" }, { "text": "兴县", "value": "363" }, { "text": "临县", "value": "364" }, { "text": "柳林县", "value": "365" }, { "text": "石楼县", "value": "366" }, { "text": "岚县", "value": "367" }, { "text": "方山县", "value": "368" }, { "text": "中阳县", "value": "369" }, { "text": "交口县", "value": "370" }, { "text": "孝义市", "value": "371" }, { "text": "汾阳市", "value": "372" }] }] }, { "text": "内蒙古自治区", "value": "373", "children": [{ "text": "呼和浩特市", "value": "374", "children": [{ "text": "市辖区", "value": "375" }, { "text": "新城区", "value": "376" }, { "text": "回民区", "value": "377" }, { "text": "玉泉区", "value": "378" }, { "text": "赛罕区", "value": "379" }, { "text": "土默特左旗", "value": "380" }, { "text": "托克托县", "value": "381" }, { "text": "和林格尔县", "value": "382" }, { "text": "清水河县", "value": "383" }, { "text": "武川县", "value": "384" }] }, { "text": "包头市", "value": "385", "children": [{ "text": "市辖区", "value": "386" }, { "text": "东河区", "value": "387" }, { "text": "昆都仑区", "value": "388" }, { "text": "青山区", "value": "389" }, { "text": "石拐区", "value": "390" }, { "text": "白云鄂博矿区", "value": "391" }, { "text": "九原区", "value": "392" }, { "text": "土默特右旗", "value": "393" }, { "text": "固阳县", "value": "394" }, { "text": "达尔罕茂明安联合旗", "value": "395" }] }, { "text": "乌海市", "value": "396", "children": [{ "text": "市辖区", "value": "397" }, { "text": "海勃湾区", "value": "398" }, { "text": "海南区", "value": "399" }, { "text": "乌达区", "value": "400" }] }, { "text": "赤峰市", "value": "401", "children": [{ "text": "市辖区", "value": "402" }, { "text": "红山区", "value": "403" }, { "text": "元宝山区", "value": "404" }, { "text": "松山区", "value": "405" }, { "text": "阿鲁科尔沁旗", "value": "406" }, { "text": "巴林左旗", "value": "407" }, { "text": "巴林右旗", "value": "408" }, { "text": "林西县", "value": "409" }, { "text": "克什克腾旗", "value": "410" }, { "text": "翁牛特旗", "value": "411" }, { "text": "喀喇沁旗", "value": "412" }, { "text": "宁城县", "value": "413" }, { "text": "敖汉旗", "value": "414" }] }, { "text": "通辽市", "value": "415", "children": [{ "text": "市辖区", "value": "416" }, { "text": "科尔沁区", "value": "417" }, { "text": "科尔沁左翼中旗", "value": "418" }, { "text": "科尔沁左翼后旗", "value": "419" }, { "text": "开鲁县", "value": "420" }, { "text": "库伦旗", "value": "421" }, { "text": "奈曼旗", "value": "422" }, { "text": "扎鲁特旗", "value": "423" }, { "text": "霍林郭勒市", "value": "424" }] }, { "text": "鄂尔多斯市", "value": "425", "children": [{ "text": "市辖区", "value": "426" }, { "text": "东胜区", "value": "427" }, { "text": "康巴什区", "value": "428" }, { "text": "达拉特旗", "value": "429" }, { "text": "准格尔旗", "value": "430" }, { "text": "鄂托克前旗", "value": "431" }, { "text": "鄂托克旗", "value": "432" }, { "text": "杭锦旗", "value": "433" }, { "text": "乌审旗", "value": "434" }, { "text": "伊金霍洛旗", "value": "435" }] }, { "text": "呼伦贝尔市", "value": "436", "children": [{ "text": "市辖区", "value": "437" }, { "text": "海拉尔区", "value": "438" }, { "text": "扎赉诺尔区", "value": "439" }, { "text": "阿荣旗", "value": "440" }, { "text": "莫力达瓦达斡尔族自治旗", "value": "441" }, { "text": "鄂伦春自治旗", "value": "442" }, { "text": "鄂温克族自治旗", "value": "443" }, { "text": "陈巴尔虎旗", "value": "444" }, { "text": "新巴尔虎左旗", "value": "445" }, { "text": "新巴尔虎右旗", "value": "446" }, { "text": "满洲里市", "value": "447" }, { "text": "牙克石市", "value": "448" }, { "text": "扎兰屯市", "value": "449" }, { "text": "额尔古纳市", "value": "450" }, { "text": "根河市", "value": "451" }] }, { "text": "巴彦淖尔市", "value": "452", "children": [{ "text": "市辖区", "value": "453" }, { "text": "临河区", "value": "454" }, { "text": "五原县", "value": "455" }, { "text": "磴口县", "value": "456" }, { "text": "乌拉特前旗", "value": "457" }, { "text": "乌拉特中旗", "value": "458" }, { "text": "乌拉特后旗", "value": "459" }, { "text": "杭锦后旗", "value": "460" }] }, { "text": "乌兰察布市", "value": "461", "children": [{ "text": "市辖区", "value": "462" }, { "text": "集宁区", "value": "463" }, { "text": "卓资县", "value": "464" }, { "text": "化德县", "value": "465" }, { "text": "商都县", "value": "466" }, { "text": "兴和县", "value": "467" }, { "text": "凉城县", "value": "468" }, { "text": "察哈尔右翼前旗", "value": "469" }, { "text": "察哈尔右翼中旗", "value": "470" }, { "text": "察哈尔右翼后旗", "value": "471" }, { "text": "四子王旗", "value": "472" }, { "text": "丰镇市", "value": "473" }] }, { "text": "兴安盟", "value": "474", "children": [{ "text": "乌兰浩特市", "value": "475" }, { "text": "阿尔山市", "value": "476" }, { "text": "科尔沁右翼前旗", "value": "477" }, { "text": "科尔沁右翼中旗", "value": "478" }, { "text": "扎赉特旗", "value": "479" }, { "text": "突泉县", "value": "480" }] }, { "text": "锡林郭勒盟", "value": "481", "children": [{ "text": "二连浩特市", "value": "482" }, { "text": "锡林浩特市", "value": "483" }, { "text": "阿巴嘎旗", "value": "484" }, { "text": "苏尼特左旗", "value": "485" }, { "text": "苏尼特右旗", "value": "486" }, { "text": "东乌珠穆沁旗", "value": "487" }, { "text": "西乌珠穆沁旗", "value": "488" }, { "text": "太仆寺旗", "value": "489" }, { "text": "镶黄旗", "value": "490" }, { "text": "正镶白旗", "value": "491" }, { "text": "正蓝旗", "value": "492" }, { "text": "多伦县", "value": "493" }] }, { "text": "阿拉善盟", "value": "494", "children": [{ "text": "阿拉善左旗", "value": "495" }, { "text": "阿拉善右旗", "value": "496" }, { "text": "额济纳旗", "value": "497" }] }] }, { "text": "辽宁省", "value": "498", "children": [{ "text": "沈阳市", "value": "499", "children": [{ "text": "市辖区", "value": "500" }, { "text": "和平区", "value": "501" }, { "text": "沈河区", "value": "502" }, { "text": "大东区", "value": "503" }, { "text": "皇姑区", "value": "504" }, { "text": "铁西区", "value": "505" }, { "text": "苏家屯区", "value": "506" }, { "text": "浑南区", "value": "507" }, { "text": "沈北新区", "value": "508" }, { "text": "于洪区", "value": "509" }, { "text": "辽中区", "value": "510" }, { "text": "康平县", "value": "511" }, { "text": "法库县", "value": "512" }, { "text": "新民市", "value": "513" }] }, { "text": "大连市", "value": "514", "children": [{ "text": "市辖区", "value": "515" }, { "text": "中山区", "value": "516" }, { "text": "西岗区", "value": "517" }, { "text": "沙河口区", "value": "518" }, { "text": "甘井子区", "value": "519" }, { "text": "旅顺口区", "value": "520" }, { "text": "金州区", "value": "521" }, { "text": "普兰店区", "value": "522" }, { "text": "长海县", "value": "523" }, { "text": "瓦房店市", "value": "524" }, { "text": "庄河市", "value": "525" }] }, { "text": "鞍山市", "value": "526", "children": [{ "text": "市辖区", "value": "527" }, { "text": "铁东区", "value": "528" }, { "text": "铁西区", "value": "529" }, { "text": "立山区", "value": "530" }, { "text": "千山区", "value": "531" }, { "text": "台安县", "value": "532" }, { "text": "岫岩满族自治县", "value": "533" }, { "text": "海城市", "value": "534" }] }, { "text": "抚顺市", "value": "535", "children": [{ "text": "市辖区", "value": "536" }, { "text": "新抚区", "value": "537" }, { "text": "东洲区", "value": "538" }, { "text": "望花区", "value": "539" }, { "text": "顺城区", "value": "540" }, { "text": "抚顺县", "value": "541" }, { "text": "新宾满族自治县", "value": "542" }, { "text": "清原满族自治县", "value": "543" }] }, { "text": "本溪市", "value": "544", "children": [{ "text": "市辖区", "value": "545" }, { "text": "平山区", "value": "546" }, { "text": "溪湖区", "value": "547" }, { "text": "明山区", "value": "548" }, { "text": "南芬区", "value": "549" }, { "text": "本溪满族自治县", "value": "550" }, { "text": "桓仁满族自治县", "value": "551" }] }, { "text": "丹东市", "value": "552", "children": [{ "text": "市辖区", "value": "553" }, { "text": "元宝区", "value": "554" }, { "text": "振兴区", "value": "555" }, { "text": "振安区", "value": "556" }, { "text": "宽甸满族自治县", "value": "557" }, { "text": "东港市", "value": "558" }, { "text": "凤城市", "value": "559" }] }, { "text": "锦州市", "value": "560", "children": [{ "text": "市辖区", "value": "561" }, { "text": "古塔区", "value": "562" }, { "text": "凌河区", "value": "563" }, { "text": "太和区", "value": "564" }, { "text": "黑山县", "value": "565" }, { "text": "义县", "value": "566" }, { "text": "凌海市", "value": "567" }, { "text": "北镇市", "value": "568" }] }, { "text": "营口市", "value": "569", "children": [{ "text": "市辖区", "value": "570" }, { "text": "站前区", "value": "571" }, { "text": "西市区", "value": "572" }, { "text": "鲅鱼圈区", "value": "573" }, { "text": "老边区", "value": "574" }, { "text": "盖州市", "value": "575" }, { "text": "大石桥市", "value": "576" }] }, { "text": "阜新市", "value": "577", "children": [{ "text": "市辖区", "value": "578" }, { "text": "海州区", "value": "579" }, { "text": "新邱区", "value": "580" }, { "text": "太平区", "value": "581" }, { "text": "清河门区", "value": "582" }, { "text": "细河区", "value": "583" }, { "text": "阜新蒙古族自治县", "value": "584" }, { "text": "彰武县", "value": "585" }] }, { "text": "辽阳市", "value": "586", "children": [{ "text": "市辖区", "value": "587" }, { "text": "白塔区", "value": "588" }, { "text": "文圣区", "value": "589" }, { "text": "宏伟区", "value": "590" }, { "text": "弓长岭区", "value": "591" }, { "text": "太子河区", "value": "592" }, { "text": "辽阳县", "value": "593" }, { "text": "灯塔市", "value": "594" }] }, { "text": "盘锦市", "value": "595", "children": [{ "text": "市辖区", "value": "596" }, { "text": "双台子区", "value": "597" }, { "text": "兴隆台区", "value": "598" }, { "text": "大洼区", "value": "599" }, { "text": "盘山县", "value": "600" }] }, { "text": "铁岭市", "value": "601", "children": [{ "text": "市辖区", "value": "602" }, { "text": "银州区", "value": "603" }, { "text": "清河区", "value": "604" }, { "text": "铁岭县", "value": "605" }, { "text": "西丰县", "value": "606" }, { "text": "昌图县", "value": "607" }, { "text": "调兵山市", "value": "608" }, { "text": "开原市", "value": "609" }] }, { "text": "朝阳市", "value": "610", "children": [{ "text": "市辖区", "value": "611" }, { "text": "双塔区", "value": "612" }, { "text": "龙城区", "value": "613" }, { "text": "朝阳县", "value": "614" }, { "text": "建平县", "value": "615" }, { "text": "喀喇沁左翼蒙古族自治县", "value": "616" }, { "text": "北票市", "value": "617" }, { "text": "凌源市", "value": "618" }] }, { "text": "葫芦岛市", "value": "619", "children": [{ "text": "市辖区", "value": "620" }, { "text": "连山区", "value": "621" }, { "text": "龙港区", "value": "622" }, { "text": "南票区", "value": "623" }, { "text": "绥中县", "value": "624" }, { "text": "建昌县", "value": "625" }, { "text": "兴城市", "value": "626" }] }] }, { "text": "吉林省", "value": "627", "children": [{ "text": "长春市", "value": "628", "children": [{ "text": "市辖区", "value": "629" }, { "text": "南关区", "value": "630" }, { "text": "宽城区", "value": "631" }, { "text": "朝阳区", "value": "632" }, { "text": "二道区", "value": "633" }, { "text": "绿园区", "value": "634" }, { "text": "双阳区", "value": "635" }, { "text": "九台区", "value": "636" }, { "text": "农安县", "value": "637" }, { "text": "榆树市", "value": "638" }, { "text": "德惠市", "value": "639" }] }, { "text": "吉林市", "value": "640", "children": [{ "text": "市辖区", "value": "641" }, { "text": "昌邑区", "value": "642" }, { "text": "龙潭区", "value": "643" }, { "text": "船营区", "value": "644" }, { "text": "丰满区", "value": "645" }, { "text": "永吉县", "value": "646" }, { "text": "蛟河市", "value": "647" }, { "text": "桦甸市", "value": "648" }, { "text": "舒兰市", "value": "649" }, { "text": "磐石市", "value": "650" }] }, { "text": "四平市", "value": "651", "children": [{ "text": "市辖区", "value": "652" }, { "text": "铁西区", "value": "653" }, { "text": "铁东区", "value": "654" }, { "text": "梨树县", "value": "655" }, { "text": "伊通满族自治县", "value": "656" }, { "text": "公主岭市", "value": "657" }, { "text": "双辽市", "value": "658" }] }, { "text": "辽源市", "value": "659", "children": [{ "text": "市辖区", "value": "660" }, { "text": "龙山区", "value": "661" }, { "text": "西安区", "value": "662" }, { "text": "东丰县", "value": "663" }, { "text": "东辽县", "value": "664" }] }, { "text": "通化市", "value": "665", "children": [{ "text": "市辖区", "value": "666" }, { "text": "东昌区", "value": "667" }, { "text": "二道江区", "value": "668" }, { "text": "通化县", "value": "669" }, { "text": "辉南县", "value": "670" }, { "text": "柳河县", "value": "671" }, { "text": "梅河口市", "value": "672" }, { "text": "集安市", "value": "673" }] }, { "text": "白山市", "value": "674", "children": [{ "text": "市辖区", "value": "675" }, { "text": "浑江区", "value": "676" }, { "text": "江源区", "value": "677" }, { "text": "抚松县", "value": "678" }, { "text": "靖宇县", "value": "679" }, { "text": "长白朝鲜族自治县", "value": "680" }, { "text": "临江市", "value": "681" }] }, { "text": "松原市", "value": "682", "children": [{ "text": "市辖区", "value": "683" }, { "text": "宁江区", "value": "684" }, { "text": "前郭尔罗斯蒙古族自治县", "value": "685" }, { "text": "长岭县", "value": "686" }, { "text": "乾安县", "value": "687" }, { "text": "扶余市", "value": "688" }] }, { "text": "白城市", "value": "689", "children": [{ "text": "市辖区", "value": "690" }, { "text": "洮北区", "value": "691" }, { "text": "镇赉县", "value": "692" }, { "text": "通榆县", "value": "693" }, { "text": "洮南市", "value": "694" }, { "text": "大安市", "value": "695" }] }, { "text": "延边朝鲜族自治州", "value": "696", "children": [{ "text": "延吉市", "value": "697" }, { "text": "图们市", "value": "698" }, { "text": "敦化市", "value": "699" }, { "text": "珲春市", "value": "700" }, { "text": "龙井市", "value": "701" }, { "text": "和龙市", "value": "702" }, { "text": "汪清县", "value": "703" }, { "text": "安图县", "value": "704" }] }] }, { "text": "黑龙江省", "value": "705", "children": [{ "text": "哈尔滨市", "value": "706", "children": [{ "text": "市辖区", "value": "707" }, { "text": "道里区", "value": "708" }, { "text": "南岗区", "value": "709" }, { "text": "道外区", "value": "710" }, { "text": "平房区", "value": "711" }, { "text": "松北区", "value": "712" }, { "text": "香坊区", "value": "713" }, { "text": "呼兰区", "value": "714" }, { "text": "阿城区", "value": "715" }, { "text": "双城区", "value": "716" }, { "text": "依兰县", "value": "717" }, { "text": "方正县", "value": "718" }, { "text": "宾县", "value": "719" }, { "text": "巴彦县", "value": "720" }, { "text": "木兰县", "value": "721" }, { "text": "通河县", "value": "722" }, { "text": "延寿县", "value": "723" }, { "text": "尚志市", "value": "724" }, { "text": "五常市", "value": "725" }] }, { "text": "齐齐哈尔市", "value": "726", "children": [{ "text": "市辖区", "value": "727" }, { "text": "龙沙区", "value": "728" }, { "text": "建华区", "value": "729" }, { "text": "铁锋区", "value": "730" }, { "text": "昂昂溪区", "value": "731" }, { "text": "富拉尔基区", "value": "732" }, { "text": "碾子山区", "value": "733" }, { "text": "梅里斯达斡尔族区", "value": "734" }, { "text": "龙江县", "value": "735" }, { "text": "依安县", "value": "736" }, { "text": "泰来县", "value": "737" }, { "text": "甘南县", "value": "738" }, { "text": "富裕县", "value": "739" }, { "text": "克山县", "value": "740" }, { "text": "克东县", "value": "741" }, { "text": "拜泉县", "value": "742" }, { "text": "讷河市", "value": "743" }] }, { "text": "鸡西市", "value": "744", "children": [{ "text": "市辖区", "value": "745" }, { "text": "鸡冠区", "value": "746" }, { "text": "恒山区", "value": "747" }, { "text": "滴道区", "value": "748" }, { "text": "梨树区", "value": "749" }, { "text": "城子河区", "value": "750" }, { "text": "麻山区", "value": "751" }, { "text": "鸡东县", "value": "752" }, { "text": "虎林市", "value": "753" }, { "text": "密山市", "value": "754" }] }, { "text": "鹤岗市", "value": "755", "children": [{ "text": "市辖区", "value": "756" }, { "text": "向阳区", "value": "757" }, { "text": "工农区", "value": "758" }, { "text": "南山区", "value": "759" }, { "text": "兴安区", "value": "760" }, { "text": "东山区", "value": "761" }, { "text": "兴山区", "value": "762" }, { "text": "萝北县", "value": "763" }, { "text": "绥滨县", "value": "764" }] }, { "text": "双鸭山市", "value": "765", "children": [{ "text": "市辖区", "value": "766" }, { "text": "尖山区", "value": "767" }, { "text": "岭东区", "value": "768" }, { "text": "四方台区", "value": "769" }, { "text": "宝山区", "value": "770" }, { "text": "集贤县", "value": "771" }, { "text": "友谊县", "value": "772" }, { "text": "宝清县", "value": "773" }, { "text": "饶河县", "value": "774" }] }, { "text": "大庆市", "value": "775", "children": [{ "text": "市辖区", "value": "776" }, { "text": "萨尔图区", "value": "777" }, { "text": "龙凤区", "value": "778" }, { "text": "让胡路区", "value": "779" }, { "text": "红岗区", "value": "780" }, { "text": "大同区", "value": "781" }, { "text": "肇州县", "value": "782" }, { "text": "肇源县", "value": "783" }, { "text": "林甸县", "value": "784" }, { "text": "杜尔伯特蒙古族自治县", "value": "785" }] }, { "text": "伊春市", "value": "786", "children": [{ "text": "市辖区", "value": "787" }, { "text": "伊春区", "value": "788" }, { "text": "南岔区", "value": "789" }, { "text": "友好区", "value": "790" }, { "text": "西林区", "value": "791" }, { "text": "翠峦区", "value": "792" }, { "text": "新青区", "value": "793" }, { "text": "美溪区", "value": "794" }, { "text": "金山屯区", "value": "795" }, { "text": "五营区", "value": "796" }, { "text": "乌马河区", "value": "797" }, { "text": "汤旺河区", "value": "798" }, { "text": "带岭区", "value": "799" }, { "text": "乌伊岭区", "value": "800" }, { "text": "红星区", "value": "801" }, { "text": "上甘岭区", "value": "802" }, { "text": "嘉荫县", "value": "803" }, { "text": "铁力市", "value": "804" }] }, { "text": "佳木斯市", "value": "805", "children": [{ "text": "市辖区", "value": "806" }, { "text": "向阳区", "value": "807" }, { "text": "前进区", "value": "808" }, { "text": "东风区", "value": "809" }, { "text": "郊区", "value": "810" }, { "text": "桦南县", "value": "811" }, { "text": "桦川县", "value": "812" }, { "text": "汤原县", "value": "813" }, { "text": "同江市", "value": "814" }, { "text": "富锦市", "value": "815" }, { "text": "抚远市", "value": "816" }] }, { "text": "七台河市", "value": "817", "children": [{ "text": "市辖区", "value": "818" }, { "text": "新兴区", "value": "819" }, { "text": "桃山区", "value": "820" }, { "text": "茄子河区", "value": "821" }, { "text": "勃利县", "value": "822" }] }, { "text": "牡丹江市", "value": "823", "children": [{ "text": "市辖区", "value": "824" }, { "text": "东安区", "value": "825" }, { "text": "阳明区", "value": "826" }, { "text": "爱民区", "value": "827" }, { "text": "西安区", "value": "828" }, { "text": "林口县", "value": "829" }, { "text": "绥芬河市", "value": "830" }, { "text": "海林市", "value": "831" }, { "text": "宁安市", "value": "832" }, { "text": "穆棱市", "value": "833" }, { "text": "东宁市", "value": "834" }] }, { "text": "黑河市", "value": "835", "children": [{ "text": "市辖区", "value": "836" }, { "text": "爱辉区", "value": "837" }, { "text": "嫩江县", "value": "838" }, { "text": "逊克县", "value": "839" }, { "text": "孙吴县", "value": "840" }, { "text": "北安市", "value": "841" }, { "text": "五大连池市", "value": "842" }] }, { "text": "绥化市", "value": "843", "children": [{ "text": "市辖区", "value": "844" }, { "text": "北林区", "value": "845" }, { "text": "望奎县", "value": "846" }, { "text": "兰西县", "value": "847" }, { "text": "青冈县", "value": "848" }, { "text": "庆安县", "value": "849" }, { "text": "明水县", "value": "850" }, { "text": "绥棱县", "value": "851" }, { "text": "安达市", "value": "852" }, { "text": "肇东市", "value": "853" }, { "text": "海伦市", "value": "854" }] }, { "text": "大兴安岭地区", "value": "855", "children": [{ "text": "呼玛县", "value": "856" }, { "text": "塔河县", "value": "857" }, { "text": "漠河县", "value": "858" }] }] }, { "text": "上海市", "value": "859", "children": [{ "text": "市辖区", "value": "860", "children": [{ "text": "黄浦区", "value": "861" }, { "text": "徐汇区", "value": "862" }, { "text": "长宁区", "value": "863" }, { "text": "静安区", "value": "864" }, { "text": "普陀区", "value": "865" }, { "text": "虹口区", "value": "866" }, { "text": "杨浦区", "value": "867" }, { "text": "闵行区", "value": "868" }, { "text": "宝山区", "value": "869" }, { "text": "嘉定区", "value": "870" }, { "text": "浦东新区", "value": "871" }, { "text": "金山区", "value": "872" }, { "text": "松江区", "value": "873" }, { "text": "青浦区", "value": "874" }, { "text": "奉贤区", "value": "875" }, { "text": "崇明区", "value": "876" }] }] }, { "text": "江苏省", "value": "877", "children": [{ "text": "南京市", "value": "878", "children": [{ "text": "市辖区", "value": "879" }, { "text": "玄武区", "value": "880" }, { "text": "秦淮区", "value": "881" }, { "text": "建邺区", "value": "882" }, { "text": "鼓楼区", "value": "883" }, { "text": "浦口区", "value": "884" }, { "text": "栖霞区", "value": "885" }, { "text": "雨花台区", "value": "886" }, { "text": "江宁区", "value": "887" }, { "text": "六合区", "value": "888" }, { "text": "溧水区", "value": "889" }, { "text": "高淳区", "value": "890" }] }, { "text": "无锡市", "value": "891", "children": [{ "text": "市辖区", "value": "892" }, { "text": "锡山区", "value": "893" }, { "text": "惠山区", "value": "894" }, { "text": "滨湖区", "value": "895" }, { "text": "梁溪区", "value": "896" }, { "text": "新吴区", "value": "897" }, { "text": "江阴市", "value": "898" }, { "text": "宜兴市", "value": "899" }] }, { "text": "徐州市", "value": "900", "children": [{ "text": "市辖区", "value": "901" }, { "text": "鼓楼区", "value": "902" }, { "text": "云龙区", "value": "903" }, { "text": "贾汪区", "value": "904" }, { "text": "泉山区", "value": "905" }, { "text": "铜山区", "value": "906" }, { "text": "丰县", "value": "907" }, { "text": "沛县", "value": "908" }, { "text": "睢宁县", "value": "909" }, { "text": "新沂市", "value": "910" }, { "text": "邳州市", "value": "911" }] }, { "text": "常州市", "value": "912", "children": [{ "text": "市辖区", "value": "913" }, { "text": "天宁区", "value": "914" }, { "text": "钟楼区", "value": "915" }, { "text": "新北区", "value": "916" }, { "text": "武进区", "value": "917" }, { "text": "金坛区", "value": "918" }, { "text": "溧阳市", "value": "919" }] }, { "text": "苏州市", "value": "920", "children": [{ "text": "市辖区", "value": "921" }, { "text": "虎丘区", "value": "922" }, { "text": "吴中区", "value": "923" }, { "text": "相城区", "value": "924" }, { "text": "姑苏区", "value": "925" }, { "text": "吴江区", "value": "926" }, { "text": "常熟市", "value": "927" }, { "text": "张家港市", "value": "928" }, { "text": "昆山市", "value": "929" }, { "text": "太仓市", "value": "930" }] }, { "text": "南通市", "value": "931", "children": [{ "text": "市辖区", "value": "932" }, { "text": "崇川区", "value": "933" }, { "text": "港闸区", "value": "934" }, { "text": "通州区", "value": "935" }, { "text": "海安县", "value": "936" }, { "text": "如东县", "value": "937" }, { "text": "启东市", "value": "938" }, { "text": "如皋市", "value": "939" }, { "text": "海门市", "value": "940" }] }, { "text": "连云港市", "value": "941", "children": [{ "text": "市辖区", "value": "942" }, { "text": "连云区", "value": "943" }, { "text": "海州区", "value": "944" }, { "text": "赣榆区", "value": "945" }, { "text": "东海县", "value": "946" }, { "text": "灌云县", "value": "947" }, { "text": "灌南县", "value": "948" }] }, { "text": "淮安市", "value": "949", "children": [{ "text": "市辖区", "value": "950" }, { "text": "淮安区", "value": "951" }, { "text": "淮阴区", "value": "952" }, { "text": "清江浦区", "value": "953" }, { "text": "洪泽区", "value": "954" }, { "text": "涟水县", "value": "955" }, { "text": "盱眙县", "value": "956" }, { "text": "金湖县", "value": "957" }] }, { "text": "盐城市", "value": "958", "children": [{ "text": "市辖区", "value": "959" }, { "text": "亭湖区", "value": "960" }, { "text": "盐都区", "value": "961" }, { "text": "大丰区", "value": "962" }, { "text": "响水县", "value": "963" }, { "text": "滨海县", "value": "964" }, { "text": "阜宁县", "value": "965" }, { "text": "射阳县", "value": "966" }, { "text": "建湖县", "value": "967" }, { "text": "东台市", "value": "968" }] }, { "text": "扬州市", "value": "969", "children": [{ "text": "市辖区", "value": "970" }, { "text": "广陵区", "value": "971" }, { "text": "邗江区", "value": "972" }, { "text": "江都区", "value": "973" }, { "text": "宝应县", "value": "974" }, { "text": "仪征市", "value": "975" }, { "text": "高邮市", "value": "976" }] }, { "text": "镇江市", "value": "977", "children": [{ "text": "市辖区", "value": "978" }, { "text": "京口区", "value": "979" }, { "text": "润州区", "value": "980" }, { "text": "丹徒区", "value": "981" }, { "text": "丹阳市", "value": "982" }, { "text": "扬中市", "value": "983" }, { "text": "句容市", "value": "984" }] }, { "text": "泰州市", "value": "985", "children": [{ "text": "市辖区", "value": "986" }, { "text": "海陵区", "value": "987" }, { "text": "高港区", "value": "988" }, { "text": "姜堰区", "value": "989" }, { "text": "兴化市", "value": "990" }, { "text": "靖江市", "value": "991" }, { "text": "泰兴市", "value": "992" }] }, { "text": "宿迁市", "value": "993", "children": [{ "text": "市辖区", "value": "994" }, { "text": "宿城区", "value": "995" }, { "text": "宿豫区", "value": "996" }, { "text": "沭阳县", "value": "997" }, { "text": "泗阳县", "value": "998" }, { "text": "泗洪县", "value": "999" }] }] }, { "text": "浙江省", "value": "1000", "children": [{ "text": "杭州市", "value": "1001", "children": [{ "text": "市辖区", "value": "1002" }, { "text": "上城区", "value": "1003" }, { "text": "下城区", "value": "1004" }, { "text": "江干区", "value": "1005" }, { "text": "拱墅区", "value": "1006" }, { "text": "西湖区", "value": "1007" }, { "text": "滨江区", "value": "1008" }, { "text": "萧山区", "value": "1009" }, { "text": "余杭区", "value": "1010" }, { "text": "富阳区", "value": "1011" }, { "text": "桐庐县", "value": "1012" }, { "text": "淳安县", "value": "1013" }, { "text": "建德市", "value": "1014" }, { "text": "临安市", "value": "1015" }] }, { "text": "宁波市", "value": "1016", "children": [{ "text": "市辖区", "value": "1017" }, { "text": "海曙区", "value": "1018" }, { "text": "江东区", "value": "1019" }, { "text": "江北区", "value": "1020" }, { "text": "北仑区", "value": "1021" }, { "text": "镇海区", "value": "1022" }, { "text": "鄞州区", "value": "1023" }, { "text": "象山县", "value": "1024" }, { "text": "宁海县", "value": "1025" }, { "text": "余姚市", "value": "1026" }, { "text": "慈溪市", "value": "1027" }, { "text": "奉化市", "value": "1028" }] }, { "text": "温州市", "value": "1029", "children": [{ "text": "市辖区", "value": "1030" }, { "text": "鹿城区", "value": "1031" }, { "text": "龙湾区", "value": "1032" }, { "text": "瓯海区", "value": "1033" }, { "text": "洞头区", "value": "1034" }, { "text": "永嘉县", "value": "1035" }, { "text": "平阳县", "value": "1036" }, { "text": "苍南县", "value": "1037" }, { "text": "文成县", "value": "1038" }, { "text": "泰顺县", "value": "1039" }, { "text": "瑞安市", "value": "1040" }, { "text": "乐清市", "value": "1041" }] }, { "text": "嘉兴市", "value": "1042", "children": [{ "text": "市辖区", "value": "1043" }, { "text": "南湖区", "value": "1044" }, { "text": "秀洲区", "value": "1045" }, { "text": "嘉善县", "value": "1046" }, { "text": "海盐县", "value": "1047" }, { "text": "海宁市", "value": "1048" }, { "text": "平湖市", "value": "1049" }, { "text": "桐乡市", "value": "1050" }] }, { "text": "湖州市", "value": "1051", "children": [{ "text": "市辖区", "value": "1052" }, { "text": "吴兴区", "value": "1053" }, { "text": "南浔区", "value": "1054" }, { "text": "德清县", "value": "1055" }, { "text": "长兴县", "value": "1056" }, { "text": "安吉县", "value": "1057" }] }, { "text": "绍兴市", "value": "1058", "children": [{ "text": "市辖区", "value": "1059" }, { "text": "越城区", "value": "1060" }, { "text": "柯桥区", "value": "1061" }, { "text": "上虞区", "value": "1062" }, { "text": "新昌县", "value": "1063" }, { "text": "诸暨市", "value": "1064" }, { "text": "嵊州市", "value": "1065" }] }, { "text": "金华市", "value": "1066", "children": [{ "text": "市辖区", "value": "1067" }, { "text": "婺城区", "value": "1068" }, { "text": "金东区", "value": "1069" }, { "text": "武义县", "value": "1070" }, { "text": "浦江县", "value": "1071" }, { "text": "磐安县", "value": "1072" }, { "text": "兰溪市", "value": "1073" }, { "text": "义乌市", "value": "1074" }, { "text": "东阳市", "value": "1075" }, { "text": "永康市", "value": "1076" }] }, { "text": "衢州市", "value": "1077", "children": [{ "text": "市辖区", "value": "1078" }, { "text": "柯城区", "value": "1079" }, { "text": "衢江区", "value": "1080" }, { "text": "常山县", "value": "1081" }, { "text": "开化县", "value": "1082" }, { "text": "龙游县", "value": "1083" }, { "text": "江山市", "value": "1084" }] }, { "text": "舟山市", "value": "1085", "children": [{ "text": "市辖区", "value": "1086" }, { "text": "定海区", "value": "1087" }, { "text": "普陀区", "value": "1088" }, { "text": "岱山县", "value": "1089" }, { "text": "嵊泗县", "value": "1090" }] }, { "text": "台州市", "value": "1091", "children": [{ "text": "市辖区", "value": "1092" }, { "text": "椒江区", "value": "1093" }, { "text": "黄岩区", "value": "1094" }, { "text": "路桥区", "value": "1095" }, { "text": "玉环县", "value": "1096" }, { "text": "三门县", "value": "1097" }, { "text": "天台县", "value": "1098" }, { "text": "仙居县", "value": "1099" }, { "text": "温岭市", "value": "1100" }, { "text": "临海市", "value": "1101" }] }, { "text": "丽水市", "value": "1102", "children": [{ "text": "市辖区", "value": "1103" }, { "text": "莲都区", "value": "1104" }, { "text": "青田县", "value": "1105" }, { "text": "缙云县", "value": "1106" }, { "text": "遂昌县", "value": "1107" }, { "text": "松阳县", "value": "1108" }, { "text": "云和县", "value": "1109" }, { "text": "庆元县", "value": "1110" }, { "text": "景宁畲族自治县", "value": "1111" }, { "text": "龙泉市", "value": "1112" }] }] }, { "text": "安徽省", "value": "1113", "children": [{ "text": "合肥市", "value": "1114", "children": [{ "text": "市辖区", "value": "1115" }, { "text": "瑶海区", "value": "1116" }, { "text": "庐阳区", "value": "1117" }, { "text": "蜀山区", "value": "1118" }, { "text": "包河区", "value": "1119" }, { "text": "长丰县", "value": "1120" }, { "text": "肥东县", "value": "1121" }, { "text": "肥西县", "value": "1122" }, { "text": "庐江县", "value": "1123" }, { "text": "巢湖市", "value": "1124" }] }, { "text": "芜湖市", "value": "1125", "children": [{ "text": "市辖区", "value": "1126" }, { "text": "镜湖区", "value": "1127" }, { "text": "弋江区", "value": "1128" }, { "text": "鸠江区", "value": "1129" }, { "text": "三山区", "value": "1130" }, { "text": "芜湖县", "value": "1131" }, { "text": "繁昌县", "value": "1132" }, { "text": "南陵县", "value": "1133" }, { "text": "无为县", "value": "1134" }] }, { "text": "蚌埠市", "value": "1135", "children": [{ "text": "市辖区", "value": "1136" }, { "text": "龙子湖区", "value": "1137" }, { "text": "蚌山区", "value": "1138" }, { "text": "禹会区", "value": "1139" }, { "text": "淮上区", "value": "1140" }, { "text": "怀远县", "value": "1141" }, { "text": "五河县", "value": "1142" }, { "text": "固镇县", "value": "1143" }] }, { "text": "淮南市", "value": "1144", "children": [{ "text": "市辖区", "value": "1145" }, { "text": "大通区", "value": "1146" }, { "text": "田家庵区", "value": "1147" }, { "text": "谢家集区", "value": "1148" }, { "text": "八公山区", "value": "1149" }, { "text": "潘集区", "value": "1150" }, { "text": "凤台县", "value": "1151" }, { "text": "寿县", "value": "1152" }] }, { "text": "马鞍山市", "value": "1153", "children": [{ "text": "市辖区", "value": "1154" }, { "text": "花山区", "value": "1155" }, { "text": "雨山区", "value": "1156" }, { "text": "博望区", "value": "1157" }, { "text": "当涂县", "value": "1158" }, { "text": "含山县", "value": "1159" }, { "text": "和县", "value": "1160" }] }, { "text": "淮北市", "value": "1161", "children": [{ "text": "市辖区", "value": "1162" }, { "text": "杜集区", "value": "1163" }, { "text": "相山区", "value": "1164" }, { "text": "烈山区", "value": "1165" }, { "text": "濉溪县", "value": "1166" }] }, { "text": "铜陵市", "value": "1167", "children": [{ "text": "市辖区", "value": "1168" }, { "text": "铜官区", "value": "1169" }, { "text": "义安区", "value": "1170" }, { "text": "郊区", "value": "1171" }, { "text": "枞阳县", "value": "1172" }] }, { "text": "安庆市", "value": "1173", "children": [{ "text": "市辖区", "value": "1174" }, { "text": "迎江区", "value": "1175" }, { "text": "大观区", "value": "1176" }, { "text": "宜秀区", "value": "1177" }, { "text": "怀宁县", "value": "1178" }, { "text": "潜山县", "value": "1179" }, { "text": "太湖县", "value": "1180" }, { "text": "宿松县", "value": "1181" }, { "text": "望江县", "value": "1182" }, { "text": "岳西县", "value": "1183" }, { "text": "桐城市", "value": "1184" }] }, { "text": "黄山市", "value": "1185", "children": [{ "text": "市辖区", "value": "1186" }, { "text": "屯溪区", "value": "1187" }, { "text": "黄山区", "value": "1188" }, { "text": "徽州区", "value": "1189" }, { "text": "歙县", "value": "1190" }, { "text": "休宁县", "value": "1191" }, { "text": "黟县", "value": "1192" }, { "text": "祁门县", "value": "1193" }] }, { "text": "滁州市", "value": "1194", "children": [{ "text": "市辖区", "value": "1195" }, { "text": "琅琊区", "value": "1196" }, { "text": "南谯区", "value": "1197" }, { "text": "来安县", "value": "1198" }, { "text": "全椒县", "value": "1199" }, { "text": "定远县", "value": "1200" }, { "text": "凤阳县", "value": "1201" }, { "text": "天长市", "value": "1202" }, { "text": "明光市", "value": "1203" }] }, { "text": "阜阳市", "value": "1204", "children": [{ "text": "市辖区", "value": "1205" }, { "text": "颍州区", "value": "1206" }, { "text": "颍东区", "value": "1207" }, { "text": "颍泉区", "value": "1208" }, { "text": "临泉县", "value": "1209" }, { "text": "太和县", "value": "1210" }, { "text": "阜南县", "value": "1211" }, { "text": "颍上县", "value": "1212" }, { "text": "界首市", "value": "1213" }] }, { "text": "宿州市", "value": "1214", "children": [{ "text": "市辖区", "value": "1215" }, { "text": "埇桥区", "value": "1216" }, { "text": "砀山县", "value": "1217" }, { "text": "萧县", "value": "1218" }, { "text": "灵璧县", "value": "1219" }, { "text": "泗县", "value": "1220" }] }, { "text": "六安市", "value": "1221", "children": [{ "text": "市辖区", "value": "1222" }, { "text": "金安区", "value": "1223" }, { "text": "裕安区", "value": "1224" }, { "text": "叶集区", "value": "1225" }, { "text": "霍邱县", "value": "1226" }, { "text": "舒城县", "value": "1227" }, { "text": "金寨县", "value": "1228" }, { "text": "霍山县", "value": "1229" }] }, { "text": "亳州市", "value": "1230", "children": [{ "text": "市辖区", "value": "1231" }, { "text": "谯城区", "value": "1232" }, { "text": "涡阳县", "value": "1233" }, { "text": "蒙城县", "value": "1234" }, { "text": "利辛县", "value": "1235" }] }, { "text": "池州市", "value": "1236", "children": [{ "text": "市辖区", "value": "1237" }, { "text": "贵池区", "value": "1238" }, { "text": "东至县", "value": "1239" }, { "text": "石台县", "value": "1240" }, { "text": "青阳县", "value": "1241" }] }, { "text": "宣城市", "value": "1242", "children": [{ "text": "市辖区", "value": "1243" }, { "text": "宣州区", "value": "1244" }, { "text": "郎溪县", "value": "1245" }, { "text": "广德县", "value": "1246" }, { "text": "泾县", "value": "1247" }, { "text": "绩溪县", "value": "1248" }, { "text": "旌德县", "value": "1249" }, { "text": "宁国市", "value": "1250" }] }] }, { "text": "福建省", "value": "1251", "children": [{ "text": "福州市", "value": "1252", "children": [{ "text": "市辖区", "value": "1253" }, { "text": "鼓楼区", "value": "1254" }, { "text": "台江区", "value": "1255" }, { "text": "仓山区", "value": "1256" }, { "text": "马尾区", "value": "1257" }, { "text": "晋安区", "value": "1258" }, { "text": "闽侯县", "value": "1259" }, { "text": "连江县", "value": "1260" }, { "text": "罗源县", "value": "1261" }, { "text": "闽清县", "value": "1262" }, { "text": "永泰县", "value": "1263" }, { "text": "平潭县", "value": "1264" }, { "text": "福清市", "value": "1265" }, { "text": "长乐市", "value": "1266" }] }, { "text": "厦门市", "value": "1267", "children": [{ "text": "市辖区", "value": "1268" }, { "text": "思明区", "value": "1269" }, { "text": "海沧区", "value": "1270" }, { "text": "湖里区", "value": "1271" }, { "text": "集美区", "value": "1272" }, { "text": "同安区", "value": "1273" }, { "text": "翔安区", "value": "1274" }] }, { "text": "莆田市", "value": "1275", "children": [{ "text": "市辖区", "value": "1276" }, { "text": "城厢区", "value": "1277" }, { "text": "涵江区", "value": "1278" }, { "text": "荔城区", "value": "1279" }, { "text": "秀屿区", "value": "1280" }, { "text": "仙游县", "value": "1281" }] }, { "text": "三明市", "value": "1282", "children": [{ "text": "市辖区", "value": "1283" }, { "text": "梅列区", "value": "1284" }, { "text": "三元区", "value": "1285" }, { "text": "明溪县", "value": "1286" }, { "text": "清流县", "value": "1287" }, { "text": "宁化县", "value": "1288" }, { "text": "大田县", "value": "1289" }, { "text": "尤溪县", "value": "1290" }, { "text": "沙县", "value": "1291" }, { "text": "将乐县", "value": "1292" }, { "text": "泰宁县", "value": "1293" }, { "text": "建宁县", "value": "1294" }, { "text": "永安市", "value": "1295" }] }, { "text": "泉州市", "value": "1296", "children": [{ "text": "市辖区", "value": "1297" }, { "text": "鲤城区", "value": "1298" }, { "text": "丰泽区", "value": "1299" }, { "text": "洛江区", "value": "1300" }, { "text": "泉港区", "value": "1301" }, { "text": "惠安县", "value": "1302" }, { "text": "安溪县", "value": "1303" }, { "text": "永春县", "value": "1304" }, { "text": "德化县", "value": "1305" }, { "text": "金门县", "value": "1306" }, { "text": "石狮市", "value": "1307" }, { "text": "晋江市", "value": "1308" }, { "text": "南安市", "value": "1309" }] }, { "text": "漳州市", "value": "1310", "children": [{ "text": "市辖区", "value": "1311" }, { "text": "芗城区", "value": "1312" }, { "text": "龙文区", "value": "1313" }, { "text": "云霄县", "value": "1314" }, { "text": "漳浦县", "value": "1315" }, { "text": "诏安县", "value": "1316" }, { "text": "长泰县", "value": "1317" }, { "text": "东山县", "value": "1318" }, { "text": "南靖县", "value": "1319" }, { "text": "平和县", "value": "1320" }, { "text": "华安县", "value": "1321" }, { "text": "龙海市", "value": "1322" }] }, { "text": "南平市", "value": "1323", "children": [{ "text": "市辖区", "value": "1324" }, { "text": "延平区", "value": "1325" }, { "text": "建阳区", "value": "1326" }, { "text": "顺昌县", "value": "1327" }, { "text": "浦城县", "value": "1328" }, { "text": "光泽县", "value": "1329" }, { "text": "松溪县", "value": "1330" }, { "text": "政和县", "value": "1331" }, { "text": "邵武市", "value": "1332" }, { "text": "武夷山市", "value": "1333" }, { "text": "建瓯市", "value": "1334" }] }, { "text": "龙岩市", "value": "1335", "children": [{ "text": "市辖区", "value": "1336" }, { "text": "新罗区", "value": "1337" }, { "text": "永定区", "value": "1338" }, { "text": "长汀县", "value": "1339" }, { "text": "上杭县", "value": "1340" }, { "text": "武平县", "value": "1341" }, { "text": "连城县", "value": "1342" }, { "text": "漳平市", "value": "1343" }] }, { "text": "宁德市", "value": "1344", "children": [{ "text": "市辖区", "value": "1345" }, { "text": "蕉城区", "value": "1346" }, { "text": "霞浦县", "value": "1347" }, { "text": "古田县", "value": "1348" }, { "text": "屏南县", "value": "1349" }, { "text": "寿宁县", "value": "1350" }, { "text": "周宁县", "value": "1351" }, { "text": "柘荣县", "value": "1352" }, { "text": "福安市", "value": "1353" }, { "text": "福鼎市", "value": "1354" }] }] }, { "text": "江西省", "value": "1355", "children": [{ "text": "南昌市", "value": "1356", "children": [{ "text": "市辖区", "value": "1357" }, { "text": "东湖区", "value": "1358" }, { "text": "西湖区", "value": "1359" }, { "text": "青云谱区", "value": "1360" }, { "text": "湾里区", "value": "1361" }, { "text": "青山湖区", "value": "1362" }, { "text": "新建区", "value": "1363" }, { "text": "南昌县", "value": "1364" }, { "text": "安义县", "value": "1365" }, { "text": "进贤县", "value": "1366" }] }, { "text": "景德镇市", "value": "1367", "children": [{ "text": "市辖区", "value": "1368" }, { "text": "昌江区", "value": "1369" }, { "text": "珠山区", "value": "1370" }, { "text": "浮梁县", "value": "1371" }, { "text": "乐平市", "value": "1372" }] }, { "text": "萍乡市", "value": "1373", "children": [{ "text": "市辖区", "value": "1374" }, { "text": "安源区", "value": "1375" }, { "text": "湘东区", "value": "1376" }, { "text": "莲花县", "value": "1377" }, { "text": "上栗县", "value": "1378" }, { "text": "芦溪县", "value": "1379" }] }, { "text": "九江市", "value": "1380", "children": [{ "text": "市辖区", "value": "1381" }, { "text": "濂溪区", "value": "1382" }, { "text": "浔阳区", "value": "1383" }, { "text": "九江县", "value": "1384" }, { "text": "武宁县", "value": "1385" }, { "text": "修水县", "value": "1386" }, { "text": "永修县", "value": "1387" }, { "text": "德安县", "value": "1388" }, { "text": "都昌县", "value": "1389" }, { "text": "湖口县", "value": "1390" }, { "text": "彭泽县", "value": "1391" }, { "text": "瑞昌市", "value": "1392" }, { "text": "共青城市", "value": "1393" }, { "text": "庐山市", "value": "1394" }] }, { "text": "新余市", "value": "1395", "children": [{ "text": "市辖区", "value": "1396" }, { "text": "渝水区", "value": "1397" }, { "text": "分宜县", "value": "1398" }] }, { "text": "鹰潭市", "value": "1399", "children": [{ "text": "市辖区", "value": "1400" }, { "text": "月湖区", "value": "1401" }, { "text": "余江县", "value": "1402" }, { "text": "贵溪市", "value": "1403" }] }, { "text": "赣州市", "value": "1404", "children": [{ "text": "市辖区", "value": "1405" }, { "text": "章贡区", "value": "1406" }, { "text": "南康区", "value": "1407" }, { "text": "赣县", "value": "1408" }, { "text": "信丰县", "value": "1409" }, { "text": "大余县", "value": "1410" }, { "text": "上犹县", "value": "1411" }, { "text": "崇义县", "value": "1412" }, { "text": "安远县", "value": "1413" }, { "text": "龙南县", "value": "1414" }, { "text": "定南县", "value": "1415" }, { "text": "全南县", "value": "1416" }, { "text": "宁都县", "value": "1417" }, { "text": "于都县", "value": "1418" }, { "text": "兴国县", "value": "1419" }, { "text": "会昌县", "value": "1420" }, { "text": "寻乌县", "value": "1421" }, { "text": "石城县", "value": "1422" }, { "text": "瑞金市", "value": "1423" }] }, { "text": "吉安市", "value": "1424", "children": [{ "text": "市辖区", "value": "1425" }, { "text": "吉州区", "value": "1426" }, { "text": "青原区", "value": "1427" }, { "text": "吉安县", "value": "1428" }, { "text": "吉水县", "value": "1429" }, { "text": "峡江县", "value": "1430" }, { "text": "新干县", "value": "1431" }, { "text": "永丰县", "value": "1432" }, { "text": "泰和县", "value": "1433" }, { "text": "遂川县", "value": "1434" }, { "text": "万安县", "value": "1435" }, { "text": "安福县", "value": "1436" }, { "text": "永新县", "value": "1437" }, { "text": "井冈山市", "value": "1438" }] }, { "text": "宜春市", "value": "1439", "children": [{ "text": "市辖区", "value": "1440" }, { "text": "袁州区", "value": "1441" }, { "text": "奉新县", "value": "1442" }, { "text": "万载县", "value": "1443" }, { "text": "上高县", "value": "1444" }, { "text": "宜丰县", "value": "1445" }, { "text": "靖安县", "value": "1446" }, { "text": "铜鼓县", "value": "1447" }, { "text": "丰城市", "value": "1448" }, { "text": "樟树市", "value": "1449" }, { "text": "高安市", "value": "1450" }] }, { "text": "抚州市", "value": "1451", "children": [{ "text": "市辖区", "value": "1452" }, { "text": "临川区", "value": "1453" }, { "text": "南城县", "value": "1454" }, { "text": "黎川县", "value": "1455" }, { "text": "南丰县", "value": "1456" }, { "text": "崇仁县", "value": "1457" }, { "text": "乐安县", "value": "1458" }, { "text": "宜黄县", "value": "1459" }, { "text": "金溪县", "value": "1460" }, { "text": "资溪县", "value": "1461" }, { "text": "东乡县", "value": "1462" }, { "text": "广昌县", "value": "1463" }] }, { "text": "上饶市", "value": "1464", "children": [{ "text": "市辖区", "value": "1465" }, { "text": "信州区", "value": "1466" }, { "text": "广丰区", "value": "1467" }, { "text": "上饶县", "value": "1468" }, { "text": "玉山县", "value": "1469" }, { "text": "铅山县", "value": "1470" }, { "text": "横峰县", "value": "1471" }, { "text": "弋阳县", "value": "1472" }, { "text": "余干县", "value": "1473" }, { "text": "鄱阳县", "value": "1474" }, { "text": "万年县", "value": "1475" }, { "text": "婺源县", "value": "1476" }, { "text": "德兴市", "value": "1477" }] }] }, { "text": "山东省", "value": "1478", "children": [{ "text": "济南市", "value": "1479", "children": [{ "text": "市辖区", "value": "1480" }, { "text": "历下区", "value": "1481" }, { "text": "市中区", "value": "1482" }, { "text": "槐荫区", "value": "1483" }, { "text": "天桥区", "value": "1484" }, { "text": "历城区", "value": "1485" }, { "text": "长清区", "value": "1486" }, { "text": "平阴县", "value": "1487" }, { "text": "济阳县", "value": "1488" }, { "text": "商河县", "value": "1489" }, { "text": "章丘市", "value": "1490" }] }, { "text": "青岛市", "value": "1491", "children": [{ "text": "市辖区", "value": "1492" }, { "text": "市南区", "value": "1493" }, { "text": "市北区", "value": "1494" }, { "text": "黄岛区", "value": "1495" }, { "text": "崂山区", "value": "1496" }, { "text": "李沧区", "value": "1497" }, { "text": "城阳区", "value": "1498" }, { "text": "胶州市", "value": "1499" }, { "text": "即墨市", "value": "1500" }, { "text": "平度市", "value": "1501" }, { "text": "莱西市", "value": "1502" }] }, { "text": "淄博市", "value": "1503", "children": [{ "text": "市辖区", "value": "1504" }, { "text": "淄川区", "value": "1505" }, { "text": "张店区", "value": "1506" }, { "text": "博山区", "value": "1507" }, { "text": "临淄区", "value": "1508" }, { "text": "周村区", "value": "1509" }, { "text": "桓台县", "value": "1510" }, { "text": "高青县", "value": "1511" }, { "text": "沂源县", "value": "1512" }] }, { "text": "枣庄市", "value": "1513", "children": [{ "text": "市辖区", "value": "1514" }, { "text": "市中区", "value": "1515" }, { "text": "薛城区", "value": "1516" }, { "text": "峄城区", "value": "1517" }, { "text": "台儿庄区", "value": "1518" }, { "text": "山亭区", "value": "1519" }, { "text": "滕州市", "value": "1520" }] }, { "text": "东营市", "value": "1521", "children": [{ "text": "市辖区", "value": "1522" }, { "text": "东营区", "value": "1523" }, { "text": "河口区", "value": "1524" }, { "text": "垦利区", "value": "1525" }, { "text": "利津县", "value": "1526" }, { "text": "广饶县", "value": "1527" }] }, { "text": "烟台市", "value": "1528", "children": [{ "text": "市辖区", "value": "1529" }, { "text": "芝罘区", "value": "1530" }, { "text": "福山区", "value": "1531" }, { "text": "牟平区", "value": "1532" }, { "text": "莱山区", "value": "1533" }, { "text": "长岛县", "value": "1534" }, { "text": "龙口市", "value": "1535" }, { "text": "莱阳市", "value": "1536" }, { "text": "莱州市", "value": "1537" }, { "text": "蓬莱市", "value": "1538" }, { "text": "招远市", "value": "1539" }, { "text": "栖霞市", "value": "1540" }, { "text": "海阳市", "value": "1541" }] }, { "text": "潍坊市", "value": "1542", "children": [{ "text": "市辖区", "value": "1543" }, { "text": "潍城区", "value": "1544" }, { "text": "寒亭区", "value": "1545" }, { "text": "坊子区", "value": "1546" }, { "text": "奎文区", "value": "1547" }, { "text": "临朐县", "value": "1548" }, { "text": "昌乐县", "value": "1549" }, { "text": "青州市", "value": "1550" }, { "text": "诸城市", "value": "1551" }, { "text": "寿光市", "value": "1552" }, { "text": "安丘市", "value": "1553" }, { "text": "高密市", "value": "1554" }, { "text": "昌邑市", "value": "1555" }] }, { "text": "济宁市", "value": "1556", "children": [{ "text": "市辖区", "value": "1557" }, { "text": "任城区", "value": "1558" }, { "text": "兖州区", "value": "1559" }, { "text": "微山县", "value": "1560" }, { "text": "鱼台县", "value": "1561" }, { "text": "金乡县", "value": "1562" }, { "text": "嘉祥县", "value": "1563" }, { "text": "汶上县", "value": "1564" }, { "text": "泗水县", "value": "1565" }, { "text": "梁山县", "value": "1566" }, { "text": "曲阜市", "value": "1567" }, { "text": "邹城市", "value": "1568" }] }, { "text": "泰安市", "value": "1569", "children": [{ "text": "市辖区", "value": "1570" }, { "text": "泰山区", "value": "1571" }, { "text": "岱岳区", "value": "1572" }, { "text": "宁阳县", "value": "1573" }, { "text": "东平县", "value": "1574" }, { "text": "新泰市", "value": "1575" }, { "text": "肥城市", "value": "1576" }] }, { "text": "威海市", "value": "1577", "children": [{ "text": "市辖区", "value": "1578" }, { "text": "环翠区", "value": "1579" }, { "text": "文登区", "value": "1580" }, { "text": "荣成市", "value": "1581" }, { "text": "乳山市", "value": "1582" }] }, { "text": "日照市", "value": "1583", "children": [{ "text": "市辖区", "value": "1584" }, { "text": "东港区", "value": "1585" }, { "text": "岚山区", "value": "1586" }, { "text": "五莲县", "value": "1587" }, { "text": "莒县", "value": "1588" }] }, { "text": "莱芜市", "value": "1589", "children": [{ "text": "市辖区", "value": "1590" }, { "text": "莱城区", "value": "1591" }, { "text": "钢城区", "value": "1592" }] }, { "text": "临沂市", "value": "1593", "children": [{ "text": "市辖区", "value": "1594" }, { "text": "兰山区", "value": "1595" }, { "text": "罗庄区", "value": "1596" }, { "text": "河东区", "value": "1597" }, { "text": "沂南县", "value": "1598" }, { "text": "郯城县", "value": "1599" }, { "text": "沂水县", "value": "1600" }, { "text": "兰陵县", "value": "1601" }, { "text": "费县", "value": "1602" }, { "text": "平邑县", "value": "1603" }, { "text": "莒南县", "value": "1604" }, { "text": "蒙阴县", "value": "1605" }, { "text": "临沭县", "value": "1606" }] }, { "text": "德州市", "value": "1607", "children": [{ "text": "市辖区", "value": "1608" }, { "text": "德城区", "value": "1609" }, { "text": "陵城区", "value": "1610" }, { "text": "宁津县", "value": "1611" }, { "text": "庆云县", "value": "1612" }, { "text": "临邑县", "value": "1613" }, { "text": "齐河县", "value": "1614" }, { "text": "平原县", "value": "1615" }, { "text": "夏津县", "value": "1616" }, { "text": "武城县", "value": "1617" }, { "text": "乐陵市", "value": "1618" }, { "text": "禹城市", "value": "1619" }] }, { "text": "聊城市", "value": "1620", "children": [{ "text": "市辖区", "value": "1621" }, { "text": "东昌府区", "value": "1622" }, { "text": "阳谷县", "value": "1623" }, { "text": "莘县", "value": "1624" }, { "text": "茌平县", "value": "1625" }, { "text": "东阿县", "value": "1626" }, { "text": "冠县", "value": "1627" }, { "text": "高唐县", "value": "1628" }, { "text": "临清市", "value": "1629" }] }, { "text": "滨州市", "value": "1630", "children": [{ "text": "市辖区", "value": "1631" }, { "text": "滨城区", "value": "1632" }, { "text": "沾化区", "value": "1633" }, { "text": "惠民县", "value": "1634" }, { "text": "阳信县", "value": "1635" }, { "text": "无棣县", "value": "1636" }, { "text": "博兴县", "value": "1637" }, { "text": "邹平县", "value": "1638" }] }, { "text": "菏泽市", "value": "1639", "children": [{ "text": "市辖区", "value": "1640" }, { "text": "牡丹区", "value": "1641" }, { "text": "定陶区", "value": "1642" }, { "text": "曹县", "value": "1643" }, { "text": "单县", "value": "1644" }, { "text": "成武县", "value": "1645" }, { "text": "巨野县", "value": "1646" }, { "text": "郓城县", "value": "1647" }, { "text": "鄄城县", "value": "1648" }, { "text": "东明县", "value": "1649" }] }] }, { "text": "河南省", "value": "1650", "children": [{ "text": "郑州市", "value": "1651", "children": [{ "text": "市辖区", "value": "1652" }, { "text": "中原区", "value": "1653" }, { "text": "二七区", "value": "1654" }, { "text": "管城回族区", "value": "1655" }, { "text": "金水区", "value": "1656" }, { "text": "上街区", "value": "1657" }, { "text": "惠济区", "value": "1658" }, { "text": "中牟县", "value": "1659" }, { "text": "巩义市", "value": "1660" }, { "text": "荥阳市", "value": "1661" }, { "text": "新密市", "value": "1662" }, { "text": "新郑市", "value": "1663" }, { "text": "登封市", "value": "1664" }] }, { "text": "开封市", "value": "1665", "children": [{ "text": "市辖区", "value": "1666" }, { "text": "龙亭区", "value": "1667" }, { "text": "顺河回族区", "value": "1668" }, { "text": "鼓楼区", "value": "1669" }, { "text": "禹王台区", "value": "1670" }, { "text": "金明区", "value": "1671" }, { "text": "祥符区", "value": "1672" }, { "text": "杞县", "value": "1673" }, { "text": "通许县", "value": "1674" }, { "text": "尉氏县", "value": "1675" }, { "text": "兰考县", "value": "1676" }] }, { "text": "洛阳市", "value": "1677", "children": [{ "text": "市辖区", "value": "1678" }, { "text": "老城区", "value": "1679" }, { "text": "西工区", "value": "1680" }, { "text": "瀍河回族区", "value": "1681" }, { "text": "涧西区", "value": "1682" }, { "text": "吉利区", "value": "1683" }, { "text": "洛龙区", "value": "1684" }, { "text": "孟津县", "value": "1685" }, { "text": "新安县", "value": "1686" }, { "text": "栾川县", "value": "1687" }, { "text": "嵩县", "value": "1688" }, { "text": "汝阳县", "value": "1689" }, { "text": "宜阳县", "value": "1690" }, { "text": "洛宁县", "value": "1691" }, { "text": "伊川县", "value": "1692" }, { "text": "偃师市", "value": "1693" }] }, { "text": "平顶山市", "value": "1694", "children": [{ "text": "市辖区", "value": "1695" }, { "text": "新华区", "value": "1696" }, { "text": "卫东区", "value": "1697" }, { "text": "石龙区", "value": "1698" }, { "text": "湛河区", "value": "1699" }, { "text": "宝丰县", "value": "1700" }, { "text": "叶县", "value": "1701" }, { "text": "鲁山县", "value": "1702" }, { "text": "郏县", "value": "1703" }, { "text": "舞钢市", "value": "1704" }, { "text": "汝州市", "value": "1705" }] }, { "text": "安阳市", "value": "1706", "children": [{ "text": "市辖区", "value": "1707" }, { "text": "文峰区", "value": "1708" }, { "text": "北关区", "value": "1709" }, { "text": "殷都区", "value": "1710" }, { "text": "龙安区", "value": "1711" }, { "text": "安阳县", "value": "1712" }, { "text": "汤阴县", "value": "1713" }, { "text": "滑县", "value": "1714" }, { "text": "内黄县", "value": "1715" }, { "text": "林州市", "value": "1716" }] }, { "text": "鹤壁市", "value": "1717", "children": [{ "text": "市辖区", "value": "1718" }, { "text": "鹤山区", "value": "1719" }, { "text": "山城区", "value": "1720" }, { "text": "淇滨区", "value": "1721" }, { "text": "浚县", "value": "1722" }, { "text": "淇县", "value": "1723" }] }, { "text": "新乡市", "value": "1724", "children": [{ "text": "市辖区", "value": "1725" }, { "text": "红旗区", "value": "1726" }, { "text": "卫滨区", "value": "1727" }, { "text": "凤泉区", "value": "1728" }, { "text": "牧野区", "value": "1729" }, { "text": "新乡县", "value": "1730" }, { "text": "获嘉县", "value": "1731" }, { "text": "原阳县", "value": "1732" }, { "text": "延津县", "value": "1733" }, { "text": "封丘县", "value": "1734" }, { "text": "长垣县", "value": "1735" }, { "text": "卫辉市", "value": "1736" }, { "text": "辉县市", "value": "1737" }] }, { "text": "焦作市", "value": "1738", "children": [{ "text": "市辖区", "value": "1739" }, { "text": "解放区", "value": "1740" }, { "text": "中站区", "value": "1741" }, { "text": "马村区", "value": "1742" }, { "text": "山阳区", "value": "1743" }, { "text": "修武县", "value": "1744" }, { "text": "博爱县", "value": "1745" }, { "text": "武陟县", "value": "1746" }, { "text": "温县", "value": "1747" }, { "text": "沁阳市", "value": "1748" }, { "text": "孟州市", "value": "1749" }] }, { "text": "濮阳市", "value": "1750", "children": [{ "text": "市辖区", "value": "1751" }, { "text": "华龙区", "value": "1752" }, { "text": "清丰县", "value": "1753" }, { "text": "南乐县", "value": "1754" }, { "text": "范县", "value": "1755" }, { "text": "台前县", "value": "1756" }, { "text": "濮阳县", "value": "1757" }] }, { "text": "许昌市", "value": "1758", "children": [{ "text": "市辖区", "value": "1759" }, { "text": "魏都区", "value": "1760" }, { "text": "许昌县", "value": "1761" }, { "text": "鄢陵县", "value": "1762" }, { "text": "襄城县", "value": "1763" }, { "text": "禹州市", "value": "1764" }, { "text": "长葛市", "value": "1765" }] }, { "text": "漯河市", "value": "1766", "children": [{ "text": "市辖区", "value": "1767" }, { "text": "源汇区", "value": "1768" }, { "text": "郾城区", "value": "1769" }, { "text": "召陵区", "value": "1770" }, { "text": "舞阳县", "value": "1771" }, { "text": "临颍县", "value": "1772" }] }, { "text": "三门峡市", "value": "1773", "children": [{ "text": "市辖区", "value": "1774" }, { "text": "湖滨区", "value": "1775" }, { "text": "陕州区", "value": "1776" }, { "text": "渑池县", "value": "1777" }, { "text": "卢氏县", "value": "1778" }, { "text": "义马市", "value": "1779" }, { "text": "灵宝市", "value": "1780" }] }, { "text": "南阳市", "value": "1781", "children": [{ "text": "市辖区", "value": "1782" }, { "text": "宛城区", "value": "1783" }, { "text": "卧龙区", "value": "1784" }, { "text": "南召县", "value": "1785" }, { "text": "方城县", "value": "1786" }, { "text": "西峡县", "value": "1787" }, { "text": "镇平县", "value": "1788" }, { "text": "内乡县", "value": "1789" }, { "text": "淅川县", "value": "1790" }, { "text": "社旗县", "value": "1791" }, { "text": "唐河县", "value": "1792" }, { "text": "新野县", "value": "1793" }, { "text": "桐柏县", "value": "1794" }, { "text": "邓州市", "value": "1795" }] }, { "text": "商丘市", "value": "1796", "children": [{ "text": "市辖区", "value": "1797" }, { "text": "梁园区", "value": "1798" }, { "text": "睢阳区", "value": "1799" }, { "text": "民权县", "value": "1800" }, { "text": "睢县", "value": "1801" }, { "text": "宁陵县", "value": "1802" }, { "text": "柘城县", "value": "1803" }, { "text": "虞城县", "value": "1804" }, { "text": "夏邑县", "value": "1805" }, { "text": "永城市", "value": "1806" }] }, { "text": "信阳市", "value": "1807", "children": [{ "text": "市辖区", "value": "1808" }, { "text": "浉河区", "value": "1809" }, { "text": "平桥区", "value": "1810" }, { "text": "罗山县", "value": "1811" }, { "text": "光山县", "value": "1812" }, { "text": "新县", "value": "1813" }, { "text": "商城县", "value": "1814" }, { "text": "固始县", "value": "1815" }, { "text": "潢川县", "value": "1816" }, { "text": "淮滨县", "value": "1817" }, { "text": "息县", "value": "1818" }] }, { "text": "周口市", "value": "1819", "children": [{ "text": "市辖区", "value": "1820" }, { "text": "川汇区", "value": "1821" }, { "text": "扶沟县", "value": "1822" }, { "text": "西华县", "value": "1823" }, { "text": "商水县", "value": "1824" }, { "text": "沈丘县", "value": "1825" }, { "text": "郸城县", "value": "1826" }, { "text": "淮阳县", "value": "1827" }, { "text": "太康县", "value": "1828" }, { "text": "鹿邑县", "value": "1829" }, { "text": "项城市", "value": "1830" }] }, { "text": "驻马店市", "value": "1831", "children": [{ "text": "市辖区", "value": "1832" }, { "text": "驿城区", "value": "1833" }, { "text": "西平县", "value": "1834" }, { "text": "上蔡县", "value": "1835" }, { "text": "平舆县", "value": "1836" }, { "text": "正阳县", "value": "1837" }, { "text": "确山县", "value": "1838" }, { "text": "泌阳县", "value": "1839" }, { "text": "汝南县", "value": "1840" }, { "text": "遂平县", "value": "1841" }, { "text": "新蔡县", "value": "1842" }] }, { "text": "省直辖县级行政区划", "value": "1843", "children": [{ "text": "济源市", "value": "1844" }] }] }, { "text": "湖北省", "value": "1845", "children": [{ "text": "武汉市", "value": "1846", "children": [{ "text": "市辖区", "value": "1847" }, { "text": "江岸区", "value": "1848" }, { "text": "江汉区", "value": "1849" }, { "text": "硚口区", "value": "1850" }, { "text": "汉阳区", "value": "1851" }, { "text": "武昌区", "value": "1852" }, { "text": "青山区", "value": "1853" }, { "text": "洪山区", "value": "1854" }, { "text": "东西湖区", "value": "1855" }, { "text": "汉南区", "value": "1856" }, { "text": "蔡甸区", "value": "1857" }, { "text": "江夏区", "value": "1858" }, { "text": "黄陂区", "value": "1859" }, { "text": "新洲区", "value": "1860" }] }, { "text": "黄石市", "value": "1861", "children": [{ "text": "市辖区", "value": "1862" }, { "text": "黄石港区", "value": "1863" }, { "text": "西塞山区", "value": "1864" }, { "text": "下陆区", "value": "1865" }, { "text": "铁山区", "value": "1866" }, { "text": "阳新县", "value": "1867" }, { "text": "大冶市", "value": "1868" }] }, { "text": "十堰市", "value": "1869", "children": [{ "text": "市辖区", "value": "1870" }, { "text": "茅箭区", "value": "1871" }, { "text": "张湾区", "value": "1872" }, { "text": "郧阳区", "value": "1873" }, { "text": "郧西县", "value": "1874" }, { "text": "竹山县", "value": "1875" }, { "text": "竹溪县", "value": "1876" }, { "text": "房县", "value": "1877" }, { "text": "丹江口市", "value": "1878" }] }, { "text": "宜昌市", "value": "1879", "children": [{ "text": "市辖区", "value": "1880" }, { "text": "西陵区", "value": "1881" }, { "text": "伍家岗区", "value": "1882" }, { "text": "点军区", "value": "1883" }, { "text": "猇亭区", "value": "1884" }, { "text": "夷陵区", "value": "1885" }, { "text": "远安县", "value": "1886" }, { "text": "兴山县", "value": "1887" }, { "text": "秭归县", "value": "1888" }, { "text": "长阳土家族自治县", "value": "1889" }, { "text": "五峰土家族自治县", "value": "1890" }, { "text": "宜都市", "value": "1891" }, { "text": "当阳市", "value": "1892" }, { "text": "枝江市", "value": "1893" }] }, { "text": "襄阳市", "value": "1894", "children": [{ "text": "市辖区", "value": "1895" }, { "text": "襄城区", "value": "1896" }, { "text": "樊城区", "value": "1897" }, { "text": "襄州区", "value": "1898" }, { "text": "南漳县", "value": "1899" }, { "text": "谷城县", "value": "1900" }, { "text": "保康县", "value": "1901" }, { "text": "老河口市", "value": "1902" }, { "text": "枣阳市", "value": "1903" }, { "text": "宜城市", "value": "1904" }] }, { "text": "鄂州市", "value": "1905", "children": [{ "text": "市辖区", "value": "1906" }, { "text": "梁子湖区", "value": "1907" }, { "text": "华容区", "value": "1908" }, { "text": "鄂城区", "value": "1909" }] }, { "text": "荆门市", "value": "1910", "children": [{ "text": "市辖区", "value": "1911" }, { "text": "东宝区", "value": "1912" }, { "text": "掇刀区", "value": "1913" }, { "text": "京山县", "value": "1914" }, { "text": "沙洋县", "value": "1915" }, { "text": "钟祥市", "value": "1916" }] }, { "text": "孝感市", "value": "1917", "children": [{ "text": "市辖区", "value": "1918" }, { "text": "孝南区", "value": "1919" }, { "text": "孝昌县", "value": "1920" }, { "text": "大悟县", "value": "1921" }, { "text": "云梦县", "value": "1922" }, { "text": "应城市", "value": "1923" }, { "text": "安陆市", "value": "1924" }, { "text": "汉川市", "value": "1925" }] }, { "text": "荆州市", "value": "1926", "children": [{ "text": "市辖区", "value": "1927" }, { "text": "沙市区", "value": "1928" }, { "text": "荆州区", "value": "1929" }, { "text": "公安县", "value": "1930" }, { "text": "监利县", "value": "1931" }, { "text": "江陵县", "value": "1932" }, { "text": "石首市", "value": "1933" }, { "text": "洪湖市", "value": "1934" }, { "text": "松滋市", "value": "1935" }] }, { "text": "黄冈市", "value": "1936", "children": [{ "text": "市辖区", "value": "1937" }, { "text": "黄州区", "value": "1938" }, { "text": "团风县", "value": "1939" }, { "text": "红安县", "value": "1940" }, { "text": "罗田县", "value": "1941" }, { "text": "英山县", "value": "1942" }, { "text": "浠水县", "value": "1943" }, { "text": "蕲春县", "value": "1944" }, { "text": "黄梅县", "value": "1945" }, { "text": "麻城市", "value": "1946" }, { "text": "武穴市", "value": "1947" }] }, { "text": "咸宁市", "value": "1948", "children": [{ "text": "市辖区", "value": "1949" }, { "text": "咸安区", "value": "1950" }, { "text": "嘉鱼县", "value": "1951" }, { "text": "通城县", "value": "1952" }, { "text": "崇阳县", "value": "1953" }, { "text": "通山县", "value": "1954" }, { "text": "赤壁市", "value": "1955" }] }, { "text": "随州市", "value": "1956", "children": [{ "text": "市辖区", "value": "1957" }, { "text": "曾都区", "value": "1958" }, { "text": "随县", "value": "1959" }, { "text": "广水市", "value": "1960" }] }, { "text": "恩施土家族苗族自治州", "value": "1961", "children": [{ "text": "恩施市", "value": "1962" }, { "text": "利川市", "value": "1963" }, { "text": "建始县", "value": "1964" }, { "text": "巴东县", "value": "1965" }, { "text": "宣恩县", "value": "1966" }, { "text": "咸丰县", "value": "1967" }, { "text": "来凤县", "value": "1968" }, { "text": "鹤峰县", "value": "1969" }] }, { "text": "省直辖县级行政区划", "value": "1970", "children": [{ "text": "仙桃市", "value": "1971" }, { "text": "潜江市", "value": "1972" }, { "text": "天门市", "value": "1973" }, { "text": "神农架林区", "value": "1974" }] }] }, { "text": "湖南省", "value": "1975", "children": [{ "text": "长沙市", "value": "1976", "children": [{ "text": "市辖区", "value": "1977" }, { "text": "芙蓉区", "value": "1978" }, { "text": "天心区", "value": "1979" }, { "text": "岳麓区", "value": "1980" }, { "text": "开福区", "value": "1981" }, { "text": "雨花区", "value": "1982" }, { "text": "望城区", "value": "1983" }, { "text": "长沙县", "value": "1984" }, { "text": "宁乡县", "value": "1985" }, { "text": "浏阳市", "value": "1986" }] }, { "text": "株洲市", "value": "1987", "children": [{ "text": "市辖区", "value": "1988" }, { "text": "荷塘区", "value": "1989" }, { "text": "芦淞区", "value": "1990" }, { "text": "石峰区", "value": "1991" }, { "text": "天元区", "value": "1992" }, { "text": "株洲县", "value": "1993" }, { "text": "攸县", "value": "1994" }, { "text": "茶陵县", "value": "1995" }, { "text": "炎陵县", "value": "1996" }, { "text": "醴陵市", "value": "1997" }] }, { "text": "湘潭市", "value": "1998", "children": [{ "text": "市辖区", "value": "1999" }, { "text": "雨湖区", "value": "2000" }, { "text": "岳塘区", "value": "2001" }, { "text": "湘潭县", "value": "2002" }, { "text": "湘乡市", "value": "2003" }, { "text": "韶山市", "value": "2004" }] }, { "text": "衡阳市", "value": "2005", "children": [{ "text": "市辖区", "value": "2006" }, { "text": "珠晖区", "value": "2007" }, { "text": "雁峰区", "value": "2008" }, { "text": "石鼓区", "value": "2009" }, { "text": "蒸湘区", "value": "2010" }, { "text": "南岳区", "value": "2011" }, { "text": "衡阳县", "value": "2012" }, { "text": "衡南县", "value": "2013" }, { "text": "衡山县", "value": "2014" }, { "text": "衡东县", "value": "2015" }, { "text": "祁东县", "value": "2016" }, { "text": "耒阳市", "value": "2017" }, { "text": "常宁市", "value": "2018" }] }, { "text": "邵阳市", "value": "2019", "children": [{ "text": "市辖区", "value": "2020" }, { "text": "双清区", "value": "2021" }, { "text": "大祥区", "value": "2022" }, { "text": "北塔区", "value": "2023" }, { "text": "邵东县", "value": "2024" }, { "text": "新邵县", "value": "2025" }, { "text": "邵阳县", "value": "2026" }, { "text": "隆回县", "value": "2027" }, { "text": "洞口县", "value": "2028" }, { "text": "绥宁县", "value": "2029" }, { "text": "新宁县", "value": "2030" }, { "text": "城步苗族自治县", "value": "2031" }, { "text": "武冈市", "value": "2032" }] }, { "text": "岳阳市", "value": "2033", "children": [{ "text": "市辖区", "value": "2034" }, { "text": "岳阳楼区", "value": "2035" }, { "text": "云溪区", "value": "2036" }, { "text": "君山区", "value": "2037" }, { "text": "岳阳县", "value": "2038" }, { "text": "华容县", "value": "2039" }, { "text": "湘阴县", "value": "2040" }, { "text": "平江县", "value": "2041" }, { "text": "汨罗市", "value": "2042" }, { "text": "临湘市", "value": "2043" }] }, { "text": "常德市", "value": "2044", "children": [{ "text": "市辖区", "value": "2045" }, { "text": "武陵区", "value": "2046" }, { "text": "鼎城区", "value": "2047" }, { "text": "安乡县", "value": "2048" }, { "text": "汉寿县", "value": "2049" }, { "text": "澧县", "value": "2050" }, { "text": "临澧县", "value": "2051" }, { "text": "桃源县", "value": "2052" }, { "text": "石门县", "value": "2053" }, { "text": "津市市", "value": "2054" }] }, { "text": "张家界市", "value": "2055", "children": [{ "text": "市辖区", "value": "2056" }, { "text": "永定区", "value": "2057" }, { "text": "武陵源区", "value": "2058" }, { "text": "慈利县", "value": "2059" }, { "text": "桑植县", "value": "2060" }] }, { "text": "益阳市", "value": "2061", "children": [{ "text": "市辖区", "value": "2062" }, { "text": "资阳区", "value": "2063" }, { "text": "赫山区", "value": "2064" }, { "text": "南县", "value": "2065" }, { "text": "桃江县", "value": "2066" }, { "text": "安化县", "value": "2067" }, { "text": "沅江市", "value": "2068" }] }, { "text": "郴州市", "value": "2069", "children": [{ "text": "市辖区", "value": "2070" }, { "text": "北湖区", "value": "2071" }, { "text": "苏仙区", "value": "2072" }, { "text": "桂阳县", "value": "2073" }, { "text": "宜章县", "value": "2074" }, { "text": "永兴县", "value": "2075" }, { "text": "嘉禾县", "value": "2076" }, { "text": "临武县", "value": "2077" }, { "text": "汝城县", "value": "2078" }, { "text": "桂东县", "value": "2079" }, { "text": "安仁县", "value": "2080" }, { "text": "资兴市", "value": "2081" }] }, { "text": "永州市", "value": "2082", "children": [{ "text": "市辖区", "value": "2083" }, { "text": "零陵区", "value": "2084" }, { "text": "冷水滩区", "value": "2085" }, { "text": "祁阳县", "value": "2086" }, { "text": "东安县", "value": "2087" }, { "text": "双牌县", "value": "2088" }, { "text": "道县", "value": "2089" }, { "text": "江永县", "value": "2090" }, { "text": "宁远县", "value": "2091" }, { "text": "蓝山县", "value": "2092" }, { "text": "新田县", "value": "2093" }, { "text": "江华瑶族自治县", "value": "2094" }] }, { "text": "怀化市", "value": "2095", "children": [{ "text": "市辖区", "value": "2096" }, { "text": "鹤城区", "value": "2097" }, { "text": "中方县", "value": "2098" }, { "text": "沅陵县", "value": "2099" }, { "text": "辰溪县", "value": "2100" }, { "text": "溆浦县", "value": "2101" }, { "text": "会同县", "value": "2102" }, { "text": "麻阳苗族自治县", "value": "2103" }, { "text": "新晃侗族自治县", "value": "2104" }, { "text": "芷江侗族自治县", "value": "2105" }, { "text": "靖州苗族侗族自治县", "value": "2106" }, { "text": "通道侗族自治县", "value": "2107" }, { "text": "洪江市", "value": "2108" }] }, { "text": "娄底市", "value": "2109", "children": [{ "text": "市辖区", "value": "2110" }, { "text": "娄星区", "value": "2111" }, { "text": "双峰县", "value": "2112" }, { "text": "新化县", "value": "2113" }, { "text": "冷水江市", "value": "2114" }, { "text": "涟源市", "value": "2115" }] }, { "text": "湘西土家族苗族自治州", "value": "2116", "children": [{ "text": "吉首市", "value": "2117" }, { "text": "泸溪县", "value": "2118" }, { "text": "凤凰县", "value": "2119" }, { "text": "花垣县", "value": "2120" }, { "text": "保靖县", "value": "2121" }, { "text": "古丈县", "value": "2122" }, { "text": "永顺县", "value": "2123" }, { "text": "龙山县", "value": "2124" }] }] }, { "text": "广东省", "value": "2125", "children": [{ "text": "广州市", "value": "2126", "children": [{ "text": "市辖区", "value": "2127" }, { "text": "荔湾区", "value": "2128" }, { "text": "越秀区", "value": "2129" }, { "text": "海珠区", "value": "2130" }, { "text": "天河区", "value": "2131" }, { "text": "白云区", "value": "2132" }, { "text": "黄埔区", "value": "2133" }, { "text": "番禺区", "value": "2134" }, { "text": "花都区", "value": "2135" }, { "text": "南沙区", "value": "2136" }, { "text": "从化区", "value": "2137" }, { "text": "增城区", "value": "2138" }] }, { "text": "韶关市", "value": "2139", "children": [{ "text": "市辖区", "value": "2140" }, { "text": "武江区", "value": "2141" }, { "text": "浈江区", "value": "2142" }, { "text": "曲江区", "value": "2143" }, { "text": "始兴县", "value": "2144" }, { "text": "仁化县", "value": "2145" }, { "text": "翁源县", "value": "2146" }, { "text": "乳源瑶族自治县", "value": "2147" }, { "text": "新丰县", "value": "2148" }, { "text": "乐昌市", "value": "2149" }, { "text": "南雄市", "value": "2150" }] }, { "text": "深圳市", "value": "2151", "children": [{ "text": "市辖区", "value": "2152" }, { "text": "罗湖区", "value": "2153" }, { "text": "福田区", "value": "2154" }, { "text": "南山区", "value": "2155" }, { "text": "宝安区", "value": "2156" }, { "text": "龙岗区", "value": "2157" }, { "text": "盐田区", "value": "2158" }] }, { "text": "珠海市", "value": "2159", "children": [{ "text": "市辖区", "value": "2160" }, { "text": "香洲区", "value": "2161" }, { "text": "斗门区", "value": "2162" }, { "text": "金湾区", "value": "2163" }] }, { "text": "汕头市", "value": "2164", "children": [{ "text": "市辖区", "value": "2165" }, { "text": "龙湖区", "value": "2166" }, { "text": "金平区", "value": "2167" }, { "text": "濠江区", "value": "2168" }, { "text": "潮阳区", "value": "2169" }, { "text": "潮南区", "value": "2170" }, { "text": "澄海区", "value": "2171" }, { "text": "南澳县", "value": "2172" }] }, { "text": "佛山市", "value": "2173", "children": [{ "text": "市辖区", "value": "2174" }, { "text": "禅城区", "value": "2175" }, { "text": "南海区", "value": "2176" }, { "text": "顺德区", "value": "2177" }, { "text": "三水区", "value": "2178" }, { "text": "高明区", "value": "2179" }] }, { "text": "江门市", "value": "2180", "children": [{ "text": "市辖区", "value": "2181" }, { "text": "蓬江区", "value": "2182" }, { "text": "江海区", "value": "2183" }, { "text": "新会区", "value": "2184" }, { "text": "台山市", "value": "2185" }, { "text": "开平市", "value": "2186" }, { "text": "鹤山市", "value": "2187" }, { "text": "恩平市", "value": "2188" }] }, { "text": "湛江市", "value": "2189", "children": [{ "text": "市辖区", "value": "2190" }, { "text": "赤坎区", "value": "2191" }, { "text": "霞山区", "value": "2192" }, { "text": "坡头区", "value": "2193" }, { "text": "麻章区", "value": "2194" }, { "text": "遂溪县", "value": "2195" }, { "text": "徐闻县", "value": "2196" }, { "text": "廉江市", "value": "2197" }, { "text": "雷州市", "value": "2198" }, { "text": "吴川市", "value": "2199" }] }, { "text": "茂名市", "value": "2200", "children": [{ "text": "市辖区", "value": "2201" }, { "text": "茂南区", "value": "2202" }, { "text": "电白区", "value": "2203" }, { "text": "高州市", "value": "2204" }, { "text": "化州市", "value": "2205" }, { "text": "信宜市", "value": "2206" }] }, { "text": "肇庆市", "value": "2207", "children": [{ "text": "市辖区", "value": "2208" }, { "text": "端州区", "value": "2209" }, { "text": "鼎湖区", "value": "2210" }, { "text": "高要区", "value": "2211" }, { "text": "广宁县", "value": "2212" }, { "text": "怀集县", "value": "2213" }, { "text": "封开县", "value": "2214" }, { "text": "德庆县", "value": "2215" }, { "text": "四会市", "value": "2216" }] }, { "text": "惠州市", "value": "2217", "children": [{ "text": "市辖区", "value": "2218" }, { "text": "惠城区", "value": "2219" }, { "text": "惠阳区", "value": "2220" }, { "text": "博罗县", "value": "2221" }, { "text": "惠东县", "value": "2222" }, { "text": "龙门县", "value": "2223" }] }, { "text": "梅州市", "value": "2224", "children": [{ "text": "市辖区", "value": "2225" }, { "text": "梅江区", "value": "2226" }, { "text": "梅县区", "value": "2227" }, { "text": "大埔县", "value": "2228" }, { "text": "丰顺县", "value": "2229" }, { "text": "五华县", "value": "2230" }, { "text": "平远县", "value": "2231" }, { "text": "蕉岭县", "value": "2232" }, { "text": "兴宁市", "value": "2233" }] }, { "text": "汕尾市", "value": "2234", "children": [{ "text": "市辖区", "value": "2235" }, { "text": "城区", "value": "2236" }, { "text": "海丰县", "value": "2237" }, { "text": "陆河县", "value": "2238" }, { "text": "陆丰市", "value": "2239" }] }, { "text": "河源市", "value": "2240", "children": [{ "text": "市辖区", "value": "2241" }, { "text": "源城区", "value": "2242" }, { "text": "紫金县", "value": "2243" }, { "text": "龙川县", "value": "2244" }, { "text": "连平县", "value": "2245" }, { "text": "和平县", "value": "2246" }, { "text": "东源县", "value": "2247" }] }, { "text": "阳江市", "value": "2248", "children": [{ "text": "市辖区", "value": "2249" }, { "text": "江城区", "value": "2250" }, { "text": "阳东区", "value": "2251" }, { "text": "阳西县", "value": "2252" }, { "text": "阳春市", "value": "2253" }] }, { "text": "清远市", "value": "2254", "children": [{ "text": "市辖区", "value": "2255" }, { "text": "清城区", "value": "2256" }, { "text": "清新区", "value": "2257" }, { "text": "佛冈县", "value": "2258" }, { "text": "阳山县", "value": "2259" }, { "text": "连山壮族瑶族自治县", "value": "2260" }, { "text": "连南瑶族自治县", "value": "2261" }, { "text": "英德市", "value": "2262" }, { "text": "连州市", "value": "2263" }] }, { "text": "东莞市", "value": "2264", "children": [] }, { "text": "中山市", "value": "2265", "children": [] }, { "text": "潮州市", "value": "2266", "children": [{ "text": "市辖区", "value": "2267" }, { "text": "湘桥区", "value": "2268" }, { "text": "潮安区", "value": "2269" }, { "text": "饶平县", "value": "2270" }] }, { "text": "揭阳市", "value": "2271", "children": [{ "text": "市辖区", "value": "2272" }, { "text": "榕城区", "value": "2273" }, { "text": "揭东区", "value": "2274" }, { "text": "揭西县", "value": "2275" }, { "text": "惠来县", "value": "2276" }, { "text": "普宁市", "value": "2277" }] }, { "text": "云浮市", "value": "2278", "children": [{ "text": "市辖区", "value": "2279" }, { "text": "云城区", "value": "2280" }, { "text": "云安区", "value": "2281" }, { "text": "新兴县", "value": "2282" }, { "text": "郁南县", "value": "2283" }, { "text": "罗定市", "value": "2284" }] }] }, { "text": "广西壮族自治区", "value": "2285", "children": [{ "text": "南宁市", "value": "2286", "children": [{ "text": "市辖区", "value": "2287" }, { "text": "兴宁区", "value": "2288" }, { "text": "青秀区", "value": "2289" }, { "text": "江南区", "value": "2290" }, { "text": "西乡塘区", "value": "2291" }, { "text": "良庆区", "value": "2292" }, { "text": "邕宁区", "value": "2293" }, { "text": "武鸣区", "value": "2294" }, { "text": "隆安县", "value": "2295" }, { "text": "马山县", "value": "2296" }, { "text": "上林县", "value": "2297" }, { "text": "宾阳县", "value": "2298" }, { "text": "横县", "value": "2299" }] }, { "text": "柳州市", "value": "2300", "children": [{ "text": "市辖区", "value": "2301" }, { "text": "城中区", "value": "2302" }, { "text": "鱼峰区", "value": "2303" }, { "text": "柳南区", "value": "2304" }, { "text": "柳北区", "value": "2305" }, { "text": "柳江区", "value": "2306" }, { "text": "柳城县", "value": "2307" }, { "text": "鹿寨县", "value": "2308" }, { "text": "融安县", "value": "2309" }, { "text": "融水苗族自治县", "value": "2310" }, { "text": "三江侗族自治县", "value": "2311" }] }, { "text": "桂林市", "value": "2312", "children": [{ "text": "市辖区", "value": "2313" }, { "text": "秀峰区", "value": "2314" }, { "text": "叠彩区", "value": "2315" }, { "text": "象山区", "value": "2316" }, { "text": "七星区", "value": "2317" }, { "text": "雁山区", "value": "2318" }, { "text": "临桂区", "value": "2319" }, { "text": "阳朔县", "value": "2320" }, { "text": "灵川县", "value": "2321" }, { "text": "全州县", "value": "2322" }, { "text": "兴安县", "value": "2323" }, { "text": "永福县", "value": "2324" }, { "text": "灌阳县", "value": "2325" }, { "text": "龙胜各族自治县", "value": "2326" }, { "text": "资源县", "value": "2327" }, { "text": "平乐县", "value": "2328" }, { "text": "荔浦县", "value": "2329" }, { "text": "恭城瑶族自治县", "value": "2330" }] }, { "text": "梧州市", "value": "2331", "children": [{ "text": "市辖区", "value": "2332" }, { "text": "万秀区", "value": "2333" }, { "text": "长洲区", "value": "2334" }, { "text": "龙圩区", "value": "2335" }, { "text": "苍梧县", "value": "2336" }, { "text": "藤县", "value": "2337" }, { "text": "蒙山县", "value": "2338" }, { "text": "岑溪市", "value": "2339" }] }, { "text": "北海市", "value": "2340", "children": [{ "text": "市辖区", "value": "2341" }, { "text": "海城区", "value": "2342" }, { "text": "银海区", "value": "2343" }, { "text": "铁山港区", "value": "2344" }, { "text": "合浦县", "value": "2345" }] }, { "text": "防城港市", "value": "2346", "children": [{ "text": "市辖区", "value": "2347" }, { "text": "港口区", "value": "2348" }, { "text": "防城区", "value": "2349" }, { "text": "上思县", "value": "2350" }, { "text": "东兴市", "value": "2351" }] }, { "text": "钦州市", "value": "2352", "children": [{ "text": "市辖区", "value": "2353" }, { "text": "钦南区", "value": "2354" }, { "text": "钦北区", "value": "2355" }, { "text": "灵山县", "value": "2356" }, { "text": "浦北县", "value": "2357" }] }, { "text": "贵港市", "value": "2358", "children": [{ "text": "市辖区", "value": "2359" }, { "text": "港北区", "value": "2360" }, { "text": "港南区", "value": "2361" }, { "text": "覃塘区", "value": "2362" }, { "text": "平南县", "value": "2363" }, { "text": "桂平市", "value": "2364" }] }, { "text": "玉林市", "value": "2365", "children": [{ "text": "市辖区", "value": "2366" }, { "text": "玉州区", "value": "2367" }, { "text": "福绵区", "value": "2368" }, { "text": "容县", "value": "2369" }, { "text": "陆川县", "value": "2370" }, { "text": "博白县", "value": "2371" }, { "text": "兴业县", "value": "2372" }, { "text": "北流市", "value": "2373" }] }, { "text": "百色市", "value": "2374", "children": [{ "text": "市辖区", "value": "2375" }, { "text": "右江区", "value": "2376" }, { "text": "田阳县", "value": "2377" }, { "text": "田东县", "value": "2378" }, { "text": "平果县", "value": "2379" }, { "text": "德保县", "value": "2380" }, { "text": "那坡县", "value": "2381" }, { "text": "凌云县", "value": "2382" }, { "text": "乐业县", "value": "2383" }, { "text": "田林县", "value": "2384" }, { "text": "西林县", "value": "2385" }, { "text": "隆林各族自治县", "value": "2386" }, { "text": "靖西市", "value": "2387" }] }, { "text": "贺州市", "value": "2388", "children": [{ "text": "市辖区", "value": "2389" }, { "text": "八步区", "value": "2390" }, { "text": "平桂区", "value": "2391" }, { "text": "昭平县", "value": "2392" }, { "text": "钟山县", "value": "2393" }, { "text": "富川瑶族自治县", "value": "2394" }] }, { "text": "河池市", "value": "2395", "children": [{ "text": "市辖区", "value": "2396" }, { "text": "金城江区", "value": "2397" }, { "text": "南丹县", "value": "2398" }, { "text": "天峨县", "value": "2399" }, { "text": "凤山县", "value": "2400" }, { "text": "东兰县", "value": "2401" }, { "text": "罗城仫佬族自治县", "value": "2402" }, { "text": "环江毛南族自治县", "value": "2403" }, { "text": "巴马瑶族自治县", "value": "2404" }, { "text": "都安瑶族自治县", "value": "2405" }, { "text": "大化瑶族自治县", "value": "2406" }, { "text": "宜州市", "value": "2407" }] }, { "text": "来宾市", "value": "2408", "children": [{ "text": "市辖区", "value": "2409" }, { "text": "兴宾区", "value": "2410" }, { "text": "忻城县", "value": "2411" }, { "text": "象州县", "value": "2412" }, { "text": "武宣县", "value": "2413" }, { "text": "金秀瑶族自治县", "value": "2414" }, { "text": "合山市", "value": "2415" }] }, { "text": "崇左市", "value": "2416", "children": [{ "text": "市辖区", "value": "2417" }, { "text": "江州区", "value": "2418" }, { "text": "扶绥县", "value": "2419" }, { "text": "宁明县", "value": "2420" }, { "text": "龙州县", "value": "2421" }, { "text": "大新县", "value": "2422" }, { "text": "天等县", "value": "2423" }, { "text": "凭祥市", "value": "2424" }] }] }, { "text": "海南省", "value": "2425", "children": [{ "text": "海口市", "value": "2426", "children": [{ "text": "市辖区", "value": "2427" }, { "text": "秀英区", "value": "2428" }, { "text": "龙华区", "value": "2429" }, { "text": "琼山区", "value": "2430" }, { "text": "美兰区", "value": "2431" }] }, { "text": "三亚市", "value": "2432", "children": [{ "text": "市辖区", "value": "2433" }, { "text": "海棠区", "value": "2434" }, { "text": "吉阳区", "value": "2435" }, { "text": "天涯区", "value": "2436" }, { "text": "崖州区", "value": "2437" }] }, { "text": "三沙市", "value": "2438", "children": [] }, { "text": "儋州市", "value": "2439", "children": [] }, { "text": "省直辖县级行政区划", "value": "2440", "children": [{ "text": "五指山市", "value": "2441" }, { "text": "琼海市", "value": "2442" }, { "text": "文昌市", "value": "2443" }, { "text": "万宁市", "value": "2444" }, { "text": "东方市", "value": "2445" }, { "text": "定安县", "value": "2446" }, { "text": "屯昌县", "value": "2447" }, { "text": "澄迈县", "value": "2448" }, { "text": "临高县", "value": "2449" }, { "text": "白沙黎族自治县", "value": "2450" }, { "text": "昌江黎族自治县", "value": "2451" }, { "text": "乐东黎族自治县", "value": "2452" }, { "text": "陵水黎族自治县", "value": "2453" }, { "text": "保亭黎族苗族自治县", "value": "2454" }, { "text": "琼中黎族苗族自治县", "value": "2455" }] }] }, { "text": "重庆市", "value": "2456", "children": [{ "text": "市辖区", "value": "2457", "children": [{ "text": "万州区", "value": "2458" }, { "text": "涪陵区", "value": "2459" }, { "text": "渝中区", "value": "2460" }, { "text": "大渡口区", "value": "2461" }, { "text": "江北区", "value": "2462" }, { "text": "沙坪坝区", "value": "2463" }, { "text": "九龙坡区", "value": "2464" }, { "text": "南岸区", "value": "2465" }, { "text": "北碚区", "value": "2466" }, { "text": "綦江区", "value": "2467" }, { "text": "大足区", "value": "2468" }, { "text": "渝北区", "value": "2469" }, { "text": "巴南区", "value": "2470" }, { "text": "黔江区", "value": "2471" }, { "text": "长寿区", "value": "2472" }, { "text": "江津区", "value": "2473" }, { "text": "合川区", "value": "2474" }, { "text": "永川区", "value": "2475" }, { "text": "南川区", "value": "2476" }, { "text": "璧山区", "value": "2477" }, { "text": "铜梁区", "value": "2478" }, { "text": "潼南区", "value": "2479" }, { "text": "荣昌区", "value": "2480" }, { "text": "开州区", "value": "2481" }] }, { "text": "县", "value": "2482", "children": [{ "text": "梁平县", "value": "2483" }, { "text": "城口县", "value": "2484" }, { "text": "丰都县", "value": "2485" }, { "text": "垫江县", "value": "2486" }, { "text": "武隆县", "value": "2487" }, { "text": "忠县", "value": "2488" }, { "text": "云阳县", "value": "2489" }, { "text": "奉节县", "value": "2490" }, { "text": "巫山县", "value": "2491" }, { "text": "巫溪县", "value": "2492" }, { "text": "石柱土家族自治县", "value": "2493" }, { "text": "秀山土家族苗族自治县", "value": "2494" }, { "text": "酉阳土家族苗族自治县", "value": "2495" }, { "text": "彭水苗族土家族自治县", "value": "2496" }] }] }, { "text": "四川省", "value": "2497", "children": [{ "text": "成都市", "value": "2498", "children": [{ "text": "市辖区", "value": "2499" }, { "text": "锦江区", "value": "2500" }, { "text": "青羊区", "value": "2501" }, { "text": "金牛区", "value": "2502" }, { "text": "武侯区", "value": "2503" }, { "text": "成华区", "value": "2504" }, { "text": "龙泉驿区", "value": "2505" }, { "text": "青白江区", "value": "2506" }, { "text": "新都区", "value": "2507" }, { "text": "温江区", "value": "2508" }, { "text": "双流区", "value": "2509" }, { "text": "金堂县", "value": "2510" }, { "text": "郫县", "value": "2511" }, { "text": "大邑县", "value": "2512" }, { "text": "蒲江县", "value": "2513" }, { "text": "新津县", "value": "2514" }, { "text": "都江堰市", "value": "2515" }, { "text": "彭州市", "value": "2516" }, { "text": "邛崃市", "value": "2517" }, { "text": "崇州市", "value": "2518" }, { "text": "简阳市", "value": "2519" }] }, { "text": "自贡市", "value": "2520", "children": [{ "text": "市辖区", "value": "2521" }, { "text": "自流井区", "value": "2522" }, { "text": "贡井区", "value": "2523" }, { "text": "大安区", "value": "2524" }, { "text": "沿滩区", "value": "2525" }, { "text": "荣县", "value": "2526" }, { "text": "富顺县", "value": "2527" }] }, { "text": "攀枝花市", "value": "2528", "children": [{ "text": "市辖区", "value": "2529" }, { "text": "东区", "value": "2530" }, { "text": "西区", "value": "2531" }, { "text": "仁和区", "value": "2532" }, { "text": "米易县", "value": "2533" }, { "text": "盐边县", "value": "2534" }] }, { "text": "泸州市", "value": "2535", "children": [{ "text": "市辖区", "value": "2536" }, { "text": "江阳区", "value": "2537" }, { "text": "纳溪区", "value": "2538" }, { "text": "龙马潭区", "value": "2539" }, { "text": "泸县", "value": "2540" }, { "text": "合江县", "value": "2541" }, { "text": "叙永县", "value": "2542" }, { "text": "古蔺县", "value": "2543" }] }, { "text": "德阳市", "value": "2544", "children": [{ "text": "市辖区", "value": "2545" }, { "text": "旌阳区", "value": "2546" }, { "text": "中江县", "value": "2547" }, { "text": "罗江县", "value": "2548" }, { "text": "广汉市", "value": "2549" }, { "text": "什邡市", "value": "2550" }, { "text": "绵竹市", "value": "2551" }] }, { "text": "绵阳市", "value": "2552", "children": [{ "text": "市辖区", "value": "2553" }, { "text": "涪城区", "value": "2554" }, { "text": "游仙区", "value": "2555" }, { "text": "安州区", "value": "2556" }, { "text": "三台县", "value": "2557" }, { "text": "盐亭县", "value": "2558" }, { "text": "梓潼县", "value": "2559" }, { "text": "北川羌族自治县", "value": "2560" }, { "text": "平武县", "value": "2561" }, { "text": "江油市", "value": "2562" }] }, { "text": "广元市", "value": "2563", "children": [{ "text": "市辖区", "value": "2564" }, { "text": "利州区", "value": "2565" }, { "text": "昭化区", "value": "2566" }, { "text": "朝天区", "value": "2567" }, { "text": "旺苍县", "value": "2568" }, { "text": "青川县", "value": "2569" }, { "text": "剑阁县", "value": "2570" }, { "text": "苍溪县", "value": "2571" }] }, { "text": "遂宁市", "value": "2572", "children": [{ "text": "市辖区", "value": "2573" }, { "text": "船山区", "value": "2574" }, { "text": "安居区", "value": "2575" }, { "text": "蓬溪县", "value": "2576" }, { "text": "射洪县", "value": "2577" }, { "text": "大英县", "value": "2578" }] }, { "text": "内江市", "value": "2579", "children": [{ "text": "市辖区", "value": "2580" }, { "text": "市中区", "value": "2581" }, { "text": "东兴区", "value": "2582" }, { "text": "威远县", "value": "2583" }, { "text": "资中县", "value": "2584" }, { "text": "隆昌县", "value": "2585" }] }, { "text": "乐山市", "value": "2586", "children": [{ "text": "市辖区", "value": "2587" }, { "text": "市中区", "value": "2588" }, { "text": "沙湾区", "value": "2589" }, { "text": "五通桥区", "value": "2590" }, { "text": "金口河区", "value": "2591" }, { "text": "犍为县", "value": "2592" }, { "text": "井研县", "value": "2593" }, { "text": "夹江县", "value": "2594" }, { "text": "沐川县", "value": "2595" }, { "text": "峨边彝族自治县", "value": "2596" }, { "text": "马边彝族自治县", "value": "2597" }, { "text": "峨眉山市", "value": "2598" }] }, { "text": "南充市", "value": "2599", "children": [{ "text": "市辖区", "value": "2600" }, { "text": "顺庆区", "value": "2601" }, { "text": "高坪区", "value": "2602" }, { "text": "嘉陵区", "value": "2603" }, { "text": "南部县", "value": "2604" }, { "text": "营山县", "value": "2605" }, { "text": "蓬安县", "value": "2606" }, { "text": "仪陇县", "value": "2607" }, { "text": "西充县", "value": "2608" }, { "text": "阆中市", "value": "2609" }] }, { "text": "眉山市", "value": "2610", "children": [{ "text": "市辖区", "value": "2611" }, { "text": "东坡区", "value": "2612" }, { "text": "彭山区", "value": "2613" }, { "text": "仁寿县", "value": "2614" }, { "text": "洪雅县", "value": "2615" }, { "text": "丹棱县", "value": "2616" }, { "text": "青神县", "value": "2617" }] }, { "text": "宜宾市", "value": "2618", "children": [{ "text": "市辖区", "value": "2619" }, { "text": "翠屏区", "value": "2620" }, { "text": "南溪区", "value": "2621" }, { "text": "宜宾县", "value": "2622" }, { "text": "江安县", "value": "2623" }, { "text": "长宁县", "value": "2624" }, { "text": "高县", "value": "2625" }, { "text": "珙县", "value": "2626" }, { "text": "筠连县", "value": "2627" }, { "text": "兴文县", "value": "2628" }, { "text": "屏山县", "value": "2629" }] }, { "text": "广安市", "value": "2630", "children": [{ "text": "市辖区", "value": "2631" }, { "text": "广安区", "value": "2632" }, { "text": "前锋区", "value": "2633" }, { "text": "岳池县", "value": "2634" }, { "text": "武胜县", "value": "2635" }, { "text": "邻水县", "value": "2636" }, { "text": "华蓥市", "value": "2637" }] }, { "text": "达州市", "value": "2638", "children": [{ "text": "市辖区", "value": "2639" }, { "text": "通川区", "value": "2640" }, { "text": "达川区", "value": "2641" }, { "text": "宣汉县", "value": "2642" }, { "text": "开江县", "value": "2643" }, { "text": "大竹县", "value": "2644" }, { "text": "渠县", "value": "2645" }, { "text": "万源市", "value": "2646" }] }, { "text": "雅安市", "value": "2647", "children": [{ "text": "市辖区", "value": "2648" }, { "text": "雨城区", "value": "2649" }, { "text": "名山区", "value": "2650" }, { "text": "荥经县", "value": "2651" }, { "text": "汉源县", "value": "2652" }, { "text": "石棉县", "value": "2653" }, { "text": "天全县", "value": "2654" }, { "text": "芦山县", "value": "2655" }, { "text": "宝兴县", "value": "2656" }] }, { "text": "巴中市", "value": "2657", "children": [{ "text": "市辖区", "value": "2658" }, { "text": "巴州区", "value": "2659" }, { "text": "恩阳区", "value": "2660" }, { "text": "通江县", "value": "2661" }, { "text": "南江县", "value": "2662" }, { "text": "平昌县", "value": "2663" }] }, { "text": "资阳市", "value": "2664", "children": [{ "text": "市辖区", "value": "2665" }, { "text": "雁江区", "value": "2666" }, { "text": "安岳县", "value": "2667" }, { "text": "乐至县", "value": "2668" }] }, { "text": "阿坝藏族羌族自治州", "value": "2669", "children": [{ "text": "马尔康市", "value": "2670" }, { "text": "汶川县", "value": "2671" }, { "text": "理县", "value": "2672" }, { "text": "茂县", "value": "2673" }, { "text": "松潘县", "value": "2674" }, { "text": "九寨沟县", "value": "2675" }, { "text": "金川县", "value": "2676" }, { "text": "小金县", "value": "2677" }, { "text": "黑水县", "value": "2678" }, { "text": "壤塘县", "value": "2679" }, { "text": "阿坝县", "value": "2680" }, { "text": "若尔盖县", "value": "2681" }, { "text": "红原县", "value": "2682" }] }, { "text": "甘孜藏族自治州", "value": "2683", "children": [{ "text": "康定市", "value": "2684" }, { "text": "泸定县", "value": "2685" }, { "text": "丹巴县", "value": "2686" }, { "text": "九龙县", "value": "2687" }, { "text": "雅江县", "value": "2688" }, { "text": "道孚县", "value": "2689" }, { "text": "炉霍县", "value": "2690" }, { "text": "甘孜县", "value": "2691" }, { "text": "新龙县", "value": "2692" }, { "text": "德格县", "value": "2693" }, { "text": "白玉县", "value": "2694" }, { "text": "石渠县", "value": "2695" }, { "text": "色达县", "value": "2696" }, { "text": "理塘县", "value": "2697" }, { "text": "巴塘县", "value": "2698" }, { "text": "乡城县", "value": "2699" }, { "text": "稻城县", "value": "2700" }, { "text": "得荣县", "value": "2701" }] }, { "text": "凉山彝族自治州", "value": "2702", "children": [{ "text": "西昌市", "value": "2703" }, { "text": "木里藏族自治县", "value": "2704" }, { "text": "盐源县", "value": "2705" }, { "text": "德昌县", "value": "2706" }, { "text": "会理县", "value": "2707" }, { "text": "会东县", "value": "2708" }, { "text": "宁南县", "value": "2709" }, { "text": "普格县", "value": "2710" }, { "text": "布拖县", "value": "2711" }, { "text": "金阳县", "value": "2712" }, { "text": "昭觉县", "value": "2713" }, { "text": "喜德县", "value": "2714" }, { "text": "冕宁县", "value": "2715" }, { "text": "越西县", "value": "2716" }, { "text": "甘洛县", "value": "2717" }, { "text": "美姑县", "value": "2718" }, { "text": "雷波县", "value": "2719" }] }] }, { "text": "贵州省", "value": "2720", "children": [{ "text": "贵阳市", "value": "2721", "children": [{ "text": "市辖区", "value": "2722" }, { "text": "南明区", "value": "2723" }, { "text": "云岩区", "value": "2724" }, { "text": "花溪区", "value": "2725" }, { "text": "乌当区", "value": "2726" }, { "text": "白云区", "value": "2727" }, { "text": "观山湖区", "value": "2728" }, { "text": "开阳县", "value": "2729" }, { "text": "息烽县", "value": "2730" }, { "text": "修文县", "value": "2731" }, { "text": "清镇市", "value": "2732" }] }, { "text": "六盘水市", "value": "2733", "children": [{ "text": "钟山区", "value": "2734" }, { "text": "六枝特区", "value": "2735" }, { "text": "水城县", "value": "2736" }, { "text": "盘县", "value": "2737" }] }, { "text": "遵义市", "value": "2738", "children": [{ "text": "市辖区", "value": "2739" }, { "text": "红花岗区", "value": "2740" }, { "text": "汇川区", "value": "2741" }, { "text": "播州区", "value": "2742" }, { "text": "桐梓县", "value": "2743" }, { "text": "绥阳县", "value": "2744" }, { "text": "正安县", "value": "2745" }, { "text": "道真仡佬族苗族自治县", "value": "2746" }, { "text": "务川仡佬族苗族自治县", "value": "2747" }, { "text": "凤冈县", "value": "2748" }, { "text": "湄潭县", "value": "2749" }, { "text": "余庆县", "value": "2750" }, { "text": "习水县", "value": "2751" }, { "text": "赤水市", "value": "2752" }, { "text": "仁怀市", "value": "2753" }] }, { "text": "安顺市", "value": "2754", "children": [{ "text": "市辖区", "value": "2755" }, { "text": "西秀区", "value": "2756" }, { "text": "平坝区", "value": "2757" }, { "text": "普定县", "value": "2758" }, { "text": "镇宁布依族苗族自治县", "value": "2759" }, { "text": "关岭布依族苗族自治县", "value": "2760" }, { "text": "紫云苗族布依族自治县", "value": "2761" }] }, { "text": "毕节市", "value": "2762", "children": [{ "text": "市辖区", "value": "2763" }, { "text": "七星关区", "value": "2764" }, { "text": "大方县", "value": "2765" }, { "text": "黔西县", "value": "2766" }, { "text": "金沙县", "value": "2767" }, { "text": "织金县", "value": "2768" }, { "text": "纳雍县", "value": "2769" }, { "text": "威宁彝族回族苗族自治县", "value": "2770" }, { "text": "赫章县", "value": "2771" }] }, { "text": "铜仁市", "value": "2772", "children": [{ "text": "市辖区", "value": "2773" }, { "text": "碧江区", "value": "2774" }, { "text": "万山区", "value": "2775" }, { "text": "江口县", "value": "2776" }, { "text": "玉屏侗族自治县", "value": "2777" }, { "text": "石阡县", "value": "2778" }, { "text": "思南县", "value": "2779" }, { "text": "印江土家族苗族自治县", "value": "2780" }, { "text": "德江县", "value": "2781" }, { "text": "沿河土家族自治县", "value": "2782" }, { "text": "松桃苗族自治县", "value": "2783" }] }, { "text": "黔西南布依族苗族自治州", "value": "2784", "children": [{ "text": "兴义市", "value": "2785" }, { "text": "兴仁县", "value": "2786" }, { "text": "普安县", "value": "2787" }, { "text": "晴隆县", "value": "2788" }, { "text": "贞丰县", "value": "2789" }, { "text": "望谟县", "value": "2790" }, { "text": "册亨县", "value": "2791" }, { "text": "安龙县", "value": "2792" }] }, { "text": "黔东南苗族侗族自治州", "value": "2793", "children": [{ "text": "凯里市", "value": "2794" }, { "text": "黄平县", "value": "2795" }, { "text": "施秉县", "value": "2796" }, { "text": "三穗县", "value": "2797" }, { "text": "镇远县", "value": "2798" }, { "text": "岑巩县", "value": "2799" }, { "text": "天柱县", "value": "2800" }, { "text": "锦屏县", "value": "2801" }, { "text": "剑河县", "value": "2802" }, { "text": "台江县", "value": "2803" }, { "text": "黎平县", "value": "2804" }, { "text": "榕江县", "value": "2805" }, { "text": "从江县", "value": "2806" }, { "text": "雷山县", "value": "2807" }, { "text": "麻江县", "value": "2808" }, { "text": "丹寨县", "value": "2809" }] }, { "text": "黔南布依族苗族自治州", "value": "2810", "children": [{ "text": "都匀市", "value": "2811" }, { "text": "福泉市", "value": "2812" }, { "text": "荔波县", "value": "2813" }, { "text": "贵定县", "value": "2814" }, { "text": "瓮安县", "value": "2815" }, { "text": "独山县", "value": "2816" }, { "text": "平塘县", "value": "2817" }, { "text": "罗甸县", "value": "2818" }, { "text": "长顺县", "value": "2819" }, { "text": "龙里县", "value": "2820" }, { "text": "惠水县", "value": "2821" }, { "text": "三都水族自治县", "value": "2822" }] }] }, { "text": "云南省", "value": "2823", "children": [{ "text": "昆明市", "value": "2824", "children": [{ "text": "市辖区", "value": "2825" }, { "text": "五华区", "value": "2826" }, { "text": "盘龙区", "value": "2827" }, { "text": "官渡区", "value": "2828" }, { "text": "西山区", "value": "2829" }, { "text": "东川区", "value": "2830" }, { "text": "呈贡区", "value": "2831" }, { "text": "晋宁县", "value": "2832" }, { "text": "富民县", "value": "2833" }, { "text": "宜良县", "value": "2834" }, { "text": "石林彝族自治县", "value": "2835" }, { "text": "嵩明县", "value": "2836" }, { "text": "禄劝彝族苗族自治县", "value": "2837" }, { "text": "寻甸回族彝族自治县", "value": "2838" }, { "text": "安宁市", "value": "2839" }] }, { "text": "曲靖市", "value": "2840", "children": [{ "text": "市辖区", "value": "2841" }, { "text": "麒麟区", "value": "2842" }, { "text": "沾益区", "value": "2843" }, { "text": "马龙县", "value": "2844" }, { "text": "陆良县", "value": "2845" }, { "text": "师宗县", "value": "2846" }, { "text": "罗平县", "value": "2847" }, { "text": "富源县", "value": "2848" }, { "text": "会泽县", "value": "2849" }, { "text": "宣威市", "value": "2850" }] }, { "text": "玉溪市", "value": "2851", "children": [{ "text": "市辖区", "value": "2852" }, { "text": "红塔区", "value": "2853" }, { "text": "江川区", "value": "2854" }, { "text": "澄江县", "value": "2855" }, { "text": "通海县", "value": "2856" }, { "text": "华宁县", "value": "2857" }, { "text": "易门县", "value": "2858" }, { "text": "峨山彝族自治县", "value": "2859" }, { "text": "新平彝族傣族自治县", "value": "2860" }, { "text": "元江哈尼族彝族傣族自治县", "value": "2861" }] }, { "text": "保山市", "value": "2862", "children": [{ "text": "市辖区", "value": "2863" }, { "text": "隆阳区", "value": "2864" }, { "text": "施甸县", "value": "2865" }, { "text": "龙陵县", "value": "2866" }, { "text": "昌宁县", "value": "2867" }, { "text": "腾冲市", "value": "2868" }] }, { "text": "昭通市", "value": "2869", "children": [{ "text": "市辖区", "value": "2870" }, { "text": "昭阳区", "value": "2871" }, { "text": "鲁甸县", "value": "2872" }, { "text": "巧家县", "value": "2873" }, { "text": "盐津县", "value": "2874" }, { "text": "大关县", "value": "2875" }, { "text": "永善县", "value": "2876" }, { "text": "绥江县", "value": "2877" }, { "text": "镇雄县", "value": "2878" }, { "text": "彝良县", "value": "2879" }, { "text": "威信县", "value": "2880" }, { "text": "水富县", "value": "2881" }] }, { "text": "丽江市", "value": "2882", "children": [{ "text": "市辖区", "value": "2883" }, { "text": "古城区", "value": "2884" }, { "text": "玉龙纳西族自治县", "value": "2885" }, { "text": "永胜县", "value": "2886" }, { "text": "华坪县", "value": "2887" }, { "text": "宁蒗彝族自治县", "value": "2888" }] }, { "text": "普洱市", "value": "2889", "children": [{ "text": "市辖区", "value": "2890" }, { "text": "思茅区", "value": "2891" }, { "text": "宁洱哈尼族彝族自治县", "value": "2892" }, { "text": "墨江哈尼族自治县", "value": "2893" }, { "text": "景东彝族自治县", "value": "2894" }, { "text": "景谷傣族彝族自治县", "value": "2895" }, { "text": "镇沅彝族哈尼族拉祜族自治县", "value": "2896" }, { "text": "江城哈尼族彝族自治县", "value": "2897" }, { "text": "孟连傣族拉祜族佤族自治县", "value": "2898" }, { "text": "澜沧拉祜族自治县", "value": "2899" }, { "text": "西盟佤族自治县", "value": "2900" }] }, { "text": "临沧市", "value": "2901", "children": [{ "text": "市辖区", "value": "2902" }, { "text": "临翔区", "value": "2903" }, { "text": "凤庆县", "value": "2904" }, { "text": "云县", "value": "2905" }, { "text": "永德县", "value": "2906" }, { "text": "镇康县", "value": "2907" }, { "text": "双江拉祜族佤族布朗族傣族自治县", "value": "2908" }, { "text": "耿马傣族佤族自治县", "value": "2909" }, { "text": "沧源佤族自治县", "value": "2910" }] }, { "text": "楚雄彝族自治州", "value": "2911", "children": [{ "text": "楚雄市", "value": "2912" }, { "text": "双柏县", "value": "2913" }, { "text": "牟定县", "value": "2914" }, { "text": "南华县", "value": "2915" }, { "text": "姚安县", "value": "2916" }, { "text": "大姚县", "value": "2917" }, { "text": "永仁县", "value": "2918" }, { "text": "元谋县", "value": "2919" }, { "text": "武定县", "value": "2920" }, { "text": "禄丰县", "value": "2921" }] }, { "text": "红河哈尼族彝族自治州", "value": "2922", "children": [{ "text": "个旧市", "value": "2923" }, { "text": "开远市", "value": "2924" }, { "text": "蒙自市", "value": "2925" }, { "text": "弥勒市", "value": "2926" }, { "text": "屏边苗族自治县", "value": "2927" }, { "text": "建水县", "value": "2928" }, { "text": "石屏县", "value": "2929" }, { "text": "泸西县", "value": "2930" }, { "text": "元阳县", "value": "2931" }, { "text": "红河县", "value": "2932" }, { "text": "金平苗族瑶族傣族自治县", "value": "2933" }, { "text": "绿春县", "value": "2934" }, { "text": "河口瑶族自治县", "value": "2935" }] }, { "text": "文山壮族苗族自治州", "value": "2936", "children": [{ "text": "文山市", "value": "2937" }, { "text": "砚山县", "value": "2938" }, { "text": "西畴县", "value": "2939" }, { "text": "麻栗坡县", "value": "2940" }, { "text": "马关县", "value": "2941" }, { "text": "丘北县", "value": "2942" }, { "text": "广南县", "value": "2943" }, { "text": "富宁县", "value": "2944" }] }, { "text": "西双版纳傣族自治州", "value": "2945", "children": [{ "text": "景洪市", "value": "2946" }, { "text": "勐海县", "value": "2947" }, { "text": "勐腊县", "value": "2948" }] }, { "text": "大理白族自治州", "value": "2949", "children": [{ "text": "大理市", "value": "2950" }, { "text": "漾濞彝族自治县", "value": "2951" }, { "text": "祥云县", "value": "2952" }, { "text": "宾川县", "value": "2953" }, { "text": "弥渡县", "value": "2954" }, { "text": "南涧彝族自治县", "value": "2955" }, { "text": "巍山彝族回族自治县", "value": "2956" }, { "text": "永平县", "value": "2957" }, { "text": "云龙县", "value": "2958" }, { "text": "洱源县", "value": "2959" }, { "text": "剑川县", "value": "2960" }, { "text": "鹤庆县", "value": "2961" }] }, { "text": "德宏傣族景颇族自治州", "value": "2962", "children": [{ "text": "瑞丽市", "value": "2963" }, { "text": "芒市", "value": "2964" }, { "text": "梁河县", "value": "2965" }, { "text": "盈江县", "value": "2966" }, { "text": "陇川县", "value": "2967" }] }, { "text": "怒江傈僳族自治州", "value": "2968", "children": [{ "text": "泸水市", "value": "2969" }, { "text": "福贡县", "value": "2970" }, { "text": "贡山独龙族怒族自治县", "value": "2971" }, { "text": "兰坪白族普米族自治县", "value": "2972" }] }, { "text": "迪庆藏族自治州", "value": "2973", "children": [{ "text": "香格里拉市", "value": "2974" }, { "text": "德钦县", "value": "2975" }, { "text": "维西傈僳族自治县", "value": "2976" }] }] }, { "text": "西藏自治区", "value": "2977", "children": [{ "text": "拉萨市", "value": "2978", "children": [{ "text": "市辖区", "value": "2979" }, { "text": "城关区", "value": "2980" }, { "text": "堆龙德庆区", "value": "2981" }, { "text": "林周县", "value": "2982" }, { "text": "当雄县", "value": "2983" }, { "text": "尼木县", "value": "2984" }, { "text": "曲水县", "value": "2985" }, { "text": "达孜县", "value": "2986" }, { "text": "墨竹工卡县", "value": "2987" }] }, { "text": "日喀则市", "value": "2988", "children": [{ "text": "桑珠孜区", "value": "2989" }, { "text": "南木林县", "value": "2990" }, { "text": "江孜县", "value": "2991" }, { "text": "定日县", "value": "2992" }, { "text": "萨迦县", "value": "2993" }, { "text": "拉孜县", "value": "2994" }, { "text": "昂仁县", "value": "2995" }, { "text": "谢通门县", "value": "2996" }, { "text": "白朗县", "value": "2997" }, { "text": "仁布县", "value": "2998" }, { "text": "康马县", "value": "2999" }, { "text": "定结县", "value": "3000" }, { "text": "仲巴县", "value": "3001" }, { "text": "亚东县", "value": "3002" }, { "text": "吉隆县", "value": "3003" }, { "text": "聂拉木县", "value": "3004" }, { "text": "萨嘎县", "value": "3005" }, { "text": "岗巴县", "value": "3006" }] }, { "text": "昌都市", "value": "3007", "children": [{ "text": "卡若区", "value": "3008" }, { "text": "江达县", "value": "3009" }, { "text": "贡觉县", "value": "3010" }, { "text": "类乌齐县", "value": "3011" }, { "text": "丁青县", "value": "3012" }, { "text": "察雅县", "value": "3013" }, { "text": "八宿县", "value": "3014" }, { "text": "左贡县", "value": "3015" }, { "text": "芒康县", "value": "3016" }, { "text": "洛隆县", "value": "3017" }, { "text": "边坝县", "value": "3018" }] }, { "text": "林芝市", "value": "3019", "children": [{ "text": "巴宜区", "value": "3020" }, { "text": "工布江达县", "value": "3021" }, { "text": "米林县", "value": "3022" }, { "text": "墨脱县", "value": "3023" }, { "text": "波密县", "value": "3024" }, { "text": "察隅县", "value": "3025" }, { "text": "朗县", "value": "3026" }] }, { "text": "山南市", "value": "3027", "children": [{ "text": "市辖区", "value": "3028" }, { "text": "乃东区", "value": "3029" }, { "text": "扎囊县", "value": "3030" }, { "text": "贡嘎县", "value": "3031" }, { "text": "桑日县", "value": "3032" }, { "text": "琼结县", "value": "3033" }, { "text": "曲松县", "value": "3034" }, { "text": "措美县", "value": "3035" }, { "text": "洛扎县", "value": "3036" }, { "text": "加查县", "value": "3037" }, { "text": "隆子县", "value": "3038" }, { "text": "错那县", "value": "3039" }, { "text": "浪卡子县", "value": "3040" }] }, { "text": "那曲地区", "value": "3041", "children": [{ "text": "那曲县", "value": "3042" }, { "text": "嘉黎县", "value": "3043" }, { "text": "比如县", "value": "3044" }, { "text": "聂荣县", "value": "3045" }, { "text": "安多县", "value": "3046" }, { "text": "申扎县", "value": "3047" }, { "text": "索县", "value": "3048" }, { "text": "班戈县", "value": "3049" }, { "text": "巴青县", "value": "3050" }, { "text": "尼玛县", "value": "3051" }, { "text": "双湖县", "value": "3052" }] }, { "text": "阿里地区", "value": "3053", "children": [{ "text": "普兰县", "value": "3054" }, { "text": "札达县", "value": "3055" }, { "text": "噶尔县", "value": "3056" }, { "text": "日土县", "value": "3057" }, { "text": "革吉县", "value": "3058" }, { "text": "改则县", "value": "3059" }, { "text": "措勤县", "value": "3060" }] }] }, { "text": "陕西省", "value": "3061", "children": [{ "text": "西安市", "value": "3062", "children": [{ "text": "市辖区", "value": "3063" }, { "text": "新城区", "value": "3064" }, { "text": "碑林区", "value": "3065" }, { "text": "莲湖区", "value": "3066" }, { "text": "灞桥区", "value": "3067" }, { "text": "未央区", "value": "3068" }, { "text": "雁塔区", "value": "3069" }, { "text": "阎良区", "value": "3070" }, { "text": "临潼区", "value": "3071" }, { "text": "长安区", "value": "3072" }, { "text": "高陵区", "value": "3073" }, { "text": "蓝田县", "value": "3074" }, { "text": "周至县", "value": "3075" }, { "text": "户县", "value": "3076" }] }, { "text": "铜川市", "value": "3077", "children": [{ "text": "市辖区", "value": "3078" }, { "text": "王益区", "value": "3079" }, { "text": "印台区", "value": "3080" }, { "text": "耀州区", "value": "3081" }, { "text": "宜君县", "value": "3082" }] }, { "text": "宝鸡市", "value": "3083", "children": [{ "text": "市辖区", "value": "3084" }, { "text": "渭滨区", "value": "3085" }, { "text": "金台区", "value": "3086" }, { "text": "陈仓区", "value": "3087" }, { "text": "凤翔县", "value": "3088" }, { "text": "岐山县", "value": "3089" }, { "text": "扶风县", "value": "3090" }, { "text": "眉县", "value": "3091" }, { "text": "陇县", "value": "3092" }, { "text": "千阳县", "value": "3093" }, { "text": "麟游县", "value": "3094" }, { "text": "凤县", "value": "3095" }, { "text": "太白县", "value": "3096" }] }, { "text": "咸阳市", "value": "3097", "children": [{ "text": "市辖区", "value": "3098" }, { "text": "秦都区", "value": "3099" }, { "text": "杨陵区", "value": "3100" }, { "text": "渭城区", "value": "3101" }, { "text": "三原县", "value": "3102" }, { "text": "泾阳县", "value": "3103" }, { "text": "乾县", "value": "3104" }, { "text": "礼泉县", "value": "3105" }, { "text": "永寿县", "value": "3106" }, { "text": "彬县", "value": "3107" }, { "text": "长武县", "value": "3108" }, { "text": "旬邑县", "value": "3109" }, { "text": "淳化县", "value": "3110" }, { "text": "武功县", "value": "3111" }, { "text": "兴平市", "value": "3112" }] }, { "text": "渭南市", "value": "3113", "children": [{ "text": "市辖区", "value": "3114" }, { "text": "临渭区", "value": "3115" }, { "text": "华州区", "value": "3116" }, { "text": "潼关县", "value": "3117" }, { "text": "大荔县", "value": "3118" }, { "text": "合阳县", "value": "3119" }, { "text": "澄城县", "value": "3120" }, { "text": "蒲城县", "value": "3121" }, { "text": "白水县", "value": "3122" }, { "text": "富平县", "value": "3123" }, { "text": "韩城市", "value": "3124" }, { "text": "华阴市", "value": "3125" }] }, { "text": "延安市", "value": "3126", "children": [{ "text": "市辖区", "value": "3127" }, { "text": "宝塔区", "value": "3128" }, { "text": "安塞区", "value": "3129" }, { "text": "延长县", "value": "3130" }, { "text": "延川县", "value": "3131" }, { "text": "子长县", "value": "3132" }, { "text": "志丹县", "value": "3133" }, { "text": "吴起县", "value": "3134" }, { "text": "甘泉县", "value": "3135" }, { "text": "富县", "value": "3136" }, { "text": "洛川县", "value": "3137" }, { "text": "宜川县", "value": "3138" }, { "text": "黄龙县", "value": "3139" }, { "text": "黄陵县", "value": "3140" }] }, { "text": "汉中市", "value": "3141", "children": [{ "text": "市辖区", "value": "3142" }, { "text": "汉台区", "value": "3143" }, { "text": "南郑县", "value": "3144" }, { "text": "城固县", "value": "3145" }, { "text": "洋县", "value": "3146" }, { "text": "西乡县", "value": "3147" }, { "text": "勉县", "value": "3148" }, { "text": "宁强县", "value": "3149" }, { "text": "略阳县", "value": "3150" }, { "text": "镇巴县", "value": "3151" }, { "text": "留坝县", "value": "3152" }, { "text": "佛坪县", "value": "3153" }] }, { "text": "榆林市", "value": "3154", "children": [{ "text": "市辖区", "value": "3155" }, { "text": "榆阳区", "value": "3156" }, { "text": "横山区", "value": "3157" }, { "text": "神木县", "value": "3158" }, { "text": "府谷县", "value": "3159" }, { "text": "靖边县", "value": "3160" }, { "text": "定边县", "value": "3161" }, { "text": "绥德县", "value": "3162" }, { "text": "米脂县", "value": "3163" }, { "text": "佳县", "value": "3164" }, { "text": "吴堡县", "value": "3165" }, { "text": "清涧县", "value": "3166" }, { "text": "子洲县", "value": "3167" }] }, { "text": "安康市", "value": "3168", "children": [{ "text": "市辖区", "value": "3169" }, { "text": "汉滨区", "value": "3170" }, { "text": "汉阴县", "value": "3171" }, { "text": "石泉县", "value": "3172" }, { "text": "宁陕县", "value": "3173" }, { "text": "紫阳县", "value": "3174" }, { "text": "岚皋县", "value": "3175" }, { "text": "平利县", "value": "3176" }, { "text": "镇坪县", "value": "3177" }, { "text": "旬阳县", "value": "3178" }, { "text": "白河县", "value": "3179" }] }, { "text": "商洛市", "value": "3180", "children": [{ "text": "市辖区", "value": "3181" }, { "text": "商州区", "value": "3182" }, { "text": "洛南县", "value": "3183" }, { "text": "丹凤县", "value": "3184" }, { "text": "商南县", "value": "3185" }, { "text": "山阳县", "value": "3186" }, { "text": "镇安县", "value": "3187" }, { "text": "柞水县", "value": "3188" }] }] }, { "text": "甘肃省", "value": "3189", "children": [{ "text": "兰州市", "value": "3190", "children": [{ "text": "市辖区", "value": "3191" }, { "text": "城关区", "value": "3192" }, { "text": "七里河区", "value": "3193" }, { "text": "西固区", "value": "3194" }, { "text": "安宁区", "value": "3195" }, { "text": "红古区", "value": "3196" }, { "text": "永登县", "value": "3197" }, { "text": "皋兰县", "value": "3198" }, { "text": "榆中县", "value": "3199" }] }, { "text": "嘉峪关市", "value": "3200", "children": [{ "text": "市辖区", "value": "3201" }] }, { "text": "金昌市", "value": "3202", "children": [{ "text": "市辖区", "value": "3203" }, { "text": "金川区", "value": "3204" }, { "text": "永昌县", "value": "3205" }] }, { "text": "白银市", "value": "3206", "children": [{ "text": "市辖区", "value": "3207" }, { "text": "白银区", "value": "3208" }, { "text": "平川区", "value": "3209" }, { "text": "靖远县", "value": "3210" }, { "text": "会宁县", "value": "3211" }, { "text": "景泰县", "value": "3212" }] }, { "text": "天水市", "value": "3213", "children": [{ "text": "市辖区", "value": "3214" }, { "text": "秦州区", "value": "3215" }, { "text": "麦积区", "value": "3216" }, { "text": "清水县", "value": "3217" }, { "text": "秦安县", "value": "3218" }, { "text": "甘谷县", "value": "3219" }, { "text": "武山县", "value": "3220" }, { "text": "张家川回族自治县", "value": "3221" }] }, { "text": "武威市", "value": "3222", "children": [{ "text": "市辖区", "value": "3223" }, { "text": "凉州区", "value": "3224" }, { "text": "民勤县", "value": "3225" }, { "text": "古浪县", "value": "3226" }, { "text": "天祝藏族自治县", "value": "3227" }] }, { "text": "张掖市", "value": "3228", "children": [{ "text": "市辖区", "value": "3229" }, { "text": "甘州区", "value": "3230" }, { "text": "肃南裕固族自治县", "value": "3231" }, { "text": "民乐县", "value": "3232" }, { "text": "临泽县", "value": "3233" }, { "text": "高台县", "value": "3234" }, { "text": "山丹县", "value": "3235" }] }, { "text": "平凉市", "value": "3236", "children": [{ "text": "市辖区", "value": "3237" }, { "text": "崆峒区", "value": "3238" }, { "text": "泾川县", "value": "3239" }, { "text": "灵台县", "value": "3240" }, { "text": "崇信县", "value": "3241" }, { "text": "华亭县", "value": "3242" }, { "text": "庄浪县", "value": "3243" }, { "text": "静宁县", "value": "3244" }] }, { "text": "酒泉市", "value": "3245", "children": [{ "text": "市辖区", "value": "3246" }, { "text": "肃州区", "value": "3247" }, { "text": "金塔县", "value": "3248" }, { "text": "瓜州县", "value": "3249" }, { "text": "肃北蒙古族自治县", "value": "3250" }, { "text": "阿克塞哈萨克族自治县", "value": "3251" }, { "text": "玉门市", "value": "3252" }, { "text": "敦煌市", "value": "3253" }] }, { "text": "庆阳市", "value": "3254", "children": [{ "text": "市辖区", "value": "3255" }, { "text": "西峰区", "value": "3256" }, { "text": "庆城县", "value": "3257" }, { "text": "环县", "value": "3258" }, { "text": "华池县", "value": "3259" }, { "text": "合水县", "value": "3260" }, { "text": "正宁县", "value": "3261" }, { "text": "宁县", "value": "3262" }, { "text": "镇原县", "value": "3263" }] }, { "text": "定西市", "value": "3264", "children": [{ "text": "市辖区", "value": "3265" }, { "text": "安定区", "value": "3266" }, { "text": "通渭县", "value": "3267" }, { "text": "陇西县", "value": "3268" }, { "text": "渭源县", "value": "3269" }, { "text": "临洮县", "value": "3270" }, { "text": "漳县", "value": "3271" }, { "text": "岷县", "value": "3272" }] }, { "text": "陇南市", "value": "3273", "children": [{ "text": "市辖区", "value": "3274" }, { "text": "武都区", "value": "3275" }, { "text": "成县", "value": "3276" }, { "text": "文县", "value": "3277" }, { "text": "宕昌县", "value": "3278" }, { "text": "康县", "value": "3279" }, { "text": "西和县", "value": "3280" }, { "text": "礼县", "value": "3281" }, { "text": "徽县", "value": "3282" }, { "text": "两当县", "value": "3283" }] }, { "text": "临夏回族自治州", "value": "3284", "children": [{ "text": "临夏市", "value": "3285" }, { "text": "临夏县", "value": "3286" }, { "text": "康乐县", "value": "3287" }, { "text": "永靖县", "value": "3288" }, { "text": "广河县", "value": "3289" }, { "text": "和政县", "value": "3290" }, { "text": "东乡族自治县", "value": "3291" }, { "text": "积石山保安族东乡族撒拉族自治县", "value": "3292" }] }, { "text": "甘南藏族自治州", "value": "3293", "children": [{ "text": "合作市", "value": "3294" }, { "text": "临潭县", "value": "3295" }, { "text": "卓尼县", "value": "3296" }, { "text": "舟曲县", "value": "3297" }, { "text": "迭部县", "value": "3298" }, { "text": "玛曲县", "value": "3299" }, { "text": "碌曲县", "value": "3300" }, { "text": "夏河县", "value": "3301" }] }] }, { "text": "青海省", "value": "3302", "children": [{ "text": "西宁市", "value": "3303", "children": [{ "text": "市辖区", "value": "3304" }, { "text": "城东区", "value": "3305" }, { "text": "城中区", "value": "3306" }, { "text": "城西区", "value": "3307" }, { "text": "城北区", "value": "3308" }, { "text": "大通回族土族自治县", "value": "3309" }, { "text": "湟中县", "value": "3310" }, { "text": "湟源县", "value": "3311" }] }, { "text": "海东市", "value": "3312", "children": [{ "text": "乐都区", "value": "3313" }, { "text": "平安区", "value": "3314" }, { "text": "民和回族土族自治县", "value": "3315" }, { "text": "互助土族自治县", "value": "3316" }, { "text": "化隆回族自治县", "value": "3317" }, { "text": "循化撒拉族自治县", "value": "3318" }] }, { "text": "海北藏族自治州", "value": "3319", "children": [{ "text": "门源回族自治县", "value": "3320" }, { "text": "祁连县", "value": "3321" }, { "text": "海晏县", "value": "3322" }, { "text": "刚察县", "value": "3323" }] }, { "text": "黄南藏族自治州", "value": "3324", "children": [{ "text": "同仁县", "value": "3325" }, { "text": "尖扎县", "value": "3326" }, { "text": "泽库县", "value": "3327" }, { "text": "河南蒙古族自治县", "value": "3328" }] }, { "text": "海南藏族自治州", "value": "3329", "children": [{ "text": "共和县", "value": "3330" }, { "text": "同德县", "value": "3331" }, { "text": "贵德县", "value": "3332" }, { "text": "兴海县", "value": "3333" }, { "text": "贵南县", "value": "3334" }] }, { "text": "果洛藏族自治州", "value": "3335", "children": [{ "text": "玛沁县", "value": "3336" }, { "text": "班玛县", "value": "3337" }, { "text": "甘德县", "value": "3338" }, { "text": "达日县", "value": "3339" }, { "text": "久治县", "value": "3340" }, { "text": "玛多县", "value": "3341" }] }, { "text": "玉树藏族自治州", "value": "3342", "children": [{ "text": "玉树市", "value": "3343" }, { "text": "杂多县", "value": "3344" }, { "text": "称多县", "value": "3345" }, { "text": "治多县", "value": "3346" }, { "text": "囊谦县", "value": "3347" }, { "text": "曲麻莱县", "value": "3348" }] }, { "text": "海西蒙古族藏族自治州", "value": "3349", "children": [{ "text": "格尔木市", "value": "3350" }, { "text": "德令哈市", "value": "3351" }, { "text": "乌兰县", "value": "3352" }, { "text": "都兰县", "value": "3353" }, { "text": "天峻县", "value": "3354" }] }] }, { "text": "宁夏回族自治区", "value": "3355", "children": [{ "text": "银川市", "value": "3356", "children": [{ "text": "市辖区", "value": "3357" }, { "text": "兴庆区", "value": "3358" }, { "text": "西夏区", "value": "3359" }, { "text": "金凤区", "value": "3360" }, { "text": "永宁县", "value": "3361" }, { "text": "贺兰县", "value": "3362" }, { "text": "灵武市", "value": "3363" }] }, { "text": "石嘴山市", "value": "3364", "children": [{ "text": "市辖区", "value": "3365" }, { "text": "大武口区", "value": "3366" }, { "text": "惠农区", "value": "3367" }, { "text": "平罗县", "value": "3368" }] }, { "text": "吴忠市", "value": "3369", "children": [{ "text": "市辖区", "value": "3370" }, { "text": "利通区", "value": "3371" }, { "text": "红寺堡区", "value": "3372" }, { "text": "盐池县", "value": "3373" }, { "text": "同心县", "value": "3374" }, { "text": "青铜峡市", "value": "3375" }] }, { "text": "固原市", "value": "3376", "children": [{ "text": "市辖区", "value": "3377" }, { "text": "原州区", "value": "3378" }, { "text": "西吉县", "value": "3379" }, { "text": "隆德县", "value": "3380" }, { "text": "泾源县", "value": "3381" }, { "text": "彭阳县", "value": "3382" }] }, { "text": "中卫市", "value": "3383", "children": [{ "text": "市辖区", "value": "3384" }, { "text": "沙坡头区", "value": "3385" }, { "text": "中宁县", "value": "3386" }, { "text": "海原县", "value": "3387" }] }] }, { "text": "新疆维吾尔自治区", "value": "3388", "children": [{ "text": "乌鲁木齐市", "value": "3389", "children": [{ "text": "市辖区", "value": "3390" }, { "text": "天山区", "value": "3391" }, { "text": "沙依巴克区", "value": "3392" }, { "text": "新市区", "value": "3393" }, { "text": "水磨沟区", "value": "3394" }, { "text": "头屯河区", "value": "3395" }, { "text": "达坂城区", "value": "3396" }, { "text": "米东区", "value": "3397" }, { "text": "乌鲁木齐县", "value": "3398" }] }, { "text": "克拉玛依市", "value": "3399", "children": [{ "text": "市辖区", "value": "3400" }, { "text": "独山子区", "value": "3401" }, { "text": "克拉玛依区", "value": "3402" }, { "text": "白碱滩区", "value": "3403" }, { "text": "乌尔禾区", "value": "3404" }] }, { "text": "吐鲁番市", "value": "3405", "children": [{ "text": "高昌区", "value": "3406" }, { "text": "鄯善县", "value": "3407" }, { "text": "托克逊县", "value": "3408" }] }, { "text": "哈密市", "value": "3409", "children": [{ "text": "伊州区", "value": "3410" }, { "text": "巴里坤哈萨克自治县", "value": "3411" }, { "text": "伊吾县", "value": "3412" }] }, { "text": "昌吉回族自治州", "value": "3413", "children": [{ "text": "昌吉市", "value": "3414" }, { "text": "阜康市", "value": "3415" }, { "text": "呼图壁县", "value": "3416" }, { "text": "玛纳斯县", "value": "3417" }, { "text": "奇台县", "value": "3418" }, { "text": "吉木萨尔县", "value": "3419" }, { "text": "木垒哈萨克自治县", "value": "3420" }] }, { "text": "博尔塔拉蒙古自治州", "value": "3421", "children": [{ "text": "博乐市", "value": "3422" }, { "text": "阿拉山口市", "value": "3423" }, { "text": "精河县", "value": "3424" }, { "text": "温泉县", "value": "3425" }] }, { "text": "巴音郭楞蒙古自治州", "value": "3426", "children": [{ "text": "库尔勒市", "value": "3427" }, { "text": "轮台县", "value": "3428" }, { "text": "尉犁县", "value": "3429" }, { "text": "若羌县", "value": "3430" }, { "text": "且末县", "value": "3431" }, { "text": "焉耆回族自治县", "value": "3432" }, { "text": "和静县", "value": "3433" }, { "text": "和硕县", "value": "3434" }, { "text": "博湖县", "value": "3435" }] }, { "text": "阿克苏地区", "value": "3436", "children": [{ "text": "阿克苏市", "value": "3437" }, { "text": "温宿县", "value": "3438" }, { "text": "库车县", "value": "3439" }, { "text": "沙雅县", "value": "3440" }, { "text": "新和县", "value": "3441" }, { "text": "拜城县", "value": "3442" }, { "text": "乌什县", "value": "3443" }, { "text": "阿瓦提县", "value": "3444" }, { "text": "柯坪县", "value": "3445" }] }, { "text": "克孜勒苏柯尔克孜自治州", "value": "3446", "children": [{ "text": "阿图什市", "value": "3447" }, { "text": "阿克陶县", "value": "3448" }, { "text": "阿合奇县", "value": "3449" }, { "text": "乌恰县", "value": "3450" }] }, { "text": "喀什地区", "value": "3451", "children": [{ "text": "喀什市", "value": "3452" }, { "text": "疏附县", "value": "3453" }, { "text": "疏勒县", "value": "3454" }, { "text": "英吉沙县", "value": "3455" }, { "text": "泽普县", "value": "3456" }, { "text": "莎车县", "value": "3457" }, { "text": "叶城县", "value": "3458" }, { "text": "麦盖提县", "value": "3459" }, { "text": "岳普湖县", "value": "3460" }, { "text": "伽师县", "value": "3461" }, { "text": "巴楚县", "value": "3462" }, { "text": "塔什库尔干塔吉克自治县", "value": "3463" }] }, { "text": "和田地区", "value": "3464", "children": [{ "text": "和田市", "value": "3465" }, { "text": "和田县", "value": "3466" }, { "text": "墨玉县", "value": "3467" }, { "text": "皮山县", "value": "3468" }, { "text": "洛浦县", "value": "3469" }, { "text": "策勒县", "value": "3470" }, { "text": "于田县", "value": "3471" }, { "text": "民丰县", "value": "3472" }] }, { "text": "伊犁哈萨克自治州", "value": "3473", "children": [{ "text": "伊宁市", "value": "3474" }, { "text": "奎屯市", "value": "3475" }, { "text": "霍尔果斯市", "value": "3476" }, { "text": "伊宁县", "value": "3477" }, { "text": "察布查尔锡伯自治县", "value": "3478" }, { "text": "霍城县", "value": "3479" }, { "text": "巩留县", "value": "3480" }, { "text": "新源县", "value": "3481" }, { "text": "昭苏县", "value": "3482" }, { "text": "特克斯县", "value": "3483" }, { "text": "尼勒克县", "value": "3484" }] }, { "text": "塔城地区", "value": "3485", "children": [{ "text": "塔城市", "value": "3486" }, { "text": "乌苏市", "value": "3487" }, { "text": "额敏县", "value": "3488" }, { "text": "沙湾县", "value": "3489" }, { "text": "托里县", "value": "3490" }, { "text": "裕民县", "value": "3491" }, { "text": "和布克赛尔蒙古自治县", "value": "3492" }] }, { "text": "阿勒泰地区", "value": "3493", "children": [{ "text": "阿勒泰市", "value": "3494" }, { "text": "布尔津县", "value": "3495" }, { "text": "富蕴县", "value": "3496" }, { "text": "福海县", "value": "3497" }, { "text": "哈巴河县", "value": "3498" }, { "text": "青河县", "value": "3499" }, { "text": "吉木乃县", "value": "3500" }] }, { "text": "自治区直辖县级行政区划", "value": "3501", "children": [{ "text": "石河子市", "value": "3502" }, { "text": "阿拉尔市", "value": "3503" }, { "text": "图木舒克市", "value": "3504" }, { "text": "五家渠市", "value": "3505" }, { "text": "铁门关市", "value": "3506" }] }] }, { "text": "台湾省", "value": "3507", "children": [] }, { "text": "香港特别行政区", "value": "3508", "children": [] }, { "text": "澳门特别行政区", "value": "3509", "children": [] }];
var PCAArea = [];
var PCAP = [];
var PCAC = [];
var PCAA = [];

function getAddress($province, $city, $area) {
  var data = {
    province: '',
    city: '',
    area: '' };

  for (var i = 0; i < cityData3.length; i++) {
    var PCAPT = cityData3[i].text;
    var PCAPV = cityData3[i].value;
    if (PCAPV == $province) {
      data.province = PCAPT;
      var PI = i;
      for (var i = 0; i < cityData3[PI].children.length; i++) {
        var PCACT = cityData3[PI].children[i].text;
        var PCACV = cityData3[PI].children[i].value;
        if ($city == PCACV) {
          data.city = PCACT;
          var CI = i;
          if (typeof cityData3[PI].children[CI] == 'undefined') {
            data.area = '';
          }
          for (var i = 0; i < cityData3[PI].children[CI].children.length; i++) {
            var PCAAT = cityData3[PI].children[CI].children[i].text;
            var PCAAV = cityData3[PI].children[CI].children[i].value;
            if ($area == PCAAV) {
              data.area = PCAAT;
            }
          }
          break;
        }
      }
      break;
    }
  }
  return data;
}

function getAddressIndex($province, $city, $area) {
  var data = {
    province: 0,
    city: 0,
    area: 0 };

  for (var i = 0; i < cityData3.length; i++) {
    var PCAPT = cityData3[i].text;
    var PCAPV = cityData3[i].value;
    if (PCAPV == $province || PCAPT == $province) {
      data.province = i;
      var PI = i;
      for (var i = 0; i < cityData3[PI].children.length; i++) {
        var PCACT = cityData3[PI].children[i].text;
        var PCACV = cityData3[PI].children[i].value;
        if ($city == PCACV || PCACT == $city) {
          data.city = i;
          var CI = i;
          if (typeof cityData3[PI].children[CI] == 'undefined') {
            data.area = 0;
          }
          for (var i = 0; i < cityData3[PI].children[CI].children.length; i++) {
            var PCAAT = cityData3[PI].children[CI].children[i].text;
            var PCAAV = cityData3[PI].children[CI].children[i].value;
            if ($area == PCAAV || $area == PCAAT) {
              data.area = i;
            }
          }
          break;
        }
      }
      break;
    }
  }
  return data;
}

function PCAS() {
  this.SelP = document.getElementsByName(arguments[0])[0];
  this.SelC = document.getElementsByName(arguments[1])[0];
  this.SelA = document.getElementsByName(arguments[2])[0];
  this.DefP = this.SelA ? arguments[3] : arguments[2];
  this.DefC = this.SelA ? arguments[4] : arguments[3];
  this.DefA = this.SelA ? arguments[5] : arguments[4];
  this.SelP.PCA = this;
  this.SelC.PCA = this;
  this.SelP.onchange = function () {
    PCAS.SetC(this.PCA);
  };
  if (this.SelA) this.SelC.onchange = function () {
    PCAS.SetA(this.PCA);
  };
  PCAS.SetP(this);
};
PCAS.SetP = function (PCA) {
  for (i = 0; i < cityData3.length; i++) {
    PCAPT = cityData3[i].text;
    PCAPV = cityData3[i].value;
    PCA.SelP.options.add(new Option(PCAPT, PCAPV));
    if (PCA.DefP == PCAPV) PCA.SelP[i].selected = true;
  }
  PCAS.SetC(PCA);
};
PCAS.SetC = function (PCA) {
  PI = PCA.SelP.selectedIndex;
  PCA.SelC.length = 0;
  for (i = 0; i < cityData3[PI].children.length; i++) {
    PCACT = cityData3[PI].children[i].text;
    PCACV = cityData3[PI].children[i].value;
    PCA.SelC.options.add(new Option(PCACT, PCACV));
    if (PCA.DefC == PCACV) PCA.SelC[i].selected = true;
  }
  if (PCA.SelA) PCAS.SetA(PCA);
};
PCAS.SetA = function (PCA) {
  PI = PCA.SelP.selectedIndex;
  CI = PCA.SelC.selectedIndex;
  PCA.SelA.length = 0;
  if (typeof cityData3[PI].children[CI] == 'undefined') {
    return;
  }
  for (i = 0; i < cityData3[PI].children[CI].children.length; i++) {
    PCAAT = cityData3[PI].children[CI].children[i].text;
    PCAAV = cityData3[PI].children[CI].children[i].value;
    PCA.SelA.options.add(new Option(PCAAT, PCAAV));
    if (PCA.DefA == PCAAV) PCA.SelA[i].selected = true;
  }
};

module.exports = {
  PCAS: PCAS,
  getAddress: getAddress,
  getAddressIndex: getAddressIndex };

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\common\\city.data.js":
/*!******************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/common/city.data.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  value: '110000',
  label: '北京市',
  children: [{
    value: "110101",
    label: "东城区" },
  {
    value: "110102",
    label: "西城区" },
  {
    value: "110103",
    label: "崇文区" },
  {
    value: "110104",
    label: "宣武区" },
  {
    value: "110105",
    label: "朝阳区" },
  {
    value: "110106",
    label: "丰台区" },
  {
    value: "110107",
    label: "石景山区" },
  {
    value: "110108",
    label: "海淀区" },
  {
    value: "110109",
    label: "门头沟区" },
  {
    value: "110111",
    label: "房山区" },
  {
    value: "110112",
    label: "通州区" },
  {
    value: "110113",
    label: "顺义区" },
  {
    value: "110114",
    label: "昌平区" },
  {
    value: "110115",
    label: "大兴区" },
  {
    value: "110116",
    label: "怀柔区" },
  {
    value: "110117",
    label: "平谷区" },
  {
    value: "110228",
    label: "密云县" },
  {
    value: "110229",
    label: "延庆县" },
  {
    value: "110230",
    label: "其它区" }] },

{
  value: '120000',
  label: '天津市',
  children: [{
    value: "120101",
    label: "和平区" },
  {
    value: "120102",
    label: "河东区" },
  {
    value: "120103",
    label: "河西区" },
  {
    value: "120104",
    label: "南开区" },
  {
    value: "120105",
    label: "河北区" },
  {
    value: "120106",
    label: "红桥区" },
  {
    value: "120107",
    label: "塘沽区" },
  {
    value: "120108",
    label: "汉沽区" },
  {
    value: "120109",
    label: "大港区" },
  {
    value: "120110",
    label: "东丽区" },
  {
    value: "120111",
    label: "西青区" },
  {
    value: "120112",
    label: "津南区" },
  {
    value: "120113",
    label: "北辰区" },
  {
    value: "120114",
    label: "武清区" },
  {
    value: "120115",
    label: "宝坻区" },
  {
    value: "120116",
    label: "滨海新区" },
  {
    value: "120221",
    label: "宁河县" },
  {
    value: "120223",
    label: "静海县" },
  {
    value: "120225",
    label: "蓟县" },
  {
    value: "120226",
    label: "其它区" }] },

{
  value: '130000',
  label: '河北省',
  children: [{
    value: "130100",
    label: "石家庄市" },
  {
    value: "130200",
    label: "唐山市" },
  {
    value: "130300",
    label: "秦皇岛市" },
  {
    value: "130400",
    label: "邯郸市" },
  {
    value: "130500",
    label: "邢台市" },
  {
    value: "130600",
    label: "保定市" },
  {
    value: "130700",
    label: "张家口市" },
  {
    value: "130800",
    label: "承德市" },
  {
    value: "130900",
    label: "沧州市" },
  {
    value: "131000",
    label: "廊坊市" },
  {
    value: "131100",
    label: "衡水市" }] },

{
  value: '140000',
  label: '山西省',
  children: [{
    value: "140100",
    label: "太原市" },
  {
    value: "140200",
    label: "大同市" },
  {
    value: "140300",
    label: "阳泉市" },
  {
    value: "140400",
    label: "长治市" },
  {
    value: "140500",
    label: "晋城市" },
  {
    value: "140600",
    label: "朔州市" },
  {
    value: "140700",
    label: "晋中市" },
  {
    value: "140800",
    label: "运城市" },
  {
    value: "140900",
    label: "忻州市" },
  {
    value: "141000",
    label: "临汾市" },
  {
    value: "141100",
    label: "吕梁市" }] },

{
  value: '150000',
  label: '内蒙古',
  children: [{
    value: "150100",
    label: "呼和浩特市" },
  {
    value: "150200",
    label: "包头市" },
  {
    value: "150300",
    label: "乌海市" },
  {
    value: "150400",
    label: "赤峰市" },
  {
    value: "150500",
    label: "通辽市" },
  {
    value: "150600",
    label: "鄂尔多斯市" },
  {
    value: "150700",
    label: "呼伦贝尔市" },
  {
    value: "150800",
    label: "巴彦淖尔市" },
  {
    value: "150900",
    label: "乌兰察布市" },
  {
    value: "152200",
    label: "兴安盟" },
  {
    value: "152500",
    label: "锡林郭勒盟" },
  {
    value: "152900",
    label: "阿拉善盟" }] },

{
  value: '210000',
  label: '辽宁省',
  children: [{
    value: "210100",
    label: "沈阳市" },
  {
    value: "210200",
    label: "大连市" },
  {
    value: "210300",
    label: "鞍山市" },
  {
    value: "210400",
    label: "抚顺市" },
  {
    value: "210500",
    label: "本溪市" },
  {
    value: "210600",
    label: "丹东市" },
  {
    value: "210700",
    label: "锦州市" },
  {
    value: "210800",
    label: "营口市" },
  {
    value: "210900",
    label: "阜新市" },
  {
    value: "211000",
    label: "辽阳市" },
  {
    value: "211100",
    label: "盘锦市" },
  {
    value: "211200",
    label: "铁岭市" },
  {
    value: "211300",
    label: "朝阳市" },
  {
    value: "211400",
    label: "葫芦岛市" }] },

{
  value: '220000',
  label: '吉林省',
  children: [{
    value: "220100",
    label: "长春市" },
  {
    value: "220200",
    label: "吉林市" },
  {
    value: "220300",
    label: "四平市" },
  {
    value: "220400",
    label: "辽源市" },
  {
    value: "220500",
    label: "通化市" },
  {
    value: "220600",
    label: "白山市" },
  {
    value: "220700",
    label: "松原市" },
  {
    value: "220800",
    label: "白城市" },
  {
    value: "222400",
    label: "延边朝鲜族自治州" }] },

{
  value: '230000',
  label: '黑龙江省',
  children: [{
    value: "230100",
    label: "哈尔滨市" },
  {
    value: "230200",
    label: "齐齐哈尔市" },
  {
    value: "230300",
    label: "鸡西市" },
  {
    value: "230400",
    label: "鹤岗市" },
  {
    value: "230500",
    label: "双鸭山市" },
  {
    value: "230600",
    label: "大庆市" },
  {
    value: "230700",
    label: "伊春市" },
  {
    value: "230800",
    label: "佳木斯市" },
  {
    value: "230900",
    label: "七台河市" },
  {
    value: "231000",
    label: "牡丹江市" },
  {
    value: "231100",
    label: "黑河市" },
  {
    value: "231200",
    label: "绥化市" },
  {
    value: "232700",
    label: "大兴安岭地区" }] },

{
  value: '310000',
  label: '上海市',
  children: [{
    value: "310101",
    label: "黄浦区" },
  {
    value: "310103",
    label: "卢湾区" },
  {
    value: "310104",
    label: "徐汇区" },
  {
    value: "310105",
    label: "长宁区" },
  {
    value: "310106",
    label: "静安区" },
  {
    value: "310107",
    label: "普陀区" },
  {
    value: "310108",
    label: "闸北区" },
  {
    value: "310109",
    label: "虹口区" },
  {
    value: "310110",
    label: "杨浦区" },
  {
    value: "310112",
    label: "闵行区" },
  {
    value: "310113",
    label: "宝山区" },
  {
    value: "310114",
    label: "嘉定区" },
  {
    value: "310115",
    label: "浦东新区" },
  {
    value: "310116",
    label: "金山区" },
  {
    value: "310117",
    label: "松江区" },
  {
    value: "310118",
    label: "青浦区" },
  {
    value: "310119",
    label: "南汇区" },
  {
    value: "310120",
    label: "奉贤区" },
  {
    value: "310152",
    label: "川沙区" },
  {
    value: "310230",
    label: "崇明县" },
  {
    value: "310231",
    label: "其它区" }] },

{
  value: '320000',
  label: '江苏省',
  children: [{
    value: "320100",
    label: "南京市" },
  {
    value: "320200",
    label: "无锡市" },
  {
    value: "320300",
    label: "徐州市" },
  {
    value: "320400",
    label: "常州市" },
  {
    value: "320500",
    label: "苏州市" },
  {
    value: "320600",
    label: "南通市" },
  {
    value: "320700",
    label: "连云港市" },
  {
    value: "320800",
    label: "淮安市" },
  {
    value: "320900",
    label: "盐城市" },
  {
    value: "321000",
    label: "扬州市" },
  {
    value: "321100",
    label: "镇江市" },
  {
    value: "321200",
    label: "泰州市" },
  {
    value: "321300",
    label: "宿迁市" }] },

{
  value: '330000',
  label: '浙江省',
  children: [{
    value: "330100",
    label: "杭州市" },
  {
    value: "330200",
    label: "宁波市" },
  {
    value: "330300",
    label: "温州市" },
  {
    value: "330400",
    label: "嘉兴市" },
  {
    value: "330500",
    label: "湖州市" },
  {
    value: "330600",
    label: "绍兴市" },
  {
    value: "330700",
    label: "金华市" },
  {
    value: "330800",
    label: "衢州市" },
  {
    value: "330900",
    label: "舟山市" },
  {
    value: "331000",
    label: "台州市" },
  {
    value: "331100",
    label: "丽水市" }] },

{
  value: '340000',
  label: '安徽省',
  children: [{
    value: "340100",
    label: "合肥市" },
  {
    value: "340200",
    label: "芜湖市" },
  {
    value: "340300",
    label: "蚌埠市" },
  {
    value: "340400",
    label: "淮南市" },
  {
    value: "340500",
    label: "马鞍山市" },
  {
    value: "340600",
    label: "淮北市" },
  {
    value: "340700",
    label: "铜陵市" },
  {
    value: "340800",
    label: "安庆市" },
  {
    value: "341000",
    label: "黄山市" },
  {
    value: "341100",
    label: "滁州市" },
  {
    value: "341200",
    label: "阜阳市" },
  {
    value: "341300",
    label: "宿州市" },
  {
    value: "341500",
    label: "六安市" },
  {
    value: "341600",
    label: "亳州市" },
  {
    value: "341700",
    label: "池州市" },
  {
    value: "341800",
    label: "宣城市" }] },

{
  value: '350000',
  label: '福建省',
  children: [{
    value: "350100",
    label: "福州市" },
  {
    value: "350200",
    label: "厦门市" },
  {
    value: "350300",
    label: "莆田市" },
  {
    value: "350400",
    label: "三明市" },
  {
    value: "350500",
    label: "泉州市" },
  {
    value: "350600",
    label: "漳州市" },
  {
    value: "350700",
    label: "南平市" },
  {
    value: "350800",
    label: "龙岩市" },
  {
    value: "350900",
    label: "宁德市" }] },

{
  value: '360000',
  label: '江西省',
  children: [{
    value: "360100",
    label: "南昌市" },
  {
    value: "360200",
    label: "景德镇市" },
  {
    value: "360300",
    label: "萍乡市" },
  {
    value: "360400",
    label: "九江市" },
  {
    value: "360500",
    label: "新余市" },
  {
    value: "360600",
    label: "鹰潭市" },
  {
    value: "360700",
    label: "赣州市" },
  {
    value: "360800",
    label: "吉安市" },
  {
    value: "360900",
    label: "宜春市" },
  {
    value: "361000",
    label: "抚州市" },
  {
    value: "361100",
    label: "上饶市" }] },

{
  value: '370000',
  label: '山东省',
  children: [{
    value: "370100",
    label: "济南市" },
  {
    value: "370200",
    label: "青岛市" },
  {
    value: "370300",
    label: "淄博市" },
  {
    value: "370400",
    label: "枣庄市" },
  {
    value: "370500",
    label: "东营市" },
  {
    value: "370600",
    label: "烟台市" },
  {
    value: "370700",
    label: "潍坊市" },
  {
    value: "370800",
    label: "济宁市" },
  {
    value: "370900",
    label: "泰安市" },
  {
    value: "371000",
    label: "威海市" },
  {
    value: "371100",
    label: "日照市" },
  {
    value: "371200",
    label: "莱芜市" },
  {
    value: "371300",
    label: "临沂市" },
  {
    value: "371400",
    label: "德州市" },
  {
    value: "371500",
    label: "聊城市" },
  {
    value: "371600",
    label: "滨州市" },
  {
    value: "371700",
    label: "菏泽市" }] },

{
  value: '410000',
  label: '河南省',
  children: [{
    value: "410100",
    label: "郑州市" },
  {
    value: "410200",
    label: "开封市" },
  {
    value: "410300",
    label: "洛阳市" },
  {
    value: "410400",
    label: "平顶山市" },
  {
    value: "410500",
    label: "安阳市" },
  {
    value: "410600",
    label: "鹤壁市" },
  {
    value: "410700",
    label: "新乡市" },
  {
    value: "410800",
    label: "焦作市" },
  {
    value: "410881",
    label: "济源市" },
  {
    value: "410900",
    label: "濮阳市" },
  {
    value: "411000",
    label: "许昌市" },
  {
    value: "411100",
    label: "漯河市" },
  {
    value: "411200",
    label: "三门峡市" },
  {
    value: "411300",
    label: "南阳市" },
  {
    value: "411400",
    label: "商丘市" },
  {
    value: "411500",
    label: "信阳市" },
  {
    value: "411600",
    label: "周口市" },
  {
    value: "411700",
    label: "驻马店市" }] },

{
  value: '420000',
  label: '湖北省',
  children: [{
    value: "420100",
    label: "武汉市" },
  {
    value: "420200",
    label: "黄石市" },
  {
    value: "420300",
    label: "十堰市" },
  {
    value: "420500",
    label: "宜昌市" },
  {
    value: "420600",
    label: "襄阳市" },
  {
    value: "420700",
    label: "鄂州市" },
  {
    value: "420800",
    label: "荆门市" },
  {
    value: "420900",
    label: "孝感市" },
  {
    value: "421000",
    label: "荆州市" },
  {
    value: "421100",
    label: "黄冈市" },
  {
    value: "421200",
    label: "咸宁市" },
  {
    value: "421300",
    label: "随州市" },
  {
    value: "422800",
    label: "恩施土家族苗族自治州" },
  {
    value: "429004",
    label: "仙桃市" },
  {
    value: "429005",
    label: "潜江市" },
  {
    value: "429006",
    label: "天门市" },
  {
    value: "429021",
    label: "神农架林区" }] },

{
  value: '430000',
  label: '湖南省',
  children: [{
    value: "430100",
    label: "长沙市" },
  {
    value: "430200",
    label: "株洲市" },
  {
    value: "430300",
    label: "湘潭市" },
  {
    value: "430400",
    label: "衡阳市" },
  {
    value: "430500",
    label: "邵阳市" },
  {
    value: "430600",
    label: "岳阳市" },
  {
    value: "430700",
    label: "常德市" },
  {
    value: "430800",
    label: "张家界市" },
  {
    value: "430900",
    label: "益阳市" },
  {
    value: "431000",
    label: "郴州市" },
  {
    value: "431100",
    label: "永州市" },
  {
    value: "431200",
    label: "怀化市" },
  {
    value: "431300",
    label: "娄底市" },
  {
    value: "433100",
    label: "湘西土家族苗族自治州" }] },

{
  value: '440000',
  label: '广东省',
  children: [{
    value: "440100",
    label: "广州市" },
  {
    value: "440200",
    label: "韶关市" },
  {
    value: "440300",
    label: "深圳市" },
  {
    value: "440400",
    label: "珠海市" },
  {
    value: "440500",
    label: "汕头市" },
  {
    value: "440600",
    label: "佛山市" },
  {
    value: "440700",
    label: "江门市" },
  {
    value: "440800",
    label: "湛江市" },
  {
    value: "440900",
    label: "茂名市" },
  {
    value: "441200",
    label: "肇庆市" },
  {
    value: "441300",
    label: "惠州市" },
  {
    value: "441400",
    label: "梅州市" },
  {
    value: "441500",
    label: "汕尾市" },
  {
    value: "441600",
    label: "河源市" },
  {
    value: "441700",
    label: "阳江市" },
  {
    value: "441800",
    label: "清远市" },
  {
    value: "441900",
    label: "东莞市" },
  {
    value: "442000",
    label: "中山市" },
  {
    value: "445100",
    label: "潮州市" },
  {
    value: "445200",
    label: "揭阳市" },
  {
    value: "445300",
    label: "云浮市" }] },

{
  value: '450000',
  label: '广西壮族',
  children: [{
    value: "450100",
    label: "南宁市" },
  {
    value: "450200",
    label: "柳州市" },
  {
    value: "450300",
    label: "桂林市" },
  {
    value: "450400",
    label: "梧州市" },
  {
    value: "450500",
    label: "北海市" },
  {
    value: "450600",
    label: "防城港市" },
  {
    value: "450700",
    label: "钦州市" },
  {
    value: "450800",
    label: "贵港市" },
  {
    value: "450900",
    label: "玉林市" },
  {
    value: "451000",
    label: "百色市" },
  {
    value: "451100",
    label: "贺州市" },
  {
    value: "451200",
    label: "河池市" },
  {
    value: "451300",
    label: "来宾市" },
  {
    value: "451400",
    label: "崇左市" }] },

{
  value: '460000',
  label: '海南省',
  children: [{
    value: "460100",
    label: "海口市" },
  {
    value: "460200",
    label: "三亚市" },
  {
    value: "469001",
    label: "五指山市" },
  {
    value: "469002",
    label: "琼海市" },
  {
    value: "469003",
    label: "儋州市" },
  {
    value: "469005",
    label: "文昌市" },
  {
    value: "469006",
    label: "万宁市" },
  {
    value: "469007",
    label: "东方市" },
  {
    value: "469025",
    label: "定安县" },
  {
    value: "469026",
    label: "屯昌县" },
  {
    value: "469027",
    label: "澄迈县" },
  {
    value: "469028",
    label: "临高县" },
  {
    value: "469030",
    label: "白沙黎族自治县" },
  {
    value: "469031",
    label: "昌江黎族自治县" },
  {
    value: "469033",
    label: "乐东黎族自治县" },
  {
    value: "469034",
    label: "陵水黎族自治县" },
  {
    value: "469035",
    label: "保亭黎族苗族自治县" },
  {
    value: "469036",
    label: "琼中黎族苗族自治县" },
  {
    value: "469037",
    label: "西沙群岛" },
  {
    value: "469038",
    label: "南沙群岛" },
  {
    value: "469039",
    label: "中沙群岛的岛礁及其海域" }] },

{
  value: '500000',
  label: '重庆',
  children: [{
    value: "500101",
    label: "万州区" },
  {
    value: "500102",
    label: "涪陵区" },
  {
    value: "500103",
    label: "渝中区" },
  {
    value: "500104",
    label: "大渡口区" },
  {
    value: "500105",
    label: "江北区" },
  {
    value: "500106",
    label: "沙坪坝区" },
  {
    value: "500107",
    label: "九龙坡区" },
  {
    value: "500108",
    label: "南岸区" },
  {
    value: "500109",
    label: "北碚区" },
  {
    value: "500110",
    label: "万盛区" },
  {
    value: "500111",
    label: "双桥区" },
  {
    value: "500112",
    label: "渝北区" },
  {
    value: "500113",
    label: "巴南区" },
  {
    value: "500114",
    label: "黔江区" },
  {
    value: "500115",
    label: "长寿区" },
  {
    value: "500222",
    label: "綦江县" },
  {
    value: "500223",
    label: "潼南县" },
  {
    value: "500224",
    label: "铜梁县" },
  {
    value: "500225",
    label: "大足县" },
  {
    value: "500226",
    label: "荣昌县" },
  {
    value: "500227",
    label: "璧山县" },
  {
    value: "500228",
    label: "梁平县" },
  {
    value: "500229",
    label: "城口县" },
  {
    value: "500230",
    label: "丰都县" },
  {
    value: "500231",
    label: "垫江县" },
  {
    value: "500232",
    label: "武隆县" },
  {
    value: "500233",
    label: "忠县" },
  {
    value: "500234",
    label: "开县" },
  {
    value: "500235",
    label: "云阳县" },
  {
    value: "500236",
    label: "奉节县" },
  {
    value: "500237",
    label: "巫山县" },
  {
    value: "500238",
    label: "巫溪县" },
  {
    value: "500240",
    label: "石柱土家族自治县" },
  {
    value: "500241",
    label: "秀山土家族苗族自治县" },
  {
    value: "500242",
    label: "酉阳土家族苗族自治县" },
  {
    value: "500243",
    label: "彭水苗族土家族自治县" },
  {
    value: "500381",
    label: "江津区" },
  {
    value: "500382",
    label: "合川区" },
  {
    value: "500383",
    label: "永川区" },
  {
    value: "500384",
    label: "南川区" },
  {
    value: "500385",
    label: "其它区" }] },

{
  value: '510000',
  label: '四川省',
  children: [{
    value: "510100",
    label: "成都市" },
  {
    value: "510300",
    label: "自贡市" },
  {
    value: "510400",
    label: "攀枝花市" },
  {
    value: "510500",
    label: "泸州市" },
  {
    value: "510600",
    label: "德阳市" },
  {
    value: "510700",
    label: "绵阳市" },
  {
    value: "510800",
    label: "广元市" },
  {
    value: "510900",
    label: "遂宁市" },
  {
    value: "511000",
    label: "内江市" },
  {
    value: "511100",
    label: "乐山市" },
  {
    value: "511300",
    label: "南充市" },
  {
    value: "511400",
    label: "眉山市" },
  {
    value: "511500",
    label: "宜宾市" },
  {
    value: "511600",
    label: "广安市" },
  {
    value: "511700",
    label: "达州市" },
  {
    value: "511800",
    label: "雅安市" },
  {
    value: "511900",
    label: "巴中市" },
  {
    value: "512000",
    label: "资阳市" },
  {
    value: "513200",
    label: "阿坝藏族羌族自治州" },
  {
    value: "513300",
    label: "甘孜藏族自治州" },
  {
    value: "513400",
    label: "凉山彝族自治州" }] },

{
  value: '520000',
  label: '贵州省',
  children: [{
    value: "520100",
    label: "贵阳市" },
  {
    value: "520200",
    label: "六盘水市" },
  {
    value: "520300",
    label: "遵义市" },
  {
    value: "520400",
    label: "安顺市" },
  {
    value: "522200",
    label: "铜仁地区" },
  {
    value: "522300",
    label: "黔西南布依族苗族自治州" },
  {
    value: "522400",
    label: "毕节地区" },
  {
    value: "522600",
    label: "黔东南苗族侗族自治州" },
  {
    value: "522700",
    label: "黔南布依族苗族自治州" }] },

{
  value: '530000',
  label: '云南省',
  children: [{
    value: "530100",
    label: "昆明市" },
  {
    value: "530300",
    label: "曲靖市" },
  {
    value: "530400",
    label: "玉溪市" },
  {
    value: "530500",
    label: "保山市" },
  {
    value: "530600",
    label: "昭通市" },
  {
    value: "530700",
    label: "丽江市" },
  {
    value: "530800",
    label: "普洱市" },
  {
    value: "530900",
    label: "临沧市" },
  {
    value: "532300",
    label: "楚雄彝族自治州" },
  {
    value: "532500",
    label: "红河哈尼族彝族自治州" },
  {
    value: "532600",
    label: "文山壮族苗族自治州" },
  {
    value: "532800",
    label: "西双版纳傣族自治州" },
  {
    value: "532900",
    label: "大理白族自治州" },
  {
    value: "533100",
    label: "德宏傣族景颇族自治州" },
  {
    value: "533300",
    label: "怒江傈僳族自治州" },
  {
    value: "533400",
    label: "迪庆藏族自治州" }] },

{
  value: '540000',
  label: '西藏',
  children: [{
    value: "540100",
    label: "拉萨市" },
  {
    value: "542100",
    label: "昌都地区" },
  {
    value: "542200",
    label: "山南地区" },
  {
    value: "542300",
    label: "日喀则地区" },
  {
    value: "542400",
    label: "那曲地区" },
  {
    value: "542500",
    label: "阿里地区" },
  {
    value: "542600",
    label: "林芝地区" }] },

{
  value: '610000',
  label: '陕西省',
  children: [{
    value: "610100",
    label: "西安市" },
  {
    value: "610200",
    label: "铜川市" },
  {
    value: "610300",
    label: "宝鸡市" },
  {
    value: "610400",
    label: "咸阳市" },
  {
    value: "610500",
    label: "渭南市" },
  {
    value: "610600",
    label: "延安市" },
  {
    value: "610700",
    label: "汉中市" },
  {
    value: "610800",
    label: "榆林市" },
  {
    value: "610900",
    label: "安康市" },
  {
    value: "611000",
    label: "商洛市" }] },

{
  value: '620000',
  label: '甘肃省',
  children: [{
    value: "620100",
    label: "兰州市" },
  {
    value: "620200",
    label: "嘉峪关市" },
  {
    value: "620300",
    label: "金昌市" },
  {
    value: "620400",
    label: "白银市" },
  {
    value: "620500",
    label: "天水市" },
  {
    value: "620600",
    label: "武威市" },
  {
    value: "620700",
    label: "张掖市" },
  {
    value: "620800",
    label: "平凉市" },
  {
    value: "620900",
    label: "酒泉市" },
  {
    value: "621000",
    label: "庆阳市" },
  {
    value: "621100",
    label: "定西市" },
  {
    value: "621200",
    label: "陇南市" },
  {
    value: "622900",
    label: "临夏回族自治州" },
  {
    value: "623000",
    label: "甘南藏族自治州" }] },

{
  value: '630000',
  label: '青海省',
  children: [{
    value: "630100",
    label: "西宁市" },
  {
    value: "632100",
    label: "海东地区" },
  {
    value: "632200",
    label: "海北藏族自治州" },
  {
    value: "632300",
    label: "黄南藏族自治州" },
  {
    value: "632500",
    label: "海南藏族自治州" },
  {
    value: "632600",
    label: "果洛藏族自治州" },
  {
    value: "632700",
    label: "玉树藏族自治州" },
  {
    value: "632800",
    label: "海西蒙古族藏族自治州" }] },

{
  value: '640000',
  label: '宁夏',
  children: [{
    value: "640100",
    label: "银川市" },
  {
    value: "640200",
    label: "石嘴山市" },
  {
    value: "640300",
    label: "吴忠市" },
  {
    value: "640400",
    label: "固原市" },
  {
    value: "640500",
    label: "中卫市" }] },

{
  value: '650000',
  label: '新疆',
  children: [{
    value: "650100",
    label: "乌鲁木齐市" },
  {
    value: "650200",
    label: "克拉玛依市" },
  {
    value: "652100",
    label: "吐鲁番地区" },
  {
    value: "652200",
    label: "哈密地区" },
  {
    value: "652300",
    label: "昌吉回族自治州" },
  {
    value: "652700",
    label: "博尔塔拉蒙古自治州" },
  {
    value: "652800",
    label: "巴音郭楞蒙古自治州" },
  {
    value: "652900",
    label: "阿克苏地区" },
  {
    value: "653000",
    label: "克孜勒苏柯尔克孜自治州" },
  {
    value: "653100",
    label: "喀什地区" },
  {
    value: "653200",
    label: "和田地区" },
  {
    value: "654000",
    label: "伊犁哈萨克自治州" },
  {
    value: "654200",
    label: "塔城地区" },
  {
    value: "654300",
    label: "阿勒泰地区" },
  {
    value: "659001",
    label: "石河子市" },
  {
    value: "659002",
    label: "阿拉尔市" },
  {
    value: "659003",
    label: "图木舒克市" },
  {
    value: "659004",
    label: "五家渠市" }] },

{
  value: '710000',
  label: '台湾省',
  children: [{
    value: "710100",
    label: "台北市" },
  {
    value: "710200",
    label: "高雄市" },
  {
    value: "710300",
    label: "台南市" },
  {
    value: "710400",
    label: "台中市" },
  {
    value: "710500",
    label: "金门县" },
  {
    value: "710600",
    label: "南投县" },
  {
    value: "710700",
    label: "基隆市" },
  {
    value: "710800",
    label: "新竹市" },
  {
    value: "710900",
    label: "嘉义市" },
  {
    value: "711100",
    label: "新北市" },
  {
    value: "711200",
    label: "宜兰县" },
  {
    value: "711300",
    label: "新竹县" },
  {
    value: "711400",
    label: "桃园县" },
  {
    value: "711500",
    label: "苗栗县" },
  {
    value: "711700",
    label: "彰化县" },
  {
    value: "711900",
    label: "嘉义县" },
  {
    value: "712100",
    label: "云林县" },
  {
    value: "712400",
    label: "屏东县" },
  {
    value: "712500",
    label: "台东县" },
  {
    value: "712600",
    label: "花莲县" },
  {
    value: "712700",
    label: "澎湖县" }] },

{
  value: '810000',
  label: '香港',
  children: [{
    value: "810100",
    label: "香港岛" },
  {
    value: "810200",
    label: "九龙" },
  {
    value: "810300",
    label: "新界" }] },

{
  value: '820000',
  label: '澳门',
  children: [{
    value: "820100",
    label: "澳门半岛" },
  {
    value: "820200",
    label: "离岛" }] },

{
  value: '990000',
  label: '海外',
  children: [{
    value: "990100",
    label: "海外" }] }];exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\marked\\index.js":
/*!*************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/marked/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__(/*! ./lib/marked */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\marked\\lib\\marked.js");

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\marked\\lib\\marked.js":
/*!******************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/marked/lib/marked.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) { /**
               * marked - a markdown parser
               * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
               * https://github.com/markedjs/marked
               */

;(function (root) {
  'use strict';

  /**
                 * Block-Level Grammar
                 */

  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: noop,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    nptable: noop,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    table: noop,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
    text: /^[^\n]+/ };


  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).
  replace('label', block._label).
  replace('title', block._title).
  getRegex();

  block.bullet = /(?:[*+-]|\d+\.)/;
  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
  block.item = edit(block.item, 'gm').
  replace(/bull/g, block.bullet).
  getRegex();

  block.list = edit(block.list).
  replace(/bull/g, block.bullet).
  replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').
  replace('def', '\\n+(?=' + block.def.source + ')').
  getRegex();

  block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' +
  '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' +
  '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' +
  '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' +
  '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' +
  '|track|ul';
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit(block.html, 'i').
  replace('comment', block._comment).
  replace('tag', block._tag).
  replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).
  getRegex();

  block.paragraph = edit(block.paragraph).
  replace('hr', block.hr).
  replace('heading', block.heading).
  replace('lheading', block.lheading).
  replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

  block.blockquote = edit(block.blockquote).
  replace('paragraph', block.paragraph).
  getRegex();

  /**
               * Normal Block Grammar
               */

  block.normal = merge({}, block);

  /**
                                    * GFM Block Grammar
                                    */

  block.gfm = merge({}, block.normal, {
    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/ });


  block.gfm.paragraph = edit(block.paragraph).
  replace('(?!', '(?!' +
  block.gfm.fences.source.replace('\\1', '\\2') + '|' +
  block.list.source.replace('\\1', '\\3') + '|').
  getRegex();

  /**
               * GFM + Tables Block Grammar
               */

  block.tables = merge({}, block.gfm, {
    nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
    table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/ });


  /**
                                                                                        * Pedantic grammar
                                                                                        */

  block.pedantic = merge({}, block.normal, {
    html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)' +
    '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').
    replace('comment', block._comment).
    replace(/tag/g, '(?!(?:' +
    'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' +
    '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' +
    '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').
    getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/ });


  /**
                                                                                  * Block Lexer
                                                                                  */

  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || marked.defaults;
    this.rules = block.normal;

    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }

  /**
     * Expose Block Rules
     */

  Lexer.rules = block;

  /**
                        * Static Lex Method
                        */

  Lexer.lex = function (src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };

  /**
      * Preprocessing
      */

  Lexer.prototype.lex = function (src) {
    src = src.
    replace(/\r\n|\r/g, '\n').
    replace(/\t/g, '    ').
    replace(/\u00a0/g, ' ').
    replace(/\u2424/g, '\n');

    return this.token(src, true);
  };

  /**
      * Lexing
      */

  Lexer.prototype.token = function (src, top) {
    src = src.replace(/^ +$/gm, '');
    var next,
    loose,
    cap,
    bull,
    b,
    item,
    listStart,
    listItems,
    t,
    space,
    i,
    tag,
    l,
    isordered,
    istask,
    ischecked;

    while (src) {
      // newline
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: 'space' });

        }
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          text: !this.options.pedantic ?
          rtrim(cap, '\n') :
          cap });

        continue;
      }

      // fences (gfm)
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'code',
          lang: cap[2],
          text: cap[3] || '' });

        continue;
      }

      // heading
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[1].length,
          text: cap[2] });

        continue;
      }

      // table no leading pipe (gfm)
      if (top && (cap = this.rules.nptable.exec(src))) {
        item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [] };


        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(item.cells[i], item.header.length);
          }

          this.tokens.push(item);

          continue;
        }
      }

      // hr
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'hr' });

        continue;
      }

      // blockquote
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);

        this.tokens.push({
          type: 'blockquote_start' });


        cap = cap[0].replace(/^ *> ?/gm, '');

        // Pass `top` to keep the current
        // "toplevel" state. This is exactly
        // how markdown.pl works.
        this.token(cap, top);

        this.tokens.push({
          type: 'blockquote_end' });


        continue;
      }

      // list
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;

        listStart = {
          type: 'list_start',
          ordered: isordered,
          start: isordered ? +bull : '',
          loose: false };


        this.tokens.push(listStart);

        // Get each top-level item.
        cap = cap[0].match(this.rules.item);

        listItems = [];
        next = false;
        l = cap.length;
        i = 0;

        for (; i < l; i++) {
          item = cap[i];

          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) +/, '');

          // Outdent whatever the
          // list item contains. Hacky.
          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ?
            item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') :
            item.replace(/^ {1,4}/gm, '');
          }

          // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.
          if (this.options.smartLists && i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
              src = cap.slice(i + 1).join('\n') + src;
              i = l - 1;
            }
          }

          // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            listStart.loose = true;
          }

          // Check for task list items
          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;
          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          t = {
            type: 'list_item_start',
            task: istask,
            checked: ischecked,
            loose: loose };


          listItems.push(t);
          this.tokens.push(t);

          // Recurse.
          this.token(item, false);

          this.tokens.push({
            type: 'list_item_end' });

        }

        if (listStart.loose) {
          l = listItems.length;
          i = 0;
          for (; i < l; i++) {
            listItems[i].loose = true;
          }
        }

        this.tokens.push({
          type: 'list_end' });


        continue;
      }

      // html
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ?
          'paragraph' :
          'html',
          pre: !this.options.sanitizer && (
          cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: cap[0] });

        continue;
      }

      // def
      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3] };

        }
        continue;
      }

      // table (gfm)
      if (top && (cap = this.rules.table.exec(src))) {
        item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/(?: *\| *)?\n$/, '').split('\n') : [] };


        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
          }

          this.tokens.push(item);

          continue;
        }
      }

      // lheading
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[2] === '=' ? 1 : 2,
          text: cap[1] });

        continue;
      }

      // top-level paragraph
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'paragraph',
          text: cap[1].charAt(cap[1].length - 1) === '\n' ?
          cap[1].slice(0, -1) :
          cap[1] });

        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        // Top-level should never reach here.
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'text',
          text: cap[0] });

        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return this.tokens;
  };

  /**
      * Inline-Level Grammar
      */

  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noop,
    tag: '^comment' +
    '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
    link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
    em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
    code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noop,
    text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/ };


  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).
  replace('scheme', inline._scheme).
  replace('email', inline._email).
  getRegex();

  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

  inline.tag = edit(inline.tag).
  replace('comment', block._comment).
  replace('attribute', inline._attribute).
  getRegex();

  inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
  inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

  inline.link = edit(inline.link).
  replace('label', inline._label).
  replace('href', inline._href).
  replace('title', inline._title).
  getRegex();

  inline.reflink = edit(inline.reflink).
  replace('label', inline._label).
  getRegex();

  /**
               * Normal Inline Grammar
               */

  inline.normal = merge({}, inline);

  /**
                                      * Pedantic Inline Grammar
                                      */

  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
    link: edit(/^!?\[(label)\]\((.*?)\)/).
    replace('label', inline._label).
    getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).
    replace('label', inline._label).
    getRegex() });


  /**
                    * GFM Inline Grammar
                    */

  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace('])', '~|])').getRegex(),
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).
    replace('email', inline._email).
    getRegex(),
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: edit(inline.text).
    replace(']|', '~]|').
    replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|').
    getRegex() });


  /**
                    * GFM + Line Breaks Inline Grammar
                    */

  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace('{2,}', '*').getRegex(),
    text: edit(inline.gfm.text).replace('{2,}', '*').getRegex() });


  /**
                                                                     * Inline Lexer & Compiler
                                                                     */

  function InlineLexer(links, options) {
    this.options = options || marked.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;

    if (!this.links) {
      throw new Error('Tokens array requires a `links` property.');
    }

    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
  }

  /**
     * Expose Inline Rules
     */

  InlineLexer.rules = inline;

  /**
                               * Static Lexing/Compiling Method
                               */

  InlineLexer.output = function (src, links, options) {
    var inline = new InlineLexer(links, options);
    return inline.output(src);
  };

  /**
      * Lexing/Compiling
      */

  InlineLexer.prototype.output = function (src) {
    var out = '',
    link,
    text,
    href,
    title,
    cap,
    prevCapZero;

    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += cap[1];
        continue;
      }

      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = escape(this.mangle(cap[1]));
          href = 'mailto:' + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = escape(cap[0]);
          href = 'mailto:' + text;
        } else {
          text = escape(cap[0]);
          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }
        out += this.renderer.link(href, null, text);
        continue;
      }

      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize ?
        this.options.sanitizer ?
        this.options.sanitizer(cap[0]) :
        escape(cap[0]) :
        cap[0];
        continue;
      }

      // link
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];
        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }
        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        out += this.outputLink(cap, {
          href: InlineLexer.escapes(href),
          title: InlineLexer.escapes(title) });

        this.inLink = false;
        continue;
      }

      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src)) || (
      cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
        continue;
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2].trim(), true));
        continue;
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.text(escape(this.smartypants(cap[0])));
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return out;
  };

  InlineLexer.escapes = function (text) {
    return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
  };

  /**
      * Compile Link
      */

  InlineLexer.prototype.outputLink = function (cap, link) {
    var href = link.href,
    title = link.title ? escape(link.title) : null;

    return cap[0].charAt(0) !== '!' ?
    this.renderer.link(href, title, this.output(cap[1])) :
    this.renderer.image(href, title, escape(cap[1]));
  };

  /**
      * Smartypants Transformations
      */

  InlineLexer.prototype.smartypants = function (text) {
    if (!this.options.smartypants) return text;
    return text
    // em-dashes
    .replace(/---/g, "\u2014")
    // en-dashes
    .replace(/--/g, "\u2013")
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018")
    // closing singles & apostrophes
    .replace(/'/g, "\u2019")
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C")
    // closing doubles
    .replace(/"/g, "\u201D")
    // ellipses
    .replace(/\.{3}/g, "\u2026");
  };

  /**
      * Mangle Links
      */

  InlineLexer.prototype.mangle = function (text) {
    if (!this.options.mangle) return text;
    var out = '',
    l = text.length,
    i = 0,
    ch;

    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }

    return out;
  };

  /**
      * Renderer
      */

  function Renderer(options) {
    this.options = options || marked.defaults;
  }

  Renderer.prototype.code = function (code, lang, escaped) {
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>' + (
      escaped ? code : escape(code, true)) +
      '</code></pre>';
    }

    return '<pre><code class="' +
    this.options.langPrefix +
    escape(lang, true) +
    '">' + (
    escaped ? code : escape(code, true)) +
    '</code></pre>\n';
  };

  Renderer.prototype.blockquote = function (quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  };

  Renderer.prototype.html = function (html) {
    return html;
  };

  Renderer.prototype.heading = function (text, level, raw) {
    if (this.options.headerIds) {
      return '<h' +
      level +
      ' id="' +
      this.options.headerPrefix +
      raw.toLowerCase().replace(/[^\w]+/g, '-') +
      '">' +
      text +
      '</h' +
      level +
      '>\n';
    }
    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  Renderer.prototype.hr = function () {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  };

  Renderer.prototype.list = function (body, ordered, start) {
    var type = ordered ? 'ol' : 'ul',
    startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  };

  Renderer.prototype.listitem = function (text) {
    return '<li>' + text + '</li>\n';
  };

  Renderer.prototype.checkbox = function (checked) {
    return '<input ' + (
    checked ? 'checked="" ' : '') +
    'disabled="" type="checkbox"' + (
    this.options.xhtml ? ' /' : '') +
    '> ';
  };

  Renderer.prototype.paragraph = function (text) {
    return '<p>' + text + '</p>\n';
  };

  Renderer.prototype.table = function (header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';

    return '<table>\n' +
    '<thead>\n' +
    header +
    '</thead>\n' +
    body +
    '</table>\n';
  };

  Renderer.prototype.tablerow = function (content) {
    return '<tr>\n' + content + '</tr>\n';
  };

  Renderer.prototype.tablecell = function (content, flags) {
    var type = flags.header ? 'th' : 'td';
    var tag = flags.align ?
    '<' + type + ' align="' + flags.align + '">' :
    '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  };

  // span level renderer
  Renderer.prototype.strong = function (text) {
    return '<strong>' + text + '</strong>';
  };

  Renderer.prototype.em = function (text) {
    return '<em>' + text + '</em>';
  };

  Renderer.prototype.codespan = function (text) {
    return '<code>' + text + '</code>';
  };

  Renderer.prototype.br = function () {
    return this.options.xhtml ? '<br/>' : '<br>';
  };

  Renderer.prototype.del = function (text) {
    return '<del>' + text + '</del>';
  };

  Renderer.prototype.link = function (href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).
        replace(/[^\w:]/g, '').
        toLowerCase();
      } catch (e) {
        return text;
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return text;
      }
    }
    if (this.options.baseUrl && !originIndependentUrl.test(href)) {
      href = resolveUrl(this.options.baseUrl, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return text;
    }
    var out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  Renderer.prototype.image = function (href, title, text) {
    if (this.options.baseUrl && !originIndependentUrl.test(href)) {
      href = resolveUrl(this.options.baseUrl, href);
    }
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  };

  Renderer.prototype.text = function (text) {
    return text;
  };

  /**
      * TextRenderer
      * returns only the textual part of the token
      */

  function TextRenderer() {}

  // no need for block level renderers

  TextRenderer.prototype.strong =
  TextRenderer.prototype.em =
  TextRenderer.prototype.codespan =
  TextRenderer.prototype.del =
  TextRenderer.prototype.text = function (text) {
    return text;
  };

  TextRenderer.prototype.link =
  TextRenderer.prototype.image = function (href, title, text) {
    return '' + text;
  };

  TextRenderer.prototype.br = function () {
    return '';
  };

  /**
      * Parsing & Compiling
      */

  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
  }

  /**
     * Static Parse Method
     */

  Parser.parse = function (src, options) {
    var parser = new Parser(options);
    return parser.parse(src);
  };

  /**
      * Parse Loop
      */

  Parser.prototype.parse = function (src) {
    this.inline = new InlineLexer(src.links, this.options);
    // use an InlineLexer with a TextRenderer to extract pure text
    this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, { renderer: new TextRenderer() }));

    this.tokens = src.reverse();

    var out = '';
    while (this.next()) {
      out += this.tok();
    }

    return out;
  };

  /**
      * Next Token
      */

  Parser.prototype.next = function () {
    return this.token = this.tokens.pop();
  };

  /**
      * Preview Next Token
      */

  Parser.prototype.peek = function () {
    return this.tokens[this.tokens.length - 1] || 0;
  };

  /**
      * Parse Text Tokens
      */

  Parser.prototype.parseText = function () {
    var body = this.token.text;

    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }

    return this.inline.output(body);
  };

  /**
      * Parse Current Token
      */

  Parser.prototype.tok = function () {
    switch (this.token.type) {
      case 'space':{
          return '';
        }
      case 'hr':{
          return this.renderer.hr();
        }
      case 'heading':{
          return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          unescape(this.inlineText.output(this.token.text)));
        }
      case 'code':{
          return this.renderer.code(this.token.text,
          this.token.lang,
          this.token.escaped);
        }
      case 'table':{
          var header = '',
          body = '',
          i,
          row,
          cell,
          j;

          // header
          cell = '';
          for (i = 0; i < this.token.header.length; i++) {
            cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            { header: true, align: this.token.align[i] });

          }
          header += this.renderer.tablerow(cell);

          for (i = 0; i < this.token.cells.length; i++) {
            row = this.token.cells[i];

            cell = '';
            for (j = 0; j < row.length; j++) {
              cell += this.renderer.tablecell(
              this.inline.output(row[j]),
              { header: false, align: this.token.align[j] });

            }

            body += this.renderer.tablerow(cell);
          }
          return this.renderer.table(header, body);
        }
      case 'blockquote_start':{
          body = '';

          while (this.next().type !== 'blockquote_end') {
            body += this.tok();
          }

          return this.renderer.blockquote(body);
        }
      case 'list_start':{
          body = '';
          var ordered = this.token.ordered,
          start = this.token.start;

          while (this.next().type !== 'list_end') {
            body += this.tok();
          }

          return this.renderer.list(body, ordered, start);
        }
      case 'list_item_start':{
          body = '';
          var loose = this.token.loose;

          if (this.token.task) {
            body += this.renderer.checkbox(this.token.checked);
          }

          while (this.next().type !== 'list_item_end') {
            body += !loose && this.token.type === 'text' ?
            this.parseText() :
            this.tok();
          }

          return this.renderer.listitem(body);
        }
      case 'html':{
          // TODO parse inline content if parameter markdown=1
          return this.renderer.html(this.token.text);
        }
      case 'paragraph':{
          return this.renderer.paragraph(this.inline.output(this.token.text));
        }
      case 'text':{
          return this.renderer.paragraph(this.parseText());
        }}

  };

  /**
      * Helpers
      */

  function escape(html, encode) {
    return html.
    replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;').
    replace(/"/g, '&quot;').
    replace(/'/g, '&#39;');
  }

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ?
        String.fromCharCode(parseInt(n.substring(2), 16)) :
        String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }

  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    return {
      replace: function replace(name, val) {
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return this;
      },
      getRegex: function getRegex() {
        return new RegExp(regex, opt);
      } };

  }

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (/^[^:]+:\/*[^/]*$/.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }
    base = baseUrls[' ' + base];

    if (href.slice(0, 2) === '//') {
      return base.replace(/:[\s\S]*/, ':') + href;
    } else if (href.charAt(0) === '/') {
      return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
    } else {
      return base + href;
    }
  }
  var baseUrls = {};
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function noop() {}
  noop.exec = noop;

  function merge(obj) {
    var i = 1,
    target,
    key;

    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
      curr = offset;
      while (--curr >= 0 && str[curr] === '\\') {escaped = !escaped;}
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/),
    i = 0;

    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) {cells.push('');}
    }

    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }
    return cells;
  }

  // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.
  function rtrim(str, c, invert) {
    if (str.length === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    var suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < str.length) {
      var currChar = str.charAt(str.length - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, str.length - suffLen);
  }

  /**
     * Marked
     */

  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' +
      Object.prototype.toString.call(src) + ', string expected');
    }

    if (callback || typeof opt === 'function') {
      if (!callback) {
        callback = opt;
        opt = null;
      }

      opt = merge({}, marked.defaults, opt || {});

      var highlight = opt.highlight,
      tokens,
      pending,
      i = 0;

      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      pending = tokens.length;

      var done = function done(err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }

        var out;

        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }

        opt.highlight = highlight;

        return err ?
        callback(err) :
        callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;

      if (!pending) return done();

      for (; i < tokens.length; i++) {
        (function (token) {
          if (token.type !== 'code') {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function (err, code) {
            if (err) return done(err);
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }

      return;
    }
    try {
      if (opt) opt = merge({}, marked.defaults, opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if ((opt || marked.defaults).silent) {
        return '<p>An error occurred:</p><pre>' +
        escape(e.message + '', true) +
        '</pre>';
      }
      throw e;
    }
  }

  /**
     * Options
     */

  marked.options =
  marked.setOptions = function (opt) {
    merge(marked.defaults, opt);
    return marked;
  };

  marked.getDefaults = function () {
    return {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      renderer: new Renderer(),
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tables: true,
      xhtml: false };

  };

  marked.defaults = marked.getDefaults();

  /**
                                           * Expose
                                           */

  marked.Parser = Parser;
  marked.parser = Parser.parse;

  marked.Renderer = Renderer;
  marked.TextRenderer = TextRenderer;

  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;

  marked.InlineLexer = InlineLexer;
  marked.inlineLexer = InlineLexer.output;

  marked.parse = marked;

  if (true) {
    module.exports = marked;
  } else {}
})(void 0 || (typeof window !== 'undefined' ? window : global));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-citypicker\\city-data\\area.js":
/*!********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-citypicker/city-data/area.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "4" },
{
  "label": "西城区",
  "value": "5" },
{
  "label": "朝阳区",
  "value": "6" },
{
  "label": "丰台区",
  "value": "7" },
{
  "label": "石景山区",
  "value": "8" },
{
  "label": "海淀区",
  "value": "9" },
{
  "label": "门头沟区",
  "value": "10" },
{
  "label": "房山区",
  "value": "11" },
{
  "label": "通州区",
  "value": "12" },
{
  "label": "顺义区",
  "value": "13" },
{
  "label": "昌平区",
  "value": "14" },
{
  "label": "大兴区",
  "value": "15" },
{
  "label": "怀柔区",
  "value": "16" },
{
  "label": "平谷区",
  "value": "17" },
{
  "label": "密云区",
  "value": "18" },
{
  "label": "延庆区",
  "value": "19" }]],


[
[{
  "label": "和平区",
  "value": "22" },
{
  "label": "河东区",
  "value": "23" },
{
  "label": "河西区",
  "value": "24" },
{
  "label": "南开区",
  "value": "25" },
{
  "label": "河北区",
  "value": "26" },
{
  "label": "红桥区",
  "value": "27" },
{
  "label": "东丽区",
  "value": "28" },
{
  "label": "西青区",
  "value": "29" },
{
  "label": "津南区",
  "value": "30" },
{
  "label": "北辰区",
  "value": "31" },
{
  "label": "武清区",
  "value": "32" },
{
  "label": "宝坻区",
  "value": "33" },
{
  "label": "滨海新区",
  "value": "34" },
{
  "label": "宁河区",
  "value": "35" },
{
  "label": "静海区",
  "value": "36" },
{
  "label": "蓟州区",
  "value": "37" }]],


[
[{
  "label": "市辖区",
  "value": "40" },
{
  "label": "长安区",
  "value": "41" },
{
  "label": "桥西区",
  "value": "42" },
{
  "label": "新华区",
  "value": "43" },
{
  "label": "井陉矿区",
  "value": "44" },
{
  "label": "裕华区",
  "value": "45" },
{
  "label": "藁城区",
  "value": "46" },
{
  "label": "鹿泉区",
  "value": "47" },
{
  "label": "栾城区",
  "value": "48" },
{
  "label": "井陉县",
  "value": "49" },
{
  "label": "正定县",
  "value": "50" },
{
  "label": "行唐县",
  "value": "51" },
{
  "label": "灵寿县",
  "value": "52" },
{
  "label": "高邑县",
  "value": "53" },
{
  "label": "深泽县",
  "value": "54" },
{
  "label": "赞皇县",
  "value": "55" },
{
  "label": "无极县",
  "value": "56" },
{
  "label": "平山县",
  "value": "57" },
{
  "label": "元氏县",
  "value": "58" },
{
  "label": "赵县",
  "value": "59" },
{
  "label": "晋州市",
  "value": "60" },
{
  "label": "新乐市",
  "value": "61" }],

[{
  "label": "市辖区",
  "value": "63" },
{
  "label": "路南区",
  "value": "64" },
{
  "label": "路北区",
  "value": "65" },
{
  "label": "古冶区",
  "value": "66" },
{
  "label": "开平区",
  "value": "67" },
{
  "label": "丰南区",
  "value": "68" },
{
  "label": "丰润区",
  "value": "69" },
{
  "label": "曹妃甸区",
  "value": "70" },
{
  "label": "滦县",
  "value": "71" },
{
  "label": "滦南县",
  "value": "72" },
{
  "label": "乐亭县",
  "value": "73" },
{
  "label": "迁西县",
  "value": "74" },
{
  "label": "玉田县",
  "value": "75" },
{
  "label": "遵化市",
  "value": "76" },
{
  "label": "迁安市",
  "value": "77" }],

[{
  "label": "市辖区",
  "value": "79" },
{
  "label": "海港区",
  "value": "80" },
{
  "label": "山海关区",
  "value": "81" },
{
  "label": "北戴河区",
  "value": "82" },
{
  "label": "抚宁区",
  "value": "83" },
{
  "label": "青龙满族自治县",
  "value": "84" },
{
  "label": "昌黎县",
  "value": "85" },
{
  "label": "卢龙县",
  "value": "86" }],

[{
  "label": "市辖区",
  "value": "88" },
{
  "label": "邯山区",
  "value": "89" },
{
  "label": "丛台区",
  "value": "90" },
{
  "label": "复兴区",
  "value": "91" },
{
  "label": "峰峰矿区",
  "value": "92" },
{
  "label": "邯郸县",
  "value": "93" },
{
  "label": "临漳县",
  "value": "94" },
{
  "label": "成安县",
  "value": "95" },
{
  "label": "大名县",
  "value": "96" },
{
  "label": "涉县",
  "value": "97" },
{
  "label": "磁县",
  "value": "98" },
{
  "label": "肥乡县",
  "value": "99" },
{
  "label": "永年县",
  "value": "100" },
{
  "label": "邱县",
  "value": "101" },
{
  "label": "鸡泽县",
  "value": "102" },
{
  "label": "广平县",
  "value": "103" },
{
  "label": "馆陶县",
  "value": "104" },
{
  "label": "魏县",
  "value": "105" },
{
  "label": "曲周县",
  "value": "106" },
{
  "label": "武安市",
  "value": "107" }],

[{
  "label": "市辖区",
  "value": "109" },
{
  "label": "桥东区",
  "value": "110" },
{
  "label": "桥西区",
  "value": "111" },
{
  "label": "邢台县",
  "value": "112" },
{
  "label": "临城县",
  "value": "113" },
{
  "label": "内丘县",
  "value": "114" },
{
  "label": "柏乡县",
  "value": "115" },
{
  "label": "隆尧县",
  "value": "116" },
{
  "label": "任县",
  "value": "117" },
{
  "label": "南和县",
  "value": "118" },
{
  "label": "宁晋县",
  "value": "119" },
{
  "label": "巨鹿县",
  "value": "120" },
{
  "label": "新河县",
  "value": "121" },
{
  "label": "广宗县",
  "value": "122" },
{
  "label": "平乡县",
  "value": "123" },
{
  "label": "威县",
  "value": "124" },
{
  "label": "清河县",
  "value": "125" },
{
  "label": "临西县",
  "value": "126" },
{
  "label": "南宫市",
  "value": "127" },
{
  "label": "沙河市",
  "value": "128" }],

[{
  "label": "市辖区",
  "value": "130" },
{
  "label": "竞秀区",
  "value": "131" },
{
  "label": "莲池区",
  "value": "132" },
{
  "label": "满城区",
  "value": "133" },
{
  "label": "清苑区",
  "value": "134" },
{
  "label": "徐水区",
  "value": "135" },
{
  "label": "涞水县",
  "value": "136" },
{
  "label": "阜平县",
  "value": "137" },
{
  "label": "定兴县",
  "value": "138" },
{
  "label": "唐县",
  "value": "139" },
{
  "label": "高阳县",
  "value": "140" },
{
  "label": "容城县",
  "value": "141" },
{
  "label": "涞源县",
  "value": "142" },
{
  "label": "望都县",
  "value": "143" },
{
  "label": "安新县",
  "value": "144" },
{
  "label": "易县",
  "value": "145" },
{
  "label": "曲阳县",
  "value": "146" },
{
  "label": "蠡县",
  "value": "147" },
{
  "label": "顺平县",
  "value": "148" },
{
  "label": "博野县",
  "value": "149" },
{
  "label": "雄县",
  "value": "150" },
{
  "label": "涿州市",
  "value": "151" },
{
  "label": "安国市",
  "value": "152" },
{
  "label": "高碑店市",
  "value": "153" }],

[{
  "label": "市辖区",
  "value": "155" },
{
  "label": "桥东区",
  "value": "156" },
{
  "label": "桥西区",
  "value": "157" },
{
  "label": "宣化区",
  "value": "158" },
{
  "label": "下花园区",
  "value": "159" },
{
  "label": "万全区",
  "value": "160" },
{
  "label": "崇礼区",
  "value": "161" },
{
  "label": "张北县",
  "value": "162" },
{
  "label": "康保县",
  "value": "163" },
{
  "label": "沽源县",
  "value": "164" },
{
  "label": "尚义县",
  "value": "165" },
{
  "label": "蔚县",
  "value": "166" },
{
  "label": "阳原县",
  "value": "167" },
{
  "label": "怀安县",
  "value": "168" },
{
  "label": "怀来县",
  "value": "169" },
{
  "label": "涿鹿县",
  "value": "170" },
{
  "label": "赤城县",
  "value": "171" }],

[{
  "label": "市辖区",
  "value": "173" },
{
  "label": "双桥区",
  "value": "174" },
{
  "label": "双滦区",
  "value": "175" },
{
  "label": "鹰手营子矿区",
  "value": "176" },
{
  "label": "承德县",
  "value": "177" },
{
  "label": "兴隆县",
  "value": "178" },
{
  "label": "平泉县",
  "value": "179" },
{
  "label": "滦平县",
  "value": "180" },
{
  "label": "隆化县",
  "value": "181" },
{
  "label": "丰宁满族自治县",
  "value": "182" },
{
  "label": "宽城满族自治县",
  "value": "183" },
{
  "label": "围场满族蒙古族自治县",
  "value": "184" }],

[{
  "label": "市辖区",
  "value": "186" },
{
  "label": "新华区",
  "value": "187" },
{
  "label": "运河区",
  "value": "188" },
{
  "label": "沧县",
  "value": "189" },
{
  "label": "青县",
  "value": "190" },
{
  "label": "东光县",
  "value": "191" },
{
  "label": "海兴县",
  "value": "192" },
{
  "label": "盐山县",
  "value": "193" },
{
  "label": "肃宁县",
  "value": "194" },
{
  "label": "南皮县",
  "value": "195" },
{
  "label": "吴桥县",
  "value": "196" },
{
  "label": "献县",
  "value": "197" },
{
  "label": "孟村回族自治县",
  "value": "198" },
{
  "label": "泊头市",
  "value": "199" },
{
  "label": "任丘市",
  "value": "200" },
{
  "label": "黄骅市",
  "value": "201" },
{
  "label": "河间市",
  "value": "202" }],

[{
  "label": "市辖区",
  "value": "204" },
{
  "label": "安次区",
  "value": "205" },
{
  "label": "广阳区",
  "value": "206" },
{
  "label": "固安县",
  "value": "207" },
{
  "label": "永清县",
  "value": "208" },
{
  "label": "香河县",
  "value": "209" },
{
  "label": "大城县",
  "value": "210" },
{
  "label": "文安县",
  "value": "211" },
{
  "label": "大厂回族自治县",
  "value": "212" },
{
  "label": "霸州市",
  "value": "213" },
{
  "label": "三河市",
  "value": "214" }],

[{
  "label": "市辖区",
  "value": "216" },
{
  "label": "桃城区",
  "value": "217" },
{
  "label": "冀州区",
  "value": "218" },
{
  "label": "枣强县",
  "value": "219" },
{
  "label": "武邑县",
  "value": "220" },
{
  "label": "武强县",
  "value": "221" },
{
  "label": "饶阳县",
  "value": "222" },
{
  "label": "安平县",
  "value": "223" },
{
  "label": "故城县",
  "value": "224" },
{
  "label": "景县",
  "value": "225" },
{
  "label": "阜城县",
  "value": "226" },
{
  "label": "深州市",
  "value": "227" }]],


[
[{
  "label": "市辖区",
  "value": "233" },
{
  "label": "小店区",
  "value": "234" },
{
  "label": "迎泽区",
  "value": "235" },
{
  "label": "杏花岭区",
  "value": "236" },
{
  "label": "尖草坪区",
  "value": "237" },
{
  "label": "万柏林区",
  "value": "238" },
{
  "label": "晋源区",
  "value": "239" },
{
  "label": "清徐县",
  "value": "240" },
{
  "label": "阳曲县",
  "value": "241" },
{
  "label": "娄烦县",
  "value": "242" },
{
  "label": "古交市",
  "value": "243" }],

[{
  "label": "市辖区",
  "value": "245" },
{
  "label": "城区",
  "value": "246" },
{
  "label": "矿区",
  "value": "247" },
{
  "label": "南郊区",
  "value": "248" },
{
  "label": "新荣区",
  "value": "249" },
{
  "label": "阳高县",
  "value": "250" },
{
  "label": "天镇县",
  "value": "251" },
{
  "label": "广灵县",
  "value": "252" },
{
  "label": "灵丘县",
  "value": "253" },
{
  "label": "浑源县",
  "value": "254" },
{
  "label": "左云县",
  "value": "255" },
{
  "label": "大同县",
  "value": "256" }],

[{
  "label": "市辖区",
  "value": "258" },
{
  "label": "城区",
  "value": "259" },
{
  "label": "矿区",
  "value": "260" },
{
  "label": "郊区",
  "value": "261" },
{
  "label": "平定县",
  "value": "262" },
{
  "label": "盂县",
  "value": "263" }],

[{
  "label": "市辖区",
  "value": "265" },
{
  "label": "城区",
  "value": "266" },
{
  "label": "郊区",
  "value": "267" },
{
  "label": "长治县",
  "value": "268" },
{
  "label": "襄垣县",
  "value": "269" },
{
  "label": "屯留县",
  "value": "270" },
{
  "label": "平顺县",
  "value": "271" },
{
  "label": "黎城县",
  "value": "272" },
{
  "label": "壶关县",
  "value": "273" },
{
  "label": "长子县",
  "value": "274" },
{
  "label": "武乡县",
  "value": "275" },
{
  "label": "沁县",
  "value": "276" },
{
  "label": "沁源县",
  "value": "277" },
{
  "label": "潞城市",
  "value": "278" }],

[{
  "label": "市辖区",
  "value": "280" },
{
  "label": "城区",
  "value": "281" },
{
  "label": "沁水县",
  "value": "282" },
{
  "label": "阳城县",
  "value": "283" },
{
  "label": "陵川县",
  "value": "284" },
{
  "label": "泽州县",
  "value": "285" },
{
  "label": "高平市",
  "value": "286" }],

[{
  "label": "市辖区",
  "value": "288" },
{
  "label": "朔城区",
  "value": "289" },
{
  "label": "平鲁区",
  "value": "290" },
{
  "label": "山阴县",
  "value": "291" },
{
  "label": "应县",
  "value": "292" },
{
  "label": "右玉县",
  "value": "293" },
{
  "label": "怀仁县",
  "value": "294" }],

[{
  "label": "市辖区",
  "value": "296" },
{
  "label": "榆次区",
  "value": "297" },
{
  "label": "榆社县",
  "value": "298" },
{
  "label": "左权县",
  "value": "299" },
{
  "label": "和顺县",
  "value": "300" },
{
  "label": "昔阳县",
  "value": "301" },
{
  "label": "寿阳县",
  "value": "302" },
{
  "label": "太谷县",
  "value": "303" },
{
  "label": "祁县",
  "value": "304" },
{
  "label": "平遥县",
  "value": "305" },
{
  "label": "灵石县",
  "value": "306" },
{
  "label": "介休市",
  "value": "307" }],

[{
  "label": "市辖区",
  "value": "309" },
{
  "label": "盐湖区",
  "value": "310" },
{
  "label": "临猗县",
  "value": "311" },
{
  "label": "万荣县",
  "value": "312" },
{
  "label": "闻喜县",
  "value": "313" },
{
  "label": "稷山县",
  "value": "314" },
{
  "label": "新绛县",
  "value": "315" },
{
  "label": "绛县",
  "value": "316" },
{
  "label": "垣曲县",
  "value": "317" },
{
  "label": "夏县",
  "value": "318" },
{
  "label": "平陆县",
  "value": "319" },
{
  "label": "芮城县",
  "value": "320" },
{
  "label": "永济市",
  "value": "321" },
{
  "label": "河津市",
  "value": "322" }],

[{
  "label": "市辖区",
  "value": "324" },
{
  "label": "忻府区",
  "value": "325" },
{
  "label": "定襄县",
  "value": "326" },
{
  "label": "五台县",
  "value": "327" },
{
  "label": "代县",
  "value": "328" },
{
  "label": "繁峙县",
  "value": "329" },
{
  "label": "宁武县",
  "value": "330" },
{
  "label": "静乐县",
  "value": "331" },
{
  "label": "神池县",
  "value": "332" },
{
  "label": "五寨县",
  "value": "333" },
{
  "label": "岢岚县",
  "value": "334" },
{
  "label": "河曲县",
  "value": "335" },
{
  "label": "保德县",
  "value": "336" },
{
  "label": "偏关县",
  "value": "337" },
{
  "label": "原平市",
  "value": "338" }],

[{
  "label": "市辖区",
  "value": "340" },
{
  "label": "尧都区",
  "value": "341" },
{
  "label": "曲沃县",
  "value": "342" },
{
  "label": "翼城县",
  "value": "343" },
{
  "label": "襄汾县",
  "value": "344" },
{
  "label": "洪洞县",
  "value": "345" },
{
  "label": "古县",
  "value": "346" },
{
  "label": "安泽县",
  "value": "347" },
{
  "label": "浮山县",
  "value": "348" },
{
  "label": "吉县",
  "value": "349" },
{
  "label": "乡宁县",
  "value": "350" },
{
  "label": "大宁县",
  "value": "351" },
{
  "label": "隰县",
  "value": "352" },
{
  "label": "永和县",
  "value": "353" },
{
  "label": "蒲县",
  "value": "354" },
{
  "label": "汾西县",
  "value": "355" },
{
  "label": "侯马市",
  "value": "356" },
{
  "label": "霍州市",
  "value": "357" }],

[{
  "label": "市辖区",
  "value": "359" },
{
  "label": "离石区",
  "value": "360" },
{
  "label": "文水县",
  "value": "361" },
{
  "label": "交城县",
  "value": "362" },
{
  "label": "兴县",
  "value": "363" },
{
  "label": "临县",
  "value": "364" },
{
  "label": "柳林县",
  "value": "365" },
{
  "label": "石楼县",
  "value": "366" },
{
  "label": "岚县",
  "value": "367" },
{
  "label": "方山县",
  "value": "368" },
{
  "label": "中阳县",
  "value": "369" },
{
  "label": "交口县",
  "value": "370" },
{
  "label": "孝义市",
  "value": "371" },
{
  "label": "汾阳市",
  "value": "372" }]],


[
[{
  "label": "市辖区",
  "value": "375" },
{
  "label": "新城区",
  "value": "376" },
{
  "label": "回民区",
  "value": "377" },
{
  "label": "玉泉区",
  "value": "378" },
{
  "label": "赛罕区",
  "value": "379" },
{
  "label": "土默特左旗",
  "value": "380" },
{
  "label": "托克托县",
  "value": "381" },
{
  "label": "和林格尔县",
  "value": "382" },
{
  "label": "清水河县",
  "value": "383" },
{
  "label": "武川县",
  "value": "384" }],

[{
  "label": "市辖区",
  "value": "386" },
{
  "label": "东河区",
  "value": "387" },
{
  "label": "昆都仑区",
  "value": "388" },
{
  "label": "青山区",
  "value": "389" },
{
  "label": "石拐区",
  "value": "390" },
{
  "label": "白云鄂博矿区",
  "value": "391" },
{
  "label": "九原区",
  "value": "392" },
{
  "label": "土默特右旗",
  "value": "393" },
{
  "label": "固阳县",
  "value": "394" },
{
  "label": "达尔罕茂明安联合旗",
  "value": "395" }],

[{
  "label": "市辖区",
  "value": "397" },
{
  "label": "海勃湾区",
  "value": "398" },
{
  "label": "海南区",
  "value": "399" },
{
  "label": "乌达区",
  "value": "400" }],

[{
  "label": "市辖区",
  "value": "402" },
{
  "label": "红山区",
  "value": "403" },
{
  "label": "元宝山区",
  "value": "404" },
{
  "label": "松山区",
  "value": "405" },
{
  "label": "阿鲁科尔沁旗",
  "value": "406" },
{
  "label": "巴林左旗",
  "value": "407" },
{
  "label": "巴林右旗",
  "value": "408" },
{
  "label": "林西县",
  "value": "409" },
{
  "label": "克什克腾旗",
  "value": "410" },
{
  "label": "翁牛特旗",
  "value": "411" },
{
  "label": "喀喇沁旗",
  "value": "412" },
{
  "label": "宁城县",
  "value": "413" },
{
  "label": "敖汉旗",
  "value": "414" }],

[{
  "label": "市辖区",
  "value": "416" },
{
  "label": "科尔沁区",
  "value": "417" },
{
  "label": "科尔沁左翼中旗",
  "value": "418" },
{
  "label": "科尔沁左翼后旗",
  "value": "419" },
{
  "label": "开鲁县",
  "value": "420" },
{
  "label": "库伦旗",
  "value": "421" },
{
  "label": "奈曼旗",
  "value": "422" },
{
  "label": "扎鲁特旗",
  "value": "423" },
{
  "label": "霍林郭勒市",
  "value": "424" }],

[{
  "label": "市辖区",
  "value": "426" },
{
  "label": "东胜区",
  "value": "427" },
{
  "label": "康巴什区",
  "value": "428" },
{
  "label": "达拉特旗",
  "value": "429" },
{
  "label": "准格尔旗",
  "value": "430" },
{
  "label": "鄂托克前旗",
  "value": "431" },
{
  "label": "鄂托克旗",
  "value": "432" },
{
  "label": "杭锦旗",
  "value": "433" },
{
  "label": "乌审旗",
  "value": "434" },
{
  "label": "伊金霍洛旗",
  "value": "435" }],

[{
  "label": "市辖区",
  "value": "437" },
{
  "label": "海拉尔区",
  "value": "438" },
{
  "label": "扎赉诺尔区",
  "value": "439" },
{
  "label": "阿荣旗",
  "value": "440" },
{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "441" },
{
  "label": "鄂伦春自治旗",
  "value": "442" },
{
  "label": "鄂温克族自治旗",
  "value": "443" },
{
  "label": "陈巴尔虎旗",
  "value": "444" },
{
  "label": "新巴尔虎左旗",
  "value": "445" },
{
  "label": "新巴尔虎右旗",
  "value": "446" },
{
  "label": "满洲里市",
  "value": "447" },
{
  "label": "牙克石市",
  "value": "448" },
{
  "label": "扎兰屯市",
  "value": "449" },
{
  "label": "额尔古纳市",
  "value": "450" },
{
  "label": "根河市",
  "value": "451" }],

[{
  "label": "市辖区",
  "value": "453" },
{
  "label": "临河区",
  "value": "454" },
{
  "label": "五原县",
  "value": "455" },
{
  "label": "磴口县",
  "value": "456" },
{
  "label": "乌拉特前旗",
  "value": "457" },
{
  "label": "乌拉特中旗",
  "value": "458" },
{
  "label": "乌拉特后旗",
  "value": "459" },
{
  "label": "杭锦后旗",
  "value": "460" }],

[{
  "label": "市辖区",
  "value": "462" },
{
  "label": "集宁区",
  "value": "463" },
{
  "label": "卓资县",
  "value": "464" },
{
  "label": "化德县",
  "value": "465" },
{
  "label": "商都县",
  "value": "466" },
{
  "label": "兴和县",
  "value": "467" },
{
  "label": "凉城县",
  "value": "468" },
{
  "label": "察哈尔右翼前旗",
  "value": "469" },
{
  "label": "察哈尔右翼中旗",
  "value": "470" },
{
  "label": "察哈尔右翼后旗",
  "value": "471" },
{
  "label": "四子王旗",
  "value": "472" },
{
  "label": "丰镇市",
  "value": "473" }],

[{
  "label": "乌兰浩特市",
  "value": "475" },
{
  "label": "阿尔山市",
  "value": "476" },
{
  "label": "科尔沁右翼前旗",
  "value": "477" },
{
  "label": "科尔沁右翼中旗",
  "value": "478" },
{
  "label": "扎赉特旗",
  "value": "479" },
{
  "label": "突泉县",
  "value": "480" }],

[{
  "label": "二连浩特市",
  "value": "482" },
{
  "label": "锡林浩特市",
  "value": "483" },
{
  "label": "阿巴嘎旗",
  "value": "484" },
{
  "label": "苏尼特左旗",
  "value": "485" },
{
  "label": "苏尼特右旗",
  "value": "486" },
{
  "label": "东乌珠穆沁旗",
  "value": "487" },
{
  "label": "西乌珠穆沁旗",
  "value": "488" },
{
  "label": "太仆寺旗",
  "value": "489" },
{
  "label": "镶黄旗",
  "value": "490" },
{
  "label": "正镶白旗",
  "value": "491" },
{
  "label": "正蓝旗",
  "value": "492" },
{
  "label": "多伦县",
  "value": "493" }],

[{
  "label": "阿拉善左旗",
  "value": "495" },
{
  "label": "阿拉善右旗",
  "value": "496" },
{
  "label": "额济纳旗",
  "value": "497" }]],


[
[{
  "label": "市辖区",
  "value": "500" },
{
  "label": "和平区",
  "value": "501" },
{
  "label": "沈河区",
  "value": "502" },
{
  "label": "大东区",
  "value": "503" },
{
  "label": "皇姑区",
  "value": "504" },
{
  "label": "铁西区",
  "value": "505" },
{
  "label": "苏家屯区",
  "value": "506" },
{
  "label": "浑南区",
  "value": "507" },
{
  "label": "沈北新区",
  "value": "508" },
{
  "label": "于洪区",
  "value": "509" },
{
  "label": "辽中区",
  "value": "510" },
{
  "label": "康平县",
  "value": "511" },
{
  "label": "法库县",
  "value": "512" },
{
  "label": "新民市",
  "value": "513" }],

[{
  "label": "市辖区",
  "value": "515" },
{
  "label": "中山区",
  "value": "516" },
{
  "label": "西岗区",
  "value": "517" },
{
  "label": "沙河口区",
  "value": "518" },
{
  "label": "甘井子区",
  "value": "519" },
{
  "label": "旅顺口区",
  "value": "520" },
{
  "label": "金州区",
  "value": "521" },
{
  "label": "普兰店区",
  "value": "522" },
{
  "label": "长海县",
  "value": "523" },
{
  "label": "瓦房店市",
  "value": "524" },
{
  "label": "庄河市",
  "value": "525" }],

[{
  "label": "市辖区",
  "value": "527" },
{
  "label": "铁东区",
  "value": "528" },
{
  "label": "铁西区",
  "value": "529" },
{
  "label": "立山区",
  "value": "530" },
{
  "label": "千山区",
  "value": "531" },
{
  "label": "台安县",
  "value": "532" },
{
  "label": "岫岩满族自治县",
  "value": "533" },
{
  "label": "海城市",
  "value": "534" }],

[{
  "label": "市辖区",
  "value": "536" },
{
  "label": "新抚区",
  "value": "537" },
{
  "label": "东洲区",
  "value": "538" },
{
  "label": "望花区",
  "value": "539" },
{
  "label": "顺城区",
  "value": "540" },
{
  "label": "抚顺县",
  "value": "541" },
{
  "label": "新宾满族自治县",
  "value": "542" },
{
  "label": "清原满族自治县",
  "value": "543" }],

[{
  "label": "市辖区",
  "value": "545" },
{
  "label": "平山区",
  "value": "546" },
{
  "label": "溪湖区",
  "value": "547" },
{
  "label": "明山区",
  "value": "548" },
{
  "label": "南芬区",
  "value": "549" },
{
  "label": "本溪满族自治县",
  "value": "550" },
{
  "label": "桓仁满族自治县",
  "value": "551" }],

[{
  "label": "市辖区",
  "value": "553" },
{
  "label": "元宝区",
  "value": "554" },
{
  "label": "振兴区",
  "value": "555" },
{
  "label": "振安区",
  "value": "556" },
{
  "label": "宽甸满族自治县",
  "value": "557" },
{
  "label": "东港市",
  "value": "558" },
{
  "label": "凤城市",
  "value": "559" }],

[{
  "label": "市辖区",
  "value": "561" },
{
  "label": "古塔区",
  "value": "562" },
{
  "label": "凌河区",
  "value": "563" },
{
  "label": "太和区",
  "value": "564" },
{
  "label": "黑山县",
  "value": "565" },
{
  "label": "义县",
  "value": "566" },
{
  "label": "凌海市",
  "value": "567" },
{
  "label": "北镇市",
  "value": "568" }],

[{
  "label": "市辖区",
  "value": "570" },
{
  "label": "站前区",
  "value": "571" },
{
  "label": "西市区",
  "value": "572" },
{
  "label": "鲅鱼圈区",
  "value": "573" },
{
  "label": "老边区",
  "value": "574" },
{
  "label": "盖州市",
  "value": "575" },
{
  "label": "大石桥市",
  "value": "576" }],

[{
  "label": "市辖区",
  "value": "578" },
{
  "label": "海州区",
  "value": "579" },
{
  "label": "新邱区",
  "value": "580" },
{
  "label": "太平区",
  "value": "581" },
{
  "label": "清河门区",
  "value": "582" },
{
  "label": "细河区",
  "value": "583" },
{
  "label": "阜新蒙古族自治县",
  "value": "584" },
{
  "label": "彰武县",
  "value": "585" }],

[{
  "label": "市辖区",
  "value": "587" },
{
  "label": "白塔区",
  "value": "588" },
{
  "label": "文圣区",
  "value": "589" },
{
  "label": "宏伟区",
  "value": "590" },
{
  "label": "弓长岭区",
  "value": "591" },
{
  "label": "太子河区",
  "value": "592" },
{
  "label": "辽阳县",
  "value": "593" },
{
  "label": "灯塔市",
  "value": "594" }],

[{
  "label": "市辖区",
  "value": "596" },
{
  "label": "双台子区",
  "value": "597" },
{
  "label": "兴隆台区",
  "value": "598" },
{
  "label": "大洼区",
  "value": "599" },
{
  "label": "盘山县",
  "value": "600" }],

[{
  "label": "市辖区",
  "value": "602" },
{
  "label": "银州区",
  "value": "603" },
{
  "label": "清河区",
  "value": "604" },
{
  "label": "铁岭县",
  "value": "605" },
{
  "label": "西丰县",
  "value": "606" },
{
  "label": "昌图县",
  "value": "607" },
{
  "label": "调兵山市",
  "value": "608" },
{
  "label": "开原市",
  "value": "609" }],

[{
  "label": "市辖区",
  "value": "611" },
{
  "label": "双塔区",
  "value": "612" },
{
  "label": "龙城区",
  "value": "613" },
{
  "label": "朝阳县",
  "value": "614" },
{
  "label": "建平县",
  "value": "615" },
{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "616" },
{
  "label": "北票市",
  "value": "617" },
{
  "label": "凌源市",
  "value": "618" }],

[{
  "label": "市辖区",
  "value": "620" },
{
  "label": "连山区",
  "value": "621" },
{
  "label": "龙港区",
  "value": "622" },
{
  "label": "南票区",
  "value": "623" },
{
  "label": "绥中县",
  "value": "624" },
{
  "label": "建昌县",
  "value": "625" },
{
  "label": "兴城市",
  "value": "626" }]],


[
[{
  "label": "市辖区",
  "value": "629" },
{
  "label": "南关区",
  "value": "630" },
{
  "label": "宽城区",
  "value": "631" },
{
  "label": "朝阳区",
  "value": "632" },
{
  "label": "二道区",
  "value": "633" },
{
  "label": "绿园区",
  "value": "634" },
{
  "label": "双阳区",
  "value": "635" },
{
  "label": "九台区",
  "value": "636" },
{
  "label": "农安县",
  "value": "637" },
{
  "label": "榆树市",
  "value": "638" },
{
  "label": "德惠市",
  "value": "639" }],

[{
  "label": "市辖区",
  "value": "641" },
{
  "label": "昌邑区",
  "value": "642" },
{
  "label": "龙潭区",
  "value": "643" },
{
  "label": "船营区",
  "value": "644" },
{
  "label": "丰满区",
  "value": "645" },
{
  "label": "永吉县",
  "value": "646" },
{
  "label": "蛟河市",
  "value": "647" },
{
  "label": "桦甸市",
  "value": "648" },
{
  "label": "舒兰市",
  "value": "649" },
{
  "label": "磐石市",
  "value": "650" }],

[{
  "label": "市辖区",
  "value": "652" },
{
  "label": "铁西区",
  "value": "653" },
{
  "label": "铁东区",
  "value": "654" },
{
  "label": "梨树县",
  "value": "655" },
{
  "label": "伊通满族自治县",
  "value": "656" },
{
  "label": "公主岭市",
  "value": "657" },
{
  "label": "双辽市",
  "value": "658" }],

[{
  "label": "市辖区",
  "value": "660" },
{
  "label": "龙山区",
  "value": "661" },
{
  "label": "西安区",
  "value": "662" },
{
  "label": "东丰县",
  "value": "663" },
{
  "label": "东辽县",
  "value": "664" }],

[{
  "label": "市辖区",
  "value": "666" },
{
  "label": "东昌区",
  "value": "667" },
{
  "label": "二道江区",
  "value": "668" },
{
  "label": "通化县",
  "value": "669" },
{
  "label": "辉南县",
  "value": "670" },
{
  "label": "柳河县",
  "value": "671" },
{
  "label": "梅河口市",
  "value": "672" },
{
  "label": "集安市",
  "value": "673" }],

[{
  "label": "市辖区",
  "value": "675" },
{
  "label": "浑江区",
  "value": "676" },
{
  "label": "江源区",
  "value": "677" },
{
  "label": "抚松县",
  "value": "678" },
{
  "label": "靖宇县",
  "value": "679" },
{
  "label": "长白朝鲜族自治县",
  "value": "680" },
{
  "label": "临江市",
  "value": "681" }],

[{
  "label": "市辖区",
  "value": "683" },
{
  "label": "宁江区",
  "value": "684" },
{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "685" },
{
  "label": "长岭县",
  "value": "686" },
{
  "label": "乾安县",
  "value": "687" },
{
  "label": "扶余市",
  "value": "688" }],

[{
  "label": "市辖区",
  "value": "690" },
{
  "label": "洮北区",
  "value": "691" },
{
  "label": "镇赉县",
  "value": "692" },
{
  "label": "通榆县",
  "value": "693" },
{
  "label": "洮南市",
  "value": "694" },
{
  "label": "大安市",
  "value": "695" }],

[{
  "label": "延吉市",
  "value": "697" },
{
  "label": "图们市",
  "value": "698" },
{
  "label": "敦化市",
  "value": "699" },
{
  "label": "珲春市",
  "value": "700" },
{
  "label": "龙井市",
  "value": "701" },
{
  "label": "和龙市",
  "value": "702" },
{
  "label": "汪清县",
  "value": "703" },
{
  "label": "安图县",
  "value": "704" }]],


[
[{
  "label": "市辖区",
  "value": "707" },
{
  "label": "道里区",
  "value": "708" },
{
  "label": "南岗区",
  "value": "709" },
{
  "label": "道外区",
  "value": "710" },
{
  "label": "平房区",
  "value": "711" },
{
  "label": "松北区",
  "value": "712" },
{
  "label": "香坊区",
  "value": "713" },
{
  "label": "呼兰区",
  "value": "714" },
{
  "label": "阿城区",
  "value": "715" },
{
  "label": "双城区",
  "value": "716" },
{
  "label": "依兰县",
  "value": "717" },
{
  "label": "方正县",
  "value": "718" },
{
  "label": "宾县",
  "value": "719" },
{
  "label": "巴彦县",
  "value": "720" },
{
  "label": "木兰县",
  "value": "721" },
{
  "label": "通河县",
  "value": "722" },
{
  "label": "延寿县",
  "value": "723" },
{
  "label": "尚志市",
  "value": "724" },
{
  "label": "五常市",
  "value": "725" }],

[{
  "label": "市辖区",
  "value": "727" },
{
  "label": "龙沙区",
  "value": "728" },
{
  "label": "建华区",
  "value": "729" },
{
  "label": "铁锋区",
  "value": "730" },
{
  "label": "昂昂溪区",
  "value": "731" },
{
  "label": "富拉尔基区",
  "value": "732" },
{
  "label": "碾子山区",
  "value": "733" },
{
  "label": "梅里斯达斡尔族区",
  "value": "734" },
{
  "label": "龙江县",
  "value": "735" },
{
  "label": "依安县",
  "value": "736" },
{
  "label": "泰来县",
  "value": "737" },
{
  "label": "甘南县",
  "value": "738" },
{
  "label": "富裕县",
  "value": "739" },
{
  "label": "克山县",
  "value": "740" },
{
  "label": "克东县",
  "value": "741" },
{
  "label": "拜泉县",
  "value": "742" },
{
  "label": "讷河市",
  "value": "743" }],

[{
  "label": "市辖区",
  "value": "745" },
{
  "label": "鸡冠区",
  "value": "746" },
{
  "label": "恒山区",
  "value": "747" },
{
  "label": "滴道区",
  "value": "748" },
{
  "label": "梨树区",
  "value": "749" },
{
  "label": "城子河区",
  "value": "750" },
{
  "label": "麻山区",
  "value": "751" },
{
  "label": "鸡东县",
  "value": "752" },
{
  "label": "虎林市",
  "value": "753" },
{
  "label": "密山市",
  "value": "754" }],

[{
  "label": "市辖区",
  "value": "756" },
{
  "label": "向阳区",
  "value": "757" },
{
  "label": "工农区",
  "value": "758" },
{
  "label": "南山区",
  "value": "759" },
{
  "label": "兴安区",
  "value": "760" },
{
  "label": "东山区",
  "value": "761" },
{
  "label": "兴山区",
  "value": "762" },
{
  "label": "萝北县",
  "value": "763" },
{
  "label": "绥滨县",
  "value": "764" }],

[{
  "label": "市辖区",
  "value": "766" },
{
  "label": "尖山区",
  "value": "767" },
{
  "label": "岭东区",
  "value": "768" },
{
  "label": "四方台区",
  "value": "769" },
{
  "label": "宝山区",
  "value": "770" },
{
  "label": "集贤县",
  "value": "771" },
{
  "label": "友谊县",
  "value": "772" },
{
  "label": "宝清县",
  "value": "773" },
{
  "label": "饶河县",
  "value": "774" }],

[{
  "label": "市辖区",
  "value": "776" },
{
  "label": "萨尔图区",
  "value": "777" },
{
  "label": "龙凤区",
  "value": "778" },
{
  "label": "让胡路区",
  "value": "779" },
{
  "label": "红岗区",
  "value": "780" },
{
  "label": "大同区",
  "value": "781" },
{
  "label": "肇州县",
  "value": "782" },
{
  "label": "肇源县",
  "value": "783" },
{
  "label": "林甸县",
  "value": "784" },
{
  "label": "杜尔伯特蒙古族自治县",
  "value": "785" }],

[{
  "label": "市辖区",
  "value": "787" },
{
  "label": "伊春区",
  "value": "788" },
{
  "label": "南岔区",
  "value": "789" },
{
  "label": "友好区",
  "value": "790" },
{
  "label": "西林区",
  "value": "791" },
{
  "label": "翠峦区",
  "value": "792" },
{
  "label": "新青区",
  "value": "793" },
{
  "label": "美溪区",
  "value": "794" },
{
  "label": "金山屯区",
  "value": "795" },
{
  "label": "五营区",
  "value": "796" },
{
  "label": "乌马河区",
  "value": "797" },
{
  "label": "汤旺河区",
  "value": "798" },
{
  "label": "带岭区",
  "value": "799" },
{
  "label": "乌伊岭区",
  "value": "800" },
{
  "label": "红星区",
  "value": "801" },
{
  "label": "上甘岭区",
  "value": "802" },
{
  "label": "嘉荫县",
  "value": "803" },
{
  "label": "铁力市",
  "value": "804" }],

[{
  "label": "市辖区",
  "value": "806" },
{
  "label": "向阳区",
  "value": "807" },
{
  "label": "前进区",
  "value": "808" },
{
  "label": "东风区",
  "value": "809" },
{
  "label": "郊区",
  "value": "810" },
{
  "label": "桦南县",
  "value": "811" },
{
  "label": "桦川县",
  "value": "812" },
{
  "label": "汤原县",
  "value": "813" },
{
  "label": "同江市",
  "value": "814" },
{
  "label": "富锦市",
  "value": "815" },
{
  "label": "抚远市",
  "value": "816" }],

[{
  "label": "市辖区",
  "value": "818" },
{
  "label": "新兴区",
  "value": "819" },
{
  "label": "桃山区",
  "value": "820" },
{
  "label": "茄子河区",
  "value": "821" },
{
  "label": "勃利县",
  "value": "822" }],

[{
  "label": "市辖区",
  "value": "824" },
{
  "label": "东安区",
  "value": "825" },
{
  "label": "阳明区",
  "value": "826" },
{
  "label": "爱民区",
  "value": "827" },
{
  "label": "西安区",
  "value": "828" },
{
  "label": "林口县",
  "value": "829" },
{
  "label": "绥芬河市",
  "value": "830" },
{
  "label": "海林市",
  "value": "831" },
{
  "label": "宁安市",
  "value": "832" },
{
  "label": "穆棱市",
  "value": "833" },
{
  "label": "东宁市",
  "value": "834" }],

[{
  "label": "市辖区",
  "value": "836" },
{
  "label": "爱辉区",
  "value": "837" },
{
  "label": "嫩江县",
  "value": "838" },
{
  "label": "逊克县",
  "value": "839" },
{
  "label": "孙吴县",
  "value": "840" },
{
  "label": "北安市",
  "value": "841" },
{
  "label": "五大连池市",
  "value": "842" }],

[{
  "label": "市辖区",
  "value": "844" },
{
  "label": "北林区",
  "value": "845" },
{
  "label": "望奎县",
  "value": "846" },
{
  "label": "兰西县",
  "value": "847" },
{
  "label": "青冈县",
  "value": "848" },
{
  "label": "庆安县",
  "value": "849" },
{
  "label": "明水县",
  "value": "850" },
{
  "label": "绥棱县",
  "value": "851" },
{
  "label": "安达市",
  "value": "852" },
{
  "label": "肇东市",
  "value": "853" },
{
  "label": "海伦市",
  "value": "854" }],

[{
  "label": "呼玛县",
  "value": "856" },
{
  "label": "塔河县",
  "value": "857" },
{
  "label": "漠河县",
  "value": "858" }]],


[
[{
  "label": "黄浦区",
  "value": "861" },
{
  "label": "徐汇区",
  "value": "862" },
{
  "label": "长宁区",
  "value": "863" },
{
  "label": "静安区",
  "value": "864" },
{
  "label": "普陀区",
  "value": "865" },
{
  "label": "虹口区",
  "value": "866" },
{
  "label": "杨浦区",
  "value": "867" },
{
  "label": "闵行区",
  "value": "868" },
{
  "label": "宝山区",
  "value": "869" },
{
  "label": "嘉定区",
  "value": "870" },
{
  "label": "浦东新区",
  "value": "871" },
{
  "label": "金山区",
  "value": "872" },
{
  "label": "松江区",
  "value": "873" },
{
  "label": "青浦区",
  "value": "874" },
{
  "label": "奉贤区",
  "value": "875" },
{
  "label": "崇明区",
  "value": "876" }]],


[
[{
  "label": "市辖区",
  "value": "879" },
{
  "label": "玄武区",
  "value": "880" },
{
  "label": "秦淮区",
  "value": "881" },
{
  "label": "建邺区",
  "value": "882" },
{
  "label": "鼓楼区",
  "value": "883" },
{
  "label": "浦口区",
  "value": "884" },
{
  "label": "栖霞区",
  "value": "885" },
{
  "label": "雨花台区",
  "value": "886" },
{
  "label": "江宁区",
  "value": "887" },
{
  "label": "六合区",
  "value": "888" },
{
  "label": "溧水区",
  "value": "889" },
{
  "label": "高淳区",
  "value": "890" }],

[{
  "label": "市辖区",
  "value": "892" },
{
  "label": "锡山区",
  "value": "893" },
{
  "label": "惠山区",
  "value": "894" },
{
  "label": "滨湖区",
  "value": "895" },
{
  "label": "梁溪区",
  "value": "896" },
{
  "label": "新吴区",
  "value": "897" },
{
  "label": "江阴市",
  "value": "898" },
{
  "label": "宜兴市",
  "value": "899" }],

[{
  "label": "市辖区",
  "value": "901" },
{
  "label": "鼓楼区",
  "value": "902" },
{
  "label": "云龙区",
  "value": "903" },
{
  "label": "贾汪区",
  "value": "904" },
{
  "label": "泉山区",
  "value": "905" },
{
  "label": "铜山区",
  "value": "906" },
{
  "label": "丰县",
  "value": "907" },
{
  "label": "沛县",
  "value": "908" },
{
  "label": "睢宁县",
  "value": "909" },
{
  "label": "新沂市",
  "value": "910" },
{
  "label": "邳州市",
  "value": "911" }],

[{
  "label": "市辖区",
  "value": "913" },
{
  "label": "天宁区",
  "value": "914" },
{
  "label": "钟楼区",
  "value": "915" },
{
  "label": "新北区",
  "value": "916" },
{
  "label": "武进区",
  "value": "917" },
{
  "label": "金坛区",
  "value": "918" },
{
  "label": "溧阳市",
  "value": "919" }],

[{
  "label": "市辖区",
  "value": "921" },
{
  "label": "虎丘区",
  "value": "922" },
{
  "label": "吴中区",
  "value": "923" },
{
  "label": "相城区",
  "value": "924" },
{
  "label": "姑苏区",
  "value": "925" },
{
  "label": "吴江区",
  "value": "926" },
{
  "label": "常熟市",
  "value": "927" },
{
  "label": "张家港市",
  "value": "928" },
{
  "label": "昆山市",
  "value": "929" },
{
  "label": "太仓市",
  "value": "930" }],

[{
  "label": "市辖区",
  "value": "932" },
{
  "label": "崇川区",
  "value": "933" },
{
  "label": "港闸区",
  "value": "934" },
{
  "label": "通州区",
  "value": "935" },
{
  "label": "海安县",
  "value": "936" },
{
  "label": "如东县",
  "value": "937" },
{
  "label": "启东市",
  "value": "938" },
{
  "label": "如皋市",
  "value": "939" },
{
  "label": "海门市",
  "value": "940" }],

[{
  "label": "市辖区",
  "value": "942" },
{
  "label": "连云区",
  "value": "943" },
{
  "label": "海州区",
  "value": "944" },
{
  "label": "赣榆区",
  "value": "945" },
{
  "label": "东海县",
  "value": "946" },
{
  "label": "灌云县",
  "value": "947" },
{
  "label": "灌南县",
  "value": "948" }],

[{
  "label": "市辖区",
  "value": "950" },
{
  "label": "淮安区",
  "value": "951" },
{
  "label": "淮阴区",
  "value": "952" },
{
  "label": "清江浦区",
  "value": "953" },
{
  "label": "洪泽区",
  "value": "954" },
{
  "label": "涟水县",
  "value": "955" },
{
  "label": "盱眙县",
  "value": "956" },
{
  "label": "金湖县",
  "value": "957" }],

[{
  "label": "市辖区",
  "value": "959" },
{
  "label": "亭湖区",
  "value": "960" },
{
  "label": "盐都区",
  "value": "961" },
{
  "label": "大丰区",
  "value": "962" },
{
  "label": "响水县",
  "value": "963" },
{
  "label": "滨海县",
  "value": "964" },
{
  "label": "阜宁县",
  "value": "965" },
{
  "label": "射阳县",
  "value": "966" },
{
  "label": "建湖县",
  "value": "967" },
{
  "label": "东台市",
  "value": "968" }],

[{
  "label": "市辖区",
  "value": "970" },
{
  "label": "广陵区",
  "value": "971" },
{
  "label": "邗江区",
  "value": "972" },
{
  "label": "江都区",
  "value": "973" },
{
  "label": "宝应县",
  "value": "974" },
{
  "label": "仪征市",
  "value": "975" },
{
  "label": "高邮市",
  "value": "976" }],

[{
  "label": "市辖区",
  "value": "978" },
{
  "label": "京口区",
  "value": "979" },
{
  "label": "润州区",
  "value": "980" },
{
  "label": "丹徒区",
  "value": "981" },
{
  "label": "丹阳市",
  "value": "982" },
{
  "label": "扬中市",
  "value": "983" },
{
  "label": "句容市",
  "value": "984" }],

[{
  "label": "市辖区",
  "value": "986" },
{
  "label": "海陵区",
  "value": "987" },
{
  "label": "高港区",
  "value": "988" },
{
  "label": "姜堰区",
  "value": "989" },
{
  "label": "兴化市",
  "value": "990" },
{
  "label": "靖江市",
  "value": "991" },
{
  "label": "泰兴市",
  "value": "992" }],

[{
  "label": "市辖区",
  "value": "994" },
{
  "label": "宿城区",
  "value": "995" },
{
  "label": "宿豫区",
  "value": "996" },
{
  "label": "沭阳县",
  "value": "997" },
{
  "label": "泗阳县",
  "value": "998" },
{
  "label": "泗洪县",
  "value": "999" }]],


[
[{
  "label": "市辖区",
  "value": "1002" },
{
  "label": "上城区",
  "value": "1003" },
{
  "label": "下城区",
  "value": "1004" },
{
  "label": "江干区",
  "value": "1005" },
{
  "label": "拱墅区",
  "value": "1006" },
{
  "label": "西湖区",
  "value": "1007" },
{
  "label": "滨江区",
  "value": "1008" },
{
  "label": "萧山区",
  "value": "1009" },
{
  "label": "余杭区",
  "value": "1010" },
{
  "label": "富阳区",
  "value": "1011" },
{
  "label": "桐庐县",
  "value": "1012" },
{
  "label": "淳安县",
  "value": "1013" },
{
  "label": "建德市",
  "value": "1014" },
{
  "label": "临安市",
  "value": "1015" }],

[{
  "label": "市辖区",
  "value": "1017" },
{
  "label": "海曙区",
  "value": "1018" },
{
  "label": "江东区",
  "value": "1019" },
{
  "label": "江北区",
  "value": "1020" },
{
  "label": "北仑区",
  "value": "1021" },
{
  "label": "镇海区",
  "value": "1022" },
{
  "label": "鄞州区",
  "value": "1023" },
{
  "label": "象山县",
  "value": "1024" },
{
  "label": "宁海县",
  "value": "1025" },
{
  "label": "余姚市",
  "value": "1026" },
{
  "label": "慈溪市",
  "value": "1027" },
{
  "label": "奉化市",
  "value": "1028" }],

[{
  "label": "市辖区",
  "value": "1030" },
{
  "label": "鹿城区",
  "value": "1031" },
{
  "label": "龙湾区",
  "value": "1032" },
{
  "label": "瓯海区",
  "value": "1033" },
{
  "label": "洞头区",
  "value": "1034" },
{
  "label": "永嘉县",
  "value": "1035" },
{
  "label": "平阳县",
  "value": "1036" },
{
  "label": "苍南县",
  "value": "1037" },
{
  "label": "文成县",
  "value": "1038" },
{
  "label": "泰顺县",
  "value": "1039" },
{
  "label": "瑞安市",
  "value": "1040" },
{
  "label": "乐清市",
  "value": "1041" }],

[{
  "label": "市辖区",
  "value": "1043" },
{
  "label": "南湖区",
  "value": "1044" },
{
  "label": "秀洲区",
  "value": "1045" },
{
  "label": "嘉善县",
  "value": "1046" },
{
  "label": "海盐县",
  "value": "1047" },
{
  "label": "海宁市",
  "value": "1048" },
{
  "label": "平湖市",
  "value": "1049" },
{
  "label": "桐乡市",
  "value": "1050" }],

[{
  "label": "市辖区",
  "value": "1052" },
{
  "label": "吴兴区",
  "value": "1053" },
{
  "label": "南浔区",
  "value": "1054" },
{
  "label": "德清县",
  "value": "1055" },
{
  "label": "长兴县",
  "value": "1056" },
{
  "label": "安吉县",
  "value": "1057" }],

[{
  "label": "市辖区",
  "value": "1059" },
{
  "label": "越城区",
  "value": "1060" },
{
  "label": "柯桥区",
  "value": "1061" },
{
  "label": "上虞区",
  "value": "1062" },
{
  "label": "新昌县",
  "value": "1063" },
{
  "label": "诸暨市",
  "value": "1064" },
{
  "label": "嵊州市",
  "value": "1065" }],

[{
  "label": "市辖区",
  "value": "1067" },
{
  "label": "婺城区",
  "value": "1068" },
{
  "label": "金东区",
  "value": "1069" },
{
  "label": "武义县",
  "value": "1070" },
{
  "label": "浦江县",
  "value": "1071" },
{
  "label": "磐安县",
  "value": "1072" },
{
  "label": "兰溪市",
  "value": "1073" },
{
  "label": "义乌市",
  "value": "1074" },
{
  "label": "东阳市",
  "value": "1075" },
{
  "label": "永康市",
  "value": "1076" }],

[{
  "label": "市辖区",
  "value": "1078" },
{
  "label": "柯城区",
  "value": "1079" },
{
  "label": "衢江区",
  "value": "1080" },
{
  "label": "常山县",
  "value": "1081" },
{
  "label": "开化县",
  "value": "1082" },
{
  "label": "龙游县",
  "value": "1083" },
{
  "label": "江山市",
  "value": "1084" }],

[{
  "label": "市辖区",
  "value": "1086" },
{
  "label": "定海区",
  "value": "1087" },
{
  "label": "普陀区",
  "value": "1088" },
{
  "label": "岱山县",
  "value": "1089" },
{
  "label": "嵊泗县",
  "value": "1090" }],

[{
  "label": "市辖区",
  "value": "1092" },
{
  "label": "椒江区",
  "value": "1093" },
{
  "label": "黄岩区",
  "value": "1094" },
{
  "label": "路桥区",
  "value": "1095" },
{
  "label": "玉环县",
  "value": "1096" },
{
  "label": "三门县",
  "value": "1097" },
{
  "label": "天台县",
  "value": "1098" },
{
  "label": "仙居县",
  "value": "1099" },
{
  "label": "温岭市",
  "value": "1100" },
{
  "label": "临海市",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1103" },
{
  "label": "莲都区",
  "value": "1104" },
{
  "label": "青田县",
  "value": "1105" },
{
  "label": "缙云县",
  "value": "1106" },
{
  "label": "遂昌县",
  "value": "1107" },
{
  "label": "松阳县",
  "value": "1108" },
{
  "label": "云和县",
  "value": "1109" },
{
  "label": "庆元县",
  "value": "1110" },
{
  "label": "景宁畲族自治县",
  "value": "1111" },
{
  "label": "龙泉市",
  "value": "1112" }]],


[
[{
  "label": "市辖区",
  "value": "1115" },
{
  "label": "瑶海区",
  "value": "1116" },
{
  "label": "庐阳区",
  "value": "1117" },
{
  "label": "蜀山区",
  "value": "1118" },
{
  "label": "包河区",
  "value": "1119" },
{
  "label": "长丰县",
  "value": "1120" },
{
  "label": "肥东县",
  "value": "1121" },
{
  "label": "肥西县",
  "value": "1122" },
{
  "label": "庐江县",
  "value": "1123" },
{
  "label": "巢湖市",
  "value": "1124" }],

[{
  "label": "市辖区",
  "value": "1126" },
{
  "label": "镜湖区",
  "value": "1127" },
{
  "label": "弋江区",
  "value": "1128" },
{
  "label": "鸠江区",
  "value": "1129" },
{
  "label": "三山区",
  "value": "1130" },
{
  "label": "芜湖县",
  "value": "1131" },
{
  "label": "繁昌县",
  "value": "1132" },
{
  "label": "南陵县",
  "value": "1133" },
{
  "label": "无为县",
  "value": "1134" }],

[{
  "label": "市辖区",
  "value": "1136" },
{
  "label": "龙子湖区",
  "value": "1137" },
{
  "label": "蚌山区",
  "value": "1138" },
{
  "label": "禹会区",
  "value": "1139" },
{
  "label": "淮上区",
  "value": "1140" },
{
  "label": "怀远县",
  "value": "1141" },
{
  "label": "五河县",
  "value": "1142" },
{
  "label": "固镇县",
  "value": "1143" }],

[{
  "label": "市辖区",
  "value": "1145" },
{
  "label": "大通区",
  "value": "1146" },
{
  "label": "田家庵区",
  "value": "1147" },
{
  "label": "谢家集区",
  "value": "1148" },
{
  "label": "八公山区",
  "value": "1149" },
{
  "label": "潘集区",
  "value": "1150" },
{
  "label": "凤台县",
  "value": "1151" },
{
  "label": "寿县",
  "value": "1152" }],

[{
  "label": "市辖区",
  "value": "1154" },
{
  "label": "花山区",
  "value": "1155" },
{
  "label": "雨山区",
  "value": "1156" },
{
  "label": "博望区",
  "value": "1157" },
{
  "label": "当涂县",
  "value": "1158" },
{
  "label": "含山县",
  "value": "1159" },
{
  "label": "和县",
  "value": "1160" }],

[{
  "label": "市辖区",
  "value": "1162" },
{
  "label": "杜集区",
  "value": "1163" },
{
  "label": "相山区",
  "value": "1164" },
{
  "label": "烈山区",
  "value": "1165" },
{
  "label": "濉溪县",
  "value": "1166" }],

[{
  "label": "市辖区",
  "value": "1168" },
{
  "label": "铜官区",
  "value": "1169" },
{
  "label": "义安区",
  "value": "1170" },
{
  "label": "郊区",
  "value": "1171" },
{
  "label": "枞阳县",
  "value": "1172" }],

[{
  "label": "市辖区",
  "value": "1174" },
{
  "label": "迎江区",
  "value": "1175" },
{
  "label": "大观区",
  "value": "1176" },
{
  "label": "宜秀区",
  "value": "1177" },
{
  "label": "怀宁县",
  "value": "1178" },
{
  "label": "潜山县",
  "value": "1179" },
{
  "label": "太湖县",
  "value": "1180" },
{
  "label": "宿松县",
  "value": "1181" },
{
  "label": "望江县",
  "value": "1182" },
{
  "label": "岳西县",
  "value": "1183" },
{
  "label": "桐城市",
  "value": "1184" }],

[{
  "label": "市辖区",
  "value": "1186" },
{
  "label": "屯溪区",
  "value": "1187" },
{
  "label": "黄山区",
  "value": "1188" },
{
  "label": "徽州区",
  "value": "1189" },
{
  "label": "歙县",
  "value": "1190" },
{
  "label": "休宁县",
  "value": "1191" },
{
  "label": "黟县",
  "value": "1192" },
{
  "label": "祁门县",
  "value": "1193" }],

[{
  "label": "市辖区",
  "value": "1195" },
{
  "label": "琅琊区",
  "value": "1196" },
{
  "label": "南谯区",
  "value": "1197" },
{
  "label": "来安县",
  "value": "1198" },
{
  "label": "全椒县",
  "value": "1199" },
{
  "label": "定远县",
  "value": "1200" },
{
  "label": "凤阳县",
  "value": "1201" },
{
  "label": "天长市",
  "value": "1202" },
{
  "label": "明光市",
  "value": "1203" }],

[{
  "label": "市辖区",
  "value": "1205" },
{
  "label": "颍州区",
  "value": "1206" },
{
  "label": "颍东区",
  "value": "1207" },
{
  "label": "颍泉区",
  "value": "1208" },
{
  "label": "临泉县",
  "value": "1209" },
{
  "label": "太和县",
  "value": "1210" },
{
  "label": "阜南县",
  "value": "1211" },
{
  "label": "颍上县",
  "value": "1212" },
{
  "label": "界首市",
  "value": "1213" }],

[{
  "label": "市辖区",
  "value": "1215" },
{
  "label": "埇桥区",
  "value": "1216" },
{
  "label": "砀山县",
  "value": "1217" },
{
  "label": "萧县",
  "value": "1218" },
{
  "label": "灵璧县",
  "value": "1219" },
{
  "label": "泗县",
  "value": "1220" }],

[{
  "label": "市辖区",
  "value": "1222" },
{
  "label": "金安区",
  "value": "1223" },
{
  "label": "裕安区",
  "value": "1224" },
{
  "label": "叶集区",
  "value": "1225" },
{
  "label": "霍邱县",
  "value": "1226" },
{
  "label": "舒城县",
  "value": "1227" },
{
  "label": "金寨县",
  "value": "1228" },
{
  "label": "霍山县",
  "value": "1229" }],

[{
  "label": "市辖区",
  "value": "1231" },
{
  "label": "谯城区",
  "value": "1232" },
{
  "label": "涡阳县",
  "value": "1233" },
{
  "label": "蒙城县",
  "value": "1234" },
{
  "label": "利辛县",
  "value": "1235" }],

[{
  "label": "市辖区",
  "value": "1237" },
{
  "label": "贵池区",
  "value": "1238" },
{
  "label": "东至县",
  "value": "1239" },
{
  "label": "石台县",
  "value": "1240" },
{
  "label": "青阳县",
  "value": "1241" }],

[{
  "label": "市辖区",
  "value": "1243" },
{
  "label": "宣州区",
  "value": "1244" },
{
  "label": "郎溪县",
  "value": "1245" },
{
  "label": "广德县",
  "value": "1246" },
{
  "label": "泾县",
  "value": "1247" },
{
  "label": "绩溪县",
  "value": "1248" },
{
  "label": "旌德县",
  "value": "1249" },
{
  "label": "宁国市",
  "value": "1250" }]],


[
[{
  "label": "市辖区",
  "value": "1253" },
{
  "label": "鼓楼区",
  "value": "1254" },
{
  "label": "台江区",
  "value": "1255" },
{
  "label": "仓山区",
  "value": "1256" },
{
  "label": "马尾区",
  "value": "1257" },
{
  "label": "晋安区",
  "value": "1258" },
{
  "label": "闽侯县",
  "value": "1259" },
{
  "label": "连江县",
  "value": "1260" },
{
  "label": "罗源县",
  "value": "1261" },
{
  "label": "闽清县",
  "value": "1262" },
{
  "label": "永泰县",
  "value": "1263" },
{
  "label": "平潭县",
  "value": "1264" },
{
  "label": "福清市",
  "value": "1265" },
{
  "label": "长乐市",
  "value": "1266" }],

[{
  "label": "市辖区",
  "value": "1268" },
{
  "label": "思明区",
  "value": "1269" },
{
  "label": "海沧区",
  "value": "1270" },
{
  "label": "湖里区",
  "value": "1271" },
{
  "label": "集美区",
  "value": "1272" },
{
  "label": "同安区",
  "value": "1273" },
{
  "label": "翔安区",
  "value": "1274" }],

[{
  "label": "市辖区",
  "value": "1276" },
{
  "label": "城厢区",
  "value": "1277" },
{
  "label": "涵江区",
  "value": "1278" },
{
  "label": "荔城区",
  "value": "1279" },
{
  "label": "秀屿区",
  "value": "1280" },
{
  "label": "仙游县",
  "value": "1281" }],

[{
  "label": "市辖区",
  "value": "1283" },
{
  "label": "梅列区",
  "value": "1284" },
{
  "label": "三元区",
  "value": "1285" },
{
  "label": "明溪县",
  "value": "1286" },
{
  "label": "清流县",
  "value": "1287" },
{
  "label": "宁化县",
  "value": "1288" },
{
  "label": "大田县",
  "value": "1289" },
{
  "label": "尤溪县",
  "value": "1290" },
{
  "label": "沙县",
  "value": "1291" },
{
  "label": "将乐县",
  "value": "1292" },
{
  "label": "泰宁县",
  "value": "1293" },
{
  "label": "建宁县",
  "value": "1294" },
{
  "label": "永安市",
  "value": "1295" }],

[{
  "label": "市辖区",
  "value": "1297" },
{
  "label": "鲤城区",
  "value": "1298" },
{
  "label": "丰泽区",
  "value": "1299" },
{
  "label": "洛江区",
  "value": "1300" },
{
  "label": "泉港区",
  "value": "1301" },
{
  "label": "惠安县",
  "value": "1302" },
{
  "label": "安溪县",
  "value": "1303" },
{
  "label": "永春县",
  "value": "1304" },
{
  "label": "德化县",
  "value": "1305" },
{
  "label": "金门县",
  "value": "1306" },
{
  "label": "石狮市",
  "value": "1307" },
{
  "label": "晋江市",
  "value": "1308" },
{
  "label": "南安市",
  "value": "1309" }],

[{
  "label": "市辖区",
  "value": "1311" },
{
  "label": "芗城区",
  "value": "1312" },
{
  "label": "龙文区",
  "value": "1313" },
{
  "label": "云霄县",
  "value": "1314" },
{
  "label": "漳浦县",
  "value": "1315" },
{
  "label": "诏安县",
  "value": "1316" },
{
  "label": "长泰县",
  "value": "1317" },
{
  "label": "东山县",
  "value": "1318" },
{
  "label": "南靖县",
  "value": "1319" },
{
  "label": "平和县",
  "value": "1320" },
{
  "label": "华安县",
  "value": "1321" },
{
  "label": "龙海市",
  "value": "1322" }],

[{
  "label": "市辖区",
  "value": "1324" },
{
  "label": "延平区",
  "value": "1325" },
{
  "label": "建阳区",
  "value": "1326" },
{
  "label": "顺昌县",
  "value": "1327" },
{
  "label": "浦城县",
  "value": "1328" },
{
  "label": "光泽县",
  "value": "1329" },
{
  "label": "松溪县",
  "value": "1330" },
{
  "label": "政和县",
  "value": "1331" },
{
  "label": "邵武市",
  "value": "1332" },
{
  "label": "武夷山市",
  "value": "1333" },
{
  "label": "建瓯市",
  "value": "1334" }],

[{
  "label": "市辖区",
  "value": "1336" },
{
  "label": "新罗区",
  "value": "1337" },
{
  "label": "永定区",
  "value": "1338" },
{
  "label": "长汀县",
  "value": "1339" },
{
  "label": "上杭县",
  "value": "1340" },
{
  "label": "武平县",
  "value": "1341" },
{
  "label": "连城县",
  "value": "1342" },
{
  "label": "漳平市",
  "value": "1343" }],

[{
  "label": "市辖区",
  "value": "1345" },
{
  "label": "蕉城区",
  "value": "1346" },
{
  "label": "霞浦县",
  "value": "1347" },
{
  "label": "古田县",
  "value": "1348" },
{
  "label": "屏南县",
  "value": "1349" },
{
  "label": "寿宁县",
  "value": "1350" },
{
  "label": "周宁县",
  "value": "1351" },
{
  "label": "柘荣县",
  "value": "1352" },
{
  "label": "福安市",
  "value": "1353" },
{
  "label": "福鼎市",
  "value": "1354" }]],


[
[{
  "label": "市辖区",
  "value": "1357" },
{
  "label": "东湖区",
  "value": "1358" },
{
  "label": "西湖区",
  "value": "1359" },
{
  "label": "青云谱区",
  "value": "1360" },
{
  "label": "湾里区",
  "value": "1361" },
{
  "label": "青山湖区",
  "value": "1362" },
{
  "label": "新建区",
  "value": "1363" },
{
  "label": "南昌县",
  "value": "1364" },
{
  "label": "安义县",
  "value": "1365" },
{
  "label": "进贤县",
  "value": "1366" }],

[{
  "label": "市辖区",
  "value": "1368" },
{
  "label": "昌江区",
  "value": "1369" },
{
  "label": "珠山区",
  "value": "1370" },
{
  "label": "浮梁县",
  "value": "1371" },
{
  "label": "乐平市",
  "value": "1372" }],

[{
  "label": "市辖区",
  "value": "1374" },
{
  "label": "安源区",
  "value": "1375" },
{
  "label": "湘东区",
  "value": "1376" },
{
  "label": "莲花县",
  "value": "1377" },
{
  "label": "上栗县",
  "value": "1378" },
{
  "label": "芦溪县",
  "value": "1379" }],

[{
  "label": "市辖区",
  "value": "1381" },
{
  "label": "濂溪区",
  "value": "1382" },
{
  "label": "浔阳区",
  "value": "1383" },
{
  "label": "九江县",
  "value": "1384" },
{
  "label": "武宁县",
  "value": "1385" },
{
  "label": "修水县",
  "value": "1386" },
{
  "label": "永修县",
  "value": "1387" },
{
  "label": "德安县",
  "value": "1388" },
{
  "label": "都昌县",
  "value": "1389" },
{
  "label": "湖口县",
  "value": "1390" },
{
  "label": "彭泽县",
  "value": "1391" },
{
  "label": "瑞昌市",
  "value": "1392" },
{
  "label": "共青城市",
  "value": "1393" },
{
  "label": "庐山市",
  "value": "1394" }],

[{
  "label": "市辖区",
  "value": "1396" },
{
  "label": "渝水区",
  "value": "1397" },
{
  "label": "分宜县",
  "value": "1398" }],

[{
  "label": "市辖区",
  "value": "1400" },
{
  "label": "月湖区",
  "value": "1401" },
{
  "label": "余江县",
  "value": "1402" },
{
  "label": "贵溪市",
  "value": "1403" }],

[{
  "label": "市辖区",
  "value": "1405" },
{
  "label": "章贡区",
  "value": "1406" },
{
  "label": "南康区",
  "value": "1407" },
{
  "label": "赣县",
  "value": "1408" },
{
  "label": "信丰县",
  "value": "1409" },
{
  "label": "大余县",
  "value": "1410" },
{
  "label": "上犹县",
  "value": "1411" },
{
  "label": "崇义县",
  "value": "1412" },
{
  "label": "安远县",
  "value": "1413" },
{
  "label": "龙南县",
  "value": "1414" },
{
  "label": "定南县",
  "value": "1415" },
{
  "label": "全南县",
  "value": "1416" },
{
  "label": "宁都县",
  "value": "1417" },
{
  "label": "于都县",
  "value": "1418" },
{
  "label": "兴国县",
  "value": "1419" },
{
  "label": "会昌县",
  "value": "1420" },
{
  "label": "寻乌县",
  "value": "1421" },
{
  "label": "石城县",
  "value": "1422" },
{
  "label": "瑞金市",
  "value": "1423" }],

[{
  "label": "市辖区",
  "value": "1425" },
{
  "label": "吉州区",
  "value": "1426" },
{
  "label": "青原区",
  "value": "1427" },
{
  "label": "吉安县",
  "value": "1428" },
{
  "label": "吉水县",
  "value": "1429" },
{
  "label": "峡江县",
  "value": "1430" },
{
  "label": "新干县",
  "value": "1431" },
{
  "label": "永丰县",
  "value": "1432" },
{
  "label": "泰和县",
  "value": "1433" },
{
  "label": "遂川县",
  "value": "1434" },
{
  "label": "万安县",
  "value": "1435" },
{
  "label": "安福县",
  "value": "1436" },
{
  "label": "永新县",
  "value": "1437" },
{
  "label": "井冈山市",
  "value": "1438" }],

[{
  "label": "市辖区",
  "value": "1440" },
{
  "label": "袁州区",
  "value": "1441" },
{
  "label": "奉新县",
  "value": "1442" },
{
  "label": "万载县",
  "value": "1443" },
{
  "label": "上高县",
  "value": "1444" },
{
  "label": "宜丰县",
  "value": "1445" },
{
  "label": "靖安县",
  "value": "1446" },
{
  "label": "铜鼓县",
  "value": "1447" },
{
  "label": "丰城市",
  "value": "1448" },
{
  "label": "樟树市",
  "value": "1449" },
{
  "label": "高安市",
  "value": "1450" }],

[{
  "label": "市辖区",
  "value": "1452" },
{
  "label": "临川区",
  "value": "1453" },
{
  "label": "南城县",
  "value": "1454" },
{
  "label": "黎川县",
  "value": "1455" },
{
  "label": "南丰县",
  "value": "1456" },
{
  "label": "崇仁县",
  "value": "1457" },
{
  "label": "乐安县",
  "value": "1458" },
{
  "label": "宜黄县",
  "value": "1459" },
{
  "label": "金溪县",
  "value": "1460" },
{
  "label": "资溪县",
  "value": "1461" },
{
  "label": "东乡县",
  "value": "1462" },
{
  "label": "广昌县",
  "value": "1463" }],

[{
  "label": "市辖区",
  "value": "1465" },
{
  "label": "信州区",
  "value": "1466" },
{
  "label": "广丰区",
  "value": "1467" },
{
  "label": "上饶县",
  "value": "1468" },
{
  "label": "玉山县",
  "value": "1469" },
{
  "label": "铅山县",
  "value": "1470" },
{
  "label": "横峰县",
  "value": "1471" },
{
  "label": "弋阳县",
  "value": "1472" },
{
  "label": "余干县",
  "value": "1473" },
{
  "label": "鄱阳县",
  "value": "1474" },
{
  "label": "万年县",
  "value": "1475" },
{
  "label": "婺源县",
  "value": "1476" },
{
  "label": "德兴市",
  "value": "1477" }]],


[
[{
  "label": "市辖区",
  "value": "1480" },
{
  "label": "历下区",
  "value": "1481" },
{
  "label": "市中区",
  "value": "1482" },
{
  "label": "槐荫区",
  "value": "1483" },
{
  "label": "天桥区",
  "value": "1484" },
{
  "label": "历城区",
  "value": "1485" },
{
  "label": "长清区",
  "value": "1486" },
{
  "label": "平阴县",
  "value": "1487" },
{
  "label": "济阳县",
  "value": "1488" },
{
  "label": "商河县",
  "value": "1489" },
{
  "label": "章丘市",
  "value": "1490" }],

[{
  "label": "市辖区",
  "value": "1492" },
{
  "label": "市南区",
  "value": "1493" },
{
  "label": "市北区",
  "value": "1494" },
{
  "label": "黄岛区",
  "value": "1495" },
{
  "label": "崂山区",
  "value": "1496" },
{
  "label": "李沧区",
  "value": "1497" },
{
  "label": "城阳区",
  "value": "1498" },
{
  "label": "胶州市",
  "value": "1499" },
{
  "label": "即墨市",
  "value": "1500" },
{
  "label": "平度市",
  "value": "1501" },
{
  "label": "莱西市",
  "value": "1502" }],

[{
  "label": "市辖区",
  "value": "1504" },
{
  "label": "淄川区",
  "value": "1505" },
{
  "label": "张店区",
  "value": "1506" },
{
  "label": "博山区",
  "value": "1507" },
{
  "label": "临淄区",
  "value": "1508" },
{
  "label": "周村区",
  "value": "1509" },
{
  "label": "桓台县",
  "value": "1510" },
{
  "label": "高青县",
  "value": "1511" },
{
  "label": "沂源县",
  "value": "1512" }],

[{
  "label": "市辖区",
  "value": "1514" },
{
  "label": "市中区",
  "value": "1515" },
{
  "label": "薛城区",
  "value": "1516" },
{
  "label": "峄城区",
  "value": "1517" },
{
  "label": "台儿庄区",
  "value": "1518" },
{
  "label": "山亭区",
  "value": "1519" },
{
  "label": "滕州市",
  "value": "1520" }],

[{
  "label": "市辖区",
  "value": "1522" },
{
  "label": "东营区",
  "value": "1523" },
{
  "label": "河口区",
  "value": "1524" },
{
  "label": "垦利区",
  "value": "1525" },
{
  "label": "利津县",
  "value": "1526" },
{
  "label": "广饶县",
  "value": "1527" }],

[{
  "label": "市辖区",
  "value": "1529" },
{
  "label": "芝罘区",
  "value": "1530" },
{
  "label": "福山区",
  "value": "1531" },
{
  "label": "牟平区",
  "value": "1532" },
{
  "label": "莱山区",
  "value": "1533" },
{
  "label": "长岛县",
  "value": "1534" },
{
  "label": "龙口市",
  "value": "1535" },
{
  "label": "莱阳市",
  "value": "1536" },
{
  "label": "莱州市",
  "value": "1537" },
{
  "label": "蓬莱市",
  "value": "1538" },
{
  "label": "招远市",
  "value": "1539" },
{
  "label": "栖霞市",
  "value": "1540" },
{
  "label": "海阳市",
  "value": "1541" }],

[{
  "label": "市辖区",
  "value": "1543" },
{
  "label": "潍城区",
  "value": "1544" },
{
  "label": "寒亭区",
  "value": "1545" },
{
  "label": "坊子区",
  "value": "1546" },
{
  "label": "奎文区",
  "value": "1547" },
{
  "label": "临朐县",
  "value": "1548" },
{
  "label": "昌乐县",
  "value": "1549" },
{
  "label": "青州市",
  "value": "1550" },
{
  "label": "诸城市",
  "value": "1551" },
{
  "label": "寿光市",
  "value": "1552" },
{
  "label": "安丘市",
  "value": "1553" },
{
  "label": "高密市",
  "value": "1554" },
{
  "label": "昌邑市",
  "value": "1555" }],

[{
  "label": "市辖区",
  "value": "1557" },
{
  "label": "任城区",
  "value": "1558" },
{
  "label": "兖州区",
  "value": "1559" },
{
  "label": "微山县",
  "value": "1560" },
{
  "label": "鱼台县",
  "value": "1561" },
{
  "label": "金乡县",
  "value": "1562" },
{
  "label": "嘉祥县",
  "value": "1563" },
{
  "label": "汶上县",
  "value": "1564" },
{
  "label": "泗水县",
  "value": "1565" },
{
  "label": "梁山县",
  "value": "1566" },
{
  "label": "曲阜市",
  "value": "1567" },
{
  "label": "邹城市",
  "value": "1568" }],

[{
  "label": "市辖区",
  "value": "1570" },
{
  "label": "泰山区",
  "value": "1571" },
{
  "label": "岱岳区",
  "value": "1572" },
{
  "label": "宁阳县",
  "value": "1573" },
{
  "label": "东平县",
  "value": "1574" },
{
  "label": "新泰市",
  "value": "1575" },
{
  "label": "肥城市",
  "value": "1576" }],

[{
  "label": "市辖区",
  "value": "1578" },
{
  "label": "环翠区",
  "value": "1579" },
{
  "label": "文登区",
  "value": "1580" },
{
  "label": "荣成市",
  "value": "1581" },
{
  "label": "乳山市",
  "value": "1582" }],

[{
  "label": "市辖区",
  "value": "1584" },
{
  "label": "东港区",
  "value": "1585" },
{
  "label": "岚山区",
  "value": "1586" },
{
  "label": "五莲县",
  "value": "1587" },
{
  "label": "莒县",
  "value": "1588" }],

[{
  "label": "市辖区",
  "value": "1590" },
{
  "label": "莱城区",
  "value": "1591" },
{
  "label": "钢城区",
  "value": "1592" }],

[{
  "label": "市辖区",
  "value": "1594" },
{
  "label": "兰山区",
  "value": "1595" },
{
  "label": "罗庄区",
  "value": "1596" },
{
  "label": "河东区",
  "value": "1597" },
{
  "label": "沂南县",
  "value": "1598" },
{
  "label": "郯城县",
  "value": "1599" },
{
  "label": "沂水县",
  "value": "1600" },
{
  "label": "兰陵县",
  "value": "1601" },
{
  "label": "费县",
  "value": "1602" },
{
  "label": "平邑县",
  "value": "1603" },
{
  "label": "莒南县",
  "value": "1604" },
{
  "label": "蒙阴县",
  "value": "1605" },
{
  "label": "临沭县",
  "value": "1606" }],

[{
  "label": "市辖区",
  "value": "1608" },
{
  "label": "德城区",
  "value": "1609" },
{
  "label": "陵城区",
  "value": "1610" },
{
  "label": "宁津县",
  "value": "1611" },
{
  "label": "庆云县",
  "value": "1612" },
{
  "label": "临邑县",
  "value": "1613" },
{
  "label": "齐河县",
  "value": "1614" },
{
  "label": "平原县",
  "value": "1615" },
{
  "label": "夏津县",
  "value": "1616" },
{
  "label": "武城县",
  "value": "1617" },
{
  "label": "乐陵市",
  "value": "1618" },
{
  "label": "禹城市",
  "value": "1619" }],

[{
  "label": "市辖区",
  "value": "1621" },
{
  "label": "东昌府区",
  "value": "1622" },
{
  "label": "阳谷县",
  "value": "1623" },
{
  "label": "莘县",
  "value": "1624" },
{
  "label": "茌平县",
  "value": "1625" },
{
  "label": "东阿县",
  "value": "1626" },
{
  "label": "冠县",
  "value": "1627" },
{
  "label": "高唐县",
  "value": "1628" },
{
  "label": "临清市",
  "value": "1629" }],

[{
  "label": "市辖区",
  "value": "1631" },
{
  "label": "滨城区",
  "value": "1632" },
{
  "label": "沾化区",
  "value": "1633" },
{
  "label": "惠民县",
  "value": "1634" },
{
  "label": "阳信县",
  "value": "1635" },
{
  "label": "无棣县",
  "value": "1636" },
{
  "label": "博兴县",
  "value": "1637" },
{
  "label": "邹平县",
  "value": "1638" }],

[{
  "label": "市辖区",
  "value": "1640" },
{
  "label": "牡丹区",
  "value": "1641" },
{
  "label": "定陶区",
  "value": "1642" },
{
  "label": "曹县",
  "value": "1643" },
{
  "label": "单县",
  "value": "1644" },
{
  "label": "成武县",
  "value": "1645" },
{
  "label": "巨野县",
  "value": "1646" },
{
  "label": "郓城县",
  "value": "1647" },
{
  "label": "鄄城县",
  "value": "1648" },
{
  "label": "东明县",
  "value": "1649" }]],


[
[{
  "label": "市辖区",
  "value": "1652" },
{
  "label": "中原区",
  "value": "1653" },
{
  "label": "二七区",
  "value": "1654" },
{
  "label": "管城回族区",
  "value": "1655" },
{
  "label": "金水区",
  "value": "1656" },
{
  "label": "上街区",
  "value": "1657" },
{
  "label": "惠济区",
  "value": "1658" },
{
  "label": "中牟县",
  "value": "1659" },
{
  "label": "巩义市",
  "value": "1660" },
{
  "label": "荥阳市",
  "value": "1661" },
{
  "label": "新密市",
  "value": "1662" },
{
  "label": "新郑市",
  "value": "1663" },
{
  "label": "登封市",
  "value": "1664" }],

[{
  "label": "市辖区",
  "value": "1666" },
{
  "label": "龙亭区",
  "value": "1667" },
{
  "label": "顺河回族区",
  "value": "1668" },
{
  "label": "鼓楼区",
  "value": "1669" },
{
  "label": "禹王台区",
  "value": "1670" },
{
  "label": "金明区",
  "value": "1671" },
{
  "label": "祥符区",
  "value": "1672" },
{
  "label": "杞县",
  "value": "1673" },
{
  "label": "通许县",
  "value": "1674" },
{
  "label": "尉氏县",
  "value": "1675" },
{
  "label": "兰考县",
  "value": "1676" }],

[{
  "label": "市辖区",
  "value": "1678" },
{
  "label": "老城区",
  "value": "1679" },
{
  "label": "西工区",
  "value": "1680" },
{
  "label": "瀍河回族区",
  "value": "1681" },
{
  "label": "涧西区",
  "value": "1682" },
{
  "label": "吉利区",
  "value": "1683" },
{
  "label": "洛龙区",
  "value": "1684" },
{
  "label": "孟津县",
  "value": "1685" },
{
  "label": "新安县",
  "value": "1686" },
{
  "label": "栾川县",
  "value": "1687" },
{
  "label": "嵩县",
  "value": "1688" },
{
  "label": "汝阳县",
  "value": "1689" },
{
  "label": "宜阳县",
  "value": "1690" },
{
  "label": "洛宁县",
  "value": "1691" },
{
  "label": "伊川县",
  "value": "1692" },
{
  "label": "偃师市",
  "value": "1693" }],

[{
  "label": "市辖区",
  "value": "1695" },
{
  "label": "新华区",
  "value": "1696" },
{
  "label": "卫东区",
  "value": "1697" },
{
  "label": "石龙区",
  "value": "1698" },
{
  "label": "湛河区",
  "value": "1699" },
{
  "label": "宝丰县",
  "value": "1700" },
{
  "label": "叶县",
  "value": "1701" },
{
  "label": "鲁山县",
  "value": "1702" },
{
  "label": "郏县",
  "value": "1703" },
{
  "label": "舞钢市",
  "value": "1704" },
{
  "label": "汝州市",
  "value": "1705" }],

[{
  "label": "市辖区",
  "value": "1707" },
{
  "label": "文峰区",
  "value": "1708" },
{
  "label": "北关区",
  "value": "1709" },
{
  "label": "殷都区",
  "value": "1710" },
{
  "label": "龙安区",
  "value": "1711" },
{
  "label": "安阳县",
  "value": "1712" },
{
  "label": "汤阴县",
  "value": "1713" },
{
  "label": "滑县",
  "value": "1714" },
{
  "label": "内黄县",
  "value": "1715" },
{
  "label": "林州市",
  "value": "1716" }],

[{
  "label": "市辖区",
  "value": "1718" },
{
  "label": "鹤山区",
  "value": "1719" },
{
  "label": "山城区",
  "value": "1720" },
{
  "label": "淇滨区",
  "value": "1721" },
{
  "label": "浚县",
  "value": "1722" },
{
  "label": "淇县",
  "value": "1723" }],

[{
  "label": "市辖区",
  "value": "1725" },
{
  "label": "红旗区",
  "value": "1726" },
{
  "label": "卫滨区",
  "value": "1727" },
{
  "label": "凤泉区",
  "value": "1728" },
{
  "label": "牧野区",
  "value": "1729" },
{
  "label": "新乡县",
  "value": "1730" },
{
  "label": "获嘉县",
  "value": "1731" },
{
  "label": "原阳县",
  "value": "1732" },
{
  "label": "延津县",
  "value": "1733" },
{
  "label": "封丘县",
  "value": "1734" },
{
  "label": "长垣县",
  "value": "1735" },
{
  "label": "卫辉市",
  "value": "1736" },
{
  "label": "辉县市",
  "value": "1737" }],

[{
  "label": "市辖区",
  "value": "1739" },
{
  "label": "解放区",
  "value": "1740" },
{
  "label": "中站区",
  "value": "1741" },
{
  "label": "马村区",
  "value": "1742" },
{
  "label": "山阳区",
  "value": "1743" },
{
  "label": "修武县",
  "value": "1744" },
{
  "label": "博爱县",
  "value": "1745" },
{
  "label": "武陟县",
  "value": "1746" },
{
  "label": "温县",
  "value": "1747" },
{
  "label": "沁阳市",
  "value": "1748" },
{
  "label": "孟州市",
  "value": "1749" }],

[{
  "label": "市辖区",
  "value": "1751" },
{
  "label": "华龙区",
  "value": "1752" },
{
  "label": "清丰县",
  "value": "1753" },
{
  "label": "南乐县",
  "value": "1754" },
{
  "label": "范县",
  "value": "1755" },
{
  "label": "台前县",
  "value": "1756" },
{
  "label": "濮阳县",
  "value": "1757" }],

[{
  "label": "市辖区",
  "value": "1759" },
{
  "label": "魏都区",
  "value": "1760" },
{
  "label": "许昌县",
  "value": "1761" },
{
  "label": "鄢陵县",
  "value": "1762" },
{
  "label": "襄城县",
  "value": "1763" },
{
  "label": "禹州市",
  "value": "1764" },
{
  "label": "长葛市",
  "value": "1765" }],

[{
  "label": "市辖区",
  "value": "1767" },
{
  "label": "源汇区",
  "value": "1768" },
{
  "label": "郾城区",
  "value": "1769" },
{
  "label": "召陵区",
  "value": "1770" },
{
  "label": "舞阳县",
  "value": "1771" },
{
  "label": "临颍县",
  "value": "1772" }],

[{
  "label": "市辖区",
  "value": "1774" },
{
  "label": "湖滨区",
  "value": "1775" },
{
  "label": "陕州区",
  "value": "1776" },
{
  "label": "渑池县",
  "value": "1777" },
{
  "label": "卢氏县",
  "value": "1778" },
{
  "label": "义马市",
  "value": "1779" },
{
  "label": "灵宝市",
  "value": "1780" }],

[{
  "label": "市辖区",
  "value": "1782" },
{
  "label": "宛城区",
  "value": "1783" },
{
  "label": "卧龙区",
  "value": "1784" },
{
  "label": "南召县",
  "value": "1785" },
{
  "label": "方城县",
  "value": "1786" },
{
  "label": "西峡县",
  "value": "1787" },
{
  "label": "镇平县",
  "value": "1788" },
{
  "label": "内乡县",
  "value": "1789" },
{
  "label": "淅川县",
  "value": "1790" },
{
  "label": "社旗县",
  "value": "1791" },
{
  "label": "唐河县",
  "value": "1792" },
{
  "label": "新野县",
  "value": "1793" },
{
  "label": "桐柏县",
  "value": "1794" },
{
  "label": "邓州市",
  "value": "1795" }],

[{
  "label": "市辖区",
  "value": "1797" },
{
  "label": "梁园区",
  "value": "1798" },
{
  "label": "睢阳区",
  "value": "1799" },
{
  "label": "民权县",
  "value": "1800" },
{
  "label": "睢县",
  "value": "1801" },
{
  "label": "宁陵县",
  "value": "1802" },
{
  "label": "柘城县",
  "value": "1803" },
{
  "label": "虞城县",
  "value": "1804" },
{
  "label": "夏邑县",
  "value": "1805" },
{
  "label": "永城市",
  "value": "1806" }],

[{
  "label": "市辖区",
  "value": "1808" },
{
  "label": "浉河区",
  "value": "1809" },
{
  "label": "平桥区",
  "value": "1810" },
{
  "label": "罗山县",
  "value": "1811" },
{
  "label": "光山县",
  "value": "1812" },
{
  "label": "新县",
  "value": "1813" },
{
  "label": "商城县",
  "value": "1814" },
{
  "label": "固始县",
  "value": "1815" },
{
  "label": "潢川县",
  "value": "1816" },
{
  "label": "淮滨县",
  "value": "1817" },
{
  "label": "息县",
  "value": "1818" }],

[{
  "label": "市辖区",
  "value": "1820" },
{
  "label": "川汇区",
  "value": "1821" },
{
  "label": "扶沟县",
  "value": "1822" },
{
  "label": "西华县",
  "value": "1823" },
{
  "label": "商水县",
  "value": "1824" },
{
  "label": "沈丘县",
  "value": "1825" },
{
  "label": "郸城县",
  "value": "1826" },
{
  "label": "淮阳县",
  "value": "1827" },
{
  "label": "太康县",
  "value": "1828" },
{
  "label": "鹿邑县",
  "value": "1829" },
{
  "label": "项城市",
  "value": "1830" }],

[{
  "label": "市辖区",
  "value": "1832" },
{
  "label": "驿城区",
  "value": "1833" },
{
  "label": "西平县",
  "value": "1834" },
{
  "label": "上蔡县",
  "value": "1835" },
{
  "label": "平舆县",
  "value": "1836" },
{
  "label": "正阳县",
  "value": "1837" },
{
  "label": "确山县",
  "value": "1838" },
{
  "label": "泌阳县",
  "value": "1839" },
{
  "label": "汝南县",
  "value": "1840" },
{
  "label": "遂平县",
  "value": "1841" },
{
  "label": "新蔡县",
  "value": "1842" }],

[{
  "label": "济源市",
  "value": "1844" }]],


[
[{
  "label": "市辖区",
  "value": "1847" },
{
  "label": "江岸区",
  "value": "1848" },
{
  "label": "江汉区",
  "value": "1849" },
{
  "label": "硚口区",
  "value": "1850" },
{
  "label": "汉阳区",
  "value": "1851" },
{
  "label": "武昌区",
  "value": "1852" },
{
  "label": "青山区",
  "value": "1853" },
{
  "label": "洪山区",
  "value": "1854" },
{
  "label": "东西湖区",
  "value": "1855" },
{
  "label": "汉南区",
  "value": "1856" },
{
  "label": "蔡甸区",
  "value": "1857" },
{
  "label": "江夏区",
  "value": "1858" },
{
  "label": "黄陂区",
  "value": "1859" },
{
  "label": "新洲区",
  "value": "1860" }],

[{
  "label": "市辖区",
  "value": "1862" },
{
  "label": "黄石港区",
  "value": "1863" },
{
  "label": "西塞山区",
  "value": "1864" },
{
  "label": "下陆区",
  "value": "1865" },
{
  "label": "铁山区",
  "value": "1866" },
{
  "label": "阳新县",
  "value": "1867" },
{
  "label": "大冶市",
  "value": "1868" }],

[{
  "label": "市辖区",
  "value": "1870" },
{
  "label": "茅箭区",
  "value": "1871" },
{
  "label": "张湾区",
  "value": "1872" },
{
  "label": "郧阳区",
  "value": "1873" },
{
  "label": "郧西县",
  "value": "1874" },
{
  "label": "竹山县",
  "value": "1875" },
{
  "label": "竹溪县",
  "value": "1876" },
{
  "label": "房县",
  "value": "1877" },
{
  "label": "丹江口市",
  "value": "1878" }],

[{
  "label": "市辖区",
  "value": "1880" },
{
  "label": "西陵区",
  "value": "1881" },
{
  "label": "伍家岗区",
  "value": "1882" },
{
  "label": "点军区",
  "value": "1883" },
{
  "label": "猇亭区",
  "value": "1884" },
{
  "label": "夷陵区",
  "value": "1885" },
{
  "label": "远安县",
  "value": "1886" },
{
  "label": "兴山县",
  "value": "1887" },
{
  "label": "秭归县",
  "value": "1888" },
{
  "label": "长阳土家族自治县",
  "value": "1889" },
{
  "label": "五峰土家族自治县",
  "value": "1890" },
{
  "label": "宜都市",
  "value": "1891" },
{
  "label": "当阳市",
  "value": "1892" },
{
  "label": "枝江市",
  "value": "1893" }],

[{
  "label": "市辖区",
  "value": "1895" },
{
  "label": "襄城区",
  "value": "1896" },
{
  "label": "樊城区",
  "value": "1897" },
{
  "label": "襄州区",
  "value": "1898" },
{
  "label": "南漳县",
  "value": "1899" },
{
  "label": "谷城县",
  "value": "1900" },
{
  "label": "保康县",
  "value": "1901" },
{
  "label": "老河口市",
  "value": "1902" },
{
  "label": "枣阳市",
  "value": "1903" },
{
  "label": "宜城市",
  "value": "1904" }],

[{
  "label": "市辖区",
  "value": "1906" },
{
  "label": "梁子湖区",
  "value": "1907" },
{
  "label": "华容区",
  "value": "1908" },
{
  "label": "鄂城区",
  "value": "1909" }],

[{
  "label": "市辖区",
  "value": "1911" },
{
  "label": "东宝区",
  "value": "1912" },
{
  "label": "掇刀区",
  "value": "1913" },
{
  "label": "京山县",
  "value": "1914" },
{
  "label": "沙洋县",
  "value": "1915" },
{
  "label": "钟祥市",
  "value": "1916" }],

[{
  "label": "市辖区",
  "value": "1918" },
{
  "label": "孝南区",
  "value": "1919" },
{
  "label": "孝昌县",
  "value": "1920" },
{
  "label": "大悟县",
  "value": "1921" },
{
  "label": "云梦县",
  "value": "1922" },
{
  "label": "应城市",
  "value": "1923" },
{
  "label": "安陆市",
  "value": "1924" },
{
  "label": "汉川市",
  "value": "1925" }],

[{
  "label": "市辖区",
  "value": "1927" },
{
  "label": "沙市区",
  "value": "1928" },
{
  "label": "荆州区",
  "value": "1929" },
{
  "label": "公安县",
  "value": "1930" },
{
  "label": "监利县",
  "value": "1931" },
{
  "label": "江陵县",
  "value": "1932" },
{
  "label": "石首市",
  "value": "1933" },
{
  "label": "洪湖市",
  "value": "1934" },
{
  "label": "松滋市",
  "value": "1935" }],

[{
  "label": "市辖区",
  "value": "1937" },
{
  "label": "黄州区",
  "value": "1938" },
{
  "label": "团风县",
  "value": "1939" },
{
  "label": "红安县",
  "value": "1940" },
{
  "label": "罗田县",
  "value": "1941" },
{
  "label": "英山县",
  "value": "1942" },
{
  "label": "浠水县",
  "value": "1943" },
{
  "label": "蕲春县",
  "value": "1944" },
{
  "label": "黄梅县",
  "value": "1945" },
{
  "label": "麻城市",
  "value": "1946" },
{
  "label": "武穴市",
  "value": "1947" }],

[{
  "label": "市辖区",
  "value": "1949" },
{
  "label": "咸安区",
  "value": "1950" },
{
  "label": "嘉鱼县",
  "value": "1951" },
{
  "label": "通城县",
  "value": "1952" },
{
  "label": "崇阳县",
  "value": "1953" },
{
  "label": "通山县",
  "value": "1954" },
{
  "label": "赤壁市",
  "value": "1955" }],

[{
  "label": "市辖区",
  "value": "1957" },
{
  "label": "曾都区",
  "value": "1958" },
{
  "label": "随县",
  "value": "1959" },
{
  "label": "广水市",
  "value": "1960" }],

[{
  "label": "恩施市",
  "value": "1962" },
{
  "label": "利川市",
  "value": "1963" },
{
  "label": "建始县",
  "value": "1964" },
{
  "label": "巴东县",
  "value": "1965" },
{
  "label": "宣恩县",
  "value": "1966" },
{
  "label": "咸丰县",
  "value": "1967" },
{
  "label": "来凤县",
  "value": "1968" },
{
  "label": "鹤峰县",
  "value": "1969" }],

[{
  "label": "仙桃市",
  "value": "1971" },
{
  "label": "潜江市",
  "value": "1972" },
{
  "label": "天门市",
  "value": "1973" },
{
  "label": "神农架林区",
  "value": "1974" }]],


[
[{
  "label": "市辖区",
  "value": "1977" },
{
  "label": "芙蓉区",
  "value": "1978" },
{
  "label": "天心区",
  "value": "1979" },
{
  "label": "岳麓区",
  "value": "1980" },
{
  "label": "开福区",
  "value": "1981" },
{
  "label": "雨花区",
  "value": "1982" },
{
  "label": "望城区",
  "value": "1983" },
{
  "label": "长沙县",
  "value": "1984" },
{
  "label": "宁乡县",
  "value": "1985" },
{
  "label": "浏阳市",
  "value": "1986" }],

[{
  "label": "市辖区",
  "value": "1988" },
{
  "label": "荷塘区",
  "value": "1989" },
{
  "label": "芦淞区",
  "value": "1990" },
{
  "label": "石峰区",
  "value": "1991" },
{
  "label": "天元区",
  "value": "1992" },
{
  "label": "株洲县",
  "value": "1993" },
{
  "label": "攸县",
  "value": "1994" },
{
  "label": "茶陵县",
  "value": "1995" },
{
  "label": "炎陵县",
  "value": "1996" },
{
  "label": "醴陵市",
  "value": "1997" }],

[{
  "label": "市辖区",
  "value": "1999" },
{
  "label": "雨湖区",
  "value": "2000" },
{
  "label": "岳塘区",
  "value": "2001" },
{
  "label": "湘潭县",
  "value": "2002" },
{
  "label": "湘乡市",
  "value": "2003" },
{
  "label": "韶山市",
  "value": "2004" }],

[{
  "label": "市辖区",
  "value": "2006" },
{
  "label": "珠晖区",
  "value": "2007" },
{
  "label": "雁峰区",
  "value": "2008" },
{
  "label": "石鼓区",
  "value": "2009" },
{
  "label": "蒸湘区",
  "value": "2010" },
{
  "label": "南岳区",
  "value": "2011" },
{
  "label": "衡阳县",
  "value": "2012" },
{
  "label": "衡南县",
  "value": "2013" },
{
  "label": "衡山县",
  "value": "2014" },
{
  "label": "衡东县",
  "value": "2015" },
{
  "label": "祁东县",
  "value": "2016" },
{
  "label": "耒阳市",
  "value": "2017" },
{
  "label": "常宁市",
  "value": "2018" }],

[{
  "label": "市辖区",
  "value": "2020" },
{
  "label": "双清区",
  "value": "2021" },
{
  "label": "大祥区",
  "value": "2022" },
{
  "label": "北塔区",
  "value": "2023" },
{
  "label": "邵东县",
  "value": "2024" },
{
  "label": "新邵县",
  "value": "2025" },
{
  "label": "邵阳县",
  "value": "2026" },
{
  "label": "隆回县",
  "value": "2027" },
{
  "label": "洞口县",
  "value": "2028" },
{
  "label": "绥宁县",
  "value": "2029" },
{
  "label": "新宁县",
  "value": "2030" },
{
  "label": "城步苗族自治县",
  "value": "2031" },
{
  "label": "武冈市",
  "value": "2032" }],

[{
  "label": "市辖区",
  "value": "2034" },
{
  "label": "岳阳楼区",
  "value": "2035" },
{
  "label": "云溪区",
  "value": "2036" },
{
  "label": "君山区",
  "value": "2037" },
{
  "label": "岳阳县",
  "value": "2038" },
{
  "label": "华容县",
  "value": "2039" },
{
  "label": "湘阴县",
  "value": "2040" },
{
  "label": "平江县",
  "value": "2041" },
{
  "label": "汨罗市",
  "value": "2042" },
{
  "label": "临湘市",
  "value": "2043" }],

[{
  "label": "市辖区",
  "value": "2045" },
{
  "label": "武陵区",
  "value": "2046" },
{
  "label": "鼎城区",
  "value": "2047" },
{
  "label": "安乡县",
  "value": "2048" },
{
  "label": "汉寿县",
  "value": "2049" },
{
  "label": "澧县",
  "value": "2050" },
{
  "label": "临澧县",
  "value": "2051" },
{
  "label": "桃源县",
  "value": "2052" },
{
  "label": "石门县",
  "value": "2053" },
{
  "label": "津市市",
  "value": "2054" }],

[{
  "label": "市辖区",
  "value": "2056" },
{
  "label": "永定区",
  "value": "2057" },
{
  "label": "武陵源区",
  "value": "2058" },
{
  "label": "慈利县",
  "value": "2059" },
{
  "label": "桑植县",
  "value": "2060" }],

[{
  "label": "市辖区",
  "value": "2062" },
{
  "label": "资阳区",
  "value": "2063" },
{
  "label": "赫山区",
  "value": "2064" },
{
  "label": "南县",
  "value": "2065" },
{
  "label": "桃江县",
  "value": "2066" },
{
  "label": "安化县",
  "value": "2067" },
{
  "label": "沅江市",
  "value": "2068" }],

[{
  "label": "市辖区",
  "value": "2070" },
{
  "label": "北湖区",
  "value": "2071" },
{
  "label": "苏仙区",
  "value": "2072" },
{
  "label": "桂阳县",
  "value": "2073" },
{
  "label": "宜章县",
  "value": "2074" },
{
  "label": "永兴县",
  "value": "2075" },
{
  "label": "嘉禾县",
  "value": "2076" },
{
  "label": "临武县",
  "value": "2077" },
{
  "label": "汝城县",
  "value": "2078" },
{
  "label": "桂东县",
  "value": "2079" },
{
  "label": "安仁县",
  "value": "2080" },
{
  "label": "资兴市",
  "value": "2081" }],

[{
  "label": "市辖区",
  "value": "2083" },
{
  "label": "零陵区",
  "value": "2084" },
{
  "label": "冷水滩区",
  "value": "2085" },
{
  "label": "祁阳县",
  "value": "2086" },
{
  "label": "东安县",
  "value": "2087" },
{
  "label": "双牌县",
  "value": "2088" },
{
  "label": "道县",
  "value": "2089" },
{
  "label": "江永县",
  "value": "2090" },
{
  "label": "宁远县",
  "value": "2091" },
{
  "label": "蓝山县",
  "value": "2092" },
{
  "label": "新田县",
  "value": "2093" },
{
  "label": "江华瑶族自治县",
  "value": "2094" }],

[{
  "label": "市辖区",
  "value": "2096" },
{
  "label": "鹤城区",
  "value": "2097" },
{
  "label": "中方县",
  "value": "2098" },
{
  "label": "沅陵县",
  "value": "2099" },
{
  "label": "辰溪县",
  "value": "2100" },
{
  "label": "溆浦县",
  "value": "2101" },
{
  "label": "会同县",
  "value": "2102" },
{
  "label": "麻阳苗族自治县",
  "value": "2103" },
{
  "label": "新晃侗族自治县",
  "value": "2104" },
{
  "label": "芷江侗族自治县",
  "value": "2105" },
{
  "label": "靖州苗族侗族自治县",
  "value": "2106" },
{
  "label": "通道侗族自治县",
  "value": "2107" },
{
  "label": "洪江市",
  "value": "2108" }],

[{
  "label": "市辖区",
  "value": "2110" },
{
  "label": "娄星区",
  "value": "2111" },
{
  "label": "双峰县",
  "value": "2112" },
{
  "label": "新化县",
  "value": "2113" },
{
  "label": "冷水江市",
  "value": "2114" },
{
  "label": "涟源市",
  "value": "2115" }],

[{
  "label": "吉首市",
  "value": "2117" },
{
  "label": "泸溪县",
  "value": "2118" },
{
  "label": "凤凰县",
  "value": "2119" },
{
  "label": "花垣县",
  "value": "2120" },
{
  "label": "保靖县",
  "value": "2121" },
{
  "label": "古丈县",
  "value": "2122" },
{
  "label": "永顺县",
  "value": "2123" },
{
  "label": "龙山县",
  "value": "2124" }]],


[
[{
  "label": "市辖区",
  "value": "2127" },
{
  "label": "荔湾区",
  "value": "2128" },
{
  "label": "越秀区",
  "value": "2129" },
{
  "label": "海珠区",
  "value": "2130" },
{
  "label": "天河区",
  "value": "2131" },
{
  "label": "白云区",
  "value": "2132" },
{
  "label": "黄埔区",
  "value": "2133" },
{
  "label": "番禺区",
  "value": "2134" },
{
  "label": "花都区",
  "value": "2135" },
{
  "label": "南沙区",
  "value": "2136" },
{
  "label": "从化区",
  "value": "2137" },
{
  "label": "增城区",
  "value": "2138" }],

[{
  "label": "市辖区",
  "value": "2140" },
{
  "label": "武江区",
  "value": "2141" },
{
  "label": "浈江区",
  "value": "2142" },
{
  "label": "曲江区",
  "value": "2143" },
{
  "label": "始兴县",
  "value": "2144" },
{
  "label": "仁化县",
  "value": "2145" },
{
  "label": "翁源县",
  "value": "2146" },
{
  "label": "乳源瑶族自治县",
  "value": "2147" },
{
  "label": "新丰县",
  "value": "2148" },
{
  "label": "乐昌市",
  "value": "2149" },
{
  "label": "南雄市",
  "value": "2150" }],

[{
  "label": "市辖区",
  "value": "2152" },
{
  "label": "罗湖区",
  "value": "2153" },
{
  "label": "福田区",
  "value": "2154" },
{
  "label": "南山区",
  "value": "2155" },
{
  "label": "宝安区",
  "value": "2156" },
{
  "label": "龙岗区",
  "value": "2157" },
{
  "label": "盐田区",
  "value": "2158" }],

[{
  "label": "市辖区",
  "value": "2160" },
{
  "label": "香洲区",
  "value": "2161" },
{
  "label": "斗门区",
  "value": "2162" },
{
  "label": "金湾区",
  "value": "2163" }],

[{
  "label": "市辖区",
  "value": "2165" },
{
  "label": "龙湖区",
  "value": "2166" },
{
  "label": "金平区",
  "value": "2167" },
{
  "label": "濠江区",
  "value": "2168" },
{
  "label": "潮阳区",
  "value": "2169" },
{
  "label": "潮南区",
  "value": "2170" },
{
  "label": "澄海区",
  "value": "2171" },
{
  "label": "南澳县",
  "value": "2172" }],

[{
  "label": "市辖区",
  "value": "2174" },
{
  "label": "禅城区",
  "value": "2175" },
{
  "label": "南海区",
  "value": "2176" },
{
  "label": "顺德区",
  "value": "2177" },
{
  "label": "三水区",
  "value": "2178" },
{
  "label": "高明区",
  "value": "2179" }],

[{
  "label": "市辖区",
  "value": "2181" },
{
  "label": "蓬江区",
  "value": "2182" },
{
  "label": "江海区",
  "value": "2183" },
{
  "label": "新会区",
  "value": "2184" },
{
  "label": "台山市",
  "value": "2185" },
{
  "label": "开平市",
  "value": "2186" },
{
  "label": "鹤山市",
  "value": "2187" },
{
  "label": "恩平市",
  "value": "2188" }],

[{
  "label": "市辖区",
  "value": "2190" },
{
  "label": "赤坎区",
  "value": "2191" },
{
  "label": "霞山区",
  "value": "2192" },
{
  "label": "坡头区",
  "value": "2193" },
{
  "label": "麻章区",
  "value": "2194" },
{
  "label": "遂溪县",
  "value": "2195" },
{
  "label": "徐闻县",
  "value": "2196" },
{
  "label": "廉江市",
  "value": "2197" },
{
  "label": "雷州市",
  "value": "2198" },
{
  "label": "吴川市",
  "value": "2199" }],

[{
  "label": "市辖区",
  "value": "2201" },
{
  "label": "茂南区",
  "value": "2202" },
{
  "label": "电白区",
  "value": "2203" },
{
  "label": "高州市",
  "value": "2204" },
{
  "label": "化州市",
  "value": "2205" },
{
  "label": "信宜市",
  "value": "2206" }],

[{
  "label": "市辖区",
  "value": "2208" },
{
  "label": "端州区",
  "value": "2209" },
{
  "label": "鼎湖区",
  "value": "2210" },
{
  "label": "高要区",
  "value": "2211" },
{
  "label": "广宁县",
  "value": "2212" },
{
  "label": "怀集县",
  "value": "2213" },
{
  "label": "封开县",
  "value": "2214" },
{
  "label": "德庆县",
  "value": "2215" },
{
  "label": "四会市",
  "value": "2216" }],

[{
  "label": "市辖区",
  "value": "2218" },
{
  "label": "惠城区",
  "value": "2219" },
{
  "label": "惠阳区",
  "value": "2220" },
{
  "label": "博罗县",
  "value": "2221" },
{
  "label": "惠东县",
  "value": "2222" },
{
  "label": "龙门县",
  "value": "2223" }],

[{
  "label": "市辖区",
  "value": "2225" },
{
  "label": "梅江区",
  "value": "2226" },
{
  "label": "梅县区",
  "value": "2227" },
{
  "label": "大埔县",
  "value": "2228" },
{
  "label": "丰顺县",
  "value": "2229" },
{
  "label": "五华县",
  "value": "2230" },
{
  "label": "平远县",
  "value": "2231" },
{
  "label": "蕉岭县",
  "value": "2232" },
{
  "label": "兴宁市",
  "value": "2233" }],

[{
  "label": "市辖区",
  "value": "2235" },
{
  "label": "城区",
  "value": "2236" },
{
  "label": "海丰县",
  "value": "2237" },
{
  "label": "陆河县",
  "value": "2238" },
{
  "label": "陆丰市",
  "value": "2239" }],

[{
  "label": "市辖区",
  "value": "2241" },
{
  "label": "源城区",
  "value": "2242" },
{
  "label": "紫金县",
  "value": "2243" },
{
  "label": "龙川县",
  "value": "2244" },
{
  "label": "连平县",
  "value": "2245" },
{
  "label": "和平县",
  "value": "2246" },
{
  "label": "东源县",
  "value": "2247" }],

[{
  "label": "市辖区",
  "value": "2249" },
{
  "label": "江城区",
  "value": "2250" },
{
  "label": "阳东区",
  "value": "2251" },
{
  "label": "阳西县",
  "value": "2252" },
{
  "label": "阳春市",
  "value": "2253" }],

[{
  "label": "市辖区",
  "value": "2255" },
{
  "label": "清城区",
  "value": "2256" },
{
  "label": "清新区",
  "value": "2257" },
{
  "label": "佛冈县",
  "value": "2258" },
{
  "label": "阳山县",
  "value": "2259" },
{
  "label": "连山壮族瑶族自治县",
  "value": "2260" },
{
  "label": "连南瑶族自治县",
  "value": "2261" },
{
  "label": "英德市",
  "value": "2262" },
{
  "label": "连州市",
  "value": "2263" }],

[{
  "label": "市辖区",
  "value": "2267" },
{
  "label": "湘桥区",
  "value": "2268" },
{
  "label": "潮安区",
  "value": "2269" },
{
  "label": "饶平县",
  "value": "2270" }],

[{
  "label": "市辖区",
  "value": "2272" },
{
  "label": "榕城区",
  "value": "2273" },
{
  "label": "揭东区",
  "value": "2274" },
{
  "label": "揭西县",
  "value": "2275" },
{
  "label": "惠来县",
  "value": "2276" },
{
  "label": "普宁市",
  "value": "2277" }],

[{
  "label": "市辖区",
  "value": "2279" },
{
  "label": "云城区",
  "value": "2280" },
{
  "label": "云安区",
  "value": "2281" },
{
  "label": "新兴县",
  "value": "2282" },
{
  "label": "郁南县",
  "value": "2283" },
{
  "label": "罗定市",
  "value": "2284" }]],


[
[{
  "label": "市辖区",
  "value": "2287" },
{
  "label": "兴宁区",
  "value": "2288" },
{
  "label": "青秀区",
  "value": "2289" },
{
  "label": "江南区",
  "value": "2290" },
{
  "label": "西乡塘区",
  "value": "2291" },
{
  "label": "良庆区",
  "value": "2292" },
{
  "label": "邕宁区",
  "value": "2293" },
{
  "label": "武鸣区",
  "value": "2294" },
{
  "label": "隆安县",
  "value": "2295" },
{
  "label": "马山县",
  "value": "2296" },
{
  "label": "上林县",
  "value": "2297" },
{
  "label": "宾阳县",
  "value": "2298" },
{
  "label": "横县",
  "value": "2299" }],

[{
  "label": "市辖区",
  "value": "2301" },
{
  "label": "城中区",
  "value": "2302" },
{
  "label": "鱼峰区",
  "value": "2303" },
{
  "label": "柳南区",
  "value": "2304" },
{
  "label": "柳北区",
  "value": "2305" },
{
  "label": "柳江区",
  "value": "2306" },
{
  "label": "柳城县",
  "value": "2307" },
{
  "label": "鹿寨县",
  "value": "2308" },
{
  "label": "融安县",
  "value": "2309" },
{
  "label": "融水苗族自治县",
  "value": "2310" },
{
  "label": "三江侗族自治县",
  "value": "2311" }],

[{
  "label": "市辖区",
  "value": "2313" },
{
  "label": "秀峰区",
  "value": "2314" },
{
  "label": "叠彩区",
  "value": "2315" },
{
  "label": "象山区",
  "value": "2316" },
{
  "label": "七星区",
  "value": "2317" },
{
  "label": "雁山区",
  "value": "2318" },
{
  "label": "临桂区",
  "value": "2319" },
{
  "label": "阳朔县",
  "value": "2320" },
{
  "label": "灵川县",
  "value": "2321" },
{
  "label": "全州县",
  "value": "2322" },
{
  "label": "兴安县",
  "value": "2323" },
{
  "label": "永福县",
  "value": "2324" },
{
  "label": "灌阳县",
  "value": "2325" },
{
  "label": "龙胜各族自治县",
  "value": "2326" },
{
  "label": "资源县",
  "value": "2327" },
{
  "label": "平乐县",
  "value": "2328" },
{
  "label": "荔浦县",
  "value": "2329" },
{
  "label": "恭城瑶族自治县",
  "value": "2330" }],

[{
  "label": "市辖区",
  "value": "2332" },
{
  "label": "万秀区",
  "value": "2333" },
{
  "label": "长洲区",
  "value": "2334" },
{
  "label": "龙圩区",
  "value": "2335" },
{
  "label": "苍梧县",
  "value": "2336" },
{
  "label": "藤县",
  "value": "2337" },
{
  "label": "蒙山县",
  "value": "2338" },
{
  "label": "岑溪市",
  "value": "2339" }],

[{
  "label": "市辖区",
  "value": "2341" },
{
  "label": "海城区",
  "value": "2342" },
{
  "label": "银海区",
  "value": "2343" },
{
  "label": "铁山港区",
  "value": "2344" },
{
  "label": "合浦县",
  "value": "2345" }],

[{
  "label": "市辖区",
  "value": "2347" },
{
  "label": "港口区",
  "value": "2348" },
{
  "label": "防城区",
  "value": "2349" },
{
  "label": "上思县",
  "value": "2350" },
{
  "label": "东兴市",
  "value": "2351" }],

[{
  "label": "市辖区",
  "value": "2353" },
{
  "label": "钦南区",
  "value": "2354" },
{
  "label": "钦北区",
  "value": "2355" },
{
  "label": "灵山县",
  "value": "2356" },
{
  "label": "浦北县",
  "value": "2357" }],

[{
  "label": "市辖区",
  "value": "2359" },
{
  "label": "港北区",
  "value": "2360" },
{
  "label": "港南区",
  "value": "2361" },
{
  "label": "覃塘区",
  "value": "2362" },
{
  "label": "平南县",
  "value": "2363" },
{
  "label": "桂平市",
  "value": "2364" }],

[{
  "label": "市辖区",
  "value": "2366" },
{
  "label": "玉州区",
  "value": "2367" },
{
  "label": "福绵区",
  "value": "2368" },
{
  "label": "容县",
  "value": "2369" },
{
  "label": "陆川县",
  "value": "2370" },
{
  "label": "博白县",
  "value": "2371" },
{
  "label": "兴业县",
  "value": "2372" },
{
  "label": "北流市",
  "value": "2373" }],

[{
  "label": "市辖区",
  "value": "2375" },
{
  "label": "右江区",
  "value": "2376" },
{
  "label": "田阳县",
  "value": "2377" },
{
  "label": "田东县",
  "value": "2378" },
{
  "label": "平果县",
  "value": "2379" },
{
  "label": "德保县",
  "value": "2380" },
{
  "label": "那坡县",
  "value": "2381" },
{
  "label": "凌云县",
  "value": "2382" },
{
  "label": "乐业县",
  "value": "2383" },
{
  "label": "田林县",
  "value": "2384" },
{
  "label": "西林县",
  "value": "2385" },
{
  "label": "隆林各族自治县",
  "value": "2386" },
{
  "label": "靖西市",
  "value": "2387" }],

[{
  "label": "市辖区",
  "value": "2389" },
{
  "label": "八步区",
  "value": "2390" },
{
  "label": "平桂区",
  "value": "2391" },
{
  "label": "昭平县",
  "value": "2392" },
{
  "label": "钟山县",
  "value": "2393" },
{
  "label": "富川瑶族自治县",
  "value": "2394" }],

[{
  "label": "市辖区",
  "value": "2396" },
{
  "label": "金城江区",
  "value": "2397" },
{
  "label": "南丹县",
  "value": "2398" },
{
  "label": "天峨县",
  "value": "2399" },
{
  "label": "凤山县",
  "value": "2400" },
{
  "label": "东兰县",
  "value": "2401" },
{
  "label": "罗城仫佬族自治县",
  "value": "2402" },
{
  "label": "环江毛南族自治县",
  "value": "2403" },
{
  "label": "巴马瑶族自治县",
  "value": "2404" },
{
  "label": "都安瑶族自治县",
  "value": "2405" },
{
  "label": "大化瑶族自治县",
  "value": "2406" },
{
  "label": "宜州市",
  "value": "2407" }],

[{
  "label": "市辖区",
  "value": "2409" },
{
  "label": "兴宾区",
  "value": "2410" },
{
  "label": "忻城县",
  "value": "2411" },
{
  "label": "象州县",
  "value": "2412" },
{
  "label": "武宣县",
  "value": "2413" },
{
  "label": "金秀瑶族自治县",
  "value": "2414" },
{
  "label": "合山市",
  "value": "2415" }],

[{
  "label": "市辖区",
  "value": "2417" },
{
  "label": "江州区",
  "value": "2418" },
{
  "label": "扶绥县",
  "value": "2419" },
{
  "label": "宁明县",
  "value": "2420" },
{
  "label": "龙州县",
  "value": "2421" },
{
  "label": "大新县",
  "value": "2422" },
{
  "label": "天等县",
  "value": "2423" },
{
  "label": "凭祥市",
  "value": "2424" }]],


[
[{
  "label": "市辖区",
  "value": "2427" },
{
  "label": "秀英区",
  "value": "2428" },
{
  "label": "龙华区",
  "value": "2429" },
{
  "label": "琼山区",
  "value": "2430" },
{
  "label": "美兰区",
  "value": "2431" }],

[{
  "label": "市辖区",
  "value": "2433" },
{
  "label": "海棠区",
  "value": "2434" },
{
  "label": "吉阳区",
  "value": "2435" },
{
  "label": "天涯区",
  "value": "2436" },
{
  "label": "崖州区",
  "value": "2437" }],

[{
  "label": "五指山市",
  "value": "2441" },
{
  "label": "琼海市",
  "value": "2442" },
{
  "label": "文昌市",
  "value": "2443" },
{
  "label": "万宁市",
  "value": "2444" },
{
  "label": "东方市",
  "value": "2445" },
{
  "label": "定安县",
  "value": "2446" },
{
  "label": "屯昌县",
  "value": "2447" },
{
  "label": "澄迈县",
  "value": "2448" },
{
  "label": "临高县",
  "value": "2449" },
{
  "label": "白沙黎族自治县",
  "value": "2450" },
{
  "label": "昌江黎族自治县",
  "value": "2451" },
{
  "label": "乐东黎族自治县",
  "value": "2452" },
{
  "label": "陵水黎族自治县",
  "value": "2453" },
{
  "label": "保亭黎族苗族自治县",
  "value": "2454" },
{
  "label": "琼中黎族苗族自治县",
  "value": "2455" }]],


[
[{
  "label": "万州区",
  "value": "2458" },
{
  "label": "涪陵区",
  "value": "2459" },
{
  "label": "渝中区",
  "value": "2460" },
{
  "label": "大渡口区",
  "value": "2461" },
{
  "label": "江北区",
  "value": "2462" },
{
  "label": "沙坪坝区",
  "value": "2463" },
{
  "label": "九龙坡区",
  "value": "2464" },
{
  "label": "南岸区",
  "value": "2465" },
{
  "label": "北碚区",
  "value": "2466" },
{
  "label": "綦江区",
  "value": "2467" },
{
  "label": "大足区",
  "value": "2468" },
{
  "label": "渝北区",
  "value": "2469" },
{
  "label": "巴南区",
  "value": "2470" },
{
  "label": "黔江区",
  "value": "2471" },
{
  "label": "长寿区",
  "value": "2472" },
{
  "label": "江津区",
  "value": "2473" },
{
  "label": "合川区",
  "value": "2474" },
{
  "label": "永川区",
  "value": "2475" },
{
  "label": "南川区",
  "value": "2476" },
{
  "label": "璧山区",
  "value": "2477" },
{
  "label": "铜梁区",
  "value": "2478" },
{
  "label": "潼南区",
  "value": "2479" },
{
  "label": "荣昌区",
  "value": "2480" },
{
  "label": "开州区",
  "value": "2481" }],

[{
  "label": "梁平县",
  "value": "2483" },
{
  "label": "城口县",
  "value": "2484" },
{
  "label": "丰都县",
  "value": "2485" },
{
  "label": "垫江县",
  "value": "2486" },
{
  "label": "武隆县",
  "value": "2487" },
{
  "label": "忠县",
  "value": "2488" },
{
  "label": "云阳县",
  "value": "2489" },
{
  "label": "奉节县",
  "value": "2490" },
{
  "label": "巫山县",
  "value": "2491" },
{
  "label": "巫溪县",
  "value": "2492" },
{
  "label": "石柱土家族自治县",
  "value": "2493" },
{
  "label": "秀山土家族苗族自治县",
  "value": "2494" },
{
  "label": "酉阳土家族苗族自治县",
  "value": "2495" },
{
  "label": "彭水苗族土家族自治县",
  "value": "2496" }]],


[
[{
  "label": "市辖区",
  "value": "2499" },
{
  "label": "锦江区",
  "value": "2500" },
{
  "label": "青羊区",
  "value": "2501" },
{
  "label": "金牛区",
  "value": "2502" },
{
  "label": "武侯区",
  "value": "2503" },
{
  "label": "成华区",
  "value": "2504" },
{
  "label": "龙泉驿区",
  "value": "2505" },
{
  "label": "青白江区",
  "value": "2506" },
{
  "label": "新都区",
  "value": "2507" },
{
  "label": "温江区",
  "value": "2508" },
{
  "label": "双流区",
  "value": "2509" },
{
  "label": "金堂县",
  "value": "2510" },
{
  "label": "郫县",
  "value": "2511" },
{
  "label": "大邑县",
  "value": "2512" },
{
  "label": "蒲江县",
  "value": "2513" },
{
  "label": "新津县",
  "value": "2514" },
{
  "label": "都江堰市",
  "value": "2515" },
{
  "label": "彭州市",
  "value": "2516" },
{
  "label": "邛崃市",
  "value": "2517" },
{
  "label": "崇州市",
  "value": "2518" },
{
  "label": "简阳市",
  "value": "2519" }],

[{
  "label": "市辖区",
  "value": "2521" },
{
  "label": "自流井区",
  "value": "2522" },
{
  "label": "贡井区",
  "value": "2523" },
{
  "label": "大安区",
  "value": "2524" },
{
  "label": "沿滩区",
  "value": "2525" },
{
  "label": "荣县",
  "value": "2526" },
{
  "label": "富顺县",
  "value": "2527" }],

[{
  "label": "市辖区",
  "value": "2529" },
{
  "label": "东区",
  "value": "2530" },
{
  "label": "西区",
  "value": "2531" },
{
  "label": "仁和区",
  "value": "2532" },
{
  "label": "米易县",
  "value": "2533" },
{
  "label": "盐边县",
  "value": "2534" }],

[{
  "label": "市辖区",
  "value": "2536" },
{
  "label": "江阳区",
  "value": "2537" },
{
  "label": "纳溪区",
  "value": "2538" },
{
  "label": "龙马潭区",
  "value": "2539" },
{
  "label": "泸县",
  "value": "2540" },
{
  "label": "合江县",
  "value": "2541" },
{
  "label": "叙永县",
  "value": "2542" },
{
  "label": "古蔺县",
  "value": "2543" }],

[{
  "label": "市辖区",
  "value": "2545" },
{
  "label": "旌阳区",
  "value": "2546" },
{
  "label": "中江县",
  "value": "2547" },
{
  "label": "罗江县",
  "value": "2548" },
{
  "label": "广汉市",
  "value": "2549" },
{
  "label": "什邡市",
  "value": "2550" },
{
  "label": "绵竹市",
  "value": "2551" }],

[{
  "label": "市辖区",
  "value": "2553" },
{
  "label": "涪城区",
  "value": "2554" },
{
  "label": "游仙区",
  "value": "2555" },
{
  "label": "安州区",
  "value": "2556" },
{
  "label": "三台县",
  "value": "2557" },
{
  "label": "盐亭县",
  "value": "2558" },
{
  "label": "梓潼县",
  "value": "2559" },
{
  "label": "北川羌族自治县",
  "value": "2560" },
{
  "label": "平武县",
  "value": "2561" },
{
  "label": "江油市",
  "value": "2562" }],

[{
  "label": "市辖区",
  "value": "2564" },
{
  "label": "利州区",
  "value": "2565" },
{
  "label": "昭化区",
  "value": "2566" },
{
  "label": "朝天区",
  "value": "2567" },
{
  "label": "旺苍县",
  "value": "2568" },
{
  "label": "青川县",
  "value": "2569" },
{
  "label": "剑阁县",
  "value": "2570" },
{
  "label": "苍溪县",
  "value": "2571" }],

[{
  "label": "市辖区",
  "value": "2573" },
{
  "label": "船山区",
  "value": "2574" },
{
  "label": "安居区",
  "value": "2575" },
{
  "label": "蓬溪县",
  "value": "2576" },
{
  "label": "射洪县",
  "value": "2577" },
{
  "label": "大英县",
  "value": "2578" }],

[{
  "label": "市辖区",
  "value": "2580" },
{
  "label": "市中区",
  "value": "2581" },
{
  "label": "东兴区",
  "value": "2582" },
{
  "label": "威远县",
  "value": "2583" },
{
  "label": "资中县",
  "value": "2584" },
{
  "label": "隆昌县",
  "value": "2585" }],

[{
  "label": "市辖区",
  "value": "2587" },
{
  "label": "市中区",
  "value": "2588" },
{
  "label": "沙湾区",
  "value": "2589" },
{
  "label": "五通桥区",
  "value": "2590" },
{
  "label": "金口河区",
  "value": "2591" },
{
  "label": "犍为县",
  "value": "2592" },
{
  "label": "井研县",
  "value": "2593" },
{
  "label": "夹江县",
  "value": "2594" },
{
  "label": "沐川县",
  "value": "2595" },
{
  "label": "峨边彝族自治县",
  "value": "2596" },
{
  "label": "马边彝族自治县",
  "value": "2597" },
{
  "label": "峨眉山市",
  "value": "2598" }],

[{
  "label": "市辖区",
  "value": "2600" },
{
  "label": "顺庆区",
  "value": "2601" },
{
  "label": "高坪区",
  "value": "2602" },
{
  "label": "嘉陵区",
  "value": "2603" },
{
  "label": "南部县",
  "value": "2604" },
{
  "label": "营山县",
  "value": "2605" },
{
  "label": "蓬安县",
  "value": "2606" },
{
  "label": "仪陇县",
  "value": "2607" },
{
  "label": "西充县",
  "value": "2608" },
{
  "label": "阆中市",
  "value": "2609" }],

[{
  "label": "市辖区",
  "value": "2611" },
{
  "label": "东坡区",
  "value": "2612" },
{
  "label": "彭山区",
  "value": "2613" },
{
  "label": "仁寿县",
  "value": "2614" },
{
  "label": "洪雅县",
  "value": "2615" },
{
  "label": "丹棱县",
  "value": "2616" },
{
  "label": "青神县",
  "value": "2617" }],

[{
  "label": "市辖区",
  "value": "2619" },
{
  "label": "翠屏区",
  "value": "2620" },
{
  "label": "南溪区",
  "value": "2621" },
{
  "label": "宜宾县",
  "value": "2622" },
{
  "label": "江安县",
  "value": "2623" },
{
  "label": "长宁县",
  "value": "2624" },
{
  "label": "高县",
  "value": "2625" },
{
  "label": "珙县",
  "value": "2626" },
{
  "label": "筠连县",
  "value": "2627" },
{
  "label": "兴文县",
  "value": "2628" },
{
  "label": "屏山县",
  "value": "2629" }],

[{
  "label": "市辖区",
  "value": "2631" },
{
  "label": "广安区",
  "value": "2632" },
{
  "label": "前锋区",
  "value": "2633" },
{
  "label": "岳池县",
  "value": "2634" },
{
  "label": "武胜县",
  "value": "2635" },
{
  "label": "邻水县",
  "value": "2636" },
{
  "label": "华蓥市",
  "value": "2637" }],

[{
  "label": "市辖区",
  "value": "2639" },
{
  "label": "通川区",
  "value": "2640" },
{
  "label": "达川区",
  "value": "2641" },
{
  "label": "宣汉县",
  "value": "2642" },
{
  "label": "开江县",
  "value": "2643" },
{
  "label": "大竹县",
  "value": "2644" },
{
  "label": "渠县",
  "value": "2645" },
{
  "label": "万源市",
  "value": "2646" }],

[{
  "label": "市辖区",
  "value": "2648" },
{
  "label": "雨城区",
  "value": "2649" },
{
  "label": "名山区",
  "value": "2650" },
{
  "label": "荥经县",
  "value": "2651" },
{
  "label": "汉源县",
  "value": "2652" },
{
  "label": "石棉县",
  "value": "2653" },
{
  "label": "天全县",
  "value": "2654" },
{
  "label": "芦山县",
  "value": "2655" },
{
  "label": "宝兴县",
  "value": "2656" }],

[{
  "label": "市辖区",
  "value": "2658" },
{
  "label": "巴州区",
  "value": "2659" },
{
  "label": "恩阳区",
  "value": "2660" },
{
  "label": "通江县",
  "value": "2661" },
{
  "label": "南江县",
  "value": "2662" },
{
  "label": "平昌县",
  "value": "2663" }],

[{
  "label": "市辖区",
  "value": "2665" },
{
  "label": "雁江区",
  "value": "2666" },
{
  "label": "安岳县",
  "value": "2667" },
{
  "label": "乐至县",
  "value": "2668" }],

[{
  "label": "马尔康市",
  "value": "2670" },
{
  "label": "汶川县",
  "value": "2671" },
{
  "label": "理县",
  "value": "2672" },
{
  "label": "茂县",
  "value": "2673" },
{
  "label": "松潘县",
  "value": "2674" },
{
  "label": "九寨沟县",
  "value": "2675" },
{
  "label": "金川县",
  "value": "2676" },
{
  "label": "小金县",
  "value": "2677" },
{
  "label": "黑水县",
  "value": "2678" },
{
  "label": "壤塘县",
  "value": "2679" },
{
  "label": "阿坝县",
  "value": "2680" },
{
  "label": "若尔盖县",
  "value": "2681" },
{
  "label": "红原县",
  "value": "2682" }],

[{
  "label": "康定市",
  "value": "2684" },
{
  "label": "泸定县",
  "value": "2685" },
{
  "label": "丹巴县",
  "value": "2686" },
{
  "label": "九龙县",
  "value": "2687" },
{
  "label": "雅江县",
  "value": "2688" },
{
  "label": "道孚县",
  "value": "2689" },
{
  "label": "炉霍县",
  "value": "2690" },
{
  "label": "甘孜县",
  "value": "2691" },
{
  "label": "新龙县",
  "value": "2692" },
{
  "label": "德格县",
  "value": "2693" },
{
  "label": "白玉县",
  "value": "2694" },
{
  "label": "石渠县",
  "value": "2695" },
{
  "label": "色达县",
  "value": "2696" },
{
  "label": "理塘县",
  "value": "2697" },
{
  "label": "巴塘县",
  "value": "2698" },
{
  "label": "乡城县",
  "value": "2699" },
{
  "label": "稻城县",
  "value": "2700" },
{
  "label": "得荣县",
  "value": "2701" }],

[{
  "label": "西昌市",
  "value": "2703" },
{
  "label": "木里藏族自治县",
  "value": "2704" },
{
  "label": "盐源县",
  "value": "2705" },
{
  "label": "德昌县",
  "value": "2706" },
{
  "label": "会理县",
  "value": "2707" },
{
  "label": "会东县",
  "value": "2708" },
{
  "label": "宁南县",
  "value": "2709" },
{
  "label": "普格县",
  "value": "2710" },
{
  "label": "布拖县",
  "value": "2711" },
{
  "label": "金阳县",
  "value": "2712" },
{
  "label": "昭觉县",
  "value": "2713" },
{
  "label": "喜德县",
  "value": "2714" },
{
  "label": "冕宁县",
  "value": "2715" },
{
  "label": "越西县",
  "value": "2716" },
{
  "label": "甘洛县",
  "value": "2717" },
{
  "label": "美姑县",
  "value": "2718" },
{
  "label": "雷波县",
  "value": "2719" }]],


[
[{
  "label": "市辖区",
  "value": "2722" },
{
  "label": "南明区",
  "value": "2723" },
{
  "label": "云岩区",
  "value": "2724" },
{
  "label": "花溪区",
  "value": "2725" },
{
  "label": "乌当区",
  "value": "2726" },
{
  "label": "白云区",
  "value": "2727" },
{
  "label": "观山湖区",
  "value": "2728" },
{
  "label": "开阳县",
  "value": "2729" },
{
  "label": "息烽县",
  "value": "2730" },
{
  "label": "修文县",
  "value": "2731" },
{
  "label": "清镇市",
  "value": "2732" }],

[{
  "label": "钟山区",
  "value": "2734" },
{
  "label": "六枝特区",
  "value": "2735" },
{
  "label": "水城县",
  "value": "2736" },
{
  "label": "盘县",
  "value": "2737" }],

[{
  "label": "市辖区",
  "value": "2739" },
{
  "label": "红花岗区",
  "value": "2740" },
{
  "label": "汇川区",
  "value": "2741" },
{
  "label": "播州区",
  "value": "2742" },
{
  "label": "桐梓县",
  "value": "2743" },
{
  "label": "绥阳县",
  "value": "2744" },
{
  "label": "正安县",
  "value": "2745" },
{
  "label": "道真仡佬族苗族自治县",
  "value": "2746" },
{
  "label": "务川仡佬族苗族自治县",
  "value": "2747" },
{
  "label": "凤冈县",
  "value": "2748" },
{
  "label": "湄潭县",
  "value": "2749" },
{
  "label": "余庆县",
  "value": "2750" },
{
  "label": "习水县",
  "value": "2751" },
{
  "label": "赤水市",
  "value": "2752" },
{
  "label": "仁怀市",
  "value": "2753" }],

[{
  "label": "市辖区",
  "value": "2755" },
{
  "label": "西秀区",
  "value": "2756" },
{
  "label": "平坝区",
  "value": "2757" },
{
  "label": "普定县",
  "value": "2758" },
{
  "label": "镇宁布依族苗族自治县",
  "value": "2759" },
{
  "label": "关岭布依族苗族自治县",
  "value": "2760" },
{
  "label": "紫云苗族布依族自治县",
  "value": "2761" }],

[{
  "label": "市辖区",
  "value": "2763" },
{
  "label": "七星关区",
  "value": "2764" },
{
  "label": "大方县",
  "value": "2765" },
{
  "label": "黔西县",
  "value": "2766" },
{
  "label": "金沙县",
  "value": "2767" },
{
  "label": "织金县",
  "value": "2768" },
{
  "label": "纳雍县",
  "value": "2769" },
{
  "label": "威宁彝族回族苗族自治县",
  "value": "2770" },
{
  "label": "赫章县",
  "value": "2771" }],

[{
  "label": "市辖区",
  "value": "2773" },
{
  "label": "碧江区",
  "value": "2774" },
{
  "label": "万山区",
  "value": "2775" },
{
  "label": "江口县",
  "value": "2776" },
{
  "label": "玉屏侗族自治县",
  "value": "2777" },
{
  "label": "石阡县",
  "value": "2778" },
{
  "label": "思南县",
  "value": "2779" },
{
  "label": "印江土家族苗族自治县",
  "value": "2780" },
{
  "label": "德江县",
  "value": "2781" },
{
  "label": "沿河土家族自治县",
  "value": "2782" },
{
  "label": "松桃苗族自治县",
  "value": "2783" }],

[{
  "label": "兴义市",
  "value": "2785" },
{
  "label": "兴仁县",
  "value": "2786" },
{
  "label": "普安县",
  "value": "2787" },
{
  "label": "晴隆县",
  "value": "2788" },
{
  "label": "贞丰县",
  "value": "2789" },
{
  "label": "望谟县",
  "value": "2790" },
{
  "label": "册亨县",
  "value": "2791" },
{
  "label": "安龙县",
  "value": "2792" }],

[{
  "label": "凯里市",
  "value": "2794" },
{
  "label": "黄平县",
  "value": "2795" },
{
  "label": "施秉县",
  "value": "2796" },
{
  "label": "三穗县",
  "value": "2797" },
{
  "label": "镇远县",
  "value": "2798" },
{
  "label": "岑巩县",
  "value": "2799" },
{
  "label": "天柱县",
  "value": "2800" },
{
  "label": "锦屏县",
  "value": "2801" },
{
  "label": "剑河县",
  "value": "2802" },
{
  "label": "台江县",
  "value": "2803" },
{
  "label": "黎平县",
  "value": "2804" },
{
  "label": "榕江县",
  "value": "2805" },
{
  "label": "从江县",
  "value": "2806" },
{
  "label": "雷山县",
  "value": "2807" },
{
  "label": "麻江县",
  "value": "2808" },
{
  "label": "丹寨县",
  "value": "2809" }],

[{
  "label": "都匀市",
  "value": "2811" },
{
  "label": "福泉市",
  "value": "2812" },
{
  "label": "荔波县",
  "value": "2813" },
{
  "label": "贵定县",
  "value": "2814" },
{
  "label": "瓮安县",
  "value": "2815" },
{
  "label": "独山县",
  "value": "2816" },
{
  "label": "平塘县",
  "value": "2817" },
{
  "label": "罗甸县",
  "value": "2818" },
{
  "label": "长顺县",
  "value": "2819" },
{
  "label": "龙里县",
  "value": "2820" },
{
  "label": "惠水县",
  "value": "2821" },
{
  "label": "三都水族自治县",
  "value": "2822" }]],


[
[{
  "label": "市辖区",
  "value": "2825" },
{
  "label": "五华区",
  "value": "2826" },
{
  "label": "盘龙区",
  "value": "2827" },
{
  "label": "官渡区",
  "value": "2828" },
{
  "label": "西山区",
  "value": "2829" },
{
  "label": "东川区",
  "value": "2830" },
{
  "label": "呈贡区",
  "value": "2831" },
{
  "label": "晋宁县",
  "value": "2832" },
{
  "label": "富民县",
  "value": "2833" },
{
  "label": "宜良县",
  "value": "2834" },
{
  "label": "石林彝族自治县",
  "value": "2835" },
{
  "label": "嵩明县",
  "value": "2836" },
{
  "label": "禄劝彝族苗族自治县",
  "value": "2837" },
{
  "label": "寻甸回族彝族自治县",
  "value": "2838" },
{
  "label": "安宁市",
  "value": "2839" }],

[{
  "label": "市辖区",
  "value": "2841" },
{
  "label": "麒麟区",
  "value": "2842" },
{
  "label": "沾益区",
  "value": "2843" },
{
  "label": "马龙县",
  "value": "2844" },
{
  "label": "陆良县",
  "value": "2845" },
{
  "label": "师宗县",
  "value": "2846" },
{
  "label": "罗平县",
  "value": "2847" },
{
  "label": "富源县",
  "value": "2848" },
{
  "label": "会泽县",
  "value": "2849" },
{
  "label": "宣威市",
  "value": "2850" }],

[{
  "label": "市辖区",
  "value": "2852" },
{
  "label": "红塔区",
  "value": "2853" },
{
  "label": "江川区",
  "value": "2854" },
{
  "label": "澄江县",
  "value": "2855" },
{
  "label": "通海县",
  "value": "2856" },
{
  "label": "华宁县",
  "value": "2857" },
{
  "label": "易门县",
  "value": "2858" },
{
  "label": "峨山彝族自治县",
  "value": "2859" },
{
  "label": "新平彝族傣族自治县",
  "value": "2860" },
{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "2861" }],

[{
  "label": "市辖区",
  "value": "2863" },
{
  "label": "隆阳区",
  "value": "2864" },
{
  "label": "施甸县",
  "value": "2865" },
{
  "label": "龙陵县",
  "value": "2866" },
{
  "label": "昌宁县",
  "value": "2867" },
{
  "label": "腾冲市",
  "value": "2868" }],

[{
  "label": "市辖区",
  "value": "2870" },
{
  "label": "昭阳区",
  "value": "2871" },
{
  "label": "鲁甸县",
  "value": "2872" },
{
  "label": "巧家县",
  "value": "2873" },
{
  "label": "盐津县",
  "value": "2874" },
{
  "label": "大关县",
  "value": "2875" },
{
  "label": "永善县",
  "value": "2876" },
{
  "label": "绥江县",
  "value": "2877" },
{
  "label": "镇雄县",
  "value": "2878" },
{
  "label": "彝良县",
  "value": "2879" },
{
  "label": "威信县",
  "value": "2880" },
{
  "label": "水富县",
  "value": "2881" }],

[{
  "label": "市辖区",
  "value": "2883" },
{
  "label": "古城区",
  "value": "2884" },
{
  "label": "玉龙纳西族自治县",
  "value": "2885" },
{
  "label": "永胜县",
  "value": "2886" },
{
  "label": "华坪县",
  "value": "2887" },
{
  "label": "宁蒗彝族自治县",
  "value": "2888" }],

[{
  "label": "市辖区",
  "value": "2890" },
{
  "label": "思茅区",
  "value": "2891" },
{
  "label": "宁洱哈尼族彝族自治县",
  "value": "2892" },
{
  "label": "墨江哈尼族自治县",
  "value": "2893" },
{
  "label": "景东彝族自治县",
  "value": "2894" },
{
  "label": "景谷傣族彝族自治县",
  "value": "2895" },
{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "2896" },
{
  "label": "江城哈尼族彝族自治县",
  "value": "2897" },
{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "2898" },
{
  "label": "澜沧拉祜族自治县",
  "value": "2899" },
{
  "label": "西盟佤族自治县",
  "value": "2900" }],

[{
  "label": "市辖区",
  "value": "2902" },
{
  "label": "临翔区",
  "value": "2903" },
{
  "label": "凤庆县",
  "value": "2904" },
{
  "label": "云县",
  "value": "2905" },
{
  "label": "永德县",
  "value": "2906" },
{
  "label": "镇康县",
  "value": "2907" },
{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "2908" },
{
  "label": "耿马傣族佤族自治县",
  "value": "2909" },
{
  "label": "沧源佤族自治县",
  "value": "2910" }],

[{
  "label": "楚雄市",
  "value": "2912" },
{
  "label": "双柏县",
  "value": "2913" },
{
  "label": "牟定县",
  "value": "2914" },
{
  "label": "南华县",
  "value": "2915" },
{
  "label": "姚安县",
  "value": "2916" },
{
  "label": "大姚县",
  "value": "2917" },
{
  "label": "永仁县",
  "value": "2918" },
{
  "label": "元谋县",
  "value": "2919" },
{
  "label": "武定县",
  "value": "2920" },
{
  "label": "禄丰县",
  "value": "2921" }],

[{
  "label": "个旧市",
  "value": "2923" },
{
  "label": "开远市",
  "value": "2924" },
{
  "label": "蒙自市",
  "value": "2925" },
{
  "label": "弥勒市",
  "value": "2926" },
{
  "label": "屏边苗族自治县",
  "value": "2927" },
{
  "label": "建水县",
  "value": "2928" },
{
  "label": "石屏县",
  "value": "2929" },
{
  "label": "泸西县",
  "value": "2930" },
{
  "label": "元阳县",
  "value": "2931" },
{
  "label": "红河县",
  "value": "2932" },
{
  "label": "金平苗族瑶族傣族自治县",
  "value": "2933" },
{
  "label": "绿春县",
  "value": "2934" },
{
  "label": "河口瑶族自治县",
  "value": "2935" }],

[{
  "label": "文山市",
  "value": "2937" },
{
  "label": "砚山县",
  "value": "2938" },
{
  "label": "西畴县",
  "value": "2939" },
{
  "label": "麻栗坡县",
  "value": "2940" },
{
  "label": "马关县",
  "value": "2941" },
{
  "label": "丘北县",
  "value": "2942" },
{
  "label": "广南县",
  "value": "2943" },
{
  "label": "富宁县",
  "value": "2944" }],

[{
  "label": "景洪市",
  "value": "2946" },
{
  "label": "勐海县",
  "value": "2947" },
{
  "label": "勐腊县",
  "value": "2948" }],

[{
  "label": "大理市",
  "value": "2950" },
{
  "label": "漾濞彝族自治县",
  "value": "2951" },
{
  "label": "祥云县",
  "value": "2952" },
{
  "label": "宾川县",
  "value": "2953" },
{
  "label": "弥渡县",
  "value": "2954" },
{
  "label": "南涧彝族自治县",
  "value": "2955" },
{
  "label": "巍山彝族回族自治县",
  "value": "2956" },
{
  "label": "永平县",
  "value": "2957" },
{
  "label": "云龙县",
  "value": "2958" },
{
  "label": "洱源县",
  "value": "2959" },
{
  "label": "剑川县",
  "value": "2960" },
{
  "label": "鹤庆县",
  "value": "2961" }],

[{
  "label": "瑞丽市",
  "value": "2963" },
{
  "label": "芒市",
  "value": "2964" },
{
  "label": "梁河县",
  "value": "2965" },
{
  "label": "盈江县",
  "value": "2966" },
{
  "label": "陇川县",
  "value": "2967" }],

[{
  "label": "泸水市",
  "value": "2969" },
{
  "label": "福贡县",
  "value": "2970" },
{
  "label": "贡山独龙族怒族自治县",
  "value": "2971" },
{
  "label": "兰坪白族普米族自治县",
  "value": "2972" }],

[{
  "label": "香格里拉市",
  "value": "2974" },
{
  "label": "德钦县",
  "value": "2975" },
{
  "label": "维西傈僳族自治县",
  "value": "2976" }]],


[
[{
  "label": "市辖区",
  "value": "2979" },
{
  "label": "城关区",
  "value": "2980" },
{
  "label": "堆龙德庆区",
  "value": "2981" },
{
  "label": "林周县",
  "value": "2982" },
{
  "label": "当雄县",
  "value": "2983" },
{
  "label": "尼木县",
  "value": "2984" },
{
  "label": "曲水县",
  "value": "2985" },
{
  "label": "达孜县",
  "value": "2986" },
{
  "label": "墨竹工卡县",
  "value": "2987" }],

[{
  "label": "桑珠孜区",
  "value": "2989" },
{
  "label": "南木林县",
  "value": "2990" },
{
  "label": "江孜县",
  "value": "2991" },
{
  "label": "定日县",
  "value": "2992" },
{
  "label": "萨迦县",
  "value": "2993" },
{
  "label": "拉孜县",
  "value": "2994" },
{
  "label": "昂仁县",
  "value": "2995" },
{
  "label": "谢通门县",
  "value": "2996" },
{
  "label": "白朗县",
  "value": "2997" },
{
  "label": "仁布县",
  "value": "2998" },
{
  "label": "康马县",
  "value": "2999" },
{
  "label": "定结县",
  "value": "3000" },
{
  "label": "仲巴县",
  "value": "3001" },
{
  "label": "亚东县",
  "value": "3002" },
{
  "label": "吉隆县",
  "value": "3003" },
{
  "label": "聂拉木县",
  "value": "3004" },
{
  "label": "萨嘎县",
  "value": "3005" },
{
  "label": "岗巴县",
  "value": "3006" }],

[{
  "label": "卡若区",
  "value": "3008" },
{
  "label": "江达县",
  "value": "3009" },
{
  "label": "贡觉县",
  "value": "3010" },
{
  "label": "类乌齐县",
  "value": "3011" },
{
  "label": "丁青县",
  "value": "3012" },
{
  "label": "察雅县",
  "value": "3013" },
{
  "label": "八宿县",
  "value": "3014" },
{
  "label": "左贡县",
  "value": "3015" },
{
  "label": "芒康县",
  "value": "3016" },
{
  "label": "洛隆县",
  "value": "3017" },
{
  "label": "边坝县",
  "value": "3018" }],

[{
  "label": "巴宜区",
  "value": "3020" },
{
  "label": "工布江达县",
  "value": "3021" },
{
  "label": "米林县",
  "value": "3022" },
{
  "label": "墨脱县",
  "value": "3023" },
{
  "label": "波密县",
  "value": "3024" },
{
  "label": "察隅县",
  "value": "3025" },
{
  "label": "朗县",
  "value": "3026" }],

[{
  "label": "市辖区",
  "value": "3028" },
{
  "label": "乃东区",
  "value": "3029" },
{
  "label": "扎囊县",
  "value": "3030" },
{
  "label": "贡嘎县",
  "value": "3031" },
{
  "label": "桑日县",
  "value": "3032" },
{
  "label": "琼结县",
  "value": "3033" },
{
  "label": "曲松县",
  "value": "3034" },
{
  "label": "措美县",
  "value": "3035" },
{
  "label": "洛扎县",
  "value": "3036" },
{
  "label": "加查县",
  "value": "3037" },
{
  "label": "隆子县",
  "value": "3038" },
{
  "label": "错那县",
  "value": "3039" },
{
  "label": "浪卡子县",
  "value": "3040" }],

[{
  "label": "那曲县",
  "value": "3042" },
{
  "label": "嘉黎县",
  "value": "3043" },
{
  "label": "比如县",
  "value": "3044" },
{
  "label": "聂荣县",
  "value": "3045" },
{
  "label": "安多县",
  "value": "3046" },
{
  "label": "申扎县",
  "value": "3047" },
{
  "label": "索县",
  "value": "3048" },
{
  "label": "班戈县",
  "value": "3049" },
{
  "label": "巴青县",
  "value": "3050" },
{
  "label": "尼玛县",
  "value": "3051" },
{
  "label": "双湖县",
  "value": "3052" }],

[{
  "label": "普兰县",
  "value": "3054" },
{
  "label": "札达县",
  "value": "3055" },
{
  "label": "噶尔县",
  "value": "3056" },
{
  "label": "日土县",
  "value": "3057" },
{
  "label": "革吉县",
  "value": "3058" },
{
  "label": "改则县",
  "value": "3059" },
{
  "label": "措勤县",
  "value": "3060" }]],


[
[{
  "label": "市辖区",
  "value": "3063" },
{
  "label": "新城区",
  "value": "3064" },
{
  "label": "碑林区",
  "value": "3065" },
{
  "label": "莲湖区",
  "value": "3066" },
{
  "label": "灞桥区",
  "value": "3067" },
{
  "label": "未央区",
  "value": "3068" },
{
  "label": "雁塔区",
  "value": "3069" },
{
  "label": "阎良区",
  "value": "3070" },
{
  "label": "临潼区",
  "value": "3071" },
{
  "label": "长安区",
  "value": "3072" },
{
  "label": "高陵区",
  "value": "3073" },
{
  "label": "蓝田县",
  "value": "3074" },
{
  "label": "周至县",
  "value": "3075" },
{
  "label": "户县",
  "value": "3076" }],

[{
  "label": "市辖区",
  "value": "3078" },
{
  "label": "王益区",
  "value": "3079" },
{
  "label": "印台区",
  "value": "3080" },
{
  "label": "耀州区",
  "value": "3081" },
{
  "label": "宜君县",
  "value": "3082" }],

[{
  "label": "市辖区",
  "value": "3084" },
{
  "label": "渭滨区",
  "value": "3085" },
{
  "label": "金台区",
  "value": "3086" },
{
  "label": "陈仓区",
  "value": "3087" },
{
  "label": "凤翔县",
  "value": "3088" },
{
  "label": "岐山县",
  "value": "3089" },
{
  "label": "扶风县",
  "value": "3090" },
{
  "label": "眉县",
  "value": "3091" },
{
  "label": "陇县",
  "value": "3092" },
{
  "label": "千阳县",
  "value": "3093" },
{
  "label": "麟游县",
  "value": "3094" },
{
  "label": "凤县",
  "value": "3095" },
{
  "label": "太白县",
  "value": "3096" }],

[{
  "label": "市辖区",
  "value": "3098" },
{
  "label": "秦都区",
  "value": "3099" },
{
  "label": "杨陵区",
  "value": "3100" },
{
  "label": "渭城区",
  "value": "3101" },
{
  "label": "三原县",
  "value": "3102" },
{
  "label": "泾阳县",
  "value": "3103" },
{
  "label": "乾县",
  "value": "3104" },
{
  "label": "礼泉县",
  "value": "3105" },
{
  "label": "永寿县",
  "value": "3106" },
{
  "label": "彬县",
  "value": "3107" },
{
  "label": "长武县",
  "value": "3108" },
{
  "label": "旬邑县",
  "value": "3109" },
{
  "label": "淳化县",
  "value": "3110" },
{
  "label": "武功县",
  "value": "3111" },
{
  "label": "兴平市",
  "value": "3112" }],

[{
  "label": "市辖区",
  "value": "3114" },
{
  "label": "临渭区",
  "value": "3115" },
{
  "label": "华州区",
  "value": "3116" },
{
  "label": "潼关县",
  "value": "3117" },
{
  "label": "大荔县",
  "value": "3118" },
{
  "label": "合阳县",
  "value": "3119" },
{
  "label": "澄城县",
  "value": "3120" },
{
  "label": "蒲城县",
  "value": "3121" },
{
  "label": "白水县",
  "value": "3122" },
{
  "label": "富平县",
  "value": "3123" },
{
  "label": "韩城市",
  "value": "3124" },
{
  "label": "华阴市",
  "value": "3125" }],

[{
  "label": "市辖区",
  "value": "3127" },
{
  "label": "宝塔区",
  "value": "3128" },
{
  "label": "安塞区",
  "value": "3129" },
{
  "label": "延长县",
  "value": "3130" },
{
  "label": "延川县",
  "value": "3131" },
{
  "label": "子长县",
  "value": "3132" },
{
  "label": "志丹县",
  "value": "3133" },
{
  "label": "吴起县",
  "value": "3134" },
{
  "label": "甘泉县",
  "value": "3135" },
{
  "label": "富县",
  "value": "3136" },
{
  "label": "洛川县",
  "value": "3137" },
{
  "label": "宜川县",
  "value": "3138" },
{
  "label": "黄龙县",
  "value": "3139" },
{
  "label": "黄陵县",
  "value": "3140" }],

[{
  "label": "市辖区",
  "value": "3142" },
{
  "label": "汉台区",
  "value": "3143" },
{
  "label": "南郑县",
  "value": "3144" },
{
  "label": "城固县",
  "value": "3145" },
{
  "label": "洋县",
  "value": "3146" },
{
  "label": "西乡县",
  "value": "3147" },
{
  "label": "勉县",
  "value": "3148" },
{
  "label": "宁强县",
  "value": "3149" },
{
  "label": "略阳县",
  "value": "3150" },
{
  "label": "镇巴县",
  "value": "3151" },
{
  "label": "留坝县",
  "value": "3152" },
{
  "label": "佛坪县",
  "value": "3153" }],

[{
  "label": "市辖区",
  "value": "3155" },
{
  "label": "榆阳区",
  "value": "3156" },
{
  "label": "横山区",
  "value": "3157" },
{
  "label": "神木县",
  "value": "3158" },
{
  "label": "府谷县",
  "value": "3159" },
{
  "label": "靖边县",
  "value": "3160" },
{
  "label": "定边县",
  "value": "3161" },
{
  "label": "绥德县",
  "value": "3162" },
{
  "label": "米脂县",
  "value": "3163" },
{
  "label": "佳县",
  "value": "3164" },
{
  "label": "吴堡县",
  "value": "3165" },
{
  "label": "清涧县",
  "value": "3166" },
{
  "label": "子洲县",
  "value": "3167" }],

[{
  "label": "市辖区",
  "value": "3169" },
{
  "label": "汉滨区",
  "value": "3170" },
{
  "label": "汉阴县",
  "value": "3171" },
{
  "label": "石泉县",
  "value": "3172" },
{
  "label": "宁陕县",
  "value": "3173" },
{
  "label": "紫阳县",
  "value": "3174" },
{
  "label": "岚皋县",
  "value": "3175" },
{
  "label": "平利县",
  "value": "3176" },
{
  "label": "镇坪县",
  "value": "3177" },
{
  "label": "旬阳县",
  "value": "3178" },
{
  "label": "白河县",
  "value": "3179" }],

[{
  "label": "市辖区",
  "value": "3181" },
{
  "label": "商州区",
  "value": "3182" },
{
  "label": "洛南县",
  "value": "3183" },
{
  "label": "丹凤县",
  "value": "3184" },
{
  "label": "商南县",
  "value": "3185" },
{
  "label": "山阳县",
  "value": "3186" },
{
  "label": "镇安县",
  "value": "3187" },
{
  "label": "柞水县",
  "value": "3188" }]],


[
[{
  "label": "市辖区",
  "value": "3191" },
{
  "label": "城关区",
  "value": "3192" },
{
  "label": "七里河区",
  "value": "3193" },
{
  "label": "西固区",
  "value": "3194" },
{
  "label": "安宁区",
  "value": "3195" },
{
  "label": "红古区",
  "value": "3196" },
{
  "label": "永登县",
  "value": "3197" },
{
  "label": "皋兰县",
  "value": "3198" },
{
  "label": "榆中县",
  "value": "3199" }],

[{
  "label": "市辖区",
  "value": "3201" }],

[{
  "label": "市辖区",
  "value": "3203" },
{
  "label": "金川区",
  "value": "3204" },
{
  "label": "永昌县",
  "value": "3205" }],

[{
  "label": "市辖区",
  "value": "3207" },
{
  "label": "白银区",
  "value": "3208" },
{
  "label": "平川区",
  "value": "3209" },
{
  "label": "靖远县",
  "value": "3210" },
{
  "label": "会宁县",
  "value": "3211" },
{
  "label": "景泰县",
  "value": "3212" }],

[{
  "label": "市辖区",
  "value": "3214" },
{
  "label": "秦州区",
  "value": "3215" },
{
  "label": "麦积区",
  "value": "3216" },
{
  "label": "清水县",
  "value": "3217" },
{
  "label": "秦安县",
  "value": "3218" },
{
  "label": "甘谷县",
  "value": "3219" },
{
  "label": "武山县",
  "value": "3220" },
{
  "label": "张家川回族自治县",
  "value": "3221" }],

[{
  "label": "市辖区",
  "value": "3223" },
{
  "label": "凉州区",
  "value": "3224" },
{
  "label": "民勤县",
  "value": "3225" },
{
  "label": "古浪县",
  "value": "3226" },
{
  "label": "天祝藏族自治县",
  "value": "3227" }],

[{
  "label": "市辖区",
  "value": "3229" },
{
  "label": "甘州区",
  "value": "3230" },
{
  "label": "肃南裕固族自治县",
  "value": "3231" },
{
  "label": "民乐县",
  "value": "3232" },
{
  "label": "临泽县",
  "value": "3233" },
{
  "label": "高台县",
  "value": "3234" },
{
  "label": "山丹县",
  "value": "3235" }],

[{
  "label": "市辖区",
  "value": "3237" },
{
  "label": "崆峒区",
  "value": "3238" },
{
  "label": "泾川县",
  "value": "3239" },
{
  "label": "灵台县",
  "value": "3240" },
{
  "label": "崇信县",
  "value": "3241" },
{
  "label": "华亭县",
  "value": "3242" },
{
  "label": "庄浪县",
  "value": "3243" },
{
  "label": "静宁县",
  "value": "3244" }],

[{
  "label": "市辖区",
  "value": "3246" },
{
  "label": "肃州区",
  "value": "3247" },
{
  "label": "金塔县",
  "value": "3248" },
{
  "label": "瓜州县",
  "value": "3249" },
{
  "label": "肃北蒙古族自治县",
  "value": "3250" },
{
  "label": "阿克塞哈萨克族自治县",
  "value": "3251" },
{
  "label": "玉门市",
  "value": "3252" },
{
  "label": "敦煌市",
  "value": "3253" }],

[{
  "label": "市辖区",
  "value": "3255" },
{
  "label": "西峰区",
  "value": "3256" },
{
  "label": "庆城县",
  "value": "3257" },
{
  "label": "环县",
  "value": "3258" },
{
  "label": "华池县",
  "value": "3259" },
{
  "label": "合水县",
  "value": "3260" },
{
  "label": "正宁县",
  "value": "3261" },
{
  "label": "宁县",
  "value": "3262" },
{
  "label": "镇原县",
  "value": "3263" }],

[{
  "label": "市辖区",
  "value": "3265" },
{
  "label": "安定区",
  "value": "3266" },
{
  "label": "通渭县",
  "value": "3267" },
{
  "label": "陇西县",
  "value": "3268" },
{
  "label": "渭源县",
  "value": "3269" },
{
  "label": "临洮县",
  "value": "3270" },
{
  "label": "漳县",
  "value": "3271" },
{
  "label": "岷县",
  "value": "3272" }],

[{
  "label": "市辖区",
  "value": "3274" },
{
  "label": "武都区",
  "value": "3275" },
{
  "label": "成县",
  "value": "3276" },
{
  "label": "文县",
  "value": "3277" },
{
  "label": "宕昌县",
  "value": "3278" },
{
  "label": "康县",
  "value": "3279" },
{
  "label": "西和县",
  "value": "3280" },
{
  "label": "礼县",
  "value": "3281" },
{
  "label": "徽县",
  "value": "3282" },
{
  "label": "两当县",
  "value": "3283" }],

[{
  "label": "临夏市",
  "value": "3285" },
{
  "label": "临夏县",
  "value": "3286" },
{
  "label": "康乐县",
  "value": "3287" },
{
  "label": "永靖县",
  "value": "3288" },
{
  "label": "广河县",
  "value": "3289" },
{
  "label": "和政县",
  "value": "3290" },
{
  "label": "东乡族自治县",
  "value": "3291" },
{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "3292" }],

[{
  "label": "合作市",
  "value": "3294" },
{
  "label": "临潭县",
  "value": "3295" },
{
  "label": "卓尼县",
  "value": "3296" },
{
  "label": "舟曲县",
  "value": "3297" },
{
  "label": "迭部县",
  "value": "3298" },
{
  "label": "玛曲县",
  "value": "3299" },
{
  "label": "碌曲县",
  "value": "3300" },
{
  "label": "夏河县",
  "value": "3301" }]],


[
[{
  "label": "市辖区",
  "value": "3304" },
{
  "label": "城东区",
  "value": "3305" },
{
  "label": "城中区",
  "value": "3306" },
{
  "label": "城西区",
  "value": "3307" },
{
  "label": "城北区",
  "value": "3308" },
{
  "label": "大通回族土族自治县",
  "value": "3309" },
{
  "label": "湟中县",
  "value": "3310" },
{
  "label": "湟源县",
  "value": "3311" }],

[{
  "label": "乐都区",
  "value": "3313" },
{
  "label": "平安区",
  "value": "3314" },
{
  "label": "民和回族土族自治县",
  "value": "3315" },
{
  "label": "互助土族自治县",
  "value": "3316" },
{
  "label": "化隆回族自治县",
  "value": "3317" },
{
  "label": "循化撒拉族自治县",
  "value": "3318" }],

[{
  "label": "门源回族自治县",
  "value": "3320" },
{
  "label": "祁连县",
  "value": "3321" },
{
  "label": "海晏县",
  "value": "3322" },
{
  "label": "刚察县",
  "value": "3323" }],

[{
  "label": "同仁县",
  "value": "3325" },
{
  "label": "尖扎县",
  "value": "3326" },
{
  "label": "泽库县",
  "value": "3327" },
{
  "label": "河南蒙古族自治县",
  "value": "3328" }],

[{
  "label": "共和县",
  "value": "3330" },
{
  "label": "同德县",
  "value": "3331" },
{
  "label": "贵德县",
  "value": "3332" },
{
  "label": "兴海县",
  "value": "3333" },
{
  "label": "贵南县",
  "value": "3334" }],

[{
  "label": "玛沁县",
  "value": "3336" },
{
  "label": "班玛县",
  "value": "3337" },
{
  "label": "甘德县",
  "value": "3338" },
{
  "label": "达日县",
  "value": "3339" },
{
  "label": "久治县",
  "value": "3340" },
{
  "label": "玛多县",
  "value": "3341" }],

[{
  "label": "玉树市",
  "value": "3343" },
{
  "label": "杂多县",
  "value": "3344" },
{
  "label": "称多县",
  "value": "3345" },
{
  "label": "治多县",
  "value": "3346" },
{
  "label": "囊谦县",
  "value": "3347" },
{
  "label": "曲麻莱县",
  "value": "3348" }],

[{
  "label": "格尔木市",
  "value": "3350" },
{
  "label": "德令哈市",
  "value": "3351" },
{
  "label": "乌兰县",
  "value": "3352" },
{
  "label": "都兰县",
  "value": "3353" },
{
  "label": "天峻县",
  "value": "3354" }]],


[
[{
  "label": "市辖区",
  "value": "3357" },
{
  "label": "兴庆区",
  "value": "3358" },
{
  "label": "西夏区",
  "value": "3359" },
{
  "label": "金凤区",
  "value": "3360" },
{
  "label": "永宁县",
  "value": "3361" },
{
  "label": "贺兰县",
  "value": "3362" },
{
  "label": "灵武市",
  "value": "3363" }],

[{
  "label": "市辖区",
  "value": "3365" },
{
  "label": "大武口区",
  "value": "3366" },
{
  "label": "惠农区",
  "value": "3367" },
{
  "label": "平罗县",
  "value": "3368" }],

[{
  "label": "市辖区",
  "value": "3370" },
{
  "label": "利通区",
  "value": "3371" },
{
  "label": "红寺堡区",
  "value": "3372" },
{
  "label": "盐池县",
  "value": "3373" },
{
  "label": "同心县",
  "value": "3374" },
{
  "label": "青铜峡市",
  "value": "3375" }],

[{
  "label": "市辖区",
  "value": "3377" },
{
  "label": "原州区",
  "value": "3378" },
{
  "label": "西吉县",
  "value": "3379" },
{
  "label": "隆德县",
  "value": "3380" },
{
  "label": "泾源县",
  "value": "3381" },
{
  "label": "彭阳县",
  "value": "3382" }],

[{
  "label": "市辖区",
  "value": "3384" },
{
  "label": "沙坡头区",
  "value": "3385" },
{
  "label": "中宁县",
  "value": "3386" },
{
  "label": "海原县",
  "value": "3387" }]],


[
[{
  "label": "市辖区",
  "value": "3390" },
{
  "label": "天山区",
  "value": "3391" },
{
  "label": "沙依巴克区",
  "value": "3392" },
{
  "label": "新市区",
  "value": "3393" },
{
  "label": "水磨沟区",
  "value": "3394" },
{
  "label": "头屯河区",
  "value": "3395" },
{
  "label": "达坂城区",
  "value": "3396" },
{
  "label": "米东区",
  "value": "3397" },
{
  "label": "乌鲁木齐县",
  "value": "3398" }],

[{
  "label": "市辖区",
  "value": "3400" },
{
  "label": "独山子区",
  "value": "3401" },
{
  "label": "克拉玛依区",
  "value": "3402" },
{
  "label": "白碱滩区",
  "value": "3403" },
{
  "label": "乌尔禾区",
  "value": "3404" }],

[{
  "label": "高昌区",
  "value": "3406" },
{
  "label": "鄯善县",
  "value": "3407" },
{
  "label": "托克逊县",
  "value": "3408" }],

[{
  "label": "伊州区",
  "value": "3410" },
{
  "label": "巴里坤哈萨克自治县",
  "value": "3411" },
{
  "label": "伊吾县",
  "value": "3412" }],

[{
  "label": "昌吉市",
  "value": "3414" },
{
  "label": "阜康市",
  "value": "3415" },
{
  "label": "呼图壁县",
  "value": "3416" },
{
  "label": "玛纳斯县",
  "value": "3417" },
{
  "label": "奇台县",
  "value": "3418" },
{
  "label": "吉木萨尔县",
  "value": "3419" },
{
  "label": "木垒哈萨克自治县",
  "value": "3420" }],

[{
  "label": "博乐市",
  "value": "3422" },
{
  "label": "阿拉山口市",
  "value": "3423" },
{
  "label": "精河县",
  "value": "3424" },
{
  "label": "温泉县",
  "value": "3425" }],

[{
  "label": "库尔勒市",
  "value": "3427" },
{
  "label": "轮台县",
  "value": "3428" },
{
  "label": "尉犁县",
  "value": "3429" },
{
  "label": "若羌县",
  "value": "3430" },
{
  "label": "且末县",
  "value": "3431" },
{
  "label": "焉耆回族自治县",
  "value": "3432" },
{
  "label": "和静县",
  "value": "3433" },
{
  "label": "和硕县",
  "value": "3434" },
{
  "label": "博湖县",
  "value": "3435" }],

[{
  "label": "阿克苏市",
  "value": "3437" },
{
  "label": "温宿县",
  "value": "3438" },
{
  "label": "库车县",
  "value": "3439" },
{
  "label": "沙雅县",
  "value": "3440" },
{
  "label": "新和县",
  "value": "3441" },
{
  "label": "拜城县",
  "value": "3442" },
{
  "label": "乌什县",
  "value": "3443" },
{
  "label": "阿瓦提县",
  "value": "3444" },
{
  "label": "柯坪县",
  "value": "3445" }],

[{
  "label": "阿图什市",
  "value": "3447" },
{
  "label": "阿克陶县",
  "value": "3448" },
{
  "label": "阿合奇县",
  "value": "3449" },
{
  "label": "乌恰县",
  "value": "3450" }],

[{
  "label": "喀什市",
  "value": "3452" },
{
  "label": "疏附县",
  "value": "3453" },
{
  "label": "疏勒县",
  "value": "3454" },
{
  "label": "英吉沙县",
  "value": "3455" },
{
  "label": "泽普县",
  "value": "3456" },
{
  "label": "莎车县",
  "value": "3457" },
{
  "label": "叶城县",
  "value": "3458" },
{
  "label": "麦盖提县",
  "value": "3459" },
{
  "label": "岳普湖县",
  "value": "3460" },
{
  "label": "伽师县",
  "value": "3461" },
{
  "label": "巴楚县",
  "value": "3462" },
{
  "label": "塔什库尔干塔吉克自治县",
  "value": "3463" }],

[{
  "label": "和田市",
  "value": "3465" },
{
  "label": "和田县",
  "value": "3466" },
{
  "label": "墨玉县",
  "value": "3467" },
{
  "label": "皮山县",
  "value": "3468" },
{
  "label": "洛浦县",
  "value": "3469" },
{
  "label": "策勒县",
  "value": "3470" },
{
  "label": "于田县",
  "value": "3471" },
{
  "label": "民丰县",
  "value": "3472" }],

[{
  "label": "伊宁市",
  "value": "3474" },
{
  "label": "奎屯市",
  "value": "3475" },
{
  "label": "霍尔果斯市",
  "value": "3476" },
{
  "label": "伊宁县",
  "value": "3477" },
{
  "label": "察布查尔锡伯自治县",
  "value": "3478" },
{
  "label": "霍城县",
  "value": "3479" },
{
  "label": "巩留县",
  "value": "3480" },
{
  "label": "新源县",
  "value": "3481" },
{
  "label": "昭苏县",
  "value": "3482" },
{
  "label": "特克斯县",
  "value": "3483" },
{
  "label": "尼勒克县",
  "value": "3484" }],

[{
  "label": "塔城市",
  "value": "3486" },
{
  "label": "乌苏市",
  "value": "3487" },
{
  "label": "额敏县",
  "value": "3488" },
{
  "label": "沙湾县",
  "value": "3489" },
{
  "label": "托里县",
  "value": "3490" },
{
  "label": "裕民县",
  "value": "3491" },
{
  "label": "和布克赛尔蒙古自治县",
  "value": "3492" }],

[{
  "label": "阿勒泰市",
  "value": "3494" },
{
  "label": "布尔津县",
  "value": "3495" },
{
  "label": "富蕴县",
  "value": "3496" },
{
  "label": "福海县",
  "value": "3497" },
{
  "label": "哈巴河县",
  "value": "3498" },
{
  "label": "青河县",
  "value": "3499" },
{
  "label": "吉木乃县",
  "value": "3500" }],

[{
  "label": "石河子市",
  "value": "3502" },
{
  "label": "阿拉尔市",
  "value": "3503" },
{
  "label": "图木舒克市",
  "value": "3504" },
{
  "label": "五家渠市",
  "value": "3505" },
{
  "label": "铁门关市",
  "value": "3506" }]],


[
[{
  "label": "台北",
  "value": "3509" }]],


[
[{
  "label": "香港特别行政区",
  "value": "3512" }]],


[
[{
  "label": "澳门特别行政区",
  "value": "3515" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-citypicker\\city-data\\city.js":
/*!********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-citypicker/city-data/city.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "3" }],

[{
  "label": "市辖区",
  "value": "21" }],

[{
  "label": "石家庄市",
  "value": "39" },

{
  "label": "唐山市",
  "value": "62" },

/* {
                      "label": "秦皇岛市",
                      "value": "1303"
                    }, */
{
  "label": "邯郸市",
  "value": "87" },

/* {
                      "label": "邢台市",
                      "value": "1305"
                    }, */
{
  "label": "保定市",
  "value": "129" },

/*  {
                        "label": "张家口市",
                        "value": "1307"
                      }, */
{
  "label": "承德市",
  "value": "172" },

{
  "label": "沧州市",
  "value": "185" },

{
  "label": "廊坊市",
  "value": "203" },

{
  "label": "衡水市",
  "value": "215" }],


[{
  "label": "太原市",
  "value": "232" },

{
  "label": "大同市",
  "value": "244" },

{
  "label": "阳泉市",
  "value": "257" },

{
  "label": "长治市",
  "value": "264" },

{
  "label": "晋城市",
  "value": "279" },

{
  "label": "朔州市",
  "value": "287" },

{
  "label": "晋中市",
  "value": "295" },

{
  "label": "运城市",
  "value": "308" },

{
  "label": "忻州市",
  "value": "323" },

{
  "label": "临汾市",
  "value": "339" },

{
  "label": "吕梁市",
  "value": "358" }],


[{
  "label": "呼和浩特市",
  "value": "374" },

{
  "label": "包头市",
  "value": "385" },

{
  "label": "乌海市",
  "value": "396" },

{
  "label": "赤峰市",
  "value": "401" },

{
  "label": "通辽市",
  "value": "415" },

{
  "label": "鄂尔多斯市",
  "value": "425" },

{
  "label": "呼伦贝尔市",
  "value": "436" },

{
  "label": "巴彦淖尔市",
  "value": "452" },

{
  "label": "乌兰察布市",
  "value": "461" },

{
  "label": "兴安盟",
  "value": "474" },

{
  "label": "锡林郭勒盟",
  "value": "481" },

{
  "label": "阿拉善盟",
  "value": "494" }],


[{
  "label": "沈阳市",
  "value": "499" },

{
  "label": "大连市",
  "value": "514" },

{
  "label": "鞍山市",
  "value": "526" },

{
  "label": "抚顺市",
  "value": "535" },

{
  "label": "本溪市",
  "value": "544" },

{
  "label": "丹东市",
  "value": "552" },

{
  "label": "锦州市",
  "value": "560" },

{
  "label": "营口市",
  "value": "569" },

{
  "label": "阜新市",
  "value": "577" },

{
  "label": "辽阳市",
  "value": "586" },

{
  "label": "盘锦市",
  "value": "595" },

{
  "label": "铁岭市",
  "value": "601" },

{
  "label": "朝阳市",
  "value": "610" },

{
  "label": "葫芦岛市",
  "value": "619" }],


[{
  "label": "长春市",
  "value": "628" },

{
  "label": "吉林市",
  "value": "640" },

{
  "label": "四平市",
  "value": "651" },

{
  "label": "辽源市",
  "value": "659" },

{
  "label": "通化市",
  "value": "665" },

{
  "label": "白山市",
  "value": "674" },

{
  "label": "松原市",
  "value": "682" },

{
  "label": "白城市",
  "value": "689" },

{
  "label": "延边朝鲜族自治州",
  "value": "696" }],


[{
  "label": "哈尔滨市",
  "value": "706" },

{
  "label": "齐齐哈尔市",
  "value": "726" },

{
  "label": "鸡西市",
  "value": "744" },

{
  "label": "鹤岗市",
  "value": "755" },

{
  "label": "双鸭山市",
  "value": "765" },

{
  "label": "大庆市",
  "value": "775" },

{
  "label": "伊春市",
  "value": "786" },

{
  "label": "佳木斯市",
  "value": "805" },

{
  "label": "七台河市",
  "value": "817" },

{
  "label": "牡丹江市",
  "value": "823" },

{
  "label": "黑河市",
  "value": "835" },

{
  "label": "绥化市",
  "value": "843" },

{
  "label": "大兴安岭地区",
  "value": "855" }],


[{
  "label": "市辖区",
  "value": "860" }],

[{
  "label": "南京市",
  "value": "878" },

{
  "label": "无锡市",
  "value": "891" },

{
  "label": "徐州市",
  "value": "900" },

{
  "label": "常州市",
  "value": "912" },

{
  "label": "苏州市",
  "value": "920" },

{
  "label": "南通市",
  "value": "931" },

{
  "label": "连云港市",
  "value": "941" },

{
  "label": "淮安市",
  "value": "949" },

{
  "label": "盐城市",
  "value": "958" },

{
  "label": "扬州市",
  "value": "969" },

{
  "label": "镇江市",
  "value": "977" },

{
  "label": "泰州市",
  "value": "985" },

{
  "label": "宿迁市",
  "value": "993" }],


[{
  "label": "杭州市",
  "value": "1001" },

{
  "label": "宁波市",
  "value": "1016" },

{
  "label": "温州市",
  "value": "1029" },

{
  "label": "嘉兴市",
  "value": "1042" },

{
  "label": "湖州市",
  "value": "1051" },

{
  "label": "绍兴市",
  "value": "1058" },

{
  "label": "金华市",
  "value": "1066" },

{
  "label": "衢州市",
  "value": "1077" },

{
  "label": "舟山市",
  "value": "1085" },

{
  "label": "台州市",
  "value": "1091" },

{
  "label": "丽水市",
  "value": "1102" }],


[{
  "label": "合肥市",
  "value": "1114" },

{
  "label": "芜湖市",
  "value": "1125" },

{
  "label": "蚌埠市",
  "value": "1135" },

{
  "label": "淮南市",
  "value": "1144" },

{
  "label": "马鞍山市",
  "value": "1153" },

{
  "label": "淮北市",
  "value": "1161" },

{
  "label": "铜陵市",
  "value": "1167" },

{
  "label": "安庆市",
  "value": "1173" },

{
  "label": "黄山市",
  "value": "1185" },

{
  "label": "滁州市",
  "value": "1194" },

{
  "label": "阜阳市",
  "value": "1204" },

{
  "label": "宿州市",
  "value": "1214" },

{
  "label": "六安市",
  "value": "1221" },

{
  "label": "亳州市",
  "value": "1230" },

{
  "label": "池州市",
  "value": "1236" },

{
  "label": "宣城市",
  "value": "1242" }],


[{
  "label": "福州市",
  "value": "1252" },

{
  "label": "厦门市",
  "value": "1267" },

{
  "label": "莆田市",
  "value": "1275" },

{
  "label": "三明市",
  "value": "1282" },

{
  "label": "泉州市",
  "value": "1296" },

{
  "label": "漳州市",
  "value": "1310" },

{
  "label": "南平市",
  "value": "1323" },

{
  "label": "龙岩市",
  "value": "1335" },

{
  "label": "宁德市",
  "value": "1344" }],


[{
  "label": "南昌市",
  "value": "1356" },

{
  "label": "景德镇市",
  "value": "1367" },

{
  "label": "萍乡市",
  "value": "1373" },

{
  "label": "九江市",
  "value": "1380" },

{
  "label": "新余市",
  "value": "1395" },

{
  "label": "鹰潭市",
  "value": "1399" },

{
  "label": "赣州市",
  "value": "1404" },

{
  "label": "吉安市",
  "value": "1424" },

{
  "label": "宜春市",
  "value": "1439" },

{
  "label": "抚州市",
  "value": "1451" },

{
  "label": "上饶市",
  "value": "1464" }],


[{
  "label": "济南市",
  "value": "1479" },

{
  "label": "青岛市",
  "value": "1491" },

{
  "label": "淄博市",
  "value": "1503" },

{
  "label": "枣庄市",
  "value": "1513" },

{
  "label": "东营市",
  "value": "1521" },

{
  "label": "烟台市",
  "value": "1528" },

{
  "label": "潍坊市",
  "value": "1542" },

{
  "label": "济宁市",
  "value": "1556" },

{
  "label": "泰安市",
  "value": "1569" },

{
  "label": "威海市",
  "value": "1577" },

{
  "label": "日照市",
  "value": "1583" },

{
  "label": "莱芜市",
  "value": "1589" },

{
  "label": "临沂市",
  "value": "1593" },

{
  "label": "德州市",
  "value": "1607" },

{
  "label": "聊城市",
  "value": "1620" },

{
  "label": "滨州市",
  "value": "1630" },

{
  "label": "菏泽市",
  "value": "1639" }],


[{
  "label": "郑州市",
  "value": "1651" },

{
  "label": "开封市",
  "value": "1665" },

{
  "label": "洛阳市",
  "value": "1677" },

{
  "label": "平顶山市",
  "value": "1694" },

{
  "label": "安阳市",
  "value": "1706" },

{
  "label": "鹤壁市",
  "value": "1717" },

{
  "label": "新乡市",
  "value": "1724" },

{
  "label": "焦作市",
  "value": "1738" },

{
  "label": "濮阳市",
  "value": "1750" },

{
  "label": "许昌市",
  "value": "1758" },

{
  "label": "漯河市",
  "value": "1766" },

{
  "label": "三门峡市",
  "value": "1773" },

{
  "label": "南阳市",
  "value": "1781" },

{
  "label": "商丘市",
  "value": "1796" },

{
  "label": "信阳市",
  "value": "1807" },

{
  "label": "周口市",
  "value": "1819" },

{
  "label": "驻马店市",
  "value": "1831" },

{
  "label": "省直辖县级行政区划",
  "value": "1843" }],


[{
  "label": "武汉市",
  "value": "1846" },

{
  "label": "黄石市",
  "value": "1861" },

{
  "label": "十堰市",
  "value": "1869" },

{
  "label": "宜昌市",
  "value": "1879" },

{
  "label": "襄阳市",
  "value": "1894" },

{
  "label": "鄂州市",
  "value": "1905" },

{
  "label": "荆门市",
  "value": "1910" },

{
  "label": "孝感市",
  "value": "1917" },

{
  "label": "荆州市",
  "value": "1926" },

{
  "label": "黄冈市",
  "value": "1936" },

{
  "label": "咸宁市",
  "value": "1948" },

{
  "label": "随州市",
  "value": "1956" },

{
  "label": "恩施土家族苗族自治州",
  "value": "1961" },

{
  "label": "省直辖县级行政区划",
  "value": "1970" }],


[{
  "label": "长沙市",
  "value": "1976" },

{
  "label": "株洲市",
  "value": "1987" },

{
  "label": "湘潭市",
  "value": "1998" },

{
  "label": "衡阳市",
  "value": "2005" },

{
  "label": "邵阳市",
  "value": "2019" },

{
  "label": "岳阳市",
  "value": "2033" },

{
  "label": "常德市",
  "value": "2044" },

{
  "label": "张家界市",
  "value": "2055" },

{
  "label": "益阳市",
  "value": "2061" },

{
  "label": "郴州市",
  "value": "2069" },

{
  "label": "永州市",
  "value": "2082" },

{
  "label": "怀化市",
  "value": "2095" },

{
  "label": "娄底市",
  "value": "2109" },

{
  "label": "湘西土家族苗族自治州",
  "value": "2116" }],


[{
  "label": "广州市",
  "value": "2126" },

{
  "label": "韶关市",
  "value": "2139" },

{
  "label": "深圳市",
  "value": "2151" },

{
  "label": "珠海市",
  "value": "2159" },

{
  "label": "汕头市",
  "value": "2164" },

{
  "label": "佛山市",
  "value": "2173" },

{
  "label": "江门市",
  "value": "2180" },

{
  "label": "湛江市",
  "value": "2189" },

{
  "label": "茂名市",
  "value": "2200" },

{
  "label": "肇庆市",
  "value": "2207" },

{
  "label": "惠州市",
  "value": "2217" },

{
  "label": "梅州市",
  "value": "2224" },

{
  "label": "汕尾市",
  "value": "2234" },

{
  "label": "河源市",
  "value": "2240" },

{
  "label": "阳江市",
  "value": "2248" },

{
  "label": "清远市",
  "value": "2254" },

{
  "label": "东莞市",
  "value": "2264" },

{
  "label": "中山市",
  "value": "2265" },

{
  "label": "潮州市",
  "value": "2266" },

{
  "label": "揭阳市",
  "value": "2271" },

{
  "label": "云浮市",
  "value": "2278" }],


[{
  "label": "南宁市",
  "value": "2286" },

{
  "label": "柳州市",
  "value": "2300" },

{
  "label": "桂林市",
  "value": "2312" },

{
  "label": "梧州市",
  "value": "2331" },

{
  "label": "北海市",
  "value": "2340" },

{
  "label": "防城港市",
  "value": "2346" },

{
  "label": "钦州市",
  "value": "2352" },

{
  "label": "贵港市",
  "value": "2358" },

{
  "label": "玉林市",
  "value": "2365" },

{
  "label": "百色市",
  "value": "2374" },

{
  "label": "贺州市",
  "value": "2388" },

{
  "label": "河池市",
  "value": "2395" },

{
  "label": "来宾市",
  "value": "2408" },

{
  "label": "崇左市",
  "value": "2416" }],


[{
  "label": "海口市",
  "value": "2426" },

{
  "label": "三亚市",
  "value": "2432" },

{
  "label": "三沙市",
  "value": "2438" },

{
  "label": "儋州市",
  "value": "2439" },

{
  "label": "省直辖县级行政区划",
  "value": "2440" }],


[{
  "label": "市辖区",
  "value": "2457" },

{
  "label": "县",
  "value": "2482" }],


[{
  "label": "成都市",
  "value": "2498" },

{
  "label": "自贡市",
  "value": "2520" },

{
  "label": "攀枝花市",
  "value": "2528" },

{
  "label": "泸州市",
  "value": "2535" },

{
  "label": "德阳市",
  "value": "2544" },

{
  "label": "绵阳市",
  "value": "2552" },

{
  "label": "广元市",
  "value": "2563" },

{
  "label": "遂宁市",
  "value": "2572" },

{
  "label": "内江市",
  "value": "2579" },

{
  "label": "乐山市",
  "value": "2586" },

{
  "label": "南充市",
  "value": "2599" },

{
  "label": "眉山市",
  "value": "2610" },

{
  "label": "宜宾市",
  "value": "2618" },

{
  "label": "广安市",
  "value": "2630" },

{
  "label": "达州市",
  "value": "2638" },

{
  "label": "雅安市",
  "value": "2647" },

{
  "label": "巴中市",
  "value": "2657" },

{
  "label": "资阳市",
  "value": "2664" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "2669" },

{
  "label": "甘孜藏族自治州",
  "value": "2683" },

{
  "label": "凉山彝族自治州",
  "value": "2702" }],


[{
  "label": "贵阳市",
  "value": "2721" },

{
  "label": "六盘水市",
  "value": "2733" },

{
  "label": "遵义市",
  "value": "2738" },

{
  "label": "安顺市",
  "value": "2754" },

{
  "label": "毕节市",
  "value": "2762" },

{
  "label": "铜仁市",
  "value": "2772" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "2784" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "2793" },

{
  "label": "黔南布依族苗族自治州",
  "value": "2810" }],


[{
  "label": "昆明市",
  "value": "2824" },

{
  "label": "曲靖市",
  "value": "2840" },

{
  "label": "玉溪市",
  "value": "2851" },

{
  "label": "保山市",
  "value": "2862" },

{
  "label": "昭通市",
  "value": "2869" },

{
  "label": "丽江市",
  "value": "2882" },

{
  "label": "普洱市",
  "value": "2889" },

{
  "label": "临沧市",
  "value": "2901" },

{
  "label": "楚雄彝族自治州",
  "value": "2911" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "2922" },

{
  "label": "文山壮族苗族自治州",
  "value": "2936" },

{
  "label": "西双版纳傣族自治州",
  "value": "2945" },

{
  "label": "大理白族自治州",
  "value": "2949" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "2962" },

{
  "label": "怒江傈僳族自治州",
  "value": "2968" },

{
  "label": "迪庆藏族自治州",
  "value": "2973" }],


[{
  "label": "拉萨市",
  "value": "2978" },

{
  "label": "日喀则市",
  "value": "2988" },

{
  "label": "昌都市",
  "value": "3007" },

{
  "label": "林芝市",
  "value": "3019" },

{
  "label": "山南市",
  "value": "3027" },

{
  "label": "那曲地区",
  "value": "3041" },

{
  "label": "阿里地区",
  "value": "3053" }],


[{
  "label": "西安市",
  "value": "3062" },

{
  "label": "铜川市",
  "value": "3077" },

{
  "label": "宝鸡市",
  "value": "3083" },

{
  "label": "咸阳市",
  "value": "3097" },

{
  "label": "渭南市",
  "value": "3113" },

{
  "label": "延安市",
  "value": "3126" },

{
  "label": "汉中市",
  "value": "3141" },

{
  "label": "榆林市",
  "value": "3154" },

{
  "label": "安康市",
  "value": "3168" },

{
  "label": "商洛市",
  "value": "3180" }],


[{
  "label": "兰州市",
  "value": "3190" },

{
  "label": "嘉峪关市",
  "value": "3200" },

{
  "label": "金昌市",
  "value": "3202" },

{
  "label": "白银市",
  "value": "3206" },

{
  "label": "天水市",
  "value": "3213" },

{
  "label": "武威市",
  "value": "3222" },

{
  "label": "张掖市",
  "value": "3228" },

{
  "label": "平凉市",
  "value": "3236" },

{
  "label": "酒泉市",
  "value": "3245" },

{
  "label": "庆阳市",
  "value": "3254" },

{
  "label": "定西市",
  "value": "3264" },

{
  "label": "陇南市",
  "value": "3273" },

{
  "label": "临夏回族自治州",
  "value": "3284" },

{
  "label": "甘南藏族自治州",
  "value": "3293" }],


[{
  "label": "西宁市",
  "value": "3303" },

{
  "label": "海东市",
  "value": "3312" },

{
  "label": "海北藏族自治州",
  "value": "3319" },

{
  "label": "黄南藏族自治州",
  "value": "3324" },

{
  "label": "海南藏族自治州",
  "value": "3329" },

{
  "label": "果洛藏族自治州",
  "value": "3335" },

{
  "label": "玉树藏族自治州",
  "value": "3342" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "3349" }],


[{
  "label": "银川市",
  "value": "3356" },

{
  "label": "石嘴山市",
  "value": "3364" },

{
  "label": "吴忠市",
  "value": "3369" },

{
  "label": "固原市",
  "value": "3376" },

{
  "label": "中卫市",
  "value": "3383" }],


[{
  "label": "乌鲁木齐市",
  "value": "3389" },

{
  "label": "克拉玛依市",
  "value": "3399" },

{
  "label": "吐鲁番市",
  "value": "3405" },

{
  "label": "哈密市",
  "value": "3409" },

{
  "label": "昌吉回族自治州",
  "value": "3413" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "3421" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "3426" },

{
  "label": "阿克苏地区",
  "value": "3436" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "3446" },

{
  "label": "喀什地区",
  "value": "3451" },

{
  "label": "和田地区",
  "value": "3464" },

{
  "label": "伊犁哈萨克自治州",
  "value": "3473" },

{
  "label": "塔城地区",
  "value": "3485" },

{
  "label": "阿勒泰地区",
  "value": "3493" },

{
  "label": "自治区直辖县级行政区划",
  "value": "3501" }],


[{
  "label": "台北",
  "value": "3508" }],


[{
  "label": "香港岛",
  "value": "3511" }],


[{
  "label": "澳门半岛",
  "value": "3514" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-citypicker\\city-data\\province.js":
/*!************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-citypicker/city-data/province.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "2" },

{
  "label": "天津市",
  "value": "20" },

{
  "label": "河北省",
  "value": "38" },

{
  "label": "山西省",
  "value": "231" },

{
  "label": "内蒙古自治区",
  "value": "373" },

{
  "label": "辽宁省",
  "value": "498" },

{
  "label": "吉林省",
  "value": "627" },

{
  "label": "黑龙江省",
  "value": "705" },

{
  "label": "上海市",
  "value": "859" },

{
  "label": "江苏省",
  "value": "877" },

{
  "label": "浙江省",
  "value": "1000" },

{
  "label": "安徽省",
  "value": "1113" },

{
  "label": "福建省",
  "value": "1251" },

{
  "label": "江西省",
  "value": "1355" },

{
  "label": "山东省",
  "value": "1478" },

{
  "label": "河南省",
  "value": "1650" },

{
  "label": "湖北省",
  "value": "1845" },

{
  "label": "湖南省",
  "value": "1975" },

{
  "label": "广东省",
  "value": "2125" },

{
  "label": "广西壮族自治区",
  "value": "2285" },

{
  "label": "海南省",
  "value": "2425" },

{
  "label": "重庆市",
  "value": "2456" },

{
  "label": "四川省",
  "value": "2497" },

{
  "label": "贵州省",
  "value": "2720" },

{
  "label": "云南省",
  "value": "2823" },

{
  "label": "西藏自治区",
  "value": "2977" },

{
  "label": "陕西省",
  "value": "3061" },

{
  "label": "甘肃省",
  "value": "3189" },

{
  "label": "青海省",
  "value": "3302" },

{
  "label": "宁夏回族自治区",
  "value": "3355" },

{
  "label": "新疆维吾尔自治区",
  "value": "3388" },

{
  "label": "台湾",
  "value": "3507" },

{
  "label": "香港",
  "value": "3510" },

{
  "label": "澳门",
  "value": "3513" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-wxparse\\src\\libs\\html2json.js":
/*!*********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-wxparse/src/libs/html2json.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-wxparse\\src\\libs\\wxDiscode.js"));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-wxparse\\src\\libs\\htmlparser.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                 * html2Json 改造来自: https://github.com/Jxck/html2json
                                                                                                                                                                 *
                                                                                                                                                                 *
                                                                                                                                                                 * author: Di (微信小程序开发工程师)
                                                                                                                                                                 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                 *               垂直微信小程序开发交流社区
                                                                                                                                                                 *
                                                                                                                                                                 * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                 *
                                                                                                                                                                 * for: 微信小程序富文本解析
                                                                                                                                                                 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                 */function makeMap(str) {var obj = {};var items = str.split(',');for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}return obj;} // Block Elements - HTML 5
var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  var isDocument = /<body.*>([^]*)<\/body>/.test(html);
  return isDocument ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.
  replace(/<!--.*?-->/gi, '').
  replace(/\/\*.*?\*\//gi, '').
  replace(/[ ]+</gi, '<').
  replace(/<script[^]*<\/script>/gi, '').
  replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  wx.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  // 生成node节点
  var bufArray = [];
  var results = {
    nodes: [],
    imageUrls: [] };


  function Node(tag) {
    this.node = 'element';
    this.tag = tag;
  }
  Node.prototype.$screen = getScreenInfo();
  Node.prototype.$host = host;

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      // node for this element
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 优化样式相关属性
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // 对img添加额外数据
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (customHandler.start) {
        customHandler.start(node, results);
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-wxparse\\src\\libs\\htmlparser.js":
/*!**********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-wxparse/src/libs/htmlparser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      *
                                                                                                      * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
                                                                                                      *
                                                                                                      * author: Di (微信小程序开发工程师)
                                                                                                      * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                      *               垂直微信小程序开发交流社区
                                                                                                      *
                                                                                                      * github地址: https://github.com/icindy/wxParse
                                                                                                      *
                                                                                                      * for: 微信小程序富文本解析
                                                                                                      * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                      */
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

// Empty Elements - HTML 5
var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

// Block Elements - HTML 5
var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      // Find the closest opened tag of the same type
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      // start tag
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\components\\mpvue-wxparse\\src\\libs\\wxDiscode.js":
/*!*********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/components/mpvue-wxparse/src/libs/wxDiscode.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML 支持的数学符号
function strNumDiscode(str) {
  str = str.replace(/&forall;/g, '∀');
  str = str.replace(/&part;/g, '∂');
  str = str.replace(/&exist;/g, '∃');
  str = str.replace(/&empty;/g, '∅');
  str = str.replace(/&nabla;/g, '∇');
  str = str.replace(/&isin;/g, '∈');
  str = str.replace(/&notin;/g, '∉');
  str = str.replace(/&ni;/g, '∋');
  str = str.replace(/&prod;/g, '∏');
  str = str.replace(/&sum;/g, '∑');
  str = str.replace(/&minus;/g, '−');
  str = str.replace(/&lowast;/g, '∗');
  str = str.replace(/&radic;/g, '√');
  str = str.replace(/&prop;/g, '∝');
  str = str.replace(/&infin;/g, '∞');
  str = str.replace(/&ang;/g, '∠');
  str = str.replace(/&and;/g, '∧');
  str = str.replace(/&or;/g, '∨');
  str = str.replace(/&cap;/g, '∩');
  str = str.replace(/&cup;/g, '∪');
  str = str.replace(/&int;/g, '∫');
  str = str.replace(/&there4;/g, '∴');
  str = str.replace(/&sim;/g, '∼');
  str = str.replace(/&cong;/g, '≅');
  str = str.replace(/&asymp;/g, '≈');
  str = str.replace(/&ne;/g, '≠');
  str = str.replace(/&le;/g, '≤');
  str = str.replace(/&ge;/g, '≥');
  str = str.replace(/&sub;/g, '⊂');
  str = str.replace(/&sup;/g, '⊃');
  str = str.replace(/&nsub;/g, '⊄');
  str = str.replace(/&sube;/g, '⊆');
  str = str.replace(/&supe;/g, '⊇');
  str = str.replace(/&oplus;/g, '⊕');
  str = str.replace(/&otimes;/g, '⊗');
  str = str.replace(/&perp;/g, '⊥');
  str = str.replace(/&sdot;/g, '⋅');
  return str;
}

// HTML 支持的希腊字母
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;/g, 'Α');
  str = str.replace(/&Beta;/g, 'Β');
  str = str.replace(/&Gamma;/g, 'Γ');
  str = str.replace(/&Delta;/g, 'Δ');
  str = str.replace(/&Epsilon;/g, 'Ε');
  str = str.replace(/&Zeta;/g, 'Ζ');
  str = str.replace(/&Eta;/g, 'Η');
  str = str.replace(/&Theta;/g, 'Θ');
  str = str.replace(/&Iota;/g, 'Ι');
  str = str.replace(/&Kappa;/g, 'Κ');
  str = str.replace(/&Lambda;/g, 'Λ');
  str = str.replace(/&Mu;/g, 'Μ');
  str = str.replace(/&Nu;/g, 'Ν');
  str = str.replace(/&Xi;/g, 'Ν');
  str = str.replace(/&Omicron;/g, 'Ο');
  str = str.replace(/&Pi;/g, 'Π');
  str = str.replace(/&Rho;/g, 'Ρ');
  str = str.replace(/&Sigma;/g, 'Σ');
  str = str.replace(/&Tau;/g, 'Τ');
  str = str.replace(/&Upsilon;/g, 'Υ');
  str = str.replace(/&Phi;/g, 'Φ');
  str = str.replace(/&Chi;/g, 'Χ');
  str = str.replace(/&Psi;/g, 'Ψ');
  str = str.replace(/&Omega;/g, 'Ω');

  str = str.replace(/&alpha;/g, 'α');
  str = str.replace(/&beta;/g, 'β');
  str = str.replace(/&gamma;/g, 'γ');
  str = str.replace(/&delta;/g, 'δ');
  str = str.replace(/&epsilon;/g, 'ε');
  str = str.replace(/&zeta;/g, 'ζ');
  str = str.replace(/&eta;/g, 'η');
  str = str.replace(/&theta;/g, 'θ');
  str = str.replace(/&iota;/g, 'ι');
  str = str.replace(/&kappa;/g, 'κ');
  str = str.replace(/&lambda;/g, 'λ');
  str = str.replace(/&mu;/g, 'μ');
  str = str.replace(/&nu;/g, 'ν');
  str = str.replace(/&xi;/g, 'ξ');
  str = str.replace(/&omicron;/g, 'ο');
  str = str.replace(/&pi;/g, 'π');
  str = str.replace(/&rho;/g, 'ρ');
  str = str.replace(/&sigmaf;/g, 'ς');
  str = str.replace(/&sigma;/g, 'σ');
  str = str.replace(/&tau;/g, 'τ');
  str = str.replace(/&upsilon;/g, 'υ');
  str = str.replace(/&phi;/g, 'φ');
  str = str.replace(/&chi;/g, 'χ');
  str = str.replace(/&psi;/g, 'ψ');
  str = str.replace(/&omega;/g, 'ω');
  str = str.replace(/&thetasym;/g, 'ϑ');
  str = str.replace(/&upsih;/g, 'ϒ');
  str = str.replace(/&piv;/g, 'ϖ');
  str = str.replace(/&middot;/g, '·');
  return str;
}

function strcharacterDiscode(str) {
  // 加入常用解析
  str = str.replace(/&nbsp;/g, ' ');
  str = str.replace(/&ensp;/g, ' ');
  str = str.replace(/&emsp;/g, '　');
  str = str.replace(/&quot;/g, "'");
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&#8226;/g, '•');

  return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
  str = str.replace(/&OElig;/g, 'Œ');
  str = str.replace(/&oelig;/g, 'œ');
  str = str.replace(/&Scaron;/g, 'Š');
  str = str.replace(/&scaron;/g, 'š');
  str = str.replace(/&Yuml;/g, 'Ÿ');
  str = str.replace(/&fnof;/g, 'ƒ');
  str = str.replace(/&circ;/g, 'ˆ');
  str = str.replace(/&tilde;/g, '˜');
  str = str.replace(/&ensp;/g, '');
  str = str.replace(/&emsp;/g, '');
  str = str.replace(/&thinsp;/g, '');
  str = str.replace(/&zwnj;/g, '');
  str = str.replace(/&zwj;/g, '');
  str = str.replace(/&lrm;/g, '');
  str = str.replace(/&rlm;/g, '');
  str = str.replace(/&ndash;/g, '–');
  str = str.replace(/&mdash;/g, '—');
  str = str.replace(/&lsquo;/g, '‘');
  str = str.replace(/&rsquo;/g, '’');
  str = str.replace(/&sbquo;/g, '‚');
  str = str.replace(/&ldquo;/g, '“');
  str = str.replace(/&rdquo;/g, '”');
  str = str.replace(/&bdquo;/g, '„');
  str = str.replace(/&dagger;/g, '†');
  str = str.replace(/&Dagger;/g, '‡');
  str = str.replace(/&bull;/g, '•');
  str = str.replace(/&hellip;/g, '…');
  str = str.replace(/&permil;/g, '‰');
  str = str.replace(/&prime;/g, '′');
  str = str.replace(/&Prime;/g, '″');
  str = str.replace(/&lsaquo;/g, '‹');
  str = str.replace(/&rsaquo;/g, '›');
  str = str.replace(/&oline;/g, '‾');
  str = str.replace(/&euro;/g, '€');
  str = str.replace(/&trade;/g, '™');

  str = str.replace(/&larr;/g, '←');
  str = str.replace(/&uarr;/g, '↑');
  str = str.replace(/&rarr;/g, '→');
  str = str.replace(/&darr;/g, '↓');
  str = str.replace(/&harr;/g, '↔');
  str = str.replace(/&crarr;/g, '↵');
  str = str.replace(/&lceil;/g, '⌈');
  str = str.replace(/&rceil;/g, '⌉');

  str = str.replace(/&lfloor;/g, '⌊');
  str = str.replace(/&rfloor;/g, '⌋');
  str = str.replace(/&loz;/g, '◊');
  str = str.replace(/&spades;/g, '♠');
  str = str.replace(/&clubs;/g, '♣');
  str = str.replace(/&hearts;/g, '♥');

  str = str.replace(/&diams;/g, '♦');
  str = str.replace(/&#39;/g, "'");
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  }
  return url;
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js":
/*!******************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\App.vue"));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\store\\index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
_vue.default.config.productionTip = false;
_vue.default.prototype.$eventHub = new _vue.default();

_vue.default.prototype.websiteUrl = 'http://203.195.164.19:8088/';
_vue.default.prototype.imageBaseUrl = 'http://203.195.164.19/';
//	return "https://app.bof.kim/  http://203.195.164.19:8088/";
//	return "https://ds.bof.kim/  http://203.195.164.19/";
_vue.default.prototype.getImageUrl = function (url) {
  if (url && url.includes("://")) {
    return url;
  }
  return this.imageBaseUrl + 'public/static/' + url;
};
_vue.default.prototype.customMethods = {
  createState: function createState(name, callback) {
    var state = this.getState();
    state.account = name;
    state.token = "token123456789";
    this.setState(state);
    return callback();
  },
  getState: function getState() {
    // var stateText = localStorage.getItem('$state') || "{}";
    var stateText = uni.getStorageSync('$state') || "{}";
    return JSON.parse(stateText);
  },
  setState: function setState(state) {
    state = state || {};
    uni.setStorageSync('$state', JSON.stringify(state));
  },
  getSettings: function getSettings() {
    var settingsText = uni.getStorageSync('$settings') || "{}";
    return JSON.parse(settingsText);
  },
  setSettings: function setSettings(settings) {
    settings = settings || {};
    uni.setStorageSync('$settings', JSON.stringify(settings));
  },
  getRankName: function getRankName(rank) {
    var settings = this.getSettings();
    if (settings && settings.rankNames) {
      var rankNames = settings.rankNames;
      for (var i = 0; i < rankNames.length; i++) {
        var rankItem = rankNames[i];
        if (rankItem.rank == rank) {
          return rankItem.rankName;
        }
      }
    }
  },
  isPoneAvailable: function isPoneAvailable(str) {
    var myreg = /^1[23456789]\d{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  timestampToTime: function timestampToTime() {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  six_num_ver: function six_num_ver(txt) {//6位数字验证
    var reg = /^\d{6}\b/;
    if (reg.test(txt)) {
      return 1;
    } else {
      return 0;
    }
  },
  escape2Html: function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    var ret = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {return arrEntities[t];});
    var arrEntities = { 'nbsp': ' ' };
    return ret.replace(/&(nbsp);/ig, function (all, t) {return arrEntities[t];});
  },
  getLocalTime: function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  } };


_vue.default.prototype.$store = _store.default;
_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Flogin%2Ffindpassword%2Ffindpassword\"}":
/*!*************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Flogin%2Ffindpassword%2Ffindpassword"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _findpassword = _interopRequireDefault(__webpack_require__(/*! ./pages/login/findpassword/findpassword.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\login\\findpassword\\findpassword.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_findpassword.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Flogin%2Flogin%2Flogin\"}":
/*!***********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Flogin%2Flogin%2Flogin"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login/login.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\login\\login\\login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Flogin%2Fsetpassword%2Fsetpassword\"}":
/*!***********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Flogin%2Fsetpassword%2Fsetpassword"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _setpassword = _interopRequireDefault(__webpack_require__(/*! ./pages/login/setpassword/setpassword.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\login\\setpassword\\setpassword.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_setpassword.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Faddress%2Faddress-edit%2Faddress-edit\"}":
/*!**************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Faddress%2Faddress-edit%2Faddress-edit"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addressEdit = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/address/address-edit/address-edit.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\address\\address-edit\\address-edit.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addressEdit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Faddress%2Faddress-manage%2Faddress-manage\"}":
/*!******************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Faddress%2Faddress-manage%2Faddress-manage"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addressManage = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/address/address-manage/address-manage.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\address\\address-manage\\address-manage.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addressManage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fcard%2Fcard-edit%2Fcard-edit\"}":
/*!*****************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fcard%2Fcard-edit%2Fcard-edit"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cardEdit = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/card/card-edit/card-edit.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\card\\card-edit\\card-edit.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cardEdit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fcard%2Fcard-manage%2Fcard-manage\"}":
/*!*********************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fcard%2Fcard-manage%2Fcard-manage"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cardManage = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/card/card-manage/card-manage.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\card\\card-manage\\card-manage.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cardManage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fmessage%2Fmessage\"}":
/*!******************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fmessage%2Fmessage"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _message = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/message/message.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\message\\message.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_message.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fmessage%2Fmessage-detail%2Fmessage-detail\"}":
/*!******************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fmessage%2Fmessage-detail%2Fmessage-detail"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _messageDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/message/message-detail/message-detail.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\message\\message-detail\\message-detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_messageDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fmine%2Fmine\"}":
/*!************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fmine%2Fmine"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _mine = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/mine/mine.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\mine\\mine.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_mine.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Forder%2Forder-detail%2Forder-detail\"}":
/*!************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Forder%2Forder-detail%2Forder-detail"} ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _orderDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/order/order-detail/order-detail.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\order\\order-detail\\order-detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_orderDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Forder%2Forder-list\"}":
/*!*******************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Forder%2Forder-list"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _orderList = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/order/order-list.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\order\\order-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_orderList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fpassword%2Fpassword\"}":
/*!********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fpassword%2Fpassword"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _password = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/password/password.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\password\\password.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_password.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fuser-info%2Fuser-info\"}":
/*!**********************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fuser-info%2Fuser-info"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _userInfo = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/user-info/user-info.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\user-info\\user-info.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_userInfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fmycenter%2Fuser-info%2Fuser-info-edit%2Fuser-info-edit\"}":
/*!********************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fmycenter%2Fuser-info%2Fuser-info-edit%2Fuser-info-edit"} ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _userInfoEdit = _interopRequireDefault(__webpack_require__(/*! ./pages/mycenter/user-info/user-info-edit/user-info-edit.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\mycenter\\user-info\\user-info-edit\\user-info-edit.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_userInfoEdit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fshops%2Fshop-cart-list%2Fshop-cart-list\"}":
/*!*****************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fshops%2Fshop-cart-list%2Fshop-cart-list"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopCartList = _interopRequireDefault(__webpack_require__(/*! ./pages/shops/shop-cart-list/shop-cart-list.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\shops\\shop-cart-list\\shop-cart-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopCartList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fshops%2Fshop-cashier%2Fshop-cashier\"}":
/*!*************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fshops%2Fshop-cashier%2Fshop-cashier"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopCashier = _interopRequireDefault(__webpack_require__(/*! ./pages/shops/shop-cashier/shop-cashier.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\shops\\shop-cashier\\shop-cashier.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopCashier.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fshops%2Fshop-goods-detail%2Fshop-goods-detail\"}":
/*!***********************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fshops%2Fshop-goods-detail%2Fshop-goods-detail"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopGoodsDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/shops/shop-goods-detail/shop-goods-detail.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\shops\\shop-goods-detail\\shop-goods-detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopGoodsDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Fshops%2Fshop-order-place%2Fshop-order-place\"}":
/*!*********************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Fshops%2Fshop-order-place%2Fshop-order-place"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopOrderPlace = _interopRequireDefault(__webpack_require__(/*! ./pages/shops/shop-order-place/shop-order-place.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\shops\\shop-order-place\\shop-order-place.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopOrderPlace.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Fdeal%2Fdeal\"}":
/*!**********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar%2Fdeal%2Fdeal"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _deal = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar/deal/deal.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\deal\\deal.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_deal.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Ffinance%2Ffinance\"}":
/*!****************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar%2Ffinance%2Ffinance"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _finance = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar/finance/finance.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\finance\\finance.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_finance.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Findex%2Findex\"}":
/*!************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar%2Findex%2Findex"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar/index/index.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Fshop%2Fshop\"}":
/*!**********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar%2Fshop%2Fshop"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shop = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar/shop/shop.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\shop\\shop.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shop.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar%2Fteam%2Fteam\"}":
/*!**********************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar%2Fteam%2Fteam"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _team = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar/team/team.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar\\team\\team.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_team.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar-3-detial%2Ftabbar-3-qa%2Ftabbar-3-qa\"}":
/*!*********************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar-3-detial%2Ftabbar-3-qa%2Ftabbar-3-qa"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _tabbar3Qa = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar-3-detial\\tabbar-3-qa\\tabbar-3-qa.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_tabbar3Qa.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar-3-detial%2Ftabbar-3-release%2Ftabbar-3-release\"}":
/*!*******************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar-3-detial%2Ftabbar-3-release%2Ftabbar-3-release"} ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _tabbar3Release = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar-3-detial\\tabbar-3-release\\tabbar-3-release.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_tabbar3Release.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\main.js?{\"page\":\"pages%2Ftabbar-3-detial%2Ftabbar-3-video%2Ftabbar-3-video\"}":
/*!***************************************************************************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/main.js?{"page":"pages%2Ftabbar-3-detial%2Ftabbar-3-video%2Ftabbar-3-video"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _tabbar3Video = _interopRequireDefault(__webpack_require__(/*! ./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.vue */ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages\\tabbar-3-detial\\tabbar-3-video\\tabbar-3-video.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_tabbar3Video.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\pages.json":
/*!*********************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "G:\\BOF项目\\bof小程序\\bof-uniapp\\store\\index.js":
/*!*************************************************!*\
  !*** G:/BOF项目/bof小程序/bof-uniapp/store/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var userState = {
  userName: '',
  token: '',
  hasLogin: false, //是否登录
  colorIndex: 0,
  colorArr: [],
  classArr: [],
  headerClasssArr: [],
  rgbas: []
  //websiteUrl:'https://app.bof.kim/',  //https://app.bof.kim/
  //mageBaseUrl:'https://ds.bof.kim/' //https://ds.bof.kim/
};


var userInfo = uni.getStorageSync('userInfo');
if (userInfo.hasLogin) {
  userState = userInfo;
}

var store = new _vuex.default.Store({
  state: _objectSpread({}, userState),
  mutations: {
    login: function login(state, user) {//用户登录
      state.userName = user.userName;
      state.token = user.token;
      state.hasLogin = true;
      state.colorIndex = 0;
      state.colorArr = ['#2d98fa', '#ffa396', '#83bfa5', '#c08dcd'];
      state.classArr = ['blue-gradient', 'red-gradient', 'green-gradient', 'purple-gradient'],
      state.headerClasssArr = ['blue-gradient-top', 'red-gradient-top', 'green-gradient-top', 'purple-gradient-top'],
      state.rgbas = ['rgba(45,152,250,.9)', 'rgba(255,163,150,.9)', 'rgba(131,191,165,.9)', 'rgba(192,141,205,.9)'];

      uni.setStorageSync('userInfo', _objectSpread({}, state));
    },
    selectColor: function selectColor(state) {
      state.colorIndex++;
      if (state.colorIndex >= state.colorArr.length) {
        state.colorIndex = 0;
      }
    }
    // 		logout(state){ //用户退出
    // 			state.userName = '';
    // 			state.token = '';
    // 			state.hasLogin = false;
    // 			
    // 			uni.clearStorageSync();
    // 		},
    // 		uniRequest(url,method,data={}){ //封装请求为Promise
    // 			uni.showNavigationBarLoading();
    // 			data.method = method;
    // 			return new Promise((resolve,reject)=>{
    // 				uni.request({
    // 					url: url,
    // 					method: method,
    // 					data:data,
    // 					dataType:'json',//服务器返回json格式数据
    // 					headers:{'Content-Type':'application/json','Token':this.token},
    // 					success: res => {
    // 						uni.hideNavigationBarLoading();
    // 						resolve(res.data);
    // 					},
    // 					fail: (msg) => {
    // 						console.log('request fail',msg);
    // 						uni.hideNavigationBarLoading()
    // 						reject('fail');
    // 					},
    // 					complete: () => {}
    // 				});
    // 			})
    // 		}
  } });var _default =


store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map