// component/select/select.js
Component({
    onload: function () {

        this.setData({ listContent: this.data.lists[0].content })
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        listShow: true,
        lists: [
            {
                name: 'GPT-3.5-Turbo-16k-0613',
                select: true,
                value:"GPT-3.5-Turbo-16k-0613",
                content: 'OpenAI GPT3.5 Turbo,Training data as of September 2021'
            },
            {
                name: 'GPT-3.5-0613',
                select: false,
                content: 'OpenAI GPT3.5,Training data as of September 2021'
            },
            {
                name: 'Wizardlm-13b-v1.1',
                select: false,
                content: '最佳整体模型;\
                基于指令;\
                给出很长的回复;\
                使用高质量数据进行微调;\
                微软和北京大学培训;'
            },
            {
                name: 'GPT4All-J v1.3-groovy',
                select: false,
                content: '创意模型可用于商业用途;\
                快速响应;\
                创意回应;\
                基于指令;\
                由 Nomic AI 培训;'
            },
        ],
        listContent: '第一个列表的内容'
    },

    // 组件的方法列表
    methods: {
        // 自定义方法
        clear() {
            console.log("调用了自定义组件内部方法");
        },
        selectOne: function (e) {
            console.log("selectOne id:",e.target.id);
            this.data.lists.map(item => { item.select = false })
            this.data.lists[e.target.id].select = true
            this.setData({
                lists: this.data.lists,
                listContent: this.data.lists[e.target.id].content
            })
        }
    }
})
