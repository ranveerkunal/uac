angular.module('topbar', ['fb'])
	.directive('topbar', ['$fb', function($sn) {
		var init = function(scope) {
			scope.plugged = "";
			scope.name = "";
			scope.cover = "";
			$sn.Plugged().then(function(response) {
				console.log("Plugged");
				scope.plugged = response.status;
				if (scope.plugged == "connected") {
					$sn.Name().then(function(name) {
						console.log(name)
						scope.name = name;
					});
					$sn.Cover().then(function(cover) {
						console.log(cover)
						scope.cover = cover;
					});
					console.log(scope.plugged);
				}
			});
		}
		return {
			restrict: 'A',
			templateUrl: 'ui/topbar.html',
			link: function(scope, element, attr) {
				init(scope);
				scope.plug = function() {
					$sn.Plug().then(function(response) {
						init(scope);
					});
				}
				element.addClass('topbar');
			}
		};
	}]);
