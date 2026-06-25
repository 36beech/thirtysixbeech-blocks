export const Section = ({ tag = "section", children, ...props }) => {
  const Tag = tag;
  return (
    <Tag {...props}>
      {children}
    </Tag>
  );
};