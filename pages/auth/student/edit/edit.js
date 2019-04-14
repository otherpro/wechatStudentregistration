var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    // text:"这是一个页面"
    navList: [],
    id: "4028b8816a072a80016a072aa2e70002",
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
    size: 10000,
    index: 2,
    indexCredit: 2,
    credit: ["1", "2", "3", "4", "5"],
    room: ["一教202", "二教302", "实验楼505", "综合楼333"],
    multiArray: [
      ['1-16', '1-8', '8-16'],
      ['一', '二', '三', '四', '五'],
      ['01', '02', '03', '04', '05', '06', '07', '08']
    ],
    multiIndex: [0, 2, 3],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.info(options.courseSelectId);
    if (options.courseSelectId) {
      that.setData({
        id: options.courseSelectId,
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
    this.countDown();
  },
  getCategoryInfo: function () {
    let that = this;
    util.request(api.CourseSelectDetail, {
      courseselectId: this.data.id
    })
      .then(function (res) {
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
          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          //如何影响？？
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
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
  getNowTime: function () {
    let that = this;
    util.request(api.CourseSelectTime, {})
      .then(function (res) {
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
  timeFormat: function (param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown: function () {
    let newTime = new Date().getTime();
    let endTime = new Date(this.data.currentCategory.endTime).getTime();
    let startTime = new Date(this.data.currentCategory.startTime).getTime();
    let obj = null;
    // let endTime = new Date('2019/04/28 03:00:11').getTime();
    // console.info("-------");
    // console.info(newTime);
    // console.info(endTime);
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
    } else { //活dongkaishi ，全部设置为'00'
      this.setData({
        boxMessage: "选课进行中",
        countDownHidden: true,
        courseHidden: false
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
    setTimeout(this.countDown, 1000);
  },
 
  cancel: function () {
          wx.redirectTo({
            url: '/pages/category/category?courseSelectId=' + this.data.id,
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
            url: '/pages/category/category?courseSelectId=' + that.data.id,
          })
        }
      }
    })
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    // });
    // setTimeout(function () {
    //   wx.hideToast({
    //     complete(res) {
    //       wx.redirectTo({
    //         url: '/pages/category/category?courseSelectId=' + that.data.id,
    //       })
    //     }
    //   })
    // }, 2000)
   
 

  },

  bindRoomChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindCreditChange: function (e) {
    this.setData({
      indexCredit: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
})