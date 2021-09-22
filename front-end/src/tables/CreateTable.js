import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";

export default function CreateTable() {
  const [tableError, setTableError] = useState(null);
  const history = useHistory();
  function submitHandler(table) {
    table.capacity = Number(table.capacity);
    createTable(table)
      .then(() => history.push(`/dashboard`))
      .catch(setTableError);
  }

  function cancel() {
    history.goBack();
  }

  return (
    <>
      <h1>Create a new table for your restaurant</h1>
      <TableForm
        onCancel={cancel}
        onSubmit={submitHandler}
        tableError={tableError}
      />
    </>
  );
}
