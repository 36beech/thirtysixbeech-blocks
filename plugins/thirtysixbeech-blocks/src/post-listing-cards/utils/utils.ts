const restBaseCache: Record< string, string > = {};
/**
 * REST API root, e.g. "http://site.com/wp-json/". Falls back to /wp-json/.
 */
export const getRestRoot = (): string =>
	document.querySelector< HTMLLinkElement >(
		'link[rel="https://api.w.org/"]'
	)?.href ?? '/wp-json/';

/**
 * A post type's endpoint isn't always its name ("post" is "posts"), so look
 * up its rest_base instead of guessing.
 */
export const getRestBase = async ( postType: string ): Promise< string > => {
	if ( restBaseCache[ postType ] ) return restBaseCache[ postType ];

	const response = await fetch(
		`${ getRestRoot() }wp/v2/types/${ encodeURIComponent( postType ) }`
	);
	if ( ! response.ok ) {
		throw new Error( `Unknown post type "${ postType }"` );
	}

	const type: { rest_base: string } = await response.json();
	restBaseCache[ postType ] = type.rest_base;
	return type.rest_base;
};
