<template>
	<view class="wrap">
		<!-- <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType"> -->

			<!-- 烤烟房选择 -->
			<!-- <u-form-item :label-position="labelPosition" label="烤烟房选择:" prop="bankcar" labelWidth="250">
				<u-input :border="border" type="select" :select-open="bankShow" v-model="kyf_name"
					placeholder="请选择烤烟房" @click="bankShow = true"></u-input>
			</u-form-item>
			
			
			<u-form-item :label-position="labelPosition" label="查询时间:" prop="borrowtime" labelWidth="250">
				<u-input :border="border" type="select" :select-open="borrowShow" v-model="model.borrowtime"
					placeholder="请选择开始时间" @click="borrowShow = true"></u-input>
			</u-form-item> -->
<!-- </u-form> -->
		<!-- 柱状图 -->
		<view class="qiun-columns" v-show="show">
			<view class="">
				烤烟房数量：{{kyfdsum}}
			</view>
			<view class="qiun-charts" style="margin-top: 100rpx;">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			</view>

			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" style="text-align: center;">
				<view>全部烤房年用电统计柱状图</view>
			</view>
		</view>

		<view class="qiun-columns" v-show="show">

			<view class="qiun-charts" style="margin-top: 100rpx;">
				<canvas canvas-id="canvasRing1" id="canvasRing1" class="charts" @touchstart="touchRing1"></canvas>
			</view>

			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" style="text-align: center;">
				<view>全部烤房年告警事件饼图</view>
			</view>
		</view>


		<u-action-sheet :list="borrowtimeList" v-model="borrowShow" @click="actionBorrowCallback"></u-action-sheet>
		<u-action-sheet :list="bankcarList" v-model="bankShow" @click="bankCallback"></u-action-sheet>
		<u-action-sheet :list="purposeList" v-model="purposeShow" @click="purposeCallback"></u-action-sheet>
	</view>
</template>

<script>
	import uCharts from '@/components/thorui/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;

	export default {
		data() {
			let that = this;
			return {
				show: true,
				showditu: false,
				// 顶部选项卡
				scrollInto: "",
				tabIndex: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				scrollLeft: 0,
				serverData: '',
				textarea: '',
				YearArr: [ '2018', '2019', '2020', '2021'],
				kyfdsum:'',
				ShujuArr11: [{
						"name": '年用电量',
						"data": [ 0, 0, 0, 0]
					}
				],

				ShujuArr71: [{
						"name": "尖电量",
						"data": 10
					},
					{
						"name": "谷电量",
						"data": 50
					},
					{
						"name": "峰电量",
						"data": 30
					},
					{
						"name": "平电量",
						"data": 80
					}
				],


				// 实体类
				frist: '',
				model: {
					borrowtime: '',
					price: '',
					bankcar: '',
					purpose: '',
					periods: 0,
					interest: '',
					totalperiods: '',
					principal: '',
					interest: '',
					nextmonth: this.utils.formatDate(new Date()),
					totalrepayment: ''
				},
				currentTab: 0,
				//验证输入
				
				border: false,
				check: false,
				selectStatus: 'close',
				//时间
				borrowtimeList: [{
						text: '2020-0-23 22:05:22'
					},
					{
						text: '2020-0-24 22:05:22'
					},
					{
						text: '2020-0-24 22:05:22'
					},
					{
						text: '12020-0-25 22:05:22'
					}
				],

				datadangqi:'',
				//烤烟房
				bankcarList: [],
				borrowShow: false,
				bankShow: false,
				purposeShow: false,
				labelPosition: 'left',
				errorType: ['message'],
				kyf_name:'',
				t:'44'

			};
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData2(this.ShujuArr11);
			this.getServerData4(this.ShujuArr71);
		},
		onReady() {
			// this.$refs.uForm.setRules(this.rules);
		},

		//刷新
		onShow() {
			this.kyfdataList()
		},
		methods: {
			kyfdataList(){
				const that =this;
				this.request({
					url:this.api.NEW_ydl_URL+'/list',
					data:{}
				},'获取中...').then(res=>{
					let atis=[];
					let btis=[];
					res.data.thisYear.forEach(e=>{
						if(e.electric){
							atis.push(e.electric)
						}else{
							atis.push(0)
						}
					})
					const adateswi=[
						{
							"name": '年用电量',
							"data": atis
						}
					]
					that.kyfdsum=res.data.dsum;
					that.ShujuArr71=res.data.pie;
					var s = 0;
					  res.data.pie.forEach(function(val) {
					    s += val.data;
					  });
					that.t=s;
					that.ShujuArr11=adateswi;
					console.log(adateswi)
					this.getServerData2(this.ShujuArr11);
					this.getServerData4(this.ShujuArr71);
				})
			},

			// 叠状图2
			getServerData2(shuzu) {

				var that = this;
				let ColumnStack1 = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				ColumnStack1.categories = that.YearArr;
				ColumnStack1.series = shuzu;
				_self.showColumn("canvasColumn",ColumnStack1);
			
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},


			// 环形图2
			getServerData4(shuzu) {
				// 外面的大数组
				_self.showRing("canvasRing1", shuzu);
			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					// 标题（这个不用了）
					title: {

					},
					// 中心统计字样
					subtitle: {
						name: '历史次数：'+this.t,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 0 * _self.pixelRatio,
					},
					// 中心圆的大小
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 30 * _self.pixelRatio,
							labelWidth: 15 //必填参数
						}
					},
					// 背景色
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					// 数据
					series: chartData,
					// 动画
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing1(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},

			
			// 点击多久回调
			actionBorrowCallback(index) {
				uni.hideKeyboard();
				this.kyfdataList(this.datadangqi,this.borrowtimeList[index].text)
				this.model.borrowtime = this.borrowtimeList[index].text;
			
			},

			// 点击回调
			bankCallback(index) {
				uni.hideKeyboard();
				this.kyfdataList(this.bankcarList[index].id,this.model.borrowtime)
				this.datadangqi=this.bankcarList[index].id;
				this.kyf_name=this.bankcarList[index].kyfname;
				this.model.bankcar = this.bankcarList[index].kyfname;
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}

	.tui-mtop {
		margin-top: 80rpx;
		margin-left: -25rpx;
	}

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
