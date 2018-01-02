App({

  globalData:{
    userInfo: null,
    windowWidth:0,
    windowHeight:0,
    doubanBase:'https://api.douban.com',
    search: '/v2/movie/search?q=',
    subject: "/v2/movie/subject/",
    filmMaker:'/v2/movie/celebrity/',
    inTheaters:'/v2/movie/in_theaters',
    comingSoon:'/v2/movie/coming_soon'
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.globalData.windowWidth=res.windowWidth;
        self.globalData.windowHeight=res.windowHeight;
      },
    });
  },

  getUserInfo:function(cb){
    var self=this;
    if(this.globalData.userInfo){
      typeof cb=='function'&&cb(this.globalData.userInfo);
    }else{
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              self.globalData.userInfo=res.userInfo;
              typeof cb == 'function' && cb(self.globalData.userInfo);
            }
          });
        }
      });
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
