$(document).ready(function() {
	$('.main_menu_item').on({
		mouseover: function(event) {
			$(this).children('.main_menu_drop').show();
		},
		mouseout: function(event) {
			$(this).children('.main_menu_drop').hide();
		}
	})
});