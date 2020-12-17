import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <h1>Irish Gifts Marketplace</h1>
        <h2>by Team Vandium</h2>
        <p>This is our group project for CS385, an e-commerce app focused on products from Irish retailers.</p>


        <h2>Delivery Charge Policy</h2>
        <p>A delivery is free of charge on orders of over €100.00.</p>
        <p>Otherwise delivery is charged on each item in accordance with the table below.</p>


        <div className = "App">
        <table className = "table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Weight (grams)</th>
                <th>Cost €</th>
              </tr>
            </thead>
            <tbody>
              {this.props.deliveryData.map((a, index) => (
                <tr key={index}>
                  <td>{a.size}</td>
                  <td>{a.weight.toLocaleString()}</td>
                  <td>€{a.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div> 
          </div> 
    );
  }
}
export default About;