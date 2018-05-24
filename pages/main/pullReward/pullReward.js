const app = getApp();

const locations = ['C4保安亭', 'C8保安亭', 'C10保安亭', 'D2保安亭']
const buildings = ['C2', 'C5', 'C8', 'C10', 'C7']

Page({
  data: {//rewardDescription
    //user data
    //rewardID,
    //userID

    //UI data
    locations: locations,
    buildings: buildings,
    value0: locations[0],
    value1: buildings[0],
    flag:true,

    //form data
    location: locations[0],
    building: buildings[0],
    detailAddress: '',
    hour: 0,
    minute: 0,
    bounty: 0,
    listInd: '',
    rewards: [],
    returns:[],
  },

  bindChange0: function (e) {
    const val = locations[e.detail.value[0]]
    this.setData({
      location: val
    })
    wx.setStorage({ key: 'location', data: val })
  },

  bindChange1: function (e) {
    const val = buildings[e.detail.value[0]]
    this.setData({
      building: val
    })
    wx.setStorage({ key: 'building', data: val })
  },

  onUnload: function () {
    //wx.navigateBack()
    //var pages = getCurrentPages()
    //var prevPage = pages[pages.length - 2]
    //prevPage.onLoad()//或wx.navigateBack()，后者应该不会刷新上一页面
  },

  onLoad: function (options) {
    this.getrewards()
  },

  onShow(params) {
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

  getrewards: function () {
    let rewards = wx.getStorageSync('rewards')
    this.setData({
      rewards: rewards
    })
  },

  load_main: function (e) {
    var dataset = e.currentTarget.dataset;
    var index = dataset.index;
    console.log(index)

    this.data.reward = {
      food_description: this.data.returns[index].food_description,
      bounty: this.data.returns[index].bounty,
      hour: this.data.returns[index].hour,
      minute: this.data.returns[index].minute,
    }

    this.savereward(this.data.reward)
    // this.setData({ listInd: index })
    //  wx: wx.navigateTo({
    //    url: '../myRewards/myPostedRewards/myPostedRewards?str=' + this.data.listInd,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
    wx.navigateBack({
      delta: 1,
    })
  
  },

  errorModal: function (content) {
    wx.showModal({
      title: '出现错误',
      content: content
    })
  },

  savereward: function (reward) {
    var rewards = wx.getStorageSync('rewards') || []
    rewards.unshift(reward)
    wx.setStorageSync('rewards', rewards)
  },

  filter:function(){
    var dataSent = {
      message_type: "filter",
      location: this.data.location,
      building: this.data.building
    }
    var flag=this.data.flag
    flag=false
    this.setData({flag:flag})
    dataSent = JSON.stringify(dataSent)
    wx.sendSocketMessage({
      data: dataSent
    })
  }
})

wx.onSocketMessage(function (res) {
  var json_array = JSON.parse(res.data)
  var object_array = []
  for (var i = 0; i < json_array.length; ++i) {
    object_array.push(JSON.parse(json_array[i]))
  }
  console.log(object_array)
  var page = getCurrentPages()[getCurrentPages().length - 1]
  page.setData({
    returns: object_array         // object_array是可以被接收的悬赏
  })

})
