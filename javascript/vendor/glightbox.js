! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).GLightbox = e()
}(this, (function () {
    "use strict";

    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(e)
    }

    function e(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function n(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function s(t) {
        return function (t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = new Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
        }(t) || function (t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function o(t) {
        return Math.sqrt(t.x * t.x + t.y * t.y)
    }

    function l(t, e) {
        var i = function (t, e) {
            var i = o(t) * o(e);
            if (0 === i) return 0;
            var n = function (t, e) {
                return t.x * e.x + t.y * e.y
            }(t, e) / i;
            return n > 1 && (n = 1), Math.acos(n)
        }(t, e);
        return function (t, e) {
            return t.x * e.y - e.x * t.y
        }(t, e) > 0 && (i *= -1), 180 * i / Math.PI
    }
    var r = function () {
        function t(i) {
            e(this, t), this.handlers = [], this.el = i
        }
        return n(t, [{
            key: "add",
            value: function (t) {
                this.handlers.push(t)
            }
        }, {
            key: "del",
            value: function (t) {
                t || (this.handlers = []);
                for (var e = this.handlers.length; e >= 0; e--) this.handlers[e] === t && this.handlers.splice(e, 1)
            }
        }, {
            key: "dispatch",
            value: function () {
                for (var t = 0, e = this.handlers.length; t < e; t++) {
                    var i = this.handlers[t];
                    "function" == typeof i && i.apply(this.el, arguments)
                }
            }
        }]), t
    }();

    function a(t, e) {
        var i = new r(t);
        return i.add(e), i
    }
    var h = function () {
            function t(i, n) {
                e(this, t), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
                    x: null,
                    y: null
                }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
                var s = function () {};
                this.rotate = a(this.element, n.rotate || s), this.touchStart = a(this.element, n.touchStart || s), this.multipointStart = a(this.element, n.multipointStart || s), this.multipointEnd = a(this.element, n.multipointEnd || s), this.pinch = a(this.element, n.pinch || s), this.swipe = a(this.element, n.swipe || s), this.tap = a(this.element, n.tap || s), this.doubleTap = a(this.element, n.doubleTap || s), this.longTap = a(this.element, n.longTap || s), this.singleTap = a(this.element, n.singleTap || s), this.pressMove = a(this.element, n.pressMove || s), this.twoFingerPressMove = a(this.element, n.twoFingerPressMove || s), this.touchMove = a(this.element, n.touchMove || s), this.touchEnd = a(this.element, n.touchEnd || s), this.touchCancel = a(this.element, n.touchCancel || s), this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
                    x: null,
                    y: null
                }
            }
            return n(t, [{
                key: "start",
                value: function (t) {
                    if (t.touches) {
                        this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(t, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
                        var e = this.preV;
                        if (t.touches.length > 1) {
                            this._cancelLongTap(), this._cancelSingleTap();
                            var i = {
                                x: t.touches[1].pageX - this.x1,
                                y: t.touches[1].pageY - this.y1
                            };
                            e.x = i.x, e.y = i.y, this.pinchStartLen = o(e), this.multipointStart.dispatch(t, this.element)
                        }
                        this._preventTap = !1, this.longTapTimeout = setTimeout(function () {
                            this.longTap.dispatch(t, this.element), this._preventTap = !0
                        }.bind(this), 750)
                    }
                }
            }, {
                key: "move",
                value: function (t) {
                    if (t.touches) {
                        var e = this.preV,
                            i = t.touches.length,
                            n = t.touches[0].pageX,
                            s = t.touches[0].pageY;
                        if (this.isDoubleTap = !1, i > 1) {
                            var r = t.touches[1].pageX,
                                a = t.touches[1].pageY,
                                h = {
                                    x: t.touches[1].pageX - n,
                                    y: t.touches[1].pageY - s
                                };
                            null !== e.x && (this.pinchStartLen > 0 && (t.zoom = o(h) / this.pinchStartLen, this.pinch.dispatch(t, this.element)), t.angle = l(h, e), this.rotate.dispatch(t, this.element)), e.x = h.x, e.y = h.y, null !== this.x2 && null !== this.sx2 ? (t.deltaX = (n - this.x2 + r - this.sx2) / 2, t.deltaY = (s - this.y2 + a - this.sy2) / 2) : (t.deltaX = 0, t.deltaY = 0), this.twoFingerPressMove.dispatch(t, this.element), this.sx2 = r, this.sy2 = a
                        } else {
                            if (null !== this.x2) {
                                t.deltaX = n - this.x2, t.deltaY = s - this.y2;
                                var c = Math.abs(this.x1 - this.x2),
                                    u = Math.abs(this.y1 - this.y2);
                                (c > 10 || u > 10) && (this._preventTap = !0)
                            } else t.deltaX = 0, t.deltaY = 0;
                            this.pressMove.dispatch(t, this.element)
                        }
                        this.touchMove.dispatch(t, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && t.preventDefault()
                    }
                }
            }, {
                key: "end",
                value: function (t) {
                    if (t.changedTouches) {
                        this._cancelLongTap();
                        var e = this;
                        t.touches.length < 2 && (this.multipointEnd.dispatch(t, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout((function () {
                            e.swipe.dispatch(t, e.element)
                        }), 0)) : (this.tapTimeout = setTimeout((function () {
                            e._preventTap || e.tap.dispatch(t, e.element), e.isDoubleTap && (e.doubleTap.dispatch(t, e.element), e.isDoubleTap = !1)
                        }), 0), e.isDoubleTap || (e.singleTapTimeout = setTimeout((function () {
                            e.singleTap.dispatch(t, e.element)
                        }), 250))), this.touchEnd.dispatch(t, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null
                    }
                }
            }, {
                key: "cancelAll",
                value: function () {
                    this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
                }
            }, {
                key: "cancel",
                value: function (t) {
                    this.cancelAll(), this.touchCancel.dispatch(t, this.element)
                }
            }, {
                key: "_cancelLongTap",
                value: function () {
                    clearTimeout(this.longTapTimeout)
                }
            }, {
                key: "_cancelSingleTap",
                value: function () {
                    clearTimeout(this.singleTapTimeout)
                }
            }, {
                key: "_swipeDirection",
                value: function (t, e, i, n) {
                    return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down"
                }
            }, {
                key: "on",
                value: function (t, e) {
                    this[t] && this[t].add(e)
                }
            }, {
                key: "off",
                value: function (t, e) {
                    this[t] && this[t].del(e)
                }
            }, {
                key: "destroy",
                value: function () {
                    return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
                }
            }]), t
        }(),
        c = function () {
            function t(i, n) {
                var s = this,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                if (e(this, t), this.img = i, this.slide = n, this.onclose = o, this.img.setZoomEvents) return !1;
                this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (function (t) {
                    return s.dragStart(t)
                }), !1), this.img.addEventListener("mouseup", (function (t) {
                    return s.dragEnd(t)
                }), !1), this.img.addEventListener("mousemove", (function (t) {
                    return s.drag(t)
                }), !1), this.img.addEventListener("click", (function (t) {
                    if (!s.zoomedIn) return s.zoomIn();
                    s.zoomedIn && !s.dragging && s.zoomOut()
                }), !1), this.img.setZoomEvents = !0
            }
            return n(t, [{
                key: "zoomIn",
                value: function () {
                    var t = this.widowWidth();
                    if (!(this.zoomedIn || t <= 768)) {
                        var e = this.img;
                        if (e.setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t) {
                            var i = t / 2 - e.naturalWidth / 2;
                            this.setTranslate(this.img.parentNode, i, 0)
                        }
                        this.slide.classList.add("zoomed"), this.zoomedIn = !0
                    }
                }
            }, {
                key: "zoomOut",
                value: function () {
                    this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
                }
            }, {
                key: "dragStart",
                value: function (t) {
                    t.preventDefault(), this.zoomedIn ? ("touchstart" === t.type ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset), t.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
                }
            }, {
                key: "dragEnd",
                value: function (t) {
                    var e = this;
                    t.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout((function () {
                        e.dragging = !1, e.img.isDragging = !1, e.img.classList.remove("dragging")
                    }), 100)
                }
            }, {
                key: "drag",
                value: function (t) {
                    this.active && (t.preventDefault(), "touchmove" === t.type ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
                }
            }, {
                key: "onMove",
                value: function (t) {
                    if (this.zoomedIn) {
                        var e = t.clientX - this.img.naturalWidth / 2,
                            i = t.clientY - this.img.naturalHeight / 2;
                        this.setTranslate(this.img, e, i)
                    }
                }
            }, {
                key: "setTranslate",
                value: function (t, e, i) {
                    t.style.transform = "translate3d(" + e + "px, " + i + "px, 0)"
                }
            }, {
                key: "widowWidth",
                value: function () {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                }
            }]), t
        }(),
        u = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
        d = null !== u || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
        g = document.getElementsByTagName("html")[0],
        p = function () {
            var t, e = document.createElement("fakeelement"),
                i = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (t in i)
                if (void 0 !== e.style[t]) return i[t]
        }(),
        v = function () {
            var t, e = document.createElement("fakeelement"),
                i = {
                    animation: "animationend",
                    OAnimation: "oAnimationEnd",
                    MozAnimation: "animationend",
                    WebkitAnimation: "webkitAnimationEnd"
                };
            for (t in i)
                if (void 0 !== e.style[t]) return i[t]
        }(),
        f = Date.now(),
        m = {},
        y = {
            selector: "glightbox",
            elements: null,
            skin: "clean",
            closeButton: !0,
            startAt: null,
            autoplayVideos: !0,
            descPosition: "bottom",
            width: 900,
            height: 506,
            videosWidth: 960,
            beforeSlideChange: null,
            afterSlideChange: null,
            beforeSlideLoad: null,
            afterSlideLoad: null,
            onOpen: null,
            onClose: null,
            loop: !1,
            touchNavigation: !0,
            touchFollowAxis: !0,
            keyboardNavigation: !0,
            closeOnOutsideClick: !0,
            plyr: {
                css: "https://cdn.plyr.io/3.5.6/plyr.css",
                js: "https://cdn.plyr.io/3.5.6/plyr.js",
                ratio: "16:9",
                config: {
                    youtube: {
                        noCookie: !0,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3
                    },
                    vimeo: {
                        byline: !1,
                        portrait: !1,
                        title: !1,
                        transparent: !1
                    }
                }
            },
            openEffect: "zoomIn",
            closeEffect: "zoomOut",
            slideEffect: "slide",
            moreText: "See more",
            moreLength: 60,
            lightboxHtml: "",
            cssEfects: {
                fade: {
                    in: "fadeIn",
                    out: "fadeOut"
                },
                zoom: {
                    in: "zoomIn",
                    out: "zoomOut"
                },
                slide: {
                    in: "slideInRight",
                    out: "slideOutLeft"
                },
                slide_back: {
                    in: "slideInLeft",
                    out: "slideOutRight"
                }
            },
            svg: {
                close: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
                next: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
                prev: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
            }
        };
    y.slideHtml = '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

    function b() {
        var t = {},
            e = !1,
            i = 0,
            n = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], i++);
        for (var s = function (i) {
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e && "[object Object]" === Object.prototype.toString.call(i[n]) ? t[n] = b(!0, t[n], i[n]) : t[n] = i[n])
            }; i < n; i++) {
            s(arguments[i])
        }
        return t
    }
    y.lightboxHtml = '<div id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="0">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="1">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="2">{closeSVG}</button>\n</div>\n</div>';
    var x = {
        isFunction: function (t) {
            return "function" == typeof t
        },
        isString: function (t) {
            return "string" == typeof t
        },
        isNode: function (t) {
            return !(!t || !t.nodeType || 1 != t.nodeType)
        },
        isArray: function (t) {
            return Array.isArray(t)
        },
        isArrayLike: function (t) {
            return t && t.length && isFinite(t.length)
        },
        isObject: function (e) {
            return "object" === t(e) && null != e && !x.isFunction(e) && !x.isArray(e)
        },
        isNil: function (t) {
            return null == t
        },
        has: function (t, e) {
            return null !== t && hasOwnProperty.call(t, e)
        },
        size: function (t) {
            if (x.isObject(t)) {
                if (t.keys) return t.keys().length;
                var e = 0;
                for (var i in t) x.has(t, i) && e++;
                return e
            }
            return t.length
        },
        isNumber: function (t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }
    };

    function w(t, e) {
        if ((x.isNode(t) || t === window || t === document) && (t = [t]), x.isArrayLike(t) || x.isObject(t) || (t = [t]), 0 != x.size(t))
            if (x.isArrayLike(t) && !x.isObject(t))
                for (var i = t.length, n = 0; n < i && !1 !== e.call(t[n], t[n], n, t); n++);
            else if (x.isObject(t))
            for (var s in t)
                if (x.has(t, s) && !1 === e.call(t[s], t[s], s, t)) break
    }

    function S(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            n = t[f] = t[f] || [],
            s = {
                all: n,
                evt: null,
                found: null
            };
        return e && i && x.size(n) > 0 && w(n, (function (t, n) {
            if (t.eventName == e && t.fn.toString() == i.toString()) return s.found = !0, s.evt = n, !1
        })), s
    }

    function T(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = e.onElement,
            n = e.withCallback,
            s = e.avoidDuplicate,
            o = void 0 === s || s,
            l = e.once,
            r = void 0 !== l && l,
            a = e.useCapture,
            h = void 0 !== a && a,
            c = arguments.length > 2 ? arguments[2] : void 0,
            u = i || [];

        function d(t) {
            x.isFunction(n) && n.call(c, t, this), r && d.destroy()
        }
        return x.isString(u) && (u = document.querySelectorAll(u)), d.destroy = function () {
            w(u, (function (e) {
                var i = S(e, t, d);
                i.found && i.all.splice(i.evt, 1), e.removeEventListener && e.removeEventListener(t, d, h)
            }))
        }, w(u, (function (e) {
            var i = S(e, t, d);
            (e.addEventListener && o && !i.found || !o) && (e.addEventListener(t, d, h), i.all.push({
                eventName: t,
                fn: d
            }))
        })), d
    }

    function k(t, e) {
        w(e.split(" "), (function (e) {
            return t.classList.add(e)
        }))
    }

    function E(t, e) {
        w(e.split(" "), (function (e) {
            return t.classList.remove(e)
        }))
    }

    function A(t, e) {
        return t.classList.contains(e)
    }

    function C(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!t || "" === e) return !1;
        if ("none" == e) return x.isFunction(i) && i(), !1;
        var n = e.split(" ");
        w(n, (function (e) {
            k(t, "g" + e)
        })), T(v, {
            onElement: t,
            avoidDuplicate: !1,
            once: !0,
            withCallback: function (t, e) {
                w(n, (function (t) {
                    E(e, "g" + t)
                })), x.isFunction(i) && i()
            }
        })
    }

    function L(t) {
        var e = document.createDocumentFragment(),
            i = document.createElement("div");
        for (i.innerHTML = t; i.firstChild;) e.appendChild(i.firstChild);
        return e
    }

    function M(t, e) {
        for (; t !== document.body;) {
            if ("function" == typeof (t = t.parentElement).matches ? t.matches(e) : t.msMatchesSelector(e)) return t
        }
    }

    function O(t) {
        t.style.display = "block"
    }

    function z(t) {
        t.style.display = "none"
    }

    function q() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }

    function N(t) {
        if (A(t.target, "plyr--html5")) {
            var e = M(t.target, ".gslide-media");
            "enterfullscreen" == t.type && k(e, "fullscreen"), "exitfullscreen" == t.type && E(e, "fullscreen")
        }
    }
    var I = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                e = arguments.length > 1 ? arguments[1] : void 0,
                i = {
                    href: "",
                    title: "",
                    type: "",
                    description: "",
                    descPosition: e.descPosition,
                    effect: "",
                    width: "",
                    height: "",
                    node: t
                };
            if (x.isObject(t) && !x.isNode(t)) return b(i, t);
            var n = "",
                s = t.getAttribute("data-glightbox"),
                o = t.nodeName.toLowerCase();
            if ("a" === o && (n = t.href), "img" === o && (n = t.src), i.href = n, w(i, (function (n, s) {
                    x.has(e, s) && "width" !== s && (i[s] = e[s]);
                    var o = t.dataset[s];
                    x.isNil(o) || (i[s] = o)
                })), i.type || (i.type = W(n)), x.isNil(s)) {
                if ("a" == o) {
                    var l = t.title;
                    x.isNil(l) || "" === l || (i.title = l)
                }
                if ("img" == o) {
                    var r = t.alt;
                    x.isNil(r) || "" === r || (i.title = r)
                }
                var a = t.getAttribute("data-description");
                x.isNil(a) || "" === a || (i.description = a)
            } else {
                var h = [];
                w(i, (function (t, e) {
                    h.push(";\\s?" + e)
                })), h = h.join("\\s?:|"), "" !== s.trim() && w(i, (function (t, e) {
                    var n = s,
                        o = new RegExp("s?" + e + "s?:s?(.*?)(" + h + "s?:|$)"),
                        l = n.match(o);
                    if (l && l.length && l[1]) {
                        var r = l[1].trim().replace(/;\s*$/, "");
                        i[e] = r
                    }
                }))
            }
            if (i.description && "." == i.description.substring(0, 1) && document.querySelector(i.description)) i.description = document.querySelector(i.description).innerHTML;
            else {
                var c = t.querySelector(".glightbox-desc");
                c && (i.description = c.innerHTML)
            }
            var u = "video" == i.type ? e.videosWidth : e.width,
                d = e.height;
            return i.width = x.has(i, "width") && "" !== i.width ? i.width : u, i.height = x.has(i, "height") && "" !== i.height ? i.height : d, i
        },
        D = function () {
            var t = this,
                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (A(e, "loaded")) return !1;
            x.isFunction(this.settings.beforeSlideLoad) && this.settings.beforeSlideLoad(e, i);
            var s = i.type,
                o = i.descPosition,
                l = e.querySelector(".gslide-media"),
                r = e.querySelector(".gslide-title"),
                a = e.querySelector(".gslide-desc"),
                h = e.querySelector(".gdesc-inner"),
                d = n;
            if (x.isFunction(this.settings.afterSlideLoad) && (d = function () {
                    x.isFunction(n) && n(), t.settings.afterSlideLoad(e, i)
                }), "" == i.title && "" == i.description ? h && h.parentNode.parentNode.removeChild(h.parentNode) : (r && "" !== i.title ? r.innerHTML = i.title : r.parentNode.removeChild(r), a && "" !== i.description ? u && this.settings.moreLength > 0 ? (i.smallDescription = G(i.description, this.settings.moreLength, this.settings.moreText), a.innerHTML = i.smallDescription, Z.apply(this, [a, i])) : a.innerHTML = i.description : a.parentNode.removeChild(a), k(l.parentNode, "desc-".concat(o)), k(h.parentNode, "description-".concat(o))), k(l, "gslide-".concat(s)), k(e, "loaded"), "video" === s) return k(l.parentNode, "gvideo-container"), l.insertBefore(L('<div class="gvideo-wrapper"></div>'), l.firstChild), void X.apply(this, [e, i, d]);
            if ("external" === s) {
                var g = Y({
                    url: i.href,
                    width: i.width,
                    height: i.height,
                    callback: d
                });
                return l.parentNode.style.maxWidth = "".concat(i.width, "px"), void l.appendChild(g)
            }
            if ("inline" !== s) {
                if ("image" === s) {
                    var p = new Image;
                    return p.addEventListener("load", (function () {
                        !u && p.naturalWidth > p.offsetWidth && (k(p, "zoomable"), new c(p, e, (function () {
                            t.resize(e)
                        }))), x.isFunction(d) && d()
                    }), !1), p.src = i.href, void l.insertBefore(p, l.firstChild)
                }
                x.isFunction(d) && d()
            } else P.apply(this, [e, i, d])
        };

    function X(t, e, i) {
        var n = this,
            s = "gvideo" + e.index,
            o = t.querySelector(".gvideo-wrapper");
        B(this.settings.plyr.css);
        var l = e.href,
            r = location.protocol.replace(":", ""),
            a = "",
            h = "",
            c = !1;
        "file" == r && (r = "http"), o.parentNode.style.maxWidth = "".concat(e.width, "px"), B(this.settings.plyr.js, "Plyr", (function () {
            if (l.match(/vimeo\.com\/([0-9]*)/)) {
                var t = /vimeo.*\/(\d+)/i.exec(l);
                a = "vimeo", h = t[1]
            }
            if (l.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || l.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || l.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
                var r = function (t) {
                    var e = "";
                    e = void 0 !== (t = t.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? (e = t[2].split(/[^0-9a-z_\-]/i))[0] : t;
                    return e
                }(l);
                a = "youtube", h = r
            }
            if (null !== l.match(/\.(mp4|ogg|webm|mov)$/)) {
                a = "local";
                var u = '<video id="' + s + '" ';
                u += 'style="background:#000; max-width: '.concat(e.width, 'px;" '), u += 'preload="metadata" ', u += 'x-webkit-airplay="allow" ', u += 'webkit-playsinline="" ', u += "controls ", u += 'class="gvideo-local">';
                var d = l.toLowerCase().split(".").pop(),
                    g = {
                        mp4: "",
                        ogg: "",
                        webm: ""
                    };
                for (var p in g[d = "mov" == d ? "mp4" : d] = l, g)
                    if (g.hasOwnProperty(p)) {
                        var v = g[p];
                        e.hasOwnProperty(p) && (v = e[p]), "" !== v && (u += '<source src="'.concat(v, '" type="video/').concat(p, '">'))
                    } c = L(u += "</video>")
            }
            var f = c || L('<div id="'.concat(s, '" data-plyr-provider="').concat(a, '" data-plyr-embed-id="').concat(h, '"></div>'));
            k(o, "".concat(a, "-video gvideo")), o.appendChild(f), o.setAttribute("data-id", s);
            var y = x.has(n.settings.plyr, "config") ? n.settings.plyr.config : {},
                b = new Plyr("#" + s, y);
            b.on("ready", (function (t) {
                var e = t.detail.plyr;
                m[s] = e, x.isFunction(i) && i()
            })), b.on("enterfullscreen", N), b.on("exitfullscreen", N)
        }))
    }

    function Y(t) {
        var e = t.url,
            i = t.width,
            n = t.height,
            s = t.allow,
            o = t.callback,
            l = t.appendTo,
            r = document.createElement("iframe"),
            a = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return r.className = "vimeo-video gvideo", r.src = e, n && (r.style.height = u && a < 767 ? "" : "".concat(n, "px")), i && (r.style.width = "".concat(i, "px")), s && r.setAttribute("allow", s), r.onload = function () {
            k(r, "node-ready"), x.isFunction(o) && o()
        }, l && l.appendChild(r), r
    }

    function B(t, e, i) {
        if (x.isNil(t)) console.error("Inject videos api error");
        else {
            var n;
            if (x.isFunction(e) && (i = e, e = !1), -1 !== t.indexOf(".css")) {
                if ((n = document.querySelectorAll('link[href="' + t + '"]')) && n.length > 0) return void(x.isFunction(i) && i());
                var s = document.getElementsByTagName("head")[0],
                    o = s.querySelectorAll('link[rel="stylesheet"]'),
                    l = document.createElement("link");
                return l.rel = "stylesheet", l.type = "text/css", l.href = t, l.media = "all", o ? s.insertBefore(l, o[0]) : s.appendChild(l), void(x.isFunction(i) && i())
            }
            if ((n = document.querySelectorAll('script[src="' + t + '"]')) && n.length > 0) {
                if (x.isFunction(i)) {
                    if (x.isString(e)) return F((function () {
                        return void 0 !== window[e]
                    }), (function () {
                        i()
                    })), !1;
                    i()
                }
            } else {
                var r = document.createElement("script");
                r.type = "text/javascript", r.src = t, r.onload = function () {
                    if (x.isFunction(i)) {
                        if (x.isString(e)) return F((function () {
                            return void 0 !== window[e]
                        }), (function () {
                            i()
                        })), !1;
                        i()
                    }
                }, document.body.appendChild(r)
            }
        }
    }

    function F(t, e, i, n) {
        if (t()) e();
        else {
            var s;
            i || (i = 100);
            var o = setInterval((function () {
                t() && (clearInterval(o), s && clearTimeout(s), e())
            }), i);
            n && (s = setTimeout((function () {
                clearInterval(o)
            }), n))
        }
    }

    function P(t, e, i) {
        var n = this,
            s = t.querySelector(".gslide-media"),
            o = e.href.split("#").pop().trim(),
            l = document.getElementById(o);
        if (!l) return !1;
        var r = l.cloneNode(!0);
        r.style.height = x.isNumber(e.height) ? "".concat(e.height, "px") : e.height, r.style.maxWidth = x.isNumber(e.width) ? "".concat(e.width, "px") : e.width, k(r, "ginlined-content"), s.appendChild(r), this.events["inlineclose" + o] = T("click", {
            onElement: s.querySelectorAll(".gtrigger-close"),
            withCallback: function (t) {
                t.preventDefault(), n.close()
            }
        }), x.isFunction(i) && i()
    }
    var W = function (t) {
        var e = t;
        if (null !== (t = t.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/)) return "image";
        if (t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || t.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) return "video";
        if (t.match(/vimeo\.com\/([0-9]*)/)) return "video";
        if (null !== t.match(/\.(mp4|ogg|webm|mov)$/)) return "video";
        if (t.indexOf("#") > -1 && "" !== e.split("#").pop().trim()) return "inline";
        return t.includes("gajax=true") ? "ajax" : "external"
    };

    function _() {
        var t = this;
        if (this.events.hasOwnProperty("keyboard")) return !1;
        this.events.keyboard = T("keydown", {
            onElement: window,
            withCallback: function (e, i) {
                var n = (e = e || window.event).keyCode;
                if (9 == n) {
                    e.preventDefault();
                    var o = document.querySelectorAll(".gbtn");
                    if (!o || o.length <= 0) return;
                    var l = s(o).filter((function (t) {
                        return A(t, "focused")
                    }));
                    if (!l.length) {
                        var r = document.querySelector('.gbtn[tabindex="0"]');
                        return void(r && (r.focus(), k(r, "focused")))
                    }
                    o.forEach((function (t) {
                        return E(t, "focused")
                    }));
                    var a = l[0].getAttribute("tabindex");
                    a = a || "0";
                    var h = parseInt(a) + 1;
                    h > o.length - 1 && (h = "0");
                    var c = document.querySelector('.gbtn[tabindex="'.concat(h, '"]'));
                    c && (c.focus(), k(c, "focused"))
                }
                39 == n && t.nextSlide(), 37 == n && t.prevSlide(), 27 == n && t.close()
            }
        })
    }

    function j() {
        var t = this;
        if (this.events.hasOwnProperty("touch")) return !1;
        var e, i, n, s = q(),
            o = s.width,
            l = s.height,
            r = !1,
            a = null,
            c = null,
            u = null,
            d = !1,
            g = 1,
            p = 1,
            v = !1,
            f = !1,
            m = null,
            y = null,
            b = null,
            x = null,
            w = 0,
            S = 0,
            T = !1,
            C = !1,
            L = {},
            M = {},
            O = 0,
            z = 0,
            N = this,
            I = document.getElementById("glightbox-slider"),
            D = document.querySelector(".goverlay"),
            X = (this.loop(), new h(I, {
                touchStart: function (t) {
                    if (A(t.targetTouches[0].target, "ginner-container")) return r = !1, !1;
                    r = !0, M = t.targetTouches[0], L.pageX = t.targetTouches[0].pageX, L.pageY = t.targetTouches[0].pageY, O = t.targetTouches[0].clientX, z = t.targetTouches[0].clientY, a = N.activeSlide, c = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), u = null, A(c, "gslide-image") && (u = c.querySelector("img")), E(D, "greset")
                },
                touchMove: function (s) {
                    if (r && (M = s.targetTouches[0], !v && !f)) {
                        if (n && n.offsetHeight > l) {
                            var a = L.pageX - M.pageX;
                            if (Math.abs(a) <= 13) return !1
                        }
                        d = !0;
                        var h, g = s.targetTouches[0].clientX,
                            p = s.targetTouches[0].clientY,
                            m = O - g,
                            y = z - p;
                        if (Math.abs(m) > Math.abs(y) ? (T = !1, C = !0) : (C = !1, T = !0), e = M.pageX - L.pageX, w = 100 * e / o, i = M.pageY - L.pageY, S = 100 * i / l, T && u && (h = 1 - Math.abs(i) / l, D.style.opacity = h, t.settings.touchFollowAxis && (w = 0)), C && (h = 1 - Math.abs(e) / o, c.style.opacity = h, t.settings.touchFollowAxis && (S = 0)), !u) return H(c, "translate3d(".concat(w, "%, 0, 0)"));
                        H(c, "translate3d(".concat(w, "%, ").concat(S, "%, 0)"))
                    }
                },
                touchEnd: function () {
                    if (r) {
                        if (d = !1, f || v) return b = m, void(x = y);
                        var e = Math.abs(parseInt(S)),
                            i = Math.abs(parseInt(w));
                        if (!(e > 29 && u)) return e < 29 && i < 25 ? (k(D, "greset"), D.style.opacity = 1, V(c)) : void 0;
                        t.close()
                    }
                },
                multipointEnd: function () {
                    setTimeout((function () {
                        v = !1
                    }), 50)
                },
                multipointStart: function () {
                    v = !0, g = p || 1
                },
                pinch: function (t) {
                    if (!u || d) return !1;
                    v = !0, u.scaleX = u.scaleY = g * t.zoom;
                    var e = g * t.zoom;
                    if (f = !0, e <= 1) return f = !1, e = 1, x = null, b = null, m = null, y = null, void u.setAttribute("style", "");
                    e > 4.5 && (e = 4.5), u.style.transform = "scale3d(".concat(e, ", ").concat(e, ", 1)"), p = e
                },
                pressMove: function (t) {
                    if (f && !v) {
                        var e = M.pageX - L.pageX,
                            i = M.pageY - L.pageY;
                        b && (e += b), x && (i += x), m = e, y = i;
                        var n = "translate3d(".concat(e, "px, ").concat(i, "px, 0)");
                        p && (n += " scale3d(".concat(p, ", ").concat(p, ", 1)")), H(u, n)
                    }
                },
                swipe: function (e) {
                    if (!f)
                        if (v) v = !1;
                        else {
                            if ("Left" == e.direction) {
                                if (t.index == t.elements.length - 1) return V(c);
                                t.nextSlide()
                            }
                            if ("Right" == e.direction) {
                                if (0 == t.index) return V(c);
                                t.prevSlide()
                            }
                        }
                }
            }));
        this.events.touch = X
    }

    function H(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if ("" == e) return t.style.webkitTransform = "", t.style.MozTransform = "", t.style.msTransform = "", t.style.OTransform = "", t.style.transform = "", !1;
        t.style.webkitTransform = e, t.style.MozTransform = e, t.style.msTransform = e, t.style.OTransform = e, t.style.transform = e
    }

    function V(t) {
        var e = A(t, "gslide-media") ? t : t.querySelector(".gslide-media"),
            i = t.querySelector(".gslide-description");
        k(e, "greset"), H(e, "translate3d(0, 0, 0)");
        T(p, {
            onElement: e,
            once: !0,
            withCallback: function (t, i) {
                E(e, "greset")
            }
        });
        e.style.opacity = "", i && (i.style.opacity = "")
    }

    function G(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = i;
        if ((t = t.trim()).length <= e) return t;
        var s = t.substr(0, e - 1);
        return n ? s + '... <a href="#" class="desc-more">' + i + "</a>" : s
    }

    function Z(t, e) {
        var i = t.querySelector(".desc-more");
        if (!i) return !1;
        T("click", {
            onElement: i,
            withCallback: function (t, i) {
                t.preventDefault();
                var n = document.body,
                    s = M(i, ".gslide-desc");
                if (!s) return !1;
                s.innerHTML = e.description, k(n, "gdesc-open");
                var o = T("click", {
                    onElement: [n, M(s, ".gslide-description")],
                    withCallback: function (t, i) {
                        "a" !== t.target.nodeName.toLowerCase() && (E(n, "gdesc-open"), k(n, "gdesc-closed"), s.innerHTML = e.smallDescription, Z(s, e), setTimeout((function () {
                            E(n, "gdesc-closed")
                        }), 400), o.destroy())
                    }
                })
            }
        })
    }
    var R = function () {
        function t(i) {
            e(this, t), this.settings = b(y, i || {}), this.effectsClasses = this.getAnimationClasses(), this.slidesData = {}
        }
        return n(t, [{
            key: "init",
            value: function () {
                var t = this;
                this.baseEvents = T("click", {
                    onElement: ".".concat(this.settings.selector),
                    withCallback: function (e, i) {
                        e.preventDefault(), t.open(i)
                    }
                })
            }
        }, {
            key: "open",
            value: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (this.elements = this.getElements(t), 0 == this.elements.length) return !1;
                this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
                var e = this.settings.startAt;
                t && x.isNil(e) && (e = this.elements.indexOf(t)) < 0 && (e = 0), x.isNil(e) && (e = 0), this.build(), C(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
                var i = document.body;
                if (i.style.width = "".concat(i.offsetWidth, "px"), k(i, "glightbox-open"), k(g, "glightbox-open"), u && (k(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(e, !0), 1 == this.elements.length ? (z(this.prevButton), z(this.nextButton)) : (O(this.prevButton), O(this.nextButton)), this.lightboxOpen = !0, x.isFunction(this.settings.onOpen) && this.settings.onOpen(), u && d && this.settings.touchNavigation) return j.apply(this), !1;
                this.settings.keyboardNavigation && _.apply(this)
            }
        }, {
            key: "showSlide",
            value: function () {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                O(this.loader), this.index = parseInt(e);
                var n = this.slidesContainer.querySelector(".current");
                n && E(n, "current"), this.slideAnimateOut();
                var s = this.slidesContainer.querySelectorAll(".gslide")[e];
                if (A(s, "loaded")) this.slideAnimateIn(s, i), z(this.loader);
                else {
                    O(this.loader);
                    var o = I(this.elements[e], this.settings);
                    o.index = e, this.slidesData[e] = o, D.apply(this, [s, o, function () {
                        z(t.loader), t.resize(), t.slideAnimateIn(s, i)
                    }])
                }
                this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && A(this.slideDescription.parentNode, "gslide-media"), this.preloadSlide(e + 1), this.preloadSlide(e - 1);
                var l = this.loop();
                E(this.nextButton, "disabled"), E(this.prevButton, "disabled"), 0 !== e || l ? e !== this.elements.length - 1 || l || k(this.nextButton, "disabled") : k(this.prevButton, "disabled"), this.activeSlide = s
            }
        }, {
            key: "preloadSlide",
            value: function (t) {
                var e = this;
                if (t < 0 || t > this.elements.length) return !1;
                if (x.isNil(this.elements[t])) return !1;
                var i = this.slidesContainer.querySelectorAll(".gslide")[t];
                if (A(i, "loaded")) return !1;
                var n = I(this.elements[t], this.settings);
                n.index = t, this.slidesData[t] = n;
                var s = n.sourcetype;
                "video" == s || "external" == s ? setTimeout((function () {
                    D.apply(e, [i, n])
                }), 200) : D.apply(this, [i, n])
            }
        }, {
            key: "prevSlide",
            value: function () {
                this.goToSlide(this.index - 1)
            }
        }, {
            key: "nextSlide",
            value: function () {
                this.goToSlide(this.index + 1)
            }
        }, {
            key: "goToSlide",
            value: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index;
                var e = this.loop();
                if (!e && (t < 0 || t > this.elements.length)) return !1;
                t < 0 ? t = this.elements.length - 1 : t >= this.elements.length && (t = 0), this.showSlide(t)
            }
        }, {
            key: "slideAnimateIn",
            value: function (t, e) {
                var i = this,
                    n = t.querySelector(".gslide-media"),
                    s = t.querySelector(".gslide-description"),
                    o = {
                        index: this.prevActiveSlideIndex,
                        slide: this.prevActiveSlide
                    },
                    l = {
                        index: this.index,
                        slide: this.activeSlide
                    };
                if (n.offsetWidth > 0 && s && (z(s), s.style.display = ""), E(t, this.effectsClasses), e) C(t, this.settings.openEffect, (function () {
                    !u && i.settings.autoplayVideos && i.playSlideVideo(t), x.isFunction(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l])
                }));
                else {
                    var r = this.settings.slideEffect,
                        a = "none" !== r ? this.settings.cssEfects[r].in : r;
                    this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slide_back.in), C(t, a, (function () {
                        !u && i.settings.autoplayVideos && i.playSlideVideo(t), x.isFunction(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l])
                    }))
                }
                setTimeout((function () {
                    i.resize(t)
                }), 100), k(t, "current")
            }
        }, {
            key: "slideAnimateOut",
            value: function () {
                if (!this.prevActiveSlide) return !1;
                var t = this.prevActiveSlide;
                E(t, this.effectsClasses), k(t, "prev");
                var e = this.settings.slideEffect,
                    i = "none" !== e ? this.settings.cssEfects[e].out : e;
                this.stopSlideVideo(t), x.isFunction(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
                    index: this.prevActiveSlideIndex,
                    slide: this.prevActiveSlide
                }, {
                    index: this.index,
                    slide: this.activeSlide
                }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slide_back.out), C(t, i, (function () {
                    var e = t.querySelector(".gslide-media"),
                        i = t.querySelector(".gslide-description");
                    e.style.transform = "", E(e, "greset"), e.style.opacity = "", i && (i.style.opacity = ""), E(t, "prev")
                }))
            }
        }, {
            key: "stopSlideVideo",
            value: function (t) {
                x.isNumber(t) && (t = this.slidesContainer.querySelectorAll(".gslide")[t]);
                var e = t ? t.querySelector(".gvideo") : null;
                if (!e) return !1;
                var i = e.getAttribute("data-id");
                if (m && x.has(m, i)) {
                    var n = m[i];
                    n && n.play && n.pause()
                }
            }
        }, {
            key: "playSlideVideo",
            value: function (t) {
                x.isNumber(t) && (t = this.slidesContainer.querySelectorAll(".gslide")[t]);
                var e = t.querySelector(".gvideo");
                if (!e) return !1;
                var i = e.getAttribute("data-id");
                if (m && x.has(m, i)) {
                    var n = m[i];
                    n && n.play && n.play()
                }
            }
        }, {
            key: "setElements",
            value: function (t) {
                this.settings.elements = t
            }
        }, {
            key: "getElements",
            value: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (this.elements = [], !x.isNil(this.settings.elements) && x.isArray(this.settings.elements)) return this.settings.elements;
                var e = !1;
                if (null !== t) {
                    var i = t.getAttribute("data-gallery");
                    i && "" !== i && (e = document.querySelectorAll('[data-gallery="'.concat(i, '"]')))
                }
                return 0 == e && (e = document.querySelectorAll(".".concat(this.settings.selector))), e = Array.prototype.slice.call(e)
            }
        }, {
            key: "getActiveSlide",
            value: function () {
                return this.slidesContainer.querySelectorAll(".gslide")[this.index]
            }
        }, {
            key: "getActiveSlideIndex",
            value: function () {
                return this.index
            }
        }, {
            key: "getAnimationClasses",
            value: function () {
                var t = [];
                for (var e in this.settings.cssEfects)
                    if (this.settings.cssEfects.hasOwnProperty(e)) {
                        var i = this.settings.cssEfects[e];
                        t.push("g".concat(i.in)), t.push("g".concat(i.out))
                    } return t.join(" ")
            }
        }, {
            key: "build",
            value: function () {
                var t = this;
                if (this.built) return !1;
                var e = x.has(this.settings.svg, "next") ? this.settings.svg.next : "",
                    i = x.has(this.settings.svg, "prev") ? this.settings.svg.prev : "",
                    n = x.has(this.settings.svg, "close") ? this.settings.svg.close : "",
                    s = this.settings.lightboxHtml;
                s = L(s = (s = (s = s.replace(/{nextSVG}/g, e)).replace(/{prevSVG}/g, i)).replace(/{closeSVG}/g, n)), document.body.appendChild(s);
                var o = document.getElementById("glightbox-body");
                this.modal = o;
                var l = o.querySelector(".gclose");
                this.prevButton = o.querySelector(".gprev"), this.nextButton = o.querySelector(".gnext"), this.overlay = o.querySelector(".goverlay"), this.loader = o.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.events = {}, k(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && l && (this.events.close = T("click", {
                    onElement: l,
                    withCallback: function (e, i) {
                        e.preventDefault(), t.close()
                    }
                })), l && !this.settings.closeButton && l.parentNode.removeChild(l), this.nextButton && (this.events.next = T("click", {
                    onElement: this.nextButton,
                    withCallback: function (e, i) {
                        e.preventDefault(), t.nextSlide()
                    }
                })), this.prevButton && (this.events.prev = T("click", {
                    onElement: this.prevButton,
                    withCallback: function (e, i) {
                        e.preventDefault(), t.prevSlide()
                    }
                })), this.settings.closeOnOutsideClick && (this.events.outClose = T("click", {
                    onElement: o,
                    withCallback: function (e, i) {
                        A(document.body, "glightbox-mobile") || M(e.target, ".ginner-container") || M(e.target, ".gbtn") || A(e.target, "gnext") || A(e.target, "gprev") || t.close()
                    }
                })), w(this.elements, (function () {
                    var e = L(t.settings.slideHtml);
                    t.slidesContainer.appendChild(e)
                })), d && k(document.body, "glightbox-touch"), this.events.resize = T("resize", {
                    onElement: window,
                    withCallback: function () {
                        t.resize()
                    }
                }), this.built = !0
            }
        }, {
            key: "resize",
            value: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (t = t || this.activeSlide, document.body.style.width = "", document.body.style.width = "".concat(document.body.offsetWidth, "px"), t && !A(t, "zoomed")) {
                    var e = q(),
                        i = t.querySelector(".gvideo-wrapper"),
                        n = t.querySelector(".gslide-image"),
                        s = this.slideDescription,
                        o = e.width,
                        l = e.height;
                    if (o <= 768 ? k(document.body, "glightbox-mobile") : E(document.body, "glightbox-mobile"), i || n) {
                        var r = !1;
                        if (s && (A(s, "description-bottom") || A(s, "description-top")) && !A(s, "gabsolute") && (r = !0), n)
                            if (o <= 768) {
                                var a = n.querySelector("img");
                                a.setAttribute("style", "")
                            } else if (r) {
                            var h = s.offsetHeight,
                                c = this.slidesData[this.index].width;
                            c = c <= o ? c + "px" : "100%";
                            var u = n.querySelector("img");
                            u.setAttribute("style", "max-height: calc(100vh - ".concat(h, "px)")), s.setAttribute("style", "max-width: ".concat(u.offsetWidth, "px;"))
                        }
                        if (i) {
                            var d = this.settings.plyr.ratio.split(":"),
                                g = this.slidesData[this.index].width,
                                p = g / (parseInt(d[0]) / parseInt(d[1]));
                            if (p = Math.floor(p), r && (l -= s.offsetHeight), l < p && o > g) {
                                var v = i.offsetWidth,
                                    f = i.offsetHeight,
                                    m = l / f,
                                    y = {
                                        width: v * m,
                                        height: f * m
                                    };
                                i.parentNode.setAttribute("style", "max-width: ".concat(y.width, "px")), r && s.setAttribute("style", "max-width: ".concat(y.width, "px;"))
                            } else i.parentNode.style.maxWidth = "".concat(g, "px"), r && s.setAttribute("style", "max-width: ".concat(g, "px;"))
                        }
                    }
                }
            }
        }, {
            key: "reload",
            value: function () {
                this.init()
            }
        }, {
            key: "loop",
            value: function () {
                var t = x.has(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
                return t = x.has(this.settings, "loop") ? this.settings.loop : t, t
            }
        }, {
            key: "close",
            value: function () {
                var t = this;
                if (this.closing) return !1;
                this.closing = !0, this.stopSlideVideo(this.activeSlide), k(this.modal, "glightbox-closing"), C(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), C(this.activeSlide, this.settings.closeEffect, (function () {
                    if (t.activeSlide = null, t.prevActiveSlideIndex = null, t.prevActiveSlide = null, t.built = !1, t.events) {
                        for (var e in t.events) t.events.hasOwnProperty(e) && t.events[e].destroy();
                        t.events = null
                    }
                    var i = document.body;
                    E(g, "glightbox-open"), E(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile"), i.style.width = "", t.modal.parentNode.removeChild(t.modal), x.isFunction(t.settings.onClose) && t.settings.onClose(), t.closing = null
                }))
            }
        }, {
            key: "destroy",
            value: function () {
                this.close(), this.baseEvents.destroy()
            }
        }]), t
    }();
    return function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = new R(t);
        return e.init(), e
    }
}));