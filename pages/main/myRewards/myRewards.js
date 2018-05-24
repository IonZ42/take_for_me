const app = getApp();

Page({
  data: {
    listInd: '',
    infos: [],
    rewards:[]
  },
  onLoad: function (options) {
    this.getinfos()
    this.getrewards()
  },

  onShow(params) {
    this.getinfos()
    this.getrewards()
    //在这一步预填充表单
    this.setData({
      location: wx.getStorageSync('locationFilter'),
      building: wx.getStorageSync('buildingFilter'),
      //以下由socket加载
      hour: wx.getStorageSync('hour'),
      minute: wx.getStorageSync('minute'),
      bounty: wx.getStorageSync('bounty'),
      detailAddress: wx.getStorageSync('detailAddress'),
    })
  },

  getinfos: function () {
    let infos = wx.getStorageSync('infos')
    this.setData({
      infos: infos
    })
  },

  getrewards: function () {
    let rewards = wx.getStorageSync('rewards')
    this.setData({
      rewards: rewards
    })
  },

  load_myPostedRewards: function (e) {
    var dataset = e.currentTarget.dataset;
    var index = dataset.index;
    this.setData({ listInd: index })
    wx: wx.navigateTo({
      url: '../myRewards/myPostedRewards/myPostedRewards?str=' + this.data.listInd,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  load_myPulledRewards: function (e) {
    var dataset = e.target.dataset;
    var Index = dataset.index;
    console.log("输出成功")
    console.log(Index)
    wx: wx.navigateTo({
      url: 'myPulleddRewards',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})