// pages/register/register.js
var app = getApp();
var url = require('../../utils/url.js');
var isPhone = require('../../utils/isPhone.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isViewDisabled: true,
    timeInt: 60,
    timeData: '获取验证码',
    phone: '',
    isToast: true,
    toastData: '请输入正确的手机号',
    typeNum: 1,
    typeRegister: 1,
    code: '',
    isCode: false,
    timeInt: 60,
    pwd:'',
    pwd1: '',
    i: 0,
    Phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册',
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
  btn_register:function(e){
    var that = this;
    var info = e.currentTarget.dataset.info;
    var phone = that.data.phone;
    var code = that.data.code;

    if(info == 1){
      
      that.setData({
        isViewDisabled: false
      })

      var JSESSIONID = app.globalData.JSESSIONID;
      
      if (phone == '') {
        that.setData({
          toastData: '手机号不能为空',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      } else if (!isPhone.phone(phone)) {
        that.setData({
          toastData: '手机号格式错误',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      } else if (code == '') {
        that.setData({
          toastData: '验证码为空',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      } else {

        that.getCode(phone, code, JSESSIONID);
        
      }
    }else{
      var pwd = that.data.pwd;
      var pwd1 = that.data.pwd1;

      if (pwd == ''){
        that.setData({
          toastData: '密码不能为空',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      }else if(pwd1 == ''){
        that.setData({
          toastData: '密码不能为空',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      }else if(pwd1 != pwd){
        that.setData({
          toastData: '两次输入密码不一致',
          isToast: false,
          isViewDisabled: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      }else {
        that.getRegister(phone, code, pwd, pwd1, app.globalData.JSESSIONID);
      }
    }

  },
  input_code:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  input_phone: function (e) {

    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  countDowm: function (that) {
    var time = that.data.timeInt;

    if (time == 0) {
      that.setData({
        timeInt: 60,
        timeData: '获取验证码',
        isCode: false
      })
    } else {
      if (time == 60) {
        that.setData({
          timeInt: time,
          timeData: time + 's'
        })
      }

      setTimeout(function () {
        that.setData({
          timeInt: time - 1,
          timeData: (time - 1) + 's'
        })

        that.countDowm(that);
      }, 1000)
    }
  },
  btn_get_del:function(){
    var that = this;

    that.setData({
      Phone: ''
    })
    console.log(that.data.phone)
  },
  btn_get_code: function () {
    var that = this;
    var phone = that.data.phone;

    that.setData({
      isCode: true
    })

    if (phone == '') {
      that.setData({
        toastData: '手机号不能为空',
        isToast: false,
        isCode: false
      })

      setTimeout(function () {
        that.setData({
          isToast: true
        })
      }, 2000)
    } else if (!isPhone.phone(phone)) {
      that.setData({
        toastData: '手机号格式错误',
        isToast: false,
        isCode: false
      })

      setTimeout(function () {
        that.setData({
          isToast: true
        })
      }, 2000)
    } else {

      that.getLogin(phone, app.globalData.JSESSIONID);
    }

  },
  getLogin: function (phone, JSESSIONID) {
    var that = this;

    wx.request({
      url: url.registerCode,
      data: { phone: phone },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          that.countDowm(that);
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }else{
          that.setData({
            isCode: false
          })
        }
      }
    })
  },
  inputPwd:function(e){

      this.setData({
        pwd: e.detail.value
      })
  },
  inputPwd1:function(e){

    this.setData({
      pwd1: e.detail.value
    })

  },
  getCode: function (phone, code, JSESSIONID){
    var that = this;
    wx.request({
      url: url.registerCodeGo,
      data: {
        phone: phone,
        verificCode: code
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {

          that.setData({
            typeRegister: 2,
            isViewDisabled: true
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }else{
          that.setData({
            toastData: res.data.msg,
            isToast: false,
            isViewDisabled: true
          })

          setTimeout(function () {
            that.setData({
              isToast: true
            })
        })
      }
      }
    })
  },
  getRegister: function (phone, code, pwd, pwd1, JSESSIONID){
    var that = this;
    wx.request({
      url: url.registerNumber,
      data: {
        phone: phone,
        passwd: md5.hexMD5(pwd),
        verificCode: code,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {

          that.setData({
            toastData: '注册成功',
            isToast: false,
            isViewDisabled: true
          })

          setTimeout(function () {
            that.setData({
              isToast: true
            })
            wx.switchTab({
              url: '../personal/personal',
            })
          }, 2000)
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }else{
          that.setData({
            toastData: res.data.msg,
            isToast: false,
            isViewDisabled: true
          })

          setTimeout(function () {
            that.setData({
              isToast: true
            })

          }, 2000)
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

        
      }
    })
  }
})