// pages/myCoupon/myCoupon.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponPro: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;

      that.getMemberInformation(app.globalData.phone);

      wx.setNavigationBarTitle({
        title: '我的优惠券',
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
  getMemberInformation: function (phone) {
    var that = this;
    console.log(phone);
    wx.request({
      url: url.getMemberInformation + phone,
      data: {
        registerFlag: 1
      },
      header: {
        clientId: constant.clientId,
        brandId: constant.brandId,
        // openId: app.globalData.openId
      },
      success: function (res) {
        console.log(res);

        if (res.data.code == 200) {
          for (var i = 0; i < res.data.data[0].coupons.length ; i++){
            // res.data.data[0].coupons[i].remark='次和覅uerhgireughrei'
            res.data.data[0].coupons[i]['nextDay'] = that.getDayData(res.data.data[0].coupons[i].endTime);
            res.data.data[0].coupons[i].beginTime = res.data.data[0].coupons[i].beginTime.substr(0, 10);
            res.data.data[0].coupons[i].endTime = res.data.data[0].coupons[i].endTime.substr(0, 10);
          }
          that.setData({
            couponPro: res.data.data[0].coupons
          })
        }
      }
    })
  },

  getDayData: function (endTime) {

    var that = this;

    var nowTime = that.strToDate(getNowFormatDate());

    var endTime = that.strToDate(endTime);

    var nextTime = endTime - nowTime;
    console.log(nextTime);

    var day = Math.floor(nextTime / (24 * 1000 * 3600));
    console.log('+++++++++++++++');
    console.log(day);


    return day;

    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  strToDate: function (dateObj) {
    dateObj = dateObj.replace(/(-)/g, '/');
    console.log(dateObj);
    return new Date(dateObj)
  },
})