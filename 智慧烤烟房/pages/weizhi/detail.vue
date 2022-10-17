<template>

	<view>

		<view
			style=" height: 400rpx; margin-top: 50rpx; justify-content: center;display: flex;justify-items: center; height: 80rpx;">
			<text style="font-size: 40rpx; text-align: center; width: 50%; height: 400rpx;margin-top: 30rpx;">
				XXX电烤房
			</text>

			<view style="text-align: center;width: 50%; margin-top: 40rpx;">
				<text>
					烤房编号：ONE-2
				</text>
				
			</view>
		</view>

		<view style="margin-left: 40rpx;margin-top: 50rpx;font-size: 30rpx;">
			<image src="../../static/images/yunxingzhong.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;"></image>
			运行中
			<image src="../../static/images/weiguanzhu.png" style="width: 30rpx;height: 30rpx;margin-left: 50rpx;"></image>
			未关注
		</view>
		<view style="margin-left: 40rpx;margin-top: 50rpx;font-size: 30rpx;">
			<image src="../../static/images/zuobiao.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;"></image>
			XXX省XXX市XXX镇XXX村XXX号
		</view>

		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">烤烟房实时数据</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			</view>
		</view>

		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">上下棚干湿球数据变化：近四个月</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix"
					@touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</view>
		</view>

	</view>
</template>

<script>
	import uCharts from '@/components/thorui/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	var canvaMix = null;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				ShujuArr: [{
						"name": "XX",
						"data": 107
					},
					{
						"name": "XX",
						"data": 100
					},
					{
						"name": "XX",
						"data": 200
					},
					{
						"name": "XX",
						"data": 300
					},
					{
						"name": "XX",
						"data": 200
					},
					{
						"name": "XX",
						"data": 100
					}
				],
				categories: ["8月", "9月", "10月", "11月", "12月"],
				series: [{
					"name": "曲面",
					"data": [70, 50, 85, 130, 64],
					"type": "area",
					"style": "curve"
				}, {
					"name": "上棚",
					"data": [40, 30, 55, 110, 24],
					"type": "column"
				}, {
					"name": "下棚",
					"data": [50, 20, 75, 60, 34],
					"type": "column"
				}, {
					"name": "曲线",
					"data": [70, 50, 85, 130, 64],
					"type": "line",
					"style": "curve",
					"color": "#1890ff"
				}, {
					"name": "折线",
					"data": [120, 140, 105, 170, 95],
					"type": "line",
					"color": "#2fc25b"
				}, {
					"name": "点",
					"data": [100, 80, 125, 150, 112],
					"type": "point",
					"color": "#f04864"
				}]
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
			this.getServerData2();
		},
		methods: {
			getServerData2() {
				var that = this;
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let Mix = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Mix.categories = that.categories;
						Mix.series = that.series;
						_self.showMix("canvasMix", Mix);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showMix(canvasId, chartData) {
				canvaMix = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						gridType: 'dash',
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			touchMix(e) {
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			getServerData() {
				var that = this;
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let Pie = {
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Pie.series = that.ShujuArr;
						_self.showPie("canvasPie", Pie);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'rose',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						rose: {
							type: 'area',
							minRadius: 50,
							activeOpacity: 0.5,
							offsetAngle: 0,
							labelWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		},
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		margin-top: 50rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
