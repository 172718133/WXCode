<template>
	<view>
		
		<!--header-->
		<view class="tui-mybg-box">
			<image src="../../static/images/mine_bj.png" class="tui-my-bg" mode="widthFix"></image>
			<view class="tui-header-center">
				<image class="tui-avatar" src="../../static/images/header.png" v-show="utype"></image>
				<view class="tui-info" v-if="utype">
					<view class="tui-nickname">
						<text>{{utype}}</text>
					</view>
					<!-- <view class="tui-explain">{{signature}}</view> -->
				</view>
				<view class="tui-login" v-if="!utype"> 
					<navigator url="/pages/wode/login" hover-class="opcity" :hover-stay-time="150" class="user">
						<text class="user-info-mobile">登录</text>
					</navigator>
				
				</view>
			</view>
			
		</view>
	
	
	    <!--列表-->
		<view style="margin-top: -70rpx;">
	    		
	    				
	    				<tui-list-cell :arrow="true">
	    					<view class="tui-item-box" @tap="toPage(1)">
	    						<tui-icon name="like-fill" :size="24" color="#1296db"></tui-icon>
	    						<view class="tui-list-cell_name">我的关注</view>
	    					</view>
	    				</tui-list-cell>
	    				<tui-list-cell :arrow="true">
	    					<view class="tui-item-box" @tap="toPage(2)">
	    						<tui-icon name="service-fill" :size="24" color="#5677fc"></tui-icon>
	    						<view class="tui-list-cell_name">问题反馈</view>
	    					</view>
	    				</tui-list-cell>
	    				<tui-list-cell :arrow="true">
	    					<view class="tui-item-box" @tap="toPage(3)">
	    						<tui-icon name="about" :size="24" color="#f50057"></tui-icon>
	    						<view class="tui-list-cell_name">关于我们</view>
	    					</view>
	    				</tui-list-cell>
						<!-- <tui-list-cell :arrow="true">
							<view class="tui-item-box" @tap="toPage(4)">
								<tui-icon name="time-fill" :size="26" color="#5677fc"></tui-icon>
								<view class="tui-list-cell_name">历史告警</view>
							</view>
						</tui-list-cell> -->
	    			</tui-list-view>
</view>
	    
	</view>
</template>

<script>
	export default {
		onLoad() {
		},
		data() {
			return {
				imgurl:'/static/images/header.png',
				uname:'',
				signature:'你还没有个性签名...',
				isLogin: false,
				utype:''
			};
		},
		methods: {
			//跳转页面
			toPage(index){
				switch(index){
					case 1 : 
					// this.utils.NavigateTo('../personalcenter/zhanghao');
					break;
					case 2 : this.utils.NavigateTo('../wode/suggest');
					break;
					case 3 : this.utils.NavigateTo('../wode/aboutus');
					break;
					
					
				}
			},
	
			//授权登录
			login() {
				uni.getUserInfo({
					lang:"zh_CN",
					success: (res) => {
						console.log(res);
						this.uname = res.userInfo.nickName;//显示用户名
						this.imgurl = res.userInfo.avatarUrl;//显示登录头像
						var sex = res.userInfo.gender;
						
					},
					fail: (res) => {
						this.utils.NoIconToast("未授权")
					}
				})
				this.isLogin = true
			}
		},
		//进入加载
		onLoad() {
			// let res = uni.getStorageSync("userinfo");
			// if(res){
			// 	this.setUserInfo(res.data[0].uname,res.data[0].uimage,res.data[0].signature,res);
			// 	this.isLogin = true;
			// }
		},
		
		//返回后回刷新
		onShow() {
			const that = this;
			this.request({
				url:this.api.NEW_REGISTER_URL+'/'+uni.getStorageSync('token'),
				data:{}
			},'获取中...').then(res=>{
				console.log(res.data.phone)
				that.utype=res.data.phone
			})
		}
	};
</script>

<style>
	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	


	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #f74d54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #f74d54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #f74d54;
	}

/* 1 */
	.tui-mybg-box {
		width: 100%;
		height: 464rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

/* 1 */
	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

/* 2 */
	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
		border-radius: 100%;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;
	}

	.tui-login {
		width: 60%;
		padding-left: 30rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}



	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}



</style>
