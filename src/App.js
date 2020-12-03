import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import Navbar from './Components/NavbarC.js';
import Newsletter from './Components/Newsletter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home.js';
import About from './Components/About.js';
import NoMatch from './Components/NoMatch.js';
import Products from './Components/Products.js';
import Basket from './Components/Basket.js';

class App extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      apiData: [],
      delivery: [],
      isFetched: false,
      errorMsg: null,
      basket: [],
      deliveryDetails: false,
    };
    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.deliveryDetails = this.deliveryDetails.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
  }

  addToBasket(id) {
    //use unique ID from productCard map function to filter for element in apiData
    let item = this.state.apiData.filter(
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
  deliveryDetails() {
    if (this.state.deliveryDetails === false) this.setState({ deliveryDetails: true });
    else {
      this.setState({ deliveryDetails: false });
    }
  }
  removeFromBasket(i) {
    let bArray = this.state.basket;
    let itemIndex = bArray.findIndex(this.getItem(i));
    bArray.splice(itemIndex, 1);
    this.setState({ basket: bArray });
  }

  async componentDidMount() {
    try {
      const API_URL =
        'https://raw.githubusercontent.com/Team-Vandium/data/main/products-masterlist.json';
      // fetch data from api
      const response = await fetch(API_URL);
      // store response
      const jsonResult = await response.json();

      this.setState({ delivery: jsonResult.deliveryCost });
      this.setState({ delivery: jsonResult.deliveryCost });
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


  viewBasket() {
    if (this.state.viewBasket === false) this.setState({ viewBasket: true });
    else {
      this.setState({ viewBasket: false });
    }
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Navbar basket={this.state.basket}/>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Products
                    apiData={this.state.apiData}
                    addToBasket={this.addToBasket}
                    random={this.state.random}
                  />
                )}
              />
              <Route path="/Home" component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Newsletter" component={Newsletter} />
              <Route path="/Basket" render={()=><Basket state={this.state} 
              apiData={this.state.apiData}
              emptyBasket={this.emptyBasket}
              deliveryDetails={this.deliveryDetails}
              />} />
              <Route
                path="/Products"
                render={() => (
                  <Products
                    apiData={this.state.apiData}
                    addToBasket={this.addToBasket}
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
