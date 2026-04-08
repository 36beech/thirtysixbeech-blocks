import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { useImage } from "./useImage";

export const MediaSelector = ({ className, value, onSelect }) => {
	const image = useImage(value);
	const sourceUrl = image?.media_details?.sizes?.medium_large?.source_url;
	console.log(value, image);
	const classes = ["w-full h-full tsb-rel"];
	if (className) classes.push[className];
	return (
		<div className={classes.join(" ")}>
			{sourceUrl && <img src={sourceUrl} className="w-full h-full tsb-cover tsb-rel z-0" />}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelect}
					render={({ open }) => (
						<button className={``} onClick={open}>
							Upload
						</button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};
