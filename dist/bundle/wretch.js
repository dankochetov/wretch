!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):t.wretch=r()}(this,function(){"use strict";const t=Object.assign||function(t){for(var r,e=1;e<arguments.length;e++){r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};var r=function(e,n,o){if(void 0===o&&(o=!1),!e||!n||"object"!=typeof e||"object"!=typeof n)return e;var i=t({},e);for(var s in n)n.hasOwnProperty(s)&&(n[s]instanceof Array&&e[s]instanceof Array?i[s]=o?e[s].concat(n[s]):n[s]:"object"==typeof n[s]&&"object"==typeof e[s]?i[s]=r(e[s],n[s],o):i[s]=n[s]);return i},e={defaults:{},errorType:null,polyfills:{fetch:null,FormData:null,URLSearchParams:null,performance:null,PerformanceObserver:null,AbortController:null},polyfill:function(t,r,e){void 0===r&&(r=!0),void 0===e&&(e=!1);for(var n=[],o=3;o<arguments.length;o++)n[o-3]=arguments[o];var i=this.polyfills[t]||("undefined"!=typeof self?self[t]:null)||("undefined"!=typeof global?global[t]:null);if(r&&!i)throw new Error(t+" is not defined");return e&&i?new(i.bind.apply(i,[void 0].concat(n))):i}},n=function(t,r,e,n){var o=t.getEntriesByName(r);return!!(o&&o.length>0)&&(e(o.reverse()[0]),n.clearMeasures(r),i.callbacks.delete(r),i.callbacks.size<1&&(i.observer.disconnect(),n.clearResourceTimings&&n.clearResourceTimings()),!0)},o=function(t,r){return!i.observer&&t&&r&&(i.observer=new r(function(r){i.callbacks.forEach(function(e,o){n(r,o,e,t)})}),t.clearResourceTimings&&t.clearResourceTimings()),i.observer},i={callbacks:new Map,observer:null,observe:function(t,r){if(t&&r){var s=e.polyfill("performance",!1),u=e.polyfill("PerformanceObserver",!1);o(s,u)&&(n(s,t,r,s)||(i.callbacks.size<1&&i.observer.observe({entryTypes:["resource","measure"]}),i.callbacks.set(t,r)))}}},s=function(t){return function(n){return void 0===n&&(n=new Map),function(o){void 0===o&&(o={});var s=r(e.defaults,o),u=e.polyfill("AbortController",!1,!0);!s.signal&&u&&(s.signal=u.signal);var c=e.polyfill("fetch")(t,s),f=c.then(function(t){return t.ok?t:t[e.errorType||"text"]().then(function(r){var n=new Error(r);throw n[e.errorType]=r,n.status=t.status,n.response=t,n})}),a=new Map,l=function(t){return t.catch(function(t){if(n.has(t.status))n.get(t.status)(t);else{if(!a.has(t.name))throw t;a.get(t.name)(t)}})},p=function(t){return function(r){return l(t?f.then(function(r){return r&&r[t]()}).then(function(t){return t&&r&&r(t)||t}):f.then(function(t){return t&&r&&r(t)||t}))}},h={res:p(null),json:p("json"),blob:p("blob"),formData:p("formData"),arrayBuffer:p("arrayBuffer"),text:p("text"),perfs:function(t){return c.then(function(r){return i.observe(r.url,t)}),h},setTimeout:function(t,r){return void 0===r&&(r=u),setTimeout(function(){return r.abort()},t),h},controller:function(){return[u,h]},error:function(t,r){return"string"==typeof t?a.set(t,r):n.set(t,r),h},badRequest:function(t){return h.error(400,t)},unauthorized:function(t){return h.error(401,t)},forbidden:function(t){return h.error(403,t)},notFound:function(t){return h.error(404,t)},timeout:function(t){return h.error(408,t)},internalError:function(t){return h.error(500,t)},onAbort:function(t){return h.error("AbortError",t)}};return h}}},u=function(){function n(t,r,e){void 0===r&&(r={}),void 0===e&&(e=new Map),this._url=t,this._options=r,this._catchers=e}return n.factory=function(t,r){return void 0===t&&(t=""),void 0===r&&(r={}),new n(t,r)},n.prototype.selfFactory=function(t){var r=void 0===t?{}:t,e=r.url,o=void 0===e?this._url:e,i=r.options,s=void 0===i?this._options:i,u=r.catchers;return new n(o,s,void 0===u?this._catchers:u)},n.prototype.defaults=function(t,n){return void 0===n&&(n=!1),e.defaults=n?e.defaults=r(e.defaults,t):t,this},n.prototype.errorType=function(t){return e.errorType=t,this},n.prototype.polyfills=function(r){return e.polyfills=t({},e.polyfills,r),this},n.prototype.url=function(t,r){return void 0===r&&(r=!1),r?this.selfFactory({url:t}):this.selfFactory({url:this._url+t})},n.prototype.options=function(t,e){return void 0===e&&(e=!1),this.selfFactory({options:e?r(this._options,t):t})},n.prototype.query=function(t){return this.selfFactory({url:c(this._url,t)})},n.prototype.headers=function(t){return this.selfFactory({options:r(this._options,{headers:t})})},n.prototype.accept=function(t){return this.headers({Accept:t})},n.prototype.content=function(t){return this.headers({"Content-Type":t})},n.prototype.catcher=function(t,r){var e=new Map(this._catchers);return e.set(t,r),this.selfFactory({catchers:e})},n.prototype.signal=function(r){return this.selfFactory({options:t({},this._options,{signal:r.signal})})},n.prototype.get=function(t){return void 0===t&&(t={}),s(this._url)(this._catchers)(r(t,this._options))},n.prototype.delete=function(e){return void 0===e&&(e={}),s(this._url)(this._catchers)(t({},r(e,this._options),{method:"DELETE"}))},n.prototype.put=function(e){return void 0===e&&(e={}),s(this._url)(this._catchers)(t({},r(e,this._options),{method:"PUT"}))},n.prototype.post=function(e){return void 0===e&&(e={}),s(this._url)(this._catchers)(t({},r(e,this._options),{method:"POST"}))},n.prototype.patch=function(e){return void 0===e&&(e={}),s(this._url)(this._catchers)(t({},r(e,this._options),{method:"PATCH"}))},n.prototype.body=function(r){return this.selfFactory({options:t({},this._options,{body:r})})},n.prototype.json=function(t){return this.content("application/json").body(JSON.stringify(t))},n.prototype.formData=function(t){return this.body(f(t))},n.prototype.formUrl=function(t){return this.body("string"==typeof t?t:a(t)).content("application/x-www-form-urlencoded")},n}(),c=function(t,r){var n=e.polyfill("URLSearchParams",!0,!0),o=t.indexOf("?");for(var i in r)if(r[i]instanceof Array)for(var s=0,u=r[i];s<u.length;s++){var c=u[s];n.append(i,c)}else n.append(i,r[i]);return~o?t.substring(0,o)+"?"+n.toString():t+"?"+n.toString()},f=function(t){var r=e.polyfill("FormData",!0,!0);for(var n in t)if(t[n]instanceof Array)for(var o=0,i=t[n];o<i.length;o++){var s=i[o];r.append(n+"[]",s)}else r.append(n,t[n]);return r},a=function(t){return Object.keys(t).map(function(r){return encodeURIComponent(r)+"="+encodeURIComponent("object"==typeof t[r]?JSON.stringify(t[r]):t[r])}).join("&")};return u.factory});
//# sourceMappingURL=wretch.js.map
