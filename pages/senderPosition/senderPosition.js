// pages/homepage/homepage.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var qqmapsdk;
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "DA64usSVp77iVLCcC9pf5w1m9GeRhYey", //填写申请到的ak  
    marker1: {},
    marker2: {},
    marker3: {},
    systWidth: 0,
    dataPro: {},
    shopPro: {},
    address: '',
    latitude: '',
    longitude: '',
    openId: null,
    isViewDisabled: true,
    isLoading2: false,
    isLoading1: false,
    isNotAddress: true,
    isAddress: 0,
    addressStorage: null,
    isLogin: 1,
    isAddressOne: true,
    isLocation: false,
    actictyText: '',
    orderId: '',
    hasLocation: false,
    markers: [],
    distance:'',
    scale:18,
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: '40',

  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    app.globalData.isAddressOne = false
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systWidth: res.screenWidth,
          orderId: options.orderId,
          storeId: options.storeId,
          Olatitude: options.latitude,
          Olongitude: options.longitude,
          
        })
      },
    })
    if (that.data.storeId != '' & that.data.storeId != undefined) {
        that.getShopPosition();
    }
    
    that.getSenderPosition(); 
    console.log(options.latitude, options.longitude)
    console.log(app.globalData.shopId);
   
    that.getAuthLocation();  
  

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
      isViewDisabled: true
    })

    if (app.globalData.isAddressOne) {

      wx.getStorage({
        key: 'LocationAddress',
        success: function (res) {
          console.log(res)

          that.setData({
            addressStorage: res.data,
            address: res.data.address,
            latitude: res.data.latitude,
            longitude: res.data.longitude
          })

          that.setCacheData(app.globalData.openId, res.data.city, app.globalData.JSESSIONID, res.data.latitude, res.data.longitude);
        },
        fail: function () {
          that.setData({
            isLoading2: true,
            isNotAddress: false,
            isAddress: 1
          })
        }
      })
    } else {
      if (that.data.isLocation) {
        that.setData({
          isLoading2: false
        })
      
      }
    }

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
    return {
      title: '给您推荐一家美食餐厅哦！', // 分享标题
      desc: '给您推荐一家美食餐厅哦！', // 分享描述
      path: 'pages/homepage/homepage' // 分享路径
    }

  },

 
  setCacheData: function (openId, city, JSESSIONID, latitude, longitude) {
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
        // console.log(res);

        // if (!JSESSIONID) {
        //   JSESSIONID = res.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
        // }

        app.globalData.cityName = city;
        app.globalData.JSESSIONID = JSESSIONID;
        that.getShopData(JSESSIONID, latitude, longitude);

        //   that.getCacheData(JSESSIONID);

      }
    })
  },
  

  getCacheData: function (JSESSIONID) {
    var that = this;
    var cityName = 'cityName';
    wx.request({
      url: url.getCache,
      data: cityName,
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
      }
    })
  },

  getShopData: function (JSESSIONID, latitude, longitude) {
    var that = this;
    console.log(latitude, longitude)
    wx.request({
      url: url.getStoreId,
      data: {
        longitude: longitude,
        latitude: latitude,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        // console.log(res);

        if (res.data.status == 1) {
          // console.log('--------------------------383838838383833838383--------------');
          // console.log(res.data.data.storeId);
          app.globalData.shopId = res.data.data.storeId;
          app.globalData.extId = res.data.data.extId;

          that.setData({
            shopPro: res.data.data,
            isLoading2: true,
            isAddress: 0,
            isNotAddress: true
          })
        } else {
          that.setData({
            isLoading2: true,
            isAddress: 1,
            isNotAddress: false
          })
        }

      }
    })
  },


  getAuthLocation: function () {
    var that = this;
    wx.authorize({
      scope: 'scope.userLocation',
      success: function () {
        // console.log('+++成功+++++');
        //wx.startRecord()
      },
      fail: function () {
        // console.log('+++++++55555555+');
        wx.openSetting({
          success: function (res) {
            // console.log(res);
            if (res.authSetting['scope.userLocation']) {
              // console.log(res);
            } else {
              that.getAuthLocation();
            }
          },
          fail: function () {
            // console.log(1111);
          }
        })
      }
    })
  },
  getSenderPosition() {
    var that = this;
 
    var JSESSIONID = app.globalData.JSESSIONID;
    var orderId = that.data.orderId
    console.log(orderId)
    console.log(that.data.marker3)
    wx.request({
      url: url.getSenderPosition,
      // url: 'https://qc.can-dao.com:7770/Action?actionId=1&serviceId=17&key=b8396b24f70ae5c3',
      data: {
        orderId: orderId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        console.log(that.data.Olatitude, that.data.Olongitude)
        that.setData({
          Slatitude: res.data.data.latitude,
          Slongitude: res.data.data.longitude,
          marker3: {
            iconPath: "../../images/map/me.png",
            id: 3,
            latitude: that.data.Olatitude,
            longitude: that.data.Olongitude,
            width: 40,
            height: 50
          },
          distance: that.getDisance(that.data.Olatitude, that.data.Olongitude, that.data.Slatitude, that.data.Slongitude)
        });
        // var distance = that.getDisance(that.data.Olatitude, that.data.Olongitude, that.data.Slatitude, that.data.Slongitude)
        console.log(that.data.Olatitude, that.data.Olongitude, that.data.Slatitude, that.data.Slongitude)
        console.log(that.data.distance)
        console.log(that.getDisance(that.data.Olatitude, that.data.Olongitude, that.data.Slatitude, that.data.Slongitude))
        that.setData({
          marker2: {
            iconPath: "../../images/map/sender.png",
            id: 2,
            latitude: res.data.data.latitude,
            longitude: res.data.data.longitude,
            width: 40,
            height: 50,
            callout: {
              content: ' 距您' + that.data.distance + '米 ',
              color: "#000",
              fontSize: "16",
              borderRadius: "10",
              bgColor: "#DAC0A5",
              padding: "15",
              display: "ALWAYS"
            }
          },
        })
        console.log(that.data.marker2)
        if (that.data.storeId == ''|that.data.storeId ==undefined){
        that.setData({
          markers: [that.data.marker2, that.data.marker3],
        });
      }else{
        that.setData({
          markers: [that.data.marker1, that.data.marker2, that.data.marker3],
        });
      }
        console.log(that.data.markers)
        
      }
      
    })  
    
    // setTimeout(function(){
    //   that.getSenderPosition()
    // },1000*60)
  },
  getShopPosition(){
    var that = this;
    console.log(app.globalData.shopId);
    var JSESSIONID = app.globalData.JSESSIONID;
    var storeId = that.data.storeId
    // that.getSenderPosition()
    console.log(storeId)
    wx.request({
      url: url.getShopPosition,
      // url: 'https://qc.can-dao.com:7770/Action?actionId=1&serviceId=3&key=b8396b24f70ae5c3',
      data: {
        storeId: storeId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        that.setData({
          marker1: {
            iconPath: "../../images/map/shop.png",
            id: 1,
            latitude: res.data.data.latitude,
            longitude: res.data.data.longitude,
            width: 40,
            height: 50,
          },
        });
        that.getSenderPosition()
        console.log(that.data.marker3)
        console.log(that.data.marker2)
      }
    })
    console.log(that.data.marker3)
    console.log(that.data.marker2)

  },
  regionchange(e) {
    console.log(e.type)
  },
  toRad:function (d) {
    return d * Math.PI / 180;       
  },
  getDisance:function (lat1, lng1, lat2, lng2) {
    var that=this;
    var dis = 0;
    var radLat1 = that.toRad(lat1);
    var radLat2 = that.toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = that.toRad(lng1) - that.toRad(lng2);
    var distance;
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    that.setData({
      distance: Math.ceil(dis * 6378137),
    });
    return distance;
  },  
})