import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../Styles/header.css";

function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  console.log(pathname);
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: "#212121" }}>
      <div className="container">
        <Link className="mr-auto navbar-brand" to="/tracks">
          Brand
        </Link>
        <ul className="nav d-flex align-items-center nav-text">
          <li className="nav-item ">
            <Link
              to="/tracks"
              className={`pr-4 nav-text ${
                pathname === "/tracks" ? "text-white" : "text-muted"
              }`}
            >
              Tracks
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/albums"
              className={`pr-4 nav-text ${
                pathname === "/albums" ? "text-white" : "text-muted"
              }`}
            >
              Albums
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                logOut();
              }}
            >
              {" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
