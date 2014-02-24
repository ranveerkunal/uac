angular.module('fb', [])
	.provider('$fb', function() {
		var config = {
			permissions: '',
			appId: '',
		};

		this.setAppId = function(appId) {
			config.appId = appId;
			return this;
		};

		this.setPermissions = function(permissions) {
			config.permissions = permissions;
			return this;
		};

		this.$get = ['$q', function($q) {
			var $fb = $q.defer();
			$fb.Config = function(property) {
				return config[property];
			};
			$fb.Status = '';
			$fb.Name = '';
			$fb.Cover = '';
			$fb.loaded = $q.defer();

			$fb.me = function() {
				var deferred = $q.defer();
				FB.api('/me', function(response) {
					if (!response || response.error) {
						deferred.resolve('NAME_FAILED');
						return;
					}
					$fb.Name = response.name;
					FB.api('/me/picture', function(response) {
						if (!response || response.error) {
							deferred.resolve('COVER_FAILED');
							return;
						}
						$fb.Cover = response.data.url;
						deferred.resolve('OK');
					});
				});
				return deferred.promise;
			}

			$fb.Plugged = function() {
				var deferred = $q.defer();
				$fb.loaded.promise.then(function(loaded) {
					FB.getLoginStatus(function(response) {
						$fb.Status = response.status;
						if (response.status === 'connected') {
							$fb.me().then(function(status) {
								if (status == 'OK') {
									deferred.resolve(true);
									return;
								}
								deferred.resolve(false);
							});
							return;
						}
						deferred.resolve(false);
					});
				});
				return deferred.promise;
			}

			$fb.Plug = function() {
				var deferred = $q.defer();
				FB.login(function(response) {
					if (response.authResponse) {
						$fb.me().then(function(status) {
							deferred.resolve(status);
						});
						return
					} else {
						deferred.resolve('NOT_FULLY_AUTH');
					}
				}, {scope: $fb.Config('permissions')});
				return deferred.promise;
			}
			return $fb;
		}];
	})
	.run(function($window, $fb) {
		$window.fbAsyncInit = function() {
			FB.init({
				appId      : $fb.Config('appId'),
				status     : true,
				xfbml      : true,
			});
			$fb.loaded.resolve(true);
			console.log('FB javascripts loaded successfully.');
		};
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = '//connect.facebook.net/en_US/all.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	});
