angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, $state, NotificationAPI, DeliveryAPI, CurrentUser, lodash) {

	$scope.notifications = [];
	CurrentUser.get(function (user) {
		NotificationAPI.get({}, function (notifications) {
			$scope.notifications = lodash.map(notifications, function (n) {
				n.meta = JSON.parse(n.meta);
				switch (n.mode) {
					case 'delivery_request':
						n.meta.buyer.average_rating = n.meta.buyer.average_rating || 0;
						break;
					case 'accepted_delivery':
						n.meta.deliveryman.average_rating = n.meta.deliveryman.average_rating || 0;
						break;
				}
				console.log(n);
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
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			DeliveryAPI.create({availability_id: notification.meta.availability.id, delivery_request_id: notification.meta.delivery_request.id, status: 'accepted'}, function (delivery) {
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
			}, function (err) {
				console.error(err);
			});
		}, function (err) {
			console.error(err);
		})
	};

	$scope.declineDelivery = function (notification) {
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
		}, function (err) {
			console.error(err);
		})
	};

	$scope.editCart = function (notification) {
		NotificationAPI.update({idNotification: notification.id, read: true}, function () {
			$scope.closeNotificationsModal();
			$state.go('tabs.ordercontent', {idOrder: notification.meta.delivery.id});
		});
	};

})
