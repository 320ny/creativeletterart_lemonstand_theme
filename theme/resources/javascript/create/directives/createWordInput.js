CreateApp.directive('createWordInput', function() {
  return {
  	restrict: 'A',
  	scope: {
  	  createWord: '='
  	},
  	replace: true,
  	template: '<form ng-submit="$parent.stateToConfigure()" class="row collapse">'+
  	            '<div class="eight columns offset-by-one">'+
  	              '<input ng-model="createWord" id="type_something_input" placeholder="Type Something Here" type="text">'+
  	            '</div>'+
  	            '<div class="two columns end">'+
			      '<input ng-click="$parent.stateToConfigure()" class="button large expand" id="create_button" type="submit" value="Create It">'+
			    '</div>'+
			  '</form>',
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
