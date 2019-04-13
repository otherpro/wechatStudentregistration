var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [],//分类(多个对象)
    currentAcademyId:0,
    categoryList: [],//分类二
    // currentCategory: {},//当前分类（一个对象）
    currentCategory: [],
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    this.getCatalog();
   
  },
  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.AcademyList).then(function (res) {
      console.info(res);
      console.info(res.data);
        that.setData({
          navList: res.data,
          currentAcademyId: res.data[0].academyId,
        });
      that.getCurrentCategory(that.data.currentAcademyId);
        wx.hideLoading();
      });
    // util.request(api.CatalogList).then(function (res) {

    //   that.setData({
    //     navList: res.data.categoryList,
    //     currentCategory: res.data.currentCategory
    //   });
    //   wx.hideLoading();
    // });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

  },
  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CourseSelectList, { academyId: id })
      .then(function (res) {
        that.setData({
          currentCategory: res.data,
          currentAcademyId: id,
        });
      });
  },
  onReady: function () {
    // 页面渲染完成
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
  getList: function () {
    var that = this;
    util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
      .then(function (res) {
        that.setData({
          categoryList: res.data,
        });
      });
  },
  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentAcademyId == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id);
    
  }
})