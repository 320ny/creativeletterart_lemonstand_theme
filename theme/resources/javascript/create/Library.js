CreateApp.service('Library',function ($http, $q) {

  this.list = function(character) {
    return this.data[character.toUpperCase()];
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
    var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
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
