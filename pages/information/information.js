// pages/information/information.js
var app = getApp();
var url = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:null,
    orderMenu: null,
    id: 0,
    orderF: null,
    senderName: '',
    senderMobile: '',
    SenderView:true,
    orderlatitude: '',
    orderlongitude: '',
    iconPath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      id: options.id,
      statusName: options.statusName,
      iconPath: app.globalData.iconPath,
    })
    
    console.log(app.globalData.iconPath)
    console.log(that.data.iconPath)
    console.log(that.data.statusName)
    console.log(app.globalData.shopId)
    console.log(that.data.id)
    that.getOrderInformation(options.id, app.globalData.JSESSIONID);
    that.getMenuInformation(options.id, app.globalData.JSESSIONID);
    that.getSenderPosition(options.id);
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

      // if (that.data.id != 0){
      //   that.getOrderInformation(id, app.globalData.JSESSIONID);
      //   that.getMenuInformation(id, app.globalData.JSESSIONID);
      // }
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
  btn_refurbish: function () {
    console.log(11111);
    this.getOrderInformation(this.data.id, app.globalData.JSESSIONID);
    this.getMenuInformation(this.data.id, app.globalData.JSESSIONID);
  },
  btn_go_pay: function () {
    console.log(1111);
  },

  getOrderInformation: function (orderId, JSESSIONID){
    var that = this;

    wx.request({
      url: url.getOrderInformation,
      data:{
        orderId: orderId
      },
      method:'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success:function(res){
        console.log(res)
        if(res.data.status == 1){
          var item = res.data.data;
          item.name1 = item.storeName.substring(4, item.storeName.length);
          item.name1_ = item.storeName.substring(0, 4);
          that.setData({
            orderInfo: item,
            orderlatitude: item.latitude,
            orderlongitude: item.longitude,
          })
        } 
        console.log(that.data.orderInfo.progress)
        console.log(that.data.orderlatitude, that.data.orderlongitude);
        console.log(that.data.orderInfo)
        console.log(that.data.orderInfo.progress[0].statusName)
        console.log(that.data.senderMobile)
        for (var i = 0; i < that.data.orderInfo.progress.length;i++){
          console.log(that.data.senderMobile)
          console.log(that.data.orderInfo.progress[i].status)
        if (that.data.orderInfo.progress[i].status != -1 & that.data.senderMobile != undefined & that.data.senderMobile != null & that.data.senderMobile != '') {
          that.setData({
            SenderView: false,
          })
        } 
        console.log(that.data.SenderView)
      }
      }
    })
  },
  getMenuInformation: function (orderId, JSESSIONID){
    var that = this;


    wx.request({
      url: url.getOrderMenuInformation,
      data: {
        orderId: orderId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (res.data.status == 1) {
          var item = res.data.data;
          console.log(item)
          var itemF = item.discounts;
          for (var i = 0; i < itemF.length; i++) {
            var index = itemF[i].preferentialContent.indexOf('#');
            itemF[i].preferentialContent = itemF[i].preferentialContent.substring(index + 1, itemF[i].preferentialContent.length);
            var index1 = itemF[i].preferentialContent.indexOf('#');
            itemF[i].preferentialContent = itemF[i].preferentialContent.substring(0, index1);
            console.log(index);
            console.log(itemF[i].preferentialContent);
          }

          console.log(itemF);
          that.setData({
    
            orderMenu: item,
            orderF: itemF
          })
          console.log(that.data.orderF)
        } else if (res.data.status == 9) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
        }
        console.log(res);



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
        that.getOrderInformation(id, app.globalData.JSESSIONID);
        that.getMenuInformation(id, app.globalData.JSESSIONID);
      }
    })
  },

  btn_go_pay:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.request({
      url: url.getPay,
      data: {
        payType: 50,
        orderId: that.data.id,
        openId: app.globalData.openId,
        useEnvelope: 0,
        useWallet: 0
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          var item = res.data.data
          wx.requestPayment({
            timeStamp: item.timeStamp,
            nonceStr: item.nonceStr,
            package: item.package,
            signType: item.signType,
            paySign: item.paySign,
            success: function (res) {
              
              that.getOrderInformation(id, app.globalData.JSESSIONID);
              that.getMenuInformation(id, app.globalData.JSESSIONID);
            },
            fail: function () {
              

             
            }
          })
        }
      }
    })
  },
  btn_sender_position: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    // var value = e.detail.value
    var orderId = that.data.id
    that.getOrderInformation()
    console.log(app.globalData.shopId)
    console.log(that.data.orderlatitude, that.data.orderlongitude);
    wx.navigateTo({
      url: '../senderPosition/senderPosition?orderId=' + orderId + '&storeId=' + app.globalData.shopId + '&latitude=' + that.data.orderlatitude + '&longitude=' + that.data.orderlongitude,
    })
    console.log(app.globalData.extId)
  },
  getSenderPosition(orderId) {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var orderId = that.data.id
    console.log(orderId)
    wx.request({
      url: url.getSenderPosition,
      // url: 'https://qc.can-dao.com:7770/Action?actionId=1&serviceId=17&key=b8396b24f70ae5c3',
      data: {
        orderId: orderId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        that.setData({ 
          senderName: res.data.data.senderName,
          senderMobile: res.data.data.senderMobile
        });
      }
    })
  },
  btn_go_cancel:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      confirmColor:'#ffc600',
      // cancelColor:'#3d231a',
      confirmText:'确认',
      success:function(res){
        console.log(res);

        if (res.confirm){
          
          wx.request({
            url: url.cancelOrder,
            data:{
              orderId: that.data.id 
            },
            method:'POST',
            header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
            success:function(res){
              console.log(res);
              if(res.data.status == 1){

                wx.request({
                  url: url.cancelOrderVk + that.data.id,
                  header: {
                    clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
                    storeId: app.globalData.extId,
                  },
                  success:function(res){
                    console.log(res);
                  }
                })
                console.log(app.globalData.extId)
                
                that.getOrderInformation(that.data.id, app.globalData.JSESSIONID);
                that.getMenuInformation(that.data.id, app.globalData.JSESSIONID);
              }
            }
          })
        }
      }
    })
  },
  btn_go_confirm:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.request({
      url: url.confirmOrder,
      data: {
        orderId: that.data.id
      },
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {

          wx.request({
            url: url.confirmOrderVk + that.data.id,
            header: {
              clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
              storeId: app.globalData.extId,
            },
            success: function (res) {
              console.log(res);
            }
          })
          that.getOrderInformation(that.data.id, app.globalData.JSESSIONID);
          that.getMenuInformation(that.data.id, app.globalData.JSESSIONID);
        }
      }
    })
  },
  
  
})