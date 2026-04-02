export const Section = ({ tag = "section", children, ...props }) => {
  const Tag = tag;
  return (
    <Tag {...props}>
      <div className="px-5 relative z-10">{children}</div>
    </Tag>
  );
};