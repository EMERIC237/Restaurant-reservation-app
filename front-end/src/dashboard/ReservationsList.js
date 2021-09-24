import React from "react";
import DetailedReservationList from "./DetailedReservationList";
import "./ReservationsList.css";
import SmallReservationList from "./SmallReservationList";
/**
 * Defines the list of reservations in a table
 * @param detailed
 * Boolean to defines the view type of the reservations list
 * @param reservations
 * The list of reservations
 * @returns {JSX.Element}
 */
function ReservationsList({ detailed, reservations }) {
  if (!detailed) {
    return (
      <>
        <SmallReservationList reservations={reservations} />
      </>
    );
  }
  return (
    <>
      <DetailedReservationList reservations={reservations} />
    </>
  );
}

export default ReservationsList;
