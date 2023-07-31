// component/select/select.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean, default: false },
        modeClass: {
            type: [Array, String],
            default: function () {
                return "fade"
            },
        },
        duration: { type: Number, default: 300 },
        styles: {
            type: Object,
            default: function () {
                return {}
            },
        },
        customClass: { type: String, default: "" },
    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false, transform: "", opacity: 1, animationData: {}, durationTime: 300, config: {}
    },

    methods: {
        init: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            t.duration && (this.durationTime = t.duration), (this.animation = (0, s.createAnimation)(Object.assign(this.config, t), this))
        },
        onClick: function () {
            this.$emit("click", { detail: this.isShow })
        },
        step: function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            if (this.animation) {
                for (var i in t)
                    try {
                        var e
                        if ("object" === (0, a.default)(t[i])) (e = this.animation)[i].apply(e, (0, o.default)(t[i]))
                        else this.animation[i](t[i])
                    } catch (r) {
                        console.error("方法 ".concat(i, " 不存在"))
                    }
                return this.animation.step(n), this
            }
        },
        run: function (t) {
            this.animation && this.animation.run(t)
        },
        open: function () {
            var t = this
            clearTimeout(this.timer), (this.transform = ""), (this.isShow = true)
            var n = this.styleInit(false),
                i = n.opacity,
                e = n.transform
            "undefined" !== typeof i && (this.opacity = i),
                (this.transform = e),
                this.$nextTick(function () {
                    t.timer = setTimeout(function () {
                        ; (t.animation = (0, s.createAnimation)(t.config, t)), t.tranfromInit(false).step(), t.animation.run(), t.$emit("change", { detail: t.isShow })
                    }, 20)
                })
        },
        close: function (t) {
            var n = this
            this.animation &&
                this.tranfromInit(true)
                    .step()
                    .run(function () {
                        ; (n.isShow = false), (n.animationData = null), (n.animation = null)
                        var t = n.styleInit(false),
                            i = t.opacity,
                            e = t.transform
                            ; (n.opacity = i || 1), (n.transform = e), n.$emit("change", { detail: n.isShow })
                    })
        },
        styleInit: function (t) {
            var n = this,
                i = { transform: "" },
                e = function (t, e) {
                    "fade" === e ? (i.opacity = n.animationType(t)[e]) : (i.transform += n.animationType(t)[e] + " ")
                }
            return (
                "string" === typeof this.modeClass
                    ? e(t, this.modeClass)
                    : this.modeClass.forEach(function (n) {
                        e(t, n)
                    }),
                i
            )
        },
        tranfromInit: function (t) {
            var n = this,
                i = function (t, i) {
                    var e = null
                    "fade" === i
                        ? (e = t ? 0 : 1)
                        : ((e = t ? "-100%" : "0"),
                            "zoom-in" === i && (e = t ? 0.8 : 1),
                            "zoom-out" === i && (e = t ? 1.2 : 1),
                            "slide-right" === i && (e = t ? "100%" : "0"),
                            "slide-bottom" === i && (e = t ? "100%" : "0")),
                        n.animation[n.animationMode()[i]](e)
                }
            return (
                "string" === typeof this.modeClass
                    ? i(t, this.modeClass)
                    : this.modeClass.forEach(function (n) {
                        i(t, n)
                    }),
                this.animation
            )
        },
        animationType: function (t) {
            return {
                fade: t ? 1 : 0,
                "slide-top": "translateY(".concat(t ? "0" : "-100%", ")"),
                "slide-right": "translateX(".concat(t ? "0" : "100%", ")"),
                "slide-bottom": "translateY(".concat(t ? "0" : "100%", ")"),
                "slide-left": "translateX(".concat(t ? "0" : "-100%", ")"),
                "zoom-in": "scaleX(".concat(t ? 1 : 0.8, ") scaleY(").concat(t ? 1 : 0.8, ")"),
                "zoom-out": "scaleX(".concat(t ? 1 : 1.2, ") scaleY(").concat(t ? 1 : 1.2, ")"),
            }
        },
        animationMode: function () {
            return { fade: "opacity", "slide-top": "translateY", "slide-right": "translateX", "slide-bottom": "translateY", "slide-left": "translateX", "zoom-in": "scale", "zoom-out": "scale" }
        },
        toLine: function (t) {
            return t.replace(/([A-Z])/g, "-$1").toLowerCase()
        },
    },
})
