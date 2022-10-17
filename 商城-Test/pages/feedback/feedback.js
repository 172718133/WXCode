// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    chooseImgs:[],
    // 文本域内容
    textValue:''
  },
  UpLoadImgs:[],
  // 获取点击事件 从子组件传递过来
  handletabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index} = e.detail;
    // 2 修改源数据
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3 赋值
    this.setData({
      tabs
    })
  },
  // 添加图片
  handleChooseImg(){
    wx.chooseImage({
      // 同时选中的个数
      count: 9,
      // 图片的格式
      sizeType:['original','compressed'],
      // 图片的来源  相册、相机
      sourceType:['album','camera'],
      // 成功
      success:(res)=>{
        // 再次选择  进行拼接
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
        })
      }
    })
  },
  // 点击图片
  handleRemove(e){
    // 获取被点击的索引
    const {index} = e.currentTarget.dataset;
    // 获取图片数组
    const {chooseImgs} = this.data;
    // 删除被点击的图片
    chooseImgs.splice(index,1)
    // 重新复制数组
    this.setData({
      chooseImgs
    })
  },
  // 获取输入框内容
  handletextVal(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  // 提交
  handleFormSubmit(){
    // 获取输入框内容及图片列表
    const {textValue,chooseImgs} = this.data;
    // 判断文字内容是否为空
    if(!textValue.trim()){
      // 不合法
      wx.showToast({
        title: '请输入内容',
        icon:'none',
        mask:true
      });
      return;
    }
    // 不为空就弹框提示
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    // 若图片列表不为空
    if(chooseImgs.length!=0){
      // 遍历图片数组
      chooseImgs.forEach((v,i)=>{
        console.log("aaa"),
        // 上传文件
        wx.uploadFile({
          // 上传文件的地址
          url: 'https://user.qzone.qq.com/2488174858',
          // 文件路径
          filePath: v,
          name: 'file',
          formData:{},
          success:(res)=>{
            console.log(res);
            let url = res.data;
            this.UpLoadImgs.push(url);
            // wx.showLoading({
            //   title: '提交中',
            //   mask: true
            // })
            // 图片上传完成
            if(i===chooseImgs.length-1){
              // wx.hideLoading();
              // this.setData({
              //   chooseImgs:[],
              //   textValue:''
              // });
              // wx.navigateBack({
              //   delta: 1,
              // })
  
              wx.hideLoading();
              wx.showToast({
                title: '提交成功',
                icon:'success',
                success:()=>{
                  setTimeout(()=>{
                    this.setData({
                      chooseImgs:[],
                      textValue:''
                    });
                    wx.navigateBack({
                      delta: 1,
                    })
                  },1500)
                }
              })
            }
          }
        })
      })
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon:'success',
        success:()=>{
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },1500)
        }
      })
    }
  }
})