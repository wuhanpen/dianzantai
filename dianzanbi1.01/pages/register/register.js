
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    isreg:false,
    isver:false,
    mobile:'',
    checkcode:'code',
    tips:'欢迎使用点赞币系统！'
    
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
   * 
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //与node服务器连接后送数据过去

    //如果已经注册成功，则跳转至首页，否则，重新回到注册页面
    
    //if (this.data.isreg) wx.redirectTo({ url: '../balance/balance' });
    //else wx.redirectTo({ url: '../register/register' })
    console.log('传递手机号码为：', '../register2/register2?mobile='+this.data.mobile);
    wx.redirectTo({ url: '../register2/register2?mobile='+this.data.mobile });

  },

  

  /**
   * 获得输入的手机号码
   */
  getmobile:function(e)
  {
    this.setData({
      mobile: e.detail.value
    });
    console.log('获取的手机号码为：', e.detail.value);
    var mobile = this.data.mobile;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '') {
      this.setData({
        tips: '手机号码不能为空!'
      });
    }
    else if (mobile.length != 11) {
      this.setData({
        tips: '手机号码长度有误!'
      });
    }

    else
    {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(mobile)) {
        this.setData({
          tips: '手机号码有误!'
        });
      }
      else {
        this.setData({
          tips: '手机号码正确!'
        });
      }
    }

    

  },

  /**
   * 根据手机号向后台进行验证码发送
   */
  getcheckcode:function(e)
  {
    console.log('获取验证码');

    //发送手机号和openID
    
  }


})