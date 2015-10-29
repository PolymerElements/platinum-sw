
<!---

This README is automatically generated from the comments in these files:
platinum-sw-cache.html  platinum-sw-elements.html  platinum-sw-fetch.html  platinum-sw-import-script.html  platinum-sw-offline-analytics.html  platinum-sw-register.html

Edit those files, and our readme bot will duplicate them over here!
Edit this file, and the bot will squash your changes :)

-->

_[Demo and API Docs](https://elements.polymer-project.org/elements/platinum-sw)_


##&lt;platinum-sw-cache&gt;


The `<platinum-sw-cache>` element makes it easy to precache specific resources, perform runtime
caching, and serve your cached resources when a network is unavailable.
Under the hood, the [sw-toolbox](https://github.com/googlechrome/sw-toolbox) library is used
for all the caching and request handling logic.
`<platinum-sw-cache>` needs to be a child element of `<platinum-sw-register>`.
A simple, yet useful configuration is

    <platinum-sw-register auto-register>
      <platinum-sw-cache></platinum-sw-cache>
    </platinum-sw-register>

This is enough to have all of the resources your site uses cached at runtime, both local and
cross-origin.
(It uses the default `defaultCacheStrategy` of "networkFirst".)
When there's a network available, visits to your site will go against the network copy of the
resources, but if someone visits your site when they're offline, all the cached resources will
be used.



##&lt;platinum-sw-fetch&gt;


The `<platinum-sw-fetch>` element creates custom [`fetch` event](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#fetch-event-section)
handlers for given URL patterns. Possible use cases include:

- Using a special caching strategy for specific URLs.
- Returning static "fallback" responses instead of network errors when a remote API
is unavailable.

In short, any scenario in which you'd like a service worker to intercept network
requests and provide custom response handling.

If you'd like a single caching policy applied to all same-origin requests, then an alternative
to using `<platinum-sw-fetch>` is to use `<platinum-sw-cache>` with the `defaultCacheStategy`
property set.

Under the hood, the [sw-toolbox](https://github.com/googlechrome/sw-toolbox) library is used
for all the request handling logic.

`<platinum-sw-fetch>` needs to be a child element of `<platinum-sw-register>`.

An example configuration is:

    <platinum-sw-register auto-register>
      <platinum-sw-import-script href="custom-fetch-handler.js"></platinum-sw-import-script>
      <platinum-sw-fetch handler="customFetchHandler"
                         path="/(.*)/customFetch"></platinum-sw-fetch>
    </platinum-sw-register>

This implies that there's a `custom-fetch-handler.js` file in the same directory as the current
page, which defines a `sw-toolbox` compliant
[request handler](https://github.com/googlechrome/sw-toolbox#request-handlers) named
`customFetchHandler`. This definition is imported using `<platinum-sw-import-script>`. The
`<platinum-sw-fetch>` element takes care of mapping which request paths are handled by
`customFetchHandler`.

Anything not matching the `path` pattern is ignored by `<platinum-sw-fetch>`,
and it's possible to have multiple `<platinum-sw-fetch>` elements that each define different
paths and different handlers. The path matching is performed top-down, starting with the first
`<platinum-sw-fetch>` element.

The `path` will, by default, only match same-origin requests. If you'd like to define a custom
handler for requests on a specific cross-origin domain, you must use the `origin` parameter
in conjunction with `path` to match the domains you'd like to handle.
   

##&lt;platinum-sw-import-script&gt;


The `<platinum-sw-import-script>` element is used to import a JavaScript file that is executed
each time the service worker starts up.

`<platinum-sw-import-script>` needs to be a child element of `<platinum-sw-register>`.

A common use case is to define a custom request handler for a `fetch` event, but it can be used
for any type of code that you want to be executed by the service worker.

    <platinum-sw-register auto-register>
      <platinum-sw-import-script href="custom-fetch-handler.js"></platinum-sw-import-script>
      <platinum-sw-fetch handler="customFetchHandler"
                         path="/(.*)/customFetch"></platinum-sw-fetch>
    </platinum-sw-register>

You can specify multiple `<platinum-sw-import-script>` elements, each one corresponding to a
different JavaScript file. The JavaScript files will be loaded in the order in which the
`<platinum-sw-import-script>` elements appear. Under the hood, this results in an
[`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
call made from the context of the service worker.
   

##&lt;platinum-sw-offline-analytics&gt;


The `<platinum-sw-offline-analytics>` element registers a service worker handler to
intercepts requests for Google Analytics pings.

If the HTTP GET for the ping is successful (because the browser is online), then everything
proceeds as it normally would. If the HTTP GET fails, the ping request is saved to IndexedDB, and each time the service worker
script starts up it will attempt to "replay" those saved ping requests, giving up after one day
has passed.

The [`qt`](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt)
URL parameter is automatically added to the replayed HTTP GET and set to the number of
milliseconds that has passed since the initial ping request was attempted, to ensure that the
original time attribution is correct.

`<platinum-sw-offline-analytics>` does not take care of setting up Google Analytics on your
page, and assumes that you have [properly configured](https://support.google.com/analytics/answer/1008080)
Google Analytics tracking code registered elsewhere on your page.

Since `<platinum-sw-offline-analytics>` is only useful if the page that is being tracked with
Google Analytics works offline, it's best used in conjunction with the `<platinum-sw-cache>`
element, which takes care of caching your site's resources and serving them while offline.

A basic configuration is

    <platinum-sw-register auto-register>
      <platinum-sw-offline-analytics></platinum-sw-offline-analytics>
      <platinum-sw-cache></platinum-sw-cache>
    </platinum-sw-register>

   

##&lt;platinum-sw-register&gt;


The `<platinum-sw-register>` element handles
[service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
registration, reflects the overall service worker state, and coordinates the configuration
provided by other Service Worker Elements.
`<platinum-sw-register>` is used as a parent element for child elements in the
`<platinum-sw-*>` group.

    <platinum-sw-register skip-waiting
                          clients-claim
                          auto-register
                          state="{{state}}"
                          on-service-worker-error="handleSWError"
                          on-service-worker-updated="handleSWUpdated"
                          on-service-worker-installed="handleSWInstalled">
      ...one or more <platinum-sw-*> children which share the service worker registration...
    </platinum-sw-register>

Please see https://github.com/PolymerElements/platinum-sw#top-level-sw-importjs for a
*crucial* prerequisite file you must create before `<platinum-sw-register>` can be used!


