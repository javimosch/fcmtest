angular.module('shopmycourse.controllers')

/**
 * @name OrdersListCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Liste des commandes
*/

.controller('OrdersListCtrl', function($scope, $ionicLoading, OrderStore, DeliveryStatus,lodash) {

  $scope.orders = [];
  $scope.status = 'pending';

  /**
   * Chargement de la liste des commandes
  */
  $ionicLoading.show({
    template: 'Nous recherchons vos commandes...'
  });

  /**
   * Chargement des commandes
  */
  OrderStore.pull(function (err, orders) {
    $scope.orders = orders;
    $ionicLoading.hide();
  }, function (err) {
    console.error(err);
    $ionicLoading.hide();
  });

  /**
   * @name $scope.byStatus
   * @description Filtrage des commandes par status En cours / Archivé
  */
  $scope.byStatus = function (status) {
    return function (delivery) {
      if (status === 'pending') {
        if (['pending', 'accepted', 'completed'].indexOf(delivery.status) > -1 || (delivery.status == 'done' && delivery.rated == false)) {
          return (true);
        }
        return (false);
      } else {
        if (['canceled'].indexOf(delivery.status) > -1 || (delivery.status == 'done' && delivery.rated == true)) {
          return (true);
        }
        return (false);
      }
    }
  };

  $scope.deliveryStatus = DeliveryStatus;

})
