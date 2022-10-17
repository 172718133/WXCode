// pages/cart/cart.js

/*
  3 onShow 
    1 回到商品详情页面 第一次添加商品时  手动添加属性
      1 num = 1
      2 checked = true；
    2 获取缓存中的购物车数组
    3 把购物车数据填充到data中
  4 全选的实现 数据的展示
    1 onShow获取缓存中的购物车数组
    2 根据购物车的商品数据 所有商品都被选中 checked=true  全选被选中
  5 总价格 总数量
    1 需要的商品都被选中  才计算这些商品的
    2 获取购物车数组
    3 遍历
    4 判断商品是否被选中
    5 总价格 += 商品单价 * 商品数量
    6 总数量 += 商品数量
    7 计算后的总价格总数量返回到data中
  7 全选和反选
    1 获取data中的购物车数组和当前全选按钮的状态
    2 点击 allChecked反选
    allChecked = !allChecked;
    3 循环遍历购物车数组 让商品选中状态 跟随 allChecked改变而改变
    4 把购物车数组 和 allChecked  重新设置回data和缓存    this.setCart（）方法
  8 编辑商品
    1 获取传过来的operation和商品id
    2 获取购物车数据
    3 拿到点击的商品的索引
    const index = cart.findIndex(v=>v.goods_id===id);
    4 判断为0   即删除该商品
    5 商品数量-1
    6 重新复制购物车数据
  9 点击结算
    1 判断有没有选购商品
    2 判断有没有选择收货地址
    3 通过验证    跳转到 支付页面
*/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  handleChooseAddress(){
    wx.getSetting({
      success:(result)=>{
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1) => {
              wx.setStorageSync('address', result1)
            },
          })
        }else{
          wx.openSetting({
            success:(result2)=>{
              wx.chooseAddress({
                success: (result3) => {
                  wx.setStorageSync('address', result3)
                },
              })
            }
          })
        }
      }
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
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart')||[];
    this.setData({address});
    this.setCart(cart);
  },
  handleItemChange(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    
    this.setCart(cart);
   
  },
  // 设置购物车状态  同时 重新计算底部工具栏的数据 全选  总价格   数量
  setCart(cart){
    
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num * v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length!=0?allChecked:false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart)
  },
  // 全选和反选
  handleItemAllCheck(){
    // 获取data中的购物车数组和当前全选按钮的状态
    let {cart,allChecked} = this.data;
    // 点击 allChecked反选
    allChecked = !allChecked;
    // 循环遍历购物车数组 让商品选中状态 跟随 allChecked改变而改变
    cart.forEach(v=>v.checked=allChecked);
    // 把购物车数组 和 allChecked  重新设置回data和缓存    this.setCart（）方法
    this.setCart(cart);
  },
  // 编辑商品
  handleItemNumEdit(e){
    // 获取传过来的operation和商品id
    const {operation,id} = e.currentTarget.dataset;
    // 获取购物车数据
    let {cart} = this.data;
    // 拿到点击的商品的索引
    const index = cart.findIndex(v=>v.goods_id===id);

    // 判断为0   即删除该商品
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '提示',
        content: '您是否确定要删除？',
        success: (res)=> {
          if (res.confirm) {
            cart.splice(index,1)
            this.setCart(cart);
          } else if (res.cancel) {
          }
        }
      })
    }else{
      // 商品数量-1
      cart[index].num+=operation;
      // 重新复制购物车数据
      this.setCart(cart);
    }
      // cart[index].num+=operation;
      // this.setCart(cart);
  },
    // 结算
  handlePay(){
    // 1 判断有没有选购商品
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址哦',
        icon:"none"
      })
      return;
    }
    // 2 判断有没有选择收货地址
    if(totalNum===0){
      wx.showToast({
        title: '您还没有选择商品哦',
        icon:"none"
      })
      return;
    }
    // 3 通过验证    跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
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