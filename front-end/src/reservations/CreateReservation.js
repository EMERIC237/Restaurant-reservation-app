import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { previous } from "../utils/date-time";

export default function CreateReservation() {
  const [creationError, setCreationError] = useState([]);
  const history = useHistory();
  function submitHandler(reservation) {
    reservation.people = parseInt(reservation.people);
    createReservation(reservation)
      .then(formatReservationDate)
      .then(formatReservationTime)
      .then((savedReservation) =>
        history.push(`/dashboard?date=${savedReservation.reservation_date}`)
      )
      .catch((error) => {
        if (error.message === "The restaurant is closed on Tuesdays") {
          setCreationError((prevError) => [...prevError, error]);
          const currentDate = new Date(reservation.reservation_date);
          const previousDate = new Date(currentDate);
          previousDate.setDate(previousDate.getDate() - 1);
          reservation.reservation_date = previous.toISOString().split("T")[0];
          createReservation(reservation)
            .then()
            .catch((error) =>
              setCreationError((prevError) => [...prevError, error])
            );
        }
      });
  }
  function cancel() {
    history.goBack();
  }
  return (
    <>
      <h1>Create a reservation</h1>
      <ReservationForm
        onCancel={cancel}
        onSubmit={submitHandler}
        creationError={creationError}
      />
    </>
  );
}
