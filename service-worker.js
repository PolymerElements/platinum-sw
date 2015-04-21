var VERSION = '1.0';

function deserializeUrlParams(queryString) {
  return new Map(queryString.split('&').map(function(keyValuePair) {
    var splits = keyValuePair.split('=');
    var key = decodeURIComponent(splits[0]);
    var value = decodeURIComponent(splits[1]);
    if (value.indexOf(',') >= 0) {
      value = value.split(',');
    }

    return [key, value];
  }));
}

self.params = deserializeUrlParams(location.search.substring(1));

if (params.get('version') !== VERSION) {
  throw 'The registered script is version ' + VERSION +
        ' and cannot be used with <service-worker> version ' + params.get('version');
}

if (params.has('importscript')) {
  var scripts = params.get('importscript');
  if (Array.isArray(scripts)) {
    importScripts.apply(null, scripts);
  } else {
    importScripts(scripts);
  }
}

if (params.get('skipwaiting') === 'true' && self.skipWaiting) {
  self.addEventListener('install', function(e) {
    e.waitUntil(self.skipWaiting());
  });
}

if (params.get('clientsclaim') === 'true' && self.clients && self.clients.claim) {
  self.addEventListener('activate', function(e) {
    e.waitUntil(self.clients.claim());
  });
}

// TODO: Add in a message handler, and respond to commands proxied via <service-worker>
