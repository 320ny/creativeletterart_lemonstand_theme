CreateApp.controller('CreateController', function($scope, $location, Character, ThemeService, ProductService) {
  /*
  * INITIAL VALUES
  */
  $scope.word = $location.search().word || '';
  $scope.characters = [];

  $scope.themeService = ThemeService;
  $scope.product = ProductService;

  /*
  * WORD
  */
  $scope.$watch("word", function(newValue, oldValue) {
    if (newValue != oldValue) {
    	$scope.geterateCharacters();
    }
  }, true);

  /*
  * PHOTO
  */
  $scope.$watch("product.photo", function(newValue, oldValue) {
  	if (newValue != oldValue) {
  		angular.forEach($scope.characters, function(value, key) {
  		  value.photo = newValue;
  		});
  	}
  }, true);

  /*
  * THEME
  */
  $scope.$watch("themeService.selectedTheme", function(newValue, oldValue) {
  	if (newValue != oldValue) {
  		$scope.changeTheme(newValue);
  	}
  }, true);

  $scope.changeTheme = function (newTheme) {
  	angular.forEach($scope.characters, function(value, key) {
  		value.code = ThemeService.findThemeCode(newTheme, value.name);
  	});
  	console.log("changing theme");
  };


  /*
  * INTERNAL FUNCTIONS
  */
  $scope.geterateCharacters = function () {
  	$scope.characters = [];
    angular.forEach($scope.word, function(value, key) {
       this.characters.push(new Character({id: key + 1, name: value}));
     }, $scope);
  }

  /*
  * STATE
  */
  $scope.stateToConfigure = function () {
  	$scope.geterateCharacters();
  	// Set styles on create section
  	$('#create_section').css('background-image', 'url("/resources/images/modernblack_' + $scope.word.length +'.png")');
  	var width = $scope.word.length * 103 + (10 - $scope.word.length) * 13;
	$('#create_section').css({'width': width + 'px', 'height': '282px'});
	$('#create').css('width', 'auto');
	// Update select dropdown

    $scope.state = 'configure';
  };


  /*
  * LOAD
  */
  this.load = function () {
    $scope.geterateCharacters();
  	ThemeService.getCodes();
  	if ($location.search().theme) {
  		$scope.themeService.selectedTheme = $location.search().theme.toLowerCase();
  		$scope.changeTheme($scope.themeService.selectedTheme);
  	}
  };

  this.load();
});
