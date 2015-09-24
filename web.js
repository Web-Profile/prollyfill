



/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.0.0
 */

(function(){function r(a,b){n[l]=a;n[l+1]=b;l+=2;2===l&&A()}function s(a){return"function"===typeof a}function F(){return function(){process.nextTick(t)}}function G(){var a=0,b=new B(t),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}function H(){var a=new MessageChannel;a.port1.onmessage=t;return function(){a.port2.postMessage(0)}}function I(){return function(){setTimeout(t,1)}}function t(){for(var a=0;a<l;a+=2)(0,n[a])(n[a+1]),n[a]=void 0,n[a+1]=void 0;
l=0}function p(){}function J(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function K(a,b,c){r(function(a){var e=!1,f=J(c,b,function(c){e||(e=!0,b!==c?q(a,c):m(a,c))},function(b){e||(e=!0,g(a,b))});!e&&f&&(e=!0,g(a,f))},a)}function L(a,b){1===b.a?m(a,b.b):2===a.a?g(a,b.b):u(b,void 0,function(b){q(a,b)},function(b){g(a,b)})}function q(a,b){if(a===b)g(a,new TypeError("You cannot resolve a promise with itself"));else if("function"===typeof b||"object"===typeof b&&null!==b)if(b.constructor===a.constructor)L(a,
b);else{var c;try{c=b.then}catch(d){v.error=d,c=v}c===v?g(a,v.error):void 0===c?m(a,b):s(c)?K(a,b,c):m(a,b)}else m(a,b)}function M(a){a.f&&a.f(a.b);x(a)}function m(a,b){void 0===a.a&&(a.b=b,a.a=1,0!==a.e.length&&r(x,a))}function g(a,b){void 0===a.a&&(a.a=2,a.b=b,r(M,a))}function u(a,b,c,d){var e=a.e,f=e.length;a.f=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.a&&r(x,a)}function x(a){var b=a.e,c=a.a;if(0!==b.length){for(var d,e,f=a.b,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?C(c,d,e,f):e(f);a.e.length=0}}function D(){this.error=
null}function C(a,b,c,d){var e=s(c),f,k,h,l;if(e){try{f=c(d)}catch(n){y.error=n,f=y}f===y?(l=!0,k=f.error,f=null):h=!0;if(b===f){g(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=d,h=!0;void 0===b.a&&(e&&h?q(b,f):l?g(b,k):1===a?m(b,f):2===a&&g(b,f))}function N(a,b){try{b(function(b){q(a,b)},function(b){g(a,b)})}catch(c){g(a,c)}}function k(a,b,c,d){this.n=a;this.c=new a(p,d);this.i=c;this.o(b)?(this.m=b,this.d=this.length=b.length,this.l(),0===this.length?m(this.c,
this.b):(this.length=this.length||0,this.k(),0===this.d&&m(this.c,this.b))):g(this.c,this.p())}function h(a){O++;this.b=this.a=void 0;this.e=[];if(p!==a){if(!s(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof h))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");N(this,a)}}var E=Array.isArray?Array.isArray:function(a){return"[object Array]"===
Object.prototype.toString.call(a)},l=0,w="undefined"!==typeof window?window:{},B=w.MutationObserver||w.WebKitMutationObserver,w="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,n=Array(1E3),A;A="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)?F():B?G():w?H():I();var v=new D,y=new D;k.prototype.o=function(a){return E(a)};k.prototype.p=function(){return Error("Array Methods must be provided an Array")};k.prototype.l=
function(){this.b=Array(this.length)};k.prototype.k=function(){for(var a=this.length,b=this.c,c=this.m,d=0;void 0===b.a&&d<a;d++)this.j(c[d],d)};k.prototype.j=function(a,b){var c=this.n;"object"===typeof a&&null!==a?a.constructor===c&&void 0!==a.a?(a.f=null,this.g(a.a,b,a.b)):this.q(c.resolve(a),b):(this.d--,this.b[b]=this.h(a))};k.prototype.g=function(a,b,c){var d=this.c;void 0===d.a&&(this.d--,this.i&&2===a?g(d,c):this.b[b]=this.h(c));0===this.d&&m(d,this.b)};k.prototype.h=function(a){return a};
k.prototype.q=function(a,b){var c=this;u(a,void 0,function(a){c.g(1,b,a)},function(a){c.g(2,b,a)})};var O=0;h.all=function(a,b){return(new k(this,a,!0,b)).c};h.race=function(a,b){function c(a){q(e,a)}function d(a){g(e,a)}var e=new this(p,b);if(!E(a))return (g(e,new TypeError("You must pass an array to race.")), e);for(var f=a.length,h=0;void 0===e.a&&h<f;h++)u(this.resolve(a[h]),void 0,c,d);return e};h.resolve=function(a,b){if(a&&"object"===typeof a&&a.constructor===this)return a;var c=new this(p,b);
q(c,a);return c};h.reject=function(a,b){var c=new this(p,b);g(c,a);return c};h.prototype={constructor:h,then:function(a,b){var c=this.a;if(1===c&&!a||2===c&&!b)return this;var d=new this.constructor(p),e=this.b;if(c){var f=arguments[c-1];r(function(){C(c,d,f,e)})}else u(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}};var z={Promise:h,polyfill:function(){var a;a="undefined"!==typeof global?global:"undefined"!==typeof window&&window.document?window:self;"Promise"in a&&"resolve"in
a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;new a.Promise(function(a){b=a});return s(b)}()||(a.Promise=h)}};"function"===typeof define&&define.amd?define(function(){return z}):"undefined"!==typeof module&&module.exports?module.exports=z:"undefined"!==typeof this&&(this.ES6Promise=z)}).call(this);


/* FETCH */

!function(){"use strict";function t(e){this.map={};var o=this;e instanceof t?e.forEach(function(t,e){e.forEach(function(e){o.append(t,e)})}):e&&Object.getOwnPropertyNames(e).forEach(function(t){o.append(t,e[t])})}function e(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function o(t){return new Promise(function(e,o){t.onload=function(){e(t.result)},t.onerror=function(){o(t.error)}})}function r(t){var e=new FileReader;return e.readAsArrayBuffer(t),o(e)}function n(t){var e=new FileReader;return e.readAsText(t),o(e)}function s(){return this.bodyUsed=!1,d.blob?(this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(d.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(d.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else{if(t)throw new Error("unsupported BodyInit type");this._bodyText=""}},this.blob=function(){var t=e(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(r)},this.text=function(){var t=e(this);if(t)return t;if(this._bodyBlob)return n(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):(this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(d.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else{if(t)throw new Error("unsupported BodyInit type");this._bodyText=""}},this.text=function(){var t=e(this);return t?t:Promise.resolve(this._bodyText)}),d.formData&&(this.formData=function(){return this.text().then(u)}),this.json=function(){return this.text().then(JSON.parse)},this}function i(t){var e=t.toUpperCase();return p.indexOf(e)>-1?e:t}function a(e,o){if(o=o||{},this.url=e,this.credentials=o.credentials||"omit",this.headers=new t(o.headers),this.method=i(o.method||"GET"),this.mode=o.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o.body)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o.body)}function u(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var o=t.split("="),r=o.shift().replace(/\+/g," "),n=o.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(n))}}),e}function f(e){var o=new t,r=e.getAllResponseHeaders().trim().split("\n");return r.forEach(function(t){var e=t.trim().split(":"),r=e.shift().trim(),n=e.join(":").trim();o.append(r,n)}),o}function h(t,e){e||(e={}),this._initBody(t),this.type="default",this.url=null,this.status=e.status,this.statusText=e.statusText,this.headers=e.headers,this.url=e.url||""}if(!self.fetch){t.prototype.append=function(t,e){t=t.toLowerCase();var o=this.map[t];o||(o=[],this.map[t]=o),o.push(e)},t.prototype["delete"]=function(t){delete this.map[t.toLowerCase()]},t.prototype.get=function(t){var e=this.map[t.toLowerCase()];return e?e[0]:null},t.prototype.getAll=function(t){return this.map[t.toLowerCase()]||[]},t.prototype.has=function(t){return this.map.hasOwnProperty(t.toLowerCase())},t.prototype.set=function(t,e){this.map[t.toLowerCase()]=[e]},t.prototype.forEach=function(t){var e=this;Object.getOwnPropertyNames(this.map).forEach(function(o){t(o,e.map[o])})};var d={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self},p=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];a.prototype.fetch=function(){var t=this;return new Promise(function(e,o){function r(){return"responseURL"in n?n.responseURL:/^X-Request-URL:/m.test(n.getAllResponseHeaders())?n.getResponseHeader("X-Request-URL"):void 0}var n=new XMLHttpRequest;"cors"===t.credentials&&(n.withCredentials=!0),n.onload=function(){var t=1223===n.status?204:n.status;if(100>t||t>599)return void o(new TypeError("Network request failed"));var s={status:t,statusText:n.statusText,headers:f(n),url:r()},i="response"in n?n.response:n.responseText;e(new h(i,s))},n.onerror=function(){o(new TypeError("Network request failed"))},n.open(t.method,t.url,!0),"responseType"in n&&d.blob&&(n.responseType="blob"),t.headers.forEach(function(t,e){e.forEach(function(e){n.setRequestHeader(t,e)})}),n.send("undefined"==typeof t._bodyInit?null:t._bodyInit)})},s.call(a.prototype),s.call(h.prototype),self.Headers=t,self.Request=a,self.Response=h,self.fetch=function(t,e){return new a(t,e).fetch()},self.fetch.polyfill=!0}}();


(function(){

  var transactions = {};
  var transactionID = 0;
  var frameWindow;
  var frameLoaded = false;
  var frame = document.createElement('iframe');
      frame.style.position = 'absolute';
      frame.style.top = '-1px';
      frame.style.left = '-1px';
      frame.style.opacity = '0';
      frame.style.width = '0px';
      frame.style.height = '0px';
      frame.style.border = 'none';

  function post(obj){
    frameWindow.postMessage(JSON.stringify(obj), '*');
  }


  function setWebProfile(key, value){
    var obj = JSON.parse(localStorage.webProfile || '{}');
    obj[key] = value;
    localStorage.webProfile = JSON.stringify(obj);
  }

  function getWebProfile(key){
    var obj = JSON.parse(localStorage.webProfile || '{}');
    return key ? obj[key] : obj;
  }

  window.addEventListener('message', function(event){
    var data = JSON.parse(event.data);
    transactions[data.transaction].resolve(data.response);
  });

  navigator.webProfile = {
    connectedProfile: getWebProfile('connectedProfile'),
    registerProvider: function(name, uri){
      navigator.registerProtocolHandler('web+profile', uri || location.origin + '/.well-known/web-profile.html', name);
    },
    connect: function(){
      var id = transactionID++;
      var transaction = transactions[id] = {}
      transaction.promise = new Promise(function(resolve, reject){
        transaction.resolve = resolve;
        transaction.reject = reject;
        if (frameWindow && frame.src == 'web+profile:#') {
            post({
              transaction: id,
              action: 'connect'
            });
        }
        else if (!frameLoaded) {
          frame.onload = function(event){
            frameWindow = this.contentWindow;
            post({
              transaction: id,
              action: 'connect'
            });
          }
          frame.src = 'web+profile:#';
          document.body.appendChild(frame);
          frameLoaded = true;
        }
      });
      transaction.promise.then(function(username){
        setWebProfile('connectedProfile', username);
        navigator.webProfile.connectedProfile = username;
      });
      return transaction.promise;
    },
    authenticate: function(){

    },
    getProfile: function(username){

      /*
        This should be performed by the browser,
        platform, or OS so it comes directly from
        the blockchain instead of relying on a
        third-party middleman.
      */

      var name = username || this.connectedProfile;
      return fetch('https://api.onename.com/v1/users/' + name + '?app-id=11783753c820c2004667f4b17efb376d&app-secret=a31496483fa18b96b39845d66d62d15d37f5eea29aca6f161b2f6bcc0a7d8d91')
             .then(function(response){
               return response.json();
             }).then(function(json){
               return json[name].profile;
             });
    }
  };

})();