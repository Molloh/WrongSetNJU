// pages/quiz/new-quiz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    category: "",
    date: "",
    currentConf: {},  
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
      {
        id: 1,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        date: "2019/12/1",
        answer: "2",
        myAnswer: "2",
        isCorrect: true
      },
      {
        id: 2,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        date: "2019/12/1",
        answer: "2",
        myAnswer: "2",
        isCorrect: true
      },
      {
        id: 3,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        date: "2019/12/1",
        answer: "2",
        myAnswer: "2",
        isCorrect: true
      },
      {
        id: 4,
        picture: "/images/test/test-wq.png",
        desc: "1+1=?",
        category: "数学",
        date: "2019/12/1",
        answer: "2",
        myAnswer: "2",
        isCorrect: true
      }
    ],
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
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.setData({
      date: year + "/" + month + "/" + day,
      num: options.num,
      category: options.category
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
    wx.setStorageSync('tmp_quiz', currentQuiz);
    wx.navigateTo({
      url: '../correct/index',
    })
  },

  // 根据问题更改对应的答案
  onGetAnswer(e) {
    let { index, myAnswer } = { ...e.detail };
    this.data.wqs[index].myAnswer = myAnswer;
  },

})