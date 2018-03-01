var app = getApp();
Page({
  data:{
    number:'',
    num : 1
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      number: options.order_no
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    if (this.data.num == 1){
      wx.navigateBack({
        delta: 1
      })
    }
    
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  BtnGoTo:function(){
    this.data.num = 2;
    wx.redirectTo({
      url: '../information/information?order_no=' + this.data.number,
    })
  }
})