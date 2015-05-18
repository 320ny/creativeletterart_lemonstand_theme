var CreateApp = angular.module('CreateApp',['ngRoute']);

CreateApp.run(function($location) {
	var word = $location.search().word || '';
	if (word.length == 0) {
		$location.url("?word=welcome&theme=Default");
	}
});

CreateApp.filter('createSymbol', function(SymbolChecker) {
	return function(input) {
	  if (SymbolChecker.isSymbol(input))
	  	return 'Symbol';
	  else
	  	return input;
	};
});
