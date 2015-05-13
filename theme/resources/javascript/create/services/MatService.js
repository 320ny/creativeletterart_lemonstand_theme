CreateApp.service('MatService',function () {

  this.start = function(text) {
    this._setSelectsTo(text);
  };

  this.update = function(selection) {
    var option = $("option[value="+selection+"]");
    this._setSelectsTo(option.text());
  };

  this.selected = {
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
    mat1: '',
  };

  // private

  this._setSelectsTo = function(option_text) {
    var selects = $('.create-mat-select');
    angular.forEach(selects, function(select) {
      angular.forEach(select.options, function(option) {
        if (option.text._contains(option_text)) {
          select.value = option.value;
        };
      });
    });
  };

});
