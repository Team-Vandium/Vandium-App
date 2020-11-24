import React, { Component } from 'react';
import ProductList from './ProductList.js';
import './App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './Components/FilterBox.js';
import ProductCard from './Components/ProductCard.js';

class App extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null,
      basket: [],
    };
    this.addToBasket = this.addToBasket.bind(this);
  }
  addToBasket(id){ //use unique ID from map function to filter for element in apiData
    let item = this.state.apiData.filter( //variable item to hold the element
        this.getItem(id) //call getItem function to return object
    );
    this.setState({basket: this.state.basket.concat(item)}); //add item to basket array
  }

  getItem(a){
    return function(obj){
        return obj.id === a;
    }
  }

  async componentDidMount() {
    try {
      const API_URL =
        'https://raw.githubusercontent.com/Team-Vandium/data/main/products-jaymie.json';
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
      <div className="App">
        Items in Basket: {this.state.basket.length}
        <ProductList />
        <div className="container-md">
          {/* Started on Filter box with checkboxs, can be integrated with search */}
          <FilterBox></FilterBox>
          <div className="row">
            {/* Sample Product Card - to be added to */}
            {this.state.apiData.map((p) => {
              return (
                <div className="col-xs-12 col-sm-6 col-lg-4">
                  <ProductCard key={p.id} product={p}></ProductCard>
                  <button onClick = {()=>this.addToBasket(p.id)}>Add To Basket</button>
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