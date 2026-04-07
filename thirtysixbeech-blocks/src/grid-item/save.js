import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { children } = useInnerBlocksProps.save(blockProps);

	return children;
}
