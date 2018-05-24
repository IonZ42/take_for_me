const app = getApp();

Page({
  data: {
    foodDescription:'aaaa',
    hour:0,
    minute:0,
    rewardState:'未完成',
    foodDelivered: false,
    index: 0,
    infos: []
  },

  onLoad: function (options) {
    var index = parseInt(options.str)
    console.log(index)
    this.setData({ index: index })
    this.getinfos()

  },
  getinfos: function () {
    let infos = wx.getStorageSync('infos')
    this.setData({
      infos: infos
    })
  },
  deliverSuccess: function (e) {
    wx.setStorage({ key: 'foodDelivered', data: true })
    this.setData({
      foodDelivered: true
    })
  },

  rewardSuccess: function (e) {
    wx.setStorage({ key: 'rewardState', data: '已完成' })
    this.setData({
      rewardState: '已完成'
    })
    //同时删除该任务
    this.remove()
  },

  remove: function () {
    let index = this.data.index
    this.data.infos.splice(index, 1);
    this.setData({
      infos: this.data.infos
    });
    wx.setStorageSync('infos', this.data.infos)
    wx.navigateBack({ })
    wx.navigateBack({})
    //wx.navigateTo({
    //  url: '../../main'
    //})
  },

  moveToChange: function (e) {
    wx.navigateTo({ url: '../changePostedReward/changePostedReward' })
  },

  onShow(params) {
    //在这一步预填充表单
    let index = this.data.index
    this.setData({
      foodDescription: wx.getStorageSync('foodDescription'),
      hour: this.data.infos[index].hour,
      minute: this.data.infos[index].minute,
      bounty: wx.getStorageSync('bounty'),
      rewardState: wx.getStorageSync('rewardState') || '未完成',
      foodDelivered: wx.getStorageSync('foodDelivered'),
    })
  },

  onUnload: function () {
    //wx.navigateBack()
  }
})