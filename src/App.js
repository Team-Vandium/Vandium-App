import React, { Component } from 'react';
import ProductList from './ProductList.js';
import './App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './Components/FilterBox.js';
import ProductCard from './Components/ProductCard.js';
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
      viewBasket: false,
    };
    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.viewBasket = this.viewBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
  }
  addToBasket(id){ //use unique ID from productCard map function to filter for element in apiData
     let item = this.state.apiData.filter( //variable item to hold the element
         this.getItem(id) //call getItem function to return object
    );
     this.setState({basket: this.state.basket.concat(item)}); //add item to basket array
  }
  getItem(a){ //returns correct object from array when passed an element
      return function(obj){
          return obj.id === a;
      }
  }
  emptyBasket(){ //remove all items from basket array
    this.setState({basket: []});
  }
  viewBasket(){ //boolean change to display basket or not
    if (this.state.viewBasket === false)
    this.setState({viewBasket: true})
    else{
      this.setState({viewBasket: false})
    }
  }
  removeFromBasket(i){ //get index and splice function to remove item from basket array
    let bArray = this.state.basket;
    let itemIndex = bArray.findIndex(this.getItem(i));
    bArray.splice(itemIndex, 1);
    this.setState({basket: bArray});
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
      <div className="App"> 
        <Basket state ={this.state} emptyBasket={this.emptyBasket} viewBasket = {this.viewBasket} 
        removeFromBasket = {this.removeFromBasket}></Basket>
        {/* <ProductList /> */}
        <div className="container-md">
          {/* Started on Filter box with checkboxs, can be integrated with search */}
          <FilterBox></FilterBox>
          <div className="row">
            {/* Sample Product Card - to be added to */}
            {this.state.apiData.map((p) => {
              return (
                <div className="col-xs-12 col-sm-6 col-lg-4">
                  <ProductCard key={p.id} product={p} addToBasket={this.addToBasket}></ProductCard> 
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
