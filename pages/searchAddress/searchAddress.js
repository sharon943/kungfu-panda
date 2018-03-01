// pages/searchAddress/searchAddress.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk;
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象 
var BMap;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    address: '',
    isAddressLib: true,
    isNotAddress: true,
    addressPro: [],
    isLogin: true,
    addresObj: null,
    isLoading:false,
    isViewDisabled: true,
    locationAddress: null,
    searchName: '',
    timeData: '获取验证码',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude,
      address: app.globalData.address
    })
    qqmapsdk = new QQMapWX({
      key: 'XI7BZ-SKAWX-MWO4Y-732EH-PW4ZH-UGBCM'
    });
     BMap = new bmap.BMapWX({
       ak: "qULkkI8CLAY1HTeHXNcynLXduqeydaLk"
    })

    //调用wx.getSystemInfo接口，然后动态绑定组件高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '搜索地址',
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
    this.getBusinessmanAddressDatabase(app.globalData.JSESSIONID);
    this.getStorageData();
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
  getSearchData: function (name, region) {
    var that = this;
    qqmapsdk.getSuggestion({
      keyword: name,
      success: function (res) {
        console.log(res);

        if (res.message == 'query ok') {
          that.setData({
            addressPro: res.data,
            isAddressLib: false
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
    // wx.request({
    //   url: 'http://api.map.baidu.com/place/v2/suggestion?query=' + name + '&region=' + region +'&city_limit=true&output=json&ak=qULkkI8CLAY1HTeHXNcynLXduqeydaLk',
    //   method: "GET",
    //   // header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.message == 'ok') {
    //        that.setData({
    //        addressPro: res.data.result,
    //          isAddressLib: false
    //       })
    //      }
    //   }
    // })

  },
  btn_cancel: function () {

    this.setData({
      isAddressLib: true,
      addressPro: []
    })
  },
  btn_address_input: function (e) {
    console.log(e);
    var that = this;
    var name = e.detail.value;
    var region='广东'

    that.setData({
      searchName: name
    })

    that.getSearchData(name,region);
  },
  getBusinessmanAddressDatabase: function (JSESSIONID) {
    var that = this;
    wx.request({
      url: url.getAddressDataBase,
      data: {},
      method: "POST",
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if(res.data.status == 1){
          that.setData({
            isLoading: true,
            addresObj:res.data.data,
            isLogin: true
          })
        }else if(res.data.status == 9){
          that.setData({
            isLoading: true,
            isLogin: true
          })
          
        }else if(res.data.status == 1){
          that.setData({
            isLoading: true,
            isLogin: true
          })
          that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);

        }else{
          that.setData({
            isLoading: true,
            isLogin: true
          })
        }
      }
    })
  },
  btn_address_database: function (e) {
    var that = this;
    
    var item = e.currentTarget.dataset.item;
    console.log(item);
    
    if(that.data.isLogin){
      that.setData({
        isLoading: false
      })
    that.setCacheData(item.city, app.globalData.JSESSIONID, item.location.lat, item.location.lng, item.address)
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  btn_order:function(){
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    this.getShopData(app.globalData.city, app.globalData.JSESSIONID, latitude, longitude, app.globalData.address);
  },
  getShopData: function (city,JSESSIONID, latitude, longitude,address) {
    var that = this;

    wx.request({
      url: url.getStoreId,
      data: {
        longitude: longitude,
        latitude: latitude,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          that.setData({
            isLoading: true
          })
          var addressObj = {
            'city': city,
            'latitude': latitude,
            'longitude': longitude,
            'address': address
          }

          wx.setStorage({
            key: "LocationAddress",
            data: addressObj
          })

          app.globalData.isAddressOne = true;
          app.globalData.shopId = res.data.data.storeId;
          app.globalData.menuPro = {};
          app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
          app.globalData.menuProArray = {};
          app.globalData.sendAddress = null;
          app.globalData.specialOfferPrice = 0;
          app.globalData.typePro = {};
       
        wx.redirectTo({
            url: '../menu/menu?typeNum=1&shopId=' + res.data.data.storeId + '&jump=' + '&address=' + address + '&latitude=' + latitude + '&longitude=' + longitude,
          })
        } else {
          that.setData({
            isLoading: true,
            isNotAddress: false,
            isAddress: 1
          })
        }

      }
    })
  },
  setCacheData: function (city, JSESSIONID, latitude, longitude, address) {
    var that = this;
    wx.request({
      url: url.setCache,
      data: {
        cityName: city,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        app.globalData.cityName = city;
        that.getShopData(city,JSESSIONID, latitude, longitude,address);
        //   that.getCacheData(JSESSIONID);

      }
    })
  },
  btn_addres_confirm:function(){
    this.setData({
      isNotAddress: true
    })
  },
  getStorageData:function(){
    
    var that = this;
// console.log()
    wx.getStorage({
      key: 'LocationAddress',
      success: function (res) {
        console.log(res.data)

        that.setData({
          locationAddress: res.data
        })

      }
    })
  },
  btn_get_del:function(){

  },
  btn_histroy_address:function(){
    var that = this;

    var locationAddress = that.data.locationAddress;

    console.log(locationAddress);

    
    that.setCacheData(locationAddress.city, app.globalData.JSESSIONID, locationAddress.latitude, locationAddress.longitude, locationAddress.address)
  },
  btn_search_one:function(){
      var that = this;
      var searchName = that.data.searchName;
      var region='广州'
      if (that.data.isLogin) {
      if (searchName != ''){
        var that = this;      
      
        qqmapsdk.getSuggestion({
          keyword: searchName,
          policy: 1,
          success: function (res) {
            console.log(res);

            if (res.message == 'query ok') {
              console.log(res.data);

                that.setData({
                  isLoading: false
                })
                if(res.data){
                  that.setCacheData(res.data[0].city, app.globalData.JSESSIONID, res.data[0].location.lat, res.data[0].location.lng, res.data[0].address)
                }
               
              
            }
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }
      } else {
        wx.navigateTo({
          url: '../login/login',
        })
      }
      
  },
  setCacheData1: function (openId, city, JSESSIONID) {
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
  btn_address_local:function(e){
    var that = this;
    console.log(e);
    var item = e.currentTarget.dataset.item;
    that.setCacheData(item.cityName, app.globalData.JSESSIONID, item.latitude, item.longitude, item.receiverAddress)
  }
})