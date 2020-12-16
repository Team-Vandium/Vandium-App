import React, { Component } from 'react';
import './App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import Navbar from './Components/NavbarC.js';
import Newsletter from './Components/Newsletter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './Components/About.js';
import NoMatch from './Components/NoMatch.js';
import Products from './Components/Products.js';
import Basket from './Components/Basket.js';
import SingleProduct from './Components/SingleProduct';
import myFirebase from './Components/myFirebaseConfig.js';
import Firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null,
      deliveryData: [],
      freeDeliveryThreshold: null,
      basket: [],
      filteredProducts: [],
      searchTerm: '',
      deliveryDetails: false,
      emailData: [],
      checked: null,
      categories: [],
    };

    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
    this.addItemToEmails = this.addItemToEmails.bind(this);
    this.decrement = this.decrement.bind(this);
    this.showAll = this.showAll.bind(this);
    this.checkoutButton = this.checkoutButton.bind(this);
  }

  addToBasket(id) {
    //use unique ID from any map function to filter for element in apiData
    let item = this.state.apiData.filter(
      //variable item to hold the element
      this.getItem(id) //call getItem function to return object
    );

    const checkIfProductInBasket = this.state.basket.filter((p) => p.id === id); //store filtered array in variable
    if (checkIfProductInBasket.length > 0) {
      //if item in basket already
      this.setState((prevState) => ({
        //update basket state
        basket: prevState.basket.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 } //increase quantity of quantity by 1 usig spread operator
            : product
        ),
      }));
      this.setState({ checkoutButton: false });
    } else {
      item[0].quantity = 1; //create quantity attribute if item not in basket
      this.setState({ basket: this.state.basket.concat(item) }); //add item to basket array
    }
  }
  decrement(id) {
    let i = this.state.basket.filter(this.getItem(id));
    //console.log(i);
    if (i[0].quantity === 1) {
      this.removeFromBasket(i);
      console.log(i);
    } else {
      this.setState((prevState) => ({
        basket: prevState.basket.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      }));
    }
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
  showAll(e) {
    e.preventDefault();
    this.setState({ checked: null });
    this.setState({ filteredProducts: '' });
  }

  removeFromBasket(i) {
    let bArray = this.state.basket;
    const index = bArray.findIndex((item) => item.id === i[0].id);
    bArray.splice(index, 1);
    this.setState({ basket: bArray });
  }
  checkoutButton() {
    this.emptyBasket();
  }
  // function to add the selected product category to state
  handleCheckboxChange = async (e) => {
    const { value } = e.currentTarget;

    const number = parseInt(value);
    await this.setState({ checked: number });
    await this.handleFilter();
  };
  // function that populates the filtered products array in state based on the selected category
  async handleFilter() {
    const data = this.state.apiData;
    let filteredData = data.filter((p) => this.state.checked === p.categoryID);
    this.setState({ filteredProducts: filteredData });
  }

  async componentDidMount() {
    try {
      this.getMessagesFromDatabase();
    } catch (error) {
      console.log(error);
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  getMessagesFromDatabase() {
    //download and create json array of product data
    let ref1 = Firebase.database().ref('products');

    ref1.on('value', (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB1 = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        let currObject = {
          categoryID: msgData[m].categoryID,
          description: msgData[m].description,
          id: msgData[m].id,
          image: msgData[m].image,
          manufacturer: msgData[m].manufacturer,
          manufacturer_website: msgData[m].manufacturer_website,
          name: msgData[m].name,
          price: msgData[m].price,
          deliveryCost: msgData[m].deliveryCost,
          weight: msgData[m].weight,
          tags: msgData[m].tags,
        };
        // add it to our newStateMessages array.
        newMessagesFromDB1.push(currObject);
      } // end for loop
      // set state
      this.setState({ apiData: newMessagesFromDB1.sort(this.shuffle) });
    });

    //download and create a json array of delivery cost data
    let ref2 = Firebase.database().ref('deliveryCost');
    ref2.on('value', (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB2 = [];
      for (let m in msgData) {
        // create a JSON object version of our object.
        let currObject = {
          cost: msgData[m].Cost,
          size: msgData[m].size,
          weight: msgData[m].weight,
        };
        // add it to our newStateMessages array.
        newMessagesFromDB2.push(currObject);
      } // end for loop
      // set state = don't use concat.
      this.setState({ deliveryData: newMessagesFromDB2 });
    });

    //download and set state for free delivery threshold
    let ref3 = Firebase.database().ref('freeDeliveryThreshold');
    ref3.on('value', (snapshot) => {
      let msgData = snapshot.val();
      //set state
      this.setState({ freeDeliveryThreshold: msgData });
    });

    //download and create json array of email addresses
    let ref4 = Firebase.database().ref('emails');
    ref4.on('value', (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB3 = [];
      for (let m in msgData) {
        // create a JSON object version of our object
        let currObject = {
          id: msgData[m].id,
          address: msgData[m].address,
        };
        // add to the local array
        newMessagesFromDB3.push(currObject);
      } // end of for loop
      this.setState({ emailData: newMessagesFromDB3 });
    });

    //download and create array of categories
    let ref5 = Firebase.database().ref('categories');
    ref5.on('value', (snapshot) => {
      // json array
      let msgData = snapshot.val();

      this.setState({ categories: msgData });
    });
  }

  //method used to shuffle the array of products into random order
  shuffle(productA, productB) {
    let comparison = 0;
    comparison = Math.random() - 0.5;
    return comparison;
  }
  // function that sets the entered search term in state
  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  // function to handle the filtered of the products based on the search term
  productFilterFunction(searchTerm) {
    return function (libraryObject) {
      let name = libraryObject.name.toLowerCase();
      let description = libraryObject.description.toLowerCase();

      if (searchTerm.length === 0) {
        return libraryObject;
      }
      return (
        searchTerm !== '' &&
        (name.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()))
      );
    };
  }

  // function to handle the clear seacrh button
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

  /* append a new email address to the JSON array in firebase */
  addItemToEmails(address) {
    // get the current state array for emails
    let localEmails = this.state.emailData;

    // generate a new ID (no validation on this.)
    let addressId = String(this.state.emailData.length + 1);

    // combine id and address for new object to be added
    let newAddressObj = {
      id: addressId,
      address: address,
    };

    // append the new object to the local array
    localEmails.push(newAddressObj);

    // overwrite the emails array in firebase
    Firebase.database().ref('emails').set(localEmails);

    // update state with the list
    this.setState({ emailData: localEmails });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar basket={this.state.basket} />
          <div className="container-lg">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Products
                    showAll={this.showAll}
                    categories={this.state.categories}
                    errorMsg={this.state.errorMsg}
                    apiData={this.state.apiData}
                    addToBasket={this.addToBasket}
                    handleSearch={this.onSearchFormChange}
                    checkboxChange={this.handleCheckboxChange}
                    filteredProducts={this.state.filteredProducts}
                    checkboxes={this.state.checkboxes}
                    searchTerm={this.state.searchTerm}
                    clearSearch={this.clearSearchBox}
                    productFilter={this.productFilterFunction}
                    checked={this.state.checked}
                  />
                )}
              />
              {/*<Route path="/Home" component={Home} />*/}
              <Route
                path="/About"
                render={(props) => (
                  <About deliveryData={this.state.deliveryData} />
                )}
              />

              <Route
                path="/Newsletter"
                render={(props) => (
                  <Newsletter
                    emails={this.state.emailData}
                    addItemToEmails={this.addItemToEmails}
                  />
                )}
              />
              <Route
                path="/Products/:productid"
                render={(props) => (
                  <SingleProduct
                    data={this.state.apiData}
                    addToBasket={this.addToBasket}
                    {...props}
                  ></SingleProduct>
                )}
              />
              <Route
                path="/Basket"
                render={() => (
                  <Basket
                    state={this.state}
                    apiData={this.state.apiData}
                    emptyBasket={this.emptyBasket}
                    removeFromBasket={this.removeFromBasket}
                    checkoutButton={this.checkoutButton}
                    addToBasket={this.addToBasket}
                    freeDeliveryThreshold={this.state.freeDeliveryThreshold}
                    deliveryData={this.state.deliveryData}
                    decrement={this.decrement}
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
