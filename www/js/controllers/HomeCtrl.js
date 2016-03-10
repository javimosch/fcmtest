angular.module('shopmycourse.controllers')

.controller('HomeCtrl', function($scope, $state, $ionicModal, CurrentUser) {

  this.test = "BORDEL";
  
  if (!CurrentUser.isLogged) {
    $state.go('start');
  }
  $ionicModal.fromTemplateUrl('NotificationsModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.notificationsModal = modal
  });

  $scope.openNotificationsModal = function () {
    $scope.notificationsModal.show();
  };

  $scope.closeNotificationsModal = function () {
    $scope.notificationsModal.hide();
  };
})
