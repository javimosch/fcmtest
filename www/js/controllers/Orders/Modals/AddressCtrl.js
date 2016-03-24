angular.module('shopmycourse.controllers')

.controller('OrderAddressCtrl', function($scope, Validation) {
  $scope.validation = Validation;
  $scope.address = {
    address: '',
    city: 'Lyon',
    zip: 69001,
    additional_address: 'No'
  };
})
