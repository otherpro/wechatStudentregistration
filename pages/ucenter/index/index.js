const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog: false
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
 
  },
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },

  onUserInfoClick: function() {
    if (wx.getStorageSync('token')) {
    } else {
      this.showLoginDialog();
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  onDialogBody() {
    // 阻止冒泡
  },

  onWechatLogin(e) {
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    util.login().then((res) => {
      return util.request(api.AuthLoginByWeixin, {
        code: res,
        // userInfo: e.detail
      }, 'POST');
    }).then((res) => {
      console.log(res)
      // if (res.errno !== 0) {
      //   wx.showToast({
      //     title: '微信登录失败',
      //   })
      //   return false;
      // }
      // 设置用户信息
      this.setData({
        userInfo: res.data.userInfo,
        showLoginDialog: false
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
      wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
      wx.setStorageSync('token', res.data.token);
    }).catch((err) => {
      console.log(err)
    })
  },

  onOrderInfoClick: function(event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function(event) {

  },
  // TODO 移到个人信息页面
  exitLogin: function() {
    let that=this;
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('myUserInfo');
          wx.removeStorageSync('myUserFlag');
          app.globalData.userInfo={};
          app.globalData.token = "";
          app.globalData.myUserInfo = {};
          app.globalData.myUserFlag = "";
          that.setData({
            userInfo: app.globalData.userInfo,
          });
          // wx.switchTab({
          //   url: '/pages/ucenter/index/index'
          // });
        }
      }
    })
  },
  onAccounrLogin: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
    this.setData({
      userInfo: e.detail.userInfo,
      showLoginDialog: false,
    });
        wx.navigateTo({
          url: '/pages/auth/login/login',
        })
  },
})
















// onAccounrLogin: function(e) {
//   if (e.detail.errMsg !== 'getUserInfo:ok') {
//     if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
//       return false
//     }
//     wx.showToast({
//       title: '登录失败',
//     })
//     return false
//   }
//   app.globalData.userInfo = e.detail.userInfo;
//   this.setData({
//     userInfo: e.detail.userInfo,
//     showLoginDialog: false
//   });
//   util.login().then((res) => {
//     return util.request(api.AuthLoginByAccount, {
//       code: res,
//       // userInfo: e.detail
//     }, 'POST');
//   }).then((res) => {
//     console.log(res)
//     // if (res.errno !== 0) {
//     //   wx.showToast({
//     //     title: '微信登录失败',
//     //   })
//     //   return false;
//     // }
//     // 设置用户信息
//     this.setData({
//       myUserInfo: res.data.myUserInfo,
//       myUserFlag: res.data.myUserFlag,
//       showLoginDialog: false
//     });
//     app.globalData.user = res.data.userInfo;
//     app.globalData.token = res.data.token;
//     wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
//     wx.setStorageSync('token', res.data.token);

//     app.globalData.myUserInfo = res.data.myUserInfo;
//     app.globalData.myUserFlag = res.data.myUserFlag;
//     wx.setStorageSync('myUserInfo', JSON.stringify(res.data.myUserInfo));
//     wx.setStorageSync('myUserFlag', res.data.myUserFlag);
//   }).catch((err) => {
//     console.log(err)
//   })
// },