//app.js
App({
  onLaunch: function () {
  },

  onLogin: function(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'https://netwx.c-leon.top/auth/login',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: res => {
              this.globalData.openid = res.data.openid;
              // if (this.loginCallback) {
              //   this.loginCallback(res.data.openid)
              // }
              wx.setStorageSync("openid", res.data.openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })
  },

  globalData: {
    imageurl:null,
    userInfo: null,
    openid: '',
    uploadSuccess: false,
    prefix_url: "https://netwx.c-leon.top/api/"
  }
})