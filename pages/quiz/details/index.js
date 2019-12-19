// pages/quiz/old-quiz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isMarked: true,
    totalNum: 5,
    correctNum: 5,
    category: "数学",
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

  onLoad: function (options) {
    console.log(this.data.id);
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