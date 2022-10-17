<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			
			<!-- 烤烟房选择 -->
			<u-form-item :label-position="labelPosition" label="烤烟房选择:" prop="bankcar" labelWidth="250">
				<u-input :border="border" type="select" :select-open="bankShow" v-model="kyf_name" placeholder="请选择烤烟房" @click="bankShow = true"></u-input>
			</u-form-item>
			
			<u-form-item label="开始时间:" labelWidth="250">
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="startDate"  @change="actiwllback"></uni-datetime-picker>
				</view>
			</u-form-item>
			
			<!-- <u-form-item :label-position="labelPosition" label="烤烟次数:" prop="borrowtime" labelWidth="250">
				<u-input :border="border" type="select" :select-open="borrowShow" v-model="model.borrowtime" placeholder="请选择烤烟次数" @click="borrowShow = true"></u-input>
			</u-form-item> -->
			<!-- <u-form-item :label-position="labelPosition" label="地区选择:" prop="region" label-width="250">
							<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
						</u-form-item> -->
		</u-form>
		
		
		
		
		<view class="container">
			
			
			
		<view class="u-demo" style="margin-left: rpx; margin-right: rpx;margin-top: 20rpx;">
			<view class="u-demo-wrap">
				
				<view class="u-demo-area">
					<u-toast ref="uToast"></u-toast>
					<u-table :align="align" :borderColor="borderColor" style="text-align: center;">
						<u-tr class="u-tr">
							
							<u-td class="u-td" style="background-color: #ffa000;color: #FFFFFF;">故障原因</u-td>
						
						</u-tr>
					
						
						<u-tr class="u-tr" v-for="item in shiwenList">
							
							<u-td class="u-td">{{item.name}}</u-td>
							<u-td class="u-td">{{utils.formatDate(item.gmtDate)}}</u-td>
						</u-tr>
						
					</u-table>
				</view>
			</view>
			
		</view>
		</view>
		<u-action-sheet :list="borrowtimeList2" v-model="borrowShow2" @click="actionBorrowCallback2"></u-action-sheet>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-action-sheet :list="borrowtimeList" v-model="borrowShow" @click="actionBorrowCallback"></u-action-sheet>
		<u-action-sheet :list="bankcarList" v-model="bankShow" @click="bankCallback"></u-action-sheet>
        <u-action-sheet :list="purposeList" v-model="purposeShow" @click="purposeCallback"></u-action-sheet>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			//data 数据
			tabs: [{
				name: "故障事件"
			}, {
				name: "告警事件"
			}, {
				name: "通道状态"
			}, {
				name: "通讯事件"
			}],
			// 实体类
			frist: '',
			model: {
				borrowtime: '',
				borrowtime2: '',
				price:'',
				bankcar:'',
				purpose:'',
				periods:0,
				interest:'',
				totalperiods:'',
				principal:'',
				interest:'',
				region: '',
				nextmonth:this.utils.formatDate(new Date()),
				totalrepayment:''
			},
			currentTab: 0,
			//验证输入
			rules: {
				price: [
					{
						required: true,
						message: '请输入烤烟房',
						trigger: 'blur' ,
					}
				],
				borrowtime: [
					{
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}
				],
				borrowtime2: [
					{
						required: true,
						message: '请选择烤烟次数',
						trigger: 'change'
					}
				],
				bankcar:[{
					required: true,
					message: '请选择时间',
					trigger: 'change',
				}]
				
			},
			border: false,
			check: false,
			selectStatus: 'close',
			//时间
			borrowtimeList: [
				{
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
			pickerShow: false,
			
			//时间
			borrowtimeList2: [
				{
					text: '1'
				},
				{
					text: '2'
				},
				{
					text: '3'
				},
				{
					text: '4'
				},
				{
					text: '5'
				},
				{
					text: '6'
				}
			],
		
			
			//烤烟房
			bankcarList: [
				{
					text: '烤烟房1'
				},
				{
					text: '烤烟房'
				}
			],
			borrowShow:false,
			borrowShow2:false,
			bankShow:false,
			purposeShow:false,
			labelPosition: 'left',
			errorType: ['message'],
			
			kyf_name:'',
			forbank:'',
			shiwenList:[],
			startDate:''
		};
	},
	onLoad() {
     const that = this;
     this.request({
     	url:this.api.NEW_KYF_URL,
     	data:{
     		page:0,
     		size:1000
     	}
     },'获取中...').then(res=>{
     	that.bankcarList=res.content;
     	that.kyf_name=res.content[0].kyfname;
     		that.forbank=res.content[0].id
     		that.yunxinKyanfang()
     })
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	
	//刷新
	onShow() {
		// let that = this;
		// let userinfo = uni.getStorageSync("userinfo");
		// if(!userinfo){
		// 		 this.utils.NoIconToast('请先登录');
		// 		 setTimeout(function(){
		// 		 	that.utils.ReLaunchTo('../mine/index')
		// 		 },2000);
		// }
	},
	methods: {
		change(e) {
			this.currentTab = e.index
		},
		yunxinKyanfang(){
			const that = this;
			this.request({
				url:this.api.NEW_GAOJINLIST_URL,
				data:{
					page:0,
					size:1000,
					id:that.forbank,
					startDate:that.startDate
				}
			},'获取中...').then(res=>{
				that.shiwenList=res.content;
			})
			
		},
		
		// 点击多久回调
		actionBorrowCallback(index) {
			uni.hideKeyboard();
			this.yunxinKyanfang(this.forbank,index+1)
			this.model.borrowtime = this.borrowtimeList[index].text;
		   
			},
			
			// 点击多久回调
			actiwllback(index) {
				uni.hideKeyboard();
				this.yunxinKyanfang()
				// this.yunxinKyanfang();
			   
			},
			
			// 点击回调
			bankCallback(index) {
				uni.hideKeyboard();
				this.forbank=this.bankcarList[index].id;
				this.yunxinKyanfang()
				this.kyf_name = this.bankcarList[index].kyfname;
				this.model.bankcar = this.bankcarList[index].kyfname;
			},
	
	// 选择地址回调
			regionConfirm(e) {
				console.log(e);
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		
		
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.biao{
		display: flex;
		
		justify-items: center;
		justify-content:center ;
	}
	

.tui-mtop {
		margin-top: 80rpx;
		margin-left: -25rpx;
	}
	
	.u-td{
		height: 130rpx;
	}
	
</style>
