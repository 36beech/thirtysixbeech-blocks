import { CheckboxControl, BaseControl } from '@wordpress/components';

export const CheckboxGroup = ( {
	options,
	onCheck,
	label = null,
	help = null,
} ) => {
	return (
		<BaseControl label={ label } help={ help }>
			<div className="grid grid-cols-2 gap-x-2.5 gap-y-1">
				{ options?.map( ( option ) => (
					<CheckboxControl
						key={ option.value }
						label={ option.label }
						checked={ option.checked }
						onChange={ () =>
							onCheck( option.value, ! option.checked )
						}
					/>
				) ) }
			</div>
		</BaseControl>
	);
};
