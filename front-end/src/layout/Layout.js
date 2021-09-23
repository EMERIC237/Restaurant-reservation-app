import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import resto from "../images/resto.jpg";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will NOT need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div
          className="col"
          style={{
            backgroundImage: `url(${resto})`,
            backgroundSize: "inherit",
            color: "white",
          }}
        >
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
