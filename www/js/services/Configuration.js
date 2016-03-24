angular.module('shopmycourse.services')

.factory('Configuration', function () {
  return {
    apiEndpoint: 'http://192.168.1.33:3000/',
    errors: {
      SCHEDULE_ALREADY_EXIST: 'Vous avez déjà déposé une disponibilité'
    }
  };
});
