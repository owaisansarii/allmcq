import React from "react";
import Headings from "./mcq/headings";
import MCQ from "./mcq/mcq";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

const App = () => {
  const Navbar = () => {
    const history = useHistory();

    const Nav = () => {
      return (
        <>
          <nav className="navbar navbar-light bg-light fixed-top">
            <div
              style={{ textAlign: "center", width: "100%" }}
              onClick={() => history.push("/allmcq")}
              className="na"
            >
              <span className="navbar-brand">MCQ</span>
            </div>
          </nav>
        </>
      );
    };
    return (
      <div>
        <Nav key="nav" />
      </div>
    );
  };

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/allmcq" component={Headings} />
          <Route exact path="/mcq/:fileName">
            <MCQ />
          </Route>
          <Route path="/" component={Headings} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
