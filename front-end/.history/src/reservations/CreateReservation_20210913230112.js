import React from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function CreateReservation() {
  const history = useHistory();
  function submitHandler(reservation) {
    createReservation(reservation).then((savedReservation) =>
      history.push(`/dashboard?date=${savedReservation.reservation_date}`)
    );
  }
  function cancel() {
    history.goBack();
  }
  return (
    <>
      <h1>Create a reservation</h1>
      <ReservationForm onCancel={cancel} onSubmit={submitHandler} />;
    </>
  );
}
