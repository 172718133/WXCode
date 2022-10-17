<template>
	<view>

<view style="margin-left: 30rpx; margin-right: 30rpx;">
       <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
       	
       	<!-- 烤烟房选择 -->
       	<u-form-item :label-position="labelPosition" label="烤烟房选择:" prop="bankcar" labelWidth="250">
       		<u-input :border="border" type="select" :select-open="bankShow" v-model="kyf_name" placeholder="请选择烤烟房" @click="bankShow = true"></u-input>
       	</u-form-item>
       	
       </u-form>
	   </view>
	   <!-- 
		<view
			style=" height: 400rpx; margin-top: 50rpx; justify-content: center;display: flex;justify-items: center; height: 80rpx;">
			<text style="font-size: 40rpx;  width: 50%; height: 400rpx;margin-top: 30rpx;">
				XXX地区
			</text>

			<view style="  text-align: center; height: 40rpx; margin-left: 50rpx;margin-top: 10rpx;">
				<button @tap="toPage" style="font-size: 30rpx;">请选择</button>
			</view>
		</view>
 -->
		<view  style="margin-left: 40rpx;margin-top: 50rpx;font-size: 30rpx;">
			<!-- <image src="../../static/images/yunxingzhong.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;">
			</image>
			运行中 -->
			<view v-if="guanzhudu.status" @click="guanzhuduget">
				<image src="../../static/images/yiguanzhu.png" style="width: 30rpx;height: 30rpx;margin-left: 50rpx;">
				</image>
				已关注
			</view>
			<view v-else @click="guanzhuduget">
				<image src="../../static/images/weiguanzhu.png" style="width: 30rpx;height: 30rpx;margin-left: 50rpx;">
				</image>
				未关注
			</view>
			
		</view>
		<!-- <view style="margin-left: 40rpx;margin-top: 50rpx;font-size: 30rpx;">
			<image src="../../static/images/zuobiao.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;">
			</image>
			XXX省XXX市XXX镇XXX村XXX号
		</view> -->

		<view class="tui-product-category">
			<view class="tui-category-item" v-for="(item, index) in category" :key="index" :data-key="item.name"
				@tap="ToPage2" :data-name="item.name">
				<image :src="'../../static/images/' + item.img" class="tui-category-img" mode="scaleToFill"></image>
				<view class="tui-category-name">{{ item.name }}</view>
			</view>
		</view>


<view class="container">
		<view class="u-demo" style="margin-left: rpx; margin-right: rpx;margin-top: 20rpx;">
			<view class="u-demo-wrap">
				
				<view class="u-demo-area">
					<u-toast ref="uToast"></u-toast>
					<u-table :align="align" :borderColor="borderColor" style="text-align: center;">
						<u-tr class="u-tr">
							<u-td class="u-td u-tdwyxsj" style="background-color: #FF6161; color:#FFFFFF;">时间</u-td>
							<u-td class="u-td" style="background-color: #FF6161; color:#FFFFFF;">上棚温度</u-td>
							<u-td class="u-td" style="background-color: #FF6161; color:#FFFFFF;">上棚湿度</u-td>
							<u-td class="u-td" style="background-color: #FF6161; color:#FFFFFF;">下棚温度</u-td>
							<u-td class="u-td" style="background-color: #FF6161; color:#FFFFFF;">下棚湿度</u-td>
						</u-tr>
						<u-tr class="u-tr" v-for="(item,index) in shiwenList">
							<u-td class="u-td u-tdwyxsj">{{item.tetime}}</u-td>
							<u-td class="u-td">{{item.sgtemp}}</u-td>
							<u-td class="u-td">{{item.spstemp}}</u-td>
							<u-td class="u-td">{{item.sstemp}}</u-td>
							<u-td class="u-td">{{item.xpstemp}}</u-td>
						</u-tr>
						
					</u-table>
				</view>
			</view>
			
		</view>
		</view>

		<!-- <view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" style="text-align: center;margin-top: 50rpx;margin-bottom: 50rpx;">
				<view class="qiun-title-dot-light" style="font-size: 40rpx;">上下棚温湿度</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
		</view> -->


		<u-action-sheet :list="borrowtimeList" v-model="borrowShow" @click="actionBorrowCallback"></u-action-sheet>
		<u-action-sheet :list="bankcarList" v-model="bankShow" @click="bankCallback"></u-action-sheet>
		<u-action-sheet :list="purposeList" v-model="purposeShow" @click="purposeCallback"></u-action-sheet>
	</view>
</template>

