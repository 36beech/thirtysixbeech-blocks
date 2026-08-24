export const ColumnButton = ({columns = 2, label = null, onClick, selected = false, size = "large"}) => {
  const gridClasses = ["grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5"];
  const columnsCount = columns === "flex" ? 5 : columns;
  const buttonClasses = [
    "flex flex-col w-full aspect-305/200 rounded-lg items-center uppercase font-semibold bg-gray-400 cursor-pointer",
    size === "large" ? "p-5 gap-4" : "p-2 gap-1 text-[10px]"
  ];
  const buttonClassesInner = [
    gridClasses[columnsCount - 2],
    "grid gap-2 grow w-full rounded-lg",
    size === "large" ? "gap-2" : "gap-1"
  ];

  return (
    <button className={buttonClasses.join(" ")} onClick={onClick}>
      <div className={buttonClassesInner.join(" ")}>
        {[...Array(columnsCount)].map((col) => <span key={col} className="bg-gray-700"></span>)}
      </div>
      <span>{label ? label : `${columnsCount} Columns`}</span>
    </button>
  );
}