// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"代付款",
        isActive:false
      },
      {
        id:2,
        value:"代發貨",
        isActive:false
      },
      {
        id:3,
        value:"退貨退款",
        isActive:false
      }
    ],
    type:'',
    orders:{}
  },
  // 获取点击事件 从子组件传递过来
  handletabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index} = e.detail;
    this.changeTitleByIndex(index);
  },
  changeTitleByIndex(index){
    // 2 修改源数据
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3 赋值
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orders = wx.getStorageSync('orders');
    this.setData({
      orders
    })
    console.log(orders.data)
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
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    this.changeTitleByIndex(type-1)
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