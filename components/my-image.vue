<template>
	<image :src="imgUrl" :mode="mode" />
</template>

<script>
	export default {
		props:{
			data:{
				type:Object,
// 				default:function(e){
// 					return {}
// 				}
			},
			modeData:{
				type:String,
				// default:''
			}
		},
		computed:{
			imgUrl(){
				if(this.data){
					var goodsPics = this.data.split(',');
					var url = goodsPics.length>0 ? goodsPics[0] : '';
					return this.getImageUrl(url);
				}
				
			},
			mode(){
				if(this.modeData){
					var modeData = this.modeData;
					return modeData;
				}else {
					return 'widthFix'
				}
			}
		},
		methods:{
		}
	}
</script>

<style>
	
</style>
