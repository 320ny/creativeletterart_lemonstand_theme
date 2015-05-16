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
    } else {
      this.start('Black', 0)
    }
  };

  this.types = {
    frame1: '',frame2: '',frame3: '',frame4: '',frame5: '',
    frame6: '',frame7: '',frame8: '',frame9: '',frame10: '',
  };

  this.sizeChanged = function(size) {
    var selection = $('.create-frame-size:visible').val();
    var text = $("option[value="+selection+"]").text();
    var frame_select = $('.create-frame-select:visible')[0];
    if (text == "No Frame") {
      this._setSelectTo(frame_select, "No Frame");
      this.text = "No Frame"
      this._setFrameUrl(size);
    } else if (this.text == "No Frame" && text != "No Frame") {
      this._setSelectTo(frame_select, "Black");
      this.text = "Black"
      this._setFrameUrl(size);
    }
  };

  // private

  this._unNoFrameSize = function() {
    var select = $('.create-frame-size:visible');
    select.val(select.find("option:first").val());
  };

  this._noFrameSize = function() {
    var frame_select = $('.create-frame-size:visible')[0];
    this._setSelectTo(frame_select, "No Frame");
  };

  this._updateText = function() {
    var selection = $('.create-frame-select:visible').val();
    if (selection) {
      var option = $("option[value="+selection+"]");
      var text = option.text();
      if (text == "No Frame")
        this._noFrameSize();
      if (this.text == "No Frame" && text != "No Frame")
        this._unNoFrameSize();
      this.text = text;
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
    if (this._type() == 'none') {
      $('#create_section').css('background-image', '');
    } else {
      var url = this._baseUrl + this._type() + '_'+ size +'.png';
      $('#create_section').css('background-image', 'url('+ url +')');
    }
  };

  this._setSelectsTo = function(option_text) {
    var selects = $('.create-frame-select');
    angular.forEach(selects, function(select) {
      this._setSelectTo(select, option_text);
    }, this);
  };

  this._setSelectTo = function(frame_select, option_text) {
    angular.forEach(frame_select.options, function(option) {
      if (option.text._contains(option_text)) {
        frame_select.value = option.value;
      };
    });
  };

  this._baseUrl = 'https://s3.amazonaws.com/ls-account-data-3-us-east-1/store-creativeletterart-54dd9570d465e/themes/laboutique/resources/images/frames/';
});

if (typeof String.prototype._contains === 'undefined') {
  String.prototype._contains = function(it) { return this.indexOf(it) != -1; };
}
