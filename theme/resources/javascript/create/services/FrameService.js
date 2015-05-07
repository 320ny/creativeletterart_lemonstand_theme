CreateApp.service('FrameService',function () {
  this.text = '';

  this.type = function() {
    if (this._contains('White'))
      return 'white';
    else if (this._contains('Mahogany'))
      return 'mahogany';
    else if (this._contains('Driftwood'))
      return 'driftwood';
    else if (this._contains('No Frame'))
      return 'none';
    else
      return 'black';
  };

  this.updateFrame = function(selection, size) {
    var option = $("option[value="+selection+"]");
    this.text = option.text();
    this.setFrameUrl(size);
  };

  this.setFrameUrl = function(size) {
    var url = this._baseUrl + this.type() + '_'+ size +'.png';
    $('#create_section').css('background-image', 'url('+ url +')');
  };
  // private

  this._contains = function(text) {
    return this.text.indexOf(text) != -1;
  };

  this._baseUrl = 'https://s3.amazonaws.com/ls-account-data-3-us-east-1/store-creativeletterart-54dd9570d465e/themes/laboutique/resources/images/frames/';
});
