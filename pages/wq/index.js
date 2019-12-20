// pages/wq/index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id: 0,
    // historyQuizzes: [
    //   {
    //     date: "数学",
    //     desc: "2019/12/17  正确率：9/10",
    //     icon: donePath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   },
    //   {
    //     date: "英语",
    //     desc: "2019/12/17  尚未批改",
    //     icon: todoPath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   },
    //   {
    //     date: "物理",
    //     desc: "2019/12/17 正确率：9/10",
    //     icon: donePath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   },
    //   {
    //     date: "化学",
    //     desc: "2019/12/17 正确率：9/10",
    //     icon: donePath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   },
    //   {
    //     date: "语文",
    //     desc: "2019/12/17 正确率：9/10",
    //     icon: donePath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   },
    //   {
    //     date: "数学",
    //     desc: "2019/12/17 正确率：9/10",
    //     icon: donePath,
    //     componentsPath: "/pages/quiz/details/index?id=1"
    //   }
    // ],
   
    historyQuizzes: [
      {
        id: 0,
        icon:"/images/navigator/wq-select.png",
        date:"2019/12/20",
        question:"1+1",
        category: "数学",
        componentsPath: "/pages/wq/wqdetail/wqdetail",
      },
      {
        id: 1,
        icon: "/images/navigator/wq-select.png",
        date: "2019/12/20",
        question: "1+1",
        category: "数学",
       
      },
      {
        id: 2,
        icon: "/images/navigator/wq-select.png",
        date: "2019/12/20",
        question: "1+1",
        category: "数学",
      
      },
      {
        id: 3,
        icon: "/images/navigator/wq-select.png",
        date: "2019/12/20",
        question: "1+1",
        category: "数学",
        
      },
      {
        id: 4,
        icon: "/images/navigator/wq-select.png",
        date: "2019/12/20",
        question: "1+1",
        category: "数学",
      }
    ]
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