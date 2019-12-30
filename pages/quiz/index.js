// pages/quiz/index.js
import wxRequest from "../../api/common.js";

const util = require("../../utils/util.js");
const donePath = "/images/quiz/done.png";
const todoPath = "/images/quiz/todo.png";
const wrongPath = "/images/quiz/wrong.png";
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyQuizzes: [],
    categories: [],
    quizConfig: {
      show: true,
      type: "confirm",
      showTitle: true,
      title: "新建测验",
      content: "",
      confirmText: '确定',
      confirmColor: '#3683d6',
      cancelText: '取消',
      cancelColor: '#999'
    },
    countConfig: {
      count: 10,
      min: 5,
      max: 20,
      step: 5,
      disabled: false
    },
    currentConf: {},    
    quizForm: {},
    cancreate: true
  },

  onLoad: function (options) {
    // 获取所有历史测验数据
    wxRequest({
      url: 'quiz',
      success: (res) => {
        let hisArr = [];
        for(let x of res.data.quizzes) {
          let dis = x.scored ? " 正确率：" + x.correct_num + "/" + x.total_num : " 尚未批改";
          let flag = x.correct_num == x.total_num;
          let ipath = flag ? donePath : wrongPath;
          let cpath;
          if(x.scored)
            cpath = "/pages/quiz/details/index?id=" + x._id;
          else
            cpath = "/pages/quiz/correct/index?id=" + x._id
          let tmp = {
            date: x.category,
            desc: "测验时间：" + util.formatTime(x.date) + dis,
            componentsPath: cpath,
            icon: ipath
          }
          hisArr.push(tmp);
        }
        this.setData({
          historyQuizzes: hisArr
        })
      },
    });
    // 获取所有的题目
    wxRequest({
      url: 'wqs',
      success: (res) => {
        if (res.data.questions.length == 0) {
          this.setData({
            cancreate: false
          })
        }else {
          this.setData({
            cancreate: true
          })
        }
      }
    })
  },

  onShow() {
    this.onLoad();
  },

  // 确定按钮
  onConfirmTap(e) {    
    wx.navigateTo({
      url: '../quiz/new-quiz/index?num=' + this.data.quizForm.num + '&category=' + this.data.quizForm.category
    })
  },

  // 显示新建测试dialog
  onShowNewQuizTap(e) {
    if(this.data.cancreate) {
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
            },
            countConfig: {
              count: 10,
              min: 5,
              max: 20,
              step: 5,
              disabled: false
            }
          })
        }
      });
      const config = this.data.quizConfig;
      this.setData({
        currentConf: config
      });
    }else {
      wx.lin.showMessage({
        type: 'warning',
        duration: 1500,
        content: '未找到错题，无法生成测验！'
      })
    }
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