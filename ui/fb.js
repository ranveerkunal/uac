(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

window.fbAsyncInit = function() {
	FB.init({
		appId      : '254832841352030',
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		if (response.status === 'connected') console.log("Logged In")
		else if (response.status === 'not_authorized') FB.login();
		else FB.login();
	});
};

angular.module('fb', [])
	.directive('fb', function() {
		return {
			restrict: 'E',
			templateUrl: 'ui/fb.html',
		};
	})
