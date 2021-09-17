import React from "react";

function Reservation({ detailed, reservations }) {
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
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Number of People</th>
        </tr>
      </thead>
      <tbody>{reservationTable}</tbody>
    </table>
  );
}

export default Reservation;
