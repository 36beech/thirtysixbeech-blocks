import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { useImage } from "./useImage";
import { ReactComponent as UploadIcon } from "@shared/icons/image-upload.svg";

export const MediaSelector = ({
	className,
	value,
	onSelect,
	showIcon = true,
}) => {
	const image = useImage(value);
	const sourceUrl = image?.media_details?.sizes?.medium_large?.source_url;
	const classes = ["w-full h-full relative"];
	if (className) classes.push[className];
	return (
		<div className={classes.join(" ")}>
			{sourceUrl && (
				<img src={sourceUrl} className="w-full h-full object-cover relative z-0" />
			)}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelect}
					render={({ open }) => (
						<button
							className={`media-upload-button ${
								sourceUrl ? "" : "media-upload-button-no-image "
							}absolute z-10 w-full h-full top-0 left-0 bg-transparent border-0`}
							onClick={open}
						>
							{showIcon && (
								<div className="media-upload-icon w-20 h-20 p-4 bg-white opacity-20 rounded-lg">
									<UploadIcon className="w-full h-full" />
								</div>
							)}
							<span className="sr-only">Upload</span>
						</button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};
