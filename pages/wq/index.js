// pages/wq/index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id: 0,
    
   
    wqs: [
      {
        id: 0,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        answer: "2",
      },
      {
        id: 1,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        answer: "2",
       
      },
      {
        id: 2,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        
        answer: "2",
      
      },
      {
        id: 3,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        
        answer: "2",
        
      },
      {
        id: 4,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        
        answer: "2",
        
      }
    ]
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})