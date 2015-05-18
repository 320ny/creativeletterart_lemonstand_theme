CreateApp.service('Library',function ($http, $q, SymbolChecker) {

  this.list = function(character) {
    if (SymbolChecker.isSymbol(character)) {
      var list = this.data['Symbol'];
    } else {
      var list = this.data[character.toUpperCase()];
    }
    return list ? list : [];
  };

  this.findByCode = function(name, code) {
    var list = this.list(name);
    var i=0, len=list.length;
    for (; i<len; i++) {
      if (list[i]['code'] == code) {
        return list[i];
      }
    }
  };

  this.loadAllCharacters = function() {
    var deferred = $q.defer();
    var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
                   'P','Q','R','S','T','U','V','W','X','Y', '0', '1', '2', '3',
                   '4','5', '6', '7', '8', '9', 'Symbol'];
    angular.forEach(letters, function(c) {
      this.getCharacterData(c);
    }, this);
    this.getCharacterData('Z').
      then(function() {
        deferred.resolve();
      });
    return deferred.promise;
  };

  // private

  this.data = {}

  this.getCharacterData = function(character) {
    var _this = this;
    return $http.jsonp("https://app.creativeletterart.net/api/letters/"+ character +"/list?callback=JSON_CALLBACK").
      success(function(data) {
        _this.data[character] = data;
      });
  };

});
