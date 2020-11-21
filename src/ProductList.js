import React, { Component } from "react";

// this is the component for getting the products and displaying them

class ProductList extends Component {
  constructor(props) {
    super(props);
    // get product data from api and store in state
    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null
    };
  }

  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/Team-Vandium/data/main/products-jaymie.json";
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
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>An error has occured in the API call</h1>
          <p>The error message is: {this.state.errorMsg.toString()}</p>
        </div>
      );
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>API request loading</h1>
          <p>Your data will be ready soon</p>
        </div>
      );
    } else {
      // no errors
      return (
        <div className="Container">
          <div className="Table">
            <h1>List of Products</h1>
            <table border="1">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                {this.state.apiData.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt="TEST" />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>€{p.price}</td>
                    <td>{p.tags[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ); // end of return
    } // end of else
  } // end of render
} // end of ProductList class

export default ProductList;
