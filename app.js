// require('./common/runtime.js')
// require('./common/vendor.js')
// require('./common/main.js')

App({
  globalData: {
    openid: 'test-user',
    //apiurl: "https://bridge.mfull.cn",
    //apiurl: "http://192.168.15.223:1338",
    apiurl: "http://127.0.0.1:1338",
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs-------------', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("login----------", res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: getApp().globalData.apiurl + '/user/wx/login',
          method: "POST",
          data: { code: res.code },
          success: function (response) {
            console.log("微信登录成功openid:", response.data.openid);
            getApp().globalData.openid = response.data.openid
          }
        });
      },
    })
  },
})