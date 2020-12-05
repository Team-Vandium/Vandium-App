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
    const categories = [
      'Health & Beauty',
      'Food & Drink',
      'Clothing & Fashion',
      'Jewellery',
      'Sport ',
      'Gardening & DIY',
      'Home',
      'Art',
    ];
    this.state = {
      apiData: [],
      delivery: [],
      isFetched: false,
      errorMsg: null,
      productFilters: { category: [] },
      basket: [],
      filteredProducts: [],
      searchTerm: '',
      deliveryDetails: false,

      checked: [],
      checkboxes: categories.reduce(
        (allCategories, singleCategory) => ({
          ...allCategories,
          [singleCategory]: false,
        }),
        {}
      ),
    };

    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.deliveryDetails = this.deliveryDetails.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle(productA, productB) {
    let comparison = 0;
    comparison = Math.random() - 0.5;
    return comparison;
  }
  addToBasket(id) {
    //use unique ID from productCard map function to filter for element in apiData
    let item = this.state.apiData.filter(
      //variable item to hold the element
      this.getItem(id) //call getItem function to return object
    );
    this.setState({ basket: this.state.basket.concat(item) }); //add item to basket array
    this.setState({ checkoutButton: false });
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
    if (this.state.deliveryDetails === false)
      this.setState({ deliveryDetails: true });
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
  checkoutButton() {
    this.emptyBasket();
  }

  handleCheckboxChange = async (e) => {
    const { value } = e.target;
    // this.setState((prevState) => ({
    //   checkboxes: {
    //     ...prevState.checkboxes,
    //     [value]: !prevState.checkboxes[value],
    //   },
    // }));
    const currentIndex = this.state.checked.indexOf(value);
    const newCheckedArray = [...this.state.checked];

    if (currentIndex === -1) {
      newCheckedArray.push(value);
    } else {
      newCheckedArray.splice(currentIndex, 1);
    }

    await this.setState({ checked: newCheckedArray });
    await this.handleFilter(newCheckedArray);
  };

  async handleFilter(filters, category) {
    const newFilter = { ...this.state.productFilters };
    newFilter[0] = filters;
    this.setState({ productFilters: newFilter });
    const data = this.state.apiData;
    let filteredData = data.filter((p) =>
      this.state.checked.includes(p.tags[2])
    );

    this.setState({ filteredProducts: filteredData });
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
      this.setState({ apiData: jsonResult.products.sort(this.shuffle) });
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

  productFilterFunction(searchTerm) {
    return function (libraryObject) {
      let name = libraryObject.name.toLowerCase();
      let description = libraryObject.description.toLowerCase();

      if (searchTerm.length === 0) {
        return libraryObject;
      }
      return (
        searchTerm !== '' &&
        searchTerm.length >= 3 &&
        (name.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()))
      );
    };
  }

  filteredCategories() {
    this.state.apiData.filter((p) =>
      this.state.categoriesTest.every((c) => p.tags[2].includes(c))
    );
  }

  clearSearchBox(e) {
    e.preventDefault();
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
          <Navbar basket={this.state.basket} />
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
                    handleSearch={this.onSearchFormChange}
                    checkboxChange={this.handleCheckboxChange}
                    filteredProducts={this.state.filteredProducts}
                    checkboxes={this.state.checkboxes}
                    searchTerm={this.state.searchTerm}
                    clearSearch={this.clearSearchBox}
                    productFilter={this.productFilterFunction}
                    handleFilter={(filters) =>
                      this.handleFilter(filters, 'categories')
                    }
                    checked={this.state.checked}
                  />
                )}
              />
              <Route path="/Home" component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Newsletter" component={Newsletter} />
              <Route
                path="/Basket"
                render={() => (
                  <Basket
                    state={this.state}
                    apiData={this.state.apiData}
                    emptyBasket={this.emptyBasket}
                    deliveryDetails={this.deliveryDetails}
                    removeFromBasket={this.removeFromBasket}
                    checkoutButton={this.checkoutButton}
                  />
                )}
              />
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
