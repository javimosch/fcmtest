angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, NotificationAPI, CurrentUser) {

	$scope.notifications = [];

	NotificationAPI.get({user_id: CurrentUser.get().id}, function (notifications) {
		$scope.notifications = notifications;
	}, function (err) {
		console.error('Notifications error : ' + err);
	});

})
