var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    navList: [],
    teacherId: "1",
    courseHidden: true,
    countDownHidden: false,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000,
    index: 0,
    room: ["在职", "离职", "退休"],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.info(options.teacherId);
    if (options.teacherId) {
      that.setData({
        id: options.teacherId,
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
    util.request(api.TeacherDetail, {
      teacherId: this.data.teacherId
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
            url: '/pages/auth/teacher/teacher?teacherId=' + this.data.id,
          })
  },
  save: function () {
    // let that=this;
    // util.request(api.TeacherSave, {
    //   teacher: this.data.teacher
    // })
    //   .then(function (res) {
    //     if (res.errno == 0) {
    //       that.setData({
    //         callback: res.data,
    //       });

    //     } else {
    //       //显示错误信息
    //     }
    //   });
    wx.showModal({
      title: '保存信息',
      content: '修改成功',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/auth/teacher/teacher?teacherId=' + that.data.id,
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