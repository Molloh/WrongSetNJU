// pages/quiz/index.js
import {quizConfig, countConfig} from "./quiz-dialog.js";
import wxRequest from "../../api/common.js";

const util = require("../../utils/util.js");
const donePath = "/images/quiz/done.png";
const todoPath = "/images/quiz/todo.png";
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyQuizzes: [
      {
        date: "数学",
        desc: "2019/12/17  正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details/index?id=1"
      },
      {
        date: "英语",
        desc: "2019/12/17  尚未批改",
        icon: todoPath,
        componentsPath: "/pages/quiz/details/index?id=1"
      },
      {
        date: "物理",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details/index?id=1"
      },
      {
        date: "化学",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details/index?id=1"
      },
      {
        date: "语文",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details/index?id=1"
      },
      {
        date: "数学",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details/index?id=1"
      }
    ],
    categories: [
      {
        id: 1,
        type: "数学"
      },
      {
        id: 2,
        type: "语文"
      },
      {
        id: 3,
        type: "英语"
      },
      {
        id: 4,
        type: "化学"
      },
      {
        id: 5,
        type: "物理"
      }
    ],
    quizConfig,
    countConfig,
    currentConf: {},    
    quizForm: {
      num: 10,
      category: "数学"
    }
  },

  onLoad: function (options) {
    // 获取所有历史测验数据
    wxRequest({
      url: 'quiz',
      success: (res) => {
        let hisArr = [];
        console.log(res);
        for(let x in res.data.quizzes) {
          let dis = x.scored ? "正确率：" + x.correct_num + "/" + x.total_num : "尚未批改";
          let tmp = {
            date: x.category,
            desc: util.formatTime(x.date) + dis,
            componentsPath: "/pages/quiz/details/index?id=" + x._id,
            icon: ""
          }
          hisArr.push(tmp);
        }
        this.setData({
          historyQuizzes: hisArr
        })
      },
    });
    
  },

  // 确定按钮
  onConfirmTap(e) {
    wx.navigateTo({
      url: '../quiz/new-quiz/index?num=' + this.data.quizForm.num + '&category=' + this.data.quizForm.category
    })
    console.log('../quiz/new-quiz/index?num=' + this.data.quizForm.num + '&category=' + this.data.quizForm.category);
  },

  // 显示新建测试dialog
  onShowNewQuizTap(e) {
    const config = this.data.quizConfig;
    this.setData({
      currentConf: config
    });
  },
  
  // 更改题目数量
  onChangeNum(e) {
    const { count } = { ...e.detail };
    this.setData({
      'quizForm.num': count
    });
  },

  // 更改测验科目
  onChangeCategory(e) {
    const { currentKey } = { ...e.detail };
    const currentType = this.data.categories[currentKey - 1].type;
    this.setData({
      'quizForm.category': currentType
    });
  },

})