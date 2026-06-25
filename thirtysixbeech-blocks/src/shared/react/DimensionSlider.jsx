import { __ } from "@wordpress/i18n";
import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import { useState } from "react";

const defaultAllowedUnits = [
    {
      a11yLabel: 'Pixels (px)',
      label: 'px',
      step: 1,
      value: 'px'
    },
    {
      a11yLabel: 'Percent (%)',
      label: '%',
      step: 0.1,
      value: '%'
    },
    {
      a11yLabel: 'REM (rem)',
      label: 'rem',
      step: 0.25,
      value: 'rem'
    }
  ];

const parseQuantityAndUnit = (value) => {
	if (!value) return [undefined, "px"];

	const match = value.match(/^([\d.]+)([a-z%]+)$/i);
	if (!match) return [undefined, "px"];

	return [parseFloat(match[1]), match[2]];
};

export const DimensionSlider = ({ label = "Width", value, units = defaultAllowedUnits, onChange }) => {
	const [intValue, selectedUnit] = parseQuantityAndUnit(value);

  const minMax = {
    min: 24,
    max: 1200
  }
  switch(selectedUnit) {
    case "%":
      minMax.min = 1;
      minMax.max = 100
      break;
    case "rem":
      minMax.min = 1.5;
      minMax.max = 75
  }

	const handleSlideChange = (e) => {
		const value = `${e.target.value}${selectedUnit}`;
		onChange(value);
	};
	return (
		<>
			<BaseControl label={label}>
				<Stack direction="row" gap="sm" align="center">
					<UnitControl
						__next40pxDefaultSize
						value={value}
						onChange={onChange}
            units={units}
						min={minMax.min}
						max={minMax.max}
					/>
					<input
						type="range"
						min={minMax.min}
						max={minMax.max}
						value={intValue}
						onChange={handleSlideChange}
					/>
				</Stack>
			</BaseControl>
		</>
	);
};
