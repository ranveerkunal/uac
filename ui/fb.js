angular.module('fb', [])
	.factory('$fb', function() {
		var init = function(scope) {
			fb = this;
			FB.api("/me", function(response) {
				if (response && !response.error) {
					scope.$apply(function() {
						fb.me = response;
					});
				}
			});
		}

		var ready = function() {
			return this.me != undefined;
		}

		return {
			auth: undefined,
			me: undefined,
			init: init,
			ready: ready,
		}
	})
    .directive('fb', ['$fb', function(fb) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'ui/fb.html',
			scope: {
				'appId': '=appId',
			},
			link: function(scope, element, attr) {
				scope.fb = fb;
				scope.login = function(response) {
					fb.auth = response;
					fb.init(scope);
				}

				window.fbAsyncInit = function() {
					FB.init({
						appId      : scope.appId,
						status     : true, // check login status
						cookie     : true, // enable cookies to allow the server to access the session
						xfbml      : true  // parse XFBML
					});

					FB.Event.subscribe('auth.authResponseChange', function(response) {
						if (response.status === 'connected') scope.$apply(scope.login(response));
						else if (response.status === 'not_authorized') FB.login();
						else FB.login();
					});
				};

				// Load the SDK asynchronously
				(function(d){
					var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
					if (d.getElementById(id)) {return;}
					js = d.createElement('script'); js.id = id; js.async = true;
					js.src = '//connect.facebook.net/en_US/all.js';
					ref.parentNode.insertBefore(js, ref);
				}(document));
			},
        };
    }]);
