App({
  data: {
    user_id: 0,
    socketOn: false,
    point: 10
  },
  onLaunch: function () {
    let location = wx.getStorageSync('location')
    if (!location) {
      wx.setStorage({
        key: 'location',
        data: defaultSet.defaultLocation
      })
    }
  }
})
/*//失败的全局变量尝试
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
/*
/*
const defaultSet = {
  defaultLocation: 'C8保安亭',
  defaultBuilding: 'C2',
  defaultMobileTail:0
}

App({
  onLaunch: function () {
    let location = wx.getStorageSync('location')
    if (!location) {
      wx.setStorage({
        key: 'location',
        data: defaultSet.defaultLocation
      })
    }
  }
})
*/