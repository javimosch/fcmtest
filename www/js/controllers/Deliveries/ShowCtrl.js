angular.module('shopmycourse.controllers')

.controller('DeliveriesShowCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicModal, $cordovaSms, DeliveryStore) {

  $scope.delivery = {};

  $ionicLoading.show({
    template: 'Nous recherchons votre livraison...'
  });

  DeliveryStore.get({id: parseInt($stateParams.idDelivery)}, function (err, delivery) {
    $scope.delivery = delivery[0];
    console.log($scope.delivery)
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

  $scope.goFinishDeliveryModal = function () {
      $scope.finishDeliveryModal.hide();
      $state.go('tabs.home');
  };

  $scope.setChecked = function (index) {
      $scope.delivery.delivery_contents[index].checked = !$scope.delivery.delivery_contents[index].checked;
  };

  $scope.sendSMS = function () {
    var number = $scope.delivery.buyer.phone;
    $cordovaSms.send(number, '', {
              android: {
                intent: 'INTENT'// send SMS with the native android SMS messaging
            }
          }).then(function () {
      console.log('Succesfully send SMS');
    }, function (err) {
      console.log(err);
    });
  };
})
