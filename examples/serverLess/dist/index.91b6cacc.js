!function(){function e(e){return e&&e.__esModule?e.default:e}var t,n={};t=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}};var r,o,i,s=!1;function a(e){return"[object Array]"===i.call(e)}function u(e){return void 0===e}function c(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function f(e){return"[object ArrayBuffer]"===i.call(e)}function l(e){return"undefined"!=typeof FormData&&e instanceof FormData}function p(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function d(e){return"string"==typeof e}function h(e){return"number"==typeof e}function m(e){return null!==e&&"object"==typeof e}function v(e){if("[object Object]"!==i.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function y(e){return"[object Date]"===i.call(e)}function g(e){return"[object File]"===i.call(e)}function b(e){return"[object Blob]"===i.call(e)}function w(e){return"[object Function]"===i.call(e)}function T(e){return m(e)&&w(e.pipe)}function O(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function L(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function k(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function x(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function S(){var e={};function t(t,n){v(e[n])&&v(t)?e[n]=S(e[n],t):v(t)?e[n]=S({},t):a(t)?e[n]=t.slice():e[n]=t}for(var n=0,r=arguments.length;n<r;n++)x(arguments[n],t);return e}function E(e,t,n){return x(t,(function(t,r){e[r]=n&&"function"==typeof t?o(t,n):t})),e}function j(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}function A(){return s||(s=!0,r={},o=t,i=Object.prototype.toString,r={isArray:a,isArrayBuffer:f,isBuffer:c,isFormData:l,isArrayBufferView:p,isString:d,isNumber:h,isObject:m,isPlainObject:v,isUndefined:u,isDate:y,isFile:g,isBlob:b,isFunction:w,isStream:T,isURLSearchParams:O,isStandardBrowserEnv:k,forEach:x,merge:S,extend:E,trim:L,stripBOM:j}),r}A();var _=t;A();var C,R=!1;function N(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function P(){return R||(R=!0,C={},A(),C=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(A().isURLSearchParams(t))r=t.toString();else{var o=[];A().forEach(t,(function(e,t){null!=e&&(A().isArray(e)?t+="[]":e=[e],A().forEach(e,(function(e){A().isDate(e)?e=e.toISOString():A().isObject(e)&&(e=JSON.stringify(e)),o.push(N(t)+"="+N(e))})))})),r=o.join("&")}if(r){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e}),C}var B=P();function F(){this.handlers=[]}A(),F.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},F.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},F.prototype.forEach=function(e){A().forEach(this.handlers,(function(t){null!==t&&e(t)}))};var U=F;A();A();var M,q,G=function(e,t,n){return A().forEach(n,(function(n){e=n(e,t)})),e},I=M=function(e){return!(!e||!e.__CANCEL__)},z=!1;function D(){return z||(z=!0,q={},q=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}),q}var J,$,H=!1;function V(){return H||(H=!0,J={},$=D(),J=function(e,t,n,r,o){var i=new Error(e);return $(i,t,n,r,o)}),J}var X,K,Z=!1;function W(){return Z||(Z=!0,X={},K=V(),X=function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(K("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}),X}var Q,Y=!1;function ee(){return Y||(Y=!0,Q={},A(),Q=A().isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),A().isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),A().isString(r)&&s.push("path="+r),A().isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}),Q}var te,ne=!1;function re(){return ne||(ne=!0,te={},te=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}),te}var oe,ie=!1;function se(){return ie||(ie=!0,oe={},oe=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}),oe}var ae,ue,ce,fe=!1;function le(){return fe||(fe=!0,ae={},ue=re(),ce=se(),ae=function(e,t){return e&&!ue(t)?ce(e,t):t}),ae}var pe,de,he=!1;function me(){return he||(he=!0,pe={},A(),de=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],pe=function(e){var t,n,r,o={};return e?(A().forEach(e.split("\n"),(function(e){if(r=e.indexOf(":"),t=A().trim(e.substr(0,r)).toLowerCase(),n=A().trim(e.substr(r+1)),t){if(o[t]&&de.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([n]):o[t]?o[t]+", "+n:n}})),o):o}),pe}var ve,ye=!1;function ge(){return ye||(ye=!0,ve={},A(),ve=A().isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=A().isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}),ve}var be,we,Te,Oe,Le,ke,xe,Se=!1;function Ee(){return Se||(Se=!0,be={},A(),we=W(),ee(),Te=P(),Oe=le(),Le=me(),ke=ge(),xe=V(),be=function(e){return new Promise((function(t,n){var r=e.data,o=e.headers;A().isFormData(r)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var s=e.auth.username||"",a=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(s+":"+a)}var u=Oe(e.baseURL,e.url);if(i.open(e.method.toUpperCase(),Te(u,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i.onreadystatechange=function(){if(i&&4===i.readyState&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in i?Le(i.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:i.status,statusText:i.statusText,headers:r,config:e,request:i};we(t,n,o),i=null}},i.onabort=function(){i&&(n(xe("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){n(xe("Network Error",e,null,i)),i=null},i.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(xe(t,e,"ECONNABORTED",i)),i=null},A().isStandardBrowserEnv()){var c=(e.withCredentials||ke(u))&&e.xsrfCookieName?ee().read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}if("setRequestHeader"in i&&A().forEach(o,(function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)})),A().isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),e.responseType)try{i.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){i&&(i.abort(),n(e),i=null)})),r||(r=null),i.send(r)}))}),be}var je,Ae,_e,Ce,Re=Ae={};function Ne(){throw new Error("setTimeout has not been defined")}function Pe(){throw new Error("clearTimeout has not been defined")}function Be(e){if(_e===setTimeout)return setTimeout(e,0);if((_e===Ne||!_e)&&setTimeout)return _e=setTimeout,setTimeout(e,0);try{return _e(e,0)}catch(t){try{return _e.call(null,e,0)}catch(t){return _e.call(this,e,0)}}}!function(){try{_e="function"==typeof setTimeout?setTimeout:Ne}catch(e){_e=Ne}try{Ce="function"==typeof clearTimeout?clearTimeout:Pe}catch(e){Ce=Pe}}();var Fe,Ue=[],Me=!1,qe=-1;function Ge(){Me&&Fe&&(Me=!1,Fe.length?Ue=Fe.concat(Ue):qe=-1,Ue.length&&Ie())}function Ie(){if(!Me){var e=Be(Ge);Me=!0;for(var t=Ue.length;t;){for(Fe=Ue,Ue=[];++qe<t;)Fe&&Fe[qe].run();qe=-1,t=Ue.length}Fe=null,Me=!1,function(e){if(Ce===clearTimeout)return clearTimeout(e);if((Ce===Pe||!Ce)&&clearTimeout)return Ce=clearTimeout,clearTimeout(e);try{Ce(e)}catch(t){try{return Ce.call(null,e)}catch(t){return Ce.call(this,e)}}}(e)}}function ze(e,t){this.fun=e,this.array=t}function De(){}Re.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];Ue.push(new ze(e,t)),1!==Ue.length||Me||Be(Ie)},ze.prototype.run=function(){this.fun.apply(null,this.array)},Re.title="browser",Re.browser=!0,Re.env={},Re.argv=[],Re.version="",Re.versions={},Re.on=De,Re.addListener=De,Re.once=De,Re.off=De,Re.removeListener=De,Re.removeAllListeners=De,Re.emit=De,Re.prependListener=De,Re.prependOnceListener=De,Re.listeners=function(e){return[]},Re.binding=function(e){throw new Error("process.binding is not supported")},Re.cwd=function(){return"/"},Re.chdir=function(e){throw new Error("process.chdir is not supported")},Re.umask=function(){return 0};var Je=Ae;A();A();var $e=function(e,t){A().forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))},He={"Content-Type":"application/x-www-form-urlencoded"};function Ve(e,t){!A().isUndefined(e)&&A().isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var Xe,Ke={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==Je&&"[object process]"===Object.prototype.toString.call(Je))&&(Xe=Ee()),Xe),transformRequest:[function(e,t){return $e(t,"Accept"),$e(t,"Content-Type"),A().isFormData(e)||A().isArrayBuffer(e)||A().isBuffer(e)||A().isStream(e)||A().isFile(e)||A().isBlob(e)?e:A().isArrayBufferView(e)?e.buffer:A().isURLSearchParams(e)?(Ve(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):A().isObject(e)?(Ve(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};function Ze(e){e.cancelToken&&e.cancelToken.throwIfRequested()}Ke.headers={common:{Accept:"application/json, text/plain, */*"}},A().forEach(["delete","get","head"],(function(e){Ke.headers[e]={}})),A().forEach(["post","put","patch"],(function(e){Ke.headers[e]=A().merge(He)})),je=Ke;var We,Qe=function(e){return Ze(e),e.headers=e.headers||{},e.data=G(e.data,e.headers,e.transformRequest),e.headers=A().merge(e.headers.common||{},e.headers[e.method]||{},e.headers),A().forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||je.adapter)(e).then((function(t){return Ze(e),t.data=G(t.data,t.headers,e.transformResponse),t}),(function(t){return I(t)||(Ze(e),t&&t.response&&(t.response.data=G(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))};A();var Ye=We=function(e,t){t=t||{};var n={},r=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function a(e,t){return A().isPlainObject(e)&&A().isPlainObject(t)?A().merge(e,t):A().isPlainObject(t)?A().merge({},t):A().isArray(t)?t.slice():t}function u(r){A().isUndefined(t[r])?A().isUndefined(e[r])||(n[r]=a(void 0,e[r])):n[r]=a(e[r],t[r])}A().forEach(r,(function(e){A().isUndefined(t[e])||(n[e]=a(void 0,t[e]))})),A().forEach(o,u),A().forEach(i,(function(r){A().isUndefined(t[r])?A().isUndefined(e[r])||(n[r]=a(void 0,e[r])):n[r]=a(void 0,t[r])})),A().forEach(s,(function(r){r in t?n[r]=a(e[r],t[r]):r in e&&(n[r]=a(void 0,e[r]))}));var c=r.concat(o).concat(i).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return A().forEach(f,u),n};function et(e){this.defaults=e,this.interceptors={request:new U,response:new U}}et.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=Ye(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[Qe,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},et.prototype.getUri=function(e){return e=Ye(this.defaults,e),B(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},A().forEach(["delete","get","head","options"],(function(e){et.prototype[e]=function(t,n){return this.request(Ye(n||{},{method:e,url:t,data:(n||{}).data}))}})),A().forEach(["post","put","patch"],(function(e){et.prototype[e]=function(t,n,r){return this.request(Ye(r||{},{method:e,url:t,data:n}))}}));var tt=et,nt=We;function rt(e){var t=new tt(e),n=_(tt.prototype.request,t);return A().extend(n,tt.prototype,t),A().extend(n,t),n}var ot=rt(je);ot.Axios=tt,ot.create=function(e){return rt(nt(ot.defaults,e))};var it;function st(e){this.message=e}st.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},st.prototype.__CANCEL__=!0,it=st,ot.Cancel=it;var at,ut=it;function ct(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new ut(e),t(n.reason))}))}ct.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},ct.source=function(){var e;return{token:new ct((function(t){e=t})),cancel:e}},at=ct,ot.CancelToken=at,ot.isCancel=M,ot.all=function(e){return Promise.all(e)};var ft;ft=function(e){return function(t){return e.apply(null,t)}},ot.spread=ft;var lt;lt=function(e){return"object"==typeof e&&!0===e.isAxiosError},ot.isAxiosError=lt;var pt=ot;(n=ot).default=pt;var dt,ht,mt,vt=e(n),yt={};ht=self,mt=function(){return(()=>{var e={187:e=>{var t,n="object"==typeof Reflect?Reflect:null,r=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(n,r){function o(n){e.removeListener(t,i),r(n)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}m(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&m(e,"error",t,{once:!0})}(e,o)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function c(e,t,n,r){var o,i,s,c;if(a(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=u(e))>0&&s.length>o&&!s.warned){s.warned=!0;var f=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");f.name="MaxListenersExceededWarning",f.emitter=e,f.type=t,f.count=s.length,c=f,console&&console.warn&&console.warn(c)}return e}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function l(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=f.bind(r);return o.listener=n,r.wrapFn=o,o}function p(e,t,n){var r=e._events;if(void 0===r)return[];var o=r[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):h(o,o.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function h(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function m(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(i){r.once&&e.removeEventListener(t,o),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return u(this)},i.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var o="error"===e,i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)r(u,this,t);else{var c=u.length,f=h(u,c);for(n=0;n<c;++n)r(f[n],this,t)}return!0},i.prototype.addListener=function(e,t){return c(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return c(this,e,t,!0)},i.prototype.once=function(e,t){return a(t),this.on(e,l(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,l(this,e,t)),this},i.prototype.removeListener=function(e,t){var n,r,o,i,s;if(a(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},i.prototype.listeners=function(e){return p(this,e,!0)},i.prototype.rawListeners=function(e){return p(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},i.prototype.listenerCount=d,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{n.r(r),n.d(r,{Communicator:()=>l});var e=n(187),t="undefined"==typeof window,o=function(e){t||window.top.frames["map-frame"].postMessage(e,"*")};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?u(e):t}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(l,e);var t,n,r=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=c(t);if(n){var o=c(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return a(this,e)});function l(e){var t,n=e.sessionToken;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),f(u(t=r.call(this)),"onMessageReceived",(function(e){switch(e.data.type){case"onZoomChange":t.emit("onZoomChange",e.data.zoom);break;case"geomAdded":t.emit("geomAdded",e.data.geom_astext);break;case"layers":t.emit("layers",e.data.layers);break;case"geoJSONlayers":t.emit("geoJSONlayers",e.data.layers);break;case"info":t.emit("info",e.data);break;case"error":t.emit("error",e.data);break;case"coordinates":t.emit("coordinates",e.data);break;case"activeLayer":t.emit("activeLayer",e.data);break;case"geolocation":t.emit("geolocation",e.data);break;case"WMSInfoAvailable":t.emit("WMSInfoAvailable",e.data);break;case"giswaterTiledBackgroundDisplayed":t.emit("giswaterTiledBackgroundDisplayed",e.data);break;case"giswaterTiledBackgroundAvailable":t.emit("giswaterTiledBackgroundAvailable",e.data);break;case"GiswaterLayerAvailableFilters":t.emit("GiswaterLayerAvailableFilters",e.data)}})),f(u(t),"ZoomIn",(function(){o({type:"zoomIn",sessionToken:t.sessionToken})})),f(u(t),"ZoomOut",(function(){o({type:"zoomOut",sessionToken:t.sessionToken})})),f(u(t),"AddGeom",(function(e){o({type:"AddGeom",geom:e,sessionToken:t.sessionToken})})),f(u(t),"toggleLayer",(function(e){o({type:"toggleLayer",layer:e,sessionToken:t.sessionToken})})),f(u(t),"setActiveLayer",(function(e){o({type:"setActiveLayer",layer:e,sessionToken:t.sessionToken})})),f(u(t),"getActiveLayer",(function(){o({type:"getActiveLayer",sessionToken:t.sessionToken})})),f(u(t),"clear",(function(){o({type:"clear",sessionToken:t.sessionToken})})),f(u(t),"Highlight",(function(e){o({type:"highlight",geom:e.geom,zoom:e.zoom,sessionToken:t.sessionToken})})),f(u(t),"zoomToExtent",(function(){o({type:"zoomToExtent",sessionToken:t.sessionToken})})),f(u(t),"infoFromCoordinates",(function(e,n,r){o({type:"infoFromCoordinates",info:e,layer:void 0===n?null:n,hitTolerance:void 0!==r?parseInt(r):5,sessionToken:t.sessionToken})})),f(u(t),"Geolocalize",(function(e){o({type:"Geolocalize",toggle:e,sessionToken:t.sessionToken})})),f(u(t),"toggleGiswaterTiled",(function(e){o({type:"toggleGiswaterTiled",toggle:e,sessionToken:t.sessionToken})})),f(u(t),"reloadDisplayedLayers",(function(){return o({type:"reloadDisplayedLayers",sessionToken:t.sessionToken})})),f(u(t),"addGeoJSON",(function(e,n,r){return e?o({type:"addGeoJSON",geoJSON:e,options:void 0!==n?n:{fillcolor:null,strokecolor:null},name:r||Math.random().toString(36).substring(7),sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(u(t),"clearGeoJSON",(function(){return o({type:"clearGeoJSON",sessionToken:t.sessionToken})})),f(u(t),"removeGeoJSONLayer",(function(e){return e?o({type:"removeGeoJSONLayer",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(u(t),"setGiswaterFilters",(function(e){var n=e;if(e){if("object"!=i(e)){e=(e=(e=e.trim()).replace(/^\s+|\s+$/g,"")).replace(/\\/g,"");try{n=JSON.parse(e)}catch(e){return void t.emit("error",{error:"Filters is not a valid JSON"})}}return o({type:"setGiswaterFilters",filters:n,sessionToken:t.sessionToken})}t.emit("error",{error:"No filters"})})),f(u(t),"getGiswaterLayerAvailableFilters",(function(e){return e?o({type:"getGiswaterLayerAvailableFilters",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No layer_name"})})),"undefined"==typeof window?a(t):(window.addEventListener("message",(function(e){return t.onMessageReceived(e)})),t.sessionToken=n,t)}return l}(e.EventEmitter)})(),r})()},"object"==typeof yt?yt=mt():"object"==typeof yt?(dt=mt(),yt.VidroMaps=dt):ht.VidroMaps=mt();function gt(e){return function(e){var t,n,r,o,i,s={};for(;e.match(/<[^\/][^>]*>/);)t=(i=e.match(/<[^\/][^>]*>/)[0]).substring(1,i.length-1),-1==(n=e.indexOf(i.replace("<","</")))&&(t=i.match(/[^<][\w+$]*/)[0],-1==(n=e.indexOf("</"+t))&&(n=e.indexOf("<\\/"+t))),o=(r=e.substring(i.length,n)).match(/<[^\/][^>]*>/)?gt(r):r,void 0===s[t]?s[t]=o:Array.isArray(s[t])?s[t].push(o):s[t]=[s[t],o],e=e.substring(2*i.length+1+r.length);return s}(e=function(e){return e=function(e){var t=e.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>/g);if(t)for(var n=0;n<t.length;n++){var r=t[n],o="<"+r.match(/[^<][\w+$]*/)[0]+">",i=r.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);if(i)for(var s=0;s<i.length;s++){var a=i[s],u=a.substring(0,a.indexOf("="));o+="<"+u+">"+a.substring(a.indexOf('"')+1,a.lastIndexOf('"'))+"</"+u+">"}e=e.replace(r,o)}return e}(e=function(e){var t=e.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>{1}([^<]+)/g);if(t)for(var n=0;n<t.length;n++){var r=t[n],o=r.substring(0,r.indexOf(">")+1)+"<_@ttribute>"+r.substring(r.indexOf(">")+1)+"</_@ttribute>";e=e.replace(r,o)}return e}(e=function(e){var t=e.match(/<[^/][^>]*\/>/g);if(t)for(var n=0;n<t.length;n++){var r=t[n],o=r.substring(0,r.length-2);o+=">";var i=r.match(/[^<][\w+$]*/)[0],s="</"+i+">",a="<"+i+">",u=o.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);if(u)for(var c=0;c<u.length;c++){var f=u[c],l=f.substring(0,f.indexOf("="));a+="<"+l+">"+f.substring(f.indexOf('"')+1,f.lastIndexOf('"'))+"</"+l+">"}a+=s,e=e.replace(r,a)}return e}(e=(e=(e=(e=(e=e.replace(/<!--[\s\S]*?-->/g,"")).replace(/\n|\t|\r/g,"")).replace(/ {1,}<|\t{1,}</g,"<")).replace(/> {1,}|>\t{1,}/g,">")).replace(/<\?[^>]*\?>/g,""))))}(e))}var bt=e({xml2json:gt});let wt=null;const Tt="Arc",Ot=document.querySelector("#map-frame"),Lt=document.querySelector("#infoContainer"),kt=document.querySelector("#infoContent"),xt=document.querySelector("#closeInfo");vt.post("https://bmaps.bgeo.es/api/letsgo",{user:"test@bgeo.es",pwd:"test.12345"}).then((function(e){console.log(e.data.message);const t=e.data.message.token,n=e.data.message.projects[0];console.log(n),vt.get(`https://bmaps.bgeo.es/api/map/${n}`,{headers:{Authorization:`Bearer ${t}`},params:{logo:"https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r2.png",active_layer:Tt,show_layers:Tt,zoom:17}}).then((function(e){console.log(e.data.message);const t=e.data.message.sessionToken;Ot.src=`${e.data.message.iframe}?sessionToken=${t}`;const n=new yt.Communicator({sessionToken:t});n.on("coordinates",(function(e){console.info("clicked coordinates",e),wt=`POINT(${e.coordinates[0]} ${e.coordinates[1]})`,n.infoFromCoordinates("wms",Tt)})),n.on("info",(function(e){console.log("info received",e),n.clear(),n.Highlight({geom:wt,zoom:{type:"level",zoomLevel:17}}),St(e.data)?(Lt.style.display="block",kt.innerHTML=`ID: ${St(e.data)}`):Lt.style.display="none"}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})),xt.addEventListener("click",(e=>{Lt.style.display="none"}));const St=e=>{try{let t=bt.xml2json(e);for(let e=0;e<t.GetFeatureInfoResponse.Layer.Feature.Attribute.length;e++)if("arc_id"===t.GetFeatureInfoResponse.Layer.Feature.Attribute[e].name)return t.GetFeatureInfoResponse.Layer.Feature.Attribute[e].value}catch(e){return!1}}}();
//# sourceMappingURL=index.91b6cacc.js.map