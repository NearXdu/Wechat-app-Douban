// pages/movie/search/search.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDelete: false,
    searchValue: '',
    results:{},
    placeHolder:'搜索电影',
    windowHeight:app.globalData.windowHeight-100
  },



  /**
   * 处理搜索
   */
  bindSearchInput: function (e) {
    var value = e.detail.value;
    if (value.length > 0) {
      this.setData({
        showDelete: true
      });
      this.handleSearchData_(value);
    }
  },

  /**
   * 处理搜索数据的内部函数
   */
  handleSearchData_: function (value) {
    var self = this;
    var controls='&&start=0&&count=10';
    var searchURL=app.globalData.doubanBase+app.globalData.search+value+controls;
    wx.request({
      url: searchURL,
      header:{'content-type':'json'},
      success: function(res){
        var data=res.data;
        self.processData_(data);
        //console.log(res);
      }
    });
  },
  /**
   * 数据聚合 json解析
   */
  processData_:function(data){
    var movies=[];
    for(let idx in data.subjects){
      //1. obtain one row data
      var subject=data.subjects[idx];
      //2. construct info data
      var separate='/';
      var movieTypes='';
      var genres=subject.genres;

      // 2.1 construct scores
      var score=subject.rating.average+'分';
      // 2.2 construct year
      var year = subject.year;
      // 2.3 construct genres
      for(let jdx in genres){
        if(jdx<genres.length-1)
          movieTypes+=genres[jdx]+separate;
        else
          movieTypes+=genres[jdx];
      }
      // 2.4 set default value
      if(movieTypes.length==0)
        movieTypes='剧情';

      var info = score + separate + year + separate + movieTypes;

      var tmp={
        info : info,
        images: subject.images,
        title: subject.title,
        id:subject.id
      };
      movies.push(tmp);  
    }
    var ready={};
    ready['results']={
      subjects:movies
    };
  //  console.log(ready);
    this.setData(ready);
  },
  /**
   * 进入详情页
   */
  bindSearchDetail:function(e){
    var id = e.currentTarget.dataset.id;

    wx.redirectTo({
      url: '../movie-detail/movie-detail?id=' + id,
    });
    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/subject/'+id,
    //   header: { 'content-type': 'json' },
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
  },
  /**
   * 处理清楚搜索数据
   */
  bindSearchDelete: function (e) {
    var dataStruct = {
      showDelete: false,
      searchValue: '',
      results:{},
    };
    this.setData(dataStruct);
  },



  /**
   * 处理取消：返回上一级
   */
  bindSearchCancel: function (e) {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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