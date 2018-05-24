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

    //UI data
    locations: locations,
    buildings: buildings,
    minutes: minutes,
    hours: hours,
    value0: locations[2],
    value1: buildings[3],
    value2: [12, 30],

    //form data
    receiverName: '',
    receiverMobileTail: '',
    foodDescription: '',
    location: '',
    building: '',
    detailAddress: '',
    hour: 0,
    minute: 0,
    bounty: 0,
    note: '',
  },

  bindChange0: function (e) {
    const val = e.detail.value
    wx.setStorage({ key: 'location', data: val })
  },

  bindChange1: function (e) {
    const val = e.detail.value
    wx.setStorage({ key: 'building', data: val })
  },

  bindChange2: function (e) {
    const val = e.detail.value
    wx.setStorage({ key: 'hour', data: val[0] })
    wx.setStorage({ key: 'minute', data: val[1] })
  },

  formSubmit: function (e) {
    var receiverName = e.detail.value.inputName.trim()
    var receiverMobileTail = e.detail.value.inputMobile.trim()
    var foodDescription = e.detail.value.inputDesc.trim()
    var detailAddress = e.detail.value.inputAddr.trim()
    //var indexFromWhere = e.detail.value.inputSrc.trim()
    //var indexBuilding = e.detail.value.inputBld.trim()
    //var estimatedDeliveryTime = e.detail.value.inputTime.trim()
    //var bounty = e.detail.value.inputBounty.trim()
    var note = e.detail.value.inputNote.trim()
    if (!(receiverName && receiverMobileTail && detailAddress)) {
      this.errorModal('昵称和手机尾号和房间名不能为空')
      return
    }
    if (!receiverMobileTail.match(/^[0-9]{4}$/)) {
      this.errorModal('手机尾号为后四位号码哦')
      return
    }
    wx.setStorage({ key: 'receiverName', data: receiverName })
    wx.setStorage({ key: 'receiverMobileTail', data: receiverMobileTail })
    wx.setStorage({ key: 'foodDescription', data: foodDescription })
    wx.setStorage({ key: 'detailAddress', data: detailAddress })
    //wx.setStorage({ key: 'bounty', data: bounty })
    wx.setStorage({ key: 'note', data: note })

    var pages = getCurrentPages()
    var cartPage = pages[pages.length - 2]
    cartPage.setData({ refreshAddress: true })
    wx.navigateBack()
  },

  onUnload: function () {
    //wx.navigateBack()
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

  errorModal: function (content) {
    wx.showModal({
      title: '出现错误',
      content: content
    })
  }
})
