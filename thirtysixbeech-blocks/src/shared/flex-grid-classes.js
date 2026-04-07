import { justifyLeft, justifyCenter, justifyRight, justifySpaceBetween, justifyTop, justifyCenterVertical, justifyBottom, justifyStretch, mobile, tablet, desktop  } from "@wordpress/icons";

export const breakpoints = [
	{ label: "Mobile", value: "all", icon: mobile },
	{ label: "Tablet", value: "md", icon: tablet },
	{ label: "Desktop", value: "lg", icon: desktop },
];

export const justifySpaceAround = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    {/* Left edge line */}
    <path d="M3 4h2v16H3V4z" />
    {/* Right edge line */}
    <path d="M19 4h2v16h-2V4z" />
    {/* Left block */}
    <path d="M7 9h3v6H7V9z" />
    {/* Right block */}
    <path d="M14 9h3v6h-3V9z" />
  </svg>
);

const flexClasses = {
	all: "tsb-flex",
	sm: "sm:tsb-flex",
	md: "md:tsb-flex",
	lg: "lg:tsb-flex",
	xl: "xl:tsb-flex",
};

const justification = [
	{
		label: "Justify items left",
		icon: justifyLeft,
		value: "tsb-j-start",
	},
	{
		label: "Justify items center",
		icon: justifyCenter,
		value: "tsb-j-center",
	},
	{
		label: "Justify items right",
		icon: justifyRight,
		value: "tsb-j-end",
	},
	{
		label: "Justify items space between",
		icon: justifySpaceBetween,
		value: "tsb-j-between",
	},
	{
		label: "Justify items space around",
		icon: justifySpaceAround,
		value: "tsb-j-around",
	},
];

const alignment = [
	{
		label: "Align items top",
		icon: justifyTop,
		value: "tsb-a-start",
	},
	{
		label: "Align items center",
		icon: justifyCenterVertical,
		value: "tsb-a-center",
	},
	{
		label: "Align items bottom",
		icon: justifyBottom,
		value: "tsb-a-end",
	},
	{
		label: "Align items stretch",
		icon: justifyStretch,
		value: "tsb-a-stretch",
	},
];

export { flexClasses, justification, alignment };
