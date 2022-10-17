// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectGoodsNum:0,
    phoneNum:'18760364237'
  },
  handleFeedback(){
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  
  handleCall(){
    // 点击显示弹框
    wx.showActionSheet({
      // 显示两个按钮
      itemList: ['18760364237','呼叫'],
      success:function(res){
        // 点击tapIndex=1及第二个按钮，触发事件
        if(res.tapIndex==1){
          // 拨打电话
          wx.makePhoneCall({
            phoneNumber: '18760364237',
          })
        // 点击tapIndex=0及第一个按钮，触发事件
        }if(res.tapIndex==0){
          // 复制内容
          wx.setClipboardData({
            data: '18760364237',
            success(res){
              wx.getClipboardData({
                success(res){
                  // 弹框提示
                  wx.showToast({
                    title: '复制成功',
                    icon:'success'
                  })
                },
              })
            }
          })
        }
      }
    })
  },
  handleAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
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
    const userinfo = wx.getStorageSync('userinfo');
    const collect = wx.getStorageSync('collect')
    this.setData({userinfo,collectGoodsNum:collect.length})
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