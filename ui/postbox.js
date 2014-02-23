angular.module('postbox', ['fb'])
	.directive('postbox', ['$fb', function($postman) {
		return {
			restrict: 'A',
			templateUrl: 'ui/postbox.html',
			link: function(scope, element, attr) {
				scope.postType = '';
				scope.postTypes = ['Text', 'Link', 'Photo', 'Video'];
				scope.postData = {
					'Text' : {name:'fi-pencil', color:'#53A93F'},
					'Link': {name:'fi-link', color:'#FFCE3F'},
					'Photo': {name:'fi-photo', color:'#3079ED'},
					'Video': {name:'fi-video', color:'#CB4437'},
				};
				scope.postStyle = function(type) {
					if (scope.postType == '') return {'color':scope.postData[type].color, 'opacity':'0.5'};
					if (scope.postType == type) return {'color':scope.postData[type].color, 'font-size':'4em'};
					return {'font-size':'4em'};
				}
				scope.click = function() {
					var body = 'Reading JS SDK documentation';
					FB.api('/me/feed', 'post', { message: body }, function(response) {
						if (!response || response.error) {
							console.log(response);
						} else {
							console.log('Post ID: ' + response.id);
						}
					});
				}
				element.addClass('postbox');
			}
		};
	}]);
