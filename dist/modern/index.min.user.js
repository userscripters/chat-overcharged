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
// @version         1.8.0
// ==/UserScript==

"use strict";var __awaiter=this&&this.__awaiter||function(t,o,s,l){return new(s=s||Promise)(function(n,e){function r(t){try{a(l.next(t))}catch(t){e(t)}}function i(t){try{a(l.throw(t))}catch(t){e(t)}}function a(t){var e;t.done?n(t.value):((e=t.value)instanceof s?e:new s(function(t){t(e)})).then(r,i)}a((l=l.apply(t,o||[])).next())})};((l,w)=>{const s={ids:{chat:{input:"input",anchor:"bubble"},links:{form:"link-form",modal:"link-modal",linkInput:"link-url",titleInput:"link-title"},quotas:{api:"api-quotas"}},classes:{buttons:{primary:"btn-primary",secondary:"btn-secondary"},links:{modal:"link-modal"},styles:{collapsed:"collapsed",primaryBckg:"bckg-primary",primaryColor:"color-primary"},quotas:{api:"api-quotas"}}};const b=(t,e)=>{var n="http://www.w3.org/2000/svg";const r=document.createElementNS(n,"svg");r.classList.add("svg-icon",t),r.setAttribute("width","18"),r.setAttribute("height","18"),r.setAttribute("viewBox","0 0 18 18"),r.setAttribute("aria-hidden","true");const i=document.createElementNS(n,"path");return i.setAttribute("d",e),r.append(i),r},k=({id:t},e)=>{const n=document.createElement("label");return n.htmlFor=t,n.textContent=e,n},E=(t,...e)=>{const n=document.createElement("button");return n.type="button",n.textContent=t,n.classList.add(...e),n},a=t=>/^(?:https?:\/\/)|www\.|javascript:.+?/.test(t),$=(i,a,o)=>__awaiter(void 0,void 0,void 0,function*(){const t=new URL(`https://api.stackexchange.com/2.2${a}`);t.search=new URLSearchParams({key:"nWopg6u2CiSfx8SXs3dyVg((",site:i,filter:o}).toString();const e=yield fetch(t.toString());if(!e.ok)return[[]];var{items:n=[],quota_remaining:r}=yield e.json();return[n,r]}),x=t=>{if(!t)return"";var{body_markdown:e,creation_date:n,owner:{display_name:t}}=t;return`${e} by ${t} on ${new Date(1e3*n).toLocaleDateString()}`},r=(t,e)=>{t.blur();const n=w.getElementById(e);n&&n.focus()},L=(t,e,n)=>{t.classList.add(e);t=t.querySelector("[type=button]");t&&r(t,n)},I=(t,e)=>{t.classList.remove(e);const n=[...t.querySelectorAll("input")][0];return n.focus(),t},S=(t,e,n)=>{var r=a(n);const i=r?t:e;i.value=n;n=new UIEvent("change",{bubbles:!0,cancelable:!0});r&&i.dispatchEvent(n)};(t=>{var e,n,r,i,a=w.createElement("style");w.head.append(a);const o=a["sheet"];o&&({classes:{buttons:{primary:r,secondary:i},links:{modal:e},styles:n,quotas:a}}=t,o.insertRule(`
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
        }`),t=o,n=e,r=r,i=i,t.insertRule(`
        .${n} .${r},
        .${n} .${i} {
            height: 4vh;
            min-width: 8vh;
            outline: none;
            border: none;
            border-radius: 0.5vh 0.5vh;
            cursor: pointer;
        }`),t.insertRule(`
        .${n} .${r} {
            background-color: rgb(55, 138, 211);
            color: white;
        }`),t.insertRule(`
        .${n} .${i} {
            background-color: unset;
            color: var(--white);
        }`),t.insertRule(`
        .${n} .${r}:hover,
        .${n} .${r}:focus {
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
        }`))})(s);const c=[{key:"L",ctrl:!0,shift:!1,caseSensitive:!1,action:({ids:r,classes:i})=>{const e=i.styles["collapsed"];var t=w.getElementById(r.chat.input);if(!t)return null;const{selectionStart:n,selectionEnd:a,value:o}=t;var s=o.slice(n,a),l=w.getElementById(r.links.modal);if(l)return((t,e,n,r)=>{var[i,a]=[...t.querySelectorAll("input")];return S(i,a,e),t.classList.contains(n)?I(t,n):L(t,n,r)})(l,s,e,r.chat.input);const c=w.createElement("div");c.classList.add(i.links.modal,i.styles.primaryBckg,e),c.id=r.links.modal,c.draggable=!0;const d=b("iconClear","M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41z");d.addEventListener("click",()=>L(c,e,r.chat.input));const u=w.createElement("form");u.id=r.links.form;const p=w.createElement("input");p.type="text",p.id=r.links.linkInput;const v=w.createElement("input");v.type="text",v.id=r.links.titleInput;var m=((t,e)=>{const n=document.createElement("span");n.classList.add(e),n.textContent="SE API quota remaining: ";const r=document.createElement("span");return r.id=t,n.append(r),n})(r.quotas.api,i.quotas.api);let h=300;p.addEventListener("change",()=>__awaiter(void 0,void 0,void 0,function*(){var l,c,a,t=p["value"];if(/https?:\/\/(www\.)?(meta\.)?(?:stack(?:overflow|exchange|apps)|superuser|askubuntu)\.com/.test(t)){var[e,n]=(l=t,c=h,yield __awaiter(void 0,void 0,void 0,function*(){const[,n="stackoverflow"]=l.match(/((?:meta\.)?[\w-]+)\.com/i)||[];var t=[`https?:\\/\\/${n}\\.com\\/questions\\/\\d+\\/.+?\\/(\\d+)`,`https?:\\/\\/${n}\\.com\\/questions\\/(\\d+)\\/.+?(?:\\/(\\d+)|$)`,`https?:\\/\\/${n}\\.com\\/(?:a|q)\\/(\\d+)`];let r;for(const s of t){var e=new RegExp(s,"i"),[,e]=l.match(e)||[];if(e){r=e;break}}t=["",c];const[,i]=l.match(new RegExp(`https?:\\/\\/${n}\\.com.+?#comment(\\d+)`,"i"))||[],a=[[!!i,()=>__awaiter(void 0,void 0,void 0,function*(){var[[t],e]=yield $(n,`/comments/${i}`,"7W_5HvYg2");return[x(t),e||c]})],[!!r,()=>__awaiter(void 0,void 0,void 0,function*(){var[[{title:t}],e]=yield $(n,`/posts/${r}`,"Bqe1ika.a");return[t,e||c]})]],[,o]=a.find(([t])=>!!t)||[];return o?yield o():t}));return v.value||(v.value=e),h=n,((t,e,n)=>{const r=w.getElementById(t);if(r){const i=r["parentElement"];i&&(r.textContent=n.toString(),i.classList.add(e),setTimeout(()=>i.classList.remove(e),3e3))}})(r.quotas.api,i.styles.primaryColor,h)}v.value||(v.value=(a=t,yield __awaiter(void 0,void 0,void 0,function*(){try{const r=yield fetch(a);if(200!==r.status)return"";var t=yield r.text();const i=(new DOMParser).parseFromString(t,"text/html");var e=i.querySelector("[property='og:title']"),n=i["title"];return e?e.content:n}catch(t){return console.debug(`failed to fetch link or parse: ${t}`),""}})))}));t=k(p,"Link"),l=k(v,"Title");const y=E("Add link","btn-primary");y.addEventListener("click",()=>{var t=`[${v.value}](${p.value})`;((t,e)=>{const n=w.getElementById(t);if(!n)return;const{selectionStart:r,selectionEnd:i,value:a}=n;if(r===i)return n.value+=e;t=a.slice(r,i);n.value=a.replace(t,e)})(r.chat.input,t),L(c,e,r.chat.input)});const g=E("Clear","btn-secondary");g.addEventListener("click",()=>u.reset()),S(p,v,s),u.append(t,p,l,v,y,g,m),c.append(d,u);const f=w["body"];return f.append(c),I(c,e)}},{key:"Escape",ctrl:!1,shift:!1,caseSensitive:!1,action:({ids:t,classes:e})=>{var n=w.getElementById(t.links.modal);return n&&L(n,e.styles.collapsed,t.chat.input),n}}];w.addEventListener("keydown",t=>{const{ctrlKey:e,metaKey:n,shiftKey:r,key:i}=t;var a=c.find(t=>(({ctrl:t,shift:e},n,r,i)=>(n===t||r===t)&&i===e)(t,e,n,r)&&(({key:t,caseSensitive:e},n)=>e?t===n:t.toUpperCase()===n.toUpperCase())(t,i));if(a){t.preventDefault();const o=a["action"];o(s,a)}});const e=s.ids.links.modal;w.addEventListener("dragstart",({dataTransfer:t})=>{const e=w.createElement("img");e.src="data:image/png;base64,AAAAAA==",null!=t&&t.setDragImage(e,0,0)});let d=0,u=0,n=0,i=!1;const o=({clientX:n,clientY:r})=>{var i=w.getElementById(e);if(i){d=d||n,u=u||r;let{style:{top:t,left:e}}=i;t||e||(o=l.getComputedStyle(i),t=o.top,e=o.left);var a=n-d,o=r-u;const s=i["style"];s.left=`${parseInt(e)+a}px`,s.top=`${parseInt(t)+o}px`,d=n,u=r}};w.addEventListener("dragstart",t=>{if((({ids:{links:t}})=>{const e=w["activeElement"];return[t.linkInput,t.titleInput].some(t=>w.getElementById(t)===e)})(s))return t.preventDefault();var t=t["target"];t===w.getElementById(e)&&(i=!0)}),w.addEventListener("dragend",({target:t})=>{t===w.getElementById(e)&&(i=!1,d=0,u=0)}),w.addEventListener("drag",t=>{if(n=t.clientX?0:n<3?n+1:3,!(3<=n)&&i)return o(t)}),w.addEventListener("dragover",t=>{if(t.preventDefault(),!(n<3)&&i)return o(t)})})(window,document);