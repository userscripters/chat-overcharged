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
    links: {
      modal: string;
    };
    styles: { collapsed: string; primaryBckg: string; primaryColor: string };
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

type ApiRes = { items: PostInfo[]; quota_remaining: number };

((w, d) => {
    const config: Config = {
        ids: {
            chat: {
                input: 'input',
                anchor: 'bubble',
            },
            links: {
                form: 'link-form',
                modal: 'link-modal',
            },
            quotas: {
                api: 'api-quotas',
            },
        },
        classes: {
            links: {
                modal: 'link-modal',
            },
            styles: {
                collapsed: 'collapsed',
                primaryBckg: 'bckg-primary',
                primaryColor: 'color-primary',
            },
            quotas: {
                api: 'api-quotas',
            },
        },
    };

    const addScriptStyles = (cnf: Config) => {
        const style = d.createElement('style');
        d.head.append(style);

        const { sheet } = style;
        if (!sheet) return;

        const {
            classes: { links, styles, quotas },
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
        .${links.modal} .iconClear {
            position: absolute;
            top: 0;
            right: 0;
            margin: 1vh;
            fill: var(--white);
        }`);

        sheet.insertRule(`
        .${links.modal} {
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
        .${links.modal} form {
            padding: 1vh 1vw;
        }`);

        sheet.insertRule(`
        .${links.modal} input {
            box-sizing: border-box;
            border-radius: 0.5vh;
            padding: 1vh 1vw;
            width: 100%;
            outline: none;
            background: none;
            color: var(--white);
        }`);

        sheet.insertRule(`
        .${links.modal} label {
            display: inline-block;
            margin: 0 0 1vh 0.25vw;
            color: var(--white);
            font-size: 0.9rem;
        }`);

        sheet.insertRule(`
        .${links.modal} button {
            height: 4vh;
            min-width: 8vh;
            border-radius: 0.5vh 0.5vw;
            border: none;
            background-color: rgb(55, 138, 211);
            color: white;
        }`);

        sheet.insertRule(`
        .${links.modal} button:hover {
            background-color: #3ca4ff;
        }`);

        sheet.insertRule(`
        .${links.modal} .${quotas.api} {
            cursor: initial;
            margin-left: 0.5vw;
            color: var(--black);
            transition: color 0.5s linear 0s;
        }`);

        sheet.insertRule(`
        .${links.modal} input {
            margin-bottom: 1vh;
        }`);
    };

    const createIcon = (name: string, pathConfig: string) => {
        const SVG_NS = 'http://www.w3.org/2000/svg';

        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.classList.add('svg-icon', name);
        svg.setAttribute('width', '18');
        svg.setAttribute('height', '18');
        svg.setAttribute('viewBox', '0 0 18 18');
        svg.setAttribute('aria-hidden', 'true');

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', pathConfig);

        svg.append(path);
        return svg;
    };

    const createClearIcon = () =>
        createIcon(
            'iconClear',
            'M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z'
        );

    const createInputLabel = ({ id }: HTMLInputElement, text: string) => {
        const lbl = document.createElement('label');
        lbl.htmlFor = id;
        lbl.textContent = text;
        return lbl;
    };

    const createButton = (text: string) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = text;
        return btn;
    };

    const createQuotaInfo = (id: string, cls: string) => {
        const span = document.createElement('span');
        span.classList.add(cls);
        span.textContent = 'SE API quota remaining: ';

        const quota = document.createElement('span');
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

    const makeLinkMarkdown = (text: string, link: string) => `[${text}](${link})`;

    //for now, we are only interested in SO / Meta SO links
    const isStackExchangeLink = (link: string) =>
        /https?:\/\/(www\.)?(meta\.)?stack(?:overflow|exchange)\.com/.test(link);

    const fetchTitleFromAPI = async (link: string, quotaLeft: number) => {
        const version = 2.2;

        const base = `https://api.stackexchange.com/${version}`;

        const [, site = 'stackoverflow'] =
      link.match(/((?:meta\.)?[\w-]+)\.com/i) || [];

        //TODO: match comments
        const exprs = [
            `https?:\\/\\/${site}\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)`, //answers
            `https?:\\/\\/${site}\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)`, //questions
            `https?:\\/\\/${site}\\.com\\/(?:a|q)\\/(\\d+)`, //share links
        ];

        let id!: string;
        for (const regex of exprs) {
            const matcher = new RegExp(regex, 'i');
            const [, postId] = link.match(matcher) || [];
            if (!postId) continue;
            id = postId;
            break;
        }

        const noResponse = ['', quotaLeft] as const;

        if (!id) return noResponse;

        const res = await fetch(
            `${base}/posts/${id}?site=${site}&filter=Bqe1ika.a`
        );

        if (!res.ok) return noResponse;

        const { items, quota_remaining } = <ApiRes> await res.json();

        if (!items.length) return noResponse;

        const [{ title }] = items;
        return [title, quota_remaining] as const;
    };

    const fetchTitle = async (link: string) => {
        try {
            const res = await fetch(link);
            if (res.status !== 200) return '';

            const content = await res.text();

            const parsedDoc = new DOMParser().parseFromString(content, 'text/html');

            //try to get OpenGraph title;
            const meta = parsedDoc.querySelector<HTMLMetaElement>(
                "[property='og:title']"
            );

            const { title } = parsedDoc;
            return meta ? meta.content : title;
        } catch (error) {
            console.debug(`failed to fetch link or parse: ${error}`);
            return '';
        }
    };

    const getChatInputSelection = (anchorId: string) => {
        const selection = w.getSelection();
        if (!selection) return;
        const { anchorNode } = selection;
        if (!anchorNode || (<HTMLElement>anchorNode).id !== anchorId) return;
        return selection;
    };

    const insertLinkToMessage = (
        anchorId: string,
        inputId: string,
        link: string
    ) => {
        const existing = d.getElementById<HTMLTextAreaElement>(inputId);
        if (!existing) return false;

        const selection = getChatInputSelection(anchorId);
        const selectedText = selection?.toString() || '';

        existing.value = existing.value.replace(selectedText, link);
        return true;
    };

    const openExistingModal = (
        element: HTMLElement,
        selectedText: string,
        cls: string
    ) => {
        const { classList } = element;
        const isClosed = classList.contains(cls);

        const [_link, title] = [
            ...element.querySelectorAll<HTMLInputElement>('input'),
        ];
        title.value = selectedText;

        return isClosed && classList.remove(cls);
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
        const submitButton =
      modal.querySelector<HTMLButtonElement>('[type=button]');
        if (submitButton) refocusChatInput(submitButton, inputId);
    };

    const openModal = (modal: HTMLElement, openCls: string) => {
        modal.classList.remove(openCls);
    };

    const openLinkModal = ({ ids, classes }: Config) => {
        const selection = getChatInputSelection(ids.chat.anchor);

        const {
            styles: { collapsed },
        } = classes;

        const { chat } = ids;

        const selectedText = selection?.toString() || '';

        const existing = d.getElementById(ids.links.modal);
        if (existing) return openExistingModal(existing, selectedText, collapsed);

        const modal = d.createElement('div');
        modal.classList.add(
            classes.links.modal,
            classes.styles.primaryBckg,
            collapsed
        );
        modal.id = ids.links.modal;

        const closeIcon = createClearIcon();
        closeIcon.addEventListener('click', () =>
            closeModal(modal, collapsed, chat.input)
        );

        const form = d.createElement('form');
        form.id = ids.links.form;

        const linkInput = d.createElement('input');
        linkInput.type = 'text';

        const titleInput = d.createElement('input');
        titleInput.type = 'text';
        titleInput.value = selectedText;

        const quotaInfo = createQuotaInfo(ids.quotas.api, classes.quotas.api);

        let quota = 300;
        linkInput.addEventListener('change', async () => {
            const { value } = linkInput;

            const isSElink = isStackExchangeLink(value);

            if (isSElink) {
                const [title, quotaLeft] = await fetchTitleFromAPI(value, quota);
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

        const linkLbl = createInputLabel(linkInput, 'Link');
        const titleLbl = createInputLabel(titleInput, 'Title');

        const submit = createButton('Add link');
        submit.addEventListener('click', () => {
            const createdLink = makeLinkMarkdown(titleInput.value, linkInput.value);
            insertLinkToMessage(chat.anchor, chat.input, createdLink);
            closeModal(modal, collapsed, chat.input);
        });

        form.append(linkLbl, linkInput, titleLbl, titleInput, submit, quotaInfo);
        modal.append(closeIcon, form);

        const { body } = d;
        body.append(modal);

        return openModal(modal, collapsed);
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
            key: 'L',
            ctrl: true,
            shift: false,
            caseSensitive: false,
            action: openLinkModal,
        },
    ];

    d.addEventListener('keydown', (event) => {
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
})(window, document);
