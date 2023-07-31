Component({
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    properties: {
        animation: { type: Boolean, default: true },
        type: { type: String, default: "center" },
        isMaskClick: { type: Boolean, default: null },
        maskClick: { type: Boolean, default: null },
        backgroundColor: { type: String, default: "none" },
        safeArea: { type: Boolean, default: true },
        maskBackgroundColor: { type: String, default: "rgba(0, 0, 0, 0.4)" },
    },

    data: {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: { top: "top", bottom: "bottom", center: "center", left: "left", right: "right", message: "top", dialog: "center", share: "bottom" },
        maskClass: { position: "fixed", bottom: 0, top: 0, left: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.4)" },
        transClass: { position: "fixed", left: 0, right: 0 },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top",
    },
    methods: {
        setH5Visible: function () { },
        closeMask: function () {
            this.maskShow = false
        },
        disableMask: function () {
            this.mkclick = false
        },
        clear: function (t) {
            t.stopPropagation(), (this.clearPropagation = true)
        },
        open: function (t) {
            this.showPopup && (clearTimeout(this.timer), (this.showPopup = false));
            (t && -1 !== ["top", "center", "bottom", "left", "right", "message", "dialog", "share"].indexOf(t)) || (t = this.type),
                this.data.config[t] ? (this[this.data.config[t]](), this.triggerEvent('change', { show: true, type: t }))
                    //that.$emit("change", { show: true, type: t })) 
                    : console.error("缺少类型：", t)

            console.log("open:", t, this.data)
        },
        close: function (t) {
            var i = this
                ; (this.showTrans = false),
                    this.triggerEvent("change", { show: false, type: this.type }),
                    clearTimeout(this.timer),
                    (this.timer = setTimeout(function () {
                        i.showPopup = false
                    }, 300))
        },
        touchstart: function () {
            this.clearPropagation = false
        },
        onTap: function () {
            this.clearPropagation ? (this.clearPropagation = false) : (this.triggerEvent("maskClick"), this.mkclick && this.close())
        },
        top: function (t) {
            var i = this
                ; (this.popupstyle = this.isDesktop ? "fixforpc-top" : "top"),
                    (this.ani = ["slide-top"]),
                    (this.transClass = { position: "fixed", left: 0, right: 0, backgroundColor: this.bg }),
                    t ||
                    ((this.showPopup = true),
                        (this.showTrans = true),
                        this.$nextTick(function () {
                            i.messageChild && "message" === i.type && i.messageChild.timerClose()
                        }))
        },
        bottom: function (t) {
            ; (this.popupstyle = "bottom"),
                (this.ani = ["slide-bottom"]),
                (this.transClass = { position: "fixed", left: 0, right: 0, bottom: 0, paddingBottom: this.safeAreaInsets + "px", backgroundColor: this.bg }),
                t || this.setData({ showPopup: true, showTrans: true })
        },
        center: function (t) {
            this.setData({
                popupstyle: "center",
                ani: ["zoom-out", "fade"],
                transClass: { position: "fixed", display: "flex", flexDirection: "column", bottom: 0, left: 0, right: 0, top: 0, justifyContent: "center", alignItems: "center" }
            }),
                t || this.setData({ showPopup: true, showTrans: true })
        },
        left: function (t) {
            ; (this.popupstyle = "left"),
                (this.ani = ["slide-left"]),
                (this.transClass = { position: "fixed", left: 0, bottom: 0, top: 0, backgroundColor: this.bg, display: "flex", flexDirection: "column" }),
                t || this.setData({ showPopup: true, showTrans: true })
        },
        right: function (t) {
            ; (this.popupstyle = "right"),
                (this.ani = ["slide-right"]),
                (this.transClass = { position: "fixed", bottom: 0, right: 0, top: 0, backgroundColor: this.bg, display: "flex", flexDirection: "column" }),
                t || this.setData({ showPopup: true, showTrans: true })
        },
    },
    watch: {
        type: {
            handler: function (t) {
                this.config[t] && this[this.config[t]](true)
            },
            immediate: true,
        },
        isDesktop: {
            handler: function (t) {
                this.config[t] && this[this.config[this.type]](true)
            },
            immediate: true,
        },
        maskClick: {
            handler: function (t) {
                this.mkclick = t
            },
            immediate: true,
        },
        isMaskClick: {
            handler: function (t) {
                this.mkclick = t
            },
            immediate: true,
        },
        showPopup: function (t) { },
    },
    computed: {
        isDesktop: function () {
            return this.popupWidth >= 500 && this.popupHeight >= 500
        },
        bg: function () {
            return "" === this.backgroundColor || "none" === this.backgroundColor ? "transparent" : this.backgroundColor
        },
    },
    mounted: function () {
        var i = this
            ; (function () {
                var o = t.getSystemInfoSync(),
                    s = o.windowWidth,
                    n = o.windowHeight,
                    e = o.windowTop,
                    a = o.safeArea,
                    r = o.screenHeight
                o.safeAreaInsets
                    ; (i.popupWidth = s), (i.popupHeight = n + (e || 0)), a && i.safeArea ? (i.safeAreaInsets = r - a.bottom) : (i.safeAreaInsets = 0)
            })()
    },
    destroyed: function () {
        this.setH5Visible()
    },
    created: function () {
        null === this.isMaskClick && null === this.maskClick ? (this.mkclick = true) : (this.mkclick = null !== this.isMaskClick ? this.isMaskClick : this.maskClick),
            this.animation ? (this.duration = 300) : (this.duration = 0),
            (this.messageChild = null),
            (this.clearPropagation = false)
        // (this.maskClass.backgroundColor = this.properties.maskBackgroundColor)
    },
})
