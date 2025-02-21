!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VidroMaps=t():e.VidroMaps=t()}(self,(()=>(()=>{"use strict";var e={187:e=>{var t,o="object"==typeof Reflect?Reflect:null,n=o&&"function"==typeof o.apply?o.apply:function(e,t,o){return Function.prototype.apply.call(e,t,o)};t=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(o,n){function r(o){e.removeListener(t,s),n(o)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",r),o([].slice.call(arguments))}y(e,t,s,{once:!0}),"error"!==t&&function(e,t,o){"function"==typeof e.on&&y(e,"error",t,{once:!0})}(e,r)}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var i=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function c(e,t,o,n){var r,s,i,c;if(a(o),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,o.listener?o.listener:o),s=e._events),i=s[t]),void 0===i)i=s[t]=o,++e._eventsCount;else if("function"==typeof i?i=s[t]=n?[o,i]:[i,o]:n?i.unshift(o):i.push(o),(r=l(e))>0&&i.length>r&&!i.warned){i.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+i.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=i.length,c=u,console&&console.warn&&console.warn(c)}return e}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,o){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:o},r=u.bind(n);return r.listener=o,n.wrapFn=r,r}function p(e,t,o){var n=e._events;if(void 0===n)return[];var r=n[t];return void 0===r?[]:"function"==typeof r?o?[r.listener||r]:[r]:o?function(e){for(var t=new Array(e.length),o=0;o<t.length;++o)t[o]=e[o].listener||e[o];return t}(r):m(r,r.length)}function f(e){var t=this._events;if(void 0!==t){var o=t[e];if("function"==typeof o)return 1;if(void 0!==o)return o.length}return 0}function m(e,t){for(var o=new Array(t),n=0;n<t;++n)o[n]=e[n];return o}function y(e,t,o,n){if("function"==typeof e.on)n.once?e.once(t,o):e.on(t,o);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(s){n.once&&e.removeEventListener(t,r),o(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return i},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");i=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return l(this)},s.prototype.emit=function(e){for(var t=[],o=1;o<arguments.length;o++)t.push(arguments[o]);var r="error"===e,s=this._events;if(void 0!==s)r=r&&void 0===s.error;else if(!r)return!1;if(r){var i;if(t.length>0&&(i=t[0]),i instanceof Error)throw i;var a=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw a.context=i,a}var l=s[e];if(void 0===l)return!1;if("function"==typeof l)n(l,this,t);else{var c=l.length,u=m(l,c);for(o=0;o<c;++o)n(u[o],this,t)}return!0},s.prototype.addListener=function(e,t){return c(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return c(this,e,t,!0)},s.prototype.once=function(e,t){return a(t),this.on(e,d(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,d(this,e,t)),this},s.prototype.removeListener=function(e,t){var o,n,r,s,i;if(a(t),void 0===(n=this._events))return this;if(void 0===(o=n[e]))return this;if(o===t||o.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,o.listener||t));else if("function"!=typeof o){for(r=-1,s=o.length-1;s>=0;s--)if(o[s]===t||o[s].listener===t){i=o[s].listener,r=s;break}if(r<0)return this;0===r?o.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(o,r),1===o.length&&(n[e]=o[0]),void 0!==n.removeListener&&this.emit("removeListener",e,i||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,o,n;if(void 0===(o=this._events))return this;if(void 0===o.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==o[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete o[e]),this;if(0===arguments.length){var r,s=Object.keys(o);for(n=0;n<s.length;++n)"removeListener"!==(r=s[n])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=o[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},s.prototype.listeners=function(e){return p(this,e,!0)},s.prototype.rawListeners=function(e){return p(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):f.call(e,t)},s.prototype.listenerCount=f,s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{o.r(n),o.d(n,{Communicator:()=>T});var e=o(187);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i(n.key),n)}}function s(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e){var o=function(e,o){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(o)?o:String(o)}var a="undefined"==typeof window,l=s((function e(t){var o,n,r,s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o=this,r=function(e){a||window.top.frames[s.domId].postMessage(e,"*")},(n=i(n="sendMessageToMap"))in o?Object.defineProperty(o,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):o[n]=r,this.domId="map-frame","string"==typeof t.id&&(this.domId=t.id)}));function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,g(n.key),n)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,o){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}(e,t);if(n){var r=Object.getOwnPropertyDescriptor(n,t);return r.get?r.get.call(arguments.length<3?e:o):r.value}},d.apply(this,arguments)}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function f(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function v(e,t,o){return(t=g(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function g(e){var t=function(e,t){if("object"!==c(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,"string");if("object"!==c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===c(t)?t:String(t)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(i,e);var t,o,n,r,s=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(n);if(r){var o=y(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return f(this,e)});function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),v(m(t=s.call(this)),"onMessageReceived",(function(e){switch(e.data.type){case"onZoomChange":t.emitEvent("onZoomChange",e.data,e.data.domId);break;case"onCenterChange":t.emitEvent("onCenterChange",e.data,e.data.domId);break;case"geomAdded":t.emitEvent("geomAdded",e.data,e.data.domId);break;case"layers":t.emitEvent("layers",e.data,e.data.domId);break;case"geoJSONlayers":t.emitEvent("geoJSONlayers",e.data,e.data.domId);break;case"info":t.emitEvent("info",e.data,e.data.domId);break;case"error":t.emitEvent("error",e.data,e.data.domId);break;case"coordinates":t.emitEvent("coordinates",e.data,e.data.domId);break;case"activeLayer":t.emitEvent("activeLayer",e.data,e.data.domId);break;case"geolocation":t.emitEvent("geolocation",e.data,e.data.domId);break;case"WMSInfoAvailable":t.emitEvent("WMSInfoAvailable",e.data,e.data.domId);break;case"giswaterTiledBackgroundDisplayed":t.emitEvent("giswaterTiledBackgroundDisplayed",e.data,e.data.domId);break;case"giswaterTiledBackgroundAvailable":t.emitEvent("giswaterTiledBackgroundAvailable",e.data,e.data.domId);break;case"GiswaterLayerAvailableFilters":t.emitEvent("GiswaterLayerAvailableFilters",e.data,e.data.domId);break;case"loaded":t.emitEvent("loaded",e.data,e.data.domId);break;case"unloaded":t.emitEvent("unloaded",e.data,e.data.domId);break;case"availableWMSLayers":t.emitEvent("availableWMSLayers",e.data.layers,e.data.domId);break;case"layerElements":t.emitEvent("layerElements",e.data,e.data.domId);break;case"getToc":t.emitEvent("getToc",e.data,e.data.domId);break;case"status":t.emitEvent("status",e.data,e.data.domId);break;case"MeasureEnd":t.emitEvent("MeasureEnd",e.data,e.data.domId);break;case"queue":t.emitEvent("queue",e.data,e.data.domId);break;case"version":t.emitEvent("version",e.data,e.data.domId);break;case"hover":t.emitEvent("hover",e.data,e.data.domId);break;case"screenshot":t.emitEvent("screenshot",e.data,e.data.domId)}})),v(m(t),"emitEvent",(function(e,o,n){n===t.domId&&(delete o.domId,t.emit(e,o))})),v(m(t),"ZoomIn",(function(){t.com.sendMessageToMap({type:"zoomIn",sessionToken:t.sessionToken})})),v(m(t),"ZoomOut",(function(){t.com.sendMessageToMap({type:"zoomOut",sessionToken:t.sessionToken})})),v(m(t),"AddGeom",(function(e,o){t.com.sendMessageToMap({type:"AddGeom",geom:e,texts:null==o?void 0:o.texts,style:null==o?void 0:o.style,drawOnEnd:null==o?void 0:o.drawOnEnd,showConfirm:null==o?void 0:o.showConfirm,sessionToken:t.sessionToken})})),v(m(t),"CancelAddGeom",(function(e){t.com.sendMessageToMap({type:"CancelAddGeom"})})),v(m(t),"loadMultipleLayers",(function(e){void 0!==e?t.com.sendMessageToMap({type:"loadMultipleLayers",layers:e}):t.emit("error",{error:"no layers"})})),v(m(t),"toggleGroup",(function(e){t.com.sendMessageToMap({type:"toggleGroup",layers:e})})),v(m(t),"toggleLayer",(function(e,o){void 0===o&&(o={gutter:null,transparent:null,singletile:null,zIndex:null}),null!==o.singletile&&"boolean"!=typeof o.singletile&&(o.singletile=null,t.emit("error",{error:"singletile must be a Boolean",type:"error"})),""===o.gutter||null===o.gutter||o.singletile||(isNaN(parseInt(o.gutter))&&(o.gutter=null,t.emit("error",{type:"error",error:"Gutter must be a number"})),o.singletile&&(o.gutter=null,t.emit("error",{type:"error",error:"Gutter can only be user with multitile layers; set singletile to false"}))),null!==o.transparent&&"boolean"!=typeof o.transparent&&(o.transparent=null,t.emit("error",{type:"error",error:"transparent must be a Boolean"})),t.com.sendMessageToMap({type:"toggleLayer",layer:e,gutter:isNaN(parseInt(o.gutter))?null:parseInt(o.gutter),transparent:o.transparent,singletile:o.singletile,sessionToken:t.sessionToken,zIndex:isNaN(parseInt(o.zIndex))?null:parseInt(o.zIndex)})})),v(m(t),"removeLayer",(function(e){t.com.sendMessageToMap({type:"removeLayer",layer:e,sessionToken:t.sessionToken})})),v(m(t),"displayLayer",(function(e){t.com.sendMessageToMap({type:"displayLayer",layer:e,sessionToken:t.sessionToken})})),v(m(t),"setActiveLayer",(function(e){t.com.sendMessageToMap({type:"setActiveLayer",layer:e,sessionToken:t.sessionToken})})),v(m(t),"getActiveLayer",(function(){t.com.sendMessageToMap({type:"getActiveLayer",sessionToken:t.sessionToken})})),v(m(t),"bringLayerToTop",(function(e){t.com.sendMessageToMap({type:"bringLayerToTop",layer:e,sessionToken:t.sessionToken})})),v(m(t),"bringLayerToBottom",(function(e){t.com.sendMessageToMap({type:"bringLayerToBottom",layer:e,sessionToken:t.sessionToken})})),v(m(t),"loadWMSAvailableLayers",(function(){t.com.sendMessageToMap({type:"loadWMSAvailableLayers",sessionToken:t.sessionToken})})),v(m(t),"clear",(function(){t.com.sendMessageToMap({type:"clear",sessionToken:t.sessionToken})})),v(m(t),"Highlight",(function(e){t.com.sendMessageToMap({type:"highlight",geom:e.geom,zoom:e.zoom,metadata:null==e?void 0:e.data,center:void 0!==(null==e?void 0:e.center)&&e.center,animate:null==e?void 0:e.animate,style:null==e?void 0:e.style,sessionToken:t.sessionToken})})),v(m(t),"DrawGeometries",(function(e){void 0!==e?t.com.sendMessageToMap({type:"DrawGeometries",geoms:e}):t.emit("error",{type:"error",error:"no geoms"})})),v(m(t),"RemoveGeometriesByProperty",(function(e,o,n){void 0!==e&&void 0!==o&&void 0!==n?t.com.sendMessageToMap({type:"RemoveGeometriesByProperty",layer:e,property:o,value:n}):t.emit("error",{type:"error",error:"no layer, property or value"})})),v(m(t),"UpdateGeometriesByProperty",(function(e,o,n,r){void 0!==e&&void 0!==o&&void 0!==r&&void 0!==n?t.com.sendMessageToMap({type:"UpdateGeometriesByProperty",layer:e,property:o,value:n,style:r}):t.emit("error",{type:"error",error:"no layer, property or value"})})),v(m(t),"DrawGeometry",(function(e,o,n,r){console.warn("DrawGeometry is deprecated. Use DrawGeometries");var s={stroke_color:o.stroke_color?o.stroke_color:null,fill_color:o.fill_color?o.fill_color:null,point_fill_color:o.point_fill_color?o.point_fill_color:null,geom_radius:o.geom_radius?o.geom_radius:null,stroke_width:o.stroke_width?o.stroke_width:null,font_color:o.font_color?o.font_color:null,font:o.font?o.font:null,font_size:o.font_size?o.font_size:null,placement:o.placement?o.placement:null,fontFillColor:o.fontFillColor?o.fontFillColor:null,fontStrokeColor:o.fontStrokeColor?o.fontStrokeColor:null,fontStrokeWidth:o.fontStrokeWidth?o.fontStrokeWidth:null,baseline:o.baseline?o.baseline:null,align:o.align?o.align:null,display:o.display?o.display:null,offsetY:o.offsetY?o.offsetY:null};t.com.sendMessageToMap({type:"drawGeometry",geom:e,style:s,name:n||"highlight",id:r||Math.floor(1e3*Math.random())+1,sessionToken:t.sessionToken})})),v(m(t),"RemoveGeometry",(function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=void 0===e?null:e;if(!n)return console.error("No element id"),void t.emit("error",{type:"error",error:"No element id"});t.com.sendMessageToMap({type:"removeGeometry",layer:o,id:n})})),v(m(t),"zoomToExtent",(function(){t.com.sendMessageToMap({type:"zoomToExtent",sessionToken:t.sessionToken})})),v(m(t),"zoomToScale",(function(e){var o=["1:100","1:200","1:400","1:500","1:1000","1:2000","1:5000","1:10000","1:50000"];if(!o.includes(e))return console.error("Invalid scale: ".concat(e,". Allowed values are: ").concat(o.join(", "))),void t.emit("error",{type:"error",error:"Invalid scale: ".concat(e)});t.com.sendMessageToMap({type:"zoomToScale",sessionToken:t.sessionToken,scale:e})})),v(m(t),"zoomToCoordinates",(function(e,o,n){isNaN(parseInt(n))||t.com.sendMessageToMap({type:"zoomToCoordinates",sessionToken:t.sessionToken,coordinates:[e,o],zoomLevel:n})})),v(m(t),"zoomToGeometry",(function(e,o){t.com.sendMessageToMap({type:"zoomToGeometry",sessionToken:t.sessionToken,geom:e,limits:o})})),v(m(t),"infoFromCoordinates",(function(e,o,n,r){var s=void 0===o?null:o,i=void 0!==n&&n?parseInt(n):5,a=void 0===r?"xml":r.toLowerCase();"xml"===a||"json"===a?isNaN(i)?console.error("hitTolerance must be a number"):t.com.sendMessageToMap({type:"infoFromCoordinates",info:e,layer:s,format:a,hitTolerance:i,sessionToken:t.sessionToken}):console.error("Format must be 'xml' or 'json")})),v(m(t),"getElementsFromLayer",(function(e,o,n){var r=void 0===n?"xml":n.toLowerCase();if("xml"===r||"json"===r)if(isNaN(o))console.error("Limit must be a number");else{var s=void 0===e?null:e;t.com.sendMessageToMap({type:"getElementsFromLayer",layer:s,limit:void 0!==o?parseInt(o):100,format:n,sessionToken:t.sessionToken})}else console.error("Format must be 'xml' or 'json")})),v(m(t),"Geolocalize",(function(e,o){t.com.sendMessageToMap({type:"Geolocalize",toggle:e,options:o,sessionToken:t.sessionToken})})),v(m(t),"toggleGiswaterTiled",(function(e,o){t.com.sendMessageToMap({type:"toggleTiled",toggle:e,tiled:o,sessionToken:t.sessionToken})})),v(m(t),"toggleTiled",(function(e,o){t.com.sendMessageToMap({type:"toggleTiled",toggle:e,tiled:o,sessionToken:t.sessionToken})})),v(m(t),"getTiled",(function(){t.com.sendMessageToMap({type:"getTiled",sessionToken:t.sessionToken})})),v(m(t),"toggleSecondaryBackground",(function(e){t.com.sendMessageToMap({type:"toggleSecondaryBackground",toggle:e})})),v(m(t),"getSecondaryBackground",(function(){t.com.sendMessageToMap({type:"getSecondaryBackground",sessionToken:t.sessionToken})})),v(m(t),"reloadDisplayedLayers",(function(){return t.com.sendMessageToMap({type:"reloadDisplayedLayers",sessionToken:t.sessionToken})})),v(m(t),"addGeoJSON",(function(e,o,n){return e?t.com.sendMessageToMap({type:"addGeoJSON",geoJSON:e,options:void 0!==o?o:{fillcolor:null,strokecolor:null},name:n||Math.random().toString(36).substring(7),sessionToken:t.sessionToken}):void t.emit("error",{type:"error",error:"No geoJSON data"})})),v(m(t),"clearGeoJSON",(function(){return t.com.sendMessageToMap({type:"clearGeoJSON",sessionToken:t.sessionToken})})),v(m(t),"removeGeoJSONLayer",(function(e){return e?t.com.sendMessageToMap({type:"removeGeoJSONLayer",name:e,sessionToken:t.sessionToken}):void t.emit("error",{type:"error",error:"No geoJSON data"})})),v(m(t),"setGiswaterFilters",(function(e){var o=e;if(e){if("object"!=c(e)){e=(e=(e=e.trim()).replace(/^\s+|\s+$/g,"")).replace(/\\/g,"");try{o=JSON.parse(e)}catch(e){return void t.emit("error",{type:"error",error:"Filters is not a valid JSON"})}}return t.com.sendMessageToMap({type:"setGiswaterFilters",filters:o,sessionToken:t.sessionToken})}t.emit("error",{type:"error",error:"No filters"})})),v(m(t),"setFilters",(function(e){var o=e;if(e){if("object"!=c(e)){e=(e=(e=e.trim()).replace(/^\s+|\s+$/g,"")).replace(/\\/g,"");try{o=JSON.parse(e)}catch(e){return void t.emit("error",{type:"error",error:"Filters is not a valid JSON"})}}return o.every((function(e){return Array.isArray(e.filters)}))?t.com.sendMessageToMap({type:"setFilters",filters:o,sessionToken:t.sessionToken}):void t.emit("error",{type:"error",error:"Filters is not a valid JSON - missing filters array"})}t.emit("error",{type:"error",error:"No filters"})})),v(m(t),"getGiswaterLayerAvailableFilters",(function(e){return e?t.com.sendMessageToMap({type:"getGiswaterLayerAvailableFilters",name:e,sessionToken:t.sessionToken}):void t.emit("error",{type:"error",error:"No layer_name"})})),v(m(t),"CenterMap",(function(e,o){t.com.sendMessageToMap({type:"centerMap",coordinates:[e,o]})})),v(m(t),"getToc",(function(){return t.com.sendMessageToMap({type:"getToc",sessionToken:t.sessionToken})})),v(m(t),"setDebug",(function(e){isNaN(parseInt(e))?console.error("Debug is not a integer"):t.com.sendMessageToMap({type:"setDebug",what:e,sessionToken:t.sessionToken})})),v(m(t),"setCustomColors",(function(e){if("object"===c(e)){if(e.hasOwnProperty("geom_stroke_width")){if(isNaN(parseInt(e.geom_stroke_width)))return void console.error("geom_stroke_width is not an number");e.geom_stroke_width=parseInt(e.geom_stroke_width)}else e.geom_stroke_width=1;if(e.hasOwnProperty("geom_radius")){if(isNaN(parseInt(e.geom_radius)))return void console.error("geom_stroke_width is not an number");e.geom_radius=parseInt(e.geom_radius)}else e.geom_radius=4;e.hasOwnProperty("geom_shape")&&"circle"!==e.geom_shape&&"square"!==e.geom_shape&&(e.geom_shape="circle",console.error("geom_shape must be either 'circle' or 'square'")),t.com.sendMessageToMap({type:"setCustomColors",properties:e,sessionToken:t.sessionToken})}else console.error("properties is not an object")})),v(m(t),"changeBackground",(function(e){return t.com.sendMessageToMap({type:"changeBackground",sessionToken:t.sessionToken,newBackground:e})})),v(m(t),"getBackground",(function(){t.com.sendMessageToMap({type:"getBackground",sessionToken:t.sessionToken})})),v(m(t),"initMeasure",(function(e,o,n){return t.com.sendMessageToMap({type:"initMeasure",sessionToken:t.sessionToken,measure:e,textStart:o,textContinue:n})})),v(m(t),"cancelMeasure",(function(){return t.com.sendMessageToMap({type:"cancelMeasure",sessionToken:t.sessionToken})})),v(m(t),"setBboxSize",(function(e){isNaN(parseInt(e))?console.error("bbox is not a integer"):t.com.sendMessageToMap({type:"setBoundingBoxSize",bbox:e,sessionToken:t.sessionToken})})),v(m(t),"addIcon",(function(e){var o=e.icon,n=e.coordinates;o instanceof ArrayBuffer||t.emit("error",{type:"error",error:"Invalid icon: Expected an ArrayBuffer."}),Array.isArray(n)||t.emit("error",{type:"error",error:"Invalid coordinates: Expected an array [longitude, latitude]."}),2===n.length&&"number"==typeof n[0]&&"number"==typeof n[1]||t.emit("error",{type:"error",error:"Invalid coordinates: Expected an array with two numeric values [longitude, latitude]."}),t.com.sendMessageToMap({type:"AddIcon",icon:o,coordinates:n,sessionToken:t.sessionToken})})),v(m(t),"screenshot",(function(e){t.com.sendMessageToMap({type:"screenshot",options:e,sessionToken:t.sessionToken})})),t.domId="map-frame","undefined"==typeof window?f(t):("string"==typeof e.id&&(t.domId=e.id),t.com=new l(e),window.addEventListener("message",(function(e){return t.onMessageReceived(e)})),t.sessionToken=e.sessionToken,t)}return t=i,(o=[{key:"removeListener",value:function(e,t){d(y(i.prototype),"removeListener",this).call(this,e,t)}}])&&u(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),i}(e.EventEmitter)})(),n})()));