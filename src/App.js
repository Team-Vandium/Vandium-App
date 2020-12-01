import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import NavBar from "./Components/NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import NoMatch from "./Components/NoMatch.js";
import Products from "./Components/Products.js";

class App extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null,
    };
  }

  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/Team-Vandium/data/main/products-masterlist.json";
      // fetch data from api
      const response = await fetch(API_URL);
      // store response
      const jsonResult = await response.json();

      this.setState({ apiData: jsonResult.products });
      this.setState({ isFetched: true });
    } catch (error) {
      // API threw an error
      this.setState({ isFetched: false });
      // save to variable to display the error
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

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
            <Route
              path="/Products"
              render={() => <Products apiData={this.state.apiData} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
