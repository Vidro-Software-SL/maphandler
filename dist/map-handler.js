!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VidroMaps=t():e.VidroMaps=t()}(self,(function(){return(()=>{"use strict";var e={187:e=>{var t,n="object"==typeof Reflect?Reflect:null,o=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,o){function r(n){e.removeListener(t,s),o(n)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,s,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,r)}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var i=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function u(e,t,n,o){var r,s,i,u;if(a(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),i=s[t]),void 0===i)i=s[t]=n,++e._eventsCount;else if("function"==typeof i?i=s[t]=o?[n,i]:[i,n]:o?i.unshift(n):i.push(n),(r=c(e))>0&&i.length>r&&!i.warned){i.warned=!0;var f=new Error("Possible EventEmitter memory leak detected. "+i.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");f.name="MaxListenersExceededWarning",f.emitter=e,f.type=t,f.count=i.length,u=f,console&&console.warn&&console.warn(u)}return e}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=f.bind(o);return r.listener=n,o.wrapFn=r,r}function l(e,t,n){var o=e._events;if(void 0===o)return[];var r=o[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):m(r,r.length)}function p(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),o=0;o<t;++o)n[o]=e[o];return n}function v(e,t,n,o){if("function"==typeof e.on)o.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(s){o.once&&e.removeEventListener(t,r),n(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return i},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");i=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return c(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,s=this._events;if(void 0!==s)r=r&&void 0===s.error;else if(!r)return!1;if(r){var i;if(t.length>0&&(i=t[0]),i instanceof Error)throw i;var a=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw a.context=i,a}var c=s[e];if(void 0===c)return!1;if("function"==typeof c)o(c,this,t);else{var u=c.length,f=m(c,u);for(n=0;n<u;++n)o(f[n],this,t)}return!0},s.prototype.addListener=function(e,t){return u(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return u(this,e,t,!0)},s.prototype.once=function(e,t){return a(t),this.on(e,d(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,d(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,o,r,s,i;if(a(t),void 0===(o=this._events))return this;if(void 0===(n=o[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){i=n[s].listener,r=s;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(o[e]=n[0]),void 0!==o.removeListener&&this.emit("removeListener",e,i||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,o;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,s=Object.keys(n);for(o=0;o<s.length;++o)"removeListener"!==(r=s[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(o=t.length-1;o>=0;o--)this.removeListener(e,t[o]);return this},s.prototype.listeners=function(e){return l(this,e,!0)},s.prototype.rawListeners=function(e){return l(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},s.prototype.listenerCount=p,s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{n.r(o),n.d(o,{Communicator:()=>d});var e=n(187),t="undefined"==typeof window,r=function e(n){var o,r,s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){t||document.getElementById(s.domId)&&window.top.frames[s.domId].postMessage(e,"*")},(o="sendMessageToMap")in this?Object.defineProperty(this,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[o]=r,this.domId="map-frame","string"==typeof n.id&&(this.domId=n.id)};function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?c(e):t}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(d,e);var t,n,o=(t=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,o=u(t);if(n){var r=u(this).constructor;e=Reflect.construct(o,arguments,r)}else e=o.apply(this,arguments);return a(this,e)});function d(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),f(c(t=o.call(this)),"onMessageReceived",(function(e){switch(e.data.type){case"onZoomChange":t.emitEvent("onZoomChange",e.data.zoom,e.data.domId);break;case"geomAdded":t.emitEvent("geomAdded",e.data.geom_astext,e.data.domId);break;case"layers":t.emitEvent("layers",e.data.layers,e.data.domId);break;case"geoJSONlayers":t.emitEvent("geoJSONlayers",e.data.layers,e.data.domId);break;case"info":t.emitEvent("info",e.data,e.data.domId);break;case"error":t.emitEvent("error",e.data,e.data.domId);break;case"coordinates":t.emitEvent("coordinates",e.data,e.data.domId);break;case"activeLayer":t.emitEvent("activeLayer",e.data,e.data.domId);break;case"geolocation":t.emitEvent("geolocation",e.data,e.data.domId);break;case"WMSInfoAvailable":t.emitEvent("WMSInfoAvailable",e.data,e.data.domId);break;case"giswaterTiledBackgroundDisplayed":t.emitEvent("giswaterTiledBackgroundDisplayed",e.data,e.data.domId);break;case"giswaterTiledBackgroundAvailable":t.emitEvent("giswaterTiledBackgroundAvailable",e.data,e.data.domId);break;case"GiswaterLayerAvailableFilters":t.emitEvent("GiswaterLayerAvailableFilters",e.data,e.data.domId);break;case"loaded":t.emitEvent("loaded",e.data,e.data.domId);break;case"availableWMSLayers":t.emitEvent("availableWMSLayers",e.data.layers,e.data.domId)}})),f(c(t),"emitEvent",(function(e,n,o){o===t.domId&&(delete n.domId,t.emit(e,n))})),f(c(t),"ZoomIn",(function(){t.com.sendMessageToMap({type:"zoomIn",sessionToken:t.sessionToken})})),f(c(t),"ZoomOut",(function(){t.com.sendMessageToMap({type:"zoomOut",sessionToken:t.sessionToken})})),f(c(t),"AddGeom",(function(e){t.com.sendMessageToMap({type:"AddGeom",geom:e,sessionToken:t.sessionToken})})),f(c(t),"toggleLayer",(function(e){t.com.sendMessageToMap({type:"toggleLayer",layer:e,sessionToken:t.sessionToken})})),f(c(t),"setActiveLayer",(function(e){t.com.sendMessageToMap({type:"setActiveLayer",layer:e,sessionToken:t.sessionToken})})),f(c(t),"getActiveLayer",(function(){t.com.sendMessageToMap({type:"getActiveLayer",sessionToken:t.sessionToken})})),f(c(t),"loadWMSAvailableLayers",(function(){t.com.sendMessageToMap({type:"loadWMSAvailableLayers",sessionToken:t.sessionToken})})),f(c(t),"clear",(function(){t.com.sendMessageToMap({type:"clear",sessionToken:t.sessionToken})})),f(c(t),"Highlight",(function(e){t.com.sendMessageToMap({type:"highlight",geom:e.geom,zoom:e.zoom,sessionToken:t.sessionToken})})),f(c(t),"zoomToExtent",(function(){t.com.sendMessageToMap({type:"zoomToExtent",sessionToken:t.sessionToken})})),f(c(t),"zoomToCoordinates",(function(e,n,o){isNaN(parseInt(o))||t.com.sendMessageToMap({type:"zoomToCoordinates",sessionToken:t.sessionToken,coordinates:[e,n],zoomLevel:o})})),f(c(t),"infoFromCoordinates",(function(e,n,o){var r=void 0===n?null:n;t.com.sendMessageToMap({type:"infoFromCoordinates",info:e,layer:r,hitTolerance:void 0!==o?parseInt(o):5,sessionToken:t.sessionToken})})),f(c(t),"Geolocalize",(function(e){t.com.sendMessageToMap({type:"Geolocalize",toggle:e,sessionToken:t.sessionToken})})),f(c(t),"toggleGiswaterTiled",(function(e){t.com.sendMessageToMap({type:"toggleGiswaterTiled",toggle:e,sessionToken:t.sessionToken})})),f(c(t),"reloadDisplayedLayers",(function(){return t.com.sendMessageToMap({type:"reloadDisplayedLayers",sessionToken:t.sessionToken})})),f(c(t),"addGeoJSON",(function(e,n,o){return e?t.com.sendMessageToMap({type:"addGeoJSON",geoJSON:e,options:void 0!==n?n:{fillcolor:null,strokecolor:null},name:o||Math.random().toString(36).substring(7),sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(c(t),"clearGeoJSON",(function(){return t.com.sendMessageToMap({type:"clearGeoJSON",sessionToken:t.sessionToken})})),f(c(t),"removeGeoJSONLayer",(function(e){return e?t.com.sendMessageToMap({type:"removeGeoJSONLayer",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(c(t),"setGiswaterFilters",(function(e){var n=e;if(e){if("object"!=s(e)){e=(e=(e=e.trim()).replace(/^\s+|\s+$/g,"")).replace(/\\/g,"");try{n=JSON.parse(e)}catch(e){return void t.emit("error",{error:"Filters is not a valid JSON"})}}return t.com.sendMessageToMap({type:"setGiswaterFilters",filters:n,sessionToken:t.sessionToken})}t.emit("error",{error:"No filters"})})),f(c(t),"getGiswaterLayerAvailableFilters",(function(e){return e?t.com.sendMessageToMap({type:"getGiswaterLayerAvailableFilters",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No layer_name"})})),f(c(t),"setDebug",(function(e){console.log("setDebug culo",e),isNaN(parseInt(e))?console.error("Debug is not a integer"):t.com.sendMessageToMap({type:"setDebug",what:e,sessionToken:t.sessionToken})})),t.domId="map-frame","undefined"==typeof window?a(t):("string"==typeof e.id&&(t.domId=e.id),t.com=new r(e),window.addEventListener("message",(function(e){return t.onMessageReceived(e)})),t.sessionToken=e.sessionToken,t)}return d}(e.EventEmitter)})(),o})()}));