// pages/quiz/correct/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: "数学",
    desc: "2019/12/18",
    wqs: [],
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