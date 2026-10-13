import { useEffect, useRef } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { FocalPointPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const META_KEY = 'tsb-featured-focal-point';
const CENTER = { x: 0.5, y: 0.5 };

interface FocalPoint {
	x: number;
	y: number;
}

type PostMeta = Record< string, unknown > | undefined;

const toFocalPoint = ( value: unknown ): FocalPoint => {
	const point = value as Partial< FocalPoint > | undefined;
	return {
		x: typeof point?.x === 'number' ? point.x : CENTER.x,
		y: typeof point?.y === 'number' ? point.y : CENTER.y,
	};
};

const FeaturedFocalPointPanel = () => {
	const { postType, supportsThumbnail, featuredId, imageUrl } = useSelect(
		( select ) => {
			const editor = select( 'core/editor' ) as any;
			const core = select( 'core' ) as any;
			const type: string = editor.getCurrentPostType();
			const id: number = editor.getEditedPostAttribute( 'featured_media' );
			return {
				postType: type,
				supportsThumbnail: !! core.getPostType( type )?.supports
					?.thumbnail,
				featuredId: id,
				imageUrl: id ? core.getMedia( id )?.source_url : undefined,
			};
		},
		[]
	);

	const [ meta, setMeta ] = useEntityProp< PostMeta >(
		'postType',
		postType ?? 'post',
		'meta'
	);

	// A focal point only makes sense for the image it was set on, so go back to the
	// center when the featured image is swapped or removed. (Skipped on first load,
	// when there's no previous image yet.)
	const previousId = useRef( featuredId );
	useEffect( () => {
		if ( previousId.current && previousId.current !== featuredId ) {
			setMeta( { ...meta, [ META_KEY ]: CENTER } );
		}
		previousId.current = featuredId;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ featuredId ] );

	if ( ! postType || ! supportsThumbnail || ! featuredId ) return null;

	return (
		<PluginDocumentSettingPanel
			name="tsb-featured-focal-point"
			title={ __( 'Featured Image Focal Point', 'thirtysixbeech-blocks' ) }
		>
			{ imageUrl && (
				<FocalPointPicker
					url={ imageUrl }
					value={ toFocalPoint( meta?.[ META_KEY ] ) }
					onChange={ ( { x, y }: FocalPoint ) =>
						setMeta( { ...meta, [ META_KEY ]: { x, y } } )
					}
				/>
			) }
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'thirtysixbeech-featured-focal-point', {
	render: FeaturedFocalPointPanel,
} );
