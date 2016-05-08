angular.module('shopmycourse.controllers')

.controller('ProfileEditAddressCtrl', function($scope, $rootScope, $state, Validation, CardAPI, CurrentAddress) {

  $scope.endEdit = function ($event) {
    $event.preventDefault();

    CurrentAddress.set($rootScope.currentAddress)

    $state.go('tabs.profile');
  }
})
