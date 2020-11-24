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
    };
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
