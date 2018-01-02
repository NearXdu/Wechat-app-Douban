// pages/movie-more/movie-more.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIntheaters:false,
    showComingSoon:false,
    acquire_1:false,
    acquire_2:false,
    inTheaters:{},
    comingSoon:{}
  },

  handleTickettap:function(e){
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
    });
  },

  handleWishtap:function(e){
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
    });
  },

  bindMovieDetail : function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id='+id,
    });
  },

  handleLower:function(e){
    var show = this.data.showIntheaters;
    var key='';
    if(show){
      key='inTheaters';
    }else{
      key='comingSoon';
    }
    this.getData_(key);
  },

  bindSelected:function(e){
    var self=this;
    if(e.currentTarget.dataset.selected=='1'){
      this.setData({
        showIntheaters: true,
        showComingSoon: false
      });
      if(!self.data.acquire_1){
        self.getData_('inTheaters');
        self.setData({
          acquire_1:true
        });
      }
    }else{
      this.setData({
        showIntheaters: false,
        showComingSoon: true
      });
      if (!self.data.acquire_2) {
        self.getData_('comingSoon');
        self.setData({
          acquire_2: true
        });
      }
    }
  },

  getUrlByKey_:function(key){
    if(key=='inTheaters'){
      return app.globalData.doubanBase + app.globalData.inTheaters;
    }else{
      return app.globalData.doubanBase + app.globalData.comingSoon;
    }
  },

  getData_:function(key){
    var self = this;
    var offset = self.data[key].offset || 0;
    var total = self.data[key].total || 999;
    if(offset>=total){
      wx.showToast({
        title: '没有更多了',
      });
      return;
    }
    var url=self.getUrlByKey_(key);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      data:{
        start:offset,
        count:5
      },
      header:{'content-type':'json'},
      success:function(res){
        // var data =  res.data;
        var subjects = res.data.subjects;
        var movies = self.data[key].movies || [];
        var offset = self.data[key].offset || 0;
        var total = res.data.total;
        offset += subjects.length;
        for (let idx in subjects) {
          var subject = subjects[idx];
          var directors = "";
          for (let i in subject.directors) {
            directors += subject.directors[i].name;
          }
          var casts = "";
          var separate = "/";
          for (let j in subject.casts) {
            casts += subject.casts[j].name + separate;
          }
          casts = casts.substring(0, casts.length - separate.length);

          var genres = "";
          for (let k in subject.genres) {
            genres += subject.genres[k] + separate;
          }
          genres = genres.substring(0, genres.length - separate.length);
          var temp = {
            id: subject.id,
            title: subject.title,
            rating: subject.rating,
            collectCount: subject.collect_count,
            images: subject.images,
            subtype: subject.subtype,
            directors: directors,
            genres: genres,
            casts: casts,
            key: key,
            year: subject.year
          };
          movies.push(temp);
        }
        var readyData = {};
        readyData[key] = {
          categoryType: key,
          offset: offset,
          total: total,
          movies: movies
        }
        console.log(readyData);
        self.setData(readyData);

      },
      complete:function(){
        wx.hideToast();
      }

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var key=options.type;
    if(key=='inTheaters'){
      this.setData({
        showIntheaters:true,
        showComingSoon:false,
        acquire_1:true,
        windowHeight:app.globalData.windowHeight,
        windowWidth: app.globalData.windowWidth
      });
    }else{
      this.setData({
        showIntheaters: false,
        showComingSoon: true,
        acquire_2:true,
        windowHeight: app.globalData.windowHeight,
        windowWidth: app.globalData.windowWidth
      });
    }

    self.getData_(key);
    
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