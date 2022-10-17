<template>
	<view class="editor-wrapper">
		<editor id="editor" class="ql-container" @input="getText" @ready="onEditorReady" v-model="content" placeholder="请输入问题反馈内容..." showImgSize showImgToolbar showImgResize></editor>
		<view style="padding-top: 150rpx;">
			<u-button type="error"  ripple="true" ripple-bg-color="#ff9900" >提交反馈</u-button>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                content:'',
            }
        },
		onLoad() {
			// let userinfo = uni.getStorageSync("userinfo");
			// if(!userinfo){
			// 	this.utils.NoIconToast('请先登录');
			// 	setTimeout(function(){
			// 		uni.navigateBack();
			// 	},2000);	 
			// }
		},
		
        methods: {
			onEditorReady() {
			    var that = this;
			    uni.createSelectorQuery().select('#editor').context((res) => {
			    this.editorCtx = res.context;
			    this.editorCtx.setContents({//赋值
			          html:that.content
			         });
			      }).exec()
			  },
			  
			  getText(e){
                  this.content = e.detail.text;
			      console.log(e.detail.text);//纯文本内容
			  },
			// 提交反馈
     //       SubmitAction(){
			  //  if(this.content.length == 0){
				 //   this.utils.NoIconToast('请输入问题反馈内容')
			  //  }else{
				 //   let userinfo = uni.getStorageSync("userinfo");
				 //   this.request({
					//    url:this.api.FEEDBACK_URL,
					//    data:{
					// 	   "content":this.content,
					// 	   "uid":userinfo.id,
					//    }
				 //   }).then(res=>{
					//    console.log(res);
					//    if(res.code === 1){
					// 	   this.utils.TostMsg('提交成功');
					// 	   setTimeout(function() {
					// 	          uni.reLaunch({
					// 	          	url:'../mine/index'
					// 	          })
					// 	   },2000);
					//    }else{
					// 	   this.utils.NoIconToast('提交失败')
					//    }
				 //   })
			  //  }
		   // }
        }
    }
</script>

<style>

	
	 .editor-wrapper {
	        padding: 10px;
	    }
   

    #editor {
        width: 100%;
		padding: 10rpx;
        height: 250px;
        background-color: #ffffff;
    }


</style>