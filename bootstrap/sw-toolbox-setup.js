/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(global) {
  var swToolboxURL = new URL('../sw-toolbox/sw-toolbox.js', global.params.get('baseURI')).href;
  importScripts(swToolboxURL);
  
  if (global.params.has('cacheId')) {
    global.toolbox.options.cacheName = global.params.get('cacheId') + '$$$' +
      global.registration.scope;
  }
  
  if (global.params.has('defaultCacheStrategy')) {
    var strategy = global.params.get('defaultCacheStrategy');
    global.toolbox.router.default = global.toolbox[strategy] || global[strategy];
  }
  
  if (global.params.has('precache')) {
    global.toolbox.precache(global.params.get('precache'));
  }
  
  if (global.params.has('route')) {
    var setsOfRouteParams = global.params.get('route');
    while (setsOfRouteParams.length > 0) {
      var routeParams = setsOfRouteParams.splice(0, 3);
      var originParam;
      if (routeParams[2]) {
        originParam = {origin: new RegExp(routeParams[2])};
      }
      var handler = global.toolbox[routeParams[1]] || global[routeParams[1]];
      if (typeof handler === 'function') {
        global.toolbox.router.get(routeParams[0], handler, originParam);
      } else {
        console.error('Unable to register sw-toolbox route: ', routeParams);
      }
    }
  }
})(self);
