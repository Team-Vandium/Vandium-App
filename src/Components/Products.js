import React, { Component } from "react";
import "../App.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import FilterBox from "./FilterBox.js";
import ProductCard from "./ProductCard.js";
import Basket from "./Basket.js";
import SearchForm from "./SearchForm.js";
import SearchResults from "./SearchResults.js";

// update to use API data from props, mounted in App

class Products extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      
      basket: [],
      viewBasket: false,
      searchTerm: "",
      len: 0,
    };
    this.addToBasket = this.addToBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.viewBasket = this.viewBasket.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
  }

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  clearSearchBox() {
    this.setState({ searchTerm: "" });
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
      <div className="App">
        {this.props.apiData.length > 0 && (
          <Basket
            state={this.state}
            emptyBasket={this.emptyBasket}
            viewBasket={this.viewBasket}
          ></Basket>
        )}

        {/* <ProductList /> */}

        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
          buttonHandler={this.clearSearchBox}
        />

        <SearchResults
          searchTerm={this.state.searchTerm}
          productArray={this.props.apiData}
        />

        <div className="container-md">
          {/* Started on Filter box with checkboxs, can be integrated with search */}
          <FilterBox></FilterBox>
          <div className="row">
            {/* Sample Product Card - to be added to */}
            {this.props.apiData.map((p) => {
              return (
                <div className="col-xs-12 col-sm-6 col-lg-4">
                  <ProductCard
                    key={p.id}
                    product={p}
                    addToBasket={this.addToBasket}
                  ></ProductCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
