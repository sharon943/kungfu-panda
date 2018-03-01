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
    revisePro: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '修改地址',
    })

    if(options.info){
      app.globalData.addressObj = {
        'city': JSON.parse(options.info).cityName,
        'location': {
          'lng': JSON.parse(options.info).longitude,
          'lat': JSON.parse(options.info).latitude
        }
      };
      app.globalData.locationAddress = JSON.parse(options.info).receiverAddress;
      console.log(options);
      that.setData({
        revisePro: JSON.parse(options.info)
      })
    }else{
      console.log('-------------');
      that.setData({
        revisePro: app.globalData.revisePro
      })
    }
    console.log(that.data.revisePro.receiverName)
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
      isViewDisabled: true
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
    app.globalData.revisePro = that.data.revisePro;
    
    wx.redirectTo({
      url: '../locationAddress/locationAddress?typeNum=1',
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
        url: url.reviseAddress,
        data: {
          receiverName: item.name,
          receiverPhone: item.phone,
          receiverAddress: locationAddress,
          appendReceiverAddress: item.address,
          longitude: addressObj.location.lng,
          latitude: addressObj.location.lat,
          cityName: addressObj.city,
          addressId: that.data.revisePro.aid
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
              toastData: '修改地址成功',
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
          } else if (res.data.status == 11) {
            that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
          }else {
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
      
      }
    })
  },
  input_name:function(e){
    var revisePro = this.data.revisePro;
    revisePro.receiverName = e.detail.value;
    this.setData({
      revisePro: revisePro
    })
  },
  input_phone: function (e) {

    var revisePro = this.data.revisePro;
    revisePro.receiverPhone = e.detail.value;

    this.setData({
      revisePro: revisePro
    })
  },
  input_address: function (e) {

    var revisePro = this.data.revisePro;
    revisePro.appendReceiverAddress = e.detail.value;

    this.setData({
      revisePro: revisePro
    })
  },
 

})