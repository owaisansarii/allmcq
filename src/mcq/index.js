import React, { useState, useEffect } from "react";

const Index = (props) => {
  let title = props.fileName;
  let searchTerm = props.searchTerm.trim();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://mcq1-api.herokuapp.com/api/${title}`;
      const res = await fetch(url);
      const resJson = await res.json();
      setData(resJson);
    };
    fetchApi();
  }, [title]);
  //   console.log(data);
  if (!data) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }
  if (searchTerm && data) {
    const newData = data.filter((item) => {
      let { Question } = item;
      if (Question) {
        return Question.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return false;
      }
    });
    return (
      <>
        {newData.slice(0, 50).map((item, index) => {
          let { Question, Options, Answer } = item;
          let code;
          let ques, ans;
          if (Answer) {
            ans = Answer.split("\n")[0];
          }
          //
          if (Question) {
            code = Question.substring(Question.indexOf("<"));
            ques = Question.replace(code, "");
          }
          return (
            <div key={index} className="mcq">
              <div className="question">
                <span>{ques}</span>
                <div dangerouslySetInnerHTML={{ __html: code }}></div>
                <div className="border"></div>
              </div>
              <div className="option-ans">
                {Options.map((option, index) => {
                  return <p key={index}>{option}</p>;
                })}
                <div className="answer">{ans}</div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <>
      {/* <p>{!data ? "Loading..." : "yes"}</p>
      <p>{title}</p> */}
      {data &&
        data.slice(0, 150).map((item, index) => {
          let { Question, Options, Answer } = item;
          let code;
          let ques, ans;
          if (Answer) {
            ans = Answer.split("\n")[0];
          }
          //
          if (Question) {
            code = Question.substring(Question.indexOf("<"));
            ques = Question.replace(code, "");
          }
          return (
            <div key={index} className="mcq">
              <div className="question">
                <span>{ques}</span>
                <div dangerouslySetInnerHTML={{ __html: code }}></div>
                <div className="border"></div>
              </div>
              <div className="option-ans">
                {Options.map((option, index) => {
                  return <p key={index}>{option}</p>;
                })}
                <div className="answer">{ans}</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Index;
