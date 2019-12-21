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
     
    ]
  },
  onShow: function (options) {
    wxRequest({
      url: 'wqs',
      data:{
          dismissed:true
      },
      method: "GET",
      success: (res) => {
        let hisArr = [];
        console.log(res);
        for (let m in res.data.questions) {
           console.log(res.data.questions[m]);
          let x=res.data.questions[m];
          let tmp = {
            id: x._id,
            description: x.description,
            date: x.date,
            url: x.url,
            answer: x.answer,
            category: x.category,
            componentsPath: "/pages/wq/wqdetail/wqdetail?description=" + x.description + "&date=" + x.date + "&url=" + x.url + "&answer=" + x.answer + "&category=" + x.category + "&id=" + x._id,
          }
          hisArr.push(tmp);
        }
        this.setData({
          historyQuizzes: hisArr
        })
        console.log(hisArr);
      },
    });
  },

  // onLoad: function (options) {
  //   wxRequest({
  //     url: 'wqs',
  //     method:"GET",
  //     success: (res) => {
  //       let hisArr = [];
  //       console.log(res);
  //       for (let x in res.data.questions) {
          
  //         let tmp = {
  //           id:x._id,
  //           description:x.description,
  //           date:x.date,
  //           url:x.url,
  //           answer:x.answer,
  //           category:x.category,
  //           componentsPath: "/pages/wq/wqdetail/wqdetail?descrpition=" +x.description+"&date="+x.date+"&url="+x.url+"&answer="+x.answer+"&category="+x.category+"&id="+x._id,
  //         }
  //         hisArr.push(tmp);
  //       }
  //       this.setData({
  //         historyQuizzes:hisArr
  //       })
  //       console.log(hisArr);
  //     },
  //   });
  // },
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})