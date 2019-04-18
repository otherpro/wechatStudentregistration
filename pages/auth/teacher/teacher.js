var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({
  data: {
    // text:"这是一个页面"
    navList: [],
    teacherId: "1",
    timeViewFlag: 0, //倒计时隐藏显示标志
    killResult: {}, //返回的对象信息
    boxMessage: "",
    courseHidden: true,
    countDownHidden: false,

    countDown: {},
    academyId:"1",
    academy:{},
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.info(options.teacherId);
    if (options.teacherId) {
      that.setData({
        id: options.teacherId,
      });
    }
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getCategoryInfo();

  },
  getCategoryInfo: function() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    let academyId="0";
    util.request(api.TeacherDetail, {
      teacherId: this.data.teacherId
      })
      .then(function(res) {
        if (res.errno == 0) {
          that.setData({
            currentCategory: res.data,
            academyId: res.data.academyId,
          });
           
        } else {
          //显示错误信息
        }
      });
    util.request(api.AcademyDetail, {
      academyId: that.data.academyId,
    })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            academy: res.data,
          });
        } else {
          //显示错误信息
        }
        wx.hideLoading();
      });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    console.log(1);

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },

  edit: function() {
    wx.redirectTo({
      url: '/pages/auth/teacher/edit/edit?teacherId=' + this.data.teacherId,
    })
  },
  cancel: function() {
    let that = this;
    wx.switchTab({
      url: '/pages/ucenter/index/index'
    })
  },
})