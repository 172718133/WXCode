<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item  label-width="100" label="省:" :label-position="labelPosition"  prop="name">
				<u-input class="input" :border="border" placeholder="请输入省" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item  label-width="100" label="市:" :label-position="labelPosition"  prop="name">
				<u-input class="input" :border="border" placeholder="请输入市" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item  label-width="100" label="村:" :label-position="labelPosition"  prop="name">
				<u-input class="input" :border="border" placeholder="请输入村" v-model="model.name" type="text"></u-input>
			</u-form-item>
			
			
		</u-form>
		
		<view style="margin-top: 150rpx;">
			<u-button type="error"  @click="submit">提交</u-button>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			
				// 实体类
			model: {
				name: '',
				content:'',
				imgarr:'',
			},
			
			//验证输入
			rules: {
				name: [
					{
						required: true,
						message: '请输入标题',
						trigger: 'blur' ,
					}
				],
				content: [
					{
						required: true,
						message: '请输入内容',
						trigger: 'blur' ,
					}
				]
				},
				
			border: false,
			check: false,
			labelPosition: 'left',
			errorType: ['message'],
			ids:'',
			uid:''
		};
	},
	onLoad() {
		// let userinfo = uni.getStorageSync("userinfo");
		// if(userinfo){
		// 	this.uid = userinfo.id;
		// }else{
		// 	this.utils.NoIconToast('请先登录');
		// 	setTimeout(function() {
		// 	       uni.reLaunch({
		// 	       	url:'../mine/index'
		// 	       })
		// 	},2000);
		// }
	 
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
	
.wrap {
	padding: 30rpx;
}
.editor-wrapper {
	        padding: 10px;
	    }
   

    #editor {
        width: 100%;
		padding: 10rpx;
        height: 250px;
		background-color: #e6e6e6;
  
    }
	
	.input{
		background-color: #e6e6e6;
	}

</style>
