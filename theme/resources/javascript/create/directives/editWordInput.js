CreateApp.directive('editWordInput', function() {
  return {
  	restrict: 'A',
  	scope: {
  	  createWord: '='
  	},
  	replace: true,
  	template: '<div class="row edit-word-directive">'+
  				'<div class="three columns offset-by-three"><label for="edit-word-input">Change/Edit Word:</label></div>'+
  			    '<div class="three columns">'+
  	              '<input id="edit-word-input" ng-model="createWord" type="text">'+
  	            '</div>'+
  	            '<div class="three columns"></div>'+
			  '</div>',
  	link: function (scope, element) {

  	  $(element).find('input').keyup(function() {
  	    num = $(this).val().length;
	    if (num >= 11) {
		   var text = $(this).val().slice(0,10)
		   $(this).val(text);
		   scope.$apply(scope.createWord = scope.createWord.slice(0,10));
	    }
	    if (num == 11) {
		   alert("The max number of characters alowed are 10");
	    }

	    // Enfore that only specific characters are allowed
	    if (num > 0) {
	      char = $(this).val().slice(-1);
	      if (!char.match(/[A-z0-9!&\s]/i)) {
		    alert(char + " is not allowed. Supported characters are letters A-Z, numbers 0-9, !, and &.");
		    var text = $(this).val().slice(0,(num -1));
		    $(this).val(text);
	      }
	    }
  	  });

  	}
  }
});
