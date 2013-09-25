$(document).ready(function() {
	$('.main_menu_item').on({
		mouseover: function(event) {
			$(this).children('.main_menu_drop').show();
			var color = $(this).children('.main_menu_drop').css('background-color')
			$('.main_menu_block').css('border-color', color);
		},
		mouseout: function(event) {
			$(this).children('.main_menu_drop').hide();
			$('.main_menu_block').css('border-color', 'black');
		}
	})
});