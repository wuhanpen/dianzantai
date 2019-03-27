//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用点赞币系统！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isuser:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        //判断是否是注册用户
        isuser:app.globalData.isuser
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          //判断是否是注册用户
          isuser: app.globalData.isuser
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            //判断是否是注册用户
            isuser: app.globalData.isuser
          })
        }
      })
    }

    //判断是否是注册用户，如果是注册用户，则进入余额显示页面，如果不是，则进入注册页面
    if (app.globalData.isuser) wx.redirectTo({ url: '../balance' })
    else wx.redirectTo({ url: '../register/register' })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      //判断是否是注册用户
      isuser: app.globalData.isuser
    })
  }
})
