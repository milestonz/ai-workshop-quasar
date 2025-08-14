const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MainLayout-CbUPrBs9.js","assets/QDialog-CXn2kBax.js","assets/QChip-BJIOjoIv.js","assets/_plugin-vue_export-helper-DXafCR7g.js","assets/QLayout-s6SDzMwt.js","assets/use-checkbox-Hdp5Jlzs.js","assets/QSeparator-Chi7pIZw.js","assets/GuestLoginDialog-C7xr6EXW.js","assets/useGuestAuth-Mxd3jo-z.js","assets/pinia-DRC1X92K.js","assets/QBanner-BY0ggvyL.js","assets/GuestLoginDialog-CO-sD7Pe.css","assets/marked.esm-mI6KSz_d.js","assets/MainLayout-iA6VSpwX.css","assets/IndexPage-BLAmILuN.js","assets/QPage-B1iJaq8H.js","assets/QSpinnerDots-DmD6LJEW.js","assets/IndexPage-BrNRmG7v.css","assets/SurveyResults-DhayuQfj.js","assets/survey-DXHWirsQ.js","assets/PollResultBar-Bydgm1gR.js","assets/PollResultBar-C3-Zmgie.css","assets/LogoutPage-D1GfaPnm.js","assets/LogoutPage-DiXRWHA0.css","assets/PollResultPage-B3rDVM-7.js","assets/PollResultPage-CzQ9mg6m.css","assets/StudentView-ZIAbzNqK.js","assets/StudentView-B_NZFY6r.css","assets/pinia-CU9SUkzn.js"])))=>i.map(i=>d[i]);
const KC=function(){const e=typeof document<"u"&&document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),QC=function(t){return"/"+t},em={},xs=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let o=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");r=o(n.map(u=>{if(u=QC(u),u in em)return;em[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":KC,h||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),h)return new Promise((m,E)=>{p.addEventListener("load",m),p.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})};/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function sf(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Be={},Ei=[],$n=()=>{},YC=()=>!1,$c=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),rf=t=>t.startsWith("onUpdate:"),gt=Object.assign,of=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},XC=Object.prototype.hasOwnProperty,Me=(t,e)=>XC.call(t,e),he=Array.isArray,wi=t=>jc(t)==="[object Map]",Pv=t=>jc(t)==="[object Set]",me=t=>typeof t=="function",nt=t=>typeof t=="string",dr=t=>typeof t=="symbol",Ke=t=>t!==null&&typeof t=="object",kv=t=>(Ke(t)||me(t))&&me(t.then)&&me(t.catch),Nv=Object.prototype.toString,jc=t=>Nv.call(t),JC=t=>jc(t).slice(8,-1),xv=t=>jc(t)==="[object Object]",af=t=>nt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Oo=sf(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),qc=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},ZC=/-(\w)/g,_n=qc(t=>t.replace(ZC,(e,n)=>n?n.toUpperCase():"")),eS=/\B([A-Z])/g,Yr=qc(t=>t.replace(eS,"-$1").toLowerCase()),Hc=qc(t=>t.charAt(0).toUpperCase()+t.slice(1)),rh=qc(t=>t?`on${Hc(t)}`:""),Hs=(t,e)=>!Object.is(t,e),ih=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Gh=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},tS=t=>{const e=parseFloat(t);return isNaN(e)?t:e},nS=t=>{const e=nt(t)?Number(t):NaN;return isNaN(e)?t:e};let tm;const Wc=()=>tm||(tm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function lf(t){if(he(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=nt(s)?oS(s):lf(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(nt(t)||Ke(t))return t}const sS=/;(?![^(]*\))/g,rS=/:([^]+)/,iS=/\/\*[^]*?\*\//g;function oS(t){const e={};return t.replace(iS,"").split(sS).forEach(n=>{if(n){const s=n.split(rS);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function cf(t){let e="";if(nt(t))e=t;else if(he(t))for(let n=0;n<t.length;n++){const s=cf(t[n]);s&&(e+=s+" ")}else if(Ke(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const aS="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",lS=sf(aS);function Dv(t){return!!t||t===""}const Ov=t=>!!(t&&t.__v_isRef===!0),cS=t=>nt(t)?t:t==null?"":he(t)||Ke(t)&&(t.toString===Nv||!me(t.toString))?Ov(t)?cS(t.value):JSON.stringify(t,Mv,2):String(t),Mv=(t,e)=>Ov(e)?Mv(t,e.value):wi(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[oh(s,i)+" =>"]=r,n),{})}:Pv(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>oh(n))}:dr(e)?oh(e):Ke(e)&&!he(e)&&!xv(e)?String(e):e,oh=(t,e="")=>{var n;return dr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Dt;class Lv{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Dt,!e&&Dt&&(this.index=(Dt.scopes||(Dt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Dt;try{return Dt=this,e()}finally{Dt=n}}}on(){++this._on===1&&(this.prevScope=Dt,Dt=this)}off(){this._on>0&&--this._on===0&&(Dt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function x2(t){return new Lv(t)}function uS(){return Dt}function D2(t,e=!1){Dt&&Dt.cleanups.push(t)}let je;const ah=new WeakSet;class Vv{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Dt&&Dt.active&&Dt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ah.has(this)&&(ah.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Uv(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,nm(this),Bv(this);const e=je,n=An;je=this,An=!0;try{return this.fn()}finally{$v(this),je=e,An=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)df(e);this.deps=this.depsTail=void 0,nm(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ah.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Kh(this)&&this.run()}get dirty(){return Kh(this)}}let Fv=0,Mo,Lo;function Uv(t,e=!1){if(t.flags|=8,e){t.next=Lo,Lo=t;return}t.next=Mo,Mo=t}function uf(){Fv++}function hf(){if(--Fv>0)return;if(Lo){let e=Lo;for(Lo=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Mo;){let e=Mo;for(Mo=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Bv(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function $v(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),df(s),hS(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function Kh(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(jv(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function jv(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===sa)||(t.globalVersion=sa,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Kh(t))))return;t.flags|=2;const e=t.dep,n=je,s=An;je=t,An=!0;try{Bv(t);const r=t.fn(t._value);(e.version===0||Hs(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{je=n,An=s,$v(t),t.flags&=-3}}function df(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)df(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function hS(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let An=!0;const qv=[];function fs(){qv.push(An),An=!1}function ps(){const t=qv.pop();An=t===void 0?!0:t}function nm(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=je;je=void 0;try{e()}finally{je=n}}}let sa=0;class dS{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ff{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!je||!An||je===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==je)n=this.activeLink=new dS(je,this),je.deps?(n.prevDep=je.depsTail,je.depsTail.nextDep=n,je.depsTail=n):je.deps=je.depsTail=n,Hv(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=je.depsTail,n.nextDep=void 0,je.depsTail.nextDep=n,je.depsTail=n,je.deps===n&&(je.deps=s)}return n}trigger(e){this.version++,sa++,this.notify(e)}notify(e){uf();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{hf()}}}function Hv(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Hv(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Kl=new WeakMap,Dr=Symbol(""),Qh=Symbol(""),ra=Symbol("");function Mt(t,e,n){if(An&&je){let s=Kl.get(t);s||Kl.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new ff),r.map=s,r.key=n),r.track()}}function os(t,e,n,s,r,i){const o=Kl.get(t);if(!o){sa++;return}const a=c=>{c&&c.trigger()};if(uf(),e==="clear")o.forEach(a);else{const c=he(t),u=c&&af(n);if(c&&n==="length"){const h=Number(s);o.forEach((d,p)=>{(p==="length"||p===ra||!dr(p)&&p>=h)&&a(d)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(ra)),e){case"add":c?u&&a(o.get("length")):(a(o.get(Dr)),wi(t)&&a(o.get(Qh)));break;case"delete":c||(a(o.get(Dr)),wi(t)&&a(o.get(Qh)));break;case"set":wi(t)&&a(o.get(Dr));break}}hf()}function fS(t,e){const n=Kl.get(t);return n&&n.get(e)}function oi(t){const e=ke(t);return e===t?e:(Mt(e,"iterate",ra),pn(t)?e:e.map(bt))}function zc(t){return Mt(t=ke(t),"iterate",ra),t}const pS={__proto__:null,[Symbol.iterator](){return lh(this,Symbol.iterator,bt)},concat(...t){return oi(this).concat(...t.map(e=>he(e)?oi(e):e))},entries(){return lh(this,"entries",t=>(t[1]=bt(t[1]),t))},every(t,e){return ns(this,"every",t,e,void 0,arguments)},filter(t,e){return ns(this,"filter",t,e,n=>n.map(bt),arguments)},find(t,e){return ns(this,"find",t,e,bt,arguments)},findIndex(t,e){return ns(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return ns(this,"findLast",t,e,bt,arguments)},findLastIndex(t,e){return ns(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return ns(this,"forEach",t,e,void 0,arguments)},includes(...t){return ch(this,"includes",t)},indexOf(...t){return ch(this,"indexOf",t)},join(t){return oi(this).join(t)},lastIndexOf(...t){return ch(this,"lastIndexOf",t)},map(t,e){return ns(this,"map",t,e,void 0,arguments)},pop(){return mo(this,"pop")},push(...t){return mo(this,"push",t)},reduce(t,...e){return sm(this,"reduce",t,e)},reduceRight(t,...e){return sm(this,"reduceRight",t,e)},shift(){return mo(this,"shift")},some(t,e){return ns(this,"some",t,e,void 0,arguments)},splice(...t){return mo(this,"splice",t)},toReversed(){return oi(this).toReversed()},toSorted(t){return oi(this).toSorted(t)},toSpliced(...t){return oi(this).toSpliced(...t)},unshift(...t){return mo(this,"unshift",t)},values(){return lh(this,"values",bt)}};function lh(t,e,n){const s=zc(t),r=s[e]();return s!==t&&!pn(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.value&&(i.value=n(i.value)),i}),r}const gS=Array.prototype;function ns(t,e,n,s,r,i){const o=zc(t),a=o!==t&&!pn(t),c=o[e];if(c!==gS[e]){const d=c.apply(t,i);return a?bt(d):d}let u=n;o!==t&&(a?u=function(d,p){return n.call(this,bt(d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const h=c.call(o,u,s);return a&&r?r(h):h}function sm(t,e,n,s){const r=zc(t);let i=n;return r!==t&&(pn(t)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,t)}):i=function(o,a,c){return n.call(this,o,bt(a),c,t)}),r[e](i,...s)}function ch(t,e,n){const s=ke(t);Mt(s,"iterate",ra);const r=s[e](...n);return(r===-1||r===!1)&&mf(n[0])?(n[0]=ke(n[0]),s[e](...n)):r}function mo(t,e,n=[]){fs(),uf();const s=ke(t)[e].apply(t,n);return hf(),ps(),s}const mS=sf("__proto__,__v_isRef,__isVue"),Wv=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(dr));function _S(t){dr(t)||(t=String(t));const e=ke(this);return Mt(e,"has",t),e.hasOwnProperty(t)}class zv{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?AS:Yv:i?Qv:Kv).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=he(e);if(!r){let c;if(o&&(c=pS[n]))return c;if(n==="hasOwnProperty")return _S}const a=Reflect.get(e,n,St(e)?e:s);return(dr(n)?Wv.has(n):mS(n))||(r||Mt(e,"get",n),i)?a:St(a)?o&&af(n)?a:a.value:Ke(a)?r?Jv(a):Wi(a):a}}class Gv extends zv{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];if(!this._isShallow){const c=Js(i);if(!pn(s)&&!Js(s)&&(i=ke(i),s=ke(s)),!he(e)&&St(i)&&!St(s))return c?!1:(i.value=s,!0)}const o=he(e)&&af(n)?Number(n)<e.length:Me(e,n),a=Reflect.set(e,n,s,St(e)?e:r);return e===ke(r)&&(o?Hs(s,i)&&os(e,"set",n,s):os(e,"add",n,s)),a}deleteProperty(e,n){const s=Me(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&os(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!dr(n)||!Wv.has(n))&&Mt(e,"has",n),s}ownKeys(e){return Mt(e,"iterate",he(e)?"length":Dr),Reflect.ownKeys(e)}}class yS extends zv{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const vS=new Gv,ES=new yS,wS=new Gv(!0);const Yh=t=>t,gl=t=>Reflect.getPrototypeOf(t);function TS(t,e,n){return function(...s){const r=this.__v_raw,i=ke(r),o=wi(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=r[t](...s),h=n?Yh:e?Ql:bt;return!e&&Mt(i,"iterate",c?Qh:Dr),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:a?[h(d[0]),h(d[1])]:h(d),done:p}},[Symbol.iterator](){return this}}}}function ml(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function IS(t,e){const n={get(r){const i=this.__v_raw,o=ke(i),a=ke(r);t||(Hs(r,a)&&Mt(o,"get",r),Mt(o,"get",a));const{has:c}=gl(o),u=e?Yh:t?Ql:bt;if(c.call(o,r))return u(i.get(r));if(c.call(o,a))return u(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&Mt(ke(r),"iterate",Dr),Reflect.get(r,"size",r)},has(r){const i=this.__v_raw,o=ke(i),a=ke(r);return t||(Hs(r,a)&&Mt(o,"has",r),Mt(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,c=ke(a),u=e?Yh:t?Ql:bt;return!t&&Mt(c,"iterate",Dr),a.forEach((h,d)=>r.call(i,u(h),u(d),o))}};return gt(n,t?{add:ml("add"),set:ml("set"),delete:ml("delete"),clear:ml("clear")}:{add(r){!e&&!pn(r)&&!Js(r)&&(r=ke(r));const i=ke(this);return gl(i).has.call(i,r)||(i.add(r),os(i,"add",r,r)),this},set(r,i){!e&&!pn(i)&&!Js(i)&&(i=ke(i));const o=ke(this),{has:a,get:c}=gl(o);let u=a.call(o,r);u||(r=ke(r),u=a.call(o,r));const h=c.call(o,r);return o.set(r,i),u?Hs(i,h)&&os(o,"set",r,i):os(o,"add",r,i),this},delete(r){const i=ke(this),{has:o,get:a}=gl(i);let c=o.call(i,r);c||(r=ke(r),c=o.call(i,r)),a&&a.call(i,r);const u=i.delete(r);return c&&os(i,"delete",r,void 0),u},clear(){const r=ke(this),i=r.size!==0,o=r.clear();return i&&os(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=TS(r,t,e)}),n}function pf(t,e){const n=IS(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(Me(n,r)&&r in s?n:s,r,i)}const bS={get:pf(!1,!1)},CS={get:pf(!1,!0)},SS={get:pf(!0,!1)};const Kv=new WeakMap,Qv=new WeakMap,Yv=new WeakMap,AS=new WeakMap;function RS(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function PS(t){return t.__v_skip||!Object.isExtensible(t)?0:RS(JC(t))}function Wi(t){return Js(t)?t:gf(t,!1,vS,bS,Kv)}function Xv(t){return gf(t,!1,wS,CS,Qv)}function Jv(t){return gf(t,!0,ES,SS,Yv)}function gf(t,e,n,s,r){if(!Ke(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=PS(t);if(i===0)return t;const o=r.get(t);if(o)return o;const a=new Proxy(t,i===2?s:n);return r.set(t,a),a}function Ti(t){return Js(t)?Ti(t.__v_raw):!!(t&&t.__v_isReactive)}function Js(t){return!!(t&&t.__v_isReadonly)}function pn(t){return!!(t&&t.__v_isShallow)}function mf(t){return t?!!t.__v_raw:!1}function ke(t){const e=t&&t.__v_raw;return e?ke(e):t}function xa(t){return!Me(t,"__v_skip")&&Object.isExtensible(t)&&Gh(t,"__v_skip",!0),t}const bt=t=>Ke(t)?Wi(t):t,Ql=t=>Ke(t)?Jv(t):t;function St(t){return t?t.__v_isRef===!0:!1}function Zs(t){return Zv(t,!1)}function kS(t){return Zv(t,!0)}function Zv(t,e){return St(t)?t:new NS(t,e)}class NS{constructor(e,n){this.dep=new ff,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ke(e),this._value=n?e:bt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||pn(e)||Js(e);e=s?e:ke(e),Hs(e,n)&&(this._rawValue=e,this._value=s?e:bt(e),this.dep.trigger())}}function Or(t){return St(t)?t.value:t}const xS={get:(t,e,n)=>e==="__v_raw"?t:Or(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return St(r)&&!St(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function eE(t){return Ti(t)?t:new Proxy(t,xS)}function O2(t){const e=he(t)?new Array(t.length):{};for(const n in t)e[n]=OS(t,n);return e}class DS{constructor(e,n,s){this._object=e,this._key=n,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return fS(ke(this._object),this._key)}}function OS(t,e,n){const s=t[e];return St(s)?s:new DS(t,e,n)}class MS{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new ff(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=sa-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&je!==this)return Uv(this,!0),!0}get value(){const e=this.dep.track();return jv(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function LS(t,e,n=!1){let s,r;return me(t)?s=t:(s=t.get,r=t.set),new MS(s,r,n)}const _l={},Yl=new WeakMap;let br;function VS(t,e=!1,n=br){if(n){let s=Yl.get(n);s||Yl.set(n,s=[]),s.push(t)}}function FS(t,e,n=Be){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:c}=n,u=B=>r?B:pn(B)||r===!1||r===0?as(B,1):as(B);let h,d,p,m,E=!1,R=!1;if(St(t)?(d=()=>t.value,E=pn(t)):Ti(t)?(d=()=>u(t),E=!0):he(t)?(R=!0,E=t.some(B=>Ti(B)||pn(B)),d=()=>t.map(B=>{if(St(B))return B.value;if(Ti(B))return u(B);if(me(B))return c?c(B,2):B()})):me(t)?e?d=c?()=>c(t,2):t:d=()=>{if(p){fs();try{p()}finally{ps()}}const B=br;br=h;try{return c?c(t,3,[m]):t(m)}finally{br=B}}:d=$n,e&&r){const B=d,K=r===!0?1/0:r;d=()=>as(B(),K)}const P=uS(),D=()=>{h.stop(),P&&P.active&&of(P.effects,h)};if(i&&e){const B=e;e=(...K)=>{B(...K),D()}}let O=R?new Array(t.length).fill(_l):_l;const V=B=>{if(!(!(h.flags&1)||!h.dirty&&!B))if(e){const K=h.run();if(r||E||(R?K.some((Z,S)=>Hs(Z,O[S])):Hs(K,O))){p&&p();const Z=br;br=h;try{const S=[K,O===_l?void 0:R&&O[0]===_l?[]:O,m];O=K,c?c(e,3,S):e(...S)}finally{br=Z}}}else h.run()};return a&&a(V),h=new Vv(d),h.scheduler=o?()=>o(V,!1):V,m=B=>VS(B,!1,h),p=h.onStop=()=>{const B=Yl.get(h);if(B){if(c)c(B,4);else for(const K of B)K();Yl.delete(h)}},e?s?V(!0):O=h.run():o?o(V.bind(null,!0),!0):h.run(),D.pause=h.pause.bind(h),D.resume=h.resume.bind(h),D.stop=D,D}function as(t,e=1/0,n){if(e<=0||!Ke(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,St(t))as(t.value,e,n);else if(he(t))for(let s=0;s<t.length;s++)as(t[s],e,n);else if(Pv(t)||wi(t))t.forEach(s=>{as(s,e,n)});else if(xv(t)){for(const s in t)as(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&as(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Da(t,e,n,s){try{return s?t(...s):t()}catch(r){Gc(r,e,n)}}function xn(t,e,n,s){if(me(t)){const r=Da(t,e,n,s);return r&&kv(r)&&r.catch(i=>{Gc(i,e,n)}),r}if(he(t)){const r=[];for(let i=0;i<t.length;i++)r.push(xn(t[i],e,n,s));return r}}function Gc(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Be;if(e){let a=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const h=a.ec;if(h){for(let d=0;d<h.length;d++)if(h[d](t,c,u)===!1)return}a=a.parent}if(i){fs(),Da(i,null,10,[t,c,u]),ps();return}}US(t,n,r,s,o)}function US(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const Ht=[];let Fn=-1;const Ii=[];let Os=null,fi=0;const tE=Promise.resolve();let Xl=null;function nE(t){const e=Xl||tE;return t?e.then(this?t.bind(this):t):e}function BS(t){let e=Fn+1,n=Ht.length;for(;e<n;){const s=e+n>>>1,r=Ht[s],i=ia(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function _f(t){if(!(t.flags&1)){const e=ia(t),n=Ht[Ht.length-1];!n||!(t.flags&2)&&e>=ia(n)?Ht.push(t):Ht.splice(BS(e),0,t),t.flags|=1,sE()}}function sE(){Xl||(Xl=tE.then(iE))}function $S(t){he(t)?Ii.push(...t):Os&&t.id===-1?Os.splice(fi+1,0,t):t.flags&1||(Ii.push(t),t.flags|=1),sE()}function rm(t,e,n=Fn+1){for(;n<Ht.length;n++){const s=Ht[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Ht.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function rE(t){if(Ii.length){const e=[...new Set(Ii)].sort((n,s)=>ia(n)-ia(s));if(Ii.length=0,Os){Os.push(...e);return}for(Os=e,fi=0;fi<Os.length;fi++){const n=Os[fi];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Os=null,fi=0}}const ia=t=>t.id==null?t.flags&2?-1:1/0:t.id;function iE(t){try{for(Fn=0;Fn<Ht.length;Fn++){const e=Ht[Fn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Da(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Fn<Ht.length;Fn++){const e=Ht[Fn];e&&(e.flags&=-2)}Fn=-1,Ht.length=0,rE(),Xl=null,(Ht.length||Ii.length)&&iE()}}let rn=null,oE=null;function Jl(t){const e=rn;return rn=t,oE=t&&t.type.__scopeId||null,e}function jS(t,e=rn,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&ym(-1);const i=Jl(e);let o;try{o=t(...r)}finally{Jl(i),s._d&&ym(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function aE(t,e){if(rn===null)return t;const n=Zc(rn),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,a,c=Be]=e[r];i&&(me(i)&&(i={mounted:i,updated:i}),i.deep&&as(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function Er(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let c=a.dir[s];c&&(fs(),xn(c,n,8,[t.el,a,t,e]),ps())}}const lE=Symbol("_vte"),cE=t=>t.__isTeleport,Vo=t=>t&&(t.disabled||t.disabled===""),im=t=>t&&(t.defer||t.defer===""),om=t=>typeof SVGElement<"u"&&t instanceof SVGElement,am=t=>typeof MathMLElement=="function"&&t instanceof MathMLElement,Xh=(t,e)=>{const n=t&&t.to;return nt(n)?e?e(n):null:n},uE={name:"Teleport",__isTeleport:!0,process(t,e,n,s,r,i,o,a,c,u){const{mc:h,pc:d,pbc:p,o:{insert:m,querySelector:E,createText:R,createComment:P}}=u,D=Vo(e.props);let{shapeFlag:O,children:V,dynamicChildren:B}=e;if(t==null){const K=e.el=R(""),Z=e.anchor=R("");m(K,n,s),m(Z,n,s);const S=(y,C)=>{O&16&&(r&&r.isCE&&(r.ce._teleportTarget=y),h(V,y,C,r,i,o,a,c))},v=()=>{const y=e.target=Xh(e.props,E),C=hE(y,e,R,m);y&&(o!=="svg"&&om(y)?o="svg":o!=="mathml"&&am(y)&&(o="mathml"),D||(S(y,C),Nl(e,!1)))};D&&(S(n,Z),Nl(e,!0)),im(e.props)?(e.el.__isMounted=!1,qt(()=>{v(),delete e.el.__isMounted},i)):v()}else{if(im(e.props)&&t.el.__isMounted===!1){qt(()=>{uE.process(t,e,n,s,r,i,o,a,c,u)},i);return}e.el=t.el,e.targetStart=t.targetStart;const K=e.anchor=t.anchor,Z=e.target=t.target,S=e.targetAnchor=t.targetAnchor,v=Vo(t.props),y=v?n:Z,C=v?K:S;if(o==="svg"||om(Z)?o="svg":(o==="mathml"||am(Z))&&(o="mathml"),B?(p(t.dynamicChildren,B,y,r,i,o,a),bf(t,e,!0)):c||d(t,e,y,C,r,i,o,a,!1),D)v?e.props&&t.props&&e.props.to!==t.props.to&&(e.props.to=t.props.to):yl(e,n,K,u,1);else if((e.props&&e.props.to)!==(t.props&&t.props.to)){const A=e.target=Xh(e.props,E);A&&yl(e,A,null,u,0)}else v&&yl(e,Z,S,u,1);Nl(e,D)}},remove(t,e,n,{um:s,o:{remove:r}},i){const{shapeFlag:o,children:a,anchor:c,targetStart:u,targetAnchor:h,target:d,props:p}=t;if(d&&(r(u),r(h)),i&&r(c),o&16){const m=i||!Vo(p);for(let E=0;E<a.length;E++){const R=a[E];s(R,e,n,m,!!R.dynamicChildren)}}},move:yl,hydrate:qS};function yl(t,e,n,{o:{insert:s},m:r},i=2){i===0&&s(t.targetAnchor,e,n);const{el:o,anchor:a,shapeFlag:c,children:u,props:h}=t,d=i===2;if(d&&s(o,e,n),(!d||Vo(h))&&c&16)for(let p=0;p<u.length;p++)r(u[p],e,n,2);d&&s(a,e,n)}function qS(t,e,n,s,r,i,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:u,createText:h}},d){const p=e.target=Xh(e.props,c);if(p){const m=Vo(e.props),E=p._lpa||p.firstChild;if(e.shapeFlag&16)if(m)e.anchor=d(o(t),e,a(t),n,s,r,i),e.targetStart=E,e.targetAnchor=E&&o(E);else{e.anchor=o(t);let R=E;for(;R;){if(R&&R.nodeType===8){if(R.data==="teleport start anchor")e.targetStart=R;else if(R.data==="teleport anchor"){e.targetAnchor=R,p._lpa=e.targetAnchor&&o(e.targetAnchor);break}}R=o(R)}e.targetAnchor||hE(p,e,h,u),d(E&&o(E),e,p,n,s,r,i)}Nl(e,m)}return e.anchor&&o(e.anchor)}const M2=uE;function Nl(t,e){const n=t.ctx;if(n&&n.ut){let s,r;for(e?(s=t.el,r=t.anchor):(s=t.targetStart,r=t.targetAnchor);s&&s!==r;)s.nodeType===1&&s.setAttribute("data-v-owner",n.uid),s=s.nextSibling;n.ut()}}function hE(t,e,n,s){const r=e.targetStart=n(""),i=e.targetAnchor=n("");return r[lE]=i,t&&(s(r,t),s(i,t)),i}const Ms=Symbol("_leaveCb"),vl=Symbol("_enterCb");function dE(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return vf(()=>{t.isMounted=!0}),Ef(()=>{t.isUnmounting=!0}),t}const hn=[Function,Array],fE={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:hn,onEnter:hn,onAfterEnter:hn,onEnterCancelled:hn,onBeforeLeave:hn,onLeave:hn,onAfterLeave:hn,onLeaveCancelled:hn,onBeforeAppear:hn,onAppear:hn,onAfterAppear:hn,onAppearCancelled:hn},pE=t=>{const e=t.subTree;return e.component?pE(e.component):e},HS={name:"BaseTransition",props:fE,setup(t,{slots:e}){const n=Xr(),s=dE();return()=>{const r=e.default&&yf(e.default(),!0);if(!r||!r.length)return;const i=gE(r),o=ke(t),{mode:a}=o;if(s.isLeaving)return uh(i);const c=lm(i);if(!c)return uh(i);let u=oa(c,o,s,n,d=>u=d);c.type!==Wt&&Ur(c,u);let h=n.subTree&&lm(n.subTree);if(h&&h.type!==Wt&&!Ar(c,h)&&pE(n).type!==Wt){let d=oa(h,o,s,n);if(Ur(h,d),a==="out-in"&&c.type!==Wt)return s.isLeaving=!0,d.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete d.afterLeave,h=void 0},uh(i);a==="in-out"&&c.type!==Wt?d.delayLeave=(p,m,E)=>{const R=mE(s,h);R[String(h.key)]=h,p[Ms]=()=>{m(),p[Ms]=void 0,delete u.delayedLeave,h=void 0},u.delayedLeave=()=>{E(),delete u.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return i}}};function gE(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==Wt){e=n;break}}return e}const WS=HS;function mE(t,e){const{leavingVNodes:n}=t;let s=n.get(e.type);return s||(s=Object.create(null),n.set(e.type,s)),s}function oa(t,e,n,s,r){const{appear:i,mode:o,persisted:a=!1,onBeforeEnter:c,onEnter:u,onAfterEnter:h,onEnterCancelled:d,onBeforeLeave:p,onLeave:m,onAfterLeave:E,onLeaveCancelled:R,onBeforeAppear:P,onAppear:D,onAfterAppear:O,onAppearCancelled:V}=e,B=String(t.key),K=mE(n,t),Z=(y,C)=>{y&&xn(y,s,9,C)},S=(y,C)=>{const A=C[1];Z(y,C),he(y)?y.every(b=>b.length<=1)&&A():y.length<=1&&A()},v={mode:o,persisted:a,beforeEnter(y){let C=c;if(!n.isMounted)if(i)C=P||c;else return;y[Ms]&&y[Ms](!0);const A=K[B];A&&Ar(t,A)&&A.el[Ms]&&A.el[Ms](),Z(C,[y])},enter(y){let C=u,A=h,b=d;if(!n.isMounted)if(i)C=D||u,A=O||h,b=V||d;else return;let w=!1;const Q=y[vl]=ve=>{w||(w=!0,ve?Z(b,[y]):Z(A,[y]),v.delayedLeave&&v.delayedLeave(),y[vl]=void 0)};C?S(C,[y,Q]):Q()},leave(y,C){const A=String(t.key);if(y[vl]&&y[vl](!0),n.isUnmounting)return C();Z(p,[y]);let b=!1;const w=y[Ms]=Q=>{b||(b=!0,C(),Q?Z(R,[y]):Z(E,[y]),y[Ms]=void 0,K[A]===t&&delete K[A])};K[A]=t,m?S(m,[y,w]):w()},clone(y){const C=oa(y,e,n,s,r);return r&&r(C),C}};return v}function uh(t){if(Qc(t))return t=er(t),t.children=null,t}function lm(t){if(!Qc(t))return cE(t.type)&&t.children?gE(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&me(n.default))return n.default()}}function Ur(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Ur(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function yf(t,e=!1,n){let s=[],r=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===wn?(o.patchFlag&128&&r++,s=s.concat(yf(o.children,e,a))):(e||o.type!==Wt)&&s.push(a!=null?er(o,{key:a}):o)}if(r>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}/*! #__NO_SIDE_EFFECTS__ */function Kc(t,e){return me(t)?gt({name:t.name},e,{setup:t}):t}function _E(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Fo(t,e,n,s,r=!1){if(he(t)){t.forEach((E,R)=>Fo(E,e&&(he(e)?e[R]:e),n,s,r));return}if(Uo(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Fo(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?Zc(s.component):s.el,o=r?null:i,{i:a,r:c}=t,u=e&&e.r,h=a.refs===Be?a.refs={}:a.refs,d=a.setupState,p=ke(d),m=d===Be?()=>!1:E=>Me(p,E);if(u!=null&&u!==c&&(nt(u)?(h[u]=null,m(u)&&(d[u]=null)):St(u)&&(u.value=null)),me(c))Da(c,a,12,[o,h]);else{const E=nt(c),R=St(c);if(E||R){const P=()=>{if(t.f){const D=E?m(c)?d[c]:h[c]:c.value;r?he(D)&&of(D,i):he(D)?D.includes(i)||D.push(i):E?(h[c]=[i],m(c)&&(d[c]=h[c])):(c.value=[i],t.k&&(h[t.k]=c.value))}else E?(h[c]=o,m(c)&&(d[c]=o)):R&&(c.value=o,t.k&&(h[t.k]=o))};o?(P.id=-1,qt(P,n)):P()}}}Wc().requestIdleCallback;Wc().cancelIdleCallback;const Uo=t=>!!t.type.__asyncLoader,Qc=t=>t.type.__isKeepAlive;function zS(t,e){yE(t,"a",e)}function GS(t,e){yE(t,"da",e)}function yE(t,e,n=Ft){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Yc(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Qc(r.parent.vnode)&&KS(s,e,n,r),r=r.parent}}function KS(t,e,n,s){const r=Yc(e,t,s,!0);wf(()=>{of(s[e],r)},n)}function Yc(t,e,n=Ft,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{fs();const a=Oa(n),c=xn(e,n,t,o);return a(),ps(),c});return s?r.unshift(i):r.push(i),i}}const ws=t=>(e,n=Ft)=>{(!la||t==="sp")&&Yc(t,(...s)=>e(...s),n)},QS=ws("bm"),vf=ws("m"),YS=ws("bu"),vE=ws("u"),Ef=ws("bum"),wf=ws("um"),XS=ws("sp"),JS=ws("rtg"),ZS=ws("rtc");function eA(t,e=Ft){Yc("ec",t,e)}const tA="components";function nA(t,e){return rA(tA,t,!0,e)||t}const sA=Symbol.for("v-ndc");function rA(t,e,n=!0,s=!1){const r=rn||Ft;if(r){const i=r.type;{const a=GA(i,!1);if(a&&(a===e||a===_n(e)||a===Hc(_n(e))))return i}const o=cm(r[t]||i[t],e)||cm(r.appContext[t],e);return!o&&s?i:o}}function cm(t,e){return t&&(t[e]||t[_n(e)]||t[Hc(_n(e))])}function L2(t,e,n,s){let r;const i=n,o=he(t);if(o||nt(t)){const a=o&&Ti(t);let c=!1,u=!1;a&&(c=!pn(t),u=Js(t),t=zc(t)),r=new Array(t.length);for(let h=0,d=t.length;h<d;h++)r[h]=e(c?u?Ql(bt(t[h])):bt(t[h]):t[h],h,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,i)}else if(Ke(t))if(t[Symbol.iterator])r=Array.from(t,(a,c)=>e(a,c,void 0,i));else{const a=Object.keys(t);r=new Array(a.length);for(let c=0,u=a.length;c<u;c++){const h=a[c];r[c]=e(t[h],h,c,i)}}else r=[];return r}const Jh=t=>t?BE(t)?Zc(t):Jh(t.parent):null,Bo=gt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Jh(t.parent),$root:t=>Jh(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>wE(t),$forceUpdate:t=>t.f||(t.f=()=>{_f(t.update)}),$nextTick:t=>t.n||(t.n=nE.bind(t.proxy)),$watch:t=>CA.bind(t)}),hh=(t,e)=>t!==Be&&!t.__isScriptSetup&&Me(t,e),iA={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:c}=t;let u;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(hh(s,e))return o[e]=1,s[e];if(r!==Be&&Me(r,e))return o[e]=2,r[e];if((u=t.propsOptions[0])&&Me(u,e))return o[e]=3,i[e];if(n!==Be&&Me(n,e))return o[e]=4,n[e];Zh&&(o[e]=0)}}const h=Bo[e];let d,p;if(h)return e==="$attrs"&&Mt(t.attrs,"get",""),h(t);if((d=a.__cssModules)&&(d=d[e]))return d;if(n!==Be&&Me(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,Me(p,e))return p[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return hh(r,e)?(r[e]=n,!0):s!==Be&&Me(s,e)?(s[e]=n,!0):Me(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:i}},o){let a;return!!n[o]||t!==Be&&Me(t,o)||hh(e,o)||(a=i[0])&&Me(a,o)||Me(s,o)||Me(Bo,o)||Me(r.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Me(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function um(t){return he(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Zh=!0;function oA(t){const e=wE(t),n=t.proxy,s=t.ctx;Zh=!1,e.beforeCreate&&hm(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:a,provide:c,inject:u,created:h,beforeMount:d,mounted:p,beforeUpdate:m,updated:E,activated:R,deactivated:P,beforeDestroy:D,beforeUnmount:O,destroyed:V,unmounted:B,render:K,renderTracked:Z,renderTriggered:S,errorCaptured:v,serverPrefetch:y,expose:C,inheritAttrs:A,components:b,directives:w,filters:Q}=e;if(u&&aA(u,s,null),o)for(const Ae in o){const be=o[Ae];me(be)&&(s[Ae]=be.bind(n))}if(r){const Ae=r.call(n,n);Ke(Ae)&&(t.data=Wi(Ae))}if(Zh=!0,i)for(const Ae in i){const be=i[Ae],tn=me(be)?be.bind(n,n):me(be.get)?be.get.bind(n,n):$n,yn=!me(be)&&me(be.set)?be.set.bind(n):$n,ln=oe({get:tn,set:yn});Object.defineProperty(s,Ae,{enumerable:!0,configurable:!0,get:()=>ln.value,set:Qe=>ln.value=Qe})}if(a)for(const Ae in a)EE(a[Ae],s,n,Ae);if(c){const Ae=me(c)?c.call(n):c;Reflect.ownKeys(Ae).forEach(be=>{xl(be,Ae[be])})}h&&hm(h,t,"c");function Ve(Ae,be){he(be)?be.forEach(tn=>Ae(tn.bind(n))):be&&Ae(be.bind(n))}if(Ve(QS,d),Ve(vf,p),Ve(YS,m),Ve(vE,E),Ve(zS,R),Ve(GS,P),Ve(eA,v),Ve(ZS,Z),Ve(JS,S),Ve(Ef,O),Ve(wf,B),Ve(XS,y),he(C))if(C.length){const Ae=t.exposed||(t.exposed={});C.forEach(be=>{Object.defineProperty(Ae,be,{get:()=>n[be],set:tn=>n[be]=tn,enumerable:!0})})}else t.exposed||(t.exposed={});K&&t.render===$n&&(t.render=K),A!=null&&(t.inheritAttrs=A),b&&(t.components=b),w&&(t.directives=w),y&&_E(t)}function aA(t,e,n=$n){he(t)&&(t=ed(t));for(const s in t){const r=t[s];let i;Ke(r)?"default"in r?i=gn(r.from||s,r.default,!0):i=gn(r.from||s):i=gn(r),St(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function hm(t,e,n){xn(he(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function EE(t,e,n,s){let r=s.includes(".")?DE(n,s):()=>n[s];if(nt(t)){const i=e[t];me(i)&&$o(r,i)}else if(me(t))$o(r,t.bind(n));else if(Ke(t))if(he(t))t.forEach(i=>EE(i,e,n,s));else{const i=me(t.handler)?t.handler.bind(n):e[t.handler];me(i)&&$o(r,i,t)}}function wE(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!r.length&&!n&&!s?c=e:(c={},r.length&&r.forEach(u=>Zl(c,u,o,!0)),Zl(c,e,o)),Ke(e)&&i.set(e,c),c}function Zl(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&Zl(t,i,n,!0),r&&r.forEach(o=>Zl(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const a=lA[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const lA={data:dm,props:fm,emits:fm,methods:Ao,computed:Ao,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:Ao,directives:Ao,watch:uA,provide:dm,inject:cA};function dm(t,e){return e?t?function(){return gt(me(t)?t.call(this,this):t,me(e)?e.call(this,this):e)}:e:t}function cA(t,e){return Ao(ed(t),ed(e))}function ed(t){if(he(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function jt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ao(t,e){return t?gt(Object.create(null),t,e):e}function fm(t,e){return t?he(t)&&he(e)?[...new Set([...t,...e])]:gt(Object.create(null),um(t),um(e??{})):e}function uA(t,e){if(!t)return e;if(!e)return t;const n=gt(Object.create(null),t);for(const s in e)n[s]=jt(t[s],e[s]);return n}function TE(){return{app:null,config:{isNativeTag:YC,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let hA=0;function dA(t,e){return function(s,r=null){me(s)||(s=gt({},s)),r!=null&&!Ke(r)&&(r=null);const i=TE(),o=new WeakSet,a=[];let c=!1;const u=i.app={_uid:hA++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:QA,get config(){return i.config},set config(h){},use(h,...d){return o.has(h)||(h&&me(h.install)?(o.add(h),h.install(u,...d)):me(h)&&(o.add(h),h(u,...d))),u},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),u},component(h,d){return d?(i.components[h]=d,u):i.components[h]},directive(h,d){return d?(i.directives[h]=d,u):i.directives[h]},mount(h,d,p){if(!c){const m=u._ceVNode||zt(s,r);return m.appContext=i,p===!0?p="svg":p===!1&&(p=void 0),t(m,h,p),c=!0,u._container=h,h.__vue_app__=u,Zc(m.component)}},onUnmount(h){a.push(h)},unmount(){c&&(xn(a,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(h,d){return i.provides[h]=d,u},runWithContext(h){const d=Mr;Mr=u;try{return h()}finally{Mr=d}}};return u}}let Mr=null;function xl(t,e){if(Ft){let n=Ft.provides;const s=Ft.parent&&Ft.parent.provides;s===n&&(n=Ft.provides=Object.create(s)),n[t]=e}}function gn(t,e,n=!1){const s=Xr();if(s||Mr){let r=Mr?Mr._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&me(e)?e.call(s&&s.proxy):e}}function V2(){return!!(Xr()||Mr)}const IE={},bE=()=>Object.create(IE),CE=t=>Object.getPrototypeOf(t)===IE;function fA(t,e,n,s=!1){const r={},i=bE();t.propsDefaults=Object.create(null),SE(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:Xv(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function pA(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,a=ke(r),[c]=t.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const h=t.vnode.dynamicProps;for(let d=0;d<h.length;d++){let p=h[d];if(Xc(t.emitsOptions,p))continue;const m=e[p];if(c)if(Me(i,p))m!==i[p]&&(i[p]=m,u=!0);else{const E=_n(p);r[E]=td(c,a,E,m,t,!1)}else m!==i[p]&&(i[p]=m,u=!0)}}}else{SE(t,e,r,i)&&(u=!0);let h;for(const d in a)(!e||!Me(e,d)&&((h=Yr(d))===d||!Me(e,h)))&&(c?n&&(n[d]!==void 0||n[h]!==void 0)&&(r[d]=td(c,a,d,void 0,t,!0)):delete r[d]);if(i!==a)for(const d in i)(!e||!Me(e,d))&&(delete i[d],u=!0)}u&&os(t.attrs,"set","")}function SE(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Oo(c))continue;const u=e[c];let h;r&&Me(r,h=_n(c))?!i||!i.includes(h)?n[h]=u:(a||(a={}))[h]=u:Xc(t.emitsOptions,c)||(!(c in s)||u!==s[c])&&(s[c]=u,o=!0)}if(i){const c=ke(n),u=a||Be;for(let h=0;h<i.length;h++){const d=i[h];n[d]=td(r,c,d,u[d],t,!Me(u,d))}}return o}function td(t,e,n,s,r,i){const o=t[n];if(o!=null){const a=Me(o,"default");if(a&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&me(c)){const{propsDefaults:u}=r;if(n in u)s=u[n];else{const h=Oa(r);s=u[n]=c.call(null,e),h()}}else s=c;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===Yr(n))&&(s=!0))}return s}const gA=new WeakMap;function AE(t,e,n=!1){const s=n?gA:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},a=[];let c=!1;if(!me(t)){const h=d=>{c=!0;const[p,m]=AE(d,e,!0);gt(o,p),m&&a.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(h),t.extends&&h(t.extends),t.mixins&&t.mixins.forEach(h)}if(!i&&!c)return Ke(t)&&s.set(t,Ei),Ei;if(he(i))for(let h=0;h<i.length;h++){const d=_n(i[h]);pm(d)&&(o[d]=Be)}else if(i)for(const h in i){const d=_n(h);if(pm(d)){const p=i[h],m=o[d]=he(p)||me(p)?{type:p}:gt({},p),E=m.type;let R=!1,P=!0;if(he(E))for(let D=0;D<E.length;++D){const O=E[D],V=me(O)&&O.name;if(V==="Boolean"){R=!0;break}else V==="String"&&(P=!1)}else R=me(E)&&E.name==="Boolean";m[0]=R,m[1]=P,(R||Me(m,"default"))&&a.push(d)}}const u=[o,a];return Ke(t)&&s.set(t,u),u}function pm(t){return t[0]!=="$"&&!Oo(t)}const Tf=t=>t==="_"||t==="__"||t==="_ctx"||t==="$stable",If=t=>he(t)?t.map(Bn):[Bn(t)],mA=(t,e,n)=>{if(e._n)return e;const s=jS((...r)=>If(e(...r)),n);return s._c=!1,s},RE=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Tf(r))continue;const i=t[r];if(me(i))e[r]=mA(r,i,s);else if(i!=null){const o=If(i);e[r]=()=>o}}},PE=(t,e)=>{const n=If(e);t.slots.default=()=>n},kE=(t,e,n)=>{for(const s in e)(n||!Tf(s))&&(t[s]=e[s])},_A=(t,e,n)=>{const s=t.slots=bE();if(t.vnode.shapeFlag&32){const r=e.__;r&&Gh(s,"__",r,!0);const i=e._;i?(kE(s,e,n),n&&Gh(s,"_",i,!0)):RE(e,s)}else e&&PE(t,e)},yA=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=Be;if(s.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:kE(r,e,n):(i=!e.$stable,RE(e,r)),o=e}else e&&(PE(t,e),o={default:1});if(i)for(const a in r)!Tf(a)&&o[a]==null&&delete r[a]},qt=xA;function vA(t){return EA(t)}function EA(t,e){const n=Wc();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:c,setText:u,setElementText:h,parentNode:d,nextSibling:p,setScopeId:m=$n,insertStaticContent:E}=t,R=(T,I,k,L=null,$=null,F=null,X=void 0,z=null,H=!!I.dynamicChildren)=>{if(T===I)return;T&&!Ar(T,I)&&(L=M(T),Qe(T,$,F,!0),T=null),I.patchFlag===-2&&(H=!1,I.dynamicChildren=null);const{type:q,ref:ie,shapeFlag:Y}=I;switch(q){case Jc:P(T,I,k,L);break;case Wt:D(T,I,k,L);break;case fh:T==null&&O(I,k,L,X);break;case wn:b(T,I,k,L,$,F,X,z,H);break;default:Y&1?K(T,I,k,L,$,F,X,z,H):Y&6?w(T,I,k,L,$,F,X,z,H):(Y&64||Y&128)&&q.process(T,I,k,L,$,F,X,z,H,ne)}ie!=null&&$?Fo(ie,T&&T.ref,F,I||T,!I):ie==null&&T&&T.ref!=null&&Fo(T.ref,null,F,T,!0)},P=(T,I,k,L)=>{if(T==null)s(I.el=a(I.children),k,L);else{const $=I.el=T.el;I.children!==T.children&&u($,I.children)}},D=(T,I,k,L)=>{T==null?s(I.el=c(I.children||""),k,L):I.el=T.el},O=(T,I,k,L)=>{[T.el,T.anchor]=E(T.children,I,k,L,T.el,T.anchor)},V=({el:T,anchor:I},k,L)=>{let $;for(;T&&T!==I;)$=p(T),s(T,k,L),T=$;s(I,k,L)},B=({el:T,anchor:I})=>{let k;for(;T&&T!==I;)k=p(T),r(T),T=k;r(I)},K=(T,I,k,L,$,F,X,z,H)=>{I.type==="svg"?X="svg":I.type==="math"&&(X="mathml"),T==null?Z(I,k,L,$,F,X,z,H):y(T,I,$,F,X,z,H)},Z=(T,I,k,L,$,F,X,z)=>{let H,q;const{props:ie,shapeFlag:Y,transition:re,dirs:de}=T;if(H=T.el=o(T.type,F,ie&&ie.is,ie),Y&8?h(H,T.children):Y&16&&v(T.children,H,null,L,$,dh(T,F),X,z),de&&Er(T,null,L,"created"),S(H,T,T.scopeId,X,L),ie){for(const ye in ie)ye!=="value"&&!Oo(ye)&&i(H,ye,null,ie[ye],F,L);"value"in ie&&i(H,"value",null,ie.value,F),(q=ie.onVnodeBeforeMount)&&Mn(q,L,T)}de&&Er(T,null,L,"beforeMount");const le=wA($,re);le&&re.beforeEnter(H),s(H,I,k),((q=ie&&ie.onVnodeMounted)||le||de)&&qt(()=>{q&&Mn(q,L,T),le&&re.enter(H),de&&Er(T,null,L,"mounted")},$)},S=(T,I,k,L,$)=>{if(k&&m(T,k),L)for(let F=0;F<L.length;F++)m(T,L[F]);if($){let F=$.subTree;if(I===F||ME(F.type)&&(F.ssContent===I||F.ssFallback===I)){const X=$.vnode;S(T,X,X.scopeId,X.slotScopeIds,$.parent)}}},v=(T,I,k,L,$,F,X,z,H=0)=>{for(let q=H;q<T.length;q++){const ie=T[q]=z?Ls(T[q]):Bn(T[q]);R(null,ie,I,k,L,$,F,X,z)}},y=(T,I,k,L,$,F,X)=>{const z=I.el=T.el;let{patchFlag:H,dynamicChildren:q,dirs:ie}=I;H|=T.patchFlag&16;const Y=T.props||Be,re=I.props||Be;let de;if(k&&wr(k,!1),(de=re.onVnodeBeforeUpdate)&&Mn(de,k,I,T),ie&&Er(I,T,k,"beforeUpdate"),k&&wr(k,!0),(Y.innerHTML&&re.innerHTML==null||Y.textContent&&re.textContent==null)&&h(z,""),q?C(T.dynamicChildren,q,z,k,L,dh(I,$),F):X||be(T,I,z,null,k,L,dh(I,$),F,!1),H>0){if(H&16)A(z,Y,re,k,$);else if(H&2&&Y.class!==re.class&&i(z,"class",null,re.class,$),H&4&&i(z,"style",Y.style,re.style,$),H&8){const le=I.dynamicProps;for(let ye=0;ye<le.length;ye++){const Re=le[ye],Et=Y[Re],wt=re[Re];(wt!==Et||Re==="value")&&i(z,Re,Et,wt,$,k)}}H&1&&T.children!==I.children&&h(z,I.children)}else!X&&q==null&&A(z,Y,re,k,$);((de=re.onVnodeUpdated)||ie)&&qt(()=>{de&&Mn(de,k,I,T),ie&&Er(I,T,k,"updated")},L)},C=(T,I,k,L,$,F,X)=>{for(let z=0;z<I.length;z++){const H=T[z],q=I[z],ie=H.el&&(H.type===wn||!Ar(H,q)||H.shapeFlag&198)?d(H.el):k;R(H,q,ie,null,L,$,F,X,!0)}},A=(T,I,k,L,$)=>{if(I!==k){if(I!==Be)for(const F in I)!Oo(F)&&!(F in k)&&i(T,F,I[F],null,$,L);for(const F in k){if(Oo(F))continue;const X=k[F],z=I[F];X!==z&&F!=="value"&&i(T,F,z,X,$,L)}"value"in k&&i(T,"value",I.value,k.value,$)}},b=(T,I,k,L,$,F,X,z,H)=>{const q=I.el=T?T.el:a(""),ie=I.anchor=T?T.anchor:a("");let{patchFlag:Y,dynamicChildren:re,slotScopeIds:de}=I;de&&(z=z?z.concat(de):de),T==null?(s(q,k,L),s(ie,k,L),v(I.children||[],k,ie,$,F,X,z,H)):Y>0&&Y&64&&re&&T.dynamicChildren?(C(T.dynamicChildren,re,k,$,F,X,z),(I.key!=null||$&&I===$.subTree)&&bf(T,I,!0)):be(T,I,k,ie,$,F,X,z,H)},w=(T,I,k,L,$,F,X,z,H)=>{I.slotScopeIds=z,T==null?I.shapeFlag&512?$.ctx.activate(I,k,L,X,H):Q(I,k,L,$,F,X,H):ve(T,I,H)},Q=(T,I,k,L,$,F,X)=>{const z=T.component=jA(T,L,$);if(Qc(T)&&(z.ctx.renderer=ne),qA(z,!1,X),z.asyncDep){if($&&$.registerDep(z,Ve,X),!T.el){const H=z.subTree=zt(Wt);D(null,H,I,k),T.placeholder=H.el}}else Ve(z,T,I,k,$,F,X)},ve=(T,I,k)=>{const L=I.component=T.component;if(kA(T,I,k))if(L.asyncDep&&!L.asyncResolved){Ae(L,I,k);return}else L.next=I,L.update();else I.el=T.el,L.vnode=I},Ve=(T,I,k,L,$,F,X)=>{const z=()=>{if(T.isMounted){let{next:Y,bu:re,u:de,parent:le,vnode:ye}=T;{const Rt=NE(T);if(Rt){Y&&(Y.el=ye.el,Ae(T,Y,X)),Rt.asyncDep.then(()=>{T.isUnmounted||z()});return}}let Re=Y,Et;wr(T,!1),Y?(Y.el=ye.el,Ae(T,Y,X)):Y=ye,re&&ih(re),(Et=Y.props&&Y.props.onVnodeBeforeUpdate)&&Mn(Et,le,Y,ye),wr(T,!0);const wt=mm(T),cn=T.subTree;T.subTree=wt,R(cn,wt,d(cn.el),M(cn),T,$,F),Y.el=wt.el,Re===null&&NA(T,wt.el),de&&qt(de,$),(Et=Y.props&&Y.props.onVnodeUpdated)&&qt(()=>Mn(Et,le,Y,ye),$)}else{let Y;const{el:re,props:de}=I,{bm:le,m:ye,parent:Re,root:Et,type:wt}=T,cn=Uo(I);wr(T,!1),le&&ih(le),!cn&&(Y=de&&de.onVnodeBeforeMount)&&Mn(Y,Re,I),wr(T,!0);{Et.ce&&Et.ce._def.shadowRoot!==!1&&Et.ce._injectChildStyle(wt);const Rt=T.subTree=mm(T);R(null,Rt,k,L,T,$,F),I.el=Rt.el}if(ye&&qt(ye,$),!cn&&(Y=de&&de.onVnodeMounted)){const Rt=I;qt(()=>Mn(Y,Re,Rt),$)}(I.shapeFlag&256||Re&&Uo(Re.vnode)&&Re.vnode.shapeFlag&256)&&T.a&&qt(T.a,$),T.isMounted=!0,I=k=L=null}};T.scope.on();const H=T.effect=new Vv(z);T.scope.off();const q=T.update=H.run.bind(H),ie=T.job=H.runIfDirty.bind(H);ie.i=T,ie.id=T.uid,H.scheduler=()=>_f(ie),wr(T,!0),q()},Ae=(T,I,k)=>{I.component=T;const L=T.vnode.props;T.vnode=I,T.next=null,pA(T,I.props,L,k),yA(T,I.children,k),fs(),rm(T),ps()},be=(T,I,k,L,$,F,X,z,H=!1)=>{const q=T&&T.children,ie=T?T.shapeFlag:0,Y=I.children,{patchFlag:re,shapeFlag:de}=I;if(re>0){if(re&128){yn(q,Y,k,L,$,F,X,z,H);return}else if(re&256){tn(q,Y,k,L,$,F,X,z,H);return}}de&8?(ie&16&&Qt(q,$,F),Y!==q&&h(k,Y)):ie&16?de&16?yn(q,Y,k,L,$,F,X,z,H):Qt(q,$,F,!0):(ie&8&&h(k,""),de&16&&v(Y,k,L,$,F,X,z,H))},tn=(T,I,k,L,$,F,X,z,H)=>{T=T||Ei,I=I||Ei;const q=T.length,ie=I.length,Y=Math.min(q,ie);let re;for(re=0;re<Y;re++){const de=I[re]=H?Ls(I[re]):Bn(I[re]);R(T[re],de,k,null,$,F,X,z,H)}q>ie?Qt(T,$,F,!0,!1,Y):v(I,k,L,$,F,X,z,H,Y)},yn=(T,I,k,L,$,F,X,z,H)=>{let q=0;const ie=I.length;let Y=T.length-1,re=ie-1;for(;q<=Y&&q<=re;){const de=T[q],le=I[q]=H?Ls(I[q]):Bn(I[q]);if(Ar(de,le))R(de,le,k,null,$,F,X,z,H);else break;q++}for(;q<=Y&&q<=re;){const de=T[Y],le=I[re]=H?Ls(I[re]):Bn(I[re]);if(Ar(de,le))R(de,le,k,null,$,F,X,z,H);else break;Y--,re--}if(q>Y){if(q<=re){const de=re+1,le=de<ie?I[de].el:L;for(;q<=re;)R(null,I[q]=H?Ls(I[q]):Bn(I[q]),k,le,$,F,X,z,H),q++}}else if(q>re)for(;q<=Y;)Qe(T[q],$,F,!0),q++;else{const de=q,le=q,ye=new Map;for(q=le;q<=re;q++){const Tt=I[q]=H?Ls(I[q]):Bn(I[q]);Tt.key!=null&&ye.set(Tt.key,q)}let Re,Et=0;const wt=re-le+1;let cn=!1,Rt=0;const Cs=new Array(wt);for(q=0;q<wt;q++)Cs[q]=0;for(q=de;q<=Y;q++){const Tt=T[q];if(Et>=wt){Qe(Tt,$,F,!0);continue}let un;if(Tt.key!=null)un=ye.get(Tt.key);else for(Re=le;Re<=re;Re++)if(Cs[Re-le]===0&&Ar(Tt,I[Re])){un=Re;break}un===void 0?Qe(Tt,$,F,!0):(Cs[un-le]=q+1,un>=Rt?Rt=un:cn=!0,R(Tt,I[un],k,null,$,F,X,z,H),Et++)}const no=cn?TA(Cs):Ei;for(Re=no.length-1,q=wt-1;q>=0;q--){const Tt=le+q,un=I[Tt],Za=I[Tt+1],ti=Tt+1<ie?Za.el||Za.placeholder:L;Cs[q]===0?R(null,un,k,ti,$,F,X,z,H):cn&&(Re<0||q!==no[Re]?ln(un,k,ti,2):Re--)}}},ln=(T,I,k,L,$=null)=>{const{el:F,type:X,transition:z,children:H,shapeFlag:q}=T;if(q&6){ln(T.component.subTree,I,k,L);return}if(q&128){T.suspense.move(I,k,L);return}if(q&64){X.move(T,I,k,ne);return}if(X===wn){s(F,I,k);for(let Y=0;Y<H.length;Y++)ln(H[Y],I,k,L);s(T.anchor,I,k);return}if(X===fh){V(T,I,k);return}if(L!==2&&q&1&&z)if(L===0)z.beforeEnter(F),s(F,I,k),qt(()=>z.enter(F),$);else{const{leave:Y,delayLeave:re,afterLeave:de}=z,le=()=>{T.ctx.isUnmounted?r(F):s(F,I,k)},ye=()=>{Y(F,()=>{le(),de&&de()})};re?re(F,le,ye):ye()}else s(F,I,k)},Qe=(T,I,k,L=!1,$=!1)=>{const{type:F,props:X,ref:z,children:H,dynamicChildren:q,shapeFlag:ie,patchFlag:Y,dirs:re,cacheIndex:de}=T;if(Y===-2&&($=!1),z!=null&&(fs(),Fo(z,null,k,T,!0),ps()),de!=null&&(I.renderCache[de]=void 0),ie&256){I.ctx.deactivate(T);return}const le=ie&1&&re,ye=!Uo(T);let Re;if(ye&&(Re=X&&X.onVnodeBeforeUnmount)&&Mn(Re,I,T),ie&6)On(T.component,k,L);else{if(ie&128){T.suspense.unmount(k,L);return}le&&Er(T,null,I,"beforeUnmount"),ie&64?T.type.remove(T,I,k,ne,L):q&&!q.hasOnce&&(F!==wn||Y>0&&Y&64)?Qt(q,I,k,!1,!0):(F===wn&&Y&384||!$&&ie&16)&&Qt(H,I,k),L&&Ye(T)}(ye&&(Re=X&&X.onVnodeUnmounted)||le)&&qt(()=>{Re&&Mn(Re,I,T),le&&Er(T,null,I,"unmounted")},k)},Ye=T=>{const{type:I,el:k,anchor:L,transition:$}=T;if(I===wn){bs(k,L);return}if(I===fh){B(T);return}const F=()=>{r(k),$&&!$.persisted&&$.afterLeave&&$.afterLeave()};if(T.shapeFlag&1&&$&&!$.persisted){const{leave:X,delayLeave:z}=$,H=()=>X(k,F);z?z(T.el,F,H):H()}else F()},bs=(T,I)=>{let k;for(;T!==I;)k=p(T),r(T),T=k;r(I)},On=(T,I,k)=>{const{bum:L,scope:$,job:F,subTree:X,um:z,m:H,a:q,parent:ie,slots:{__:Y}}=T;gm(H),gm(q),L&&ih(L),ie&&he(Y)&&Y.forEach(re=>{ie.renderCache[re]=void 0}),$.stop(),F&&(F.flags|=8,Qe(X,T,I,k)),z&&qt(z,I),qt(()=>{T.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&T.asyncDep&&!T.asyncResolved&&T.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},Qt=(T,I,k,L=!1,$=!1,F=0)=>{for(let X=F;X<T.length;X++)Qe(T[X],I,k,L,$)},M=T=>{if(T.shapeFlag&6)return M(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const I=p(T.anchor||T.el),k=I&&I[lE];return k?p(k):I};let ee=!1;const J=(T,I,k)=>{T==null?I._vnode&&Qe(I._vnode,null,null,!0):R(I._vnode||null,T,I,null,null,null,k),I._vnode=T,ee||(ee=!0,rm(),rE(),ee=!1)},ne={p:R,um:Qe,m:ln,r:Ye,mt:Q,mc:v,pc:be,pbc:C,n:M,o:t};return{render:J,hydrate:void 0,createApp:dA(J)}}function dh({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function wr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function wA(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function bf(t,e,n=!1){const s=t.children,r=e.children;if(he(s)&&he(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=Ls(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&bf(o,a)),a.type===Jc&&(a.el=o.el),a.type===Wt&&!a.el&&(a.el=o.el)}}function TA(t){const e=t.slice(),n=[0];let s,r,i,o,a;const c=t.length;for(s=0;s<c;s++){const u=t[s];if(u!==0){if(r=n[n.length-1],t[r]<u){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<u?i=a+1:o=a;u<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function NE(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:NE(e)}function gm(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const IA=Symbol.for("v-scx"),bA=()=>gn(IA);function $o(t,e,n){return xE(t,e,n)}function xE(t,e,n=Be){const{immediate:s,deep:r,flush:i,once:o}=n,a=gt({},n),c=e&&s||!e&&i!=="post";let u;if(la){if(i==="sync"){const m=bA();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!c){const m=()=>{};return m.stop=$n,m.resume=$n,m.pause=$n,m}}const h=Ft;a.call=(m,E,R)=>xn(m,h,E,R);let d=!1;i==="post"?a.scheduler=m=>{qt(m,h&&h.suspense)}:i!=="sync"&&(d=!0,a.scheduler=(m,E)=>{E?m():_f(m)}),a.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,h&&(m.id=h.uid,m.i=h))};const p=FS(t,e,a);return la&&(u?u.push(p):c&&p()),p}function CA(t,e,n){const s=this.proxy,r=nt(t)?t.includes(".")?DE(s,t):()=>s[t]:t.bind(s,s);let i;me(e)?i=e:(i=e.handler,n=e);const o=Oa(this),a=xE(r,i.bind(s),n);return o(),a}function DE(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const SA=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${_n(e)}Modifiers`]||t[`${Yr(e)}Modifiers`];function AA(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Be;let r=n;const i=e.startsWith("update:"),o=i&&SA(s,e.slice(7));o&&(o.trim&&(r=n.map(h=>nt(h)?h.trim():h)),o.number&&(r=n.map(tS)));let a,c=s[a=rh(e)]||s[a=rh(_n(e))];!c&&i&&(c=s[a=rh(Yr(e))]),c&&xn(c,t,6,r);const u=s[a+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,xn(u,t,6,r)}}function OE(t,e,n=!1){const s=e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},a=!1;if(!me(t)){const c=u=>{const h=OE(u,e,!0);h&&(a=!0,gt(o,h))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Ke(t)&&s.set(t,null),null):(he(i)?i.forEach(c=>o[c]=null):gt(o,i),Ke(t)&&s.set(t,o),o)}function Xc(t,e){return!t||!$c(e)?!1:(e=e.slice(2).replace(/Once$/,""),Me(t,e[0].toLowerCase()+e.slice(1))||Me(t,Yr(e))||Me(t,e))}function mm(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:c,render:u,renderCache:h,props:d,data:p,setupState:m,ctx:E,inheritAttrs:R}=t,P=Jl(t);let D,O;try{if(n.shapeFlag&4){const B=r||s,K=B;D=Bn(u.call(K,B,h,d,m,p,E)),O=a}else{const B=e;D=Bn(B.length>1?B(d,{attrs:a,slots:o,emit:c}):B(d,null)),O=e.props?a:RA(a)}}catch(B){jo.length=0,Gc(B,t,1),D=zt(Wt)}let V=D;if(O&&R!==!1){const B=Object.keys(O),{shapeFlag:K}=V;B.length&&K&7&&(i&&B.some(rf)&&(O=PA(O,i)),V=er(V,O,!1,!0))}return n.dirs&&(V=er(V,null,!1,!0),V.dirs=V.dirs?V.dirs.concat(n.dirs):n.dirs),n.transition&&Ur(V,n.transition),D=V,Jl(P),D}const RA=t=>{let e;for(const n in t)(n==="class"||n==="style"||$c(n))&&((e||(e={}))[n]=t[n]);return e},PA=(t,e)=>{const n={};for(const s in t)(!rf(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function kA(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:a,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?_m(s,o,u):!!o;if(c&8){const h=e.dynamicProps;for(let d=0;d<h.length;d++){const p=h[d];if(o[p]!==s[p]&&!Xc(u,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?_m(s,o,u):!0:!!o;return!1}function _m(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(e[i]!==t[i]&&!Xc(n,i))return!0}return!1}function NA({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const ME=t=>t.__isSuspense;function xA(t,e){e&&e.pendingBranch?he(t)?e.effects.push(...t):e.effects.push(t):$S(t)}const wn=Symbol.for("v-fgt"),Jc=Symbol.for("v-txt"),Wt=Symbol.for("v-cmt"),fh=Symbol.for("v-stc"),jo=[];let on=null;function LE(t=!1){jo.push(on=t?null:[])}function DA(){jo.pop(),on=jo[jo.length-1]||null}let aa=1;function ym(t,e=!1){aa+=t,t<0&&on&&e&&(on.hasOnce=!0)}function VE(t){return t.dynamicChildren=aa>0?on||Ei:null,DA(),aa>0&&on&&on.push(t),t}function OA(t,e,n,s,r,i){return VE(UE(t,e,n,s,r,i,!0))}function MA(t,e,n,s,r){return VE(zt(t,e,n,s,r,!0))}function ec(t){return t?t.__v_isVNode===!0:!1}function Ar(t,e){return t.type===e.type&&t.key===e.key}const FE=({key:t})=>t??null,Dl=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?nt(t)||St(t)||me(t)?{i:rn,r:t,k:e,f:!!n}:t:null);function UE(t,e=null,n=null,s=0,r=null,i=t===wn?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&FE(e),ref:e&&Dl(e),scopeId:oE,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:rn};return a?(Cf(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=nt(n)?8:16),aa>0&&!o&&on&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&on.push(c),c}const zt=LA;function LA(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===sA)&&(t=Wt),ec(t)){const a=er(t,e,!0);return n&&Cf(a,n),aa>0&&!i&&on&&(a.shapeFlag&6?on[on.indexOf(t)]=a:on.push(a)),a.patchFlag=-2,a}if(KA(t)&&(t=t.__vccOpts),e){e=VA(e);let{class:a,style:c}=e;a&&!nt(a)&&(e.class=cf(a)),Ke(c)&&(mf(c)&&!he(c)&&(c=gt({},c)),e.style=lf(c))}const o=nt(t)?1:ME(t)?128:cE(t)?64:Ke(t)?4:me(t)?2:0;return UE(t,e,n,s,r,o,i,!0)}function VA(t){return t?mf(t)||CE(t)?gt({},t):t:null}function er(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:c}=t,u=e?UA(r||{},e):r,h={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&FE(u),ref:e&&e.ref?n&&i?he(i)?i.concat(Dl(e)):[i,Dl(e)]:Dl(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==wn?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&er(t.ssContent),ssFallback:t.ssFallback&&er(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&s&&Ur(h,c.clone(h)),h}function FA(t=" ",e=0){return zt(Jc,null,t,e)}function F2(t="",e=!1){return e?(LE(),MA(Wt,null,t)):zt(Wt,null,t)}function Bn(t){return t==null||typeof t=="boolean"?zt(Wt):he(t)?zt(wn,null,t.slice()):ec(t)?Ls(t):zt(Jc,null,String(t))}function Ls(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:er(t)}function Cf(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(he(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Cf(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!CE(e)?e._ctx=rn:r===3&&rn&&(rn.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else me(e)?(e={default:e,_ctx:rn},n=32):(e=String(e),s&64?(n=16,e=[FA(e)]):n=8);t.children=e,t.shapeFlag|=n}function UA(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=cf([e.class,s.class]));else if(r==="style")e.style=lf([e.style,s.style]);else if($c(r)){const i=e[r],o=s[r];o&&i!==o&&!(he(i)&&i.includes(o))&&(e[r]=i?[].concat(i,o):o)}else r!==""&&(e[r]=s[r])}return e}function Mn(t,e,n,s=null){xn(t,e,7,[n,s])}const BA=TE();let $A=0;function jA(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||BA,i={uid:$A++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Lv(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:AE(s,r),emitsOptions:OE(s,r),emit:null,emitted:null,propsDefaults:Be,inheritAttrs:s.inheritAttrs,ctx:Be,data:Be,props:Be,attrs:Be,slots:Be,refs:Be,setupState:Be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=AA.bind(null,i),t.ce&&t.ce(i),i}let Ft=null;const Xr=()=>Ft||rn;let tc,nd;{const t=Wc(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};tc=e("__VUE_INSTANCE_SETTERS__",n=>Ft=n),nd=e("__VUE_SSR_SETTERS__",n=>la=n)}const Oa=t=>{const e=Ft;return tc(t),t.scope.on(),()=>{t.scope.off(),tc(e)}},vm=()=>{Ft&&Ft.scope.off(),tc(null)};function BE(t){return t.vnode.shapeFlag&4}let la=!1;function qA(t,e=!1,n=!1){e&&nd(e);const{props:s,children:r}=t.vnode,i=BE(t);fA(t,s,i,e),_A(t,r,n||e);const o=i?HA(t,e):void 0;return e&&nd(!1),o}function HA(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,iA);const{setup:s}=n;if(s){fs();const r=t.setupContext=s.length>1?zA(t):null,i=Oa(t),o=Da(s,t,0,[t.props,r]),a=kv(o);if(ps(),i(),(a||t.sp)&&!Uo(t)&&_E(t),a){if(o.then(vm,vm),e)return o.then(c=>{Em(t,c)}).catch(c=>{Gc(c,t,0)});t.asyncDep=o}else Em(t,o)}else $E(t)}function Em(t,e,n){me(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ke(e)&&(t.setupState=eE(e)),$E(t)}function $E(t,e,n){const s=t.type;t.render||(t.render=s.render||$n);{const r=Oa(t);fs();try{oA(t)}finally{ps(),r()}}}const WA={get(t,e){return Mt(t,"get",""),t[e]}};function zA(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,WA),slots:t.slots,emit:t.emit,expose:e}}function Zc(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(eE(xa(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Bo)return Bo[n](t)},has(e,n){return n in e||n in Bo}})):t.proxy}function GA(t,e=!0){return me(t)?t.displayName||t.name:t.name||e&&t.__name}function KA(t){return me(t)&&"__vccOpts"in t}const oe=(t,e)=>LS(t,e,la);function pe(t,e,n){const s=arguments.length;return s===2?Ke(e)&&!he(e)?ec(e)?zt(t,null,[e]):zt(t,e):zt(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&ec(n)&&(n=[n]),zt(t,e,n))}const QA="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let sd;const wm=typeof window<"u"&&window.trustedTypes;if(wm)try{sd=wm.createPolicy("vue",{createHTML:t=>t})}catch{}const jE=sd?t=>sd.createHTML(t):t=>t,YA="http://www.w3.org/2000/svg",XA="http://www.w3.org/1998/Math/MathML",is=typeof document<"u"?document:null,Tm=is&&is.createElement("template"),JA={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?is.createElementNS(YA,t):e==="mathml"?is.createElementNS(XA,t):n?is.createElement(t,{is:n}):is.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>is.createTextNode(t),createComment:t=>is.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>is.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Tm.innerHTML=jE(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const a=Tm.content;if(s==="svg"||s==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ps="transition",_o="animation",Ni=Symbol("_vtc"),qE={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},HE=gt({},fE,qE),ZA=t=>(t.displayName="Transition",t.props=HE,t),eR=ZA((t,{slots:e})=>pe(WS,WE(t),e)),Tr=(t,e=[])=>{he(t)?t.forEach(n=>n(...e)):t&&t(...e)},Im=t=>t?he(t)?t.some(e=>e.length>1):t.length>1:!1;function WE(t){const e={};for(const b in t)b in qE||(e[b]=t[b]);if(t.css===!1)return e;const{name:n="v",type:s,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:c=i,appearActiveClass:u=o,appearToClass:h=a,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=t,E=tR(r),R=E&&E[0],P=E&&E[1],{onBeforeEnter:D,onEnter:O,onEnterCancelled:V,onLeave:B,onLeaveCancelled:K,onBeforeAppear:Z=D,onAppear:S=O,onAppearCancelled:v=V}=e,y=(b,w,Q,ve)=>{b._enterCancelled=ve,Ds(b,w?h:a),Ds(b,w?u:o),Q&&Q()},C=(b,w)=>{b._isLeaving=!1,Ds(b,d),Ds(b,m),Ds(b,p),w&&w()},A=b=>(w,Q)=>{const ve=b?S:O,Ve=()=>y(w,b,Q);Tr(ve,[w,Ve]),bm(()=>{Ds(w,b?c:i),Vn(w,b?h:a),Im(ve)||Cm(w,s,R,Ve)})};return gt(e,{onBeforeEnter(b){Tr(D,[b]),Vn(b,i),Vn(b,o)},onBeforeAppear(b){Tr(Z,[b]),Vn(b,c),Vn(b,u)},onEnter:A(!1),onAppear:A(!0),onLeave(b,w){b._isLeaving=!0;const Q=()=>C(b,w);Vn(b,d),b._enterCancelled?(Vn(b,p),rd()):(rd(),Vn(b,p)),bm(()=>{b._isLeaving&&(Ds(b,d),Vn(b,m),Im(B)||Cm(b,s,P,Q))}),Tr(B,[b,Q])},onEnterCancelled(b){y(b,!1,void 0,!0),Tr(V,[b])},onAppearCancelled(b){y(b,!0,void 0,!0),Tr(v,[b])},onLeaveCancelled(b){C(b),Tr(K,[b])}})}function tR(t){if(t==null)return null;if(Ke(t))return[ph(t.enter),ph(t.leave)];{const e=ph(t);return[e,e]}}function ph(t){return nS(t)}function Vn(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[Ni]||(t[Ni]=new Set)).add(e)}function Ds(t,e){e.split(/\s+/).forEach(s=>s&&t.classList.remove(s));const n=t[Ni];n&&(n.delete(e),n.size||(t[Ni]=void 0))}function bm(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let nR=0;function Cm(t,e,n,s){const r=t._endId=++nR,i=()=>{r===t._endId&&s()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:a,propCount:c}=zE(t,e);if(!o)return s();const u=o+"end";let h=0;const d=()=>{t.removeEventListener(u,p),i()},p=m=>{m.target===t&&++h>=c&&d()};setTimeout(()=>{h<c&&d()},a+1),t.addEventListener(u,p)}function zE(t,e){const n=window.getComputedStyle(t),s=E=>(n[E]||"").split(", "),r=s(`${Ps}Delay`),i=s(`${Ps}Duration`),o=Sm(r,i),a=s(`${_o}Delay`),c=s(`${_o}Duration`),u=Sm(a,c);let h=null,d=0,p=0;e===Ps?o>0&&(h=Ps,d=o,p=i.length):e===_o?u>0&&(h=_o,d=u,p=c.length):(d=Math.max(o,u),h=d>0?o>u?Ps:_o:null,p=h?h===Ps?i.length:c.length:0);const m=h===Ps&&/\b(transform|all)(,|$)/.test(s(`${Ps}Property`).toString());return{type:h,timeout:d,propCount:p,hasTransform:m}}function Sm(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,s)=>Am(n)+Am(t[s])))}function Am(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function rd(){return document.body.offsetHeight}function sR(t,e,n){const s=t[Ni];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const nc=Symbol("_vod"),GE=Symbol("_vsh"),U2={beforeMount(t,{value:e},{transition:n}){t[nc]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):yo(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:s}){!e!=!n&&(s?e?(s.beforeEnter(t),yo(t,!0),s.enter(t)):s.leave(t,()=>{yo(t,!1)}):yo(t,e))},beforeUnmount(t,{value:e}){yo(t,e)}};function yo(t,e){t.style.display=e?t[nc]:"none",t[GE]=!e}const rR=Symbol(""),iR=/(^|;)\s*display\s*:/;function oR(t,e,n){const s=t.style,r=nt(n);let i=!1;if(n&&!r){if(e)if(nt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Ol(s,a,"")}else for(const o in e)n[o]==null&&Ol(s,o,"");for(const o in n)o==="display"&&(i=!0),Ol(s,o,n[o])}else if(r){if(e!==n){const o=s[rR];o&&(n+=";"+o),s.cssText=n,i=iR.test(n)}}else e&&t.removeAttribute("style");nc in t&&(t[nc]=i?s.display:"",t[GE]&&(s.display="none"))}const Rm=/\s*!important$/;function Ol(t,e,n){if(he(n))n.forEach(s=>Ol(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=aR(t,e);Rm.test(n)?t.setProperty(Yr(s),n.replace(Rm,""),"important"):t[s]=n}}const Pm=["Webkit","Moz","ms"],gh={};function aR(t,e){const n=gh[e];if(n)return n;let s=_n(e);if(s!=="filter"&&s in t)return gh[e]=s;s=Hc(s);for(let r=0;r<Pm.length;r++){const i=Pm[r]+s;if(i in t)return gh[e]=i}return e}const km="http://www.w3.org/1999/xlink";function Nm(t,e,n,s,r,i=lS(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(km,e.slice(6,e.length)):t.setAttributeNS(km,e,n):n==null||i&&!Dv(n)?t.removeAttribute(e):t.setAttribute(e,i?"":dr(n)?String(n):n)}function xm(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?jE(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=Dv(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function lR(t,e,n,s){t.addEventListener(e,n,s)}function cR(t,e,n,s){t.removeEventListener(e,n,s)}const Dm=Symbol("_vei");function uR(t,e,n,s,r=null){const i=t[Dm]||(t[Dm]={}),o=i[e];if(s&&o)o.value=s;else{const[a,c]=hR(e);if(s){const u=i[e]=pR(s,r);lR(t,a,u,c)}else o&&(cR(t,a,o,c),i[e]=void 0)}}const Om=/(?:Once|Passive|Capture)$/;function hR(t){let e;if(Om.test(t)){e={};let s;for(;s=t.match(Om);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Yr(t.slice(2)),e]}let mh=0;const dR=Promise.resolve(),fR=()=>mh||(dR.then(()=>mh=0),mh=Date.now());function pR(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;xn(gR(s,n.value),e,5,[s])};return n.value=t,n.attached=fR(),n}function gR(t,e){if(he(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const Mm=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,mR=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?sR(t,s,o):e==="style"?oR(t,n,s):$c(e)?rf(e)||uR(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):_R(t,e,s,o))?(xm(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Nm(t,e,s,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!nt(s))?xm(t,_n(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Nm(t,e,s,o))};function _R(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Mm(e)&&me(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Mm(e)&&nt(n)?!1:e in t}const KE=new WeakMap,QE=new WeakMap,sc=Symbol("_moveCb"),Lm=Symbol("_enterCb"),yR=t=>(delete t.props.mode,t),vR=yR({name:"TransitionGroup",props:gt({},HE,{tag:String,moveClass:String}),setup(t,{slots:e}){const n=Xr(),s=dE();let r,i;return vE(()=>{if(!r.length)return;const o=t.moveClass||`${t.name||"v"}-move`;if(!bR(r[0].el,n.vnode.el,o)){r=[];return}r.forEach(wR),r.forEach(TR);const a=r.filter(IR);rd(),a.forEach(c=>{const u=c.el,h=u.style;Vn(u,o),h.transform=h.webkitTransform=h.transitionDuration="";const d=u[sc]=p=>{p&&p.target!==u||(!p||/transform$/.test(p.propertyName))&&(u.removeEventListener("transitionend",d),u[sc]=null,Ds(u,o))};u.addEventListener("transitionend",d)}),r=[]}),()=>{const o=ke(t),a=WE(o);let c=o.tag||wn;if(r=[],i)for(let u=0;u<i.length;u++){const h=i[u];h.el&&h.el instanceof Element&&(r.push(h),Ur(h,oa(h,a,s,n)),KE.set(h,h.el.getBoundingClientRect()))}i=e.default?yf(e.default()):[];for(let u=0;u<i.length;u++){const h=i[u];h.key!=null&&Ur(h,oa(h,a,s,n))}return zt(c,null,i)}}}),ER=vR;function wR(t){const e=t.el;e[sc]&&e[sc](),e[Lm]&&e[Lm]()}function TR(t){QE.set(t,t.el.getBoundingClientRect())}function IR(t){const e=KE.get(t),n=QE.get(t),s=e.left-n.left,r=e.top-n.top;if(s||r){const i=t.el.style;return i.transform=i.webkitTransform=`translate(${s}px,${r}px)`,i.transitionDuration="0s",t}}function bR(t,e,n){const s=t.cloneNode(),r=t[Ni];r&&r.forEach(a=>{a.split(/\s+/).forEach(c=>c&&s.classList.remove(c))}),n.split(/\s+/).forEach(a=>a&&s.classList.add(a)),s.style.display="none";const i=e.nodeType===1?e:e.parentNode;i.appendChild(s);const{hasTransform:o}=zE(s);return i.removeChild(s),o}const CR=["ctrl","shift","alt","meta"],SR={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>CR.some(n=>t[`${n}Key`]&&!e.includes(n))},B2=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const a=SR[e[o]];if(a&&a(r,e))return}return t(r,...i)})},AR=gt({patchProp:mR},JA);let Vm;function RR(){return Vm||(Vm=vA(AR))}const YE=(...t)=>{const e=RR().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=kR(s);if(!r)return;const i=e._component;!me(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,PR(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function PR(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function kR(t){return nt(t)?document.querySelector(t):t}function eu(t,e,n,s){return Object.defineProperty(t,e,{get:n,set:s,enumerable:!0}),t}function $2(t,e){for(const n in e)eu(t,n,e[n]);return t}const Br=Zs(!1);let id;function NR(t,e){const n=/(edg|edge|edga|edgios)\/([\w.]+)/.exec(t)||/(opr)[\/]([\w.]+)/.exec(t)||/(vivaldi)[\/]([\w.]+)/.exec(t)||/(chrome|crios)[\/]([\w.]+)/.exec(t)||/(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(t)||/(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(t)||/(firefox|fxios)[\/]([\w.]+)/.exec(t)||/(webkit)[\/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[\/]([\w.]+)/.exec(t)||[];return{browser:n[5]||n[3]||n[1]||"",version:n[4]||n[2]||"0",platform:e[0]||""}}function xR(t){return/(ipad)/.exec(t)||/(ipod)/.exec(t)||/(windows phone)/.exec(t)||/(iphone)/.exec(t)||/(kindle)/.exec(t)||/(silk)/.exec(t)||/(android)/.exec(t)||/(win)/.exec(t)||/(mac)/.exec(t)||/(linux)/.exec(t)||/(cros)/.exec(t)||/(playbook)/.exec(t)||/(bb)/.exec(t)||/(blackberry)/.exec(t)||[]}const XE="ontouchstart"in window||window.navigator.maxTouchPoints>0;function DR(t){const e=t.toLowerCase(),n=xR(e),s=NR(e,n),r={mobile:!1,desktop:!1,cordova:!1,capacitor:!1,nativeMobile:!1,electron:!1,bex:!1,linux:!1,mac:!1,win:!1,cros:!1,chrome:!1,firefox:!1,opera:!1,safari:!1,vivaldi:!1,edge:!1,edgeChromium:!1,ie:!1,webkit:!1,android:!1,ios:!1,ipad:!1,iphone:!1,ipod:!1,kindle:!1,winphone:!1,blackberry:!1,playbook:!1,silk:!1};s.browser&&(r[s.browser]=!0,r.version=s.version,r.versionNumber=parseInt(s.version,10)),s.platform&&(r[s.platform]=!0);const i=r.android||r.ios||r.bb||r.blackberry||r.ipad||r.iphone||r.ipod||r.kindle||r.playbook||r.silk||r["windows phone"];if(i===!0||e.indexOf("mobile")!==-1?r.mobile=!0:r.desktop=!0,r["windows phone"]&&(r.winphone=!0,delete r["windows phone"]),r.edga||r.edgios||r.edg?(r.edge=!0,s.browser="edge"):r.crios?(r.chrome=!0,s.browser="chrome"):r.fxios&&(r.firefox=!0,s.browser="firefox"),(r.ipod||r.ipad||r.iphone)&&(r.ios=!0),r.vivaldi&&(s.browser="vivaldi",r.vivaldi=!0),(r.chrome||r.opr||r.safari||r.vivaldi||r.mobile===!0&&r.ios!==!0&&i!==!0)&&(r.webkit=!0),r.opr&&(s.browser="opera",r.opera=!0),r.safari&&(r.blackberry||r.bb?(s.browser="blackberry",r.blackberry=!0):r.playbook?(s.browser="playbook",r.playbook=!0):r.android?(s.browser="android",r.android=!0):r.kindle?(s.browser="kindle",r.kindle=!0):r.silk&&(s.browser="silk",r.silk=!0)),r.name=s.browser,r.platform=s.platform,e.indexOf("electron")!==-1)r.electron=!0;else if(document.location.href.indexOf("-extension://")!==-1)r.bex=!0;else{if(window.Capacitor!==void 0?(r.capacitor=!0,r.nativeMobile=!0,r.nativeMobileWrapper="capacitor"):(window._cordovaNative!==void 0||window.cordova!==void 0)&&(r.cordova=!0,r.nativeMobile=!0,r.nativeMobileWrapper="cordova"),Br.value===!0&&(id={is:{...r}}),XE===!0&&r.mac===!0&&(r.desktop===!0&&r.safari===!0||r.nativeMobile===!0&&r.android!==!0&&r.ios!==!0&&r.ipad!==!0)){delete r.mac,delete r.desktop;const o=Math.min(window.innerHeight,window.innerWidth)>414?"ipad":"iphone";Object.assign(r,{mobile:!0,ios:!0,platform:o,[o]:!0})}r.mobile!==!0&&window.navigator.userAgentData&&window.navigator.userAgentData.mobile&&(delete r.desktop,r.mobile=!0)}return r}const Fm=navigator.userAgent||navigator.vendor||window.opera,OR={has:{touch:!1,webStorage:!1},within:{iframe:!1}},jn={userAgent:Fm,is:DR(Fm),has:{touch:XE},within:{iframe:window.self!==window.top}},od={install(t){const{$q:e}=t;Br.value===!0?(t.onSSRHydrated.push(()=>{Object.assign(e.platform,jn),Br.value=!1}),e.platform=Wi(this)):e.platform=this}};{let t;eu(jn.has,"webStorage",()=>{if(t!==void 0)return t;try{if(window.localStorage)return t=!0,!0}catch{}return t=!1,!1}),Object.assign(od,jn),Br.value===!0&&(Object.assign(od,id,OR),id=null)}function Ma(t){return xa(Kc(t))}function MR(t){return xa(t)}const tu=(t,e)=>{const n=Wi(t);for(const s in t)eu(e,s,()=>n[s],r=>{n[s]=r});return e},$r={hasPassive:!1,passiveCapture:!0,notPassiveCapture:!0};try{const t=Object.defineProperty({},"passive",{get(){Object.assign($r,{hasPassive:!0,passive:{passive:!0},notPassive:{passive:!1},passiveCapture:{passive:!0,capture:!0},notPassiveCapture:{passive:!1,capture:!0}})}});window.addEventListener("qtest",null,t),window.removeEventListener("qtest",null,t)}catch{}function ca(){}function j2(t){return t.button===0}function LR(t){return t.touches&&t.touches[0]?t=t.touches[0]:t.changedTouches&&t.changedTouches[0]?t=t.changedTouches[0]:t.targetTouches&&t.targetTouches[0]&&(t=t.targetTouches[0]),{top:t.clientY,left:t.clientX}}function q2(t){if(t.path)return t.path;if(t.composedPath)return t.composedPath();const e=[];let n=t.target;for(;n;){if(e.push(n),n.tagName==="HTML")return e.push(document),e.push(window),e;n=n.parentElement}}function JE(t){t.stopPropagation()}function ad(t){t.cancelable!==!1&&t.preventDefault()}function ai(t){t.cancelable!==!1&&t.preventDefault(),t.stopPropagation()}function H2(t,e){if(t===void 0||e===!0&&t.__dragPrevented===!0)return;const n=e===!0?s=>{s.__dragPrevented=!0,s.addEventListener("dragstart",ad,$r.notPassiveCapture)}:s=>{delete s.__dragPrevented,s.removeEventListener("dragstart",ad,$r.notPassiveCapture)};t.querySelectorAll("a, img").forEach(n)}function VR(t,e,n){const s=`__q_${e}_evt`;t[s]=t[s]!==void 0?t[s].concat(n):n,n.forEach(r=>{r[0].addEventListener(r[1],t[r[2]],$r[r[3]])})}function FR(t,e){const n=`__q_${e}_evt`;t[n]!==void 0&&(t[n].forEach(s=>{s[0].removeEventListener(s[1],t[s[2]],$r[s[3]])}),t[n]=void 0)}function UR(t,e=250,n){let s=null;function r(){const i=arguments,o=()=>{s=null,t.apply(this,i)};s!==null&&clearTimeout(s),s=setTimeout(o,e)}return r.cancel=()=>{s!==null&&clearTimeout(s)},r}const _h=["sm","md","lg","xl"],{passive:Um}=$r,BR=tu({width:0,height:0,name:"xs",sizes:{sm:600,md:1024,lg:1440,xl:1920},lt:{sm:!0,md:!0,lg:!0,xl:!0},gt:{xs:!1,sm:!1,md:!1,lg:!1},xs:!0,sm:!1,md:!1,lg:!1,xl:!1},{setSizes:ca,setDebounce:ca,install({$q:t,onSSRHydrated:e}){if(t.screen=this,this.__installed===!0){t.config.screen!==void 0&&(t.config.screen.bodyClasses===!1?document.body.classList.remove(`screen--${this.name}`):this.__update(!0));return}const{visualViewport:n}=window,s=n||window,r=document.scrollingElement||document.documentElement,i=n===void 0||jn.is.mobile===!0?()=>[Math.max(window.innerWidth,r.clientWidth),Math.max(window.innerHeight,r.clientHeight)]:()=>[n.width*n.scale+window.innerWidth-r.clientWidth,n.height*n.scale+window.innerHeight-r.clientHeight],o=t.config.screen?.bodyClasses===!0;this.__update=d=>{const[p,m]=i();if(m!==this.height&&(this.height=m),p!==this.width)this.width=p;else if(d!==!0)return;let E=this.sizes;this.gt.xs=p>=E.sm,this.gt.sm=p>=E.md,this.gt.md=p>=E.lg,this.gt.lg=p>=E.xl,this.lt.sm=p<E.sm,this.lt.md=p<E.md,this.lt.lg=p<E.lg,this.lt.xl=p<E.xl,this.xs=this.lt.sm,this.sm=this.gt.xs===!0&&this.lt.md===!0,this.md=this.gt.sm===!0&&this.lt.lg===!0,this.lg=this.gt.md===!0&&this.lt.xl===!0,this.xl=this.gt.lg,E=this.xs===!0&&"xs"||this.sm===!0&&"sm"||this.md===!0&&"md"||this.lg===!0&&"lg"||"xl",E!==this.name&&(o===!0&&(document.body.classList.remove(`screen--${this.name}`),document.body.classList.add(`screen--${E}`)),this.name=E)};let a,c={},u=16;this.setSizes=d=>{_h.forEach(p=>{d[p]!==void 0&&(c[p]=d[p])})},this.setDebounce=d=>{u=d};const h=()=>{const d=getComputedStyle(document.body);d.getPropertyValue("--q-size-sm")&&_h.forEach(p=>{this.sizes[p]=parseInt(d.getPropertyValue(`--q-size-${p}`),10)}),this.setSizes=p=>{_h.forEach(m=>{p[m]&&(this.sizes[m]=p[m])}),this.__update(!0)},this.setDebounce=p=>{a!==void 0&&s.removeEventListener("resize",a,Um),a=p>0?UR(this.__update,p):this.__update,s.addEventListener("resize",a,Um)},this.setDebounce(u),Object.keys(c).length!==0?(this.setSizes(c),c=void 0):this.__update(),o===!0&&this.name==="xs"&&document.body.classList.add("screen--xs")};Br.value===!0?e.push(h):h()}}),xt=tu({isActive:!1,mode:!1},{__media:void 0,set(t){xt.mode=t,t==="auto"?(xt.__media===void 0&&(xt.__media=window.matchMedia("(prefers-color-scheme: dark)"),xt.__updateMedia=()=>{xt.set("auto")},xt.__media.addListener(xt.__updateMedia)),t=xt.__media.matches):xt.__media!==void 0&&(xt.__media.removeListener(xt.__updateMedia),xt.__media=void 0),xt.isActive=t===!0,document.body.classList.remove(`body--${t===!0?"light":"dark"}`),document.body.classList.add(`body--${t===!0?"dark":"light"}`)},toggle(){xt.set(xt.isActive===!1)},install({$q:t,ssrContext:e}){const n=t.config.dark;t.dark=this,this.__installed!==!0&&this.set(n!==void 0?n:!1)}});function $R(t,e,n=document.body){if(typeof t!="string")throw new TypeError("Expected a string as propName");if(typeof e!="string")throw new TypeError("Expected a string as value");if(!(n instanceof Element))throw new TypeError("Expected a DOM element");n.style.setProperty(`--q-${t}`,e)}let ZE=!1;function jR(t){ZE=t.isComposing===!0}function qR(t){return ZE===!0||t!==Object(t)||t.isComposing===!0||t.qKeyEvent===!0}function ld(t,e){return qR(t)===!0?!1:[].concat(e).includes(t.keyCode)}function ew(t){if(t.ios===!0)return"ios";if(t.android===!0)return"android"}function HR({is:t,has:e,within:n},s){const r=[t.desktop===!0?"desktop":"mobile",`${e.touch===!1?"no-":""}touch`];if(t.mobile===!0){const i=ew(t);i!==void 0&&r.push("platform-"+i)}if(t.nativeMobile===!0){const i=t.nativeMobileWrapper;r.push(i),r.push("native-mobile"),t.ios===!0&&(s[i]===void 0||s[i].iosStatusBarPadding!==!1)&&r.push("q-ios-padding")}else t.electron===!0?r.push("electron"):t.bex===!0&&r.push("bex");return n.iframe===!0&&r.push("within-iframe"),r}function WR(){const{is:t}=jn,e=document.body.className,n=new Set(e.replace(/ {2}/g," ").split(" "));if(t.nativeMobile!==!0&&t.electron!==!0&&t.bex!==!0){if(t.desktop===!0)n.delete("mobile"),n.delete("platform-ios"),n.delete("platform-android"),n.add("desktop");else if(t.mobile===!0){n.delete("desktop"),n.add("mobile"),n.delete("platform-ios"),n.delete("platform-android");const r=ew(t);r!==void 0&&n.add(`platform-${r}`)}}jn.has.touch===!0&&(n.delete("no-touch"),n.add("touch")),jn.within.iframe===!0&&n.add("within-iframe");const s=Array.from(n).join(" ");e!==s&&(document.body.className=s)}function zR(t){for(const e in t)$R(e,t[e])}const GR={install(t){if(this.__installed!==!0){if(Br.value===!0)WR();else{const{$q:e}=t;e.config.brand!==void 0&&zR(e.config.brand);const n=HR(jn,e.config);document.body.classList.add.apply(document.body.classList,n)}jn.is.ios===!0&&document.body.addEventListener("touchstart",ca),window.addEventListener("keydown",jR,!0)}}},tw=()=>!0;function KR(t){return typeof t=="string"&&t!==""&&t!=="/"&&t!=="#/"}function QR(t){return t.startsWith("#")===!0&&(t=t.substring(1)),t.startsWith("/")===!1&&(t="/"+t),t.endsWith("/")===!0&&(t=t.substring(0,t.length-1)),"#"+t}function YR(t){if(t.backButtonExit===!1)return()=>!1;if(t.backButtonExit==="*")return tw;const e=["#/"];return Array.isArray(t.backButtonExit)===!0&&e.push(...t.backButtonExit.filter(KR).map(QR)),()=>e.includes(window.location.hash)}const XR={__history:[],add:ca,remove:ca,install({$q:t}){if(this.__installed===!0)return;const{cordova:e,capacitor:n}=jn.is;if(e!==!0&&n!==!0)return;const s=t.config[e===!0?"cordova":"capacitor"];if(s?.backButton===!1||n===!0&&(window.Capacitor===void 0||window.Capacitor.Plugins.App===void 0))return;this.add=o=>{o.condition===void 0&&(o.condition=tw),this.__history.push(o)},this.remove=o=>{const a=this.__history.indexOf(o);a>=0&&this.__history.splice(a,1)};const r=YR(Object.assign({backButtonExit:!0},s)),i=()=>{if(this.__history.length){const o=this.__history[this.__history.length-1];o.condition()===!0&&(this.__history.pop(),o.handler())}else r()===!0?navigator.app.exitApp():window.history.back()};e===!0?document.addEventListener("deviceready",()=>{document.addEventListener("backbutton",i,!1)}):window.Capacitor.Plugins.App.addListener("backButton",i)}},Bm={isoName:"en-US",nativeName:"English (US)",label:{clear:"Clear",ok:"OK",cancel:"Cancel",close:"Close",set:"Set",select:"Select",reset:"Reset",remove:"Remove",update:"Update",create:"Create",search:"Search",filter:"Filter",refresh:"Refresh",expand:t=>t?`Expand "${t}"`:"Expand",collapse:t=>t?`Collapse "${t}"`:"Collapse"},date:{days:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),daysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),firstDayOfWeek:0,format24h:!1,pluralDay:"days",prevMonth:"Previous month",nextMonth:"Next month",prevYear:"Previous year",nextYear:"Next year",today:"Today",prevRangeYears:t=>`Previous ${t} years`,nextRangeYears:t=>`Next ${t} years`},table:{noData:"No data available",noResults:"No matching records found",loading:"Loading...",selectedRecords:t=>t===1?"1 record selected.":(t===0?"No":t)+" records selected.",recordsPerPage:"Records per page:",allRows:"All",pagination:(t,e,n)=>t+"-"+e+" of "+n,columns:"Columns"},pagination:{first:"First page",prev:"Previous page",next:"Next page",last:"Last page"},editor:{url:"URL",bold:"Bold",italic:"Italic",strikethrough:"Strikethrough",underline:"Underline",unorderedList:"Unordered List",orderedList:"Ordered List",subscript:"Subscript",superscript:"Superscript",hyperlink:"Hyperlink",toggleFullscreen:"Toggle Fullscreen",quote:"Quote",left:"Left align",center:"Center align",right:"Right align",justify:"Justify align",print:"Print",outdent:"Decrease indentation",indent:"Increase indentation",removeFormat:"Remove formatting",formatting:"Formatting",fontSize:"Font Size",align:"Align",hr:"Insert Horizontal Rule",undo:"Undo",redo:"Redo",heading1:"Heading 1",heading2:"Heading 2",heading3:"Heading 3",heading4:"Heading 4",heading5:"Heading 5",heading6:"Heading 6",paragraph:"Paragraph",code:"Code",size1:"Very small",size2:"A bit small",size3:"Normal",size4:"Medium-large",size5:"Big",size6:"Very big",size7:"Maximum",defaultFont:"Default Font",viewSource:"View Source"},tree:{noNodes:"No nodes available",noResults:"No matching nodes found"}};function $m(){const t=Array.isArray(navigator.languages)===!0&&navigator.languages.length!==0?navigator.languages[0]:navigator.language;if(typeof t=="string")return t.split(/[-_]/).map((e,n)=>n===0?e.toLowerCase():n>1||e.length<4?e.toUpperCase():e[0].toUpperCase()+e.slice(1).toLowerCase()).join("-")}const Vs=tu({__qLang:{}},{getLocale:$m,set(t=Bm,e){const n={...t,rtl:t.rtl===!0,getLocale:$m};{if(n.set=Vs.set,Vs.__langConfig===void 0||Vs.__langConfig.noHtmlAttrs!==!0){const s=document.documentElement;s.setAttribute("dir",n.rtl===!0?"rtl":"ltr"),s.setAttribute("lang",n.isoName)}Object.assign(Vs.__qLang,n)}},install({$q:t,lang:e,ssrContext:n}){t.lang=Vs.__qLang,Vs.__langConfig=t.config.lang,this.__installed===!0?e!==void 0&&this.set(e):(this.props=new Proxy(this.__qLang,{get(){return Reflect.get(...arguments)},ownKeys(s){return Reflect.ownKeys(s).filter(r=>r!=="set"&&r!=="getLocale")}}),this.set(e||Bm))}}),JR={name:"material-icons",type:{positive:"check_circle",negative:"warning",info:"info",warning:"priority_high"},arrow:{up:"arrow_upward",right:"arrow_forward",down:"arrow_downward",left:"arrow_back",dropdown:"arrow_drop_down"},chevron:{left:"chevron_left",right:"chevron_right"},colorPicker:{spectrum:"gradient",tune:"tune",palette:"style"},pullToRefresh:{icon:"refresh"},carousel:{left:"chevron_left",right:"chevron_right",up:"keyboard_arrow_up",down:"keyboard_arrow_down",navigationIcon:"lens"},chip:{remove:"cancel",selected:"check"},datetime:{arrowLeft:"chevron_left",arrowRight:"chevron_right",now:"access_time",today:"today"},editor:{bold:"format_bold",italic:"format_italic",strikethrough:"strikethrough_s",underline:"format_underlined",unorderedList:"format_list_bulleted",orderedList:"format_list_numbered",subscript:"vertical_align_bottom",superscript:"vertical_align_top",hyperlink:"link",toggleFullscreen:"fullscreen",quote:"format_quote",left:"format_align_left",center:"format_align_center",right:"format_align_right",justify:"format_align_justify",print:"print",outdent:"format_indent_decrease",indent:"format_indent_increase",removeFormat:"format_clear",formatting:"text_format",fontSize:"format_size",align:"format_align_left",hr:"remove",undo:"undo",redo:"redo",heading:"format_size",code:"code",size:"format_size",font:"font_download",viewSource:"code"},expansionItem:{icon:"keyboard_arrow_down",denseIcon:"arrow_drop_down"},fab:{icon:"add",activeIcon:"close"},field:{clear:"cancel",error:"error"},pagination:{first:"first_page",prev:"keyboard_arrow_left",next:"keyboard_arrow_right",last:"last_page"},rating:{icon:"grade"},stepper:{done:"check",active:"edit",error:"warning"},tabs:{left:"chevron_left",right:"chevron_right",up:"keyboard_arrow_up",down:"keyboard_arrow_down"},table:{arrowUp:"arrow_upward",warning:"warning",firstPage:"first_page",prevPage:"chevron_left",nextPage:"chevron_right",lastPage:"last_page"},tree:{icon:"play_arrow"},uploader:{done:"done",clear:"clear",add:"add_box",upload:"cloud_upload",removeQueue:"clear_all",removeUploaded:"done_all"}},rc=tu({iconMapFn:null,__qIconSet:{}},{set(t,e){const n={...t};n.set=rc.set,Object.assign(rc.__qIconSet,n)},install({$q:t,iconSet:e,ssrContext:n}){t.config.iconMapFn!==void 0&&(this.iconMapFn=t.config.iconMapFn),t.iconSet=this.__qIconSet,eu(t,"iconMapFn",()=>this.iconMapFn,s=>{this.iconMapFn=s}),this.__installed===!0?e!==void 0&&this.set(e):(this.props=new Proxy(this.__qIconSet,{get(){return Reflect.get(...arguments)},ownKeys(s){return Reflect.ownKeys(s).filter(r=>r!=="set")}}),this.set(e||JR))}}),nw="_q_",W2="_q_l_",z2="_q_pc_",G2="_q_fo_";function K2(){}const ic={};let sw=!1;function ZR(){sw=!0}function yh(t,e){if(t===e)return!0;if(t!==null&&e!==null&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;let n,s;if(t.constructor===Array){if(n=t.length,n!==e.length)return!1;for(s=n;s--!==0;)if(yh(t[s],e[s])!==!0)return!1;return!0}if(t.constructor===Map){if(t.size!==e.size)return!1;let i=t.entries();for(s=i.next();s.done!==!0;){if(e.has(s.value[0])!==!0)return!1;s=i.next()}for(i=t.entries(),s=i.next();s.done!==!0;){if(yh(s.value[1],e.get(s.value[0]))!==!0)return!1;s=i.next()}return!0}if(t.constructor===Set){if(t.size!==e.size)return!1;const i=t.entries();for(s=i.next();s.done!==!0;){if(e.has(s.value[0])!==!0)return!1;s=i.next()}return!0}if(t.buffer!=null&&t.buffer.constructor===ArrayBuffer){if(n=t.length,n!==e.length)return!1;for(s=n;s--!==0;)if(t[s]!==e[s])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();const r=Object.keys(t).filter(i=>t[i]!==void 0);if(n=r.length,n!==Object.keys(e).filter(i=>e[i]!==void 0).length)return!1;for(s=n;s--!==0;){const i=r[s];if(yh(t[i],e[i])!==!0)return!1}return!0}return t!==t&&e!==e}function ua(t){return t!==null&&typeof t=="object"&&Array.isArray(t)!==!0}function Q2(t){return Object.prototype.toString.call(t)==="[object Date]"}function Y2(t){return typeof t=="number"&&isFinite(t)}const jm=[od,GR,xt,BR,XR,Vs,rc];function e0(t,e){const n=YE(t);n.config.globalProperties=e.config.globalProperties;const{reload:s,...r}=e._context;return Object.assign(n._context,r),n}function qm(t,e){e.forEach(n=>{n.install(t),n.__installed=!0})}function t0(t,e,n){t.config.globalProperties.$q=n.$q,t.provide(nw,n.$q),qm(n,jm),e.components!==void 0&&Object.values(e.components).forEach(s=>{ua(s)===!0&&s.name!==void 0&&t.component(s.name,s)}),e.directives!==void 0&&Object.values(e.directives).forEach(s=>{ua(s)===!0&&s.name!==void 0&&t.directive(s.name,s)}),e.plugins!==void 0&&qm(n,Object.values(e.plugins).filter(s=>typeof s.install=="function"&&jm.includes(s)===!1)),Br.value===!0&&(n.$q.onSSRHydrated=()=>{n.onSSRHydrated.forEach(s=>{s()}),n.$q.onSSRHydrated=()=>{}})}const n0=function(t,e={}){const n={version:"2.18.2"};sw===!1?(e.config!==void 0&&Object.assign(ic,e.config),n.config={...ic},ZR()):n.config=e.config||{},t0(t,e,{parentApp:t,$q:n,lang:e.lang,iconSet:e.iconSet,onSSRHydrated:[]})},s0={name:"Quasar",version:"2.18.2",install:n0,lang:Vs,iconSet:rc};/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const pi=typeof document<"u";function rw(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function r0(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&rw(t.default)}const Oe=Object.assign;function vh(t,e){const n={};for(const s in e){const r=e[s];n[s]=Dn(r)?r.map(t):t(r)}return n}const qo=()=>{},Dn=Array.isArray,iw=/#/g,i0=/&/g,o0=/\//g,a0=/=/g,l0=/\?/g,ow=/\+/g,c0=/%5B/g,u0=/%5D/g,aw=/%5E/g,h0=/%60/g,lw=/%7B/g,d0=/%7C/g,cw=/%7D/g,f0=/%20/g;function Sf(t){return encodeURI(""+t).replace(d0,"|").replace(c0,"[").replace(u0,"]")}function p0(t){return Sf(t).replace(lw,"{").replace(cw,"}").replace(aw,"^")}function cd(t){return Sf(t).replace(ow,"%2B").replace(f0,"+").replace(iw,"%23").replace(i0,"%26").replace(h0,"`").replace(lw,"{").replace(cw,"}").replace(aw,"^")}function g0(t){return cd(t).replace(a0,"%3D")}function m0(t){return Sf(t).replace(iw,"%23").replace(l0,"%3F")}function _0(t){return t==null?"":m0(t).replace(o0,"%2F")}function ha(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const y0=/\/$/,v0=t=>t.replace(y0,"");function Eh(t,e,n="/"){let s,r={},i="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(s=e.slice(0,c),i=e.slice(c+1,a>-1?a:e.length),r=t(i)),a>-1&&(s=s||e.slice(0,a),o=e.slice(a,e.length)),s=I0(s??e,n),{fullPath:s+(i&&"?")+i+o,path:s,query:r,hash:ha(o)}}function E0(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Hm(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function w0(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&xi(e.matched[s],n.matched[r])&&uw(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function xi(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function uw(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!T0(t[n],e[n]))return!1;return!0}function T0(t,e){return Dn(t)?Wm(t,e):Dn(e)?Wm(e,t):t===e}function Wm(t,e){return Dn(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function I0(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const ks={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var da;(function(t){t.pop="pop",t.push="push"})(da||(da={}));var Ho;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Ho||(Ho={}));function b0(t){if(!t)if(pi){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),v0(t)}const C0=/^[^#]+#/;function S0(t,e){return t.replace(C0,"#")+e}function A0(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const nu=()=>({left:window.scrollX,top:window.scrollY});function R0(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=A0(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function zm(t,e){return(history.state?history.state.position-e:-1)+t}const ud=new Map;function P0(t,e){ud.set(t,e)}function k0(t){const e=ud.get(t);return ud.delete(t),e}let N0=()=>location.protocol+"//"+location.host;function hw(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){let a=r.includes(t.slice(i))?t.slice(i).length:1,c=r.slice(a);return c[0]!=="/"&&(c="/"+c),Hm(c,"")}return Hm(n,t)+s+r}function x0(t,e,n,s){let r=[],i=[],o=null;const a=({state:p})=>{const m=hw(t,location),E=n.value,R=e.value;let P=0;if(p){if(n.value=m,e.value=p,o&&o===E){o=null;return}P=R?p.position-R.position:0}else s(m);r.forEach(D=>{D(n.value,E,{delta:P,type:da.pop,direction:P?P>0?Ho.forward:Ho.back:Ho.unknown})})};function c(){o=n.value}function u(p){r.push(p);const m=()=>{const E=r.indexOf(p);E>-1&&r.splice(E,1)};return i.push(m),m}function h(){const{history:p}=window;p.state&&p.replaceState(Oe({},p.state,{scroll:nu()}),"")}function d(){for(const p of i)p();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",h)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",h,{passive:!0}),{pauseListeners:c,listen:u,destroy:d}}function Gm(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?nu():null}}function D0(t){const{history:e,location:n}=window,s={value:hw(t,n)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,h){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+c:N0()+t+c;try{e[h?"replaceState":"pushState"](u,"",p),r.value=u}catch(m){console.error(m),n[h?"replace":"assign"](p)}}function o(c,u){const h=Oe({},e.state,Gm(r.value.back,c,r.value.forward,!0),u,{position:r.value.position});i(c,h,!0),s.value=c}function a(c,u){const h=Oe({},r.value,e.state,{forward:c,scroll:nu()});i(h.current,h,!0);const d=Oe({},Gm(s.value,c,null),{position:h.position+1},u);i(c,d,!1),s.value=c}return{location:s,state:r,push:a,replace:o}}function O0(t){t=b0(t);const e=D0(t),n=x0(t,e.state,e.location,e.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=Oe({location:"",base:t,go:s,createHref:S0.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function M0(t){return typeof t=="string"||t&&typeof t=="object"}function dw(t){return typeof t=="string"||typeof t=="symbol"}const fw=Symbol("");var Km;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Km||(Km={}));function Di(t,e){return Oe(new Error,{type:t,[fw]:!0},e)}function ss(t,e){return t instanceof Error&&fw in t&&(e==null||!!(t.type&e))}const Qm="[^/]+?",L0={sensitive:!1,strict:!1,start:!0,end:!0},V0=/[.+*?^${}()[\]/\\]/g;function F0(t,e){const n=Oe({},L0,e),s=[];let r=n.start?"^":"";const i=[];for(const u of t){const h=u.length?[]:[90];n.strict&&!u.length&&(r+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=40+(n.sensitive?.25:0);if(p.type===0)d||(r+="/"),r+=p.value.replace(V0,"\\$&"),m+=40;else if(p.type===1){const{value:E,repeatable:R,optional:P,regexp:D}=p;i.push({name:E,repeatable:R,optional:P});const O=D||Qm;if(O!==Qm){m+=10;try{new RegExp(`(${O})`)}catch(B){throw new Error(`Invalid custom RegExp for param "${E}" (${O}): `+B.message)}}let V=R?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;d||(V=P&&u.length<2?`(?:/${V})`:"/"+V),P&&(V+="?"),r+=V,m+=20,P&&(m+=-8),R&&(m+=-20),O===".*"&&(m+=-50)}h.push(m)}s.push(h)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(u){const h=u.match(o),d={};if(!h)return null;for(let p=1;p<h.length;p++){const m=h[p]||"",E=i[p-1];d[E.name]=m&&E.repeatable?m.split("/"):m}return d}function c(u){let h="",d=!1;for(const p of t){(!d||!h.endsWith("/"))&&(h+="/"),d=!1;for(const m of p)if(m.type===0)h+=m.value;else if(m.type===1){const{value:E,repeatable:R,optional:P}=m,D=E in u?u[E]:"";if(Dn(D)&&!R)throw new Error(`Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`);const O=Dn(D)?D.join("/"):D;if(!O)if(P)p.length<2&&(h.endsWith("/")?h=h.slice(0,-1):d=!0);else throw new Error(`Missing required param "${E}"`);h+=O}}return h||"/"}return{re:o,score:s,keys:i,parse:a,stringify:c}}function U0(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function pw(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const i=U0(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(Ym(s))return 1;if(Ym(r))return-1}return r.length-s.length}function Ym(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const B0={type:0,value:""},$0=/[a-zA-Z0-9_]/;function j0(t){if(!t)return[[]];if(t==="/")return[[B0]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=0,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,c,u="",h="";function d(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:h,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:c==="/"?(u&&d(),o()):c===":"?(d(),n=1):p();break;case 4:p(),n=s;break;case 1:c==="("?n=2:$0.test(c)?p():(d(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+c:n=3:h+=c;break;case 3:d(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,h="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),d(),o(),r}function q0(t,e,n){const s=F0(j0(t.path),n),r=Oe(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function H0(t,e){const n=[],s=new Map;e=e_({strict:!1,end:!0,sensitive:!1},e);function r(d){return s.get(d)}function i(d,p,m){const E=!m,R=Jm(d);R.aliasOf=m&&m.record;const P=e_(e,d),D=[R];if("alias"in d){const B=typeof d.alias=="string"?[d.alias]:d.alias;for(const K of B)D.push(Jm(Oe({},R,{components:m?m.record.components:R.components,path:K,aliasOf:m?m.record:R})))}let O,V;for(const B of D){const{path:K}=B;if(p&&K[0]!=="/"){const Z=p.record.path,S=Z[Z.length-1]==="/"?"":"/";B.path=p.record.path+(K&&S+K)}if(O=q0(B,p,P),m?m.alias.push(O):(V=V||O,V!==O&&V.alias.push(O),E&&d.name&&!Zm(O)&&o(d.name)),gw(O)&&c(O),R.children){const Z=R.children;for(let S=0;S<Z.length;S++)i(Z[S],O,m&&m.children[S])}m=m||O}return V?()=>{o(V)}:qo}function o(d){if(dw(d)){const p=s.get(d);p&&(s.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(o),d.alias.forEach(o))}}function a(){return n}function c(d){const p=G0(d,n);n.splice(p,0,d),d.record.name&&!Zm(d)&&s.set(d.record.name,d)}function u(d,p){let m,E={},R,P;if("name"in d&&d.name){if(m=s.get(d.name),!m)throw Di(1,{location:d});P=m.record.name,E=Oe(Xm(p.params,m.keys.filter(V=>!V.optional).concat(m.parent?m.parent.keys.filter(V=>V.optional):[]).map(V=>V.name)),d.params&&Xm(d.params,m.keys.map(V=>V.name))),R=m.stringify(E)}else if(d.path!=null)R=d.path,m=n.find(V=>V.re.test(R)),m&&(E=m.parse(R),P=m.record.name);else{if(m=p.name?s.get(p.name):n.find(V=>V.re.test(p.path)),!m)throw Di(1,{location:d,currentLocation:p});P=m.record.name,E=Oe({},p.params,d.params),R=m.stringify(E)}const D=[];let O=m;for(;O;)D.unshift(O.record),O=O.parent;return{name:P,path:R,params:E,matched:D,meta:z0(D)}}t.forEach(d=>i(d));function h(){n.length=0,s.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:h,getRoutes:a,getRecordMatcher:r}}function Xm(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Jm(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:W0(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function W0(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Zm(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function z0(t){return t.reduce((e,n)=>Oe(e,n.meta),{})}function e_(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function G0(t,e){let n=0,s=e.length;for(;n!==s;){const i=n+s>>1;pw(t,e[i])<0?s=i:n=i+1}const r=K0(t);return r&&(s=e.lastIndexOf(r,s-1)),s}function K0(t){let e=t;for(;e=e.parent;)if(gw(e)&&pw(t,e)===0)return e}function gw({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Q0(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<s.length;++r){const i=s[r].replace(ow," "),o=i.indexOf("="),a=ha(o<0?i:i.slice(0,o)),c=o<0?null:ha(i.slice(o+1));if(a in e){let u=e[a];Dn(u)||(u=e[a]=[u]),u.push(c)}else e[a]=c}return e}function t_(t){let e="";for(let n in t){const s=t[n];if(n=g0(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Dn(s)?s.map(i=>i&&cd(i)):[s&&cd(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function Y0(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Dn(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const X0=Symbol(""),n_=Symbol(""),su=Symbol(""),Af=Symbol(""),hd=Symbol("");function vo(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Fs(t,e,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((a,c)=>{const u=p=>{p===!1?c(Di(4,{from:n,to:e})):p instanceof Error?c(p):M0(p)?c(Di(2,{from:e,to:p})):(o&&s.enterCallbacks[r]===o&&typeof p=="function"&&o.push(p),a())},h=i(()=>t.call(s&&s.instances[r],e,n,u));let d=Promise.resolve(h);t.length<3&&(d=d.then(u)),d.catch(p=>c(p))})}function wh(t,e,n,s,r=i=>i()){const i=[];for(const o of t)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(rw(c)){const h=(c.__vccOpts||c)[e];h&&i.push(Fs(h,n,s,o,a,r))}else{let u=c();i.push(()=>u.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const d=r0(h)?h.default:h;o.mods[a]=h,o.components[a]=d;const m=(d.__vccOpts||d)[e];return m&&Fs(m,n,s,o,a,r)()}))}}return i}function s_(t){const e=gn(su),n=gn(Af),s=oe(()=>{const c=Or(t.to);return e.resolve(c)}),r=oe(()=>{const{matched:c}=s.value,{length:u}=c,h=c[u-1],d=n.matched;if(!h||!d.length)return-1;const p=d.findIndex(xi.bind(null,h));if(p>-1)return p;const m=r_(c[u-2]);return u>1&&r_(h)===m&&d[d.length-1].path!==m?d.findIndex(xi.bind(null,c[u-2])):p}),i=oe(()=>r.value>-1&&nP(n.params,s.value.params)),o=oe(()=>r.value>-1&&r.value===n.matched.length-1&&uw(n.params,s.value.params));function a(c={}){if(tP(c)){const u=e[Or(t.replace)?"replace":"push"](Or(t.to)).catch(qo);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:oe(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}function J0(t){return t.length===1?t[0]:t}const Z0=Kc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:s_,setup(t,{slots:e}){const n=Wi(s_(t)),{options:s}=gn(su),r=oe(()=>({[i_(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[i_(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&J0(e.default(n));return t.custom?i:pe("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),eP=Z0;function tP(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function nP(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Dn(r)||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function r_(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const i_=(t,e,n)=>t??e??n,sP=Kc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=gn(hd),r=oe(()=>t.route||s.value),i=gn(n_,0),o=oe(()=>{let u=Or(i);const{matched:h}=r.value;let d;for(;(d=h[u])&&!d.components;)u++;return u}),a=oe(()=>r.value.matched[o.value]);xl(n_,oe(()=>o.value+1)),xl(X0,a),xl(hd,r);const c=Zs();return $o(()=>[c.value,a.value,t.name],([u,h,d],[p,m,E])=>{h&&(h.instances[d]=u,m&&m!==h&&u&&u===p&&(h.leaveGuards.size||(h.leaveGuards=m.leaveGuards),h.updateGuards.size||(h.updateGuards=m.updateGuards))),u&&h&&(!m||!xi(h,m)||!p)&&(h.enterCallbacks[d]||[]).forEach(R=>R(u))},{flush:"post"}),()=>{const u=r.value,h=t.name,d=a.value,p=d&&d.components[h];if(!p)return o_(n.default,{Component:p,route:u});const m=d.props[h],E=m?m===!0?u.params:typeof m=="function"?m(u):m:null,P=pe(p,Oe({},E,e,{onVnodeUnmounted:D=>{D.component.isUnmounted&&(d.instances[h]=null)},ref:c}));return o_(n.default,{Component:P,route:u})||P}}});function o_(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const rP=sP;function iP(t){const e=H0(t.routes,t),n=t.parseQuery||Q0,s=t.stringifyQuery||t_,r=t.history,i=vo(),o=vo(),a=vo(),c=kS(ks);let u=ks;pi&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=vh.bind(null,M=>""+M),d=vh.bind(null,_0),p=vh.bind(null,ha);function m(M,ee){let J,ne;return dw(M)?(J=e.getRecordMatcher(M),ne=ee):ne=M,e.addRoute(ne,J)}function E(M){const ee=e.getRecordMatcher(M);ee&&e.removeRoute(ee)}function R(){return e.getRoutes().map(M=>M.record)}function P(M){return!!e.getRecordMatcher(M)}function D(M,ee){if(ee=Oe({},ee||c.value),typeof M=="string"){const k=Eh(n,M,ee.path),L=e.resolve({path:k.path},ee),$=r.createHref(k.fullPath);return Oe(k,L,{params:p(L.params),hash:ha(k.hash),redirectedFrom:void 0,href:$})}let J;if(M.path!=null)J=Oe({},M,{path:Eh(n,M.path,ee.path).path});else{const k=Oe({},M.params);for(const L in k)k[L]==null&&delete k[L];J=Oe({},M,{params:d(k)}),ee.params=d(ee.params)}const ne=e.resolve(J,ee),Ne=M.hash||"";ne.params=h(p(ne.params));const T=E0(s,Oe({},M,{hash:p0(Ne),path:ne.path})),I=r.createHref(T);return Oe({fullPath:T,hash:Ne,query:s===t_?Y0(M.query):M.query||{}},ne,{redirectedFrom:void 0,href:I})}function O(M){return typeof M=="string"?Eh(n,M,c.value.path):Oe({},M)}function V(M,ee){if(u!==M)return Di(8,{from:ee,to:M})}function B(M){return S(M)}function K(M){return B(Oe(O(M),{replace:!0}))}function Z(M){const ee=M.matched[M.matched.length-1];if(ee&&ee.redirect){const{redirect:J}=ee;let ne=typeof J=="function"?J(M):J;return typeof ne=="string"&&(ne=ne.includes("?")||ne.includes("#")?ne=O(ne):{path:ne},ne.params={}),Oe({query:M.query,hash:M.hash,params:ne.path!=null?{}:M.params},ne)}}function S(M,ee){const J=u=D(M),ne=c.value,Ne=M.state,T=M.force,I=M.replace===!0,k=Z(J);if(k)return S(Oe(O(k),{state:typeof k=="object"?Oe({},Ne,k.state):Ne,force:T,replace:I}),ee||J);const L=J;L.redirectedFrom=ee;let $;return!T&&w0(s,ne,J)&&($=Di(16,{to:L,from:ne}),ln(ne,ne,!0,!1)),($?Promise.resolve($):C(L,ne)).catch(F=>ss(F)?ss(F,2)?F:yn(F):be(F,L,ne)).then(F=>{if(F){if(ss(F,2))return S(Oe({replace:I},O(F.to),{state:typeof F.to=="object"?Oe({},Ne,F.to.state):Ne,force:T}),ee||L)}else F=b(L,ne,!0,I,Ne);return A(L,ne,F),F})}function v(M,ee){const J=V(M,ee);return J?Promise.reject(J):Promise.resolve()}function y(M){const ee=bs.values().next().value;return ee&&typeof ee.runWithContext=="function"?ee.runWithContext(M):M()}function C(M,ee){let J;const[ne,Ne,T]=oP(M,ee);J=wh(ne.reverse(),"beforeRouteLeave",M,ee);for(const k of ne)k.leaveGuards.forEach(L=>{J.push(Fs(L,M,ee))});const I=v.bind(null,M,ee);return J.push(I),Qt(J).then(()=>{J=[];for(const k of i.list())J.push(Fs(k,M,ee));return J.push(I),Qt(J)}).then(()=>{J=wh(Ne,"beforeRouteUpdate",M,ee);for(const k of Ne)k.updateGuards.forEach(L=>{J.push(Fs(L,M,ee))});return J.push(I),Qt(J)}).then(()=>{J=[];for(const k of T)if(k.beforeEnter)if(Dn(k.beforeEnter))for(const L of k.beforeEnter)J.push(Fs(L,M,ee));else J.push(Fs(k.beforeEnter,M,ee));return J.push(I),Qt(J)}).then(()=>(M.matched.forEach(k=>k.enterCallbacks={}),J=wh(T,"beforeRouteEnter",M,ee,y),J.push(I),Qt(J))).then(()=>{J=[];for(const k of o.list())J.push(Fs(k,M,ee));return J.push(I),Qt(J)}).catch(k=>ss(k,8)?k:Promise.reject(k))}function A(M,ee,J){a.list().forEach(ne=>y(()=>ne(M,ee,J)))}function b(M,ee,J,ne,Ne){const T=V(M,ee);if(T)return T;const I=ee===ks,k=pi?history.state:{};J&&(ne||I?r.replace(M.fullPath,Oe({scroll:I&&k&&k.scroll},Ne)):r.push(M.fullPath,Ne)),c.value=M,ln(M,ee,J,I),yn()}let w;function Q(){w||(w=r.listen((M,ee,J)=>{if(!On.listening)return;const ne=D(M),Ne=Z(ne);if(Ne){S(Oe(Ne,{replace:!0,force:!0}),ne).catch(qo);return}u=ne;const T=c.value;pi&&P0(zm(T.fullPath,J.delta),nu()),C(ne,T).catch(I=>ss(I,12)?I:ss(I,2)?(S(Oe(O(I.to),{force:!0}),ne).then(k=>{ss(k,20)&&!J.delta&&J.type===da.pop&&r.go(-1,!1)}).catch(qo),Promise.reject()):(J.delta&&r.go(-J.delta,!1),be(I,ne,T))).then(I=>{I=I||b(ne,T,!1),I&&(J.delta&&!ss(I,8)?r.go(-J.delta,!1):J.type===da.pop&&ss(I,20)&&r.go(-1,!1)),A(ne,T,I)}).catch(qo)}))}let ve=vo(),Ve=vo(),Ae;function be(M,ee,J){yn(M);const ne=Ve.list();return ne.length?ne.forEach(Ne=>Ne(M,ee,J)):console.error(M),Promise.reject(M)}function tn(){return Ae&&c.value!==ks?Promise.resolve():new Promise((M,ee)=>{ve.add([M,ee])})}function yn(M){return Ae||(Ae=!M,Q(),ve.list().forEach(([ee,J])=>M?J(M):ee()),ve.reset()),M}function ln(M,ee,J,ne){const{scrollBehavior:Ne}=t;if(!pi||!Ne)return Promise.resolve();const T=!J&&k0(zm(M.fullPath,0))||(ne||!J)&&history.state&&history.state.scroll||null;return nE().then(()=>Ne(M,ee,T)).then(I=>I&&R0(I)).catch(I=>be(I,M,ee))}const Qe=M=>r.go(M);let Ye;const bs=new Set,On={currentRoute:c,listening:!0,addRoute:m,removeRoute:E,clearRoutes:e.clearRoutes,hasRoute:P,getRoutes:R,resolve:D,options:t,push:B,replace:K,go:Qe,back:()=>Qe(-1),forward:()=>Qe(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:Ve.add,isReady:tn,install(M){const ee=this;M.component("RouterLink",eP),M.component("RouterView",rP),M.config.globalProperties.$router=ee,Object.defineProperty(M.config.globalProperties,"$route",{enumerable:!0,get:()=>Or(c)}),pi&&!Ye&&c.value===ks&&(Ye=!0,B(r.location).catch(Ne=>{}));const J={};for(const Ne in ks)Object.defineProperty(J,Ne,{get:()=>c.value[Ne],enumerable:!0});M.provide(su,ee),M.provide(Af,Xv(J)),M.provide(hd,c);const ne=M.unmount;bs.add(M),M.unmount=function(){bs.delete(M),bs.size<1&&(u=ks,w&&w(),w=null,c.value=ks,Ye=!1,Ae=!1),ne()}}};function Qt(M){return M.reduce((ee,J)=>ee.then(()=>y(J)),Promise.resolve())}return On}function oP(t,e){const n=[],s=[],r=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(u=>xi(u,a))?s.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(u=>xi(u,c))||r.push(c))}return[n,s,r]}function aP(){return gn(su)}function lP(t){return gn(Af)}const cP=()=>{};var a_={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=function(t,e){if(!t)throw zi(e)},zi=function(t){return new Error("Firebase Database ("+mw.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},uP=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Rf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,u=c?t[r+2]:0,h=i>>2,d=(i&3)<<4|a>>4;let p=(a&15)<<2|u>>6,m=u&63;c||(m=64,o||(p=64)),s.push(n[h],n[d],n[p],n[m])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(_w(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):uP(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||u==null||d==null)throw new hP;const p=i<<2|a>>4;if(s.push(p),u!==64){const m=a<<4&240|u>>2;if(s.push(m),d!==64){const E=u<<6&192|d;s.push(E)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yw=function(t){const e=_w(t);return Rf.encodeByteArray(e,!0)},oc=function(t){return yw(t).replace(/\./g,"")},ac=function(t){try{return Rf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dP(t){return vw(void 0,t)}function vw(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!fP(n)||(t[n]=vw(t[n],e[n]));return t}function fP(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gP=()=>pP().__FIREBASE_DEFAULTS__,mP=()=>{if(typeof process>"u"||typeof a_>"u")return;const t=a_.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_P=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ac(t[1]);return e&&JSON.parse(e)},ru=()=>{try{return cP()||gP()||mP()||_P()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ew=t=>ru()?.emulatorHosts?.[t],Pf=t=>{const e=Ew(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},ww=()=>ru()?.config,Tw=t=>ru()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ou(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kf(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[oc(JSON.stringify(n)),oc(JSON.stringify(o)),""].join(".")}const Wo={};function yP(){const t={prod:[],emulator:[]};for(const e of Object.keys(Wo))Wo[e]?t.emulator.push(e):t.prod.push(e);return t}function vP(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let l_=!1;function au(t,e){if(typeof window>"u"||typeof document>"u"||!Jn(window.location.host)||Wo[t]===e||Wo[t]||l_)return;Wo[t]=e;function n(p){return`__firebase__banner__${p}`}const s="__firebase__banner",i=yP().prod.length>0;function o(){const p=document.getElementById(s);p&&p.remove()}function a(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function c(p,m){p.setAttribute("width","24"),p.setAttribute("id",m),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function u(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{l_=!0,o()},p}function h(p,m){p.setAttribute("id",m),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function d(){const p=vP(s),m=n("text"),E=document.getElementById(m)||document.createElement("span"),R=n("learnmore"),P=document.getElementById(R)||document.createElement("a"),D=n("preprendIcon"),O=document.getElementById(D)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const V=p.element;a(V),h(P,R);const B=u();c(O,D),V.append(O,E,P,B),document.body.appendChild(V)}i?(E.innerText="Preview backend disconnected.",O.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(O.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,E.innerText="Preview backend running in this workspace."),E.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Nf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ut())}function EP(){const t=ru()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function TP(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Iw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function IP(){const t=Ut();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function bP(){return mw.NODE_ADMIN===!0}function CP(){return!EP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function SP(){try{return typeof indexedDB=="object"}catch{return!1}}function AP(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RP="FirebaseError";class Zn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=RP,Object.setPrototypeOf(this,Zn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,La.prototype.create)}}class La{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?PP(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Zn(r,a,s)}}function PP(t,e){return t.replace(kP,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const kP=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(t){return JSON.parse(t)}function ht(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bw=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=fa(ac(i[0])||""),n=fa(ac(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},NP=function(t){const e=bw(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},xP=function(t){const e=bw(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Oi(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function dd(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function lc(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function tr(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(c_(i)&&c_(o)){if(!tr(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function c_(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DP{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const p=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(p<<1|p>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],u,h;for(let d=0;d<80;d++){d<40?d<20?(u=a^i&(o^a),h=1518500249):(u=i^o^a,h=1859775393):d<60?(u=i&o|a&(i|o),h=2400959708):(u=i^o^a,h=3395469782);const p=(r<<5|r>>>27)+u+c+h+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=p}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function OP(t,e){const n=new MP(t,e);return n.subscribe.bind(n)}class MP{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");LP(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Th),r.error===void 0&&(r.error=Th),r.complete===void 0&&(r.complete=Th);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function LP(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Th(){}function xf(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VP=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,W(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},lu=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(t){return t&&t._delegate?t._delegate:t}class gs{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FP{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new iu;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(BP(e))try{this.getOrInitializeService({instanceIdentifier:Cr})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Cr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Cr){return this.instances.has(e)}getOptions(e=Cr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:UP(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Cr){return this.component?this.component.multipleInstances?e:Cr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function UP(t){return t===Cr?void 0:t}function BP(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $P{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new FP(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Te||(Te={}));const jP={debug:Te.DEBUG,verbose:Te.VERBOSE,info:Te.INFO,warn:Te.WARN,error:Te.ERROR,silent:Te.SILENT},qP=Te.INFO,HP={[Te.DEBUG]:"log",[Te.VERBOSE]:"log",[Te.INFO]:"info",[Te.WARN]:"warn",[Te.ERROR]:"error"},WP=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=HP[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class cu{constructor(e){this.name=e,this._logLevel=qP,this._logHandler=WP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Te.DEBUG,...e),this._logHandler(this,Te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Te.VERBOSE,...e),this._logHandler(this,Te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Te.INFO,...e),this._logHandler(this,Te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Te.WARN,...e),this._logHandler(this,Te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Te.ERROR,...e),this._logHandler(this,Te.ERROR,...e)}}const zP=(t,e)=>e.some(n=>t instanceof n);let u_,h_;function GP(){return u_||(u_=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function KP(){return h_||(h_=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cw=new WeakMap,fd=new WeakMap,Sw=new WeakMap,Ih=new WeakMap,Df=new WeakMap;function QP(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Ws(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Cw.set(n,t)}).catch(()=>{}),Df.set(e,t),e}function YP(t){if(fd.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});fd.set(t,e)}let pd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return fd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Sw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ws(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function XP(t){pd=t(pd)}function JP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(bh(this),e,...n);return Sw.set(s,e.sort?e.sort():[e]),Ws(s)}:KP().includes(t)?function(...e){return t.apply(bh(this),e),Ws(Cw.get(this))}:function(...e){return Ws(t.apply(bh(this),e))}}function ZP(t){return typeof t=="function"?JP(t):(t instanceof IDBTransaction&&YP(t),zP(t,GP())?new Proxy(t,pd):t)}function Ws(t){if(t instanceof IDBRequest)return QP(t);if(Ih.has(t))return Ih.get(t);const e=ZP(t);return e!==t&&(Ih.set(t,e),Df.set(e,t)),e}const bh=t=>Df.get(t);function ek(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Ws(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Ws(o.result),c.oldVersion,c.newVersion,Ws(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const tk=["get","getKey","getAll","getAllKeys","count"],nk=["put","add","delete","clear"],Ch=new Map;function d_(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ch.get(e))return Ch.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=nk.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||tk.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&c.done]))[0]};return Ch.set(e,i),i}XP(t=>({...t,get:(e,n,s)=>d_(e,n)||t.get(e,n,s),has:(e,n)=>!!d_(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(rk(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function rk(t){return t.getComponent()?.type==="VERSION"}const gd="@firebase/app",f_="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new cu("@firebase/app"),ik="@firebase/app-compat",ok="@firebase/analytics-compat",ak="@firebase/analytics",lk="@firebase/app-check-compat",ck="@firebase/app-check",uk="@firebase/auth",hk="@firebase/auth-compat",dk="@firebase/database",fk="@firebase/data-connect",pk="@firebase/database-compat",gk="@firebase/functions",mk="@firebase/functions-compat",_k="@firebase/installations",yk="@firebase/installations-compat",vk="@firebase/messaging",Ek="@firebase/messaging-compat",wk="@firebase/performance",Tk="@firebase/performance-compat",Ik="@firebase/remote-config",bk="@firebase/remote-config-compat",Ck="@firebase/storage",Sk="@firebase/storage-compat",Ak="@firebase/firestore",Rk="@firebase/ai",Pk="@firebase/firestore-compat",kk="firebase",Nk="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md="[DEFAULT]",xk={[gd]:"fire-core",[ik]:"fire-core-compat",[ak]:"fire-analytics",[ok]:"fire-analytics-compat",[ck]:"fire-app-check",[lk]:"fire-app-check-compat",[uk]:"fire-auth",[hk]:"fire-auth-compat",[dk]:"fire-rtdb",[fk]:"fire-data-connect",[pk]:"fire-rtdb-compat",[gk]:"fire-fn",[mk]:"fire-fn-compat",[_k]:"fire-iid",[yk]:"fire-iid-compat",[vk]:"fire-fcm",[Ek]:"fire-fcm-compat",[wk]:"fire-perf",[Tk]:"fire-perf-compat",[Ik]:"fire-rc",[bk]:"fire-rc-compat",[Ck]:"fire-gcs",[Sk]:"fire-gcs-compat",[Ak]:"fire-fst",[Pk]:"fire-fst-compat",[Rk]:"fire-vertex","fire-js":"fire-js",[kk]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=new Map,Dk=new Map,_d=new Map;function p_(t,e){try{t.container.addComponent(e)}catch(n){ms.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function nr(t){const e=t.name;if(_d.has(e))return ms.debug(`There were multiple attempts to register component ${e}.`),!1;_d.set(e,t);for(const n of cc.values())p_(n,t);for(const n of Dk.values())p_(n,t);return!0}function Va(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function sn(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ok={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zs=new La("app","Firebase",Ok);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new gs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw zs.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=Nk;function Aw(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:md,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw zs.create("bad-app-name",{appName:String(r)});if(n||(n=ww()),!n)throw zs.create("no-options");const i=cc.get(r);if(i){if(tr(n,i.options)&&tr(s,i.config))return i;throw zs.create("duplicate-app",{appName:r})}const o=new $P(r);for(const c of _d.values())o.addComponent(c);const a=new Mk(n,s,o);return cc.set(r,a),a}function uu(t=md){const e=cc.get(t);if(!e&&t===md&&ww())return Aw();if(!e)throw zs.create("no-app",{appName:t});return e}function mn(t,e,n){let s=xk[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ms.warn(o.join(" "));return}nr(new gs(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk="firebase-heartbeat-database",Vk=1,pa="firebase-heartbeat-store";let Sh=null;function Rw(){return Sh||(Sh=ek(Lk,Vk,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(pa)}catch(n){console.warn(n)}}}}).catch(t=>{throw zs.create("idb-open",{originalErrorMessage:t.message})})),Sh}async function Fk(t){try{const n=(await Rw()).transaction(pa),s=await n.objectStore(pa).get(Pw(t));return await n.done,s}catch(e){if(e instanceof Zn)ms.warn(e.message);else{const n=zs.create("idb-get",{originalErrorMessage:e?.message});ms.warn(n.message)}}}async function g_(t,e){try{const s=(await Rw()).transaction(pa,"readwrite");await s.objectStore(pa).put(e,Pw(t)),await s.done}catch(n){if(n instanceof Zn)ms.warn(n.message);else{const s=zs.create("idb-set",{originalErrorMessage:n?.message});ms.warn(s.message)}}}function Pw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uk=1024,Bk=30;class $k{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new qk(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=m_();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Bk){const r=Hk(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ms.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=m_(),{heartbeatsToSend:n,unsentEntries:s}=jk(this._heartbeatsCache.heartbeats),r=oc(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return ms.warn(e),""}}}function m_(){return new Date().toISOString().substring(0,10)}function jk(t,e=Uk){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),__(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),__(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class qk{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return SP()?AP().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Fk(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return g_(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return g_(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function __(t){return oc(JSON.stringify({version:2,heartbeats:t})).length}function Hk(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wk(t){nr(new gs("platform-logger",e=>new sk(e),"PRIVATE")),nr(new gs("heartbeat",e=>new $k(e),"PRIVATE")),mn(gd,f_,t),mn(gd,f_,"esm2020"),mn("fire-js","")}Wk("");function kw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zk=kw,Nw=new La("auth","Firebase",kw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=new cu("@firebase/auth");function Gk(t,...e){uc.logLevel<=Te.WARN&&uc.warn(`Auth (${fr}): ${t}`,...e)}function Ml(t,...e){uc.logLevel<=Te.ERROR&&uc.error(`Auth (${fr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(t,...e){throw Mf(t,...e)}function Rn(t,...e){return Mf(t,...e)}function Of(t,e,n){const s={...zk(),[e]:n};return new La("auth","Firebase",s).create(e,{appName:t.name})}function Lr(t){return Of(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Kk(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&Kn(t,"argument-error"),Of(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Mf(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Nw.create(t,...e)}function fe(t,e,...n){if(!t)throw Mf(e,...n)}function cs(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ml(e),new Error(e)}function _s(t,e){t||cs(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(){return typeof self<"u"&&self.location?.href||""}function Qk(){return y_()==="http:"||y_()==="https:"}function y_(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Qk()||TP()||"connection"in navigator)?navigator.onLine:!0}function Xk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e,n){this.shortDelay=e,this.longDelay=n,_s(n>e,"Short delay should be less than long delay!"),this.isMobile=Nf()||Iw()}get(){return Yk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(t,e){_s(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cs("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cs("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cs("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],eN=new Fa(3e4,6e4);function Vf(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ki(t,e,n,s,r={}){return Dw(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Gi({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u={method:e,headers:c,...i};return wP()||(u.referrerPolicy="no-referrer"),t.emulatorConfig&&Jn(t.emulatorConfig.host)&&(u.credentials="include"),xw.fetch()(await Ow(t,t.config.apiHost,n,a),u)})}async function Dw(t,e,n){t._canInitEmulator=!1;const s={...Jk,...e};try{const r=new nN(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw El(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw El(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw El(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw El(t,"user-disabled",o);const h=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Of(t,h,u);Kn(t,h)}}catch(r){if(r instanceof Zn)throw r;Kn(t,"network-request-failed",{message:String(r)})}}async function tN(t,e,n,s,r={}){const i=await Ki(t,e,n,s,r);return"mfaPendingCredential"in i&&Kn(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ow(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?Lf(t.config,r):`${t.config.apiScheme}://${r}`;return Zk.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class nN{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Rn(this.auth,"network-request-failed")),eN.get())})}}function El(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Rn(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sN(t,e){return Ki(t,"POST","/v1/accounts:delete",e)}async function hc(t,e){return Ki(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rN(t,e=!1){const n=Fe(t),s=await n.getIdToken(e),r=Ff(s);fe(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:zo(Ah(r.auth_time)),issuedAtTime:zo(Ah(r.iat)),expirationTime:zo(Ah(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Ah(t){return Number(t)*1e3}function Ff(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Ml("JWT malformed, contained fewer than 3 sections"),null;try{const r=ac(n);return r?JSON.parse(r):(Ml("Failed to decode base64 JWT payload"),null)}catch(r){return Ml("Caught error parsing JWT payload as JSON",r?.toString()),null}}function v_(t){const e=Ff(t);return fe(e,"internal-error"),fe(typeof e.exp<"u","internal-error"),fe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ga(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Zn&&iN(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function iN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=zo(this.lastLoginAt),this.creationTime=zo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dc(t){const e=t.auth,n=await t.getIdToken(),s=await ga(t,hc(e,{idToken:n}));fe(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?Mw(r.providerUserInfo):[],o=lN(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,u=a?c:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new vd(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function aN(t){const e=Fe(t);await dc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function lN(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Mw(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cN(t,e){const n=await Dw(t,{},async()=>{const s=Gi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await Ow(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&Jn(t.emulatorConfig.host)&&(c.credentials="include"),xw.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function uN(t,e){return Ki(t,"POST","/v2/accounts:revokeToken",Vf(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){fe(e.idToken,"internal-error"),fe(typeof e.idToken<"u","internal-error"),fe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):v_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){fe(e.length!==0,"internal-error");const n=v_(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(fe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await cN(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new bi;return s&&(fe(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(fe(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(fe(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new bi,this.toJSON())}_performRefresh(){return cs("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(t,e){fe(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class In{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new oN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new vd(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await ga(this,this.stsTokenManager.getToken(this.auth,e));return fe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return rN(this,e)}reload(){return aN(this)}_assign(e){this!==e&&(fe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new In({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){fe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await dc(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(sn(this.auth.app))return Promise.reject(Lr(this.auth));const e=await this.getIdToken();return await ga(this,sN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,u=n.createdAt??void 0,h=n.lastLoginAt??void 0,{uid:d,emailVerified:p,isAnonymous:m,providerData:E,stsTokenManager:R}=n;fe(d&&R,e,"internal-error");const P=bi.fromJSON(this.name,R);fe(typeof d=="string",e,"internal-error"),Ns(s,e.name),Ns(r,e.name),fe(typeof p=="boolean",e,"internal-error"),fe(typeof m=="boolean",e,"internal-error"),Ns(i,e.name),Ns(o,e.name),Ns(a,e.name),Ns(c,e.name),Ns(u,e.name),Ns(h,e.name);const D=new In({uid:d,auth:e,email:r,emailVerified:p,displayName:s,isAnonymous:m,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:P,createdAt:u,lastLoginAt:h});return E&&Array.isArray(E)&&(D.providerData=E.map(O=>({...O}))),c&&(D._redirectEventId=c),D}static async _fromIdTokenResponse(e,n,s=!1){const r=new bi;r.updateFromServerResponse(n);const i=new In({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await dc(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];fe(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Mw(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new bi;a.updateFromIdToken(s);const c=new In({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new vd(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,u),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=new Map;function us(t){_s(t instanceof Function,"Expected a class definition");let e=E_.get(t);return e?(_s(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,E_.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Lw.type="NONE";const w_=Lw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(t,e,n){return`firebase:${t}:${e}:${n}`}class Ci{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Ll(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ll("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await hc(this.auth,{idToken:e}).catch(()=>{});return n?In._fromGetAccountInfoResponse(this.auth,n,e):null}return In._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Ci(us(w_),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||us(w_);const o=Ll(s,e.config.apiKey,e.name);let a=null;for(const u of n)try{const h=await u._get(o);if(h){let d;if(typeof h=="string"){const p=await hc(e,{idToken:h}).catch(()=>{});if(!p)break;d=await In._fromGetAccountInfoResponse(e,p,h)}else d=In._fromJSON(e,h);u!==i&&(a=d),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Ci(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Ci(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T_(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Bw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jw(e))return"Blackberry";if(qw(e))return"Webos";if(Fw(e))return"Safari";if((e.includes("chrome/")||Uw(e))&&!e.includes("edge/"))return"Chrome";if($w(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function Vw(t=Ut()){return/firefox\//i.test(t)}function Fw(t=Ut()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Uw(t=Ut()){return/crios\//i.test(t)}function Bw(t=Ut()){return/iemobile/i.test(t)}function $w(t=Ut()){return/android/i.test(t)}function jw(t=Ut()){return/blackberry/i.test(t)}function qw(t=Ut()){return/webos/i.test(t)}function Uf(t=Ut()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function hN(t=Ut()){return Uf(t)&&!!window.navigator?.standalone}function dN(){return IP()&&document.documentMode===10}function Hw(t=Ut()){return Uf(t)||$w(t)||qw(t)||jw(t)||/windows phone/i.test(t)||Bw(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ww(t,e=[]){let n;switch(t){case"Browser":n=T_(Ut());break;case"Worker":n=`${T_(Ut())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${fr}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pN(t,e={}){return Ki(t,"GET","/v2/passwordPolicy",Vf(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gN=6;class mN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??gN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _N{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new I_(this),this.idTokenSubscription=new I_(this),this.beforeStateQueue=new fN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=us(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ci.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await hc(this,{idToken:e}),s=await In._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(sn(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return fe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await dc(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Xk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(sn(this.app))return Promise.reject(Lr(this));const n=e?Fe(e):null;return n&&fe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&fe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return sn(this.app)?Promise.reject(Lr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return sn(this.app)?Promise.reject(Lr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(us(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pN(this),n=new mN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new La("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await uN(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&us(e)||this._popupRedirectResolver;fe(n,this,"argument-error"),this.redirectPersistenceManager=await Ci.create(this,[us(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(fe(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return fe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ww(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(sn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Gk(`Error while retrieving App Check token: ${e.error}`),e?.token}}function hu(t){return Fe(t)}class I_{constructor(e){this.auth=e,this.observer=null,this.addObserver=OP(n=>this.observer=n)}get next(){return fe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bf={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yN(t){Bf=t}function vN(t){return Bf.loadJS(t)}function EN(){return Bf.gapiScript}function wN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TN(t,e){const n=Va(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(tr(i,e??{}))return r;Kn(r,"already-initialized")}return n.initialize({options:e})}function IN(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(us);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function bN(t,e,n){const s=hu(t);fe(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=zw(e),{host:o,port:a}=CN(e),c=a===null?"":`:${a}`,u={url:`${i}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){fe(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),fe(tr(u,s.config.emulator)&&tr(h,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=u,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,Jn(o)?(ou(`${i}//${o}${c}`),au("Auth",!0)):SN()}function zw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function CN(t){const e=zw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:b_(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:b_(o)}}}function b_(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function SN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return cs("not implemented")}_getIdTokenResponse(e){return cs("not implemented")}_linkToIdToken(e,n){return cs("not implemented")}_getReauthenticationResolver(e){return cs("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Si(t,e){return tN(t,"POST","/v1/accounts:signInWithIdp",Vf(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AN="http://localhost";class jr extends Gw{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new jr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Kn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new jr(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Si(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Si(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Si(e,n)}buildRequest(){const e={requestUri:AN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Gi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua extends $f{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us extends Ua{constructor(){super("facebook.com")}static credential(e){return jr._fromParams({providerId:Us.PROVIDER_ID,signInMethod:Us.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Us.credentialFromTaggedObject(e)}static credentialFromError(e){return Us.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Us.credential(e.oauthAccessToken)}catch{return null}}}Us.FACEBOOK_SIGN_IN_METHOD="facebook.com";Us.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends Ua{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return jr._fromParams({providerId:ls.PROVIDER_ID,signInMethod:ls.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ls.credentialFromTaggedObject(e)}static credentialFromError(e){return ls.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return ls.credential(n,s)}catch{return null}}}ls.GOOGLE_SIGN_IN_METHOD="google.com";ls.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs extends Ua{constructor(){super("github.com")}static credential(e){return jr._fromParams({providerId:Bs.PROVIDER_ID,signInMethod:Bs.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bs.credentialFromTaggedObject(e)}static credentialFromError(e){return Bs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bs.credential(e.oauthAccessToken)}catch{return null}}}Bs.GITHUB_SIGN_IN_METHOD="github.com";Bs.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s extends Ua{constructor(){super("twitter.com")}static credential(e,n){return jr._fromParams({providerId:$s.PROVIDER_ID,signInMethod:$s.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return $s.credentialFromTaggedObject(e)}static credentialFromError(e){return $s.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return $s.credential(n,s)}catch{return null}}}$s.TWITTER_SIGN_IN_METHOD="twitter.com";$s.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await In._fromIdTokenResponse(e,s,r),o=C_(s);return new Mi({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=C_(s);return new Mi({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function C_(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc extends Zn{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,fc.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new fc(e,n,s,r)}}function Kw(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?fc._fromErrorAndOperation(t,i,e,s):i})}async function RN(t,e,n=!1){const s=await ga(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Mi._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PN(t,e,n=!1){const{auth:s}=t;if(sn(s.app))return Promise.reject(Lr(s));const r="reauthenticate";try{const i=await ga(t,Kw(s,r,e,t),n);fe(i.idToken,s,"internal-error");const o=Ff(i.idToken);fe(o,s,"internal-error");const{sub:a}=o;return fe(t.uid===a,s,"user-mismatch"),Mi._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&Kn(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kN(t,e,n=!1){if(sn(t.app))return Promise.reject(Lr(t));const s="signIn",r=await Kw(t,s,e),i=await Mi._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}function NN(t,e,n,s){return Fe(t).onIdTokenChanged(e,n,s)}function xN(t,e,n){return Fe(t).beforeAuthStateChanged(e,n)}function DN(t,e,n,s){return Fe(t).onAuthStateChanged(e,n,s)}function Eo(t){return Fe(t).signOut()}const pc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(pc,"1"),this.storage.removeItem(pc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ON=1e3,MN=10;class Yw extends Qw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);dN()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,MN):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},ON)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yw.type="LOCAL";const LN=Yw;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw extends Qw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Xw.type="SESSION";const Jw=Xw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new du(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async u=>u(n.origin,i)),c=await VN(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}du.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=jf("",20);r.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const p=d;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(p.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(){return window}function UN(t){qn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(){return typeof qn().WorkerGlobalScope<"u"&&typeof qn().importScripts=="function"}async function BN(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $N(){return navigator?.serviceWorker?.controller||null}function jN(){return Zw()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eT="firebaseLocalStorageDb",qN=1,gc="firebaseLocalStorage",tT="fbase_key";class Ba{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function fu(t,e){return t.transaction([gc],e?"readwrite":"readonly").objectStore(gc)}function HN(){const t=indexedDB.deleteDatabase(eT);return new Ba(t).toPromise()}function Ed(){const t=indexedDB.open(eT,qN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(gc,{keyPath:tT})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(gc)?e(s):(s.close(),await HN(),e(await Ed()))})})}async function S_(t,e,n){const s=fu(t,!0).put({[tT]:e,value:n});return new Ba(s).toPromise()}async function WN(t,e){const n=fu(t,!1).get(e),s=await new Ba(n).toPromise();return s===void 0?null:s.value}function A_(t,e){const n=fu(t,!0).delete(e);return new Ba(n).toPromise()}const zN=800,GN=3;class nT{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ed(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>GN)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=du._getInstance(jN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await BN(),!this.activeServiceWorker)return;this.sender=new FN(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$N()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ed();return await S_(e,pc,"1"),await A_(e,pc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>S_(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>WN(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>A_(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=fu(r,!1).getAll();return new Ba(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}nT.type="LOCAL";const KN=nT;new Fa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(t,e){return e?us(e):(fe(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf extends Gw{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Si(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Si(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Si(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function QN(t){return kN(t.auth,new qf(t),t.bypassAuthState)}function YN(t){const{auth:e,user:n}=t;return fe(n,e,"internal-error"),PN(n,new qf(t),t.bypassAuthState)}async function XN(t){const{auth:e,user:n}=t;return fe(n,e,"internal-error"),RN(n,new qf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return QN;case"linkViaPopup":case"linkViaRedirect":return XN;case"reauthViaPopup":case"reauthViaRedirect":return YN;default:Kn(this.auth,"internal-error")}}resolve(e){_s(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_s(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JN=new Fa(2e3,1e4);async function ZN(t,e,n){if(sn(t.app))return Promise.reject(Rn(t,"operation-not-supported-in-this-environment"));const s=hu(t);Kk(t,e,$f);const r=sT(s,n);return new Rr(s,"signInViaPopup",e,r).executeNotNull()}class Rr extends rT{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Rr.currentPopupAction&&Rr.currentPopupAction.cancel(),Rr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return fe(e,this.auth,"internal-error"),e}async onExecution(){_s(this.filter.length===1,"Popup operations only handle one event");const e=jf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Rn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Rn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,JN.get())};e()}}Rr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ex="pendingRedirect",Vl=new Map;class tx extends rT{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Vl.get(this.auth._key());if(!e){try{const s=await nx(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Vl.set(this.auth._key(),e)}return this.bypassAuthState||Vl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nx(t,e){const n=ix(e),s=rx(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function sx(t,e){Vl.set(t._key(),e)}function rx(t){return us(t._redirectPersistence)}function ix(t){return Ll(ex,t.config.apiKey,t.name)}async function ox(t,e,n=!1){if(sn(t.app))return Promise.reject(Lr(t));const s=hu(t),r=sT(s,e),o=await new tx(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ax=600*1e3;class lx{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cx(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!iT(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Rn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ax&&this.cachedEventUids.clear(),this.cachedEventUids.has(R_(e))}saveEventToCache(e){this.cachedEventUids.add(R_(e)),this.lastProcessedEventTime=Date.now()}}function R_(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function iT({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function cx(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return iT(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ux(t,e={}){return Ki(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hx=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dx=/^https?/;async function fx(t){if(t.config.emulator)return;const{authorizedDomains:e}=await ux(t);for(const n of e)try{if(px(n))return}catch{}Kn(t,"unauthorized-domain")}function px(t){const e=yd(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!dx.test(n))return!1;if(hx.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gx=new Fa(3e4,6e4);function P_(){const t=qn().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function mx(t){return new Promise((e,n)=>{function s(){P_(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{P_(),n(Rn(t,"network-request-failed"))},timeout:gx.get()})}if(qn().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(qn().gapi?.load)s();else{const r=wN("iframefcb");return qn()[r]=()=>{gapi.load?s():n(Rn(t,"network-request-failed"))},vN(`${EN()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw Fl=null,e})}let Fl=null;function _x(t){return Fl=Fl||mx(t),Fl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yx=new Fa(5e3,15e3),vx="__/auth/iframe",Ex="emulator/auth/iframe",wx={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Tx=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ix(t){const e=t.config;fe(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Lf(e,Ex):`https://${t.config.authDomain}/${vx}`,s={apiKey:e.apiKey,appName:t.name,v:fr},r=Tx.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Gi(s).slice(1)}`}async function bx(t){const e=await _x(t),n=qn().gapi;return fe(n,t,"internal-error"),e.open({where:document.body,url:Ix(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wx,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Rn(t,"network-request-failed"),a=qn().setTimeout(()=>{i(o)},yx.get());function c(){qn().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cx={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Sx=500,Ax=600,Rx="_blank",Px="http://localhost";class k_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kx(t,e,n,s=Sx,r=Ax){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...Cx,width:s.toString(),height:r.toString(),top:i,left:o},u=Ut().toLowerCase();n&&(a=Uw(u)?Rx:n),Vw(u)&&(e=e||Px,c.scrollbars="yes");const h=Object.entries(c).reduce((p,[m,E])=>`${p}${m}=${E},`,"");if(hN(u)&&a!=="_self")return Nx(e||"",a),new k_(null);const d=window.open(e||"",a,h);fe(d,t,"popup-blocked");try{d.focus()}catch{}return new k_(d)}function Nx(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xx="__/auth/handler",Dx="emulator/auth/handler",Ox=encodeURIComponent("fac");async function N_(t,e,n,s,r,i){fe(t.config.authDomain,t,"auth-domain-config-required"),fe(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:fr,eventId:r};if(e instanceof $f){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",dd(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Ua){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await t._getAppCheckToken(),u=c?`#${Ox}=${encodeURIComponent(c)}`:"";return`${Mx(t)}?${Gi(a).slice(1)}${u}`}function Mx({config:t}){return t.emulator?Lf(t,Dx):`https://${t.authDomain}/${xx}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="webStorageSupport";class Lx{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jw,this._completeRedirectFn=ox,this._overrideRedirectResult=sx}async _openPopup(e,n,s,r){_s(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await N_(e,n,s,yd(),r);return kx(e,i,jf())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await N_(e,n,s,yd(),r);return UN(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(_s(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await bx(e),s=new lx(e);return n.register("authEvent",r=>(fe(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Rh,{type:Rh},r=>{const i=r?.[0]?.[Rh];i!==void 0&&n(!!i),Kn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=fx(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Hw()||Fw()||Uf()}}const Vx=Lx;var x_="@firebase/auth",D_="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fx{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){fe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ux(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bx(t){nr(new gs("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;fe(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ww(t)},u=new _N(s,r,i,c);return IN(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),nr(new gs("auth-internal",e=>{const n=hu(e.getProvider("auth").getImmediate());return(s=>new Fx(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),mn(x_,D_,Ux(t)),mn(x_,D_,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $x=300,jx=Tw("authIdTokenMaxAge")||$x;let O_=null;const qx=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>jx)return;const r=n?.token;O_!==r&&(O_=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Hx(t=uu()){const e=Va(t,"auth");if(e.isInitialized())return e.getImmediate();const n=TN(t,{popupRedirectResolver:Vx,persistence:[KN,LN,Jw]}),s=Tw("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=qx(i.toString());xN(n,o,()=>o(n.currentUser)),NN(n,a=>o(a))}}const r=Ew("auth");return r&&bN(n,`http://${r}`),n}function Wx(){return document.getElementsByTagName("head")?.[0]??document}yN({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Rn("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",Wx().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bx("Browser");var M_=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gs,oT;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,v){function y(){}y.prototype=v.prototype,S.D=v.prototype,S.prototype=new y,S.prototype.constructor=S,S.C=function(C,A,b){for(var w=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)w[Q-2]=arguments[Q];return v.prototype[A].apply(C,w)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(S,v,y){y||(y=0);var C=Array(16);if(typeof v=="string")for(var A=0;16>A;++A)C[A]=v.charCodeAt(y++)|v.charCodeAt(y++)<<8|v.charCodeAt(y++)<<16|v.charCodeAt(y++)<<24;else for(A=0;16>A;++A)C[A]=v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24;v=S.g[0],y=S.g[1],A=S.g[2];var b=S.g[3],w=v+(b^y&(A^b))+C[0]+3614090360&4294967295;v=y+(w<<7&4294967295|w>>>25),w=b+(A^v&(y^A))+C[1]+3905402710&4294967295,b=v+(w<<12&4294967295|w>>>20),w=A+(y^b&(v^y))+C[2]+606105819&4294967295,A=b+(w<<17&4294967295|w>>>15),w=y+(v^A&(b^v))+C[3]+3250441966&4294967295,y=A+(w<<22&4294967295|w>>>10),w=v+(b^y&(A^b))+C[4]+4118548399&4294967295,v=y+(w<<7&4294967295|w>>>25),w=b+(A^v&(y^A))+C[5]+1200080426&4294967295,b=v+(w<<12&4294967295|w>>>20),w=A+(y^b&(v^y))+C[6]+2821735955&4294967295,A=b+(w<<17&4294967295|w>>>15),w=y+(v^A&(b^v))+C[7]+4249261313&4294967295,y=A+(w<<22&4294967295|w>>>10),w=v+(b^y&(A^b))+C[8]+1770035416&4294967295,v=y+(w<<7&4294967295|w>>>25),w=b+(A^v&(y^A))+C[9]+2336552879&4294967295,b=v+(w<<12&4294967295|w>>>20),w=A+(y^b&(v^y))+C[10]+4294925233&4294967295,A=b+(w<<17&4294967295|w>>>15),w=y+(v^A&(b^v))+C[11]+2304563134&4294967295,y=A+(w<<22&4294967295|w>>>10),w=v+(b^y&(A^b))+C[12]+1804603682&4294967295,v=y+(w<<7&4294967295|w>>>25),w=b+(A^v&(y^A))+C[13]+4254626195&4294967295,b=v+(w<<12&4294967295|w>>>20),w=A+(y^b&(v^y))+C[14]+2792965006&4294967295,A=b+(w<<17&4294967295|w>>>15),w=y+(v^A&(b^v))+C[15]+1236535329&4294967295,y=A+(w<<22&4294967295|w>>>10),w=v+(A^b&(y^A))+C[1]+4129170786&4294967295,v=y+(w<<5&4294967295|w>>>27),w=b+(y^A&(v^y))+C[6]+3225465664&4294967295,b=v+(w<<9&4294967295|w>>>23),w=A+(v^y&(b^v))+C[11]+643717713&4294967295,A=b+(w<<14&4294967295|w>>>18),w=y+(b^v&(A^b))+C[0]+3921069994&4294967295,y=A+(w<<20&4294967295|w>>>12),w=v+(A^b&(y^A))+C[5]+3593408605&4294967295,v=y+(w<<5&4294967295|w>>>27),w=b+(y^A&(v^y))+C[10]+38016083&4294967295,b=v+(w<<9&4294967295|w>>>23),w=A+(v^y&(b^v))+C[15]+3634488961&4294967295,A=b+(w<<14&4294967295|w>>>18),w=y+(b^v&(A^b))+C[4]+3889429448&4294967295,y=A+(w<<20&4294967295|w>>>12),w=v+(A^b&(y^A))+C[9]+568446438&4294967295,v=y+(w<<5&4294967295|w>>>27),w=b+(y^A&(v^y))+C[14]+3275163606&4294967295,b=v+(w<<9&4294967295|w>>>23),w=A+(v^y&(b^v))+C[3]+4107603335&4294967295,A=b+(w<<14&4294967295|w>>>18),w=y+(b^v&(A^b))+C[8]+1163531501&4294967295,y=A+(w<<20&4294967295|w>>>12),w=v+(A^b&(y^A))+C[13]+2850285829&4294967295,v=y+(w<<5&4294967295|w>>>27),w=b+(y^A&(v^y))+C[2]+4243563512&4294967295,b=v+(w<<9&4294967295|w>>>23),w=A+(v^y&(b^v))+C[7]+1735328473&4294967295,A=b+(w<<14&4294967295|w>>>18),w=y+(b^v&(A^b))+C[12]+2368359562&4294967295,y=A+(w<<20&4294967295|w>>>12),w=v+(y^A^b)+C[5]+4294588738&4294967295,v=y+(w<<4&4294967295|w>>>28),w=b+(v^y^A)+C[8]+2272392833&4294967295,b=v+(w<<11&4294967295|w>>>21),w=A+(b^v^y)+C[11]+1839030562&4294967295,A=b+(w<<16&4294967295|w>>>16),w=y+(A^b^v)+C[14]+4259657740&4294967295,y=A+(w<<23&4294967295|w>>>9),w=v+(y^A^b)+C[1]+2763975236&4294967295,v=y+(w<<4&4294967295|w>>>28),w=b+(v^y^A)+C[4]+1272893353&4294967295,b=v+(w<<11&4294967295|w>>>21),w=A+(b^v^y)+C[7]+4139469664&4294967295,A=b+(w<<16&4294967295|w>>>16),w=y+(A^b^v)+C[10]+3200236656&4294967295,y=A+(w<<23&4294967295|w>>>9),w=v+(y^A^b)+C[13]+681279174&4294967295,v=y+(w<<4&4294967295|w>>>28),w=b+(v^y^A)+C[0]+3936430074&4294967295,b=v+(w<<11&4294967295|w>>>21),w=A+(b^v^y)+C[3]+3572445317&4294967295,A=b+(w<<16&4294967295|w>>>16),w=y+(A^b^v)+C[6]+76029189&4294967295,y=A+(w<<23&4294967295|w>>>9),w=v+(y^A^b)+C[9]+3654602809&4294967295,v=y+(w<<4&4294967295|w>>>28),w=b+(v^y^A)+C[12]+3873151461&4294967295,b=v+(w<<11&4294967295|w>>>21),w=A+(b^v^y)+C[15]+530742520&4294967295,A=b+(w<<16&4294967295|w>>>16),w=y+(A^b^v)+C[2]+3299628645&4294967295,y=A+(w<<23&4294967295|w>>>9),w=v+(A^(y|~b))+C[0]+4096336452&4294967295,v=y+(w<<6&4294967295|w>>>26),w=b+(y^(v|~A))+C[7]+1126891415&4294967295,b=v+(w<<10&4294967295|w>>>22),w=A+(v^(b|~y))+C[14]+2878612391&4294967295,A=b+(w<<15&4294967295|w>>>17),w=y+(b^(A|~v))+C[5]+4237533241&4294967295,y=A+(w<<21&4294967295|w>>>11),w=v+(A^(y|~b))+C[12]+1700485571&4294967295,v=y+(w<<6&4294967295|w>>>26),w=b+(y^(v|~A))+C[3]+2399980690&4294967295,b=v+(w<<10&4294967295|w>>>22),w=A+(v^(b|~y))+C[10]+4293915773&4294967295,A=b+(w<<15&4294967295|w>>>17),w=y+(b^(A|~v))+C[1]+2240044497&4294967295,y=A+(w<<21&4294967295|w>>>11),w=v+(A^(y|~b))+C[8]+1873313359&4294967295,v=y+(w<<6&4294967295|w>>>26),w=b+(y^(v|~A))+C[15]+4264355552&4294967295,b=v+(w<<10&4294967295|w>>>22),w=A+(v^(b|~y))+C[6]+2734768916&4294967295,A=b+(w<<15&4294967295|w>>>17),w=y+(b^(A|~v))+C[13]+1309151649&4294967295,y=A+(w<<21&4294967295|w>>>11),w=v+(A^(y|~b))+C[4]+4149444226&4294967295,v=y+(w<<6&4294967295|w>>>26),w=b+(y^(v|~A))+C[11]+3174756917&4294967295,b=v+(w<<10&4294967295|w>>>22),w=A+(v^(b|~y))+C[2]+718787259&4294967295,A=b+(w<<15&4294967295|w>>>17),w=y+(b^(A|~v))+C[9]+3951481745&4294967295,S.g[0]=S.g[0]+v&4294967295,S.g[1]=S.g[1]+(A+(w<<21&4294967295|w>>>11))&4294967295,S.g[2]=S.g[2]+A&4294967295,S.g[3]=S.g[3]+b&4294967295}s.prototype.u=function(S,v){v===void 0&&(v=S.length);for(var y=v-this.blockSize,C=this.B,A=this.h,b=0;b<v;){if(A==0)for(;b<=y;)r(this,S,b),b+=this.blockSize;if(typeof S=="string"){for(;b<v;)if(C[A++]=S.charCodeAt(b++),A==this.blockSize){r(this,C),A=0;break}}else for(;b<v;)if(C[A++]=S[b++],A==this.blockSize){r(this,C),A=0;break}}this.h=A,this.o+=v},s.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var v=1;v<S.length-8;++v)S[v]=0;var y=8*this.o;for(v=S.length-8;v<S.length;++v)S[v]=y&255,y/=256;for(this.u(S),S=Array(16),v=y=0;4>v;++v)for(var C=0;32>C;C+=8)S[y++]=this.g[v]>>>C&255;return S};function i(S,v){var y=a;return Object.prototype.hasOwnProperty.call(y,S)?y[S]:y[S]=v(S)}function o(S,v){this.h=v;for(var y=[],C=!0,A=S.length-1;0<=A;A--){var b=S[A]|0;C&&b==v||(y[A]=b,C=!1)}this.g=y}var a={};function c(S){return-128<=S&&128>S?i(S,function(v){return new o([v|0],0>v?-1:0)}):new o([S|0],0>S?-1:0)}function u(S){if(isNaN(S)||!isFinite(S))return d;if(0>S)return P(u(-S));for(var v=[],y=1,C=0;S>=y;C++)v[C]=S/y|0,y*=4294967296;return new o(v,0)}function h(S,v){if(S.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(S.charAt(0)=="-")return P(h(S.substring(1),v));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=u(Math.pow(v,8)),C=d,A=0;A<S.length;A+=8){var b=Math.min(8,S.length-A),w=parseInt(S.substring(A,A+b),v);8>b?(b=u(Math.pow(v,b)),C=C.j(b).add(u(w))):(C=C.j(y),C=C.add(u(w)))}return C}var d=c(0),p=c(1),m=c(16777216);t=o.prototype,t.m=function(){if(R(this))return-P(this).m();for(var S=0,v=1,y=0;y<this.g.length;y++){var C=this.i(y);S+=(0<=C?C:4294967296+C)*v,v*=4294967296}return S},t.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(E(this))return"0";if(R(this))return"-"+P(this).toString(S);for(var v=u(Math.pow(S,6)),y=this,C="";;){var A=B(y,v).g;y=D(y,A.j(v));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(S);if(y=A,E(y))return b+C;for(;6>b.length;)b="0"+b;C=b+C}},t.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function E(S){if(S.h!=0)return!1;for(var v=0;v<S.g.length;v++)if(S.g[v]!=0)return!1;return!0}function R(S){return S.h==-1}t.l=function(S){return S=D(this,S),R(S)?-1:E(S)?0:1};function P(S){for(var v=S.g.length,y=[],C=0;C<v;C++)y[C]=~S.g[C];return new o(y,~S.h).add(p)}t.abs=function(){return R(this)?P(this):this},t.add=function(S){for(var v=Math.max(this.g.length,S.g.length),y=[],C=0,A=0;A<=v;A++){var b=C+(this.i(A)&65535)+(S.i(A)&65535),w=(b>>>16)+(this.i(A)>>>16)+(S.i(A)>>>16);C=w>>>16,b&=65535,w&=65535,y[A]=w<<16|b}return new o(y,y[y.length-1]&-2147483648?-1:0)};function D(S,v){return S.add(P(v))}t.j=function(S){if(E(this)||E(S))return d;if(R(this))return R(S)?P(this).j(P(S)):P(P(this).j(S));if(R(S))return P(this.j(P(S)));if(0>this.l(m)&&0>S.l(m))return u(this.m()*S.m());for(var v=this.g.length+S.g.length,y=[],C=0;C<2*v;C++)y[C]=0;for(C=0;C<this.g.length;C++)for(var A=0;A<S.g.length;A++){var b=this.i(C)>>>16,w=this.i(C)&65535,Q=S.i(A)>>>16,ve=S.i(A)&65535;y[2*C+2*A]+=w*ve,O(y,2*C+2*A),y[2*C+2*A+1]+=b*ve,O(y,2*C+2*A+1),y[2*C+2*A+1]+=w*Q,O(y,2*C+2*A+1),y[2*C+2*A+2]+=b*Q,O(y,2*C+2*A+2)}for(C=0;C<v;C++)y[C]=y[2*C+1]<<16|y[2*C];for(C=v;C<2*v;C++)y[C]=0;return new o(y,0)};function O(S,v){for(;(S[v]&65535)!=S[v];)S[v+1]+=S[v]>>>16,S[v]&=65535,v++}function V(S,v){this.g=S,this.h=v}function B(S,v){if(E(v))throw Error("division by zero");if(E(S))return new V(d,d);if(R(S))return v=B(P(S),v),new V(P(v.g),P(v.h));if(R(v))return v=B(S,P(v)),new V(P(v.g),v.h);if(30<S.g.length){if(R(S)||R(v))throw Error("slowDivide_ only works with positive integers.");for(var y=p,C=v;0>=C.l(S);)y=K(y),C=K(C);var A=Z(y,1),b=Z(C,1);for(C=Z(C,2),y=Z(y,2);!E(C);){var w=b.add(C);0>=w.l(S)&&(A=A.add(y),b=w),C=Z(C,1),y=Z(y,1)}return v=D(S,A.j(v)),new V(A,v)}for(A=d;0<=S.l(v);){for(y=Math.max(1,Math.floor(S.m()/v.m())),C=Math.ceil(Math.log(y)/Math.LN2),C=48>=C?1:Math.pow(2,C-48),b=u(y),w=b.j(v);R(w)||0<w.l(S);)y-=C,b=u(y),w=b.j(v);E(b)&&(b=p),A=A.add(b),S=D(S,w)}return new V(A,S)}t.A=function(S){return B(this,S).h},t.and=function(S){for(var v=Math.max(this.g.length,S.g.length),y=[],C=0;C<v;C++)y[C]=this.i(C)&S.i(C);return new o(y,this.h&S.h)},t.or=function(S){for(var v=Math.max(this.g.length,S.g.length),y=[],C=0;C<v;C++)y[C]=this.i(C)|S.i(C);return new o(y,this.h|S.h)},t.xor=function(S){for(var v=Math.max(this.g.length,S.g.length),y=[],C=0;C<v;C++)y[C]=this.i(C)^S.i(C);return new o(y,this.h^S.h)};function K(S){for(var v=S.g.length+1,y=[],C=0;C<v;C++)y[C]=S.i(C)<<1|S.i(C-1)>>>31;return new o(y,S.h)}function Z(S,v){var y=v>>5;v%=32;for(var C=S.g.length-y,A=[],b=0;b<C;b++)A[b]=0<v?S.i(b+y)>>>v|S.i(b+y+1)<<32-v:S.i(b+y);return new o(A,S.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,oT=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,Gs=o}).apply(typeof M_<"u"?M_:typeof self<"u"?self:typeof window<"u"?window:{});var wl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var aT,Ro,lT,Ul,wd,cT,uT,hT;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,f,g){return l==Array.prototype||l==Object.prototype||(l[f]=g.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof wl=="object"&&wl];for(var f=0;f<l.length;++f){var g=l[f];if(g&&g.Math==Math)return g}throw Error("Cannot find global object")}var s=n(this);function r(l,f){if(f)e:{var g=s;l=l.split(".");for(var _=0;_<l.length-1;_++){var N=l[_];if(!(N in g))break e;g=g[N]}l=l[l.length-1],_=g[l],f=f(_),f!=_&&f!=null&&e(g,l,{configurable:!0,writable:!0,value:f})}}function i(l,f){l instanceof String&&(l+="");var g=0,_=!1,N={next:function(){if(!_&&g<l.length){var x=g++;return{value:f(x,l[x]),done:!1}}return _=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}r("Array.prototype.values",function(l){return l||function(){return i(this,function(f,g){return g})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(l){var f=typeof l;return f=f!="object"?f:l?Array.isArray(l)?"array":f:"null",f=="array"||f=="object"&&typeof l.length=="number"}function u(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function h(l,f,g){return l.call.apply(l.bind,arguments)}function d(l,f,g){if(!l)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,_),l.apply(f,N)}}return function(){return l.apply(f,arguments)}}function p(l,f,g){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function m(l,f){var g=Array.prototype.slice.call(arguments,1);return function(){var _=g.slice();return _.push.apply(_,arguments),l.apply(this,_)}}function E(l,f){function g(){}g.prototype=f.prototype,l.aa=f.prototype,l.prototype=new g,l.prototype.constructor=l,l.Qb=function(_,N,x){for(var G=Array(arguments.length-2),Ue=2;Ue<arguments.length;Ue++)G[Ue-2]=arguments[Ue];return f.prototype[N].apply(_,G)}}function R(l){const f=l.length;if(0<f){const g=Array(f);for(let _=0;_<f;_++)g[_]=l[_];return g}return[]}function P(l,f){for(let g=1;g<arguments.length;g++){const _=arguments[g];if(c(_)){const N=l.length||0,x=_.length||0;l.length=N+x;for(let G=0;G<x;G++)l[N+G]=_[G]}else l.push(_)}}class D{constructor(f,g){this.i=f,this.j=g,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function O(l){return/^[\s\xa0]*$/.test(l)}function V(){var l=a.navigator;return l&&(l=l.userAgent)?l:""}function B(l){return B[" "](l),l}B[" "]=function(){};var K=V().indexOf("Gecko")!=-1&&!(V().toLowerCase().indexOf("webkit")!=-1&&V().indexOf("Edge")==-1)&&!(V().indexOf("Trident")!=-1||V().indexOf("MSIE")!=-1)&&V().indexOf("Edge")==-1;function Z(l,f,g){for(const _ in l)f.call(g,l[_],_,l)}function S(l,f){for(const g in l)f.call(void 0,l[g],g,l)}function v(l){const f={};for(const g in l)f[g]=l[g];return f}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function C(l,f){let g,_;for(let N=1;N<arguments.length;N++){_=arguments[N];for(g in _)l[g]=_[g];for(let x=0;x<y.length;x++)g=y[x],Object.prototype.hasOwnProperty.call(_,g)&&(l[g]=_[g])}}function A(l){var f=1;l=l.split(":");const g=[];for(;0<f&&l.length;)g.push(l.shift()),f--;return l.length&&g.push(l.join(":")),g}function b(l){a.setTimeout(()=>{throw l},0)}function w(){var l=tn;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class Q{constructor(){this.h=this.g=null}add(f,g){const _=ve.get();_.set(f,g),this.h?this.h.next=_:this.g=_,this.h=_}}var ve=new D(()=>new Ve,l=>l.reset());class Ve{constructor(){this.next=this.g=this.h=null}set(f,g){this.h=f,this.g=g,this.next=null}reset(){this.next=this.g=this.h=null}}let Ae,be=!1,tn=new Q,yn=()=>{const l=a.Promise.resolve(void 0);Ae=()=>{l.then(ln)}};var ln=()=>{for(var l;l=w();){try{l.h.call(l.g)}catch(g){b(g)}var f=ve;f.j(l),100>f.h&&(f.h++,l.next=f.g,f.g=l)}be=!1};function Qe(){this.s=this.s,this.C=this.C}Qe.prototype.s=!1,Qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ye(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}Ye.prototype.h=function(){this.defaultPrevented=!0};var bs=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const g=()=>{};a.addEventListener("test",g,f),a.removeEventListener("test",g,f)}catch{}return l}();function On(l,f){if(Ye.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var g=this.type=l.type,_=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget){if(K){e:{try{B(f.nodeName);var N=!0;break e}catch{}N=!1}N||(f=null)}}else g=="mouseover"?f=l.fromElement:g=="mouseout"&&(f=l.toElement);this.relatedTarget=f,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Qt[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&On.aa.h.call(this)}}E(On,Ye);var Qt={2:"touch",3:"pen",4:"mouse"};On.prototype.h=function(){On.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var M="closure_listenable_"+(1e6*Math.random()|0),ee=0;function J(l,f,g,_,N){this.listener=l,this.proxy=null,this.src=f,this.type=g,this.capture=!!_,this.ha=N,this.key=++ee,this.da=this.fa=!1}function ne(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Ne(l){this.src=l,this.g={},this.h=0}Ne.prototype.add=function(l,f,g,_,N){var x=l.toString();l=this.g[x],l||(l=this.g[x]=[],this.h++);var G=I(l,f,_,N);return-1<G?(f=l[G],g||(f.fa=!1)):(f=new J(f,this.src,x,!!_,N),f.fa=g,l.push(f)),f};function T(l,f){var g=f.type;if(g in l.g){var _=l.g[g],N=Array.prototype.indexOf.call(_,f,void 0),x;(x=0<=N)&&Array.prototype.splice.call(_,N,1),x&&(ne(f),l.g[g].length==0&&(delete l.g[g],l.h--))}}function I(l,f,g,_){for(var N=0;N<l.length;++N){var x=l[N];if(!x.da&&x.listener==f&&x.capture==!!g&&x.ha==_)return N}return-1}var k="closure_lm_"+(1e6*Math.random()|0),L={};function $(l,f,g,_,N){if(Array.isArray(f)){for(var x=0;x<f.length;x++)$(l,f[x],g,_,N);return null}return g=de(g),l&&l[M]?l.K(f,g,u(_)?!!_.capture:!1,N):F(l,f,g,!1,_,N)}function F(l,f,g,_,N,x){if(!f)throw Error("Invalid event type");var G=u(N)?!!N.capture:!!N,Ue=Y(l);if(Ue||(l[k]=Ue=new Ne(l)),g=Ue.add(f,g,_,G,x),g.proxy)return g;if(_=X(),g.proxy=_,_.src=l,_.listener=g,l.addEventListener)bs||(N=G),N===void 0&&(N=!1),l.addEventListener(f.toString(),_,N);else if(l.attachEvent)l.attachEvent(q(f.toString()),_);else if(l.addListener&&l.removeListener)l.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return g}function X(){function l(g){return f.call(l.src,l.listener,g)}const f=ie;return l}function z(l,f,g,_,N){if(Array.isArray(f))for(var x=0;x<f.length;x++)z(l,f[x],g,_,N);else _=u(_)?!!_.capture:!!_,g=de(g),l&&l[M]?(l=l.i,f=String(f).toString(),f in l.g&&(x=l.g[f],g=I(x,g,_,N),-1<g&&(ne(x[g]),Array.prototype.splice.call(x,g,1),x.length==0&&(delete l.g[f],l.h--)))):l&&(l=Y(l))&&(f=l.g[f.toString()],l=-1,f&&(l=I(f,g,_,N)),(g=-1<l?f[l]:null)&&H(g))}function H(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[M])T(f.i,l);else{var g=l.type,_=l.proxy;f.removeEventListener?f.removeEventListener(g,_,l.capture):f.detachEvent?f.detachEvent(q(g),_):f.addListener&&f.removeListener&&f.removeListener(_),(g=Y(f))?(T(g,l),g.h==0&&(g.src=null,f[k]=null)):ne(l)}}}function q(l){return l in L?L[l]:L[l]="on"+l}function ie(l,f){if(l.da)l=!0;else{f=new On(f,this);var g=l.listener,_=l.ha||l.src;l.fa&&H(l),l=g.call(_,f)}return l}function Y(l){return l=l[k],l instanceof Ne?l:null}var re="__closure_events_fn_"+(1e9*Math.random()>>>0);function de(l){return typeof l=="function"?l:(l[re]||(l[re]=function(f){return l.handleEvent(f)}),l[re])}function le(){Qe.call(this),this.i=new Ne(this),this.M=this,this.F=null}E(le,Qe),le.prototype[M]=!0,le.prototype.removeEventListener=function(l,f,g,_){z(this,l,f,g,_)};function ye(l,f){var g,_=l.F;if(_)for(g=[];_;_=_.F)g.push(_);if(l=l.M,_=f.type||f,typeof f=="string")f=new Ye(f,l);else if(f instanceof Ye)f.target=f.target||l;else{var N=f;f=new Ye(_,l),C(f,N)}if(N=!0,g)for(var x=g.length-1;0<=x;x--){var G=f.g=g[x];N=Re(G,_,!0,f)&&N}if(G=f.g=l,N=Re(G,_,!0,f)&&N,N=Re(G,_,!1,f)&&N,g)for(x=0;x<g.length;x++)G=f.g=g[x],N=Re(G,_,!1,f)&&N}le.prototype.N=function(){if(le.aa.N.call(this),this.i){var l=this.i,f;for(f in l.g){for(var g=l.g[f],_=0;_<g.length;_++)ne(g[_]);delete l.g[f],l.h--}}this.F=null},le.prototype.K=function(l,f,g,_){return this.i.add(String(l),f,!1,g,_)},le.prototype.L=function(l,f,g,_){return this.i.add(String(l),f,!0,g,_)};function Re(l,f,g,_){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();for(var N=!0,x=0;x<f.length;++x){var G=f[x];if(G&&!G.da&&G.capture==g){var Ue=G.listener,It=G.ha||G.src;G.fa&&T(l.i,G),N=Ue.call(It,_)!==!1&&N}}return N&&!_.defaultPrevented}function Et(l,f,g){if(typeof l=="function")g&&(l=p(l,g));else if(l&&typeof l.handleEvent=="function")l=p(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:a.setTimeout(l,f||0)}function wt(l){l.g=Et(()=>{l.g=null,l.i&&(l.i=!1,wt(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class cn extends Qe{constructor(f,g){super(),this.m=f,this.l=g,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:wt(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rt(l){Qe.call(this),this.h=l,this.g={}}E(Rt,Qe);var Cs=[];function no(l){Z(l.g,function(f,g){this.g.hasOwnProperty(g)&&H(f)},l),l.g={}}Rt.prototype.N=function(){Rt.aa.N.call(this),no(this)},Rt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Tt=a.JSON.stringify,un=a.JSON.parse,Za=class{stringify(l){return a.JSON.stringify(l,void 0)}parse(l){return a.JSON.parse(l,void 0)}};function ti(){}ti.prototype.h=null;function cg(l){return l.h||(l.h=l.i())}function ug(){}var so={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Hu(){Ye.call(this,"d")}E(Hu,Ye);function Wu(){Ye.call(this,"c")}E(Wu,Ye);var mr={},hg=null;function el(){return hg=hg||new le}mr.La="serverreachability";function dg(l){Ye.call(this,mr.La,l)}E(dg,Ye);function ro(l){const f=el();ye(f,new dg(f))}mr.STAT_EVENT="statevent";function fg(l,f){Ye.call(this,mr.STAT_EVENT,l),this.stat=f}E(fg,Ye);function Bt(l){const f=el();ye(f,new fg(f,l))}mr.Ma="timingevent";function pg(l,f){Ye.call(this,mr.Ma,l),this.size=f}E(pg,Ye);function io(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){l()},f)}function oo(){this.g=!0}oo.prototype.xa=function(){this.g=!1};function CC(l,f,g,_,N,x){l.info(function(){if(l.g)if(x)for(var G="",Ue=x.split("&"),It=0;It<Ue.length;It++){var xe=Ue[It].split("=");if(1<xe.length){var Pt=xe[0];xe=xe[1];var kt=Pt.split("_");G=2<=kt.length&&kt[1]=="type"?G+(Pt+"="+xe+"&"):G+(Pt+"=redacted&")}}else G=null;else G=x;return"XMLHTTP REQ ("+_+") [attempt "+N+"]: "+f+`
`+g+`
`+G})}function SC(l,f,g,_,N,x,G){l.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+N+"]: "+f+`
`+g+`
`+x+" "+G})}function ni(l,f,g,_){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+RC(l,g)+(_?" "+_:"")})}function AC(l,f){l.info(function(){return"TIMEOUT: "+f})}oo.prototype.info=function(){};function RC(l,f){if(!l.g)return f;if(!f)return null;try{var g=JSON.parse(f);if(g){for(l=0;l<g.length;l++)if(Array.isArray(g[l])){var _=g[l];if(!(2>_.length)){var N=_[1];if(Array.isArray(N)&&!(1>N.length)){var x=N[0];if(x!="noop"&&x!="stop"&&x!="close")for(var G=1;G<N.length;G++)N[G]=""}}}}return Tt(g)}catch{return f}}var tl={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},gg={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},zu;function nl(){}E(nl,ti),nl.prototype.g=function(){return new XMLHttpRequest},nl.prototype.i=function(){return{}},zu=new nl;function Ss(l,f,g,_){this.j=l,this.i=f,this.l=g,this.R=_||1,this.U=new Rt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new mg}function mg(){this.i=null,this.g="",this.h=!1}var _g={},Gu={};function Ku(l,f,g){l.L=1,l.v=ol(es(f)),l.m=g,l.P=!0,yg(l,null)}function yg(l,f){l.F=Date.now(),sl(l),l.A=es(l.v);var g=l.A,_=l.R;Array.isArray(_)||(_=[String(_)]),xg(g.i,"t",_),l.C=0,g=l.j.J,l.h=new mg,l.g=Yg(l.j,g?f:null,!l.m),0<l.O&&(l.M=new cn(p(l.Y,l,l.g),l.O)),f=l.U,g=l.g,_=l.ca;var N="readystatechange";Array.isArray(N)||(N&&(Cs[0]=N.toString()),N=Cs);for(var x=0;x<N.length;x++){var G=$(g,N[x],_||f.handleEvent,!1,f.h||f);if(!G)break;f.g[G.key]=G}f=l.H?v(l.H):{},l.m?(l.u||(l.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,f)):(l.u="GET",l.g.ea(l.A,l.u,null,f)),ro(),CC(l.i,l.u,l.A,l.l,l.R,l.m)}Ss.prototype.ca=function(l){l=l.target;const f=this.M;f&&ts(l)==3?f.j():this.Y(l)},Ss.prototype.Y=function(l){try{if(l==this.g)e:{const kt=ts(this.g);var f=this.g.Ba();const ii=this.g.Z();if(!(3>kt)&&(kt!=3||this.g&&(this.h.h||this.g.oa()||Ug(this.g)))){this.J||kt!=4||f==7||(f==8||0>=ii?ro(3):ro(2)),Qu(this);var g=this.g.Z();this.X=g;t:if(vg(this)){var _=Ug(this.g);l="";var N=_.length,x=ts(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){_r(this),ao(this);var G="";break t}this.h.i=new a.TextDecoder}for(f=0;f<N;f++)this.h.h=!0,l+=this.h.i.decode(_[f],{stream:!(x&&f==N-1)});_.length=0,this.h.g+=l,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=g==200,SC(this.i,this.u,this.A,this.l,this.R,kt,g),this.o){if(this.T&&!this.K){t:{if(this.g){var Ue,It=this.g;if((Ue=It.g?It.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!O(Ue)){var xe=Ue;break t}}xe=null}if(g=xe)ni(this.i,this.l,g,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yu(this,g);else{this.o=!1,this.s=3,Bt(12),_r(this),ao(this);break e}}if(this.P){g=!0;let vn;for(;!this.J&&this.C<G.length;)if(vn=PC(this,G),vn==Gu){kt==4&&(this.s=4,Bt(14),g=!1),ni(this.i,this.l,null,"[Incomplete Response]");break}else if(vn==_g){this.s=4,Bt(15),ni(this.i,this.l,G,"[Invalid Chunk]"),g=!1;break}else ni(this.i,this.l,vn,null),Yu(this,vn);if(vg(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),kt!=4||G.length!=0||this.h.h||(this.s=1,Bt(16),g=!1),this.o=this.o&&g,!g)ni(this.i,this.l,G,"[Invalid Chunked Response]"),_r(this),ao(this);else if(0<G.length&&!this.W){this.W=!0;var Pt=this.j;Pt.g==this&&Pt.ba&&!Pt.M&&(Pt.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),nh(Pt),Pt.M=!0,Bt(11))}}else ni(this.i,this.l,G,null),Yu(this,G);kt==4&&_r(this),this.o&&!this.J&&(kt==4?zg(this.j,this):(this.o=!1,sl(this)))}else zC(this.g),g==400&&0<G.indexOf("Unknown SID")?(this.s=3,Bt(12)):(this.s=0,Bt(13)),_r(this),ao(this)}}}catch{}finally{}};function vg(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function PC(l,f){var g=l.C,_=f.indexOf(`
`,g);return _==-1?Gu:(g=Number(f.substring(g,_)),isNaN(g)?_g:(_+=1,_+g>f.length?Gu:(f=f.slice(_,_+g),l.C=_+g,f)))}Ss.prototype.cancel=function(){this.J=!0,_r(this)};function sl(l){l.S=Date.now()+l.I,Eg(l,l.I)}function Eg(l,f){if(l.B!=null)throw Error("WatchDog timer not null");l.B=io(p(l.ba,l),f)}function Qu(l){l.B&&(a.clearTimeout(l.B),l.B=null)}Ss.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(AC(this.i,this.A),this.L!=2&&(ro(),Bt(17)),_r(this),this.s=2,ao(this)):Eg(this,this.S-l)};function ao(l){l.j.G==0||l.J||zg(l.j,l)}function _r(l){Qu(l);var f=l.M;f&&typeof f.ma=="function"&&f.ma(),l.M=null,no(l.U),l.g&&(f=l.g,l.g=null,f.abort(),f.ma())}function Yu(l,f){try{var g=l.j;if(g.G!=0&&(g.g==l||Xu(g.h,l))){if(!l.K&&Xu(g.h,l)&&g.G==3){try{var _=g.Da.g.parse(f)}catch{_=null}if(Array.isArray(_)&&_.length==3){var N=_;if(N[0]==0){e:if(!g.u){if(g.g)if(g.g.F+3e3<l.F)dl(g),ul(g);else break e;th(g),Bt(18)}}else g.za=N[1],0<g.za-g.T&&37500>N[2]&&g.F&&g.v==0&&!g.C&&(g.C=io(p(g.Za,g),6e3));if(1>=Ig(g.h)&&g.ca){try{g.ca()}catch{}g.ca=void 0}}else vr(g,11)}else if((l.K||g.g==l)&&dl(g),!O(f))for(N=g.Da.g.parse(f),f=0;f<N.length;f++){let xe=N[f];if(g.T=xe[0],xe=xe[1],g.G==2)if(xe[0]=="c"){g.K=xe[1],g.ia=xe[2];const Pt=xe[3];Pt!=null&&(g.la=Pt,g.j.info("VER="+g.la));const kt=xe[4];kt!=null&&(g.Aa=kt,g.j.info("SVER="+g.Aa));const ii=xe[5];ii!=null&&typeof ii=="number"&&0<ii&&(_=1.5*ii,g.L=_,g.j.info("backChannelRequestTimeoutMs_="+_)),_=g;const vn=l.g;if(vn){const pl=vn.g?vn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(pl){var x=_.h;x.g||pl.indexOf("spdy")==-1&&pl.indexOf("quic")==-1&&pl.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(Ju(x,x.h),x.h=null))}if(_.D){const sh=vn.g?vn.g.getResponseHeader("X-HTTP-Session-Id"):null;sh&&(_.ya=sh,He(_.I,_.D,sh))}}g.G=3,g.l&&g.l.ua(),g.ba&&(g.R=Date.now()-l.F,g.j.info("Handshake RTT: "+g.R+"ms")),_=g;var G=l;if(_.qa=Qg(_,_.J?_.ia:null,_.W),G.K){bg(_.h,G);var Ue=G,It=_.L;It&&(Ue.I=It),Ue.B&&(Qu(Ue),sl(Ue)),_.g=G}else Hg(_);0<g.i.length&&hl(g)}else xe[0]!="stop"&&xe[0]!="close"||vr(g,7);else g.G==3&&(xe[0]=="stop"||xe[0]=="close"?xe[0]=="stop"?vr(g,7):eh(g):xe[0]!="noop"&&g.l&&g.l.ta(xe),g.v=0)}}ro(4)}catch{}}var kC=class{constructor(l,f){this.g=l,this.map=f}};function wg(l){this.l=l||10,a.PerformanceNavigationTiming?(l=a.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Tg(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function Ig(l){return l.h?1:l.g?l.g.size:0}function Xu(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function Ju(l,f){l.g?l.g.add(f):l.h=f}function bg(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}wg.prototype.cancel=function(){if(this.i=Cg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function Cg(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const g of l.g.values())f=f.concat(g.D);return f}return R(l.i)}function NC(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(c(l)){for(var f=[],g=l.length,_=0;_<g;_++)f.push(l[_]);return f}f=[],g=0;for(_ in l)f[g++]=l[_];return f}function xC(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(c(l)||typeof l=="string"){var f=[];l=l.length;for(var g=0;g<l;g++)f.push(g);return f}f=[],g=0;for(const _ in l)f[g++]=_;return f}}}function Sg(l,f){if(l.forEach&&typeof l.forEach=="function")l.forEach(f,void 0);else if(c(l)||typeof l=="string")Array.prototype.forEach.call(l,f,void 0);else for(var g=xC(l),_=NC(l),N=_.length,x=0;x<N;x++)f.call(void 0,_[x],g&&g[x],l)}var Ag=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function DC(l,f){if(l){l=l.split("&");for(var g=0;g<l.length;g++){var _=l[g].indexOf("="),N=null;if(0<=_){var x=l[g].substring(0,_);N=l[g].substring(_+1)}else x=l[g];f(x,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function yr(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof yr){this.h=l.h,rl(this,l.j),this.o=l.o,this.g=l.g,il(this,l.s),this.l=l.l;var f=l.i,g=new uo;g.i=f.i,f.g&&(g.g=new Map(f.g),g.h=f.h),Rg(this,g),this.m=l.m}else l&&(f=String(l).match(Ag))?(this.h=!1,rl(this,f[1]||"",!0),this.o=lo(f[2]||""),this.g=lo(f[3]||"",!0),il(this,f[4]),this.l=lo(f[5]||"",!0),Rg(this,f[6]||"",!0),this.m=lo(f[7]||"")):(this.h=!1,this.i=new uo(null,this.h))}yr.prototype.toString=function(){var l=[],f=this.j;f&&l.push(co(f,Pg,!0),":");var g=this.g;return(g||f=="file")&&(l.push("//"),(f=this.o)&&l.push(co(f,Pg,!0),"@"),l.push(encodeURIComponent(String(g)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),g=this.s,g!=null&&l.push(":",String(g))),(g=this.l)&&(this.g&&g.charAt(0)!="/"&&l.push("/"),l.push(co(g,g.charAt(0)=="/"?LC:MC,!0))),(g=this.i.toString())&&l.push("?",g),(g=this.m)&&l.push("#",co(g,FC)),l.join("")};function es(l){return new yr(l)}function rl(l,f,g){l.j=g?lo(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function il(l,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);l.s=f}else l.s=null}function Rg(l,f,g){f instanceof uo?(l.i=f,UC(l.i,l.h)):(g||(f=co(f,VC)),l.i=new uo(f,l.h))}function He(l,f,g){l.i.set(f,g)}function ol(l){return He(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function lo(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function co(l,f,g){return typeof l=="string"?(l=encodeURI(l).replace(f,OC),g&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function OC(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Pg=/[#\/\?@]/g,MC=/[#\?:]/g,LC=/[#\?]/g,VC=/[#\?@]/g,FC=/#/g;function uo(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function As(l){l.g||(l.g=new Map,l.h=0,l.i&&DC(l.i,function(f,g){l.add(decodeURIComponent(f.replace(/\+/g," ")),g)}))}t=uo.prototype,t.add=function(l,f){As(this),this.i=null,l=si(this,l);var g=this.g.get(l);return g||this.g.set(l,g=[]),g.push(f),this.h+=1,this};function kg(l,f){As(l),f=si(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function Ng(l,f){return As(l),f=si(l,f),l.g.has(f)}t.forEach=function(l,f){As(this),this.g.forEach(function(g,_){g.forEach(function(N){l.call(f,N,_,this)},this)},this)},t.na=function(){As(this);const l=Array.from(this.g.values()),f=Array.from(this.g.keys()),g=[];for(let _=0;_<f.length;_++){const N=l[_];for(let x=0;x<N.length;x++)g.push(f[_])}return g},t.V=function(l){As(this);let f=[];if(typeof l=="string")Ng(this,l)&&(f=f.concat(this.g.get(si(this,l))));else{l=Array.from(this.g.values());for(let g=0;g<l.length;g++)f=f.concat(l[g])}return f},t.set=function(l,f){return As(this),this.i=null,l=si(this,l),Ng(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},t.get=function(l,f){return l?(l=this.V(l),0<l.length?String(l[0]):f):f};function xg(l,f,g){kg(l,f),0<g.length&&(l.i=null,l.g.set(si(l,f),R(g)),l.h+=g.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(var g=0;g<f.length;g++){var _=f[g];const x=encodeURIComponent(String(_)),G=this.V(_);for(_=0;_<G.length;_++){var N=x;G[_]!==""&&(N+="="+encodeURIComponent(String(G[_]))),l.push(N)}}return this.i=l.join("&")};function si(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function UC(l,f){f&&!l.j&&(As(l),l.i=null,l.g.forEach(function(g,_){var N=_.toLowerCase();_!=N&&(kg(this,_),xg(this,N,g))},l)),l.j=f}function BC(l,f){const g=new oo;if(a.Image){const _=new Image;_.onload=m(Rs,g,"TestLoadImage: loaded",!0,f,_),_.onerror=m(Rs,g,"TestLoadImage: error",!1,f,_),_.onabort=m(Rs,g,"TestLoadImage: abort",!1,f,_),_.ontimeout=m(Rs,g,"TestLoadImage: timeout",!1,f,_),a.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=l}else f(!1)}function $C(l,f){const g=new oo,_=new AbortController,N=setTimeout(()=>{_.abort(),Rs(g,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:_.signal}).then(x=>{clearTimeout(N),x.ok?Rs(g,"TestPingServer: ok",!0,f):Rs(g,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(N),Rs(g,"TestPingServer: error",!1,f)})}function Rs(l,f,g,_,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),_(g)}catch{}}function jC(){this.g=new Za}function qC(l,f,g){const _=g||"";try{Sg(l,function(N,x){let G=N;u(N)&&(G=Tt(N)),f.push(_+x+"="+encodeURIComponent(G))})}catch(N){throw f.push(_+"type="+encodeURIComponent("_badmap")),N}}function al(l){this.l=l.Ub||null,this.j=l.eb||!1}E(al,ti),al.prototype.g=function(){return new ll(this.l,this.j)},al.prototype.i=function(l){return function(){return l}}({});function ll(l,f){le.call(this),this.D=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}E(ll,le),t=ll.prototype,t.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=f,this.readyState=1,fo(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(f.body=l),(this.D||a).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ho(this)),this.readyState=0},t.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,fo(this)),this.g&&(this.readyState=3,fo(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Dg(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function Dg(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}t.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?ho(this):fo(this),this.readyState==3&&Dg(this)}},t.Ra=function(l){this.g&&(this.response=this.responseText=l,ho(this))},t.Qa=function(l){this.g&&(this.response=l,ho(this))},t.ga=function(){this.g&&ho(this)};function ho(l){l.readyState=4,l.l=null,l.j=null,l.v=null,fo(l)}t.setRequestHeader=function(l,f){this.u.append(l,f)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var g=f.next();!g.done;)g=g.value,l.push(g[0]+": "+g[1]),g=f.next();return l.join(`\r
`)};function fo(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(ll.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function Og(l){let f="";return Z(l,function(g,_){f+=_,f+=":",f+=g,f+=`\r
`}),f}function Zu(l,f,g){e:{for(_ in g){var _=!1;break e}_=!0}_||(g=Og(g),typeof l=="string"?g!=null&&encodeURIComponent(String(g)):He(l,f,g))}function Je(l){le.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}E(Je,le);var HC=/^https?$/i,WC=["POST","PUT"];t=Je.prototype,t.Ha=function(l){this.J=l},t.ea=function(l,f,g,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():zu.g(),this.v=this.o?cg(this.o):cg(zu),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(x){Mg(this,x);return}if(l=g||"",g=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var N in _)g.set(N,_[N]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const x of _.keys())g.set(x,_.get(x));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(g.keys()).find(x=>x.toLowerCase()=="content-type"),N=a.FormData&&l instanceof a.FormData,!(0<=Array.prototype.indexOf.call(WC,f,void 0))||_||N||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,G]of g)this.g.setRequestHeader(x,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Fg(this),this.u=!0,this.g.send(l),this.u=!1}catch(x){Mg(this,x)}};function Mg(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.m=5,Lg(l),cl(l)}function Lg(l){l.A||(l.A=!0,ye(l,"complete"),ye(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,ye(this,"complete"),ye(this,"abort"),cl(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cl(this,!0)),Je.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Vg(this):this.bb())},t.bb=function(){Vg(this)};function Vg(l){if(l.h&&typeof o<"u"&&(!l.v[1]||ts(l)!=4||l.Z()!=2)){if(l.u&&ts(l)==4)Et(l.Ea,0,l);else if(ye(l,"readystatechange"),ts(l)==4){l.h=!1;try{const G=l.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var g;if(!(g=f)){var _;if(_=G===0){var N=String(l.D).match(Ag)[1]||null;!N&&a.self&&a.self.location&&(N=a.self.location.protocol.slice(0,-1)),_=!HC.test(N?N.toLowerCase():"")}g=_}if(g)ye(l,"complete"),ye(l,"success");else{l.m=6;try{var x=2<ts(l)?l.g.statusText:""}catch{x=""}l.l=x+" ["+l.Z()+"]",Lg(l)}}finally{cl(l)}}}}function cl(l,f){if(l.g){Fg(l);const g=l.g,_=l.v[0]?()=>{}:null;l.g=null,l.v=null,f||ye(l,"ready");try{g.onreadystatechange=_}catch{}}}function Fg(l){l.I&&(a.clearTimeout(l.I),l.I=null)}t.isActive=function(){return!!this.g};function ts(l){return l.g?l.g.readyState:0}t.Z=function(){try{return 2<ts(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),un(f)}};function Ug(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function zC(l){const f={};l=(l.g&&2<=ts(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<l.length;_++){if(O(l[_]))continue;var g=A(l[_]);const N=g[0];if(g=g[1],typeof g!="string")continue;g=g.trim();const x=f[N]||[];f[N]=x,x.push(g)}S(f,function(_){return _.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function po(l,f,g){return g&&g.internalChannelParams&&g.internalChannelParams[l]||f}function Bg(l){this.Aa=0,this.i=[],this.j=new oo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=po("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=po("baseRetryDelayMs",5e3,l),this.cb=po("retryDelaySeedMs",1e4,l),this.Wa=po("forwardChannelMaxRetries",2,l),this.wa=po("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new wg(l&&l.concurrentRequestLimit),this.Da=new jC,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Bg.prototype,t.la=8,t.G=1,t.connect=function(l,f,g,_){Bt(0),this.W=l,this.H=f||{},g&&_!==void 0&&(this.H.OSID=g,this.H.OAID=_),this.F=this.X,this.I=Qg(this,null,this.W),hl(this)};function eh(l){if($g(l),l.G==3){var f=l.U++,g=es(l.I);if(He(g,"SID",l.K),He(g,"RID",f),He(g,"TYPE","terminate"),go(l,g),f=new Ss(l,l.j,f),f.L=2,f.v=ol(es(g)),g=!1,a.navigator&&a.navigator.sendBeacon)try{g=a.navigator.sendBeacon(f.v.toString(),"")}catch{}!g&&a.Image&&(new Image().src=f.v,g=!0),g||(f.g=Yg(f.j,null),f.g.ea(f.v)),f.F=Date.now(),sl(f)}Kg(l)}function ul(l){l.g&&(nh(l),l.g.cancel(),l.g=null)}function $g(l){ul(l),l.u&&(a.clearTimeout(l.u),l.u=null),dl(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&a.clearTimeout(l.s),l.s=null)}function hl(l){if(!Tg(l.h)&&!l.s){l.s=!0;var f=l.Ga;Ae||yn(),be||(Ae(),be=!0),tn.add(f,l),l.B=0}}function GC(l,f){return Ig(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=f.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=io(p(l.Ga,l,f),Gg(l,l.B)),l.B++,!0)}t.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const N=new Ss(this,this.j,l);let x=this.o;if(this.S&&(x?(x=v(x),C(x,this.S)):x=this.S),this.m!==null||this.O||(N.H=x,x=null),this.P)e:{for(var f=0,g=0;g<this.i.length;g++){t:{var _=this.i[g];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(f+=_,4096<f){f=g;break e}if(f===4096||g===this.i.length-1){f=g+1;break e}}f=1e3}else f=1e3;f=qg(this,N,f),g=es(this.I),He(g,"RID",l),He(g,"CVER",22),this.D&&He(g,"X-HTTP-Session-Id",this.D),go(this,g),x&&(this.O?f="headers="+encodeURIComponent(String(Og(x)))+"&"+f:this.m&&Zu(g,this.m,x)),Ju(this.h,N),this.Ua&&He(g,"TYPE","init"),this.P?(He(g,"$req",f),He(g,"SID","null"),N.T=!0,Ku(N,g,null)):Ku(N,g,f),this.G=2}}else this.G==3&&(l?jg(this,l):this.i.length==0||Tg(this.h)||jg(this))};function jg(l,f){var g;f?g=f.l:g=l.U++;const _=es(l.I);He(_,"SID",l.K),He(_,"RID",g),He(_,"AID",l.T),go(l,_),l.m&&l.o&&Zu(_,l.m,l.o),g=new Ss(l,l.j,g,l.B+1),l.m===null&&(g.H=l.o),f&&(l.i=f.D.concat(l.i)),f=qg(l,g,1e3),g.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),Ju(l.h,g),Ku(g,_,f)}function go(l,f){l.H&&Z(l.H,function(g,_){He(f,_,g)}),l.l&&Sg({},function(g,_){He(f,_,g)})}function qg(l,f,g){g=Math.min(l.i.length,g);var _=l.l?p(l.l.Na,l.l,l):null;e:{var N=l.i;let x=-1;for(;;){const G=["count="+g];x==-1?0<g?(x=N[0].g,G.push("ofs="+x)):x=0:G.push("ofs="+x);let Ue=!0;for(let It=0;It<g;It++){let xe=N[It].g;const Pt=N[It].map;if(xe-=x,0>xe)x=Math.max(0,N[It].g-100),Ue=!1;else try{qC(Pt,G,"req"+xe+"_")}catch{_&&_(Pt)}}if(Ue){_=G.join("&");break e}}}return l=l.i.splice(0,g),f.D=l,_}function Hg(l){if(!l.g&&!l.u){l.Y=1;var f=l.Fa;Ae||yn(),be||(Ae(),be=!0),tn.add(f,l),l.v=0}}function th(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=io(p(l.Fa,l),Gg(l,l.v)),l.v++,!0)}t.Fa=function(){if(this.u=null,Wg(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=io(p(this.ab,this),l)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Bt(10),ul(this),Wg(this))};function nh(l){l.A!=null&&(a.clearTimeout(l.A),l.A=null)}function Wg(l){l.g=new Ss(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var f=es(l.qa);He(f,"RID","rpc"),He(f,"SID",l.K),He(f,"AID",l.T),He(f,"CI",l.F?"0":"1"),!l.F&&l.ja&&He(f,"TO",l.ja),He(f,"TYPE","xmlhttp"),go(l,f),l.m&&l.o&&Zu(f,l.m,l.o),l.L&&(l.g.I=l.L);var g=l.g;l=l.ia,g.L=1,g.v=ol(es(f)),g.m=null,g.P=!0,yg(g,l)}t.Za=function(){this.C!=null&&(this.C=null,ul(this),th(this),Bt(19))};function dl(l){l.C!=null&&(a.clearTimeout(l.C),l.C=null)}function zg(l,f){var g=null;if(l.g==f){dl(l),nh(l),l.g=null;var _=2}else if(Xu(l.h,f))g=f.D,bg(l.h,f),_=1;else return;if(l.G!=0){if(f.o)if(_==1){g=f.m?f.m.length:0,f=Date.now()-f.F;var N=l.B;_=el(),ye(_,new pg(_,g)),hl(l)}else Hg(l);else if(N=f.s,N==3||N==0&&0<f.X||!(_==1&&GC(l,f)||_==2&&th(l)))switch(g&&0<g.length&&(f=l.h,f.i=f.i.concat(g)),N){case 1:vr(l,5);break;case 4:vr(l,10);break;case 3:vr(l,6);break;default:vr(l,2)}}}function Gg(l,f){let g=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(g*=2),g*f}function vr(l,f){if(l.j.info("Error code "+f),f==2){var g=p(l.fb,l),_=l.Xa;const N=!_;_=new yr(_||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||rl(_,"https"),ol(_),N?BC(_.toString(),g):$C(_.toString(),g)}else Bt(2);l.G=0,l.l&&l.l.sa(f),Kg(l),$g(l)}t.fb=function(l){l?(this.j.info("Successfully pinged google.com"),Bt(2)):(this.j.info("Failed to ping google.com"),Bt(1))};function Kg(l){if(l.G=0,l.ka=[],l.l){const f=Cg(l.h);(f.length!=0||l.i.length!=0)&&(P(l.ka,f),P(l.ka,l.i),l.h.i.length=0,R(l.i),l.i.length=0),l.l.ra()}}function Qg(l,f,g){var _=g instanceof yr?es(g):new yr(g);if(_.g!="")f&&(_.g=f+"."+_.g),il(_,_.s);else{var N=a.location;_=N.protocol,f=f?f+"."+N.hostname:N.hostname,N=+N.port;var x=new yr(null);_&&rl(x,_),f&&(x.g=f),N&&il(x,N),g&&(x.l=g),_=x}return g=l.D,f=l.ya,g&&f&&He(_,g,f),He(_,"VER",l.la),go(l,_),_}function Yg(l,f,g){if(f&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Ca&&!l.pa?new Je(new al({eb:g})):new Je(l.pa),f.Ha(l.J),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xg(){}t=Xg.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function fl(){}fl.prototype.g=function(l,f){return new nn(l,f)};function nn(l,f){le.call(this),this.g=new Bg(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(l?l["X-WebChannel-Client-Profile"]=f.va:l={"X-WebChannel-Client-Profile":f.va}),this.g.S=l,(l=f&&f.Sb)&&!O(l)&&(this.g.m=l),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!O(f)&&(this.g.D=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new ri(this)}E(nn,le),nn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},nn.prototype.close=function(){eh(this.g)},nn.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var g={};g.__data__=l,l=g}else this.u&&(g={},g.__data__=Tt(l),l=g);f.i.push(new kC(f.Ya++,l)),f.G==3&&hl(f)},nn.prototype.N=function(){this.g.l=null,delete this.j,eh(this.g),delete this.g,nn.aa.N.call(this)};function Jg(l){Hu.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const g in f){l=g;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}E(Jg,Hu);function Zg(){Wu.call(this),this.status=1}E(Zg,Wu);function ri(l){this.g=l}E(ri,Xg),ri.prototype.ua=function(){ye(this.g,"a")},ri.prototype.ta=function(l){ye(this.g,new Jg(l))},ri.prototype.sa=function(l){ye(this.g,new Zg)},ri.prototype.ra=function(){ye(this.g,"b")},fl.prototype.createWebChannel=fl.prototype.g,nn.prototype.send=nn.prototype.o,nn.prototype.open=nn.prototype.m,nn.prototype.close=nn.prototype.close,hT=function(){return new fl},uT=function(){return el()},cT=mr,wd={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},tl.NO_ERROR=0,tl.TIMEOUT=8,tl.HTTP_ERROR=6,Ul=tl,gg.COMPLETE="complete",lT=gg,ug.EventType=so,so.OPEN="a",so.CLOSE="b",so.ERROR="c",so.MESSAGE="d",le.prototype.listen=le.prototype.K,Ro=ug,Je.prototype.listenOnce=Je.prototype.L,Je.prototype.getLastError=Je.prototype.Ka,Je.prototype.getLastErrorCode=Je.prototype.Ba,Je.prototype.getStatus=Je.prototype.Z,Je.prototype.getResponseJson=Je.prototype.Oa,Je.prototype.getResponseText=Je.prototype.oa,Je.prototype.send=Je.prototype.ea,Je.prototype.setWithCredentials=Je.prototype.Ha,aT=Je}).apply(typeof wl<"u"?wl:typeof self<"u"?self:typeof window<"u"?window:{});const L_="@firebase/firestore",V_="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ot.UNAUTHENTICATED=new Ot(null),Ot.GOOGLE_CREDENTIALS=new Ot("google-credentials-uid"),Ot.FIRST_PARTY=new Ot("first-party-uid"),Ot.MOCK_USER=new Ot("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qi="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr=new cu("@firebase/firestore");function gi(){return qr.logLevel}function te(t,...e){if(qr.logLevel<=Te.DEBUG){const n=e.map(Hf);qr.debug(`Firestore (${Qi}): ${t}`,...n)}}function ys(t,...e){if(qr.logLevel<=Te.ERROR){const n=e.map(Hf);qr.error(`Firestore (${Qi}): ${t}`,...n)}}function Li(t,...e){if(qr.logLevel<=Te.WARN){const n=e.map(Hf);qr.warn(`Firestore (${Qi}): ${t}`,...n)}}function Hf(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,dT(t,s,n)}function dT(t,e,n){let s=`FIRESTORE (${Qi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw ys(s),new Error(s)}function Le(t,e,n,s){let r="Unexpected state";typeof n=="string"?r=n:s=n,t||dT(e,r,s)}function _e(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class se extends Zn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zx{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ot.UNAUTHENTICATED))}shutdown(){}}class Gx{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Kx{constructor(e){this.t=e,this.currentUser=Ot.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Le(this.o===void 0,42304);let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new Ks;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ks,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},a=c=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ks)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Le(typeof s.accessToken=="string",31837,{l:s}),new fT(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Le(e===null||typeof e=="string",2055,{h:e}),new Ot(e)}}class Qx{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=Ot.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Yx{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new Qx(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(Ot.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class F_{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xx{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,sn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Le(this.o===void 0,3512);const s=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,te("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new F_(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Le(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new F_(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jx(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=Jx(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%62))}return s}}function Ce(t,e){return t<e?-1:t>e?1:0}function Td(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const r=t.charAt(s),i=e.charAt(s);if(r!==i)return Ph(r)===Ph(i)?Ce(r,i):Ph(r)?1:-1}return Ce(t.length,e.length)}const Zx=55296,e1=57343;function Ph(t){const e=t.charCodeAt(0);return e>=Zx&&e<=e1}function Vi(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U_="__name__";class Un{constructor(e,n,s){n===void 0?n=0:n>e.length&&ue(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&ue(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Un.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Un?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=Un.compareSegments(e.get(r),n.get(r));if(i!==0)return i}return Ce(e.length,n.length)}static compareSegments(e,n){const s=Un.isNumericId(e),r=Un.isNumericId(n);return s&&!r?-1:!s&&r?1:s&&r?Un.extractNumericId(e).compare(Un.extractNumericId(n)):Td(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Gs.fromString(e.substring(4,e.length-2))}}class Xe extends Un{construct(e,n,s){return new Xe(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new se(j.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new Xe(n)}static emptyPath(){return new Xe([])}}const t1=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ct extends Un{construct(e,n,s){return new Ct(e,n,s)}static isValidIdentifier(e){return t1.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ct.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===U_}static keyField(){return new Ct([U_])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new se(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new se(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new se(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new se(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ct(n)}static emptyPath(){return new Ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.path=e}static fromPath(e){return new ae(Xe.fromString(e))}static fromName(e){return new ae(Xe.fromString(e).popFirst(5))}static empty(){return new ae(Xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Xe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ae(new Xe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n1(t,e,n){if(!n)throw new se(j.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function s1(t,e,n,s){if(e===!0&&s===!0)throw new se(j.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function B_(t){if(!ae.isDocumentKey(t))throw new se(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function pT(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function zf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ue(12329,{type:typeof t})}function Pn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new se(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=zf(t);throw new se(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(t,e){const n={typeString:t};return e&&(n.value=e),n}function $a(t,e){if(!pT(t))throw new se(j.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in t)){n=`JSON missing required field: '${s}'`;break}const o=t[s];if(r&&typeof o!==r){n=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${s}' field to equal '${i.value}'`;break}}if(n)throw new se(j.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_=-62135596800,j_=1e6;class Ge{static now(){return Ge.fromMillis(Date.now())}static fromDate(e){return Ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*j_);return new Ge(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new se(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new se(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<$_)throw new se(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new se(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/j_}_compareTo(e){return this.seconds===e.seconds?Ce(this.nanoseconds,e.nanoseconds):Ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if($a(e,Ge._jsonSchema))return new Ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-$_;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ge._jsonSchemaVersion="firestore/timestamp/1.0",Ge._jsonSchema={type:at("string",Ge._jsonSchemaVersion),seconds:at("number"),nanoseconds:at("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{static fromTimestamp(e){return new ge(e)}static min(){return new ge(new Ge(0,0))}static max(){return new ge(new Ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-1;function r1(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=ge.fromTimestamp(s===1e9?new Ge(n+1,0):new Ge(n,s));return new sr(r,ae.empty(),e)}function i1(t){return new sr(t.readTime,t.key,ma)}class sr{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new sr(ge.min(),ae.empty(),ma)}static max(){return new sr(ge.max(),ae.empty(),ma)}}function o1(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ae.comparator(t.documentKey,e.documentKey),n!==0?n:Ce(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a1="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class l1{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yi(t){if(t.code!==j.FAILED_PRECONDITION||t.message!==a1)throw t;te("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ue(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new U((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):U.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):U.reject(n)}static resolve(e){return new U((n,s)=>{n(e)})}static reject(e){return new U((n,s)=>{s(e)})}static waitFor(e){return new U((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=U.resolve(!1);for(const s of e)n=n.next(r=>r?U.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new U((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(h=>{o[u]=h,++a,a===i&&s(o)},h=>r(h))}})}static doWhile(e,n){return new U((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function c1(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Xi(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>n.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}pu.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=-1;function gu(t){return t==null}function mc(t){return t===0&&1/t==-1/0}function u1(t){return typeof t=="number"&&Number.isInteger(t)&&!mc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gT="";function h1(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=q_(e)),e=d1(t.get(n),e);return q_(e)}function d1(t,e){let n=e;const s=t.length;for(let r=0;r<s;r++){const i=t.charAt(r);switch(i){case"\0":n+="";break;case gT:n+="";break;default:n+=i}}return n}function q_(t){return t+gT+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function pr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function mT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ct=class Id{constructor(e,n){this.comparator=e,this.root=n||Qs.EMPTY}insert(e,n){return new Id(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Qs.BLACK,null,null))}remove(e){return new Id(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qs.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Tl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Tl(this.root,e,this.comparator,!1)}getReverseIterator(){return new Tl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Tl(this.root,e,this.comparator,!0)}},Tl=class{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Qs=class rs{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??rs.RED,this.left=r??rs.EMPTY,this.right=i??rs.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new rs(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return rs.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return rs.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,rs.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,rs.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ue(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ue(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ue(27949);return e+(this.isRed()?0:1)}};Qs.EMPTY=null,Qs.RED=!0,Qs.BLACK=!1;Qs.EMPTY=new class{constructor(){this.size=0}get key(){throw ue(57766)}get value(){throw ue(16141)}get color(){throw ue(16727)}get left(){throw ue(29726)}get right(){throw ue(36894)}copy(e,n,s,r,i){return this}insert(e,n,s){return new Qs(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.comparator=e,this.data=new ct(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new W_(this.data.getIterator())}getIteratorFrom(e){return new W_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof pt)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new pt(this.comparator);return n.data=e,n}}class W_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.fields=e,e.sort(Ct.comparator)}static empty(){return new an([])}unionWith(e){let n=new pt(Ct.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new an(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Vi(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new _T("Invalid base64 string: "+i):i}}(e);return new At(n)}static fromUint8Array(e){const n=function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i}(e);return new At(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}At.EMPTY_BYTE_STRING=new At("");const f1=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function rr(t){if(Le(!!t,39018),typeof t=="string"){let e=0;const n=f1.exec(t);if(Le(!!n,46558,{timestamp:t}),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:it(t.seconds),nanos:it(t.nanos)}}function it(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ir(t){return typeof t=="string"?At.fromBase64String(t):At.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yT="server_timestamp",vT="__type__",ET="__previous_value__",wT="__local_write_time__";function Kf(t){return(t?.mapValue?.fields||{})[vT]?.stringValue===yT}function mu(t){const e=t.mapValue.fields[ET];return Kf(e)?mu(e):e}function _a(t){const e=rr(t.mapValue.fields[wT].timestampValue);return new Ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p1{constructor(e,n,s,r,i,o,a,c,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=h}}const _c="(default)";class ya{constructor(e,n){this.projectId=e,this.database=n||_c}static empty(){return new ya("","")}get isDefaultDatabase(){return this.database===_c}isEqual(e){return e instanceof ya&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT="__type__",g1="__max__",Il={mapValue:{}},IT="__vector__",yc="value";function or(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Kf(t)?4:_1(t)?9007199254740991:m1(t)?10:11:ue(28295,{value:t})}function Qn(t,e){if(t===e)return!0;const n=or(t);if(n!==or(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return _a(t).isEqual(_a(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const o=rr(r.timestampValue),a=rr(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,i){return ir(r.bytesValue).isEqual(ir(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,i){return it(r.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(r.geoPointValue.longitude)===it(i.geoPointValue.longitude)}(t,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return it(r.integerValue)===it(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const o=it(r.doubleValue),a=it(i.doubleValue);return o===a?mc(o)===mc(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return Vi(t.arrayValue.values||[],e.arrayValue.values||[],Qn);case 10:case 11:return function(r,i){const o=r.mapValue.fields||{},a=i.mapValue.fields||{};if(H_(o)!==H_(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Qn(o[c],a[c])))return!1;return!0}(t,e);default:return ue(52216,{left:t})}}function va(t,e){return(t.values||[]).find(n=>Qn(n,e))!==void 0}function Fi(t,e){if(t===e)return 0;const n=or(t),s=or(e);if(n!==s)return Ce(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ce(t.booleanValue,e.booleanValue);case 2:return function(i,o){const a=it(i.integerValue||i.doubleValue),c=it(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(t,e);case 3:return z_(t.timestampValue,e.timestampValue);case 4:return z_(_a(t),_a(e));case 5:return Td(t.stringValue,e.stringValue);case 6:return function(i,o){const a=ir(i),c=ir(o);return a.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const a=i.split("/"),c=o.split("/");for(let u=0;u<a.length&&u<c.length;u++){const h=Ce(a[u],c[u]);if(h!==0)return h}return Ce(a.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const a=Ce(it(i.latitude),it(o.latitude));return a!==0?a:Ce(it(i.longitude),it(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return G_(t.arrayValue,e.arrayValue);case 10:return function(i,o){const a=i.fields||{},c=o.fields||{},u=a[yc]?.arrayValue,h=c[yc]?.arrayValue,d=Ce(u?.values?.length||0,h?.values?.length||0);return d!==0?d:G_(u,h)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Il.mapValue&&o===Il.mapValue)return 0;if(i===Il.mapValue)return 1;if(o===Il.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let d=0;d<c.length&&d<h.length;++d){const p=Td(c[d],h[d]);if(p!==0)return p;const m=Fi(a[c[d]],u[h[d]]);if(m!==0)return m}return Ce(c.length,h.length)}(t.mapValue,e.mapValue);default:throw ue(23264,{he:n})}}function z_(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ce(t,e);const n=rr(t),s=rr(e),r=Ce(n.seconds,s.seconds);return r!==0?r:Ce(n.nanos,s.nanos)}function G_(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const i=Fi(n[r],s[r]);if(i)return i}return Ce(n.length,s.length)}function Ui(t){return bd(t)}function bd(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=rr(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ir(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ae.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",r=!0;for(const i of n.values||[])r?r=!1:s+=",",s+=bd(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${bd(n.fields[o])}`;return r+"}"}(t.mapValue):ue(61005,{value:t})}function Bl(t){switch(or(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mu(t);return e?16+Bl(e):16;case 5:return 2*t.stringValue.length;case 6:return ir(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((r,i)=>r+Bl(i),0)}(t.arrayValue);case 10:case 11:return function(s){let r=0;return pr(s.fields,(i,o)=>{r+=i.length+Bl(o)}),r}(t.mapValue);default:throw ue(13486,{value:t})}}function Cd(t){return!!t&&"integerValue"in t}function Qf(t){return!!t&&"arrayValue"in t}function K_(t){return!!t&&"nullValue"in t}function Q_(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function $l(t){return!!t&&"mapValue"in t}function m1(t){return(t?.mapValue?.fields||{})[TT]?.stringValue===IT}function Go(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return pr(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=Go(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Go(t.arrayValue.values[n]);return e}return{...t}}function _1(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===g1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.value=e}static empty(){return new Xt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!$l(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Go(n)}setAll(e){let n=Ct.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=Go(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());$l(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Qn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];$l(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){pr(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new Xt(Go(this.value))}}function bT(t){const e=[];return pr(t.fields,(n,s)=>{const r=new Ct([n]);if($l(s)){const i=bT(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new an(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,n,s,r,i,o,a){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Lt(e,0,ge.min(),ge.min(),ge.min(),Xt.empty(),0)}static newFoundDocument(e,n,s,r){return new Lt(e,1,n,ge.min(),s,r,0)}static newNoDocument(e,n){return new Lt(e,2,n,ge.min(),ge.min(),Xt.empty(),0)}static newUnknownDocument(e,n){return new Lt(e,3,n,ge.min(),ge.min(),Xt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ge.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Xt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Xt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ge.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Lt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Lt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,n){this.position=e,this.inclusive=n}}function Y_(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=ae.comparator(ae.fromName(o.referenceValue),n.key):s=Fi(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function X_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Qn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,n="asc"){this.field=e,this.dir=n}}function y1(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{}class dt extends CT{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new E1(e,n,s):n==="array-contains"?new I1(e,s):n==="in"?new b1(e,s):n==="not-in"?new C1(e,s):n==="array-contains-any"?new S1(e,s):new dt(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new w1(e,s):new T1(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Fi(n,this.value)):n!==null&&or(this.value)===or(n)&&this.matchesComparison(Fi(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ue(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Yn extends CT{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Yn(e,n)}matches(e){return ST(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ST(t){return t.op==="and"}function AT(t){return v1(t)&&ST(t)}function v1(t){for(const e of t.filters)if(e instanceof Yn)return!1;return!0}function Sd(t){if(t instanceof dt)return t.field.canonicalString()+t.op.toString()+Ui(t.value);if(AT(t))return t.filters.map(e=>Sd(e)).join(",");{const e=t.filters.map(n=>Sd(n)).join(",");return`${t.op}(${e})`}}function RT(t,e){return t instanceof dt?function(s,r){return r instanceof dt&&s.op===r.op&&s.field.isEqual(r.field)&&Qn(s.value,r.value)}(t,e):t instanceof Yn?function(s,r){return r instanceof Yn&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,o,a)=>i&&RT(o,r.filters[a]),!0):!1}(t,e):void ue(19439)}function PT(t){return t instanceof dt?function(n){return`${n.field.canonicalString()} ${n.op} ${Ui(n.value)}`}(t):t instanceof Yn?function(n){return n.op.toString()+" {"+n.getFilters().map(PT).join(" ,")+"}"}(t):"Filter"}class E1 extends dt{constructor(e,n,s){super(e,n,s),this.key=ae.fromName(s.referenceValue)}matches(e){const n=ae.comparator(e.key,this.key);return this.matchesComparison(n)}}class w1 extends dt{constructor(e,n){super(e,"in",n),this.keys=kT("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class T1 extends dt{constructor(e,n){super(e,"not-in",n),this.keys=kT("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function kT(t,e){return(e.arrayValue?.values||[]).map(n=>ae.fromName(n.referenceValue))}class I1 extends dt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Qf(n)&&va(n.arrayValue,this.value)}}class b1 extends dt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&va(this.value.arrayValue,n)}}class C1 extends dt{constructor(e,n){super(e,"not-in",n)}matches(e){if(va(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!va(this.value.arrayValue,n)}}class S1 extends dt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Qf(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>va(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A1{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}}function J_(t,e=null,n=[],s=[],r=null,i=null,o=null){return new A1(t,e,n,s,r,i,o)}function Yf(t){const e=_e(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>Sd(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),gu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Ui(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Ui(s)).join(",")),e.Te=n}return e.Te}function Xf(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!y1(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!RT(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!X_(t.startAt,e.startAt)&&X_(t.endAt,e.endAt)}function Ad(t){return ae.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function R1(t,e,n,s,r,i,o,a){return new _u(t,e,n,s,r,i,o,a)}function yu(t){return new _u(t)}function Z_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function P1(t){return t.collectionGroup!==null}function Ko(t){const e=_e(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new pt(Ct.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(a=a.add(u.field))})}),a})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ec(i,s))}),n.has(Ct.keyField().canonicalString())||e.Ie.push(new Ec(Ct.keyField(),s))}return e.Ie}function Hn(t){const e=_e(t);return e.Ee||(e.Ee=k1(e,Ko(t))),e.Ee}function k1(t,e){if(t.limitType==="F")return J_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new Ec(r.field,i)});const n=t.endAt?new vc(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new vc(t.startAt.position,t.startAt.inclusive):null;return J_(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function Rd(t,e,n){return new _u(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function vu(t,e){return Xf(Hn(t),Hn(e))&&t.limitType===e.limitType}function NT(t){return`${Yf(Hn(t))}|lt:${t.limitType}`}function mi(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(r=>PT(r)).join(", ")}]`),gu(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(r=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(r)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(r=>Ui(r)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(r=>Ui(r)).join(",")),`Target(${s})`}(Hn(t))}; limitType=${t.limitType})`}function Eu(t,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):ae.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,r){for(const i of Ko(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(t,e)&&function(s,r){return!(s.startAt&&!function(o,a,c){const u=Y_(o,a,c);return o.inclusive?u<=0:u<0}(s.startAt,Ko(s),r)||s.endAt&&!function(o,a,c){const u=Y_(o,a,c);return o.inclusive?u>=0:u>0}(s.endAt,Ko(s),r))}(t,e)}function N1(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function xT(t){return(e,n)=>{let s=!1;for(const r of Ko(t)){const i=x1(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function x1(t,e,n){const s=t.field.isKeyField()?ae.comparator(e.key,n.key):function(i,o,a){const c=o.data.field(i),u=a.data.field(i);return c!==null&&u!==null?Fi(c,u):ue(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return ue(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){pr(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return mT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D1=new ct(ae.comparator);function vs(){return D1}const DT=new ct(ae.comparator);function Po(...t){let e=DT;for(const n of t)e=e.insert(n.key,n);return e}function OT(t){let e=DT;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Pr(){return Qo()}function MT(){return Qo()}function Qo(){return new Jr(t=>t.toString(),(t,e)=>t.isEqual(e))}const O1=new ct(ae.comparator),M1=new pt(ae.comparator);function Se(...t){let e=M1;for(const n of t)e=e.add(n);return e}const L1=new pt(Ce);function V1(){return L1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:mc(e)?"-0":e}}function LT(t){return{integerValue:""+t}}function F1(t,e){return u1(e)?LT(e):Jf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(){this._=void 0}}function U1(t,e,n){return t instanceof Ea?function(r,i){const o={fields:{[vT]:{stringValue:yT},[wT]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Kf(i)&&(i=mu(i)),i&&(o.fields[ET]=i),{mapValue:o}}(n,e):t instanceof wa?FT(t,e):t instanceof Ta?UT(t,e):function(r,i){const o=VT(r,i),a=ey(o)+ey(r.Ae);return Cd(o)&&Cd(r.Ae)?LT(a):Jf(r.serializer,a)}(t,e)}function B1(t,e,n){return t instanceof wa?FT(t,e):t instanceof Ta?UT(t,e):n}function VT(t,e){return t instanceof wc?function(s){return Cd(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Ea extends wu{}class wa extends wu{constructor(e){super(),this.elements=e}}function FT(t,e){const n=BT(e);for(const s of t.elements)n.some(r=>Qn(r,s))||n.push(s);return{arrayValue:{values:n}}}class Ta extends wu{constructor(e){super(),this.elements=e}}function UT(t,e){let n=BT(e);for(const s of t.elements)n=n.filter(r=>!Qn(r,s));return{arrayValue:{values:n}}}class wc extends wu{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function ey(t){return it(t.integerValue||t.doubleValue)}function BT(t){return Qf(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $1{constructor(e,n){this.field=e,this.transform=n}}function j1(t,e){return t.field.isEqual(e.field)&&function(s,r){return s instanceof wa&&r instanceof wa||s instanceof Ta&&r instanceof Ta?Vi(s.elements,r.elements,Qn):s instanceof wc&&r instanceof wc?Qn(s.Ae,r.Ae):s instanceof Ea&&r instanceof Ea}(t.transform,e.transform)}class q1{constructor(e,n){this.version=e,this.transformResults=n}}class kn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new kn}static exists(e){return new kn(void 0,e)}static updateTime(e){return new kn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function jl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Tu{}function $T(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Zf(t.key,kn.none()):new ja(t.key,t.data,kn.none());{const n=t.data,s=Xt.empty();let r=new pt(Ct.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new gr(t.key,s,new an(r.toArray()),kn.none())}}function H1(t,e,n){t instanceof ja?function(r,i,o){const a=r.value.clone(),c=ny(r.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(t,e,n):t instanceof gr?function(r,i,o){if(!jl(r.precondition,i))return void i.convertToUnknownDocument(o.version);const a=ny(r.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(jT(r)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Yo(t,e,n,s){return t instanceof ja?function(i,o,a,c){if(!jl(i.precondition,o))return a;const u=i.value.clone(),h=sy(i.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,s):t instanceof gr?function(i,o,a,c){if(!jl(i.precondition,o))return a;const u=sy(i.fieldTransforms,c,o),h=o.data;return h.setAll(jT(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(d=>d.field))}(t,e,n,s):function(i,o,a){return jl(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(t,e,n)}function W1(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=VT(s.transform,r||null);i!=null&&(n===null&&(n=Xt.empty()),n.set(s.field,i))}return n||null}function ty(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Vi(s,r,(i,o)=>j1(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ja extends Tu{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class gr extends Tu{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function jT(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function ny(t,e,n){const s=new Map;Le(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,B1(o,a,n[r]))}return s}function sy(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,U1(i,o,e))}return s}class Zf extends Tu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class z1 extends Tu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G1{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&H1(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Yo(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Yo(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=MT();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const c=$T(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(ge.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Se())}isEqual(e){return this.batchId===e.batchId&&Vi(this.mutations,e.mutations,(n,s)=>ty(n,s))&&Vi(this.baseMutations,e.baseMutations,(n,s)=>ty(n,s))}}class ep{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){Le(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let r=function(){return O1}();const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new ep(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q1{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ot,Pe;function Y1(t){switch(t){case j.OK:return ue(64938);case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0;default:return ue(15467,{code:t})}}function qT(t){if(t===void 0)return ys("GRPC error has no .code"),j.UNKNOWN;switch(t){case ot.OK:return j.OK;case ot.CANCELLED:return j.CANCELLED;case ot.UNKNOWN:return j.UNKNOWN;case ot.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case ot.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case ot.INTERNAL:return j.INTERNAL;case ot.UNAVAILABLE:return j.UNAVAILABLE;case ot.UNAUTHENTICATED:return j.UNAUTHENTICATED;case ot.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case ot.NOT_FOUND:return j.NOT_FOUND;case ot.ALREADY_EXISTS:return j.ALREADY_EXISTS;case ot.PERMISSION_DENIED:return j.PERMISSION_DENIED;case ot.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case ot.ABORTED:return j.ABORTED;case ot.OUT_OF_RANGE:return j.OUT_OF_RANGE;case ot.UNIMPLEMENTED:return j.UNIMPLEMENTED;case ot.DATA_LOSS:return j.DATA_LOSS;default:return ue(39323,{code:t})}}(Pe=ot||(ot={}))[Pe.OK=0]="OK",Pe[Pe.CANCELLED=1]="CANCELLED",Pe[Pe.UNKNOWN=2]="UNKNOWN",Pe[Pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Pe[Pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Pe[Pe.NOT_FOUND=5]="NOT_FOUND",Pe[Pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",Pe[Pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",Pe[Pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",Pe[Pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Pe[Pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Pe[Pe.ABORTED=10]="ABORTED",Pe[Pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",Pe[Pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",Pe[Pe.INTERNAL=13]="INTERNAL",Pe[Pe.UNAVAILABLE=14]="UNAVAILABLE",Pe[Pe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X1(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J1=new Gs([4294967295,4294967295],0);function ry(t){const e=X1().encode(t),n=new oT;return n.update(e),new Uint8Array(n.digest())}function iy(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gs([n,s],0),new Gs([r,i],0)]}class tp{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new ko(`Invalid padding: ${n}`);if(s<0)throw new ko(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new ko(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new ko(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Gs.fromNumber(this.ge)}ye(e,n,s){let r=e.add(n.multiply(Gs.fromNumber(s)));return r.compare(J1)===1&&(r=new Gs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=ry(e),[s,r]=iy(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);if(!this.we(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new tp(i,r,n);return s.forEach(a=>o.insert(a)),o}insert(e){if(this.ge===0)return;const n=ry(e),[s,r]=iy(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class ko extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,qa.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new Iu(ge.min(),r,new ct(Ce),vs(),Se())}}class qa{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new qa(s,n,Se(),Se(),Se())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e,n,s,r){this.be=e,this.removedTargetIds=n,this.key=s,this.De=r}}class HT{constructor(e,n){this.targetId=e,this.Ce=n}}class WT{constructor(e,n,s=At.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class oy{constructor(){this.ve=0,this.Fe=ay(),this.Me=At.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Se(),n=Se(),s=Se();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:ue(38017,{changeType:i})}}),new qa(this.Me,this.xe,e,n,s)}qe(){this.Oe=!1,this.Fe=ay()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Le(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Z1{constructor(e){this.Ge=e,this.ze=new Map,this.je=vs(),this.Je=bl(),this.He=bl(),this.Ye=new ct(Ce)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const s=this.nt(n);switch(e.state){case 0:this.rt(n)&&s.Le(e.resumeToken);break;case 1:s.Ke(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.Ke(),s.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(s.We(),s.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),s.Le(e.resumeToken));break;default:ue(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((s,r)=>{this.rt(r)&&n(r)})}st(e){const n=e.targetId,s=e.Ce.count,r=this.ot(n);if(r){const i=r.target;if(Ad(i))if(s===0){const o=new ae(i.path);this.et(n,o,Lt.newNoDocument(o,ge.min()))}else Le(s===1,20013,{expectedCount:s});else{const o=this._t(n);if(o!==s){const a=this.ut(e),c=a?this.ct(a,e,o):1;if(c!==0){this.it(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,u)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=n;let o,a;try{o=ir(s).toUint8Array()}catch(c){if(c instanceof _T)return Li("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new tp(o,r,i)}catch(c){return Li(c instanceof ko?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(e,n,s){return n.Ce.count===s-this.Pt(e,n.targetId)?0:2}Pt(e,n){const s=this.Ge.getRemoteKeysForTarget(n);let r=0;return s.forEach(i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.et(n,i,null),r++)}),r}Tt(e){const n=new Map;this.ze.forEach((i,o)=>{const a=this.ot(o);if(a){if(i.current&&Ad(a.target)){const c=new ae(a.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,Lt.newNoDocument(c,e))}i.Be&&(n.set(o,i.ke()),i.qe())}});let s=Se();this.He.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const r=new Iu(e,n,this.Ye,this.je,s);return this.je=vs(),this.Je=bl(),this.He=bl(),this.Ye=new ct(Ce),r}Xe(e,n){if(!this.rt(e))return;const s=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,s),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,s){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,n)?r.Qe(n,1):r.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),s&&(this.je=this.je.insert(n,s))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new oy,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new pt(Ce),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new pt(Ce),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||te("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new oy),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function bl(){return new ct(ae.comparator)}function ay(){return new ct(ae.comparator)}const eD={asc:"ASCENDING",desc:"DESCENDING"},tD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nD={and:"AND",or:"OR"};class sD{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Pd(t,e){return t.useProto3Json||gu(e)?e:{value:e}}function Tc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zT(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function rD(t,e){return Tc(t,e.toTimestamp())}function Wn(t){return Le(!!t,49232),ge.fromTimestamp(function(n){const s=rr(n);return new Ge(s.seconds,s.nanos)}(t))}function np(t,e){return kd(t,e).canonicalString()}function kd(t,e){const n=function(r){return new Xe(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function GT(t){const e=Xe.fromString(t);return Le(JT(e),10190,{key:e.toString()}),e}function Nd(t,e){return np(t.databaseId,e.path)}function kh(t,e){const n=GT(e);if(n.get(1)!==t.databaseId.projectId)throw new se(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new se(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ae(QT(n))}function KT(t,e){return np(t.databaseId,e)}function iD(t){const e=GT(t);return e.length===4?Xe.emptyPath():QT(e)}function xd(t){return new Xe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function QT(t){return Le(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function ly(t,e,n){return{name:Nd(t,e),fields:n.value.mapValue.fields}}function oD(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ue(39313,{state:u})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(u,h){return u.useProto3Json?(Le(h===void 0||typeof h=="string",58123),At.fromBase64String(h||"")):(Le(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),At.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(u){const h=u.code===void 0?j.UNKNOWN:qT(u.code);return new se(h,u.message||"")}(o);n=new WT(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=kh(t,s.document.name),i=Wn(s.document.updateTime),o=s.document.createTime?Wn(s.document.createTime):ge.min(),a=new Xt({mapValue:{fields:s.document.fields}}),c=Lt.newFoundDocument(r,i,o,a),u=s.targetIds||[],h=s.removedTargetIds||[];n=new ql(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=kh(t,s.document),i=s.readTime?Wn(s.readTime):ge.min(),o=Lt.newNoDocument(r,i),a=s.removedTargetIds||[];n=new ql([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=kh(t,s.document),i=s.removedTargetIds||[];n=new ql([],i,r,null)}else{if(!("filter"in e))return ue(11601,{Rt:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new Q1(r,i),a=s.targetId;n=new HT(a,o)}}return n}function aD(t,e){let n;if(e instanceof ja)n={update:ly(t,e.key,e.value)};else if(e instanceof Zf)n={delete:Nd(t,e.key)};else if(e instanceof gr)n={update:ly(t,e.key,e.data),updateMask:mD(e.fieldMask)};else{if(!(e instanceof z1))return ue(16599,{Vt:e.type});n={verify:Nd(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,o){const a=o.transform;if(a instanceof Ea)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof wa)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Ta)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof wc)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw ue(20930,{transform:o.transform})}(0,s))),e.precondition.isNone||(n.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:rD(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ue(27497)}(t,e.precondition)),n}function lD(t,e){return t&&t.length>0?(Le(e!==void 0,14353),t.map(n=>function(r,i){let o=r.updateTime?Wn(r.updateTime):Wn(i);return o.isEqual(ge.min())&&(o=Wn(i)),new q1(o,r.transformResults||[])}(n,e))):[]}function cD(t,e){return{documents:[KT(t,e.path)]}}function uD(t,e){const n={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=KT(t,r);const i=function(u){if(u.length!==0)return XT(Yn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(h=>function(p){return{field:_i(p.field),direction:fD(p.dir)}}(h))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Pd(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ft:n,parent:r}}function hD(t){let e=iD(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Le(s===1,65062);const h=n.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let i=[];n.where&&(i=function(d){const p=YT(d);return p instanceof Yn&&AT(p)?p.getFilters():[p]}(n.where));let o=[];n.orderBy&&(o=function(d){return d.map(p=>function(E){return new Ec(yi(E.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(E.direction))}(p))}(n.orderBy));let a=null;n.limit&&(a=function(d){let p;return p=typeof d=="object"?d.value:d,gu(p)?null:p}(n.limit));let c=null;n.startAt&&(c=function(d){const p=!!d.before,m=d.values||[];return new vc(m,p)}(n.startAt));let u=null;return n.endAt&&(u=function(d){const p=!d.before,m=d.values||[];return new vc(m,p)}(n.endAt)),R1(e,r,o,i,a,"F",c,u)}function dD(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ue(28987,{purpose:r})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function YT(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=yi(n.unaryFilter.field);return dt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=yi(n.unaryFilter.field);return dt.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=yi(n.unaryFilter.field);return dt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=yi(n.unaryFilter.field);return dt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ue(61313);default:return ue(60726)}}(t):t.fieldFilter!==void 0?function(n){return dt.create(yi(n.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ue(58110);default:return ue(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Yn.create(n.compositeFilter.filters.map(s=>YT(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return ue(1026)}}(n.compositeFilter.op))}(t):ue(30097,{filter:t})}function fD(t){return eD[t]}function pD(t){return tD[t]}function gD(t){return nD[t]}function _i(t){return{fieldPath:t.canonicalString()}}function yi(t){return Ct.fromServerFormat(t.fieldPath)}function XT(t){return t instanceof dt?function(n){if(n.op==="=="){if(Q_(n.value))return{unaryFilter:{field:_i(n.field),op:"IS_NAN"}};if(K_(n.value))return{unaryFilter:{field:_i(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Q_(n.value))return{unaryFilter:{field:_i(n.field),op:"IS_NOT_NAN"}};if(K_(n.value))return{unaryFilter:{field:_i(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_i(n.field),op:pD(n.op),value:n.value}}}(t):t instanceof Yn?function(n){const s=n.getFilters().map(r=>XT(r));return s.length===1?s[0]:{compositeFilter:{op:gD(n.op),filters:s}}}(t):ue(54877,{filter:t})}function mD(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function JT(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,n,s,r,i=ge.min(),o=ge.min(),a=At.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new qs(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new qs(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new qs(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new qs(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _D{constructor(e){this.yt=e}}function yD(t){const e=hD({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Rd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vD{constructor(){this.Cn=new ED}addToCollectionParentIndex(e,n){return this.Cn.add(n),U.resolve()}getCollectionParents(e,n){return U.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return U.resolve()}deleteFieldIndex(e,n){return U.resolve()}deleteAllFieldIndexes(e){return U.resolve()}createTargetIndexes(e,n){return U.resolve()}getDocumentsMatchingTarget(e,n){return U.resolve(null)}getIndexType(e,n){return U.resolve(0)}getFieldIndexes(e,n){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,n){return U.resolve(sr.min())}getMinOffsetFromCollectionGroup(e,n){return U.resolve(sr.min())}updateCollectionGroup(e,n,s){return U.resolve()}updateIndexEntries(e,n){return U.resolve()}}class ED{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new pt(Xe.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new pt(Xe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ZT=41943040;class Yt{static withCacheSize(e){return new Yt(e,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yt.DEFAULT_COLLECTION_PERCENTILE=10,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Yt.DEFAULT=new Yt(ZT,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Yt.DISABLED=new Yt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Bi(0)}static cr(){return new Bi(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy="LruGarbageCollector",wD=1048576;function hy([t,e],[n,s]){const r=Ce(t,n);return r===0?Ce(e,s):r}class TD{constructor(e){this.Ir=e,this.buffer=new pt(hy),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const s=this.buffer.last();hy(n,s)<0&&(this.buffer=this.buffer.delete(s).add(n))}}get maxValue(){return this.buffer.last()[0]}}class ID{constructor(e,n,s){this.garbageCollector=e,this.asyncQueue=n,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){te(uy,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Xi(n)?te(uy,"Ignoring IndexedDB error during garbage collection: ",n):await Yi(n)}await this.Vr(3e5)})}}class bD{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(s=>Math.floor(n/100*s))}nthSequenceNumber(e,n){if(n===0)return U.resolve(pu.ce);const s=new TD(n);return this.mr.forEachTarget(e,r=>s.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>s.Ar(r))).next(()=>s.maxValue)}removeTargets(e,n,s){return this.mr.removeTargets(e,n,s)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(te("LruGarbageCollector","Garbage collection skipped; disabled"),U.resolve(cy)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(te("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),cy):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let s,r,i,o,a,c,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(te("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),r=this.params.maximumSequenceNumbersToCollect):r=d,o=Date.now(),this.nthSequenceNumber(e,r))).next(d=>(s=d,a=Date.now(),this.removeTargets(e,s,n))).next(d=>(i=d,c=Date.now(),this.removeOrphanedDocuments(e,s))).next(d=>(u=Date.now(),gi()<=Te.DEBUG&&te("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${r} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${d} documents in `+(u-c)+`ms
Total Duration: ${u-h}ms`),U.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:d})))}}function CD(t,e){return new bD(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SD{constructor(){this.changes=new Jr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Lt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?U.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AD{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RD{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&Yo(s.mutation,r,an.empty(),Ge.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,Se()).next(()=>s))}getLocalViewOfDocuments(e,n,s=Se()){const r=Pr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Po();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=Pr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,Se()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=vs();const o=Qo(),a=function(){return Qo()}();return n.forEach((c,u)=>{const h=s.get(u.key);r.has(u.key)&&(h===void 0||h.mutation instanceof gr)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),Yo(h.mutation,u,h.mutation.getFieldMask(),Ge.now())):o.set(u.key,an.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,h)=>o.set(u,h)),n.forEach((u,h)=>a.set(u,new AD(h,o.get(u)??null))),a))}recalculateAndSaveOverlays(e,n){const s=Qo();let r=new ct((o,a)=>o-a),i=Se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let h=s.get(c)||an.empty();h=a.applyToLocalView(u,h),s.set(c,h);const d=(r.get(a.batchId)||Se()).add(c);r=r.insert(a.batchId,d)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,h=c.value,d=MT();h.forEach(p=>{if(!i.has(p)){const m=$T(n.get(p),s.get(p));m!==null&&d.set(p,m),i=i.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,d))}return U.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,r){return function(o){return ae.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):P1(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,r):this.getDocumentsMatchingCollectionQuery(e,n,s,r)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):U.resolve(Pr());let a=ma,c=i;return o.next(u=>U.forEach(u,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),i.get(h)?U.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{c=c.insert(h,p)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,Se())).next(h=>({batchId:a,changes:OT(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ae(n)).next(s=>{let r=Po();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s,r){const i=n.collectionGroup;let o=Po();return this.indexManager.getCollectionParents(e,i).next(a=>U.forEach(a,c=>{const u=function(d,p){return new _u(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,s,r).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,r))).next(o=>{i.forEach((c,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,Lt.newInvalidDocument(h)))});let a=Po();return o.forEach((c,u)=>{const h=i.get(c);h!==void 0&&Yo(h.mutation,u,an.empty(),Ge.now()),Eu(n,u)&&(a=a.insert(c,u))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PD{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return U.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:Wn(r.createTime)}}(n)),U.resolve()}getNamedQuery(e,n){return U.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(r){return{name:r.name,query:yD(r.bundledQuery),readTime:Wn(r.readTime)}}(n)),U.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kD{constructor(){this.overlays=new ct(ae.comparator),this.qr=new Map}getOverlay(e,n){return U.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Pr();return U.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.St(e,n,i)}),U.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.qr.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(s)),U.resolve()}getOverlaysForCollection(e,n,s){const r=Pr(),i=n.length+1,o=new ae(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return U.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new ct((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let h=i.get(u.largestBatchId);h===null&&(h=Pr(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const a=Pr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,h)=>a.set(u,h)),!(a.size()>=r)););return U.resolve(a)}St(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.qr.get(r.largestBatchId).delete(s.key);this.qr.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new K1(n,s));let i=this.qr.get(n);i===void 0&&(i=Se(),this.qr.set(n,i)),this.qr.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ND{constructor(){this.sessionToken=At.EMPTY_BYTE_STRING}getSessionToken(e){return U.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,U.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(){this.Qr=new pt(_t.$r),this.Ur=new pt(_t.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const s=new _t(e,n);this.Qr=this.Qr.add(s),this.Ur=this.Ur.add(s)}Wr(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Gr(new _t(e,n))}zr(e,n){e.forEach(s=>this.removeReference(s,n))}jr(e){const n=new ae(new Xe([])),s=new _t(n,e),r=new _t(n,e+1),i=[];return this.Ur.forEachInRange([s,r],o=>{this.Gr(o),i.push(o.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new ae(new Xe([])),s=new _t(n,e),r=new _t(n,e+1);let i=Se();return this.Ur.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new _t(e,0),s=this.Qr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class _t{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return ae.comparator(e.key,n.key)||Ce(e.Yr,n.Yr)}static Kr(e,n){return Ce(e.Yr,n.Yr)||ae.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xD{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new pt(_t.$r)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new G1(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.Zr=this.Zr.add(new _t(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return U.resolve(o)}lookupMutationBatch(e,n){return U.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.ei(s),i=r<0?0:r;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?Gf:this.tr-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new _t(n,0),r=new _t(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([s,r],o=>{const a=this.Xr(o.Yr);i.push(a)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new pt(Ce);return n.forEach(r=>{const i=new _t(r,0),o=new _t(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],a=>{s=s.add(a.Yr)})}),U.resolve(this.ti(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;ae.isDocumentKey(i)||(i=i.child(""));const o=new _t(new ae(i),0);let a=new pt(Ce);return this.Zr.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(a=a.add(c.Yr)),!0)},o),U.resolve(this.ti(a))}ti(e){const n=[];return e.forEach(s=>{const r=this.Xr(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Le(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Zr;return U.forEach(n.mutations,r=>{const i=new _t(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=s})}ir(e){}containsKey(e,n){const s=new _t(n,0),r=this.Zr.firstAfterOrEqual(s);return U.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DD{constructor(e){this.ri=e,this.docs=function(){return new ct(ae.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.ri(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return U.resolve(s?s.document.mutableCopy():Lt.newInvalidDocument(n))}getEntries(e,n){let s=vs();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Lt.newInvalidDocument(r))}),U.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=vs();const o=n.path,a=new ae(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||o1(i1(h),s)<=0||(r.has(h.key)||Eu(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(e,n,s,r){ue(9500)}ii(e,n){return U.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new OD(this)}getSize(e){return U.resolve(this.size)}}class OD extends SD{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(s)}),U.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MD{constructor(e){this.persistence=e,this.si=new Jr(n=>Yf(n),Xf),this.lastRemoteSnapshotVersion=ge.min(),this.highestTargetId=0,this.oi=0,this._i=new sp,this.targetCount=0,this.ai=Bi.ur()}forEachTarget(e,n){return this.si.forEach((s,r)=>n(r)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.oi&&(this.oi=n),U.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new Bi(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,U.resolve()}updateTargetData(e,n){return this.Pr(n),U.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.si.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),U.waitFor(i).next(()=>r)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,n){const s=this.si.get(n)||null;return U.resolve(s)}addMatchingKeys(e,n,s){return this._i.Wr(n,s),U.resolve()}removeMatchingKeys(e,n,s){this._i.zr(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),U.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),U.resolve()}getMatchingKeysForTargetId(e,n){const s=this._i.Hr(n);return U.resolve(s)}containsKey(e,n){return U.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,n){this.ui={},this.overlays={},this.ci=new pu(0),this.li=!1,this.li=!0,this.hi=new ND,this.referenceDelegate=e(this),this.Pi=new MD(this),this.indexManager=new vD,this.remoteDocumentCache=function(r){return new DD(r)}(s=>this.referenceDelegate.Ti(s)),this.serializer=new _D(n),this.Ii=new PD(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new kD,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.ui[e.toKey()];return s||(s=new xD(n,this.referenceDelegate),this.ui[e.toKey()]=s),s}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,s){te("MemoryPersistence","Starting transaction:",e);const r=new LD(this.ci.next());return this.referenceDelegate.Ei(),s(r).next(i=>this.referenceDelegate.di(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ai(e,n){return U.or(Object.values(this.ui).map(s=>()=>s.containsKey(e,n)))}}class LD extends l1{constructor(e){super(),this.currentSequenceNumber=e}}class rp{constructor(e){this.persistence=e,this.Ri=new sp,this.Vi=null}static mi(e){return new rp(e)}get fi(){if(this.Vi)return this.Vi;throw ue(60996)}addReference(e,n,s){return this.Ri.addReference(s,n),this.fi.delete(s.toString()),U.resolve()}removeReference(e,n,s){return this.Ri.removeReference(s,n),this.fi.add(s.toString()),U.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),U.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(r=>this.fi.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.fi.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.fi,s=>{const r=ae.fromPath(s);return this.gi(e,r).next(i=>{i||n.removeEntry(r,ge.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(s=>{s?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return U.or([()=>U.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Ic{constructor(e,n){this.persistence=e,this.pi=new Jr(s=>h1(s.path),(s,r)=>s.isEqual(r)),this.garbageCollector=CD(this,n)}static mi(e,n){return new Ic(e,n)}Ei(){}di(e){return U.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>n.next(r=>s+r))}wr(e){let n=0;return this.pr(e,s=>{n++}).next(()=>n)}pr(e,n){return U.forEach(this.pi,(s,r)=>this.br(e,s,r).next(i=>i?U.resolve():n(r)))}removeTargets(e,n,s){return this.persistence.getTargetCache().removeTargets(e,n,s)}removeOrphanedDocuments(e,n){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,o=>this.br(e,o,n).next(a=>{a||(s++,i.removeEntry(o,ge.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),U.resolve()}removeTarget(e,n){const s=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,n,s){return this.pi.set(s,e.currentSequenceNumber),U.resolve()}removeReference(e,n,s){return this.pi.set(s,e.currentSequenceNumber),U.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),U.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Bl(e.data.value)),n}br(e,n,s){return U.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const r=this.pi.get(n);return U.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Es=s,this.ds=r}static As(e,n){let s=Se(),r=Se();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new ip(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VD{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FD{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return CP()?8:c1(Ut())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,s,r){const i={result:null};return this.ys(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ws(e,n,r,s).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new VD;return this.Ss(e,n,o).next(a=>{if(i.result=a,this.Vs)return this.bs(e,n,o,a.size)})}).next(()=>i.result)}bs(e,n,s,r){return s.documentReadCount<this.fs?(gi()<=Te.DEBUG&&te("QueryEngine","SDK will not create cache indexes for query:",mi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),U.resolve()):(gi()<=Te.DEBUG&&te("QueryEngine","Query:",mi(n),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.gs*r?(gi()<=Te.DEBUG&&te("QueryEngine","The SDK decides to create cache indexes for query:",mi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Hn(n))):U.resolve())}ys(e,n){if(Z_(n))return U.resolve(null);let s=Hn(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=Rd(n,null,"F"),s=Hn(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=Se(...i);return this.ps.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(c=>{const u=this.Ds(n,a);return this.Cs(n,u,o,c.readTime)?this.ys(e,Rd(n,null,"F")):this.vs(e,u,n,c)}))})))}ws(e,n,s,r){return Z_(n)||r.isEqual(ge.min())?U.resolve(null):this.ps.getDocuments(e,s).next(i=>{const o=this.Ds(n,i);return this.Cs(n,o,s,r)?U.resolve(null):(gi()<=Te.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),mi(n)),this.vs(e,o,n,r1(r,ma)).next(a=>a))})}Ds(e,n){let s=new pt(xT(e));return n.forEach((r,i)=>{Eu(e,i)&&(s=s.add(i))}),s}Cs(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,n,s){return gi()<=Te.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",mi(n)),this.ps.getDocumentsMatchingQuery(e,n,sr.min(),s)}vs(e,n,s,r){return this.ps.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op="LocalStore",UD=3e8;class BD{constructor(e,n,s,r){this.persistence=e,this.Fs=n,this.serializer=r,this.Ms=new ct(Ce),this.xs=new Jr(i=>Yf(i),Xf),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(s)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new RD(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function $D(t,e,n,s){return new BD(t,e,n,s)}async function tI(t,e){const n=_e(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let c=Se();for(const u of r){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of i){a.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(s,c).next(u=>({Ls:u,removedBatchIds:o,addedBatchIds:a}))})})}function jD(t,e){const n=_e(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(a,c,u,h){const d=u.batch,p=d.keys();let m=U.resolve();return p.forEach(E=>{m=m.next(()=>h.getEntry(c,E)).next(R=>{const P=u.docVersions.get(E);Le(P!==null,48541),R.version.compareTo(P)<0&&(d.applyToRemoteDocument(R,u),R.isValidDocument()&&(R.setReadTime(u.commitVersion),h.addEntry(R)))})}),m.next(()=>a.mutationQueue.removeMutationBatch(c,d))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(a){let c=Se();for(let u=0;u<a.mutationResults.length;++u)a.mutationResults[u].transformResults.length>0&&(c=c.add(a.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function nI(t){const e=_e(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function qD(t,e){const n=_e(t),s=e.snapshotVersion;let r=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});r=n.Ms;const a=[];e.targetChanges.forEach((h,d)=>{const p=r.get(d);if(!p)return;a.push(n.Pi.removeMatchingKeys(i,h.removedDocuments,d).next(()=>n.Pi.addMatchingKeys(i,h.addedDocuments,d)));let m=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(d)!==null?m=m.withResumeToken(At.EMPTY_BYTE_STRING,ge.min()).withLastLimboFreeSnapshotVersion(ge.min()):h.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(h.resumeToken,s)),r=r.insert(d,m),function(R,P,D){return R.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=UD?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(p,m,h)&&a.push(n.Pi.updateTargetData(i,m))});let c=vs(),u=Se();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))}),a.push(HD(i,o,e.documentUpdates).next(h=>{c=h.ks,u=h.qs})),!s.isEqual(ge.min())){const h=n.Pi.getLastRemoteSnapshotVersion(i).next(d=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(h)}return U.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.Ms=r,i))}function HD(t,e,n){let s=Se(),r=Se();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=vs();return n.forEach((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(ge.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):te(op,"Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{ks:o,qs:r}})}function WD(t,e){const n=_e(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=Gf),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function zD(t,e){const n=_e(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Pi.getTargetData(s,e).next(i=>i?(r=i,U.resolve(r)):n.Pi.allocateTargetId(s).next(o=>(r=new qs(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Pi.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ms.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(s.targetId,s),n.xs.set(e,s.targetId)),s})}async function Dd(t,e,n){const s=_e(t),r=s.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Xi(o))throw o;te(op,`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ms=s.Ms.remove(e),s.xs.delete(r.target)}function dy(t,e,n){const s=_e(t);let r=ge.min(),i=Se();return s.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,h){const d=_e(c),p=d.xs.get(h);return p!==void 0?U.resolve(d.Ms.get(p)):d.Pi.getTargetData(u,h)}(s,o,Hn(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Pi.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>s.Fs.getDocumentsMatchingQuery(o,e,n?r:ge.min(),n?i:Se())).next(a=>(GD(s,N1(e),a),{documents:a,Qs:i})))}function GD(t,e,n){let s=t.Os.get(e)||ge.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Os.set(e,s)}class fy{constructor(){this.activeTargetIds=V1()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class KD{constructor(){this.Mo=new fy,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,s){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new fy,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QD{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="ConnectivityMonitor";class gy{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){te(py,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){te(py,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cl=null;function Od(){return Cl===null?Cl=function(){return 268435456+Math.round(2147483648*Math.random())}():Cl++,"0x"+Cl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="RestConnection",YD={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class XD{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${s}/databases/${r}`,this.Wo=this.databaseId.database===_c?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Go(e,n,s,r,i){const o=Od(),a=this.zo(e,n.toUriEncodedString());te(Nh,`Sending RPC '${e}' ${o}:`,a,s);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,r,i);const{host:u}=new URL(a),h=Jn(u);return this.Jo(e,a,c,s,h).then(d=>(te(Nh,`Received RPC '${e}' ${o}: `,d),d),d=>{throw Li(Nh,`RPC '${e}' ${o} failed with error: `,d,"url: ",a,"request:",s),d})}Ho(e,n,s,r,i,o){return this.Go(e,n,s,r,i)}jo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Qi}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}zo(e,n){const s=YD[e];return`${this.Uo}/v1/${n}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JD{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="WebChannelConnection";class ZD extends XD{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,s,r,i){const o=Od();return new Promise((a,c)=>{const u=new aT;u.setWithCredentials(!0),u.listenOnce(lT.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Ul.NO_ERROR:const d=u.getResponseJson();te(Nt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(d)),a(d);break;case Ul.TIMEOUT:te(Nt,`RPC '${e}' ${o} timed out`),c(new se(j.DEADLINE_EXCEEDED,"Request time out"));break;case Ul.HTTP_ERROR:const p=u.getStatus();if(te(Nt,`RPC '${e}' ${o} failed with status:`,p,"response text:",u.getResponseText()),p>0){let m=u.getResponseJson();Array.isArray(m)&&(m=m[0]);const E=m?.error;if(E&&E.status&&E.message){const R=function(D){const O=D.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(O)>=0?O:j.UNKNOWN}(E.status);c(new se(R,E.message))}else c(new se(j.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new se(j.UNAVAILABLE,"Connection failed."));break;default:ue(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{te(Nt,`RPC '${e}' ${o} completed.`)}});const h=JSON.stringify(r);te(Nt,`RPC '${e}' ${o} sending request:`,r),u.send(n,"POST",h,s,15)})}T_(e,n,s){const r=Od(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=hT(),a=uT(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,n,s),c.encodeInitMessageHeaders=!0;const h=i.join("");te(Nt,`Creating RPC '${e}' stream ${r}: ${h}`,c);const d=o.createWebChannel(h,c);this.I_(d);let p=!1,m=!1;const E=new JD({Yo:P=>{m?te(Nt,`Not sending because RPC '${e}' stream ${r} is closed:`,P):(p||(te(Nt,`Opening RPC '${e}' stream ${r} transport.`),d.open(),p=!0),te(Nt,`RPC '${e}' stream ${r} sending:`,P),d.send(P))},Zo:()=>d.close()}),R=(P,D,O)=>{P.listen(D,V=>{try{O(V)}catch(B){setTimeout(()=>{throw B},0)}})};return R(d,Ro.EventType.OPEN,()=>{m||(te(Nt,`RPC '${e}' stream ${r} transport opened.`),E.o_())}),R(d,Ro.EventType.CLOSE,()=>{m||(m=!0,te(Nt,`RPC '${e}' stream ${r} transport closed`),E.a_(),this.E_(d))}),R(d,Ro.EventType.ERROR,P=>{m||(m=!0,Li(Nt,`RPC '${e}' stream ${r} transport errored. Name:`,P.name,"Message:",P.message),E.a_(new se(j.UNAVAILABLE,"The operation could not be completed")))}),R(d,Ro.EventType.MESSAGE,P=>{if(!m){const D=P.data[0];Le(!!D,16349);const O=D,V=O?.error||O[0]?.error;if(V){te(Nt,`RPC '${e}' stream ${r} received error:`,V);const B=V.status;let K=function(v){const y=ot[v];if(y!==void 0)return qT(y)}(B),Z=V.message;K===void 0&&(K=j.INTERNAL,Z="Unknown error status: "+B+" with message "+V.message),m=!0,E.a_(new se(K,Z)),d.close()}else te(Nt,`RPC '${e}' stream ${r} received:`,D),E.u_(D)}}),R(a,cT.STAT_EVENT,P=>{P.stat===wd.PROXY?te(Nt,`RPC '${e}' stream ${r} detected buffering proxy`):P.stat===wd.NOPROXY&&te(Nt,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{E.__()},0),E}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function xh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(t){return new sD(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,n,s=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=s,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,n-s);r>0&&te("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my="PersistentStream";class rI{constructor(e,n,s,r,i,o,a,c){this.Mi=e,this.S_=s,this.b_=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new sI(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===j.RESOURCE_EXHAUSTED?(ys(n.toString()),ys("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.D_===n&&this.G_(s,r)},s=>{e(()=>{const r=new se(j.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)})})}G_(e,n){const s=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{s(()=>this.listener.Xo())}),this.stream.t_(()=>{s(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{s(()=>this.z_(r))}),this.stream.onMessage(r=>{s(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return te(my,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(te(my,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class eO extends rI{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=oD(this.serializer,e),s=function(i){if(!("targetChange"in i))return ge.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ge.min():o.readTime?Wn(o.readTime):ge.min()}(e);return this.listener.H_(n,s)}Y_(e){const n={};n.database=xd(this.serializer),n.addTarget=function(i,o){let a;const c=o.target;if(a=Ad(c)?{documents:cD(i,c)}:{query:uD(i,c).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=zT(i,o.resumeToken);const u=Pd(i,o.expectedCount);u!==null&&(a.expectedCount=u)}else if(o.snapshotVersion.compareTo(ge.min())>0){a.readTime=Tc(i,o.snapshotVersion.toTimestamp());const u=Pd(i,o.expectedCount);u!==null&&(a.expectedCount=u)}return a}(this.serializer,e);const s=dD(this.serializer,e);s&&(n.labels=s),this.q_(n)}Z_(e){const n={};n.database=xd(this.serializer),n.removeTarget=e,this.q_(n)}}class tO extends rI{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Le(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Le(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Le(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=lD(e.writeResults,e.commitTime),s=Wn(e.commitTime);return this.listener.na(s,n)}ra(){const e={};e.database=xd(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>aD(this.serializer,s))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{}class sO extends nO{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new se(j.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Go(e,kd(n,s),r,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new se(j.UNKNOWN,i.toString())})}Ho(e,n,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Ho(e,kd(n,s),r,o,a,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new se(j.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class rO{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ys(n),this.aa=!1):te("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr="RemoteStore";class iO{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(o=>{s.enqueueAndForget(async()=>{Zr(this)&&(te(Hr,"Restarting streams for network reachability change."),await async function(c){const u=_e(c);u.Ea.add(4),await Ha(u),u.Ra.set("Unknown"),u.Ea.delete(4),await Cu(u)}(this))})}),this.Ra=new rO(s,r)}}async function Cu(t){if(Zr(t))for(const e of t.da)await e(!0)}async function Ha(t){for(const e of t.da)await e(!1)}function iI(t,e){const n=_e(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),up(n)?cp(n):Ji(n).O_()&&lp(n,e))}function ap(t,e){const n=_e(t),s=Ji(n);n.Ia.delete(e),s.O_()&&oI(n,e),n.Ia.size===0&&(s.O_()?s.L_():Zr(n)&&n.Ra.set("Unknown"))}function lp(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ge.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ji(t).Y_(e)}function oI(t,e){t.Va.Ue(e),Ji(t).Z_(e)}function cp(t){t.Va=new Z1({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Ji(t).start(),t.Ra.ua()}function up(t){return Zr(t)&&!Ji(t).x_()&&t.Ia.size>0}function Zr(t){return _e(t).Ea.size===0}function aI(t){t.Va=void 0}async function oO(t){t.Ra.set("Online")}async function aO(t){t.Ia.forEach((e,n)=>{lp(t,e)})}async function lO(t,e){aI(t),up(t)?(t.Ra.ha(e),cp(t)):t.Ra.set("Unknown")}async function cO(t,e,n){if(t.Ra.set("Online"),e instanceof WT&&e.state===2&&e.cause)try{await async function(r,i){const o=i.cause;for(const a of i.targetIds)r.Ia.has(a)&&(await r.remoteSyncer.rejectListen(a,o),r.Ia.delete(a),r.Va.removeTarget(a))}(t,e)}catch(s){te(Hr,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await bc(t,s)}else if(e instanceof ql?t.Va.Ze(e):e instanceof HT?t.Va.st(e):t.Va.tt(e),!n.isEqual(ge.min()))try{const s=await nI(t.localStore);n.compareTo(s)>=0&&await function(i,o){const a=i.Va.Tt(o);return a.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.Ia.get(u);h&&i.Ia.set(u,h.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,u)=>{const h=i.Ia.get(c);if(!h)return;i.Ia.set(c,h.withResumeToken(At.EMPTY_BYTE_STRING,h.snapshotVersion)),oI(i,c);const d=new qs(h.target,c,u,h.sequenceNumber);lp(i,d)}),i.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(s){te(Hr,"Failed to raise snapshot:",s),await bc(t,s)}}async function bc(t,e,n){if(!Xi(e))throw e;t.Ea.add(1),await Ha(t),t.Ra.set("Offline"),n||(n=()=>nI(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{te(Hr,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Cu(t)})}function lI(t,e){return e().catch(n=>bc(t,n,e))}async function Su(t){const e=_e(t),n=ar(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Gf;for(;uO(e);)try{const r=await WD(e.localStore,s);if(r===null){e.Ta.length===0&&n.L_();break}s=r.batchId,hO(e,r)}catch(r){await bc(e,r)}cI(e)&&uI(e)}function uO(t){return Zr(t)&&t.Ta.length<10}function hO(t,e){t.Ta.push(e);const n=ar(t);n.O_()&&n.X_&&n.ea(e.mutations)}function cI(t){return Zr(t)&&!ar(t).x_()&&t.Ta.length>0}function uI(t){ar(t).start()}async function dO(t){ar(t).ra()}async function fO(t){const e=ar(t);for(const n of t.Ta)e.ea(n.mutations)}async function pO(t,e,n){const s=t.Ta.shift(),r=ep.from(s,e,n);await lI(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Su(t)}async function gO(t,e){e&&ar(t).X_&&await async function(s,r){if(function(o){return Y1(o)&&o!==j.ABORTED}(r.code)){const i=s.Ta.shift();ar(s).B_(),await lI(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Su(s)}}(t,e),cI(t)&&uI(t)}async function _y(t,e){const n=_e(t);n.asyncQueue.verifyOperationInProgress(),te(Hr,"RemoteStore received new credentials");const s=Zr(n);n.Ea.add(3),await Ha(n),s&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Cu(n)}async function mO(t,e){const n=_e(t);e?(n.Ea.delete(2),await Cu(n)):e||(n.Ea.add(2),await Ha(n),n.Ra.set("Unknown"))}function Ji(t){return t.ma||(t.ma=function(n,s,r){const i=_e(n);return i.sa(),new eO(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Xo:oO.bind(null,t),t_:aO.bind(null,t),r_:lO.bind(null,t),H_:cO.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),up(t)?cp(t):t.Ra.set("Unknown")):(await t.ma.stop(),aI(t))})),t.ma}function ar(t){return t.fa||(t.fa=function(n,s,r){const i=_e(n);return i.sa(),new tO(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:dO.bind(null,t),r_:gO.bind(null,t),ta:fO.bind(null,t),na:pO.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await Su(t)):(await t.fa.stop(),t.Ta.length>0&&(te(Hr,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Ks,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new hp(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new se(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function dp(t,e){if(ys("AsyncQueue",`${e}: ${t}`),Xi(t))return new se(j.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{static emptySet(e){return new Ai(e.comparator)}constructor(e){this.comparator=e?(n,s)=>e(n,s)||ae.comparator(n.key,s.key):(n,s)=>ae.comparator(n.key,s.key),this.keyedMap=Po(),this.sortedSet=new ct(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ai)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Ai;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(){this.ga=new ct(ae.comparator)}track(e){const n=e.doc.key,s=this.ga.get(n);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(n,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(n):e.type===1&&s.type===2?this.ga=this.ga.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):ue(63341,{Rt:e,pa:s}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,s)=>{e.push(s)}),e}}class $i{constructor(e,n,s,r,i,o,a,c,u){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new $i(e,n,Ai.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&vu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _O{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class yO{constructor(){this.queries=vy(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,s){const r=_e(n),i=r.queries;r.queries=vy(),i.forEach((o,a)=>{for(const c of a.Sa)c.onError(s)})})(this,new se(j.ABORTED,"Firestore shutting down"))}}function vy(){return new Jr(t=>NT(t),vu)}async function hI(t,e){const n=_e(t);let s=3;const r=e.query;let i=n.queries.get(r);i?!i.ba()&&e.Da()&&(s=2):(i=new _O,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await n.onListen(r,!0);break;case 1:i.wa=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(o){const a=dp(o,`Initialization of query '${mi(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&fp(n)}async function dI(t,e){const n=_e(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function vO(t,e){const n=_e(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.Sa)a.Fa(r)&&(s=!0);o.wa=r}}s&&fp(n)}function EO(t,e,n){const s=_e(t),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(n);s.queries.delete(e)}function fp(t){t.Ca.forEach(e=>{e.next()})}var Md,Ey;(Ey=Md||(Md={})).Ma="default",Ey.Cache="cache";class fI{constructor(e,n,s){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new $i(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const s=n!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=$i.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Md.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e){this.key=e}}class gI{constructor(e){this.key=e}}class wO{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Se(),this.mutatedKeys=Se(),this.eu=xT(e),this.tu=new Ai(this.eu)}get nu(){return this.Ya}ru(e,n){const s=n?n.iu:new yy,r=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((h,d)=>{const p=r.get(h),m=Eu(this.query,d)?d:null,E=!!p&&this.mutatedKeys.has(p.key),R=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let P=!1;p&&m?p.data.isEqual(m.data)?E!==R&&(s.track({type:3,doc:m}),P=!0):this.su(p,m)||(s.track({type:2,doc:m}),P=!0,(c&&this.eu(m,c)>0||u&&this.eu(m,u)<0)&&(a=!0)):!p&&m?(s.track({type:0,doc:m}),P=!0):p&&!m&&(s.track({type:1,doc:p}),P=!0,(c||u)&&(a=!0)),P&&(m?(o=o.add(m),i=R?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),s.track({type:1,doc:h})}return{tu:o,iu:s,Cs:a,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((h,d)=>function(m,E){const R=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ue(20277,{Rt:P})}};return R(m)-R(E)}(h.type,d.type)||this.eu(h.doc,d.doc)),this.ou(s),r=r??!1;const a=n&&!r?this._u():[],c=this.Xa.size===0&&this.current&&!r?1:0,u=c!==this.Za;return this.Za=c,o.length!==0||u?{snapshot:new $i(this.query,e.tu,i,o,e.mutatedKeys,c===0,u,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new yy,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Se(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Xa=this.Xa.add(s.key))});const n=[];return e.forEach(s=>{this.Xa.has(s)||n.push(new gI(s))}),this.Xa.forEach(s=>{e.has(s)||n.push(new pI(s))}),n}cu(e){this.Ya=e.Qs,this.Xa=Se();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return $i.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const pp="SyncEngine";class TO{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class IO{constructor(e){this.key=e,this.hu=!1}}class bO{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Jr(a=>NT(a),vu),this.Iu=new Map,this.Eu=new Set,this.du=new ct(ae.comparator),this.Au=new Map,this.Ru=new sp,this.Vu={},this.mu=new Map,this.fu=Bi.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function CO(t,e,n=!0){const s=wI(t);let r;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await mI(s,e,n,!0),r}async function SO(t,e){const n=wI(t);await mI(n,e,!0,!1)}async function mI(t,e,n,s){const r=await zD(t.localStore,Hn(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return s&&(a=await AO(t,e,i,o==="current",r.resumeToken)),t.isPrimaryClient&&n&&iI(t.remoteStore,r),a}async function AO(t,e,n,s,r){t.pu=(d,p,m)=>async function(R,P,D,O){let V=P.view.ru(D);V.Cs&&(V=await dy(R.localStore,P.query,!1).then(({documents:S})=>P.view.ru(S,V)));const B=O&&O.targetChanges.get(P.targetId),K=O&&O.targetMismatches.get(P.targetId)!=null,Z=P.view.applyChanges(V,R.isPrimaryClient,B,K);return Ty(R,P.targetId,Z.au),Z.snapshot}(t,d,p,m);const i=await dy(t.localStore,e,!0),o=new wO(e,i.Qs),a=o.ru(i.documents),c=qa.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),u=o.applyChanges(a,t.isPrimaryClient,c);Ty(t,n,u.au);const h=new TO(e,n,o);return t.Tu.set(e,h),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),u.snapshot}async function RO(t,e,n){const s=_e(t),r=s.Tu.get(e),i=s.Iu.get(r.targetId);if(i.length>1)return s.Iu.set(r.targetId,i.filter(o=>!vu(o,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Dd(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&ap(s.remoteStore,r.targetId),Ld(s,r.targetId)}).catch(Yi)):(Ld(s,r.targetId),await Dd(s.localStore,r.targetId,!0))}async function PO(t,e){const n=_e(t),s=n.Tu.get(e),r=n.Iu.get(s.targetId);n.isPrimaryClient&&r.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),ap(n.remoteStore,s.targetId))}async function kO(t,e,n){const s=VO(t);try{const r=await function(o,a){const c=_e(o),u=Ge.now(),h=a.reduce((m,E)=>m.add(E.key),Se());let d,p;return c.persistence.runTransaction("Locally write mutations","readwrite",m=>{let E=vs(),R=Se();return c.Ns.getEntries(m,h).next(P=>{E=P,E.forEach((D,O)=>{O.isValidDocument()||(R=R.add(D))})}).next(()=>c.localDocuments.getOverlayedDocuments(m,E)).next(P=>{d=P;const D=[];for(const O of a){const V=W1(O,d.get(O.key).overlayedDocument);V!=null&&D.push(new gr(O.key,V,bT(V.value.mapValue),kn.exists(!0)))}return c.mutationQueue.addMutationBatch(m,u,D,a)}).next(P=>{p=P;const D=P.applyToLocalDocumentSet(d,R);return c.documentOverlayCache.saveOverlays(m,P.batchId,D)})}).then(()=>({batchId:p.batchId,changes:OT(d)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(o,a,c){let u=o.Vu[o.currentUser.toKey()];u||(u=new ct(Ce)),u=u.insert(a,c),o.Vu[o.currentUser.toKey()]=u}(s,r.batchId,n),await Wa(s,r.changes),await Su(s.remoteStore)}catch(r){const i=dp(r,"Failed to persist write");n.reject(i)}}async function _I(t,e){const n=_e(t);try{const s=await qD(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.Au.get(i);o&&(Le(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?o.hu=!0:r.modifiedDocuments.size>0?Le(o.hu,14607):r.removedDocuments.size>0&&(Le(o.hu,42227),o.hu=!1))}),await Wa(n,s,e)}catch(s){await Yi(s)}}function wy(t,e,n){const s=_e(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.Tu.forEach((i,o)=>{const a=o.view.va(e);a.snapshot&&r.push(a.snapshot)}),function(o,a){const c=_e(o);c.onlineState=a;let u=!1;c.queries.forEach((h,d)=>{for(const p of d.Sa)p.va(a)&&(u=!0)}),u&&fp(c)}(s.eventManager,e),r.length&&s.Pu.H_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function NO(t,e,n){const s=_e(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.Au.get(e),i=r&&r.key;if(i){let o=new ct(ae.comparator);o=o.insert(i,Lt.newNoDocument(i,ge.min()));const a=Se().add(i),c=new Iu(ge.min(),new Map,new ct(Ce),o,a);await _I(s,c),s.du=s.du.remove(i),s.Au.delete(e),gp(s)}else await Dd(s.localStore,e,!1).then(()=>Ld(s,e,n)).catch(Yi)}async function xO(t,e){const n=_e(t),s=e.batch.batchId;try{const r=await jD(n.localStore,e);vI(n,s,null),yI(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Wa(n,r)}catch(r){await Yi(r)}}async function DO(t,e,n){const s=_e(t);try{const r=await function(o,a){const c=_e(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let h;return c.mutationQueue.lookupMutationBatch(u,a).next(d=>(Le(d!==null,37113),h=d.keys(),c.mutationQueue.removeMutationBatch(u,d))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h)).next(()=>c.localDocuments.getDocuments(u,h))})}(s.localStore,e);vI(s,e,n),yI(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Wa(s,r)}catch(r){await Yi(r)}}function yI(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function vI(t,e,n){const s=_e(t);let r=s.Vu[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Vu[s.currentUser.toKey()]=r}}function Ld(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Iu.get(e))t.Tu.delete(s),n&&t.Pu.yu(s,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(s=>{t.Ru.containsKey(s)||EI(t,s)})}function EI(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(ap(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),gp(t))}function Ty(t,e,n){for(const s of n)s instanceof pI?(t.Ru.addReference(s.key,e),OO(t,s)):s instanceof gI?(te(pp,"Document no longer in limbo: "+s.key),t.Ru.removeReference(s.key,e),t.Ru.containsKey(s.key)||EI(t,s.key)):ue(19791,{wu:s})}function OO(t,e){const n=e.key,s=n.path.canonicalString();t.du.get(n)||t.Eu.has(s)||(te(pp,"New document in limbo: "+n),t.Eu.add(s),gp(t))}function gp(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new ae(Xe.fromString(e)),s=t.fu.next();t.Au.set(s,new IO(n)),t.du=t.du.insert(n,s),iI(t.remoteStore,new qs(Hn(yu(n.path)),s,"TargetPurposeLimboResolution",pu.ce))}}async function Wa(t,e,n){const s=_e(t),r=[],i=[],o=[];s.Tu.isEmpty()||(s.Tu.forEach((a,c)=>{o.push(s.pu(c,e,n).then(u=>{if((u||n)&&s.isPrimaryClient){const h=u?!u.fromCache:n?.targetChanges.get(c.targetId)?.current;s.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(u){r.push(u);const h=ip.As(c.targetId,u);i.push(h)}}))}),await Promise.all(o),s.Pu.H_(r),await async function(c,u){const h=_e(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>U.forEach(u,p=>U.forEach(p.Es,m=>h.persistence.referenceDelegate.addReference(d,p.targetId,m)).next(()=>U.forEach(p.ds,m=>h.persistence.referenceDelegate.removeReference(d,p.targetId,m)))))}catch(d){if(!Xi(d))throw d;te(op,"Failed to update sequence numbers: "+d)}for(const d of u){const p=d.targetId;if(!d.fromCache){const m=h.Ms.get(p),E=m.snapshotVersion,R=m.withLastLimboFreeSnapshotVersion(E);h.Ms=h.Ms.insert(p,R)}}}(s.localStore,i))}async function MO(t,e){const n=_e(t);if(!n.currentUser.isEqual(e)){te(pp,"User change. New user:",e.toKey());const s=await tI(n.localStore,e);n.currentUser=e,function(i,o){i.mu.forEach(a=>{a.forEach(c=>{c.reject(new se(j.CANCELLED,o))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Wa(n,s.Ls)}}function LO(t,e){const n=_e(t),s=n.Au.get(e);if(s&&s.hu)return Se().add(s.key);{let r=Se();const i=n.Iu.get(e);if(!i)return r;for(const o of i){const a=n.Tu.get(o);r=r.unionWith(a.view.nu)}return r}}function wI(t){const e=_e(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=_I.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=LO.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=NO.bind(null,e),e.Pu.H_=vO.bind(null,e.eventManager),e.Pu.yu=EO.bind(null,e.eventManager),e}function VO(t){const e=_e(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=xO.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=DO.bind(null,e),e}class Cc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=bu(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return $D(this.persistence,new FD,e.initialUser,this.serializer)}Cu(e){return new eI(rp.mi,this.serializer)}Du(e){return new KD}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cc.provider={build:()=>new Cc};class FO extends Cc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Le(this.persistence.referenceDelegate instanceof Ic,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new ID(s,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Yt.withCacheSize(this.cacheSizeBytes):Yt.DEFAULT;return new eI(s=>Ic.mi(s,n),this.serializer)}}class Vd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>wy(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=MO.bind(null,this.syncEngine),await mO(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new yO}()}createDatastore(e){const n=bu(e.databaseInfo.databaseId),s=function(i){return new ZD(i)}(e.databaseInfo);return function(i,o,a,c){return new sO(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,r,i,o,a){return new iO(s,r,i,o,a)}(this.localStore,this.datastore,e.asyncQueue,n=>wy(this.syncEngine,n,0),function(){return gy.v()?new gy:new QD}())}createSyncEngine(e,n){return function(r,i,o,a,c,u,h){const d=new bO(r,i,o,a,c,u);return h&&(d.gu=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await async function(n){const s=_e(n);te(Hr,"RemoteStore shutting down."),s.Ea.add(5),await Ha(s),s.Aa.shutdown(),s.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Vd.provider={build:()=>new Vd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ys("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr="FirestoreClient";class UO{constructor(e,n,s,r,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=Ot.UNAUTHENTICATED,this.clientId=Wf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async o=>{te(lr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(s,o=>(te(lr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ks;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=dp(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Dh(t,e){t.asyncQueue.verifyOperationInProgress(),te(lr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await tI(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Iy(t,e){t.asyncQueue.verifyOperationInProgress();const n=await BO(t);te(lr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>_y(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,r)=>_y(e.remoteStore,r)),t._onlineComponents=e}async function BO(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){te(lr,"Using user provided OfflineComponentProvider");try{await Dh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===j.FAILED_PRECONDITION||r.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;Li("Error using user provided cache. Falling back to memory cache: "+n),await Dh(t,new Cc)}}else te(lr,"Using default OfflineComponentProvider"),await Dh(t,new FO(void 0));return t._offlineComponents}async function II(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(te(lr,"Using user provided OnlineComponentProvider"),await Iy(t,t._uninitializedComponentsProvider._online)):(te(lr,"Using default OnlineComponentProvider"),await Iy(t,new Vd))),t._onlineComponents}function $O(t){return II(t).then(e=>e.syncEngine)}async function Fd(t){const e=await II(t),n=e.eventManager;return n.onListen=CO.bind(null,e.syncEngine),n.onUnlisten=RO.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=SO.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=PO.bind(null,e.syncEngine),n}function jO(t,e,n={}){const s=new Ks;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,a,c,u){const h=new TI({next:p=>{h.Nu(),o.enqueueAndForget(()=>dI(i,d));const m=p.docs.has(a);!m&&p.fromCache?u.reject(new se(j.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&p.fromCache&&c&&c.source==="server"?u.reject(new se(j.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(p)},error:p=>u.reject(p)}),d=new fI(yu(a.path),h,{includeMetadataChanges:!0,qa:!0});return hI(i,d)}(await Fd(t),t.asyncQueue,e,n,s)),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI="firestore.googleapis.com",Cy=!0;class Sy{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new se(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=CI,this.ssl=Cy}else this.host=e.host,this.ssl=e.ssl??Cy;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ZT;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<wD)throw new se(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}s1("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bI(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new se(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new se(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new se(j.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class mp{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Sy({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new se(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new se(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Sy(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new zx;switch(s.type){case"firstParty":return new Yx(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new se(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=by.get(n);s&&(te("ComponentProvider","Removing Datastore"),by.delete(n),s.terminate())}(this),Promise.resolve()}}function qO(t,e,n,s={}){t=Pn(t,mp);const r=Jn(e),i=t._getSettings(),o={...i,emulatorOptions:t._getEmulatorOptions()},a=`${e}:${n}`;r&&(ou(`https://${a}`),au("Firestore",!0)),i.host!==CI&&i.host!==a&&Li("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:r,emulatorOptions:s};if(!tr(c,o)&&(t._setSettings(c),s.mockUserToken)){let u,h;if(typeof s.mockUserToken=="string")u=s.mockUserToken,h=Ot.MOCK_USER;else{u=kf(s.mockUserToken,t._app?.options.projectId);const d=s.mockUserToken.sub||s.mockUserToken.user_id;if(!d)throw new se(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Ot(d)}t._authCredentials=new Gx(new fT(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Au(this.firestore,e,this._query)}}class lt{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ia(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new lt(this.firestore,e,this._key)}toJSON(){return{type:lt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if($a(n,lt._jsonSchema))return new lt(e,s||null,new ae(Xe.fromString(n.referencePath)))}}lt._jsonSchemaVersion="firestore/documentReference/1.0",lt._jsonSchema={type:at("string",lt._jsonSchemaVersion),referencePath:at("string")};class Ia extends Au{constructor(e,n,s){super(e,n,yu(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new lt(this.firestore,null,new ae(e))}withConverter(e){return new Ia(this.firestore,e,this._path)}}function HO(t,e,...n){if(t=Fe(t),arguments.length===1&&(e=Wf.newId()),n1("doc","path",e),t instanceof mp){const s=Xe.fromString(e,...n);return B_(s),new lt(t,null,new ae(s))}{if(!(t instanceof lt||t instanceof Ia))throw new se(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Xe.fromString(e,...n));return B_(s),new lt(t.firestore,t instanceof Ia?t.converter:null,new ae(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay="AsyncQueue";class Ry{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new sI(this,"async_queue_retry"),this._c=()=>{const s=xh();s&&te(Ay,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const n=xh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=xh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Ks;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Xi(e))throw e;te(Ay,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,ys("INTERNAL UNHANDLED ERROR: ",Py(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=n,n}enqueueAfterDelay(e,n,s){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const r=hp.createAndSchedule(this,e,n,s,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&ue(47125,{Pc:Py(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Py(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const r=n;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Wr extends mp{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new Ry,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ry(e),this._firestoreClient=void 0,await e}}}function SI(t,e){const n=typeof t=="object"?t:uu(),s=typeof t=="string"?t:_c,r=Va(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=Pf("firestore");i&&qO(r,...i)}return r}function _p(t){if(t._terminated)throw new se(j.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||WO(t),t._firestoreClient}function WO(t){const e=t._freezeSettings(),n=function(r,i,o,a){return new p1(r,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,bI(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator)}(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new UO(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(r){const i=r?._online.build();return{_offline:r?._offline.build(i),_online:i}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new fn(At.fromBase64String(e))}catch(n){throw new se(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new fn(At.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:fn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if($a(e,fn._jsonSchema))return fn.fromBase64String(e.bytes)}}fn._jsonSchemaVersion="firestore/bytes/1.0",fn._jsonSchema={type:at("string",fn._jsonSchemaVersion),bytes:at("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new se(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ct(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new se(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new se(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ce(this._lat,e._lat)||Ce(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:zn._jsonSchemaVersion}}static fromJSON(e){if($a(e,zn._jsonSchema))return new zn(e.latitude,e.longitude)}}zn._jsonSchemaVersion="firestore/geoPoint/1.0",zn._jsonSchema={type:at("string",zn._jsonSchemaVersion),latitude:at("number"),longitude:at("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Gn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if($a(e,Gn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new Gn(e.vectorValues);throw new se(j.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Gn._jsonSchemaVersion="firestore/vectorValue/1.0",Gn._jsonSchema={type:at("string",Gn._jsonSchemaVersion),vectorValues:at("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zO=/^__.*__$/;class GO{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new gr(e,this.data,this.fieldMask,n,this.fieldTransforms):new ja(e,this.data,n,this.fieldTransforms)}}class AI{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new gr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function RI(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ue(40011,{Ac:t})}}class yp{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new yp({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),s=this.Vc({path:n,fc:!1});return s.gc(e),s}yc(e){const n=this.path?.child(e),s=this.Vc({path:n,fc:!1});return s.Rc(),s}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Sc(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(RI(this.Ac)&&zO.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class KO{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||bu(e)}Cc(e,n,s,r=!1){return new yp({Ac:e,methodName:n,Dc:s,path:Ct.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function PI(t){const e=t._freezeSettings(),n=bu(t._databaseId);return new KO(t._databaseId,!!e.ignoreUndefinedProperties,n)}function QO(t,e,n,s,r,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,r);Ep("Data must be an object, but it was:",o,s);const a=kI(s,o);let c,u;if(i.merge)c=new an(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const d of i.mergeFields){const p=Ud(e,d,n);if(!o.contains(p))throw new se(j.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);xI(h,p)||h.push(p)}c=new an(h),u=o.fieldTransforms.filter(d=>c.covers(d.field))}else c=null,u=o.fieldTransforms;return new GO(new Xt(a),c,u)}class ku extends Pu{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ku}}class vp extends Pu{_toFieldTransform(e){return new $1(e.path,new Ea)}isEqual(e){return e instanceof vp}}function YO(t,e,n,s){const r=t.Cc(1,e,n);Ep("Data must be an object, but it was:",r,s);const i=[],o=Xt.empty();pr(s,(c,u)=>{const h=wp(e,c,n);u=Fe(u);const d=r.yc(h);if(u instanceof ku)i.push(h);else{const p=Nu(u,d);p!=null&&(i.push(h),o.set(h,p))}});const a=new an(i);return new AI(o,a,r.fieldTransforms)}function XO(t,e,n,s,r,i){const o=t.Cc(1,e,n),a=[Ud(e,s,n)],c=[r];if(i.length%2!=0)throw new se(j.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)a.push(Ud(e,i[p])),c.push(i[p+1]);const u=[],h=Xt.empty();for(let p=a.length-1;p>=0;--p)if(!xI(u,a[p])){const m=a[p];let E=c[p];E=Fe(E);const R=o.yc(m);if(E instanceof ku)u.push(m);else{const P=Nu(E,R);P!=null&&(u.push(m),h.set(m,P))}}const d=new an(u);return new AI(h,d,o.fieldTransforms)}function Nu(t,e){if(NI(t=Fe(t)))return Ep("Unsupported field value:",e,t),kI(t,e);if(t instanceof Pu)return function(s,r){if(!RI(r.Ac))throw r.Sc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(s,r){const i=[];let o=0;for(const a of s){let c=Nu(a,r.wc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(s,r){if((s=Fe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return F1(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=Ge.fromDate(s);return{timestampValue:Tc(r.serializer,i)}}if(s instanceof Ge){const i=new Ge(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Tc(r.serializer,i)}}if(s instanceof zn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof fn)return{bytesValue:zT(r.serializer,s._byteString)};if(s instanceof lt){const i=r.databaseId,o=s.firestore._databaseId;if(!o.isEqual(i))throw r.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:np(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Gn)return function(o,a){return{mapValue:{fields:{[TT]:{stringValue:IT},[yc]:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw a.Sc("VectorValues must only contain numeric values.");return Jf(a.serializer,u)})}}}}}}(s,r);throw r.Sc(`Unsupported field value: ${zf(s)}`)}(t,e)}function kI(t,e){const n={};return mT(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):pr(t,(s,r)=>{const i=Nu(r,e.mc(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function NI(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ge||t instanceof zn||t instanceof fn||t instanceof lt||t instanceof Pu||t instanceof Gn)}function Ep(t,e,n){if(!NI(n)||!pT(n)){const s=zf(n);throw s==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+s)}}function Ud(t,e,n){if((e=Fe(e))instanceof Ru)return e._internalPath;if(typeof e=="string")return wp(t,e);throw Sc("Field path arguments must be of type string or ",t,!1,void 0,n)}const JO=new RegExp("[~\\*/\\[\\]]");function wp(t,e,n){if(e.search(JO)>=0)throw Sc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ru(...e.split("."))._internalPath}catch{throw Sc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Sc(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new se(j.INVALID_ARGUMENT,a+t+c)}function xI(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new lt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new ZO(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(OI("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class ZO extends DI{data(){return super.data()}}function OI(t,e){return typeof e=="string"?wp(t,e):e instanceof Ru?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eM(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new se(j.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class tM{convertValue(e,n="none"){switch(or(e)){case 0:return null;case 1:return e.booleanValue;case 2:return it(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ir(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ue(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return pr(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertVectorValue(e){const n=e.fields?.[yc].arrayValue?.values?.map(s=>it(s.doubleValue));return new Gn(n)}convertGeoPoint(e){return new zn(it(e.latitude),it(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=mu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(_a(e));default:return null}}convertTimestamp(e){const n=rr(e);return new Ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=Xe.fromString(e);Le(JT(s),9688,{name:e});const r=new ya(s.get(1),s.get(3)),i=new ae(s.popFirst(5));return r.isEqual(n)||ys(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nM(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class No{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Vr extends DI{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Hl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(OI("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new se(j.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Vr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Vr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Vr._jsonSchema={type:at("string",Vr._jsonSchemaVersion),bundleSource:at("string","DocumentSnapshot"),bundleName:at("string"),bundle:at("string")};class Hl extends Vr{data(e={}){return super.data(e)}}class Ri{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new No(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new Hl(this._firestore,this._userDataWriter,s.key,s,new No(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new se(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map(a=>{const c=new Hl(r._firestore,r._userDataWriter,a.doc.key,a.doc,new No(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(a=>i||a.type!==3).map(a=>{const c=new Hl(r._firestore,r._userDataWriter,a.doc.key,a.doc,new No(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,h=-1;return a.type!==0&&(u=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:sM(a.type),doc:c,oldIndex:u,newIndex:h}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new se(j.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ri._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sM(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ue(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(t){t=Pn(t,lt);const e=Pn(t.firestore,Wr);return jO(_p(e),t._key).then(n=>LI(e,t,n))}Ri._jsonSchemaVersion="firestore/querySnapshot/1.0",Ri._jsonSchema={type:at("string",Ri._jsonSchemaVersion),bundleSource:at("string","QuerySnapshot"),bundleName:at("string"),bundle:at("string")};class MI extends tM{constructor(e){super(),this.firestore=e}convertBytes(e){return new fn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new lt(this.firestore,null,n)}}function xy(t,e,n){t=Pn(t,lt);const s=Pn(t.firestore,Wr),r=nM(t.converter,e,n);return Tp(s,[QO(PI(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,kn.none())])}function Z2(t,e,n,...s){t=Pn(t,lt);const r=Pn(t.firestore,Wr),i=PI(r);let o;return o=typeof(e=Fe(e))=="string"||e instanceof Ru?XO(i,"updateDoc",t._key,e,n,s):YO(i,"updateDoc",t._key,e),Tp(r,[o.toMutation(t._key,kn.exists(!0))])}function e4(t){return Tp(Pn(t.firestore,Wr),[new Zf(t._key,kn.none())])}function t4(t,...e){t=Fe(t);let n={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||ky(e[s])||(n=e[s++]);const r={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(ky(e[s])){const c=e[s];e[s]=c.next?.bind(c),e[s+1]=c.error?.bind(c),e[s+2]=c.complete?.bind(c)}let i,o,a;if(t instanceof lt)o=Pn(t.firestore,Wr),a=yu(t._key.path),i={next:c=>{e[s]&&e[s](LI(o,t,c))},error:e[s+1],complete:e[s+2]};else{const c=Pn(t,Au);o=Pn(c.firestore,Wr),a=c._query;const u=new MI(o);i={next:h=>{e[s]&&e[s](new Ri(o,u,c,h))},error:e[s+1],complete:e[s+2]},eM(t._query)}return function(u,h,d,p){const m=new TI(p),E=new fI(h,m,d);return u.asyncQueue.enqueueAndForget(async()=>hI(await Fd(u),E)),()=>{m.Nu(),u.asyncQueue.enqueueAndForget(async()=>dI(await Fd(u),E))}}(_p(o),a,r,i)}function Tp(t,e){return function(s,r){const i=new Ks;return s.asyncQueue.enqueueAndForget(async()=>kO(await $O(s),r,i)),i.promise}(_p(t),e)}function LI(t,e,n){const s=n.docs.get(e._key),r=new MI(t);return new Vr(t,r,e._key,s,new No(n.hasPendingWrites,n.fromCache),e.converter)}function Oh(){return new vp("serverTimestamp")}(function(e,n=!0){(function(r){Qi=r})(fr),nr(new gs("firestore",(s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),a=new Wr(new Kx(s.getProvider("auth-internal")),new Xx(o,s.getProvider("app-check-internal")),function(u,h){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new se(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ya(u.options.projectId,h)}(o,r),o);return i={useFetchStreams:n,...i},a._setSettings(i),a},"PUBLIC").setMultipleInstances(!0)),mn(L_,V_,e),mn(L_,V_,"esm2020")})();var rM="firebase",iM="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mn(rM,iM,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI="firebasestorage.googleapis.com",FI="storageBucket",oM=120*1e3,aM=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends Zn{constructor(e,n,s=0){super(Mh(e),`Firebase Storage: ${n} (${Mh(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,rt.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Mh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var st;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(st||(st={}));function Mh(t){return"storage/"+t}function Ip(){const t="An unknown error occurred, please check the error payload for server response.";return new rt(st.UNKNOWN,t)}function lM(t){return new rt(st.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function cM(t){return new rt(st.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function uM(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new rt(st.UNAUTHENTICATED,t)}function hM(){return new rt(st.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function dM(t){return new rt(st.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function fM(){return new rt(st.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function pM(){return new rt(st.CANCELED,"User canceled the upload/download.")}function gM(t){return new rt(st.INVALID_URL,"Invalid URL '"+t+"'.")}function mM(t){return new rt(st.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function _M(){return new rt(st.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+FI+"' property when initializing the app?")}function yM(){return new rt(st.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function vM(){return new rt(st.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function EM(t){return new rt(st.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Bd(t){return new rt(st.INVALID_ARGUMENT,t)}function UI(){return new rt(st.APP_DELETED,"The Firebase app was deleted.")}function wM(t){return new rt(st.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Xo(t,e){return new rt(st.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function wo(t){throw new rt(st.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=Gt.makeFromUrl(e,n)}catch{return new Gt(e,"")}if(s.path==="")return s;throw mM(e)}static makeFromUrl(e,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function i(B){B.path.charAt(B.path.length-1)==="/"&&(B.path_=B.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+r+o,"i"),c={bucket:1,path:3};function u(B){B.path_=decodeURIComponent(B.path)}const h="v[A-Za-z0-9_]+",d=n.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",m=new RegExp(`^https?://${d}/${h}/b/${r}/o${p}`,"i"),E={bucket:1,path:3},R=n===VI?"(?:storage.googleapis.com|storage.cloud.google.com)":n,P="([^?#]*)",D=new RegExp(`^https?://${R}/${r}/${P}`,"i"),V=[{regex:a,indices:c,postModify:i},{regex:m,indices:E,postModify:u},{regex:D,indices:{bucket:1,path:2},postModify:u}];for(let B=0;B<V.length;B++){const K=V[B],Z=K.regex.exec(e);if(Z){const S=Z[K.indices.bucket];let v=Z[K.indices.path];v||(v=""),s=new Gt(S,v),K.postModify(s);break}}if(s==null)throw gM(e);return s}}class TM{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IM(t,e,n){let s=1,r=null,i=null,o=!1,a=0;function c(){return a===2}let u=!1;function h(...P){u||(u=!0,e.apply(null,P))}function d(P){r=setTimeout(()=>{r=null,t(m,c())},P)}function p(){i&&clearTimeout(i)}function m(P,...D){if(u){p();return}if(P){p(),h.call(null,P,...D);return}if(c()||o){p(),h.call(null,P,...D);return}s<64&&(s*=2);let V;a===1?(a=2,V=0):V=(s+Math.random())*1e3,d(V)}let E=!1;function R(P){E||(E=!0,p(),!u&&(r!==null?(P||(a=2),clearTimeout(r),d(0)):P||(a=1)))}return d(0),i=setTimeout(()=>{o=!0,R(!0)},n),R}function bM(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CM(t){return t!==void 0}function SM(t){return typeof t=="object"&&!Array.isArray(t)}function bp(t){return typeof t=="string"||t instanceof String}function Dy(t){return Cp()&&t instanceof Blob}function Cp(){return typeof Blob<"u"}function $d(t,e,n,s){if(s<e)throw Bd(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw Bd(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(t,e,n){let s=e;return n==null&&(s=`https://${e}`),`${n}://${s}/v0${t}`}function BI(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var Fr;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Fr||(Fr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AM(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||r||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RM{constructor(e,n,s,r,i,o,a,c,u,h,d,p=!0,m=!1){this.url_=e,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=d,this.retry=p,this.isUsingEmulator=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((E,R)=>{this.resolve_=E,this.reject_=R,this.start_()})}start_(){const e=(s,r)=>{if(r){s(!1,new Sl(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===Fr.NO_ERROR,c=i.getStatus();if(!a||AM(c,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===Fr.ABORT;s(!1,new Sl(!1,null,h));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new Sl(u,i))})},n=(s,r)=>{const i=this.resolve_,o=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());CM(c)?i(c):i()}catch(c){o(c)}else if(a!==null){const c=Ip();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(r.canceled){const c=this.appDelete_?UI():pM();o(c)}else{const c=fM();o(c)}};this.canceled_?n(!1,new Sl(!1,null,!0)):this.backoffId_=IM(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&bM(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Sl{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function PM(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function kM(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function NM(t,e){e&&(t["X-Firebase-GMPID"]=e)}function xM(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function DM(t,e,n,s,r,i,o=!0,a=!1){const c=BI(t.urlParams),u=t.url+c,h=Object.assign({},t.headers);return NM(h,e),PM(h,n),kM(h,i),xM(h,s),new RM(u,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OM(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function MM(...t){const e=OM();if(e!==void 0){const n=new e;for(let s=0;s<t.length;s++)n.append(t[s]);return n.getBlob()}else{if(Cp())return new Blob(t);throw new rt(st.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function LM(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VM(t){if(typeof atob>"u")throw EM("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Lh{constructor(e,n){this.data=e,this.contentType=n||null}}function $I(t,e){switch(t){case bn.RAW:return new Lh(jI(e));case bn.BASE64:case bn.BASE64URL:return new Lh(qI(t,e));case bn.DATA_URL:return new Lh(UM(e),BM(e))}throw Ip()}function jI(t){const e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=s,o=t.charCodeAt(++n);s=65536|(i&1023)<<10|o&1023,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(e)}function FM(t){let e;try{e=decodeURIComponent(t)}catch{throw Xo(bn.DATA_URL,"Malformed data URL.")}return jI(e)}function qI(t,e){switch(t){case bn.BASE64:{const r=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(r||i)throw Xo(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case bn.BASE64URL:{const r=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(r||i)throw Xo(t,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=VM(e)}catch(r){throw r.message.includes("polyfill")?r:Xo(t,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class HI{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Xo(bn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=$M(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=e.substring(e.indexOf(",")+1)}}function UM(t){const e=new HI(t);return e.base64?qI(bn.BASE64,e.rest):FM(e.rest)}function BM(t){return new HI(t).contentType}function $M(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e,n){let s=0,r="";Dy(e)?(this.data_=e,s=e.size,r=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),s=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),s=e.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,n){if(Dy(this.data_)){const s=this.data_,r=LM(s,e,n);return r===null?null:new js(r)}else{const s=new Uint8Array(this.data_.buffer,e,n-e);return new js(s,!0)}}static getBlob(...e){if(Cp()){const n=e.map(s=>s instanceof js?s.data_:s);return new js(MM.apply(null,n))}else{const n=e.map(o=>bp(o)?$I(bn.RAW,o).data:o.data_);let s=0;n.forEach(o=>{s+=o.byteLength});const r=new Uint8Array(s);let i=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)r[i++]=o[a]}),new js(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(t){let e;try{e=JSON.parse(t)}catch{return null}return SM(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jM(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function qM(t,e){const n=e.split("/").filter(s=>s.length>0).join("/");return t.length===0?n:t+"/"+n}function WI(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HM(t,e){return e}class $t{constructor(e,n,s,r){this.server=e,this.local=n||e,this.writable=!!s,this.xform=r||HM}}let Al=null;function WM(t){return!bp(t)||t.length<2?t:WI(t)}function zI(){if(Al)return Al;const t=[];t.push(new $t("bucket")),t.push(new $t("generation")),t.push(new $t("metageneration")),t.push(new $t("name","fullPath",!0));function e(i,o){return WM(o)}const n=new $t("name");n.xform=e,t.push(n);function s(i,o){return o!==void 0?Number(o):o}const r=new $t("size");return r.xform=s,t.push(r),t.push(new $t("timeCreated")),t.push(new $t("updated")),t.push(new $t("md5Hash",null,!0)),t.push(new $t("cacheControl",null,!0)),t.push(new $t("contentDisposition",null,!0)),t.push(new $t("contentEncoding",null,!0)),t.push(new $t("contentLanguage",null,!0)),t.push(new $t("contentType",null,!0)),t.push(new $t("metadata","customMetadata",!0)),Al=t,Al}function zM(t,e){function n(){const s=t.bucket,r=t.fullPath,i=new Gt(s,r);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function GM(t,e,n){const s={};s.type="file";const r=n.length;for(let i=0;i<r;i++){const o=n[i];s[o.local]=o.xform(s,e[o.server])}return zM(s,t),s}function GI(t,e,n){const s=Sp(e);return s===null?null:GM(t,s,n)}function KM(t,e,n,s){const r=Sp(e);if(r===null||!bp(r.downloadTokens))return null;const i=r.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(u=>{const h=t.bucket,d=t.fullPath,p="/b/"+o(h)+"/o/"+o(d),m=za(p,n,s),E=BI({alt:"media",token:u});return m+E})[0]}function QM(t,e){const n={},s=e.length;for(let r=0;r<s;r++){const i=e[r];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy="prefixes",My="items";function YM(t,e,n){const s={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[Oy])for(const r of n[Oy]){const i=r.replace(/\/$/,""),o=t._makeStorageReference(new Gt(e,i));s.prefixes.push(o)}if(n[My])for(const r of n[My]){const i=t._makeStorageReference(new Gt(e,r.name));s.items.push(i)}return s}function XM(t,e,n){const s=Sp(n);return s===null?null:YM(t,e,s)}class xu{constructor(e,n,s,r){this.url=e,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(t){if(!t)throw Ip()}function JM(t,e){function n(s,r){const i=GI(t,r,e);return Ap(i!==null),i}return n}function ZM(t,e){function n(s,r){const i=XM(t,e,r);return Ap(i!==null),i}return n}function eL(t,e){function n(s,r){const i=GI(t,r,e);return Ap(i!==null),KM(i,r,t.host,t._protocol)}return n}function Rp(t){function e(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=hM():r=uM():n.getStatus()===402?r=cM(t.bucket):n.getStatus()===403?r=dM(t.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return e}function KI(t){const e=Rp(t);function n(s,r){let i=e(s,r);return s.getStatus()===404&&(i=lM(t.path)),i.serverResponse=r.serverResponse,i}return n}function tL(t,e,n,s,r){const i={};e.isRoot?i.prefix="":i.prefix=e.path+"/",n.length>0&&(i.delimiter=n),s&&(i.pageToken=s),r&&(i.maxResults=r);const o=e.bucketOnlyServerUrl(),a=za(o,t.host,t._protocol),c="GET",u=t.maxOperationRetryTime,h=new xu(a,c,ZM(t,e.bucket),u);return h.urlParams=i,h.errorHandler=Rp(e),h}function nL(t,e,n){const s=e.fullServerUrl(),r=za(s,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,a=new xu(r,i,eL(t,n),o);return a.errorHandler=KI(e),a}function sL(t,e){const n=e.fullServerUrl(),s=za(n,t.host,t._protocol),r="DELETE",i=t.maxOperationRetryTime;function o(c,u){}const a=new xu(s,r,o,i);return a.successCodes=[200,204],a.errorHandler=KI(e),a}function rL(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function iL(t,e,n){const s=Object.assign({},n);return s.fullPath=t.path,s.size=e.size(),s.contentType||(s.contentType=rL(null,e)),s}function oL(t,e,n,s,r){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let V="";for(let B=0;B<2;B++)V=V+Math.random().toString().slice(2);return V}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const u=iL(e,s,r),h=QM(u,n),d="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,p=`\r
--`+c+"--",m=js.getBlob(d,s,p);if(m===null)throw yM();const E={name:u.fullPath},R=za(i,t.host,t._protocol),P="POST",D=t.maxUploadRetryTime,O=new xu(R,P,JM(t,n),D);return O.urlParams=E,O.headers=o,O.body=m.uploadData(),O.errorHandler=Rp(e),O}class aL{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Fr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Fr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Fr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,s,r,i){if(this.sent_)throw wo("cannot .send() more than once");if(Jn(e)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw wo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw wo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw wo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw wo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class lL extends aL{initXhr(){this.xhr_.responseType="text"}}function Du(){return new lL}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,n){this._service=e,n instanceof Gt?this._location=n:this._location=Gt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new zr(e,n)}get root(){const e=new Gt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return WI(this._location.path)}get storage(){return this._service}get parent(){const e=jM(this._location.path);if(e===null)return null;const n=new Gt(this._location.bucket,e);return new zr(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw wM(e)}}function cL(t,e,n){t._throwIfRoot("uploadBytes");const s=oL(t.storage,t._location,zI(),new js(e,!0),n);return t.storage.makeRequestWithTokens(s,Du).then(r=>({metadata:r,ref:t}))}function uL(t,e,n=bn.RAW,s){t._throwIfRoot("uploadString");const r=$I(n,e),i={...s};return i.contentType==null&&r.contentType!=null&&(i.contentType=r.contentType),cL(t,r.data,i)}function hL(t){const e={prefixes:[],items:[]};return QI(t,e).then(()=>e)}async function QI(t,e,n){const r=await dL(t,{pageToken:n});e.prefixes.push(...r.prefixes),e.items.push(...r.items),r.nextPageToken!=null&&await QI(t,e,r.nextPageToken)}function dL(t,e){e!=null&&typeof e.maxResults=="number"&&$d("options.maxResults",1,1e3,e.maxResults);const n=e||{},s=tL(t.storage,t._location,"/",n.pageToken,n.maxResults);return t.storage.makeRequestWithTokens(s,Du)}function fL(t){t._throwIfRoot("getDownloadURL");const e=nL(t.storage,t._location,zI());return t.storage.makeRequestWithTokens(e,Du).then(n=>{if(n===null)throw vM();return n})}function pL(t){t._throwIfRoot("deleteObject");const e=sL(t.storage,t._location);return t.storage.makeRequestWithTokens(e,Du)}function gL(t,e){const n=qM(t._location.path,e),s=new Gt(t._location.bucket,n);return new zr(t.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mL(t){return/^[A-Za-z]+:\/\//.test(t)}function _L(t,e){return new zr(t,e)}function YI(t,e){if(t instanceof Pp){const n=t;if(n._bucket==null)throw _M();const s=new zr(n,n._bucket);return e!=null?YI(s,e):s}else return e!==void 0?gL(t,e):t}function yL(t,e){if(e&&mL(e)){if(t instanceof Pp)return _L(t,e);throw Bd("To use ref(service, url), the first argument must be a Storage instance.")}else return YI(t,e)}function Ly(t,e){const n=e?.[FI];return n==null?null:Gt.makeFromBucketSpec(n,t)}function vL(t,e,n,s={}){t.host=`${e}:${n}`;const r=Jn(e);r&&(ou(`https://${t.host}/b`),au("Storage",!0)),t._isUsingEmulator=!0,t._protocol=r?"https":"http";const{mockUserToken:i}=s;i&&(t._overrideAuthToken=typeof i=="string"?i:kf(i,t.app.options.projectId))}class Pp{constructor(e,n,s,r,i,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=VI,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=oM,this._maxUploadRetryTime=aM,this._requests=new Set,r!=null?this._bucket=Gt.makeFromBucketSpec(r,this._host):this._bucket=Ly(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Gt.makeFromBucketSpec(this._url,e):this._bucket=Ly(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){$d("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){$d("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(sn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new zr(this,e)}_makeRequest(e,n,s,r,i=!0){if(this._deleted)return new TM(UI());{const o=DM(e,this._appId,s,r,n,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,r).getPromise()}}const Vy="@firebase/storage",Fy="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI="storage";function n4(t,e,n,s){return t=Fe(t),uL(t,e,n,s)}function s4(t){return t=Fe(t),hL(t)}function r4(t){return t=Fe(t),fL(t)}function i4(t){return t=Fe(t),pL(t)}function o4(t,e){return t=Fe(t),yL(t,e)}function EL(t=uu(),e){t=Fe(t);const s=Va(t,XI).getImmediate({identifier:e}),r=Pf("storage");return r&&wL(s,...r),s}function wL(t,e,n,s={}){vL(t,e,n,s)}function TL(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new Pp(n,s,r,e,fr)}function IL(){nr(new gs(XI,TL,"PUBLIC").setMultipleInstances(!0)),mn(Vy,Fy,""),mn(Vy,Fy,"esm2020")}IL();var Uy={};const By="@firebase/database",$y="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let JI="";function bL(t){JI=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CL{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ht(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:fa(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SL{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ts(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new CL(e)}}catch{}return new SL},kr=ZI("localStorage"),AL=ZI("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=new cu("@firebase/database"),RL=function(){let t=1;return function(){return t++}}(),eb=function(t){const e=VP(t),n=new DP;n.update(e);const s=n.digest();return Rf.encodeByteArray(s)},Ga=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ga.apply(null,s):typeof s=="object"?e+=ht(s):e+=s,e+=" "}return e};let Jo=null,jy=!0;const PL=function(t,e){W(!0,"Can't turn on custom loggers persistently."),Pi.logLevel=Te.VERBOSE,Jo=Pi.log.bind(Pi)},Vt=function(...t){if(jy===!0&&(jy=!1,Jo===null&&AL.get("logging_enabled")===!0&&PL()),Jo){const e=Ga.apply(null,t);Jo(e)}},Ka=function(t){return function(...e){Vt(t,...e)}},jd=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ga(...t);Pi.error(e)},Es=function(...t){const e=`FIREBASE FATAL ERROR: ${Ga(...t)}`;throw Pi.error(e),new Error(e)},Zt=function(...t){const e="FIREBASE WARNING: "+Ga(...t);Pi.warn(e)},kL=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Zt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},tb=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},NL=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ji="[MIN_NAME]",Gr="[MAX_NAME]",Zi=function(t,e){if(t===e)return 0;if(t===ji||e===Gr)return-1;if(e===ji||t===Gr)return 1;{const n=qy(t),s=qy(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},xL=function(t,e){return t===e?0:t<e?-1:1},To=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ht(e))},kp=function(t){if(typeof t!="object"||t===null)return ht(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ht(e[s]),n+=":",n+=kp(t[e[s]]);return n+="}",n},nb=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function en(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const sb=function(t){W(!tb(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const u=[];for(c=n;c;c-=1)u.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)u.push(i%2?1:0),i=Math.floor(i/2);u.push(r?1:0),u.reverse();const h=u.join("");let d="";for(c=0;c<64;c+=8){let p=parseInt(h.substr(c,8),2).toString(16);p.length===1&&(p="0"+p),d=d+p}return d.toLowerCase()},DL=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},OL=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ML(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const LL=new RegExp("^-?(0*)\\d{1,10}$"),VL=-2147483648,FL=2147483647,qy=function(t){if(LL.test(t)){const e=Number(t);if(e>=VL&&e<=FL)return e}return null},eo=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Zt("Exception was thrown by user callback.",n),e},Math.floor(0))}},UL=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Zo=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BL{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,sn(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Zt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $L{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Vt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Zt(e)}}class Wl{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Wl.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np="5",rb="v",ib="s",ob="r",ab="f",lb=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,cb="ls",ub="p",qd="ac",hb="websocket",db="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fb{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,u=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=kr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&kr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function jL(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function pb(t,e,n){W(typeof e=="string","typeof type must == string"),W(typeof n=="object","typeof params must == object");let s;if(e===hb)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===db)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);jL(t)&&(n.ns=t.namespace);const r=[];return en(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qL{constructor(){this.counters_={}}incrementCounter(e,n=1){Ts(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return dP(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh={},Fh={};function xp(t){const e=t.toString();return Vh[e]||(Vh[e]=new qL),Vh[e]}function HL(t,e){const n=t.toString();return Fh[n]||(Fh[n]=e()),Fh[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WL{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&eo(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy="start",zL="close",GL="pLPCommand",KL="pRTLPCB",gb="id",mb="pw",_b="ser",QL="cb",YL="seg",XL="ts",JL="d",ZL="dframe",yb=1870,vb=30,eV=yb-vb,tV=25e3,nV=3e4;class vi{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ka(e),this.stats_=xp(n),this.urlFn=c=>(this.appCheckToken&&(c[qd]=this.appCheckToken),pb(n,db,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new WL(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(nV)),NL(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Dp((...i)=>{const[o,a,c,u,h]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Hy)this.id=a,this.password=c;else if(o===zL)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Hy]="t",s[_b]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[QL]=this.scriptTagHolder.uniqueCallbackIdentifier),s[rb]=Np,this.transportSessionId&&(s[ib]=this.transportSessionId),this.lastSessionId&&(s[cb]=this.lastSessionId),this.applicationId&&(s[ub]=this.applicationId),this.appCheckToken&&(s[qd]=this.appCheckToken),typeof location<"u"&&location.hostname&&lb.test(location.hostname)&&(s[ob]=ab);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){vi.forceAllow_=!0}static forceDisallow(){vi.forceDisallow_=!0}static isAvailable(){return vi.forceAllow_?!0:!vi.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!DL()&&!OL()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ht(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=yw(n),r=nb(s,eV);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[ZL]="t",s[gb]=e,s[mb]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ht(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Dp{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=RL(),window[GL+this.uniqueCallbackIdentifier]=e,window[KL+this.uniqueCallbackIdentifier]=n,this.myIFrame=Dp.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Vt("frame writing exception"),a.stack&&Vt(a.stack),Vt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Vt("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[gb]=this.myID,e[mb]=this.myPW,e[_b]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+vb+s.length<=yb;){const o=this.pendingSegs.shift();s=s+"&"+YL+r+"="+o.seg+"&"+XL+r+"="+o.ts+"&"+JL+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(tV)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Vt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sV=16384,rV=45e3;let Ac=null;typeof MozWebSocket<"u"?Ac=MozWebSocket:typeof WebSocket<"u"&&(Ac=WebSocket);class Tn{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ka(this.connId),this.stats_=xp(n),this.connURL=Tn.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[rb]=Np,typeof location<"u"&&location.hostname&&lb.test(location.hostname)&&(o[ob]=ab),n&&(o[ib]=n),s&&(o[cb]=s),r&&(o[qd]=r),i&&(o[ub]=i),pb(e,hb,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,kr.set("previous_websocket_failure",!0);try{let s;bP(),this.mySock=new Ac(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){Tn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Ac!==null&&!Tn.forceDisallow_}static previouslyFailed(){return kr.isInMemoryStorage||kr.get("previous_websocket_failure")===!0}markConnectionHealthy(){kr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=fa(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(W(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ht(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=nb(n,sV);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(rV))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Tn.responsesRequiredToBeHealthy=2;Tn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{static get ALL_TRANSPORTS(){return[vi,Tn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Tn&&Tn.isAvailable();let s=n&&!Tn.previouslyFailed();if(e.webSocketOnly&&(n||Zt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Tn];else{const r=this.transports_=[];for(const i of ba.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);ba.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ba.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iV=6e4,oV=5e3,aV=10*1024,lV=100*1024,Uh="t",Wy="d",cV="s",zy="r",uV="e",Gy="o",Ky="a",Qy="n",Yy="p",hV="h";class dV{constructor(e,n,s,r,i,o,a,c,u,h){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=u,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ka("c:"+this.id+":"),this.transportManager_=new ba(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Zo(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>lV?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>aV?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Uh in e){const n=e[Uh];n===Ky?this.upgradeIfSecondaryHealthy_():n===zy?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Gy&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=To("t",e),s=To("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Yy,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ky,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Qy,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=To("t",e),s=To("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=To(Uh,e);if(Wy in e){const s=e[Wy];if(n===hV){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Qy){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===cV?this.onConnectionShutdown_(s):n===zy?this.onReset_(s):n===uV?jd("Server Error: "+s):n===Gy?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):jd("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Np!==s&&Zt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Zo(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(iV))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Zo(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(oV))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Yy,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(kr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eb{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e){this.allowedEvents_=e,this.listeners_={},W(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){W(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc extends wb{static getInstance(){return new Rc}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Nf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return W(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy=32,Jy=768;class $e{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function De(){return new $e("")}function Ee(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function cr(t){return t.pieces_.length-t.pieceNum_}function qe(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new $e(t.pieces_,e)}function Tb(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function fV(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ib(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function bb(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new $e(e,0)}function ft(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof $e)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new $e(n,0)}function Ie(t){return t.pieceNum_>=t.pieces_.length}function Kt(t,e){const n=Ee(t),s=Ee(e);if(n===null)return e;if(n===s)return Kt(qe(t),qe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Op(t,e){if(cr(t)!==cr(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Cn(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(cr(t)>cr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class pV{constructor(e,n){this.errorPrefix_=n,this.parts_=Ib(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=lu(this.parts_[s]);Cb(this)}}function gV(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=lu(e),Cb(t)}function mV(t){const e=t.parts_.pop();t.byteLength_-=lu(e),t.parts_.length>0&&(t.byteLength_-=1)}function Cb(t){if(t.byteLength_>Jy)throw new Error(t.errorPrefix_+"has a key path longer than "+Jy+" bytes ("+t.byteLength_+").");if(t.parts_.length>Xy)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Xy+") or object contains a cycle "+Sr(t))}function Sr(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp extends wb{static getInstance(){return new Mp}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return W(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io=1e3,_V=300*1e3,Zy=30*1e3,yV=1.3,vV=3e4,EV="server_kill",ev=3;class ds extends Eb{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=ds.nextPersistentConnectionId_++,this.log_=Ka("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Io,this.maxReconnectDelay_=_V,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Mp.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Rc.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(ht(i)),W(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new iu,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),W(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),W(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,u=a.s;ds.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),u!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(u,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ts(e,"w")){const s=Oi(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();Zt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||xP(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Zy)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=NP(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),W(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ht(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):jd("Unrecognized action received from server: "+ht(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){W(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Io,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Io,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>vV&&(this.reconnectDelay_=Io),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*yV)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+ds.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},u=function(d){W(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:u};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Vt("getToken() completed but was canceled"):(Vt("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,a=new dV(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,m=>{Zt(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(EV)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Zt(d),c())}}}interrupt(e){Vt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Vt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],dd(this.interruptReasons_)&&(this.reconnectDelay_=Io,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>kp(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new $e(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){Vt("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ev&&(this.reconnectDelay_=Zy,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Vt("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ev&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+JI.replace(/\./g,"-")]=1,Nf()?e["framework.cordova"]=1:Iw()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Rc.getInstance().currentlyOnline();return dd(this.interruptReasons_)&&e}}ds.nextPersistentConnectionId_=0;ds.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new we(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new we(ji,e),r=new we(ji,n);return this.compare(s,r)!==0}minPost(){return we.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rl;class Sb extends Ou{static get __EMPTY_NODE(){return Rl}static set __EMPTY_NODE(e){Rl=e}compare(e,n){return Zi(e.name,n.name)}isDefinedOn(e){throw zi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return we.MIN}maxPost(){return new we(Gr,Rl)}makePost(e,n){return W(typeof e=="string","KeyIndex indexValue must always be a string."),new we(e,Rl)}toString(){return".key"}}const ki=new Sb;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class yt{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??yt.RED,this.left=r??Jt.EMPTY_NODE,this.right=i??Jt.EMPTY_NODE}copy(e,n,s,r,i){return new yt(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Jt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Jt.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}yt.RED=!0;yt.BLACK=!1;class wV{copy(e,n,s,r,i){return this}insert(e,n,s){return new yt(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Jt{constructor(e,n=Jt.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Jt(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,yt.BLACK,null,null))}remove(e){return new Jt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,yt.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Pl(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Pl(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Pl(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Pl(this.root_,null,this.comparator_,!0,e)}}Jt.EMPTY_NODE=new wV;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TV(t,e){return Zi(t.name,e.name)}function Lp(t,e){return Zi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hd;function IV(t){Hd=t}const Ab=function(t){return typeof t=="number"?"number:"+sb(t):"string:"+t},Rb=function(t){if(t.isLeafNode()){const e=t.val();W(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ts(e,".sv"),"Priority must be a string or number.")}else W(t===Hd||t.isEmpty(),"priority of unexpected type.");W(t===Hd||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tv;class mt{static set __childrenNodeConstructor(e){tv=e}static get __childrenNodeConstructor(){return tv}constructor(e,n=mt.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,W(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Rb(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new mt(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:mt.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Ie(e)?this:Ee(e)===".priority"?this.priorityNode_:mt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:mt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=Ee(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(W(s!==".priority"||cr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,mt.__childrenNodeConstructor.EMPTY_NODE.updateChild(qe(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ab(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=sb(this.value_):e+=this.value_,this.lazyHash_=eb(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===mt.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof mt.__childrenNodeConstructor?-1:(W(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=mt.VALUE_TYPE_ORDER.indexOf(n),i=mt.VALUE_TYPE_ORDER.indexOf(s);return W(r>=0,"Unknown leaf type: "+n),W(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}mt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pb,kb;function bV(t){Pb=t}function CV(t){kb=t}class SV extends Ou{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?Zi(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return we.MIN}maxPost(){return new we(Gr,new mt("[PRIORITY-POST]",kb))}makePost(e,n){const s=Pb(e);return new we(n,new mt("[PRIORITY-POST]",s))}toString(){return".priority"}}const tt=new SV;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AV=Math.log(2);class RV{constructor(e){const n=i=>parseInt(Math.log(i)/AV,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Pc=function(t,e,n,s){t.sort(e);const r=function(c,u){const h=u-c;let d,p;if(h===0)return null;if(h===1)return d=t[c],p=n?n(d):d,new yt(p,d.node,yt.BLACK,null,null);{const m=parseInt(h/2,10)+c,E=r(c,m),R=r(m+1,u);return d=t[m],p=n?n(d):d,new yt(p,d.node,yt.BLACK,E,R)}},i=function(c){let u=null,h=null,d=t.length;const p=function(E,R){const P=d-E,D=d;d-=E;const O=r(P+1,D),V=t[P],B=n?n(V):V;m(new yt(B,V.node,R,null,O))},m=function(E){u?(u.left=E,u=E):(h=E,u=E)};for(let E=0;E<c.count;++E){const R=c.nextBitIsOne(),P=Math.pow(2,c.count-(E+1));R?p(P,yt.BLACK):(p(P,yt.BLACK),p(P,yt.RED))}return h},o=new RV(t.length),a=i(o);return new Jt(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bh;const li={};class hs{static get Default(){return W(li&&tt,"ChildrenNode.ts has not been loaded"),Bh=Bh||new hs({".priority":li},{".priority":tt}),Bh}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Oi(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Jt?n:null}hasIndex(e){return Ts(this.indexSet_,e.toString())}addIndex(e,n){W(e!==ki,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(we.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Pc(s,e.getCompare()):a=li;const c=e.toString(),u={...this.indexSet_};u[c]=e;const h={...this.indexes_};return h[c]=a,new hs(h,u)}addToIndexes(e,n){const s=lc(this.indexes_,(r,i)=>{const o=Oi(this.indexSet_,i);if(W(o,"Missing index implementation for "+i),r===li)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(we.Wrap);let u=c.getNext();for(;u;)u.name!==e.name&&a.push(u),u=c.getNext();return a.push(e),Pc(a,o.getCompare())}else return li;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new we(e.name,a))),c.insert(e,e.node)}});return new hs(s,this.indexSet_)}removeFromIndexes(e,n){const s=lc(this.indexes_,r=>{if(r===li)return r;{const i=n.get(e.name);return i?r.remove(new we(e.name,i)):r}});return new hs(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bo;class ce{static get EMPTY_NODE(){return bo||(bo=new ce(new Jt(Lp),null,hs.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Rb(this.priorityNode_),this.children_.isEmpty()&&W(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bo}updatePriority(e){return this.children_.isEmpty()?this:new ce(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?bo:n}}getChild(e){const n=Ee(e);return n===null?this:this.getImmediateChild(n).getChild(qe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(W(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new we(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?bo:this.priorityNode_;return new ce(r,o,i)}}updateChild(e,n){const s=Ee(e);if(s===null)return n;{W(Ee(e)!==".priority"||cr(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(qe(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(tt,(o,a)=>{n[o]=a.val(e),s++,i&&ce.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ab(this.getPriority().val())+":"),this.forEachChild(tt,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":eb(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new we(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new we(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new we(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,we.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,we.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qa?-1:0}withIndex(e){if(e===ki||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new ce(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ki||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(tt),r=n.getIterator(tt);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ki?null:this.indexMap_.get(e.toString())}}ce.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class PV extends ce{constructor(){super(new Jt(Lp),ce.EMPTY_NODE,hs.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return ce.EMPTY_NODE}isEmpty(){return!1}}const Qa=new PV;Object.defineProperties(we,{MIN:{value:new we(ji,ce.EMPTY_NODE)},MAX:{value:new we(Gr,Qa)}});Sb.__EMPTY_NODE=ce.EMPTY_NODE;mt.__childrenNodeConstructor=ce;IV(Qa);CV(Qa);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kV=!0;function vt(t,e=null){if(t===null)return ce.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),W(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new mt(n,vt(e))}if(!(t instanceof Array)&&kV){const n=[];let s=!1;if(en(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=vt(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new we(o,c)))}}),n.length===0)return ce.EMPTY_NODE;const i=Pc(n,TV,o=>o.name,Lp);if(s){const o=Pc(n,tt.getCompare());return new ce(i,vt(e),new hs({".priority":o},{".priority":tt}))}else return new ce(i,vt(e),hs.Default)}else{let n=ce.EMPTY_NODE;return en(t,(s,r)=>{if(Ts(t,s)&&s.substring(0,1)!=="."){const i=vt(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(vt(e))}}bV(vt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NV extends Ou{constructor(e){super(),this.indexPath_=e,W(!Ie(e)&&Ee(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?Zi(e.name,n.name):i}makePost(e,n){const s=vt(e),r=ce.EMPTY_NODE.updateChild(this.indexPath_,s);return new we(n,r)}maxPost(){const e=ce.EMPTY_NODE.updateChild(this.indexPath_,Qa);return new we(Gr,e)}toString(){return Ib(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xV extends Ou{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Zi(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return we.MIN}maxPost(){return we.MAX}makePost(e,n){const s=vt(e);return new we(n,s)}toString(){return".value"}}const DV=new xV;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nb(t){return{type:"value",snapshotNode:t}}function qi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ca(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Sa(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function OV(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){W(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Ca(n,a)):W(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(qi(n,s)):o.trackChildChange(Sa(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(tt,(r,i)=>{n.hasChild(r)||s.trackChildChange(Ca(r,i))}),n.isLeafNode()||n.forEachChild(tt,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(Sa(r,i,o))}else s.trackChildChange(qi(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?ce.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e){this.indexedFilter_=new Vp(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Aa.getStartPost_(e),this.endPost_=Aa.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new we(n,s))||(s=ce.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=ce.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(ce.EMPTY_NODE);const i=this;return n.forEachChild(tt,(o,a)=>{i.matches(new we(o,a))||(r=r.updateImmediateChild(o,ce.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MV{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Aa(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new we(n,s))||(s=ce.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=ce.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=ce.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(ce.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,ce.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(p,m)=>d(m,p)}else o=this.index_.getCompare();const a=e;W(a.numChildren()===this.limit_,"");const c=new we(n,s),u=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let p=r.getChildAfterChild(this.index_,u,this.reverse_);for(;p!=null&&(p.name===n||a.hasChild(p.name));)p=r.getChildAfterChild(this.index_,p,this.reverse_);const m=p==null?1:o(p,c);if(h&&!s.isEmpty()&&m>=0)return i?.trackChildChange(Sa(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(Ca(n,d));const R=a.updateImmediateChild(n,ce.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(i?.trackChildChange(qi(p.name,p.node)),R.updateImmediateChild(p.name,p.node)):R}}else return s.isEmpty()?e:h&&o(u,c)>=0?(i!=null&&(i.trackChildChange(Ca(u.name,u.node)),i.trackChildChange(qi(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(u.name,ce.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=tt}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return W(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return W(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ji}hasEnd(){return this.endSet_}getIndexEndValue(){return W(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return W(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Gr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return W(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===tt}copy(){const e=new Fp;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function LV(t){return t.loadsAllData()?new Vp(t.getIndex()):t.hasLimit()?new MV(t):new Aa(t)}function nv(t){const e={};if(t.isDefault())return e;let n;if(t.index_===tt?n="$priority":t.index_===DV?n="$value":t.index_===ki?n="$key":(W(t.index_ instanceof NV,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ht(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ht(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ht(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ht(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ht(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function sv(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==tt&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc extends Eb{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(W(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=Ka("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=kc.getListenId_(e,s),a={};this.listens_[o]=a;const c=nv(e._queryParams);this.restRequest_(i+".json",c,(u,h)=>{let d=h;if(u===404&&(d=null,u=null),u===null&&this.onDataUpdate_(i,d,!1,s),Oi(this.listens_,o)===a){let p;u?u===401?p="permission_denied":p="rest_error:"+u:p="ok",r(p,null)}})}unlisten(e,n){const s=kc.getListenId_(e,n);delete this.listens_[s]}get(e){const n=nv(e._queryParams),s=e._path.toString(),r=new iu;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Gi(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=fa(a.responseText)}catch{Zt("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&Zt("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VV{constructor(){this.rootNode_=ce.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nc(){return{value:null,children:new Map}}function xb(t,e,n){if(Ie(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=Ee(e);t.children.has(s)||t.children.set(s,Nc());const r=t.children.get(s);e=qe(e),xb(r,e,n)}}function Wd(t,e,n){t.value!==null?n(e,t.value):FV(t,(s,r)=>{const i=new $e(e.toString()+"/"+s);Wd(r,i,n)})}function FV(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UV{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&en(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=10*1e3,BV=30*1e3,$V=300*1e3;class jV{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new UV(e);const s=rv+(BV-rv)*Math.random();Zo(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;en(e,(r,i)=>{i>0&&Ts(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),Zo(this.reportStats_.bind(this),Math.floor(Math.random()*2*$V))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sn;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Sn||(Sn={}));function Db(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Up(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Bp(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Sn.ACK_USER_WRITE,this.source=Db()}operationForChild(e){if(Ie(this.path)){if(this.affectedTree.value!=null)return W(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new $e(e));return new xc(De(),n,this.revert)}}else return W(Ee(this.path)===e,"operationForChild called for unrelated child."),new xc(qe(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n){this.source=e,this.path=n,this.type=Sn.LISTEN_COMPLETE}operationForChild(e){return Ie(this.path)?new Ra(this.source,De()):new Ra(this.source,qe(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Sn.OVERWRITE}operationForChild(e){return Ie(this.path)?new Kr(this.source,De(),this.snap.getImmediateChild(e)):new Kr(this.source,qe(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Sn.MERGE}operationForChild(e){if(Ie(this.path)){const n=this.children.subtree(new $e(e));return n.isEmpty()?null:n.value?new Kr(this.source,De(),n.value):new Pa(this.source,De(),n)}else return W(Ee(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Pa(this.source,qe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Ie(e))return this.isFullyInitialized()&&!this.filtered_;const n=Ee(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qV{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function HV(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(OV(o.childName,o.snapshotNode))}),Co(t,r,"child_removed",e,s,n),Co(t,r,"child_added",e,s,n),Co(t,r,"child_moved",i,s,n),Co(t,r,"child_changed",e,s,n),Co(t,r,"value",e,s,n),r}function Co(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>zV(t,a,c)),o.forEach(a=>{const c=WV(t,a,i);r.forEach(u=>{u.respondsTo(a.type)&&e.push(u.createEvent(c,t.query_))})})}function WV(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function zV(t,e,n){if(e.childName==null||n.childName==null)throw zi("Should only compare child_ events.");const s=new we(e.childName,e.snapshotNode),r=new we(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(t,e){return{eventCache:t,serverCache:e}}function ea(t,e,n,s){return Mu(new ur(e,n,s),t.serverCache)}function Ob(t,e,n,s){return Mu(t.eventCache,new ur(e,n,s))}function Dc(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Qr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $h;const GV=()=>($h||($h=new Jt(xL)),$h);class ze{static fromObject(e){let n=new ze(null);return en(e,(s,r)=>{n=n.set(new $e(s),r)}),n}constructor(e,n=GV()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:De(),value:this.value};if(Ie(e))return null;{const s=Ee(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(qe(e),n);return i!=null?{path:ft(new $e(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Ie(e))return this;{const n=Ee(e),s=this.children.get(n);return s!==null?s.subtree(qe(e)):new ze(null)}}set(e,n){if(Ie(e))return new ze(n,this.children);{const s=Ee(e),i=(this.children.get(s)||new ze(null)).set(qe(e),n),o=this.children.insert(s,i);return new ze(this.value,o)}}remove(e){if(Ie(e))return this.children.isEmpty()?new ze(null):new ze(null,this.children);{const n=Ee(e),s=this.children.get(n);if(s){const r=s.remove(qe(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new ze(null):new ze(this.value,i)}else return this}}get(e){if(Ie(e))return this.value;{const n=Ee(e),s=this.children.get(n);return s?s.get(qe(e)):null}}setTree(e,n){if(Ie(e))return n;{const s=Ee(e),i=(this.children.get(s)||new ze(null)).setTree(qe(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new ze(this.value,o)}}fold(e){return this.fold_(De(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(ft(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,De(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(Ie(e))return null;{const i=Ee(e),o=this.children.get(i);return o?o.findOnPath_(qe(e),ft(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,De(),n)}foreachOnPath_(e,n,s){if(Ie(e))return this;{this.value&&s(n,this.value);const r=Ee(e),i=this.children.get(r);return i?i.foreachOnPath_(qe(e),ft(n,r),s):new ze(null)}}foreach(e){this.foreach_(De(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(ft(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.writeTree_=e}static empty(){return new Nn(new ze(null))}}function ta(t,e,n){if(Ie(e))return new Nn(new ze(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=Kt(r,e);return i=i.updateChild(o,n),new Nn(t.writeTree_.set(r,i))}else{const r=new ze(n),i=t.writeTree_.setTree(e,r);return new Nn(i)}}}function iv(t,e,n){let s=t;return en(n,(r,i)=>{s=ta(s,ft(e,r),i)}),s}function ov(t,e){if(Ie(e))return Nn.empty();{const n=t.writeTree_.setTree(e,new ze(null));return new Nn(n)}}function zd(t,e){return ei(t,e)!=null}function ei(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Kt(n.path,e)):null}function av(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(tt,(s,r)=>{e.push(new we(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new we(s,r.value))}),e}function Ys(t,e){if(Ie(e))return t;{const n=ei(t,e);return n!=null?new Nn(new ze(n)):new Nn(t.writeTree_.subtree(e))}}function Gd(t){return t.writeTree_.isEmpty()}function Hi(t,e){return Mb(De(),t.writeTree_,e)}function Mb(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(W(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=Mb(ft(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(ft(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(t,e){return Ub(e,t)}function KV(t,e,n,s,r){W(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=ta(t.visibleWrites,e,n)),t.lastWriteId=s}function QV(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function YV(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);W(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&XV(a,s.path)?r=!1:Cn(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return JV(t),!0;if(s.snap)t.visibleWrites=ov(t.visibleWrites,s.path);else{const a=s.children;en(a,c=>{t.visibleWrites=ov(t.visibleWrites,ft(s.path,c))})}return!0}else return!1}function XV(t,e){if(t.snap)return Cn(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Cn(ft(t.path,n),e))return!0;return!1}function JV(t){t.visibleWrites=Lb(t.allWrites,ZV,De()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function ZV(t){return t.visible}function Lb(t,e,n){let s=Nn.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Cn(n,o)?(a=Kt(n,o),s=ta(s,a,i.snap)):Cn(o,n)&&(a=Kt(o,n),s=ta(s,De(),i.snap.getChild(a)));else if(i.children){if(Cn(n,o))a=Kt(n,o),s=iv(s,a,i.children);else if(Cn(o,n))if(a=Kt(o,n),Ie(a))s=iv(s,De(),i.children);else{const c=Oi(i.children,Ee(a));if(c){const u=c.getChild(qe(a));s=ta(s,De(),u)}}}else throw zi("WriteRecord should have .snap or .children")}}return s}function Vb(t,e,n,s,r){if(!s&&!r){const i=ei(t.visibleWrites,e);if(i!=null)return i;{const o=Ys(t.visibleWrites,e);if(Gd(o))return n;if(n==null&&!zd(o,De()))return null;{const a=n||ce.EMPTY_NODE;return Hi(o,a)}}}else{const i=Ys(t.visibleWrites,e);if(!r&&Gd(i))return n;if(!r&&n==null&&!zd(i,De()))return null;{const o=function(u){return(u.visible||r)&&(!s||!~s.indexOf(u.writeId))&&(Cn(u.path,e)||Cn(e,u.path))},a=Lb(t.allWrites,o,e),c=n||ce.EMPTY_NODE;return Hi(a,c)}}}function eF(t,e,n){let s=ce.EMPTY_NODE;const r=ei(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(tt,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Ys(t.visibleWrites,e);return n.forEachChild(tt,(o,a)=>{const c=Hi(Ys(i,new $e(o)),a);s=s.updateImmediateChild(o,c)}),av(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Ys(t.visibleWrites,e);return av(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function tF(t,e,n,s,r){W(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=ft(e,n);if(zd(t.visibleWrites,i))return null;{const o=Ys(t.visibleWrites,i);return Gd(o)?r.getChild(n):Hi(o,r.getChild(n))}}function nF(t,e,n,s){const r=ft(e,n),i=ei(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Ys(t.visibleWrites,r);return Hi(o,s.getNode().getImmediateChild(n))}else return null}function sF(t,e){return ei(t.visibleWrites,e)}function rF(t,e,n,s,r,i,o){let a;const c=Ys(t.visibleWrites,e),u=ei(c,De());if(u!=null)a=u;else if(n!=null)a=Hi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),p=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let m=p.getNext();for(;m&&h.length<r;)d(m,s)!==0&&h.push(m),m=p.getNext();return h}else return[]}function iF(){return{visibleWrites:Nn.empty(),allWrites:[],lastWriteId:-1}}function Oc(t,e,n,s){return Vb(t.writeTree,t.treePath,e,n,s)}function $p(t,e){return eF(t.writeTree,t.treePath,e)}function lv(t,e,n,s){return tF(t.writeTree,t.treePath,e,n,s)}function Mc(t,e){return sF(t.writeTree,ft(t.treePath,e))}function oF(t,e,n,s,r,i){return rF(t.writeTree,t.treePath,e,n,s,r,i)}function jp(t,e,n){return nF(t.writeTree,t.treePath,e,n)}function Fb(t,e){return Ub(ft(t.treePath,e),t.writeTree)}function Ub(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aF{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;W(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),W(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,Sa(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,Ca(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,qi(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,Sa(s,e.snapshotNode,r.oldSnap));else throw zi("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lF{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Bb=new lF;class qp{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ur(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return jp(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Qr(this.viewCache_),i=oF(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cF(t){return{filter:t}}function uF(t,e){W(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),W(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function hF(t,e,n,s,r){const i=new aF;let o,a;if(n.type===Sn.OVERWRITE){const u=n;u.source.fromUser?o=Kd(t,e,u.path,u.snap,s,r,i):(W(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered()&&!Ie(u.path),o=Lc(t,e,u.path,u.snap,s,r,a,i))}else if(n.type===Sn.MERGE){const u=n;u.source.fromUser?o=fF(t,e,u.path,u.children,s,r,i):(W(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered(),o=Qd(t,e,u.path,u.children,s,r,a,i))}else if(n.type===Sn.ACK_USER_WRITE){const u=n;u.revert?o=mF(t,e,u.path,s,r,i):o=pF(t,e,u.path,u.affectedTree,s,r,i)}else if(n.type===Sn.LISTEN_COMPLETE)o=gF(t,e,n.path,s,i);else throw zi("Unknown operation type: "+n.type);const c=i.getChanges();return dF(e,o,c),{viewCache:o,changes:c}}function dF(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Dc(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(Nb(Dc(e)))}}function $b(t,e,n,s,r,i){const o=e.eventCache;if(Mc(s,n)!=null)return e;{let a,c;if(Ie(n))if(W(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const u=Qr(e),h=u instanceof ce?u:ce.EMPTY_NODE,d=$p(s,h);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const u=Oc(s,Qr(e));a=t.filter.updateFullNode(e.eventCache.getNode(),u,i)}else{const u=Ee(n);if(u===".priority"){W(cr(n)===1,"Can't have a priority with additional path components");const h=o.getNode();c=e.serverCache.getNode();const d=lv(s,n,h,c);d!=null?a=t.filter.updatePriority(h,d):a=o.getNode()}else{const h=qe(n);let d;if(o.isCompleteForChild(u)){c=e.serverCache.getNode();const p=lv(s,n,o.getNode(),c);p!=null?d=o.getNode().getImmediateChild(u).updateChild(h,p):d=o.getNode().getImmediateChild(u)}else d=jp(s,u,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),u,d,h,r,i):a=o.getNode()}}return ea(e,a,o.isFullyInitialized()||Ie(n),t.filter.filtersNodes())}}function Lc(t,e,n,s,r,i,o,a){const c=e.serverCache;let u;const h=o?t.filter:t.filter.getIndexedFilter();if(Ie(n))u=h.updateFullNode(c.getNode(),s,null);else if(h.filtersNodes()&&!c.isFiltered()){const m=c.getNode().updateChild(n,s);u=h.updateFullNode(c.getNode(),m,null)}else{const m=Ee(n);if(!c.isCompleteForPath(n)&&cr(n)>1)return e;const E=qe(n),P=c.getNode().getImmediateChild(m).updateChild(E,s);m===".priority"?u=h.updatePriority(c.getNode(),P):u=h.updateChild(c.getNode(),m,P,E,Bb,null)}const d=Ob(e,u,c.isFullyInitialized()||Ie(n),h.filtersNodes()),p=new qp(r,d,i);return $b(t,d,n,r,p,a)}function Kd(t,e,n,s,r,i,o){const a=e.eventCache;let c,u;const h=new qp(r,e,i);if(Ie(n))u=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=ea(e,u,!0,t.filter.filtersNodes());else{const d=Ee(n);if(d===".priority")u=t.filter.updatePriority(e.eventCache.getNode(),s),c=ea(e,u,a.isFullyInitialized(),a.isFiltered());else{const p=qe(n),m=a.getNode().getImmediateChild(d);let E;if(Ie(p))E=s;else{const R=h.getCompleteChild(d);R!=null?Tb(p)===".priority"&&R.getChild(bb(p)).isEmpty()?E=R:E=R.updateChild(p,s):E=ce.EMPTY_NODE}if(m.equals(E))c=e;else{const R=t.filter.updateChild(a.getNode(),d,E,p,h,o);c=ea(e,R,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function cv(t,e){return t.eventCache.isCompleteForChild(e)}function fF(t,e,n,s,r,i,o){let a=e;return s.foreach((c,u)=>{const h=ft(n,c);cv(e,Ee(h))&&(a=Kd(t,a,h,u,r,i,o))}),s.foreach((c,u)=>{const h=ft(n,c);cv(e,Ee(h))||(a=Kd(t,a,h,u,r,i,o))}),a}function uv(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function Qd(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,u;Ie(n)?u=s:u=new ze(null).setTree(n,s);const h=e.serverCache.getNode();return u.children.inorderTraversal((d,p)=>{if(h.hasChild(d)){const m=e.serverCache.getNode().getImmediateChild(d),E=uv(t,m,p);c=Lc(t,c,new $e(d),E,r,i,o,a)}}),u.children.inorderTraversal((d,p)=>{const m=!e.serverCache.isCompleteForChild(d)&&p.value===null;if(!h.hasChild(d)&&!m){const E=e.serverCache.getNode().getImmediateChild(d),R=uv(t,E,p);c=Lc(t,c,new $e(d),R,r,i,o,a)}}),c}function pF(t,e,n,s,r,i,o){if(Mc(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(Ie(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Lc(t,e,n,c.getNode().getChild(n),r,i,a,o);if(Ie(n)){let u=new ze(null);return c.getNode().forEachChild(ki,(h,d)=>{u=u.set(new $e(h),d)}),Qd(t,e,n,u,r,i,a,o)}else return e}else{let u=new ze(null);return s.foreach((h,d)=>{const p=ft(n,h);c.isCompleteForPath(p)&&(u=u.set(h,c.getNode().getChild(p)))}),Qd(t,e,n,u,r,i,a,o)}}function gF(t,e,n,s,r){const i=e.serverCache,o=Ob(e,i.getNode(),i.isFullyInitialized()||Ie(n),i.isFiltered());return $b(t,o,n,s,Bb,r)}function mF(t,e,n,s,r,i){let o;if(Mc(s,n)!=null)return e;{const a=new qp(s,e,r),c=e.eventCache.getNode();let u;if(Ie(n)||Ee(n)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Oc(s,Qr(e));else{const d=e.serverCache.getNode();W(d instanceof ce,"serverChildren would be complete if leaf node"),h=$p(s,d)}h=h,u=t.filter.updateFullNode(c,h,i)}else{const h=Ee(n);let d=jp(s,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=c.getImmediateChild(h)),d!=null?u=t.filter.updateChild(c,h,d,qe(n),a,i):e.eventCache.getNode().hasChild(h)?u=t.filter.updateChild(c,h,ce.EMPTY_NODE,qe(n),a,i):u=c,u.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Oc(s,Qr(e)),o.isLeafNode()&&(u=t.filter.updateFullNode(u,o,i)))}return o=e.serverCache.isFullyInitialized()||Mc(s,De())!=null,ea(e,u,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _F{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new Vp(s.getIndex()),i=LV(s);this.processor_=cF(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(ce.EMPTY_NODE,o.getNode(),null),u=i.updateFullNode(ce.EMPTY_NODE,a.getNode(),null),h=new ur(c,o.isFullyInitialized(),r.filtersNodes()),d=new ur(u,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Mu(d,h),this.eventGenerator_=new qV(this.query_)}get query(){return this.query_}}function yF(t){return t.viewCache_.serverCache.getNode()}function vF(t){return Dc(t.viewCache_)}function EF(t,e){const n=Qr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!Ie(e)&&!n.getImmediateChild(Ee(e)).isEmpty())?n.getChild(e):null}function hv(t){return t.eventRegistrations_.length===0}function wF(t,e){t.eventRegistrations_.push(e)}function dv(t,e,n){const s=[];if(n){W(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function fv(t,e,n,s){e.type===Sn.MERGE&&e.source.queryId!==null&&(W(Qr(t.viewCache_),"We should always have a full cache before handling merges"),W(Dc(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=hF(t.processor_,r,e,n,s);return uF(t.processor_,i.viewCache),W(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,jb(t,i.changes,i.viewCache.eventCache.getNode(),null)}function TF(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(tt,(i,o)=>{s.push(qi(i,o))}),n.isFullyInitialized()&&s.push(Nb(n.getNode())),jb(t,s,n.getNode(),e)}function jb(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return HV(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vc;class qb{constructor(){this.views=new Map}}function IF(t){W(!Vc,"__referenceConstructor has already been defined"),Vc=t}function bF(){return W(Vc,"Reference.ts has not been loaded"),Vc}function CF(t){return t.views.size===0}function Hp(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return W(i!=null,"SyncTree gave us an op for an invalid query."),fv(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(fv(o,e,n,s));return i}}function Hb(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=Oc(n,r?s:null),c=!1;a?c=!0:s instanceof ce?(a=$p(n,s),c=!1):(a=ce.EMPTY_NODE,c=!1);const u=Mu(new ur(a,c,!1),new ur(s,r,!1));return new _F(e,u)}return o}function SF(t,e,n,s,r,i){const o=Hb(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),wF(o,n),TF(o,n)}function AF(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=hr(t);if(r==="default")for(const[c,u]of t.views.entries())o=o.concat(dv(u,n,s)),hv(u)&&(t.views.delete(c),u.query._queryParams.loadsAllData()||i.push(u.query));else{const c=t.views.get(r);c&&(o=o.concat(dv(c,n,s)),hv(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!hr(t)&&i.push(new(bF())(e._repo,e._path)),{removed:i,events:o}}function Wb(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Xs(t,e){let n=null;for(const s of t.views.values())n=n||EF(s,e);return n}function zb(t,e){if(e._queryParams.loadsAllData())return Vu(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Gb(t,e){return zb(t,e)!=null}function hr(t){return Vu(t)!=null}function Vu(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fc;function RF(t){W(!Fc,"__referenceConstructor has already been defined"),Fc=t}function PF(){return W(Fc,"Reference.ts has not been loaded"),Fc}let kF=1;class pv{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ze(null),this.pendingWriteTree_=iF(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Kb(t,e,n,s,r){return KV(t.pendingWriteTree_,e,n,s,r),r?Xa(t,new Kr(Db(),e,n)):[]}function Nr(t,e,n=!1){const s=QV(t.pendingWriteTree_,e);if(YV(t.pendingWriteTree_,e)){let i=new ze(null);return s.snap!=null?i=i.set(De(),!0):en(s.children,o=>{i=i.set(new $e(o),!0)}),Xa(t,new xc(s.path,i,n))}else return[]}function Ya(t,e,n){return Xa(t,new Kr(Up(),e,n))}function NF(t,e,n){const s=ze.fromObject(n);return Xa(t,new Pa(Up(),e,s))}function xF(t,e){return Xa(t,new Ra(Up(),e))}function DF(t,e,n){const s=zp(t,n);if(s){const r=Gp(s),i=r.path,o=r.queryId,a=Kt(i,e),c=new Ra(Bp(o),a);return Kp(t,i,c)}else return[]}function Uc(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||Gb(o,e))){const c=AF(o,e,n,s);CF(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const u=c.removed;if(a=c.events,!r){const h=u.findIndex(p=>p._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(p,m)=>hr(m));if(h&&!d){const p=t.syncPointTree_.subtree(i);if(!p.isEmpty()){const m=LF(p);for(let E=0;E<m.length;++E){const R=m[E],P=R.query,D=Jb(t,R);t.listenProvider_.startListening(na(P),ka(t,P),D.hashFn,D.onComplete)}}}!d&&u.length>0&&!s&&(h?t.listenProvider_.stopListening(na(e),null):u.forEach(p=>{const m=t.queryToTagMap.get(Fu(p));t.listenProvider_.stopListening(na(p),m)}))}VF(t,u)}return a}function Qb(t,e,n,s){const r=zp(t,s);if(r!=null){const i=Gp(r),o=i.path,a=i.queryId,c=Kt(o,e),u=new Kr(Bp(a),c,n);return Kp(t,o,u)}else return[]}function OF(t,e,n,s){const r=zp(t,s);if(r){const i=Gp(r),o=i.path,a=i.queryId,c=Kt(o,e),u=ze.fromObject(n),h=new Pa(Bp(a),c,u);return Kp(t,o,h)}else return[]}function Yd(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(p,m)=>{const E=Kt(p,r);i=i||Xs(m,E),o=o||hr(m)});let a=t.syncPointTree_.get(r);a?(o=o||hr(a),i=i||Xs(a,De())):(a=new qb,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=ce.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((m,E)=>{const R=Xs(E,De());R&&(i=i.updateImmediateChild(m,R))}));const u=Gb(a,e);if(!u&&!e._queryParams.loadsAllData()){const p=Fu(e);W(!t.queryToTagMap.has(p),"View does not exist, but we have a tag");const m=FF();t.queryToTagMap.set(p,m),t.tagToQueryMap.set(m,p)}const h=Lu(t.pendingWriteTree_,r);let d=SF(a,e,n,h,i,c);if(!u&&!o&&!s){const p=zb(a,e);d=d.concat(UF(t,e,p))}return d}function Wp(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Kt(o,e),u=Xs(a,c);if(u)return u});return Vb(r,e,i,n,!0)}function MF(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(u,h)=>{const d=Kt(u,n);s=s||Xs(h,d)});let r=t.syncPointTree_.get(n);r?s=s||Xs(r,De()):(r=new qb,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new ur(s,!0,!1):null,a=Lu(t.pendingWriteTree_,e._path),c=Hb(r,e,a,i?o.getNode():ce.EMPTY_NODE,i);return vF(c)}function Xa(t,e){return Yb(e,t.syncPointTree_,null,Lu(t.pendingWriteTree_,De()))}function Yb(t,e,n,s){if(Ie(t.path))return Xb(t,e,n,s);{const r=e.get(De());n==null&&r!=null&&(n=Xs(r,De()));let i=[];const o=Ee(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const u=n?n.getImmediateChild(o):null,h=Fb(s,o);i=i.concat(Yb(a,c,u,h))}return r&&(i=i.concat(Hp(r,t,s,n))),i}}function Xb(t,e,n,s){const r=e.get(De());n==null&&r!=null&&(n=Xs(r,De()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,u=Fb(s,o),h=t.operationForChild(o);h&&(i=i.concat(Xb(h,a,c,u)))}),r&&(i=i.concat(Hp(r,t,s,n))),i}function Jb(t,e){const n=e.query,s=ka(t,n);return{hashFn:()=>(yF(e)||ce.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?DF(t,n._path,s):xF(t,n._path);{const i=ML(r,n);return Uc(t,n,null,i)}}}}function ka(t,e){const n=Fu(e);return t.queryToTagMap.get(n)}function Fu(t){return t._path.toString()+"$"+t._queryIdentifier}function zp(t,e){return t.tagToQueryMap.get(e)}function Gp(t){const e=t.indexOf("$");return W(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new $e(t.substr(0,e))}}function Kp(t,e,n){const s=t.syncPointTree_.get(e);W(s,"Missing sync point for query tag that we're tracking");const r=Lu(t.pendingWriteTree_,e);return Hp(s,n,r,null)}function LF(t){return t.fold((e,n,s)=>{if(n&&hr(n))return[Vu(n)];{let r=[];return n&&(r=Wb(n)),en(s,(i,o)=>{r=r.concat(o)}),r}})}function na(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(PF())(t._repo,t._path):t}function VF(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=Fu(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function FF(){return kF++}function UF(t,e,n){const s=e._path,r=ka(t,e),i=Jb(t,n),o=t.listenProvider_.startListening(na(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)W(!hr(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((u,h,d)=>{if(!Ie(u)&&h&&hr(h))return[Vu(h).query];{let p=[];return h&&(p=p.concat(Wb(h).map(m=>m.query))),en(d,(m,E)=>{p=p.concat(E)}),p}});for(let u=0;u<c.length;++u){const h=c[u];t.listenProvider_.stopListening(na(h),ka(t,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Qp(n)}node(){return this.node_}}class Yp{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ft(this.path_,e);return new Yp(this.syncTree_,n)}node(){return Wp(this.syncTree_,this.path_)}}const BF=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},gv=function(t,e,n){if(!t||typeof t!="object")return t;if(W(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return $F(t[".sv"],e,n);if(typeof t[".sv"]=="object")return jF(t[".sv"],e);W(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},$F=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:W(!1,"Unexpected server value: "+t)}},jF=function(t,e,n){t.hasOwnProperty("increment")||W(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&W(!1,"Unexpected increment value: "+s);const r=e.node();if(W(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},qF=function(t,e,n,s){return Xp(e,new Yp(n,t),s)},Zb=function(t,e,n){return Xp(t,new Qp(e),n)};function Xp(t,e,n){const s=t.getPriority().val(),r=gv(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=gv(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new mt(a,vt(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new mt(r))),o.forEachChild(tt,(a,c)=>{const u=Xp(c,e.getImmediateChild(a),n);u!==c&&(i=i.updateImmediateChild(a,u))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Zp(t,e){let n=e instanceof $e?e:new $e(e),s=t,r=Ee(n);for(;r!==null;){const i=Oi(s.node.children,r)||{children:{},childCount:0};s=new Jp(r,s,i),n=qe(n),r=Ee(n)}return s}function to(t){return t.node.value}function eC(t,e){t.node.value=e,Xd(t)}function tC(t){return t.node.childCount>0}function HF(t){return to(t)===void 0&&!tC(t)}function Uu(t,e){en(t.node.children,(n,s)=>{e(new Jp(n,t,s))})}function nC(t,e,n,s){n&&e(t),Uu(t,r=>{nC(r,e,!0)})}function WF(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Ja(t){return new $e(t.parent===null?t.name:Ja(t.parent)+"/"+t.name)}function Xd(t){t.parent!==null&&zF(t.parent,t.name,t)}function zF(t,e,n){const s=HF(n),r=Ts(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,Xd(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,Xd(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GF=/[\[\].#$\/\u0000-\u001F\u007F]/,KF=/[\[\].#$\u0000-\u001F\u007F]/,jh=10*1024*1024,sC=function(t){return typeof t=="string"&&t.length!==0&&!GF.test(t)},rC=function(t){return typeof t=="string"&&t.length!==0&&!KF.test(t)},QF=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),rC(t)},YF=function(t,e,n,s){eg(xf(t,"value"),e,n)},eg=function(t,e,n){const s=n instanceof $e?new pV(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Sr(s));if(typeof e=="function")throw new Error(t+"contains a function "+Sr(s)+" with contents = "+e.toString());if(tb(e))throw new Error(t+"contains "+e.toString()+" "+Sr(s));if(typeof e=="string"&&e.length>jh/3&&lu(e)>jh)throw new Error(t+"contains a string greater than "+jh+" utf8 bytes "+Sr(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(en(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!sC(o)))throw new Error(t+" contains an invalid key ("+o+") "+Sr(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);gV(s,o),eg(t,a,s),mV(s)}),r&&i)throw new Error(t+' contains ".value" child '+Sr(s)+" in addition to actual children.")}},iC=function(t,e,n,s){if(!rC(n))throw new Error(xf(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},XF=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),iC(t,e,n)},oC=function(t,e){if(Ee(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},JF=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!sC(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!QF(n))throw new Error(xf(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZF{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function tg(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!Op(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function aC(t,e,n){tg(t,n),lC(t,s=>Op(s,e))}function Xn(t,e,n){tg(t,n),lC(t,s=>Cn(s,e)||Cn(e,s))}function lC(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(eU(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function eU(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Jo&&Vt("event: "+n.toString()),eo(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tU="repo_interrupt",nU=25;class sU{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ZF,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Nc(),this.transactionQueueTree_=new Jp,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function rU(t,e,n){if(t.stats_=xp(t.repoInfo_),t.forceRestClient_||UL())t.server_=new kc(t.repoInfo_,(s,r,i,o)=>{mv(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>_v(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ht(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new ds(t.repoInfo_,e,(s,r,i,o)=>{mv(t,s,r,i,o)},s=>{_v(t,s)},s=>{oU(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=HL(t.repoInfo_,()=>new jV(t.stats_,t.server_)),t.infoData_=new VV,t.infoSyncTree_=new pv({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Ya(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),sg(t,"connected",!1),t.serverSyncTree_=new pv({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const u=o(a,c);Xn(t.eventQueue_,s._path,u)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function iU(t){const n=t.infoData_.getNode(new $e(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ng(t){return BF({timestamp:iU(t)})}function mv(t,e,n,s,r){t.dataUpdateCount++;const i=new $e(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=lc(n,u=>vt(u));o=OF(t.serverSyncTree_,i,c,r)}else{const c=vt(n);o=Qb(t.serverSyncTree_,i,c,r)}else if(s){const c=lc(n,u=>vt(u));o=NF(t.serverSyncTree_,i,c)}else{const c=vt(n);o=Ya(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=$u(t,i)),Xn(t.eventQueue_,a,o)}function _v(t,e){sg(t,"connected",e),e===!1&&cU(t)}function oU(t,e){en(e,(n,s)=>{sg(t,n,s)})}function sg(t,e,n){const s=new $e("/.info/"+e),r=vt(n);t.infoData_.updateSnapshot(s,r);const i=Ya(t.infoSyncTree_,s,r);Xn(t.eventQueue_,s,i)}function cC(t){return t.nextWriteId_++}function aU(t,e,n){const s=MF(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=vt(r).withIndex(e._queryParams.getIndex());Yd(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ya(t.serverSyncTree_,e._path,i);else{const a=ka(t.serverSyncTree_,e);o=Qb(t.serverSyncTree_,e._path,i,a)}return Xn(t.eventQueue_,e._path,o),Uc(t.serverSyncTree_,e,n,null,!0),i},r=>(Bu(t,"get for query "+ht(e)+" failed: "+r),Promise.reject(new Error(r))))}function lU(t,e,n,s,r){Bu(t,"set",{path:e.toString(),value:n,priority:s});const i=ng(t),o=vt(n,s),a=Wp(t.serverSyncTree_,e),c=Zb(o,a,i),u=cC(t),h=Kb(t.serverSyncTree_,e,c,u,!0);tg(t.eventQueue_,h),t.server_.put(e.toString(),o.val(!0),(p,m)=>{const E=p==="ok";E||Zt("set at "+e+" failed: "+p);const R=Nr(t.serverSyncTree_,u,!E);Xn(t.eventQueue_,e,R),fU(t,r,p,m)});const d=pC(t,e);$u(t,d),Xn(t.eventQueue_,d,[])}function cU(t){Bu(t,"onDisconnectEvents");const e=ng(t),n=Nc();Wd(t.onDisconnect_,De(),(r,i)=>{const o=qF(r,i,t.serverSyncTree_,e);xb(n,r,o)});let s=[];Wd(n,De(),(r,i)=>{s=s.concat(Ya(t.serverSyncTree_,r,i));const o=pC(t,r);$u(t,o)}),t.onDisconnect_=Nc(),Xn(t.eventQueue_,De(),s)}function uU(t,e,n){let s;Ee(e._path)===".info"?s=Yd(t.infoSyncTree_,e,n):s=Yd(t.serverSyncTree_,e,n),aC(t.eventQueue_,e._path,s)}function hU(t,e,n){let s;Ee(e._path)===".info"?s=Uc(t.infoSyncTree_,e,n):s=Uc(t.serverSyncTree_,e,n),aC(t.eventQueue_,e._path,s)}function dU(t){t.persistentConnection_&&t.persistentConnection_.interrupt(tU)}function Bu(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Vt(n,...e)}function fU(t,e,n,s){e&&eo(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function uC(t,e,n){return Wp(t.serverSyncTree_,e,n)||ce.EMPTY_NODE}function rg(t,e=t.transactionQueueTree_){if(e||ju(t,e),to(e)){const n=dC(t,e);W(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&pU(t,Ja(e),n)}else tC(e)&&Uu(e,n=>{rg(t,n)})}function pU(t,e,n){const s=n.map(u=>u.currentWriteId),r=uC(t,e,s);let i=r;const o=r.hash();for(let u=0;u<n.length;u++){const h=n[u];W(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=Kt(e,h.path);i=i.updateChild(d,h.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,u=>{Bu(t,"transaction put response",{path:c.toString(),status:u});let h=[];if(u==="ok"){const d=[];for(let p=0;p<n.length;p++)n[p].status=2,h=h.concat(Nr(t.serverSyncTree_,n[p].currentWriteId)),n[p].onComplete&&d.push(()=>n[p].onComplete(null,!0,n[p].currentOutputSnapshotResolved)),n[p].unwatcher();ju(t,Zp(t.transactionQueueTree_,e)),rg(t,t.transactionQueueTree_),Xn(t.eventQueue_,e,h);for(let p=0;p<d.length;p++)eo(d[p])}else{if(u==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Zt("transaction at "+c.toString()+" failed: "+u);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=u}$u(t,e)}},o)}function $u(t,e){const n=hC(t,e),s=Ja(n),r=dC(t,n);return gU(t,r,s),s}function gU(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],u=Kt(n,c.path);let h=!1,d;if(W(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,r=r.concat(Nr(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=nU)h=!0,d="maxretry",r=r.concat(Nr(t.serverSyncTree_,c.currentWriteId,!0));else{const p=uC(t,c.path,o);c.currentInputSnapshot=p;const m=e[a].update(p.val());if(m!==void 0){eg("transaction failed: Data returned ",m,c.path);let E=vt(m);typeof m=="object"&&m!=null&&Ts(m,".priority")||(E=E.updatePriority(p.getPriority()));const P=c.currentWriteId,D=ng(t),O=Zb(E,p,D);c.currentOutputSnapshotRaw=E,c.currentOutputSnapshotResolved=O,c.currentWriteId=cC(t),o.splice(o.indexOf(P),1),r=r.concat(Kb(t.serverSyncTree_,c.path,O,c.currentWriteId,c.applyLocally)),r=r.concat(Nr(t.serverSyncTree_,P,!0))}else h=!0,d="nodata",r=r.concat(Nr(t.serverSyncTree_,c.currentWriteId,!0))}Xn(t.eventQueue_,n,r),r=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}ju(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)eo(s[a]);rg(t,t.transactionQueueTree_)}function hC(t,e){let n,s=t.transactionQueueTree_;for(n=Ee(e);n!==null&&to(s)===void 0;)s=Zp(s,n),e=qe(e),n=Ee(e);return s}function dC(t,e){const n=[];return fC(t,e,n),n.sort((s,r)=>s.order-r.order),n}function fC(t,e,n){const s=to(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);Uu(e,r=>{fC(t,r,n)})}function ju(t,e){const n=to(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,eC(e,n.length>0?n:void 0)}Uu(e,s=>{ju(t,s)})}function pC(t,e){const n=Ja(hC(t,e)),s=Zp(t.transactionQueueTree_,e);return WF(s,r=>{qh(t,r)}),qh(t,s),nC(s,r=>{qh(t,r)}),n}function qh(t,e){const n=to(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(W(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(W(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Nr(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?eC(e,void 0):n.length=i+1,Xn(t.eventQueue_,Ja(e),r);for(let o=0;o<s.length;o++)eo(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mU(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function _U(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Zt(`Invalid query segment '${n}' in query '${t}'`)}return e}const yv=function(t,e){const n=yU(t),s=n.namespace;n.domain==="firebase.com"&&Es(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Es("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||kL();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new fb(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new $e(n.pathString)}},yU=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let u=t.indexOf("//");u>=0&&(a=t.substring(0,u-1),t=t.substring(u+2));let h=t.indexOf("/");h===-1&&(h=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(h,d)),h<d&&(r=mU(t.substring(h,d)));const p=_U(t.substring(Math.min(t.length,d)));u=e.indexOf(":"),u>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(u+1),10)):u=e.length;const m=e.slice(0,u);if(m.toLowerCase()==="localhost")n="localhost";else if(m.split(".").length<=2)n=m;else{const E=e.indexOf(".");s=e.substring(0,E).toLowerCase(),n=e.substring(E+1),i=s}"ns"in p&&(i=p.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vU{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ht(this.snapshot.exportVal())}}class EU{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return W(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return Ie(this._path)?null:Tb(this._path)}get ref(){return new Is(this._repo,this._path)}get _queryIdentifier(){const e=sv(this._queryParams),n=kp(e);return n==="{}"?"default":n}get _queryObject(){return sv(this._queryParams)}isEqual(e){if(e=Fe(e),!(e instanceof ig))return!1;const n=this._repo===e._repo,s=Op(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+fV(this._path)}}class Is extends ig{constructor(e,n){super(e,n,new Fp,!1)}get parent(){const e=bb(this._path);return e===null?null:new Is(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Na{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new $e(e),s=Jd(this.ref,e);return new Na(this._node.getChild(n),s,tt)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new Na(r,Jd(this.ref,s),tt)))}hasChild(e){const n=new $e(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function a4(t,e){return t=Fe(t),t._checkNotDeleted("ref"),e!==void 0?Jd(t._root,e):t._root}function Jd(t,e){return t=Fe(t),Ee(t._path)===null?XF("child","path",e):iC("child","path",e),new Is(t._repo,ft(t._path,e))}function l4(t){return oC("remove",t._path),wU(t,null)}function wU(t,e){t=Fe(t),oC("set",t._path),YF("set",e,t._path);const n=new iu;return lU(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function c4(t){t=Fe(t);const e=new gC(()=>{}),n=new qu(e);return aU(t._repo,t,n).then(s=>new Na(s,new Is(t._repo,t._path),t._queryParams.getIndex()))}class qu{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new vU("value",this,new Na(e.snapshotNode,new Is(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new EU(this,e,n):null}matches(e){return e instanceof qu?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function TU(t,e,n,s,r){const i=new gC(n,void 0),o=new qu(i);return uU(t._repo,t,o),()=>hU(t._repo,t,o)}function u4(t,e,n,s){return TU(t,"value",e)}IF(Is);RF(Is);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IU="FIREBASE_DATABASE_EMULATOR_HOST",Zd={};let bU=!1;function CU(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=Jn(i);t.repoInfo_=new fb(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function SU(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||Es("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Vt("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=yv(i,r),a=o.repoInfo,c;typeof process<"u"&&Uy&&(c=Uy[IU]),c?(i=`http://${c}?ns=${a.namespace}`,o=yv(i,r),a=o.repoInfo):o.repoInfo.secure;const u=new $L(t.name,t.options,e);JF("Invalid Firebase Database URL",o),Ie(o.path)||Es("Database URL must point to the root of a Firebase Database (not including a child path).");const h=RU(a,t,u,new BL(t,n));return new PU(h,t)}function AU(t,e){const n=Zd[e];(!n||n[t.key]!==t)&&Es(`Database ${e}(${t.repoInfo_}) has already been deleted.`),dU(t),delete n[t.key]}function RU(t,e,n,s){let r=Zd[e.name];r||(r={},Zd[e.name]=r);let i=r[t.toURLString()];return i&&Es("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new sU(t,bU,n,s),r[t.toURLString()]=i,i}class PU{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(rU(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Is(this._repo,De())),this._rootInternal}_delete(){return this._rootInternal!==null&&(AU(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Es("Cannot call "+e+" on a deleted database.")}}function kU(t=uu(),e){const n=Va(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Pf("database");s&&NU(n,...s)}return n}function NU(t,e,n,s={}){t=Fe(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&tr(s,i.repoInfo_.emulatorOptions))return;Es("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Es('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Wl(Wl.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:kf(s.mockUserToken,t.app.options.projectId);o=new Wl(a)}Jn(e)&&(ou(e),au("Database",!0)),CU(i,r,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xU(t){bL(fr),nr(new gs("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return SU(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),mn(By,$y,t),mn(By,$y,"esm2020")}ds.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ds.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};xU();var Ir={};const ut={apiKey:Ir.FIREBASE_API_KEY||"AIzaSyC2RcDl7MRYRKMkX2szBsF67a9jHub0VV4",authDomain:Ir.FIREBASE_AUTH_DOMAIN||"slide-view-91a09.firebaseapp.com",projectId:Ir.FIREBASE_PROJECT_ID||"slide-view-91a09",storageBucket:Ir.FIREBASE_STORAGE_BUCKET||"slide-view-91a09.appspot.com",messagingSenderId:Ir.FIREBASE_MESSAGING_SENDER_ID||"951171862827",appId:Ir.FIREBASE_APP_ID||"1:951171862827:web:14701b2a5f1cba5b96756e",databaseURL:Ir.FIREBASE_DATABASE_URL||"https://slide-view-91a09-default-rtdb.asia-southeast1.firebasedatabase.app/"};console.log("🔐 Firebase 설정 확인:",{apiKey:ut.apiKey?"설정됨":"설정 안됨",authDomain:ut.authDomain?"설정됨":"설정 안됨",projectId:ut.projectId?"설정됨":"설정 안됨",storageBucket:ut.storageBucket?"설정됨":"설정 안됨",messagingSenderId:ut.messagingSenderId?"설정됨":"설정 안됨",appId:ut.appId?"설정됨":"설정 안됨",databaseURL:ut.databaseURL?"설정됨":"없음"});console.log("🔐 Firebase 설정 값 확인:",{apiKey:ut.apiKey?`${ut.apiKey.substring(0,10)}...`:"없음",authDomain:ut.authDomain,projectId:ut.projectId,databaseURL:ut.databaseURL?"설정됨":"없음"});(!ut.apiKey||!ut.authDomain||!ut.projectId)&&console.warn("⚠️ Firebase 설정이 완전하지 않습니다. 환경 변수를 확인해주세요.");let et,Ze,xr,ef,tf;ut.apiKey&&ut.authDomain&&ut.projectId?(et=Aw(ut),Ze=Hx(et),xr=new ls,ef=SI(et),tf=EL(et),kU(et)):(console.warn("⚠️ Firebase가 초기화되지 않았습니다. 일부 기능(인증, 투표 등)이 작동하지 않을 수 있습니다."),Ze=null,xr=null,ef=null,tf=null);const h4=Object.freeze(Object.defineProperty({__proto__:null,get auth(){return Ze},get db(){return ef},get firebaseApp(){return et},get googleProvider(){return xr},get storage(){return tf}},Symbol.toStringTag,{value:"Module"}));function DU(){return gn(nw)}const We=Zs(null),Ln=Zs(!0),kl=Zs(null);let ci=null,vv=!1;function OU(){const t=DU(),e=et?SI(et):null;e?console.log("✅ Firestore 초기화 완료"):console.error("❌ Firestore가 초기화되지 않았습니다."),et?console.log("✅ Firebase 설정 완료"):console.warn("⚠️ Firebase가 설정되지 않았습니다. 일부 기능이 제한될 수 있습니다.");const n=async c=>{if(!e)throw console.log("⚠️ Firestore가 초기화되지 않았습니다."),new Error("Firestore is not initialized.");const u=3;let h=0;for(;h<u;)try{console.log("🔍 사용자 정보 확인 중:",c.email,`(시도 ${h+1}/${u})`);const d=HO(e,"users",c.uid),p=await Ny(d);if(p.exists()){const m=p.data();return console.log("✅ 기존 사용자 발견:",m),await xy(d,{lastLoginAt:Oh()},{merge:!0}),{...c,role:m.role||"student"}}else{console.log("🆕 새 사용자 등록 시작:",c.email);const m=!1,E=["place.coach@gmail.com","jplee@milestonz.com"],R=E.includes(c.email||"");console.log("🔍 관리자 이메일 확인:",{userEmail:c.email,adminEmails:E,isAdminEmail:R});const P={uid:c.uid,email:c.email,displayName:c.displayName,photoURL:c.photoURL,role:R?"admin":"student",createdAt:Oh(),lastLoginAt:Oh()};console.log("💾 새 사용자 정보 저장 중:",P),await xy(d,P),console.log("✅ 새 사용자 등록 완료:",c.email);const D=await Ny(d);if(D.exists())console.log("✅ 사용자 등록 확인 완료:",D.data());else throw console.error("❌ 사용자 등록 확인 실패: 문서가 존재하지 않음"),new Error("사용자 등록이 완료되지 않았습니다.");return{...c,role:R?"admin":"student"}}}catch(d){if(h++,console.error(`❌ Firestore 접근 오류 (시도 ${h}/${u}):`,d),console.error("❌ 오류 코드:",d.code),console.error("❌ 오류 메시지:",d.message),d.code==="permission-denied")throw console.error("❌ Firestore 권한 오류. 사용자 등록이 불가능합니다."),console.error("❌ 오류 상세 정보:",{code:d.code,message:d.message,firebaseApp:!!et,db:!!e,auth:!!Ze,userUid:c.uid,userEmail:c.email}),new Error("Firebase 프로젝트 설정을 확인해주세요. Firestore가 활성화되어 있고 Security Rules가 올바르게 설정되어 있는지 확인하세요.");if(h<u)console.log(`⏳ ${h*1e3}ms 후 재시도...`),await new Promise(p=>setTimeout(p,h*1e3));else throw console.error("❌ 모든 재시도 실패. 사용자 등록이 불가능합니다."),new Error("사용자 정보를 저장할 수 없습니다. 잠시 후 다시 시도해주세요.")}return{...c,role:"student"}},s=async()=>{if(!Ln.value){Ln.value=!0,kl.value=null;try{if(!Ze||!xr)throw new Error("Firebase is not configured.");const c=await ZN(Ze,xr);console.log("✅ Google 로그인 팝업 성공:",c.user.email);try{if(et&&e)We.value=await n(c.user),console.log("✅ 로그인 후 사용자 역할 설정 완료:",We.value.role);else{console.log("⚠️ Firebase가 초기화되지 않아 인증을 완료할 수 없습니다."),We.value=null,Ze&&await Eo(Ze),t.notify({type:"warning",message:"Firebase 설정을 확인해주세요. 로그인할 수 없습니다.",timeout:5e3}),Ln.value=!1;return}console.log("✅ 로그인 후 인증 상태 업데이트 완료:",{isAuthenticated:!!We.value,userRole:We.value?.role,userEmail:We.value?.email})}catch(u){console.error("❌ 로그인 후 사용자 역할 가져오기 실패:",u),We.value=null,Ze&&await Eo(Ze),t.notify({type:"warning",message:"Firebase 설정 또는 권한 오류로 로그인할 수 없습니다.",timeout:5e3}),Ln.value=!1;return}Ln.value=!1,t.notify({type:"positive",message:"로그인에 성공했습니다!",timeout:2e3})}catch(c){console.error("❌ Google 로그인 팝업 실패:",c),kl.value=c.message,t.notify({type:"negative",message:"로그인을 시작할 수 없습니다."}),Ln.value=!1}}},r=async()=>{if(console.log("🔍 useAuth: logout 함수 호출됨"),console.log("🔍 useAuth: auth 객체 확인:",!!Ze),!Ze){console.log("❌ useAuth: auth 객체가 없음");return}try{ci&&(console.log("🔍 useAuth: Firestore 리스너 정리"),ci(),ci=null),console.log("🔍 useAuth: Firebase signOut 실행"),await Eo(Ze),console.log("✅ useAuth: Firebase signOut 성공"),We.value=null,console.log("✅ useAuth: 사용자 상태 초기화 완료"),console.log("✅ 로그아웃 성공")}catch(c){console.error("❌ useAuth: 로그아웃 실패:",c),t.notify({type:"negative",message:"로그아웃 중 오류가 발생했습니다."})}},i=()=>{if(!vv){if(vv=!0,console.log("🔐 Firebase 초기화 상태 확인:",{firebaseApp:!!et,auth:!!Ze,db:!!e}),!Ze){console.log("⚠️ Firebase Auth가 초기화되지 않음"),Ln.value=!1;return}console.log("🔐 Firebase Auth 초기화 시작"),ci=DN(Ze,async c=>{if(console.log("🔄 onAuthStateChanged 실행. 사용자:",c?c.email:"없음"),c)if(console.log("✅ 인증된 사용자 감지:",{uid:c.uid,email:c.email,displayName:c.displayName,emailVerified:c.emailVerified}),et&&e)try{We.value=await n(c),console.log("✅ 사용자 역할 설정 완료:",We.value.role),console.log("✅ 인증 상태 업데이트 완료:",{isAuthenticated:!!We.value,userRole:We.value?.role,userEmail:We.value?.email})}catch(u){console.error("❌ 사용자 역할 가져오기 실패:",u),console.error("❌ 오류 코드:",u.code),console.error("❌ 오류 메시지:",u.message),We.value=null,Ze&&await Eo(Ze),kl.value=u.message,t.notify({type:"warning",message:"사용자 등록/권한 확인 실패로 로그인할 수 없습니다. 관리자에게 문의하세요.",timeout:5e3}),Ln.value=!1;return}else console.log("⚠️ Firebase가 초기화되지 않아 사용자 역할을 가져올 수 없습니다."),We.value=null,Ze&&await Eo(Ze),t.notify({type:"warning",message:"Firebase 설정이 필요합니다. 로그인할 수 없습니다.",timeout:5e3});else console.log("ℹ️ 인증되지 않은 사용자"),We.value=null,console.log("✅ 인증 해제 상태 업데이트 완료");Ln.value=!1})}};wf(()=>{ci&&ci()});const o=()=>{console.log("🔍 현재 사용자 정보:",{user:We.value,isAuthenticated:!!We.value,userRole:We.value?.role,firebaseApp:!!et,firestore:!!e})},a=()=>(console.log("🔧 Firebase 설정 상태 확인:"),console.log("  - Firebase App:",!!et),console.log("  - Firebase Auth:",!!Ze),console.log("  - Firestore DB:",!!e),console.log("  - Google Provider:",!!xr),et&&console.log("  - Firebase Config:",{apiKey:et.options.apiKey?"설정됨":"설정 안됨",authDomain:et.options.authDomain?"설정됨":"설정 안됨",projectId:et.options.projectId?"설정됨":"설정 안됨",storageBucket:et.options.storageBucket?"설정됨":"설정 안됨"}),{firebaseApp:!!et,auth:!!Ze,db:!!e,googleProvider:!!xr});return{user:oe(()=>We.value),loading:oe(()=>Ln.value),error:oe(()=>kl.value),isAuthenticated:oe(()=>!!We.value),displayName:oe(()=>We.value?.displayName||"사용자"),email:oe(()=>We.value?.email||""),photoURL:oe(()=>We.value?.photoURL||""),isFirebaseConfigured:oe(()=>!!et),userRole:oe(()=>We.value?.role||"unknown"),signInWithGoogle:s,logout:r,initAuth:i,debugUserInfo:o,checkFirebaseConfig:a}}const MU={id:"app"},LU=Kc({__name:"App",setup(t){const{initAuth:e,isAuthenticated:n,userRole:s,loading:r,debugUserInfo:i}=OU(),o=aP(),a=lP();return vf(()=>{e()}),$o([n,s,r],([c,u,h])=>{h||(console.log(`인증 상태 감시: isAuthenticated=${c}, userRole=${u}, loading=${h}`),console.log(`현재 경로: ${a.path}`),i(),c?u==="admin"?(console.log("관리자로 확인됨. 현재 경로 유지."),(a.path==="/login"||a.path.startsWith("/study")&&a.name!=="StudentView")&&o.push("/")):u==="student"&&(a.path.startsWith("/study")||(console.log("학생으로 확인됨. 학생 페이지로 이동합니다."),o.push("/study/default"))):a.path.startsWith("/study")?console.log("미인증 사용자가 학생 페이지 접근. 로그인 페이지로 이동합니다."):console.log("미인증 사용자. 현재 경로 유지."))}),(c,u)=>{const h=nA("router-view");return LE(),OA("div",MU,[zt(h)])}}}),VU=t=>t,FU=VU,UU=[{path:"/",component:()=>xs(()=>import("./MainLayout-CbUPrBs9.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])),children:[{path:"",component:()=>xs(()=>import("./IndexPage-BLAmILuN.js"),__vite__mapDeps([14,1,2,3,10,15,8,9,16,12,17]))},{path:"survey-results",component:()=>xs(()=>import("./SurveyResults-DhayuQfj.js"),__vite__mapDeps([18,6,3,1,2,5,19,15,20,21]))}]},{path:"/logout",component:()=>xs(()=>import("./LogoutPage-D1GfaPnm.js"),__vite__mapDeps([22,2,3,10,15,4,23]))},{path:"/poll-result",component:()=>xs(()=>import("./PollResultPage-B3rDVM-7.js"),__vite__mapDeps([24,6,3,15,20,21,25]))},{path:"/study/:courseId",component:()=>xs(()=>import("./StudentView-ZIAbzNqK.js"),__vite__mapDeps([26,1,2,3,5,7,4,8,9,10,6,11,16,15,19,20,21,27])),beforeEnter:(t,e,n)=>{const s=localStorage.getItem("isGuestMode")==="true",r=localStorage.getItem("guestUserId"),i=s&&r,o=!0,a=localStorage.getItem("enableStudentMode")==="true",c=o;console.log("🔍 라우터 가드 디버깅:",{isGuestMode:s,guestUserId:r,isGuestAuthenticated:i,envStudentMode:o,localStudentMode:a,isStudentModeEnabled:c,courseId:t.params.courseId,localStorage:{isGuestMode:localStorage.getItem("isGuestMode"),guestUserId:localStorage.getItem("guestUserId"),enableStudentMode:localStorage.getItem("enableStudentMode")}});{console.log("✅ 학생 페이지 접근 허용:",{isGuestAuthenticated:i,isStudentModeEnabled:c,courseId:t.params.courseId}),n();return}}},{path:"/:catchAll(.*)*",component:()=>xs(()=>import("./ErrorNotFound-BPK_S1F5.js"),[])}],Hh=FU(function(){return iP({scrollBehavior:()=>({left:0,top:0}),routes:UU,history:O0("/")})});async function BU(t,e){const n=t(LU);n.use(s0,e);const s=xa(typeof Hh=="function"?await Hh({}):Hh);return{app:n,router:s}}const nf={xs:18,sm:24,md:32,lg:38,xl:46},og={size:String};function ag(t,e=nf){return oe(()=>t.size!==void 0?{fontSize:t.size in e?`${e[t.size]}px`:t.size}:null)}function $U(t,e){return t!==void 0&&t()||e}function d4(t,e){if(t!==void 0){const n=t();if(n!=null)return n.slice()}return e}function xo(t,e){return t!==void 0?e.concat(t()):e}function jU(t,e){return t===void 0?e:e!==void 0?e.concat(t()):t()}function f4(t,e,n,s,r,i){e.key=s+r;const o=pe(t,e,n);return r===!0?aE(o,i()):o}const Ev="0 0 24 24",Wh=t=>t,zh=t=>`ionicons ${t}`,mC={"mdi-":t=>`mdi ${t}`,"icon-":Wh,"bt-":t=>`bt ${t}`,"eva-":t=>`eva ${t}`,"ion-md":zh,"ion-ios":zh,"ion-logo":zh,"iconfont ":Wh,"ti-":t=>`themify-icon ${t}`,"bi-":t=>`bootstrap-icons ${t}`,"i-":Wh},_C={o_:"-outlined",r_:"-round",s_:"-sharp"},yC={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},qU=new RegExp("^("+Object.keys(mC).join("|")+")"),HU=new RegExp("^("+Object.keys(_C).join("|")+")"),wv=new RegExp("^("+Object.keys(yC).join("|")+")"),WU=/^[Mm]\s?[-+]?\.?\d/,zU=/^img:/,GU=/^svguse:/,KU=/^ion-/,QU=/^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /,Bc=Ma({name:"QIcon",props:{...og,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(t,{slots:e}){const{proxy:{$q:n}}=Xr(),s=ag(t),r=oe(()=>"q-icon"+(t.left===!0?" on-left":"")+(t.right===!0?" on-right":"")+(t.color!==void 0?` text-${t.color}`:"")),i=oe(()=>{let o,a=t.name;if(a==="none"||!a)return{none:!0};if(n.iconMapFn!==null){const h=n.iconMapFn(a);if(h!==void 0)if(h.icon!==void 0){if(a=h.icon,a==="none"||!a)return{none:!0}}else return{cls:h.cls,content:h.content!==void 0?h.content:" "}}if(WU.test(a)===!0){const[h,d=Ev]=a.split("|");return{svg:!0,viewBox:d,nodes:h.split("&&").map(p=>{const[m,E,R]=p.split("@@");return pe("path",{style:E,d:m,transform:R})})}}if(zU.test(a)===!0)return{img:!0,src:a.substring(4)};if(GU.test(a)===!0){const[h,d=Ev]=a.split("|");return{svguse:!0,src:h.substring(7),viewBox:d}}let c=" ";const u=a.match(qU);if(u!==null)o=mC[u[1]](a);else if(QU.test(a)===!0)o=a;else if(KU.test(a)===!0)o=`ionicons ion-${n.platform.is.ios===!0?"ios":"md"}${a.substring(3)}`;else if(wv.test(a)===!0){o="notranslate material-symbols";const h=a.match(wv);h!==null&&(a=a.substring(6),o+=yC[h[1]]),c=a}else{o="notranslate material-icons";const h=a.match(HU);h!==null&&(a=a.substring(2),o+=_C[h[1]]),c=a}return{cls:o,content:c}});return()=>{const o={class:r.value,style:s.value,"aria-hidden":"true"};return i.value.none===!0?pe(t.tag,o,$U(e.default)):i.value.img===!0?pe(t.tag,o,xo(e.default,[pe("img",{src:i.value.src})])):i.value.svg===!0?pe(t.tag,o,xo(e.default,[pe("svg",{viewBox:i.value.viewBox||"0 0 24 24"},i.value.nodes)])):i.value.svguse===!0?pe(t.tag,o,xo(e.default,[pe("svg",{viewBox:i.value.viewBox},[pe("use",{"xlink:href":i.value.src})])])):(i.value.cls!==void 0&&(o.class+=" "+i.value.cls),pe(t.tag,o,xo(e.default,[i.value.content])))}}}),YU=Ma({name:"QAvatar",props:{...og,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(t,{slots:e}){const n=ag(t),s=oe(()=>"q-avatar"+(t.color?` bg-${t.color}`:"")+(t.textColor?` text-${t.textColor} q-chip--colored`:"")+(t.square===!0?" q-avatar--square":t.rounded===!0?" rounded-borders":"")),r=oe(()=>t.fontSize?{fontSize:t.fontSize}:null);return()=>{const i=t.icon!==void 0?[pe(Bc,{name:t.icon})]:void 0;return pe("div",{class:s.value,style:n.value},[pe("div",{class:"q-avatar__content row flex-center overflow-hidden",style:r.value},jU(e.default,i))])}}}),XU={size:{type:[String,Number],default:"1em"},color:String};function JU(t){return{cSize:oe(()=>t.size in nf?`${nf[t.size]}px`:t.size),classes:oe(()=>"q-spinner"+(t.color?` text-${t.color}`:""))}}const vC=Ma({name:"QSpinner",props:{...XU,thickness:{type:Number,default:5}},setup(t){const{cSize:e,classes:n}=JU(t);return()=>pe("svg",{class:n.value+" q-spinner-mat",width:e.value,height:e.value,viewBox:"25 25 50 50"},[pe("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":t.thickness,"stroke-miterlimit":"10"})])}});function ZU(t,e){const n=t.style;for(const s in e)n[s]=e[s]}function p4(t){if(t==null)return;if(typeof t=="string")try{return document.querySelector(t)||void 0}catch{return}const e=Or(t);if(e)return e.$el||e}function g4(t,e){if(t==null||t.contains(e)===!0)return!0;for(let n=t.nextElementSibling;n!==null;n=n.nextElementSibling)if(n.contains(e))return!0;return!1}function e2(t,e=250){let n=!1,s;return function(){return n===!1&&(n=!0,setTimeout(()=>{n=!1},e),s=t.apply(this,arguments)),s}}function Tv(t,e,n,s){n.modifiers.stop===!0&&JE(t);const r=n.modifiers.color;let i=n.modifiers.center;i=i===!0||s===!0;const o=document.createElement("span"),a=document.createElement("span"),c=LR(t),{left:u,top:h,width:d,height:p}=e.getBoundingClientRect(),m=Math.sqrt(d*d+p*p),E=m/2,R=`${(d-m)/2}px`,P=i?R:`${c.left-u-E}px`,D=`${(p-m)/2}px`,O=i?D:`${c.top-h-E}px`;a.className="q-ripple__inner",ZU(a,{height:`${m}px`,width:`${m}px`,transform:`translate3d(${P},${O},0) scale3d(.2,.2,1)`,opacity:0}),o.className=`q-ripple${r?" text-"+r:""}`,o.setAttribute("dir","ltr"),o.appendChild(a),e.appendChild(o);const V=()=>{o.remove(),clearTimeout(B)};n.abort.push(V);let B=setTimeout(()=>{a.classList.add("q-ripple__inner--enter"),a.style.transform=`translate3d(${R},${D},0) scale3d(1,1,1)`,a.style.opacity=.2,B=setTimeout(()=>{a.classList.remove("q-ripple__inner--enter"),a.classList.add("q-ripple__inner--leave"),a.style.opacity=0,B=setTimeout(()=>{o.remove(),n.abort.splice(n.abort.indexOf(V),1)},275)},250)},50)}function Iv(t,{modifiers:e,value:n,arg:s}){const r=Object.assign({},t.cfg.ripple,e,n);t.modifiers={early:r.early===!0,stop:r.stop===!0,center:r.center===!0,color:r.color||s,keyCodes:[].concat(r.keyCodes||13)}}const t2=MR({name:"ripple",beforeMount(t,e){const n=e.instance.$.appContext.config.globalProperties.$q.config||{};if(n.ripple===!1)return;const s={cfg:n,enabled:e.value!==!1,modifiers:{},abort:[],start(r){s.enabled===!0&&r.qSkipRipple!==!0&&r.type===(s.modifiers.early===!0?"pointerdown":"click")&&Tv(r,t,s,r.qKeyEvent===!0)},keystart:e2(r=>{s.enabled===!0&&r.qSkipRipple!==!0&&ld(r,s.modifiers.keyCodes)===!0&&r.type===`key${s.modifiers.early===!0?"down":"up"}`&&Tv(r,t,s,!0)},300)};Iv(s,e),t.__qripple=s,VR(s,"main",[[t,"pointerdown","start","passive"],[t,"click","start","passive"],[t,"keydown","keystart","passive"],[t,"keyup","keystart","passive"]])},updated(t,e){if(e.oldValue!==e.value){const n=t.__qripple;n!==void 0&&(n.enabled=e.value!==!1,n.enabled===!0&&Object(e.value)===e.value&&Iv(n,e))}},beforeUnmount(t){const e=t.__qripple;e!==void 0&&(e.abort.forEach(n=>{n()}),FR(e,"main"),delete t._qripple)}}),EC={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},n2=Object.keys(EC),s2={align:{type:String,validator:t=>n2.includes(t)}};function r2(t){return oe(()=>{const e=t.align===void 0?t.vertical===!0?"stretch":"left":t.align;return`${t.vertical===!0?"items":"justify"}-${EC[e]}`})}function m4(t){if(Object(t.$parent)===t.$parent)return t.$parent;let{parent:e}=t.$;for(;Object(e)===e;){if(Object(e.proxy)===e.proxy)return e.proxy;e=e.parent}}function i2(t){return t.appContext.config.globalProperties.$router!==void 0}function _4(t){return t.isUnmounted===!0||t.isDeactivated===!0}function bv(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}function Cv(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function o2(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(Array.isArray(r)===!1||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function Sv(t,e){return Array.isArray(e)===!0?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function a2(t,e){return Array.isArray(t)===!0?Sv(t,e):Array.isArray(e)===!0?Sv(e,t):t===e}function l2(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(a2(t[n],e[n])===!1)return!1;return!0}const wC={to:[String,Object],replace:Boolean,href:String,target:String,disable:Boolean},y4={...wC,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"}};function c2({fallbackTag:t,useDisableForRouterLinkProps:e=!0}={}){const n=Xr(),{props:s,proxy:r,emit:i}=n,o=i2(n),a=oe(()=>s.disable!==!0&&s.href!==void 0),c=oe(e===!0?()=>o===!0&&s.disable!==!0&&a.value!==!0&&s.to!==void 0&&s.to!==null&&s.to!=="":()=>o===!0&&a.value!==!0&&s.to!==void 0&&s.to!==null&&s.to!==""),u=oe(()=>c.value===!0?O(s.to):null),h=oe(()=>u.value!==null),d=oe(()=>a.value===!0||h.value===!0),p=oe(()=>s.type==="a"||d.value===!0?"a":s.tag||t||"div"),m=oe(()=>a.value===!0?{href:s.href,target:s.target}:h.value===!0?{href:u.value.href,target:s.target}:{}),E=oe(()=>{if(h.value===!1)return-1;const{matched:K}=u.value,{length:Z}=K,S=K[Z-1];if(S===void 0)return-1;const v=r.$route.matched;if(v.length===0)return-1;const y=v.findIndex(Cv.bind(null,S));if(y!==-1)return y;const C=bv(K[Z-2]);return Z>1&&bv(S)===C&&v[v.length-1].path!==C?v.findIndex(Cv.bind(null,K[Z-2])):y}),R=oe(()=>h.value===!0&&E.value!==-1&&o2(r.$route.params,u.value.params)),P=oe(()=>R.value===!0&&E.value===r.$route.matched.length-1&&l2(r.$route.params,u.value.params)),D=oe(()=>h.value===!0?P.value===!0?` ${s.exactActiveClass} ${s.activeClass}`:s.exact===!0?"":R.value===!0?` ${s.activeClass}`:"":"");function O(K){try{return r.$router.resolve(K)}catch{}return null}function V(K,{returnRouterError:Z,to:S=s.to,replace:v=s.replace}={}){if(s.disable===!0)return K.preventDefault(),Promise.resolve(!1);if(K.metaKey||K.altKey||K.ctrlKey||K.shiftKey||K.button!==void 0&&K.button!==0||s.target==="_blank")return Promise.resolve(!1);K.preventDefault();const y=r.$router[v===!0?"replace":"push"](S);return Z===!0?y:y.then(()=>{}).catch(()=>{})}function B(K){if(h.value===!0){const Z=S=>V(K,S);i("click",K,Z),K.defaultPrevented!==!0&&Z()}else i("click",K)}return{hasRouterLink:h,hasHrefLink:a,hasLink:d,linkTag:p,resolvedLink:u,linkIsActive:R,linkIsExactActive:P,linkClass:D,linkAttrs:m,getLink:O,navigateToRouterLink:V,navigateOnClick:B}}const Av={none:0,xs:4,sm:8,md:16,lg:24,xl:32},u2={xs:8,sm:10,md:14,lg:20,xl:24},h2=["button","submit","reset"],d2=/[^\s]\/[^\s]/,f2=["flat","outline","push","unelevated"];function p2(t,e){return t.flat===!0?"flat":t.outline===!0?"outline":t.push===!0?"push":t.unelevated===!0?"unelevated":e}const g2={...og,...wC,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,...f2.reduce((t,e)=>(t[e]=Boolean)&&t,{}),square:Boolean,rounded:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...s2.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean},m2={...g2,round:Boolean};function _2(t){const e=ag(t,u2),n=r2(t),{hasRouterLink:s,hasLink:r,linkTag:i,linkAttrs:o,navigateOnClick:a}=c2({fallbackTag:"button"}),c=oe(()=>{const P=t.fab===!1&&t.fabMini===!1?e.value:{};return t.padding!==void 0?Object.assign({},P,{padding:t.padding.split(/\s+/).map(D=>D in Av?Av[D]+"px":D).join(" "),minWidth:"0",minHeight:"0"}):P}),u=oe(()=>t.rounded===!0||t.fab===!0||t.fabMini===!0),h=oe(()=>t.disable!==!0&&t.loading!==!0),d=oe(()=>h.value===!0?t.tabindex||0:-1),p=oe(()=>p2(t,"standard")),m=oe(()=>{const P={tabindex:d.value};return r.value===!0?Object.assign(P,o.value):h2.includes(t.type)===!0&&(P.type=t.type),i.value==="a"?(t.disable===!0?P["aria-disabled"]="true":P.href===void 0&&(P.role="button"),s.value!==!0&&d2.test(t.type)===!0&&(P.type=t.type)):t.disable===!0&&(P.disabled="",P["aria-disabled"]="true"),t.loading===!0&&t.percentage!==void 0&&Object.assign(P,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":t.percentage}),P}),E=oe(()=>{let P;t.color!==void 0?t.flat===!0||t.outline===!0?P=`text-${t.textColor||t.color}`:P=`bg-${t.color} text-${t.textColor||"white"}`:t.textColor&&(P=`text-${t.textColor}`);const D=t.round===!0?"round":`rectangle${u.value===!0?" q-btn--rounded":t.square===!0?" q-btn--square":""}`;return`q-btn--${p.value} q-btn--${D}`+(P!==void 0?" "+P:"")+(h.value===!0?" q-btn--actionable q-focusable q-hoverable":t.disable===!0?" disabled":"")+(t.fab===!0?" q-btn--fab":t.fabMini===!0?" q-btn--fab-mini":"")+(t.noCaps===!0?" q-btn--no-uppercase":"")+(t.dense===!0?" q-btn--dense":"")+(t.stretch===!0?" no-border-radius self-stretch":"")+(t.glossy===!0?" glossy":"")+(t.square?" q-btn--square":"")}),R=oe(()=>n.value+(t.stack===!0?" column":" row")+(t.noWrap===!0?" no-wrap text-no-wrap":"")+(t.loading===!0?" q-btn__content--hidden":""));return{classes:E,style:c,innerClasses:R,attributes:m,hasLink:r,linkTag:i,navigateOnClick:a,isActionable:h}}const{passiveCapture:dn}=$r;let ui=null,hi=null,di=null;const y2=Ma({name:"QBtn",props:{...m2,percentage:Number,darkPercentage:Boolean,onTouchstart:[Function,Array]},emits:["click","keydown","mousedown","keyup"],setup(t,{slots:e,emit:n}){const{proxy:s}=Xr(),{classes:r,style:i,innerClasses:o,attributes:a,hasLink:c,linkTag:u,navigateOnClick:h,isActionable:d}=_2(t),p=Zs(null),m=Zs(null);let E=null,R,P=null;const D=oe(()=>t.label!==void 0&&t.label!==null&&t.label!==""),O=oe(()=>t.disable===!0||t.ripple===!1?!1:{keyCodes:c.value===!0?[13,32]:[13],...t.ripple===!0?{}:t.ripple}),V=oe(()=>({center:t.round})),B=oe(()=>{const Q=Math.max(0,Math.min(100,t.percentage));return Q>0?{transition:"transform 0.6s",transform:`translateX(${Q-100}%)`}:{}}),K=oe(()=>{if(t.loading===!0)return{onMousedown:w,onTouchstart:w,onClick:w,onKeydown:w,onKeyup:w};if(d.value===!0){const Q={onClick:S,onKeydown:v,onMousedown:C};if(s.$q.platform.has.touch===!0){const ve=t.onTouchstart!==void 0?"":"Passive";Q[`onTouchstart${ve}`]=y}return Q}return{onClick:ai}}),Z=oe(()=>({ref:p,class:"q-btn q-btn-item non-selectable no-outline "+r.value,style:i.value,...a.value,...K.value}));function S(Q){if(p.value!==null){if(Q!==void 0){if(Q.defaultPrevented===!0)return;const ve=document.activeElement;if(t.type==="submit"&&ve!==document.body&&p.value.contains(ve)===!1&&ve.contains(p.value)===!1){Q.qAvoidFocus!==!0&&p.value.focus();const Ve=()=>{document.removeEventListener("keydown",ai,!0),document.removeEventListener("keyup",Ve,dn),p.value?.removeEventListener("blur",Ve,dn)};document.addEventListener("keydown",ai,!0),document.addEventListener("keyup",Ve,dn),p.value.addEventListener("blur",Ve,dn)}}h(Q)}}function v(Q){p.value!==null&&(n("keydown",Q),ld(Q,[13,32])===!0&&hi!==p.value&&(hi!==null&&b(),Q.defaultPrevented!==!0&&(Q.qAvoidFocus!==!0&&p.value.focus(),hi=p.value,p.value.classList.add("q-btn--active"),document.addEventListener("keyup",A,!0),p.value.addEventListener("blur",A,dn)),ai(Q)))}function y(Q){p.value!==null&&(n("touchstart",Q),Q.defaultPrevented!==!0&&(ui!==p.value&&(ui!==null&&b(),ui=p.value,E=Q.target,E.addEventListener("touchcancel",A,dn),E.addEventListener("touchend",A,dn)),R=!0,P!==null&&clearTimeout(P),P=setTimeout(()=>{P=null,R=!1},200)))}function C(Q){p.value!==null&&(Q.qSkipRipple=R===!0,n("mousedown",Q),Q.defaultPrevented!==!0&&di!==p.value&&(di!==null&&b(),di=p.value,p.value.classList.add("q-btn--active"),document.addEventListener("mouseup",A,dn)))}function A(Q){if(p.value!==null&&!(Q?.type==="blur"&&document.activeElement===p.value)){if(Q?.type==="keyup"){if(hi===p.value&&ld(Q,[13,32])===!0){const ve=new MouseEvent("click",Q);ve.qKeyEvent=!0,Q.defaultPrevented===!0&&ad(ve),Q.cancelBubble===!0&&JE(ve),p.value.dispatchEvent(ve),ai(Q),Q.qKeyEvent=!0}n("keyup",Q)}b()}}function b(Q){const ve=m.value;Q!==!0&&(ui===p.value||di===p.value)&&ve!==null&&ve!==document.activeElement&&(ve.setAttribute("tabindex",-1),ve.focus()),ui===p.value&&(E!==null&&(E.removeEventListener("touchcancel",A,dn),E.removeEventListener("touchend",A,dn)),ui=E=null),di===p.value&&(document.removeEventListener("mouseup",A,dn),di=null),hi===p.value&&(document.removeEventListener("keyup",A,!0),p.value?.removeEventListener("blur",A,dn),hi=null),p.value?.classList.remove("q-btn--active")}function w(Q){ai(Q),Q.qSkipRipple=!0}return Ef(()=>{b(!0)}),Object.assign(s,{click:Q=>{d.value===!0&&S(Q)}}),()=>{let Q=[];t.icon!==void 0&&Q.push(pe(Bc,{name:t.icon,left:t.stack!==!0&&D.value===!0,role:"img"})),D.value===!0&&Q.push(pe("span",{class:"block"},[t.label])),Q=xo(e.default,Q),t.iconRight!==void 0&&t.round===!1&&Q.push(pe(Bc,{name:t.iconRight,right:t.stack!==!0&&D.value===!0,role:"img"}));const ve=[pe("span",{class:"q-focus-helper",ref:m})];return t.loading===!0&&t.percentage!==void 0&&ve.push(pe("span",{class:"q-btn__progress absolute-full overflow-hidden"+(t.darkPercentage===!0?" q-btn__progress--dark":"")},[pe("span",{class:"q-btn__progress-indicator fit block",style:B.value})])),ve.push(pe("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+o.value},Q)),t.loading!==null&&ve.push(pe(eR,{name:"q-transition--fade"},()=>t.loading===!0?[pe("span",{key:"loading",class:"absolute-full flex flex-center"},e.loading!==void 0?e.loading():[pe(vC)])]:null)),aE(pe(u.value,Z.value,ve),[[t2,O.value,void 0,V.value]])}}});let v2=1,E2=document.body;function w2(t,e){const n=document.createElement("div");if(n.id=e!==void 0?`q-portal--${e}--${v2++}`:t,ic.globalNodes!==void 0){const s=ic.globalNodes.class;s!==void 0&&(n.className=s)}return E2.appendChild(n),n}function v4(t){t.remove()}let T2=0;const zl={},Gl={},En={},TC={},I2=/^\s*$/,IC=[],b2=[void 0,null,!0,!1,""],lg=["top-left","top-right","bottom-left","bottom-right","top","bottom","left","right","center"],C2=["top-left","top-right","bottom-left","bottom-right"],Do={positive:{icon:t=>t.iconSet.type.positive,color:"positive"},negative:{icon:t=>t.iconSet.type.negative,color:"negative"},warning:{icon:t=>t.iconSet.type.warning,color:"warning",textColor:"dark"},info:{icon:t=>t.iconSet.type.info,color:"info"},ongoing:{group:!1,timeout:0,spinner:!0,color:"grey-8"}};function bC(t,e,n){if(!t)return So("parameter required");let s;const r={textColor:"white"};if(t.ignoreDefaults!==!0&&Object.assign(r,zl),ua(t)===!1&&(r.type&&Object.assign(r,Do[r.type]),t={message:t}),Object.assign(r,Do[t.type||r.type],t),typeof r.icon=="function"&&(r.icon=r.icon(e)),r.spinner?(r.spinner===!0&&(r.spinner=vC),r.spinner=xa(r.spinner)):r.spinner=!1,r.meta={hasMedia:!!(r.spinner!==!1||r.icon||r.avatar),hasText:Rv(r.message)||Rv(r.caption)},r.position){if(lg.includes(r.position)===!1)return So("wrong position",t)}else r.position="bottom";if(b2.includes(r.timeout)===!0)r.timeout=5e3;else{const c=Number(r.timeout);if(isNaN(c)||c<0)return So("wrong timeout",t);r.timeout=Number.isFinite(c)?c:0}r.timeout===0?r.progress=!1:r.progress===!0&&(r.meta.progressClass="q-notification__progress"+(r.progressClass?` ${r.progressClass}`:""),r.meta.progressStyle={animationDuration:`${r.timeout+1e3}ms`});const i=(Array.isArray(t.actions)===!0?t.actions:[]).concat(t.ignoreDefaults!==!0&&Array.isArray(zl.actions)===!0?zl.actions:[]).concat(Array.isArray(Do[t.type]?.actions)===!0?Do[t.type].actions:[]),{closeBtn:o}=r;if(o&&i.push({label:typeof o=="string"?o:e.lang.label.close}),r.actions=i.map(({handler:c,noDismiss:u,...h})=>({flat:!0,...h,onClick:typeof c=="function"?()=>{c(),u!==!0&&a()}:()=>{a()}})),r.multiLine===void 0&&(r.multiLine=r.actions.length>1),Object.assign(r.meta,{class:`q-notification row items-stretch q-notification--${r.multiLine===!0?"multi-line":"standard"}`+(r.color!==void 0?` bg-${r.color}`:"")+(r.textColor!==void 0?` text-${r.textColor}`:"")+(r.classes!==void 0?` ${r.classes}`:""),wrapperClass:"q-notification__wrapper col relative-position border-radius-inherit "+(r.multiLine===!0?"column no-wrap justify-center":"row items-center"),contentClass:"q-notification__content row items-center"+(r.multiLine===!0?"":" col"),leftClass:r.meta.hasText===!0?"additional":"single",attrs:{role:"alert",...r.attrs}}),r.group===!1?(r.group=void 0,r.meta.group=void 0):((r.group===void 0||r.group===!0)&&(r.group=[r.message,r.caption,r.multiline].concat(r.actions.map(c=>`${c.label}*${c.icon}`)).join("|")),r.meta.group=r.group+"|"+r.position),r.actions.length===0?r.actions=void 0:r.meta.actionsClass="q-notification__actions row items-center "+(r.multiLine===!0?"justify-end":"col-auto")+(r.meta.hasMedia===!0?" q-notification__actions--with-media":""),n!==void 0){n.notif.meta.timer&&(clearTimeout(n.notif.meta.timer),n.notif.meta.timer=void 0),r.meta.uid=n.notif.meta.uid;const c=En[r.position].value.indexOf(n.notif);En[r.position].value[c]=r}else{const c=Gl[r.meta.group];if(c===void 0){if(r.meta.uid=T2++,r.meta.badge=1,["left","right","center"].indexOf(r.position)!==-1)En[r.position].value.splice(Math.floor(En[r.position].value.length/2),0,r);else{const u=r.position.indexOf("top")!==-1?"unshift":"push";En[r.position].value[u](r)}r.group!==void 0&&(Gl[r.meta.group]=r)}else{if(c.meta.timer&&(clearTimeout(c.meta.timer),c.meta.timer=void 0),r.badgePosition!==void 0){if(C2.includes(r.badgePosition)===!1)return So("wrong badgePosition",t)}else r.badgePosition=`top-${r.position.indexOf("left")!==-1?"right":"left"}`;r.meta.uid=c.meta.uid,r.meta.badge=c.meta.badge+1,r.meta.badgeClass=`q-notification__badge q-notification__badge--${r.badgePosition}`+(r.badgeColor!==void 0?` bg-${r.badgeColor}`:"")+(r.badgeTextColor!==void 0?` text-${r.badgeTextColor}`:"")+(r.badgeClass?` ${r.badgeClass}`:"");const u=En[r.position].value.indexOf(c);En[r.position].value[u]=Gl[r.meta.group]=r}}const a=()=>{S2(r),s=void 0};if(r.timeout>0&&(r.meta.timer=setTimeout(()=>{r.meta.timer=void 0,a()},r.timeout+1e3)),r.group!==void 0)return c=>{c!==void 0?So("trying to update a grouped one which is forbidden",t):a()};if(s={dismiss:a,config:t,notif:r},n!==void 0){Object.assign(n,s);return}return c=>{if(s!==void 0)if(c===void 0)s.dismiss();else{const u=Object.assign({},s.config,c,{group:!1,position:r.position});bC(u,e,s)}}}function S2(t){t.meta.timer&&(clearTimeout(t.meta.timer),t.meta.timer=void 0);const e=En[t.position].value.indexOf(t);if(e!==-1){t.group!==void 0&&delete Gl[t.meta.group];const n=IC[""+t.meta.uid];if(n){const{width:s,height:r}=getComputedStyle(n);n.style.left=`${n.offsetLeft}px`,n.style.width=s,n.style.height=r}En[t.position].value.splice(e,1),typeof t.onDismiss=="function"&&t.onDismiss()}}function Rv(t){return t!=null&&I2.test(t)!==!0}function So(t,e){return console.error(`Notify: ${t}`,e),!1}function A2(){return Ma({name:"QNotifications",devtools:{hide:!0},setup(){return()=>pe("div",{class:"q-notifications"},lg.map(t=>pe(ER,{key:t,class:TC[t],tag:"div",name:`q-notification--${t}`},()=>En[t].value.map(e=>{const n=e.meta,s=[];if(n.hasMedia===!0&&(e.spinner!==!1?s.push(pe(e.spinner,{class:"q-notification__spinner q-notification__spinner--"+n.leftClass,color:e.spinnerColor,size:e.spinnerSize})):e.icon?s.push(pe(Bc,{class:"q-notification__icon q-notification__icon--"+n.leftClass,name:e.icon,color:e.iconColor,size:e.iconSize,role:"img"})):e.avatar&&s.push(pe(YU,{class:"q-notification__avatar q-notification__avatar--"+n.leftClass},()=>pe("img",{src:e.avatar,"aria-hidden":"true"})))),n.hasText===!0){let i;const o={class:"q-notification__message col"};if(e.html===!0)o.innerHTML=e.caption?`<div>${e.message}</div><div class="q-notification__caption">${e.caption}</div>`:e.message;else{const a=[e.message];i=e.caption?[pe("div",a),pe("div",{class:"q-notification__caption"},[e.caption])]:a}s.push(pe("div",o,i))}const r=[pe("div",{class:n.contentClass},s)];return e.progress===!0&&r.push(pe("div",{key:`${n.uid}|p|${n.badge}`,class:n.progressClass,style:n.progressStyle})),e.actions!==void 0&&r.push(pe("div",{class:n.actionsClass},e.actions.map(i=>pe(y2,i)))),n.badge>1&&r.push(pe("div",{key:`${n.uid}|${n.badge}`,class:e.meta.badgeClass,style:e.badgeStyle},[n.badge])),pe("div",{ref:i=>{IC[""+n.uid]=i},key:n.uid,class:n.class,...n.attrs},[pe("div",{class:n.wrapperClass},r)])}))))}})}const R2={setDefaults(t){ua(t)===!0&&Object.assign(zl,t)},registerType(t,e){ua(e)===!0&&(Do[t]=e)},install({$q:t,parentApp:e}){if(t.notify=this.create=n=>bC(n,t),t.notify.setDefaults=this.setDefaults,t.notify.registerType=this.registerType,t.config.notify!==void 0&&this.setDefaults(t.config.notify),this.__installed!==!0){lg.forEach(s=>{En[s]=Zs([]);const r=["left","center","right"].includes(s)===!0?"center":s.indexOf("top")!==-1?"top":"bottom",i=s.indexOf("left")!==-1?"start":s.indexOf("right")!==-1?"end":"center",o=["left","right"].includes(s)?`items-${s==="left"?"start":"end"} justify-center`:s==="center"?"flex-center":`items-${i}`;TC[s]=`q-notifications__list q-notifications__list--${r} fixed column no-wrap ${o}`});const n=w2("q-notify");e0(A2(),e).mount(n)}}},P2={config:{},plugins:{Notify:R2}},k2="/";async function N2({app:t,router:e},n){let s=!1;const r=a=>{try{return e.resolve(a).href}catch{}return Object(a)===a?null:a},i=a=>{if(s=!0,typeof a=="string"&&/^https?:\/\//.test(a)){window.location.href=a;return}const c=r(a);c!==null&&(window.location.href=c)},o=window.location.href.replace(window.location.origin,"");for(let a=0;s===!1&&a<n.length;a++)try{await n[a]({app:t,router:e,ssrContext:null,redirect:i,urlPath:o,publicPath:k2})}catch(c){if(c&&c.url){i(c.url);return}console.error("[Quasar] boot error:",c);return}s!==!0&&(t.use(e),t.mount("#q-app"))}BU(YE,P2).then(t=>{const[e,n]=Promise.allSettled!==void 0?["allSettled",s=>s.map(r=>{if(r.status==="rejected"){console.error("[Quasar] boot error:",r.reason);return}return r.value.default})]:["all",s=>s.map(r=>r.default)];return Promise[e]([xs(()=>import("./pinia-CU9SUkzn.js"),__vite__mapDeps([28,9]))]).then(s=>{const r=n(s).filter(i=>typeof i=="function");N2(t,r)})});export{$r as $,f4 as A,jU as B,ai as C,Kc as D,OA as E,UE as F,zt as G,LE as H,y2 as I,JE as J,jn as K,eu as L,ad as M,vf as N,lP as O,MA as P,Bc as Q,t2 as R,jS as S,F2 as T,cS as U,FA as V,aP as W,DU as X,Br as Y,Ef as Z,ca as _,Wi as a,XR as a$,xl as a0,wf as a1,xo as a2,et as a3,kU as a4,u4 as a5,a4 as a6,qR as a7,tf as a8,o4 as a9,FR as aA,H2 as aB,VR as aC,LR as aD,j2 as aE,UR as aF,GS as aG,zS as aH,_4 as aI,G2 as aJ,ua as aK,Hx as aL,wn as aM,L2 as aN,YU as aO,B2 as aP,eR as aQ,Xv as aR,U2 as aS,vC as aT,nA as aU,QS as aV,g4 as aW,yh as aX,YS as aY,vE as aZ,i2 as a_,n4 as aa,ef as ab,HO as ac,Z2 as ad,Oh as ae,r4 as af,s4 as ag,i4 as ah,xy as ai,Ny as aj,t4 as ak,xs as al,e4 as am,y4 as an,c2 as ao,ld as ap,d4 as aq,OU as ar,wU as as,c4 as at,lf as au,cf as av,Or as aw,l4 as ax,aE as ay,MR as az,Ti as b,Y2 as b0,Q2 as b1,$2 as b2,od as b3,m4 as b4,M2 as b5,w2 as b6,v4 as b7,q2 as b8,s2 as b9,r2 as ba,Gw as bb,Us as bc,Bs as bd,ls as be,jr as bf,$s as bg,xN as bh,LN as bi,Vx as bj,Jw as bk,bN as bl,rN as bm,w_ as bn,KN as bo,TN as bp,DN as bq,NN as br,zk as bs,aN as bt,ZN as bu,Eo as bv,XU as bw,JU as bx,h4 as by,O2 as c,oe as d,x2 as e,gn as f,uS as g,V2 as h,St as i,Ma as j,Xr as k,pe as l,xa as m,nE as n,D2 as o,$U as p,K2 as q,Zs as r,W2 as s,ke as t,z2 as u,p4 as v,$o as w,ZU as x,og as y,ag as z};
