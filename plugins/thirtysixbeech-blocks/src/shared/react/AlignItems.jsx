import { BaseControl, ToolbarButton } from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import { alignment } from "@shared/flex-grid-classes";

export const AlignItems = ({ label = "Align Items", value, onClick }) => {
	return (
		<BaseControl label={label}>
			<Stack alignment="center">
				{alignment.map((item) => (
					<ToolbarButton
						icon={item.icon}
						label={item.label}
						isPressed={value === item.value}
						onClick={() => onClick(item.value)}
					/>
				))}
			</Stack>
		</BaseControl>
	);
};
