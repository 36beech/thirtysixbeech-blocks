export const Card = ( { image, body, cta } ) => {
	return (
		<div className="tsb-card">
			<div className="tsb-card__image">{ image }</div>
			<div className="tsb-card__body">{ body }</div>
			<div className="tsb-card__cta">{ cta }</div>
		</div>
	);
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
