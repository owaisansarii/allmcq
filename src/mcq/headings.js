import React, { useState, useEffect } from "react";
import "./headings.css";
import contents from "./saved/contents.json";
import Title from "./title";
const Headings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(contents);
    }, 1000);
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Select the topic</h1>
        {data.map((curElem) => {
          const { id } = curElem;
          return <Title key={id} {...curElem} />;
        })}
      </div>
    </>
  );
};

export default Headings;
