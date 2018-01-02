// pages/movie/movie.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{}
  },

  bindMore:function(e){
    var tabType=e.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '../movie-more/movie-more?type='+tabType,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&&count=10";
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + "?start=0&&count=10";

    this.getData_(inTheatersURL,'inTheaters');
    this.getData_(comingSoonURL,"comingSoon");

  },

  bindWork:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    });
  },

  getData_:function(url,key){
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:10000
    });
    

    var self = this;
    
    wx.request({
      url: url,
      header:{'content-type':'json'},
      success:function(res){
        var data= res.data;
        self.processData_(data,key);
      },
      complete:function(){
        wx.hideToast();
      }
    })

  },

  processData_ :function(data,key){
    var readyData={};
    var movies=[];
    for (let idx in data.subjects){
      var subject = data.subjects[idx];
      var temp={
        id:subject.id,
        title: subject.title,
        rating: subject.rating,
        collect_count: subject.collect_count,
        images: subject.images,
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.year
      };
      movies.push(temp);
    }
    readyData[key]={
      movies:movies
    }
    console.log(readyData);
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

  },


  bindSearchNavigate: function (e) {
    wx.navigateTo({
      url: '../search/search',
    });
  }
})