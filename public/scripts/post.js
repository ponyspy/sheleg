$(document).ready(function() {
	$('.image').click(function(event) {
		var path = $(this).attr('src');

		$('.content_description_block').hide();
		$('.image_preview').attr('src', path);
		$('.image_preview').show();
	});
	$('.image_preview').click(function(event) {
		$('.content_description_block').show();
		$(this).hide();
	});
});