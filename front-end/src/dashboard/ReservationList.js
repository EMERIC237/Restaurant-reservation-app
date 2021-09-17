import React, { useState, useEffect } from "react";
import { listReservations } from "../utils/api";
import Reservation from "../reservations/Reservation";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const abortController = new AbortController();

    listReservations(abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }, [setReservations]);


  const listForReservations = reservations.map((reservation) => (
    <Reservation key={reservation.reservation_id} reservation={reservation} />
  ));

  return (
    <main>
      <section>{listForReservations}</section>
    </main>
  );
}
