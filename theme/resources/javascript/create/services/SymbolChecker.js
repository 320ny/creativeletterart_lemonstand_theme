SymbolChecker = CreateApp.service('SymbolChecker', function () {

  this.isSymbol = function(character) {
    var index = $.inArray(character.toUpperCase(), this._list)
    return index != -1;
  };

  this._list = ['!', '&'];
});
