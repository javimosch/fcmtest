angular.module('shopmycourse.controllers')

.controller('HomeCtrl', function($scope, $state, $ionicModal, $ionicPopup, CurrentUser, CurrentAvailability, moment, lodash) {
  $scope.currentAvailability = [];
  CurrentAvailability.load(function(currentAvailability) {
    $scope.currentAvailability = currentAvailability;
    // Aggregate date
    var date = [];
    for (var i = 0; i < currentAvailability.length; i++) {
      date.push(moment(currentAvailability[i].schedule.date).toNow());
    }
    $scope.date = lodash.uniq(date).join(', ').replace(/,\ /, ' et ')
  });

  if (!CurrentUser.isLogged()) {
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

  $scope.cancelAvailability = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Annuler cette disponibilité',
      template: 'Voulez-vous vraiment annuler la disponibilité que vous avez déposée?',
      cancelText: 'Non',
      okText: 'Oui'
    });

    confirmPopup.then(function(res) {
      if(!res) {
        return;
      }
      CurrentAvailability.cancel(function() {
        $scope.currentAvailability = [];
      });
    });
  };
})
