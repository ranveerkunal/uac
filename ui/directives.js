angular.module('getUpStandUp', [])
	.directive('gconnect', function() {
		return {
			restrict: 'E',
			templateUrl: 'ui/gconnect.html',
		};
	})
	.directive('postbox', function() {
		return {
			restrict: 'A',
			templateUrl: 'ui/postbox.html',
			link: function(scope, element, attr) {
				scope.icons = {
					'fi-pencil': '#53A93F',
					'fi-link': '#FFCE3F',
					'fi-photo': '#3079ED',
					'fi-video': '#CB4437',
				};
				element.addClass('postbox');
				element.find('i').on('click', function($event) {
					var id = angular.element($event.target).attr('class');

					// Loop over every icon and remove the style except this one.
					angular.forEach(element.find('i'), function(v, k) {
						var target = angular.element(v);
						if (id == target.attr('class')) {
							target.attr('style', 'color: ' + scope.icons[id]);
							return;
						}
						target.attr('style', '');
					});
				});
			}
		};
	})
