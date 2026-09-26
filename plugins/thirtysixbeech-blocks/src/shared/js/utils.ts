export const parseHTML = ( html: string ): HTMLElement | null =>
	new DOMParser().parseFromString( html, 'text/html' ).body
		.firstElementChild as HTMLElement | null;
