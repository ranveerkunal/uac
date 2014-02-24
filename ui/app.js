angular.module('getUpStandUp', ['fb', 'postbox', 'topbar'])
	.config(function($fbProvider) {
		$fbProvider.setAppId('254832841352030');
		$fbProvider.setPermissions('publish_actions, user_photos');
	})
