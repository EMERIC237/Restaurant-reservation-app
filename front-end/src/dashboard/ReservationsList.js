import React from "react";
import { updateReservationStatus } from "../utils/api";
import "./ReservationsList.css";
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

  const reservationList = reservations.map(
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
      <li key={index} className="border border-success mb-2">
        <div className="d-flex justify-content-between">
          <div>{last_name}</div>
          <div> {reservation_date}</div>
          <div> {reservation_time}</div>
          <div> {people}</div>
          <div data-reservation-id-status={reservation_id}>{status}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>
            {" "}
            {status === "booked" ? (
              <a
                className="btn btn-primary"
                href={`/reservations/${reservation_id}/seat`}
                role="button"
              >
                Seat
              </a>
            ) : null}
          </div>
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
          <div>
            {status !== "cancelled" ? (
              <button
                className="btn btn-danger"
                data-reservation-id-cancel={reservation_id}
                onClick={() => cancelHandler(reservation_id)}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </li>
    )
  );
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
        <td
          key={`${"a" + index}`}
          style={{ borderTopStyle: "dotted" }}
          className="d-flex justify-content-between"
        >
          <div>
            {" "}
            {status === "booked" ? (
              <a
                className="btn btn-primary button"
                href={`/reservations/${reservation_id}/seat`}
                role="button"
              >
                Seat
              </a>
            ) : null}
          </div>
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
          <div>
            {status !== "cancelled" ? (
              <button
                className="btn btn-danger button"
                data-reservation-id-cancel={reservation_id}
                onClick={() => cancelHandler(reservation_id)}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </td>
      </tr>
    )
  );
  if (!detailed) {
    return (
      <div>
        <ul>{reservationList}</ul>
      </div>
    );
  }
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

export default ReservationsList;
