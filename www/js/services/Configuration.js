angular.module('shopmycourse.services')

.factory('Configuration', function () {
  return {
    // apiEndpoint: 'http://192.168.1.34:3000/',
    apiEndpoint: 'http://127.0.0.1:3000/',
    errors: {
      SCHEDULE_ALREADY_EXIST: 'Vous avez déjà déposé une disponibilité',
      VALIDATION_CODE_ERROR: 'Votre code de validation est incorrect'
    }
  };
});
