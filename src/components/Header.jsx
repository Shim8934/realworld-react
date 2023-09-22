import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
      <>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">conduit</Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
  );
}

export default Header;