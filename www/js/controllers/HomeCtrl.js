angular.module('shopmycourse.controllers')

.controller('HomeCtrl', function($scope, $state, $ionicLoading, $ionicModal, $ionicPopup, CurrentUser, CurrentAvailability, CurrentDelivery, DeliveryRequestAPI, moment, lodash) {

  $scope.$on("$ionicView.beforeEnter", function(event, data){
     // handle event
     console.log("State Params: ", data.stateParams);
  });

  $ionicLoading.show({
    template: 'Nous recherchons les dernières informations...'
  });

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
    $ionicLoading.hide();
  });

  $scope.currentDelivery = [];
  CurrentDelivery.get(function(currentDelivery) {
    $scope.currentDelivery = currentDelivery;
    var dates = []
    for(var schedule in currentDelivery.schedule) {
      var hours = currentDelivery.schedule[schedule].toString();
      if (moment(schedule).diff(moment(), 'days', true) >= -1 && moment(schedule).diff(moment(), 'days', true) < 0) {
        dates.push('aujourd\'hui entre ' +  hours.replace(' - ', ' et '));
      } else if (moment(schedule).diff(moment(), 'days', true) >= 0) {
        dates.push(moment(schedule).format('dddd') + ' entre ' + hours.replace(' - ', ' et '));
      }
    }

    $scope.deliveryDate = lodash.uniq(dates).join(', ');
    $ionicLoading.hide();
  });

  $scope.scheduleOrder = function () {
    CurrentDelivery.clear();
    $state.go('tabs.scheduleorder');
  };

  $scope.cancelDeliveryRequest = function(delivery_request_id) {
    var myPopup = $ionicPopup.confirm({
      template: 'Vous êtes sur le point d\'annuler votre demande de livraison, êtes-vous sûr ?',
      title: 'Annuler la demande',
      cancelText: 'retour'
    });

    myPopup.then(function(res) {
      if (res) {

        $ionicLoading.show({
          template: 'Nous envoyons votre réponse...'
        });

        CurrentDelivery.clear();
        if (delivery_request_id) {
          DeliveryRequestAPI.cancel({ idDeliveryRequest: delivery_request_id },
            function (success) {
              $ionicLoading.hide();
            },
            function (err) {
              $ionicLoading.hide();
          });
        }
        $state.go($state.current, {}, {reload: true});

      }
    });

  };

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

  $scope.shopDelivery = function () {
    CurrentAvailability.clear();
    $state.go('tabs.shopdelivery');
  };

  $scope.cancelAvailability = function() {
    function hasCompletedDelivery() {
      var completed = false;
      lodash.each($scope.currentAvailability, function(availability) {
        if (availability.delivery && availability.delivery.status === 'completed') {
          completed = true;
        }
      });

      return completed;
    }

    if (hasCompletedDelivery()) {
      $ionicPopup.alert({
        title: 'Livraison en cours',
        template: 'Vous avez une livraison en cours, vous ne pouvez pas annuler votre disponibilité maintenant'
      });
    }
    else {
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
        $ionicLoading.show({
          template: 'Nous annulons votre disponibilité...'
        });
        CurrentAvailability.cancel(function(err) {
          if (!err) {
            $scope.currentAvailability = [];
          }
          $ionicLoading.hide();
        });
      });
    }

  };
})
