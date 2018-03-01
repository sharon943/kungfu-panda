// pages/personal/personal.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogin: 1,
    isViewDisabled: true,
    userPro: {},
    memberInformation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.getIsLogin(app.globalData.JSESSIONID);
    
    wx.setNavigationBarTitle({
      title: '我的',
      
    })
    console.log(app.globalData.LogiN)
    console.log(app.globalData.phone)
    that.setData({
      LogiN: app.globalData.LogiN,
      setPhone:app.globalData.phone,
      Discount:app.globalData.Discount
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
    that.getUserInfoData(app.globalData.JSESSIONID);
    console.log(app.globalData.LogiN)
    console.log(app.globalData.phone)
    
    that.setData({
      isViewDisabled: true,
      setPhone: app.globalData.phone,
      LogiN: app.globalData.LogiN,
      Discount: app.globalData.Discount
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
  // getInfo: function () {
  //   var that = this;
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       that.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         that.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  btn_login:function(){
    var isLogin = this.data.isLogin;

    this.setData({
      isViewDisabled: false,
    })
    if (isLogin == 2){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      wx.navigateTo({
        url: '../userInfromation/userInfromation',
      })
    }
    
  },
  getUserInfoData: function (JSESSIONID){
    var that = this;

    wx.request({
      url: url.getUserInformation,
      data:{

      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);

        if(res.data.status == 9){
         

          that.setData({
            isLogin: 2,
            isViewDisabled: true,
            memberInformation: {}
          })
        }else if(res.data.status == 1){
       //   res.data.data.nickName = res.data.data.nickName.replace(/(.{3}).*(.{4})/, "$1****$2");
          console.log('---------------------');
          app.globalData.phone = res.data.data.phone;
          app.globalData.personName = res.data.data.compellation;
          that.getMemberInformation(res.data.data.phone);
          that.setData({
            isLogin: 1,
            userPro: res.data.data,
            isViewDisabled: true,
          })
          console.log(that.data.userPro)
          app.globalData.ForgetPhone = res.data.data.phone
          
          
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
        }
      }
    })
  },
  btn_address:function(){
    var that = this;
      that.setData({
        isViewDisabled: false
      })

    if (that.data.isLogin == 2) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {

    wx.navigateTo({
      url: '../address/address',
    })
    }
  },
  getIsLogin: function (JSESSIONID){
    var that = this;

    wx.request({
      url: url.getIsLogin,
      data:{},
      method:'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);
      }
    })
  },
  btn_exit:function(){
    var that = this;

    var JSESSIONID = app.globalData.JSESSIONID;
    that.setData({
      isViewDisabled: false,
    })

    wx.request({
      url: url.exitLogin,
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);
        if(res.data.status == 1){
          
          that.getUserInfoData(app.globalData.JSESSIONID);
          that.getIsLogin(app.globalData.JSESSIONID);
        } else if (res.data.status == 11) {
          that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }
       
      }
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

          if(num == 1){
            that.getUserInfoData(app.globalData.JSESSIONID);
          }
      }
    })
  },
  getMemberInformation:function(phone){
    var that = this;
    console.log(phone);
    wx.request({
      url: url.getMemberInformation + phone,
      data:{
      },
      header:{
        clientId: constant.clientId,
        brandId: constant.brandId,
        // openId: app.globalData.openId
      },
      success:function(res){
        console.log(res);

        if(res.data.code == 200){
          app.globalData.memberId = res.data.data[0].id;
            that.setData({
              memberInformation: res.data.data[0]
            })
        }
      }
    })
  },
  btn_coupon:function(){

    this.setData({
      isViewDisabled: false
    })

    if (this.data.isLogin == 2){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      wx.navigateTo({
        url: '../myCoupon/myCoupon',
      })
    }

   
  },
  btn_revise:function(){
    var that = this;

    that.setData({
      isViewDisabled: false
    })

    if (this.data.isLogin == 2) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.navigateTo({
        url: '../revisePwd/revisePwd',
      })
    }
  },
  btn_contact:function(){
    var that = this;

    that.setData({
      isViewDisabled: false
    })

    
      wx.navigateTo({
        url: '../contactUs/contactUs',
      })
    }
  
  
})