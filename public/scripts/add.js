$(document).ready(function() {
	var eng = true;
	var count = 0;

	function toggleEnglish () {
		if (eng = !eng) {
			eng = true;
			$('.en').prop('disabled', eng).hide();
			$('.ru').css('float','none');
		}
		else {
			eng = false;
			$('.en').prop('disabled', eng).show();
			$('.ru').css('float','left');
		}
	}

	function snakeForward () {
		count +=1;

		var elem = $('.snake');
		elem.first().clone().insertAfter(elem.last());

		var forms = $('.snake').eq(count).children('select, input');
		forms.each(function() {
			var value = $(this).attr('name');
			value = value.replace('0', count);
			$(this).attr('name', value);
		});
	}

	function snakeBack () {
		if ($('.snake').size() == 1) return null;
		$('.snake').last().remove();
	}

	$('.plus').on('click', snakeBack);
	$('.minus').on('click', snakeForward);
	$('.toggle_eng').on('click', toggleEnglish);
});