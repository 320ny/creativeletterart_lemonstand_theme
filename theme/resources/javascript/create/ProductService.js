CreateApp.service('ProductService',function ($http) {

	this.photo = "color";

	this.product_ids = {
		1: 43,
		2: 56,
		3: 55,
		4: 54,
		5: 53,
		6: 52,
		7: 51,
		8: 50,
		9: 58,
		10: 57
	};
	this.id = function (word) {
		return this.product_ids[word.length];
	};


});
