// pages/order/order.js
var app = getApp();
var url = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMenu: null,
    orderF: null,
    openId: null,
    orderPro: [],
    isViewDisabled: true,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
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
    this.getOpenData();

    this.setData({
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
  getOpenData:function(){

    var openId;
    if (app.globalData.openId) {
      openId = app.globalData.openId;
      this.setData({
        openId: app.globalData.openId
      })

      this.getOrderData(app.globalData.JSESSIONID);
    } else {
      app.openIdReadyCallback = res => {
        console.log(res);
        openId = res.openId
        this.setData({
          openId: res.openId
        })

        this.getOrderData(app.globalData.JSESSIONID);
      }

    }

  },
  getOrderData: function (JSESSIONID ){

    var that = this;

    wx.request({
      url: url.getOrderLib,
      data:{},
      method:'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);

        if(res.data.status == 1){
          var item = res.data.data;
          console.log(item);

          for(var i = 0; i < item.length; i++){
            item[i].name = item[i].storeName.substring(4, item[i].storeName.length);
            item[i].name_ = item[i].storeName.substring(0, 4);
          }
          console.log(item);
          if(res.data.data == []){
            that.setData({
              orderPro: null,
              isLoading: true
            })
          }else{
            // res.data.data[0].orderStatus = 100
            // res.data.data[0].statusName = '订单完成'
            // res.data.data[0].reviewStatus=2
            // res.data.data[1].orderStatus = 100
            // res.data.data[1].statusName = '订单完成'
            // res.data.data[0].reviewStatus = 2
            that.setData({
              
              orderPro: res.data.data,
              
              isLoading: true
            })
          }
          
        }else if(res.data.status == 9){
          // wx.navigateTo({
          //   url: '../login/login',
          // })
          that.setData({
            isLoading: true
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
        }else{
          that.setData({
            isLoading: true
          })
        }
      }
    })
  },
  
  btn_information:function(e){
    var that = this;

    this.setData({
      isViewDisabled: false
    })

    
   
    wx.navigateTo({
      url: '../information/information?id=' + e.currentTarget.dataset.item.orderId,
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
          that.getOpenData();
        }
      }
    })
  },
  go_comment:function(e){
    console.log(e)
    var row = e.currentTarget.dataset.item.orderId
    console.log(row)
    wx.navigateTo({
      url: '../WebView/webview?orderId='+row 
    })
  }, 
  go_seecomment:function(e){
      
  }
})