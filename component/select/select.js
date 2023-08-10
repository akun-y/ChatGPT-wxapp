// component/select/select.js
Component({
    properties: {
        modelList: Array,
    },
    data: {
        listShow: true,
        selectId: 0,
        listContent: "GPT3.5. Turbo,Training data as of September 2021",
        mList: [],
    },
    lifetimes: {
        created: function () {
            console.log("created...")
        },
        attached: function () {
            // 在组件实例进入页面节点树时执行
            console.log("attached...")
            this.setData({ mList: this.properties.modelList })

            this.triggerEvent("parentComponentFunction", { aaa: 1, bbb: 2 })
            console.log("support model:", this.data.mList)
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
            console.log("detached...")
        },
    },
    methods: {
        // 自定义方法
        clear() {
            console.log("调用了组件内部方法(select clear)")
        },
        getSelect() {
            return this.data.mList.filter((item) => {
                return item.select
            })[0]
        },
        setModelList(list) {
            if (list) {
                this.setData({
                    mList: list
                })
                //获取select为true的item
                const item = list.filter((item) => {
                    return item.select
                })[0]
                this.setData({ listContent: item.content })
            }
        },
        getModelList() {
            return this.data.mList
        },
        setListSelect(id) {
            this.data.mList.map((item) => { item.select = false })
            this.data.mList[id].select = true
            this.setData({
                mList: this.data.mList,
                listContent: this.data.mList[id].content,
                selectId: id,
            })
            console.log("setListSelect3 id:", id, this.data.mList)
        },
        selectOne: function (e) {
            console.log("selectOne id:", e.target.id)
            this.setListSelect(e.target.id)
            this.triggerEvent("parentComponentFunction", "sd", "sdf")
        },
    },
})
