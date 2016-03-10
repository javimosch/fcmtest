angular.module('shopmycourse.controllers')

.controller('DeliveriesShowCtrl', function($scope, $stateParams, $ionicModal, DeliveryAPI) {

  $scope.delivery = {};

  DeliveryAPI.getOne({idDelivery: $stateParams.idDelivery}, function (delivery) {
    $scope.delivery = delivery;
  }, function (err) {
    console.error(err);
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
