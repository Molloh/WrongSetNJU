// pages/wrongInput/wrongInput.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1: [
      
    ],
    items6: [{
      id: 1,
      name: '数学',
    }, {
      id: 2,
      name: '语文'
    }, {
      id: 3,
      name: '英语',
    }, {
      id: 4,
      name: '其他',
    }],
    photourl:"",
    question: "",
    answer:"",
    cata:"",
    tempcat:"",
    currentKey:null,
  },
  onChange(e) {
    const {
      currentKey
    } = {
      ...e.detail
    };
    this.setData({
      currentKey
    });
    console.log(this.data.currentKey);
  },
  addPicture: function (e) {
    const{
      current
    }={
      ...e.detail
    };
    this.setData({
      photourl:current[0].url
    })
    console.log(this.data.photourl);
  },
  clear() {
    this.setData({
      clear: true
    })
  },
  onClearTap(e) {
    console.log(e)
    if (e.detail) {
      wx.lin.showToast({
        title: `清除图片成功`,
        icon: 'success',
        duration: 2000,
        iconStyle: 'color:#7ec699; size: 60'
      })
    }
  },
  onChangeTap(e) {
    console.log(e)
    const count = e.detail.current.length
    wx.lin.showToast({
      title: `添加${count}张图片~`,
      icon: 'picture',
      duration: 2000,
      iconStyle: 'color:#7ec699; size: 60'
    })
  }, 
  onLoadTap: function () {
    if (this.data.currentKey==1){
      this.setData({
        cata:"数学"
      })
    } else if (this.data.currentKey == 2) {
      this.setData({
        cata: "语文"
      })
    } else if (this.data.currentKey == 3) {
      this.setData({
        cata: "英语"
      })
    }else{
      this.setData({
        cata:this.data.tempcata
      })
    }
    console.log(this.data.photourl);
    console.log(this.data.question);
    console.log(this.data.answer);
    console.log(this.data.cata);
    wx.uploadFile({
      url: '',
      filePath: this.data.photourl,
      name: 'file',
      formData: {
        
        'question': this.data.question,
        'answer': this.data.answer,
        'cata': this.data.cata,
        
      },
    })
  },
  onRemoveTap(e) {
    console.log(e)
    const index = e.detail.index
    wx.lin.showMessage({
      type: 'error',
      content: `删除下标为${index}图片~`,
      duration: 1500,
      icon: 'warning'
    })
  },
  onPreviewTap(e) {
    console.log(e.detail)
  },

  onTextInput(e) {
    let { value } = { ...e.detail };
    this.setData({
      question: value
    })
    console.log(this.data.question);
  },
  onTextInput1(e){
    let {value} = {...e.detail};
    this.setData({
      answer:value
      
    })

    console.log(this.data.answer);
  },
  onTextInput2(e) {
    let { value } = { ...e.detail };
    this.setData({
      tempcata:value 
    })
    
    console.log(this.data.tempcata); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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