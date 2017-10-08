import { Base } from '../polymer/polymer.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
/**
 * The `<platinum-sw-import-script>` element is used to import a JavaScript file that is executed
 * each time the service worker starts up.
 *
 * `<platinum-sw-import-script>` needs to be a child element of `<platinum-sw-register>`.
 *
 * A common use case is to define a custom request handler for a `fetch` event, but it can be used
 * for any type of code that you want to be executed by the service worker.
 *
 *     <platinum-sw-register auto-register>
 *       <platinum-sw-import-script href="custom-fetch-handler.js"></platinum-sw-import-script>
 *       <platinum-sw-fetch handler="customFetchHandler"
 *                          path="/(.*)/customFetch"></platinum-sw-fetch>
 *     </platinum-sw-register>
 *
 * You can specify multiple `<platinum-sw-import-script>` elements, each one corresponding to a
 * different JavaScript file. The JavaScript files will be loaded in the order in which the
 * `<platinum-sw-import-script>` elements appear. Under the hood, this results in an
 * [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
 * call made from the context of the service worker.
 */
Polymer({
  is: 'platinum-sw-import-script',

  properties: {
    /**
     * The URL of the JavaScript file that you want imported.
     *
     * Relative URLs are assumed to be
     * relative to the service worker's script location, which will almost always be the same
     * location as the page which includes this element.
     */
    href: String
  },

  _getParameters: function() {
    return new Promise(function(resolve) {
      var params = {};
      if (this.href) {
        params.importscript = this.href;
      } else {
        Base._warn('The following platinum-sw-import-script element will not have any effect.' +
          ' The "href" attribute must be set.', this);
      }
      resolve(params);
    }.bind(this));
  }
});
