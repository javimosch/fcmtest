angular.module('shopmycourse.services')

.service('CurrentUser', function ($rootScope, $localstorage, UserAPI) {
    var currentUser = $localstorage.getObject('current_user') || {};
    var isLogged = (Object.keys(currentUser).length > 0);
    $rootScope.currentUser = currentUser;

    return {
        get: function () {
            return currentUser;
        },
        set: function(user) {
            currentUser = user;
            $localstorage.setObject('current_user', currentUser);
            $rootScope.currentUser = currentUser;
        },
        setToken: function(token) {
            $localstorage.set('token', token);
        },
        isLogged: isLogged,
        setLogged: function(value) {
            isLogger = value;
        },
        reloadUser: function() {
            UserAPI.get({}, function(user) {
                currentUser= user;
                $localstorage.setObject('current_user', currentUser);
                $rootScope.currentUser = currentUser;
            })
        }
    };
});
