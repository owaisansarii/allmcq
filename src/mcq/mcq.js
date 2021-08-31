import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./mcq.css";
import Index from "./index";

const Mcq = (props) => {
  const fname = props.match.params.fileName;
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <input
        className="form-control me-2 fixed-top"
        type="text"
        value={searchTerm}
        placeholder="Search"
        onChange={handleChange}
        style={{ top: "40px" }}
      ></input>
      <Index fileName={fname} searchTerm={searchTerm} />
    </>
  );
};

export default withRouter(Mcq);
