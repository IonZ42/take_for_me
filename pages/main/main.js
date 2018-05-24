// pages/main/main.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: app.data.point
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    wx.login({
      success: function (e) {
        console.log(e.code);      // 输出结果用于调试，后期要删除
        console.log(e.errMsg);  // 输出结果用于调试，后期要删除
        if (e.errMsg == "login:ok") {      //登录成功
          wx.request({
            url: "https://www.yangxiaobao.xin/take_for_me/login.php",
            method: "POST",
            data: {
              code: e.code,
              errMsg: e.errMsg
            },
            success: function (res) {
              console.log(res);
              app.data.user_id = res.data.user_id
            },
            fail: function () {
              console.log("This is not a successfull wx.request. ");
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }
          })
        }
      },
      fail: function () {
        console.log("Fail to invoke wx.login.");
      }
    })
  },

  load_myRewards() {
    wx: wx.navigateTo({
      url: 'myRewards/myRewards',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  load_postReward() {
    wx: wx.navigateTo({
      url: 'postReward/postReward',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  load_pullReward() {
    wx: wx.navigateTo({
      url: 'pullReward/pullReward',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    wx.setNavigationBarTitle({
      title: '顺便'
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