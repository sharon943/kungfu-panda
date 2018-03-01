// pages/userInfromation/userInfromation.js
var app = getApp();
var url = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModal: true,
    sexPro: ['男','女'],
    userPro: '',
    name: '',
    title: '',
    typeNum: 1,
    userName:'',
    wxName: '',
    toastData: '',
    isToast: true,
    items: []
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '个人信息',
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  getUserInfoData: function (JSESSIONID) {
    var that = this;

    wx.request({
      url: url.getUserInformation,
      data: {

      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

       if (res.data.status == 1) {
          //   res.data.data.nickName = res.data.data.nickName.replace(/(.{3}).*(.{4})/, "$1****$2");

          that.setData({
            isLogin: 1,
            userPro: res.data.data,
          })
          if (that.data.userPro.sex==1){
            that.setData({
              items: [
                { name: '0', value: '先生', checked: 'true' },
                { name: '1', value: '女士' },
              ]
            })
          }else{
            that.setData({
              items: [
                { name: '0', value: '先生'},
                { name: '1', value: '女士', checked: 'true' },
              ]
            })
          }
       } else if (res.data.status == 9) {
         wx.navigateTo({
           url: '../login/login',
         })
       } else if (res.data.status == 11) {
         that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
       }
      }
    })
  },
  btn_user:function(){
    var that = this;

    var wxName = that.data.userPro.nickName;

    if (!wxName){
      wxName = '请输入用户名'
    }
    that.setData({
      // hiddenModal: false,
      wxName: wxName,
      title:'用户名',
      typeNum: 1
    })
  },
  btn_name:function(){

    var that = this;

    var wxName = that.data.userPro.compellation;

    if (!wxName) {
      wxName = '请输入姓名'
    }
    that.setData({
      // hiddenModal: false,
      wxName: wxName,
      title: '姓名',
      typeNum: 2
    })
  },

  editRemarkConfirm:function(e){
    console.log(e);
    var that = this;
    var userName = that.data.userName;
    var name = that.data.name;
    var JSESSIONID = app.globalData.JSESSIONID;
    var userPro = that.data.userPro;

    if (that.data.typeNum == 1){
      if (userPro.nickName){
        if (userName == '') {
          userName = userPro.nickName
        }
      }
        

        wx.request({
          url: url.setUserName,
          data: { newNickName: userName},
          method: 'POST',
          header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
          success:function(res){
            if(res.data.status == 1){
              that.getUserInfoData(JSESSIONID);
              that.setData({
                isToast: false,
                toastData: '修改成功',
                hiddenModal: true
              })

              setTimeout(function(){
                that.setData({
                  isToast: true,
                })

              },2000)

             
            } else if (res.data.status == 9) {
              wx.navigateTo({
                url: '../login/login',
              })
            } else if (res.data.status == 11) {
              that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
            }
          }
        })
      
    }else{
      if (userPro.compellation) {
        if (name == '') {
          name = userPro.compellation
        }
      }
     
        wx.request({
          url: url.setName,
          data: { newCompellation: name },
          method: 'POST',
          header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
          success: function (res) {
            if (res.data.status == 1) {
              that.getUserInfoData(JSESSIONID);
              that.setData({
                isToast: false,
                toastData: '修改成功',
                hiddenModal: true
              })

              setTimeout(function () {
                that.setData({
                  isToast: true,
                })

              }, 2000)


            } else if (res.data.status == 9) {
              wx.navigateTo({
                url: '../login/login',
              })
            } else if (res.data.status == 11) {
              that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
            }
          }
        })
      
    }
     
  },
  remarkInputChange:function(e){
    console.log(e);
    if(this.data.typeNum == 1){
      this.setData({
        userName: e.detail.value
      })
    }else{
      this.setData({
        name: e.detail.value
      })
    }
  },
  btn_sex:function(e){
      var that = this;
      var value = e.detail.value;
      console.log(value)
      var JSESSIONID = app.globalData.JSESSIONID;

      wx.request({
        url: url.setSex,
        data: { sex: parseInt(value) + 1 },
        method: 'POST',
        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
        success:function(res){
          if (res.data.status == 1) {
            that.getUserInfoData(JSESSIONID);
            that.setData({
              isToast: false,
              toastData: '修改成功',
              hiddenModal: true
            })

            setTimeout(function () {
              that.setData({
                isToast: true,
              })

            }, 2000)


          } else if (res.data.status == 9) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.data.status == 11) {
            that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
          }
        }
      })

      console.log(e);
  },
  btn_date:function(e){
    console.log(e);
    var that = this;

    var value = e.detail.value;

    var JSESSIONID = app.globalData.JSESSIONID;

    wx.request({
      url: url.setBirthday,
      data: { birthday: value },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (res.data.status == 1) {
          that.getUserInfoData(JSESSIONID);
          that.setData({
            isToast: false,
            toastData: '修改成功',
            hiddenModal: true
          })

          setTimeout(function () {
            that.setData({
              isToast: true,
            })

          }, 2000)


        }else if(res.data.status == 9){
          wx.navigateTo({
            url: '../login/login',
          })
        }else if(res.data.status == 11){
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }
      }
    })
  },
  setCacheData: function (openId, city, JSESSIONID,num = 0) {
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
  editRemarkCancel:function(){

      this.setData({
        hiddenModal: true
      })
  }
})