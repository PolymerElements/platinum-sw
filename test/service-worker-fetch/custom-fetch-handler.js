self.customFetchHandler = function(request) {
  return new Response('', {
    status: 204,
    statusText: 'Via customFetchHandler'
  });
};
