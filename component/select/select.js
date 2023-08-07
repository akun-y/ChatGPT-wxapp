// component/select/select.js
Component({
    properties: {},
    data: {
        listShow: true,
        lists: [
            {
                name: 'GPT-3.5-Turbo-16k-0613',
                select: false,
                value: "GPT-3.5-Turbo-16k-0613",
                content: 'OpenAI GPT3.5 Turbo,Training data as of September 2021'
            },
            // {
            //     name: 'GPT-3.5-0613',
            //     value: "GPT-3.5-0613",
            //     select: false,
            //     content: 'OpenAI GPT3.5,Training data as of September 2021'
            // },
            // {
            //     name: 'Wizardlm-13b-v1.1',
            //     value: "gpt4all-7b",
            //     select: true,
            //     content: '最佳整体模型;\
            //     基于指令;\
            //     给出很长的回复;\
            //     使用高质量数据进行微调;\
            //     微软和北京大学培训;'
            // },
            {
                name: 'GPT4All-J v1.3-groovy',
                value: "gpt4all",
                select: false,
                content: '创意模型可用于商业用途;\
                快速响应;\
                创意回应;\
                基于指令;\
                由 Nomic AI 培训;'
            },
        ],
        selectId: 2,
        listContent: '最佳整体模型;基于指令;给出很长的回复;使用高质量数据进行微调;微软和北京大学培训;',
    },
    methods: {
        // 自定义方法
        clear() {
            console.log("调用了自定义组件内部方法");
        },
        getSelect() {
          console.log("getSelect----")
            const item =  this.data.lists[this.data.selectId]
            console.log("getSelect item:",item)
            return item
        },
        setListSelect(id) {
          console.log("setListSelect id:",id)
            this.data.lists.map(item => { item.select = false })
            const lists = this.data.lists
            console.log("lists:",lists)
            lists[id].select = true
            this.setData({
                lists,
                listContent: lists[id].content,
                selectId: id
            })
        },
        selectOne: function (e) {
            console.log("selectOne id:", e.target.id);
            this.setListSelect(e.target.id)
        }
    }
})
