import React from "react";

const NavBar = (props) => (
  <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      Navbar &nbsp;
      <span className="badge badge-pill badge-secondary">
        {props.counters.filter((c) => c.value > 0).length}
      </span>
    </a>
  </nav>
);

export default NavBar;
