import React from "react";
import TableUnit from "./TableUnit";

function TablesList({ tables }) {
  console.log(tables);
  const tablesList = tables.map((table, index) => (
    <TableUnit key={index} table={table} />
  ));
  return <>{tablesList}</>;
}

export default TablesList;
