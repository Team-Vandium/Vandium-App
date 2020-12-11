import React, { Component } from 'react';
import '../App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './FilterBox.js';
import ProductCard from './ProductCard.js';
import SearchForm from './SearchForm.js';
import CarouselSlider from './CarouselSlider.js';

// update to use API data from props, mounted in App

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      len: 0,
      sortBy: false,
      sortLowest: true,
    };

    // this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.sortButton = this.sortButton.bind(this);
    this.sortHighest = this.sortHighest.bind(this);
    this.sortLow = this.sortLow.bind(this);
    this.sortCost = this.sortCost.bind(this);
  }

  // onSearchFormChange(event) {
  //   this.setState({ searchTerm: event.target.value });
  // }
  sortLow(event) {
    event.preventDefault();
    this.setState({ sortLowest: true });
    this.setState({ sortBy: false });
  }
  sortHighest(event) {
    event.preventDefault();
    this.setState({ sortLowest: false });
    this.setState({ sortBy: false });
  }
  sortButton(event) {
    event.preventDefault();
    if (this.state.sortBy === false) {
      this.setState({ sortBy: true });
    } else this.setState({ sortBy: false });
  }
  sortCost(a, b) {
    let comparison = 0;
    if (this.state.sortLowest === true) {
      if (a.price < b.price) comparison = -1;
      else if (a.price > b.price) comparison = 1;
      else comparison = 0;
    } else {
      if (a.price < b.price) comparison = 1;
      else if (a.price > b.price) comparison = -1;
      else comparison = 0;
    }
    return comparison;
  }
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
        {this.props.errorMsg && (
          <p>
            <strong>
              An error has occured:{this.props.errorMsg.toString()}
            </strong>
          </p>
        )}

        {this.props.apiData.length <= 0 && this.props.errorMsg === null && (
          <p>Please wait.....product data is loading from our database</p>
        )}

        <div className="row">
          <div className="col-12">
            <CarouselSlider data={randomProducts.slice(0, 19)}></CarouselSlider>
          </div>
          <div className="col-12">
            <FilterBox
              checkboxChange={this.props.checkboxChange}
              checkboxes={this.props.checkboxes}
              showAll={this.props.showAll}
              handleFilter={this.props.handleFilter}
              checked={this.props.checked}
              categories={this.props.categories}
              searchTerm={this.props.searchTerm}
              onChange={this.props.handleSearch}
              buttonHandler={this.props.clearSearch}
            ></FilterBox>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-default"
          onClick={this.sortButton}
        >
          Sort by: Price
        </button>
        {
          //buttons for sorting products by price high to low and low to high
          this.state.sortBy ? (
            <div className="menu">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.sortLow}
              >
                Price: Low to High
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.sortHighest}
              >
                Price: High to Low
              </button>
            </div>
          ) : null
        }
        <div className="row">
          {this.props.filteredProducts.length === 0
            ? this.props.apiData
                .sort(this.sortCost)
                .filter(this.props.productFilter(this.props.searchTerm))
                .map((p) => {
                  const ca = this.props.categories.filter(
                    (c) => c.id == p.categoryID
                  );

                  return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mt-2 mb-2">
                      <ProductCard
                        key={p.id}
                        product={p}
                        addToBasket={this.props.addToBasket}
                        categories={this.props.categories}
                        category={ca}
                      ></ProductCard>
                    </div>
                  );
                })
            : this.props.filteredProducts
                .sort(this.sortCost)
                .filter(this.props.productFilter(this.props.searchTerm))
                .map((p) => {
                  const ca = this.props.categories.filter(
                    (c) => c.id == p.categoryID
                  );
                  return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mt-2 mb-2">
                      <ProductCard
                        key={p.id}
                        categories={this.props.categories}
                        product={p}
                        addToBasket={this.props.addToBasket}
                        category={ca}
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
