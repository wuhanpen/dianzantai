
Page({

  /**
   * 页面的初始数据
   */
  data: {

    total:2.73,
    income:35,
    enpend:34,
    exchange:21

    
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
    
  },


  /**
   * 跳转至获取交易明细页面
   */
  getdetail:function()
  {
    wx.redirectTo({ url: '../detail/detail' });
  },


  /**
   * 跳转至主页页面
   */
  gobalance: function () {
    wx.redirectTo({ url: '../balance/balance' });
  },

  /**
   * 访问后台获取余额信息
   */
  getBalance:function(hasSelectBalance){
    wx.request({
      url: '',
      
    })
  }



})