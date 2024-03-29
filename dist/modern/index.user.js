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
// @version         1.9.0
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
((w, d) => {
    const config = {
        ids: {
            chat: {
                input: "input",
                anchor: "bubble",
            },
            links: {
                form: "link-form",
                modal: "link-modal",
                linkInput: "link-url",
                titleInput: "link-title",
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
            border-radius: 0.5vh 0.5vh;
            cursor: pointer;
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
            cursor: pointer;
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
        sheet.insertRule(`
        .${modal}[draggable=true] {
            cursor: move;
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
    const isLink = (link) => /^(?:https?:\/\/)|www\.|javascript:.+?/.test(link);
    const isStackExchangeLink = (link) => /https?:\/\/(www\.)?(meta\.)?(?:stack(?:overflow|exchange|apps)|superuser|askubuntu)\.com/.test(link);
    const isFocusingInputs = ({ ids: { links } }) => {
        const { activeElement } = d;
        return [links.linkInput, links.titleInput].some((id) => d.getElementById(id) === activeElement);
    };
    const getItemsFromAPI = (site, path, filter) => __awaiter(void 0, void 0, void 0, function* () {
        const version = 2.2;
        const base = `https://api.stackexchange.com/${version}`;
        const key = "nWopg6u2CiSfx8SXs3dyVg((";
        const url = new URL(`${base}${path}`);
        url.search = new URLSearchParams({ key, site, filter }).toString();
        const res = yield fetch(url.toString());
        if (!res.ok)
            return [[]];
        const { items = [], quota_remaining } = (yield res.json());
        return [items, quota_remaining];
    });
    const makeCommentTitleFromAPI = (comment) => {
        if (!comment)
            return "";
        const { body_markdown, creation_date, owner: { display_name }, } = comment;
        const parsedDate = new Date(creation_date * 1e3).toLocaleDateString();
        return `${body_markdown} by ${display_name} on ${parsedDate}`;
    };
    const fetchTitleFromAPI = (link, quotaLeft) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [, commentId] = link.match(new RegExp(`https?:\\/\\/${site}\\.com.+?#comment(\\d+)`, "i")) || [];
        const actions = [
            [
                !!commentId,
                () => __awaiter(void 0, void 0, void 0, function* () {
                    const [[comment], quota] = yield getItemsFromAPI(site, `/comments/${commentId}`, "7W_5HvYg2");
                    return [
                        makeCommentTitleFromAPI(comment),
                        quota || quotaLeft,
                    ];
                }),
            ],
            [
                !!id,
                () => __awaiter(void 0, void 0, void 0, function* () {
                    const [[{ title }], quota] = yield getItemsFromAPI(site, `/posts/${id}`, "Bqe1ika.a");
                    return [title, quota || quotaLeft];
                }),
            ],
        ];
        const [, action] = actions.find(([condition]) => !!condition) || [];
        return action ? yield action() : noResponse;
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
    const setSelectedText = (link, title, text) => {
        const gotLink = isLink(text);
        const insertTextTo = gotLink ? link : title;
        insertTextTo.value = text;
        const event = new UIEvent("change", {
            bubbles: true,
            cancelable: true,
        });
        if (gotLink)
            insertTextTo.dispatchEvent(event);
    };
    const toggleExistingModal = (modal, selectedText, cls, chatInputId) => {
        const [link, title] = [
            ...modal.querySelectorAll("input"),
        ];
        setSelectedText(link, title, selectedText);
        return modal.classList.contains(cls)
            ? openModal(modal, cls)
            : closeModal(modal, cls, chatInputId);
    };
    const wrapValueInMarkdown = (input, opening, closing) => {
        const { selectionStart, selectionEnd, selectionDirection, value } = input;
        const before = value.slice(0, selectionStart);
        const selected = value.slice(selectionStart, selectionEnd);
        const after = value.slice(selectionEnd);
        input.value = `${before}${opening}${selected}${closing}${after}`;
        input.setSelectionRange(selectionStart + opening.length, selectionEnd + closing.length, selectionDirection);
    };
    const insertBoldMarkdown = (config) => {
        const inputId = config.ids.chat.input;
        const chatInput = d.getElementById(inputId);
        if (!chatInput)
            return false;
        wrapValueInMarkdown(chatInput, "**", "**");
        return true;
    };
    const insertItalicMarkdown = (config) => {
        const inputId = config.ids.chat.input;
        const chatInput = d.getElementById(inputId);
        if (!chatInput)
            return false;
        wrapValueInMarkdown(chatInput, "*", "*");
        return true;
    };
    const insertStrikeMarkdown = (config) => {
        const inputId = config.ids.chat.input;
        const chatInput = d.getElementById(inputId);
        if (!chatInput)
            return false;
        wrapValueInMarkdown(chatInput, "---", "---");
        return true;
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
            return toggleExistingModal(existing, selectedText, collapsed, ids.chat.input);
        const modal = d.createElement("div");
        modal.classList.add(classes.links.modal, classes.styles.primaryBckg, collapsed);
        modal.id = ids.links.modal;
        modal.draggable = true;
        const closeIcon = createClearIcon();
        closeIcon.addEventListener("click", () => closeModal(modal, collapsed, ids.chat.input));
        const form = d.createElement("form");
        form.id = ids.links.form;
        const linkInput = d.createElement("input");
        linkInput.type = "text";
        linkInput.id = ids.links.linkInput;
        const titleInput = d.createElement("input");
        titleInput.type = "text";
        titleInput.id = ids.links.titleInput;
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
        setSelectedText(linkInput, titleInput, selectedText);
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
            key: "S",
            ctrl: true,
            shift: true,
            caseSensitive: false,
            action: insertStrikeMarkdown,
        },
        {
            key: "B",
            ctrl: true,
            shift: false,
            caseSensitive: false,
            action: insertBoldMarkdown,
        },
        {
            key: "I",
            ctrl: true,
            shift: false,
            caseSensitive: false,
            action: insertItalicMarkdown,
        },
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
    const modalId = config.ids.links.modal;
    d.addEventListener("dragstart", ({ dataTransfer }) => {
        const dummy = d.createElement("img");
        dummy.src = "data:image/png;base64,AAAAAA==";
        dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setDragImage(dummy, 0, 0);
    });
    let previousX = 0;
    let previousY = 0;
    let zeroed = 0;
    let isDragging = false;
    const handleCoordChange = ({ clientX, clientY }) => {
        const modal = d.getElementById(modalId);
        if (!modal)
            return;
        previousX || (previousX = clientX);
        previousY || (previousY = clientY);
        let { style: { top, left }, } = modal;
        if (!top && !left) {
            const computed = w.getComputedStyle(modal);
            top = computed.top;
            left = computed.left;
        }
        const moveX = clientX - previousX;
        const moveY = clientY - previousY;
        const { style } = modal;
        style.left = `${parseInt(left) + moveX}px`;
        style.top = `${parseInt(top) + moveY}px`;
        previousX = clientX;
        previousY = clientY;
    };
    d.addEventListener("dragstart", (event) => {
        if (isFocusingInputs(config))
            return event.preventDefault();
        const { target } = event;
        if (target === d.getElementById(modalId))
            isDragging = true;
    });
    d.addEventListener("dragend", ({ target }) => {
        if (target === d.getElementById(modalId)) {
            isDragging = false;
            previousX = 0;
            previousY = 0;
        }
    });
    d.addEventListener("drag", (event) => {
        zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;
        if (zeroed >= 3 || !isDragging)
            return;
        return handleCoordChange(event);
    });
    d.addEventListener("dragover", (e) => {
        if (isDragging)
            e.preventDefault();
        if (zeroed < 3 || !isDragging)
            return;
        return handleCoordChange(e);
    });
})(window, document);
