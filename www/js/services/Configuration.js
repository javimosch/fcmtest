angular.module('shopmycourse.services')

.factory('Configuration', function clientIdFactory() {
  return {
    apiEndpoint: 'http://localhost:3000/'
  };
});
