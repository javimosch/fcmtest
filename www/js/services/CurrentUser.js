angular.module('shopmycourse.services')

.service('CurrentUser', function ($rootScope, DataStorage, UserAPI, HTTPInterceptor) {
    var currentUser = {};

    return {
        init: function (next) {
          return DataStorage.get('current_user').then(function (currentUserFromStorage) {
            currentUser = currentUserFromStorage || {};
            isLogged = (Object.keys(currentUser).length > 0);
            $rootScope.currentUser = currentUser;
            return DataStorage.get('token').then(function (tokenFromStorage) {
              next();
              HTTPInterceptor.setToken(tokenFromStorage);
            });
          });
        },
        get: function (next) {
          return next(currentUser);
        },
        set: function (user, next) {
          currentUser = user;
          return DataStorage.set('current_user', currentUser).then(function () {
            $rootScope.currentUser = currentUser;
            return next(currentUser);
          });
        },
        setToken: function (token, next) {
          HTTPInterceptor.setToken(token);
          return DataStorage.set('token', token).then(next);
        },
        getToken: function (next) {
          return DataStorage.set('token').then(next);
        },
        isLogged: function () {
          return (currentUser && Object.keys(currentUser).length > 0)
        },
        getAvatar: function (next) {
          if((Object.keys(currentUser).length == 0) || !currentUser.avatar || !currentUser.avatar.url) {
            return next('img/no_image_user.png')
          } else {
            return next(currentUser.avatar.thumb.url ? currentUser.avatar.thumb.url.replace(/http:/g, 'https:') : currentUser.avatar.thumb.replace(/http:/g, 'https:'))
          }
        }
    };
});
