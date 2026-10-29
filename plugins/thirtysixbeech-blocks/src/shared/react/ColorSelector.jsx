import { useState, useRef, useMemo } from "react";
import { Stack, Button } from "@wordpress/ui";
import { ColorIndicator, Popover, ColorPalette } from "@wordpress/components";
import { useSettings } from "@wordpress/block-editor";

export const ColorSelector = ({ value, buttonLabel = "Choose Color", onChange }) => {
  const paletteSources = useSettings("color.palette.theme", "color.palette.custom");
  // Flatten and filter the colors to help remove nullish values
  const colors = useMemo(
    () =>
      paletteSources
        ?.filter((palette) => palette != null)
        ?.flat()
        ?.filter((entry) => entry != null),
    [paletteSources],
  );

  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  return (
    <>
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => setIsVisible((state) => !state)}
        style={{ width: "100%" }}
        tone="neutral"
      >
        <Stack direction="row" gap="md">
          <ColorIndicator colorValue={value ?? ""} />
          <span>{buttonLabel}</span>
        </Stack>
      </Button>

      {isVisible && (
        <Popover anchor={buttonRef.current} position="bottom" offset={5} onClose={() => setIsVisible(false)}>
          <div style={{ padding: "10px" }} onClick={(event) => event.stopPropagation()}>
            <ColorPalette
              colors={colors}
              value={value}
              onChange={(color) => {
                onChange(color);
              }}
            />
          </div>
        </Popover>
      )}
    </>
  );
};
