import React, { Component } from 'react';
import '../App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './FilterBox.js';
import ProductCard from './ProductCard.js';
import SearchForm from './SearchForm.js';
import CarouselSlider from './CarouselSlider.js';
import SearchResults from './SearchResults';

// update to use API data from props, mounted in App

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      len: 0,
    };

   // this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  // onSearchFormChange(event) {
  //   this.setState({ searchTerm: event.target.value });
  // }

  clearSearchBox() {
    this.setState({ searchTerm: '' });
  }
  

  render() {
    const randomProducts = this.props.apiData.map((p) => p);
    randomProducts
      .sort((a, b) => {
        let comparison = 0;
        comparison = Math.random() - 0.5;
        return comparison;
      })
      .slice(0, 19);
    return (
      <div className="App">
        {/*Not sure this is the appropriate place for this code however I have put it here so we don't forget to include
        it or something similar. Loading message is testing ok. Will need to test errorMsg (GM)*/}
        {this.props.errorMsg && (<p><strong>An error has occured:{this.props.errorMsg.message}</strong></p> )}  
        {this.props.apiData.length <= 0 && (<p>Please wait.....product data is loading from our database</p>)}

        <CarouselSlider data={randomProducts.slice(0, 19)}></CarouselSlider>
        <SearchForm
          searchTerm={this.props.searchTerm}
          onChange={this.props.handleSearch}
          buttonHandler={this.clearSearchBox}
        />
        <FilterBox
          checkboxChange={this.props.checkboxChange}
          checkboxes={this.props.checkboxes}
          handleFilter = {this.props.handleFilter}
          checked ={this.props.checked}
        ></FilterBox>
        <SearchResults searchTerm = {this.props.searchTerm} productArray = {this.props.apiData}></SearchResults>
        <div className="row">
          {this.props.filteredProducts.map((p) => {
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
          {this.props.filteredProducts.length === 0 && this.props.apiData.map((p) => {
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
