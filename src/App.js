import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import Navbar from "./Components/NavbarC.js";
import NavBarJ from './Components/NavBarJ';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import NoMatch from "./Components/NoMatch.js";
import Products from "./Components/Products.js";
import Newsletter from "./Components/Newsletter";

class App extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null,
      basket: [],
      viewBasket: false,
      searchTerm: '',
      len: 0,
    };
    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.viewBasket = this.viewBasket.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
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

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  clearSearchBox() {
    this.setState({ searchTerm: '' });
  }

  addToBasket(id) {
    //use unique ID from productCard map function to filter for element in apiData
    let item = this.props.apiData.filter(
      //variable item to hold the element
      this.getItem(id) //call getItem function to return object
    );
    this.setState({ basket: this.state.basket.concat(item) }); //add item to basket array
  }
  getItem(a) {
    //returns correct object from array when passed an element
    return function (obj) {
      return obj.id === a;
    };
  }
  emptyBasket() {
    //remove all items from basket array
    this.setState({ basket: [] });
  }
  viewBasket() {
    if (this.state.viewBasket === false) this.setState({ viewBasket: true });
    else {
      this.setState({ viewBasket: false });
    }
  }
  removeFromBasket(i) {
    let bArray = this.state.basket;
    let itemIndex = bArray.findIndex(this.getItem(i));
    bArray.splice(itemIndex, 1);
    this.setState({ basket: bArray });
  }


  render() {
    return (
      
      <Router>
        <div className="App">
          {/* NavBar */}
          <NavBarJ />
          <Navbar />
          <Switch>
<<<<<<< HEAD
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/Products/test" component={Products} />
=======
            <Route exact path="/" render={() => <Products apiData={this.state.apiData} />} />
            <Route path="/Home" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Newsletter" component={Newsletter} />
            <Route path="/Products" render={() => <Products apiData={this.state.apiData} />}
            />

>>>>>>> 0bbdce746fa62c29e5be2e521ba79b3d2714bc69
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
