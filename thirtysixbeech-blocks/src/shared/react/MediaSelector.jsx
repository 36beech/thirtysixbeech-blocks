import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { useImage } from "./useImage";
import { ReactComponent as UploadIcon } from "@shared/icons/image-upload.svg";

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
						<button className={`media-upload-button ${sourceUrl ? '' : 'media-upload-button-no-image '}tsb-abs z-10 w-full h-full top-0 left-0 bg-transparent border-0`} onClick={open}>
							<div className="media-upload-icon">
								<UploadIcon />
							</div>
							<span className="sr-only">Upload</span>
						</button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};
