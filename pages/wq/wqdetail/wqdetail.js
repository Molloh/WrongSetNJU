// pages/wq/wqdetail/wqdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    url:"/images/test/test-wq.png",
    category:"数学",
    question:"1+1=",
    answer:"2",
    date:"2019/12/20"
  },
  reInput: function () {
    wx.switchTab({
      url: '/pages/camera/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:options.id,
        url: options.url,
        category: options.category,
        question: options.description,
        answer: options.answer,
        date: options.date
      })
      
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