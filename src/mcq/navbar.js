import React from "react";
import { useHistory } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const history = useHistory();
  return (
    <>
      <nav className="navbar navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <span onClick={() => history.push("/third")} className="navbar-brand">
            MCQ
          </span>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
