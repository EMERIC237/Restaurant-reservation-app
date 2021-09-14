import React from "react";
import { useHistory, Link } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
function CreateReservation() {
  const history = useHistory();
  function submitHandler(reservation){
      createReservation(reservation).then((savedRservation)=>history.push(``))
  }
}

export default CreateReservation;
