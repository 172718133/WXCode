<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			
			<!-- 烤烟房选择 -->
			<u-form-item :label-position="labelPosition" label="烤烟房选择:" prop="bankcar" labelWidth="250">
				<u-input :border="border" type="select" :select-open="bankShow" v-model="kyf_name" placeholder="请选择烤烟房" @click="bankShow = true"></u-input>
			</u-form-item>
			
			<u-form-item label="开始时间:" labelWidth="250">
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="startDate"></uni-datetime-picker>
				</view>
			</u-form-item>
			
			<u-form-item label="结束时间:" labelWidth="250">
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="endData" 
					:start="startDate" @change="actionBorrowCallback"></uni-datetime-picker>
				</view>
			</u-form-item>
			
			
			
		</u-form>
		
		<!-- <view class="biao">
			<view style="width: 50%;margin-right: 20rpx; "><tui-button  disabled @click="detail">读取</tui-button></view>
			<view style="width: 50%;"><tui-button disabled  class="chang" @click="detail">下发</tui-button></view>
		</view> -->
		
		
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
			startDate:'',
			endData:'',
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
				price:'',
				bankcar:'',
				purpose:'',
				periods:0,
				interest:'',
				totalperiods:'',
				principal:'',
				interest:'',
				nextmonth:this.utils.formatDate(new Date()),
				totalrepayment:''
			},
			currentTab: 0,
			//验证输入
			
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
			bankShow:false,
			purposeShow:false,
			labelPosition: 'left',
			errorType: ['message'],
			forbank:'',
			kyf_name:'',
			shiwenList:[]
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
	

	methods: {
		yunxinKyanfang(){
			const that = this;
			this.request({
				url:this.api.NEW_swddyf_URL,
				data:{
					page:0,
					size:1000,
					id:that.forbank,
					endDate:that.endData,
					startDate:that.startDate
				}
			},'获取中...').then(res=>{
				that.shiwenList=res.content;
			})
		},
		change(e) {
			this.currentTab = e.index
		},
		
		
		// 点击多久回调
		actionBorrowCallback(index) {
			uni.hideKeyboard();
			if(this.startDate && this.endData){
				this.yunxinKyanfang();
			}
			// this.yunxinKyanfang();
		   
		},
		
		// 点击回调
		bankCallback(index) {
			uni.hideKeyboard();
			this.forbank=this.bankcarList[index].id;
			this.kyf_name = this.bankcarList[index].kyfname;
			const astartTime= new Date(Date.parse(this.startDate));
			const aendTime=new Date(Date.parse(this.endData));
			//进行比较
			if(astartTime>aendTime){
				this.utils.NoIconToast('开始时间不能大于结束时间')
				return false;
			}
			this.yunxinKyanfang();
			this.model.bankcar = this.bankcarList[index].kyfname;
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
