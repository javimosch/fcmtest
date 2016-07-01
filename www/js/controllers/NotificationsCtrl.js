angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, $ionicPopup, $ionicLoading, toastr, $state, NotificationAPI, DeliveryAPI, CurrentUser, CurrentDelivery, lodash) {

	$scope.notifications = [];
	CurrentUser.get(function (user) {
		NotificationAPI.get({}, function (notifications) {
			$scope.notifications = lodash.map(notifications, function (n) {
				n.meta = JSON.parse(n.meta);
				switch (n.mode) {
					case 'delivery_request':
						n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
						break;
					case 'accepted_delivery':
						CurrentDelivery.clear();
						n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
						break;
					case 'order_reminder':
						n.meta.deliveryman.rating_average = n.meta.deliveryman.rating_average || 0;
						break;
					case 'cart_filled':
						n.meta.buyer.rating_average = n.meta.buyer.rating_average || 0;
						break;
				}
				return n;
			});
			if (notifications.length > 0) {
				$scope.openNotificationsModal();
			}
		}, function (err) {
			console.error('Notifications error : ', err);
		});
	});

	function removeNotification(id) {
		var notifications = $scope.notifications;
		$scope.notifications = [];
		for (var i = 0; i < notifications.length; i++) {
			if(notifications[i].id !== id) {
				$scope.notifications.push(notifications[i]);
			}
		}

		if ($scope.notifications.length === 0) {
			$scope.closeNotificationsModal();
		}
	}

	$scope.readNotification = function(notification, next) {
		NotificationAPI.update({
			idNotification: notification.id,
			read: true
		}, function() {
			removeNotification(notification.id);
			if (next)
				next();
		});
	}

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
							template: 'Il ne vous reste plus qu\'à attendre la création de la liste par l\'acheteur'
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
	}

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

	$scope.editCart = function (notification) {
		$ionicLoading.show({
			template: 'Nous préparons votre panier...'
		});
			$scope.readNotification(notification, function () {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.ordercontent', {idOrder: notification.meta.delivery.id});
		});
	};

	$scope.goDelivery = function (notification) {
			$scope.readNotification(notification, function () {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.delivery', {idDelivery: notification.meta.delivery.id});
		});
	};

})
