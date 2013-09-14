$(document).ready(function() {
	$('.content_images_item').click(function(event) {
		var path = $(this).attr('src');
		var id = $(this).attr('id');

		$.post('/works', {'id': id}).done(function(data) {
			$('.content_images_block').hide();
			$('.content_preview_block').fadeIn();
			$('.preview_image').attr('src', path);
			$('.preview_description').text(data);
		});
	});

	$('.preview_image').click(function(event) {
		$('.content_images_block').fadeIn();
		$('.content_preview_block').hide();
	});
});