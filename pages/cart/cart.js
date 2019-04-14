var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    index: 0,
    indexCredit: 0,
    credit: ["1", "2", "3", "4", "5"],
    room: ["一教202", "二教302", "实验楼505", "综合楼333"],
    date: '2019-04-20',
    time: '16:00',
    dateEnd: '2019-04-22',
    timeEnd: '16:00',
    multiArray: [
      ['1-16', '1-8', '8-16'],
      ['一', '二', '三', '四', '五'],
      ['01', '02', '03', '04', '05', '06', '07', '08']
    ],
    multiIndex: [0, 0, 0],
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数


  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    this.getCartList();
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    wx.showModal({
      title: '发布',
      content: '发布成功',
      showCancel: false
    });
    return false;

  },
  getCartList: function() {
    let that = this;
    that.setData({
      cartGoods: [{
        goods_name: 'test',
        number: 'testnum',

      }, {
        goods_name: 'test1',
        number: 'testnum1',

      }]
    });
  },
  // getCartList: function () {
  //   let that = this;
  //   util.request(api.CartList).then(function (res) {
  //     if (res.errno === 0) {
  //       console.log(res.data);
  //       that.setData({
  //         cartGoods: res.data.cartList,
  //         cartTotal: res.data.cartTotal
  //       });
  //     }

  //     that.setData({
  //       checkedAllStatus: that.isCheckedAll()
  //     });
  //   });
  // },
  isCheckedAll: function() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;

    if (!this.data.isEditCart) {
      util.request(api.CartChecked, {
        productIds: that.data.cartGoods[itemIndex].product_id,
        isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1
      }, 'POST').then(function(res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function(element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }

        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount: function() {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  checkedAll: function() {
    let that = this;

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function(v) {
        return v.product_id;
      });
      util.request(api.CartChecked, {
        productIds: productIds.join(','),
        isChecked: that.isCheckedAll() ? 0 : 1
      }, 'POST').then(function(res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function(v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  editCart: function() {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  updateCart: function(productId, goodsId, number, id) {
    let that = this;

    util.request(api.CartUpdate, {
      productId: productId,
      goodsId: goodsId,
      number: number,
      id: id
    }, 'POST').then(function(res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          //cartGoods: res.data.cartList,
          //cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });

  },
  cutNumber: function(event) {

    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
  },
  addNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);

  },
  checkoutOrder: function() {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }


    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },

  bindRoomChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindCreditChange: function (e) {
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
    } else{
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
})