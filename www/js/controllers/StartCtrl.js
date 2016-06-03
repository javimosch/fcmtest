angular.module('shopmycourse.controllers')

.controller('StartCtrl', function($scope, $state, CurrentUser, CurrentAddress) {
  if (CurrentUser.isLogged()) {
    CurrentAddress.init();
    $state.go('tabs.home');
  }
})
