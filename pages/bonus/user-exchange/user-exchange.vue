<template>
	<view class="container">
		<view class="exchange-top">
			<view class="top-price red-price">1.00</view>
			<view class="top-items">
				<view class="top-item">
					<text>24h最高价</text>
					<text class="darker-color">1.00</text>
				</view>
				<view class="top-item">
					<text>24h最低价</text>
					<text class="darker-color">1.00</text>
				</view>
			</view>
		</view>
		<view class="exchange-tab">
			<view class="tab-head">
				<view class="tab-item">分时</view>
				<view class="tab-item">五日</view>
				<view class="tab-item tab-active">日K</view>
				<view class="tab-item">周K</view>
				<view class="tab-item">月K</view>
				<view class="tab-item">设置</view>
				<view class="tab-item down-mobile">
					<image src="../../../static/img/card/mobile.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="canvasView">
				<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
			</view>
		</view>

	</view>
</template>

<script>
	import * as echarts from '@/components/echarts/echarts.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';

	/* let lineOption = {
			title: {
			  text: 'K 线图'
			},
			xAxis: {
			  data: ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00']
			},
			yAxis: {},
			series: [{
			  type: 'k',
			  data: [
				[100, 200, 40, 250],
				[80, 90, 66, 100],
				[90, 40, 33, 110],
				[50, 60, 40, 80],
				[200, 180, 160, 200],
				[100, 200, 40, 250],
				[80, 90, 66, 100]
			  ],
			  itemStyle: {
				normal: {
				  color: '#ff0000',
				  color0: '#00ff00',
				  borderWidth: 1,
				  opacity: 1
				}
			  }
			}]
	} */
	function splitData(rawData) {
	  var datas = [];
	  var times = [];
	  var vols = [];
	  var macds = []; var difs = []; var deas = [];
	  for (var i = 0; i < rawData.length; i++) {
		  datas.push(rawData[i]);
		  times.push(rawData[i].splice(0, 1)[0]);
		  vols.push(rawData[i][4]);
		  macds.push(rawData[i][6]);
		  difs.push(rawData[i][7]);
		  deas.push(rawData[i][8]);
	  }
	  return {
		  datas: datas,
		  times: times,
		  vols: vols,
		  macds: macds,
		  difs: difs,
		  deas: deas
	  };
	}
	var data = splitData([
		['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94, 1000.00],
		['2013/1/25', 2300, 2291.3, 2288.26, 2308.38, 1000.00],
		['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92, 1000.00],
		['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8, 1000.00],
		['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76, 1000.00],
		['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82, 1000.00],
		['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15, 1000.00],
		['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38, 1000.00],
		['2013/2/5', 2411, 2433.13, 2403.3, 2437.42, 1000.00],
		['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73, 1000.00],
		['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
		['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
		['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
		['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
		['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
		['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
		['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
		['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
		['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
		['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
		['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
		['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
		['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
		['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
		['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
		['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
		['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
		['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
		['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
		['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
		['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
		['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
		['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
		['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
		['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
		['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
		['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
		['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
		['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
		['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
		['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
		['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
		['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
		['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
		['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
		['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
		['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
		['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
		['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
		['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
		['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
		['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
		['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
		['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
		['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
		['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
		['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
		['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
		['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
		['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
		['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
		['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
		['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
		['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
		['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
		['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
		['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
		['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
		['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
		['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
		['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
		['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
		['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
		['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
		['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
		['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
		['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
		['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
		['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
		['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
		['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
		['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
		['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
		['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
		['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
		['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
		['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
		['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
	]);
	var lineOption = {
	  title: {
		  left: 0
	  },
	  tooltip: {
		  trigger: 'axis',
		  show:true,
//				      triggerOn:'mousemove|click',
			showDelay:20,
			axisPointer: {
			  type: 'cross',
			  crossStyle: {
					color: '#b5b5b5',
					type:'solid',
					width:0.5,
			  }
		  }
	  },
	  legend: {
		  data: []
	  },
	  grid: [           {
		  left: '0%',
		  right: '15%',
		  height: '65%',
		  top:'5%'
	  },{
		  left: '0%',
		  right: '15%',
		  top: '75%',
		  height: '20%'
	  }],
	  xAxis: [{
		  type: 'category',
		  data: data.times,
		  scale: false,
//				      boundaryGap: false, //解决超出y轴右边
		  axisLine: { 
			onZero: false,
			lineStyle:{
				color:'#313131',
				width:1,//这里是为了突出显示加上的
		   }
		  },
		  splitNumber: 20,
		  min: 'dataMin',
		  max: 'dataMax',
		  position:'bottom',
		  axisLabel: {show: false},
	  },{
		  type: 'category',
		  gridIndex: 1,
		  data: data.times,
		  axisLabel: {show: false},
		  axisPointer:{
			show:false
		  }
	  }],
	  yAxis: [{
		  scale: true,
		  splitArea: {
			  show: false
		  }, 
		  position:'right',
		  splitLine: {
					lineStyle: {
						color: ['#313131']
					}
			},
		// interval:1,
		boundaryGap:['20%','20%'],
//					/**/min:(8-0.2),
		min: function(value) {
		console.log(value.min*0.97)
		return value.min*0.97;
		},
		max: function(value) {
		console.log(value.max*1.03)
		return value.max*1.03;
		},
//					max:(Number(maxY)+0.2),
//					axisTick: {show: false},
		axisLabel: {
//			            inside: true,
//						align:'center',
			formatter: function(value,index){
				if(value >=10){
					return ' '+value.toFixed(2)+'  -'
				}else {
					return ' '+0 + value.toFixed(2) + '  -';
				}
				
			}
		}
	  },{
		  gridIndex: 1,
		  splitNumber: 3,
		  axisLine: {onZero: true},
		  axisTick: {show: false},
		  splitLine: {show: false},
		  axisLabel: {show: true},
		  show:true,
		  position:'right',
		  axisPointer:{
			show:false
		  }
	  }],
	  dataZoom: [{
			  type: 'inside',
			  xAxisIndex: [0, 0],
//				          yAxisIndex:[0,1],
			  realtime: true,
			  start: 0,
			  end: 100,
//				          filterMode:'empty'
		},{
			  show: true,
			  xAxisIndex: [0, 1],
			  realtime: true,
			  type: 'inside',
			  top: '97%',
			  start: 0,
			  end: 100,
			  //filterMode:'empty'
		}],
	  series: [{
			  name: '宝石券曲线表',
			  type: 'candlestick',
			  data: data.datas,
			  itemStyle: {
				  normal: {
						color: '#ea3f37',  //对应红
					  color0: '#4eb772',//对应红#4eb772
					  borderColor: '#ea3f37',
					  borderColor0: '#4eb772'
				  }
			  },
			  barWidth:'60%'
		  },{
			  name: 'Volumn',
			  type: 'bar',
			  xAxisIndex: 1,
			  yAxisIndex: 1,
			  data: data.vols,
			  tooltip:{
				show:false
			  },
			  itemStyle: {
				  normal: {
					  color: function(params) {
						  var colorList;
						  if (data.datas[params.dataIndex][1]>=data.datas[params.dataIndex][0]) {
							  colorList = '#ea3f37';
						  } else {
							  colorList = '#4eb772';
						  }
						  return colorList;
					  },
				  }
				  
			  },
			  barWidth:'70%'
		  }
	  ]
	};
	// console.log(JSON.stringify(data));
	export default {
		data() {
			return {
				echarts: echarts
			}
		},
		onLoad() {

		},
		methods: {
			lineInit(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)

				lineChart.setOption(lineOption)
				return lineChart
			},
			loadKLineData() {
				uni.request({
					url: this.websiteUrl + 'finance/kline_list',
					method: 'POST',
					data: {
						"pageIndex": 1,
						"pageSize": 22,
						"type": 3
					},
					dataType: 'json', //服务器返回json格式数据
					header: {
						'Content-Type': 'application/json',
						'Token': this.token
					},
					success: res => {
						var res = res.data;
						if (res.code == 200) {
							console.log("获取k line data获取成功成功：" + JSON.stringify(res))


						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style lang="scss" scoped>
	page {
		min-height: 100%;
	}


	.container {
		height: 100%;

		.exchange-top {
			padding: 30upx 24upx;

			.top-price {
				font-size: 64upx;
				color: #DD3F38;
				padding-left: 20upx;
			}

			.top-items {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 66upx;
				padding-right: 80upx;

				.top-item {
					width: 45%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 30upx;
					color: #666;

					.darker-color {
						color: #333;
					}
				}
			}
		}

		.exchange-tab {

			.tab-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 72upx;

				.tab-item {
					width: 16.66%;
					text-align: center;
					height: 72upx;
					line-height: 72upx;
					display: block;
					font-size: 28upx;
					position: relative;
					border-right: 2upx solid #f9f9f9;
					opacity: .8;
				}

				.tab-active {
					color: #3588fc;
					font-weight: 400;
				}

				.tab-active:after {
					width: 80%;
					height: 2px;
					background: #3588FC;
					content: "";
					position: absolute;
					bottom: 0px;
					left: 50%;
					transform: translateX(-50%);
				}

				.down-mobile {
					image {
						width: 44upx;
					}

				}
			}

			.canvasView {
				width: 100%;
				height: 600upx;
			}

		}
	}
</style>
