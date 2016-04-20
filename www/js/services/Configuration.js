angular.module('shopmycourse.services')

.factory('Configuration', function () {
  return {
    apiEndpoint: 'http://192.168.1.29:3000/',
    //apiEndpoint: 'http://shopmycourses-develop.herokuapp.com/',
    errors: {
      SCHEDULE_ALREADY_EXIST: 'Vous avez déjà déposé une disponibilité',
      VALIDATION_CODE_ERROR: 'Votre code de validation est incorrect',
      LEMONWAY_SERVER_ERROR: 'Une erreur liée à votre paiement est survenue',
      WALLET_ERROR: 'Une erreur liée à votre paiement est survenue',
      VALIDATION_CODE_ERROR: 'Une erreur est survenue lors de la validation',
      EMPTY_CART: 'Vous devez remplir votre panier'
    },
    success: {
      ORDER_DONE: 'La commande a été effectuée',
      RATING_DONE: 'Votre avis a bien été pris en compte'
    }
  };
});
