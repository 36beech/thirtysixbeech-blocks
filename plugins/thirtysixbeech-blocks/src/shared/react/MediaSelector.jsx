import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { Tooltip, Icon } from "@wordpress/ui";
import { trash } from "@wordpress/icons";
import { useImage } from "./useImage";
import { ReactComponent as UploadIcon } from "@shared/icons/image-upload.svg";

export const MediaSelector = ({
	className,
	value,
	onSelect,
	onRemove,
	showIcon = true,
}) => {
	console.log(className);
	const image = useImage(value);
	const sourceUrl = image?.media_details?.sizes?.medium_large?.source_url;
	const classes = ["w-full h-full relative"];
	if (className) classes.push(className);
	console.log(classes);
	return (
		<div className={classes.join(" ")}>
			{sourceUrl && (
				<>
					<img src={sourceUrl} className="w-full h-full object-cover relative z-0" />
					<Tooltip.Root>
						<Tooltip.Trigger className="w-6 h-6 rounded-full bg-gray-800 opacity-50 absolute top-4 right-4 text-white z-100" onClick={onRemove}>
							<Icon icon={trash} />
						</Tooltip.Trigger>
						<Tooltip.Popup>Remove Image</Tooltip.Popup>
					</Tooltip.Root>
				</>
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
