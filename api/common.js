const app = getApp();
const prefix = "https://netwx.c-leon.top/api/";
const wxRequest = (params, url) => {
  let auth = app.globalData.openid;
  if(auth) {}
  else {
    app.loginCallback = openid => {
      if(openid != '')
        auth = openid;
    }
  }
  console.log("aaaaa: " + auth);
  wx.request({
    url: prefix + params.url,
    data: params.data || '',
    header: {
      'content-type': 'application/json',
      'authorization': auth
    },
    method: params.method || 'GET',
    success: (res) => {
      params.success && params.success(res);
    },
    fail: (res) => {
      params.fail && params.fail(res);
    },
    complete: (res) => {
      params.complete && params.complete(res);
    }
  })
}

export default wxRequest;