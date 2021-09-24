import React from "react";
import { updateReservationStatus } from "../utils/api";

export default function SmallReservationList({ reservations }) {
  function cancelHandler(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      updateReservationStatus(reservation_id, "cancelled").then(
        window.location.reload()
      );
    }
  }
  const reservationList = reservations.map(
    ({
      reservation_id,
      first_name,
      last_name,
      reservation_date,
      reservation_time,
      people,
      status,
    }) => {
      let SeatButton;
      let CancelButton;
      if (status === "booked") {
        SeatButton = (
          <a
            className="btn btn-primary"
            href={`/reservations/${reservation_id}/seat`}
            role="button"
          >
            Seat
          </a>
        );
      } else {
        SeatButton = null;
      }
      if (status !== "cancelled") {
        CancelButton = (
          <button
            className="btn btn-danger"
            data-reservation-id-cancel={reservation_id}
            onClick={() => {
              cancelHandler(reservation_id);
            }}
          >
            Cancel
          </button>
        );
      } else {
        CancelButton = null;
      }
      return (
        <li key={reservation_id} className="border border-success mb-2">
          <div className="d-flex justify-content-between">
            <div>{last_name}</div>
            <div> {reservation_date}</div>
            <div> {reservation_time}</div>
            <div> {people}</div>
            <div data-reservation-id-status={reservation_id}>{status}</div>
          </div>

          <div className="d-flex justify-content-between">
            <div>{SeatButton}</div>
            <div>
              {" "}
              <a
                className="btn btn-primary"
                href={`/reservations/${reservation_id}/edit`}
                role="button"
              >
                Edit
              </a>
            </div>
            <div>{CancelButton}</div>
          </div>
        </li>
      );
    }
  );
  return (
    <div>
      <ul>{reservationList}</ul>
    </div>
  );
}
