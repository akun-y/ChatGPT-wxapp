// require('./common/runtime.js')
// require('./common/vendor.js')
// require('./common/main.js')

App({
  globalData: {
    id: 'test-user',
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs-------------', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("login----------",res)
        const oldId = getApp().globalData.id
        if(!oldId || oldId.length <12)
        {
            getApp().globalData.id = res.code
            console.log("getApp().globalData.id:",getApp().globalData.id)
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})