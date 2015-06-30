self.custom204FetchHandler = function(request) {
  return new Response('', {
    status: 204,
    statusText: 'Via customFetchHandler'
  });
};

self.custom410FetchHandler = function(request) {
  return new Response('', {
    status: 410,
    statusText: 'Via customFetchHandler'
  });
};
