angular.module('postbox', [])
	.directive('postbox', function() {
		return {
			restrict: 'A',
			templateUrl: 'ui/postbox.html',
			link: function(scope, element, attr) {
				scope.postType = 'Text'
				scope.postTypes = ['Text', 'Link', 'Photo', 'Video'];
				scope.postData = {
					'Text' : {name:'fi-pencil', color:'#53A93F'},
					'Link': {name:'fi-link', color:'#FFCE3F'},
					'Photo': {name:'fi-photo', color:'#3079ED'},
					'Video': {name:'fi-video', color:'#CB4437'},
				};
				scope.postStyle = function(type) {
					if (scope.postType == type) return {color : scope.postData[type].color};
					return '';
				}
				scope.showUrl = function() {
					if (scope.postType == 'Text' || scope.postType == 'Photo') return false;
					return true;
				}

				element.addClass('postbox');
			}
		};
	})
