CreateApp.factory('Character', function (ThemeService, Library) {
  var Character = function(attributes) {
  	this.id = attributes.id;
  	this.name = attributes.name;
  	this.photo = attributes.photo || 'color';
  	this.photoCode = function () {
  		var photo = '';
  		if (this.photo == 'sepia')
  			photo = '_S';
  		else if (this.photo == 'bw')
  			photo = '_BW';
  		return photo;
  	};
  	this.code = attributes.code || ThemeService.findThemeCode('default', this.name);

    // Modal Functions
  	this.modalState = 'close';
    this.modal = function (action) {
      this.modalState = action;
    };
    this.applyCodeAndPhoto = function (code, photo) {
      this.code = code;
      this.photo = photo;
      this.modalState = 'close';
    }

  	this.image_url = function() {
  		var name = this.name.toLocaleUpperCase();
      var letter = Library.findByCode(name, this.code);
  		if (this.isSymbol())
  			return '/resources/images/letters/symbols/_symbol-' + this.code + this.photoCode() + '.jpg';
  		else
  		  return letter ? letter[this.photo + '_thumb'] : undefined;
  	};



  	this.codePhotoImageUrl = function (code, photo) {
  		var name = this.name.toLocaleUpperCase();
  		if (this.isSymbol())
  			return '/resources/images/letters/symbols/_symbol-'	+ code + photo + '.jpg';
  		else
  			return '/resources/images/letters/' + name + '/' + name + '-' + code + photo + '.jpg';
  	};

  	this.isSymbol = function () {
  		return (this.name == '!' || this.name == '&');
  	};
  	this.isSpace = function () {
  		return this.name == ' ';
  	};
  	this.fullName = function () {
  		if (this.name == ' ')
  			return 'space';
  		else if (this.isSymbol())
  			return '_symbol' + '-' + this.code + this.photoCode();
  		else
  			return this.code + this.photoCode();
  	};
  }
  return Character;
});
