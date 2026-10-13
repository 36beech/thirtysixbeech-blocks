// These packages are provided by WordPress at runtime (webpack externalizes `@wordpress/*`)
// and aren't installed locally, so they have no bundled types. Minimal stand-ins only.
declare module '@wordpress/plugins' {
	export function registerPlugin(
		name: string,
		settings: { render: () => JSX.Element | null }
	): void;
}

declare module '@wordpress/editor' {
	import type { ReactNode } from 'react';

	export const PluginDocumentSettingPanel: ( props: {
		name: string;
		title: string;
		className?: string;
		children?: ReactNode;
	} ) => JSX.Element;
}

declare module '@wordpress/core-data' {
	export function useEntityProp< T = unknown >(
		kind: string,
		name: string,
		prop: string
	): [ T, ( value: T ) => void, T ];
}
