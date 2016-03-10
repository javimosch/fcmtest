angular.module('shopmycourse.controllers')

.controller('StartCtrl', function($scope, $state, CurrentUser) {
  if (CurrentUser.isLogged) {
    $state.go('tabs.home');
  }
})
