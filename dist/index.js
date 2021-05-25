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
(function (_w, d) {
    var config = {
        ids: {
            chat: {
                input: 'input',
                anchor: 'bubble',
            },
            links: {
                form: 'link-form',
                modal: 'link-modal',
            },
        },
        classes: {
            links: {
                modal: 'link-modal',
            },
            styles: {
                collapsed: 'collapsed',
            },
        },
    };
    var addScriptStyles = function (cnf) {
        var style = d.createElement('style');
        d.head.append(style);
        var sheet = style.sheet;
        if (!sheet)
            return;
        var _a = cnf.classes, links = _a.links, styles = _a.styles;
        sheet.insertRule("\n        :root {\n            --white: #c4c8cc;\n            --black: #2d2d2d;\n            --button-primary: #378ad3;\n        }");
        sheet.insertRule("\n        ." + links.modal + " .iconClear {\n            position: absolute;\n            top: 0;\n            right: 0;\n            margin: 1vh;\n            fill: var(--white);\n        }");
        sheet.insertRule("\n        ." + links.modal + " {\n            position: fixed;\n            top: calc(100% / 3);\n            left: calc(100% / 3);\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            border-radius: 1vh;\n            z-index: 9999;\n            max-width: 50vw;\n            max-height: 25vh;\n            background-color: var(--black);\n            overflow: hidden;\n\n            transition: max-width 0.1s linear, max-height 0.1s linear;\n        }");
        sheet.insertRule("\n        ." + styles.collapsed + " {\n            max-width: 0px !important;\n            max-height: 0px !important;\n        }");
        sheet.insertRule("\n        ." + links.modal + " form {\n            padding: 1vh 1vw;\n        }");
        sheet.insertRule("\n        ." + links.modal + " input {\n            box-sizing: border-box;\n            border-radius: 0.5vh;\n            padding: 1vh 1vw;\n            width: 100%;\n            outline: none;\n            background: none;\n            color: var(--white);\n        }");
        sheet.insertRule("\n        ." + links.modal + " label {\n            display: inline-block;\n            margin: 0 0 1vh 0.25vw;\n            color: var(--white);\n            font-size: 0.9rem;\n        }");
        sheet.insertRule("\n        ." + links.modal + " button {\n            height: 4vh;\n            min-width: 8vh;\n            border-radius: 0.5vh 0.5vw;\n            border: none;\n            background-color: rgb(55, 138, 211);\n            color: white;\n        }");
        sheet.insertRule("\n        ." + links.modal + " button:hover {\n          background-color: #3ca4ff;\n        }");
        sheet.insertRule("\n        ." + links.modal + " input {\n            margin-bottom: 1vh;\n        }");
    };
    var createIcon = function (name, pathConfig) {
        var SVG_NS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(SVG_NS, 'svg');
        svg.classList.add('svg-icon', name);
        svg.setAttribute('width', '18');
        svg.setAttribute('height', '18');
        svg.setAttribute('viewBox', '0 0 18 18');
        svg.setAttribute('aria-hidden', 'true');
        var path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', pathConfig);
        svg.append(path);
        return svg;
    };
    var createClearIcon = function () {
        return createIcon('iconClear', 'M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z');
    };
    var createInputLabel = function (_a, text) {
        var id = _a.id;
        var lbl = document.createElement('label');
        lbl.htmlFor = id;
        lbl.textContent = text;
        return lbl;
    };
    var createButton = function (text) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = text;
        return btn;
    };
    var makeLinkMarkdown = function (text, link) { return "[" + text + "](" + link + ")"; };
    var isSElink = function (link) {
        return /https?:\/\/(www\.)?(meta\.)?stackoverflow\.com/.test(link);
    };
    var fetchTitleFromAPI = function (link, site) {
        if (site === void 0) { site = 'stackoverflow'; }
        return __awaiter(void 0, void 0, void 0, function () {
            var version, base, exprs, id, exprs_1, exprs_1_1, regex, matcher, _a, postId, res, items, _b, title;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        version = 2.2;
                        base = "https://api.stackexchange.com/" + version;
                        exprs = [
                            'https?:\\/\\/stackoverflow\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)',
                            "https?:\\/\\/" + site + ".com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)",
                            "https?:\\/\\/" + site + ".com\\/(?:a|q)\\/(\\d+)",
                        ];
                        try {
                            for (exprs_1 = __values(exprs), exprs_1_1 = exprs_1.next(); !exprs_1_1.done; exprs_1_1 = exprs_1.next()) {
                                regex = exprs_1_1.value;
                                matcher = new RegExp(regex, 'i');
                                _a = __read(link.match(matcher) || [], 2), postId = _a[1];
                                if (!postId)
                                    continue;
                                id = postId;
                                break;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (exprs_1_1 && !exprs_1_1.done && (_c = exprs_1.return)) _c.call(exprs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (!id)
                            return [2, ''];
                        return [4, fetch(base + "/posts/" + id + "?site=" + site + "&filter=Bqe1ika.a")];
                    case 1:
                        res = _d.sent();
                        if (!res.ok)
                            return [2, ''];
                        return [4, res.json()];
                    case 2:
                        items = (_d.sent()).items;
                        if (!items.length)
                            return [2, ''];
                        _b = __read(items, 1), title = _b[0].title;
                        return [2, title];
                }
            });
        });
    };
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
                        return [2, ''];
                    return [4, res.text()];
                case 2:
                    content = _a.sent();
                    parsedDoc = new DOMParser().parseFromString(content, 'text/html');
                    meta = parsedDoc.querySelector("[property='og:title']");
                    title = parsedDoc.title;
                    return [2, meta ? meta.content : title];
                case 3:
                    error_1 = _a.sent();
                    console.debug("failed to fetch link or parse: " + error_1);
                    return [2, ''];
                case 4: return [2];
            }
        });
    }); };
    var insertLinkToMessage = function (inputId, link, originalText) {
        var existing = d.getElementById(inputId);
        if (!existing)
            return false;
        existing.value = existing.value.replace(originalText, link);
        return true;
    };
    var openExistingModal = function (element, selection, cls) {
        var classList = element.classList;
        var isClosed = classList.contains(cls);
        var _a = __read(__spreadArray([], __read(element.querySelectorAll('input'))), 2), _link = _a[0], title = _a[1];
        title.value = selection.toString();
        return isClosed && classList.remove(cls);
    };
    var openLinkModal = function (_a) {
        var ids = _a.ids, classes = _a.classes;
        var selection = window.getSelection();
        if (!selection)
            return;
        var anchorNode = selection.anchorNode;
        if (!anchorNode || anchorNode.id !== ids.chat.anchor)
            return;
        var collapsed = classes.styles.collapsed;
        var existing = d.getElementById(ids.links.modal);
        if (existing)
            return openExistingModal(existing, selection, collapsed);
        var modal = d.createElement('div');
        modal.classList.add(classes.links.modal, collapsed);
        modal.id = 'link-modal';
        var closeIcon = createClearIcon();
        closeIcon.addEventListener('click', function () {
            modal.classList.add(collapsed);
        });
        var form = d.createElement('form');
        form.id = ids.links.form;
        var linkInput = d.createElement('input');
        linkInput.type = 'text';
        var originalText = selection.toString();
        var titleInput = d.createElement('input');
        titleInput.type = 'text';
        titleInput.value = originalText;
        linkInput.addEventListener('change', function () { return __awaiter(void 0, void 0, void 0, function () {
            var value, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        value = linkInput.value;
                        _a = titleInput.value;
                        if (_a) return [3, 2];
                        _b = titleInput;
                        return [4, (isSElink(value)
                                ? fetchTitleFromAPI(value)
                                : fetchTitle(value))];
                    case 1:
                        _a = (_b.value = _c.sent());
                        _c.label = 2;
                    case 2:
                        _a;
                        return [2];
                }
            });
        }); });
        var linkLbl = createInputLabel(linkInput, 'Link');
        var titleLbl = createInputLabel(titleInput, 'Title');
        var submit = createButton('Add link');
        submit.addEventListener('click', function () {
            var createdLink = makeLinkMarkdown(titleInput.value, linkInput.value);
            insertLinkToMessage(ids.chat.input, createdLink, originalText);
            modal.classList.add(collapsed);
        });
        form.append(linkLbl, linkInput, titleLbl, titleInput, submit);
        modal.append(closeIcon, form);
        var body = d.body;
        body.append(modal);
        modal.classList.remove(collapsed);
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
            key: 'L',
            ctrl: true,
            shift: false,
            caseSensitive: false,
            action: openLinkModal,
        },
    ];
    d.addEventListener('keydown', function (event) {
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
})(window, document);
