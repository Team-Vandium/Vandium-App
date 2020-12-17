import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import ireland from '../Images/ireland.png'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTotalItems = this.getTotalItems.bind(this);
  }
  getTotalItems(acc, obj) {
    return acc + obj.quantity;
  }

  render() {
    let totalQuantity = this.props.basket.reduce(this.getTotalItems, 0);
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark justify-content-end">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link
          className="navbar-brand m-auto text-light font-weight-bold"
          to="/"
        >
         <img src={ireland} alt='ireland flag' className='img-responsive'></img> Irish Gifts Marketplace
        </Link>
        <Link
          to="/Basket"
          className="mr-1 text-light"
          style={{ fontSize: '1.6rem' }}
        >
          <GiShoppingCart></GiShoppingCart>{' '}
          {this.props.basket.length > 0 && (
            <span
              style={{ fontSize: '.6rem' }}
              className="badge badge-pill badge-success "
            >
              {totalQuantity}
            </span>
          )}
        </Link>
        <div
          className="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item active">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Newsletter">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
