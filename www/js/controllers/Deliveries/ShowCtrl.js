angular.module('shopmycourse.controllers')

.controller('DeliveriesShowCtrl', function($scope, $stateParams, $ionicModal, DeliveryStore) {

  $scope.delivery = {};

  DeliveryStore.get({id: parseInt($stateParams.idDelivery)}, function (err, delivery) {
    $scope.delivery = delivery[0];
    console.log(delivery);
  })

  $ionicModal.fromTemplateUrl('templates/Deliveries/Modals/Finish.html', {
      animation: 'slide-in-up',
      scope: $scope
  }).then(function (modal) {
    $scope.finishDeliveryModal = modal
  });

  $scope.openFinishDeliveryModal = function () {
    $scope.finishDeliveryModal.show();
  };

  $scope.closeFinishDeliveryModal = function () {
    $scope.finishDeliveryModal.hide();
  };
})
