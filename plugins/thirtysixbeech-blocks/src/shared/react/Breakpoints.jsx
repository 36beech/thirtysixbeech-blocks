// import { breakpoints } from "@shared/flex-grid-classes";
import { ToolbarButton, BaseControl } from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import { breakpoints } from "@shared/flex-grid-classes";

export const Breakpoints = ( { label = "Breakpoints", value,  onClick }) => {
	return (
		<BaseControl label={label}>
			<Stack alignment="center">
				{breakpoints.map((item) => (
					<ToolbarButton
						icon={item.icon}
						label={item.label}
						isPressed={value === item.value}
						onClick={onClick}
					/>
				))}
			</Stack>
		</BaseControl>
	);
};

/* 							setAttributes({
								breakpoint: item.value,
							})
                */