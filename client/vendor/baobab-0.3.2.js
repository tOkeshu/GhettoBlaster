/* baobab.js - Version: 0.3.2 - Author: Yomguithereal (Guillaume Plique) */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Baobab=t()}}(function(){var t;return function e(t,r,n){function o(s,a){if(!r[s]){if(!t[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[s]={exports:{}};t[s][0].call(c.exports,function(e){var r=t[s][1][e];return o(r?r:e)},c,c.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e){e.exports={autoCommit:!0,asynchronous:!0,clone:!1,cloningFunction:null,cursorSingletons:!0,maxHistory:0,mixins:[],shiftReferences:!1,typology:null,validate:null}},{}],2:[function(t,e){var r=t("./src/baobab.js"),n=t("./src/helpers.js");Object.defineProperty(r,"version",{value:"0.3.2"}),r.getIn=n.getIn,e.exports=r},{"./src/baobab.js":6,"./src/helpers.js":9}],3:[function(t,e){function r(){if(!s){s=!0;for(var t,e=i.length;e;){t=i,i=[];for(var r=-1;++r<e;)t[r]();e=i.length}s=!1}}function n(){}var o=e.exports={},i=[],s=!1;o.nextTick=function(t){i.push(t),s||setTimeout(r,0)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.on=n,o.addListener=n,o.once=n,o.off=n,o.removeListener=n,o.removeAllListeners=n,o.emit=n,o.binding=function(){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],4:[function(e,r,n){(function(){"use strict";var e={once:"boolean",scope:"object"},o=function(){this._enabled=!0,this._children=[],this._handlers={},this._handlersAll=[]};o.prototype.on=function(t,r,n){var i,s,a,h,u,c;if("function"==typeof r){for(u="string"==typeof t?[t]:t,i=0,s=u.length;i!==s;i+=1)if(h=u[i]){this._handlers[h]||(this._handlers[h]=[]),c={handler:r};for(a in n||{}){if(!e[a])throw new Error('The option "'+a+'" is not recognized by Emmett.');c[a]=n[a]}this._handlers[h].push(c)}}else if(t&&"object"==typeof t&&!Array.isArray(t))for(h in t)o.prototype.on.call(this,h,t[h],r);else{if("function"!=typeof t)throw new Error("Wrong arguments.");c={handler:t};for(a in n||{}){if(!e[a])throw new Error('The option "'+a+'" is not recognized by Emmett.');c[a]=n[a]}this._handlersAll.push(c)}return this},o.prototype.once=function(t,e,r){if("function"==typeof e)r=r||{},r.once=!0,this.on(t,e,r);else{if((!t||"object"!=typeof t||Array.isArray(t))&&"function"!=typeof t)throw new Error("Wrong arguments.");e=e||{},e.once=!0,this.on(t,e)}return this},o.prototype.off=function(t,e){var r,n,o,i,s,a,h,u="string"==typeof t?[t]:t;if(1===arguments.length&&"function"==typeof u){e=arguments[0];for(s in this._handlers){for(a=[],r=0,n=this._handlers[s].length;r!==n;r+=1)this._handlers[s][r].handler!==e&&a.push(this._handlers[s][r]);this._handlers[s]=a}for(a=[],r=0,n=this._handlersAll.length;r!==n;r+=1)this._handlersAll[r].handler!==e&&a.push(this._handlersAll[r]);this._handlersAll=a}else if(2===arguments.length)for(r=0,n=u.length;r!==n;r+=1){if(h=u[r],this._handlers[h]){for(a=[],o=0,i=this._handlers[h].length;o!==i;o+=1)this._handlers[h][o].handler!==e&&a.push(this._handlers[h][o]);this._handlers[h]=a}this._handlers[h]&&0===this._handlers[h].length&&delete this._handlers[h]}return this},o.prototype.unbindAll=function(){var t;this._handlersAll=[];for(t in this._handlers)delete this._handlers[t];return this},o.prototype.emit=function(t,e){var r,n,o,i,s,a,h,u,c,f="string"==typeof t?[t]:t;if(!this._enabled)return this;for(e=void 0===e?{}:e,r=0,n=f.length;r!==n;r+=1)if(c=f[r],u=(this._handlers[c]||[]).concat(this._handlersAll),u.length){for(a={type:c,data:e||{},target:this},s=[],o=0,i=u.length;o!==i;o+=1)u[o].handler.call("scope"in u[o]?u[o].scope:this,a),u[o].once||s.push(u[o]);this._handlers[c]=s}for(r=0,n=this._children.length;r!==n;r+=1)h=this._children[r],h.emit.apply(h,arguments);return this},o.prototype.child=function(){var t=this,e=new o;return e.on("emmett:kill",function(){if(t._children)for(var r=0,n=t._children.length;n>r;r++)if(t._children[r]===e){t._children.splice(r,1);break}}),this._children.push(e),e},o.prototype.kill=function(){if(this.emit("emmett:kill"),this.unbindAll(),this._handlers=null,this._handlersAll=null,this._enabled=!1,this._children)for(var t=0,e=this._children.length;e>t;t++)this._children[t].kill();this._children=null},o.prototype.disable=function(){return this._enabled=!1,this},o.prototype.enable=function(){return this._enabled=!0,this},o.version="2.1.1","undefined"!=typeof n?("undefined"!=typeof r&&r.exports&&(n=r.exports=o),n.Emitter=o):"function"==typeof t&&t.amd?t("emmett",[],function(){return o}):this.Emitter=o}).call(this)},{}],5:[function(e,r,n){!function(){"use strict";function e(t){function e(t,o){var s,a,h,u,c,f,l,p,d=!1,y=!1,g=r.get(t);if("string"===r.get(o)){for(s=o.replace(/^[\?\!]/,"").split(/\|/),h=s.length,a=0;h>a;a++)if(i.indexOf(s[a])<0&&!(s[a]in n))throw new Error("Invalid type.");if(o.match(/^\?/)&&(d=!0),o.replace(/^\?/,"").match(/^\!/)&&(y=!0),y&&d)throw new Error("Invalid type.");for(a in s)if(n[s[a]]&&("function"==typeof n[s[a]].type?n[s[a]].type.call(r,t)===!0:!e(t,n[s[a]].type)))return y?(c=new Error,c.message='Expected a "'+o+'" but found a "'+s[a]+'".',c.expected=o,c.type=s[a],c.value=t,c):null;return null===t||void 0===t?y||d?null:(c=new Error,c.message='Expected a "'+o+'" but found a "'+g+'".',c.expected=o,c.type=g,c.value=t,c):(l=~s.indexOf("*"),p=~s.indexOf(g),y&&(l||p)?(c=new Error,c.message='Expected a "'+o+'" but found a "'+(p?g:"*")+'".',c.type=p?g:"*",c.expected=o,c.value=t,c):y||l||p?null:(c=new Error,c.message='Expected a "'+o+'" but found a "'+g+'".',c.expected=o,c.type=g,c.value=t,c))}if("object"===r.get(o)){if("object"!==g)return c=new Error,c.message='Expected an object but found a "'+g+'".',c.expected=o,c.type=g,c.value=t,c;for(u in o)if(f=e(t[u],o[u]))return c=f,c.path=c.path?[u].concat(c.path):[u],c;for(u in t)if(void 0===o[u])return c=new Error,c.message='Unexpected key "'+u+'".',c.type=g,c.value=t,c;return null}if("array"===r.get(o)){if(1!==o.length)throw new Error("Invalid type.");if("array"!==g)return c=new Error,c.message='Expected an array but found a "'+g+'".',c.expected=o,c.type=g,c.value=t,c;for(h=t.length,a=0;h>a;a++)if(f=e(t[a],o[0]))return c=f,c.path=c.path?[a].concat(c.path):[a],c;return null}throw new Error("Invalid type.")}var r=this,n={};if(this.add=function(t,e){var r,o,s,a,h,u;if(1===arguments.length){if("object"!==this.get(t))throw new Error("If types.add is called with one argument, this one has to be an object.");r=t,a=r.id,u=r.type}else{if(2!==arguments.length)throw new Error("types.add has to be called with one or two arguments.");if("string"!=typeof t||!t)throw new Error("If types.add is called with more than one argument, the first one must be the string id.");a=t,u=e}if("string"!==this.get(a)||0===a.length)throw new Error("A type requires an string id.");if(void 0!==n[a]&&"proto"!==n[a])throw new Error('The type "'+a+'" already exists.');if(~i.indexOf(a))throw new Error('"'+a+'" is a reserved type name.');n[a]=1,s=(r||{}).proto||[],s=Array.isArray(s)?s:[s],h={};for(o in s)void 0===n[s[o]]&&(n[s[o]]=1,h[s[o]]=1);if("function"!==this.get(u)&&!this.isValid(u))throw new Error("A type requires a valid definition. This one can be a preexistant type or else a function testing given objects.");if(n[a]=void 0===r?{id:a,type:u}:{},void 0!==r)for(o in r)n[a][o]=r[o];for(o in h)o!==a&&delete n[o];return this},this.has=function(t){return!!n[t]},this.get=function(t){return null===t||void 0===t?String(t):o[Object.prototype.toString.call(t)]||"object"},this.check=function(t,r,n){var o=e(t,r);if(n&&o)throw o;return!o},this.isValid=function(t){var e,r,o;if("string"===this.get(t)){e=t.replace(/^[\?\!]/,"").split(/\|/);for(o in e)if(i.indexOf(e[o])<0&&!(e[o]in n))return!1;return!0}if("object"===this.get(t)){for(r in t)if(!this.isValid(t[r]))return!1;return!0}return"array"===this.get(t)&&1===t.length?this.isValid(t[0]):!1},this.add("type",function(t){return this.isValid(t)}.bind(this)),this.add("primitive",function(t){return!t||!(t instanceof Object||"object"==typeof t)}),t=t||{},"object"!==this.get(t))throw Error("Invalid argument.");for(var s in t)this.add(s,t[s])}var o={},i=["*"];!function(){var t,e,r=["Arguments","Boolean","Number","String","Function","Array","Date","RegExp","Object"];for(t in r)e=r[t],i.push(e.toLowerCase()),o["[object "+e+"]"]=e.toLowerCase()}();var s=e;e.call(s),Object.defineProperty(s,"version",{value:"0.3.1"}),"undefined"!=typeof n?("undefined"!=typeof r&&r.exports&&(n=r.exports=s),n.types=s):"function"==typeof t&&t.amd?t("typology",[],function(){return s}):this.types=s}(this)},{}],6:[function(t,e){(function(r){function n(t,e){if(!(this instanceof n))return new n(t,e);if(!l.Object(t)&&!l.Array(t))throw Error("Baobab: invalid data.");if(i.call(this),this.options=a.shallowMerge(f,e),this._cloner=this.options.cloningFunction||a.deepClone,this._futureUpdate={},this._willUpdate=!1,this._history=[],this._registeredCursors={},this.typology=this.options.typology?this.options.typology instanceof s?this.options.typology:new s(this.options.typology):new s,this.validate=this.options.validate||null,this.validate)try{this.typology.check(t,this.validate,!0)}catch(r){throw r.message="/"+r.path.join("/")+": "+r.message,r}this.data=this._cloner(t),this.mixin=c.baobab(this)}var o=t("./cursor.js"),i=t("emmett"),s=t("typology"),a=t("./helpers.js"),h=t("./update.js"),u=t("./merge.js"),c=t("./mixins.js"),f=t("../defaults.js"),l=t("./type.js");a.inherits(n,i),n.prototype._stack=function(t){var e=this;if(!l.Object(t))throw Error("Baobab.update: wrong specification.");return this._futureUpdate=u(t,this._futureUpdate),this.options.autoCommit?this.options.asynchronous?(this._willUpdate||(this._willUpdate=!0,r.nextTick(function(){e._willUpdate&&e.commit()})),this):this.commit():this},n.prototype._archive=function(){if(!(this.options.maxHistory<=0)){var t={data:this._cloner(this.data)};return this._history.length===this.options.maxHistory&&this._history.pop(),this._history.unshift(t),t}},n.prototype.commit=function(t){var e;if(t)this.data=t.data,e=t.log;else{this.options.shiftReferences&&(this.data=a.shallowClone(this.data));var r=this._archive();e=h(this.data,this._futureUpdate,this.options),r&&(r.log=e)}if(this.validate){var n,o,i=[],s=e.length;for(o=0;s>o;o++)if(n=a.getIn(this.validate,e[o]))try{this.typology.check(this.get(e[o]),n,!0)}catch(u){u.path=e[o].concat(u.path||[]),i.push(u)}i.length&&this.emit("invalid",{errors:i})}return this.emit("update",{log:e}),this._futureUpdate={},this._willUpdate=!1,this},n.prototype.select=function(t){if(arguments.length>1&&(t=a.arrayOf(arguments)),!l.Path(t))throw Error("Baobab.select: invalid path.");t=l.Array(t)?t:[t];var e,r=l.ComplexPath(t);if(r&&(e=a.solvePath(this.data,t)),this.options.cursorSingletons){var n=t.join("λ");if(this._registeredCursors[n])return this._registeredCursors[n];var i=new o(this,t,e);return this._registeredCursors[n]=i,i}return new o(this,t)},n.prototype.reference=function(t){if(arguments.length>1&&(t=a.arrayOf(arguments)),!l.Path(t))throw Error("Baobab.get: invalid path.");return a.getIn(this.data,l.String(t)||l.Number(t)?[t]:t)},n.prototype.get=function(){var t=this.reference.apply(this,arguments);return this.options.clone?this._cloner(t):t},n.prototype.clone=function(){return this._cloner(this.reference.apply(this,arguments))},n.prototype.set=function(t,e){if(arguments.length<2)throw Error("Baobab.set: expects a key and a value.");var r={};return r[t]={$set:e},this.update(r)},n.prototype.update=function(t){return this._stack(t)},n.prototype.hasHistory=function(){return!!this._history.length},n.prototype.getHistory=function(){return this._history},n.prototype.undo=function(){if(!this.hasHistory())throw Error("Baobab.undo: no history recorded, cannot undo.");var t=this._history.shift();this.commit(t)},n.prototype.release=function(){this.unbindAll(),delete this.data,delete this._futureUpdate,delete this._history,delete this._registeredCursors},n.prototype.toJSON=function(){return this.reference()},e.exports=n}).call(this,t("_process"))},{"../defaults.js":1,"./cursor.js":8,"./helpers.js":9,"./merge.js":10,"./mixins.js":11,"./type.js":12,"./update.js":13,_process:3,emmett:4,typology:5}],7:[function(t,e){function r(t,e){e.on("update",t.cursorListener)}function n(t){var e=this;if(arguments.length<2)throw Error("baobab.Combination: not enough arguments.");var n=arguments[1],o=s.arrayOf(arguments).slice(2);if(n instanceof Array&&(o=n.slice(1),n=n[0]),!a.Cursor(n))throw Error("baobab.Combination: argument should be a cursor.");if("or"!==t&&"and"!==t)throw Error("baobab.Combination: invalid operator.");i.call(this),this.cursors=[n],this.operators=[],this.root=n.root,this.updates=new Array(this.cursors.length),this.cursorListener=function(){e.updates[e.cursors.indexOf(this)]=!0},this.treeListener=function(){var t,r,n=e.updates[0];for(t=1,r=e.cursors.length;r>t;t++)n="or"===e.operators[t-1]?n||e.updates[t]:n&&e.updates[t];n&&e.emit("update"),e.updates=new Array(e.cursors.length)},this.root.on("update",this.treeListener),r(this,n),o.forEach(function(e){this[t](e)},this)}function o(t){n.prototype[t]=function(e){if(!a.Cursor(e))throw Error("baobab.Combination."+t+": argument should be a cursor.");if(~this.cursors.indexOf(e))throw Error("baobab.Combination."+t+": cursor already in combination.");return this.cursors.push(e),this.operators.push(t),this.updates.length++,r(this,e),this}}var i=t("emmett"),s=t("./helpers.js"),a=t("./type.js");s.inherits(n,i),o("or"),o("and"),n.prototype.release=function(){this.unbindAll(),this.cursors.forEach(function(t){t.off("update",this.cursorListener)},this),this.root.off("update",this.treeListener),this.cursors=null,this.operators=null,this.root=null,this.updates=null},e.exports=n},{"./helpers.js":9,"./type.js":12,emmett:4}],8:[function(t,e){function r(t,e,r){var o=this;n.call(this),e=e||[],this.root=t,this.path=e,this.relevant=void 0!==this.reference(),this.complexPath=!!r,this.solvedPath=this.complexPath?r:this.path,this.updateHandler=function(t){var e,r,n,i,a,h,u=t.data.log,c=!1;if(o.complexPath&&(o.solvedPath=s.solvePath(o.root.data,o.path)),this._handlers.update.length||this._handlersAll.length){if(!o.path.length)return o.emit("update");t:for(a=0,n=u.length;n>a;a++)for(e=u[a],h=0,i=e.length;i>h&&(r=e[h],r===""+o.solvedPath[h]);h++)if(h+1===i||h+1===o.solvedPath.length){c=!0;break t}var f=void 0!==o.reference();o.relevant?f&&c?o.emit("update"):f||(o.emit("irrelevant"),o.relevant=!1):f&&c&&(o.emit("relevant"),o.emit("update"),o.relevant=!0)}},this.root.on("update",this.updateHandler),this.mixin=i.cursor(this)}var n=t("emmett"),o=t("./combination.js"),i=t("./mixins.js"),s=t("./helpers.js"),a=t("./type.js");s.inherits(r,n),r.prototype._stack=function(t){return this.root._stack(s.pathObject(this.solvedPath,t)),this},r.prototype.isRoot=function(){return!this.path.length},r.prototype.isLeaf=function(){return a.Primitive(this.reference())},r.prototype.isBranch=function(){return!this.isLeaf()&&!this.isRoot()},r.prototype.select=function(t){if(arguments.length>1&&(t=s.arrayOf(arguments)),!a.Path(t))throw Error("baobab.Cursor.select: invalid path.");return this.root.select(this.path.concat(t))},r.prototype.up=function(){return this.solvedPath&&this.solvedPath.length?this.root.select(this.path.slice(0,-1)):null},r.prototype.left=function(){var t=+this.solvedPath[this.solvedPath.length-1];if(isNaN(t))throw Error("baobab.Cursor.left: cannot go left on a non-list type.");return t?this.root.select(this.solvedPath.slice(0,-1).concat(t-1)):null},r.prototype.leftmost=function(){var t=+this.solvedPath[this.solvedPath.length-1];if(isNaN(t))throw Error("baobab.Cursor.leftmost: cannot go left on a non-list type.");return this.root.select(this.solvedPath.slice(0,-1).concat(0))},r.prototype.right=function(){var t=+this.solvedPath[this.solvedPath.length-1];if(isNaN(t))throw Error("baobab.Cursor.right: cannot go right on a non-list type.");return t+1===this.up().reference().length?null:this.root.select(this.solvedPath.slice(0,-1).concat(t+1))},r.prototype.rightmost=function(){var t=+this.solvedPath[this.solvedPath.length-1];if(isNaN(t))throw Error("baobab.Cursor.right: cannot go right on a non-list type.");var e=this.up().reference();return this.root.select(this.solvedPath.slice(0,-1).concat(e.length-1))},r.prototype.down=function(){+this.solvedPath[this.solvedPath.length-1];return this.reference()instanceof Array?this.root.select(this.solvedPath.concat(0)):null},r.prototype.get=function(t){return arguments.length>1&&(t=s.arrayOf(arguments)),this.root.get(a.Step(t)?this.solvedPath.concat(t):this.solvedPath)},r.prototype.reference=function(t){return arguments.length>1&&(t=s.arrayOf(arguments)),this.root.reference(a.Step(t)?this.solvedPath.concat(t):this.solvedPath)},r.prototype.clone=function(t){return arguments.length>1&&(t=s.arrayOf(arguments)),this.root.clone(a.Step(t)?this.solvedPath.concat(t):this.solvedPath)},r.prototype.set=function(t,e){if(arguments.length<2)throw Error("baobab.Cursor.set: expecting at least key/value.");var r={};return r[t]={$set:e},this.update(r)},r.prototype.edit=function(t){return this.update({$set:t})},r.prototype.apply=function(t){if("function"!=typeof t)throw Error("baobab.Cursor.apply: argument is not a function.");return this.update({$apply:t})},r.prototype.thread=function(t){if("function"!=typeof t)throw Error("baobab.Cursor.thread: argument is not a function.");return this.update({$thread:t})},r.prototype.push=function(t){if(!(this.reference()instanceof Array))throw Error("baobab.Cursor.push: trying to push to non-array value.");return this.update(arguments.length>1?{$push:s.arrayOf(arguments)}:{$push:t})},r.prototype.unshift=function(t){if(!(this.reference()instanceof Array))throw Error("baobab.Cursor.push: trying to push to non-array value.");return this.update(arguments.length>1?{$unshift:s.arrayOf(arguments)}:{$unshift:t})},r.prototype.merge=function(t){if(!a.Object(t))throw Error("baobab.Cursor.merge: trying to merge a non-object.");if(!a.Object(this.reference()))throw Error("baobab.Cursor.merge: trying to merge into a non-object.");this.update({$merge:t})},r.prototype.update=function(t){return this._stack(t)},r.prototype.or=function(t){return new o("or",this,t)},r.prototype.and=function(t){return new o("and",this,t)},r.prototype.release=function(){this.root.off("update",this.updateHandler),this.root=null,this.unbindAll()},r.prototype.toJSON=function(){return this.reference()},a.Cursor=function(t){return t instanceof r},e.exports=r},{"./combination.js":7,"./helpers.js":9,"./mixins.js":11,"./type.js":12,emmett:4}],9:[function(t,e){function r(t){return Array.prototype.slice.call(t)}function n(t,e){var r,n={};for(r in t)n[r]=t[r];for(r in e)n[r]=e[r];return n}function o(t){if(!(t&&t instanceof Object))return t;if(g.Array(t))return t.slice(0);if(g.Date(t))return new Date(t.getTime());if(g.Object(t)){var e,r={};for(e in t)r[e]=t[e];return r}return t}function i(t){if(!(t&&t instanceof Object))return t;if(g.Array(t)){var e,r,n=[];for(e=0,r=t.length;r>e;e++)n.push(i(t[e]));return n}if(g.Date(t))return new Date(t.getTime());if(g.Object(t)){var o,s={};for(o in t)s[o]=i(t[o]);return s}return t}function s(t,e){return function(r){return e(t(r))}}function a(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(e(t[r]))return t[r]}function h(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(e(t[r]))return r;return-1}function u(t,e){var r,n=!0;for(r in e)if(g.Object(e[r]))n=n&&u(t[r]);else if(g.Array(e[r]))n=n&&!!~e[r].indexOf(t[r]);else if(t[r]!==e[r])return!1;return n}function c(t,e){return a(t,function(t){return u(t,e)})}function f(t,e){return h(t,function(t){return u(t,e)})}function l(t,e){e=e||[];var r,n,o=t;for(r=0,n=e.length;n>r;r++){if(!o)return;if("function"==typeof e[r]){if(!g.Array(o))return;o=a(o,e[r])}else if("object"==typeof e[r]){if(!g.Array(o))return;o=c(o,e[r])}else o=o[e[r]]}return o}function p(t,e){var r,n,o,i=[],s=t;for(n=0,o=e.length;o>n;n++){if(!s)return null;if("function"==typeof e[n]){if(!g.Array(s))return;r=h(s,e[n]),i.push(r),s=s[r]}else if("object"==typeof e[n]){if(!g.Array(s))return;r=f(s,e[n]),i.push(r),s=s[r]}else i.push(e[n]),s=s[e[n]]}return i}function d(t,e){var r,n=t.length,o={},i=o;for(n||(o=e),r=0;n>r;r++)i[t[r]]=r+1===n?e:{},i=i[t[r]];return o}function y(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}var g=t("./type.js");e.exports={arrayOf:r,deepClone:i,shallowClone:o,shallowMerge:n,compose:s,getIn:l,inherits:y,pathObject:d,solvePath:p}},{"./type.js":12}],10:[function(t,e){function r(t,e){return e in(t||{})}function n(t,e,n){return r(t,n)&&r(e,n)}function o(){var t,e,r,a,h={},u=arguments.length;for(r=u-1;r>=0;r--)if(arguments[r].$set)delete h.$apply,delete h.$merge,h.$set=arguments[r].$set;else if(arguments[r].$merge)delete h.$set,delete h.$apply,h.$merge=arguments[r].$merge;else if(arguments[r].$apply)delete h.$set,delete h.$merge,h.$apply=arguments[r].$apply;else if(arguments[r].$chain)delete h.$set,delete h.$merge,h.$apply=h.$apply?i.compose(h.$apply,arguments[r].$chain):arguments[r].$chain;else for(a in arguments[r])t=h[a],e=arguments[r][a],t&&s.Object(e)?n(t,e,"$push")?t.$push=s.Array(t.$push)?t.$push.concat(e.$push):[t.$push].concat(e.$push):n(t,e,"$unshift")?t.$unshift=s.Array(e.$unshift)?e.$unshift.concat(t.$unshift):[e.$unshift].concat(t.$unshift):h[a]=o(e,t):h[a]=e;return h}var i=t("./helpers.js"),s=t("./type.js");e.exports=o},{"./helpers.js":9,"./type.js":12}],11:[function(t,e){var r=t("./combination.js"),n=t("./type.js");e.exports={baobab:function(t){return{mixins:[{getInitialState:function(){if(this.tree=t,!this.cursor&&!this.cursors)return{};if(this.cursor&&this.cursors)throw Error("baobab.mixin: you cannot have both `component.cursor` and `component.cursors`. Please make up your mind.");if(this.__type=null,this.__updateHandler=function(){this.setState(this.__getCursorData())}.bind(this),this.cursor){if(!n.MixinCursor(this.cursor))throw Error("baobab.mixin.cursor: invalid data (cursor, string or array).");n.Cursor(this.cursor)||(this.cursor=t.select(this.cursor)),this.__getCursorData=function(){return{cursor:this.cursor.get()}}.bind(this),this.__type="single"}else if(this.cursors){if(-1===["object","array"].indexOf(n(this.cursors)))throw Error("baobab.mixin.cursor: invalid data (object or array).");if(n.Array(this.cursors))this.cursors=this.cursors.map(function(e){return n.Cursor(e)?e:t.select(e)}),this.__getCursorData=function(){return{cursors:this.cursors.map(function(t){return t.get()})}}.bind(this),this.__type="array";else{for(var e in this.cursors)n.Cursor(this.cursors[e])||(this.cursors[e]=t.select(this.cursors[e]));this.__getCursorData=function(){var t={};for(e in this.cursors)t[e]=this.cursors[e].get();return{cursors:t}}.bind(this),this.__type="object"}}return this.__getCursorData()},componentDidMount:function(){"single"===this.__type?(this.__combination=new r("or",[this.cursor]),this.__combination.on("update",this.__updateHandler)):"array"===this.__type?(this.__combination=new r("or",this.cursors),this.__combination.on("update",this.__updateHandler)):"object"===this.__type&&(this.__combination=new r("or",Object.keys(this.cursors).map(function(t){return this.cursors[t]},this)),this.__combination.on("update",this.__updateHandler))},componentWillUnmount:function(){this.__combination&&this.__combination.release()}}].concat(t.options.mixins)}},cursor:function(t){return{mixins:[{getInitialState:function(){return this.cursor=t,this.__updateHandler=function(){this.setState({cursor:this.cursor.get()})}.bind(this),{cursor:this.cursor.get()}},componentDidMount:function(){this.cursor.on("update",this.__updateHandler)},componentWillUnmount:function(){this.cursor.off("update",this.__updateHandler)}}].concat(t.root.options.mixins)}}}},{"./combination.js":7,"./type.js":12}],12:[function(t,e){var r=function(t){return Array.isArray(t)?"array":"object"==typeof t&&null!==t?"object":"string"==typeof t?"string":"number"==typeof t?"number":"boolean"==typeof t?"boolean":"function"==typeof t?"function":null===t?"null":void 0===t?"undefined":t instanceof Date?"date":"invalid"};r.Array=function(t){return Array.isArray(t)},r.Object=function(t){return!Array.isArray(t)&&"object"==typeof t&&null!==t},r.String=function(t){return"string"==typeof t},r.Number=function(t){return"number"==typeof t},r.Boolean=function(t){return"boolean"==typeof t},r.Function=function(t){return"function"==typeof t},r.Primitive=function(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t},r.Date=function(t){return t instanceof Date},r.Step=function(t){var e=r(t),n=["null","undefined","invalid","date"];return-1===n.indexOf(e)},r.Path=function(t){var e=["object","string","number","function","undefined"];if(!r.Array(t))return e.indexOf(r(t))>=0;for(var n=0;n<t.length;n++)if(-1===e.indexOf(r(t[n])))return!1;return!0},r.MixinCursor=function(t){var e=["string","number","array"];return e.indexOf(r(t))>=0||r.Cursor(t)},r.ComplexPath=function(t){for(var e=["object","function"],n=!1,o=0;o<t.length;o++)e.indexOf(r(t[o]))>=0&&(n=!0);return n},e.exports=r},{}],13:[function(t,e){function r(t,e){var r=new Error("precursors.update: "+e+" at path /"+t.toString());return r.path=t,r}function n(t,e,n){n=n||{};var a={};return function h(t,e,u){u=u||[];var c,f,l,p,d=u.join("λ");for(l in e)if(s[l])switch(p=e[l],a[d]=!0,l){case"$push":if(!i.Array(t))throw r(u,"using command $push to a non array");i.Array(p)?t.push.apply(t,p):t.push(p);break;case"$unshift":if(!i.Array(t))throw r(u,"using command $unshift to a non array");i.Array(p)?t.unshift.apply(t,p):t.unshift(p)}else if(f=d?d+"λ"+l:l,"$set"in(e[l]||{}))p=e[l].$set,a[f]=!0,t[l]=p;else if("$apply"in(e[l]||{})){if(c=e[l].$apply,"function"!=typeof c)throw r(u.concat(l),"using command $apply with a non function");a[f]=!0,t[l]=c.call(null,t[l])}else if("$merge"in(e[l]||{})){if(p=e[l].$merge,!i.Object(t[l]))throw r(u.concat(l),"using command $merge on a non-object");a[f]=!0,t[l]=o.shallowMerge(t[l],p)}else if(n.shiftReferences&&("$push"in(e[l]||{})||"$unshift"in(e[l]||{}))){if("$push"in(e[l]||{})){if(p=e[l].$push,!i.Array(t[l]))throw r(u.concat(l),"using command $push to a non array");t[l]=t[l].concat(p)}if("$unshift"in(e[l]||{})){if(p=e[l].$unshift,!i.Array(t[l]))throw r(u.concat(l),"using command $unshift to a non array");t[l]=(p instanceof Array?p:[p]).concat(t[l])}a[f]=!0}else"undefined"==typeof t[l]&&(t[l]={}),n.shiftReferences&&(t[l]=o.shallowClone(t[l])),h(t[l],e[l],u.concat(l))}(t,e),Object.keys(a).map(function(t){return t.split("λ")})}var o=t("./helpers.js"),i=t("./type.js"),s={};["$set","$push","$unshift","$apply","$merge"].forEach(function(t){s[t]=!0}),e.exports=n},{"./helpers.js":9,"./type.js":12}]},{},[2])(2)});