import React, { createContext, ReactNode } from "react";

// Context to share data with columns
interface DataTableContextType<T> {
  data: T[];
}
const DataTableContext = createContext<DataTableContextType<any> | undefined>(
  undefined
);

// DataTable.Column Component
interface ColumnProps<T> {
  header: string;
  field?: keyof T;
  render?: (item: T) => ReactNode;
}
// We don't render anything directly here in the final output,
// but we use the props to define headers/cells in the parent.
// However, typically in this pattern, the parent iterates over children to build the table.
export function Column<T>(_: ColumnProps<T>) {
  return null;
}

// DataTable Component
interface DataTableProps<T> {
  data: T[];
  children: ReactNode;
  rowKey: (item: T) => string | number;
}

export function DataTable<T>({ data, children, rowKey }: DataTableProps<T>) {
  const columns = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<ColumnProps<T>> =>
      React.isValidElement(child) && child.type === Column
  );

  return (
    <DataTableContext.Provider value={{ data }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#fafafa", textAlign: "left" }}>
            {columns.map((col, index) => (
              <th
                key={index}
                style={{ padding: "0.75rem", fontWeight: "bold" }}
              >
                {col.props.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={rowKey(item)} style={{ borderBottom: "1px solid #eee" }}>
              {columns.map((col, index) => (
                <td key={index} style={{ padding: "0.75rem" }}>
                  {col.props.render
                    ? col.props.render(item)
                    : col.props.field
                    ? (item[col.props.field] as ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableContext.Provider>
  );
}

// Attach subcomponent
DataTable.Column = Column;
