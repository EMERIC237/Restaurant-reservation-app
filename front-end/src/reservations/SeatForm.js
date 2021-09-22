import React, { useState, useEffect } from "react";

import { listTables } from "../utils/api";
/**
 * Form to seat a reservation
 * @param onSubmit
 * Function to handle the <submit> button
 * @param onCancel
 * Function to handle the <cancel> button
 * @param choiceError && tablesError - error to display if an error occurred
 * @param tables - List of tables
 * @param {useState functions}: setTables,setTablesErrors
 * @returns {JSX.Element}
 */
function SeatForm({
  onSubmit,
  onCancel,
  choiceError,
  tables,
  setTables,
  tablesError,
  setTablesError,
}) {
  const initialState = {
    table_id: 0,
  };
  const [tableChoice, setTableChoice] = useState(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => {
      abortController.abort();
    };
  }, [setTables, setTablesError]);
  function changeHandler({ target: { name, value } }) {
    setTableChoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(tableChoice);
  }

  const tablesOptions = tables.map((table, index) => (
    <option key={index} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));
  if (tablesError) {
    return <div>{tablesError.message}</div>;
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="Table Number">Table Number</label>
            <select
              className="form-control"
              id="table_id"
              name="table_id"
              value={tableChoice.table_id}
              required={true}
              onChange={changeHandler}
            >
              {tablesOptions}
            </select>
          </div>
          {choiceError ? (
            <div className="alert alert-danger"> {choiceError.message}</div>
          ) : null}
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default SeatForm;
