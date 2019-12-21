// pages/wq/index.js
import wxRequest from "../../api/common.js";
const util = require("../../utils/util.js");
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // id: 0,
    icon: "/images/wrongInput/wq.png",
    componentsPath: "/pages/wq/wqdetail/wqdetail",
    historyQuizzes: []
  },

  onShow: function (options) {
    wxRequest({
      url: 'wqs',

      
      success: (res) => {
        let hisArr = [];
        console.log(res);
        for (let x of res.data.questions) {
          let date = util.formatTime(x.date);
          let tmpstorage = {
            description: x.description,
            date: date,
            url: x.url,
            answer: x.answer,
            category: x.category
          }
          let id = x._id;
          wx.setStorageSync(id, tmpstorage);
          let cpath = "/pages/wq/wqdetail/wqdetail?id=" + id;
          let desc;
          if(x.description)
            desc = x.description.substring(0, 11) + "...";
          else
            desc = "..."
          let tmp = {
            description: desc,
            date: date,
            url: x.url,
            answer: x.answer,
            category: x.category,
            componentsPath: cpath,
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