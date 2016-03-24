angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, NotificationAPI, CurrentUser) {

	$scope.notifications = [];
	CurrentUser.get(function (user) {
		NotificationAPI.get({}, function (notifications) {
			$scope.notifications = notifications;
			if (notifications.length > 0) {
				$scope.openNotificationsModal();
			}
		}, function (err) {
			console.error('Notifications error : ', err);
		});
	});

})
