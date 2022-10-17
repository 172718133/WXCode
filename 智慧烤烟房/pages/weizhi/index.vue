<template>
	<view class="container">
		<view class="header-box">
			<view class="result-box">
				<view class="info list-item">
					<view class="badge"></view>
					<view class="ellipsis">{{address}}</view>
				</view>
				<!-- <view class="info">
					<view class="badge orange"></view>
					<view class="ellipsis"> {{current_long + "," + current_lat}}</view>
				</view> -->
			</view>
		</view>

		<map id="maps" class="tui-maps" @markertap="markersTapid"
		 :markers="markers" :longitude="longitude" :latitude="latitude" 
		 :scale="12" show-location
		 :style="{height:winHeight}" />
			
		<!-- <view>
			<image src="../../static/images/weizhi.png" style="width: 50rpx;height: 50rpx;"></image>
		</view> -->
	</view>
</template>

<script>
	const QQMapWX = require('@/libs/qqmap-wx-jssdk.min.js');
	export default {
		data() {
			return {
				address: "正在获取地址...",
				longitude: 113.160704,
				latitude: 23.043594,
				current_long: 113.160704,
				current_lat: 23.043594,
				key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP',
				mapCtx: null,
				location: false,
				qqmapsdk: null,
				markers:[],//标记点数组
				mapObj: null,
				winHeight: "100%" //窗口高度
			}
		},
		onLoad() {
			// _self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			const that = this;
			this.request({
				url:this.api.NEW_KYF_URL,
				data:{
					page:0,
					size:500
				}
			},'获取中...').then(res=>{
				res.content.forEach((ress,inde)=>{
					if(inde===0){
						that.latitude=ress.latitude;
						that.longitude=ress.longitude;
					}
					that.markers.push({
						latitude: ress.latitude,
						longitude: ress.longitude,
						id: inde+1,
						zid:ress.id,
						callout: {
						          content: ress.kyfname,
						          padding: 10,
						          display: 'ALWAYS',
						          textAlign: 'center'
						        },
						zname:ress.kyfname
					})
				})
				console.log(that.markers)
				
				that.qqmapsdk = new QQMapWX({
					key: that.key
				});
				
				that.currentLocation()
				// #ifdef MP-ALIPAY
				this.winHeight = "100vh"
				// #endif
			})
			// #ifdef APP-PLUS
			if (!this.mapCtx) {
				this.mapCtx = uni.createMapContext("maps");
			}
			this.mapObj = this.mapCtx.$getAppMap();
			
			// #endif
			
		},
		onReady() {
			
		},
		methods: {
			toPage(e){
				uni.navigateTo({
					url:'detail'
				})
			},
			regionchange(e) {
				// 地图发生变化的时候，获取中间点，也就是cover-image指定的位置
				let isEnd = e.type == 'end'
				// #ifdef APP-PLUS || MP-WEIXIN
				isEnd = e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')
				// #endif
				if (isEnd) {
					this.address = "正在获取地址...";
					if (!this.mapCtx) {
						this.mapCtx = uni.createMapContext("maps");
					}
					this.mapCtx.getCenterLocation({
						type: 'gcj02',
						success: (res) => {
							this.latitude = res.latitude;
							this.longitude = res.longitude;
							this.current_long = res.latitude;
							this.current_lat = res.longitude;
							// #ifdef H5
							this.getAddressH5(res.longitude, res.latitude);
							// #endif

							// #ifndef H5
							this.getAddress(res.longitude, res.latitude);
							// #endif
						}
					})
				}
			},
			getAddress: function(lng, lat) {
				//根据经纬度获取地址信息
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: lat,
						longitude: lng
					},
					success: (res) => {
						this.address = res.result.formatted_addresses.recommend
					},
					fail: (res) => {
						this.address = "获取位置信息失败"
					}
				})

			},
			markersTapid(e){
				const aid=this.markers[e.detail.markerId-1]
				uni.setStorageSync('storage_zid', aid);
				uni.switchTab({
					url: '/pages/xiangxi/index'
				})
			},
			//根据经纬度对象获取位置详细信息
			getAddressH5: function(lng, lat) {
				let url =
					`https://apis.map.qq.com/ws/geocoder/v1/?location=${lat + "," + lng}&key=${this.key}&get_poi=0&callbackName=QQmap&output=jsonp&coord_type=5`;
				this.tui.tuiJsonp(url, (res) => {
					if (res.status === 0) {
						this.address = res.result.formatted_addresses.recommend
					}
				}, "QQmap")
			},
			currentLocation() {
				//当前位置
				const that = this;
				uni.getLocation({
					// #ifdef APP-PLUS || MP-WEIXIN
					type: 'gcj02',
					// #endif
					success(res) {
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						// #ifdef H5
						that.getAddressH5(res.longitude, res.latitude)
						// #endif

						// #ifdef MP
						that.getAddress(res.longitude, res.latitude)
						// #endif
					},
					fail(res) {
						// #ifdef H5
						that.getAddressH5(that.longitude, that.latitude)
						// #endif

						// #ifdef MP
						that.getAddress(that.longitude, that.latitude)
						// #endif
					}
				})
			}
			
			
		}
	}
</script>

<style>
	page {
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.tui-maps {
		width: 100%;
		height: 100%;
	}

	.cover-image {
		height: 68rpx;
		width: 68rpx;
		position: fixed;
		/* #ifdef APP-PLUS */
		position: absolute;
		/* #endif */
		top: 50%;
		left: 50%;
		margin-top: -30rpx;
		margin-left: -30rpx;
	}

	.header-box {
		width: 100%;
		padding-top: 8rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
	}

	.result-box {
		width: 100%;
		padding: 12rpx 30rpx;
		box-sizing: border-box;
		color: #555;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #fff;
		border-radius: 24rpx;
	}

	.list-item::after {
		left: 0;
	}

	.badge {
		height: 16rpx;
		width: 16rpx;
		border-radius: 8rpx;
		background: #5677fc;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.orange {
		background: #ff7900 !important;
	}

	.info {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
	}

	.ellipsis {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.tui-current__img {
		position: fixed;
		/* #ifdef APP-PLUS */
		position: absolute;
		/* #endif */
		height: 80rpx;
		width: 80rpx;
		bottom: 80rpx;
		right: 60rpx;
		z-index: 9999;
	}
</style>
