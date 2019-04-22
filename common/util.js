function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in UNITS) {
			if (milliseconds >= UNITS[key]) {
				humanize = Math.floor(milliseconds / UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < UNITS['天']) {
			return humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};


var stateUtils = {
	createState: function(name, callback) {
		var state = stateUtils.getState();
		state.account = name;
		state.token = "token123456789";
		stateUtils.setState(state);
		return callback();
	},
	getState: function() {
		// var stateText = localStorage.getItem('$state') || "{}";
		var stateText = uni.getStorageSync('$state') || "{}";
		return JSON.parse(stateText);
	},
	setState: function(state) {
		state = state || {};
		uni.setStorageSync('$state', JSON.stringify(state));
	}
}
var methodUtils = {
	isPoneAvailable: function(str) {
		var myreg = /^1[23456789]\d{9}$/;
		if (!myreg.test(str)) {
			return false;
		} else {
			return true;
		}
	},
	timestampToTime: function() {
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10) ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
		var h = (date.getHours() < 10) ? '0' + date.getHours() + ':' : date.getHours() + ':';
		var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
		var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
		return Y + M + D + h + m + s;
	},
	six_num_ver: function(txt) { //6位数字验证
		var reg = /^\d{6}\b/;
		if (reg.test(txt)) {
			return 1
		} else {
			return 0;
		}
	}
}




module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	stateUtils: stateUtils,
	methodUtils: methodUtils
}
