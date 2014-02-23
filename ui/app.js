angular.module('getUpStandUp', ['ngFacebook', 'postbox', 'topbar'])
	.config(function($facebookProvider) {
		$facebookProvider.setAppId('254832841352030');
		$facebookProvider.setPermissions('publish_actions, user_photos');
	})
	.run(function($rootScope) {
		(function(d){
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = '//connect.facebook.net/en_US/all.js';
			ref.parentNode.insertBefore(js, ref);
		}(document));
	});
