import React from "react";
import TableUnit from "./TableUnit";
/**
 * Defines the list of tales 
 * @param tables
 * The list of tables
 * @returns {JSX.Element}
 */
function TablesList({ tables }) {
  const tablesList = tables.map((table, index) => (
    <TableUnit key={index} table={table} />
  ));
  return (
    <>
      <h1>Tables List :</h1>
      {tablesList}
    </>
  );
}

export default TablesList;
