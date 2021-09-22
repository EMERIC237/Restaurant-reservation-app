import React from "react";
import { updateReservationStatus } from "../utils/api";
/**
 * Defines the list of reservations in a table
 * @param detailed
 * Boolean to defines the view type of the reservations list
 * @param reservations
 * The list of reservations
 * @returns {JSX.Element}
 */
function ReservationsList({ detailed, reservations }) {
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

  const reservationList = reservations.map((reservation, index) => (
    <li key={index}>
      {reservation.last_name},{reservation.reservation_date}
    </li>
  ));
  const reservationTable = reservations.map(
    (
      {
        reservation_id,
        first_name,
        last_name,
        reservation_date,
        reservation_time,
        people,
        status,
      },
      index
    ) => (
      <tr key={index}>
        <td>{reservation_id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{reservation_date}</td>
        <td>{reservation_time}</td>
        <td>{people}</td>
        <td data-reservation-id-status={reservation_id}>{status}</td>
        {status === "booked" ? (
          <td>
            <a
              className="btn btn-primary"
              href={`/reservations/${reservation_id}/seat`}
              role="button"
            >
              Seat
            </a>
          </td>
        ) : null}
        <td>
          <a
            className="btn btn-primary"
            href={`/reservations/${reservation_id}/edit`}
            role="button"
          >
            Edit
          </a>
        </td>
        {status !== "cancelled" ? (
          <td>
            <button
              className="btn btn-danger"
              data-reservation-id-cancel={reservation_id}
              onClick={() => cancelHandler(reservation_id)}
            >
              Cancel
            </button>
          </td>
        ) : null}
      </tr>
    )
  );
  if (!detailed) {
    return (
      <div>
        <ol>{reservationList}</ol>
      </div>
    );
  }
  return (
    <table className="table table-striped table-sm table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Number of People</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>{reservationTable}</tbody>
    </table>
  );
}

export default ReservationsList;
