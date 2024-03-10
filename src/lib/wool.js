/*
Single file library composed of parts of the javascript wool engine:
https://github.com/woolplatform/wool/tree/master/html5
*/

/**
 * marked v4.2.12 - a markdown parser
 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).marked = {})
}(this, function (r) {
    "use strict";

    function i(e, t) {
        for (var u = 0; u < t.length; u++) {
            var n = t[u];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, function (e) {
                e = function (e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var u = e[Symbol.toPrimitive];
                    if (void 0 === u) return ("string" === t ? String : Number)(e);
                    u = u.call(e, t || "default");
                    if ("object" != typeof u) return u;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }(e, "string");
                return "symbol" == typeof e ? e : String(e)
            }(n.key), n)
        }
    }

    function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var u = 0, n = new Array(t); u < t; u++) n[u] = e[u];
        return n
    }

    function D(e, t) {
        var u, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = function (e, t) {
            var u;
            if (e) return "string" == typeof e ? s(e, t) : "Map" === (u = "Object" === (u = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : u) || "Set" === u ? Array.from(e) : "Arguments" === u || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? s(e, t) : void 0
        }(e)) || t && e && "number" == typeof e.length) return n && (e = n), u = 0, function () {
            return u >= e.length ? {done: !0} : {done: !1, value: e[u++]}
        };
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }

    function e() {
        return {
            async: !1,
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: "",
            highlight: null,
            langPrefix: "language-",
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1
        }
    }

    r.defaults = e();

    function u(e) {
        return t[e]
    }

    var n = /[&<>"']/, l = new RegExp(n.source, "g"), a = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        o = new RegExp(a.source, "g"), t = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};

    function c(e, t) {
        if (t) {
            if (n.test(e)) return e.replace(l, u)
        } else if (a.test(e)) return e.replace(o, u);
        return e
    }

    var h = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

    function x(e) {
        return e.replace(h, function (e, t) {
            return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
        })
    }

    var p = /(^|[^\[])\^/g;

    function f(u, e) {
        u = "string" == typeof u ? u : u.source, e = e || "";
        var n = {
            replace: function (e, t) {
                return t = (t = t.source || t).replace(p, "$1"), u = u.replace(e, t), n
            }, getRegex: function () {
                return new RegExp(u, e)
            }
        };
        return n
    }

    var g = /[^\w:]/g, Z = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

    function F(e, t, u) {
        if (e) {
            try {
                n = decodeURIComponent(x(u)).replace(g, "").toLowerCase()
            } catch (e) {
                return null
            }
            if (0 === n.indexOf("javascript:") || 0 === n.indexOf("vbscript:") || 0 === n.indexOf("data:")) return null
        }
        var n;
        t && !Z.test(u) && (e = u, A[" " + (n = t)] || (q.test(n) ? A[" " + n] = n + "/" : A[" " + n] = E(n, "/", !0)), t = -1 === (n = A[" " + n]).indexOf(":"), u = "//" === e.substring(0, 2) ? t ? e : n.replace(O, "$1") + e : "/" === e.charAt(0) ? t ? e : n.replace(j, "$1") + e : n + e);
        try {
            u = encodeURI(u).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return u
    }

    var A = {}, q = /^[^:]+:\/*[^/]*$/, O = /^([^:]+:)[\s\S]*$/, j = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    var d = {
        exec: function () {
        }
    };

    function C(e) {
        for (var t, u, n = 1; n < arguments.length; n++) for (u in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
        return e
    }

    function k(e, t) {
        var u = e.replace(/\|/g, function (e, t, u) {
            for (var n = !1, r = t; 0 <= --r && "\\" === u[r];) n = !n;
            return n ? "|" : " |"
        }).split(/ \|/), n = 0;
        if (u[0].trim() || u.shift(), 0 < u.length && !u[u.length - 1].trim() && u.pop(), u.length > t) u.splice(t); else for (; u.length < t;) u.push("");
        for (; n < u.length; n++) u[n] = u[n].trim().replace(/\\\|/g, "|");
        return u
    }

    function E(e, t, u) {
        var n = e.length;
        if (0 === n) return "";
        for (var r = 0; r < n;) {
            var i = e.charAt(n - r - 1);
            if ((i !== t || u) && (i === t || !u)) break;
            r++
        }
        return e.slice(0, n - r)
    }

    function m(e) {
        e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
    }

    function b(e, t) {
        if (t < 1) return "";
        for (var u = ""; 1 < t;) 1 & t && (u += e), t >>= 1, e += e;
        return u + e
    }

    function B(e, t, u, n) {
        var r = t.href, t = t.title ? c(t.title) : null, i = e[1].replace(/\\([\[\]])/g, "$1");
        return "!" !== e[0].charAt(0) ? (n.state.inLink = !0, e = {
            type: "link",
            raw: u,
            href: r,
            title: t,
            text: i,
            tokens: n.inlineTokens(i)
        }, n.state.inLink = !1, e) : {type: "image", raw: u, href: r, title: t, text: c(i)}
    }

    var w = function () {
            function e(e) {
                this.options = e || r.defaults
            }

            var t = e.prototype;
            return t.space = function (e) {
                e = this.rules.block.newline.exec(e);
                if (e && 0 < e[0].length) return {type: "space", raw: e[0]}
            }, t.code = function (e) {
                var t, e = this.rules.block.code.exec(e);
                if (e) return t = e[0].replace(/^ {1,4}/gm, ""), {
                    type: "code",
                    raw: e[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? t : E(t, "\n")
                }
            }, t.fences = function (e) {
                var t, u, n, r, e = this.rules.block.fences.exec(e);
                if (e) return t = e[0], u = t, n = e[3] || "", u = null === (u = t.match(/^(\s+)(?:```)/)) ? n : (r = u[1], n.split("\n").map(function (e) {
                    var t = e.match(/^\s+/);
                    return null !== t && t[0].length >= r.length ? e.slice(r.length) : e
                }).join("\n")), {
                    type: "code",
                    raw: t,
                    lang: e[2] && e[2].trim().replace(this.rules.inline._escapes, "$1"),
                    text: u
                }
            }, t.heading = function (e) {
                var t, u, e = this.rules.block.heading.exec(e);
                if (e) return t = e[2].trim(), /#$/.test(t) && (u = E(t, "#"), !this.options.pedantic && u && !/ $/.test(u) || (t = u.trim())), {
                    type: "heading",
                    raw: e[0],
                    depth: e[1].length,
                    text: t,
                    tokens: this.lexer.inline(t)
                }
            }, t.hr = function (e) {
                e = this.rules.block.hr.exec(e);
                if (e) return {type: "hr", raw: e[0]}
            }, t.blockquote = function (e) {
                var t, u, n, e = this.rules.block.blockquote.exec(e);
                if (e) return t = e[0].replace(/^ *>[ \t]?/gm, ""), u = this.lexer.state.top, this.lexer.state.top = !0, n = this.lexer.blockTokens(t), this.lexer.state.top = u, {
                    type: "blockquote",
                    raw: e[0],
                    tokens: n,
                    text: t
                }
            }, t.list = function (e) {
                var t = this.rules.block.list.exec(e);
                if (t) {
                    var u, n, r, i, s, l, a, o, D, c, h, p = 1 < (g = t[1].trim()).length,
                        f = {type: "list", raw: "", ordered: p, start: p ? +g.slice(0, -1) : "", loose: !1, items: []},
                        g = p ? "\\d{1,9}\\" + g.slice(-1) : "\\" + g;
                    this.options.pedantic && (g = p ? g : "[*+-]");
                    for (var F = new RegExp("^( {0,3}" + g + ")((?:[\t ][^\\n]*)?(?:\\n|$))"); e && (h = !1, t = F.exec(e)) && !this.rules.block.hr.test(e);) {
                        if (u = t[0], e = e.substring(u.length), a = t[2].split("\n", 1)[0].replace(/^\t+/, function (e) {
                            return " ".repeat(3 * e.length)
                        }), o = e.split("\n", 1)[0], this.options.pedantic ? (i = 2, c = a.trimLeft()) : (i = t[2].search(/[^ ]/), c = a.slice(i = 4 < i ? 1 : i), i += t[1].length), s = !1, !a && /^ *$/.test(o) && (u += o + "\n", e = e.substring(o.length + 1), h = !0), !h) for (var A = new RegExp("^ {0," + Math.min(3, i - 1) + "}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"), d = new RegExp("^ {0," + Math.min(3, i - 1) + "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"), C = new RegExp("^ {0," + Math.min(3, i - 1) + "}(?:```|~~~)"), k = new RegExp("^ {0," + Math.min(3, i - 1) + "}#"); e && (o = D = e.split("\n", 1)[0], this.options.pedantic && (o = o.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !C.test(o)) && !k.test(o) && !A.test(o) && !d.test(e);) {
                            if (o.search(/[^ ]/) >= i || !o.trim()) c += "\n" + o.slice(i); else {
                                if (s) break;
                                if (4 <= a.search(/[^ ]/)) break;
                                if (C.test(a)) break;
                                if (k.test(a)) break;
                                if (d.test(a)) break;
                                c += "\n" + o
                            }
                            s || o.trim() || (s = !0), u += D + "\n", e = e.substring(D.length + 1), a = o.slice(i)
                        }
                        f.loose || (l ? f.loose = !0 : /\n *\n *$/.test(u) && (l = !0)), this.options.gfm && (n = /^\[[ xX]\] /.exec(c)) && (r = "[ ] " !== n[0], c = c.replace(/^\[[ xX]\] +/, "")), f.items.push({
                            type: "list_item",
                            raw: u,
                            task: !!n,
                            checked: r,
                            loose: !1,
                            text: c
                        }), f.raw += u
                    }
                    f.items[f.items.length - 1].raw = u.trimRight(), f.items[f.items.length - 1].text = c.trimRight(), f.raw = f.raw.trimRight();
                    for (var E, x = f.items.length, m = 0; m < x; m++) this.lexer.state.top = !1, f.items[m].tokens = this.lexer.blockTokens(f.items[m].text, []), f.loose || (E = 0 < (E = f.items[m].tokens.filter(function (e) {
                        return "space" === e.type
                    })).length && E.some(function (e) {
                        return /\n.*\n/.test(e.raw)
                    }), f.loose = E);
                    if (f.loose) for (m = 0; m < x; m++) f.items[m].loose = !0;
                    return f
                }
            }, t.html = function (e) {
                var t, e = this.rules.block.html.exec(e);
                if (e) return t = {
                    type: "html",
                    raw: e[0],
                    pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
                    text: e[0]
                }, this.options.sanitize && (e = this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0]), t.type = "paragraph", t.text = e, t.tokens = this.lexer.inline(e)), t
            }, t.def = function (e) {
                var t, u, n, e = this.rules.block.def.exec(e);
                if (e) return t = e[1].toLowerCase().replace(/\s+/g, " "), u = e[2] ? e[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "", n = e[3] && e[3].substring(1, e[3].length - 1).replace(this.rules.inline._escapes, "$1"), {
                    type: "def",
                    tag: t,
                    raw: e[0],
                    href: u,
                    title: n
                }
            }, t.table = function (e) {
                e = this.rules.block.table.exec(e);
                if (e) {
                    var t = {
                        type: "table",
                        header: k(e[1]).map(function (e) {
                            return {text: e}
                        }),
                        align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        rows: e[3] && e[3].trim() ? e[3].replace(/\n[ \t]*$/, "").split("\n") : []
                    };
                    if (t.header.length === t.align.length) {
                        t.raw = e[0];
                        for (var u, n, r, i = t.align.length, s = 0; s < i; s++) /^ *-+: *$/.test(t.align[s]) ? t.align[s] = "right" : /^ *:-+: *$/.test(t.align[s]) ? t.align[s] = "center" : /^ *:-+ *$/.test(t.align[s]) ? t.align[s] = "left" : t.align[s] = null;
                        for (i = t.rows.length, s = 0; s < i; s++) t.rows[s] = k(t.rows[s], t.header.length).map(function (e) {
                            return {text: e}
                        });
                        for (i = t.header.length, u = 0; u < i; u++) t.header[u].tokens = this.lexer.inline(t.header[u].text);
                        for (i = t.rows.length, u = 0; u < i; u++) for (r = t.rows[u], n = 0; n < r.length; n++) r[n].tokens = this.lexer.inline(r[n].text);
                        return t
                    }
                }
            }, t.lheading = function (e) {
                e = this.rules.block.lheading.exec(e);
                if (e) return {
                    type: "heading",
                    raw: e[0],
                    depth: "=" === e[2].charAt(0) ? 1 : 2,
                    text: e[1],
                    tokens: this.lexer.inline(e[1])
                }
            }, t.paragraph = function (e) {
                var t, e = this.rules.block.paragraph.exec(e);
                if (e) return t = "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1], {
                    type: "paragraph",
                    raw: e[0],
                    text: t,
                    tokens: this.lexer.inline(t)
                }
            }, t.text = function (e) {
                e = this.rules.block.text.exec(e);
                if (e) return {type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0])}
            }, t.escape = function (e) {
                e = this.rules.inline.escape.exec(e);
                if (e) return {type: "escape", raw: e[0], text: c(e[1])}
            }, t.tag = function (e) {
                e = this.rules.inline.tag.exec(e);
                if (e) return !this.lexer.state.inLink && /^<a /i.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (this.lexer.state.inRawBlock = !1), {
                    type: this.options.sanitize ? "text" : "html",
                    raw: e[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0]) : e[0]
                }
            }, t.link = function (e) {
                e = this.rules.inline.link.exec(e);
                if (e) {
                    var t = e[2].trim();
                    if (!this.options.pedantic && /^</.test(t)) {
                        if (!/>$/.test(t)) return;
                        var u = E(t.slice(0, -1), "\\");
                        if ((t.length - u.length) % 2 == 0) return
                    } else {
                        u = function (e, t) {
                            if (-1 !== e.indexOf(t[1])) for (var u = e.length, n = 0, r = 0; r < u; r++) if ("\\" === e[r]) r++; else if (e[r] === t[0]) n++; else if (e[r] === t[1] && --n < 0) return r;
                            return -1
                        }(e[2], "()");
                        -1 < u && (r = (0 === e[0].indexOf("!") ? 5 : 4) + e[1].length + u, e[2] = e[2].substring(0, u), e[0] = e[0].substring(0, r).trim(), e[3] = "")
                    }
                    var n, u = e[2], r = "";
                    return this.options.pedantic ? (n = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(u)) && (u = n[1], r = n[3]) : r = e[3] ? e[3].slice(1, -1) : "", u = u.trim(), B(e, {
                        href: (u = /^</.test(u) ? this.options.pedantic && !/>$/.test(t) ? u.slice(1) : u.slice(1, -1) : u) && u.replace(this.rules.inline._escapes, "$1"),
                        title: r && r.replace(this.rules.inline._escapes, "$1")
                    }, e[0], this.lexer)
                }
            }, t.reflink = function (e, t) {
                var u;
                if (u = (u = this.rules.inline.reflink.exec(e)) || this.rules.inline.nolink.exec(e)) return (e = t[(e = (u[2] || u[1]).replace(/\s+/g, " ")).toLowerCase()]) ? B(u, e, u[0], this.lexer) : {
                    type: "text",
                    raw: t = u[0].charAt(0),
                    text: t
                }
            }, t.emStrong = function (e, t, u) {
                void 0 === u && (u = "");
                var n = this.rules.inline.emStrong.lDelim.exec(e);
                if (n && (!n[3] || !u.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))) {
                    var r = n[1] || n[2] || "";
                    if (!r || "" === u || this.rules.inline.punctuation.exec(u)) {
                        var i = n[0].length - 1, s = i, l = 0,
                            a = "*" === n[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                        for (a.lastIndex = 0, t = t.slice(-1 * e.length + i); null != (n = a.exec(t));) {
                            var o, D = n[1] || n[2] || n[3] || n[4] || n[5] || n[6];
                            if (D) if (o = D.length, n[3] || n[4]) s += o; else if ((n[5] || n[6]) && i % 3 && !((i + o) % 3)) l += o; else if (!(0 < (s -= o))) return o = Math.min(o, o + s + l), D = e.slice(0, i + n.index + (n[0].length - D.length) + o), Math.min(i, o) % 2 ? (o = D.slice(1, -1), {
                                type: "em",
                                raw: D,
                                text: o,
                                tokens: this.lexer.inlineTokens(o)
                            }) : (o = D.slice(2, -2), {type: "strong", raw: D, text: o, tokens: this.lexer.inlineTokens(o)})
                        }
                    }
                }
            }, t.codespan = function (e) {
                var t, u, n, e = this.rules.inline.code.exec(e);
                if (e) return n = e[2].replace(/\n/g, " "), t = /[^ ]/.test(n), u = /^ /.test(n) && / $/.test(n), n = c(n = t && u ? n.substring(1, n.length - 1) : n, !0), {
                    type: "codespan",
                    raw: e[0],
                    text: n
                }
            }, t.br = function (e) {
                e = this.rules.inline.br.exec(e);
                if (e) return {type: "br", raw: e[0]}
            }, t.del = function (e) {
                e = this.rules.inline.del.exec(e);
                if (e) return {type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2])}
            }, t.autolink = function (e, t) {
                var u, e = this.rules.inline.autolink.exec(e);
                if (e) return t = "@" === e[2] ? "mailto:" + (u = c(this.options.mangle ? t(e[1]) : e[1])) : u = c(e[1]), {
                    type: "link",
                    raw: e[0],
                    text: u,
                    href: t,
                    tokens: [{type: "text", raw: u, text: u}]
                }
            }, t.url = function (e, t) {
                var u, n, r, i;
                if (u = this.rules.inline.url.exec(e)) {
                    if ("@" === u[2]) r = "mailto:" + (n = c(this.options.mangle ? t(u[0]) : u[0])); else {
                        for (; i = u[0], u[0] = this.rules.inline._backpedal.exec(u[0])[0], i !== u[0];) ;
                        n = c(u[0]), r = "www." === u[1] ? "http://" + u[0] : u[0]
                    }
                    return {type: "link", raw: u[0], text: n, href: r, tokens: [{type: "text", raw: n, text: n}]}
                }
            }, t.inlineText = function (e, t) {
                e = this.rules.inline.text.exec(e);
                if (e) return t = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0]) : e[0] : c(this.options.smartypants ? t(e[0]) : e[0]), {
                    type: "text",
                    raw: e[0],
                    text: t
                }
            }, e
        }(), y = {
            newline: /^(?: *(?:\n|$))+/,
            code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
            hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
            html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
            def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
            table: d,
            lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
        },
        v = (y.def = f(y.def).replace("label", y._label).replace("title", y._title).getRegex(), y.bullet = /(?:[*+-]|\d{1,9}[.)])/, y.listItemStart = f(/^( *)(bull) */).replace("bull", y.bullet).getRegex(), y.list = f(y.list).replace(/bull/g, y.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + y.def.source + ")").getRegex(), y._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", y._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, y.html = f(y.html, "i").replace("comment", y._comment).replace("tag", y._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), y.paragraph = f(y._paragraph).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", y._tag).getRegex(), y.blockquote = f(y.blockquote).replace("paragraph", y.paragraph).getRegex(), y.normal = C({}, y), y.gfm = C({}, y.normal, {table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}), y.gfm.table = f(y.gfm.table).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", y._tag).getRegex(), y.gfm.paragraph = f(y._paragraph).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", y.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", y._tag).getRegex(), y.pedantic = C({}, y.normal, {
            html: f("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", y._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: d,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: f(y.normal._paragraph).replace("hr", y.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", y.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
        }), {
            escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
            autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
            url: d,
            tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
            link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
            reflink: /^!?\[(label)\]\[(ref)\]/,
            nolink: /^!?\[(ref)\](?:\[\])?/,
            reflinkSearch: "reflink|nolink(?!\\()",
            emStrong: {
                lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
                rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
                rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
            },
            code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
            br: /^( {2,}|\\)\n(?!\s*$)/,
            del: d,
            text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
            punctuation: /^([\spunctuation])/
        });

    function L(e) {
        return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
    }

    function _(e) {
        for (var t, u = "", n = e.length, r = 0; r < n; r++) t = e.charCodeAt(r), u += "&#" + (t = .5 < Math.random() ? "x" + t.toString(16) : t) + ";";
        return u
    }

    v._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", v.punctuation = f(v.punctuation).replace(/punctuation/g, v._punctuation).getRegex(), v.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, v.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g, v._comment = f(y._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), v.emStrong.lDelim = f(v.emStrong.lDelim).replace(/punct/g, v._punctuation).getRegex(), v.emStrong.rDelimAst = f(v.emStrong.rDelimAst, "g").replace(/punct/g, v._punctuation).getRegex(), v.emStrong.rDelimUnd = f(v.emStrong.rDelimUnd, "g").replace(/punct/g, v._punctuation).getRegex(), v._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, v._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, v._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, v.autolink = f(v.autolink).replace("scheme", v._scheme).replace("email", v._email).getRegex(), v._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, v.tag = f(v.tag).replace("comment", v._comment).replace("attribute", v._attribute).getRegex(), v._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, v._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, v._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, v.link = f(v.link).replace("label", v._label).replace("href", v._href).replace("title", v._title).getRegex(), v.reflink = f(v.reflink).replace("label", v._label).replace("ref", y._label).getRegex(), v.nolink = f(v.nolink).replace("ref", y._label).getRegex(), v.reflinkSearch = f(v.reflinkSearch, "g").replace("reflink", v.reflink).replace("nolink", v.nolink).getRegex(), v.normal = C({}, v), v.pedantic = C({}, v.normal, {
        strong: {
            start: /^__|\*\*/,
            middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g
        },
        link: f(/^!?\[(label)\]\((.*?)\)/).replace("label", v._label).getRegex(),
        reflink: f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", v._label).getRegex()
    }), v.gfm = C({}, v.normal, {
        escape: f(v.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    }), v.gfm.url = f(v.gfm.url, "i").replace("email", v.gfm._extended_email).getRegex(), v.breaks = C({}, v.gfm, {
        br: f(v.br).replace("{2,}", "*").getRegex(),
        text: f(v.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    var z = function () {
        function u(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || r.defaults, this.options.tokenizer = this.options.tokenizer || new w, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, (this.tokenizer.lexer = this).inlineQueue = [], this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            e = {block: y.normal, inline: v.normal};
            this.options.pedantic ? (e.block = y.pedantic, e.inline = v.pedantic) : this.options.gfm && (e.block = y.gfm, this.options.breaks ? e.inline = v.breaks : e.inline = v.gfm), this.tokenizer.rules = e
        }

        u.lex = function (e, t) {
            return new u(t).lex(e)
        }, u.lexInline = function (e, t) {
            return new u(t).inlineTokens(e)
        };
        var e, t, n = u.prototype;
        return n.lex = function (e) {
            var t;
            for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
            return this.tokens
        }, n.blockTokens = function (r, t) {
            var u, e, i, n, s = this;
            for (void 0 === t && (t = []), r = this.options.pedantic ? r.replace(/\t/g, "    ").replace(/^ +$/gm, "") : r.replace(/^( *)(\t+)/gm, function (e, t, u) {
                return t + "    ".repeat(u.length)
            }); r;) if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function (e) {
                return !!(u = e.call({lexer: s}, r, t)) && (r = r.substring(u.raw.length), t.push(u), !0)
            }))) if (u = this.tokenizer.space(r)) r = r.substring(u.raw.length), 1 === u.raw.length && 0 < t.length ? t[t.length - 1].raw += "\n" : t.push(u); else if (u = this.tokenizer.code(r)) r = r.substring(u.raw.length), !(e = t[t.length - 1]) || "paragraph" !== e.type && "text" !== e.type ? t.push(u) : (e.raw += "\n" + u.raw, e.text += "\n" + u.text, this.inlineQueue[this.inlineQueue.length - 1].src = e.text); else if (u = this.tokenizer.fences(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.heading(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.hr(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.blockquote(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.list(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.html(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.def(r)) r = r.substring(u.raw.length), !(e = t[t.length - 1]) || "paragraph" !== e.type && "text" !== e.type ? this.tokens.links[u.tag] || (this.tokens.links[u.tag] = {
                href: u.href,
                title: u.title
            }) : (e.raw += "\n" + u.raw, e.text += "\n" + u.raw, this.inlineQueue[this.inlineQueue.length - 1].src = e.text); else if (u = this.tokenizer.table(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.lheading(r)) r = r.substring(u.raw.length), t.push(u); else if (i = r, this.options.extensions && this.options.extensions.startBlock && !function () {
                var t = 1 / 0, u = r.slice(1), n = void 0;
                s.options.extensions.startBlock.forEach(function (e) {
                    "number" == typeof (n = e.call({lexer: this}, u)) && 0 <= n && (t = Math.min(t, n))
                }), t < 1 / 0 && 0 <= t && (i = r.substring(0, t + 1))
            }(), this.state.top && (u = this.tokenizer.paragraph(i))) e = t[t.length - 1], n && "paragraph" === e.type ? (e.raw += "\n" + u.raw, e.text += "\n" + u.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = e.text) : t.push(u), n = i.length !== r.length, r = r.substring(u.raw.length); else if (u = this.tokenizer.text(r)) r = r.substring(u.raw.length), (e = t[t.length - 1]) && "text" === e.type ? (e.raw += "\n" + u.raw, e.text += "\n" + u.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = e.text) : t.push(u); else if (r) {
                var l = "Infinite loop on byte: " + r.charCodeAt(0);
                if (this.options.silent) {
                    console.error(l);
                    break
                }
                throw new Error(l)
            }
            return this.state.top = !0, t
        }, n.inline = function (e, t) {
            return this.inlineQueue.push({src: e, tokens: t = void 0 === t ? [] : t}), t
        }, n.inlineTokens = function (r, t) {
            var u, e, i, n, s, l, a = this, o = (void 0 === t && (t = []), r);
            if (this.tokens.links) {
                var D = Object.keys(this.tokens.links);
                if (0 < D.length) for (; null != (n = this.tokenizer.rules.inline.reflinkSearch.exec(o));) D.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, n.index) + "[" + b("a", n[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (n = this.tokenizer.rules.inline.blockSkip.exec(o));) o = o.slice(0, n.index) + "[" + b("a", n[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (n = this.tokenizer.rules.inline.escapedEmSt.exec(o));) o = o.slice(0, n.index + n[0].length - 2) + "++" + o.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex), this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
            for (; r;) if (s || (l = ""), s = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function (e) {
                return !!(u = e.call({lexer: a}, r, t)) && (r = r.substring(u.raw.length), t.push(u), !0)
            }))) if (u = this.tokenizer.escape(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.tag(r)) r = r.substring(u.raw.length), (e = t[t.length - 1]) && "text" === u.type && "text" === e.type ? (e.raw += u.raw, e.text += u.text) : t.push(u); else if (u = this.tokenizer.link(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.reflink(r, this.tokens.links)) r = r.substring(u.raw.length), (e = t[t.length - 1]) && "text" === u.type && "text" === e.type ? (e.raw += u.raw, e.text += u.text) : t.push(u); else if (u = this.tokenizer.emStrong(r, o, l)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.codespan(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.br(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.del(r)) r = r.substring(u.raw.length), t.push(u); else if (u = this.tokenizer.autolink(r, _)) r = r.substring(u.raw.length), t.push(u); else if (!this.state.inLink && (u = this.tokenizer.url(r, _))) r = r.substring(u.raw.length), t.push(u); else if (i = r, this.options.extensions && this.options.extensions.startInline && !function () {
                var t = 1 / 0, u = r.slice(1), n = void 0;
                a.options.extensions.startInline.forEach(function (e) {
                    "number" == typeof (n = e.call({lexer: this}, u)) && 0 <= n && (t = Math.min(t, n))
                }), t < 1 / 0 && 0 <= t && (i = r.substring(0, t + 1))
            }(), u = this.tokenizer.inlineText(i, L)) r = r.substring(u.raw.length), "_" !== u.raw.slice(-1) && (l = u.raw.slice(-1)), s = !0, (e = t[t.length - 1]) && "text" === e.type ? (e.raw += u.raw, e.text += u.text) : t.push(u); else if (r) {
                var c = "Infinite loop on byte: " + r.charCodeAt(0);
                if (this.options.silent) {
                    console.error(c);
                    break
                }
                throw new Error(c)
            }
            return t
        }, n = u, t = [{
            key: "rules", get: function () {
                return {block: y, inline: v}
            }
        }], (e = null) && i(n.prototype, e), t && i(n, t), Object.defineProperty(n, "prototype", {writable: !1}), u
    }(), $ = function () {
        function e(e) {
            this.options = e || r.defaults
        }

        var t = e.prototype;
        return t.code = function (e, t, u) {
            var n, t = (t || "").match(/\S*/)[0];
            return this.options.highlight && null != (n = this.options.highlight(e, t)) && n !== e && (u = !0, e = n), e = e.replace(/\n$/, "") + "\n", t ? '<pre><code class="' + this.options.langPrefix + c(t) + '">' + (u ? e : c(e, !0)) + "</code></pre>\n" : "<pre><code>" + (u ? e : c(e, !0)) + "</code></pre>\n"
        }, t.blockquote = function (e) {
            return "<blockquote>\n" + e + "</blockquote>\n"
        }, t.html = function (e) {
            return e
        }, t.heading = function (e, t, u, n) {
            return this.options.headerIds ? "<h" + t + ' id="' + (this.options.headerPrefix + n.slug(u)) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"
        }, t.hr = function () {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        }, t.list = function (e, t, u) {
            var n = t ? "ol" : "ul";
            return "<" + n + (t && 1 !== u ? ' start="' + u + '"' : "") + ">\n" + e + "</" + n + ">\n"
        }, t.listitem = function (e) {
            return "<li>" + e + "</li>\n"
        }, t.checkbox = function (e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        }, t.paragraph = function (e) {
            return "<p>" + e + "</p>\n"
        }, t.table = function (e, t) {
            return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n"
        }, t.tablerow = function (e) {
            return "<tr>\n" + e + "</tr>\n"
        }, t.tablecell = function (e, t) {
            var u = t.header ? "th" : "td";
            return (t.align ? "<" + u + ' align="' + t.align + '">' : "<" + u + ">") + e + "</" + u + ">\n"
        }, t.strong = function (e) {
            return "<strong>" + e + "</strong>"
        }, t.em = function (e) {
            return "<em>" + e + "</em>"
        }, t.codespan = function (e) {
            return "<code>" + e + "</code>"
        }, t.br = function () {
            return this.options.xhtml ? "<br/>" : "<br>"
        }, t.del = function (e) {
            return "<del>" + e + "</del>"
        }, t.link = function (e, t, u) {
            return null === (e = F(this.options.sanitize, this.options.baseUrl, e)) ? u : (e = '<a href="' + e + '"', t && (e += ' title="' + t + '"'), e + ">" + u + "</a>")
        }, t.image = function (e, t, u) {
            return null === (e = F(this.options.sanitize, this.options.baseUrl, e)) ? u : (e = '<img src="' + e + '" alt="' + u + '"', t && (e += ' title="' + t + '"'), e + (this.options.xhtml ? "/>" : ">"))
        }, t.text = function (e) {
            return e
        }, e
    }(), S = function () {
        function e() {
        }

        var t = e.prototype;
        return t.strong = function (e) {
            return e
        }, t.em = function (e) {
            return e
        }, t.codespan = function (e) {
            return e
        }, t.del = function (e) {
            return e
        }, t.html = function (e) {
            return e
        }, t.text = function (e) {
            return e
        }, t.link = function (e, t, u) {
            return "" + u
        }, t.image = function (e, t, u) {
            return "" + u
        }, t.br = function () {
            return ""
        }, e
    }(), T = function () {
        function e() {
            this.seen = {}
        }

        var t = e.prototype;
        return t.serialize = function (e) {
            return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-")
        }, t.getNextSafeSlug = function (e, t) {
            var u = e, n = 0;
            if (this.seen.hasOwnProperty(u)) for (n = this.seen[e]; u = e + "-" + ++n, this.seen.hasOwnProperty(u);) ;
            return t || (this.seen[e] = n, this.seen[u] = 0), u
        }, t.slug = function (e, t) {
            void 0 === t && (t = {});
            e = this.serialize(e);
            return this.getNextSafeSlug(e, t.dryrun)
        }, e
    }(), R = function () {
        function u(e) {
            this.options = e || r.defaults, this.options.renderer = this.options.renderer || new $, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new S, this.slugger = new T
        }

        u.parse = function (e, t) {
            return new u(t).parse(e)
        }, u.parseInline = function (e, t) {
            return new u(t).parseInline(e)
        };
        var e = u.prototype;
        return e.parse = function (e, t) {
            void 0 === t && (t = !0);
            for (var u, n, r, i, s, l, a, o, D, c, h, p, f, g, F, A, d = "", C = e.length, k = 0; k < C; k++) if (o = e[k], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[o.type] && (!1 !== (A = this.options.extensions.renderers[o.type].call({parser: this}, o)) || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type))) d += A || ""; else switch (o.type) {
                case"space":
                    continue;
                case"hr":
                    d += this.renderer.hr();
                    continue;
                case"heading":
                    d += this.renderer.heading(this.parseInline(o.tokens), o.depth, x(this.parseInline(o.tokens, this.textRenderer)), this.slugger);
                    continue;
                case"code":
                    d += this.renderer.code(o.text, o.lang, o.escaped);
                    continue;
                case"table":
                    for (l = D = "", r = o.header.length, u = 0; u < r; u++) l += this.renderer.tablecell(this.parseInline(o.header[u].tokens), {
                        header: !0,
                        align: o.align[u]
                    });
                    for (D += this.renderer.tablerow(l), a = "", r = o.rows.length, u = 0; u < r; u++) {
                        for (l = "", i = (s = o.rows[u]).length, n = 0; n < i; n++) l += this.renderer.tablecell(this.parseInline(s[n].tokens), {
                            header: !1,
                            align: o.align[n]
                        });
                        a += this.renderer.tablerow(l)
                    }
                    d += this.renderer.table(D, a);
                    continue;
                case"blockquote":
                    a = this.parse(o.tokens), d += this.renderer.blockquote(a);
                    continue;
                case"list":
                    for (D = o.ordered, E = o.start, c = o.loose, r = o.items.length, a = "", u = 0; u < r; u++) f = (p = o.items[u]).checked, g = p.task, h = "", p.task && (F = this.renderer.checkbox(f), c ? 0 < p.tokens.length && "paragraph" === p.tokens[0].type ? (p.tokens[0].text = F + " " + p.tokens[0].text, p.tokens[0].tokens && 0 < p.tokens[0].tokens.length && "text" === p.tokens[0].tokens[0].type && (p.tokens[0].tokens[0].text = F + " " + p.tokens[0].tokens[0].text)) : p.tokens.unshift({
                        type: "text",
                        text: F
                    }) : h += F), h += this.parse(p.tokens, c), a += this.renderer.listitem(h, g, f);
                    d += this.renderer.list(a, D, E);
                    continue;
                case"html":
                    d += this.renderer.html(o.text);
                    continue;
                case"paragraph":
                    d += this.renderer.paragraph(this.parseInline(o.tokens));
                    continue;
                case"text":
                    for (a = o.tokens ? this.parseInline(o.tokens) : o.text; k + 1 < C && "text" === e[k + 1].type;) a += "\n" + ((o = e[++k]).tokens ? this.parseInline(o.tokens) : o.text);
                    d += t ? this.renderer.paragraph(a) : a;
                    continue;
                default:
                    var E = 'Token with "' + o.type + '" type was not found.';
                    if (this.options.silent) return void console.error(E);
                    throw new Error(E)
            }
            return d
        }, e.parseInline = function (e, t) {
            t = t || this.renderer;
            for (var u, n, r = "", i = e.length, s = 0; s < i; s++) if (u = e[s], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[u.type] && (!1 !== (n = this.options.extensions.renderers[u.type].call({parser: this}, u)) || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(u.type))) r += n || ""; else switch (u.type) {
                case"escape":
                    r += t.text(u.text);
                    break;
                case"html":
                    r += t.html(u.text);
                    break;
                case"link":
                    r += t.link(u.href, u.title, this.parseInline(u.tokens, t));
                    break;
                case"image":
                    r += t.image(u.href, u.title, u.text);
                    break;
                case"strong":
                    r += t.strong(this.parseInline(u.tokens, t));
                    break;
                case"em":
                    r += t.em(this.parseInline(u.tokens, t));
                    break;
                case"codespan":
                    r += t.codespan(u.text);
                    break;
                case"br":
                    r += t.br();
                    break;
                case"del":
                    r += t.del(this.parseInline(u.tokens, t));
                    break;
                case"text":
                    r += t.text(u.text);
                    break;
                default:
                    var l = 'Token with "' + u.type + '" type was not found.';
                    if (this.options.silent) return void console.error(l);
                    throw new Error(l)
            }
            return r
        }, u
    }();

    function I(e, u, n) {
        if (null == e) throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if ("function" == typeof u && (n = u, u = null), m(u = C({}, I.defaults, u || {})), n) {
            var r, i = u.highlight;
            try {
                r = z.lex(e, u)
            } catch (e) {
                return n(e)
            }
            var s, l = function (t) {
                var e;
                if (!t) try {
                    u.walkTokens && I.walkTokens(r, u.walkTokens), e = R.parse(r, u)
                } catch (e) {
                    t = e
                }
                return u.highlight = i, t ? n(t) : n(null, e)
            };
            return !i || i.length < 3 ? l() : (delete u.highlight, r.length ? (s = 0, I.walkTokens(r, function (u) {
                "code" === u.type && (s++, setTimeout(function () {
                    i(u.text, u.lang, function (e, t) {
                        if (e) return l(e);
                        null != t && t !== u.text && (u.text = t, u.escaped = !0), 0 === --s && l()
                    })
                }, 0))
            }), void (0 === s && l())) : l())
        }

        function t(e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", u.silent) return "<p>An error occurred:</p><pre>" + c(e.message + "", !0) + "</pre>";
            throw e
        }

        try {
            var a = z.lex(e, u);
            if (u.walkTokens) {
                if (u.async) return Promise.all(I.walkTokens(a, u.walkTokens)).then(function () {
                    return R.parse(a, u)
                }).catch(t);
                I.walkTokens(a, u.walkTokens)
            }
            return R.parse(a, u)
        } catch (e) {
            t(e)
        }
    }

    I.options = I.setOptions = function (e) {
        return C(I.defaults, e), e = I.defaults, r.defaults = e, I
    }, I.getDefaults = e, I.defaults = r.defaults, I.use = function () {
        for (var o = I.defaults.extensions || {
            renderers: {},
            childTokens: {}
        }, e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
        t.forEach(function (s) {
            var u, e = C({}, s);
            if (e.async = I.defaults.async || e.async, s.extensions && (s.extensions.forEach(function (r) {
                if (!r.name) throw new Error("extension name required");
                var i;
                if (r.renderer && (i = o.renderers[r.name], o.renderers[r.name] = i ? function () {
                    for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                    var n = r.renderer.apply(this, t);
                    return n = !1 === n ? i.apply(this, t) : n
                } : r.renderer), r.tokenizer) {
                    if (!r.level || "block" !== r.level && "inline" !== r.level) throw new Error("extension level must be 'block' or 'inline'");
                    o[r.level] ? o[r.level].unshift(r.tokenizer) : o[r.level] = [r.tokenizer], r.start && ("block" === r.level ? o.startBlock ? o.startBlock.push(r.start) : o.startBlock = [r.start] : "inline" === r.level && (o.startInline ? o.startInline.push(r.start) : o.startInline = [r.start]))
                }
                r.childTokens && (o.childTokens[r.name] = r.childTokens)
            }), e.extensions = o), s.renderer) {
                var t, l = I.defaults.renderer || new $;
                for (t in s.renderer) !function (r) {
                    var i = l[r];
                    l[r] = function () {
                        for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                        var n = s.renderer[r].apply(l, t);
                        return n = !1 === n ? i.apply(l, t) : n
                    }
                }(t);
                e.renderer = l
            }
            if (s.tokenizer) {
                var n, a = I.defaults.tokenizer || new w;
                for (n in s.tokenizer) !function (r) {
                    var i = a[r];
                    a[r] = function () {
                        for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                        var n = s.tokenizer[r].apply(a, t);
                        return n = !1 === n ? i.apply(a, t) : n
                    }
                }(n);
                e.tokenizer = a
            }
            s.walkTokens && (u = I.defaults.walkTokens, e.walkTokens = function (e) {
                var t = [];
                return t.push(s.walkTokens.call(this, e)), t = u ? t.concat(u.call(this, e)) : t
            }), I.setOptions(e)
        })
    }, I.walkTokens = function (e, l) {
        for (var a, o = [], t = D(e); !(a = t()).done;) !function () {
            var t = a.value;
            switch (o = o.concat(l.call(I, t)), t.type) {
                case"table":
                    for (var e = D(t.header); !(u = e()).done;) {
                        var u = u.value;
                        o = o.concat(I.walkTokens(u.tokens, l))
                    }
                    for (var n, r = D(t.rows); !(n = r()).done;) for (var i = D(n.value); !(s = i()).done;) {
                        var s = s.value;
                        o = o.concat(I.walkTokens(s.tokens, l))
                    }
                    break;
                case"list":
                    o = o.concat(I.walkTokens(t.items, l));
                    break;
                default:
                    I.defaults.extensions && I.defaults.extensions.childTokens && I.defaults.extensions.childTokens[t.type] ? I.defaults.extensions.childTokens[t.type].forEach(function (e) {
                        o = o.concat(I.walkTokens(t[e], l))
                    }) : t.tokens && (o = o.concat(I.walkTokens(t.tokens, l)))
            }
        }();
        return o
    }, I.parseInline = function (e, t) {
        if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        m(t = C({}, I.defaults, t || {}));
        try {
            var u = z.lexInline(e, t);
            return t.walkTokens && I.walkTokens(u, t.walkTokens), R.parseInline(u, t)
        } catch (e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + c(e.message + "", !0) + "</pre>";
            throw e
        }
    }, I.Parser = R, I.parser = R.parse, I.Renderer = $, I.TextRenderer = S, I.Lexer = z, I.lexer = z.lex, I.Tokenizer = w, I.Slugger = T;
    var d = (I.parse = I).options, P = I.setOptions, Q = I.use, U = I.walkTokens, M = I.parseInline, N = I, X = R.parse,
        G = z.lex;
    r.Lexer = z, r.Parser = R, r.Renderer = $, r.Slugger = T, r.TextRenderer = S, r.Tokenizer = w, r.getDefaults = e, r.lexer = G, r.marked = I, r.options = d, r.parse = N, r.parseInline = M, r.parser = X, r.setOptions = P, r.use = Q, r.walkTokens = U
});
var basicLanguageCodes = [
    ["en", "English",],
    ["nl", "Dutch",],
    ["es", "Spanish",],
];

var allLanguageRegionCodes = [
    ["af-za", "Afrikaans", "South Africa"],
    ["am-et", "Amharic", "Ethiopia"],
    ["ar-ae", "Arabic", "United Arab Emirates"],
    ["ar-bh", "Arabic", "Bahrain"],
    ["ar-dz", "Arabic", "Algeria"],
    ["ar-eg", "Arabic", "Egypt"],
    ["ar-iq", "Arabic", "Iraq"],
    ["ar-jo", "Arabic", "Jordan"],
    ["ar-kw", "Arabic", "Kuwait"],
    ["ar-lb", "Arabic", "Lebanon"],
    ["ar-ly", "Arabic", "Libya"],
    ["ar-ma", "Arabic", "Morocco"],
    ["ar-om", "Arabic", "Oman"],
    ["ar-qa", "Arabic", "Qatar"],
    ["ar-sa", "Arabic", "Saudi Arabia"],
    ["ar-sy", "Arabic", "Syria"],
    ["ar-tn", "Arabic", "Tunisia"],
    ["ar-ye", "Arabic", "Yemen"],
    ["as-in", "Assamese", "India"],
    ["az-az", "Azerbaijani", "Azerbaijan"],
    ["ba-ru", "Bashkir", "Russia"],
    ["be-by", "Belarusian", "Belarus"],
    ["bg-bg", "Bulgarian", "Bulgaria"],
    ["bn-bd", "Bengali", "Bangladesh"],
    ["bn-in", "Bengali", "India"],
    ["bo-cn", "Tibetan", "China"],
    ["br-fr", "Breton", "France"],
    ["bs-ba", "Bosnian", "Bosnia and Herzegovina"],
    ["ca-es", "Catalan", "Spain"],
    ["co-fr", "Corsican", "France"],
    ["cs-cz", "Czech", "Czechia"],
    ["cy-gb", "Welsh", "United Kingdom"],
    ["da-dk", "Danish", "Denmark"],
    ["de-at", "German", "Austria"],
    ["de-ch", "German", "Switzerland"],
    ["de-de", "German", "Germany"],
    ["de-li", "German", "Liechtenstein"],
    ["de-lu", "German", "Luxembourg"],
    ["dv-mv", "Divehi", "Maldives"],
    ["el-gr", "Greek, Modern", "Greece"],
    ["en-au", "English", "Australia"],
    ["en-bz", "English", "Belize"],
    ["en-ca", "English", "Canada"],
    ["en-gb", "English", "United Kingdom"],
    ["en-ie", "English", "Republic of Ireland"],
    ["en-in", "English", "India"],
    ["en-jm", "English", "Jamaica"],
    ["en-my", "English", "Malaysia"],
    ["en-nz", "English", "New Zealand"],
    ["en-ph", "English", "Philippines"],
    ["en-sg", "English", "Singapore"],
    ["en-tt", "English", "Trinidad and Tobago"],
    ["en-us", "English", "United States of America"],
    ["en-za", "English", "South Africa"],
    ["en-zw", "English", "Zimbabwe"],
    ["es-ar", "Spanish", "Argentina"],
    ["es-bo", "Spanish", "Bolivia"],
    ["es-cl", "Spanish", "Chile"],
    ["es-co", "Spanish", "Colombia"],
    ["es-cr", "Spanish", "Costa Rica"],
    ["es-do", "Spanish", "Dominican Republic"],
    ["es-ec", "Spanish", "Ecuador"],
    ["es-es", "Spanish", "Spain"],
    ["es-gt", "Spanish", "Guatemala"],
    ["es-hn", "Spanish", "Honduras"],
    ["es-mx", "Spanish", "Mexico"],
    ["es-ni", "Spanish", "Nicaragua"],
    ["es-pa", "Spanish", "Panama"],
    ["es-pe", "Spanish", "Peru"],
    ["es-pr", "Spanish", "Puerto Rico"],
    ["es-py", "Spanish", "Paraguay"],
    ["es-sv", "Spanish", "El Salvador"],
    ["es-us", "Spanish", "United States of America"],
    ["es-uy", "Spanish", "Uruguay"],
    ["es-ve", "Spanish", "Venezuela"],
    ["et-ee", "Estonian", "Estonia"],
    ["eu-es", "Basque", "Spain"],
    ["fa-ir", "Persian", "Iran"],
    ["fi-fi", "Finnish", "Finland"],
    ["fo-fo", "Faroese", "Faroe Islands"],
    ["fr-be", "French", "Belgium"],
    ["fr-ca", "French", "Canada"],
    ["fr-ch", "French", "Switzerland"],
    ["fr-fr", "French", "France"],
    ["fr-lu", "French", "Luxembourg"],
    ["fr-mc", "French", "Monaco"],
    ["fy-nl", "Western Frisian", "Netherlands"],
    ["ga-ie", "Irish", "Republic of Ireland"],
    ["gd-gb", "Gaelic", "United Kingdom"],
    ["gl-es", "Galician", "Spain"],
    ["gu-in", "Gujarati", "India"],
    ["ha-ng", "Hausa", "Nigeria"],
    ["he-il", "Hebrew", "Israel"],
    ["hi-in", "Hindi", "India"],
    ["hr-ba", "Croatian", "Bosnia and Herzegovina"],
    ["hr-hr", "Croatian", "Croatia"],
    ["ht-ht", "Haitian", "Haiti"],
    ["hu-hu", "Hungarian", "Hungary"],
    ["hy-am", "Armenian", "Armenia"],
    ["id-id", "Indonesian", "Indonesia"],
    ["ig-ng", "Igbo", "Nigeria"],
    ["ii-cn", "Sichuan Yi", "China"],
    ["is-is", "Icelandic", "Iceland"],
    ["it-ch", "Italian", "Switzerland"],
    ["it-it", "Italian", "Italy"],
    ["iu-ca", "Inuktitut", "Canada"],
    ["ja-jp", "Japanese", "Japan"],
    ["jv-id", "Javanese", "Indonesia"],
    ["ka-ge", "Georgian", "Georgia"],
    ["kk-kz", "Kazakh", "Kazakhstan"],
    ["kl-gl", "Kalaallisut", "Greenland"],
    ["km-kh", "Central Khmer", "Cambodia"],
    ["kn-in", "Kannada", "India"],
    ["ko-kr", "Korean", "South Korea"],
    ["ky-kg", "Kirghiz", "Kyrgyzstan"],
    ["ky-kz", "Kirghiz", "Kazakhstan"],
    ["lb-lu", "Luxembourgish", "Luxembourg"],
    ["lo-la", "Lao", "Laos"],
    ["lt-lt", "Lithuanian", "Lithuania"],
    ["lv-lv", "Latvian", "Latvia"],
    ["mg-mg", "Malagasy", "Madagascar"],
    ["mi-nz", "Maori", "New Zealand"],
    ["mk-mk", "Macedonian", "Republic of Macedonia"],
    ["ml-in", "Malayalam", "India"],
    ["mn-cn", "Mongolian", "China"],
    ["mn-mn", "Mongolian", "Mongolia"],
    ["mr-in", "Marathi", "India"],
    ["ms-bn", "Malay", "Brunei"],
    ["ms-my", "Malay", "Malaysia"],
    ["mt-mt", "Maltese", "Malta"],
    ["my-mm", "Burmese", "Myanmar"],
    ["nb-no", "Bokmål, Norwegian", "Norway"],
    ["ne-np", "Nepali", "Nepal"],
    ["nl-be", "Dutch", "Belgium"],
    ["nl-nl", "Dutch", "Netherlands"],
    ["nn-no", "Norwegian Nynorsk", "Norway"],
    ["no-no", "Norwegian", "Norway"],
    ["ny-mw", "Chichewa", "Malawi"],
    ["oc-fr", "Occitan", "France"],
    ["or-in", "Oriya", "India"],
    ["pa-in", "Panjabi", "India"],
    ["pl-pl", "Polish", "Poland"],
    ["ps-af", "Pushto", "Afghanistan"],
    ["pt-br", "Portuguese", "Brazil"],
    ["pt-pt", "Portuguese", "Portugal"],
    ["qu-bo", "Quechua", "Bolivia"],
    ["qu-ec", "Quechua", "Ecuador"],
    ["qu-pe", "Quechua", "Peru"],
    ["rm-ch", "Romansh", "Switzerland"],
    ["ro-ro", "Romanian", "Romania"],
    ["ru-ru", "Russian", "Russia"],
    ["rw-rw", "Kinyarwanda", "Rwanda"],
    ["sa-in", "Sanskrit", "India"],
    ["sd-in", "Sindhi", "India"],
    ["sd-pk", "Sindhi", "Pakistan"],
    ["se-fi", "Northern Sami", "Finland"],
    ["se-no", "Northern Sami", "Norway"],
    ["se-se", "Northern Sami", "Sweden"],
    ["si-lk", "Sinhala", "Sri Lanka"],
    ["sk-sk", "Slovak", "Slovakia"],
    ["sl-si", "Slovenian", "Slovenia"],
    ["sm-as", "Samoan", "American Samoa"],
    ["sm-ws", "Samoan", "Samoa"],
    ["sn-zw", "Shona", "Zimbabwe"],
    ["so-so", "Somali", "Somalia"],
    ["sq-al", "Albanian", "Albania"],
    ["sr-ba", "Serbian", "Bosnia and Herzegovina"],
    ["sr-me", "Serbian", "Montenegro"],
    ["sr-rs", "Serbian", "Serbia"],
    ["su-id", "Sundanese", "Indonesia"],
    ["sv-fi", "Swedish", "Finland"],
    ["sv-se", "Swedish", "Sweden"],
    ["sw-ke", "Swahili", "Kenya"],
    ["ta-in", "Tamil", "India"],
    ["te-in", "Telugu", "India"],
    ["tg-tj", "Tajik", "Tajikistan"],
    ["th-th", "Thai", "Thailand"],
    ["ti-er", "Tigrinya", "Eritrea"],
    ["ti-et", "Tigrinya", "Ethiopia"],
    ["tk-tm", "Turkmen", "Turkmenistan"],
    ["tl-ph", "Tagalog", "Philippines"],
    ["tn-za", "Tswana", "South Africa"],
    ["tr-tr", "Turkish", "Turkey"],
    ["ts-za", "Tsonga", "South Africa"],
    ["tt-ru", "Tatar", "Russia"],
    ["ug-cn", "Uighur", "China"],
    ["uk-ua", "Ukrainian", "Ukraine"],
    ["ur-pk", "Urdu", "Pakistan"],
    ["uz-uz", "Uzbek", "Uzbekistan"],
    ["vi-vn", "Vietnamese", "Viet Nam"],
    ["wo-sn", "Wolof", "Senegal"],
    ["xh-za", "Xhosa", "South Africa"],
    ["yo-ng", "Yoruba", "Nigeria"],
    ["zh-cn", "Chinese", "China"],
    ["zh-hk", "Chinese", "Hong Kong"],
    ["zh-mo", "Chinese", "Macau"],
    ["zh-sg", "Chinese", "Singapore"],
    ["zh-tw", "Chinese", "Taiwan"],
    ["zu-za", "Zulu", "South Africa"],
];

// Usage:
// call ReadPODefFromFile, ReadJSONFromString, ReadPODef, or _i18n.loadJSON
// to load defs.
// Then use _i18n.setLocale("locale"); to set locale after reading defs.


// locale - store under this locale, use setLocale to use.
// callback (optional) - function to call when read finished or failed
//                       Signature: callback(error),
//                       error is null or error string
// charmapping (optional) - function(string) -> string that maps chars


function logError(e) {
    console.log("Wool error: " + e);
}

/*! gettext.js - Guillaume Potier - MIT Licensed */
(function (root, undef) {
    var i18n = function (options) {
        options = options || {};
        this.__version = '0.5.3';

        // default values that could be overriden in i18n() construct
        var defaults = {
            domain: 'messages',
            locale: (typeof document !== 'undefined' ? document.documentElement.getAttribute('lang') : false) || 'en',
            plural_func: function (n) {
                return {nplurals: 2, plural: (n != 1) ? 1 : 0};
            },
            ctxt_delimiter: String.fromCharCode(4) // \u0004
        };

        // handy mixins taken from underscode.js
        var _ = {
            isObject: function (obj) {
                var type = typeof obj;
                return type === 'function' || type === 'object' && !!obj;
            },
            isArray: function (obj) {
                return toString.call(obj) === '[object Array]';
            }
        };

        var
            _plural_funcs = {},
            _locale = options.locale || defaults.locale,
            _domain = options.domain || defaults.domain,
            _dictionary = {},
            _plural_forms = {},
            _ctxt_delimiter = options.ctxt_delimiter || defaults.ctxt_delimiter;

        if (options.messages) {
            _dictionary[_domain] = {};
            _dictionary[_domain][_locale] = options.messages;
        }

        if (options.plural_forms) {
            _plural_forms[_locale] = options.plural_forms;
        }

        // sprintf equivalent, takes a string and some arguments to make a computed string
        // eg: strfmt("%1 dogs are in %2", 7, "the kitchen"); => "7 dogs are in the kitchen"
        // eg: strfmt("I like %1, bananas and %1", "apples"); => "I like apples, bananas and apples"
        var strfmt = function (fmt) {
            var args = arguments;

            return fmt.replace(/%(\d+)/g, function (str, p1) {
                return args[p1];
            });
        };

        var expand_locale = function (locale) {
            var locales = [locale],
                i = locale.lastIndexOf('-');
            while (i > 0) {
                locale = locale.slice(0, i);
                locales.push(locale);
                i = locale.lastIndexOf('-');
            }
            return locales;
        };

        var getPluralFunc = function (plural_form) {
            // Plural form string regexp
            // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
            // plural forms list available here http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html
            var pf_re = new RegExp('^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;n0-9_\(\)])+');

            if (!pf_re.test(plural_form))
                throw new Error(strfmt('The plural form "%1" is not valid', plural_form));

            // Careful here, this is a hidden eval() equivalent..
            // Risk should be reasonable though since we test the plural_form through regex before
            // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
            // TODO: should test if https://github.com/soney/jsep present and use it if so
            return new Function("n", 'var plural, nplurals; ' + plural_form + ' return { nplurals: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };');
        };

        // Proper translation function that handle plurals and directives
        // Contains juicy parts of https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
        var t = function (messages, n, options /* ,extra */) {
            // Singular is very easy, just pass dictionnary message through strfmt
            if (1 === messages.length)
                return strfmt.apply(this, [messages[0]].concat(Array.prototype.slice.call(arguments, 3)));

            var plural;

            // if a plural func is given, use that one
            if (options.plural_func) {
                plural = options.plural_func(n);

                // if plural form never interpreted before, do it now and store it
            } else if (!_plural_funcs[_locale]) {
                _plural_funcs[_locale] = getPluralFunc(_plural_forms[_locale]);
                plural = _plural_funcs[_locale](n);

                // we have the plural function, compute the plural result
            } else {
                plural = _plural_funcs[_locale](n);
            }

            // If there is a problem with plurals, fallback to singular one
            if ('undefined' === typeof plural.plural || plural.plural > plural.nplurals || messages.length <= plural.plural)
                plural.plural = 0;

            return strfmt.apply(this, [messages[plural.plural], n].concat(Array.prototype.slice.call(arguments, 3)));
        };

        return {
            strfmt: strfmt, // expose strfmt util
            expand_locale: expand_locale, // expose expand_locale util

            // Declare shortcuts
            __: function () {
                return this.gettext.apply(this, arguments);
            },
            _n: function () {
                return this.ngettext.apply(this, arguments);
            },
            _p: function () {
                return this.pgettext.apply(this, arguments);
            },

            setMessages: function (domain, locale, messages, plural_forms) {
                if (!domain || !locale || !messages)
                    throw new Error('You must provide a domain, a locale and messages');

                if ('string' !== typeof domain || 'string' !== typeof locale || !_.isObject(messages))
                    throw new Error('Invalid arguments');

                if (plural_forms)
                    _plural_forms[locale] = plural_forms;

                if (!_dictionary[domain])
                    _dictionary[domain] = {};

                _dictionary[domain][locale] = messages;

                return this;
            },
            loadJSON: function (jsonData, domain) {
                if (!_.isObject(jsonData))
                    jsonData = JSON.parse(jsonData);

                if (!jsonData[''] || !jsonData['']['language'] || !jsonData['']['plural-forms'])
                    throw new Error('Wrong JSON, it must have an empty key ("") with "language" and "plural-forms" information');

                var headers = jsonData[''];
                delete jsonData[''];

                return this.setMessages(domain || defaults.domain, headers['language'], jsonData, headers['plural-forms']);
            },
            setLocale: function (locale) {
                _locale = locale;
                return this;
            },
            getLocale: function () {
                return _locale;
            },
            // getter/setter for domain
            textdomain: function (domain) {
                if (!domain)
                    return _domain;
                _domain = domain;
                return this;
            },
            gettext: function (msgid /* , extra */) {
                return this.dcnpgettext.apply(this, [undef, undef, msgid, undef, undef].concat(Array.prototype.slice.call(arguments, 1)));
            },
            ngettext: function (msgid, msgid_plural, n /* , extra */) {
                return this.dcnpgettext.apply(this, [undef, undef, msgid, msgid_plural, n].concat(Array.prototype.slice.call(arguments, 3)));
            },
            pgettext: function (msgctxt, msgid /* , extra */) {
                return this.dcnpgettext.apply(this, [undef, msgctxt, msgid, undef, undef].concat(Array.prototype.slice.call(arguments, 2)));
            },
            dcnpgettext: function (domain, msgctxt, msgid, msgid_plural, n /* , extra */) {
                domain = domain || _domain;

                if ('string' !== typeof msgid)
                    throw new Error(this.strfmt('Msgid "%1" is not a valid translatable string', msgid));

                var
                    translation,
                    options = {},
                    key = msgctxt ? msgctxt + _ctxt_delimiter + msgid : msgid,
                    exist,
                    locale;
                var locales = expand_locale(_locale);
                for (var i in locales) {
                    locale = locales[i];
                    exist = _dictionary[domain] && _dictionary[domain][locale] && _dictionary[domain][locale][key];

                    // because it's not possible to define both a singular and a plural form of the same msgid,
                    // we need to check that the stored form is the same as the expected one.
                    // if not, we'll just ignore the translation and consider it as not translated.
                    if (msgid_plural) {
                        exist = exist && "string" !== typeof _dictionary[domain][locale][key];
                    } else {
                        exist = exist && "string" === typeof _dictionary[domain][locale][key];
                    }
                    if (exist) {
                        break;
                    }
                }

                if (!exist) {
                    translation = msgid;
                    options.plural_func = defaults.plural_func;
                } else {
                    translation = _dictionary[domain][locale][key];
                }

                // Singular form
                if (!msgid_plural)
                    return t.apply(this, [[translation], n, options].concat(Array.prototype.slice.call(arguments, 5)));

                // Plural one
                return t.apply(this, [exist ? translation : [msgid, msgid_plural], n, options].concat(Array.prototype.slice.call(arguments, 5)));
            }
        };
    };

    // Handle node, commonjs
    if (typeof exports !== 'undefined') {
        // this somehow creates a circular reference in the latest node.js
        //if (typeof module !== 'undefined' && module.exports)
        //  exports = module.exports = i18n;
        exports.i18n = i18n;

        // Handle AMD
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return i18n;
        });

        // Standard window browser
    } else {
        root['i18n'] = i18n;
    }
})(globalThis);

if (typeof exports !== 'undefined') {
    var _i18n = exports.i18n({
        ctxt_delimiter: "|",
    });
} else {
    var _i18n = globalThis.i18n({
        ctxt_delimiter: "|",
    });
}


// if set to true, normalize source strings by replacing all whitespace by a
// single space
_i18n.enableNormalization = function (enable) {
    _i18n._normalize = enable;
}

_i18n.normalizeString = function (string) {
    if (!_i18n._normalize) return string;
    var ret = string.replace(/\s+/g, " ");
    //console.log("#"+ret);
    return ret;
}

_i18n.normalizeStrings = function (json) {
    var ret = {};
    for (var key in json) {
        if (!json.hasOwnProperty(key)) continue;
        ret[_i18n.normalizeString(key)] = json[key];
        //ret[_i18n.normalizeString(key)] = _i18n.normalizeString(json[key]);
    }
    return ret;
}

// string follows gettext (PO) format
// charmapping - optional function(String) for mapping special chars in strings
_i18n.readPODef = function (string, charmapping) {
    var ret = {
        "": {}
    };

    function WritePODef(def) {
        var joinsep = "";
        if (def.msgid.length == 0 || def.msgstr0.length == 0) {
            return;
            //throw "Definition is missing msgid or msgstr";
        }
        var msgid = def.msgid.join(joinsep);
        if (def.msgctxt.length > 0) {
            var msgctxt = def.msgctxt.join(joinsep);
            if (msgctxt != "") {
                msgid = msgctxt + "|" + msgid;
            }
        }
        var msgstrs = [];
        // plural form of source language is not represented in definition
        //if (def.msgid_plural.length > 0) {
        //	msgstrs.push(def.msgid_plural.join(joinsep));
        //}
        for (var i = 0; i < 6; i++) {
            if (def["msgstr" + i].length > 0) {
                msgstrs.push(def["msgstr" + i].join(joinsep));
            }
        }
        // - convert '\' n' to "\n"
        // - map chars
        msgid = msgid.replace(/[\\]n/g, "\n");
        for (var i = 0; i < msgstrs.length; i++) {
            msgstrs[i] = msgstrs[i].replace(/[\\]n/g, "\n");
            if (charmapping) msgstrs[i] = charmapping(msgstrs[i]);
        }
        if (msgstrs.length == 1) {
            ret[msgid] = msgstrs[0];
        } else {
            ret[msgid] = msgstrs;
        }
    }

    function GetEmptyPODef() {
        return {
            "msgctxt": [],// array of lines
            "msgid": [],// array of lines
            "msgid_plural": [],// array of lines
            "msgstr0": [], // array of lines
            "msgstr1": [], // array of lines
            "msgstr2": [], // array of lines
            "msgstr3": [], // array of lines
            "msgstr4": [], // array of lines
            "msgstr5": [], // array of lines
        };
    }

    var lines = string.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
    var msgelem = GetEmptyPODef();
    var curelem = null; // key into msgelem
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        // skip empty lines
        if (line == "") continue;
        if (line.lastIndexOf("#", 0) === 0) {
            // 1st char is "#" -> comment
            continue;
        } else if (line.lastIndexOf('"', 0) === 0) {
            // can be "<string>" or "<key>: <value>\n"
            //var matches = /^"([a-zA-Z0-9_-]+):\s*([^"]+)[\]n"$/.exec(line);
            //if (matches) {
            //	ret[matches[1]] = matches[2];
            //} else {
            //	console.log("Cannot parse key-value definition: '"+line+"'");
            //}
            // expect closing quote to be the last character.
            // This handles escaped quotes.
            var matches = /^"(.*)"$/.exec(line);
            if (curelem === null) {
                console.log("Unexpected string line: '" + line + "'");
            } else if (matches) {
                var str = matches[1];
                str = str.replace(/\\"/g, '"');
                msgelem[curelem].push(str);
            } else {
                console.log("Cannot parse string line: '" + line + "'");
            }
        } else if (line.lastIndexOf("msgstr[", 0) === 0) {
            // msgstr[<number>] "<string>"
            var matches = /^msgstr\[([0-9]+)\]\s+"(.*)"$/.exec(line);
            if (matches) {
                curelem = "msgstr" + matches[1];
                var str = matches[2];
                str = str.replace(/\\"/g, '"');
                msgelem[curelem].push(str);
            } else {
                console.log("Cannot parse msgstr[] line: '" + line + "'");
            }
        } else if (line.lastIndexOf("msgctxt", 0) === 0
            || line.lastIndexOf("msgid", 0) === 0
            || line.lastIndexOf("msgstr", 0) === 0
            || line.lastIndexOf("msgid_plural", 0) === 0) {
            // msgid "<string>", msgstr "<string>",  etc
            var matches = /^([a-z_]+)\s+"(.*)"$/.exec(line);
            if (matches) {
                curelem = matches[1];
                // first, check if start of new message
                //        -> store and clear old message
                if ((curelem == "msgid" || curelem == "msgctxt")
                    && msgelem["msgid"].length > 0) {
                    WritePODef(msgelem);
                    msgelem = GetEmptyPODef();
                }
                if (curelem == "msgstr") curelem = "msgstr0";
                var str = matches[2];
                str = str.replace(/\\"/g, '"');
                msgelem[curelem].push(str);
            } else {
                console.log("Cannot parse msgid/msgid_plural/msgstr line: '"
                    + line + "'");
            }
        } else {
            console.log("Unknown line type: '" + line + "'");
        }
    }
    // write last definition
    WritePODef(msgelem);
    ret = _i18n.normalizeStrings(ret);
    // make exception for "" key. Here, lines are split into elements
    var options = ret[""].split('\n');
    ret[""] = {
        "plural-forms": "nplurals=2; plural=(n != 1);",
    };
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        if (opt == "") continue;
        var matches = /^([a-zA-Z0-9_-]+)[:]\s*(.+)$/.exec(opt);
        if (matches) {
            // gettext.js wants lower case
            ret[""][matches[1].toLowerCase()] = matches[2];
        } else {
            console.log("Cannot parse key-value pair: '" + opt + "'");
        }
    }
    this.loadJSON(ret);
}

_i18n.clearDictionary = function (language) {
    var ret = {}
    ret[""] = {
        "plural-forms": "nplurals=2; plural=(n != 1);",
        "language": language,
    };
    this.loadJSON(ret);
}

_i18n.ReadPODefFromFile =
    function (filename, locale, callback, charmapping) {
        Utils._ajax("GET", filename, "",
            function (data) {
                var podef = _i18n.readPODef(data, charmapping);
                if (callback) callback(null);
            }, function (data) {
                console.log("Error reading PO file: " + data);
                if (callback) callback(data);
            }
        );
    }

// "context": { "key" : "value" }  =>  "context|key": "value"
_i18n.flattenKeyValueJSON = function (json0) {
    var json = {};
    for (var key in json0) {
        var value = json0[key];
        if (typeof value == "object") {
            for (var subkey in value) {
                if (!value.hasOwnProperty(subkey)) continue;
                var subvalue = value[subkey];
                if (Array.isArray(subvalue)) {
                    console.log("Ignored subcontext: " + subkey);
                } else {
                    json[key + "|" + subkey] = subvalue;
                }
            }
        } else {
            json[key] = value;
        }
    }
    return json;
}

// json supported by gettext.js is similar to the "key-value" json in
// poeditor. Context is encoded as a block with the context as key. Language +
// pluralforms are also not included in the defs.
// charmapping not used (yet)
_i18n.ReadJSONFromString =
    function (data, locale, pluralForms, charmapping) {
        if (!locale) locale = "nl";
        if (!pluralForms) pluralForms = "nplurals=2; plural=(n!=1);";
        var json0 = JSON.parse(data);
        // convert key-value json into what i18n expects
        var json = _i18n.flattenKeyValueJSON(json0);
        json = _i18n.normalizeStrings(json);
        json[""] = {
            "language": locale,
            "plural-forms": pluralForms,
        };
        this.loadJSON(json);
    }

_i18n._getGettextContext = function (string) {
    var res = string.split("|");
    if (res.length == 1) return {
        ctxt: null,
        str: string
    };
    var ret = {
        ctxt: res.shift(),
        str: res.join(""),
    };
    return ret;
}

// language definition (the content of the "" key) is supplied as a separate parameter
_i18n.loadJSONSeparate = function (jsonData, langdef, domain) {
    jsonData[""] = langdef;
    _i18n.loadJSON(jsonData, domain);
}


// version that return unnormalized string when no translation found
_i18n.unnormalizedGettext = function (context, string, arg1, arg2) {
    var normString = _i18n.normalizeString(string);
    var ret = _i18n.dcnpgettext(null, context, normString, null, null, arg1, arg2);
    // if result is equal, we assume translation is not found -> return
    // unnormalized original
    if (ret == normString) return string;
    return ret;
}

// shortcuts ------------------------------------------------------------

function __(string) {
    var ctxtstr = _i18n._getGettextContext(string);
    //return dcnpgettext(domain, msgctxt, msgid, msgid_plural, n /* , extra */);
    //return _i18n.dcnpgettext(null, ctxtstr.ctxt, ctxtstr.str, null, null);
    return _i18n.unnormalizedGettext(ctxtstr.ctxt, ctxtstr.str);
}

// 1-parameter version
function __1(string, arg1) {
    var ctxtstr = _i18n._getGettextContext(string);
    //return _i18n.strfmt(string,arg1);
    //return _i18n.dcnpgettext(null, ctxtstr.ctxt, ctxtstr.str, null, null, arg1);
    return _i18n.unnormalizedGettext(ctxtstr.ctxt, ctxtstr.str, arg1);
}

// 2-parameter version
function __2(string, arg1, arg2) {
    var ctxtstr = _i18n._getGettextContext(string);
    //return _i18n.strfmt(string,arg1,arg2);
    //return _i18n.dcnpgettext(null, ctxtstr.ctxt, ctxtstr.str, null, null, arg1, arg2);
    return _i18n.unnormalizedGettext(ctxtstr.ctxt, ctxtstr.str, arg1, arg2);
}


// similar to dngettext
// pass $context=null for no context
function n__(context, strings, stringp, n) {
    return _i18n.dcnpgettext(null, context, strings, stringp, n);
}

// similar to dngettext, 1 stands for 1 sprintf parameter
function n__1(context, strings, stringp, n, arg1) {
    //return _i18n.strfmt(strings,arg1);
    return _i18n.dcnpgettext(null, context, strings, stringp, n, arg1);
}

// similar to dngettext, 2 stands for 2 sprintf parameters
function n__2(context, strings, stringp, n, arg1, arg2) {
    //return _i18n.strfmt(strings,arg1,arg2);
    return _i18n.dcnpgettext(null, context, strings, stringp, n, arg1, arg2);
}

if (typeof exports !== 'undefined') {
    // node.js require()
    exports._i18n = _i18n;
    exports.__ = __;
    exports.__1 = __1;
    exports.__2 = __2;
    exports.n__ = n__;
    exports.n__1 = n__1;
    exports.n__2 = n__2;
}


var Utils = {};


Utils._ajax = function (method, url, body, success, failure) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                failure("" + xhr.status);
            }
        }
    }
    xhr.overrideMimeType('text/plain');
    xhr.open(method, url, true);
    xhr.send(body);
}

Utils.getUrlParameters = function () {
    return window.location.search.substring(1).split("&")
        .reduce(function (res, i) {
            if (i.split("=")[0]) {
                res[i.split("=")[0]] = decodeURIComponent(i.split("=")[1]);
            }
            return res;
        }, {});
}

// helper function
// from: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
Utils.getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return false;
};

// helper function
// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
Utils.generateUUID = function () {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

Utils.parseJWT = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};

// copy all fields in a require() return value to global scope
//Utils.globalizeExportFields = function(exportName) {
//	for (var key in eval(exportName)) {
//		(1,eval)("var "+key+" = "+exportName+"."+key+";");
//	}
//}

// import module with require, copy all fields in the return value to
// global scope
Utils.requireGlobal = function (path) {
    global["mod_export"] = require(path);
    for (var key in mod_export) {
        (1, eval)("global['" + key + "'] = global['mod_export']." + key + ";");
    }
}

if (typeof exports !== 'undefined') {
    // node.js require()
    exports.Utils = Utils;
}

var LOCALSTORAGEPREFIX = "wool_js_";

var NARRATOR = "Narrator";

var RESOURCEBASEDIR = "dialogues";

// get urlParams and config ------------------------------------------------
var urlParams = Utils.getUrlParameters();


if (urlParams.style) {
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="css/custom/'
        + urlParams.style + '.css">';
}

function stripEscapes(text) {
    // remove escape characters
    // this should be done right before passing the text to
    // the presentation layer
    // XXX quotes are not unescaped, to prevent literal strings from breaking
    // TODO only unescape quotes outside of strings
    // String matching expr: '/["(?:[^"\\]|\\.)*"/'
    text = text.replace('/\\([^"])/g',
        function (match, $1, offset, original) {
            return $1;
        });
    return text;
}

class DirectServer {

    constructor() {
        this.rootDir = null; // (node.js) null = unknown
        this.currentLanguage = "en"; // (node.js)
        this.defaultLanguage = "en"; // (node.js)
        this.defaultTranslation = null;
        this.jumpedToNewDialogue = false;
        this.availableDialogues = [];
        this.dialogues = {};
        // function to call if dialogues are loaded
        this.nrDialoguesLoaded = 0;
        this.allDataLoaded = false;
        // runtime errors
        this.errors = [];
        this.ui_settings = {language: "nl_NL"};
        // state
        this.currentdialogueId = null;
        this.currentdialogue = null;
        this.currentnode = null;
        this.currentnodectx = null;
        //this.pendingActions = [];
        // array of visited nodes for back function
        this.nodeHistory = [];
    }

    loadDialogue(dialogueID, data) {
        this.dialogues[dialogueID] = new WoolDialogue(dialogueID, data);
    }

    loadNodeDialogue(dialogueID, filepath, overwrite) {
        if (this.dialogues[dialogueID]) {
            return this.dialogues[dialogueID].data;
        }

        if (typeof NodeFileSystem == "undefined") return;
        var fs = getPlatformFileSystem();
        var data = fs.readFileSync(filepath);
        if (!data) {
            dbg.error("Cannot load dialogue " + filepath);
        }
        if (overwrite || !this.dialogues[dialogueID]) {
            this.dialogues[dialogueID] = new WoolDialogue(dialogueID, data);
        }
        this.nodeHistory = [];
        return data;
    }

    loadNodeTranslation(filepath) {
        return;
        dbg.debug("Loading translation: " + filepath);
        //if (typeof NodeFileSystem == "undefined") return;
        var fs = getPlatformFileSystem();
        var langDefs = fs.readFileSync(filepath);
        if (!langDefs && this.defaultTranslation) {
            langDefs = this.defaultTranslation;
        }
        _i18n.clearDictionary("nl");
        if (langDefs) {
            _i18n.ReadJSONFromString(langDefs, "nl");
        }
    }

    getPath(newPath, languageCode) {
        //if (typeof NodeFileSystem == "undefined") return newPath;
        if (!languageCode) languageCode = "en";
        return newPath;
        var fs = getPlatformFileSystem();
        if (newPath.indexOf("/") != 0 && newPath.indexOf("\\") != 0) {
            // relative path
            var curPath = fs.getPathAPI().dirname(this.currentdialogueId);
            // replace top level directory
            if (curPath.startsWith("/" + this.defaultLanguage)
                || curPath.startsWith("\\" + this.defaultLanguage)) {
                curPath = "/" + languageCode
                    + curPath.substring(this.defaultLanguage.length + 1);
            }
            newPath = fs.getPathAPI().normalize(fs.getPathAPI().join(
                "/", curPath, newPath));
        } else {
            // absolute path -> add language
            newPath = fs.getPathAPI().normalize(fs.getPathAPI().join(
                "/", languageCode, newPath));
        }
        return newPath;
    }

    // load set of dialogues from index file via ajax -------------------------
    // For dialogue selection screen (get_available_dialogues)

    loadFile(i, filename, callback) {
        // XXX assumes file format is [dirtree]/filename.yarn.txt
        var basename = filename.split(/[\/.]/);
        basename = basename[basename.length - 3];

        function handleDataLoaded() {
            dbg.debug("Wool-JS: all data loaded.");
            this.allDataLoaded = true;
            dbg.debug(this);
            if (callback) callback();
        }

        $.ajax({
            url: "../woolserver-js/" + filename,
            type: 'get',
            success: function (data) {
                this.dialogues[basename] = new WoolDialogue(filename, data);
                this.availableDialogues[i] = {
                    dialogueId: basename,
                    dialogueName: basename,
                };
                this.nrDialoguesLoaded++;
                if (this.nrDialoguesLoaded == this.testfiles.length) {
                    handleDataLoaded();
                }
            },
            error: function (data) {
                logError("Cannot load dialogue def: " + filename);
                this.nrDialoguesLoaded++;
                if (this.nrDialoguesLoaded == this.testfiles.length) {
                    handleDataLoaded();
                }
            }
        });
    }

    loadDialogues(callback) {
        // only load dialogues if server has directserver protocol
        var protocol = serverLocation.split("://");
        if (protocol[0] != "directserver") return;

        $.ajax({
            url: '../woolserver-js/yarntestfiles-new.txt',
            type: 'get',
            success: function (data) {
                this.testfiles = data.split(/\r?\n/);
                this.testfiles.pop();
                for (var i = 0; i < this.testfiles.length; i++) {
                    this.loadFile(i, this.testfiles[i], callback);
                    //break;
                }
            }
        });
    }

    // par: {
    //     dialogueId - ID of dialogue
    //     startNodeId - ID of start node (optional, default is "Start")
    //     keepVars - keep any defined vars (optional, default is false)
    //     externalVars - write custom var values to context
    // }
    startDialogue(par) {
        this.currentdialogueId = par.dialogueId;
        if (!par.startNodeId) par.startNodeId = "Start";
        this.currentdialogue = this.dialogues[par.dialogueId];
        dbg.debug("Starting dialogue: " + par.dialogueId)
        // start node is node named "Start", otherwise first node
        var node = this.currentdialogue.nodes[0];
        var idx = this.findNodeIdx(par.startNodeId);
        if (idx !== null) node = this.currentdialogue.nodes[idx];
        this.currentnode = node;
        dbg.debug("Start node: " + idx)
        this.nodeHistory = [];
        // pass kb variables here
        var vars = {};
        if (par.keepVars && this.currentnodectx) {
            vars = this.currentnodectx.vars;
        }

        if (par.externalVars) {
            Object.assign(vars, par.externalVars);
        }

        this.currentnodectx = new WoolNodeContext(vars);
        this.currentnode.func(this.currentnodectx);
        return this.getNode();
    }

    parseActionsBeforeProgress(par) {
        var replydef = typeof par.replyIndex != 'undefined'
            ? this.currentnodectx.choices[par.replyIndex]
            : null;
        /*var replydef = null;
		for (var i=0; i<this.currentnodectx.choices.length; i++) {
			var rd = this.currentnodectx.choices[i];
			if (rd.optid == replyId) replydef = rd;
		}*/
        if (replydef) {
            if (replydef.action) replydef.action(this.currentnodectx);
        }

        if (par.textInput) {
            var ctx = this.currentnodectx;
            if (ctx.inputreply) {
                ctx.vars[ctx.inputreply.inputvar] = par.textInput;
                if (ctx.inputreply.action) {
                    ctx.inputreply.action(this.currentnodectx);
                }
            }
        }
    }

    // par: {
    //     replyId
    //     replyIndex [optional] - index of reply in choices
    //     textInput [optional] - text typed by user
    // }
    progressDialogue(par, vo) {
        // do actions first
        var replyId = par.replyId;
        var newDialogueId = null; // defined when jumping to different dialogue
        var newTranslationPath = null;
        var pathSep = replyId.lastIndexOf(".");
        if (pathSep >= 0) {
            newDialogueId = this.getPath(replyId.substring(0, pathSep), this.defaultLanguage);
            newTranslationPath = this.getPath(replyId.substring(0, pathSep), this.currentLanguage);
            replyId = replyId.substring(pathSep + 1);
        }


        // log actions that were collected in the context
        //if (this.currentnodectx.pendingActions) {
        //    this.pendingActions = this.pendingActions.concat(
        //            this.currentnodectx.pendingActions)
        //    //dbg.debug("Added to pendingActions; " + JSON.stringify(this.pendingActions))
        //	this.currentnodectx.pendingActions = [];
        //}
        // jump to new node
        if (newDialogueId) {
            this.jumpedToNewDialogue = true;
            // load translations before loading dialogue
            this.loadNodeTranslation(
                (this.rootDir ? this.rootDir : "")
                + newTranslationPath + ".json");
            this.loadNodeDialogue(newDialogueId,
                (this.rootDir ? this.rootDir : "")
                + newDialogueId + ".wool");

            if (vo && vo[newDialogueId]) {
                for (const key in vo[newDialogueId]) {
                    if (vo[newDialogueId].hasOwnProperty(key)) {
                        this.setVar(key, vo[newDialogueId][key]);
                    }
                }
            }
            return this.startDialogue({
                dialogueId: newDialogueId,
                startNodeId: replyId,
                keepVars: true,
            });
        } else {
            this.nodeHistory.push(this.currentnode);
            var newnode = this.gotoNode(this.currentdialogue.nodeMap[
                replyId.trim().toLowerCase()]);
            return newnode;
        }
    }

    goBack(par) {
        if (this.nodeHistory.length == 0) return this.currentnode;
        return this.gotoNode(this.nodeHistory.pop());
    }

    setRootDir(rootDir) {
        this.rootDir = rootDir;
    }

    setLanguage(defaultLang, currentLang, defaultValue) {
        if (!defaultValue) defaultValue = "en";
        if (!defaultLang) defaultLang = defaultValue;
        if (!currentLang) currentLang = defaultValue;
        this.defaultLanguage = defaultLang;
        this.currentLanguage = currentLang;
    }

    // use this is no translation is available
    setDefaultTranslation(langDefs) {
        this.defaultTranslation = langDefs;
    }

    // strip language and ".wool" from dialogue path
    stripDialoguePath(dialoguepath) {
        var ret = dialoguepath.split(/[\/\\]/);
        if (ret.length <= 2) return ret;
        ret.shift();
        ret.shift();
        ret = ret.join("/");
        var ret2 = ret.split(/[.]wool$/i);
        if (ret2.length == 2) return ret2[0];
        return ret;
    }

    substituteVars(ctx, text) {
        /*
		console.log("substitute vars ");
		console.log(ctx);
		console.log(text);
		*/
        var keys = [];
        for (var key in ctx.vars) {
            if (!ctx.vars.hasOwnProperty(key)) continue;
            keys.push(key);
        }
        // sort keys, longest first to prevent substitution of a variable that is a prefix of another
        keys.sort(function (a, b) {
            return b.length - a.length;
        })
        for (var keyidx in keys) {
            var key = keys[keyidx];
            var val = ctx.vars[key];
            text = text.split("$" + key).join(val);
        }
        return text;
    }

    getState() {
        return JSON.stringify({
            pendingActions: this.currentnodectx
                ? this.currentnodectx.pendingActions
                : [],
            currentdialogueId: this.currentdialogueId,
            currentnodeid: this.currentnode
                ? this.currentnode.param.title
                : null,
            currentnodectxvars: this.currentnodectx
                ? this.currentnodectx.vars
                : null,
        });
    }

    clearPendingActions() {
        if (this.currentnodectx) {
            this.currentnodectx.pendingActions = [];
        }
    }

    // XXX Pending actions not used, should this be added?
    setState(json) {
        dbg.debug("CTX:" + json);
        var state = JSON.parse(json);
        this.currentdialogueId = state.currentdialogueId;
        this.currentnodectx = new WoolNodeContext(state.currentnodectxvars);
        dbg.debug(this.currentnodectx);
        if (state.currentdialogueId) {
            // if current dialogue is defined, currentnodeid is assumed to be defined also
            this.currentdialogue = this.dialogues[this.currentdialogueId];
            var idx = this.findNodeIdx(state.currentnodeid);
            this.currentnode = this.currentdialogue.nodes[idx];
            this.currentnode.func(this.currentnodectx);
        }
    }

    // returns id of new dialogue, or null if no jump
    checkDialogueJump() {
        var jumped = this.jumpedToNewDialogue;
        this.jumpedToNewDialogue = false;
        if (jumped) {
            return this.currentdialogueId;
        } else {
            return null;
        }
    }

    findNodeIdx(id) {
        for (var i = 0; i < this.currentdialogue.nodes.length; i++) {
            var n = this.currentdialogue.nodes[i];
            if (n.param.title == id) return i;
        }
        return null;
    }

    canGoBack() {
        return this.nodeHistory.length > 0;
    }

    /* convert current node and node ctx into node spec for the client, following:
	String id; // node id
	List<String> speakersInDialogue; // array of agent names
	String speaker; // name of speaking agent
	String statement; //string (concat of all text statements + '\n')
	MultimediaMessage multimedia;
		{ multimediaType [one of IMAGE,VIDEO,TIMER], resourceName (image),
		timerDuration (timer) }
	List<ReplyMessage> replies:
		//array of { replyType, replyId, statement, endsDialogue[bool],
		//beforeStatement, afterStatement, min, max } (class ReplyMessage)
		//replyType one of: AUTOFORWARD, BASIC, TEXTINPUT, NUMERICINPUT
	*/
    getNode() {
        var dia = this.currentdialogue;
        var node = this.currentnode;
        var ctx = this.currentnodectx;
        //dbg.debug(dia);
        //dbg.debug(node);
        //dbg.debug(ctx);
        var speaker = "UNKNOWN";
        if (ctx.speakers.length > 0) {
            speaker = ctx.speakers[0];
        }
        if (node.param["speaker"]) speaker = node.param["speaker"];
        var statement = "";
        for (var i = 0; i < ctx.text.length; i++) {
            var texti = ctx.text[i].trim();
            if (__) {
                var origtexti = texti;
                texti = __(speaker + "|" + origtexti);
                // not found? try without context
                if (texti == origtexti) {
                    texti = __(origtexti);
                }
            }
            texti = stripEscapes(texti);
            statement += texti + "\n";
        }
        var ret = {
            id: node.param.title,
            colorID: node.param.colorID,
            // TODO
            speakersInDialogue: ctx.speakers,
            speaker: speaker,
            tags: node.param['tags'],
            statement: this.substituteVars(ctx, statement),
            multimedia: null,
            replies: [],
            pendingActions: ctx.pendingActions,
        };

        ctx.pendingActions = [];

        if (ctx.afreply) {
            ret.replies.push({
                replyType: "AUTOFORWARD",
                replyId: ctx.afreply,
                endsDialogue: false,
            });

        }
        if (ctx.media) {
            var type = ctx.media.type.toUpperCase();
            ret.multimedia = {
                multimediaType: type,
            };
            if (type == "IMAGE") {
                ret.multimedia.resourceName = ctx.media.param;
            }
            if (type == "TIMER") {
                ret.multimedia.timerDuration = ctx.media.param;
            }
        }
        for (var i = 0; i < ctx.choices.length; i++) {
            var choice = ctx.choices[i];
            // substitute variables in choice.text
            var text = this.substituteVars(ctx, choice.text);
            ret.replies.push({
                replyType: "BASIC",
                replyId: choice.optid,
                statement: text,
                endsDialogue: false,
                beforeStatement: "",
                afterStatement: "",
                action: choice.action,
            });
        }
        if (ctx.inputreply) {
            var ir = ctx.inputreply;
            if (ir.inputtype == "numeric") {
                ret.replies.push({
                    replyType: "NUMERICINPUT",
                    replyId: ir.optid,
                    endsDialogue: false,
                    beforeStatement: this.substituteVars(ctx, ir.beforeText),
                    afterStatement: this.substituteVars(ctx, ir.afterText),
                    action: ir.action,
                    min: parseInt(ir.min),
                    max: parseInt(ir.max),
                    defaultValue: parseInt(ir.defaultValue),
                    value: ir.defaultValue ? parseInt(ir.defaultValue) : parseInt(ir.min),
                    stepDelta: ir.stepDelta ? parseInt(ir.stepDelta) : 1
                });
            } else { // Text
                ret.replies.push({
                    replyType: "TEXTINPUT",
                    replyId: ir.optid,
                    action: ir.action,
                    defaultValue: ir.defaultValue,
                    value: ir.defaultValue,
                    endsDialogue: false,
                    beforeStatement: this.substituteVars(ctx, ir.beforeText),
                    afterStatement: this.substituteVars(ctx, ir.afterText),
                });
            }
        }
        return ret;
    }

    gotoNode(node) {
        this.currentnode = node;
        this.currentnodectx = new WoolNodeContext(
            this.currentnodectx.vars,
            this.currentnodectx.pendingActions,
        );
        if (typeof this.currentnode.func == 'function') {
            try {
                this.currentnode.func(this.currentnodectx);
            } catch (e) {
                logError("Node " + this.currentnode.param["title"] + ": runtime script error: " + e);
            }
        } else {
            logError("Node " + this.currentnode.param["title"] + ": script compile error.");
        }
        return this.getNode();
    }

    setVar(name, value) {
        if (!this.currentnodectx) {
            dbg.warn("Warning: cannot set variable: no current node context.");
        } else {
            this.currentnodectx.vars[name] = value;
        }
    }

    getVars() {
        if (!this.currentnodectx) return null;
        return this.currentnodectx.vars;
    }
}

//var directServer = new DirectServer();

/*
function initDirectServer() {
	directServer.rootDir = null; // (node.js) null = unknown
	directServer.currentLanguage = "en"; // (node.js)
	directServer.defaultLanguage = "en"; // (node.js)
	directServer.defaultTranslation = null;
	directServer.jumpedToNewDialogue = false;
	directServer.availableDialogues = [];
	directServer.dialogues = {};
	// function to call if dialogues are loaded
	directServer.nrDialoguesLoaded = 0;
	directServer.allDataLoaded = false;
	// runtime errors
	directServer.errors = [];
	directServer.ui_settings = { language: "nl_NL" };
	// state
	directServer.currentdialogueId = null;
	directServer.currentdialogue = null;
	directServer.currentnode = null;
	directServer.currentnodectx = null;
    //directServer.pendingActions = [];
	// array of visited nodes for back function
	directServer.nodeHistory = [];
}

initDirectServer();
*/

// type is fatal, error, warning, notice


var dbg = {};

dbg.level = "debug"; // debug/notice/warning/error

// array of objects {msg,trace}
dbg.assertFails = [];

dbg.MAXASSERTFAILS = 20;

dbg.getStackTrace = function () {
    var tracestr = new Error().stack;
    var trace = tracestr.split(/\r?\n/);
    return trace;
}

// level is "debug"/"notice"/"warning"/"error"
dbg.print = function (level, msg) {
    var print = false;
    if (level == "debug" && dbg.level == "debug") {
        print = true;
    } else if (level == "notice"
        && (dbg.level == "debug" || dbg.level == "notice")) {
        print = true;
    } else if (level == "warning" && dbg.level != "error") {
        print = true;
    } else if (level == "error") {
        print = true;
    }
    if (print) {
        console.log(level + " " + dbg.getStackTrace()[4].trim() + ":");
        console.log(msg);
    }
}

dbg.debug = function (msg) {
    dbg.print("debug", msg);
}

dbg.notice = function (msg) {
    dbg.print("notice", msg);
}

dbg.warn = function (msg) {
    dbg.print("warning", msg);
}

dbg.error = function (msg) {
    dbg.print("error", msg);
}

dbg.setLevel = function (level) {
    dbg.level = level;
}

// produces flag and error when false
dbg.assert = function (result, msg) {
    if (!result) {
        dbg.print("warning", msg);
        if (dbg.assertFails.length < dbg.MAXASSERTFAILS) {
            dbg.assertFails.push({
                msg: msg,
                trace: dbg.getStackTrace()[4].trim(),
            });
        }
    }
}

// false when there are no fails, otherwise array of fails
dbg.getAssertFails = function () {
    if (dbg.assertFails.length == 0) return false;
    return dbg.assertFails;
}

dbg.clearAssertFails = function () {
    dbg.assertFails = [];
}


// is passed to eval'ed code as C
// vars: associative array
// actions (optional): array of actions
class WoolNodeContext {

    constructor(vars, actions) {
        this.vars = vars;
        // no speaker defined: speaker = "UNKNOWN";
        this.speakers = [];
        this.text = [""]; // array of (translateable) strings
        this.media = null;
        this.type = "default";
        this.afreply = null;
        this.inputreply = null;
        this.choices = [];

        if (actions) {
            this.pendingActions = actions;
        } else {
            this.pendingActions = [];
        }

        this.randomvalues = []; // [ID -> value]
        this.addLine = function (line, speaker) {
            this.text[this.text.length - 1] += line + "\n";
            if (speaker) this.speakers.push(speaker);
        }
        // start new translatable text block
        this.newTextBlock = function () {
            if (this.text[this.text.length - 1] != "") this.text.push("");
        }
        this.addMultimedia = function (type, param) {
            this.media = {type: type, param: param};
        }
        this.setNodeType = function (type) {
            this.type = type;
        }
        this.addAutoForwardReply = function (optid) {
            if (this.afreply) logError("Multiple af replies");
            this.afreply = optid;
        }
        this.addInputReply = function (optid, beforeText, inputtype, inputvar, afterText, action, min, max, defaultValue, stepDelta) {
            // TODO support multiple input replies
            if (this.inputreply) logError("Multiple input replies");
            this.inputreply = {
                optid: optid,
                beforeText: beforeText,
                inputtype: inputtype,
                inputvar: inputvar,
                afterText: afterText,
                action: action,
                min: min,
                max: max,
                defaultValue: defaultValue,
                stepDelta: stepDelta
            };
        }
        this.addReplyChoice = function (optid, text, action) {
            this.choices.push({
                optid: optid,
                text: text,
                action: action,
            });
        }
        this.doAction = function (params) {
            this.pendingActions.push(params)
        }
        this.setRandom = function (id, min, max) {
            this.randomvalues[id] = min + Math.random() * (max - min);
        }
        this.getRandom = function (id) {
            return this.randomvalues[id];
        }
    }
}

function removeLiteralStrings(expr) {
    expr = expr.replace(/["](?:[^"\\]|\\.)*["]/g, "");
    expr = expr.replace(/['](?:[^'\\]|\\.)*[']/g, "");
    //expr = expr.replace(/["][^"]*["]/g,"");
    //expr = expr.replace(/['][^']*[']/g,"");
    return expr;
}

function checkExpressionForBareIds(expr, line, logError) {
    var found = null;
    // XXX shallow parsing
    expr = removeLiteralStrings(expr);
    if ((found = expr.match(/^([a-zA-Z_][a-zA-Z0-9_]+)/))
        || (found = expr.match(/\s+([a-zA-Z_][a-zA-Z0-9_]+)/))
        //||  (found=expr.match(/[^$a-zA-Z0-9_"-]([a-zA-Z0-9_]+)/))
    ) {
        if (found[1] != "true"
            && found[1] != "false"
            && found[1] != "null" && logError) {
            logError("error", line, "Variable '" + found[1] + "' missing '$' prefix", expr);
        }
    }
}

// check for existence of '=', generate a warning in this.errors.
function checkExpressionForSingleEquals(expr, line, logError) {
    expr = removeLiteralStrings(expr);
    if (expr.match(/[^=<>!]=[^=]/) && logError) {
        logError("warning", line, "Assignment operator '=' found in <<if>> statement. Did you mean '=='?");
    }
}

function rewriteExpression(expr) {
    // XXX $a == $b is not rewritten, inherits js semantics
    // XXX shallow parsing, could match string literal
    // XXX improve number parser, e.g. ".0" not supported
    expr = expr.replace(/([^=!])==\s*true\b/g, "$1 === true");
    expr = expr.replace(/([^=!])==\s*false\b/g, "$1 === false");
    expr = expr.replace(/([^=!])==\s*0\b/g, "$1 === 0");
    expr = expr.replace(/([^=!])==\s*0[.]0\b/g, "$1 === 0.0");
    expr = expr.replace(/\btrue\s*==([^=!])/g, "true === $1");
    expr = expr.replace(/\bfalse\s*==([^=!])/g, "false === $1");
    expr = expr.replace(/\b0\s*==([^=!])/g, "0 === $1");
    expr = expr.replace(/\b0[.]0\s*==([^=!])/g, "0.0 === $1");

    expr = expr.replace(/!=\s*true\b/g, " !== true");
    expr = expr.replace(/!=\s*false\b/g, " !== false");
    expr = expr.replace(/!=\s*0\b/g, " !== 0");
    expr = expr.replace(/!=\s*0[.]0\b/g, " !== 0.0");
    expr = expr.replace(/\btrue\s*!=/g, "true !== ");
    expr = expr.replace(/\bfalse\s*!=/g, "false !== ");
    expr = expr.replace(/\b0\s*!=/g, "0 !== ");
    expr = expr.replace(/\b0[.]0\s*!=/g, "0.0 !== ");

    return expr.replace(/[$]([a-zA-Z0-9_]+)/g, function (match, p1) {
        return "C.vars." + p1;
    });
}

// parse space separated list of key="value" pairs
// Returns null on parse error
function parseKeyValList(expr) {
    var ret = {};
    var regex = /^\s*([a-zA-Z0-9_]+)\s*=\s*"((?:[^"\\]|\\.)*)"/;
    while (true) {
        var matches = regex.exec(expr);
        if (!matches) break;
        ret[matches[1]] = matches[2];
        expr = expr.replace(regex, "");
    }

    // stray characters imply error
    if (!expr) return ret;
    if (expr.trim() != "") return null;
    return ret;
}

// returns action statement when <<set ... >> found, otherwise null
function checkSetStatement(str) {
    var matches = /^<<set\s+[$](\w+)\s*[=]\s*(.+)\s*>>$/.exec(str);
    if (matches) {
        return "C.vars." + matches[1] + " = " + rewriteExpression(matches[2]) + ";";
    } else {
        return null;
    }
}

function checkActionStatement(str, i, logError) {
    var matches = /^<<action\s+(.+)\s*>>$/.exec(str);
    if (matches) {
        var actionparams = parseKeyValList(matches[1]);
        if (actionparams === null && logError) {
            logError("error", i,
                "Cannot parse parameter string '"
                + matches[1] + "'", str);
            return null;
        }
        return "C.doAction(" + JSON.stringify(actionparams) + ");";
    } else {
        return null;
    }
}

class WoolDialogue {
    constructor(dialogueID, woolsource) {
        this.dialogueID = dialogueID;
        this.sourceRaw = woolsource;
        this.source = woolsource.split(/\r?\n/);
        this.nodes = [];
        this.speakers = {};
        this.nodeMap = {};
        var nodelines = [];
        for (var i = 0; i < this.source.length; i++) {
            var line = this.source[i];
            if (line == "===") {
                if (nodelines.length > 0) {
                    this.nodes.push(new WoolNode(this, nodelines));
                }
                nodelines = [];
            } else {
                nodelines.push(line);
            }
        }

        this.printErrors();
    }

    // TODO: rebuild this so we can show errors in UI?
    printErrors() {
        var errorsFound = false;
        var errors = {};

        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (node.errors.length) {
                for (var j = 0; j < node.errors.length; j++) {
                    var err = node.errors[j];
                    if (err.level == "warning" || err.level == "notice") continue;
                    if (!errors[node.param.title]) errors[node.param.title] = [];
                    errors[node.param.title].push(
                        (err.line !== null ? "Line " + (err.line + 1) + ": " : "")
                        + err.msg + " (" + err.level + ") | " + err.rawline);
                }
                if (errors[node.param.title]) {
                    errorsFound = true;
                }
            }
        }

        if (errorsFound) {
            console.log("Errors found Parsing WoolNode:");
            console.log(JSON.stringify(errors, null, 2));
            console.log(this.sourceRaw);
        }

    }

}

// Helper fields:
// links - can be used for editor to show arrows
// texts - can be used for translation.  The node's text lines are trimmed,
//         with \n added to each line.
//         XXX translation of strings with substitute vars is not supported yet!
// agenttexts - subset of texts spoken by agent
// usertexts - subset of texts spoken by agent (note: can have overlap with
//             agenttexts)
class WoolNode {
    constructor(dialogue, lines) {
        // info for random variables: [ randID -> randweightrunningtotal ]
        this.randvars = [];
        // next free ID, produces unique ID for each random clause in node
        this.nextrandID = 0;
        // stack of IDs for nested random statements. When statement starts,
        // new ID is pushed; when statement ends, top ID is popped.
        // Top of stack is ID of current random statement.
        this.randstack = [];

        this.head = [];
        this.body = [];
        this.param = []; // key-value pairs from head
        this.errors = []; // array of {level, line, msg}
        this.links = []; // array of {linenr,nodename}, used for editor
        this.texts = {}; // array { <text> => true}, for translation
        this.agenttexts = {}; // array { <text> => true}, for translation
        this.usertexts = {}; // array { <text> => true}, for translation
        this._parseLines(lines);
        this._parseNode(dialogue);
    }

    // compile time errors
    // level - notice, warning, error, fatal
    // line = line in body, or null if N/A
    logError(level, line, msg, rawline = "") {
        this.errors.push({level: level, line: line, msg: msg, rawline: rawline});
        dbg.error("Logged error: " + level + " " + line + " " + msg);
    }

    startRandom() {
        this.randvars[this.nextrandID] = 0;
        this.randstack.push(this.nextrandID++);
    }

    endRandom() {
        if (this.randstack.length == 0) {
            this.logError("error", i, "<<endrandom>> without matching <<random>>");
            return;
        }
        this.randstack.pop();
    }

    getRandomID() {
        if (this.randstack.length == 0) {
            this.logError("error", i, "Not in <<random>> statement.");
            return 99999;
        }
        return this.randstack[this.randstack.length - 1];
    }

    getRandomWeight() {
        var id = this.getRandomID();
        return this.randvars[id];
    }

    addRandomWeight(weight) {
        var id = this.getRandomID();
        if (this.randvars[id] == null) this.randvars[id] = 0;
        this.randvars[id] += weight;
    }

    _parseLines(lines) {
        var inBody = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line == "---") {
                if (inBody) this.logError("warning", i,
                    "Encountered '---' twice in node, ignoring");
                inBody = true;
                continue;
            }
            if (inBody) {
                this.body.push(line);
            } else {
                this.head.push(line.trim());
            }
        }
    }

    _parseNode(dialogue) {
        // get key-value pairs from head
        for (var i = 0; i < this.head.length; i++) {
            if (this.head[i] == "") continue;
            matches = /^(\w+)\s*:\s*(.*)$/.exec(this.head[i]);
            if (matches) {
                this.param[matches[1]] = matches[2];
            } else {
                this.logError("error", null, "Encountered unparseable line in head: " + this.head[i], this.head[i]);
            }
        }
        var isEndNode = this.param.title == "End";
        if (!isEndNode && this.body.length == 0) {
            this.logError("error", null, "Node has no body");
        }
        if (isEndNode) {
            if (this.body.length >= 2
                || (this.body.length == 1 && this.body[0].trim() != "")
            ) {
                this.logError("error", null, "End node should have empty body");
            }
        }
        if (this.param.speaker) dialogue.speakers[speaker] = this.param.speaker;
        //dbg.debug(this.param);
        // parse body. Format for each line:
        // <text>
        // <agentname> ":" <text>
        // Variables can occur in the text, format is '$'<variablename>
        //
        // '<<if' <variable> 'is' <value> '>>'
        // '<<endif>>'
        // '<<set' <variable> 'to' <value> '>>'
        // '<<multimedia' 'type=image' 'name='<name> '>>'
        // '<<multimedia' 'type=video' 'name='<name> '>>'
        // '<<multimedia' 'type=timer' 'duration='<duration> '>>'
        //
        // '[[' <replyText> '| <dialogueNodeID> ']]'
        // '[[' <dialogueNodeID> ']]'   (autoforward)
        var alllines = ""; // collect subsequent lines for translation
        var addlineprefix = ""; // code to add before addLine statement
        for (var i = 0; i < this.body.length; i++) {
            var line = this.body[i];
            // XXX also matches string literals, so in this parser, it is
            // ignored inside << ... >> or [[ ... ]].
            var linecommentchar = line.indexOf('//');
            if (linecommentchar >= 0) {
                // comment found, check if not inside << ... >> or [[ ... ]]
                var lhs = line.substring(0, linecommentchar);
                var rhs = line.substring(linecommentchar + 2);
                if ((lhs.indexOf("<<") >= 0 && rhs.indexOf(">>") >= 0)
                    || (lhs.indexOf("[[") >= 0 && rhs.indexOf("]]") >= 0)) {
                    // inside, do nothing
                    // NOTE: officially a comment can be inside an option or action
                } else {
                    // not inside
                    // check if slash is escaped
                    if (linecommentchar > 0
                        && line.substring(linecommentchar - 1, linecommentchar) == "\\") {
                        // first character is escaped, ignore
                    } else {
                        //keep left part only
                        line = lhs;
                        // warn about unescaped http:// https://
                        //if (line.match(/http:[\/][\/]/)) {
                        if (line.endsWith("http:")) {
                            this.logError("warning", i,
                                "Unescaped URL, did you mean 'http:\\//'");
                        }
                        //if (line.match(/https:[\/][\/]/)) {
                        if (line.endsWith("https:")) {
                            this.logError("warning", i,
                                "Unescaped URL, did you mean 'https:\\//'");
                        }
                    }
                }
            }

            // remove escape characters
            // this should be done right before passing the text to
            // the presentation layer
            //line = line.replace(/\\(.)/g,
            //	function(match, $1, offset, original) { return $1;} );

            var lineuntrimmed = line + "\n";
            line = line.trim();
            this.body[i] = line;
            // do not call addLine for empty lines
            //if (line == "") {
            //	alllines += lineuntrimmed;
            //	continue;
            //}
            var matches1 = /^<<random\s*(.*)\s*>>$/.exec(line);
            var matches2 = /^<<or\s*(.*)\s*>>$/.exec(line);
            if (matches1 || matches2) {
                if (alllines) {
                    // flush text in between conditionals
                    this.texts[alllines.trim()] = true;
                    this.agenttexts[alllines.trim()] = true;
                    addlineprefix = "C.newTextBlock();";
                    alllines = ""
                }
                var paramsstr = "";
                var weight = 1;
                if (matches1) {
                    this.startRandom();
                    paramsstr = matches1[1];
                } else {
                    paramsstr = matches2[1];
                }
                var params = parseKeyValList(paramsstr);
                if (params == null) {
                    this.logError("error", i, "Cannot parse random parameters: '"
                        + paramsstr + "'", paramsstr);
                } else {
                    // any other parameters are ignored
                    if (params.weight) {
                        if (isNaN(params.weight) || params.weight < 0) {
                            this.logError("error", i, "Illegal random weight: '"
                                + params.weight + "'", paramsstr);
                        } else {
                            weight = parseFloat(params.weight);
                        }
                    }
                }
                this.addRandomWeight(weight);
                var weight = this.getRandomWeight();
                this.body[i] =
                    (matches2 ? "} else " : "")
                    + "if (C.getRandom(" + this.getRandomID()
                    + ") <= " + weight + ") {";
                continue;
            }
            var matches = /^<<endrandom\s*>>$/.exec(line);
            if (matches) {
                if (alllines) {
                    // flush text in between conditionals
                    addlineprefix = "C.newTextBlock();";
                    this.texts[alllines.trim()] = true;
                    this.agenttexts[alllines.trim()] = true;
                    alllines = ""
                }
                this.endRandom();
                this.body[i] = "}";
                continue;
            }
            var matches = /^<<(else)?if\s+(.+)\s*>>$/.exec(line);
            if (matches) {
                if (alllines) {
                    // flush text in between conditionals
                    addlineprefix = "C.newTextBlock();";
                    this.texts[alllines.trim()] = true;
                    this.agenttexts[alllines.trim()] = true;
                    alllines = ""
                }
                checkExpressionForSingleEquals(matches[2], i, this.logError);
                checkExpressionForBareIds(matches[2], i, this.logError);
                //dbg.debug("REWROTE EXPR: "+matches[2] + " => " + rewriteExpression(matches[2]));
                this.body[i] = (matches[1] ? "} else if (" : "if (")
                    + rewriteExpression(matches[2])
                    + ") {";
                continue;
            }
            var matches = /^<<else\s*>>$/.exec(line);
            if (matches) {
                if (alllines) {
                    // flush text in between conditionals
                    addlineprefix = "C.newTextBlock();";
                    this.texts[alllines.trim()] = true;
                    this.agenttexts[alllines.trim()] = true;
                    alllines = ""
                }
                this.body[i] = "} else {";
                continue;
            }
            var matches = /^<<endif\s*>>$/.exec(line);
            if (matches) {
                if (alllines) {
                    // flush text in between conditionals
                    addlineprefix = "C.newTextBlock();";
                    this.texts[alllines.trim()] = true;
                    this.agenttexts[alllines.trim()] = true;
                    alllines = ""
                }
                this.body[i] = "}";
                continue;
            }
            var actfuncitem = checkSetStatement(line);
            if (actfuncitem) {
                this.body[i] = actfuncitem;
                continue;
            }
            var actfuncitem = checkActionStatement(line, i, this.logError);
            if (actfuncitem) {
                this.body[i] = actfuncitem;
                continue;
            }
            var matches = /^<<multimedia\s+type=image\s+name=(\w+)\s*>>$/.exec(line);
            if (matches) {
                this.body[i] = "C.addMultimedia('image','" + matches[1] + "');";
                continue;
            }
            var matches = /^<<multimedia\s+type=video\s+name=(\w+)\s*>>$/.exec(line);
            if (matches) {
                this.body[i] = "C.addMultimedia('video','" + matches[1] + "');";
                continue;
            }
            var matches = /^<<multimedia\s+type=timer\s+duration=([0-9:.]+)\s*>>$/.exec(line);
            if (matches) {
                this.body[i] = "C.addMultimedia('timer','" + matches[1] + "');";
                continue;
            }
            // after checking all types of << .. >>, catch unrecognised << .. >>
            var matches = /^<<.*>>$/.exec(line);
            if (matches) {
                // ignore line, produce error
                this.body[i] = "";
                this.logError("error", i, "Cannot parse << ... >> statement", line);
                continue;
            }
            // Oude spec. Is nu aparte node "End"
            var matches = /^\s*\[EXIT_DIALOGUE\]\s*$/.exec(line);
            if (matches) {
                this.body[i] = "C.setNodeType('exit');";
                this.logError("error", i, "Deprecated EXIT_DIALOGUE statement");
                continue;
            }
            // autoforward reply, no '|'
            var matches = /^\[\[\s*([^|]+)\s*\]\]$/.exec(line);
            if (matches) {
                var optid = matches[1];
                this.links.push({line: i, node: optid});
                this.body[i] = "C.addAutoForwardReply('" + optid + "');";
                continue;
            }

            // normal reply
            var matches = /^\[\[\s*([^|]+)\s*\|\s*([a-zA-Z0-9_.\/-]+)\s*(|.*)?\]\]$/.exec(line);
            if (matches) {
                // XXX textinput also accepts min, max
                var desc = matches[1].trim();
                var origdesc = desc;
                if (__) {
                    desc = __("_user|" + origdesc);
                    // not found? try without context
                    if (desc == origdesc) {
                        desc = __(origdesc);
                    }
                }

                desc = stripEscapes(desc);

                var optid = matches[2];
                var actionsstr = matches[3];
                this.links.push({line: i, node: optid});
                var action = null;
                if (actionsstr) {
                    actionsstr = actionsstr.substring(1); // chop leading '|'
                    // chop leading and trailing brackets
                    matches = /^\s*<<(.*)>>\s*$/.exec(actionsstr);
                    if (!matches) {
                        this.logError("error", i, "Cannot parse action.", actionsstr);
                    } else {
                        actionsstr = matches[1];
                        // XXX brackets in quotes not parsed properly
                        var actions = actionsstr.split(/>>\s*<</);
                        var actfunc = "";
                        for (var j = 0; j < actions.length; j++) {
                            var actionstr = "<<" + actions[j] + ">>";
                            var actfuncitem = checkSetStatement(actionstr);
                            if (actfuncitem) {
                                actfunc += actfuncitem;
                            } else {
                                actfuncitem = checkActionStatement(actionstr, i, this.logError);
                                if (actfuncitem) {
                                    actfunc += actfuncitem;
                                } else {
                                    this.logError("error", i,
                                        "Cannot parse action " + actionstr);
                                }
                            }
                        }
                        if (actfunc) {
                            action = "function(C) { " + actfunc + " }";
                        } else {
                            action = null;
                        }
                    }
                }
                var matches = /^(.*)(<<input\s+)(.+)(\s*>>)(.*)$/.exec(desc);
                if (matches) {

                    var beforeText = matches[1];
                    var inputparams_str = matches[3];
                    var afterText = matches[5];
                    // new server style
                    var textSegment = beforeText + matches[2] + inputparams_str + matches[4] + afterText;
                    // old gettext stle
                    //var textSegment = beforeText+"%1"+afterText;
                    var inputparams = parseKeyValList(inputparams_str);
                    if (inputparams === null) {
                        this.logError("error", i, "Cannot parse parameter string '"
                            + inputparams_str + "'", desc);
                        continue;
                    }
                    if (!inputparams.type) {
                        this.logError("error", i, "Input: type missing", desc);
                        continue;
                    }
                    if (!inputparams.value) {
                        this.logError("error", i, "Input: value missing", desc);
                        continue;
                    }
                    this.texts[origdesc] = true;
                    this.usertexts[origdesc] = true;
                    this.body[i] = "C.addInputReply('"
                        + optid + "',"
                        + JSON.stringify(beforeText) + ",'"
                        + inputparams.type + "','"
                        + inputparams.value.substring(1) + "',"
                        + JSON.stringify(afterText) + ","
                        + action
                        + (inputparams.min ? ",'" + inputparams.min + "'" : "")
                        + (inputparams.max ? ",'" + inputparams.max + "'" : "")
                        + (inputparams.defaultValue ? ",'" + inputparams.defaultValue + "'" : "")
                        + (inputparams.stepDelta ? ",'" + inputparams.stepDelta + "'" : "")
                        + ");";
                    continue;
                } else {
                    this.texts[origdesc] = true;
                    this.usertexts[origdesc] = true;
                    this.body[i] = "C.addReplyChoice("
                        + JSON.stringify(optid) + ","
                        + JSON.stringify(desc) + ","
                        + action + ");";
                    continue;
                }
            }
            // after checking all types of [[ .. ]], catch unrecognised [[ .. ]]
            var matches = /^\[\[.*\]\]$/.exec(line);
            if (matches) {
                // ignore line, produce error
                this.body[i] = "";
                this.logError("error", i, "Cannot parse [[ ... ]] statement", line);
                continue;
            }
            // now, catch unclosed [[ .. ]]
            var matches = /^\[\[/.exec(line);
            if (matches) {
                this.logError("warning", i, "Unclosed [[ ... ]] statement", line);
            }
            // plain line
            var matches = /^([a-zA-Z0-9_]+):\s*(.*)$/.exec(line);
            //if (matches) {
            if (false) {
                // with speaker (is now obsolete)
                var speaker = matches[1];
                //if (alllines) alllines += "\n";
                //alllines += matches[2];
                alllines += matches[2] + "\n";
                dialogue.speakers[speaker] = speaker;
                this.body[i] = addlineprefix + "C.addLine(" +
                    JSON.stringify(matches[2]) + ","
                    + JSON.stringify(speaker) + ");";
                addlineprefix = "";
                continue;
            } else {
                // without speaker
                //if (alllines) alllines += "\n";
                //alllines += line;
                alllines += lineuntrimmed;
                this.body[i] = addlineprefix + "C.addLine(" + JSON.stringify(line) + ");";
                addlineprefix = "";
                continue;
            }
        }
        if (alllines) {
            this.texts[alllines.trim()] = true;
            this.agenttexts[alllines.trim()] = true;
        }
        //dbg.debug("Parsing function:");
        //dbg.debug(this.body.join("\n"));
        // turn code into function
        var funcprefix = "";
        for (var randvar in this.randvars) {
            if (!this.randvars.hasOwnProperty(randvar)) continue;
            var totalweight = this.randvars[randvar];
            funcprefix += "C.setRandom(" + randvar + ",0," + totalweight + ");\n";
        }
        try {
            var funcstr = funcprefix + this.body.join("\n");
            this.func = new Function("C", funcstr);
        } catch (e) {
            this.logError("fatal", null,
                "Script error: " + e);
            dbg.debug(e);
            dbg.debug(funcprefix + this.body.join("\n"));
        }
        dialogue.nodeMap[this.param.title.trim().toLowerCase()] = this;
    }
}

// ------------------------------------------------------------------------
// client side functions to manipulate directServer directly

// load single dialogue from source client side --------------------------
// For client-side only handling (wool editor)

/*
*/

if (typeof exports !== 'undefined') {
    // node.js require()
    exports.WoolNodeContext = WoolNodeContext;
    exports.WoolNode = WoolNode;
    exports.WoolDialogue = WoolDialogue;
    exports.DirectServer = DirectServer;
    /*
	exports.directServer = directServer;
	exports.directServerLoadDialogue = directServerLoadDialogue;
	exports.directServerLoadNodeDialogue = directServerLoadNodeDialogue;
	exports.directServerLoadNodeTranslation = directServerLoadNodeTranslation;
	exports.directServerGetPath = directServerGetPath;
	exports.directServerLoadFile = directServerLoadFile;
	exports.directServerLoadDialogues = directServerLoadDialogues;
	*/
} else {
    globalThis._wool = {
        WoolNodeContext: WoolNodeContext,
        WoolNode: WoolNode,
        WoolDialogue: WoolDialogue,
        DirectServer: DirectServer,
    };
}

function makeRange(max) {
    var ret = [];
    for (var i = 0; i <= max; i++) ret.push(i);
    return ret;
}

/*
function saveConfig() {
	config.avatar = avatarRes.serialize();
	config.background = backgroundRes.serialize();
	config.statementFormat = statementFormat;
	config.hasBackButton = hasBackButton;
	dbg.debug(config);
	localStorage.setItem("simplewoolclient_config",JSON.stringify(config));
}
*/

function initEmptyConfig() {
    config = {
        // avatar and background ID are:
        // - number for preset backgrounds
        // - URL for custom bg
        "avatar": null,
        "background": null,
        "statementFormat": "html",
        "hasBackButton": true,
        // speaker name -> dialogue name -> image filename
        "avatarmapping": null,
    };
    //	"avatars": {
    //		"current": 0, // current index in all
    //		"all": [], // all known avatar IDs and URLs
    //		"mapping": { }, // name -> avatar ID (number) or URL
    //	}
    //	"background": 12, // current background
    //	"backgrounds:" {}, // list of urls
    //	"backgroundmapping": {}, // colorID -> background ID
    //};
}

function resetConfig() {
    localStorage.removeItem("simplewoolclient_config");
    initEmptyConfig();
}

// load config --------------------------------------------------------

if (urlParams.resetconfig) {
    resetConfig();
    alert("Config reset!");
}

var config;
initEmptyConfig();


if (urlParams.config) {
    config = JSON.parse(myDecodeURIComponent(urlParams.config));
} else {
    var c = localStorage.getItem("simplewoolclient_config");
    if (c) config = JSON.parse(c);
}

//var avatarRes = new ResourceUI(config.avatar,makeRange(99),0);
//var backgroundRes = new ResourceUI(config.background,makeRange(29),12);

var statementFormat = config.statementFormat ? config.statementFormat : "html";

var hasBackButton =
    config.hasBackButton !== null && typeof config.hasBackButton != "undefined"
        ? config.hasBackButton
        : true;
if (urlParams.nobackbutton) hasBackButton = false;

var isNarrator = false;

//saveConfig();

// init ---------------------------------------------------------------


// Obtain source code and lang defs. Possible sources:
// - resources: if dialoguepath is defined
// - URL parameter "code" (langDefs cannot be obtained from url yet)
// - windowparams.sourceCode and windowparams.langDefs

var defaultLanguageExplicitlyDefined = false;
var defaultLanguage = urlParams.defaultlanguage;
if (!defaultLanguage) {
    defaultLanguage = "nl";
} else {
    defaultLanguageExplicitlyDefined = true;
}

var dialogueInitVars = {};

if (urlParams.vars) {
    var varsjson = JSON.parse(urlParams.vars);
    if (varsjson) {
        for (var varsjsonname in varsjson) {
            dialogueInitVars[varsjsonname] = varsjson[varsjsonname];
        }
    }
}

var sourceCode = null;

var langDefs = null;

// The ID represents the absolute path. Basedir is used by
// directServerLoadNodeDialogue when loading a relative path.
var dialogueID = "/" + defaultLanguage + "/dialogue";
if (urlParams.dialoguepath) {
    dialogueID = urlParams.dialoguepath;
}


//sourceCode=localStorage.getItem(LOCALSTORAGEPREFIX+"buffer");

if (urlParams.code) sourceCode = myDecodeURIComponent(urlParams.code);

langDefs = localStorage.getItem(LOCALSTORAGEPREFIX + "langDefs");

/*
try {
	var windowparams = JSON.parse(window.name);
	if (!sourceCode) sourceCode = windowparams.sourceCode;
	if (!langDefs) langDefs = windowparams.langDefs;
} catch (e) {
	dbg.error(e);
}
*/

_i18n.enableNormalization(true);

// NOTE: "nl" is always used for the current language
_i18n.clearDictionary("nl");

// As a quick hack, we provide predefined translations for the standard texts,
// in case resources are provided or the default language is explicitly
// defined.
// These will be erased when translations are defined, so you will have to
// define them there.
if ((urlParams.resources || defaultLanguageExplicitlyDefined) && defaultLanguage == "nl") {
    if (!langDefs) {
        langDefs = JSON.stringify({
            "": {"language": "nl", "plural-forms": "nplurals=2; plural=(n != 1);",},
            "You:": "Jij:",
            "Your response:": "Je antwoord:",
            "Continue": "Ga verder",
            "Go back": "Ga terug",
            "Send": "Verstuur",
        });
        directServer.setDefaultTranslation(langDefs);
    }
    //_i18n.setLocale("nl");
}


if (langDefs) {
    // autodetect json or po
    try {
        JSON.parse(langDefs);
        _i18n.ReadJSONFromString(langDefs, "nl");
    } catch (e) {
        // assuming language is nl
        _i18n.readPODef(langDefs);
    }
    _i18n.setLocale("nl");
}

// configure marked --------------------------------------------------------

var globalMarked = (typeof exports !== 'undefined' ? exports : globalThis).marked;
var renderer = new globalMarked.Renderer();

renderer.link = function (href, title, text) {
    var link = globalMarked.Renderer.prototype.link.apply(this, arguments);
    return link.replace("<a", "<a target='_blank'");
};

globalMarked.setOptions({
    renderer: renderer
});


// edit functions ---------------------------------------------------------

// also updates controls if present
/*
function updateAvatar() {
	var controls = document.getElementById("avatarcontrols");
	if (controls) controls.style.display = isNarrator ? "none" : "block";
	var elem = document.getElementById("agent_object");
	var agentid = avatarRes.getCurrentEntity();
	var dialogueid = directServer.stripDialoguePath(directServer.currentdialogueId);
	var nodeid = directServer.currentnode.param.title;
	//dbg.debug("AV "+agentid+"/"+dialogueid+"/"+nodeid);
	if (isNarrator) {
		elem.innerHTML="";
	} else if (config.avatarmapping
	&&         config.avatarmapping[agentid]
	&&         config.avatarmapping[agentid][dialogueid]
	&&         config.avatarmapping[agentid][dialogueid][nodeid]) {
		elem.innerHTML = "<img class='avatarimage' src='images/"
			+ config.avatarmapping[agentid][dialogueid][nodeid]
			+ "'></img>";
	} else if (avatarRes.currentIsNumber()) {
		GenAvataaar(elem,avatarRes.getCurrent());
	} else {
		elem.innerHTML="<img class='avatarimage' src='"+avatarRes.getCurrent()+"'></img>";
	}
}
*/


/*
function updateBackground() {
	if (backgroundRes.currentIsNumber()) {
		document.body.className = "pattern"+backgroundRes.getCurrent();
		document.getElementById("background").style.display="none";
	} else {
		document.getElementById("background").src=backgroundRes.getCurrent();
		document.getElementById("background").style.display="block";
	}
}
*/

/*
function incCurrentAvatar(amount) {
	if (isNarrator) return;
	avatarRes.inc(amount);
	document.getElementById("resourceId").innerHTML =
		"Avatar: "+avatarRes.getCurrentHumanReadable();
	saveConfig();
	updateAvatar();
}

function incBackground(amount) {
	backgroundRes.inc(amount);
	document.getElementById("resourceId").innerHTML =
		"Background: "+backgroundRes.getCurrentHumanReadable();
	saveConfig();
	updateBackground();
}


function addAvatarURL() {
	if (isNarrator) return;
	var url = prompt("Avatar URL:","");
	if (url) {
		avatarRes.add(url);
		saveConfig();
		updateAvatar();
	}
}

function addBackgroundURL() {
	var url = prompt("Background URL:","");
	if (url) {
		backgroundRes.add(url);
		saveConfig();
		updateBackground();
	}
}

function deleteAvatar() {
	if (avatarRes.currentIsNumber()) return;
	if (!confirm("Delete resource "+avatarRes.getCurrentHumanReadable()+"?"))
		return;
	avatarRes.removeCurrent();
	document.getElementById("resourceId").innerHTML = "";
	updateAvatar();
}

function deleteBackground() {
	if (backgroundRes.currentIsNumber()) return;
	if(!confirm("Delete resource "+backgroundRes.getCurrentHumanReadable()+"?"))
		return;
	backgroundRes.removeCurrent();
	document.getElementById("resourceId").innerHTML = "";
	updateBackground();
}
*/

function setStatementFormat(format, updateUI) {
    statementFormat = format;
    // select button in editbox
    var allbuttons = document.getElementsByClassName("formatcommand");
    for (var i in allbuttons) {
        allbuttons[i].className = "commandbutton formatcommand";
    }
    var button = document.getElementById("format_" + format);
    button.classList.add("selected");
    if (updateUI) {
        // also saves config
        updateNodeUI(directServer.getNode());
    } else {
        //saveConfig();
    }
}

// true, false, or undefined = toggle
function setBackButton(backButton, updateUI) {
    if (typeof backButton == "undefined" || backButton === null) {
        backButton = !hasBackButton;
    }
    hasBackButton = backButton;
    var elem = document.getElementById("backbuttoncheckbox");
    elem.checked = hasBackButton ? "checked" : null;
    if (updateUI) {
        // also saves config
        updateNodeUI(directServer.getNode());
    } else {
        //saveConfig();
    }
}

var showingInDebug = null;

// modified encoder for shorter urls
function myEncodeURIComponent(string, notzipped) {
    if (!notzipped) {
        string = kissc.compress(string);
    }
    return encodeURIComponent(string);
}

function myDecodeURIComponent(string) {
    var ret = kissc.decompress(string);
    if (ret === false) return string;
    return ret;
}

function showUrl(zipped) {
    showingInDebug = "URL";
    var dbox = document.getElementById("debugarea");
    dbox.parentNode.style.display = "block";

    dbox.innerHTML = window.location.protocol + "//" +
        window.location.host + window.location.pathname
        + "?config=" + myEncodeURIComponent(JSON.stringify(config), !zipped)
        + "&code=" + myEncodeURIComponent(sourceCode, !zipped);
}

function showVariables() {
    showingInDebug = "variables";
    var dbox = document.getElementById("debugarea");
    dbox.parentNode.style.display = "block";
    dbox.innerHTML = JSON.stringify(directServer.getVars(), null, 2);
}

function resetConfigButton() {
    if (confirm("Reset all avatar and background configuration, and restart dialogue?")) {
        resetConfig();
        window.location.reload();
    }
}

/*
if (urlParams.editable) {
	var edithtml = "";
	if (urlParams.editurl) {
		edithtml =
			"<br><div class='commandbutton'>"
			+"<a href='"+urlParams.editurl+"'>Back to editor</a>"
			+"</div>"
			+"<div class='commandbutton'>"
			+"<a id='editnodeurl' href='"+urlParams.editurl+"'>Edit Node</a>"
			+"</div>";
	}
	document.body.innerHTML +=
		"<div class='editbox'>"
		+"<div id='avatarcontrols'>Avatar: "
		+"<div class='incrementbutton' onclick='incCurrentAvatar(1);'>+</div>"
		+"<div class='incrementbutton' onclick='incCurrentAvatar(-1);'>-</div>"
		+"<div class='incrementbutton' onclick='deleteAvatar();'>&#x1F5D1;</div>"
		+"<div class='commandbutton' onclick='addAvatarURL();'>URL</div>"
		+"</div>"
		+"<div id='backgroundcontrols'>Background: "
		+"<div class='incrementbutton' onclick='incBackground(1);'>+</div>"
		+"<div class='incrementbutton' onclick='incBackground(-1);'>-</div>"
		+"<div class='incrementbutton' onclick='deleteBackground();'>&#x1F5D1;</div>"
		+"<div class='commandbutton' onclick='addBackgroundURL();'>URL</div>"
		+"</div>"
		+"<div id='formatcontrols'>Format: "
		+"<div id='format_markdown' class='commandbutton formatcommand' onclick='setStatementFormat(\"markdown\",true);'>Markdown</div>"
		+"<div id='format_html'  class='commandbutton formatcommand' onclick='setStatementFormat(\"html\",true);'>HTML</div>"
		+"</div>"
		+"<div id='backbuttoncontrols'>Back button: "
		+"<input type='checkbox' id='backbuttoncheckbox' onclick='setBackButton(null,true);'/>\n"
		+"</div>"
		+"<div class='commandbutton' onclick='showUrl(false);'>Get URL</div>"
		+"<div class='commandbutton' onclick='showUrl(true);'>Get URL zipped</div>"
		+"<br/><div class='commandbutton' onclick='showVariables();'>Variables</div>"
		+"<div class='commandbutton' onclick='resetConfigButton();'>Reset config</div>"
		+edithtml
		+"</div>\n"
		+"<div class='currentresourcebox' id='resourceId'></div>\n"
		+"<div class='currentdialoguebox' id='dialogueId'></div>\n";

	setStatementFormat(statementFormat,false); // updates editbox
	setBackButton(hasBackButton,false);
}
*/


// helper functions ---------------------------------------------------


function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function setNumericInputFilter(textbox) {
    setInputFilter(textbox, function (value) {
        return (/^[.,0-9-]*$/.test(value));
    });
}

// index=null indicates autoforward reply (no index)
function handleBasicReply(id, index) {
    handleDirectServerCall("GET", null, null,
        "progress_dialogue/?replyId=" + encodeURIComponent(id)
        + (index !== null ? "&replyIndex=" + encodeURIComponent(index) : ""),
        updateNodeUI);
}

function handleReply(id, index, value) {
    var value = document.getElementById(id + "_content").value;
    handleDirectServerCall("GET", null, null,
        "progress_dialogue/?replyId=" + id + "&replyIndex=" + index
        + "&textInput=" + encodeURIComponent(value),
        updateNodeUI);
}

function handleTextReply(id, index) {
    var value = document.getElementById(id + "_content").value;
    handleReply(id, index, value);
}

function handleNumericReply(id, index, min, max) {
    var value = document.getElementById(id + "_content").value;
    if (isNaN(value)) {
        alert("Please input numeric value.");
        return;
    }
    if (value < min || value > max) {
        alert("Please enter value between " + min + " and " + max + ".");
        return;
    }
    handleReply(id, index, value);
}

function handleBackButton() {
    handleDirectServerCall("GET", null, null,
        "go_back/",
        updateNodeUI);
}


function startDialogue() {
    // Hack: preload initial vars into current nodecontext, so they are
    // present for determining the first action.
    // TODO pass these vars via start_dialogue
    directServer.currentnodectx = new WoolNodeContext(dialogueInitVars);
    handleDirectServerCall("GET", null, null,
        "start_dialogue/?keepVars=true&dialogueId="
        + encodeURIComponent(dialogueID),
        updateNodeUI);
    //for (var name in dialogueInitVars) {
    //	directServer.setVar(name, dialogueInitVars[name]);
    //}
}


function updateNodeUI(node) {
    // Check if we need to redirect after dialogue end first.
    // If so, do not update UI
    if (node.id == "End" || node.replies.length == 0) {
        if (urlParams.redirecturl) {
            window.location.href = urlParams.redirecturl
                + "vars=" + encodeURIComponent(JSON.stringify(
                    directServer.getVars()));
            return;
        }
    }
    // show actions
    if (directServer.currentnodectx) {
        var actions = directServer.currentnodectx.pendingActions;
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                if (action.type == "link") {
                    if (action.url) {
                        window.open(action.url, "_blank");
                    } else {
                        alert("Action type 'link' misses required parameter 'url'");
                    }
                } else {
                    alert("Action called: " + JSON.stringify(actions[i]));
                }
            }
        }
    }
    directServer.clearPendingActions();
    var dialogueidview = document.getElementById("dialogueId");
    if (dialogueidview) dialogueidview.innerText =
        directServer.currentdialogueId;
    var editnodelink = document.getElementById("editnodeurl");
    if (editnodelink) {
        if (!directServer.jumpedToNewDialogue) {
            editnodelink.href =
                urlParams.editurl + "?editnode=" + encodeURIComponent(node.id);
        } else {
            editnodelink.className = "linkdisabled";
        }
    }
    if (showingInDebug == "variables") showVariables();
    if (directServer.errors.length > 0) {
        alert(JSON.stringify(directServer.errors));
        directServer.errors = [];
    }
    isNarrator = node.speaker == NARRATOR;
    /*
	if (node.speaker && node.speaker!="UNKNOWN" && !isNarrator ) {
		avatarRes.switchEntity(node.speaker,Math.floor(Math.random()*99));
	}
	*/
    /*
	updateAvatar();
	backgroundRes.switchEntity(node.colorID, backgroundRes.getCurrent());
	updateBackground();
	saveConfig();
	*/
    var replyelem = document.getElementById("user-reply");
    if (node.id == "End") {
        document.getElementById("agent-name").innerHTML = "";
        document.getElementById("agent-statement").innerHTML =
            __("End of dialogue");
    } else {
        if (isNarrator) {
            document.getElementById("agent-name").style.display = "none";
        } else {
            document.getElementById("agent-name").style.display = "block";
            document.getElementById("agent-name").innerHTML = node.speaker + ":";
        }
        document.getElementById("agent-statement").innerHTML =
            statementFormat == "html"
                ? node.statement
                : marked.parse(node.statement);
    }
    // Non-redirect case of dialogue end
    if (node.id == "End" || node.replies.length == 0) {
        replyelem.className = "reply-box-auto-forward";
        replyelem.innerHTML =
            "<button class='reply-auto-forward' onclick='startDialogue()'>"
            + __("Restart") + "</button>"
        return;
    }
    if (isNarrator) {
        replyelem.innerHTML = "";
    } else {
        replyelem.innerHTML =
            "<p id='user-name'>" + __("You:") + "</p>"
            + "<p id='user-instruction'>" + __("Your response:") + "</p>";
    }
    var normalReply = false;
    for (var i = 0; i < node.replies.length; i++) {
        var reply = node.replies[i];
        if (reply.replyType == "BASIC") {
            replyelem.className = "reply-box";
            replyelem.innerHTML +=
                "<button class='reply' onclick='handleBasicReply(\""
                + reply.replyId + "\",\"" + i + "\")'>"
                + reply.statement + "</button>"
            normalReply = true;
        } else if (reply.replyType == "AUTOFORWARD") {
            replyelem.className = "reply-box-auto-forward";
            replyelem.innerHTML +=
                "<button class='reply-auto-forward' onclick='handleBasicReply(\""
                + reply.replyId + "\",null)'>" + __("Continue") + "</button>"
        } else if (reply.replyType == "TEXTINPUT"
            || reply.replyType == "NUMERICINPUT") {
            // The whole section is now translated by the server, so this is
            // no longer necessary.
            /*var translated=false;
			if (reply.beforeStatement && reply.afterStatement) {
				// If both before and after, translate as a whole
				var statement = __1(reply.beforeStatement
					+ "%1" + reply.afterStatement, "%1");
				var seg = statement.split("%1");
				if (seg.length!=2) {
					dbg.warn("Translation error: mismatched %1 in "
						+"translation '"+statement+"'.");
				} else {
					reply.beforeStatement = seg[0];
					reply.afterStatement = seg[1];
					translated=true;
				}
			}
			if (!translated) {
				// Otherwise, translate only the individual statement
				if (reply.beforeStatement)
					reply.beforeStatement = __(reply.beforeStatement);
				if (reply.afterStatement)
					reply.afterStatement = __(reply.afterStatement);
			}*/
            var replyclass = "reply";
            var submitclass = "submit";
            if (reply.afterStatement) {
                replyclass += " reply_with_after_statement";
                submitclass += " submit_with_after_statement";
            }
            var func = reply.replyType == "TEXTINPUT"
                ? "handleTextReply" : "handleNumericReply";
            var minmax =
                (reply.replyType == "NUMERICINPUT" && reply.min && reply.max)
                    ? "," + reply.min + "," + reply.max
                    : "";
            replyelem.className = "reply-box";
            replyelem.innerHTML += '<div class="before_statement">'
                + reply.beforeStatement + '</div>';
            replyelem.innerHTML +=
                "<div class='responseblock'>"
                + "<input type='text' placeholder='Type here' value='' type='text' name='test' class='" + replyclass + "'"
                + " id='" + reply.replyId + "_content'"
                + "></input>"
                + "<input class='" + submitclass + "'"
                + " onclick='" + func + "(\""
                + reply.replyId + "\",\"" + i + "\"" + minmax + ")' value='" + __("Send") + "'></input>"
                + "</div>\n"; /* responseblock */
            if (reply.afterStatement) {
                replyelem.innerHTML += '<div class="after_statement">'
                    + reply.afterStatement + '</div>';
            }
            // this gets executed too early, so we use the img onload trick
            //document.write(
            //	"<script>"
            //	+"setNumericInputFilter(document.getElementById('"
            //		+ reply.replyId + "_content') );"
            //	+"</script>"
            //);
            if (reply.replyType == "NUMERICINPUT") {
                replyelem.innerHTML += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+OFDPQAI/QNSrn40LQAAAABJRU5ErkJggg==" onload="'
                    + "setNumericInputFilter(document.getElementById('"
                    + reply.replyId + "_content') );"
                    + '" />';
            }
            normalReply = true;
        }
    }
    var backelem = document.getElementById("user-back");
    backelem.innerHTML = "";
    if (directServer.canGoBack() && hasBackButton) {
        if (normalReply) {
            backelem = document.getElementById("user-reply");
            backelem.innerHTML += "<div style='clear:both;' />\n";
        }
        backelem.innerHTML +=
            "<button class='reply-auto-forward' onclick='handleBackButton()'>"
            + __("Go back") + "</button>";
    }
    localStorage.setItem("simplewoolclient_dialoguestate", directServer.getState());
}

