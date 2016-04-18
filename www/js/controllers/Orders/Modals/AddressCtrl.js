angular.module('shopmycourse.controllers')

.controller('OrderAddressCtrl', function($scope, Validation, $state, CurrentDelivery) {
  $scope.validation = Validation;
  $scope.address = {
    address: '',
    city: 'Lyon',
    zip: 69001,
    additional_address: 'No'
  };

  $scope.setAddress = function(address) {
    CurrentDelivery.setAddress(address, function(currentDelivery) {
      $scope.addressModal.hide();
      $state.go('tabs.shoporder');
    });
  }

})