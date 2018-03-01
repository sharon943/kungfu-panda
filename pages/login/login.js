// pages/login/login.js
var app = getApp();
var url = require('../../utils/url.js');

var isPhone = require('../../utils/isPhone.js');
var constant = require('../../utils/constant.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeNum: 1,
    isViewDisabled: true,
    timeInt: 60,
    timeData: '获取验证码',
    phone: '',
    isToast: true,
    toastData: '请输入正确的手机号',
    passSee:'flase',
    isCode: false,//验证码按钮是否可点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
    })
    console.log(app.globalData.session_key)
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
  btn_type:function(e){
    console.log(e);

    this.setData({
      typeNum: e.currentTarget.dataset.info
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入手机号',
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:ok'){
      console.log(e.detail.encryptedData)
      console.log(e.detail.iv)
      var that=this;
      that.setphonenumber(e.detail.encryptedData, e.detail.iv)
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { 
          console.log(res)
        }
      })
    }
  },
  setphonenumber: function (encryptedData, iv){
    console.log(app.globalData.session_key)
    var WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');

    var appId = 'wx0451681834e5d0ff'
    var sessionKey = app.globalData.session_key
    var encryptedData = encryptedData
    var iv = iv

    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData, iv)

    console.log('解密后 data: ', data)
    if (data.phoneNumber.length > 0 & data.phoneNumber.length!=undefined){
      var that=this;
      app.globalData.phone = data.phoneNumber;
      app.globalData.LogiN=5;
      // app.globalData.personName = data.compellation;
      that.getMemberInformation(data.phoneNumber);
      
      that.setData({
     
        phone: data.phoneNumber
      })
      
    }
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
      if (time == 60){
        that.setData({
          timeInt: time ,
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
  btn_get_del: function () {
    var that = this;

    that.setData({
      phone: ''
    })
    console.log(that.data.phone)
  },
  btn_pass_see:function(){
    var that = this;

    that.setData({
      passSee: !that.data.passSee,
    })
  },
  btn_get_code:function(){
    var that = this;
    var phone = that.data.phone;
    that.setData({
      isCode: true
    })

    if(phone == ''){
      that.setData({
        toastData: '手机号不能为空',
        isToast: false,
        isCode: false
      })

      setTimeout(function(){
        that.setData({
          isToast: true
        })
      },2000)
    } else if (!isPhone.phone(phone)){
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
    }else{

      that.getLogin(phone, app.globalData.JSESSIONID);
    }

  },
  input_phone:function(e){
    if (e.detail.value == ''){
      e.detail.value = that.data.phone
    }
    this.setData({
      phone: e.detail.value
    })
  },
  getLogin: function (phone, JSESSIONID){
    var that = this;
    
    wx.request({
      url: url.codeLogin,
      data:{phone: phone},
      method:'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);
        
        if(res.data.status == 1){
          that.countDowm(that);
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }
      }
    })
  },
  btn_register:function(){
    this.setData({
      isViewDisabled: false
    })

    wx.navigateTo({
      url: '../register/register',
    })
  },
  btn_submit:function(e){
    console.log(e);
    var that = this;
    var item = e.detail.value;
    var typeNum = that.data.typeNum;

    that.setData({
      isViewDisabled: false
    })

    var JSESSIONID = app.globalData.JSESSIONID;
    console.log(item);
    console.log(that.data.phone)

    if (item.phone == '' & that.data.phone=='') {
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
    } else if (!isPhone.phone(item.phone)) {
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
    } else if (item.code == '') {
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

      if (typeNum == 1){
        that.codeLoginData(item, JSESSIONID);
      }else{
        that.pwdLoginData(item, JSESSIONID);
      }
      
   
    }
  },
  codeLoginData: function (item, JSESSIONID){
    var that = this;
    console.log(item);
    wx.request({
      url: url.phoneLogin,
      data: {
        phone: item.phone,
        verificCode: item.code
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          that.getMemberInformation(res.data.data.phone);
          app.globalData.phone = res.data.data.phone;
          app.globalData.personName = res.data.data.compellation;
          that.setData({
            toastData: '登录成功',
            isToast: false,
          })
          
          setTimeout(function () {
            that.setData({
              isToast: true
            })
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        } else {

          that.setData({
            toastData: res.data.msg,
            isToast: false,
            isViewDisabled: true,
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
  pwdLoginData: function (item, JSESSIONID){
    var that = this;
    console.log(item);
    wx.request({
      url: url.pwdLogin,
      data: {
        loginKey: item.phone,
        passwd: md5.hexMD5(item.pwd)
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          that.setData({
            toastData: '登录成功',
            isToast: false,
          })
          app.globalData.phone = res.data.data.phone;
          app.globalData.personName = res.data.data.compellation;
          that.getMemberInformation(res.data.data.phone);
          setTimeout(function () {
            that.setData({
              isToast: true
            })
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }else {

          that.setData({
            toastData: res.data.msg,
            isToast: false,
            isViewDisabled: true,
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
  },
  getMemberInformation: function (phone) {
    var that = this;
    console.log(phone);
    wx.request({
      url: url.getMemberInformation + phone,
      data: {
       
      },
      header: {
        clientId: constant.clientId,
        brandId: constant.brandId,
        // openId: app.globalData.openId
      },
      success: function (res) {
        console.log('++++++++++++++');
        console.log(res);

        if (res.data.code == 200) {

          app.globalData.Discount = res.data.data[0].discount
          app.globalData.memberId = res.data.data[0].id
          
        }
      }
    })
  }
})