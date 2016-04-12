angular.module('shopmycourse.controllers')

.controller('DeliveriesShowCtrl', function($scope, $ionicLoading, $stateParams, $ionicModal, DeliveryStore) {

  $scope.delivery = {};

  $ionicLoading.show({
    template: 'Nous recherchons votre livraison...'
  });

  DeliveryStore.get({id: parseInt($stateParams.idDelivery)}, function (err, delivery) {
    $scope.delivery = delivery[0];
    console.log(delivery);
    $ionicLoading.hide();
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

  $scope.sendSMS = function () {
    var number = $scope.delivery.buyer.phone;
    $cordovaSms.send(number, '', {}).then(function () {
      console.log('Succesfully send SMS');
    }, function (err) {
      console.log(err);
    });
  };
})
