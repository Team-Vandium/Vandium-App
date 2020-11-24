import React, { Component } from 'react';

export default class ProductCard extends Component {
  shortenDescription(desc) {
    if (desc.length > 100) {
      return desc.substring(0, 100) + '...';
    } else return desc;
  }
  render() {
    const { name, description, price, tags } = this.props.product;
    return (
      <>
        <div className="card mb-3">
          <img
            className="card-img-top"
            src="https://via.placeholder.com/800"
            alt={name}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h4 className="lead">€{price.toFixed(2)}</h4>
            <p className="card-text">{this.shortenDescription(description)}</p>
            <a href="#" className="btn btn-primary">
              More Information
            </a>
            <hr />
            {tags.map((t) => {
              return <span className="badge badge-success m-1">{t}</span>;
            })}
          </div>
        </div>
      </>
    );
  }
}
