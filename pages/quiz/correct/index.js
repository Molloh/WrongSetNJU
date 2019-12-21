// pages/quiz/correct/index.js
import wxRequest from "../../../api/common.js";
const util = require("../../../utils/util.js");

Page({
  data: {
    category: '',
    desc: '',
    wqs: [],
    isMarked: false,
    currentConf: {},
    submitConfig: {
      show: true,
      type: "confirm",
      showTitle: false,
      title: "",
      content: "完成批改？",
      confirmText: '确定',
      confirmColor: '#3683d6',
      cancelText: '取消',
      cancelColor: '#999'
    }
  },

  onLoad: function (options) {
    let param = wx.getStorageSync('tmp_quiz');
    if(param) {
      this.setData({
        category: param.category,
        desc: param.data,
        wqs: param.wqs
      });
      wx.removeStorageSync('tmp_quiz');
    }else {
      let id = options.id;
      wxRequest({
        url: 'quiz/' + id,
        success: res => {
          let cate = res.data.category;
          let desc = util.formatTime(res.data.date);
          let ques = [];
          let fromques = res.data.question_list;
          for (let i = 0; i < fromques.length; i++) {
            let tmp = {
              id: i,
              picture: fromques[i].url,
              desc: fromques[i].description,
              category: fromques[i].category,
              date: (i + 1) + ' - 错题记录时间：' + util.formatTime(fromques[i].date),
              answer: fromques[i].answer,
              myAnswer: '',
              isCorrect: null,
              _id: fromques[i]._id
            }
            ques.push(tmp);
          }
          this.setData({
            category: cate,
            desc: desc,
            wqs: ques
          })
        }
      })
    }
  },

  onShowSubmitTap(e) {
    const config = this.data.submitConfig;
    this.setData({
      currentConf: config
    });
  },

  onConfirmSubmit(e) {
    let q_arr = [];
    let a_arr = [];
    let c_arr = [];
    let wqs = this.data.wqs;
    for (let item of wqs) {
      q_arr.push(item._id);
      a_arr.push(item.myAnswer);
      if(item.isCorrect)
        c_arr.push(1);
      else
        c_arr.push(0);
    }
    console.log(q_arr);
    const ts = (new Date()).valueOf();
    wxRequest({
      url: 'quiz',
      method: 'POST',
      data: {
        is_corrected: 1,
        question_arr: q_arr,
        answer_arr: a_arr,
        correct_arr: c_arr,
        date: ts,
        time_used: 300,
        category: this.data.category
      },
      success: res => {
        console.log("/pages/quiz/details/index?id=" + res.data._id);
        wx.navigateTo({
          url: "/pages/quiz/details/index?id=" + res.data._id,
        })
      }
    })
  },

  onCorrectWQ(e) {
    let { index, isCorrect } = { ...e.detail };
    this.data.isMarked = true;
    this.data.wqs[index].isCorrect = isCorrect;
  }
})