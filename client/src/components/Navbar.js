import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import { userContext } from "../App";
function Navbar() {
  const { state, dispatch } = useContext(userContext);
  // console.log(state);
  if (state) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="#">
            <img
              style={{ width: "150px", paddingLeft: "12px" }}
              src={logo}
              alt="logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item active">
                {/* <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a> */}

                <NavLink to={"/"} className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/aboutme"} className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/contact"} className="nav-link">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/signup"} className="nav-link">
                  Signup
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to={"/login"} className="nav-link">
                  Login
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to={"/logout"} className="nav-link">
                  LogOut
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="#">
            <img
              style={{ width: "150px", paddingLeft: "12px" }}
              src={logo}
              alt="logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item active">
                {/* <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a> */}

                <NavLink to={"/"} className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/aboutme"} className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/contact"} className="nav-link">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/signup"} className="nav-link">
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link">
                  Login
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to={"/logout"} className="nav-link">
                  LogOut
                </NavLink>
              </li> */}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
