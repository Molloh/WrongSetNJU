// pages/wq/index.js
// 获取应用实例
import wxRequest from "../../api/common.js";
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
    wxRequest({
      url: 'wqs',
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