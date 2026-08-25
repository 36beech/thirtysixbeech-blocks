export const GridItem = ( { columnSpan = 3, className = "", children } ) => {
  const gridClasses = [
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",
  ];

  const itemClass = [gridClasses[columnSpan - 1]];
  if( className ) itemClass.push( className );

  return <div className={itemClass.join(' ')}>{children}</div>;
}

export const Grid = ( {className, children } ) => {
  const gridClasses = [
    "grid grid-cols-12 gap-8",
    "max-sm:flex max-sm:flex-col-reverse"
  ];
  if(className) {
    gridClasses.push(className);
  }
  return <div className={`${gridClasses.join(" ")}`}>{children}</div>;
}