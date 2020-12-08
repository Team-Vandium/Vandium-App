import React, { Component } from 'react';
import { RiExternalLinkFill } from 'react-icons/ri';

export default class SingleProduct extends Component {
  render() {
    const test = this.props.data.filter(
      (p) => p.id == this.props.match.params.productid
    );

    const image = (id) => require(`../Images/${id}.jpg`);
    return (
      <>
        {this.props.data
          .filter((p) => p.id == this.props.match.params.productid)
          .map((p) => (
            <div class="card mb-3 mt-3">
              <div class="row no-gutters">
                <div class="col-sm-4">
                  <img
                    src={image(p.id).default}
                    class="card-img"
                    alt={p.name}
                    style={{maxWidth: 400 }}
                  />
                </div>
                <div class="col-sm-8">
                  <div class="card-body">
                    <h5 class="card-title text-bold">{p.name}</h5>
                    <p class="card-text text-bold">€{p.price.toFixed(2)}</p>
                    <p class="card-text">{p.description}</p>
                    <p class="card-text">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={p.manufacturer_website}
                      >
                        <RiExternalLinkFill></RiExternalLinkFill>
                      </a>{' '}
                      Manufacturer: {p.manufacturer}
                    </p>
                    <button
                      className="btn btn-success btn-block"
                      onClick={() => this.props.addToBasket(p.id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}
