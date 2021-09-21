import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [editError, setEditError] = useState([]);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });
  useEffect(() => {
    readReservation(reservation_id)
      .then(formatReservationDate)
      .then(formatReservationTime)
      .then(setReservation);
  }, [reservation_id]);
  function submitHandler(updatedReservation) {
    updatedReservation.people = parseInt(updatedReservation.people);
    if (reservation.status !== "booked") {
      return (
        <div className="alert alert-danger">
          Only reservations with the status "booked" can be edited
        </div>
      );
    } else {
      updateReservation(updatedReservation)
        .then((savedReservation) =>
          history.push(`/dashboard?date=${savedReservation.reservation_date}`)
        )
        .catch((error) => setEditError((prevError) => [...prevError, error]));
    }
  }
  function cancel() {
    history.goBack();
  }

  const child = reservation_id ? (
    <ReservationForm
      onSubmit={submitHandler}
      onCancel={cancel}
      Error={editError}
      Edit={true}
      initialState={reservation}
    />
  ) : (
    <p>Loading...</p>
  );
  return (
    <>
      <h1>Edit the Reservation</h1>
      {child}
    </>
  );
}

export default EditReservation;
