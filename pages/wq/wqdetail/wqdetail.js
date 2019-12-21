// pages/wq/wqdetail/wqdetail.js
const util = require("../../../utils/util.js");

Page({
  data: {
    url: '',
    category: '',
    question: [],
    answer: '',
    date: ''
  },

  reInput: function () {
    wx.switchTab({
      url: '/pages/camera/index'
    })
  },

  onLoad: function (options) {
    let opt = wx.getStorageSync(options.id);
    this.setData({
      url: opt.url,
      category: opt.category,
      question: opt.description,
      answer: opt.answer,
      date: opt.date
    })
  },
})