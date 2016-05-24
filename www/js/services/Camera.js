angular.module('shopmycourse.services')
.service('Camera', function () {
	return {
		getPicture: function (type, callback, toastr) {
			if(type == 0) {
				sourceType = Camera.PictureSourceType.CAMERA
			} else {
				sourceType = Camera.PictureSourceType.PHOTOLIBRARY
			}
			navigator.camera.getPicture(function(imageData) {
				callback(imageData);
			}, function(message) {
			}, {
				destinationType: Camera.DestinationType.DATA_URL,
				targetWidth: 500,
				targetHeight: 500,
				cameraDirection: Camera.Direction.FRONT,
				sourceType: sourceType
			});
		}
	}
})