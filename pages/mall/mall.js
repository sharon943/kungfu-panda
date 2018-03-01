
Page({
  data: {
    height: 0,
 
    scrollTop: 100,
    curIndex: 1,
    toView: '',
    listsHeight: [],
    unitPx: 0.5,
    toViewLeft: '',
    menu: [
      { value: 'one', height: 0, name: '类别一', header: '我的header1我介绍', id: 1, food: [
        { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
        { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
        { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
        { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }] 
      },
     { value: 'two', height: 0, name: '类别二', header: '我的header2我介绍', id: 2, food: [
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }] 
       },
     { value: 'three', height: 0, name: '类别三', header: '我的header3我介绍', id: 3, food: [
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }] 
       },
     { value: 'four', height: 0, name: '类别四', header: '我的header4我介绍', id: 4, food: [
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }] 
       },
     { value: 'five', height: 0, name: '类别五', header: '我的header5我介绍', id: 5, food: [
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }, 
       { title: '名称', cost: 200, intro: '简介', img: '../../img/1.jpg' }] 
       }
],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
   
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          height: res.windowHeight,
          unitPx: res.windowWidth / 750
        });
      }
    });
  },
  onReady: function (options) {
    console.log(this.data.menu)
    var list = this.getListHeight(this.data.menu, this.data.unitPx);
    this.setData({
      listsHeight: list
    });
  },
  switchTab: function (e) {
    this.setData({
      curIndex: e.target.dataset.id,
      toView: e.target.dataset.value
    })
  },
  scroll: function (e) {
    console.log(e.detail.scrollTop);
    var heights = this.data.listsHeight;
    var tempValue, tempId;
    for (var i in heights) {
      if (e.detail.scrollTop >= heights[i].height) {
        tempValue = heights[i].value;
        tempId = heights[i].id;
      }
    }
    this.setData({
      curIndex: tempId,
      toViewLeft: tempValue
    });
  },
  getListHeight: function (arr, unit) {
    var kidsLength = 0; //获取该列子元素的长度
    for (var i in arr) {
      if (i == 0) {
        kidsLength = arr[i].food.length;
        continue;
      }
      arr[i].height = arr[i - 1].height + (kidsLength * 130 + 50) * unit;
      kidsLength = arr[i].food.length;
    }
    console.log(arr);
    return arr;
  }
})