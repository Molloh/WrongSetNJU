// pages/quiz/new-quiz/index.js
import wxRequest from "../../../api/common.js";
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    category: "",
    date: "",
    currentConf: {},
    wqs: [],
    submitConfig: {
      show: true,
      type: "confirm",
      showTitle: false,
      title: "",
      content: "是否提交并开始批改？",
      confirmText: '确定',
      confirmColor: '#3683d6',
      cancelText: '取消',
      cancelColor: '#999'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxRequest({
      url: 'quiz/generate/' + options.num + '/' + options.category,
      success: res => {
        let ques = [];
        let fromques = res.data.questions;
        for (let i = 0; i < fromques.length; i ++) {
          let tmp = {
            id: i,
            picture: fromques[i].url,
            desc: fromques[i].description,
            category: fromques[i].category,
            date: (i+1) + ' - 错题记录时间：' + util.formatTime(fromques[i].date),
            answer: fromques[i].answer,
            myAnswer: '',
            isCorrect: null,
            _id: fromques[i]._id
          }
          ques.push(tmp);
        }
        console.log(ques);
        this.setData({
          wqs: ques
        });
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let len = fromques.length
        this.setData({
          date: year + "/" + month + "/" + day,
          num: len,
          category: options.category + "，共" + len + '题'
        });
      }
    });
  },

  onShowSubmitTap(e) {
    const config = this.data.submitConfig;
    this.setData({
      currentConf: config
    });
  },

  onConfirmSubmit(e) {
    let currentQuiz = {
      category: this.data.category,
      date: this.data.date,
      wqs: this.data.wqs
    };
    console.log(this.data.wqs);
    wx.setStorageSync('tmp_quiz', currentQuiz);
    // wx.navigateTo({
    //   url: '../correct/index',
    // })
  },

  // 根据问题更改对应的答案
  onGetAnswer(e) {
    let { index, myAnswer } = { ...e.detail };
    this.data.wqs[index].myAnswer = myAnswer;
  },

})