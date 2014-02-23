angular.module('fb', ['ngFacebook'])
	.provider('$fb', function() {
		this.$get = ['$q', '$facebook', function($q, $facebook) {
			var $fb = $q.defer();

			$fb.Plugged = function() {
				return $facebook.getLoginStatus();
			}

			$fb.Plug = function() {
				var deferred = $q.defer();
				FB.login(function(response) {
					if (response.authResponse) {
						console.log('Welcome!  Fetching your information.... ');
						FB.api('/me', function(response) {
							deferred.resolve(response);
							console.log('Good to see you, ' + response.name + '.');
						});
					} else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});
				return deferred.promise;
			}

			$fb.Name = function() {
				var deferred = $q.defer();
				console.log("Name");
				$facebook.api("/me").then(function(response) {
					console.log(response);
					return deferred.resolve(response.name);
				});
				return deferred.promise;
			};

			$fb.Cover = function() {
				console.log("Cover");
				var deferred = $q.defer();
				$facebook.api("/me/picture").then(function(response) {
					console.log(response);
					return deferred.resolve(response.data.url);
				});
				return deferred.promise;
			};

			return $fb;
		}];
	});
