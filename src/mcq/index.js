import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Index = (props) => {
  let title = props.fileName;
  let searchTerm = props.searchTerm.trim();
  const [noMore, setNoMore] = useState(true);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(2);
  const [searchItem, setSearchItem] = useState(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://mcq1-api.herokuapp.com/api/${title}?page=1&size=20`;
      const res = await fetch(url);
      const resJson = await res.json();
      setData(resJson.result);
    };
    fetchApi();
  }, [title]);

  const fetchMoreData = async () => {
    const url = `https://mcq1-api.herokuapp.com/api/${title}?page=${page}&size=20`;
    const res = await fetch(url);
    const resJson = await res.json();
    const data = resJson.result;
    return data;
  };
  const fetchData = async () => {
    const moreData = await fetchMoreData();
    setData([...data, ...moreData]);
    if (moreData.length < 20) {
      setNoMore(false);
    }
    setPage(page + 1);
  };

  const fetchSearch = async () => {
    const url = `https://mcq1-api.herokuapp.com/api/${title}?all=true`;
    const res = await fetch(url);
    const resJson = await res.json();
    const newData = await resJson.result;
    setSearchItem(newData);
  };

  if (!data) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }
  if (data) {
    if (!done) {
      fetchSearch();
      setDone(true);
    }
  }

  if (searchTerm && searchItem) {
    const newData = searchItem.filter((item) => {
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
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={
          <p style={{ textAlign: "center", margin: "20px" }}>Loading...</p>
        }
        endMessage={
          <p style={{ textAlign: "center", margin: "20px" }}>
            Yay! You have seen it all
          </p>
        }
      >
        {data.map((item, index) => {
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
      </InfiniteScroll>
    </>
  );
};

export default Index;
