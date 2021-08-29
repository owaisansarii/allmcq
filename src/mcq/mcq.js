import React from "react";
import { withRouter } from "react-router-dom";
import "./mcq.css";
import Index from "./index";

const Mcq = (props) => {
  const fname = props.match.params.fileName;
  return (
    <>
      <Index fileName={fname} />
    </>
  );
};

export default withRouter(Mcq);
