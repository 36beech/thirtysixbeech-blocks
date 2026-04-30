import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";

export default function Save() {
	useBlockProps.save();
  return <InnerBlocks.Content />;
}