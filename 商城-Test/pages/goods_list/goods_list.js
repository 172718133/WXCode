// pages/goods_list/goods_list.js
/*
  1 用户上滑页面 滚动条触底  开始加载下一页数据
    1 添加滚动条触底事件
    2 判断是否有下一页
      1 获取到总页数 当前只有总条数（total）
        总页数 = Math.ceil（总条数 / 页容量（pagesize））
      2 获取当前页码（pagenum）
      3 判断是否有下一页 当前页码是否大于等于 总页数
        若是 表示没有下一页数据
    3 假如没有下一页数据  弹框提示
    4 假如有下一页数据 加载下一页数据
      1 当前页码++    页码加一
      2 重新发送请求
      3 数据请求回来 对data中的数据 进行 拼接  而不是全部替换
        直接setData会导致数据只有新加载的数据  而没有前十条数据
  2 下拉刷新页面
    1 触发下拉页面刷新事件，需在json文件中开启配置项
      再找到触发下拉刷新的事件
    2 重置数组的数据   之前加载下一页拼接数组，数据会重复
    3 重置页码为1  刷新后显示第一页  之前加载下一页页码++
    4 重新发送请求
    5 数据请求成功后 便关闭等待效果
*/


import { request } from "../../request/index.js";
import regeneratorRuntime, { async } from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodList:[]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid||''; 
    this.QueryParams.query = options.query||''; 
    this.getgoodsList();
  },
  
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
  // 获取数据
  async getgoodsList(){
    const res =await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',data:this.QueryParams})
    console.log(res)
    // 获取总条数
    const total = res.data.message.total
    // 获取总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    console.log(this.totalPages)
    this.setData({
      goodList:[...this.data.goodList,...res.data.message.goods]
    })

    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页了哦~',
        icon: 'none'
      })
    }else{
      this.QueryParams.pagenum++,
      this.getgoodsList();
    }
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数组数据
    this.setData({
      goodList:[]
    });
    // 重置页码为1
    this.QueryParams.pagenum=1;
    // 重新请求数据
    this.getgoodsList();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})