// pages/movie/movie-detail/rating/rating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: 0
  },
  bindMark: function (e) {
    var id = e.target.dataset.id;
    this.setData({ "mark": id });
  },

  handleConfirm:function(e){
    wx.showModal({
      title: '提示',
      content: '评分功能没有',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('user confirmed');
          wx.navigateBack({
            
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
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