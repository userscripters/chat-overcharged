// ==UserScript==
// @author          Oleg Valter
// @description     Chat experience improvements
// @grant           none
// @homepage        https://github.com/userscripters/template#readme
// @match           *://chat.stackexchange.com/*
// @match           *://chat.stackoverflow.com/*
// @name            chat-overcharge
// @source          git+https://github.com/userscripters/template.git
// @supportURL      https://github.com/userscripters/template/issues
// @version         1.5.1
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
((_w, d) => {
    const config = {
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
    const addButtonStyles = (sheet, scope, primary, secondary) => {
        sheet.insertRule(`
        .${scope} .${primary},
        .${scope} .${secondary} {
            height: 4vh;
            min-width: 8vh;
            outline: none;
            border: none;
            border-radius: 0.5vh 0.5vw;
        }`);
        sheet.insertRule(`
        .${scope} .${primary} {
            background-color: rgb(55, 138, 211);
            color: white;
        }`);
        sheet.insertRule(`
        .${scope} .${secondary} {
            background-color: unset;
            color: var(--white);
        }`);
        sheet.insertRule(`
        .${scope} .${primary}:hover,
        .${scope} .${primary}:focus {
            background-color: #3ca4ff;
        }`);
        sheet.insertRule(`
        .${scope} .${secondary}:hover,
        .${scope} .${secondary}:focus {
            color: white;
        }`);
    };
    const addScriptStyles = (cnf) => {
        const style = d.createElement("style");
        d.head.append(style);
        const { sheet } = style;
        if (!sheet)
            return;
        const { classes: { buttons: { primary, secondary }, links: { modal }, styles, quotas, }, } = cnf;
        sheet.insertRule(`
        :root {
            --white: #c4c8cc;
            --black: #2d2d2d;
            --button-primary: #378ad3;
        }`);
        sheet.insertRule(`
        .${styles.primaryBckg} {
            background-color: var(--black) !important;
        }`);
        sheet.insertRule(`
        .${styles.primaryColor} {
            color: var(--white) !important;
        }`);
        sheet.insertRule(`
        .${modal} .iconClear {
            position: absolute;
            top: 0;
            right: 0;
            margin: 1vh;
            fill: var(--white);
        }`);
        sheet.insertRule(`
        .${modal} {
            position: fixed;
            top: calc(100% / 3);
            left: calc(100% / 3);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 1vh;
            z-index: 9999;
            max-width: 50vw;
            max-height: 25vh;
            overflow: hidden;

            transition: max-width 0.1s linear, max-height 0.1s linear;
        }`);
        sheet.insertRule(`
        .${styles.collapsed} {
            max-width: 0px !important;
            max-height: 0px !important;
        }`);
        sheet.insertRule(`
        .${modal} form {
            padding: 1vh 1vw;
        }`);
        sheet.insertRule(`
        .${modal} input {
            box-sizing: border-box;
            border-radius: 0.5vh;
            padding: 1vh 1vw;
            width: 100%;
            outline: none;
            background: none;
            color: var(--white);
        }`);
        sheet.insertRule(`
        .${modal} label {
            display: inline-block;
            margin: 0 0 1vh 0.25vw;
            color: var(--white);
            font-size: 0.9rem;
        }`);
        addButtonStyles(sheet, modal, primary, secondary);
        sheet.insertRule(`
        .${modal} .${quotas.api} {
            cursor: initial;
            margin-left: 0.5vw;
            color: var(--black);
            transition: color 0.5s linear 0s;
        }`);
        sheet.insertRule(`
        .${modal} input {
            margin-bottom: 1vh;
        }`);
    };
    const createIcon = (name, pathConfig) => {
        const SVG_NS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(SVG_NS, "svg");
        svg.classList.add("svg-icon", name);
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "18");
        svg.setAttribute("viewBox", "0 0 18 18");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return svg;
    };
    const createClearIcon = () => createIcon("iconClear", "M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z");
    const createInputLabel = ({ id }, text) => {
        const lbl = document.createElement("label");
        lbl.htmlFor = id;
        lbl.textContent = text;
        return lbl;
    };
    const createButton = (text, ...classes) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = text;
        btn.classList.add(...classes);
        return btn;
    };
    const createQuotaInfo = (id, cls) => {
        const span = document.createElement("span");
        span.classList.add(cls);
        span.textContent = "SE API quota remaining: ";
        const quota = document.createElement("span");
        quota.id = id;
        span.append(quota);
        return span;
    };
    const updateQuotaInfo = (id, colorCls, quota) => {
        const quotaElem = d.getElementById(id);
        if (!quotaElem)
            return;
        const { parentElement } = quotaElem;
        if (!parentElement)
            return;
        quotaElem.textContent = quota.toString();
        parentElement.classList.add(colorCls);
        setTimeout(() => parentElement.classList.remove(colorCls), 3e3);
    };
    const makeLinkMarkdown = (text, link) => `[${text}](${link})`;
    const isStackExchangeLink = (link) => /https?:\/\/(www\.)?(meta\.)?stack(?:overflow|exchange)\.com/.test(link);
    const fetchTitleFromAPI = (link, quotaLeft) => __awaiter(void 0, void 0, void 0, function* () {
        const version = 2.2;
        const base = `https://api.stackexchange.com/${version}`;
        const [, site = "stackoverflow"] = link.match(/((?:meta\.)?[\w-]+)\.com/i) || [];
        const exprs = [
            `https?:\\/\\/${site}\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)`,
            `https?:\\/\\/${site}\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)`,
            `https?:\\/\\/${site}\\.com\\/(?:a|q)\\/(\\d+)`,
        ];
        let id;
        for (const regex of exprs) {
            const matcher = new RegExp(regex, "i");
            const [, postId] = link.match(matcher) || [];
            if (!postId)
                continue;
            id = postId;
            break;
        }
        const noResponse = ["", quotaLeft];
        if (!id)
            return noResponse;
        const res = yield fetch(`${base}/posts/${id}?site=${site}&filter=Bqe1ika.a`);
        if (!res.ok)
            return noResponse;
        const { items, quota_remaining } = yield res.json();
        if (!items.length)
            return noResponse;
        const [{ title }] = items;
        return [title, quota_remaining];
    });
    const fetchTitle = (link) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch(link);
            if (res.status !== 200)
                return "";
            const content = yield res.text();
            const parsedDoc = new DOMParser().parseFromString(content, "text/html");
            const meta = parsedDoc.querySelector("[property='og:title']");
            const { title } = parsedDoc;
            return meta ? meta.content : title;
        }
        catch (error) {
            console.debug(`failed to fetch link or parse: ${error}`);
            return "";
        }
    });
    const insertLinkToMessage = (inputId, link) => {
        const chatInput = d.getElementById(inputId);
        if (!chatInput)
            return false;
        const { selectionStart, selectionEnd, value } = chatInput;
        if (selectionStart === selectionEnd) {
            chatInput.value += link;
            return true;
        }
        const old = value.slice(selectionStart, selectionEnd);
        chatInput.value = value.replace(old, link);
        return true;
    };
    const refocusChatInput = (submitButton, inputId) => {
        submitButton.blur();
        const input = d.getElementById(inputId);
        if (input)
            input.focus();
    };
    const closeModal = (modal, closeCls, inputId) => {
        modal.classList.add(closeCls);
        const submitter = modal.querySelector("[type=button]");
        if (submitter)
            refocusChatInput(submitter, inputId);
    };
    const openModal = (modal, openCls) => {
        modal.classList.remove(openCls);
        const [first] = [...modal.querySelectorAll("input")];
        first.focus();
        return modal;
    };
    const openExistingModal = (modal, selectedText, cls) => {
        const [_link, title] = [
            ...modal.querySelectorAll("input"),
        ];
        title.value = selectedText;
        return openModal(modal, cls);
    };
    const openLinkModal = ({ ids, classes }) => {
        const { collapsed } = classes.styles;
        const input = d.getElementById(ids.chat.input);
        if (!input)
            return null;
        const { selectionStart, selectionEnd, value } = input;
        const selectedText = value.slice(selectionStart, selectionEnd);
        const existing = d.getElementById(ids.links.modal);
        if (existing)
            return openExistingModal(existing, selectedText, collapsed);
        const modal = d.createElement("div");
        modal.classList.add(classes.links.modal, classes.styles.primaryBckg, collapsed);
        modal.id = ids.links.modal;
        const closeIcon = createClearIcon();
        closeIcon.addEventListener("click", () => closeModal(modal, collapsed, ids.chat.input));
        const form = d.createElement("form");
        form.id = ids.links.form;
        const linkInput = d.createElement("input");
        linkInput.type = "text";
        const titleInput = d.createElement("input");
        titleInput.type = "text";
        titleInput.value = selectedText;
        const quotaInfo = createQuotaInfo(ids.quotas.api, classes.quotas.api);
        let quota = 300;
        linkInput.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
            const { value } = linkInput;
            const isSElink = isStackExchangeLink(value);
            if (isSElink) {
                const [title, quotaLeft] = yield fetchTitleFromAPI(value, quota);
                titleInput.value || (titleInput.value = title);
                quota = quotaLeft;
                return updateQuotaInfo(ids.quotas.api, classes.styles.primaryColor, quota);
            }
            titleInput.value || (titleInput.value = yield fetchTitle(value));
        }));
        const linkLbl = createInputLabel(linkInput, "Link");
        const titleLbl = createInputLabel(titleInput, "Title");
        const submit = createButton("Add link", "btn-primary");
        submit.addEventListener("click", () => {
            const createdLink = makeLinkMarkdown(titleInput.value, linkInput.value);
            insertLinkToMessage(ids.chat.input, createdLink);
            closeModal(modal, collapsed, ids.chat.input);
        });
        const clear = createButton("Clear", "btn-secondary");
        clear.addEventListener("click", () => form.reset());
        form.append(linkLbl, linkInput, titleLbl, titleInput, submit, clear, quotaInfo);
        modal.append(closeIcon, form);
        const { body } = d;
        body.append(modal);
        return openModal(modal, collapsed);
    };
    const closeLinkModal = ({ ids, classes }) => {
        const modal = d.getElementById(ids.links.modal);
        if (modal)
            closeModal(modal, classes.styles.collapsed, ids.chat.input);
        return modal;
    };
    const sameModifiers = ({ ctrl, shift }, ctrlKey, metaKey, shiftKey) => (ctrlKey === ctrl || metaKey === ctrl) && shiftKey === shift;
    const sameKey = ({ key, caseSensitive }, keyPressed) => caseSensitive
        ? key === keyPressed
        : key.toUpperCase() === keyPressed.toUpperCase();
    addScriptStyles(config);
    const shortcuts = [
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
    d.addEventListener("keydown", (event) => {
        const { ctrlKey, metaKey, shiftKey, key } = event;
        const shortcut = shortcuts.find((shortcut) => sameModifiers(shortcut, ctrlKey, metaKey, shiftKey) &&
            sameKey(shortcut, key));
        if (!shortcut)
            return;
        event.preventDefault();
        const { action } = shortcut;
        action(config, shortcut);
    });
})(window, document);
