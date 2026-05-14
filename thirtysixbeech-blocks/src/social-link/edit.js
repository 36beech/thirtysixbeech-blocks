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
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { ReactComponent as FacebookIcon } from "@shared/icons/facebook.svg";
import { ReactComponent as BlueskyIcon } from "@shared/icons/bluesky.svg";
import { ReactComponent as InstagramIcon } from "@shared/icons/instagram.svg";
import { ReactComponent as LinkedinIcon } from "@shared/icons/linkedin.svg";
import { ReactComponent as TiktokIcon } from "@shared/icons/tiktok.svg";
import { ReactComponent as TwitterIcon } from "@shared/icons/x-twitter.svg";
import { ReactComponent as YoutubeIcon } from "@shared/icons/youtube.svg";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { socialIcon, link } = attributes;
	const iconMap = [
		{ name: "facebook", icon: FacebookIcon, color: "fill-[#1877F2]" },
		{ name: "bluesky", icon: BlueskyIcon, color: "fill-[#0085FF]" },
		{ name: "instagram", icon: InstagramIcon, color: "fill-[#E1306C]" },
		{ name: "linkedin", icon: LinkedinIcon, color: "fill-[#0A66C2]" },
		{ name: "tiktok", icon: TiktokIcon, color: "fill-[#69C9D0]" },
		{ name: "x", icon: TwitterIcon, color: "fill-[#000000]" },
		{ name: "youtube", icon: YoutubeIcon, color: "fill-[#FF0000]" },
	];

	return (
		<div {...useBlockProps()}>
			{iconMap.map((icon) => {
				const IconComponent = icon.icon;

				return (
					<div key={icon.name}>
						<IconComponent className={`w-6 h-6 ${icon.color}`} />
					</div>
				);
			})}
		</div>
	);
}
