// pages/quiz/index.js
import {quizConfig, countConfig} from "./quiz-dialog.js";
const donePath = "/images/quiz/done.png";
const todoPath = "/images/quiz/todo.png";
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
        componentsPath: "/pages/quiz/details?id=1"
      },
      {
        date: "英语",
        desc: "2019/12/17  尚未批改",
        icon: todoPath,
        componentsPath: "/pages/quiz/details?id=1"
      },
      {
        date: "物理",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details?id=1"
      },
      {
        date: "化学",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details?id=1"
      },
      {
        date: "语文",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details?id=1"
      },
      {
        date: "数学",
        desc: "2019/12/17 正确率：9/10",
        icon: donePath,
        componentsPath: "/pages/quiz/details?id=1"
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
    currentConf: {}    
  },

  onLoad: function (options) {

  },

  // 确定按钮
  onConfirmTap(e) {
    setTimeout(() => {
      wx.showToast({
        title: '点击了确定～',
        icon: 'none'
      })
    }, 100)
  },

  // 取消按钮
  onCancelTap(e) {
    setTimeout(() => {
      wx.showToast({
        title: '点击了取消～',
        icon: 'none'
      })
    }, 100)
  },

  // 显示 dio
  onShowDioTap(e) {
    const config = this.data.quizConfig
    this.setData({
      currentConf: config
    })
  },
  
  // 选择
  onChange(e) {
    const {
      currentKey
    } = {
      ...e.detail
    };
    this.setData({
      currentKey
    });
  },

  onOut() {
    wx.showToast({
      title: '超出限制',
    });
  },
})