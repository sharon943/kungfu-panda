// pages/menu/menu.js   //发票  944
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Discounttype: 0,
    menuDataPro: [],
    discountMenu: [],
    // activityProMenu:[],
    typeId: '1',
    goodsIndex: 0,
    isSub: true,
    isNature: true,
    naturePro: [],
    menuName: '',
    menuId: '',
    menuPrice: 0,
    isHiddenScreenStatus: true,
    menuPro: {},
    typePro: {},
    isFalse: false,
    isTrue: true,
    menuNature: {},
    menuProArray: {},
    naturePrice: 0,
    allMenu: { 'menuNum': 0, 'menuPrice': 0 },
    isHiddenModal: true,
    buyCarListMaxHeight: 0,
    isShopCarCommodity: true,
    hiddenBuyCarStatus: true,
    animationData: '',
    isLoading: true,
    menuType: 1,
    shopPro: {},
    sw: 0,
    isGoodsModal: true,
    isGoodsInformation: true,
    name: '',
    desc: '',
    imageInformation: '',
    sealesNum: '',
    isHiddenImageStatus: true,
    oIndex: 0,
    tIndex: 0,
    sIndex: 0,
    typeValue: 0,
    isNotAddress: false,
    timeValue: null,
    text: '',
    marqueePace: 1,//滚动速度
    marqueeDistance: 30,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔,


    shopId: null,
    menuId: null,
    noticePro: null,
    isNoticeShop: true,
    typeNum: 1,
    address: null,
    index: 0,
    typeNamePro: null,
    name: 'name',
    appointTimes: null,
    takeSelfTimes: null,
    jump: null,
    latitude: null,
    longitude: null,
    specialOfferPrice: 0,
    costPrice: '',
    isBusiness: true,
    deliveryNum: 1,
    actictyText: '2121',
    productActicty: {},
    mealFeeMoney: 0,
    natureMealFee: 0,
    appinTimePro: [],
    isLoading1: false,
    isLoading2: false,
    isViewDisabled: true,
    latitude: 0,
    longitude: 0,
    isLogin: 0,
    typeName: '',
    typePro_: [],
    nameHH: '',
    iconPath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // that.getActivityData();
    // app.getUserInfo(function (userinfo, openId) {

    //   console.log(openId)

    // })
    that.setData({
      iconPath: app.globalData.iconPath,

    })
    console.log(app.globalData.iconPath)
    console.log(that.data.iconPath)
    if (options.jump == undefined | options.jump == null | options.jump == "") {
      app.globalData.typeValue = null;
      app.globalData.timeValue = null;
    }

    if (app.globalData.typeValue != undefined & app.globalData.typeValue != null) {
      that.setData({
        typeValue: app.globalData.typeValue
      })
    }
    if (app.globalData.timeValue != undefined & app.globalData.timeValue != null) {
      that.setData({
        timeValue: app.globalData.timeValue
      })
    }
    console.log(options)
    console.log(options.typeNum)
    if (options.typeNum == 1) {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            buyCarListMaxHeight: (res.windowHeight * 0.6 - 37) + "px",
            sw: res.windowWidth,
            shopId: options.shopId,
            typeNum: options.typeNum,
            address: options.address,
            jump: options.jump,
            latitude: options.latitude,
            longitude: options.longitude,
          })
        }
      })
      if (that.data.address.length>10){
        that.setData({       
          address: that.data.address.substring(0,10)+'...',
        })
      }
      that.getActivityData();
      that.GetData(app.globalData.JSESSIONID, that, options.shopId, options.jump, that.data.typeValue, that.data.timeValue);
      that.getShopData(app.globalData.JSESSIONID, options.latitude, options.longitude);
      that.getNoticeData(app.globalData.JSESSIONID, options.shopId);
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            buyCarListMaxHeight: (res.windowHeight * 0.6 - 37) + "px",
            sw: res.windowWidth,
            typeNum: options.typeNum
          })
        }
      })

      that.getActivityData();
      that.getMenuIdData(app.globalData.JSESSIONID, that.data.typeValue);
    }


    that.getNoticeData();
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
    var typeNum = that.data.typeNum;

    if (typeNum == 1) {
      var shopId = that.data.shopId;
      var jump = that.data.jump;
      var latitude = that.data.latitude;
      var longitude = that.data.longitude;
      // that.getActivityData();
      // that.GetData(app.globalData.JSESSIONID, that, shopId, jump, app.globalData.typeValue);
      //  that.getShopData(app.globalData.JSESSIONID, latitude, longitude);
      that.getNoticeData(app.globalData.JSESSIONID, shopId);



    } else {
      that.getMenuIdData(app.globalData.JSESSIONID, TYPEVALUE);
      that.setData({
        isNotAddress: true,
      })
    }

    that.setData({
      menuPro: app.globalData.menuPro,
      allMenu: app.globalData.allpro,
      menuProArray: app.globalData.menuProArray,
      specialOfferPrice: app.globalData.specialOfferPrice,
      typePro: app.globalData.typePro,
      mealFeeMoney: app.globalData.meailFee,
      isViewDisabled: true,
      typeValue: app.globalData.typeValue,
      timeValue: app.globalData.timeValue,
      oIndex: app.globalData.oIndex,
      tIndex: app.globalData.tIndex,
      sIndex: app.globalData.tIndex,
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

  GetData: function (JSESSIONID, that, id, jump, typeValue, reserveDate) {

    console.log(jump);
    console.log(typeValue);
    wx.request({
      url: url.getMenu,
      data: {
        storeId: id,
        sendType: typeValue,
        reserveDate: reserveDate
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {

        console.log(res);

        //   app.globalData.XHNum = res.data.data.tableName;
        //   app.globalData.shopImg = res.data.data.store;
        //   app.globalData.shopName = res.data.data.storeImg;

        if (res.data.status == 1) {


          var jumptemp = jump;
          var goodsIndex = 0;

          if (jumptemp == '') {
            jumptemp = res.data.data.bigCategory[0].uid;
            goodsIndex = 0
          } else {
            for (var i = 0; i < res.data.data.bigCategory.length; i++) {

              if (jumptemp == res.data.data.bigCategory[i].uid) {
                goodsIndex = i;
              }
            }
          }
          that.setData({
            menuDataPro: res.data.data.bigCategory,
            typeId: jumptemp,
            isLoading: true,
            goodsIndex: goodsIndex,
            menuId: res.data.data.menuId,
            isLoading1: true,
          })

          that.getActivityData();
          // console.log(that.data.menuDataPro)
          console.log(that.data.menuDataPro)

        } else {
          that.setData({
            isLoading1: true
          })
        }

      }
    })
  },
  btnType: function (res) {
    // console.log(res);
    this.setData({
      goodsIndex: res.currentTarget.dataset.index,
      typeId: res.currentTarget.dataset.item.uid,
      Discounttype: 0,
    })
  },
  btnDiscount: function () {
    this.setData({
      Discounttype: 1,
      typeId: 1,
    })
  },
  btnImageAdd: function (res) {
    // console.log(res);

    if (res.currentTarget.dataset.item.requirements) {
      var naturePrice = 0;
      var naturePro = res.currentTarget.dataset.item.requirements;
      for (var i = 0; i < naturePro.length; i++) {
        for (var j = 0; j < naturePro[i].items.length; j++) {
          if (j == 0) {
            naturePro[i].items[j].isChecked = '1';
            naturePrice += parseFloat(naturePro[i].items[j].price) * 100;
          } else {
            naturePro[i].items[j].isChecked = '0';
          }
        }
      }
      naturePrice += parseFloat(res.currentTarget.dataset.item.price) * 100;
      this.setData({
        isNature: false,
        isHiddenScreenStatus: false,
        naturePro: naturePro,
        menuName: res.currentTarget.dataset.item.name,
        menuId: res.currentTarget.dataset.item.uid,
        menuPrice: parseFloat(res.currentTarget.dataset.item.price) * 100,
        naturePrice: naturePrice,
        costPrice: res.currentTarget.dataset.item.costPrice,
        natureMealFee: res.currentTarget.dataset.item.mealFee * 100

      })


    } else {
      var menuPro = this.data.menuPro;
      var typePro = this.data.typePro;
      var menuProArray = this.data.menuProArray;
      var goodsObj = {};
      var allMenu = this.data.allMenu;
      var typeId = this.data.typeId;
      var specialOfferPrice = this.data.specialOfferPrice;
      var item = res.currentTarget.dataset.item;
      var mealFeeMoney = this.data.mealFeeMoney;

      if (menuPro['menuId' + item.uid]) {//已点餐品

        menuPro['menuId' + item.uid]['num'] += 1;
        menuProArray['menuId' + item.uid]['num'] += 1;
      } else {
        goodsObj['menuName'] = item.name;
        goodsObj['id'] = item.uid;
        goodsObj['num'] = 1;
        goodsObj['price'] = parseFloat(item.price) * 100;
        goodsObj['costPrice'] = item.costPrice * 100;
        goodsObj['typeId'] = typeId;
        goodsObj['mealFee'] = item.mealFee * 100;
        menuPro['menuId' + item.uid] = goodsObj;
        menuProArray['menuId' + item.uid] = goodsObj;
      }
      if (typePro['menuTypeId' + typeId]) {
        typePro['menuTypeId' + typeId] += 1;
      } else {
        typePro['menuTypeId' + typeId] = 1;
      }
      mealFeeMoney += item.mealFee * 100;
      if (item.costPrice > 0) {
        specialOfferPrice += item.costPrice * 100;
      } else {
        specialOfferPrice += item.price * 100;
      }

      allMenu['menuNum'] += 1;
      allMenu['menuPrice'] += parseFloat(item.price) * 100;


      // console.log(menuPro);
      // console.log(typePro);
      this.setData({
        menuPro: menuPro,
        typePro: typePro,
        menuProArray: menuProArray,
        allMenu: allMenu,
        specialOfferPrice: specialOfferPrice,
        mealFeeMoney: mealFeeMoney
      })



    }
  },
  menuProBack: function () {
    this.setData({
      isNature: true,
      isHiddenScreenStatus: true
    })
  },
  modal_image_add_click: function () {
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuName = this.data.menuName;
    var menuId = this.data.menuId;
    var menuPrice = this.data.menuPrice;
    var naturePro = this.data.naturePro;
    var natureId = '';
    var natureName = '';
    var naturePrice = 0;
    var goodsObj = {};
    var natureObj = {};
    var typeId = this.data.typeId;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var specialOfferPrice = this.data.specialOfferPrice;
    var costPrice = this.data.costPrice;
    var mealFeeMoney = this.data.mealFeeMoney;
    var natureMealFee = this.data.natureMealFee;

    // console.log(menuId);
    var naturePro_ = [];
    var naturePro_1 = {};
    var naturePro_2 = [];

    for (var i = 0; i < naturePro.length; i++) {
      var natureObj_1 = [];
      var natureObj_2 = {};
      for (var j = 0; j < naturePro[i].items.length; j++) {
        var natureObj_ = {};
        if (naturePro[i].items[j].isChecked == '1') {
          natureName += naturePro[i].items[j].name + "(¥" + naturePro[i].items[j].price + ")+";
          natureId += naturePro[i].uid + '' + naturePro[i].items[j].index + ",";
          naturePrice += parseFloat(naturePro[i].items[j].price) * 100;
          natureObj_['index'] = naturePro[i].items[j].index;
          natureObj_['name'] = naturePro[i].items[j].name;
          natureObj_['price'] = naturePro[i].items[j].price;
          natureObj_1.push(natureObj_);
        }
      }

      natureObj_2['pid'] = naturePro[i].uid;
      natureObj_2['title'] = naturePro[i].title;
      natureObj_2['items'] = natureObj_1;

      // console.log(natureObj_2);
      naturePro_.push(natureObj_2);
    }
    naturePro_1['propertys'] = naturePro_;
    naturePro_2.push(naturePro_1);
    // console.log(naturePro_1);
    natureName = natureName.substr(0, natureName.length - 1);
    natureId = natureId.substr(0, natureId.length - 1);
    // console.log(natureName);
    // console.log(natureId);
    if (menuProArray['menuId' + menuId]) {
      menuProArray['menuId' + menuId]['num'] += 1;
    } else {
      goodsObj['menuName'] = menuName;
      goodsObj['id'] = menuId;
      goodsObj['num'] = 1;
      goodsObj['price'] = menuPrice + naturePrice;
      goodsObj['typeId'] = typeId;
      goodsObj['costPrice'] = costPrice * 100;
      goodsObj['mealFee'] = natureMealFee;

      menuProArray['menuId' + menuId] = goodsObj;
    }


    if (menuPro['menuId' + natureId]) {

      menuPro['menuId' + natureId]['num'] += 1;

    } else {

      natureObj['natureName'] = natureName;
      natureObj['natureId'] = natureId;
      natureObj['naturePrice'] = naturePrice;

      goodsObj['menuName'] = menuName;
      goodsObj['id'] = menuId;
      goodsObj['num'] = 1;
      goodsObj['menuNature'] = natureObj;
      goodsObj['typeId'] = typeId;
      goodsObj['mealFee'] = natureMealFee;
      goodsObj['listRequirements'] = naturePro_2;
      goodsObj['price'] = menuPrice + naturePrice
      menuPro['menuId' + natureId] = goodsObj;

    }

    if (typePro['menuTypeId' + typeId]) {
      typePro['menuTypeId' + typeId] += 1;
    } else {
      typePro['menuTypeId' + typeId] = 1;
    }
    allMenu['menuNum'] += 1;
    allMenu['menuPrice'] += naturePrice + menuPrice;

    if (costPrice > 0) {
      specialOfferPrice += costPrice * 100;
    } else {
      specialOfferPrice += naturePrice + menuPrice;
    }
    mealFeeMoney += natureMealFee;

    // console.log(menuProArray);
    // console.log(menuPro);
    // console.log(typePro);

    this.setData({
      menuProArray: menuProArray,
      menuPro: menuPro,
      typePro: typePro,
      isNature: true,
      isHiddenScreenStatus: true,
      allMenu: allMenu,
      specialOfferPrice: specialOfferPrice,
      mealFeeMoney: mealFeeMoney
    })
  },
  proListLiSelected: function (e) {
    var naturePro = this.data.naturePro;
    var naturePrice = this.data.naturePrice;
    var specialOfferPrice = this.data.specialOfferPrice;


    for (var i = 0; i < naturePro[e.currentTarget.dataset.z].items.length; i++) {

      if (e.currentTarget.dataset.y == i) {
        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '1';
        naturePrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
        if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
          specialOfferPrice += naturePro[e.currentTarget.dataset.z].items[i].costPrice;

        } else {
          specialOfferPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
        }


      } else {
        if (naturePro[e.currentTarget.dataset.z].items[i].isChecked == '1') {
          naturePrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
          if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
            specialOfferPrice -= naturePro[e.currentTarget.dataset.z].items[i].costPrice;
          } else {
            specialOfferPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
          }
        }
        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '0';
      }




    }
    this.setData({
      naturePro: naturePro,
      naturePrice: naturePrice
    })
  },
  btnImageSub: function (e) {
    // console.log(e);
    var item = e.currentTarget.dataset.item;
    var typeId = this.data.typeId;
    var specialOfferPrice = this.data.specialOfferPrice;
    var mealFeeMoney = this.data.mealFeeMoney;

    if (item.requirements) {
      this.setData({
        isGoodsModal: false
      })
    } else {
      var menuPro = this.data.menuPro;
      var typePro = this.data.typePro;
      var menuProArray = this.data.menuProArray;
      var allMenu = this.data.allMenu;
      mealFeeMoney -= menuPro['menuId' + item.uid]['mealFee'];

      allMenu['menuNum'] -= 1;
      allMenu['menuPrice'] -= menuPro['menuId' + item.uid]['price'];
      if (menuPro['menuId' + item.uid]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.uid]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.uid]['price'];
      }

      if (menuPro['menuId' + item.uid]['num'] == 1) {
        delete (menuPro['menuId' + item.uid]);
        delete (menuProArray['menuId' + item.uid])
      } else {
        menuPro['menuId' + item.uid]['num'] -= 1;
        menuProArray['menuId' + item.uid]['num'] -= 1;
      }

      if (typePro['menuTypeId' + typeId] == 1) {
        delete (typePro['menuTypeId' + typeId]);
      } else {
        typePro['menuTypeId' + typeId] -= 1
      }



      if (allMenu['menuNum'] < 0) {
        allMenu['menuNum'] = 0;
      }
      if (allMenu['menuPrice'] < 0) {
        allMenu['menuPrice'] = 0;
      }
      // console.log(menuPro);

      this.setData({
        menuPro: menuPro,
        typePro: typePro,
        menuProArray: menuProArray,
        allMenu: allMenu,
        specialOfferPrice: specialOfferPrice,
        mealFeeMoney: mealFeeMoney
      })
    }
  },
  //弹出购物车
  burCarClick: function (event) {
    //点击购物车按钮弹出购物车已点餐品
    if (!this.data.hiddenBuyCarStatus) {
      this.hideScreen();
      return;
    }

    if (this.data.allMenu['menuNum'] == 0) {
      return;
    }

    var animation = wx.createAnimation({ duration: 400, timingFunction: "ease" });
    this.animation = animation;

    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      isShopCarCommodity: false,
      hiddenBuyCarStatus: false
    });


    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50)
  },
  //隐藏购物车
  hideScreen: function () {
    //隐藏这招层
    var animation = wx.createAnimation({ duration: 400, timingFunction: "ease" });
    this.animation = animation;
    var that = this;
    // console.log(11111);

    setTimeout(function () {
      animation.translateY(300).step();

      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50);

    setTimeout(function () {
      that.setData({
        isShopCarCommodity: true,
        hiddenBuyCarStatus: true,
        hiddenMenuPro: true,
        isNature: true,
        isHiddenScreenStatus: true
      })
    }, 400)
  },
  hideShopCarScreen: function () {
    this.setData({
      isShopCarCommodity: true,
      hiddenBuyCarStatus: true,
      hiddenMenuPro: true
    })
  },
  btGoSend: function () {

    var menuPro = this.data.menuPro;
    var allMenu = this.data.allMenu;
    var menuProArray = this.data.menuProArray;
    var typeName = this.data.typeName;

    app.globalData.menuPro = menuPro;
    app.globalData.allpro = allMenu;
    app.globalData.menuProArray = menuProArray;
    app.globalData.specialOfferPrice = this.data.specialOfferPrice;
    app.globalData.sendMoney = this.data.shopPro.deliveryFee * 100;
    var money = allMenu['menuPrice'] + this.data.shopPro.deliveryFee * 100;
    app.globalData.meailFee = this.data.mealFeeMoney;
    if (isNaN(app.globalData.meailFee)) {
      app.globalData.meailFee = 0;
    }
    if (isNaN(app.globalData.sendMoney)) {
      app.globalData.sendMoney = 0;
    }

    app.globalData.typePro = this.data.typePro;

    if (typeName == '外卖(繁忙)' || typeName == '自取(繁忙)' || typeName == '预约(繁忙)') {

      wx.showModal({
        title: '提示',
        content: '当前门店处于繁忙状态，请稍后下单',
        confirmColor: '#ffc600',
        confirmText: '确认',
      })
      return;
    }
    if (this.data.typeValue == 2) {
      if (this.data.timeValue == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择自取时间',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
        return;
      }
    } else if (this.data.typeValue == 4) {
      if (this.data.timeValue == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择预约时间',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })

        return;
      }
    }

    console.log(allMenu['menuNum'])
    console.log(allMenu['menuPrice'])
    console.log(this.data.mealFeeMoney)
    console.log(allMenu['menuPrice'] / 100 + this.data.mealFeeMoney / 100)
    if (this.data.isLogin == 1) {
      console.log(allMenu['menuNum'])
      // if (allMenu['menuNum'] > 0) {
      if (allMenu['menuPrice'] / 100 + this.data.mealFeeMoney / 100 > 19 & allMenu['menuNum'] > 0){
        this.setData({
          isViewDisabled: false
        })

        wx.navigateTo({
          url: '../send/send?shopId=' + this.data.shopId + '&menuId=' + this.data.menuId + '&money=' + money + '&goodsMoney=' + allMenu['menuPrice'],
        })
      }else if (!this.data.shopPro.isServiceTime) {
        return
      } else if (allMenu['menuPrice'] / 100 + this.data.mealFeeMoney / 100 < 20 & allMenu['menuNum'] > 0){
        return
      }
       else if (allMenu['menuNum'] <1) {
        wx.showModal({
          title: '提示',
          content: '您还没有点餐哦～',
          confirmColor: '#ffc600',
          confirmText: '确认',
        })
      }
    }else if (this.data.isNotAddress){
       return
    }else {
      wx.navigateTo({
        url: '../login/login',
      })
    }

  },
  buyCarClear: function () {

    this.setData({
      isHiddenModal: false,
      isHiddenScreenStatus: false
    })
  },
  buyCarClearCancel: function () {
    this.setData({
      isHiddenModal: true,
      isHiddenScreenStatus: true
    })
  },
  buyCarClearConfirm: function () {
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var specialOfferPrice = this.data.specialOfferPrice;

    app.globalData.menuPro = {};
    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
    app.globalData.menuProArray = {};
    app.globalData.sendAddress = null;
    app.globalData.specialOfferPrice = 0;
    app.globalData.typePro = {};
    app.globalData.meailFee = 0;

    this.setData({
      menuPro: {},
      typePro: {},
      menuProArray: {},
      allMenu: { 'menuNum': 0, 'menuPrice': 0 },
      isShopCarCommodity: true,
      hiddenBuyCarStatus: true,
      hiddenMenuPro: true,
      isHiddenModal: true,
      isHiddenScreenStatus: true,
      specialOfferPrice: 0,
      mealFeeMoney: 0
    })

  },
  menuDelBuyCar: function (e) {
    // console.log(e);
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var item = e.currentTarget.dataset.info;
    var mealFeeMoney = this.data.mealFeeMoney;
    var specialOfferPrice = this.data.specialOfferPrice;

    // console.log(specialOfferPrice);

    if (item.menuNature) {
      mealFeeMoney -= menuPro['menuId' + item.menuNature.natureId]['mealFee'];
      if (menuPro['menuId' + item.menuNature.natureId]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.menuNature.natureId]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.menuNature.natureId]['price'];
      }
      if (menuPro['menuId' + item.menuNature.natureId]['num'] == 1) {

        delete (menuPro['menuId' + item.menuNature.natureId]);
        if (menuProArray['menuId' + item.id]['num'] == 1) {
          delete (menuProArray['menuId' + item.id]);
        } else {
          menuProArray['menuId' + item.id]['num'] -= 1;
        }

      } else {

        menuPro['menuId' + item.menuNature.natureId]['num'] -= 1;
        menuProArray['menuId' + item.id]['num'] -= 1;
      }

    } else {
      // console.log("2222");
      mealFeeMoney -= menuPro['menuId' + item.id]['mealFee'];
      if (menuPro['menuId' + item.id]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.id]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.id]['price'];
      }
      if (menuPro['menuId' + item.id]['num'] == 1) {
        delete (menuPro['menuId' + item.id]);
        delete (menuProArray['menuId' + item.id]);
      } else {
        menuPro['menuId' + item.id]['num'] -= 1;
        menuProArray['menuId' + item.id]['num'] -= 1;
      }

    }

    if (typePro['menuTypeId' + item.typeId] == 1) {
      delete (typePro['menuTypeId' + item.typeId]);
    } else {
      typePro['menuTypeId' + item.typeId] -= 1
    }

    allMenu['menuNum'] -= 1;
    allMenu['menuPrice'] -= item.price;

    if (allMenu['menuNum'] < 0) {
      allMenu['menuNum'] = 0;
    }
    if (allMenu['menuPrice'] < 0) {
      allMenu['menuPrice'] = 0;
    }

    // console.log(menuPro);
    // console.log(menuProArray);
    this.setData({
      menuPro: menuPro,
      typePro: typePro,
      menuProArray: menuProArray,
      allMenu: allMenu,
      mealFeeMoney: mealFeeMoney,
      specialOfferPrice: specialOfferPrice
    })
  },
  menuAddBuyCar: function (e) {
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var item = e.currentTarget.dataset.info;
    var mealFeeMoney = this.data.mealFeeMoney;
    var specialOfferPrice = this.data.specialOfferPrice;

    // console.log(e);
    if (item.menuNature) {
      if (menuPro['menuId' + item.menuNature.natureId]['costPrice'] > 0) {
        specialOfferPrice += menuPro['menuId' + item.menuNature.natureId]['costPrice'];
      } else {
        specialOfferPrice += menuPro['menuId' + item.menuNature.natureId]['price'];
      }
      mealFeeMoney += menuPro['menuId' + item.menuNature.natureId]['mealFee'];
      menuPro['menuId' + item.menuNature.natureId]['num'] += 1;
      menuProArray['menuId' + item.id]['num'] += 1;
    } else {
      if (menuPro['menuId' + item.id]['costPrice'] > 0) {
        specialOfferPrice += menuPro['menuId' + item.id]['costPrice'];
      } else {
        specialOfferPrice += menuPro['menuId' + item.id]['price'];
      }
      mealFeeMoney += menuPro['menuId' + item.id]['mealFee'];
      menuProArray['menuId' + item.id]['num'] += 1;
      menuPro['menuId' + item.id]['num'] += 1;
    }
    typePro['menuTypeId' + item.typeId] += 1;

    allMenu['menuNum'] += 1;
    allMenu['menuPrice'] += item.price;

    this.setData({
      menuPro: menuPro,
      typePro: typePro,
      menuProArray: menuProArray,
      allMenu: allMenu,
      mealFeeMoney: mealFeeMoney,
      specialOfferPrice: specialOfferPrice
    })
  },
  btn_shop_information: function () {
    var that = this;

    that.setData({
      menuType: 2
    })

  },
  getShopData: function (JSESSIONID, latitude, longitude) {
    console.log(6666666666666666666666)
    var that = this;

    wx.request({
      url: url.getStoreId,
      data: {
        longitude: longitude,
        latitude: latitude,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          if (res.data.data.iconPath != undefined | res.data.data.iconPath != null) {
            app.globalData.iconPath = res.data.data.iconPath;
            
            that.setData({
              iconPath:app.globalData.iconPath
            })

          } else {
            app.globalData.iconPath = ''
            that.setData({
              iconPath: app.globalData.iconPath
            })
          }
          var typeNamePro = [];
          app.globalData.extId = res.data.data.extId;
          app.globalData.shopId = res.data.data.storeId;
          app.globalData.onlinePay = res.data.data.payType;
          app.globalData.shopAddress = res.data.data.address;
          app.globalData.shopLat = res.data.data.latitude;
          app.globalData.shopLng = res.data.data.longitude;
          var timeValue = 0;

          var typeObj1 = null;
          var typeObj2 = null;
          var typeObj3 = null;

          for (var q = 0; q < res.data.data.deliveryType.length; q++) {

            if (res.data.data.deliveryType[q] == 1) {
              var typeObj = { 'name': '外卖', 'id': 1 }
              if (res.data.data.busyStatus) {
                if (res.data.data.busyStatus[res.data.data.deliveryType[0]]) {
                  typeObj = { 'name': '外卖(繁忙)', 'id': 1 };


                }
              }
              typeObj1 = typeObj;

            } else if (res.data.data.deliveryType[q] == 2) {
              var typeObj = { 'name': '自取', 'id': 2 }
              if (res.data.data.busyStatus) {
                if (res.data.data.busyStatus[res.data.data.deliveryType[0]]) {
                  typeObj = { 'name': '自取(繁忙)', 'id': 2 };

                }
              }
              typeObj2 = typeObj
            } else if (res.data.data.deliveryType[q] == 4) {
              var typeObj = { 'name': '预约', 'id': 4 }
              if (res.data.data.busyStatus) {
                if (res.data.data.busyStatus[res.data.data.deliveryType[0]]) {
                  typeObj = { 'name': '预约(繁忙)', 'id': 4 };

                }
              }
              typeObj3 = typeObj
            }
          }
          var typePro_ = [];
          if (res.data.data.appointTimes.length > 0) {
            if (res.data.data.takeSelfTimes.length > 0) {
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj2) {
                typePro_.push(typeObj2);
              }
              if (typeObj3) {
                typePro_.push(typeObj3);
              }
              typeNamePro = [typePro_, [], []];
            } else {
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj3) {
                typePro_.push(typeObj3);
              }
              typeNamePro = [typePro_, [], []];
            }
          } else {

            if (res.data.data.takeSelfTimes.length > 0) {
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj2) {
                typePro_.push(typeObj2);
              }
              typeNamePro = [typePro_, [], []];
            } else {
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              typeNamePro = [typePro_, [], []];
            }
          }
          // console.log(JSON.parse(JSON.stringify(res.data.data)));
          var appointTimes = res.data.data.appointTimes;
          var takeSelfTimes = res.data.data.takeSelfTimes;
          for (var i = 0; i < appointTimes.length; i++) {

            res.data.data.appointTimes[i].times = that.setTimeQuantun(res.data.data.appointTimes[i].date, appointTimes[i].times[0], 45);
            res.data.data.appointTimes[i].times.reverse();
          }
          for (var i = 0; i < takeSelfTimes.length; i++) {

            res.data.data.takeSelfTimes[i].times = that.setTimeQuantun(res.data.data.takeSelfTimes[i].date, takeSelfTimes[i].times[0], 15);
            res.data.data.takeSelfTimes[i].times.reverse();

          }
          if (typePro_.length > 0) {
            if (typePro_[0].id == 2) {
              var takeSelfTimes1 = [];
              var takeSelfTimes2 = [];
              for (var i = 0; i < takeSelfTimes.length; i++) {
                var takeObj = {};

                takeObj['name'] = takeSelfTimes[i].date
                takeSelfTimes1.push(takeObj);
              }
              for (var j = 0; j < takeSelfTimes[0].times.length; j++) {
                var takeObj = {};

                takeObj['name'] = takeSelfTimes[0].times[j]
                takeSelfTimes2.push(takeObj);
              }

              typeNamePro[1] = takeSelfTimes1;
              typeNamePro[2] = takeSelfTimes2;

              if (takeSelfTimes1.length > 0) {

                if (takeSelfTimes2.length > 0) {
                  timeValue = takeSelfTimes1[0].name + ' ' + takeSelfTimes2[0].name;
                } else {
                  timeValue = 0;
                }

              } else {
                timeValue = 0;
              }


            } else if (typePro_[0].id == 4) {
              var appointTimes1 = [];
              var appointTimes2 = [];
              for (var i = 0; i < appointTimes.length; i++) {
                var takeObj = {};

                takeObj['name'] = appointTimes[i].date
                appointTimes1.push(takeObj);
              }
              for (var j = 0; j < appointTimes[0].times.length; j++) {
                var takeObj = {};

                takeObj['name'] = appointTimes[0].times[j]
                appointTimes2.push(takeObj);
              }

              typeNamePro[1] = appointTimes1;
              typeNamePro[2] = appointTimes2;
              if (appointTimes1.length > 0) {

                if (appointTimes2.length > 0) {
                  timeValue = appointTimes1[0].name + ' ' + appointTimes2[0].name;
                } else {
                  timeValue = 0;
                }
              } else {
                timeValue = 0;
              }
            }
          }
          if (app.globalData.timeValue == undefined | app.globalData.timeValue == null | app.globalData.timeValue == 0) {
            app.globalData.timeValue = timeValue;
          } else {
            timeValue = app.globalData.timeValue;
          }

          if (app.globalData.typeValue == undefined | app.globalData.typeValue == null | app.globalData.typeValue == 0) {
            app.globalData.typeValue = res.data.data.deliveryType[0];
          }
          app.globalData.shopLongitude = longitude;
          app.globalData.shopLatitude = latitude;
          app.globalData.isInvoice = res.data.data.isInvoice;
          app.globalData.invoiceType = res.data.data.invoiceType;
          // app.globalData.invoiceType = [1, 2];

          // for(var i = 0 ; i < )
          that.judgeShopBusiness(res.data.data.serviceTime);
          // console.log(typeNamePro);
          that.setData({
            shopPro: res.data.data,
            typeNamePro: typeNamePro,
            appointTimes: res.data.data.appointTimes,
            takeSelfTimes: res.data.data.takeSelfTimes,
            isLoading2: true,
            typeValue: app.globalData.typeValue,
            typePro_: typePro_,
            timeValue: timeValue
          })
        } else {
          that.setData({
            isLoading2: true
          })
        }

      }
    })
  },
  strToDate: function (dateObj) {
    dateObj = dateObj.replace(/(-)/g, '/');
    // console.log(dateObj);
    return new Date(dateObj)
  },
  setTimeQuantun: function (dateName, timeQuantun, minuteNum) {
    var index = timeQuantun.indexOf('~');
    var timeQuantunBefore = timeQuantun.substring(0, index);
    var timeQuantunAfter = timeQuantun.substring(index + 1, timeQuantun.length);

    var time2 = dateName + ' ' + timeQuantunAfter + ':00';

    var nowDate = this.strToDate(this.getNowDate());
    var quantunDate = this.strToDate(dateName);

    if (quantunDate > nowDate) {
      this.setData({
        appinTimePro: []
      })
      var appinTimePro = this.getNextTimeData(dateName, time2, [], timeQuantunBefore);
      // console.log(this.data.appinTimePro);

      return this.data.appinTimePro;
    } else {
      // console.log(dateName);
      var appinTimePro = this.getTimeData(dateName, time2, [], timeQuantunBefore, minuteNum);

      return this.data.appinTimePro;

    }




  },
  getTimeData: function (dateName, time2, pushPro, timeQuantunBefore, minuteNum) {
    var endTime = this.strToDate(time2);
    var pushPro = pushPro ? pushPro : [];

    // endTime.setMinutes(endTime.getMinutes() - 15);

    var hour = endTime.getHours();
    var minutes = endTime.getMinutes();

    var name1 = dateName + ' ' + hour + ':' + minutes;
    var name2 = this.getNowTimes(minuteNum);
    var name3 = dateName + ' ' + timeQuantunBefore;

    var time3 = this.strToDate(name1);

    var time4 = this.strToDate(name2);
    var time5 = this.strToDate(name3);

    if (time3 >= time4) {
      if (time3 > time5) {



        if (minutes == '0') {
          minutes = '00'
        }

        if (hour < 10) {
          hour = '0' + hour;
        }

        pushPro.push(hour + ':' + minutes);

        endTime.setMinutes(endTime.getMinutes() - 15);

        var hour = endTime.getHours();
        var minutes = endTime.getMinutes();
        time2 = dateName + ' ' + hour + ':' + minutes;

        this.getTimeData(dateName, time2, pushPro, timeQuantunBefore, minuteNum);

      } else {

        this.setData({
          appinTimePro: pushPro
        })
      }
    } else {

      this.setData({
        appinTimePro: pushPro
      })
    }
  },
  getNextTimeData: function (dateName, time2, pushPro, timeQuantunBefore) {
    var endTime = this.strToDate(time2);
    var pushPro = pushPro ? pushPro : [];
    // console.log('第二天');

    var dates1 = this.strToDate(endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes());

    var hour = endTime.getHours();
    var minutes = endTime.getMinutes();
    if (minutes < 10) {
      minutes = '00';
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    // console.log(hour + ':' + minutes);
    var dates2 = this.strToDate(dateName + ' ' + hour + ':' + minutes);

    var dates3 = dates2 - dates1;
    var time3 = this.strToDate(dateName + ' ' + hour + ':' + minutes);

    var time5 = this.strToDate(dateName + ' ' + timeQuantunBefore);
    // console.log(timeQuantunBefore);
    if (dates3 == 0) {
      if (time3 >= time5) {

        pushPro.push(hour + ':' + minutes);

        endTime.setMinutes(endTime.getMinutes() - 15);

        var hour = endTime.getHours();
        var minutes = endTime.getMinutes();

        time2 = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + hour + ':' + minutes;

        this.getNextTimeData(dateName, time2, pushPro, timeQuantunBefore);
      } else {
        this.setData({
          appinTimePro: pushPro
        })
      }
    } else {
      this.setData({
        appinTimePro: pushPro
      })
    }
  },
  getNowDate: function () {

    var myDate = new Date();
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();

    return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
  },
  getNowTimes: function (minuteNum) {

    var myDate = new Date();
    myDate.setMinutes(myDate.getMinutes() + minuteNum);

    return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
  },
  btn_shop_order: function () {
    var that = this;

    that.setData({
      menuType: 1
    })
  },
  goodsCancel: function () {

    this.setData({
      isGoodsModal: true
    })
  },
  btn_image: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;

    that.setData({
      isGoodsInformation: false,
      isHiddenImageStatus: false,
      nameHH: item.name,
      desc: item.desc,
      imageInformation: item.image2,
      sealesNum: item.sales,
    })

  },
  hideImageScreen: function () {
    this.setData({
      isGoodsInformation: true,
      isHiddenImageStatus: true,
      isNoticeShop: true
    })

  },
  /** 文字滚动 */
  // getNoticeScrollData: function () {
  //   var that = this;
  //   var length = that.data.text.length * that.data.size;//文字长度
  //   var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
  //   that.setData({
  //     length: length,
  //     windowWidth: windowWidth,
  //     marquee2_margin: length < windowWidth ? windowWidth - length : that.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
  //   });
  //   that.run2();// 水平一行字滚动完了再按照原来的方向滚动
  // },
  // run2: function () {
  //   var that = this;
  //   var interval = setInterval(function () {
  //     if (-that.data.marqueeDistance2 < that.data.length) {
  //       // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
  //       that.setData({
  //         marqueeDistance2: that.data.marqueeDistance2 - that.data.marqueePace,
  //         marquee2copy_status: that.data.length + that.data.marqueeDistance2 <= that.data.windowWidth + that.data.marquee2_margin,
  //       });
  //     } else {
  //       if (-that.data.marqueeDistance2 >= that.data.marquee2_margin) { // 当第二条文字滚动到最左边时
  //         that.setData({
  //           marqueeDistance2: that.data.marquee2_margin // 直接重新滚动
  //         });
  //         clearInterval(interval);
  //         that.run2();
  //       } else {
  //         clearInterval(interval);
  //         that.setData({
  //           marqueeDistance2: -that.data.windowWidth
  //         });
  //         that.run2();
  //       }
  //     }
  //   }, that.data.interval);
  // },
  getNoticeData: function (JSESSIONID, shopId) {
    var that = this;

    wx.request({
      url: url.getNotice,
      data: {
        storeId: shopId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        // console.log(res);

        if (res.data.status == 1) {
          // if (res.data.data.appTip.length > 20) {
          //   that.setData({
          //     text: res.data.data.appTip.substring(0,20)+'...'
          //   })
          //   console.log(that.data.text)
          // }
          that.setData({
            text: res.data.data.appTip,
            noticePro: res.data.data,
            isLogin: 1
          })
        } else if (res.data.status == 9) {
          that.setData({
            isLogin: -1
          })
        }
      }
    })
  },
  btn_notice: function () {

    this.setData({
      isNoticeShop: false,
      isHiddenImageStatus: false
    })
  },
  //地址错误时展示的商品界面
  getMenuIdData: function (JSESSIONID, TYPEVALUE) {
    var that = this;

    wx.request({
      url: url.getMenuId,
      data: {
        menuId: constant.menuId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        // bindcolumnchange
        console.log(res);

        if (res.data.status == 1) {

          var goodsIndex = 0;

          var jumptemp = res.data.data.bigCategory[0].uid;
          for (var i = 0; i < res.data.data.bigCategory.length; i++) {

            if (jumptemp == res.data.data.bigCategory[i].uid) {
              goodsIndex = i;
            }
          }

          that.setData({
            menuDataPro: res.data.data.bigCategory,
            typeId: jumptemp,
            isLoading: true,
            goodsIndex: goodsIndex,
            menuId: res.data.data.menuId,
            isLoading2: true,
            isLoading1: true,
            typeValue: TYPEVALUE,
            isBusiness: false
          })
        } else if (res.data.status == 9) {
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, 1);
        } else {
          that.setData({
            isLoading2: true,
            isLoading1: true
          })
        }
      }
    })
  },
  btn_address_: function () {
    var that = this;
    app.globalData.menuPro = {};
    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
    app.globalData.menuProArray = {};
    app.globalData.sendAddress = null;
    app.globalData.specialOfferPrice = 0;
    app.globalData.typePro = {};
    app.globalData.meailFee = 0;

    that.setData({
      menuPro: {},
      typePro: {},
      menuProArray: {},
      allMenu: { 'menuNum': 0, 'menuPrice': 0 },
      isShopCarCommodity: true,
      hiddenBuyCarStatus: true,
      hiddenMenuPro: true,
      isHiddenModal: true,
      isHiddenScreenStatus: true,
      specialOfferPrice: 0,
      mealFeeMoney: 0
    })
    wx.redirectTo({
      url: '../searchAddress/searchAddress',
    })
  },
  bindcolumnchange: function (e) {
    console.log(e);

    var that = this;
    var appointTimes = that.data.appointTimes;
    var takeSelfTimes = that.data.takeSelfTimes;
    var item = e.detail;
    var typeNamePro = that.data.typeNamePro;
    // console.log(takeSelfTimes);
    var oIndex = that.data.oIndex;
    var tIndex = that.data.tIndex;
    var typeValue = that.data.typeValue;
    var typePro_ = that.data.typePro_;
    // console.log(appointTimes);
    console.log(item.column)
    switch (item.column) {


      case 0:
        // oIndex: 0,
        //   tIndex: 0,
        //     sIndex: 0

        if (typePro_[item.value].id == 1) {

          typeNamePro[1] = [];
          typeNamePro[2] = [];

          that.setData({
            typeNamePro: typeNamePro,
            oIndex: item.value
          })

        } else if (typePro_[item.value].id == 2) {

          var takeSelfTimes1 = [];
          var takeSelfTimes2 = [];
          for (var i = 0; i < takeSelfTimes.length; i++) {
            var takeObj = {};
            takeObj['name'] = takeSelfTimes[i].date
            takeSelfTimes1.push(takeObj);
          }
          for (var j = 0; j < takeSelfTimes[0].times.length; j++) {
            var takeObj = {};

            takeObj['name'] = takeSelfTimes[0].times[j]
            takeSelfTimes2.push(takeObj);
          }

          typeNamePro[1] = takeSelfTimes1;
          typeNamePro[2] = takeSelfTimes2;

          that.setData({
            typeNamePro: typeNamePro,
            oIndex: item.value,
            tIndex: 0,
            sIndex: 0
          })

        } else if (typePro_[item.value].id == 4) {
          var appointTimes1 = [];
          var appointTimes2 = [];
          for (var i = 0; i < appointTimes.length; i++) {
            var takeObj = {};

            takeObj['name'] = appointTimes[i].date
            appointTimes1.push(takeObj);
          }
          for (var j = 0; j < appointTimes[0].times.length; j++) {
            var takeObj = {};

            takeObj['name'] = appointTimes[0].times[j]
            appointTimes2.push(takeObj);
          }

          typeNamePro[1] = appointTimes1;
          typeNamePro[2] = appointTimes2;

          that.setData({
            typeNamePro: typeNamePro,
            oIndex: item.value,
            tIndex: 0,
            sIndex: 0
          })
        }
        break;

      case 1:

        if (typePro_[oIndex].id == 2) {
          var takeSelfTimes1 = [];
          for (var i = 0; i < takeSelfTimes[item.value].times.length; i++) {
            var takeObj = {};

            takeObj['name'] = takeSelfTimes[item.value].times[i];
            takeSelfTimes1.push(takeObj);
          }


          typeNamePro[2] = takeSelfTimes1;

          that.setData({
            typeNamePro: typeNamePro,
            tIndex: item.value,
            sIndex: 0
          })

        } else if (typePro_[oIndex].id == 4) {
          var appointTimes1 = [];
          for (var i = 0; i < appointTimes[item.value].times.length; i++) {
            var takeObj = {};

            takeObj['name'] = appointTimes[item.value].times[i];
            appointTimes1.push(takeObj);
          }
          typeNamePro[2] = appointTimes1;

          that.setData({
            typeNamePro: typeNamePro,
            tIndex: item.value,
            sIndex: 0
          })
        }

        break;

      case 2:
        that.setData({
          sIndex: item.value
        })
        break;
    }


  },
  typeChange: function (e) {
    var that = this;
    var oIndex = that.data.oIndex;
    var tIndex = that.data.tIndex;
    var sIndex = that.data.sIndex;
    var appointTimes = that.data.appointTimes;
    var takeSelfTimes = that.data.takeSelfTimes;
    var typeValue = that.data.typeValue;
    var timeValue = that.data.timeValue;
    var shopId = that.data.shopId;
    var typePro_ = that.data.typePro_;

    typeValue = typePro_[oIndex].id;
    console.log(typeValue);
    // console.log(takeSelfTimes);
    console.log(appointTimes)
    // console.log(tIndex);
    // console.log(oIndex);
    if (typePro_[oIndex].id == 2) {
      // that.getActivityData();
      timeValue = takeSelfTimes[tIndex].date + ' ' + takeSelfTimes[tIndex].times[sIndex];
      console.log(timeValue)
      that.setData({
        typeValue: 2
      })
    } else if (typePro_[oIndex].id == 4) {
      // that.getActivityData();
      var item = appointTimes[tIndex]
      timeValue = appointTimes[tIndex].date + ' ' + appointTimes[tIndex].times[sIndex];
      console.log(timeValue)
      that.setData({
        typeValue: 4
      })
    } else if (oIndex == 0) {
      timeValue = 0;
    }


    if (app.globalData.typeValue != typeValue) {

      app.globalData.menuPro = {};
      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
      app.globalData.menuProArray = {};
      app.globalData.sendAddress = null;
      app.globalData.specialOfferPrice = 0;
      app.globalData.typePro = {};
      app.globalData.meailFee = 0;

      that.setData({
        menuPro: {},
        typePro: {},
        menuProArray: {},
        allMenu: { 'menuNum': 0, 'menuPrice': 0 },
        isShopCarCommodity: true,
        hiddenBuyCarStatus: true,
        hiddenMenuPro: true,
        isHiddenModal: true,
        isHiddenScreenStatus: true,
        specialOfferPrice: 0,
        mealFeeMoney: 0
      })
    }

    app.globalData.typeValue = typeValue;
    app.globalData.timeValue = timeValue;
    app.globalData.oIndex = oIndex;
    app.globalData.tIndex = tIndex;
    app.globalData.sIndex = sIndex;

    that.getActivityData();
    that.GetData(app.globalData.JSESSIONID, that, shopId, 0, typeValue, timeValue);

    that.setData({
      typeValue: typeValue,
      timeValue: timeValue,
      typeName: typePro_[oIndex].name
    })
    // console.log(that.data.typeValue+"1111111111")
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
    var shopId = that.data.shopId;
    var jump = that.data.jump;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
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

        if (num == 1) {
          that.getMenuIdData(app.globalData.JSESSIONID, TYPEVALUE);
        } else if (num == 2) {
          // that.getActivityData();
          that.GetData(app.globalData.JSESSIONID, that, shopId, jump);
          that.getShopData(app.globalData.JSESSIONID, latitude, longitude);
          that.getNoticeData(app.globalData.JSESSIONID, shopId);
        }





      }
    })
  },
  judgeShopBusiness: function (date) {
    var that = this;
    var date1;
    var date2;

    var index = date.indexOf('~');

    // console.log(index);

    var date1 = date.substring(0, index);
    // console.log(date1);

    var date2 = date.substring(index + 1, date.length);
    // console.log(date2);

    var t = new Date().toLocaleTimeString();

    if (t > date1 || t < date2) {
      that.setData({
        isBusiness: true
      })
    } else {

      that.setData({
        isBusiness: false
      })
    }
  },
  //获取满减活动
  getActivityData: function () {

    var that = this;
    console.log("app.globalData");
    console.log(app.globalData);
    wx.request({
      url: url.getActivityLib + '/' + app.globalData.memberId,
      data: {},
      header: {
        clientId: constant.clientId,
        storeId: app.globalData.extId
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.data.length > 0) {

            for (var k = 0; k < res.data.data.length; k++) {
              if (res.data.data[k].type == 3) {
                that.setData({
                  actictyText: res.data.data[k].ruleDetail
                })
              } else if (res.data.data[k].type == 5) {
                that.setData({
                  productActicty: res.data.data[k]
                })
                console.log(that.data.productActicty)
                var menuPro1 = that.data.menuDataPro;
                var discountMenu = that.data.productActicty.productsBonus.bonusProducts;
                var activityPro1 = that.data.productActicty;
                for (var i = 0; i < menuPro1.length; i++) {
                  for (var j = 0; j < menuPro1[i].products.length; j++) {
                    for (var h = 0; h < activityPro1.productsBonus.bonusProducts.length; h++) {

                      if (activityPro1.productsBonus.bonusProducts[h].productPosId == menuPro1[i].products[j].uid) {
                        if (activityPro1.productsBonus.bonusProducts[h].discountType == 2) {

                          activityPro1.productsBonus.bonusProducts[h].activityPrice = activityPro1.productsBonus.bonusProducts[h].value;

                        } else if (activityPro1.productsBonus.bonusProducts[h].discountType == 1) {
                          var price = menuPro1.price - activityPro1.productsBonus.bonusProducts[h].value;
                          activityPro1.productsBonus.bonusProducts[h].activityPrice = price;
                        } else if (activityPro1.productsBonus.bonusProducts[h].discountType == 0) {
                          var price = menuPro1.price * (activityPro1.productsBonus.bonusProducts[h].value) / 10;
                          activityPro1.productsBonus.bonusProducts[h].activityPrice = price.toFixed(2);
                        }

                        activityPro1.productsBonus.bonusProducts[h].Vprice = menuPro1[i].products[j].price;
                        activityPro1.productsBonus.bonusProducts[h].price = menuPro1[i].products[j].price;
                        activityPro1.productsBonus.bonusProducts[h].image1 = menuPro1[i].products[j].image1;
                        activityPro1.productsBonus.bonusProducts[h].num = menuPro1[i].products[j].num;
                        activityPro1.productsBonus.bonusProducts[h].uid = menuPro1[i].products[j].uid;
                        activityPro1.productsBonus.bonusProducts[h].name = menuPro1[i].products[j].name;
                        activityPro1.productsBonus.bonusProducts[h].desc = menuPro1[i].products[j].desc;
                        activityPro1.productsBonus.bonusProducts[h].sales = menuPro1[i].products[j].sales;
                        activityPro1.productsBonus.bonusProducts[h].isInServiceTime = menuPro1[i].products[j].isInServiceTime;
                        activityPro1.productsBonus.bonusProducts[h].mealFee = menuPro1[i].products[j].mealFee
                        activityPro1.productsBonus.bonusProducts[h].isFirstOrder = menuPro1[i].products[j].isFirstOrder;
                        activityPro1.productsBonus.bonusProducts[h].isSoldOut = menuPro1[i].products[j].isSoldOut;
                        console.log(that.data.productActicty.isFirstOrder);
                      }
                      if (activityPro1.isFirstOrder == 1) {
                        menuPro1[i].products[j].isFirstOrder = 1;
                      } else {
                        menuPro1[i].products[j].isFirstOrder = 0;
                      }
                      // console.log(menuPro[i].products[j].activityPrice + "111111111113" + menuPro[i].products[j].isFirstOrder);
                    }

                  }
                }


                console.log(activityPro1)
                that.setData({
                  discountMenu: that.discountMenu(activityPro1)
                })
                console.log(that.data.menuDataPro)
                console.log(that.data.discountMenu)
                console.log(888888888888888888)
              }
            }
            console.log(that.data.productActicty)
            var menuPro = that.data.menuDataPro;
            var activityPro = that.data.productActicty;

            // console.log(menuPro + "121212");
            // console.log(that.data.actictyText + "121212");

            for (var i = 0; i < menuPro.length; i++) {
              for (var j = 0; j < menuPro[i].products.length; j++) {
                menuPro[i].products[j].Vprice = menuPro[i].products[j].price
                for (var h = 0; h < activityPro.productsBonus.bonusProducts.length; h++) {
                  if (activityPro.productsBonus.bonusProducts[h].productPosId == menuPro[i].products[j].uid) {
                    if (activityPro.productsBonus.bonusProducts[h].discountType == 2) {
                      menuPro[i].products[j].activityPrice = activityPro.productsBonus.bonusProducts[h].value
                    } else if (activityPro.productsBonus.bonusProducts[h].discountType == 1) {
                      var price = menuPro.price - activityPro.productsBonus.bonusProducts[h].value;
                      menuPro[i].products[j].activityPrice = price;
                    } else if (activityPro.productsBonus.bonusProducts[h].discountType == 0) {
                      var price = menuPro.price * (activityPro.productsBonus.bonusProducts[h].value) / 10;
                      menuPro[i].products[j].activityPrice = price.toFixed(2);
                    }
                  }
                  if (activityPro.isFirstOrder == 1) {
                    menuPro[i].products[j].isFirstOrder = 1;
                  } else {
                    menuPro[i].products[j].isFirstOrder = 0;
                  }
                  // console.log(menuPro[i].products[j].activityPrice + "111111111113" + menuPro[i].products[j].isFirstOrder);
                }

              }
            }
            that.setData({
              menuDataPro: menuPro
            })
          }
        }
      }
    })
  },

  discountMenu: function (activityPro1) {
    var discountProcuts = [];
    for (var j = 0; j < activityPro1.productsBonus.bonusProducts.length; j++) {
      if (activityPro1.productsBonus.bonusProducts[j].price != undefined &
        activityPro1.productsBonus.bonusProducts[j].price != null) {
        discountProcuts.push(activityPro1.productsBonus.bonusProducts[j]);
        console.log("1111111");
      }
    }
    console.log(discountProcuts);
    return discountProcuts;
  }

})