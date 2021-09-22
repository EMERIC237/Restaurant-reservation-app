import React from "react";
import { UnassignTable, updateReservationStatus } from "../utils/api";
/**
 * Defines the layout of a Unique table
 * @param table
 * A single table
 * @returns {JSX.Element}
 */
function TableUnit({ table }) {
  function finishHandler() {
    if (window.confirm(`Is this table ready to seat new guests?`)) {
      updateReservationStatus(table.reservation_id, "finished");
      UnassignTable(table.table_id).then(window.location.reload());
    }
  }

  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">{table.table_name}</li>
      <li className="breadcrumb-item">{table.capacity}</li>
      <li className="breadcrumb-item">
        {table.reservation_id ? (
          <span data-table-id-status={table.table_id}>Occupied</span>
        ) : (
          <span data-table-id-status={table.table_id}>Free</span>
        )}
      </li>
      <li className="breadcrumb-item">
        {table.reservation_id ? (
          <button
            type="button"
            className="btn btn-secondary mr-2 "
            data-table-id-finish={table.table_id}
            onClick={() => finishHandler()}
          >
            Finish
          </button>
        ) : null}
      </li>
    </ol>
  );
}

export default TableUnit;
