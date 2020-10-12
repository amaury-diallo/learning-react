import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">
      Vidly
    </Link>
    <div className="">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/customers" className="nav-link">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rentals" className="nav-link">
            Rentals
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
