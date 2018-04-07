/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   platinum-sw-import-script.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />

/**
 * The `<platinum-sw-import-script>` element is used to import a JavaScript file
 * that is executed each time the service worker starts up.
 *
 * `<platinum-sw-import-script>` needs to be a child element of
 * `<platinum-sw-register>`.
 *
 * A common use case is to define a custom request handler for a `fetch` event,
 * but it can be used for any type of code that you want to be executed by the
 * service worker.
 *
 *     <platinum-sw-register auto-register>
 *       <platinum-sw-import-script
 * href="custom-fetch-handler.js"></platinum-sw-import-script>
 *       <platinum-sw-fetch handler="customFetchHandler"
 *                          path="/(.*)/customFetch"></platinum-sw-fetch>
 *     </platinum-sw-register>
 *
 * You can specify multiple `<platinum-sw-import-script>` elements, each one
 * corresponding to a different JavaScript file. The JavaScript files will be
 * loaded in the order in which the
 * `<platinum-sw-import-script>` elements appear. Under the hood, this results
 * in an
 * [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
 * call made from the context of the service worker.
 */
interface PlatinumSwImportScriptElement extends Polymer.Element {

  /**
   * The URL of the JavaScript file that you want imported.
   *
   * Relative URLs are assumed to be
   * relative to the service worker's script location, which will almost
   * always be the same location as the page which includes this element.
   */
  href: string|null|undefined;
  _getParameters(): any;
}

interface HTMLElementTagNameMap {
  "platinum-sw-import-script": PlatinumSwImportScriptElement;
}
