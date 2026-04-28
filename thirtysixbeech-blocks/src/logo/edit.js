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
	InspectorControls,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, PanelBody } from "@wordpress/components";
import { mobile, desktop } from "@wordpress/icons";

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
import { DimensionSlider } from "../shared/react/DimensionSlider";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const UploadLogo = ({ value, buttonLabel = "Desktop", width, onSelect }) => {
	const logoImage = useImage(value);
	console.log(logoImage);
	return (
		<div
			className="tsb-flex tsb-flex-col tsb-a-start tsb-rel"
			style={{ gap: "10px" }}
		>
			{value ? (
				<img src={logoImage?.source_url} style={{ width: width }} />
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
	const { desktopLogo, mobileLogo, desktopLogoWidth, mobileLogoWidth } =
		attributes;
	const [activeLogo, setActiveLogo] = useState("desktop");
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Logo Options", "thirtysix-beech")}>
					<DimensionSlider
						label={__("Desktop logo width")}
						value={desktopLogoWidth}
						onChange={(value) => setAttributes({ desktopLogoWidth: value })}
					/>
					<DimensionSlider
						label={__("Mobile logo width")}
						value={mobileLogoWidth}
						onChange={(value) => setAttributes({ mobileLogoWidth: value })}
					/>
				</PanelBody>
			</InspectorControls>
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
						width={desktopLogoWidth}
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
						width={mobileLogoWidth}
					/>
				)}
			</div>
		</>
	);
}
