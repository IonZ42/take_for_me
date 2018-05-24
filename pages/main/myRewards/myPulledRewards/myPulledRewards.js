const app = getApp();

const locations = ['C4保安亭', 'C8保安亭', 'C10保安亭', 'D2保安亭']
const buildings = ['C2', 'C5', 'C8', 'C10', 'C7']
Page({
  data: {
    receiverName: '',
    receiverMobileTail: '',
    foodDescription: '',
    location: '',
    building: '',
    detailAddress: '',
    hour: 0,
    minute: 0,
    bounty: 0,
    note: ''
  },

  onShow(params) {
    //在这一步预填充表单
    this.setData({
      receiverName: wx.getStorageSync('receiverName'),
      receiverMobileTail: wx.getStorageSync('receiverMobileTail'),
      foodDescription: wx.getStorageSync('foodDescription'),
      detailAddress: wx.getStorageSync('detailAddress'),
      location: wx.getStorageSync('location'),
      building: wx.getStorageSync('building'),
      hour: wx.getStorageSync('hour'),
      minute: wx.getStorageSync('minute'),
      bounty: wx.getStorageSync('bounty'),
      note: wx.getStorageSync('note')
    })
  },

  onUnload: function () {
    wx.navigateBack()
  },
  
})