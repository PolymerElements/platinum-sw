var swToolboxURL = new URL('../sw-toolbox/sw-toolbox.js', params.get('baseURI')).href;
importScripts(swToolboxURL);

if (params.has('defaultcachestrategy')) {
  toolbox.router.default = toolbox[params.get('defaultcachestrategy')];
}

if (params.has('precache')) {
  toolbox.precache(params.get('precache'));
}

if (params.has('route')) {
  var setsOfRouteParams = params.get('route');
  while (setsOfRouteParams.length > 0) {
    var routeParams = setsOfRouteParams.splice(0, 3);
    var originParam;
    if (routeParams[2]) {
      originParam = {origin: new RegExp(routeParams[2])};
    }
    var handler = toolbox[routeParams[1]] || self[routeParams[1]];
    if (typeof handler === 'function') {
      toolbox.router.get(routeParams[0], handler, originParam);
    } else {
      console.error('Unable to register sw-toolbox route: ', routeParams);
    }
  }
}
