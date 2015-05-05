CreateApp.directive('createProductForm', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			createProduct: '=',
			createWord: '='
		},
		link: function (scope, element) {
			scope.getProductUrl = function() {
				return "/api/product-form/?id=" + scope.createProduct.id(scope.createWord);
			};

			scope.setDescriptionText = function (alignment) {
				$('.product_dimensions_blurb').text('Dimensions: ' + $('#'+alignment+'-Dimensions').data('value') + ' (' + $('#'+alignment+'-Weight').data('value') + ' lbs.)');
			};

			scope.set_vertical = function (word) {

				scope.setDescriptionText('Vertical');

				// Set Vertical Layout
				$('#create').css({'width': '84px', 'margin-left': 'auto', 'margin-right': 'auto'});
				$('#letter_links').hide();

				var height = '';
				switch(word.length) {
					case 2:
						height = '415px'; break;
					case 3:
						height = '550px'; break;
					case 4:
						height = '680px'; break;
					case 5:
						height = '815px'; break;
					case 6:
						height = '950px'; break;
					default:
						height = '1080px'; break;
				}
				$('#create_section').css({'height': height, 'width': '300px'});

				// Apply the correct frame
				var frame = $('#frame_choice option:selected').text();
				if (frame.search(/black/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/modernblack_' + word.length +'_vertical.png")');
				} else if (frame.search(/driftwood/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/driftwood_' + word.length +'_vertical.png")');
				} else if (frame.search(/white/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/White_' + word.length +'_vertical.png")');
				} else {
					$('#create_section').css('background-image', 'url("/resources/images/mahogany_' + word.length +'_vertical.png")');
				}
			};

			scope.set_horizontal = function (word) {
				var width = word.length * 103 + (10 - word.length) * 13;
				$('#create_section').css({'width': width + 'px', 'height': '282px'});
				$('#create').css('width', 'auto');

				scope.setDescriptionText('Horizontal');

					// Apply the correct frame
				var frame = $('#frame_choice option:selected').text();
				if (frame.search(/black/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/modernblack_' + word.length +'.png")');
				} else if (frame.search(/driftwood/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/driftwood_' + word.length +'.png")');
				} else if (frame.search(/mahogany/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/mahogany_' + word.length +'.png")');
				} else if (frame.search(/white/i) > 0) {
					$('#create_section').css('background-image', 'url("/resources/images/White_' + word.length +'.png")');
				} else {
					$('#create_section').css('background-image', 'none');
				}
			};

			scope.set_orientation = function (word) {
				var orientation = $("#orientation_choice input[type='radio']:checked").data('description');
				if (orientation == "Vertical") {
					scope.set_vertical(scope.createWord);
				} else {
					scope.set_horizontal(scope.createWord);
				}
			};

			scope.update_price =  function (word) {
				// Updates the price on the 'Add to Cart' button
				var base_price = word.length * 5;
				var frame_price = parseFloat($('#frame_choice option:selected').data('price'));
				var orientation_price = parseFloat($("#orientation_choice input[type='radio']:checked").data('price'));

				var price = base_price + frame_price + orientation_price;

				if ($('#frame_choice option:selected').text().search(/no frame/i) > 0) {
					price = base_price;
				}

				$("#add_to_cart_button").val("Add to Cart ($"+ price +")");
			};

			scope.updateInputs = function() {
				$('#product_id')[0].selectedIndex = scope.createWord.length - 1;

				$("#orientation_choice input[type='radio']").first().attr("checked","checked");

				// Make sure the frame image is right
				$("#frame_choice select").trigger('change');
				$("#studio_frame_option select").trigger('change');

				scope.setDescriptionText('Horizontal');

				scope.update_price(scope.createWord);

				/********************************************/
				/* Action for Frame, Mat & Orientation Choice    */
				/********************************************/

				// Frame Choice
				$("#frame_choice select").change(function() {
					var selected_option = $('option[value="'+ $(this).val() +'"]');
					var option_text = selected_option.text();
					scope.update_price(scope.createWord);
					$("#orientation_choice").removeClass('orientation-opacity');
					$('#orientation_choice :radio').removeAttr('disabled');

					if (option_text.search(/black/i) > 0) {
						scope.set_orientation(scope.createWord);
					} else if (option_text.search(/driftwood/i) > 0) {
						scope.set_orientation(scope.createWord);
					} else if (option_text.search(/mahogany/i) > 0) {
						scope.set_orientation(scope.createWord);
					} else if (option_text.search(/white/i) > 0) {
						scope.set_orientation(scope.createWord);
					} else {
						scope.set_horizontal(scope.createWord);
						$('.product_dimensions_blurb').text("Each letter is 4\" x 6\"");
						$("#orientation_choice").addClass('orientation-opacity');
						$('#orientation_choice :radio').attr('disabled', 'disabled');
					}
				});

				// Matt
				$("#mat_choice select").change(function() {
					var selected_option = $('option[value="'+ $(this).val() +'"]');
					var option_text = selected_option.text();
					if (option_text.search(/black/i) > 0) {
						$('#create_section').css('background-color', 'black');
					} else {
						$('#create_section').css('background-color', 'white');
					}

				});

				// Orinetation
				$("#orientation_choice input[type='radio']").change(function() {
					scope.update_price(scope.createWord);
					if ($(this).data('description') == "Vertical") {
						scope.set_vertical(scope.createWord);
					} else {
						scope.set_horizontal(scope.createWord);
					}

				});

				// Select Default Frame
				if (scope.createWord.length > 0) {
					code = $('#frame_choice select option:nth-child(2)').val();
					$('#frame_choice select')[0].value = code;
					$("#frame_choice select").trigger('change');
					$("#mat_choice select").trigger('change');
				}
			};
		},
		template: '<div ng-include="getProductUrl()" onload="updateInputs()"></div>'
	}
});
