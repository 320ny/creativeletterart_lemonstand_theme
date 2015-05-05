var CreateApp = angular.module('CreateApp',['ngRoute']);

CreateApp.run(function($location) {
	var word = $location.search().word || '';
	if (word.length == 0) {
		console.log("hello in config");
		$location.url("?word=welcome&state=configure&theme=Architecture");
	}
});

CreateApp.filter('createSymbol', function() {
	return function(input) {
	  if (input == '!' || input == '&')
	  	return 'symbol';
	  else
	  	return input;
	};
});
