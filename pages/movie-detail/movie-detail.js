// pages/movie/movie-detail/movie-detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoadding: false,
    movie: {},
    showAllDesc: false
  },

  bindExpand: function (e) {
    this.setData({
      showAllDesc: true
    });
  },

  bindCutoff: function (e) {
    this.setData({
      showAllDesc: false
    });
  },

  bindPoster: function (e) {
    var url = e.currentTarget.dataset.posterUrl;

    wx.previewImage({
      urls: [url]
    });

  },


  bindWish: function (e) {
    wx.showModal({
      title: '提示',
      content: '买票这个功能没有',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('user confirmed');
        }
      }
    });
  },
  bindAlready: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-rating/movie-rating?id=' + id
    })
  },

  bindFilmMaker :function (e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var avatars= e.currentTarget.dataset.avatars;
    wx.redirectTo({
      url: '../movie-film-maker/movie-film-maker?id='+id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var self = this;
    var url = app.globalData.doubanBase + app.globalData.subject + id;

    wx.request({
      url: url,
      header: { 'content-type': 'json' },
      success: function (res) {
        var data = res.data;
        //影人
        var filmMaker = [];
        //类型
        var genres = '';
        //地区
        var country = '国家：';
        //分隔符
        var separate = '/';
        //别名
        var aka = '又名：';

        for (let i in data.directors) {
          filmMaker.push(data.directors[i])
        }
        for (let j in data.casts) {
          filmMaker.push(data.casts[j]);
        }
        for (let k in data.genres) {
          if (k < data.genres.length - 1)
            genres += data.genres[k] + separate;
          else
            genres += data.genres[k];
        }
        if (genres.length == 0) {
          genres = '剧情';
        }

        for (let l in data.countries) {
          if (l < data.countries.length - 1)
            country += data.countries[l] + separate;
          else
            country += data.countries[l];
        }
        if (data.aka.length > 0)
          aka += data.aka[0];
        else
          aka += data.original_title;


        var readyData = {};
        readyData['movie'] = {
          id: data.id,
          title: data.title,
          images: data.images,
          collectCount: data.collect_count,
          commentsCount: data.comments_count,
          wishCount: data.wish_count,
          reviewsCount: data.reviews_count,
          doCount: data.do_count,
          genres: genres,
          subtype: data.subtype,
          summary: data.summary,
          rating: data.rating,
          ratingCount: data.ratings_count + '人',
          shareUrl: data.share_url,
          year: data.year,
          aka: aka,
          filmMaker: filmMaker,
          countries: country
        };
        self.setData(readyData);
        console.log(self.data.movie);
        self.setData({
          hiddenLoadding: true
        });
      }
    });
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