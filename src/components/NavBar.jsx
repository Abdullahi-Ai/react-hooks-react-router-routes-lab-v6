import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav data-testid="navbar" role="navigation">
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/actors">Actors</NavLink>
        </li>
        <li>
          <NavLink to="/directors">Directors</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
