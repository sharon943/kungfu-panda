// pages/send/send.js
var app = getApp();
const url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
var isPhone = require('../../utils/isPhone.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remarkBox:false, // 备注框  yly添加
    beizhu:'',
    hiddenModal: true,
    menuPro: {},
    allMenu: {},
    orderRemark: '',
    TimeInfo: [{ id: 1, text: '微信在线支付' }, { id: 2, text: '现金支付' }],
    TimeMethodIndex: 0,

    ZHNum: '',
    shopName: '',
    shopImg: '',
    addressNum: 0,
    addressObj: null,
    menuId: null,
    payId: 2,
    moneyAll: 0,
    toastData: '',
    isToast: true,
    timeValue: null,
    typeValue: null,
    goodsMoney: 0,
    sendMoney: 0,
    isViewDisabled: true,
    shopId: null,
    memberInformation: null,
    specialOfferPrice: 0,
    PreferentialActivitiesPro: {},
    discountObj: { 'price': 0 },
    onlinePay: true,
    remarks: '',
    isInvoice: true,
    invoiceType: null,
    isInvoiceName: false,
    isYE: false,
    couponPro: [{ 'name': '不使用优惠券', 'id': -1 }],
    couponIndex: 0,
    cardNo: 0,
    ye: 0,
    isLoading: false,
    couponObj: {},
    goodsMenus: 0,
    syGoodsPrice: 0,
    meailFeeMoney: 0,
    yhPro: [],
    personName: '',
    personPhone: '',
    shopAddress: null,
    shopLat: 0,
    shopLng: 0,
    isJD: false,
    f_p_1: '',
    f_p_2: '',
    invoiceId: -1,
    discountNamePro: [],
    discountProType1: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    console.log(app.globalData.personName);
    console.log(app.globalData.typeValue);
    this.setData({
      menuPro: app.globalData.menuPro,
      allMenu: app.globalData.allpro,
      ZHNum: app.globalData.XHNum,
      shopName: app.globalData.shopImg,
      shopImg: app.globalData.shopName,
      shopId: options.shopId ? options.shopId : app.globalData.shopId,
      menuId: options.menuId,
      moneyAll: options.money,
      timeValue: app.globalData.timeValue,
      typeValue: app.globalData.typeValue,
      goodsMoney: options.goodsMoney,
      sendMoney: app.globalData.sendMoney,
      specialOfferPrice: app.globalData.specialOfferPrice,
      onlinePay: app.globalData.onlinePay,
      isInvoice: app.globalData.isInvoice,
      goodsMenus: options.goodsMoney,
      meailFeeMoney: app.globalData.meailFee,
      shopAddress: app.globalData.shopAddress,
      shopLat: app.globalData.shopLat,
      shopLng: app.globalData.shopLng,
      personPhone: app.globalData.phone,
      personName: app.globalData.personName
    })

    this.getInvoice();

    if (app.globalData.typeValue != 2) {
      this.getAllAdress(app.globalData.JSESSIONID, options.shopId ? options.shopId : app.globalData.shopId, options.money);
    }


    console.log(options.shopId);
    console.log(this.data.shopId)


    this.getActivityData(options.shopId ? options.shopId : app.globalData.shopId, options.goodsMoney, options.money);



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

    that.setData({
      isViewDisabled: true
    })

    if (app.globalData.sendAddress) {
      that.setData({
        addressObj: app.globalData.sendAddress
      })

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

  },
  editRemark: function () {
    //var orderRemarkTemp = ;
    this.setData({
      hiddenModal: false,
      orderRemarkPre: this.data.orderRemark
    })
  },
  editRemarkCancel: function () {
    var orderRemarkTemp = this.data.orderRemarkPre;
    this.setData({
      hiddenModal: true,
      orderRemark: orderRemarkTemp
    })
  },
  editRemarkConfirm: function () {
    var orderRemarkTemp = this.data.orderRemark;
    if (orderRemarkTemp == "") orderRemarkTemp = "填写订单备注";
    this.setData({
      hiddenModal: true,
      orderRemark: orderRemarkTemp
    })
  },
  remarkInputChange: function (event) {
    this.setData({
      orderRemark: event.detail.value
    })
  },
  TimeMethodPickerChange: function (e) {
    console.log(e);
    this.setData({
      TimeMethodIndex: e.detail.value
    })
  },
  getAllAdress: function (JSESSIONID, shopId) {
    var that = this;

    wx.request({
      url: url.getAddressDataBase,
      data: {},
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log("++++++++++++++++++");
        console.log(res);

        if (res.data.status == 1) {
          if (res.data.data) {
            console.log('+++++++++++55555555555+++++++++++++++');
            console.log(JSON.parse(JSON.stringify(res.data.data)));
            that.getDefaultData(res.data.data, JSESSIONID, shopId);

          }
        }
      }
    })
  },
  getDefaultData: function (addressPro, JSESSIONID, shopId) {
    var that = this;
    var addressNum = that.data.addressNum;

    wx.request({
      url: url.getDefault,
      data: {
        storeId: shopId,
        cityName: addressPro[addressNum].cityName,
        longitude: addressPro[addressNum].longitude,
        latitude: addressPro[addressNum].latitude
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        addressNum++;

        that.setData({
          addressNum: addressNum
        })

        if (addressNum == addressPro.length) {
          console.log('-------------没有数据了');
          console.log(res);

          if (res.data.data) {
            that.setData({
              addressObj: addressPro[addressNum - 1]
            })
          }
          return;
        } else {
          console.log('11111111111111');
          console.log(res);
          if (res.data.data) {
            console.log(addressPro[addressNum - 1]);
            that.setData({
              addressObj: addressPro[addressNum - 1]
            })
            return;
          } else {
            console.log('++++++++++++++错误地址++++++++++');
            console.log(res);
            that.getDefaultData(addressPro, JSESSIONID, shopId);
          }
        }

      }
    })

  },
  btn_send: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var addressObj = that.data.addressObj;
    var shopId = that.data.shopId;
    var menuPro = JSON.parse(JSON.stringify(that.data.menuPro));
    var menuId = that.data.menuId;
    var menuArray = [];
    var timeValue = that.data.timeValue;
    var typeValue = that.data.typeValue;
    var typeName = 0;
    var payId = that.data.payId;
    var remarks = that.data.remarks;
    var isInvoiceName = that.data.isInvoiceName;
    var invoiceType = that.data.invoiceType;
    var invoiceId = that.data.invoiceId;
    var discountObj = that.data.discountObj;
    var discountPro = [];
    var couponObj = that.data.couponObj;
    var couponIndex = that.data.couponIndex;
    var isYE = that.data.isYE;
    var memberInformation = that.data.memberInformation;
    var sendMoney = that.data.sendMoney;
    var moneyAll = that.data.moneyAll;
    var personName = that.data.personName;
    var personPhone = that.data.personPhone;
    var shopAddress = that.data.shopAddress;
    var shopLat = that.data.shopLat;
    var shopLng = that.data.shopLng;
    var f_p_1 = that.data.f_p_1;
    var f_p_2 = that.data.f_p_2;
    var isJD = that.data.isJD;
    var discountNamePro = that.data.discountNamePro;

    console.log(sendMoney+'000000');

    console.log(invoiceId);
    console.log(discountObj);
    console.log(couponObj);
    that.setData({
      isViewDisabled: false,
      isLoading: false
    })

    if (typeValue == 2) {


      if (personName == '') {
        that.setData({
          isViewDisabled: true,
          isLoading: true
        })

        wx.showModal({
          title: '提示',
          content: '您没有输入姓名',
          confirmColor: '#ffc600',
          confirmText: '确认',
          success: function (res) {

          }
        })
      } else if (personPhone == '') {
        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '您没有输入联系电话',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
      } else if (!isPhone.phone(personPhone)) {
        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '手机号格式不对',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
      } else if (isJD && f_p_1 == '') {

        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '请输入个人或公司的抬头',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
        return;
      } else if (f_p_2 == '' && isJD) {
        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '请输入税号或社会信用代码',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
        return;
      } else {

        if (memberInformation['discount'] < 10) {
          var memberObj1 = {};
          memberObj1['rate'] = memberInformation['discount'];

          memberObj1['prePrice'] = -memberInformation['discountPrice'] / 100

          memberObj1['content'] = 0 + '#' + 'levelDiscount' + '#' + memberInformation['discount'] + '折'

          discountPro.push(memberObj1);
        }

        if (discountNamePro.length > 0) {

          var memberObjD = {};
          memberObjD['prePrice'] = discountNamePro[0].value;
          memberObjD['content'] = discountNamePro[0].pid+ '#' + 'promotions' + '#' + discountNamePro[0]['title'];
          discountPro.push(memberObjD);
          console.log(discountPro);
        }

        if (isYE) {
          var memberObj = {};
          memberObj['prePrice'] = - memberInformation['yh_price'] / 100;
          memberObj['content'] = 0 + '#' + 'card' + '#¥' + memberInformation['discountPrice'] / 100;
          discountPro.push(memberObj);
        }

        if (discountObj.price != 0) {
          discountObj['prePrice'] = - discountObj['price'] / 100;
            discountObj['content'] = discountObj['pid'] + '#' + 'promotions' + '#' + discountObj['title'];

          discountPro.push(discountObj);
        }

        if (couponIndex > 0) {
          couponObj['prePrice'] = - couponObj.couponPrice;
          couponObj['content'] = couponObj.id + '#' + couponObj['couponType'] + '#' + couponObj.name;

          discountPro.push(couponObj);
          console.log(discountPro);
        }

        console.log(JSON.stringify(menuPro));

        console.log(menuPro);

        for (var i in menuPro) {
          menuPro[i]['pid'] = menuPro[i].id;

          menuPro[i]['price'] = menuPro[i].price / 100;
          menuArray.push(menuPro[i]);
        }
        for (var z = 0; z < menuArray.length; z++) {

          if (menuArray[z].listRequirements) {

            menuArray[z].listRequirements[0]['index'] = z;
            menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
          }
        }
        console.log(menuArray);

        if (typeValue == 3) {
          typeName = 4;
        } else {
          typeName = typeValue;
        }


        var requestData = {};

        if (invoiceId == 2) {
          if (isJD) {
            requestData = {
              longitude: shopLng,
              latitude: shopLat,
              storeId: shopId,
              name: personName,
              phone: personPhone,
              address: shopAddress,
              type: typeName,
              paytype: payId,
              randomCode: that.getNowDate(),
              menuId: menuId,
              products: menuArray,
              userNote: remarks,
              isInvoice: that.data.isInvoice,
              invoiceType: invoiceId,
              selfGetTime: timeValue,
              manualPreferentials: discountPro,
              invoiceDesc: f_p_2,
              taxNo: f_p_1
            }
          }

        } else {

          requestData = {
            longitude: shopLng,
            latitude: shopLat,
            storeId: shopId,
            name: personName,
            phone: personPhone,
            address: shopAddress,
            type: typeName,
            paytype: payId,
            randomCode: that.getNowDate(),
            menuId: menuId,
            products: menuArray,
            userNote: remarks,
            isInvoice: that.data.isInvoice,
            invoiceType: invoiceId,
            selfGetTime: timeValue,
            manualPreferentials: discountPro

          }
        }



        wx.request({
          url: url.getSendOrder,
          data: requestData,
          method: 'POST',
          header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
          success: function (res) {
            console.log(res);

            console.log(payId);

            if (res.data.status == 1 && payId == 2) {
              var orderId = res.data.data.orderId;

              wx.request({
                url: url.getOrderInformation,
                data: {
                  orderId: orderId
                },
                method: 'POST',
                header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                success: function (orderInfo) {
                  console.log('++++++++++');
                  console.log(orderInfo);
                  if (orderInfo.data.status == 1) {

                    if (orderInfo.data.data.progress[0].status == 1) {
                      wx.request({
                        url: url.getPay,
                        data: {
                          payType: 50,
                          orderId: orderId,
                          openId: app.globalData.openId,
                          // useuserWalletEnvelope: 0,
                          // useWallet: 
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
                                console.log(res);
                                app.globalData.menuPro = {};
                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                app.globalData.menuProArray = {};
                                app.globalData.sendAddress = null;
                                app.globalData.specialOfferPrice = 0;
                                app.globalData.typePro = {};
                                app.globalData.meailFee = 0;
                                wx.redirectTo({
                                  url: '../information/information?id=' + orderId,
                                })
                              },
                              fail: function () {
                                console.log(1111);
                                app.globalData.menuPro = {};
                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                app.globalData.menuProArray = {};
                                app.globalData.sendAddress = null;
                                app.globalData.specialOfferPrice = 0;
                                app.globalData.typePro = {};
                                app.globalData.meailFee = 0;
                                wx.redirectTo({
                                  url: '../information/information?id=' + orderId,
                                })
                              }
                            })

                          } else {
                            that.setData({
                              isViewDisabled: true,
                              isLoading: true
                            })

                            if (payId == 1) {
                              app.globalData.menuPro = {};
                              app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                              app.globalData.menuProArray = {};
                              app.globalData.sendAddress = null;
                              app.globalData.specialOfferPrice = 0;
                              app.globalData.typePro = {};
                              app.globalData.meailFee = 0;
                              wx.redirectTo({
                                url: '../information/information?id=' + orderId,
                              })
                            } else {
                              wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                confirmColor: '#ffc600',
                                confirmText: '确认',
                                showCancel: false,
                                success: function (res) {

                                }
                              })
                            }
                          }

                        }
                      })
                    } else {

                      that.setData({
                        isViewDisabled: true,
                        isLoading: true
                      })

                      app.globalData.menuPro = {};
                      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                      app.globalData.menuProArray = {};
                      app.globalData.sendAddress = null;
                      app.globalData.specialOfferPrice = 0;
                      app.globalData.typePro = {};
                      app.globalData.meailFee = 0;
                      wx.redirectTo({
                        url: '../information/information?id=' + orderId,
                      })

                    }
                  }
                }
              })


            } else {

              that.setData({
                isViewDisabled: true,
                isLoading: true
              })


              if (payId == 1) {
                var orderId = res.data.data.orderId;
                app.globalData.menuPro = {};
                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                app.globalData.menuProArray = {};
                app.globalData.sendAddress = null;
                app.globalData.specialOfferPrice = 0;
                app.globalData.typePro = {};
                app.globalData.meailFee = 0;
                wx.redirectTo({
                  url: '../information/information?id=' + orderId,
                })
              } else {

                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  confirmColor: '#ffc600',
                  confirmText: '确认',
                  success: function (res) {

                  }
                })
              }

            }

          }
        })
      }
    } else {
      if (!addressObj) {
        that.setData({
          toastData: '当前没有配送地址',
          isToast: false,
          isViewDisabled: true,
          isLoading: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      } else if (isJD && f_p_1 == '') {

        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '请输入个人或公司的抬头',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
        return;
      } else if (f_p_2 == '' && isJD) {
        that.setData({
          isViewDisabled: true,
          isLoading: true
        })
        wx.showModal({
          title: '提示',
          content: '请输入税号或社会信用代码',
        })

        return;
      } else {

        if (memberInformation['discount'] < 10) {
          var memberObj1 = {};
          memberObj1['rate'] = memberInformation['discount'];

          memberObj1['prePrice'] = -memberInformation['discountPrice'] / 100

          memberObj1['content'] = 0 + '#' + 'levelDiscount' + '#' + memberInformation['discount'] + '折'

          discountPro.push(memberObj1);
        }
        console.log(discountNamePro)

        if (discountNamePro.length > 0) {
          for (var i = 0; i < discountNamePro.length;i++){
            var memberObjD = {};
            memberObjD['prePrice'] = - discountNamePro[i].value;
            memberObjD['productName'] = discountNamePro[i].productName;
            memberObjD['content'] = discountNamePro[i].pid + '#' + 'promotions' + '#' + discountNamePro[i].title;
            discountPro.push(memberObjD);
          }
          console.log(discountPro);
        }


        if (isYE) {
          var memberObj = {};
          memberObj['prePrice'] = - memberInformation['yh_price'] / 100;
          memberObj['content'] = 0 + '#' + 'card' + '#¥' + memberInformation['discountPrice'] / 100;
          discountPro.push(memberObj);
        }

        if (discountObj.price != 0) {
          discountObj['prePrice'] = - discountObj['price'] / 100;
            discountObj['content'] = discountObj['pid'] + '#' + 'promotions' + '#' + discountObj['title'];

          discountPro.push(discountObj);
          console.log(memberObjD);
        }

        if (couponIndex > 0) {
          couponObj['prePrice'] = - couponObj.couponPrice;
          couponObj['content'] = couponObj.id + '#' + couponObj['couponType'] + '#' + couponObj.name;

          discountPro.push(couponObj);
        }

        console.log(JSON.stringify(menuPro));

        console.log(menuPro);
        for (var i in menuPro) {
          menuPro[i]['pid'] = menuPro[i].id;

          menuPro[i]['price'] = menuPro[i].price / 100;
          menuArray.push(menuPro[i]);
        }
        for (var z = 0; z < menuArray.length; z++) {

          if (menuArray[z].listRequirements) {

            menuArray[z].listRequirements[0]['index'] = z;
            menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
          }
        }
        console.log(menuArray);

        if (typeValue == 3) {
          typeName = 4;
        } else {
          typeName = typeValue;
        }


        var requestData = {};
        console.log(discountPro);
        console.log(addressObj);

        if (invoiceId == 2) {
          if (isJD) {
            requestData = {
              longitude: shopLng,
              latitude: shopLat,
              storeId: shopId,
              name: personName,
              phone: personPhone,
              address: shopAddress,
              type: typeName,
              paytype: payId,
              randomCode: that.getNowDate(),
              menuId: menuId,
              products: menuArray,
              userNote: remarks,
              isInvoice: that.data.isInvoice,
              invoiceType: invoiceId,
              selfGetTime: timeValue == 0 ? '' : timeValue,
              manualPreferentials: discountPro,
              invoiceDesc: f_p_2,
              taxNo: f_p_1
            }
          }

        } else {

          requestData = {
            longitude: addressObj.longitude,
            latitude: addressObj.latitude,
            storeId: shopId,
            name: addressObj.receiverName,
            phone: addressObj.receiverPhone,
            address: addressObj.receiverAddress + addressObj.appendReceiverAddress,
            appendAddress: addressObj.appendReceiverAddress,
            type: typeName,
            paytype: payId,
            randomCode: that.getNowDate(),
            menuId: menuId,
            products: menuArray,
            userNote: remarks,
            isInvoice: that.data.isInvoice,
            invoiceType: invoiceId,
            selfGetTime: timeValue == 0 ? '' : timeValue,
            manualPreferentials: discountPro
          }
        }

        console.log(requestData);
        wx.request({
          url: url.getSendOrder,
          data: requestData,
          method: 'POST',
          header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
          success: function (res) {
            console.log(res);
            if (res.data.status == 1 && payId == 2) {
              var orderId = res.data.data.orderId;

              wx.request({
                url: url.getOrderInformation,
                data: {
                  orderId: orderId
                },
                method: 'POST',
                header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                success: function (orderInfo) {
                  console.log('++++++++++');
                  console.log(orderInfo);
                  if (orderInfo.data.status == 1) {

                    if (orderInfo.data.data.progress[0].status == 1) {
                      wx.request({
                        url: url.getPay,
                        data: {
                          payType: 50,
                          orderId: orderId,
                          openId: app.globalData.openId,
                          // useuserWalletEnvelope: 0,
                          // useWallet: 
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
                                console.log(res);
                                app.globalData.menuPro = {};
                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                app.globalData.menuProArray = {};
                                app.globalData.sendAddress = null;
                                app.globalData.specialOfferPrice = 0;
                                app.globalData.typePro = {};
                                app.globalData.meailFee = 0;
                                wx.redirectTo({
                                  url: '../information/information?id=' + orderId,
                                })
                              },
                              fail: function () {
                                console.log(1111);
                                app.globalData.menuPro = {};
                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                app.globalData.menuProArray = {};
                                app.globalData.sendAddress = null;
                                app.globalData.specialOfferPrice = 0;
                                app.globalData.typePro = {};
                                app.globalData.meailFee = 0;
                                wx.redirectTo({
                                  url: '../information/information?id=' + orderId,
                                })
                              }
                            })

                          } else {
                            that.setData({
                              isViewDisabled: true,
                              isLoading: true
                            })

                            if (payId == 1) {
                              app.globalData.menuPro = {};
                              app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                              app.globalData.menuProArray = {};
                              app.globalData.sendAddress = null;
                              app.globalData.specialOfferPrice = 0;
                              app.globalData.typePro = {};
                              app.globalData.meailFee = 0;
                              wx.redirectTo({
                                url: '../information/information?id=' + orderId,
                              })
                            } else {
                              wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false,
                                confirmColor: '#ffc600',
                                confirmText: '确认',
                                success: function (res) {

                                }
                              })
                            }
                          }

                        }
                      })
                    } else {

                      that.setData({
                        isViewDisabled: true,
                        isLoading: true
                      })

                      app.globalData.menuPro = {};
                      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                      app.globalData.menuProArray = {};
                      app.globalData.sendAddress = null;
                      app.globalData.specialOfferPrice = 0;
                      app.globalData.typePro = {};
                      app.globalData.meailFee = 0;
                      wx.redirectTo({
                        url: '../information/information?id=' + orderId,
                      })

                    }
                  }
                }
              })


            } else {

              that.setData({
                isViewDisabled: true,
                isLoading: true
              })


              if (payId == 1) {
                var orderId = res.data.data.orderId;
                app.globalData.menuPro = {};
                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                app.globalData.menuProArray = {};
                app.globalData.sendAddress = null;
                app.globalData.specialOfferPrice = 0;
                app.globalData.typePro = {};
                app.globalData.meailFee = 0;
                wx.redirectTo({
                  url: '../information/information?id=' + orderId,
                })
              } else {

                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  confirmColor: '#ffc600',
                  confirmText: '确认',
                  success: function (res) {

                  }
                })
              }

            }

          }
        })
      }
    }





  },
  btn_address: function () {
    this.setData({
      isViewDisabled: true
    })

    wx.navigateTo({
      url: '../address/address?typeNum=1',
    })
  },
  strToDate(dateObj) {
    dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
    dateObj = dateObj.slice(0, dateObj.indexOf("."))
    return new Date(dateObj)
  },
  getNowDate: function () {
    var myDate = new Date();

    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();        //获取当前日(1-31)
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    var second = myDate.getSeconds();     //获取当前秒数(0-59)
    myDate.toLocaleDateString();     //获取当前日期
    var mytime = myDate.toLocaleTimeString();     //获取当前时间
    return year + '' + month + '' + day + '' + hour + '' + minutes + '' + second;
  },

  getActivityData: function (shopId, money, moneyAll) {
    console.log(1111);
    var that = this;
    var menuPro = app.globalData.menuPro;

    var menuProId = '';
    for (var i in menuPro) {
      if (menuPro[i].id) {
        menuProId += menuPro[i].id + ',';
      }


    }
    menuProId = menuProId.substring(0, menuProId.length - 1);

    wx.request({
      url: url.getActivityLib + '/' + app.globalData.memberId,
      data: {},
      header: {
        clientId: constant.clientId,
        storeId: app.globalData.extId,
        productsPosId: menuProId
      },
      success: function (res) {
        console.log(res);

        if (res.data.code == 200) {
          var price = 0;
          var item = res.data.data;
          var discountObj = { 'price': 0 };
          console.log(money);
          var indexNum = 0;
          var discountPro = [];
          var zKMoney = 0;
          var PreferentialActivitiesPro = {};
          var discountProType1 = {};
          for (var i = 0; i < item.length; i++) {

            if (item.length > 0) {

              if (item[i].type == 3) {
                console.log(item[i]);
                console.log('测试3');
                PreferentialActivitiesPro = item[i]
                if (item[i].moneyOff) {

                  for (var z = 0; z < item[i].moneyOff.length; z++) {

                    if (money / 100 >= item[i].moneyOff[z].moneyCondition) {
                      if (price < item[i].moneyOff[z].discount) {
                        price = item[i].moneyOff[z].discount;
                        discountObj['price'] = item[i].moneyOff[z].discount * 100;
                        discountObj['moneyCondition'] = item[i].moneyOff[z].moneyCondition;
                        discountObj['name'] = item[i].moneyOff[z].ruleDetail;
                        discountObj['pid'] = item[i].id;
                        discountObj['type'] = item[i].type;
                        discountObj['title'] = item[i].title;
                      }
                    }
                  }
                }
              } else if (item[i].type == 1) {
                discountProType1 = item[i];
                if (money >= item[i].moneyCondition * 100){
                
                if (item[i].productsBonus.bonusProducts.length > 0) {

                  for (var j = 0; j < item[i].productsBonus.bonusProducts.length; j++) {
                    
                    var discountObj1 = {};
                    discountObj1 = item[i].productsBonus.bonusProducts[j];
                    discountObj1['title'] = item[i].title;
                    discountObj1['pid'] = item[i].id;
                    discountObj1['moneyCondition'] = item[i].moneyCondition;
                    discountPro.push(discountObj1);
                  }
                }
                }
              } else if (item[i].type == 5) {


                for (var a = 0; a < item[i].productsBonus.bonusProducts.length; a++) {

                  if (item[i].productsBonus.bonusProducts[a].discountType == 0) {

                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {
                        zKMoney += parseInt(menuPro[k].price * menuPro[k].num - menuPro[k].price * item[i].productsBonus.bonusProducts[a].value * menuPro[k].num/10);

                      }
                    }
                  } else if (item[i].productsBonus.bonusProducts[a].discountType == 1) {
                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {
                        zKMoney += parseInt(item[i].productsBonus.bonusProducts[a].value * 100 * menuPro[k].num);
                      }
                    }
                  } else if (item[i].productsBonus.bonusProducts[a].discountType == 2) {

                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {
                        
                        zKMoney += parseInt(menuPro[k].price * menuPro[k].num - item[i].productsBonus.bonusProducts[a].value * 100 * menuPro[k].num);
                        console.log(zKMoney);
                      }
                    }
                    
                  }

                }
                console.log('测试1');
                console.log(zKMoney);


                if (zKMoney > 0) {
                  console.log(zKMoney);
                  
                  discountObj['price'] = parseInt(zKMoney);
                  discountObj['pid'] = item[i].id;
                  discountObj['type'] = item[i].type;
                  discountObj['title'] = item[i].title;
                }
              }
            }
          }
          console.log(99999999);
          console.log(money);
          //清除线金额的计算
          if (app.globalData.typeValue == 2) {
            that.setData({
              specialOfferPrice: parseInt(money) + parseInt(app.globalData.meailFee)
            })
          } else {

            that.setData({
              specialOfferPrice: parseInt(money) + parseInt(app.globalData.sendMoney) + parseInt(app.globalData.meailFee)
            })
          }
          var syGoodsPrice = 0;
          if (discountObj.price > 0) {
            if (discountObj.type == 5) {
              syGoodsPrice = parseInt(money - zKMoney);

            } else {
              
              syGoodsPrice = that.accSub(money, discountObj.price);
              console.log(syGoodsPrice);
            }
          } else {
            
            syGoodsPrice = that.accSub(money, discountObj.price);
            console.log(syGoodsPrice);
          }
          console.log(syGoodsPrice);
          console.log(5555555);
          
          console.log(discountObj);

          var discountProType2 = [];
          if (discountPro.length > 0){
            for (var y = 0; y < discountPro.length; y++) {
              console.log(syGoodsPrice);
              console.log(discountPro[y].moneyCondition);
              if (syGoodsPrice >= discountPro[y].moneyCondition * 100) {
                discountProType2.push(discountPro[y]);
              }
            }
          }
          console.log(discountProType2);
          console.log(syGoodsPrice);
          that.getMemberInformation(syGoodsPrice, app.globalData.phone);
         
          if (discountObj != undefined && discountObj.title != undefined && discountObj.title.length>15){
            discountObj.title = discountObj.title.substring(0, 15) + '...'
          }
          
          
          that.setData({
            PreferentialActivitiesPro: PreferentialActivitiesPro,
            discountObj: discountObj,
            discountNamePro: discountProType2,
            discountProType1: discountProType1
          })
          console.log(that.data.discountProType2)

        } else {
          that.setData({
            PreferentialActivitiesPro: [],
            isLoading: true
          })
        }
      }


    })
  },
  getMemberInformation: function (syGoodsPrice, phone) {
    var that = this;
    console.log(phone);
    console.log(222222222);

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
        console.log(res);

        if (res.data.code == 200) {
          var syGoodsPriceTemp = syGoodsPrice;
          app.globalData.memberId = res.data.data[0].id;
          var couponPro = that.data.couponPro;

          for (var i = 0; i < res.data.data[0].coupons.length; i++) {
            if (res.data.data[0].coupons[i].useStores) {
              if (res.data.data[0].coupons[i].useStores.indexOf(app.globalData.extId) > -1) {
                couponPro.push(res.data.data[0].coupons[i]);
              }
            } else {
              couponPro.push(res.data.data[0].coupons[i]);
            }


          }
          console.log(couponPro);
          res.data.data[0]['balances'] = res.data.data[0].balance * 100;
          res.data.data[0]['discountPrice'] = that.accSub(syGoodsPriceTemp, parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10));
          if (isNaN(app.globalData.meailFee)){
            console.log(app.globalData.meailFee + "ddd")
            app.globalData.meailFee=0;
          }
          //打折后的金额＋配送费金额
          if (app.globalData.typeValue == 2) {
            
            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.meailFee;
            console.log(syGoodsPriceTemp + "ddd")
          } else {
            console.log(syGoodsPriceTemp + "ddd" + app.globalData.sendMoney)
            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.sendMoney + app.globalData.meailFee;
            console.log(syGoodsPriceTemp + "ddd" + syGoodsPrice + app.globalData.sendMoney + app.globalData.meailFee)
          }
          
          that.setData({
            memberInformation: res.data.data[0],
            cardNo: res.data.data[0].cardNo,
            couponPro: couponPro,
            syGoodsPrice: syGoodsPriceTemp,
            isLoading: true
          })
        } else {
          var syGoodsPriceTemp = syGoodsPrice;
          if (app.globalData.typeValue == 2) {
            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.meailFee;
          } else {
            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.sendMoney + app.globalData.meailFee;
          }

          console.log(syGoodsPriceTemp)
          that.setData({
            syGoodsPrice: syGoodsPriceTemp,
            isLoading: true
          })
          console.log(that.data.syGoodsPrice)
        }
      }
    })
  },
  input_remarks: function (e) {
    var that = this;

    that.setData({
      remarks: e.detail.value
    })
  },
  /**
   *  20180110 yly 添加位置 ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
   * 
   */
  showWrite:function(){
    let that = this;
    that.setData({ remarkBox:true})
  },
  sureWrite:function(){
    let that = this;
    that.setData({ remarkBox: false, beizhu:that.data.remarks })
  },
  hideWrite: function () {
    let that = this;
    that.setData({ remarkBox: false, remarks: '', beizhu: '' })
  },
  /**
   *    end ****************************************************
   */

  getInvoice: function () {
    var that = this;

    var isInvoice = app.globalData.isInvoice;
    var invoiceType = app.globalData.invoiceType;
    console.log(invoiceType)

    if (isInvoice) {
      var invoicePro = [];

      for (var z = 0; z < invoiceType.length; z++) {
        var invoiceObj = {};

        invoiceObj['type'] = invoiceType[z];
        invoiceObj['isChecks'] = true;
        if (z == 0) {
          invoiceObj['isInvoice'] = false;
        } else {
          invoiceObj['isInvoice'] = true;
        }
        invoicePro.push(invoiceObj);
      }
      console.log('invoicePro');

      console.log(invoicePro);
      that.setData({
        invoiceType: invoicePro,
      })
      console.log(that.data.invoiceType)
    }
  },
  btn_open: function () {
    var that = this;
    var isInvoiceName = that.data.isInvoiceName;
    var invoiceType = that.data.invoiceType;
    var invoiceId = that.data.invoiceId;
    var isJD = that.data.isJD;
    console.log(invoiceType);

    if (isInvoiceName) {
      isInvoiceName = false;
      for (var i = 0; i < invoiceType.length; i++) {

        invoiceType[i]['isChecks'] = true;
        invoiceId = -1;
        
      }
      isJD = false;
    } else {
      isInvoiceName = true;
      for (var i = 0; i < invoiceType.length; i++) {

        invoiceType[i]['isChecks'] = false;
        if (!invoiceType[i]['isInvoice']) {

          invoiceId = invoiceType[i].type;

          if(invoiceType[i].type == 2){
            isJD = true;
          }
        }

      }
    }

    console.log(invoiceId);
    console.log('____________________________')
    console.log(invoiceType)
    that.setData({
      invoiceType: invoiceType,
      isInvoiceName: isInvoiceName,
      invoiceId: invoiceId,
      isJD: isJD
    })

  },
  btn_k_p: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    var invoiceType = that.data.invoiceType;
    var isJD = that.data.isJD;
    var invoiceId = that.data.invoiceId;

    for (var i = 0; i < invoiceType.length; i++) {

      if (index == i) {
        if (item.isInvoice) {
          invoiceType[index].isInvoice = false;
          invoiceId = item.type;
          if (item.type == 2) {
            isJD = true;
          } else {
            isJD = false;
          }
        }


      } else {
        invoiceType[i].isInvoice = true;
      }
    }

    that.setData({
      invoiceType: invoiceType,
      isJD: isJD,
      invoiceId: invoiceId
    })
  },
  btn_h_p: function () {
    var that = this;
    var memberInformation = that.data.memberInformation;
    var isYE = that.data.isYE;
    var moneyAll = that.data.moneyAll;
    var discountObj = that.data.discountObj;
    var sendMoney = that.data.sendMoney;
    var typeValue = that.data.typeValue;
    var money = 0;
    var syGoodsPrice = that.data.syGoodsPrice;
    var meailFeeMoney = that.data.meailFeeMoney;

    console.log(syGoodsPrice);



    if (memberInformation.balance > 0) {
      console.log(memberInformation);
      if (isYE) {
        isYE = false;
        memberInformation['balances'] = memberInformation.balance * 100;
        if (memberInformation['yh_price']) {
          syGoodsPrice = parseInt(parseInt(syGoodsPrice) + parseInt(memberInformation['yh_price']));

          that.setData({
            syGoodsPrice: syGoodsPrice,
            memberInformation: memberInformation
          })
        }


      } else {

        isYE = true;


        money = syGoodsPrice;

        if (money > memberInformation.balance * 100) {
          memberInformation['yh_price'] = memberInformation.balance * 100;
          money = that.accSub(money, memberInformation.balance * 100);
          memberInformation['balances'] = 0;

        } else {
          memberInformation['yh_price'] = money;
          money = 0;
          memberInformation['balances'] = that.accSub(memberInformation.balance * 100, memberInformation['yh_price']);
        }
        console.log(memberInformation);
        that.setData({
          memberInformation: memberInformation,
          syGoodsPrice: money
        })
      }
      that.setData({
        isYE: isYE
      })


    }

  },
  getDayData: function (endTime) {

    var that = this;

    var nowTime = new Date(getNowFormatDate());

    var endTime = new Date(endTime);

    var nextTime = new Date(endTime - nowTime);

    var day = Math.floor(nextTime / (24 * 1000 * 3600));

    return day;

    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  bindCouponChange: function (e) {
    var that = this;
    var index = e.detail.value;
    console.log(1111);


    if (index > 0) {

      var couponPro = that.data.couponPro;
      var menuPro = that.data.menuPro;
      var cardNo = that.data.cardNo;
      var sendMoney = that.data.sendMoney;
      var goodsMoney = that.data.goodsMoney;

      if (goodsMoney >= couponPro[index].gifts * 100) {

        var menuArray = [];
        for (var i in menuPro) {
          var menuObj = {};

          menuObj['product_no'] = menuPro[i].id;
          menuObj['name'] = menuPro[i].menuName;
          menuObj['price'] = menuPro[i].price / 100;
          menuObj['qty'] = menuPro[i].num;
          menuObj['desc'] = ''
          menuArray.push(menuObj);
        }
        console.log(constant.clientId);
        console.log(app.globalData.extId);
        console.log(cardNo);
        wx.request({
          url: url.useCoupon,
          data: {
            couponIds: couponPro[index].id,
            cardNo: cardNo,
            posSeq: that.getNowDate(),
            products: menuArray
          },
          method: 'POST',
          header: {
            clientId: constant.clientId,
            storeId: app.globalData.extId,
          },
          success: function (res) {
            console.log(res);
            console.log(11111111);

            if (res.data.code == 200) {

              var couponObj = that.data.couponObj;
              couponObj = couponPro[index];
              couponObj['couponType'] = res.data.data.coupons[0].couponType;
              couponObj['couponPrice'] = (parseInt(goodsMoney) - parseInt(res.data.amount * 100)) / 100;


              var memberInformation = that.data.memberInformation;
              var isYE = that.data.isYE;
              var moneyAll = that.data.moneyAll;
              var discountObj = that.data.discountObj;
              var sendMoney = that.data.sendMoney;
              var typeValue = that.data.typeValue;
              var money = 0;
              var syGoodsPrice = 0;
              var meailFeeMoney = that.data.meailFeeMoney;
              var PreferentialActivitiesPro = that.data.PreferentialActivitiesPro;
              var discountProType1 = that.data.discountProType1;
              var discountNamePro = [];
              syGoodsPrice = res.data.amount * 100;
              console.log(syGoodsPrice);
              var price = 0;

              if (PreferentialActivitiesPro.moneyOff) {
                for (var i = 0; i < PreferentialActivitiesPro.moneyOff.length; i++) {
                  console.log();
                  var moneyCondition = PreferentialActivitiesPro.moneyOff[i].moneyCondition * 100;
                  if (syGoodsPrice >= moneyCondition) {
                    if (price < PreferentialActivitiesPro.moneyOff[i].discount) {
                      price = PreferentialActivitiesPro.moneyOff[i].discount;
                      discountObj['price'] = PreferentialActivitiesPro.moneyOff[i].discount * 100;
                      discountObj['moneyCondition'] = PreferentialActivitiesPro.moneyOff[i].moneyCondition;
                      discountObj['name'] = PreferentialActivitiesPro.moneyOff[i].ruleDetail;
                      discountObj['pid'] = PreferentialActivitiesPro.id;
                      discountObj['type'] = PreferentialActivitiesPro.type;
                      discountObj['title'] = PreferentialActivitiesPro.title;
                    }
                  }
                }
              }

              console.log(discountObj);
              console.log(syGoodsPrice);
              if (discountObj.price > 0) {
                var moneyCondition1 = discountObj['moneyCondition'] * 100;
                console.log(moneyCondition1);
                if (syGoodsPrice >= moneyCondition1) {
                  console.log(111111);
                  syGoodsPrice = that.accSub(syGoodsPrice, discountObj.price);
                } else {
                  discountObj = { 'price': 0 }
                }

              }
              if (syGoodsPrice < 0) {
                syGoodsPrice = 0;
              }

              if (syGoodsPrice >= discountProType1.moneyCondition * 100) {

                if (discountProType1.productsBonus.bonusProducts.length > 0) {

                  for (var j = 0; j < discountProType1.productsBonus.bonusProducts.length; j++) {

                    var discountObj1 = {};
                    discountObj1 = discountProType1.productsBonus.bonusProducts[j];
                    discountObj1['title'] = discountProType1.title;
                    discountObj1['pid'] = discountProType1.id;
                    discountObj1['moneyCondition'] = discountProType1.moneyCondition;
                    discountNamePro.push(discountObj1);
                  }
                }
              }


              memberInformation['discountPrice'] = that.accSub(syGoodsPrice, parseInt(syGoodsPrice * memberInformation.discount / 10));

              if (syGoodsPrice < 0) {
                syGoodsPrice = 0;
              }

              if (typeValue == 2) {
                syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + meailFeeMoney;
              } else {
                syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + sendMoney + meailFeeMoney;
              }
              if (isYE) {

                if (memberInformation.balance > 0) {
                  if (syGoodsPrice > memberInformation.balance * 100) {
                    syGoodsPrice = that.accSub(syGoodsPrice, memberInformation.balance * 100);
                    memberInformation['balances'] = 0;
                    memberInformation['yh_price'] = memberInformation.balance * 100;
                  } else {
                    memberInformation['balances'] = that.accSub(memberInformation.balance * 100, syGoodsPrice);
                    memberInformation['yh_price'] = syGoodsPrice;
                    syGoodsPrice = 0;
                  }
                }

              }
              console.log(memberInformation);


              that.setData({
                couponIndex: index,
                couponObj: couponObj,
                syGoodsPrice: syGoodsPrice,
                memberInformation: memberInformation,
                discountObj: discountObj,
                discountNamePro: discountNamePro
              })
            } else {
              that.notCouponPrice(0);
              wx.showModal({
                title: '提示',
                content: res.data.message,
                success: function () {
                }
              })
            }
          }
        })
      } else {
        that.notCouponPrice(0);
        wx.showModal({
          title: '提示',
          content: '商品金额不满足使用此优惠券条件',
          success: function () {

          }
        })
      }
    } else {
      that.notCouponPrice(index);
    }

  },
  btn_pay_method: function (e) {
    var that = this;

    that.setData({
      payId: e.currentTarget.dataset.info
    })

  },
  accMul: function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  accSub: function (arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  inputPhone: function (e) {
    this.setData({
      personPhone: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  input_f_1: function (e) {

    this.setData({
      f_p_1: e.detail.value
    })
  },
  input_f_2: function (e) {

    this.setData({
      f_p_2: e.detail.value
    })
  },
  notCouponPrice: function (index) {
    var that = this;
    var memberInformation = that.data.memberInformation;
    var isYE = that.data.isYE;
    var moneyAll = that.data.moneyAll;
    var discountObj = that.data.discountObj;
    var sendMoney = that.data.sendMoney;
    var typeValue = that.data.typeValue;
    var goodsMoney = that.data.goodsMoney;
    var money = 0;
    var syGoodsPrice = 0;
    var meailFeeMoney = that.data.meailFeeMoney;
    var PreferentialActivitiesPro = that.data.PreferentialActivitiesPro;
    var discountProType1 = that.data.discountProType1;
    var discountNamePro = [];
    console.log('不使用优惠券');
    console.log(PreferentialActivitiesPro);
    var syGoodsPrice = goodsMoney;
    var indexNum = 0;
    var price = 0;
    if (PreferentialActivitiesPro.moneyOff) {
      for (var i = 0; i < PreferentialActivitiesPro.moneyOff.length; i++) {
        var moneyCondition = PreferentialActivitiesPro.moneyOff[i].moneyCondition * 100;
        console.log(moneyCondition);
        if (syGoodsPrice >= moneyCondition) {
          if (price < PreferentialActivitiesPro.moneyOff[i].discount) {
            price = PreferentialActivitiesPro.moneyOff[i].discount;
            discountObj['price'] = PreferentialActivitiesPro.moneyOff[i].discount * 100;
            discountObj['moneyCondition'] = PreferentialActivitiesPro.moneyOff[i].moneyCondition;
            discountObj['name'] = PreferentialActivitiesPro.moneyOff[i].ruleDetail;
            discountObj['pid'] = PreferentialActivitiesPro.id;
            discountObj['type'] = PreferentialActivitiesPro.type;
            discountObj['title'] = PreferentialActivitiesPro.title;
          }
        }
      }
    }
    console.log(discountObj);
    if (discountObj.price > 0) {
      if (goodsMoney >= discountObj['moneyCondition'] * 100) {
        syGoodsPrice = that.accSub(goodsMoney, discountObj.price);
      } else {
        discountObj = { 'price': 0 }
      }
    }

    if (syGoodsPrice < 0) {
      syGoodsPrice = 0;
    }



    if (syGoodsPrice >= discountProType1.moneyCondition * 100) {

      if (discountProType1.productsBonus.bonusProducts.length > 0) {

        for (var j = 0; j < discountProType1.productsBonus.bonusProducts.length; j++) {

          var discountObj1 = {};
          discountObj1 = discountProType1.productsBonus.bonusProducts[j];
          discountObj1['title'] = discountProType1.title;
          discountObj1['pid'] = discountProType1.id;
          discountObj1['moneyCondition'] = discountProType1.moneyCondition;
          discountNamePro.push(discountObj1);
        }
      }
    }

    memberInformation['discountPrice'] = that.accSub(syGoodsPrice, parseInt(syGoodsPrice * memberInformation.discount / 10));

    if (syGoodsPrice < 0) {
      syGoodsPrice = 0;
    }
    if (typeValue == 2) {
      syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + meailFeeMoney;
    } else {
      syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + sendMoney + meailFeeMoney;
    }
    if (isYE) {

      if (memberInformation.balance > 0) {
        if (syGoodsPrice > memberInformation.balance * 100) {
          syGoodsPrice = that.accSub(syGoodsPrice, memberInformation.balance * 100);
          memberInformation['balances'] = 0;
          memberInformation['yh_price'] = memberInformation.balance * 100;
        } else {
          memberInformation['balances'] = that.accSub(memberInformation.balance * 100, syGoodsPrice);
          memberInformation['yh_price'] = syGoodsPrice;
          syGoodsPrice = 0;
        }
      }

    }
    that.setData({
      couponIndex: index,
      moneyAll: moneyAll,
      memberInformation: memberInformation,
      syGoodsPrice: syGoodsPrice,
      discountObj: discountObj,
      discountNamePro: discountNamePro
    })
  }

})