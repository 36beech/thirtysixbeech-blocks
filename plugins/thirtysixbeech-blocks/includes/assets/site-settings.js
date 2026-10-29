(function ($) {
	$(function () {
		$('.thirtysixbeech-logo-field').each(function () {
			var $field = $(this);
			var frame;
			var $preview = $field.find('.thirtysixbeech-logo-preview');
			var $input = $field.find('.thirtysixbeech-logo-id');
			var $selectButton = $field.find('.thirtysixbeech-logo-select');
			var $removeButton = $field.find('.thirtysixbeech-logo-remove');

			$selectButton.on('click', function (e) {
				e.preventDefault();

				if (frame) {
					frame.open();
					return;
				}

				frame = wp.media({
					title: thirtysixbeechSettings.chooseLogoTitle,
					button: { text: thirtysixbeechSettings.chooseLogoButton },
					library: { type: 'image' },
					multiple: false,
				});

				frame.on('select', function () {
					var attachment = frame.state().get('selection').first().toJSON();
					var imageUrl = attachment.sizes && attachment.sizes.medium
						? attachment.sizes.medium.url
						: attachment.url;

					$input.val(attachment.id);
					$preview.html('<img src="' + imageUrl + '" alt="" />').show();
					$removeButton.show();
				});

				frame.open();
			});

			$removeButton.on('click', function (e) {
				e.preventDefault();
				$input.val('');
				$preview.hide().empty();
				$removeButton.hide();
			});
		});
	});
})(jQuery);
