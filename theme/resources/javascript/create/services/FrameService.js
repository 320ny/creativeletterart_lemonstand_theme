CreateApp.service('FrameService',function () {
  this.text = '';

  this.start = function(size, text) {
    this.text = text;
    this._setSelectsTo(text);
    this._setFrameUrl(size);
  };

  this.update = function(size) {
    if (size != 0) {
      this._updateText();
      this._setFrameUrl(size);
      this._setSelectsTo(this.text);
    } else {
      this.start('Black 8x20', 0)
    }
  };

  this.selected = {
    frame1: '',
    frame2: '',
    frame3: '',
    frame4: '',
    frame5: '',
    frame6: '',
    frame7: '',
    frame8: '',
    frame9: '',
    frame10: '',
  };

  // private

  this._updateText = function() {
    var selection = $('.create-frame-select:visible').val();
    if (selection) {
      var option = $("option[value="+selection+"]");
      this.text = option.text();
    }
  };

  this._type = function() {
    var text = this.text;
    if (text._contains('White'))
      return 'white';
    else if (text._contains('Mahogany'))
      return 'mahogany';
    else if (text._contains('Driftwood'))
      return 'driftwood';
    else if (text._contains('No Frame'))
      return 'none';
    else
      return 'black';
  };

  this._setFrameUrl = function(size) {
    var url = this._baseUrl + this._type() + '_'+ size +'.png';
    $('#create_section').css('background-image', 'url('+ url +')');
  };

  this._setSelectsTo = function(option_text) {
    var selects = $('.create-frame-select');
    angular.forEach(selects, function(select) {
      angular.forEach(select.options, function(option) {
        if (option.text._contains(option_text)) {
          select.value = option.value;
        };
      });
    });
  };

  this._baseUrl = 'https://s3.amazonaws.com/ls-account-data-3-us-east-1/store-creativeletterart-54dd9570d465e/themes/laboutique/resources/images/frames/';
});

if (typeof String.prototype._contains === 'undefined') {
  String.prototype._contains = function(it) { return this.indexOf(it) != -1; };
}