<script>
	import uCharts from '@/components/thorui/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				current: 0,
				labelPosition: 'left',
				//烤烟房
				bankcarList: [
					{
						text: '烤烟房1'
					},
					{
						text: '烤烟房'
					}
				],
				bankcar:'',
				opacity: 1,
				kyf_name:'',
				bankcarList: [],
				borrowShow:false,
				bankShow:false,
				purposeShow:false,
				shiwenList:[],
				guanzhudu:{},
				category: [{
						img: 'shidu.png',
						name: '温湿度'
					},
					{
						img: 'yunxing.png',
						name: '运行记录'
					},
					{
						img: 'shebei.png',
						name: '设备台账'
					},
					{
						img: 'shish.png',
						name: '历史告警'
					},
					
					{
						img: 'fenxi.png',
						name: '用电分析'
					},
					{
						img: '',
						name: ''
					}
				],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				categories: ["2020-07", "2020-08", "2020-09", "2020-10", "2020-11"],
				series: [{
					"name": "上棚温度",
					"data": [70, 50, 85, 130, 64]
				}, {
					"name": "下棚温度",
					"data": [40, 30, 55, 110, 24]
				}]
			}
		},
		onLoad(options) {
			// _self = this;
			const zted=uni.getStorageSync('storage_zid');
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			const that = this;
			this.request({
				url:this.api.NEW_KYF_URL,
				data:{
					page:0,
					size:5
				}
			},'获取中...').then(res=>{
				that.bankcarList=res.content;
				that.kyf_name=res.content[0].kyfname;
				if(zted){
					that.forbank=zted.zid,
					that.kyf_name=zted.zname
				}else{
					that.forbank=res.content[0].id
				}
					that.yunxinKyanfang()
			})
			// this.getServerData();
		},
		methods: {
			yunxinKyanfang(){
				const that = this;
				this.request({
					url:this.api.NEW_swddyf_URL,
					data:{
						page:0,
						size:1000,
						id:that.forbank
					}
				},'获取中...').then(res=>{
					that.shiwenList=res.content;
				})
				that.guanzhudemo()
			},
			guanzhudemo(){
				const that=this;
				this.request({
					url:this.api.NEW_SFGUANZ_URL+'/'+this.forbank+'/'+uni.getStorageSync('token'),
					// data:{
					// 	dId:that.forbank,
					// 	uId:uni.getStorageSync('token')
					// }
				},'获取中...').then(res=>{
					that.guanzhudu=res.data
				})
			},
			guanzhuduget(){
				if(this.guanzhudu){
					this.request({
						url:this.api.NEW_SFGUANZ_URL,
						method:'PUT',
						data:this.guanzhudu
					},'获取中...').then(res=>{
						this.guanzhudemo()
					})
				}else{
					this.request({
						url:this.api.NEW_SFGUANZ_URL,
						method:'POST',
						data:{
							did:this.forbank,
							uid:uni.getStorageSync('token')
						}
					},'获取中...').then(res=>{
						this.guanzhudemo()
					})
				}
				
			},
			getServerData() {
				var that = this;
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let LineA = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = that.categories;
						LineA.series = that.series;
						_self.showLineA("canvasLineA", LineA);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			toPage(e) {
				uni.navigateTo({
					url: 'xuanzediqu'
				})
			},
			// 点击回调
			bankCallback(index) {
				uni.hideKeyboard();
				this.forbank=this.bankcarList[index].id
				this.kyf_name=this.bankcarList[index].kyfname;
				this.yunxinKyanfang()
				this.bankcar = this.bankcarList[index].text;
			},
			//跳转页面
			ToPage2(e) {
				var name = e.currentTarget.dataset.name;
				console.log(name);
				if (name == "温湿度") {
					uni.navigateTo({
						url: 'wenshidu'
					})
				} else if (name == "用电分析") {
					uni.navigateTo({
						url: 'yongdianfenxi'
					})
				} else if (name == "运行记录") {
					uni.navigateTo({
						url: 'yunxingjilu'
					})
				}else if (name == "历史告警") {
					uni.navigateTo({
						url: '../wode/lishigaojing'
					})
				}else if (name == "设备台账") {
					uni.navigateTo({
						url: 'shebeitaizhang'
					})
				}else if (name == "数据统计") {
					uni.navigateTo({
						url: 'shujutongji'
					})
				}
			},

		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
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
	.tui-product-category {
		padding: 80rpx 0rpx 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
		/* margin-bottom: 20rpx; */
	}

	.tui-category-item {
		width: 30%;
		height: 158rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-category-img {
		height: 150rpx;
		width: 80rpx;
		display: block;
	}

	.tui-category-name {
		padding-top: 20rpx;
		line-height: 24rpx;
	}


	.tui-mtop {
		margin-top: 80rpx;
		margin-left: -25rpx;
	}

	.u-td {
		height: 130rpx;
	}
</style>
