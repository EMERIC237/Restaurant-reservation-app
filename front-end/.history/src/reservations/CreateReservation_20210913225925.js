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
  return(
    <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home" /> Home
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
    <h1>Create Deck</h1>
    <DeckForm onCancel={cancel} onSubmit={submitHandler} />;
  </>
  )
}

export default CreateReservation;
