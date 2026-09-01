export const Card = ( { eyebrow, title, description, link, image } ) => {
	return <div>Card</div>;
};

export const CardGroup = ( { columns, children } ) => {
	const columnClasses = [
		'grid-cols-2',
		'grid-cols-2 md:grid-cols-3',
		'grid-cols-2 md:grid-cols-4',
	];

	const gridClass = `flex flex-col md:grid gap-tsb ${
		columnClasses[ columns - 2 ]
	}`;

	return <div className={ gridClass }>{ children }</div>;
};
