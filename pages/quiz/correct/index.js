// pages/quiz/correct/index.js
Page({

  data: {
    category: "数学",
    desc: "2019/12/18",
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
    console.log(param);
    this.setData({
      category: param.category,
      desc: param.data,
      wqs: param.wqs
    });
    wx.removeStorageSync('tmp_quiz');
  },

  onShowSubmitTap(e) {
    const config = this.data.submitConfig;
    this.setData({
      currentConf: config
    });
  },

  onConfirmSubmit(e) {
    // 提交批改过的试卷
  },

  onCorrectWQ(e) {
    let { index, isCorrect } = { ...e.detail };
    this.data.isMarked = true;
    this.data.wqs[index].isCorrect = isCorrect;
  }
})