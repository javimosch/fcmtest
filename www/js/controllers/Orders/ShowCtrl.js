angular.module('shopmycourse.controllers')

/**
 * @name OrdersShowCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Affichage d'une commande
 */

.controller('OrdersShowCtrl', function($scope, CurrentOrder, $state, $ionicLoading, $ionicPopup, $rootScope, $stateParams, CurrentCart, CurrentDelivery, $ionicModal, OrderStore, $interval, $cordovaSms, DeliveryAPI, CurrentUser, $state, $ionicSlideBoxDelegate) {

  $scope.order = {};
  $scope.user = {};

  /**
   * Validation of state parameters
   */
  function validateParameters() {
    return typeof $stateParams.idOrder !== 'undefined' || typeof $stateParams.idDeliveryRequest !== 'undefined'
  }
  if (!validateParameters()) {
    console.log('OrdersShowCtrl expected idOrder or idDeliveryRequest parameters');
    console.log($state);
    return $state.go('tab.orders');
  }


  /**
   * Chargement de l'utilisateur actuel
   */
  CurrentUser.get(function(user) {
    $scope.user = user;
  });


  /**
   * Chargement de la commande actuelle
   */
  var idDeliveryRequestParam = $stateParams.idDeliveryRequest;
  var idOrderParam = $stateParams.idOrder;
  if (CurrentOrder.exists()) {
    if(CurrentOrder.isPending()){
      CurrentOrder.fetchProductsFromDeliveryRequest(function(err,order){
        if(err){
            console.log(err);
        }
        $scope.order = order;
        onOrderReceived($scope.order);  
      })
    }else{
      $scope.order = CurrentOrder.get();
      onOrderReceived($scope.order);  
    }
  }
  else {
    /**
     * Affichage du message de chargement de la commande
     */
    $ionicLoading.show({
      template: 'Nous recherchons votre commande...'
    });
    CurrentOrder.fetch({
      id: idOrderParam,
      idDeliveryRequest: idDeliveryRequestParam
    }, function(err, order) {
      if (err) {
        console.log(err);
      }
      else {
        onOrderReceived(order);
      }
    });
  }


  /**
   *  Event handler for order received (from cache or database)
   */
  function onOrderReceived(order) {
    $scope.order = order;
    if (CurrentOrder.isPending()) {
      $scope.avatarBackground = CurrentUser.avatarFromUserAvatar('');
      CurrentCart.initFromLocalStorage($scope.order.delivery_request.id);
    }
    else {
      $scope.order.deliveryman.rating_average |= 0;
      $scope.avatarBackground = CurrentUser.avatarFromUserAvatar($scope.order.deliveryman.avatar);
      CurrentCart.initFromLocalStorage($scope.order.id);
    }
    $scope.ratingStar = $scope.order.buyer_rating ? $scope.order.buyer_rating.rating : 0;
    $ionicLoading.hide();
  }


  /**
   * Affichage de la popup de finalisation de commande
   */
  $ionicModal.fromTemplateUrl('templates/Orders/Modals/Finish.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.finishOrderModal = modal
  });
  $scope.openFinishOrderModal = function() {
    $scope.finishOrderModal.show();
  };
  $scope.closeFinishOrderModal = function() {
    $ionicSlideBoxDelegate.slide(0, 0);
    $scope.finishOrderModal.hide();
  };
  $scope.goFinishOrderModal = function() {
    $scope.finishOrderModal.hide();
    CurrentDelivery.clear();
    $state.go('tabs.home');
  };

  /**
   * Checks if current loaded order is pending
   * */
  $scope.isPending = function() {
    return $scope.order && $scope.order.status == 'pending';
  };

  /**
   * @name $scope.goBack
   * @description Retour à la liste des commandes
   */
  $scope.goBack = function() {
    $state.go('tabs.orders');
  };

  /**
   * @name $scope.sendSMS
   * @description Contact du livreur par SMS
   */
  $scope.sendSMS = function() {
    var number = $scope.order.deliveryman.phone;
    $cordovaSms.send(number, '', {
      android: {
        intent: 'INTENT' // send SMS with the native android SMS messaging
      }
    }).then(function() {
      console.log('Succesfully send SMS');
    }, function(err) {
      console.log(err);
    });
  };

  /**
   * @name $scope.confirmDelivery
   * @description Confirmation de la commande
   */
  $scope.confirmDelivery = function() {
    total = Math.round(($scope.order.total + $scope.order.commission) * 100) / 100

    if ($scope.user.wallet && $scope.user.wallet.credit_card_display) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Paiement',
        template: 'Votre carte ' + $scope.user.wallet.credit_card_display + ' sera débitée de ' + total + ' €. Vous pouvez modifier ce numéro de carte dans la partie Paramètres de l\'application.',
        cancelText: 'Retour',
        okText: 'OK'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $ionicLoading.show({
            template: 'Nous envoyons votre commande...'
          });
          DeliveryAPI.confirm({
            'idDelivery': $scope.order.id
          }, function() {
            OrderStore.pull(function(orders) {
              $scope.modalTitle = "<div class=\"mascot\"><img src=\"img/notifs/commande_envoyee.jpg\" alt=\"commande_envoyee\"></div><span class=\"title\">Commande envoyée</span>"
              $scope.modalMessage = "Votre livreur va recevoir votre liste de courses d'ici quelques minutes."
              $scope.modalClose = function() {
                $state.go('tabs.orders');
                $scope.modal.hide();
              }

              $ionicModal.fromTemplateUrl('default-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
                $ionicLoading.hide();
                $scope.modal.show();
              });
            })
          }, function(err) {
            var alertPopup = $ionicPopup.alert({
              title: 'Erreur',
              template: "Une erreur est survenue lors du paiement, vous avez peut-être dépassé l'heure limite. Si ce n'est pas le cas merci de nous contacter.",
            });

            alertPopup.then(function(res) {
              console.log(err);
              $state.go('tabs.orders')
            })
            $ionicLoading.hide();
          })
        }
      })
    }
    else {
      $state.go('tabs.orderpayment', {
        idOrder: parseInt($stateParams.idOrder)
      })
    }
  };

})
