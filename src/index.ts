interface Document
    extends Node,
        DocumentAndElementEventHandlers,
        DocumentOrShadowRoot,
        GlobalEventHandlers,
        NonElementParentNode,
        ParentNode,
        XPathEvaluatorBase {
    getElementById<T extends HTMLElement>(elementId: string): T | null;
}

type Config = {
    ids: {
        chat: {
            input: string;
            anchor: string;
        };
        links: {
            form: string;
            modal: string;
        };
        quotas: {
            api: string;
        };
    };
    classes: {
        buttons: {
            primary: string;
            secondary: string;
        };
        links: {
            modal: string;
        };
        styles: {
            collapsed: string;
            primaryBckg: string;
            primaryColor: string;
        };
        quotas: { api: string };
    };
};

type Shortcut = {
    key: string;
    ctrl: boolean;
    shift: boolean;
    caseSensitive: boolean;
    action: (cnf: Config, shorcut: Shortcut) => void;
};

type PostInfo = {
    post_id: number;
    title: string;
};

type CommentInfo = {
    body_markdown: string;
    content_license: string;
    creation_date: number;
    owner: {
        display_name: string;
    };
};

type ApiRes<T> = { items: T[]; quota_remaining: number };

type ApiTitleInfo = [title: string, quota: number];

type ApiActions = [boolean, () => Promise<ApiTitleInfo>][];

