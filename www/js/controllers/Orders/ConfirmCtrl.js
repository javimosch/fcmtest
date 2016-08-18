angular.module('shopmycourse.controllers')

/**
 * @name OrdersConfirmCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Finalisation de la commande
*/

.controller('OrdersConfirmCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory) {

  /**
   * @name $scope.endOrder
   * @description Enregistrement de la demande de livraison
  */
  $scope.endOrder = function () {
    //$ionicViewSwitcher.nextDirection('back');
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    $state.go('tabs.home');
  };

})
