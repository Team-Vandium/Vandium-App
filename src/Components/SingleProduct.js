import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SingleProduct extends Component {
  render() {
    // helper function to source the image links
    const image = (id) => require(`../Images/${id}.jpg`);
    return (
      <>
        {/* displays the single product information passed from props 
          the filter checks the product id from the router & matches it with the API data
          the map function then displays the product information on the page  
      */}
        {this.props.data
          .filter((p) => p.id.toString() === this.props.match.params.productid)
          .map((p, index) => (
            <div key={index} className="card mb-3 mt-3">
              <div className="row no-gutters">
                <div className="col-sm-4">
                  <img
                    src={image(p.id).default}
                    className="card-img"
                    alt={p.name}
                    style={{ maxWidth: 400 }}
                  />
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
                    <p className="card-title h4 text-left">
                      <strong>{p.name}</strong>
                    </p>
                    <p className="card-text text-left">
                      <strong>€{p.price.toFixed(2)}</strong>
                    </p>
                    <p className="card-text text-left">{p.description}</p>
                    <p className="card-text text-left"></p>
                    <button
                      className="btn btn-success btn-block mb-2"
                      onClick={() => this.props.addToBasket(p.id)}
                    >
                      <i className="fas fa-cart-plus pr-2"></i>
                      Add To Cart
                    </button>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={p.manufacturer_website}
                    >
                      <button
                        className="btn btn-dark btn-block mb-2"
                        onClick={() => this.props.addToBasket(p.id)}
                      >
                        <i className="fas fa-link pr-2"></i>
                        {p.manufacturer}
                      </button>
                    </a>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                      <button className={'btn btn-primary btn-block mb-2'}>
                        <i class="fas fa-chevron-circle-left"></i> Back to Home
                      </button>
                    </Link>{' '}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}
