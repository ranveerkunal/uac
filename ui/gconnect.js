(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://plus.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function onSignInCallback(authResult) {
	if (authResult['status']['signed_in']) {
		document.getElementById('gConnect').setAttribute('style', 'display: none');
	} else {
		console.log('Sign-in state: ' + authResult['error']);
	}
}

angular.module('gconnect', [])
	.directive('gconnect', function() {
		return {
			restrict: 'E',
			templateUrl: 'ui/gconnect.html',
		};
	})
