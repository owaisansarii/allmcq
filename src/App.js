import React, { useState } from "react";
import Headings from "./mcq/headings";
import MCQ from "./mcq/mcq";
import "./navbar.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Paper } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focus, setFocus] = useState(false);
  const [background, setBackground] = useState("#ccc");
  const [darkMode, setDarkMode] = useState(false);
  const color = ["#ccc", "white"];
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
          <nav
            className={`navbar ${
              darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
            } sticky-top`}
          >
            <div className="container-fluid">
              <span
                onClick={() => history.push("/allmcq")}
                className="navbar-brand"
              >
                MCQ
              </span>
              <div
                className="d-flex"
                style={{ backgroundColor: background }}
                onClick={() => {
                  setDarkMode(!darkMode);
                  if (background === color[0]) {
                    setBackground(color[1]);
                  }
                  if (background === color[1]) {
                    setBackground(color[0]);
                  }
                }}
              >
                {background === color[0] ? "🌙" : "🌞"}
              </div>
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

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div data-theme={darkMode ? "dark" : "light"}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/allmcq" component={Headings} />
              <Route exact path="/allmcq/mcq/:fileName">
                <MCQ searchTerm={searchTerm} />
              </Route>
              <Route path="/" component={Headings} />
            </Switch>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
