/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// Provides an equivalent to navigator.serviceWorker.ready that waits for the page to be controlled,
// as opposed to waiting for the active service worker.
// See https://github.com/slightlyoff/ServiceWorker/issues/799
window._controlledPromise = new Promise(function(resolve) {
  // Resolve with the registration, to match the .ready promise's behavior.
  var resolveWithRegistration = function() {
    navigator.serviceWorker.getRegistration().then(function(registration) {
      resolve(registration);
    });
  };

  if (navigator.serviceWorker.controller) {
    resolveWithRegistration();
  } else {
    navigator.serviceWorker.addEventListener('controllerchange', resolveWithRegistration);
  }
});
