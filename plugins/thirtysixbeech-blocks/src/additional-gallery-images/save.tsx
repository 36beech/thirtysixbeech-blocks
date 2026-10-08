import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import type { ReactElement } from "react";

export default function Save() {
  const blockProps = useBlockProps.save();
  // @types/wordpress__block-editor's `.save()` overload types this as
  // Record<string, unknown>, losing the `children: ReactElement` shape its
  // main overload has — it really is a ReactElement at runtime.
  const { children } = useInnerBlocksProps.save(blockProps) as { children: ReactElement };
  return children;
}
