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
        });
        if(app.globalData.uploadSuccess) {
          wx.lin.showMessage({
            type: 'success',
            duration: 1500,
            content: '错题上传成功'
          });
          app.globalData.uploadSuccess = false;
        }
      },
    });
  },
  
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})