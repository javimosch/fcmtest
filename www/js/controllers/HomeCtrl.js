angular.module('shopmycourse.controllers')

.controller('HomeCtrl', function($scope, $state, $ionicModal, $ionicPopup, CurrentUser, CurrentAvailability, moment, lodash) {
  $scope.currentAvailability = [];
  CurrentAvailability.load(function(currentAvailability) {
    $scope.currentAvailability = currentAvailability;
    // Aggregate date
    var dates = [];
    for (var i = 0; i < currentAvailability.length; i++) {
      // Today
      if (moment(currentAvailability[i].schedule.date).diff(moment(), 'days', true) >= -1 && moment(currentAvailability[i].schedule.date).diff(moment(), 'days', true) < 0) {
        dates.push('aujourd\'hui entre ' + currentAvailability[i].schedule.schedule.replace(' - ', ' et '));
      } else if (moment(currentAvailability[i].schedule.date).diff(moment(), 'days', true) >= 0) {
        dates.push(moment(currentAvailability[i].schedule.date).format('dddd') + ' entre ' + currentAvailability[i].schedule.schedule.replace(' - ', ' et '));
      }
    }
    $scope.date = lodash.uniq(dates).join(', ');
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
