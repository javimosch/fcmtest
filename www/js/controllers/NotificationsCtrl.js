angular.module('shopmycourse.controllers')

/**
 * @name NotificationsCtrl
 * @function Controleur
 * @memberOf shopmycourse.controllers
 * @description Gestion des notifications
 */

.controller('NotificationsCtrl', function($scope, $ionicPopup, $ionicLoading, toastr, $state, NotificationAPI, DeliveryAPI, CurrentUser, CurrentDelivery, lodash, $log, Notifications, $rootScope) {

	window.NotificationsCtrl = $scope;

	/**
	 * Chargement des notifications
	 */
	$scope.notifications = [];


	Notifications.onFetch(function(event,notifications) {
		$scope.notifications = notifications;
	});


	/*
	if (CurrentUser.isLogged()) {
		Notifications.showIfAny();
	}
	*/


	/**
	 * Suppression d'une notification dans la liste de notifications
	 */
	function removeNotification(id) {
		var notifications = $scope.notifications;
		$scope.notifications = [];
		for (var i = 0; i < notifications.length; i++) {
			if (notifications[i].id !== id) {
				$scope.notifications.push(notifications[i]);
			}
		}

		if ($scope.notifications.length === 0) {
			$scope.closeNotificationsModal();
		}
	}

	/**
	 * @name $scope.readNotification
	 * @description Passage d'une notification à l'état "Lue"
	 */
	$scope.readNotification = function(notification, next) {
		NotificationAPI.update({
			idNotification: notification.id,
			read: true
		}, function() {
			removeNotification(notification.id);
			if (next)
				next();
		});
	};

	/**
	 * @name $scope.acceptDeliveryRequest
	 * @description Acceptation d'une demande de livraison
	 */
	$scope.acceptDeliveryRequest = function(notification) {
		var myPopup = $ionicPopup.confirm({
			template: 'Vous êtes sur le point d\'accepter la livraison, êtes-vous sûr ?',
			title: 'Accepter la demande',
			cancelText: 'retour'
		});

		myPopup.then(function(res) {
			if (res) {
				$ionicLoading.show({
					template: 'Nous envoyons votre réponse...'
				});
				$scope.readNotification(notification, function() {
					DeliveryAPI.create({
						availability_id: notification.meta.availability.id,
						delivery_request_id: notification.meta.delivery_request.id,
						status: 'accepted'
					}, function(delivery) {

						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Acceptation confirmée',
							template: 'Il ne vous reste plus qu\'à attendre la création de la liste par le demandeur'
						});
						alertPopup.then(function(res) {
							if ($scope.notifications.length === 0) {
								$scope.closeNotificationsModal();
							}
						});
					}, function(err) {
						$ionicLoading.hide();
						console.error(err);
					});
				}, function(err) {
					$ionicLoading.hide();
					console.error(err);
				})
			}
		});
	};

	/**
	 * @name $scope.declineDeliveryRequest
	 * @description Refus d'une demande de livraison
	 */
	$scope.declineDeliveryRequest = function(notification) {
		var myPopup = $ionicPopup.confirm({
			template: 'Vous êtes sur le point de décliner, êtes-vous sûr ?',
			title: 'Décliner la demande',
			cancelText: 'retour'
		});

		myPopup.then(function(res) {
			if (res) {
				$scope.readNotification(notification, null);
			}
		});
	};

	/**
	 * @name $scope.cancelOrder
	 * @description Annulation d'une demande de livraison
	 */
	$scope.cancelOrder = function(notification) {
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

				$scope.readNotification(notification, function() {
					DeliveryAPI.cancel({
						idDelivery: notification.meta.delivery.id
					}, function() {
						CurrentDelivery.clear();
						$ionicLoading.hide();
					}, function(err) {
						console.error(err);
						$ionicLoading.hide();
					})
				});
			}
		});
	};

	/**
	 * @name $scope.editCart
	 * @description Lien vers la modification du panier
	 */
	$scope.editCart = function(notification) {
		$ionicLoading.show({
			template: 'Nous préparons votre panier...'
		});
		$scope.readNotification(notification, function() {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.ordercontent', {
				idOrder: notification.meta.delivery.id
			});
		});
	};

	/**
	 * @name $scope.editCart
	 * @description Lien vers une livraison
	 */
	$scope.goDelivery = function(notification) {
		$scope.readNotification(notification, function() {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.delivery', {
				idDelivery: notification.meta.delivery.id
			});
		});
	};

});
