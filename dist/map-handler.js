!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VidroMaps=t():e.VidroMaps=t()}(self,(function(){return(()=>{"use strict";var e={187:e=>{var t,n="object"==typeof Reflect?Reflect:null,o=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(n,o){function r(n){e.removeListener(t,i),o(n)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,r)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function c(e,t,n,o){var r,i,s,c;if(a(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=o?[n,s]:[s,n]:o?s.unshift(n):s.push(n),(r=u(e))>0&&s.length>r&&!s.warned){s.warned=!0;var f=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");f.name="MaxListenersExceededWarning",f.emitter=e,f.type=t,f.count=s.length,c=f,console&&console.warn&&console.warn(c)}return e}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function l(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=f.bind(o);return r.listener=n,o.wrapFn=r,r}function p(e,t,n){var o=e._events;if(void 0===o)return[];var r=o[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):d(r,r.length)}function y(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function d(e,t){for(var n=new Array(t),o=0;o<t;++o)n[o]=e[o];return n}function v(e,t,n,o){if("function"==typeof e.on)o.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(i){o.once&&e.removeEventListener(t,r),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return u(this)},i.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)o(u,this,t);else{var c=u.length,f=d(u,c);for(n=0;n<c;++n)o(f[n],this,t)}return!0},i.prototype.addListener=function(e,t){return c(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return c(this,e,t,!0)},i.prototype.once=function(e,t){return a(t),this.on(e,l(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,l(this,e,t)),this},i.prototype.removeListener=function(e,t){var n,o,r,i,s;if(a(t),void 0===(o=this._events))return this;if(void 0===(n=o[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,r=i;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(o[e]=n[0]),void 0!==o.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,n,o;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,i=Object.keys(n);for(o=0;o<i.length;++o)"removeListener"!==(r=i[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(o=t.length-1;o>=0;o--)this.removeListener(e,t[o]);return this},i.prototype.listeners=function(e){return p(this,e,!0)},i.prototype.rawListeners=function(e){return p(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):y.call(e,t)},i.prototype.listenerCount=y,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{n.r(o),n.d(o,{Communicator:()=>l});var e=n(187),t="undefined"==typeof window,r=function(e){t||window.top.frames["map-frame"].postMessage(e,"*")};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?u(e):t}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(l,e);var t,n,o=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,o=c(t);if(n){var r=c(this).constructor;e=Reflect.construct(o,arguments,r)}else e=o.apply(this,arguments);return a(this,e)});function l(e){var t,n=e.sessionToken;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),f(u(t=o.call(this)),"onMessageReceived",(function(e){switch(e.data.type){case"onZoomChange":t.emit("onZoomChange",e.data.zoom);break;case"geomAdded":t.emit("geomAdded",e.data.geom_astext);break;case"layers":t.emit("layers",e.data.layers);break;case"geoJSONlayers":t.emit("geoJSONlayers",e.data.layers);break;case"info":t.emit("info",e.data);break;case"error":t.emit("error",e.data);break;case"coordinates":t.emit("coordinates",e.data);break;case"activeLayer":t.emit("activeLayer",e.data);break;case"geolocation":t.emit("geolocation",e.data);break;case"WMSInfoAvailable":t.emit("WMSInfoAvailable",e.data);break;case"giswaterTiledBackgroundDisplayed":t.emit("giswaterTiledBackgroundDisplayed",e.data);break;case"giswaterTiledBackgroundAvailable":t.emit("giswaterTiledBackgroundAvailable",e.data);break;case"GiswaterLayerAvailableFilters":t.emit("GiswaterLayerAvailableFilters",e.data)}})),f(u(t),"ZoomIn",(function(){r({type:"zoomIn",sessionToken:t.sessionToken})})),f(u(t),"ZoomOut",(function(){r({type:"zoomOut",sessionToken:t.sessionToken})})),f(u(t),"AddGeom",(function(e){r({type:"AddGeom",geom:e,sessionToken:t.sessionToken})})),f(u(t),"toggleLayer",(function(e){r({type:"toggleLayer",layer:e,sessionToken:t.sessionToken})})),f(u(t),"setActiveLayer",(function(e){r({type:"setActiveLayer",layer:e,sessionToken:t.sessionToken})})),f(u(t),"getActiveLayer",(function(){r({type:"getActiveLayer",sessionToken:t.sessionToken})})),f(u(t),"clear",(function(){r({type:"clear",sessionToken:t.sessionToken})})),f(u(t),"Highlight",(function(e){r({type:"highlight",geom:e.geom,zoom:e.zoom,sessionToken:t.sessionToken})})),f(u(t),"zoomToExtent",(function(){r({type:"zoomToExtent",sessionToken:t.sessionToken})})),f(u(t),"infoFromCoordinates",(function(e,n,o){r({type:"infoFromCoordinates",info:e,layer:void 0===n?null:n,hitTolerance:void 0!==o?parseInt(o):5,sessionToken:t.sessionToken})})),f(u(t),"Geolocalize",(function(e){r({type:"Geolocalize",toggle:e,sessionToken:t.sessionToken})})),f(u(t),"toggleGiswaterTiled",(function(e){r({type:"toggleGiswaterTiled",toggle:e,sessionToken:t.sessionToken})})),f(u(t),"reloadDisplayedLayers",(function(){return r({type:"reloadDisplayedLayers",sessionToken:t.sessionToken})})),f(u(t),"addGeoJSON",(function(e,n,o){return e?r({type:"addGeoJSON",geoJSON:e,options:void 0!==n?n:{fillcolor:null,strokecolor:null},name:o||Math.random().toString(36).substring(7),sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(u(t),"clearGeoJSON",(function(){return r({type:"clearGeoJSON",sessionToken:t.sessionToken})})),f(u(t),"removeGeoJSONLayer",(function(e){return e?r({type:"removeGeoJSONLayer",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No geoJSON data"})})),f(u(t),"setGiswaterFilters",(function(e){var n=e;if(e){if("object"!=i(e)){e=(e=(e=e.trim()).replace(/^\s+|\s+$/g,"")).replace(/\\/g,"");try{n=JSON.parse(e)}catch(e){return void t.emit("error",{error:"Filters is not a valid JSON"})}}return r({type:"setGiswaterFilters",filters:n,sessionToken:t.sessionToken})}t.emit("error",{error:"No filters"})})),f(u(t),"getGiswaterLayerAvailableFilters",(function(e){return e?r({type:"getGiswaterLayerAvailableFilters",name:e,sessionToken:t.sessionToken}):void t.emit("error",{error:"No layer_name"})})),"undefined"==typeof window?a(t):(window.addEventListener("message",(function(e){return t.onMessageReceived(e)})),t.sessionToken=n,t)}return l}(e.EventEmitter)})(),o})()}));