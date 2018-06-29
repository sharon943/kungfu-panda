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
    newview:false,
    newview1: false,
    oldview:false,
    systWidth:0,
    RulesView: true,
    sharePeopleistList:{},
    ShareInfo:'',
    timeAge:'',
    isToast: true,
    toastData: '您已领取过该券',
    recommendedId:'',
    dataView: false,
    Otoast:'',
    ActivityListPro:[],
    imageUrl:'',
    wxActivityReward: { shareGiftTicketList: [{ 'phase': 1, 'ticketTemplateNameList': '优惠券' }, { 'phase': 2, 'ticketTemplateNameList': '优惠券2' }, { 'phase': 3, 'ticketTemplateNameList': '优惠券3' }], 'orderMoneyRatio': true, 'orderTypeReward': 1},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    console.log(app.globalData.memberId)
    console.log(url.GetSharepersoninfo + constant.brandId)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systWidth: res.screenWidth,
          recommendedId: options.recommendedId,
          activityId: options.activityId,
          // activityId: 238,
          // recommendedId: 10802863,//正式
          // recommendedId: 1718878526
        })
        // console.log(that.data.recommendedId)
      },
    })
    that.GetSharepersoninfo();
    that.getActivityList()
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
      dataView:false,
      newview: false,
    })
    console.log(app.globalData.memberId)
    if (app.globalData.memberId != null & app.globalData.memberId != '' & app.globalData.memberId != undefined) {
      this.getcoupon()
      this.getActivityList()
    }
    if (app.globalData.memberId == null | app.globalData.memberId == undefined){
      this.setData({
        newview: true,
      })
     this.GetSharepersoninfo();
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)

    }
    return {
      title: this.data.title,
      path: '/pages/pushNew/pushNew?recommendedId=' + app.globalData.memberId + '&activityId=' + this.data.activityId,
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
  GetSharepersoninfo:function(){
    var that=this;
    console.log(that.data.recommendedId)
    wx.request({
      url: url.GetSharepersoninfo + constant.brandId,
      header: {
        recommendedId: that.data.recommendedId,
        activityId: that.data.activityId
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==200){
          that.setData({
            sharePeopleistList: res.data.data.sharePeopleistList,
            ShareInfo: res.data.data,
            timeAgoPro: res.data.data.sharePeopleistList,
            dataView: true,
          })
          var article = that.data.ShareInfo.remark;
          WxParse.wxParse('article', 'html', article, that, 0);
          console.log(that.data.timeAgoPro)
        }
      }
    })
  },
  getActivityList: function () {
    var that = this
    console.log(url.getActivityList + constant.brandId)
    console.log(app.globalData.memberId)
    wx.request({
      url: url.getActivityList + constant.brandId,
      header: {
        activityId: that.data.activityId,
        recommendedId: app.globalData.memberId,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            ActivityListPro: res.data.data,
            earnings: res.data.data.earnings,
            wxActivityReward: res.data.data.wxActivityReward,
            imageUrl: res.data.data.imageUrl,
            title: res.data.data.title,
            dataView: true,
          })
          var article = that.data.ActivityListPro.remark;
          WxParse.wxParse('article', 'html', article, that, 0);
          console.log(that.data.wxActivityReward)
          console.log(that.data.wxActivityReward.shareGiftTicketList[0].phase + '/' + that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase + '*' + that.data.earnings.invitationCount)
          console.log(that.data.earnings.invitationCount + '/' + that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase)
          that.setData({
            // percent: that.data.wxActivityReward.shareGiftTicketList[0].phase / that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase * that.data.earnings.invitationCount
            percent: that.data.earnings.invitationCount / that.data.wxActivityReward.shareGiftTicketList[that.data.wxActivityReward.shareGiftTicketList.length - 1].phase
          })
          console.log(that.data.percent)
        }
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
    console.log(app.globalData.memberId)
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
    
  },
  OuseIt: function () {
    wx.switchTab({
      url: '../homepage/homepage',
    })
    // var that = this;
    // console.log(that.data.recommendedId)
    // console.log(app.globalData.memberId)
    // if (app.globalData.memberId == null | app.globalData.memberId == undefined) {
    //   that.setData({
    //     toastData: '您未登录',
    //     isToast: false,
    //     isCode: false
    //   })
    //   setTimeout(function () {
    //     that.setData({
    //       isToast: true
    //     }),
    //       wx.navigateTo({
    //         url: '../login/login?recommendedId=' + that.data.recommendedId,
    //       })
    //   }, 2000)
    //   return;
    // }else{
    //   var a = that.data.Otoast
    //   console.log(a)
    //   that.setData({
    //     toastData: a,
    //     isToast: false,
    //     isCode: false
    //   })
    //   setTimeout(function () {
    //     that.setData({
    //       isToast: true
    //     }),
    //       wx.switchTab({
    //         url: '../homepage/homepage',
    //     })
    //   }, 2000)
    //   return;
    // }


  },
  getcoupon:function(){
    var that=this
    var header = {
      recommendedId: that.data.recommendedId,
      activityId: that.data.activityId,
      cardId: app.globalData.memberId,
      brandId: constant.brandId,
    };
    wx.request({
      url: url.getUseIt,
      method: 'POST',
      header: header,
      success: function (res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
             newview1: true,
             dataView: true,
          })
        } else {
          // wx.navigateTo({
          //   url: '../share/share?activityId=' + that.data.activityId
          // })
          that.setData({
            Otoast: res.data.message,
            dataView: true,
            oldview:true
          })
        }

      }
    })
  },
  useItnew:function(){
    var that=this
    console.log(that.data.recommendedId)
    wx.navigateTo({
      url: '../login/login?recommendedId=' + that.data.recommendedId,
    })
  }
})