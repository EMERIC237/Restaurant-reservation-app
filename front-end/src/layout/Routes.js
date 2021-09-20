import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreateReservation from "../reservations/CreateReservation";
import CreateTable from "../tables/CreateTable";
import { today } from "../utils/date-time";
import SeatReservation from "../reservations/SeatReservation";
import EditReservation from "../reservations/EditReservation";
import SearchReservation from "../reservations/SearchReservation";

/**
 * Defines all the routes for the application.
 *
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        {" "}
        <SeatReservation
          tables={tables}
          setTables={setTables}
          tablesError={tablesError}
          setTablesError={setTablesError}
        />
      </Route>
      <Route path="/reservations/new">
        {" "}
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={today()}
          tables={tables}
          setTables={setTables}
          tablesError={tablesError}
          setTablesError={setTablesError}
        />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
