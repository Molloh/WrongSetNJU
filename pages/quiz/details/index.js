// pages/quiz/old-quiz/index.js
import wxRequest from "../../../api/common.js";
const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMarked: true,
    totalNum: 0,
    correctNum: 0,
    category: "",
    desc: "2019/12/18",
    wqs: [
      {
        id: 0,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        date: "2019/12/1",
        category: "数学",
        answer: "2",
        myAnswer: "2",
        isCorrect: true
      },
    ]
  },

  onLoad: function (options) {
    let id = options.id;
    wxRequest({
      url: 'quiz/' + id,
      success: res => {
        console.log(res);
        let ques = [];
        let date = util.formatTime(res.data.date);
        let fromques = res.data.question_list;
        for (let i = 0; i < fromques.length; i++) {
          let tmp = {
            id: i,
            picture: fromques[i].url,
            desc: fromques[i].description,
            category: fromques[i].category,
            date: (i + 1) + ' - 错题记录时间：' + util.formatTime(fromques[i].date),
            answer: fromques[i].answer,
            myAnswer: fromques[i].myAnswer,
            isCorrect: fromques[i].is_correct
          }
          ques.push(tmp);
        }
        this.setData({
          category: res.data.category,
          isMarked: res.data.scored,
          totalNum: res.data.total_num,
          correctNum: res.data.correct_num,
          desc: '测验时间：' + date + '；共' + res.data.total_num + '题，对' + res.data.correct_num + '题',
          wqs: ques
        })
      }
    })
  },

})