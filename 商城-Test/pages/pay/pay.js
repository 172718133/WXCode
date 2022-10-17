Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
    totalPrice:0,
    totalNum:0
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
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked)

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPrice+=v.num * v.goods_price;
        totalNum+=v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  handleOrderPay(){
    let newCart = wx.getStorageSync('cart');
    let orders = wx.getStorageSync('cart')
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'提示',
      content:'是否确定支付？',
      success: (res)=> {
        if (res.confirm) {
          newCart = newCart.filter(v=>!v.checked);
          orders = orders.filter(v=>v.checked);
          wx.setStorageSync('orders',{time:Date.now(),data:orders})
          
          wx.setStorageSync('cart',newCart);
          wx.showToast({
            title: '支付成功',
            success:()=>{
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/user/user',
                })
              }, 1500);
            }
          })
        } else if (res.cancel) {
        }
      }
    })
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