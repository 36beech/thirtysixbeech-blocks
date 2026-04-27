/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	BlockControls,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
} from "@wordpress/components";
import { Icon, mobile, desktop } from "@wordpress/icons";

import { useState } from "react";
import { ReactComponent as LogoIcon } from "./icon.svg";

import { useImage } from "@shared/react/useImage";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const UploadLogo = ({ value, buttonLabel = "Desktop", onSelect }) => {
	const logoImage = useImage(value);
	console.log(logoImage);
	return (
		<div className="tsb-flex tsb-flex-col tsb-a-center" style={{ gap: "10px" }}>
			{value ? (
				<img src={logoImage?.source_url} />
			) : (
				<LogoIcon style={{ width: "56px", height: "56px" }} />
			)}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelect}
					value={value}
					render={({ open }) => (
						<ToolbarButton
							style={{ border: "1px solid #000000" }}
							onClick={open}
						>
							{value ? "Replace" : "Upload"} {buttonLabel} Logo
						</ToolbarButton>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default function Edit({ attributes, setAttributes }) {
	const { desktopLogo, mobileLogo } = attributes;
	const [activeLogo, setActiveLogo] = useState("desktop");
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__("Set Mobile Logo")}
						icon={mobile}
						isPressed={activeLogo === "mobile"}
						onClick={() => setActiveLogo("mobile")}
					/>
					<ToolbarButton
						label={__("Set Desktop Logo")}
						icon={desktop}
						isPressed={activeLogo === "desktop"}
						onClick={() => setActiveLogo("desktop")}
					/>
				</ToolbarGroup>
			</BlockControls>

			<div {...useBlockProps()}>
				{activeLogo === "desktop" ? (
					<UploadLogo
						value={desktopLogo}
						buttonLabel="Desktop"
						onSelect={(item) => {
							setAttributes({
								desktopLogo: item.id,
							});
						}}
					/>
				) : (
					<UploadLogo
						value={mobileLogo}
						buttonLabel="Mobile"
						onSelect={(item) => {
							setAttributes({
								mobileLogo: item.id,
							});
						}}
					/>
				)}
			</div>
		</>
	);
}
