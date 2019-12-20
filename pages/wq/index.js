// pages/wq/index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // id: 0,
    icon: "/images/navigator/wq-select.png",
    componentsPath: "/pages/wq/wqdetail/wqdetail",
    historyQuizzes: [
      {
        id: 0,

        icon:"/images/navigator/wq-select.png",
        date:"2019/12/20",
        description:"1+1",
        category: "数学",
        answer:"2",
        url:"",
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
    wx.request({
      url: 'https://netwx.c-leon.top/api/wqs',
      data:"",
      method:"GET",
      success: (res) => {
        let hisArr = [];
        console.log(res);
        for (let x in res.data.questions) {
          
          let tmp = {
            id:x.id,
            description:x.description,
            date:x.date,
            url:x.url,
            answer:x.answer,
            category:x.category,
            componentsPath: "/pages/wq/wqdetail/wqdetail?descrition=" + x.description+"&date="+x.date+"&url="+x.url+"&answer="+x.answer+"&category="+x.category,
          }
          hisArr.push(tmp);
        }
        this.setData({
          historyQuizzes:hisArr
        })
        console.log(hisArr);
      },
    });
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