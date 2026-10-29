import { useBlockProps } from '@wordpress/block-editor';
import type { Attributes } from './models/attributes';
import { getIconFrontend } from './utils';

interface SaveProps {
	attributes: Attributes;
}

export default function Save( { attributes }: SaveProps ) {
	const { link } = attributes;
	const icon = getIconFrontend( link?.url ?? null, 'tsb-social-link-icon' );

	if ( ! link?.url ) {
		return <div { ...useBlockProps.save() }>{ icon }</div>;
	}

	return (
		<li { ...useBlockProps.save() }>
			<a
				href={ link.url }
				target={ link.opensInNewTab ? '_blank' : undefined }
				rel={ link.opensInNewTab ? 'noreferrer noopener' : undefined }
			>
				{ icon }
			</a>
		</li>
	);
}
