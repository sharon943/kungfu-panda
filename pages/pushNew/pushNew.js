// pages/pushNew/pushNew.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systWidth:0,
    RulesView: true,
    sharePeopleistList:{},
    ShareInfo:'',
    timeAge:'',
    isToast: true,
    toastData: '您已领取过该券',
    recommendedId:'',
    dataView: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // console.log(options)
    // 
    // console.log(app.globalData.memberId)
    
    console.log(url.GetSharepersoninfo + constant.brandId)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systWidth: res.screenWidth,
          recommendedId: options.recommendedId,
          // recommendedId: 10000000046,
        })
        // console.log(that.data.recommendedId)
      },
    })
    that.GetSharepersoninfo();
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
  GetSharepersoninfo:function(){
    var that=this;
    console.log(that.data.recommendedId)
    wx.request({
      url: url.GetSharepersoninfo + constant.brandId,
      header: {
        recommendedId: that.data.recommendedId,
        activityId: 129
      },
      success: function (res) {
        console.log(res);
        that.setData({
          sharePeopleistList: res.data.data.sharePeopleistList,
          ShareInfo:res.data.data,
          timeAgoPro: res.data.data.sharePeopleistList,
          dataView: true,
        })
        var article = that.data.ShareInfo.remark;
        WxParse.wxParse('article', 'html', article, that, 0);
        console.log(that.data.timeAgoPro)
          
      }
    })
  },
  get_rules: function () {
    var that = this
    that.setData({
      RulesView: false
    })
    console.log(that.data.RulesView)

  },
  dis_rules: function (e) {
    console.log(9)
    var that = this
    that.setData({
      RulesView: true
    })
    console.log(that.data.RulesView)
  },
  useIt:function(){
    var that = this;
    console.log(that.data.recommendedId)
    // console.log(app.globalData.memberId)
    if (app.globalData.memberId == null | app.globalData.memberId==undefined){
      that.setData({
        toastData: '您未登录',
        isToast: false,
        isCode: false
      })
      setTimeout(function () {
        that.setData({
          isToast: true
        }),
        wx.navigateTo({
          url: '../login/login?recommendedId=' + that.data.recommendedId,
        })
      }, 2000)
      return;
    }
    var header={
      recommendedId: that.data.recommendedId,
      activityId: 129,
      cardId: app.globalData.memberId,
      brandId: constant.brandId,
    };
    console.log(url.getUseIt)
    // console.log(that.data.recommendedId, app.globalData.memberId, constant.brandId)
    console.log(header)
    wx.request({    
      url: url.getUseIt,
      method: 'POST',
      header: header,
      success: function (res) {
        console.log(res);
        if(res.data.code==200){
          that.setData({
            toastData: '领取成功',
            isToast: false,
            isCode: false
          })
          setTimeout(function () {
            that.setData({
              isToast: true
            }),
              wx.switchTab({
                url: '../homepage/homepage',
              })
          }, 2000)
        } else {
          that.setData({
            toastData: res.data.message,
            isToast: false,
            isCode: false
          })
          setTimeout(function () {
            that.setData({
              isToast: true
            }),
              wx.switchTab({
                url: '../homepage/homepage',
              })
          }, 2000)
        }
        
      }
    })
  }
 
})