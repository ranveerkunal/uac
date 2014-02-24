angular.module('topbar', ['fb'])
	.directive('topbar', ['$fb', function($sn) {
		var init = function(scope) {
			scope.plugged = false;
			scope.name = "";
			scope.cover = "";
			$sn.Plugged().then(function(response) {
				scope.plugged = response;
				if (scope.plugged) {
					scope.name = $sn.Name;
					scope.cover = $sn.Cover;
				}
			});
		}
		return {
			restrict: 'A',
			templateUrl: 'ui/topbar.html',
			link: function(scope, element, attr) {
				init(scope);
				scope.plug = function() {
					console.log(this);
					$sn.Plug().then(
						function(response) {
							init(scope);
						},
						function(error) {
							console.log(error);
						}
					);
				}
				element.addClass('topbar');
			}
		};
	}]);
