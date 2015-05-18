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
  		return letter ? letter[this.photo + '_thumb'] : undefined;
  	};

  	this.isSpace = function () {
  		return this.name == ' ';
  	};

  	this.fullName = function () {
  		if (this.isSpace())
  			return 'Space';
  		else
  			return this.code + this.photoCode();
  	};
  }
  return Character;
});
