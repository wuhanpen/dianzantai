

Page({
  data: {
    currentPage: 1,
    transaction: [], // 存放所有的交易信息
    sendtrans:[],    //存放支出交易信息
    receivetrans:[], //存放收入交易信息
    userName: getApp().globalData.userName,//获取自身姓名
    filter: 0,  //交易筛选，0：显示所有，1：显示发送，2：显示接受

  },
  onLoad: function () {
    var that = this

    // 加载页面初始化时需要的数据
    that.loadInitData();
  },

  /**
   * 滚动到某个view
   */
  scrollToView: function (e) {
    var that = this
    const dataset = e.currentTarget.dataset;
    var mark = dataset.mark
    console.log("scroll to :" + mark);
    that.setData({
      toView: mark
    })
  },


  /**
   * 加载初始数据,有时候为了提升页面打开速度，会将所有数据合并到一个接口中返回，然后列表中的第二页数据开始，使用其它接口返回，即分页获取数据时，仅获取下一页的数据。（这里仅做示例，因为每一页数据都取一样的。在实际开发中可以考虑这样分开。）
   */
  loadInitData: function () {
    var that = this
    var currentPage = 0;
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    /*
    wx.request({
      //url: 'https://raw.githubusercontent.com/lanfeng1993/LoadDataDemo/master/data/data.json',
      url:'127.0.0.1',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data; // 接口相应的json数据
        var transaction = data.data; // 接口中的data对应了一个数组，这里取名为 transaction
        console.log(transaction);
        that.setData({
          transaction: transaction,
          currentPage: currentPage
        })
      }
    })
    */
    //如果网络请求成功，则加载数据

    wx.hideLoading();
    //var data = res.data; // 接口相应的json数据
    //var transaction = data.data; // 接口中的data对应了一个数组，这里取名为 transaction
    //var transaction = [{ title: 'title1', author: 'au1' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }, { title: 't2', author: 'a2' }];

    var transaction = [
      { sendID: '5101', sendName: '彭军', receiveID: '5201', receiveName: '陈佳阳', time: '2018-03-19 11:39:47', number: '2', remark: '数据网设计辅助' },        { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务fsf网络调研' }, 
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务fdsff网络调研' }, 
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务ss网络调研' }, 
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网f络调研' }, 
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47',number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      ];

    var sendtrans = [
      { sendID: '5101', sendName: '彭军', receiveID: '5201', receiveName: '陈佳阳', time: '2018-03-19 11:39:47', number: '2', remark: '数据网设计辅助' },  
    ];
    var receivetrans = [
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务fsf网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务fdsff网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务ss网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网f络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
      { sendID: '5201', sendName: '陈佳阳', receiveID: '5101', receiveName: '彭军', time: '2018-03-19 11:39:47', number: '1', remark: '水务网络调研' },
    ]; 
    console.log('已经初始化数组');
    console.log(transaction);
    that.setData({
      transaction: transaction,
      sendtrans: sendtrans,
      receivetrans: receivetrans
    })

  },

  /**
   * 加载下一页数据
   */
  loadMoreData: function () {
    var that = this
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      //url: 'https://raw.githubusercontent.com/lanfeng1993/LoadDataDemo/master/data/data.json',
      url:'127.0.0.1',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data; // 接口相应的json数据
        var transaction = data.data; // 接口中的data对应了一个数组，这里取名为 transaction

        // 将新一页的数据添加到原数据后面
        var originTransaction = that.data.transaction;
        var newTransaction = originTransaction.concat(transaction);
        console.log(newTransaction);
        that.setData({
          transaction: newTransaction,
          currentPage: currentPage
        })
      }
    })
  },

  /**
     * 跳转至余额页面
     */
  gobalance: function () {
    wx.redirectTo({ url: '../balance/balance' });
  },

  /**
     * 点击全部菜单
     */
  setfilter0:function(){
    console.log('修改状态为0');
    if(this.data.filter!=0)
    {
      this.setData({
        filter: 0
      })
    }
    
  },

  /**
   * 点击收入菜单
   */
  setfilter1: function () {
    console.log('修改状态为1');
    if (this.data.filter != 1) {
      this.setData({
        filter: 1
      })
    }
  },

  /**
   * 点击支出菜单
   */
  setfilter2: function () {
    console.log('修改状态为2');
    if (this.data.filter != 2) {
      this.setData({
        filter: 2
      })
    }
  },



})
