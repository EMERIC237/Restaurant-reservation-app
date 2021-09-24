import React from "react";
import { updateReservationStatus } from "../utils/api";

export default function DetailedReservationList({ reservations }) {
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

  const reservationTable = reservations.map(
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
        <tr key={reservation_id}>
          <td>{reservation_id}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{reservation_date}</td>
          <td>{reservation_time}</td>
          <td>{people}</td>
          <td data-reservation-id-status={reservation_id}>{status}</td>
          <td
            style={{ borderTopStyle: "dotted" }}
            className="d-flex justify-content-between"
          >
            <div>{SeatButton}</div>
            <div>
              {" "}
              <a
                className="btn btn-primary button"
                href={`/reservations/${reservation_id}/edit`}
                role="button"
              >
                Edit
              </a>
            </div>
            <div>{CancelButton}</div>
          </td>
        </tr>
      );
    }
  );
  return (
    <div style={{ style: "overflow-x:auto" }}>
      <table
        className="table table-striped table-bordered table-sm table-responsive-sm styled-table"
        style={{ color: "white" }}
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Functions</th>
          </tr>
        </thead>
        <tbody>{reservationTable}</tbody>
      </table>
    </div>
  );
}
