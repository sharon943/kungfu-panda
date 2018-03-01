// pages/locationAddress/locationAddress.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCity: true,
    cityPro: [],
    locationAddress: null,
    addressPro: [],
    typeNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    var that = this;

    wx.setNavigationBarTitle({
      title: '定位地址',
    })

    console.log(app.globalData.JSESSIONID);

    qqmapsdk = new QQMapWX({
      key: 'XI7BZ-SKAWX-MWO4Y-732EH-PW4ZH-UGBCM'
    });

    if (options.typeNum){
      that.setData({
        typeNum: 1
      })
    }
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
    that.getCityData(app.globalData.JSESSIONID);
    that.setData({
      locationAddress: app.globalData.locationAddress
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
  getCityData: function (JSESSIONID){
    var that = this;

    wx.request({
      url: url.getCity,
      data:{},
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);

        if(res.data.status == 1){
          that.setData({
            cityPro: res.data.data
          })
        } else if (res.data.status == 9) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }
      }
    })
  },
  getSearchData: function (name) {
    var that = this;

    qqmapsdk.getSuggestion({
      keyword: name,
      policy: 1,
      success: function (res) {
        console.log(res);

        if (res.message == 'query ok') {
          that.setData({
            addressPro: res.data,
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  btn_address_input:function(e){
    var that = this;

    that.setData({
      locationAddress: e.detail.value
    })
  },
  btn_search:function(){
    var locationAddress = this.data.locationAddress;

    this.getSearchData(locationAddress);
  },
  btn_address_location:function(e){
    var that = this;
    var item = e.currentTarget.dataset.item;
    console.log(e);
    app.globalData.addressObj = item;
    app.globalData.locationAddress = item.title;
    if (that.data.typeNum == 1){
      wx.redirectTo({
        url: '../addressRevise/addressRevise',
      })
    }else{
      wx.redirectTo({
        url: '../addAddress/addAddress',
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
        that.getCityData(app.globalData.JSESSIONID);
      }
    })
  }
})