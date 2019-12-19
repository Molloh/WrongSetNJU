// pages/quiz/new-quiz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    category: "",
    date: "",
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
    ]
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})