$(document).ready(function() {
	$('.main_menu_item').hover(function() {
		$(this).children('.main_menu_drop').slideDown('fast');
		var color = $(this).children('.main_menu_drop').css('background-color')
		$('.main_menu_block').css('border-color', color);
	}, function() {
		$(this).children('.main_menu_drop').slideUp('fast');
		$('.main_menu_block').css('border-color', 'black');
	});
});