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
import { InnerBlocks, useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { RangeControl, PanelBody } from "@wordpress/components";

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

const colSpanClasses = ["", "col-span-2", "col-span-3", "col-span-4", "col-span-5", "col-span-6", "col-span-7", "col-span-8", "col-span-9", "col-span-10", "col-span-11", "col-span-12"];
const colStartClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7", "col-start-8", "col-start-9", "col-start-10", "col-start-11", "col-start-12"];

export default function Edit({ attributes, setAttributes }) {
  const { colSpan, colStart, rowStart, rowSpan } = attributes;
  const style = {
    gridRowStart: rowStart ?? null,
    gridRow: rowSpan ? `span ${rowSpan}` : null,
  };
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Grid Item Options", "thirtysix-beech")}>
          <RangeControl label={__("Column Span", "thirysix-beech")} value={colSpan} onChange={(value) => setAttributes({ colSpan: value || 1 })} min={1} max={12} />
          <RangeControl label={__("Column Start", "thirysix-beech")} value={colStart} onChange={(value) => setAttributes({ colStart: value || 0 })} min={0} max={12 - colSpan} />
          <hr />
          <RangeControl label={__("Row Span", "thirysix-beech")} value={rowSpan} onChange={(value) => setAttributes({ rowSpan: value || 1 })} min={1} max={12} />
          <RangeControl label={__("Row Start", "thirysix-beech")} value={rowStart} onChange={(value) => setAttributes({ rowStart: value || 0 })} min={0} max={12 - rowSpan} />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps({ className: [colSpanClasses[colSpan - 1], colStartClasses[colStart]].join(" "), style: style })}>
        <InnerBlocks />
      </div>
    </>
  );
}
