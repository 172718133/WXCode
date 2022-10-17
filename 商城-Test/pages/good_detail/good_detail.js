// pages/good_detail/good_detail.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    // 商品是否被收藏
    isCollect:false
  },
  // 商品对象
  GoodsUrl:{},
  /**
   * 生命周期函数--监听页面加载
   */

  onShow: function (){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options

    const {goodsid} = options;
    this.getGoodsDetail(goodsid);
  },
  // 获取商品详情数据
  async getGoodsDetail(goodsid){
    const res = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id:goodsid}})
    this.GoodsUrl = res.data.message

    // 1.获取缓存中的收藏商品的数组
    let collect = wx.getStorageSync('collect')||[];
    // 2.判断当前商品是否已被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsUrl.goods_id)

    this.setData({
      goodsObj:{
        pics:res.data.message.pics,
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
      },
      isCollect
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e){
    const urls = this.GoodsUrl.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击 加入购物车
  handleCartAdd(){
    //获取缓存中的购物车数据  数组格式
    let carts = wx.getStorageSync('cart')||[];
    //判断当前商品是否已经存在购物车
    let index = carts.findIndex(v=>v.goods_id===this.GoodsUrl.goods_id)
    if(index===-1){
      //不存在  第一次添加
      this.GoodsUrl.num = 1;
      this.GoodsUrl.checked = true;
      carts.push(this.GoodsUrl)
    }else{
      //已经添加过
      carts[index].num++
    }
    wx.setStorageSync('cart', carts);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })

  },
  // 点击 收藏商品
  handleCollect(){
    let isCollect = this.data.isCollect;
    // 1.获取缓存中的收藏的数组
    let collect = wx.getStorageSync('collect')||[];
    // 2.判断商品是否已收藏 
    let index = collect.findIndex(v=>v.goods_id===this.GoodsUrl.goods_id);
    // 3.当前的商品id  与  已收藏的数组的商品id  一致   （不一致则返回-1，表示未收藏） 
    //    当前索引index为-1，表示未收藏
    if(index!==-1){
      // index不等于-1，表示已收藏，再次点击删除该商品
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true,
      })
    }else{
      // 没有收藏过   直接添加
      collect.push(this.GoodsUrl);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:true,
      })
    }
    // 4.存入缓存中
    wx.setStorageSync('collect', collect)
    // 5.更新数据
    this.setData({
      isCollect
    })
  },
})