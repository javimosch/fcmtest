angular.module('shopmycourse.controllers')

.controller('OrdersAddressCtrl', function($scope, Validation, $state, CurrentDelivery) {
  $scope.validation = Validation;
  $scope.address = {
    address: '',
    city: 'Lyon',
    zip: 69001,
    additional_address: 'No'
  };

  $scope.setAddress = function(address) {
    CurrentDelivery.setAddress(address, function(currentDelivery) {
      $state.go('tabs.shoporder');
    });
  }

})