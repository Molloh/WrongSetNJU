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
      }
    ],
    categories: [],
    quizConfig,
    countConfig,
    currentConf: {},    
    quizForm: {}
  },

  onLoad: function (options) {
    // 获取所有历史测验数据
    wxRequest({
      url: 'quiz',
      success: (res) => {
        let hisArr = [];
        console.log(res);
        for(let x of res.data.quizzes) {
          let dis = x.scored ? "正确率：" + x.correct_num + "/" + x.total_num : " 尚未批改";
          let ipath = x.scored ? donePath : todoPath;
          let cpath;
          if(x.scored)
            cpath = "/pages/quiz/details/index?id=" + x._id;
          else
            cpath = "/pages/quiz/correct/index?id=" + x._id
          let tmp = {
            date: x.category,
            desc: util.formatTime(x.date) + dis,
            componentsPath: cpath,
            icon: ipath
          }
          hisArr.push(tmp);
        }
        console.log(hisArr);
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
  },

  // 显示新建测试dialog
  onShowNewQuizTap(e) {
    wxRequest({
      url: 'wqs/categories',
      success: res => {
        let arr = res.data;
        let cate = [];
        for(let i = 0; i < arr.length; i++) {
          let tmp = {
            id: i + 1,
            type: arr[i]
          }
          cate.push(tmp);
        }
        this.setData({
          categories: cate,
          quizForm: {
            num: 10,
            category: cate[0].type
          }
        })
      }
    });
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