var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    navList: [],
    studentId: "1",
    courseHidden: true,
    countDownHidden: false,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000,
    index: 0,
    room: ["在读", "毕业", "其他"],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.info(options.studentId);
    if (options.studentId) {
      that.setData({
        studentId: options.studentId,
      });
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getCategoryInfo();
  },
  getCategoryInfo: function () {
    let that = this;
    util.request(api.StudentDetail, {
      studentId: this.data.studentId
    })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            currentCategory: res.data,
          });
        } else {
          //显示错误信息
        }
      });
    wx.hideLoading();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    console.log(1);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  cancel: function () {
          wx.redirectTo({
            url: '/pages/auth/student/student?studentId=' + this.data.studentId,
          })
  },
  save: function () {
    let that=this;
    wx.showModal({
      title: '保存信息',
      content: '修改成功',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/auth/student/student?studentId=' + that.data.studentId,
          })
        }
      }
    })
  },
  bindRoomChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

})