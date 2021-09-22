import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { listReservations, listTables } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { previous, next } from "../utils/date-time";
import ReservationsList from "./ReservationsList";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, tables, setTables, setTablesError }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const search = useLocation().search;
  const dateFromQuery = new URLSearchParams(search).get("date");
  let dateForUrl = dateFromQuery ? dateFromQuery : date;
  useEffect(loadDashboard, [dateForUrl,setTables,setTablesError]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(dateForUrl, false, abortController.signal)
      .then(formatReservationDate)
      .then(formatReservationTime)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  function todayHandler() {
    history.push({
      pathname: "/dashboard",
      search: `?date=${date}`,
    });
  }

  function nextHandler() {
    history.push({
      pathname: "/dashboard",
      search: `?date=${next(dateForUrl)}`,
    });
  }

  function previousHandler() {
    history.push({
      pathname: "/dashboard",
      search: `?date=${previous(dateForUrl)}`,
    });
  }
  if (reservationsError) {
    return (
      <main>
        <h1>Dashboard</h1>
        <div>Something went wrong !</div>
        <p>
          Error message: <b>{reservationsError.message}</b>
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Dashboard</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for the date :{dateForUrl}</h4>
          </div>
          {reservations.length === 0 ? (
            <div>No Reservations For this date</div>
          ) : (
            <div>
              <ReservationsList detailed={true} reservations={reservations} />
            </div>
          )}
        </div>
        <div>
          <TablesList tables={tables} />
        </div>
      </div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group" role="group" aria-label="First group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => previousHandler()}
          >
            Previous
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="First group">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => todayHandler()}
          >
            Today
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button
            type="button"
            className="btn btn-secondary "
            onClick={() => nextHandler()}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
