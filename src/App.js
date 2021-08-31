import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [focus, setFocus] = useState(false);
  const Navbar = () => {
    const history = useHistory();
    const handleChange = (e) => {
      e.preventDefault();
      setFocus(true);
      setSearchTerm(e.target.value);
    };
    const Nav = () => {
      return (
        <>
          <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
              <span
                onClick={() => history.push("/allmcq")}
                className="navbar-brand"
              >
                MCQ
              </span>
              <input
                autoFocus={focus}
                className="form-control me-2"
                type="search"
                value={searchTerm}
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              ></input>
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
            <MCQ searchTerm={searchTerm} />
          </Route>
          <Route path="/allmcq" component={Headings} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
