var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  startLogin: function () {
    var that = this;
    if (that.data.password.length < 1 || that.data.username.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }
    wx.request({
      url: api.AuthLoginByAccount,
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == 200){
          that.setData({
            'loginErrorCount': 0
          });
          app.globalData.myUserInfo = res.data.myUserInfo;
          app.globalData.token = res.data.token;
          app.globalData.myUserFlag = res.data.myUserFlag;
          wx.setStorageSync('myUserInfo', JSON.stringify(res.data.myUserInfo));
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('myUserFlag', res.data.myUserFlag);
          wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
          // wx.setStorage({
          //   key:"token",
          //   data: res.token,
          //   success: function(){
          //     wx.switchTab({
          //       url: '/pages/ucenter/index/index'
          //     });
          //   }
          // });
        }else{
          wx.showModal({
            title: 'message',
            content: res.data.msg,
            showCancel: false,
          })
        }
      }
    });
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {

    this.setData({
      password: e.detail.value
    });
  },
  bindCodeInput: function (e) {

    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})