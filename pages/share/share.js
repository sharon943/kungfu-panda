// pages/share/share.js
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
    RulesView:true,
    ActivityListPro:{},
    imageUrl:'',
    title:'',
    wxActivityReward:'',
    earnings:'',
    timeAgoPro:'',
    percent:'',
    dataView:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.memberId)
    if (app.globalData.memberId == null | app.globalData.memberId == undefined) {
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
            url: '../login/login',
          })
      }, 2000)

    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systWidth: res.screenWidth
        })
      },
    })
    that.getActivityList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    console.log(that.data.RulesView)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    console.log(that.data.RulesView)
    that.getActivityList()
 
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
  onShareAppMessage: function (res) {
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
   
    }
    return {
      title: this.data.title,
      path: '/pages/pushNew/pushNew?recommendedId=' + app.globalData.memberId,
      imageUrl: this.data.imageUrl,

      success: function (res) {
        // 转发成功
        console.log('成功')
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  get_rules:function(){
     var that=this
     that.setData({
       RulesView: false
     })
    //  console.log(that.data.RulesView)
   
  },
  dis_rules:function(e){
    console.log(9)
    var that = this
    that.setData({
      RulesView: true
    })
    // console.log(that.data.RulesView)

  },

  getActivityList: function () {
    var that = this
    console.log(url.getActivityList + constant.brandId)
    console.log(app.globalData.memberId)
    wx.request({
      url: url.getActivityList + constant.brandId,
      header: {
        activityId: 129,
        recommendedId: app.globalData.memberId,
      },
      success: function (res) {
        console.log(res);
        
        that.setData({
          ActivityListPro: res.data.data,
          earnings: res.data.data.earnings,
          wxActivityReward: res.data.data.wxActivityReward,
          imageUrl: res.data.data.imageUrl,
          title: res.data.data.title,
          dataView:true,
        })
        var article = that.data.ActivityListPro.remark;
        WxParse.wxParse('article', 'html', article, that, 0);
        console.log(that.data.wxActivityReward)
        console.log(that.data.wxActivityReward.shareGiftTicketList[0].phase + '/' + that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase + '*' + that.data.earnings.invitationCount)
        that.setData({
          percent: that.data.wxActivityReward.shareGiftTicketList[0].phase / that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase * that.data.earnings.invitationCount
        })
        console.log(that.data.percent)
      }
    })
  },
  
})