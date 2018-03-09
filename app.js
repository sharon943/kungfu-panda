//app.js
let url = require('/utils/url.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
        //登录态过期
        wx.login({
          success: res => {
            console.log(res);
            wx.request({
              url: url.getOpenId + '&code=' + res.code,
              data: {},
              method: 'POST',
              success: resOp => {
                console.log(resOp);

                if (resOp.data.status == 1) {

                  console.log(resOp.header);
                  this.globalData.openId = resOp.data.data.openid;
                  this.globalData.session_key = resOp.data.data.session_key;
                  this.globalData.JSESSIONID = resOp.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
                  if (this.openIdReadyCallback) {
                    this.openIdReadyCallback(resOp.data.data.openid)
                  }
                }

              }

            })
          }
        })
      
    

    


    // 登录

    // 获取用户信息
    wx.getSetting({
      success: res => {

        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log(2222);
                this.userInfoReadyCallback(res)
              }

              if (!res.authSetting['scope.userLocation']) {
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    customInfo: [],
    payConfirm: 0,
    shopId: 172,
    MenuUrl: '',
    menuPro: {},
    allpro: { 'menuNum': 0, 'menuPrice': 0},
    XHNum: '',
    shopImg: '',
    shopName: '',
    JSESSIONID: '',
    sendMoney: '',
    address: '',
    locationAddress: null,
    addressObj: null,
    longitude: null,
    latitude: null,
    typeValue: 1,
    timeValue: 0,
    cityName: null,
    menuProArray: {},
    sendAddress: null,
    shopId: '',
    memberId: null,//会员id
    extId: '',//第三方门店ID
    phone: null,
    revisePro: null,
    specialOfferPrice: 0,
    onlinePay: 3,
    typePro: {},
    adressName: '',
    adressPhone:'',
    addressJ:'',
    isAddress: 0,
    isInvoice: true,//是否开发票
    invoiceType: null,
    meailFee: 0,
    isAddressOne: false,
    oIndex: 0,
    tIndex: 0,
    sIndex: 0,
    shopAddress: null,
    shopLat: 0,
    shopLng: 0,
    personName: '',
    session_key:'',
    Phone:'',
    isIpx: false,
  }
  
  
})

//SYPBZ-LEW6S-HMHOC-6A7SV-4S6RF-RTBMX 腾讯地图开发key