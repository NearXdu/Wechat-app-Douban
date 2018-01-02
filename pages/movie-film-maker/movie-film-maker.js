// pages/movie-film-maker/movie-film-maker.js
var  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoadding:false,
    movie:{}
  },

  bindPoster:function(e){
    var url = e.currentTarget.dataset.posterUrl;

    wx.previewImage({
      urls: [url]
    });

  },
  bindWork:function(e){
    var id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../movie-detail/movie-detail?id='+id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var url = app.globalData.doubanBase+app.globalData.filmMaker+id;
    var self = this;
    wx.request({
      url: url,
      header: { 'content-type': 'json' },
      success:function(res){

        var data = res.data;
        self.processData_(data);
        self.setData({
          hiddenLoadding:true
        });
        
      }
    });
  },
  processData_:function(data){
    console.log(data);
    var works=[];
    for(let idx in data.works){
      works.push(data.works[idx].subject);
    }
    var temp={
      id:data.id,
      name:data.name,
      name_en:data.name_en,
      born_place:'出生地：'+data.born_place,
      avatars:data.avatars,
      gender:data.gender,
      works:works
    }
    var readyData={};
    readyData['movie']=temp;
    this.setData(readyData);

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
  
  }
})