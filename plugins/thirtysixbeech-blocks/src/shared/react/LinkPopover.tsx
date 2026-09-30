import { __ } from '@wordpress/i18n';
import { LinkControl } from '@wordpress/block-editor';
import { ToolbarButton, Popover } from '@wordpress/components';
import { link as linkIcon } from '@wordpress/icons';

import { useState } from 'react';

// Matches @wordpress/block-editor's own LinkControl.Value shape.
export interface Link {
	url?: string;
	title?: string;
	opensInNewTab?: boolean;
}

interface LinkPopoverProps {
	value?: Link;
	onChange: ( value?: Link ) => void;
	onRemove: () => void;
}

export const LinkPopover = ( {
	value,
	onChange,
	onRemove,
}: LinkPopoverProps ) => {
	const [ isEditingLink, setIsEditingLink ] = useState( false );
	return (
		<>
			<ToolbarButton
				icon={ linkIcon }
				title={ __( 'Link' ) }
				isActive={ !! value?.url }
				onClick={ () => setIsEditingLink( true ) }
			/>
			{ isEditingLink && (
				<Popover
					position="bottom center"
					onClose={ () => setIsEditingLink( false ) }
				>
					<LinkControl
						value={ value }
						onChange={ onChange }
						onRemove={ () => {
							onRemove();
							setIsEditingLink( false );
						} }
					/>
				</Popover>
			) }
		</>
	);
};
