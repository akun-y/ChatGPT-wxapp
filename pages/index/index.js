(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/index/index"], {
    "15a1": function (t, s, e) {
        "use strict";
        e.d(s, "b", (function () {
            return n
        })),
            e.d(s, "c", (function () {
                return a
            })),
            e.d(s, "a", (function () {
                return i
            }));
        var i = {
            uniPopup: function () {
                return e.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(e.bind(null, "a83a"))
            }
        },
            n = function () {
                var t = this.$createElement;
                this._self._c
            },
            a = []
    },
    1780: function (t, s, e) {
        "use strict"; (function (t, s) {
            var i = e("4ea4");
            e("cbc9");
            i(e("66fd"));
            var n = i(e("58fe"));
            t.__webpack_require_UNI_MP_PLUGIN__ = e,
                s(n.
                    default)
        }).call(this, e("bc2e")["default"], e("543d")["createPage"])
    },
    5345: function (t, s, e) { },
    "58fe": function (t, s, e) {
        "use strict";
        e.r(s);
        var i = e("15a1"),
            n = e("74b8");
        for (var a in n) ["default"].indexOf(a) < 0 &&
            function (t) {
                e.d(s, t, (function () {
                    return n[t]
                }))
            }(a);
        e("73d6");
        var o = e("f0c5"),
            u = Object(o["a"])(n["default"], i["b"], i["c"], !1, null, null, null, !1, i["a"], void 0);
        s["default"] = u.exports
    },
    "73d6": function (t, s, e) {
        "use strict";
        var i = e("5345"),
            n = e.n(i);
        n.a
    },
    "74b8": function (t, s, e) {
        "use strict";
        e.r(s);
        var i = e("f66b"),
            n = e.n(i);
        for (var a in i) ["default"].indexOf(a) < 0 &&
            function (t) {
                e.d(s, t, (function () {
                    return i[t]
                }))
            }(a);
        s["default"] = n.a
    },
    f66b: function (t, s, e) {
        "use strict"; (function (t) {
            Object.defineProperty(s, "__esModule", {
                value: !0
            }),
                s.
                    default = void 0;
            var e = {
                data: function () {
                    return {
                        apiurl: "https://bridge.mfull.cn",
                        // apiurl: "http://192.168.15.223:1338",
                        apisucc: !1,
                        apibut: "需要先进行API配置才能使用",
                        sentext: "先配置api",
                        apiadj: "在此输入你的APIKEY",
                        api: "",
                        msgLoad: !0,
                        anData: {},
                        animationData: {},
                        showTow: !1,
                        msgList: [{
                            my: !1,
                            msg: "你好呀,想问什么就问吧"
                        }],
                        msg: "",

                        msgHistory: [
                            {
                                "role": "user",
                                "content": "hello"
                            },
                            {
                                "role": "assistant",
                                "content": "Hello, I am iKnowM. How can I help you today?"
                            },
                        ],
                        userId:null

                    }
                },
                onLoad: function () {
                    var s = this;
                    try {
                        wx.showShareMenu({
                            withShareTicket: true,
                            //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
                            menus: ["shareAppMessage", "shareTimeline"]
                        });
                        this.apibut = "连接成功";
                        this.apisucc = !0;
                        this.sentext = "发送";
                        this.msgLoad = !1;
                        this.setsklocal(this.api);
                        this.api = "检测服务状态";
                        this.apiset();
                        this.apibut = "连接成功";
                        this.apisucc = !0;
                        this.sentext = "发送";
                        this.msgLoad = !1;
                        this.setsklocal(this.api);
                       
                    } catch (e) {
                        console.error(e)
                    }
                    t.request({
                        url: this.apiurl,
                        method: "GET",
                        success: function (t) {
                            console.log("onLoad:", t),
                                s.apiadj = t.data
                        }
                    })
                },
                methods: {
                    setsklocal: function (s) {
                        t.setStorage({
                            key: "sk",
                            data: s,
                            success: function (res) {
                                console.log("setsklocal success:", res)
                            }
                        })
                    },
                    clopop: function () {
                        this.$refs.popup.close("center")
                    },
                    openpop: function () {
                        this.$refs.popup.open("center")
                    },
                    getUserId:function (){
                        var id = this.userId
                        if(!id || id.length<12) this.userId = getApp().globalData.id
                        console.log("user id:", id)
                        return id
                    },
                    apiset: function () {

                        var that = this;
                        this.$refs.popup.close("center"),
                            this.apibut = "api检测中";
                        var e = {
                            "conversation_id": this.getUserId(),
                            "action": "_ask",
                            "model": "gpt-3.5-turbo-16k-0613",
                            "jailbreak": "default",
                            "meta": {
                                "id": this.getUserId(),
                                "content": {
                                    "conversation": [
                                    ],
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
                        t.request({
                            url: this.apiurl + "/backend-api/v2/conversation",
                            data: e,
                            method: "POST",
                            success: function (res) {
                                console.log("success:", res.statusCode, res);
                                if (200 === res.statusCode) {
                                    that.apibut = "连接成功";
                                    that.apisucc = !0;
                                    that.sentext = "发送";
                                    that.msgLoad = !1;
                                    that.setsklocal(that.api)
                                } else {
                                    that.apibut = "连接失败，请检查apikey后重试"
                                }

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
                    sendMsg: function () {
                        var that = this;
                        if ("" == this.msg) return 0;
                        if (1 == this.msgLoad) return this.$u.toast("请先配置api再进行使用"),
                            0;

                        const sendMessage = this.msg
                        this.sentext = "请求中";
                        this.msgList.push({ msg: sendMessage, my: !0 });
                        this.msgLoad = !0;

                        var reqBody = {
                            "conversation_id": this.getUserId(),
                            "action": "_ask",
                            "model": "gpt-3.5-turbo-16k-0613",
                            "jailbreak": "default",
                            "meta": {
                                "id": this.getUserId(),
                                "content": {
                                    "conversation": this.msgHistory,
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
                        this.msg = "";
                        console.log("send msg:", reqBody);
                        t.request({
                            url: this.apiurl + "/backend-api/v2/conversation",
                            data: reqBody,
                            method: "POST",
                            header: { 'content-type': 'application/json' },
                            success: function (resp) {
                                if (200 == resp.statusCode) {
                                    console.log("resp----:", resp);
                                    var data =that.myFilter(resp.data);
                                   // var data = resp.data;

                                    that.msgList.push({ msg: data, my: !1 });
                                    that.msgHistory.push({ "role": "user", "content": sendMessage });
                                    that.msgHistory.push({ "role": "assistant", "content": data });
                                    that.msgLoad = !1;
                                    that.sentext = "发送";
                                } else {
                                    that.apibut = "连接服务器失败";
                                    that.apisucc = !1
                                }
                            }
                        })
                    }
                }
            };
            s.default = e;
        }).call(this, e("543d")["default"])
    }
},
[["1780", "common/runtime", "common/vendor"]]]);
