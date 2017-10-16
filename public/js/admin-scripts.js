$(document).ready(function() {

	$('.datepicker').datepicker({
		dateFormat: "yy-mm-dd"
	});

	$('.news-edit').on('click', '.form-submit', function() {
		var thisElement = $(this);
		var form = thisElement.parents('form').serialize();
		thisElement.addClass('loading');
		$.ajax({
			url: '/admin/news/update',
			method: 'POST',
			data: form,
			dataType: 'json',
			success: function(response) {
				if(response.success) {
					$('.alert').fadeIn('fast', function() {
						setTimeout(function() {
							$('.alert').fadeOut('fast');
						}, 3000);
					});
					thisElement.removeClass('loading').hide();
				}
			},
			error: function (error) {
				console.log(error);
			}
		});
	})
	.on('input change', 'input', function() {
		$(this).parents('form').find('button').show();
	});

	$('.news-list').on('click', '.news-delete', function() {
		var thisElement = $(this);
		var newsId = thisElement.data('id');

		$('#dialog').dialog({
			modal: true,
			open: function (event, ui) {
				$(".ui-widget-overlay").css('background-color', 'rgba(0, 0, 0, 0.5)');
			},
			buttons: {
				'Да': function() {
					$(this).dialog('close');
					$.ajax({
						url: '/admin/news/delete/' + newsId,
						method: 'POST',
						dataType: 'json',
						success: function(response) {
							thisElement.closest('tr').remove();
						}
					});
				},
				'Не': function() {
					$(this).dialog('close');
				}
			}
		});
	});

	$('.change-lang').on('change', function() {
		var id = $(this).find('option:selected').data('lang-id');
		var url = window.location.href;
		if(url.indexOf('lang') !== -1) {
			url = url.replace(/lang=\d+/, 'lang=' + id);
		} else {
			url = url + '?lang=' + id;
		}
		window.location.href = url;
	});
});

