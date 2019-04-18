var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    myUserFlag:"",
    courseName: "",
    indexRoom: 0,
    indexCredit: 0,
    creditArray: ["学分", "1", "2", "3", "4", "5"],
    roomArray: ["教室", "一教202", "二教302", "实验楼505", "综合楼333"],
    date: '2019-04-20',
    time: '16:00',
    dateEnd: '2019-04-22',
    timeEnd: '16:00',
    maxNum: 30,
    remarks: "",
    multiArray: [
      ["周次", '1-16', '1-8', '8-16'],
      ["星期", '周一', '周二', '周三', '周四', '周五', "周六", "周日"],
      ["节次", '01', '02', '03', '04', '05', '06', '07', '08']
    ],
    multiIndex: [0, 0, 0],
    flag: 0,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.setData({
      userInfo: app.globalData.userInfo,
      myUserFlag: app.globalData.myUserFlag,
    });
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  formSubmit: function(e) {
    if (e.detail.value.courseName.length == 0 ||
      this.data.indexCredit == 0 ||
      this.data.indexRoom == 0 ||
      this.data.multiIndex[0] == 0 ||
      this.data.multiIndex[1] == 0 ||
      this.data.multiIndex[2] == 0) {
      {
        wx.showModal({
          title: 'warn',
          content: '完善信息',
          showCancel: false,
        })
        return false;
      }
    }
    console.log(!e.detail.value.credit + "===" + e.detail.value.credit);
    console.log(!e.detail.value.lesson + "===" + e.detail.value.lesson);
    console.log(!e.detail.value.week + "===" + e.detail.value.week);
    console.log(!e.detail.value.room + "===" + e.detail.value.room);
    // if (!e.detail.value.courseName.length > 0 || 
    // !e.detail.value.credit  || 
    // !e.detail.value.lesson || 
    // !e.detail.value.week|| 
    // !e.detail.value.room)
    // {
    //       wx.showModal({
    //         title: 'warn',
    //         content: '完善信息',
    //         showCancel: false,
    //       })
    //       return false;
    //     }
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // this.addCourseSelect();
    let that = this;
    let data = {};
    data.courseName = e.detail.value.courseName;
    data.credit = e.detail.value.credit;
    data.week = this.data.multiArray[0][this.data.multiIndex[1]];
    data.lesson = e.detail.value.lesson;
    data.room = e.detail.value.room;
    data.maxNum = e.detail.value.maxNum;
    data.remarks = e.detail.value.remarks;

    util.post(api.CourseAdd, {
        data
      })
      .then(function(res) {
        if (res.errno == 0) {
          let courseSelectId = res.data.courseSelectId;
          wx.showModal({
            title: '发布',
            content: '发布成功',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/category/category?courseSelectId=' + courseSelectId,
                })
              }
            }
          })
        } else {
          //显示错误信息
        }
      });
    return false;
  },
  formReset: function() {
    console.log('form发生了reset事件')
    this.setData({
      indexCredit: 0,
      indexRoom: 0,
      multiIndex: [0, 0, 0],
    })
  },
  addCourseSelect: function() {
    util.request(api.CourseSelectSave, {
      courseSelectId: that.data.courseSelectId,

      })
      .then(function(res) {
        if (res.errno == 0) {
          //弹窗显示信息
          that.setData({
            Result: res.data,
          });
        } else {
          //显示错误信息
        }
      });
  },
  bindRoomChange: function(e) {
    this.setData({
      indexRoom: e.detail.value
    })
  },
  bindCreditChange: function(e) {
    this.setData({
      indexCredit: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset['end'])
    if ("1" == e.currentTarget.dataset['end']) {
      this.setData({
        dateEnd: e.detail.value
      })
    } else {
      this.setData({
        date: e.detail.value
      })
    }
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset['end'])
    if ("1" == e.currentTarget.dataset['end']) {
      this.setData({
        timeEnd: e.detail.value
      })
    } else
      this.setData({
        time: e.detail.value
      })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  sliderchange: function(e) {

    this.setData({
      maxNum: e.detail.value
    })
  },
})