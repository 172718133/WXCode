// pages/search/search.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchGoods:[],
    // 取消按钮是否显示
    isFocus:true,
    // 输入框的值
    inpValue:""
  },
  // 定义定时器id，用于判断发送请求的时间
  TimeId:-1,
  // 检测输入框的值
  handleInput(e){
    // 1.获取输入框的值
    const {value} = e.detail;
    // 2.检测合法性
    if(!value.trim()&&this.inpValue===''){
      // 不合法
        // 当输入框的值重新变为空时，重置数组并隐藏取消按钮
      this.setData({
        searchGoods:[]
      });
      return;
    }
    // 3.根据输入值发送请求
      // 防抖实现
    clearTimeout(this.TimeId);  //清除定时器时间
    this.TimeId = setTimeout(()=>{
      this.qsearch(value);  //重新设置定时器，1s后再发送请求
    },500)
  },
  async qsearch(query){
    const res = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',data:{query}});
    // console.log(res.data.message);
    this.setData({
      searchGoods:res.data.message
    })
  },
  handleCancel(){
    this.setData({
      searchGoods:[],
      inpValue:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})