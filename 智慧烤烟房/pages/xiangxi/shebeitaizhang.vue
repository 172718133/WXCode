<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			
			<!-- 烤烟房选择 -->
			<u-form-item :label-position="labelPosition" label="烤烟房选择:" prop="bankcar" labelWidth="250">
				<u-input :border="border" type="select" :select-open="bankShow" v-model="kyf_name" placeholder="请选择烤烟房" @click="bankShow = true"></u-input>
			</u-form-item>
			
			</u-form>
			
			<view class="">
				<u-form-item  label-width="200" :label-position="labelPosition" label="所属产站:" prop="name">
					<u-input :border="border" placeholder="请输入所属产站" v-model="shiwenList.kyfgk" type="text" disabled></u-input>
				</u-form-item>
				<u-form-item  label-width="200" :label-position="labelPosition" label="铭牌型号:" prop="content">
					<u-input :border="border" placeholder="请输入铭牌型号" v-model="shiwenList.chucnum" type="text" disabled></u-input>
				</u-form-item>
				<u-form-item  label-width="200" :label-position="labelPosition" label="出厂日期:" prop="kucun">
					<u-input :border="border" placeholder="请输入出厂日期" v-model="shiwenList.chucdate" type="text" disabled></u-input>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="运行状态:" prop="price" label-width="200">
					<span v-if="shiwenList.deleted==0">关闭运行</span>
					<span v-else>启用</span>
					<!-- <u-input :border="border" placeholder="请输入运行状态" v-model="shiwenList.price" type="digit"></u-input> -->
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="额定容量(KW):" prop="price" label-width="200">
					<u-input :border="border" placeholder="请输入额定容量(KW)" v-model="shiwenList.kyfrl" type="digit" disabled></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="设备编号:" prop="price" label-width="200">
					<u-input :border="border" placeholder="请输入设备编号" v-model="shiwenList.norms" type="digit" disabled></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="设备名称:" prop="price" label-width="200">
					<u-input :border="border" placeholder="请输入设备名称" v-model="shiwenList.kyfname" type="digit" disabled></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="出厂编号:" prop="price" label-width="200">
					<u-input :border="border" placeholder="请输入出厂编号" v-model="shiwenList.chucnum" type="digit" disabled></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="维修次数:" prop="price" label-width="200">
					<u-input :border="border" placeholder="请输入维修次数" v-model="shiwenList.wcount" type="digit" disabled></u-input>
				</u-form-item>
				<!-- <u-form-item :label-position="labelPosition" label="额定频率(Hz):" label-width="200">
					<u-input :border="border" placeholder="请输入额定频率(Hz)" v-model="shiwenList.price" type="digit" disabled></u-input>
				</u-form-item> -->
				<u-form-item :label-position="labelPosition" label="额定电流(A):" label-width="200">
					<u-input :border="border" placeholder="请输入额定电流(A)" v-model="shiwenList.kyfele" type="digit" disabled></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="额定电压:" label-width="200">
					<u-input :border="border" placeholder="请输入额定电压" v-model="shiwenList.kyfya" type="digit" disabled></u-input>
				</u-form-item>
			</view>
			
			
		
		
		<!-- <view class="" style="margin-top: 100rpx; margin-bottom: 150rpx;">
			<u-button type="error"  @click="submit">查询</u-button>
		</view> -->
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="xiujiuList" v-model="xiujiuShow" @confirm="xiujiuConfirm"></u-select>
		
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
			// 上传图片
			action: this.api.UPLOAD_IMAGE_URL,
			filesArr: [],
				// 实体类
			model: {
				name: '',
				region: '',
				phone: '',
				price:'',
				detail:'',
				content:'',
				imgarr:'',
				kucun:'',
				shop_type:'',
				xinjiu:''
			},
			// 商品类型
			selectList: [],
			//新旧程度
			xiujiuList:[
				{
					value: '全新',
					label: '全新'
				},
				{
					value: '9成新',
					label: '9成新'
				},
				{
					value: '8成新',
					label: '8成新'
				},
				{
					value: '7成新',
					label: '7成新'
				},
				{
					value: '6成新',
					label: '6成新'
				},
				{
					value: '5成新',
					label: '5成新'
				}
			],
			//验证输入
			rules: {
				name: [
					{
						required: true,
						message: '请输入所属产站',
						trigger: 'blur' ,
					}
				],
				content: [
					{
						required: true,
						message: '请输入内容',
						trigger: 'blur' ,
					}
				],
				price: [
					{
						required: true,
						message: '请输入价格',
						trigger: 'blur' ,
					}
				],
				kucun: [
					{
						required: true,
						message: '请输入库存数量',
						trigger: 'blur' ,
					}
				],
				detail: [
					{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur' ,
					}
				],
				region: [
					{
						required: true,
						message: '请选择发货地址',
						trigger: 'change',
					}
				],
				shop_type:[{
					required: true,
					message: '请选择商品类型',
					trigger: 'change',
				}],
				xinjiu:[{
					required: true,
					message: '请选择新旧程度',
					trigger: 'change',
				}],
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					}
				]
			},
			border: false,
			check: false,
			selectStatus: 'close',
			actionSheetShow: false,
			pickerShow: false,
			selectShow: false,
			xiujiuShow:false,
			timeShow: false,
			labelPosition: 'left',
			errorType: ['message'],
			ids:'',
			uid:'',
			borrowShow:false,
			bankShow:false,
			purposeShow:false,
			kyf_name:'',
			forbank:'',
			shiwenList:{},
			bankcarList:[]
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
				url:this.api.NEW_CIDT_URL+that.forbank,
			},'获取中...').then(res=>{
				that.shiwenList=res.data;
			})
			
		},
		// 点击回调
		bankCallback(index) {
			uni.hideKeyboard();
			this.forbank=this.bankcarList[index].id;
			this.kyf_name = this.bankcarList[index].kyfname;
			this.yunxinKyanfang();
		},
		//获取分类
		getType(){
			this.request({
				url:this.api.GET_TYPEINFO_URL
			}).then(res=>{
				console.log(res);
				for (var i = 0; i < res.data.length; i++) {
					this.selectList.push({value:res.data[i].tname,label:res.data[i].tname,id:res.data[i].id});
				}
				console.log(this.selectList);
			})
		},
		//发布
		submit() {
			let that = this;
			that.$refs.uForm.validate(valid => {
				if (valid) {
					// 1.先上传图片
					let files = [];
					// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
					files = that.$refs.uUpload.lists.filter(val => {
						return val.progress == 100;
					});
					console.log(files);
					// 如果您不需要进行太多的处理，直接如下即可
					for (var i = 0; i < files.length; i++) {
						that.model.imgarr += files[i].response.data.imageurl + ";";
					}
					console.log(that.model.imgarr);
					if(that.model.imgarr === ''){
						that.utils.NoIconToast('请上传至少一张图片');
						return;
					}
					that.utils.ToastLoading("发布中...")
					// 2.发布
				    that.request({
						url:that.api.PUBLISH_URL,
						data:{
							"title":that.model.name,
							"content":that.model.content,
							"ptime":that.utils.formatTime(new Date()),
							"count":that.model.kucun,
							"simage":that.model.imgarr,
							"address":that.model.region + that.model.detail,
							"price":that.model.price,
							"phone":that.model.phone,
							"uid":that.uid,
							"typeid":that.ids,
							"xinjiu":that.model.xinjiu
						}
					},"发布中...").then(res=>{
						uni.hideLoading();
						if(res.code === 1){
							that.utils.NoIconToast('发布成功');
							setTimeout(function(){
								that.utils.ReLaunchTo('../publish/index')
							},1000);
							
						}else{
							that.utils.NoIconToast('发布失败')
						}
						console.log(res.status);
					})
				}
			});
		},
		
		// 选择地址回调
		regionConfirm(e) {
			console.log(e);
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},

		// 选择商品类型回调
		selectConfirm(e) {
			console.log(e);
			this.model.shop_type = e[0].label;
			for (var i = 0; i < this.selectList.length; i++) {
				if(this.selectList[i].label === e[0].label){
					this.ids = this.selectList[i].id;
				}
			}
		},
		
		// 选择新旧程度回调
		xiujiuConfirm(e) {
			this.model.xinjiu = e[0].label;
		}
		
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}
</style>
