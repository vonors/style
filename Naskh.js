function remove_diacritic(e) {
    return e.replace(/[\u064B\u064C\u064D\u064Eu\u064F\u0650\u0651\u0652]/g, "")
}

function clean_arabic_text(e) {
    return e = e.replace(/[\u064B\u064C\u064D\u064Eu\u064F\u0650\u0651\u0652\.\.]/g, ""), e.length > 140 && (e = e.replace(/[\,\،]/g, "")), e = e.replace(/\s+/g, " "), $.trim(e)
}

function zeroPad(e, t) {
    for(var n = e + ""; n.length < t;) n = "0" + n;
    return n
}

function unselectText() {
    var e = window.getSelection ? window.getSelection() : document.selection;
    e && (e.removeAllRanges ? e.removeAllRanges() : e.empty && e.empty())
}

function addLoader(e) {
    $(e).html('<div class="dialog-loader" style="width:100%;height:100%;min-width:50px;min-height:50px;"></div>')
}

function removeLoader(e) {
    $(e).html("")
}
var azkar_info = 0,
    azkar_title = "";
! function(e) {
    e.fn.newWindow = function(t) {
        e.fn.newWindow.defaultSettings = {
            centerBrowser: 0,
            centerScreen: 0,
            height: 500,
            left: 0,
            location: 0,
            menubar: 0,
            resizable: 0,
            scrollbars: 0,
            status: 0,
            width: 500,
            windowName: null,
            windowURL: null,
            top: 0,
            toolbar: 0
        }, settings = e.extend({}, e.fn.popupWindow.defaultSettings, t || {});
        var n = "height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable + ",location=" + settings.location + ",menuBar=" + settings.menubar;
        settings.windowName = this.name || settings.windowName, settings.windowURL = this.href || settings.windowURL;
        var o, i;
        return settings.centerBrowser ? (e.browser.msie ? (o = window.screenTop - 120 + ((document.documentElement.clientHeight + 120) / 2 - settings.height / 2), i = window.screenLeft + ((document.body.offsetWidth + 20) / 2 - settings.width / 2)) : (o = window.screenY + (window.outerHeight / 2 - settings.height / 2), i = window.screenX + (window.outerWidth / 2 - settings.width / 2)), window.open(settings.windowURL, settings.windowName, n + ",left=" + i + ",top=" + o).focus()) : settings.centerScreen ? (o = (screen.height - settings.height) / 2, i = (screen.width - settings.width) / 2, window.open(settings.windowURL, settings.windowName, n + ",left=" + i + ",top=" + o).focus()) : window.open(settings.windowURL, settings.windowName, n + ",left=" + settings.left + ",top=" + settings.top).focus(), !1
    }
}(jQuery), $(document).ready(function() {
    function e(e) {
        var t = $("#copy-content")[0];
        if($.browser.msie) {
            var n = document.body.createTextRange();
            n.moveToElementText(t), n.select()
        } else {
            var o = window.getSelection(),
                n = document.createRange();
            n.selectNodeContents(t), o.removeAllRanges(), o.addRange(n)
        }
    }

    function t(e, t) {
        $(e).each(function() {
            var e = $(this).find(t).map(function() {
                    return $(this).height()
                }).get(),
                n = Math.max.apply(null, e);
            $(this).find(t).height(n)
        })
    }

    function n() {
        ($("#device-ms").is(":visible") || $("#device-sm").is(":visible") || $("#device-md").is(":visible") || $("#device-lg").is(":visible")) && t(".equalizer", ".equal-height")
    }
    var o = $(window).height(),
        i = $(window).width();
    $(".zekr-counter").hover(function() {
        $(this).addClass("alert-danger")
    }, function() {
        $(this).removeClass("alert-danger")
    }), $(".azkarinfo").click(function(e) {
        return e.stopPropagation(), e.returnValue = !1, e.preventDefault && e.preventDefault(), addLoader("#info-content"), azkar_info_url = $(this).data("href"), $("#info-content").load(azkar_info_url, function(e, t, n) {}), $("#info-dialog").modal("show"), !1
    }), $("#blessings-btn").click(function() {
        var e = null == $.cookie("hide_blessings") ? 0 : $.cookie("hide_blessings");
        e = 1 == e ? 0 : 1, $.cookie("hide_blessings", e, {
            expires: 999,
            path: "/"
        }), $(".zekrbless, .zekrbless1").toggle()
    }), null != $.cookie("hide_blessings") && 1 == $.cookie("hide_blessings") && $(".zekrbless, .zekrbless1").hide(), $("#diacritics-btn").click(function() {
        var e = null == $.cookie("azkar_diacritics") ? 0 : $.cookie("azkar_diacritics");
        e = 1 == e ? 0 : 1, $.cookie("azkar_diacritics", e, {
            expires: 999,
            path: "/"
        }), window.location.reload(!0)
    }), $.fn.justText = function() {
        return $(this).clone().children().remove().end().text()
    }, $.fn.selectText = function() {
        var e = $(this)[0];
        if(jQuery.browser.msie) {
            var t = document.body.createTextRange();
            t.moveToElementText(e), t.select()
        } else if(jQuery.browser.mozilla || jQuery.browser.opera || jQuery.browser.webkit) {
            var n = e.ownerDocument.defaultView.getSelection();
            console.log(n);
            var t = e.ownerDocument.createRange();
            t.selectNodeContents(e), n.removeAllRanges(), n.addRange(t)
        } else if(jQuery.browser.safari) {
            var n = e.ownerDocument.defaultView.getSelection();
            n.setBaseAndExtent(e, 0, e, 1)
        }
    }, $("#copy-dialog").on("show.bs.modal", function(e) {
        $("#copy-content").focus()
    }), $("#select-zekr-btn").on("click", function(t) {
        e("#copy-content")
    }), $(".copyzekr").tooltip({
        animation: !0,
        html: !0,
        placement: "auto top",
        trigger: "hover"
    }), $(".copyzekr").on("click", function(e) {
        e.preventDefault(), $("#copy-content").html("");
        var t = $(this).data("href");
        return $("#copy-content").load(t, function(e, t, n) {
            $("#copy-content").focus()
        }), $("#copy-dialog").modal("show"), !1
    }), $(".tweetzekr").on("click", function(e) {
        e.returnValue = !1, e.preventDefault && e.preventDefault();
        var t = window.location;
        t = "";
        var n = clean_arabic_text($(this).parent().text().trim());
        n.length > 140 && (n = n.substring(0, 137) + "...");
        var r = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(n) + "&url=" + encodeURIComponent(t);
        return $.fn.newWindow({
            windowURL: r,
            width: .6 * i > 500 ? 500 : .6 * i,
            height: .5 * o > 300 ? 300 : .5 * o,
            location: 0,
            menubar: 0,
            resizable: 1,
            scrollbars: 1,
            status: 0,
            toolbar: 0,
            centerScreen: 1
        }), !1
    }), $(".facebookzekr").on("click", function(e) {
        e.returnValue = !1, e.preventDefault && e.preventDefault();
        var t = window.location,
            n = $(this).parent().text().trim(),
            r = $(document).find("title").text().trim(),
            a = imagesurl + "/logo200x200.png",
            s = "https://www.facebook.com/dialog/feed?";
        return s += "app_id=1643590795965583&", s += "link=" + encodeURIComponent(t) + "&", s += "redirect_uri=" + encodeURIComponent(t) + "&", s += "picture=" + encodeURIComponent(a) + "&", s += "name=" + encodeURIComponent(r) + "&", s += "caption=" + encodeURIComponent(r) + "&", s += "description=" + encodeURIComponent(n), $.fn.newWindow({
            windowURL: s,
            width: .75 * i,
            height: .75 * o,
            location: 0,
            menubar: 0,
            resizable: 1,
            scrollbars: 1,
            status: 0,
            toolbar: 0,
            centerScreen: 1
        }), !1
    }), $(".zekr-counter").click(function(e) {
        e.returnValue = !1, e.preventDefault && e.preventDefault(), unselectText();
        var t = $(this),
            n = t.find(".count-down").first(),
            o = n.data("count"),
            i = parseInt(n.text());
        return i = isNaN(i) ? 0 : i, 0 == i ? !1 : (i == o && t.addClass("alert-info"), 0 == i ? i = o : 1 == i ? (i--, setTimeout(function() {
            n.text(o)
        }, 18e5), setTimeout(function() {
            t.removeClass("alert-info")
        }, 18e5)) : i--, i = i > 99 ? zeroPad(i, 3) : zeroPad(i, 2), n.text(i), !1)
    }), $(".zekr-reset").click(function(e) {
        e.returnValue = !1, e.preventDefault && e.preventDefault(), unselectText();
        var t = $(this).closest('div[class^="zekr-counter"]'),
            n = t.find(".count-down").first(),
            o = n.data("count"),
            i = o;
        return i = i > 99 ? zeroPad(i, 3) : zeroPad(i, 2), n.text(i), t.removeClass("alert-info"), !1
    }), $(".cat-button").click(function(e) {
        return e.returnValue = !1, e.preventDefault && e.preventDefault(), window.location = $(this).data("href"), !1
    }), $(".count-down").show(), $(".count-clock").show(), $(".zekr-count").show(), $("#azkar-settings-btn").click(function(e) {
        return e.stopPropagation(), e.returnValue = !1, addLoader("#setting-content"), e.preventDefault && e.preventDefault(), $("#setting-dialog").dialog("open"), !1
    }), $("#azkar-print-btn").click(function(e) {
        return e.preventDefault(), window.location = baseurl + "AzkarPrint/" + azkar_catid, !1
    }), $(window).width() <= 480 || $(window).width() > 480 && $(window).width() <= 768 || $(window).width() > 768 && $(window).width() <= 992 || $(window).width() > 992 && $(window).width() <= 1200, $(".zekr-row").click(function(e) {
        $(this).toggleClass("alert-danger")
    }), $(window).resize(function() {
        n()
    }), n(), navigator.userAgent.match(/(iPod|iPhone|iPad)/i) && $(".hidden-ios").hide();
    var r = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return r.Android() || r.BlackBerry() || r.iOS() || r.Opera() || r.Windows()
        }
    };
    $(".whatsappzekr").on("click", function(e) {
        if(e.returnValue = !1, e.preventDefault && e.preventDefault(), r.any()) {
            var t = (window.location, $(this).parent().text().trim()),
                n = encodeURIComponent(t) + " - " + encodeURIComponent("http://adnane1.123.st/"),
                o = "whatsapp://send?text=" + n;
            window.location.href = o
        } else alert("This option is only available on mobile devices with Whatsapp application installed.");
        return !1
    }), $(".telegramzekr").on("click", function(e) {
        e.returnValue = !1, e.preventDefault && e.preventDefault();
        var t = (window.location, $(this).parent().text().trim()),
            n = encodeURIComponent(t) + " - " + encodeURIComponent("http://adnane1.123.st/"),
            o = "tg://msg?text=" + n;
        return window.location.href = o, !1
    }), $(".gpluszekr").each(function() {
        var e = $(this),
            t = e.attr("id"),
            n = e.parent().text().trim(),
            o = n + " - http://adnane1.123.st",
            i = {
                contenturl: "http://adnane1.123.st/",
                contentdeeplinkid: "",
                clientid: "214280211729-gf9sk1g0pekvnm146knn63cohclipspj.apps.googleusercontent.com",
                cookiepolicy: "single_host_origin",
                prefilltext: o,
                calltoactionlabel: "READ_MORE",
                calltoactionurl: "http://adnane1.123.st/",
                calltoactiondeeplinkid: ""
            };
        gapi.interactivepost.render(t, i), e.on("click", function(e) {
            return e.returnValue = !1, e.preventDefault && e.preventDefault(), !1
        })
    }), Modernizr.flexbox || $(".btn-toolbar").removeClass("flexboxs")
});
