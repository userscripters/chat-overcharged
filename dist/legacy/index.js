// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Chat experience improvements
// @grant           none
// @homepage        https://github.com/userscripters/chat-overcharged#readme
// @match           *://chat.stackexchange.com/*
// @match           *://chat.stackoverflow.com/*
// @name            chat-overcharged
// @namespace       userscripters
// @source          git+https://github.com/userscripters/chat-overcharged.git
// @supportURL      https://github.com/userscripters/chat-overcharged/issues
// @version         1.6.0
// ==/UserScript==

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function (w, d) {
    var config = {
        ids: {
            chat: {
                input: "input",
                anchor: "bubble",
            },
            links: {
                form: "link-form",
                modal: "link-modal",
            },
            quotas: {
                api: "api-quotas",
            },
        },
        classes: {
            buttons: {
                primary: "btn-primary",
                secondary: "btn-secondary",
            },
            links: {
                modal: "link-modal",
            },
            styles: {
                collapsed: "collapsed",
                primaryBckg: "bckg-primary",
                primaryColor: "color-primary",
            },
            quotas: {
                api: "api-quotas",
            },
        },
    };
    var addButtonStyles = function (sheet, scope, primary, secondary) {
        sheet.insertRule("\n        ." + scope + " ." + primary + ",\n        ." + scope + " ." + secondary + " {\n            height: 4vh;\n            min-width: 8vh;\n            outline: none;\n            border: none;\n            border-radius: 0.5vh 0.5vw;\n            cursor: pointer;\n        }");
        sheet.insertRule("\n        ." + scope + " ." + primary + " {\n            background-color: rgb(55, 138, 211);\n            color: white;\n        }");
        sheet.insertRule("\n        ." + scope + " ." + secondary + " {\n            background-color: unset;\n            color: var(--white);\n        }");
        sheet.insertRule("\n        ." + scope + " ." + primary + ":hover,\n        ." + scope + " ." + primary + ":focus {\n            background-color: #3ca4ff;\n        }");
    };
    var addScriptStyles = function (cnf) {
        var style = d.createElement("style");
        d.head.append(style);
        var sheet = style.sheet;
        if (!sheet)
            return;
        var _a = cnf.classes, _b = _a.buttons, primary = _b.primary, secondary = _b.secondary, modal = _a.links.modal, styles = _a.styles, quotas = _a.quotas;
        sheet.insertRule("\n        :root {\n            --white: #c4c8cc;\n            --black: #2d2d2d;\n            --button-primary: #378ad3;\n        }");
        sheet.insertRule("\n        ." + styles.primaryBckg + " {\n            background-color: var(--black) !important;\n        }");
        sheet.insertRule("\n        ." + styles.primaryColor + " {\n            color: var(--white) !important;\n        }");
        sheet.insertRule("\n        ." + modal + " .iconClear {\n            position: absolute;\n            top: 0;\n            right: 0;\n            margin: 1vh;\n            fill: var(--white);\n            cursor: pointer;\n        }");
        sheet.insertRule("\n        ." + modal + " {\n            position: fixed;\n            top: calc(100% / 3);\n            left: calc(100% / 3);\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            border-radius: 1vh;\n            z-index: 9999;\n            max-width: 50vw;\n            max-height: 25vh;\n            overflow: hidden;\n\n            transition: max-width 0.1s linear, max-height 0.1s linear;\n        }");
        sheet.insertRule("\n        ." + styles.collapsed + " {\n            max-width: 0px !important;\n            max-height: 0px !important;\n        }");
        sheet.insertRule("\n        ." + modal + " form {\n            padding: 1vh 1vw;\n        }");
        sheet.insertRule("\n        ." + modal + " input {\n            box-sizing: border-box;\n            border-radius: 0.5vh;\n            padding: 1vh 1vw;\n            width: 100%;\n            outline: none;\n            background: none;\n            color: var(--white);\n        }");
        sheet.insertRule("\n        ." + modal + " label {\n            display: inline-block;\n            margin: 0 0 1vh 0.25vw;\n            color: var(--white);\n            font-size: 0.9rem;\n        }");
        addButtonStyles(sheet, modal, primary, secondary);
        sheet.insertRule("\n        ." + modal + " ." + quotas.api + " {\n            cursor: initial;\n            margin-left: 0.5vw;\n            color: var(--black);\n            transition: color 0.5s linear 0s;\n        }");
        sheet.insertRule("\n        ." + modal + " input {\n            margin-bottom: 1vh;\n        }");
        sheet.insertRule("\n        ." + modal + "[draggable=true] {\n            cursor: move;\n        }");
    };
    var createIcon = function (name, pathConfig) {
        var SVG_NS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(SVG_NS, "svg");
        svg.classList.add("svg-icon", name);
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "18");
        svg.setAttribute("viewBox", "0 0 18 18");
        svg.setAttribute("aria-hidden", "true");
        var path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return svg;
    };
    var createClearIcon = function () {
        return createIcon("iconClear", "M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z");
    };
    var createInputLabel = function (_a, text) {
        var id = _a.id;
        var lbl = document.createElement("label");
        lbl.htmlFor = id;
        lbl.textContent = text;
        return lbl;
    };
    var createButton = function (text) {
        var _a;
        var classes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classes[_i - 1] = arguments[_i];
        }
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = text;
        (_a = btn.classList).add.apply(_a, __spreadArray([], __read(classes)));
        return btn;
    };
    var createQuotaInfo = function (id, cls) {
        var span = document.createElement("span");
        span.classList.add(cls);
        span.textContent = "SE API quota remaining: ";
        var quota = document.createElement("span");
        quota.id = id;
        span.append(quota);
        return span;
    };
    var updateQuotaInfo = function (id, colorCls, quota) {
        var quotaElem = d.getElementById(id);
        if (!quotaElem)
            return;
        var parentElement = quotaElem.parentElement;
        if (!parentElement)
            return;
        quotaElem.textContent = quota.toString();
        parentElement.classList.add(colorCls);
        setTimeout(function () { return parentElement.classList.remove(colorCls); }, 3e3);
    };
    var makeLinkMarkdown = function (text, link) {
        return "[" + text + "](" + link + ")";
    };
    var isStackExchangeLink = function (link) {
        return /https?:\/\/(www\.)?(meta\.)?(?:stack(?:overflow|exchange|apps)|superuser|askubuntu)\.com/.test(link);
    };
    var getItemsFromAPI = function (site, path, filter) { return __awaiter(void 0, void 0, void 0, function () {
        var version, base, key, url, res, _a, _b, items, quota_remaining;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    version = 2.2;
                    base = "https://api.stackexchange.com/" + version;
                    key = "nWopg6u2CiSfx8SXs3dyVg((";
                    url = new URL("" + base + path);
                    url.search = new URLSearchParams({ key: key, site: site, filter: filter }).toString();
                    return [4, fetch(url.toString())];
                case 1:
                    res = _c.sent();
                    if (!res.ok)
                        return [2, [[]]];
                    return [4, res.json()];
                case 2:
                    _a = (_c.sent()), _b = _a.items, items = _b === void 0 ? [] : _b, quota_remaining = _a.quota_remaining;
                    return [2, [items, quota_remaining]];
            }
        });
    }); };
    var makeCommentTitleFromAPI = function (comment) {
        if (!comment)
            return "";
        var body_markdown = comment.body_markdown, creation_date = comment.creation_date, display_name = comment.owner.display_name;
        var parsedDate = new Date(creation_date * 1e3).toLocaleDateString();
        return body_markdown + " by " + display_name + " on " + parsedDate;
    };
    var fetchTitleFromAPI = function (link, quotaLeft) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, site, exprs, id, exprs_1, exprs_1_1, regex, matcher, _c, postId, noResponse, _d, commentId, actions, _e, action, _f;
        var e_1, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = __read(link.match(/((?:meta\.)?[\w-]+)\.com/i) || [], 2), _b = _a[1], site = _b === void 0 ? "stackoverflow" : _b;
                    exprs = [
                        "https?:\\/\\/" + site + "\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)",
                        "https?:\\/\\/" + site + "\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)",
                        "https?:\\/\\/" + site + "\\.com\\/(?:a|q)\\/(\\d+)",
                    ];
                    try {
                        for (exprs_1 = __values(exprs), exprs_1_1 = exprs_1.next(); !exprs_1_1.done; exprs_1_1 = exprs_1.next()) {
                            regex = exprs_1_1.value;
                            matcher = new RegExp(regex, "i");
                            _c = __read(link.match(matcher) || [], 2), postId = _c[1];
                            if (!postId)
                                continue;
                            id = postId;
                            break;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (exprs_1_1 && !exprs_1_1.done && (_g = exprs_1.return)) _g.call(exprs_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    noResponse = ["", quotaLeft];
                    _d = __read(link.match(new RegExp("https?:\\/\\/" + site + "\\.com.+?#comment(\\d+)", "i")) || [], 2), commentId = _d[1];
                    actions = [
                        [
                            !!commentId,
                            function () { return __awaiter(void 0, void 0, void 0, function () {
                                var _a, _b, comment, quota;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4, getItemsFromAPI(site, "/comments/" + commentId, "7W_5HvYg2")];
                                        case 1:
                                            _a = __read.apply(void 0, [_c.sent(), 2]), _b = __read(_a[0], 1), comment = _b[0], quota = _a[1];
                                            return [2, [
                                                    makeCommentTitleFromAPI(comment),
                                                    quota || quotaLeft,
                                                ]];
                                    }
                                });
                            }); },
                        ],
                        [
                            !!id,
                            function () { return __awaiter(void 0, void 0, void 0, function () {
                                var _a, _b, title, quota;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4, getItemsFromAPI(site, "/posts/" + id, "Bqe1ika.a")];
                                        case 1:
                                            _a = __read.apply(void 0, [_c.sent(), 2]), _b = __read(_a[0], 1), title = _b[0].title, quota = _a[1];
                                            return [2, [title, quota || quotaLeft]];
                                    }
                                });
                            }); },
                        ],
                    ];
                    _e = __read(actions.find(function (_a) {
                        var _b = __read(_a, 1), condition = _b[0];
                        return !!condition;
                    }) || [], 2), action = _e[1];
                    if (!action) return [3, 2];
                    return [4, action()];
                case 1:
                    _f = _h.sent();
                    return [3, 3];
                case 2:
                    _f = noResponse;
                    _h.label = 3;
                case 3: return [2, _f];
            }
        });
    }); };
    var fetchTitle = function (link) { return __awaiter(void 0, void 0, void 0, function () {
        var res, content, parsedDoc, meta, title, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch(link)];
                case 1:
                    res = _a.sent();
                    if (res.status !== 200)
                        return [2, ""];
                    return [4, res.text()];
                case 2:
                    content = _a.sent();
                    parsedDoc = new DOMParser().parseFromString(content, "text/html");
                    meta = parsedDoc.querySelector("[property='og:title']");
                    title = parsedDoc.title;
                    return [2, meta ? meta.content : title];
                case 3:
                    error_1 = _a.sent();
                    console.debug("failed to fetch link or parse: " + error_1);
                    return [2, ""];
                case 4: return [2];
            }
        });
    }); };
    var insertLinkToMessage = function (inputId, link) {
        var chatInput = d.getElementById(inputId);
        if (!chatInput)
            return false;
        var selectionStart = chatInput.selectionStart, selectionEnd = chatInput.selectionEnd, value = chatInput.value;
        if (selectionStart === selectionEnd) {
            chatInput.value += link;
            return true;
        }
        var old = value.slice(selectionStart, selectionEnd);
        chatInput.value = value.replace(old, link);
        return true;
    };
    var refocusChatInput = function (submitButton, inputId) {
        submitButton.blur();
        var input = d.getElementById(inputId);
        if (input)
            input.focus();
    };
    var closeModal = function (modal, closeCls, inputId) {
        modal.classList.add(closeCls);
        var submitter = modal.querySelector("[type=button]");
        if (submitter)
            refocusChatInput(submitter, inputId);
    };
    var openModal = function (modal, openCls) {
        modal.classList.remove(openCls);
        var _a = __read(__spreadArray([], __read(modal.querySelectorAll("input"))), 1), first = _a[0];
        first.focus();
        return modal;
    };
    var openExistingModal = function (modal, selectedText, cls) {
        var _a = __read(__spreadArray([], __read(modal.querySelectorAll("input"))), 2), _link = _a[0], title = _a[1];
        title.value = selectedText;
        return openModal(modal, cls);
    };
    var openLinkModal = function (_a) {
        var ids = _a.ids, classes = _a.classes;
        var collapsed = classes.styles.collapsed;
        var input = d.getElementById(ids.chat.input);
        if (!input)
            return null;
        var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd, value = input.value;
        var selectedText = value.slice(selectionStart, selectionEnd);
        var existing = d.getElementById(ids.links.modal);
        if (existing)
            return openExistingModal(existing, selectedText, collapsed);
        var modal = d.createElement("div");
        modal.classList.add(classes.links.modal, classes.styles.primaryBckg, collapsed);
        modal.id = ids.links.modal;
        modal.draggable = true;
        var closeIcon = createClearIcon();
        closeIcon.addEventListener("click", function () {
            return closeModal(modal, collapsed, ids.chat.input);
        });
        var form = d.createElement("form");
        form.id = ids.links.form;
        var linkInput = d.createElement("input");
        linkInput.type = "text";
        var titleInput = d.createElement("input");
        titleInput.type = "text";
        titleInput.value = selectedText;
        var quotaInfo = createQuotaInfo(ids.quotas.api, classes.quotas.api);
        var quota = 300;
        linkInput.addEventListener("change", function () { return __awaiter(void 0, void 0, void 0, function () {
            var value, isSElink, _a, title, quotaLeft, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        value = linkInput.value;
                        isSElink = isStackExchangeLink(value);
                        if (!isSElink) return [3, 2];
                        return [4, fetchTitleFromAPI(value, quota)];
                    case 1:
                        _a = __read.apply(void 0, [_d.sent(), 2]), title = _a[0], quotaLeft = _a[1];
                        titleInput.value || (titleInput.value = title);
                        quota = quotaLeft;
                        return [2, updateQuotaInfo(ids.quotas.api, classes.styles.primaryColor, quota)];
                    case 2:
                        _b = titleInput.value;
                        if (_b) return [3, 4];
                        _c = titleInput;
                        return [4, fetchTitle(value)];
                    case 3:
                        _b = (_c.value = _d.sent());
                        _d.label = 4;
                    case 4:
                        _b;
                        return [2];
                }
            });
        }); });
        var linkLbl = createInputLabel(linkInput, "Link");
        var titleLbl = createInputLabel(titleInput, "Title");
        var submit = createButton("Add link", "btn-primary");
        submit.addEventListener("click", function () {
            var createdLink = makeLinkMarkdown(titleInput.value, linkInput.value);
            insertLinkToMessage(ids.chat.input, createdLink);
            closeModal(modal, collapsed, ids.chat.input);
        });
        var clear = createButton("Clear", "btn-secondary");
        clear.addEventListener("click", function () { return form.reset(); });
        form.append(linkLbl, linkInput, titleLbl, titleInput, submit, clear, quotaInfo);
        modal.append(closeIcon, form);
        var body = d.body;
        body.append(modal);
        return openModal(modal, collapsed);
    };
    var closeLinkModal = function (_a) {
        var ids = _a.ids, classes = _a.classes;
        var modal = d.getElementById(ids.links.modal);
        if (modal)
            closeModal(modal, classes.styles.collapsed, ids.chat.input);
        return modal;
    };
    var sameModifiers = function (_a, ctrlKey, metaKey, shiftKey) {
        var ctrl = _a.ctrl, shift = _a.shift;
        return (ctrlKey === ctrl || metaKey === ctrl) && shiftKey === shift;
    };
    var sameKey = function (_a, keyPressed) {
        var key = _a.key, caseSensitive = _a.caseSensitive;
        return caseSensitive
            ? key === keyPressed
            : key.toUpperCase() === keyPressed.toUpperCase();
    };
    addScriptStyles(config);
    var shortcuts = [
        {
            key: "L",
            ctrl: true,
            shift: false,
            caseSensitive: false,
            action: openLinkModal,
        },
        {
            key: "Escape",
            ctrl: false,
            shift: false,
            caseSensitive: false,
            action: closeLinkModal,
        },
    ];
    d.addEventListener("keydown", function (event) {
        var ctrlKey = event.ctrlKey, metaKey = event.metaKey, shiftKey = event.shiftKey, key = event.key;
        var shortcut = shortcuts.find(function (shortcut) {
            return sameModifiers(shortcut, ctrlKey, metaKey, shiftKey) &&
                sameKey(shortcut, key);
        });
        if (!shortcut)
            return;
        event.preventDefault();
        var action = shortcut.action;
        action(config, shortcut);
    });
    var modalId = config.ids.links.modal;
    d.addEventListener("dragstart", function (_a) {
        var dataTransfer = _a.dataTransfer;
        var dummy = d.createElement("img");
        dummy.src = "data:image/png;base64,AAAAAA==";
        dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
    });
    var previousX = 0;
    var previousY = 0;
    d.addEventListener("drag", function (_a) {
        var dataTransfer = _a.dataTransfer, target = _a.target, clientX = _a.clientX, clientY = _a.clientY;
        if (target.id !== modalId || !dataTransfer)
            return;
        var style = target.style;
        previousX || (previousX = clientX);
        previousY || (previousY = clientY);
        var _b = target.style, top = _b.top, left = _b.left;
        if (!top && !left) {
            var computed = w.getComputedStyle(target);
            top = computed.top;
            left = computed.left;
        }
        var moveX = clientX - previousX;
        var moveY = clientY - previousY;
        style.left = parseInt(left) + moveX + "px";
        style.top = parseInt(top) + moveY + "px";
        previousX = clientX;
        previousY = clientY;
    });
    d.addEventListener("dragover", function (e) { return e.preventDefault(); });
})(window, document);
