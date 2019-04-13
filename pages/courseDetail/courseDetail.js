var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    // text:"这是一个页面"
    navList: [],
    goodsList: [],
    id: "1",
    teacher:{},
    teacherId:"1",
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.info(options.courseId);
    if (options.courseId) {
      that.setData({
        id: options.courseId,
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
    util.request(api.CourseDetail, {
      courseId: this.data.id
    })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            currentCategory: res.data,
            teacherId: res.data.teacherId,
          });
        } else {
          //显示错误信息
        }
      });
    util.request(api.TeacherDetail, {
      teacherId: this.data.teacherId,
    })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            teacher: res.data,
          });
        } else {
          //显示错误信息
        }
      });
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
})