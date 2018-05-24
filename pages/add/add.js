const app = getApp();

// pages/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "undefined",
        phone_number: "undefined"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    submitRecord: function (e) {
        wx.request({
            url: "https://www.yangxiaobao.xin/add_records.php",
            data: {
                title: e.detail.value.title,
                detail: e.detail.value.detail,
                deadline: e.detail.value.deadline
            },
            dataType: "json",
            responseType: "text",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function () {
                wx.showToast({
                    title: "success",
                    duration: 2000
                })
            }
        })
    },

    seizeUserInfo: function () {
        var _this = this;
        wx.login({
            success: function (e) {
                console.log(e.code);
                console.log(e.errMsg);
                if (e.errMsg == "login:ok") {
                    wx.request({
                        url: "https://www.yangxiaobao.xin/take_for_me/login.php",
                        method: "POST",
                        data: {
                            code: e.code,
                            errMsg: e.errMsg
                        },
                        success: function (res) {
                            console.log("TEST");
                            console.log(res);
                            console.log("TEST");
                            _this.setData({
                                phone_number: res.data.phone_number
                            })
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
                console.log("fail to invoke wx.login.");
            }
        })
    }
})