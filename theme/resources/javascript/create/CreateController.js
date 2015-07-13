CreateApp.controller('CreateController', function($scope, $location, Character, ThemeService, ProductService, Library, FrameService, MatService) {
  /*
  * INITIAL VALUES
  */
  $scope.word = $location.search().word || '';
  $scope.characters = [];

  $scope.themeService = ThemeService;
  $scope.frameService = FrameService;
  $scope.matService = MatService;
  $scope.product = ProductService;
  $scope.library = Library;
  $scope.photoSize = '4x6'
  
  $scope.personalized = {topCenter: '', topLeft: '', bottomCenter: '', bottomRight: '', additional: ''};
  $scope.personalization = '';
  
  /*
  * WORD
  */
  $scope.$watch("word", function(newValue, oldValue) {
    if (newValue != oldValue) {
    	$scope.geterateCharacters();
      if ($scope.word) {
        setTimeout(function() {
          $scope.frameService.update($scope.word.length);
        }, 200);
      }
    }
  }, true);

  $scope.$watch("personalized", function(newValue, oldValue) {
    if (newValue != oldValue) {
        $scope.updatePersonilization();
    }
  }, true);
  
  $scope.updatePersonilization = function() {
      $scope.personalization = "";
      if ($scope.personalized.topLeft)
        $scope.personalization += 'Top Left "'+ $scope.personalized.topLeft +'" ';
      if ($scope.personalized.topCenter)
        $scope.personalization += 'Top Center "'+ $scope.personalized.topCenter +'" ';
      if ($scope.personalized.bottomCenter)
        $scope.personalization += 'Bottom Center "'+ $scope.personalized.bottomCenter +'" ';
      if ($scope.personalized.bottomRight)
        $scope.personalization += 'Bottom Right "'+ $scope.personalized.bottomRight +'" ';
      if ($scope.personalized.additional)
        $scope.personalization += 'Additional "'+ $scope.personalized.additional +'" ';
  };
  
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
  * MATING
  */
  $scope.$watch("matService.matingType", function(newValue, oldValue) {
    if (newValue != oldValue)
      $scope.frameService.update($scope.word.length);
  });

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
  };

  // Frame Size Change
  $('.create-frame-size').change(function() {
    $scope.$apply(
      $scope.frameService.sizeChanged($scope.word.length)
    );
  });

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
        $scope.frameService.start($scope.word.length, 'Black');
        //$scope.matService.start("White Background")
    	}
    });
  };

  this.load();
});
