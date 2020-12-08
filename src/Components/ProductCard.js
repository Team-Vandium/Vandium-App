import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { GrCircleInformation } from 'react-icons/gr';

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
    const { id, name, description, price, tags } = this.props.product;
    const image = require(`../Images/${id}.jpg`);
    const desc = this.toTitleCase(description);
    let category;
    let text = 'white';
    switch (tags[2]) {
      case 'health and beauty':
        category = 'success';
        break;
      case 'jewellery':
        category = 'light';
        text = 'dark';
        break;
      case 'Clothing & Fashion':
        category = 'danger';
        break;
      case 'Sports':
        category = 'primary';
        break;
      case 'Home':
        category = 'secondary';
        text = 'dark';
        break;
      case 'DIY & Garden':
        category = 'warning';
        break;
      case 'Art':
        category = 'info';
        break;
      case 'Food & Drink':
        category = 'dark';
        break;

      default:
        category = 'primary';
        break;
    }

    return (
      <div
        className={` card border-${category} text-${text} bg-light shadow-sm h-100`}
      >
        <LazyLoad height={100} offset={100}>
          <img
            className="card-img-top"
            src={
              image.default ? image.default : 'https://via.placeholder.com/800'
            }
            style={{ maxWidth: 400 }}
            alt={name}
          />
        </LazyLoad>

        <div
          className={`card-body d-flex flex-column align-items-start text-dark bg-light`}
        >
          <strong className={category === 'light' ? `mb-0 text-dark text-left` :`mb-0 text-${category} text-left`}>
            {this.toTitleCase(name)}
          </strong>
          <strong className={category === 'light' ? `mb-0 text-dark` :`mb-0 text-${category}`}>€{price.toFixed(2)}</strong>
          <p class="card-text mb-auto text-left mt-1">
            {this.shortenDescription(desc)}
          </p>
          <div className="row mt-3">
            <div className="col-6 text-center">
              <Link to={`/Products/${id}`}>
                <button
                  className={
                    category === 'light'
                      ? 'btn btn-block btn-sm btn-link mr-3 text-light text-left mb-2'
                      : 'btn btn-block btn-sm btn-link mr-3 text-dark text-left mb-2'
                  }
                >
                  <GrCircleInformation></GrCircleInformation> More Info
                </button>
              </Link>{' '}
            </div>
            <div className="col-6 text-center">
              <button
                className={
                  category === 'light'
                    ? 'btn btn-block btn-sm btn-link text-light text-left'
                    : 'btn btn-block btn-sm btn-link  text-dark text-left'
                }
                onClick={() => this.props.addToBasket(id)}
              >
                <GiShoppingCart></GiShoppingCart> Add To Cart
              </button>
            </div>
          </div>
          {/* {tags.map((t) => {
            return <span className="badge badge-light m-1">{t}</span>;
          })} */}
        </div>
      </div>
    );
  }
}
