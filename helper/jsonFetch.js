self.jsonFetch = function(request, keys) {
  console.log('Someone fetched JSON: ', request);
  return fetch(request);
};
