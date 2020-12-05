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
        <CarouselSlider data={randomProducts.slice(0, 19)}></CarouselSlider>
        <SearchForm
          searchTerm={this.props.searchTerm}
          onChange={this.props.handleSearch}
          buttonHandler={this.props.clearSearch}
        />
        <FilterBox
          checkboxChange={this.props.checkboxChange}
          checkboxes={this.props.checkboxes}
          handleFilter={this.props.handleFilter}
          checked={this.props.checked}
        ></FilterBox>
        <div className="row">
          {}
          {this.props.filteredProducts.length === 0
            ? this.props.apiData
                .filter(this.props.productFilter(this.props.searchTerm))
                .map((p) => {
                  return (
                    <div className="col-xs-12 col-sm-6 col-lg-4">
                      <ProductCard
                        key={p.id}
                        product={p}
                        addToBasket={this.props.addToBasket}
                      ></ProductCard>
                    </div>
                  );
                })
            : this.props.filteredProducts
                .filter(this.props.productFilter(this.props.searchTerm))
                .map((p) => {
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
