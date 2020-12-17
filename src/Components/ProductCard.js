import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  shortenDescription(desc) {
    if (desc.length > 100) {
      return desc.substring(0, 100) + '...';
    } else return desc;
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  render() {
    // extract variables from product props
    const { id, name, description, price } = this.props.product;

    // arrow function to dynamically reference product images
    const image = require(`../Images/${id}.jpg`);

    //
    const desc = this.toTitleCase(description);

    return (
      this.props.category.length > 0 && (
        <div
          className={` card border-${this.props.category[0].colour} text-${this.props.category[0].text} bg-light shadow-sm h-100`}
        >
          <LazyLoad height={100} offset={100}>
            <Link to={`/Products/${id}`}>
              <img
                className="card-img-top"
                src={
                  image.default
                    ? image.default
                    : 'https://via.placeholder.com/800'
                }
                style={{ maxWidth: 400 }}
                alt={name}
              />
            </Link>
          </LazyLoad>

          <div
            className={`card-body d-flex flex-column align-items-start text-dark bg-light`}
          >
            <Link to={`/Products/${id}`} style={{ textDecoration: 'none' }} className='text-left'>
              <strong
                className={
                  this.props.category[0].colour === 'light'
                    ? `mb-0 text-dark text-left`
                    : `mb-0 text-${this.props.category[0].colour} text-left`
                }
              >
                {this.toTitleCase(name)}
              </strong>
            </Link>
            <strong
              className={
                this.props.category[0].colour === 'light'
                  ? `mb-0 text-dark`
                  : `mb-0 text-${this.props.category[0].colour}`
              }
            >
              €{price.toFixed(2)}
            </strong>
            <p className="card-text mb-auto text-left mt-1">
              {this.shortenDescription(desc)}
            </p>
            <div className="row mt-3">
              <div className="col-6 text-center">
                <Link to={`/Products/${id}`} style={{ textDecoration: 'none' }}>
                  <button
                    className={'btn btn-block btn-dark mr-3 text-left mb-2'}
                  >
                    <i className="fas fa-info pr-1"></i> More Info
                  </button>
                </Link>{' '}
              </div>
              <div className="col-6 text-center">
                <button
                  className={'btn btn-block btn-primary mr-3 text-left mb-2'}
                  onClick={() => this.props.addToBasket(id)}
                >
                  <i className="fas fa-cart-plus pr-1"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
