// pages/coupon/coupon.js
var app = getApp();
var url = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponPro: [],
    couponPro_:[],
    shopId: null,
    typeNum: null,
    address: null,
    jump: null,
    latitude: null,
    longitude: null,
    isToast: true,
    toastData: '',
    isViewDisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponData();
      console.log(options);
    this.setData({
      shopId: options.shopId,
      typeNum: options.typeNum,
      address: options.address,
      jump: options.jump,
      latitude: options.latitude,
      longitude: options.longitude,
    })

    wx.setNavigationBarTitle({
      title: '领券',
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
  getCouponData:function(){

    var that = this;
    console.log(app.globalData.extId);
    wx.request({
      url: url.getCouponLib + app.globalData.memberId,
      data:{},
      header:{
        clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
        storeId: app.globalData.extId,
      },
      success:function(res){
        console.log(res);

        if(res.data.code == 200){
          var couponPro = [];
          var item = res.data.data

          for (var i = 0; i < item.length;i++){

            var couponObj = {};
           
            for (var j = 0; j < item[i].coupons.length; j++){

              couponObj = item[i].coupons[j];
              couponObj['title'] = item[i].title;
              couponObj['acId'] = item[i].id;
              couponObj['status'] = item[i].status;

              if (item[i].coupons[j].endTime){
               
                couponObj['nextDay'] = that.getDayData(item[i].coupons[j].endTime);
              }else{
                
                couponObj['nextDay'] = that.getDayData(item[i].endTime);
              }
              
              couponPro.push(couponObj);
            }
          }
          console.log(111111);
          console.log(couponPro);

          that.setData({
            couponPro: couponPro
          })
        }
      }
    })
  },
  getDayData:function(endTime){

    var that = this;

    var nowTime = that.strToDate(getNowFormatDate());

    var endTime = that.strToDate(endTime);

    var nextTime = endTime - nowTime;
    console.log(nextTime);

    var day = Math.floor(nextTime/(24*1000*3600));
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
  btn_go_user:function(e){

    var that =this;
    console.log(e);
    



    var longitude = that.data.longitude;
    var latitude = that.data.latitude;
    var jump = that.data.jump;
    var address = that.data.address;
    var typeNum = that.data.typeNum;
    var shopId = that.data.shopId;

    
    wx.redirectTo({
      url: '../menu/menu?typeNum=1&shopId=' + shopId + '&jump=' + jump + '&address=' + address + '&latitude=' + latitude + '&longitude=' + longitude,
    })
  },
  btn_go_user_:function(e){

    var that = this;
    var item = e.currentTarget.dataset.item;
    console.log(app.globalData.extId);

    that.setData({
      isViewDisabled: false
    })
    wx.request({
      url: url.getCouponQ,
      data:{
        cardId: app.globalData.memberId,
        acId: item.acId,
        couponTemplateId: item.id
      },
      method:'POST',
      header:{
        clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
        storeId: app.globalData.extId,
      },
      success:function(res){
        console.log(res);

        if(res.data.code == 200){
          that.setData({
            isViewDisabled: true
          })

          var longitude = that.data.longitude;
          var latitude = that.data.latitude;
          var jump = that.data.jump;
          var address = that.data.address;
          var typeNum = that.data.typeNum;
          var shopId = that.data.shopId;


          wx.redirectTo({
            url: '../menu/menu?typeNum=1&shopId=' + shopId + '&jump=' + jump + '&address=' + address + '&latitude=' + latitude + '&longitude=' + longitude,
          })
        } else{
            that.setData({
              isToast: false,
              toastData: res.data.message,
              isViewDisabled: true
            })
        }
      }
    })
  },
  strToDate: function (dateObj) {
    dateObj = dateObj.replace(/(-)/g, '/');
    console.log(dateObj);
    return new Date(dateObj)
  },
})