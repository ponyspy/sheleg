$(document).ready(function() {
	$('.image').click(function(event) {
		var path = $(this).attr('src');

		$('.project_description_block').hide();
		$('.project_preview_block').attr('src', path);
		$('.project_preview_block').show();
	});
	$('.project_preview_block').click(function(event) {
		$('.project_description_block').show();
		$(this).hide();
	});
});