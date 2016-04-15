angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, $ionicPopup, $ionicLoading, toastr, $state, NotificationAPI, DeliveryAPI, CurrentUser, lodash) {

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

	$scope.acceptDelivery = function (notification) {
		$ionicLoading.show({
			template: 'Nous envoyons votre réponse...'
		});
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			DeliveryAPI.create({availability_id: notification.meta.availability.id, delivery_request_id: notification.meta.delivery_request.id, status: 'accepted'}, function (delivery) {
				var notifications = $scope.notifications;
				$scope.notifications = [];
				for (var i = 0; i < notifications.length; i++) {
					if(notifications[i].id !== notification.id) {
						$scope.notifications.push(notification);
					}
				}

				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Votre réponse à été prise en compte',
					template: 'L\'acheteur va recevoir une notification l\'invitant à remplir son panier. Vous serez averti à ce moment là.'
				});

				alertPopup.then(function(res) {
					if ($scope.notifications.length === 0) {
						$scope.closeNotificationsModal();
					}
				});
			}, function (err) {
				$ionicLoading.hide();
				console.error(err);
			});
		}, function (err) {
			$ionicLoading.hide();
			console.error(err);
		})
	};

	$scope.declineDelivery = function (notification) {
		$ionicLoading.show({
			template: 'Nous envoyons votre réponse...'
		});
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			var notifications = $scope.notifications;
			$scope.notifications = [];
			for (var i = 0; i < notifications.length; i++) {
				if(notifications[i].id !== notification.id) {
					$scope.notifications.push(notification);
				}
			}
			if ($scope.notifications.length === 0) {
				$scope.closeNotificationsModal();
			}
			$ionicLoading.hide();
		}, function (err) {
			console.error(err);
			$ionicLoading.hide();
		})
	};

	$scope.editCart = function (notification) {
		$ionicLoading.show({
			template: 'Nous préparons votre panier...'
		});
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.ordercontent', {idOrder: notification.meta.delivery.id});
		});
	};

	$scope.goDelivery = function (notification) {
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			$scope.closeNotificationsModal();
			$ionicLoading.hide();
			$state.go('tabs.delivery', {idDelivery: notification.meta.delivery.id});
		});
	};

})
