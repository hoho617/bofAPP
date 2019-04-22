<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
		
	},
	onShow: function() {
		console.log('App Show');
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./static/colorui/main2.css";
	@import "./static/colorui/icon.css";
	@import "./static/colorui/icon2.css";
	@import './common/uni.css';
	@import './static/css/color.css';
	@import url("./static/fonts/iconfont.css");
	@import './static/css/common.css';
	/*每个页面公共css */
	
	
	@font-face {
	  font-family: 'iconfont';  /* project id 667942 */
	  src: url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.eot');
	  src: url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.woff') format('woff'),
	  url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_667942_g6hkjsuxtb5.svg#iconfont') format('svg');
	}
	.icon {
		font-size: 56upx;
		font-family: "iconfont" !important;
	}
	
</style>
