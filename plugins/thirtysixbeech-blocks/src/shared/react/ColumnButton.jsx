import { __ } from '@wordpress/i18n';
import { Children } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { Grid, GridItem } from './Grid';

const gridClass = ( columns ) => {
	switch ( columns ) {
		case 1:
			return 'grid-cols-1';
		case 2:
			return 'grid-cols-2';
		case 3:
		case '33/66':
		case '66/33':
			return 'grid-cols-3';
		case 4:
			return 'grid-cols-4';
		case 5:
		case 'flex':
			return 'grid-cols-5';
	}
};

const getColumnsCount = ( columns ) => {
	if ( columns === 'flex' ) return 5;
	return columns;
};

export const ColumnButton = ( {
	columns = 2,
	label = null,
	onClick,
	selected = false,
	size = 'large',
} ) => {
	const columnsCount = getColumnsCount( columns );

	const buttonClasses = [
		'flex flex-col w-full aspect-305/200 rounded-lg items-center uppercase font-semibold bg-gray-400 cursor-pointer duration-300',
		size === 'large' ? 'p-5 gap-4' : 'p-2 gap-1 text-[10px]',
	];

	if ( selected ) buttonClasses.push( 'outline-solid outline-red-400' );

	const buttonClassesInner = [
		gridClass( columns ),
		'grid grow w-full rounded-lg',
		size === 'large' ? 'gap-2' : 'gap-1',
	];

	// "33/66"/"66/33" render as 2 spans inside a 3-col grid (from gridClass),
	// not 2 columns — the narrow span stays 1 col wide and the wide span gets
	// col-span-2, so together they fill all 3 columns as a 1/3 + 2/3 split.
	// Which span gets col-span-2 flips based on which side is meant to be wide.
	if ( columns === '33/66' || columns === '66/33' ) {
		return (
			<button
				className={ buttonClasses.join( ' ' ) }
				onClick={ onClick }
				value={ columns }
			>
				<div className={ buttonClassesInner.join( ' ' ) }>
					<span
						className={ `bg-gray-700 ${
							columns === '66/33' ? 'col-span-2' : ''
						}` }
					></span>
					<span
						className={ `bg-gray-700 ${
							columns === '33/66' ? 'col-span-2' : ''
						}` }
					></span>
				</div>
				<span>{ label ? label : `${ columnsCount } Columns` }</span>
			</button>
		);
	}

	return (
		<button
			className={ buttonClasses.join( ' ' ) }
			onClick={ onClick }
			value={ columns }
		>
			<div className={ buttonClassesInner.join( ' ' ) }>
				{ [ ...Array( columnsCount ) ].map( ( col ) => (
					<span key={ col } className="bg-gray-700"></span>
				) ) }
			</div>
			<span>{ label ? label : `${ columnsCount } Columns` }</span>
		</button>
	);
};

const EditorWrapper = ( { children } ) => {
	return (
		<Grid>
			{ Children.map( children, ( child ) => (
				<GridItem>{ child }</GridItem>
			) ) }
		</Grid>
	);
};

const SidebarWrapper = ( { children } ) => {
	return (
		<div className="grid grid-cols-2 gap-2.5">
			{ Children.map( children, ( child ) => (
				<div>{ child }</div>
			) ) }
		</div>
	);
};

export const ColumnButtons = ( {
	options,
	onSelect,
	location = 'sidebar',
	label = __( 'Number of columns' ),
	help,
	selected = null,
} ) => {
	if ( ! options || options.length === 0 ) return <div>No options</div>;
	const Wrapper = location === 'editor' ? EditorWrapper : SidebarWrapper;

	return (
		<BaseControl label={ label } help={ help }>
			<Wrapper>
				{ options.map( ( option ) => (
					<ColumnButton
						columns={ option.columns }
						label={ option?.label ?? null }
						size={ location === 'sidebar' ? 'small' : null }
						onClick={ () => onSelect( option.columns ) }
						selected={ selected === option.columns }
					/>
				) ) }
			</Wrapper>
		</BaseControl>
	);
};
