var animation
//const apiurl = "https://bridge.mfull.cn";
const apiurl = "http://192.168.15.223:1338"
const model = "gpt-3.5-turbo-16k-0613";
Page({
    data: {
        menuType: 0, begin: null, status: 1, end: null, isVisible: false,
        animationData: {}, animationAddressMenu: {}, addressMenuIsShow: false, value: [0, 0, 0],
        //--------------------------------------
        uniPopup: null,
        model,
        apiurl,
        apiSuccess: false,//api服务是否正常
        apiBtnText: "需要先进行API配置才能使用",
        sendBtnText: "先配置api",
        apiKey: "在此输入你的APIKEY",
        api: "",
        msgLoad: true,
        anData: {},
        animationData: {},
        showTow: false,
        msgList: [{
            my: false,
            msg: "你好呀,想问什么就问吧"
        }],
        msg: "",
        curScrollIndex: "",

        msgHistory: [{ "role": "user", "content": "hello" },
        { "role": "assistant", "content": "Hello, I am iKnowM. How can I help you today?" }],
        userId: null,
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        // 初始化动画变量
        var animation = wx.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%",
            timingFunction: 'ease',
        })
        this.animation = animation;
        console.log("onLoad", this.data)
        // 初始化
        const that = this;
        try {
            wx.showShareMenu({
                withShareTicket: true,
                //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
                menus: ["shareAppMessage", "shareTimeline"]
            });

            this.hostCheck();
        } catch (e) {
            console.error(e)
        }
    },
    // 显示
    showMenuTap: function (e) {
        console.log('selectState')
        //获取点击菜单的类型 1点击状态 2点击时间 
        var menuType = e.currentTarget.dataset.type
        // 如果当前已经显示，再次点击时隐藏
        if (this.data.isVisible == true) {
            this.startAnimation(false, -200)
            return
        }
        this.setData({
            menuType: menuType
        })
        this.startAnimation(true, 0)
    },
    hideMenuTap: function (e) {
        this.startAnimation(false, -200)
    },
    // 执行动画
    startAnimation: function (isShow, offset) {
        var that = this
        var offsetTem
        if (offset == 0) {
            offsetTem = offset
        } else {
            offsetTem = offset + 'rpx'
        }
        this.animation.translateY(offset).step()
        this.setData({
            animationData: this.animation.export(),
            isVisible: isShow
        })
        console.log(that.data)
    },
    // 选择状态按钮
    selectState: function (e) {
        console.log('selectState1')
        this.startAnimation(false, -200)
        var status = e.currentTarget.dataset.status
        this.setData({
            status: status
        })
        console.log(this.data)

    },
    parentComponentFunction: function (t, f) {
        console.log("成功调用父组件的方法", t, f);
        // 可以写方法
        // wx.navigateTo({
        //   url : ' '
        // })
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady: function () {
        this.setData({
            uniPopup: this.selectComponent('#uniPopup')
        })
    },
    // 生命周期函数--监听页面显示
    onShow: function () { },
    // 生命周期函数--监听页面隐藏
    onHide: function () { },
    // 生命周期函数--监听页面卸载
    onUnload: function () { },
    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function () { },
    // 页面上拉触底事件的处理函数
    onReachBottom: function () { },
    // 用户点击右上角分享
    onShareAppMessage: function () { },
    // 点击所在地区弹出选择框
    selectDistrict: function (e) {
        var that = this
        console.log('111111111')
        if (that.data.addressMenuIsShow) {
            return
        }
        that.startAddressAnimation(true)
    },
    // 执行动画
    startAddressAnimation: function (isShow) {
        console.log(isShow)
        var that = this
        if (isShow) {
            that.animation.translateY(0 + 'vh').step()
        } else {
            that.animation.translateY(40 + 'vh').step()
        }
        that.setData({
            animationAddressMenu: that.animation.export(),
            addressMenuIsShow: isShow,
        })
    },
    // 点击地区选择取消按钮
    cityCancel: function (e) {
        this.startAddressAnimation(false)
    },
    // 点击地区选择确定按钮
    cityOk: function (e) {
        var that = this
        that.startAddressAnimation(false)

    },
    hideCitySelected: function (e) {
        console.log(e)
        this.startAddressAnimation(false)
    },
    //原来的函数
    setsklocal: function (s) {
        console.log("setsklocal:", s)
        wx.setStorage({
            key: "sk",
            data: s,
            success: function (res) {
                console.log("setsklocal success:", res)
            }
        })
    },
    clopop: function () {
        this.data.uniPopup.close("center")
    },
    openpop: function () {
        console.log("openpop:", this.data)
        this.data.uniPopup.open("center")
    },
    getUserId: function () {
        let id = this.data.userId
        if (!id || id.length < 12) {
            this.setData({
                userId: getApp().globalData.id
            })
            id = this.data.userId
        }
        console.log("user id:", id)
        return id
    },
    hostCheck: function () {
        console.log("hostCheck:", this.data.apiurl)
        this.setData({
            api: "检测服务状态",
            apiBtnText: "网络连接检测...",
            sendBtnText: "发送",
            msgLoad: false,
        })
        const that = this
        wx.request({
            url: this.data.apiurl,
            method: "GET",
            success: function (t) {
                console.log("onLoad success:", t);
                that.setData({ apiKey: t.data })
                that.apiCheck();
                that.setsklocal(that.data.api);
            },
            fail: err => {
                console.error("apiurl error:", err)
                that.setData({
                    apiBtnText: "连接失败，请检查网络后重试",
                    apiSuccess: false
                })
            }
        })
    },
    apiCheck: function () {
        var that = this;
        //this.uniPopup.close("center")
        // var unipopup = this.this.selectComponent("#un-select")
        // console.log("unipopup:",unipopup.data)
        // unipopup.popup.close("center");
        this.setData({
            api: "检测服务状态",
            apiBtnText: "API服务检测...",
            sendBtnText: "发送",
            msgLoad: false,
        })
        var e = {
            "conversation_id": "api-test",
            "action": "_ask",
            "model": "gpt-3.5-turbo-16k-0613",
            "jailbreak": "default",
            "meta": {
                "id": "api-test",
                "content": {
                    "conversation": [],
                    "internet_access": true,
                    "content_type": "text",
                    "parts": [
                        {
                            "content": "你好",
                            "role": "user"
                        }
                    ]
                }
            }
        };
        console.log("api检测启动...", that.data.apiurl, e)
        wx.request({
            url: this.data.apiurl + "/backend-api/v2/conversation",
            data: e, method: "POST",
            success: function (res) {
                console.log("api检测结果:", res.statusCode, res);
                if (200 === res.statusCode) {

                    that.setData({
                        apiBtnText: "API服务检测成功",
                        apiSuccess: true,
                        sendBtnText: "发送",
                        msgLoad: false,
                    })
                    that.setsklocal(that.data.api);
                    // that.data.uniPopup.close("center")//.clear();
                    // that.close()
                } else {
                    that.setData({
                        apiBtnText: "API请求失败,请检查apikey后重试",
                        apiSuccess: false
                    })
                    console.error("连接API请求失败...")
                    that.openpop()
                }
            }, fail: err => {
                that.setData({
                    apiBtnText: "连接失败,请检查apikey后重试",
                    apiSuccess: false
                })
                console.error("连接服务器失败...")
                that.openpop()
            }
        })
    },
    myFilter: function (dataString) {
        const replaceRules = [{
            find: 'openai',
            replace: 'iKnowModel'
        },
        {
            find: 'gpt-3',
            replace: 'Model-A'
        }
        ];

        for (let rule of replaceRules) {
            let find = rule.find;
            let replace = rule.replace;
            // 使用正则表达式做全局替换
            let reg = new RegExp(find, 'gi');
            dataString = dataString.replace(reg, replace);
        }

        return dataString;
    },
    //回车事件
    inputMsgConfirm: function (e) {
        this.setData({ msg: e.detail.value })
        this.sendMsg()
        console.log("inputMsgConfirm:", this.data.msg, this.data)

    },
    //输入文字
    inputMsg: function (e) {
        this.setData({ msg: e.detail.value })
        //console.log("inputMsg:", this.data.msg, this.data)
    },
    sendMsg: function () {
        const that = this
        const data = that.data;
        console.log("sendMsg:", data)

        if ("" == data.msg) return 0;
        if (data.msgLoad) return this.$u.toast("请先配置api再进行使用"), 0;


        const sendMessage = data.msg

        data.msgList.push({ msg: sendMessage, my: true })
        this.setData({
            sendBtnText: "请求中",
            msgList: data.msgList,
            msgLoad: true,
        })
        var reqBody = {
            "conversation_id": this.getUserId(),
            "action": "_ask",
            "model": "gpt-3.5-turbo-16k-0613",
            "jailbreak": "default",
            "meta": {
                "id": this.getUserId(),
                "content": {
                    "conversation": this.data.msgHistory,
                    "internet_access": true,
                    "content_type": "text",
                    "parts": [
                        {
                            "content": sendMessage,
                            "role": "user"
                        }
                    ]
                }
            }
        };
        console.log("send msg:", reqBody);
        wx.request({
            url: data.apiurl + "/backend-api/v2/conversation",
            data: reqBody,
            method: "POST",
            header: { 'content-type': 'application/json' },
            success: function (resp) {
                if (200 == resp.statusCode) {
                    console.log("resp----:", resp);
                    var resp = that.myFilter(resp.data);
                    // var data = resp.data;
                    console.log("resp:", resp, that.data);
                    const index = that.data.msgList.push({ msg: resp, my: false })
                    that.data.msgHistory.push({ "role": "user", "content": sendMessage })
                    that.data.msgHistory.push({ "role": "assistant", "content": resp })
                    that.setData({
                        msgLoad: false,
                        sendBtnText: "发送",
                        msgList: that.data.msgList,
                        msgHistory: that.data.msgHistory,
                        curScrollIndex: "aimsg-" + (index - 1),
                        msg: ""
                    })
                } else {
                    that.setData({
                        apiBtnText: "连接服务器失败",
                        apiSuccess: false
                    })
                }
            }
        })
    }
})