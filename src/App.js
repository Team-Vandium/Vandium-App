import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import NavBar from "./Components/NavBar.js";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import NoMatch from "./Components/NoMatch.js";
import Products from "./Components/Products.js";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* NavBar */}
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Products" component={Products} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
