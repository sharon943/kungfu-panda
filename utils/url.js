/**餐道 */
// var url = 'https://beta-wxa.can-dao.com/';
var url ='https://qc.can-dao.com:7770/';//测试
// var url = "https://open-wxa.can-dao.com/";//正式
// var key = '&key=ea38129a996bff2b';
var key ='&key=b8396b24f70ae5c3'//测试
// var key ='&key=a9f85ab25784886b';//正式

/**VKA */
var urlk = 'https://api.vi-ni.com/';
// var urlk = 'https://api.v-ka.com/';//正式
var storeID='376'
// var storeID='5771';//正式
module.exports = {
  getSenderPosition: url +'Action?actionId=1&serviceId=17'+key,
  getShopPosition: url +'Action?actionId=1&serviceId=3'+key,
  getOpenId: url + 'LocalAction?method=getOpenId' + key,
  getShopData: url + 'Action',
  getBanner: url + 'Action?actionId=103&serviceId=3' + key,
  getCache: url + 'Cache?actionId=2',
  setCache: url + 'Cache?actionId=1',
  getStoreId: url + 'Action?actionId=95&serviceId=3' + key,
  getMenu: url + 'Action?actionId=1&serviceId=5' + key,
  getAddressDataBase: url +'SecretAction?actionId=3&serviceId=4' + key,
  codeLogin: url + 'Action?actionId=59&serviceId=4' + key,
  phoneLogin: url + 'Action?actionId=10&serviceId=4' + key,
  registerCodeGo: url + 'Action?actionId=33&serviceId=4' + key,
  getUserInformation: url + 'SecretAction?actionId=41&serviceId=4' + key,
  getCity: url + 'Action?actionId=4&serviceId=1' + key,
  getIsLogin: url + 'LocalAction?method=isNeedLogin' + key,
  addAddress: url + 'SecretAction?actionId=6&serviceId=4' + key,
  getNotice: url + 'SecretAction?actionId=5&serviceId=3' + key,
  getDefault: url + 'SecretAction?actionId=73&serviceId=3' + key,
  getSendOrder: url + 'SecretAction?actionId=1&serviceId=7' + key,

  getPay: url + 'SecretAction?actionId=15&serviceId=16' + key,

  getMenuId: url + 'Action?actionId=6&serviceId=5' + key,

  getOrderLib: url + 'SecretAction?actionId=2&serviceId=7' + key,


  getOrderInformation: url + 'SecretAction?actionId=3&serviceId=7' + key,
  getOrderMenuInformation: url + 'SecretAction?actionId=4&serviceId=7' + key,

  
  deleteAddress: url + 'SecretAction?actionId=7&serviceId=4' + key,
  reviseAddress: url + 'SecretAction?actionId=5&serviceId=4' + key,

  pwdLogin: url + 'Action?actionId=11&serviceId=4' + key,


  exitLogin: url + 'SecretAction?actionId=38&serviceId=4' + key,
  registerCode: url + 'Action?actionId=58&serviceId=4' + key,
  registerNumber: url + 'Action?actionId=12&serviceId=4' + key,

  setUserName: url + 'SecretAction?actionId=43&serviceId=4' + key,
  setName: url + 'SecretAction?actionId=44&serviceId=4' + key,
  setSex: url + 'SecretAction?actionId=45&serviceId=4' + key,
  setBirthday: url + 'SecretAction?actionId=47&serviceId=4' + key,

  revisePwd: url + 'SecretAction?actionId=15&serviceId=4' + key,
  cancelOrder: url + 'SecretAction?actionId=5&serviceId=7' + key,
  confirmOrder: url + 'SecretAction?actionId=6&serviceId=7' + key,

  getMemberInformation: urlk + 'openapi/v4_2/card/by/',

  getActivityLib: urlk + 'openapi/v4_2/salesPromotion/list',

  getCouponLib: urlk + 'openapi/v4_2/pickUpCoupon/list/',

  getCouponQ: urlk + 'openapi/v4_2/pickUpCoupon/pickUp',
  useCoupon: urlk + 'openapi/v4_2/coupon/verification',

  cancelOrderVk: urlk + 'openapi/v4_2/order/cancel/',

  confirmOrderVk: urlk + 'openapi/v4_2/order/complete/',
  getloadingImg: urlk + 'webapi/v4_1/getParentStartImg/' + storeID,
  GetSharepersoninfo: urlk +'webapi/v4_1/activity/participation/information/', 
  getActivityList: urlk +'webapi/v4_1/activity/',
  getActivity: urlk +'webapi/v4_1/activity/getBrandActivity/',
  getUseIt: urlk +'webapi/v4_1/activity/participate',
  fastRegister: urlk +'openapi/v4_2/card/fastRegister',
  refund: url + 'SecretAction?actionId=14&serviceId=7' + key,
  cash: urlk + 'webapi/v4_1/activity/rewardMoneyConvertCardBalance',
}