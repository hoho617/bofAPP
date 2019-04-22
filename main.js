import Vue from 'vue'
import App from './App'

import store from './store'
Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue();

Vue.prototype.websiteUrl = 'http://203.195.164.19:8088/'
Vue.prototype.imageBaseUrl = 'http://203.195.164.19/'
//	return "https://app.bof.kim/  http://203.195.164.19:8088/";
//	return "https://ds.bof.kim/  http://203.195.164.19/";
Vue.prototype.getImageUrl = function(url){
	if(url && url.includes("://")){
		return url;
	}
	return this.imageBaseUrl + 'public/static/' + url;
};
Vue.prototype.customMethods = {
	createState : function(name, callback) {
		var state = this.getState();
		state.account = name;
		state.token = "token123456789";
		this.setState(state);
		return callback();
	},
	getState:function(){
		// var stateText = localStorage.getItem('$state') || "{}";
		var stateText = uni.getStorageSync('$state') || "{}";
		return JSON.parse(stateText);
	},
	setState:function(state){
		state = state || {};
		uni.setStorageSync('$state', JSON.stringify(state));
	},
	getSettings(){
		var settingsText = uni.getStorageSync('$settings') || "{}";
		return JSON.parse(settingsText);
	},
	setSettings(settings){
		settings = settings || {};
		uni.setStorageSync('$settings', JSON.stringify(settings));
	},
	getRankName:function(rank){
		let settings = this.getSettings();
		if(settings && settings.rankNames){
			let rankNames = settings.rankNames;
			for(var i = 0;i < rankNames.length;i++){
				var rankItem = rankNames[i];
				if(rankItem.rank == rank) {
					return rankItem.rankName;
				}
			}
		}
	},
	getRankStyle:function(item){
		var style = '';
		if(item.state == 1){
			switch (item.rank) {
				case 0:
					style = 'color: #009999';
					break;
				case 1:
					style = 'color: #8891ed';
					break;
				case 2:
					style = 'color: #ff6700';
					break;
				case 3:
					style = 'color: #ff2200';
					break;
				case 4:
					style = 'color: #ff0022';
					break;
				default:
					style = 'color: #8b8484';
					break;
			}
		}
		return style;
	},
	isPoneAvailable:function(str){
		var myreg = /^1[23456789]\d{9}$/;
		if(!myreg.test(str)) {
			return false;
		} else {
			return true;
		}
	},
	timestampToTime:function(timestamp){
		var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate() < 10) ? '0'+date.getDate()+ ' ': date.getDate() + ' ';
		var h = (date.getHours() < 10) ? '0'+date.getHours()+ ':' : date.getHours()+ ':';
		var m = (date.getMinutes() < 10) ? '0'+date.getMinutes() + ':' : date.getMinutes() + ':';
		var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() :date.getSeconds();
		return Y+M+D+h+m+s;
	},
	six_num_ver:function(txt){//6位数字验证
		var reg = /^\d{6}\b/;
		if(reg.test(txt)){
			return 1
		}else {
			return 0;
		}
	},
	escape2Html:function(str){
		var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		var ret = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		var arrEntities = {'nbsp' : ' '};
		return ret.replace(/&(nbsp);/ig, function(all, t){return arrEntities[t]})
	},
	getLocalTime:function(nS){
		 return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
	},
	getDate:function(nS) {
		var date = new Date(parseInt(nS) * 1000);
		return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	},
	timestampToTimeHour:function(timestamp){
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		/*Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = (date.getDate() < 10) ? '0'+date.getDate()+ ' ': date.getDate() + ' ';*/
		var h = (date.getHours() < 10) ? '0' + date.getHours() + ':' : date.getHours() + ':';
		var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
		var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
		return h + m + s;
	}
}

Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
