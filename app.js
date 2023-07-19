require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
App({
  globalData: {
    id: null,
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
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})