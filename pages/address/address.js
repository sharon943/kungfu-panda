// pages/address/address.
var app = getApp();
const url = require('../../utils/url.js');
var moveXList = [0, 0]//X轴移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    addressPro:[],
    isViewDisabled: true,
    isToast: true,
    toastData: '',
    isLoading: false,
    typeNum: 0,
    isNotAddress: true,
    Rewite:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.locationAddress = null;
    app.globalData.addressObj = null;
    app.globalData.adressName = '';
    app.globalData.adressPhone = '';
    app.globalData.addressJ = '';
    app.globalData.revisePro = null;

    if (options.typeNum){
      that.setData({
        typeNum: options.typeNum
      })
    }

    wx.setNavigationBarTitle({
      title: '我的地址',
    })
    console.log(app.globalData.shopId);
    
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
    that.getAllAdress(app.globalData.JSESSIONID);
    that.setData({
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
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.addressPro.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      addressPro: this.data.addressPro
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.addressPro.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      addressPro: that.data.addressPro
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  getAllAdress: function (JSESSIONID){
    var that = this;
    that.setData({
      isLoading: false
    })

    wx.request({
      url: url.getAddressDataBase,
      data:{},
      method:'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res);
        // res.data.data[0].isDefault=1
        if (res.data.status == 1){
          if(!res.data.data){
            that.setData({
              addressPro: [],
              isLoading: true
            })
          }
            that.setData({
              addressPro: res.data.data,
              isLoading: true
            })
        } else if (res.data.status == 9) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
        }else{
          that.setData({
            isLoading: true,
            addressPro: []
          })
          
        }
      }
    })
  },
  btn_add_adress:function(){
    var that = this;

    that.setData({
      isViewDisabled: false
    })

    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  btn_get_write:function(){
    var that = this;

    that.setData({
      Rewite: true,
    })
  },
  btn_get_finish:function(){
    var that = this;

    that.setData({
      Rewite: false,
    })
    console.log(that.data.Rewrite)
  },
  btn_get_cancel:function(){
    
  },
  btn_delete: function(e){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    console.log(e);
    that.setData({
      isViewDisabled: false
    })
    wx.showModal({
      title: '删除地址',
      content: '确认要删除改地址',
      confirmColor: '#ffc600',
      // cancelColor:'#3d231a',
      confirmText: '确认',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
        
          wx.request({
            url: url.deleteAddress,
            data: { addressId: e.currentTarget.dataset.info.aid },
            method: 'POST',
            header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
            success: function (res) {
              that.setData({
                isViewDisabled: true
              })
              if (res.data.status == 1) {
                console.log('+++++++++++++++++++++++++++++++');
                that.getAllAdress(JSESSIONID);
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
      }
    })
  },
  btn_revise:function(e){
    console.log('++++++++++++++++');
    var that = this;
    that.setData({
      isViewDisabled: false
    })

   wx.navigateTo({
     url: '../addressRevise/addressRevise?info=' + JSON.stringify(e.currentTarget.dataset.info),
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
            that.getAllAdress(app.globalData.JSESSIONID);
          }

          that.setData({
            isViewDisabled:true
          })
      }
    })
  },
  btn_infomartion:function(e){
    var that =  this;
    if (that.data.typeNum == 1) {
    that.getDefaultData(e);
    }
  },
  getDefaultData: function (e) {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var item = e.currentTarget.dataset.info;
    console.log(e);
    console.log(app.globalData.shopId);
    wx.request({
      url: url.getDefault,
      data: {
        storeId: app.globalData.shopId,
        cityName: item.cityName,
        longitude: item.longitude,
        latitude: item.latitude
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1 & res.data.data != undefined){
          if ( res.data.data.storeId == app.globalData.shopId){
          // that.setData({
          //   sendAddress
          // })
          app.globalData.sendAddress = item;
              wx.navigateBack({
                delta: 1
              })
          }else{
            that.setData({
              isNotAddress: false
            })
          }
        } else if (res.data.status == 9) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        }else{
          that.setData({
            isNotAddress: false
          })
        } 
      }
    })

  },
  btn_addres_confirm:function(){

    this.setData({
      isNotAddress: true
    })
  }

})