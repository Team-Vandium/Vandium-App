import React, { Component } from 'react';
import '../App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './FilterBox.js';
import ProductCard from './ProductCard.js';
import Basket from './Basket.js';
import SearchForm from './SearchForm.js';
import CarouselSlider from './CarouselSlider.js';
import SearchResults from './SearchResults.js';

// update to use API data from props, mounted in App

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      len: 0,
    };
    
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    
  }

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  clearSearchBox() {
    this.setState({ searchTerm: '' });
  }

  

  render() {
    const randomProducts = this.props.apiData.map(p => p)
    randomProducts.sort((a, b) => {
      let comparison = 0;
      comparison = Math.random() - 0.5;
      return comparison;
    }).slice(0, 19)
    return (
      <div className="App">

        <CarouselSlider data={randomProducts.slice(0, 19)}></CarouselSlider>

        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
          buttonHandler={this.clearSearchBox}
        />

        {/* <SearchResults
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
                    addToBasket={this.props.addToBasket}
                  ></ProductCard>
                </div>
              );
            })}
          </div>
        </div>
      
    );
  }
}

export default Products;
