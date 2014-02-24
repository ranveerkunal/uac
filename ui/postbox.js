angular.module('postbox', ['fb'])
	.directive('postbox', ['$fb', function($sn) {
		return {
			restrict: 'A',
			templateUrl: 'ui/postbox.html',
			link: function(scope, element, attr) {
				scope.plugged = false;
				$sn.Plugged().then(function(response) {
					scope.plugged = response;
				});

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
					console.log(scope.fields);
				}

				// Show
				scope.show = function(name) {
					if (scope.postType == name) return true;
					scope.fields[name] = '';
					console.log('show');
					console.log(scope.fields);
					return false;
				}
				element.addClass('postbox');
			}
		};
	}])
	.directive('fileBind', function() {
		return {
			restrict: 'A',
			transclude: true,
			link: function( scope, element, attrs ) {
				if (scope.fields == undefined) scope.fields = {};
				scope.fields[name] = '';
				element.bind('change', function(event) {
					scope.$apply(function() {
						scope.fields[attrs.name] = event.target.files[0];
						console.log(scope.fields);
					});
				});
				scope.$watch(scope.fields[attrs.name], function(file) {
					console.log(file);
				});
			}
		};
	});
