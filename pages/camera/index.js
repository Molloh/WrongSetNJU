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
    if(this.data.currentKey==this.data.arr2.length){
      this.setData({
        cata: this.data.tempcata
      })
    }else{
      this.setData({
        cata: this.data.arr2[this.data.currentKey]
      })
    }
    console.log(this.data.cata);
    // 获取当前openid
    let auth = wx.getStorageSync("openid")
    if (auth == '') {
      app.onLogin();
    }
    console.log(auth);
    const ts = new Date().valueOf();
    // 上传错题信息
    wx.uploadFile({
      url: 'https://netwx.c-leon.top/api/wqs_file',
      filePath: this.data.photourl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data',
        'authorization': auth
      },
      formData: {
        date: 1576570617,
        description: this.data.question,
        answer: this.data.answer,
        category: this.data.cata,
        dismissed: false,
      },
      success:function(res){
        const log = res.data;
        console.log(log);
      }
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
        console.log(res.data);
        
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
          arr2:res.data
        })
        console.log();
      },
    });
  },

})