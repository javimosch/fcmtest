angular.module('shopmycourse.services')

/**
 * @name CurrentUser
 * @function Service
 * @memberOf shopmycourse.services
 * @description Stockage de l'utilisateur actuel
 */

.service('CurrentUser', function($rootScope, DataStorage, UserAPI, HTTPInterceptor, $log, Promise, Store) {
  var currentUser = {};

  function avatarFromUserAvatar(avatar) {
    if (avatar && avatar.avatar) {
      avatar = avatar.avatar;
    }
    if ((Object.keys(currentUser).length === 0) || !avatar || !avatar.url) {
      return 'img/no_image_user.png';
    }
    else {
      return avatar.thumb.url ? avatar.thumb.url.replace(/http:/g, 'https:') : avatar.thumb.replace(/http:/g, 'https:');
    }
  }

  //$log.debug('DEBUG: creating user store');
  var UserStore = Store.create('User');

  var self = {
    awake: Promise('current_user_awake'),
    /**
     * @name init
     * @description Initialisation de l'utilisateur
     */
    init: function(next) {
      //$log.debug('DEBUG: CurrentUser init');
      return DataStorage.get('current_user').then(function(currentUserFromStorage) {
        currentUser = currentUserFromStorage || {};
        var isLogged = (Object.keys(currentUser).length > 0);
        $rootScope.currentUser = currentUser;
        Promise('current_user_awake').resolve(currentUser);




        DataStorage.get('token').then(function(tokenFromStorage) {
          next();
          HTTPInterceptor.setToken(tokenFromStorage);

          if (isLogged) {
            //$log.debug('DEBUG: user store exists');
            //double check (user id)
            /*
            UserStore('exists', {
              email: currentUser.email,
              id: currentUser.id
            }).then(function(err, res) {
              $log.info('EXISTS', err, res);
            });*/
          }

        });



      });
    },
    /**
     * @name get
     * @description Récupération de l'utilisateur actuel
     */
    get: function(next) {
      return next(currentUser);
    },
    /**
     * @name set
     * @description Mise à jour de l'utilisateur actuel
     */
    set: function(user, next) {
      currentUser = user;
      return DataStorage.set('current_user', currentUser).then(function() {
        $rootScope.currentUser = currentUser;
        return next(currentUser);
      });
    },
    /**
     * @name setToken
     * @description Ajout du token à l'utilisateur actuel
     */
    setToken: function(token, next) {
      HTTPInterceptor.setToken(token);
      return DataStorage.set('token', token).then(next);
    },
    /**
     * @name getToken
     * @description Récupération du token de l'utilisateur actuel
     */
    getToken: function(next) {
      return DataStorage.set('token').then(next);
    },
    /**
     * @name isLogged
     * @description Retourne l'utilisateur si il est connecté
     */
    isLogged: function() {
      return (currentUser && Object.keys(currentUser).length > 0)
    },
    /**
     * @name avatarFromUserAvatar
     * @description Traitement de l'avatar à partir de celui présent dans la mémoire du téléphone
     */
    avatarFromUserAvatar: avatarFromUserAvatar,
    /**
     * @name getAvatar
     * @description Retourne l'avatar de l'utilisateur
     */
    getAvatar: function() {
      return avatarFromUserAvatar(currentUser.avatar);
    }
  };
  window.CurrentUser = self;
  return self;
});
