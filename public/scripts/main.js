$(document).ready(function() {
	$('.main_menu_item').hover(function() {
		$(this).children('.main_menu_drop').stop(true, true).slideDown('fast');
		var color = $(this).children('.main_menu_drop').css('background-color')
		$('.main_menu_block').css('border-color', color);
	}, function() {
		$(this).children('.main_menu_drop').stop(true, true).slideUp('fast').promise().done(function() {
			$('.main_menu_block').css('border-color', 'black');
		});
	});
});