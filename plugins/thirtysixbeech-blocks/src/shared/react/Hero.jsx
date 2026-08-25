export const Hero = ( {renderImage, renderTitle, renderDescription}) => {
	return (
		<div className="tsb-hero relative z-0 w-full min-h-100">
			<div className="tsb-hero__image relative z-0">
        {renderImage}
			</div>
			<span className="tsb-hero__overlay absolute z-10 top-0 left-0 w-full h-full"></span>
			<div className="tsb-hero__body  px-5 is-layout-constrained w-full absolute left-0 bottom-0 z-10">
				<div>
					{renderTitle}
          {renderDescription}
				</div>
			</div>
		</div>
	);
};
