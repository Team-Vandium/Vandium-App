import React, { Component } from 'react';

export default class ProductCard extends Component {
  shortenDescription(desc) {
    if (desc.length > 100) {
      return desc.substring(0, 100) + '...';
    } else return desc;
  }
  render() {
    const { id, name, description, price, tags } = this.props.product;
    const image = require(`../Images/${id}.jpg`);
    console.log(image);
    return (
      <>
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={
              image.default ? image.default : 'https://via.placeholder.com/800'
            }
            alt={name}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h4 className="lead">€{price.toFixed(2)}</h4>
            <p className="card-text">{this.shortenDescription(description)}</p>

            <div className="row">
              <div className="col-6">
                <a href="#" className="btn btn-primary btn-block">
                  More Info
                </a>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-success btn-block"
                  onClick={() => this.props.addToBasket(id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <hr />
            {tags.map((t) => {
              return <span className="badge badge-light m-1">{t}</span>;
            })}
          </div>
        </div>
      </>
    );
  }
}
