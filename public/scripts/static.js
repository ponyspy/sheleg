$(document).ready(function() {
	$('.description_block:first, .image:first').show();

	$('.select_item').click(function() {
		$('.image, .description_block').hide();
		var index = $(this).index();
		alert(index)
		$('.image').eq(index).show();
		$('.description_block').eq(index).show();
	});
});