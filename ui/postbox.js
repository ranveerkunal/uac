angular.module('postbox', ['fb', 'flow'])
	.directive('postbox', ['$fb', function($sn) {
		return {
			restrict: 'A',
			templateUrl: 'ui/postbox.html',
			link: function(scope, element, attr) {
				scope.fields = {};
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
					delete scope.fields[name];
					return false;
				}
				element.addClass('postbox');
			}
		};
	}])
	.directive('fileBind', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				element.bind('change', function(event) {
					scope.$apply(function() {
						scope.fields[attr.name] = event.target.files[0];
					});
				});
			}
		};
	});
