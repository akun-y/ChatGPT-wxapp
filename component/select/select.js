// component/select/select.js
Component({
  properties: {
    modelList: Array,
  },
  data: {
    listShow: true,
    selectId: 0,
    listContent: "GPT3.5. Turbo,Training data as of September 2021",
  },
  lifetimes: {
    created: function () {
      console.log("created...")
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("attached...")
      const json = this.triggerEvent("parentComponentFunction", { aaa: 1, bbb: 2 })
        console.log("model json:", json)
        console.log("model:", this.properties.modelList)
      //   wx.request({
      //     url: this.data.apiurl + "/user/model/" + 23432,
      //     method: "GET",
      //     success: function (t) {
      //       console.log("onLoad success:", t)
      //     },
      //     fail: (err) => {
      //       console.error("apiurl error:", err)
      //     },
      //   })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log("detached...")
    },
  },
  methods: {
    // 自定义方法
    clear() {
      console.log("调用了自定义组件内部方法")
    },
    getSelect() {
      return this.properties.modelList[this.data.selectId]
    },
    setListSelect(id) {
      this.properties.modelList.map((item) => {
        item.select = false
      })
      this.properties.modelList[id].select = true
      this.setData({
        modelList: this.properties.modelList,
        listContent: this.properties.modelList[id].content,
        selectId: id,
      })
    },
    selectOne: function (e) {
      console.log("selectOne id:", e.target.id)
      this.setListSelect(e.target.id)
      const json = this.triggerEvent("parentComponentFunction", "sd", "sdf")
      console.log("----->", json)
    },
  },
})
