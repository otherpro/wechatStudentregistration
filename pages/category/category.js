var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    // text:"这是一个页面"
    myUserFlag: "",
    navList: [],
    id: "4028b8816a072a80016a072aa2b20001",
    md5: "",
    timeViewFlag: 0, //倒计时隐藏显示标志
    killResult: {}, //返回的对象信息
    boxMessage: "",
    courseHidden: true,
    countDownHidden: false,
    countDown: {},
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
    console.info(options.courseSelectId);
    if (options.courseSelectId) {
      that.setData({
        id: options.courseSelectId,
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
    util.request(api.CourseSelectDetail, {
      courseSelectId: this.data.id
      })
      .then(function(res) {
        if (res.errno == 0) {
          var startTime = new Date(res.data.startTime);
          var endTime = new Date(res.data.endTime);
          startTime = util.formatTime(startTime)
          endTime = util.formatTime(endTime)
          that.setData({
            currentCategory: res.data,
            'currentCategory.startTime': startTime,
            'currentCategory.endTime': endTime,
          });
          that.countDown();
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
    this.setData({
      myUserFlag: app.globalData.myUserFlag,
    });

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  getNowTime: function() {
    let that = this;
    util.request(api.CourseSelectTime, {})
      .then(function(res) {
        if (res.errno == 0) {
          that.setData({
            nowTime: res.data.nowTime,
          });
          that.countDown();
        } else {
          //显示错误信息
        }
      });
  },
  timeFormat: function(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown: function() {
    let newTime = new Date().getTime();
    let endTime = new Date(this.data.currentCategory.endTime).getTime();
    let startTime = new Date(this.data.currentCategory.startTime).getTime();
    let obj = null;
    // let endTime = new Date('2019/04/28 03:00:11').getTime();
    // console.info("-------");
    // console.info(newTime);
    // console.info(this.data.currentCategory.endTime);
    // console.info(startTime);

    if (newTime > endTime) {
      //活动已结束
      this.setData({
        boxMessage: "选课结束",
        countDownHidden: true,
        courseHidden: true
      })
    } else if (startTime - newTime > 0) {
      this.setData({
        boxMessage: "未开始选课",
        countDownHidden: false,
        courseHidden: true
      })
      // 秒杀倒计时
      let time = (startTime - newTime) / 1000;
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      }
      setTimeout(this.countDown, 1000);
    } else { //活dongkaishi ，全部设置为'00'
      this.handlerSeckill();
      this.setData({
        boxMessage: "选课进行中",
        countDownHidden: true,
        courseHidden: false||app.myUserFlag!='s'
      })
      obj = {
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
    }
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDown: obj
    })
  },
  handlerSeckill: function() {
    //显示开始选课
    //获取md5
    let that = this;
    util.request(api.CourseSelectExposer, {
      courseSelectId: that.data.id,
      })
      .then(function(res) {
        //服务端无报错
        if (res.errno == 0) {
          if (res.data.exposed) {
            //设置md5同时点亮秒杀按钮标志
            that.setData({
              md5: res.data.md5,
            });
          } else {
            //未开始秒杀 重新显示倒计时 计算偏差 需要显示倒计时标志位
            that.setData({
              startTime: res.data.start,
              endTime: res.data.end,
              nowTime: res.data.now,
            });
            that.countDowm();
          }
        } else {
          //显示错误信息
        }
      });
  },
  execution: function() {
    let that = this;
    util.request(api.CourseSelectExecute, {
      courseSelectId: that.data.id,
        md5: that.data.md5
      })
      .then(function(res) {
        if (res.errno == 0) {
          let result = res.data;
          wx.showModal({
            title: '选课',
            content: result.stateInfo,
            showCancel: false,
             success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/catalog/catalog'
                })
              }
            }
          });
        } else {
          //显示错误信息
        }
      });
    return false;
  },
  edit: function() {
    wx.redirectTo({
      url: '/pages/category/edit/edit?courseSelectId=' + this.data.id,
    })
  },
  delete: function() {
    let that = this;
    util.request(api.CourseSelectDelete, {
      courseSelectId: that.data.id,
      })
      .then(function(res) {
        if (res.errno == 0) {
          //弹窗显示信息
          that.setData({
            Result: res.data,
          });
          wx.showModal({
            title: '删除课程',
            content: '删除成功',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/catalog/catalog'
                })
              }
            }
          })
        } else {
          //显示错误信息
        }
      });
  },
})