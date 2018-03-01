// pages/revisePwd/revisePwd.js
var app = getApp();
var url = require('../../utils/url.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd1: null,
    pwd2: null,
    isToast: true,
    toastData: '',
    inputVIew:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改密码',
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
  pwd1:function(e){

    this.setData({
      pwd1: e.detail.value
    })
  },
  pwd2: function (e) {

    this.setData({
      pwd2: e.detail.value
    }) 
    if (this.data.pwd1 != '' | this.data.pwd2 != '') {
      this.setData({
        inputVIew: false
      })
    } else if (this.data.pwd1 == '' & this.data.pwd2 == '') {
      this.setData({
        inputVIew: true
      })
    }
  },
  revisePwd:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var pwd1 = that.data.pwd1;
    var pwd2 = that.data.pwd2;
    console.log(pwd1);
    console.log(pwd2);
    if(pwd1 == ''){
        that.setData({
          isToast: false,
          toastData: '请输入旧密码'
        })
        setTimeout(function () {
          that.setData({
            isToast: true,
          })
        }, 2000)
    }else if(pwd2 == ''){
      that.setData({
        isToast: false,
        toastData: '请输入新密码'
      })
      setTimeout(function(){
        that.setData({
          isToast: true,
        })
      },2000)
    }else{
      wx.request({
        url: url.revisePwd,
        data: { oldPasswd: md5.hexMD5(pwd1), newPasswd: md5.hexMD5(pwd2) },
        method: "POST",
        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
        success:function(res){
          console.log(res);

          if(res.data.status == 1){

            that.setData({
              isToast: false,
              toastData: '修改成功'
            })
            setTimeout(function () {
              that.setData({
                isToast: true,
              })

              wx.navigateBack({
                delta:1
              })
            }, 2000)
          }else{
            that.setData({
              isToast: false,
              toastData: res.data.msg
            })
            setTimeout(function () {
              that.setData({
                isToast: true,
              })
            }, 2000)
          }
        }
      })
    }
   
  },
  ForgetPwd:function(){
    wx.navigateTo({
      url: '../ForgetPwd/ForgetPwd',
    })
    console.log(app.globalData.ForgetPhone)
  }
})