"use strict";
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
