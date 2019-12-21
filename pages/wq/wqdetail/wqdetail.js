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
    this.setData({
      url: options.url,
      category: options.category,
      question: options.description,
      answer: options.answer,
      date: options.date
    })
  },
})