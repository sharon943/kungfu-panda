
function setCacheData (openId, city, JSESSIONID, latitude, longitude) {
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
      console.log(res);

      if (!JSESSIONID) {
        JSESSIONID = res.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
      }


      app.globalData.JSESSIONID = JSESSIONID;
      that.getShopData(JSESSIONID, latitude, longitude);
      that.getPageData(JSESSIONID);
      //   that.getCacheData(JSESSIONID);

    }
  })
}