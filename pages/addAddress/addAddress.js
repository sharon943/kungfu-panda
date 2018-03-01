// pages/addAddress/addAddress.js
var app = getApp();
var url = require('../../utils/url.js');
var isPhone = require('../../utils/isPhone.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationAddress: null,
    addressObj: null,
    isToast: true,
    isViewDisabled: true,
    name:'',
    phone:'',
    adressJ: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //app.globalData.addressObj = null;
    //app.globalData.locationAddress = null;

    wx.setNavigationBarTitle({
      title: '添加地址',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      locationAddress: app.globalData.locationAddress,
      addressObj: app.globalData.addressObj,
      isViewDisabled: true,
      name: app.globalData.adressName,
      phone: app.globalData.adressPhone,
      adressJ: app.globalData.addressJ
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  btn_location_address: function () {
    var that = this;

    that.setData({
      isViewDisabled: false
    })

    wx.redirectTo({
      url: '../locationAddress/locationAddress',
    })
  },
  btn_submit: function (e) {
    var that = this;
    var item = e.detail.value;
    var locationAddress = that.data.locationAddress;
    var addressObj = that.data.addressObj;
    var JSESSIONID = app.globalData.JSESSIONID;
    that.setData({
      isViewDisabled: false
    })

    if (item.name == '') {
      that.setData({
        isToast: false,
        toastData: '名字不能为空',
        isViewDisabled: true
      })

      setTimeout(function () {
        that.setData({
          isToast: true,

        })

      }, 2000)
    } else if (item.phone == '') {
      that.setData({
        isToast: false,
        toastData: '电话不能为空',
        isViewDisabled: true
      })

      setTimeout(function () {
        that.setData({
          isToast: true,

        })

      }, 2000)
    } else if (!isPhone.phone(item.phone)) {
      that.setData({
        isToast: false,
        toastData: '电话不能为空',
        isViewDisabled: true
      })

      setTimeout(function () {
        that.setData({
          isToast: true,

        })

      }, 2000)
    } else if (item.address == '') {
      that.setData({
        isToast: false,
        toastData: '详细地址不能为空',
        isViewDisabled: true
      })

      setTimeout(function () {
        that.setData({
          isToast: true,

        })

      }, 2000)
    } else if (!locationAddress) {
      that.setData({
        isToast: false,
        toastData: '送餐地址不能为空',
        isViewDisabled: true
      })

      setTimeout(function () {
        that.setData({
          isToast: true,

        })

      }, 2000)
    } else {
      wx.request({
        url: url.addAddress,
        data: {
          receiverName: item.name,
          receiverPhone: item.phone,
          receiverAddress: locationAddress,
          appendReceiverAddress: item.address,
          longitude: addressObj.location.lng,
          latitude: addressObj.location.lat,
          cityName: addressObj.city
        },
        method: 'POST',
        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
        success: function (res) {
          console.log(res);

          if (res.data.status == 1) {

            app.globalData.locationAddress = null;
            app.globalData.addressObj = null;
            app.globalData.adressName = '';
            app.globalData.adressPhone = '';
            app.globalData.addressJ = '';
            app.globalData.revisePro = null;

            that.setData({
              isToast: false,
              toastData: '添加地址成功',
              isViewDisabled: true
            })

            setTimeout(function () {
              that.setData({
                isToast: true,

              })
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          } else if (res.data.status == 9) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.data.status == 11) {
            that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
          } else {
            that.setData({
              isToast: false,
              toastData: res.data.msg,
              isViewDisabled: true
            })

            setTimeout(function () {
              that.setData({
                isToast: true
              })
            }, 2000)
          }
        }
      })
    }
  },
  btn_get_del: function () {
    var that = this;

    that.setData({
      name: ''
    })

  },
  btn_get_phonedel: function () {
    var that = this;

    that.setData({
      phone: ''
    })

  },
  btn_get_adressJdel: function () {
    var that = this;

    that.setData({
      adressJ: ''
    })

  },
  setCacheData: function (openId, city, JSESSIONID, num = 0) {
    //that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
    /**else if(res.data.status == 9){
          wx.navigateTo({
            url: '../login/login',
          })
        }else if(res.data.status == 11){
          that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        } */
    var that = this;
    wx.request({
      url: url.setCache,
      data: {
        cityName: city,
        openId: openId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (num == 1) {
          
        }
      }
    })
  },
  btn_name:function(e){
    
    app.globalData.adressName = e.detail.value;

    this.setData({
      name: e.detail.value
    })
  },
  btn_phone: function(e){
    app.globalData.adressPhone = e.detail.value;


    this.setData({
      phone: e.detail.value
    })
  },
  btn_address:function(e){
    app.globalData.addressJ = e.detail.value;

    this.setData({
      adressJ: e.detail.value
    })
  }
})