angular.module('shopmycourse.controllers')

.controller('DeliveriesScheduleCtrl', function($scope, $rootScope, $ionicLoading, $state, CurrentUser, CurrentAvailability, AvailabilityAPI, $ionicHistory, $ionicModal, CurrentDelivery, DeliveryStore) {
  $scope.schedules = [];
  $scope.selected = {};

  for (var i = 0; i < 7; i++) {
    var date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    $scope.schedules.push({
      date: date,
      times: ['08h - 10h', '10h - 12h', '12h - 14h', '14h - 16h', '16h - 18h', '18h - 20h', '20h - 22h']
    })
  }

  $scope.selectTime = function (date, time) {
    // Si la case est déjà selectionnées
    if ($scope.isSelected(date, time)) {
      var index = $scope.selected[date].indexOf(time);
      $scope.selected[date].splice(index, 1);
      if ($scope.selected[date].length == 0) {
        delete $scope.selected[date];
      }
      return;
    }
    // Si la case n'est pas selectionnées
    else {
      if (!$scope.selected[date] || $scope.selected[date].length <= 0) {
        $scope.selected[date] = []
      }
      $scope.selected[date].push(time);
    }
  };

  $scope.isSelected = function (date, time) {
    if (!$scope.selected[date] || $scope.selected[date].length <= 0) {
      return false;
    }
    return ($scope.selected[date].indexOf(time) > -1);
  };

  $scope.validate = function () {
    $ionicLoading.show({
      template: 'Nous enregistrons votre disponibilité...'
    });
    CurrentAvailability.setSchedules($scope.selected, function (currentAvailability) {
      AvailabilityAPI.create(currentAvailability, function() {
        console.log('Availabilities created !');
        $ionicLoading.hide();
      }, function(err) {
        console.log('Erreur');
        console.log(err);
        $ionicLoading.hide();
      });

      $scope.modalTitle = "Bravo !"
      $scope.modalMessage = "Votre proposition de livraison a été enregistrée. Vous serez notifié dés qu'une demande de livraison correspondra à vos critères."
      $scope.modalClose = function () {
        CurrentDelivery.clear(function() {
          $state.go('tabs.deliveries');
          $scope.modal.hide();
        });
      }

      $ionicModal.fromTemplateUrl('default-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    });
  };

})
