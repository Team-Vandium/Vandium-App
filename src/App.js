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
import myFirebase from "./Components/myFirebaseConfig.js";
import Firebase from "firebase";

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
    const categoriesTest = ['Home', 'Art'];
    this.state = {
      apiData: [],
      delivery: [],// I think that this variable may be superfluous now (GM)
      isFetched: false,
      errorMsg: null,
      deliveryData: [],
      freeDeliveryThreshold: 0,
      productFilters: { category: [] },
      basket: [],
      filteredProducts: [],
      searchTerm: "",
      deliveryDetails: false,

      checked: [],

      selectedCategory: [],
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
    this.shuffle = this.shuffle.bind(this);
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
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
  checkoutButton(){
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
    let filteredData = data.filter((p) => this.state.checked.includes(p.tags[2]));

    this.setState({ filteredProducts: filteredData });
  }

 componentDidMount() {
    try {
      this.getMessagesFromDatabase(); 
    } catch (error) {
      this.setState({Msgerror: error})
    } // end of try catch
  } // end of componentDidMount()

  getMessagesFromDatabase() {
    let ref1 = Firebase.database().ref("products");

    ref1.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB1 = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        let currObject = {
          description: msgData[m].description,
          id: msgData[m].id,
          image: msgData[m].image,
          manufacturer: msgData[m].manufacturer,
          manufacturer_website: msgData[m].manufacturer_website,
          name: msgData[m].name,
          price: msgData[m].price,
          weight: msgData[m].weight,
          tags: msgData[m].tags
        };
        // add it to our newStateMessages array.
        newMessagesFromDB1.push(currObject);
      } // end for loop
      // set state = don't use concat.
      this.setState({ apiData: newMessagesFromDB1.sort(this.shuffle) });
    });

    let ref2 = Firebase.database().ref("deliveryCost");

    ref2.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB2 = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        let currObject = {
          cost: msgData[m].Cost,
          size: msgData[m].size,
          weight: msgData[m].weight
        };
        // add it to our newStateMessages array.
        newMessagesFromDB2.push(currObject);
      } // end for loop
      // set state = don't use concat.
      this.setState({ deliveryData: newMessagesFromDB2 });
    });

    let ref3 = Firebase.database().ref("freeDeliveryThreshold");
    ref3.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();

      this.setState({ freeDeliveryThreshold: msgData });
    });
  }

  shuffle(productA, productB) {
    let comparison = 0;
    comparison = Math.random() - 0.5;
    return comparison;
  }

  onSearchFormChange(event) {
   
    this.setState({ searchTerm: event.target.value });
  }

  filteredCategories() {
    this.state.apiData.filter((p) =>
      this.state.categoriesTest.every((c) => p.tags[2].includes(c))
    );
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
          <Navbar basket={this.state.basket} />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Products
                    errorMsg = {this.state.errorMsg}
                    apiData={this.state.apiData}
                    addToBasket={this.addToBasket}
                    random={this.state.random}
                    handleSearch={this.onSearchFormChange}
                    checkboxChange={this.handleCheckboxChange}
                    filteredProducts={this.state.filteredProducts}
                    checkboxes={this.state.checkboxes}
                    searchTerm={this.state.searchTerm}
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
              <Route path="/Basket" render={()=><Basket state={this.state} 
              apiData={this.state.apiData}
              emptyBasket={this.emptyBasket}
              deliveryDetails={this.deliveryDetails}
              removeFromBasket={this.removeFromBasket}
              checkoutButton = {this.checkoutButton}
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
