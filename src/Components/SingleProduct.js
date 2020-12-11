import React, { Component } from 'react';

export default class SingleProduct extends Component {
  render() {
    const image = (id) => require(`../Images/${id}.jpg`);
    return (
      <>
        {this.props.data
          .filter((p) => p.id == this.props.match.params.productid)
          .map((p, index) => (
            <div key={index} class="card mb-3 mt-3">
              <div class="row no-gutters">
                <div class="col-sm-4">
                  <img
                    src={image(p.id).default}
                    class="card-img"
                    alt={p.name}
                    style={{ maxWidth: 400 }}
                  />
                </div>
                <div class="col-sm-8">
                  <div class="card-body">
                    <p class="card-title h4 text-left">
                      <strong>{p.name}</strong>
                    </p>
                    <p class="card-text text-left">
                      <strong>€{p.price.toFixed(2)}</strong>
                    </p>
                    <p class="card-text text-left">{p.description}</p>
                    <p class="card-text text-left"></p>

                    <button
                      className="btn btn-success btn-block mb-2"
                      onClick={() => this.props.addToBasket(p.id)}
                    >
                      <i class="fas fa-cart-plus pr-2"></i>
                      Add To Cart
                    </button>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={p.manufacturer_website}
                    >
                      <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.addToBasket(p.id)}
                      >
                        <i class="fas fa-link pr-2"></i>
                        {p.manufacturer}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}
