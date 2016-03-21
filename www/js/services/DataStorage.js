angular.module('shopmycourse.services')

.factory('DataStorage', function ($localForage) {
  return {
    set: function (key, value) {
      return $localForage.setItem(key, value);
    },
    get: function (key) {
      return $localForage.getItem(key);
    },
    remove: function (key) {
      return $localForage.removeItem(key);
    },
    clear: function () {
      return $localForage.clear();
    }
  };
});
