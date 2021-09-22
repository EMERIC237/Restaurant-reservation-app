import React, { useState } from "react";
/**
 * Form to create a table
 * @param onSubmit
 * Function to handle the <submit> button
 * @param onCancel
 * Function to handle the <cancel> button
 * @param tableError - error to display if an error occurred
 * @param initialState
 * Object containing the initial value of the form
 * @returns {JSX.Element}
 */
function TableForm({ onSubmit, onCancel, tableError }) {
  const initialState = {
    table_name: "",
    capacity: "",
  };
  const [table, setTable] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(table);
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="table_name">Table name</label>
            <input
              type="text"
              id="table_name"
              name="table_name"
              className="form-control"
              value={table.table_name}
              required={true}
              placeholder="Name the table here"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              className="form-control"
              value={table.capacity}
              required={true}
              placeholder="Number of people to be seated at the table"
              onChange={changeHandler}
            />
          </div>
          {tableError ? (
            <div className="alert alert-danger"> {tableError.message}</div>
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
export default TableForm;
