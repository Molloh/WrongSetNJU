import wxRequest from "../../api/common.js";
const util = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    arr1: [],
    arr2: [],
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
    dismissed:"false",
    currentKey:null,
  },

  onChange(e) {
    const { currentKey } = { ...e.detail };
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

  removePicture() {
    this.setData({
      photourl: ""
    })
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
    if (this.data.currentKey == null) {
      this.setData({
        cata: ""
      })
    } else if(this.data.currentKey==this.data.arr2.length){
      this.setData({
        cata: this.data.tempcata
      })
    }else{
      this.setData({
        cata: this.data.arr2[this.data.currentKey]
      })
    }
    // 获取当前openid
    let auth = wx.getStorageSync("openid")
    if (auth == '') {
      app.onLogin();
    }
    const ts = Date.parse(new Date());
    // 上传错题信息
    let flag = true;
    if (this.data.photourl == "" || this.data.answer == "" || this.data.question == "" || this.data.cata == "") {
      console.log(this.data);
      flag = false;
    }

    if(flag) {
      wx.showLoading({ title: '错题上传中…' });
      wx.uploadFile({
        url: 'https://netwx.c-leon.top/api/wqs_file',
        filePath: this.data.photourl,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'authorization': auth
        },
        formData: {
          date: ts,
          description: this.data.question,
          answer: this.data.answer,
          category: this.data.cata,
          dismissed: false,
        },
        success:function(res){
          const log = res.data;
          wx.switchTab({
            url: '../wq/index',
            success: function (e) {
              wx.hideLoading();
              app.globalData.uploadSuccess = true;
              let page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      })
    }else {
      wx.lin.showMessage({
        type: 'warning',
        duration: 1500,
        content: '尚有信息未填写！'
      })
    }
    
  },

  onRemoveTap(e) {
    const index = e.detail.index
    wx.lin.showMessage({
      type: 'error',
      content: `删除下标为${index}图片~`,
      duration: 1500,
      icon: 'warning'
    })
  },

  onPreviewTap(e) {
  },

  onTextInput(e) {
    let { value } = { ...e.detail };
    this.setData({
      question: value
    })
  },

  onTextInput1(e){
    let {value} = {...e.detail};
    this.setData({
      answer:value
    })
  },

  onTextInput2(e) {
    let { value } = { ...e.detail };
    this.setData({
      tempcata:value 
    })
  },

  onLoad: function (options) {
    wxRequest({
      url: 'wqs/categories',
      
      success: (res) => {
        let tap = [];        
        for (var i=0;i<res.data.length;i++) {
          let tmp = {
            id: i,
            name: res.data[i],
          }
          tap.push(tmp);
        }
        let tmp1={
          id:tap.length,
          name:"其他"
        }
        tap.push(tmp1);
        this.setData({
          items6: tap,
          arr2:res.data,
        })
      },
    });
  },

  onShow() {
    this.onLoad();
  },

})