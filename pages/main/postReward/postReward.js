const app = getApp();

const hours = []
const minutes = []
const locations = ['C4保安亭', 'C8保安亭', 'C10保安亭', 'D2保安亭']
const buildings = ['C2', 'C5', 'C8', 'C10', 'C7']

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

Page({
  data: {//rewardDescription
    //user data
    //rewardID,
    //userID
    point: app.data.point,

    //UI data
    locations: locations,
    buildings: buildings,
    minutes: minutes,
    hours: hours,
    value0: locations[0],
    value1: buildings[0],
    value2: [12, 30],

    //form data
    receiverName: '',
    receiverMobileTail: '',
    foodDescription: '',
    location: locations[0],
    building: buildings[0],
    detailAddress: '',
    hour: 12,
    minute: 30,
    bounty: 0,
    note: '',

    //尝试实现数据共享
    ind: 0,
    info: {},
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

  bindChange2: function (e) {
    const val = e.detail.value
    this.setData({
      hour: val[0],
      minute: val[1]
    })
    wx.setStorage({ key: 'hour', data: val[0] })
    wx.setStorage({ key: 'minute', data: val[1] })
  },

  formSubmit: function (e) {
    var receiverName = e.detail.value.inputName.trim()
    var receiverMobileTail = e.detail.value.inputMobile.trim()
    var foodDescription = e.detail.value.inputDesc.trim()
    var detailAddress = e.detail.value.inputAddr.trim()
    var hour = this.data.hour
    var minute = this.data.minute
    var location = this.data.location
    var building = this.data.building
    //var indexFromWhere = e.detail.value.inputSrc.trim()
    //var indexBuilding = e.detail.value.inputBld.trim()
    //var estimatedDeliveryTime = e.detail.value.inputTime.trim()
    var bounty = e.detail.value.inputBounty.trim()
    var note = e.detail.value.inputNote.trim()
    if (!(receiverName && receiverMobileTail && detailAddress && bounty)) {
      this.errorModal('昵称和手机尾号和房间名和悬赏积分不能为空')
      return
    }
    if (!receiverMobileTail.match(/^[0-9]{4}$/)) {
      this.errorModal('手机尾号为后四位号码哦')
      return
    }
    //需要余额校验
    if (!bounty > 0 ) {
      this.errorModal('错误的赏金数额')
      return
    } 
    /*
    if (bounty > point) {
      this.errorModal('错误的赏金数额')
      return
    }
    */

    wx.setStorage({ key: 'receiverName', data: receiverName })
    wx.setStorage({ key: 'receiverMobileTail', data: receiverMobileTail })
    wx.setStorage({ key: 'foodDescription', data: foodDescription })
    wx.setStorage({ key: 'detailAddress', data: detailAddress })
    wx.setStorage({ key: 'bounty', data: bounty })
    wx.setStorage({ key: 'note', data: note })
    

    let ind = wx.getStorageSync('ind')
    ind++
    wx: wx.setStorage({
      key: 'ind',
      data: ind,
    })
    this.setData({ ind: ind })
    this.data.info = {
      foodDescription: this.data.foodDescription,
      bounty: this.data.bounty,
      hour: wx.getStorageSync('hour'),
      minute: wx.getStorageSync('minute'),
      ind: wx.getStorageSync('ind')
    }
    this.saveInfo(this.data.info)
    console.log("success")

    
    if (app.data.socketOn) {
      var dataSent = {
        message_type: "post",
        user_id: app.data.user_id,
        receiver_name: receiverName,
        receiver_mobile_tail: receiverMobileTail,
        food_description: foodDescription,
        location:location,
        building:building,
        detail_address: detailAddress,
        hour: hour,
        minute: minute,
        bounty: bounty,
        note: note
      }
      dataSent = JSON.stringify(dataSent)
      wx.sendSocketMessage({
        data: dataSent,
        success: function () {
          // 来点庆祝提交成功的画面
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        }
      })
      wx.navigateBack()
    } else {
      console.log("Fail")
      wx.showToast({
        title: "连接失败",
        icon: "none"
      })
    }

    //var pages = getCurrentPages()
    //var cartPage = pages[pages.length - 2]
    //cartPage.setData({ refreshAddress: true })
  },

  saveInfo: function (info) {
    var infos = wx.getStorageSync('infos') || []
    infos.unshift(info)
    wx.setStorageSync('infos', infos)
  },
  
  onLoad: function () {
    if (!app.data.socketOn) {
      wx.connectSocket({
        url: "ws://www.yangxiaobao.xin:8812",
        success: function () {
          console.log("Websocket connect successfully.")
        },
        fail: function () {
          wx.showToast({
            title: "连接失败",
            icon: "none"
          })
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
    }
  },

  onUnload: function () {
    //wx.navigateBack()
    //var pages = getCurrentPages()
    //var prevPage = pages[pages.length - 2]
    //prevPage.onLoad()//或wx.navigateBack()，后者应该不会刷新上一页面
  },

  onShow(params) {
    //在这一步预填充表单
    this.setData({
      receiverName: wx.getStorageSync('receiverName'),
      receiverMobileTail: wx.getStorageSync('receiverMobileTail'),
      foodDescription: wx.getStorageSync('foodDescription'),
      detailAddress: wx.getStorageSync('detailAddress'),
      //location: wx.getStorageSync('location'),
      //building: wx.getStorageSync('building'),
      //hour: wx.getStorageSync('hour'),
      //minute: wx.getStorageSync('minute'),
      bounty: wx.getStorageSync('bounty'),
      note: wx.getStorageSync('note')
    })
  },

  errorModal: function (content) {
    wx.showModal({
      title: '出现错误',
      content: content
    })
  }
})

wx.onSocketOpen(function (res) {
  console.log("The websocket is open. ")
  app.data.socketOn = true
})