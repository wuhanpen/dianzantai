
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    password:'',
    password2:'',
    tips:'请设置您的密码！'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let mobile = options.mobile;//就用这样的方式即可把路径参数的值获取到了，非常方便
    console.log(options)
    console.log(options.openid)
    console.log(options.mobile)
    this.setData({
      mobile: mobile,
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
    
  },

  /**
   * 
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //与node服务器连接后送数据过去

    //如果已经注册成功，则跳转至首页，否则，重新回到注册页面
    
    //if (this.data.isreg) wx.redirectTo({ url: '../balance/balance' });
    //else wx.redirectTo({ url: '../register/register' })
    wx.redirectTo({ url: '../balance/balance' });

  },

  /**
   * 获得输入密码信息
   */
  checkpw: function (e) {
    this.setData({
      password: e.detail.value
    });
    var password = this.data.password;
    if (password.length < 6) {
      this.setData({
        tips: '密码号码长度有误!'
      });
    }
    else {
      this.setData({
        tips: ''
      });
    }


  },

  /**
   * 获得输入密码信息
   */
  checkpw2: function (e) {
    this.setData({
      password2: e.detail.value
    });
    var password2 = this.data.password2;
    if (password2 != this.data.password) {
      this.setData({
        tips: '两次输入密码信息不一样!'
      });
    }
    else {
      this.setData({
        tips: ''
      });
    }


  }



})