// load resources, start dialogue ------------------------------------------


var nrResourcesLoaded = 0;
if (urlParams.resources) {
    var res = JSON.parse(urlParams.resources);
    if (res) {
        for (var i = 0; i < res.length; i++) {
            var resname = res[i];
            BrowserFileSystem.cacheFile(
                RESOURCEBASEDIR + "/" + resname + getNocachePar(),
                resname,
                function () {
                    nrResourcesLoaded++;
                    dbg.debug("Loaded resource " + nrResourcesLoaded +
                        "/" + res.length);
                    if (nrResourcesLoaded == res.length) {
                        startOrResumeDialogue();
                    }
                },
                function (errormsg) {
                    dbg.debug("Error reading resource: '" + errormsg + "'");
                }
            );
        }
    }
} else {
    //startOrResumeDialogue();
}

var preloadedImages = [];

function startOrResumeDialogue() {
    // handle avatar mapping file if present
    /*
	var avatarmapping=getPlatformFileSystem().readFileSync("/avatarmapping.csv");
	if (avatarmapping) {
		config.avatarmapping = [];
		var lines = avatarmapping.split(/\r?\n/);
		for (var i=0; i<lines.length; i++) {
			if (lines[i] == "") continue;
			var fields = lines[i].split(/,/);
			if (fields.length == 0) continue;
			if (fields.length != 2) {
				dbg.debug("avatarmapping.csv: unexpected line '"+lines[i]+"'");
				continue;
			}
			var comp = fields[0].split(/[.]/);
			if (comp.length != 3) {
				dbg.debug("avatarmapping.csv: unexpected directive '"+fields[0]+"'");
				continue;
			}
			if (!config.avatarmapping[comp[0]])
				config.avatarmapping[comp[0]] = {};
			if (!config.avatarmapping[comp[0]][comp[1]])
				config.avatarmapping[comp[0]][comp[1]] = {};
			config.avatarmapping[comp[0]][comp[1]][comp[2]] = fields[1];
			var img = new Image();
			img.src = "images/"+fields[1];
			document.getElementById("hidden").appendChild(img);
			preloadedImages.push(img);
			//dbg.debug("AVATAR "+comp[0]+" DIALOGUE "+comp[1]+" NODE "+comp[2]
			//	+" IMAGE "+fields[1]);
		}
		dbg.debug(config.avatarmapping);
	}
	if (urlParams.dialoguepath) {
		sourceCode=getPlatformFileSystem().readFileSync(urlParams.dialoguepath);
	}
	*/
    // if URL parameters "woolRoot" and "filepath" are supplied, we assume node.js
    // is available, and we can load new dialogues.  Note that the current
    // dialogue is not loaded from file because it may not have been saved.
    // sourceCode is used instead of file contents every time we jump back to the
    // original dialogue.  If sourceCode is not available, then load it from file
    // anyway.
    if (urlParams.woolRoot && urlParams.filepath) {
        dialogueID = urlParams.filepath;
        if (!detectNodeJS()) {
            alert("Fatal: File path specified but node.js not available");
        } else {
            directServer.setRootDir(urlParams.woolRoot);
            directServer.setLanguage(
                localStorage.getItem(LOCALSTORAGEPREFIX + "defaultlanguage"),
                localStorage.getItem(LOCALSTORAGEPREFIX + "language"),
                defaultLanguage
            );
            if (!sourceCode) {
                sourceCode = directServerLoadNodeDialogue(dialogueID,
                    urlParams.woolRoot + "/" + urlParams.filepath);
            } else {
                directServerLoadDialogue(dialogueID, sourceCode);
            }
        }
    } else {
        directServer.setLanguage(null, null, defaultLanguage);
        directServerLoadDialogue(dialogueID, sourceCode);
    }


    var errorsFound = false;
    var errors = {};
    for (var i = 0; i < directServer.dialogues[dialogueID].nodes.length; i++) {
        var node = directServer.dialogues[dialogueID].nodes[i];
        if (node.errors.length) {
            for (var j = 0; j < node.errors.length; j++) {
                var err = node.errors[j];
                if (err.level == "warning" || err.level == "notice") continue;
                if (!errors[node.param.title]) errors[node.param.title] = [];
                errors[node.param.title].push(
                    (err.line !== null ? "Line " + (err.line + 1) + ":" : "")
                    + err.msg + " (" + err.level + ")");
            }
            if (errors[node.param.title]) {
                errorsFound = true;
            }
        }
    }
    if (errorsFound) {
        showingInDebug = "errors";
        var dbox = document.getElementById("debugarea");
        dbox.parentNode.style.display = "block";
        dbox.innerHTML = "Errors were found while parsing.\n"
            + "A list of nodes with errors found in each node follows.\n\n"
            + JSON.stringify(errors, null, 2);
    }

    var prevstate = localStorage.getItem("simplewoolclient_dialoguestate");
    if (urlParams.docontinue) {
        if (prevstate) {
            directServer.setState(prevstate);
            updateNodeUI(directServer.getNode());
        }
    } else {
        startDialogue();
    }
}