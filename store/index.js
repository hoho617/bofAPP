import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let userState = {
	userName:'',
	token:'',
	hasLogin:false, //是否登录
	colorIndex:0,
	colorArr:[],
	classArr:[],
	headerClasssArr:[],
	rgbas:[]
	//websiteUrl:'https://app.bof.kim/',  //https://app.bof.kim/
	//mageBaseUrl:'https://ds.bof.kim/' //https://ds.bof.kim/
};


const userInfo = uni.getStorageSync('userInfo');
console.log(JSON.stringify(userInfo));
if(userInfo.hasLogin) {
	userState = userInfo;
}

const store = new Vuex.Store({
	state:{...userState},
	mutations:{
		login(state,user){ //用户登录
			state.userName = user.userName;
			state.token = user.token;
			state.hasLogin = true;
			state.colorIndex = 0;
			state.colorArr = ['#2d98fa', '#ffa396', '#83bfa5','#c08dcd'];
			state.classArr = ['blue-gradient','red-gradient','green-gradient','purple-gradient'],
			state.headerClasssArr = ['blue-gradient-top','red-gradient-top','green-gradient-top','purple-gradient-top'],
			state.rgbas = ['rgba(45,152,250,.9)','rgba(255,163,150,.9)','rgba(131,191,165,.9)','rgba(192,141,205,.9)']
			
			uni.setStorageSync('userInfo', {...state});	
		},
		selectColor(state){ //下拉选择颜色，
			state.colorIndex ++;
			if (state.colorIndex >= state.colorArr.length) {
				state.colorIndex = 0;
			}
		},
		logout(state){ //用户退出
			state.userName = '';
			state.token = '';
			state.hasLogin = false;
			uni.clearStorageSync();
		},
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
	}
});

export default store