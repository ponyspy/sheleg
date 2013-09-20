// $(document).ready(function() {
// 	$('.description_block:first, .image:first').show();

// 	$('.select_item').click(function() {
// 		var index = $(this).index();

// 		$('.image, .description_block').hide();

// 		$('.image').eq(index).show();
// 		$('.description_block').eq(index).show();
// 	});
// });




$(document).ready(function() {
	$('.image :first').show();

	$('.select_item').click(function(event) {
		$('.image').hide();
		var index = $(this).index();
		$('.image').eq(index).show()
	});
});