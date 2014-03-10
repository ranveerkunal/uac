angular.module('postbox', ['fb'])
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
					return scope.postType == name;
				}
				element.addClass('postbox');
			}
		};
	}])
	.directive('fileinput', function() {
		var hexToBase64 = function(str) {
			return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')));
		}
		return {
			require:'ngModel',
			restrict: 'A',
			templateUrl: 'ui/fileinput.html',
			link: function(scope, element, attr, ngModel) {
				scope.remove = function() {
					scope.src = undefined;
					ngModel.$setViewValue('');
				}

				element.bind('change', function(event) {
					scope.$apply(function() {
						var reader = new FileReader();
						reader.onload = function(file) {
							ngModel.$setViewValue(file.target.result);
							scope.$apply(function() {
								scope.src = 'data:image/jpeg;base64,' + btoa(file.target.result);
							});
						}
						reader.readAsBinaryString(event.target.files[0]);
					});
				});
			}
		};
	});
