angular.module('shopmycourse.services')

.factory('DeliveryStatus', function () {
  return {
    accepted: {
      color: "grey",
      icon: "ion-checkmark"
    },
    completed: {
      color: "#EC644B",
      icon: "ion-checkmark"
    },
    done: {
      color: "green",
      icon: "ion-checkmark"
    },
    canceled: {
      color: "red",
      icon: "ion-close"
    }
  };
});
