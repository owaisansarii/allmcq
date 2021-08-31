import React, { useState } from "react";
import { Link } from "react-router-dom";

const Title = ({ Title, content }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="heading" onClick={() => setShow(!show)}>
        <p>
          {show ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </p>
        <p>{Title}</p>
      </div>
      {show && (
        <div className="topics">
          {content.map((item, index) => {
            let { title } = item;
            return (
              <div className="option" key={index}>
                <i className="fas fa-angle-double-right"></i>
                {"     "}
                <Link to={"/mcq/" + title}>{title.replace("1000", "")}</Link>
              </div>
            );
          })}

          {/* <Router></Router> */}
        </div>
      )}
    </>
  );
};

export default Title;
