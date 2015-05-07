CreateApp.controller('CreateController', function($scope, $location, Character, ThemeService, ProductService, Library, FrameService) {
  /*
  * INITIAL VALUES
  */
  $scope.word = $location.search().word || '';
  $scope.characters = [];

  $scope.themeService = ThemeService;
  $scope.frameService = FrameService;
  $scope.product = ProductService;
  $scope.library = Library;

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
    console.log("Photo changed to "+newValue)
  }, true);

  /*
  * THEME
  */
  $scope.$watch("themeService.selectedTheme", function(newValue, oldValue) {
  	if (newValue != oldValue) {
  		$scope.changeTheme(newValue);
  	}
    console.log("Theme changed to "+newValue)
  }, true);

  $scope.changeTheme = function (newTheme) {
  	angular.forEach($scope.characters, function(value, key) {
  		value.code = ThemeService.findThemeCode(newTheme, value.name);
  	});
  };


  /*
  * INTERNAL FUNCTIONS
  */
  $scope.geterateCharacters = function () {
  	$scope.characters = [];
    angular.forEach($scope.word, function(value, key) {
       this.characters.push(new Character({id: key + 1, name: value}));
     }, $scope);
  };

  /*
  * LOAD
  */
  this.load = function () {
  	Library.loadAllCharacters().then(function() {
      $scope.geterateCharacters();
      if ($location.search().theme) {
    		$scope.themeService.selectedTheme = $location.search().theme.toLowerCase();
    		$scope.changeTheme($scope.themeService.selectedTheme);
    	}
    });
  };

  this.load();
});
