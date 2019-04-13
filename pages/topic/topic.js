var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [], //分类(多个对象)
    currentAcademyId: 0,
    categoryList: [], //分类二
    // currentCategory: {},//当前分类（一个对象）
    currentCategory: [],
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    grade: [],
    index: 0,
  },
  onLoad: function(options) {
    this.initGrade();
    this.getCatalog("2019-2020-1");
   
  },
  getCatalog: function(grade) {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.StudentCourseList, { grade: grade==undefined?"":grade}).then(function(res) {
      console.info(res);
      console.info(res.data);
      that.setData({
        currentCategory: res.data,
      });
    });
    wx.hideLoading();
  },
  initGrade: function() {
    let newTime = new Date();
    let year = parseInt(newTime.getFullYear());
    let yearP1 = year + 1;
    let year_1 = year - 1;
    let year_2 = year - 2;
    let year_3 = year - 3;
    let year_4 = year - 4;
    console.info(year - 3 + "-" + year);
    let gradeTemp = [];
    gradeTemp[0] = year + "-" + yearP1 + "-1";
    gradeTemp[1] = year_1 + "-" + year + "-1";
    gradeTemp[2] = year_1 + "-" + year + "-2";
    gradeTemp[3] = year_2 + "-" + year_1 + "-1";
    gradeTemp[4] = year_2 + "-" + year_1 + "-2";
    gradeTemp[5] = year_3 + "-" + year_2 + "-1";
    gradeTemp[6] = year_3 + "-" + year_2 + "-2";
    gradeTemp[7] = year_4 + "-" + year_3 + "-2";
    this.setData({
      grade: gradeTemp,
    });
    
  },
  bindGradeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    });
    let grade=this.data.grade[this.data.index];

    this.getCatalog(grade);
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentAcademyId == event.currentTarget.dataset.id) {
      return false;
    }
    this.getCurrentCategory(event.currentTarget.dataset.id);

  }
})