((w, d) => {
    const config: Config = {
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

    const addButtonStyles = (
        sheet: CSSStyleSheet,
        scope: string,
        primary: string,
        secondary: string
    ) => {
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

    const addScriptStyles = (cnf: Config) => {
        const style = d.createElement("style");
        d.head.append(style);

        const { sheet } = style;
        if (!sheet) return;

        const {
            classes: {
                buttons: { primary, secondary },
                links: { modal },
                styles,
                quotas,
            },
        } = cnf;

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

    const createIcon = (name: string, pathConfig: string) => {
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

    const createClearIcon = () =>
        createIcon(
            "iconClear",
            "M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z"
        );

    const createInputLabel = ({ id }: HTMLInputElement, text: string) => {
        const lbl = document.createElement("label");
        lbl.htmlFor = id;
        lbl.textContent = text;
        return lbl;
    };

    const createButton = (text: string, ...classes: string[]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = text;
        btn.classList.add(...classes);
        return btn;
    };

    const createQuotaInfo = (id: string, cls: string) => {
        const span = document.createElement("span");
        span.classList.add(cls);
        span.textContent = "SE API quota remaining: ";

        const quota = document.createElement("span");
        quota.id = id;
        span.append(quota);

        return span;
    };

    const updateQuotaInfo = (id: string, colorCls: string, quota: number) => {
        const quotaElem = d.getElementById(id);
        if (!quotaElem) return;
        const { parentElement } = quotaElem;
        if (!parentElement) return;
        quotaElem.textContent = quota.toString();
        parentElement.classList.add(colorCls);
        setTimeout(() => parentElement.classList.remove(colorCls), 3e3);
    };

    const makeLinkMarkdown = (text: string, link: string) =>
        `[${text}](${link})`;

    //for now, we are only interested in SO / Meta SO links
    const isStackExchangeLink = (link: string) =>
        /https?:\/\/(www\.)?(meta\.)?(?:stack(?:overflow|exchange|apps)|superuser|askubuntu)\.com/.test(
            link
        );

    const getItemsFromAPI = async <T>(
        site: string,
        path: string,
        filter: string
    ): Promise<[items: T[], quota?: number]> => {
        const version = 2.2;
        const base = `https://api.stackexchange.com/${version}`;
        const key = "nWopg6u2CiSfx8SXs3dyVg((";

        const url = new URL(`${base}${path}`);
        url.search = new URLSearchParams({ key, site, filter }).toString();

        const res = await fetch(url.toString());
        if (!res.ok) return [[]];

        const { items = [], quota_remaining } = (await res.json()) as ApiRes<T>;
        return [items, quota_remaining];
    };

    const makeCommentTitleFromAPI = (comment?: CommentInfo) => {
        if (!comment) return "";

        const {
            body_markdown,
            creation_date,
            owner: { display_name },
        } = comment;

        const parsedDate = new Date(creation_date * 1e3).toLocaleDateString();
        return `${body_markdown} by ${display_name} on ${parsedDate}`;
    };

    const fetchTitleFromAPI = async (link: string, quotaLeft: number) => {
        const [, site = "stackoverflow"] =
            link.match(/((?:meta\.)?[\w-]+)\.com/i) || [];

        const exprs = [
            `https?:\\/\\/${site}\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)`, //answers
            `https?:\\/\\/${site}\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)`, //questions
            `https?:\\/\\/${site}\\.com\\/(?:a|q)\\/(\\d+)`, //share links
        ];

        let id!: string;
        for (const regex of exprs) {
            const matcher = new RegExp(regex, "i");
            const [, postId] = link.match(matcher) || [];
            if (!postId) continue;
            id = postId;
            break;
        }

        const noResponse: ApiTitleInfo = ["", quotaLeft];

        const [, commentId] =
            link.match(
                new RegExp(`https?:\\/\\/${site}\\.com.+?#comment(\\d+)`, "i")
            ) || [];

        const actions: ApiActions = [
            [
                !!commentId,
                async () => {
                    const [[comment], quota] =
                        await getItemsFromAPI<CommentInfo>(
                            site,
                            `/comments/${commentId}`,
                            "7W_5HvYg2"
                        );

                    return [
                        makeCommentTitleFromAPI(comment),
                        quota || quotaLeft,
                    ];
                },
            ],
            [
                !!id,
                async () => {
                    const [[{ title }], quota] =
                        await getItemsFromAPI<PostInfo>(
                            site,
                            `/posts/${id}`,
                            "Bqe1ika.a"
                        );
                    return [title, quota || quotaLeft];
                },
            ],
        ];

        const [, action] = actions.find(([condition]) => !!condition) || [];
        return action ? await action() : noResponse;
    };

    const fetchTitle = async (link: string) => {
        try {
            const res = await fetch(link);
            if (res.status !== 200) return "";

            const content = await res.text();

            const parsedDoc = new DOMParser().parseFromString(
                content,
                "text/html"
            );

            //try to get OpenGraph title;
            const meta = parsedDoc.querySelector<HTMLMetaElement>(
                "[property='og:title']"
            );

            const { title } = parsedDoc;
            return meta ? meta.content : title;
        } catch (error) {
            console.debug(`failed to fetch link or parse: ${error}`);
            return "";
        }
    };

    const insertLinkToMessage = (inputId: string, link: string) => {
        const chatInput = d.getElementById<HTMLTextAreaElement>(inputId);
        if (!chatInput) return false;

        const { selectionStart, selectionEnd, value } = chatInput;

        if (selectionStart === selectionEnd) {
            chatInput.value += link;
            return true;
        }

        const old = value.slice(selectionStart, selectionEnd);
        chatInput.value = value.replace(old, link);
        return true;
    };

    const refocusChatInput = (
        submitButton: HTMLButtonElement,
        inputId: string
    ) => {
        submitButton.blur();
        const input = d.getElementById<HTMLTextAreaElement>(inputId);
        if (input) input.focus();
    };

    const closeModal = (
        modal: HTMLElement,
        closeCls: string,
        inputId: string
    ) => {
        modal.classList.add(closeCls);
        const submitter =
            modal.querySelector<HTMLButtonElement>("[type=button]");
        if (submitter) refocusChatInput(submitter, inputId);
    };

    const openModal = (modal: HTMLElement, openCls: string) => {
        modal.classList.remove(openCls);
        const [first] = [...modal.querySelectorAll<HTMLInputElement>("input")];
        first.focus();
        return modal;
    };

    const toggleExistingModal = (
        modal: HTMLElement,
        selectedText: string,
        cls: string,
        chatInputId: string
    ) => {
        const [_link, title] = [
            ...modal.querySelectorAll<HTMLInputElement>("input"),
        ];
        title.value = selectedText;

        return modal.classList.contains(cls)
            ? openModal(modal, cls)
            : closeModal(modal, cls, chatInputId);
    };

    const openLinkModal = ({ ids, classes }: Config) => {
        const { collapsed } = classes.styles;

        const input = d.getElementById<HTMLTextAreaElement>(ids.chat.input);
        if (!input) return null;

        const { selectionStart, selectionEnd, value } = input;
        const selectedText = value.slice(selectionStart, selectionEnd);

        const existing = d.getElementById(ids.links.modal);
        if (existing)
            return toggleExistingModal(
                existing,
                selectedText,
                collapsed,
                ids.chat.input
            );

        const modal = d.createElement("div");
        modal.classList.add(
            classes.links.modal,
            classes.styles.primaryBckg,
            collapsed
        );
        modal.id = ids.links.modal;
        modal.draggable = true;

        const closeIcon = createClearIcon();
        closeIcon.addEventListener("click", () =>
            closeModal(modal, collapsed, ids.chat.input)
        );

        const form = d.createElement("form");
        form.id = ids.links.form;

        const linkInput = d.createElement("input");
        linkInput.type = "text";

        const titleInput = d.createElement("input");
        titleInput.type = "text";
        titleInput.value = selectedText;

        const quotaInfo = createQuotaInfo(ids.quotas.api, classes.quotas.api);

        let quota = 300;
        linkInput.addEventListener("change", async () => {
            const { value } = linkInput;

            const isSElink = isStackExchangeLink(value);

            if (isSElink) {
                const [title, quotaLeft] = await fetchTitleFromAPI(
                    value,
                    quota
                );
                titleInput.value ||= title;
                quota = quotaLeft;
                return updateQuotaInfo(
                    ids.quotas.api,
                    classes.styles.primaryColor,
                    quota
                );
            }

            titleInput.value ||= await fetchTitle(value);
        });

        const linkLbl = createInputLabel(linkInput, "Link");
        const titleLbl = createInputLabel(titleInput, "Title");

        const submit = createButton("Add link", "btn-primary");
        submit.addEventListener("click", () => {
            const createdLink = makeLinkMarkdown(
                titleInput.value,
                linkInput.value
            );
            insertLinkToMessage(ids.chat.input, createdLink);
            closeModal(modal, collapsed, ids.chat.input);
        });

        const clear = createButton("Clear", "btn-secondary");
        clear.addEventListener("click", () => form.reset());

        form.append(
            linkLbl,
            linkInput,
            titleLbl,
            titleInput,
            submit,
            clear,
            quotaInfo
        );
        modal.append(closeIcon, form);

        const { body } = d;
        body.append(modal);

        return openModal(modal, collapsed);
    };

    const closeLinkModal = ({ ids, classes }: Config) => {
        const modal = d.getElementById(ids.links.modal);
        if (modal) closeModal(modal, classes.styles.collapsed, ids.chat.input);
        return modal;
    };

    const sameModifiers = (
        { ctrl, shift }: Shortcut,
        ctrlKey: boolean,
        metaKey: boolean,
        shiftKey: boolean
    ) => (ctrlKey === ctrl || metaKey === ctrl) && shiftKey === shift;

    const sameKey = ({ key, caseSensitive }: Shortcut, keyPressed: string) =>
        caseSensitive
            ? key === keyPressed
            : key.toUpperCase() === keyPressed.toUpperCase();

    addScriptStyles(config);

    const shortcuts: Shortcut[] = [
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

        const shortcut = shortcuts.find(
            (shortcut) =>
                sameModifiers(shortcut, ctrlKey, metaKey, shiftKey) &&
                sameKey(shortcut, key)
        );

        if (!shortcut) return;

        event.preventDefault();

        const { action } = shortcut;
        action(config, shortcut);
    });

    const modalId = config.ids.links.modal;

    d.addEventListener("dragstart", ({ dataTransfer }) => {
        const dummy = d.createElement("img");
        dummy.src = "data:image/png;base64,AAAAAA==";
        dataTransfer?.setDragImage(dummy, 0, 0);
    });

    let previousX = 0;
    let previousY = 0;
    let zeroed = 0;
    let isDragging = false;

    const handleCoordChange = ({ clientX, clientY }: MouseEvent) => {
        const modal = d.getElementById(modalId);
        if (!modal) return;

        previousX ||= clientX;
        previousY ||= clientY;

        let {
            style: { top, left },
        } = modal;

        //get computed styles the first time
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

    d.addEventListener("dragstart", ({ target }) => {
        if (target === d.getElementById(modalId)) isDragging = true;
    });
    d.addEventListener("dragend", ({ target }) => {
        if (target === d.getElementById(modalId)) {
            isDragging = false;
            previousX = 0;
            previousY = 0;
        }
    });

    d.addEventListener("drag", (event) => {
        //if clientX zeroes out 3 times in a row, we are dealing with an FF bug
        zeroed = event.clientX ? 0 : zeroed < 3 ? zeroed + 1 : 3;

        if (zeroed >= 3 || !isDragging) return;
        return handleCoordChange(event);
    });

    d.addEventListener("dragover", (e) => {
        e.preventDefault();
        //fixes this old FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
        if (zeroed < 3 || !isDragging) return;
        return handleCoordChange(e);
    });
})(window, document);
