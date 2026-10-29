import type { FunctionComponent, SVGProps, ReactElement } from 'react';

import { ReactComponent as FacebookIcon } from '@shared/icons/square-facebook.svg';
import { ReactComponent as HouzzIcon } from '@shared/icons/square-houzz.svg';
import { ReactComponent as InstagramIcon } from '@shared/icons/instagram.svg';
import { ReactComponent as PinterestIcon } from '@shared/icons/square-pinterest.svg';
import { ReactComponent as LinkedinIcon } from '@shared/icons/square-linkedin.svg';

// Matches the `ReactComponent` export typed in src/types/svg.d.ts.
export type IconComponent = FunctionComponent< SVGProps< SVGSVGElement > >;
type SN = string | null;

// Single source of truth for domain → platform, shared by getIcon() (editor,
// full inline SVG component) and getIconFrontend() (saved output, a <use>
// reference into the sprite the plugin inlines site-wide via wp_head — see
// thirtysixbeech_blocks_inline_svg_sprite() in thirtysixbeech-blocks.php).
// `sprite` matches that symbol's id there, which is "icon-" + the source
// filename in src/shared/icons/ (e.g. square-facebook.svg → icon-square-facebook).
const PLATFORM_ICONS: Record< string, { Component: IconComponent; sprite: string } > = {
	'facebook.com': { Component: FacebookIcon, sprite: 'square-facebook' },
	'houzz.com': { Component: HouzzIcon, sprite: 'square-houzz' },
	'instagram.com': { Component: InstagramIcon, sprite: 'instagram' },
	'pinterest.com': { Component: PinterestIcon, sprite: 'square-pinterest' },
	'linkedin.com': { Component: LinkedinIcon, sprite: 'square-linkedin' },
};

const getDomainName = ( url?: SN ): SN => {
	if ( ! url ) return null;
	let hostname;
	try {
		( { hostname } = new URL( url ) );
	} catch {
		// Partial/invalid URL (e.g. still being typed into LinkControl).
		return null;
	}

	const withoutWww = hostname.replace( /^www\./, '' );
	return withoutWww.includes( '.' ) ? withoutWww : hostname;
};

/**
 * Maps a social link's URL to its platform icon component, based on domain.
 * Used in the editor (edit.tsx), where a full inline React component is
 * easiest to work with. Returns null for an empty/invalid URL or an
 * unrecognized platform.
 */
export function getIcon( url?: SN ): IconComponent | null {
	const host = getDomainName( url );
	if ( ! host ) return null;
	return PLATFORM_ICONS[ host ]?.Component ?? null;
}

/**
 * Maps a social link's URL to its platform icon markup for saved/front-end
 * output: a <use> reference into the sprite rather than a full inline SVG,
 * to keep saved post content small. Returns null for an empty/invalid URL
 * or an unrecognized platform.
 */
export function getIconFrontend( url?: SN, classes?: SN ): ReactElement | null {
	const host = getDomainName( url );
	if ( ! host ) return null;

	const platform = PLATFORM_ICONS[ host ];
	if ( ! platform ) return null;

	return (
		<svg className={ classes ?? undefined } aria-hidden="true">
			<use href={ `#icon-${ platform.sprite }` } />
		</svg>
	);
}
