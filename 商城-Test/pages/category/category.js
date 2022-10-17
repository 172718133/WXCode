// pages/category/category.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rightList:[],
    currentIndex:0,
    scrolltop:''
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCatesList();
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCatesList();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCatesList();
      }else{
        this.Cates = Cates.data
        var leftList = this.Cates.map(v => v.cat_name);
        var rightList = this.Cates[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }
  },
  getCatesList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(result=>{
      this.Cates = result.data.message;
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      var leftList = this.Cates.map(v => v.cat_name);
      var rightList = this.Cates[0].children
      this.setData({
        leftList,
        rightList
      })
    })
  },
  handleItemTap(e){
    let {index} = e.currentTarget.dataset
    let rightList = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightList,
      scrolltop:0
    })
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