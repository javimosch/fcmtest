angular.module('shopmycourse.controllers')

.controller('OrdersAddressCtrl', function($scope, Validation, $state, CurrentDelivery, CurrentAddress, CurrentUser) {
  $scope.validation = Validation;
  currentAddress = CurrentAddress.get()
  
  $scope.address = {
    address: currentAddress.address || '',
    city: currentAddress.city || '',
    zip: currentAddress.zip || '',
    additional_address: currentAddress.additional_address || ''
  };

  $scope.setAddress = function(address) {
    CurrentAddress.set(address);
    CurrentDelivery.setAddress(address, function(currentDelivery) {
      $state.go('tabs.shoporder');
    });
  }

})
