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

"use strict";var __awaiter=this&&this.__awaiter||function(t,o,s,l){return new(s=s||Promise)(function(n,e){function i(t){try{a(l.next(t))}catch(t){e(t)}}function r(t){try{a(l.throw(t))}catch(t){e(t)}}function a(t){var e;t.done?n(t.value):((e=t.value)instanceof s?e:new s(function(t){t(e)})).then(i,r)}a((l=l.apply(t,o||[])).next())})};((l,k)=>{const s={ids:{chat:{input:"input",anchor:"bubble"},links:{form:"link-form",modal:"link-modal",linkInput:"link-url",titleInput:"link-title"},quotas:{api:"api-quotas"}},classes:{buttons:{primary:"btn-primary",secondary:"btn-secondary"},links:{modal:"link-modal"},styles:{collapsed:"collapsed",primaryBckg:"bckg-primary",primaryColor:"color-primary"},quotas:{api:"api-quotas"}}};const w=(t,e)=>{var n="http://www.w3.org/2000/svg";const i=document.createElementNS(n,"svg");i.classList.add("svg-icon",t),i.setAttribute("width","18"),i.setAttribute("height","18"),i.setAttribute("viewBox","0 0 18 18"),i.setAttribute("aria-hidden","true");const r=document.createElementNS(n,"path");return r.setAttribute("d",e),i.append(r),i},b=({id:t},e)=>{const n=document.createElement("label");return n.htmlFor=t,n.textContent=e,n},E=(t,...e)=>{const n=document.createElement("button");return n.type="button",n.textContent=t,n.classList.add(...e),n},a=t=>/^(?:https?:\/\/)|www\.|javascript:.+?/.test(t),$=(r,a,o)=>__awaiter(void 0,void 0,void 0,function*(){const t=new URL(`https://api.stackexchange.com/2.2${a}`);t.search=new URLSearchParams({key:"nWopg6u2CiSfx8SXs3dyVg((",site:r,filter:o}).toString();const e=yield fetch(t.toString());if(!e.ok)return[[]];var{items:n=[],quota_remaining:i}=yield e.json();return[n,i]}),x=t=>{if(!t)return"";var{body_markdown:e,creation_date:n,owner:{display_name:t}}=t;return`${e} by ${t} on ${new Date(1e3*n).toLocaleDateString()}`},i=(t,e)=>{t.blur();const n=k.getElementById(e);n&&n.focus()},S=(t,e,n)=>{t.classList.add(e);t=t.querySelector("[type=button]");t&&i(t,n)},I=(t,e)=>{t.classList.remove(e);const n=[...t.querySelectorAll("input")][0];return n.focus(),t},L=(t,e,n)=>{var i=a(n);const r=i?t:e;r.value=n;n=new UIEvent("change",{bubbles:!0,cancelable:!0});i&&r.dispatchEvent(n)},e=(t,e,n)=>{const{selectionStart:i,selectionEnd:r,selectionDirection:a,value:o}=t;var s=o.slice(0,i),l=o.slice(i,r),c=o.slice(r);t.value=`${s}${e}${l}${n}${c}`,t.setSelectionRange(i+e.length,r+n.length,a)};(t=>{var e,n,i,r,a=k.createElement("style");k.head.append(a);const o=a["sheet"];o&&({classes:{buttons:{primary:i,secondary:r},links:{modal:e},styles:n,quotas:a}}=t,o.insertRule(`
        :root {
            --white: #c4c8cc;
            --black: #2d2d2d;
            --button-primary: #378ad3;
        }`),o.insertRule(`
        .${n.primaryBckg} {
            background-color: var(--black) !important;
        }`),o.insertRule(`
        .${n.primaryColor} {
            color: var(--white) !important;
        }`),o.insertRule(`
        .${e} .iconClear {
            position: absolute;
            top: 0;
            right: 0;
            margin: 1vh;
            fill: var(--white);
            cursor: pointer;
        }`),o.insertRule(`
        .${e} {
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
        }`),o.insertRule(`
        .${n.collapsed} {
            max-width: 0px !important;
            max-height: 0px !important;
        }`),o.insertRule(`
        .${e} form {
            padding: 1vh 1vw;
        }`),o.insertRule(`
        .${e} input {
            box-sizing: border-box;
            border-radius: 0.5vh;
            padding: 1vh 1vw;
            width: 100%;
            outline: none;
            background: none;
            color: var(--white);
        }`),o.insertRule(`
        .${e} label {
            display: inline-block;
            margin: 0 0 1vh 0.25vw;
            color: var(--white);
            font-size: 0.9rem;
        }`),t=o,n=e,i=i,r=r,t.insertRule(`
        .${n} .${i},
        .${n} .${r} {
            height: 4vh;
            min-width: 8vh;
            outline: none;
            border: none;
            border-radius: 0.5vh 0.5vh;
            cursor: pointer;
        }`),t.insertRule(`
        .${n} .${i} {
            background-color: rgb(55, 138, 211);
            color: white;
        }`),t.insertRule(`
        .${n} .${r} {
            background-color: unset;
            color: var(--white);
        }`),t.insertRule(`
        .${n} .${i}:hover,
        .${n} .${i}:focus {
            background-color: #3ca4ff;
        }`),o.insertRule(`
        .${e} .${a.api} {
            cursor: initial;
            margin-left: 0.5vw;
            color: var(--black);
            transition: color 0.5s linear 0s;
        }`),o.insertRule(`
        .${e} input {
            margin-bottom: 1vh;
        }`),o.insertRule(`
        .${e}[draggable=true] {
            cursor: move;
        }`))})(s);const c=[{key:"S",ctrl:!0,shift:!0,caseSensitive:!1,action:t=>{t=t.ids.chat.input,t=k.getElementById(t);return!!t&&(e(t,"---","---"),!0)}},{key:"B",ctrl:!0,shift:!1,caseSensitive:!1,action:t=>{t=t.ids.chat.input,t=k.getElementById(t);return!!t&&(e(t,"**","**"),!0)}},{key:"I",ctrl:!0,shift:!1,caseSensitive:!1,action:t=>{t=t.ids.chat.input,t=k.getElementById(t);return!!t&&(e(t,"*","*"),!0)}},{key:"L",ctrl:!0,shift:!1,caseSensitive:!1,action:({ids:i,classes:r})=>{const e=r.styles["collapsed"];var t=k.getElementById(i.chat.input);if(!t)return null;const{selectionStart:n,selectionEnd:a,value:o}=t;var s=o.slice(n,a),l=k.getElementById(i.links.modal);if(l)return((t,e,n,i)=>{var[r,a]=[...t.querySelectorAll("input")];return L(r,a,e),t.classList.contains(n)?I(t,n):S(t,n,i)})(l,s,e,i.chat.input);const c=k.createElement("div");c.classList.add(r.links.modal,r.styles.primaryBckg,e),c.id=i.links.modal,c.draggable=!0;const d=w("iconClear","M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z");d.addEventListener("click",()=>S(c,e,i.chat.input));const u=k.createElement("form");u.id=i.links.form;const p=k.createElement("input");p.type="text",p.id=i.links.linkInput;const v=k.createElement("input");v.type="text",v.id=i.links.titleInput;var m=((t,e)=>{const n=document.createElement("span");n.classList.add(e),n.textContent="SE API quota remaining: ";const i=document.createElement("span");return i.id=t,n.append(i),n})(i.quotas.api,r.quotas.api);let h=300;p.addEventListener("change",()=>__awaiter(void 0,void 0,void 0,function*(){var l,c,a,t=p["value"];if(/https?:\/\/(www\.)?(meta\.)?(?:stack(?:overflow|exchange|apps)|superuser|askubuntu)\.com/.test(t)){var[e,n]=(l=t,c=h,yield __awaiter(void 0,void 0,void 0,function*(){const[,n="stackoverflow"]=l.match(/((?:meta\.)?[\w-]+)\.com/i)||[];var t=[`https?:\\/\\/${n}\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)`,`https?:\\/\\/${n}\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)`,`https?:\\/\\/${n}\\.com\\/(?:a|q)\\/(\\d+)`];let i;for(const s of t){var e=new RegExp(s,"i"),[,e]=l.match(e)||[];if(e){i=e;break}}t=["",c];const[,r]=l.match(new RegExp(`https?:\\/\\/${n}\\.com.+?#comment(\\d+)`,"i"))||[],a=[[!!r,()=>__awaiter(void 0,void 0,void 0,function*(){var[[t],e]=yield $(n,`/comments/${r}`,"7W_5HvYg2");return[x(t),e||c]})],[!!i,()=>__awaiter(void 0,void 0,void 0,function*(){var[[{title:t}],e]=yield $(n,`/posts/${i}`,"Bqe1ika.a");return[t,e||c]})]],[,o]=a.find(([t])=>!!t)||[];return o?yield o():t}));return v.value||(v.value=e),h=n,((t,e,n)=>{const i=k.getElementById(t);if(i){const r=i["parentElement"];r&&(i.textContent=n.toString(),r.classList.add(e),setTimeout(()=>r.classList.remove(e),3e3))}})(i.quotas.api,r.styles.primaryColor,h)}v.value||(v.value=(a=t,yield __awaiter(void 0,void 0,void 0,function*(){try{const i=yield fetch(a);if(200!==i.status)return"";var t=yield i.text();const r=(new DOMParser).parseFromString(t,"text/html");var e=r.querySelector("[property='og:title']"),n=r["title"];return e?e.content:n}catch(t){return console.debug(`failed to fetch link or parse: ${t}`),""}})))}));t=b(p,"Link"),l=b(v,"Title");const y=E("Add link","btn-primary");y.addEventListener("click",()=>{var t=`[${v.value}](${p.value})`;((t,e)=>{const n=k.getElementById(t);if(!n)return;const{selectionStart:i,selectionEnd:r,value:a}=n;if(i===r)return n.value+=e;t=a.slice(i,r);n.value=a.replace(t,e)})(i.chat.input,t),S(c,e,i.chat.input)});const g=E("Clear","btn-secondary");g.addEventListener("click",()=>u.reset()),L(p,v,s),u.append(t,p,l,v,y,g,m),c.append(d,u);const f=k["body"];return f.append(c),I(c,e)}},{key:"Escape",ctrl:!1,shift:!1,caseSensitive:!1,action:({ids:t,classes:e})=>{var n=k.getElementById(t.links.modal);return n&&S(n,e.styles.collapsed,t.chat.input),n}}];k.addEventListener("keydown",t=>{const{ctrlKey:e,metaKey:n,shiftKey:i,key:r}=t;var a=c.find(t=>(({ctrl:t,shift:e},n,i,r)=>(n===t||i===t)&&r===e)(t,e,n,i)&&(({key:t,caseSensitive:e},n)=>e?t===n:t.toUpperCase()===n.toUpperCase())(t,r));if(a){t.preventDefault();const o=a["action"];o(s,a)}});const d=s.ids.links.modal;k.addEventListener("dragstart",({dataTransfer:t})=>{const e=k.createElement("img");e.src="data:image/png;base64,AAAAAA==",null!=t&&t.setDragImage(e,0,0)});let u=0,p=0,n=0,r=!1;const o=({clientX:n,clientY:i})=>{var r=k.getElementById(d);if(r){u=u||n,p=p||i;let{style:{top:t,left:e}}=r;t||e||(o=l.getComputedStyle(r),t=o.top,e=o.left);var a=n-u,o=i-p;const s=r["style"];s.left=`${parseInt(e)+a}px`,s.top=`${parseInt(t)+o}px`,u=n,p=i}};k.addEventListener("dragstart",t=>{if((({ids:{links:t}})=>{const e=k["activeElement"];return[t.linkInput,t.titleInput].some(t=>k.getElementById(t)===e)})(s))return t.preventDefault();var t=t["target"];t===k.getElementById(d)&&(r=!0)}),k.addEventListener("dragend",({target:t})=>{t===k.getElementById(d)&&(r=!1,u=0,p=0)}),k.addEventListener("drag",t=>{if(n=t.clientX?0:n<3?n+1:3,!(3<=n)&&r)return o(t)}),k.addEventListener("dragover",t=>{if(r&&t.preventDefault(),!(n<3)&&r)return o(t)})})(window,document);