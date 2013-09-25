$(document).ready(function() {
	$('.service_block:first').show();

	$('.select_item').click(function() {
		var index = $(this).index();

		$('.service_block').hide();
		$('.service_block').eq(index).show();
	});
});