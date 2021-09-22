import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { AssignTable } from "../utils/api";
import SeatForm from "./SeatForm";

function SeatReservation({ tables, setTables }) {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [choiceError, setChoiceError] = useState(null);

  function submitHandler(tableChoice) {
    //Don't do anything if the choice is nit updated
    if (tableChoice) {
      AssignTable(tableChoice.table_id, reservation_id)
        .then(() => history.push(`/dashboard`))
        .catch(setChoiceError);
      // updateReservationStatus(reservation_id, "seated");
    }
  }
  function cancel() {
    history.goBack();
  }

  return (
    <>
      <h1>Assign a table to the reservation</h1>
      <SeatForm
        onCancel={cancel}
        onSubmit={submitHandler}
        choiceError={choiceError}
        tables={tables}
        setTables={setTables}
      />
    </>
  );
}

export default SeatReservation;
