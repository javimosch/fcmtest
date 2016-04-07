angular.module('shopmycourse.services')

.factory('Configuration', function () {
  return {
    apiEndpoint: 'http://127.0.0.1:3000/',
    errors: {
      SCHEDULE_ALREADY_EXIST: 'Vous avez déjà déposé une disponibilité'
    }
  };
});
