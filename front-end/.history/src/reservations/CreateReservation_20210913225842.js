import React from "react";
import { useHistory, Link } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
function CreateReservation() {
  const history = useHistory();
  function submitHandler(reservation) {
    createReservation(reservation).then((savedReservation) =>
      history.push(`/dashboard?date=${savedReservation.reservation_date}`)
    );
  }
  function cancel() {
    history.goBack();
  }
  return
}

export default CreateReservation;
