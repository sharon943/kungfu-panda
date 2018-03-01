// pages/goods/goods.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodMenu :{},
    allMenu: {},
    sendMoney: 0,
    boxMoney: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    console.log(app.globalData.menuPro);
    console.log(app.globalData.allpro);
    that.setData({
      goodMenu: app.globalData.menuPro,
      allMenu: app.globalData.allpro,
      sendMoney: app.globalData.sendMoney,
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
  btn_send:function(){
    wx.navigateTo({
      url: '../send/send',
    })
  }
})