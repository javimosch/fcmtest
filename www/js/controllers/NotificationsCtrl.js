angular.module('shopmycourse.controllers')

.controller('NotificationsCtrl', function($scope, NotificationAPI, CurrentUser) {

	$scope.notifications = [];
	CurrentUser.get(function (user) {
		NotificationAPI.get({user_id: user.id}, function (notifications) {
			$scope.notifications = notifications;
		}, function (err) {
			console.error('Notifications error : ' + err);
		});
	});

})
