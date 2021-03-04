import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sortedColumn = { ...sortColumn };

    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }

    onSort(sortedColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-up"></i>;

    return <i class="fa fa-sort-down"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
