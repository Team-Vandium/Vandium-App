import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GiStarSwirl, GiShoppingCart } from 'react-icons/gi';


export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = { 
    };
    this.getTotalItems = this.getTotalItems.bind(this);
    
}
getTotalItems(acc, obj){
  return acc + (obj.quantity);
}

  render() {
    let totalQuantity = this.props.basket.reduce(this.getTotalItems, 0);
    return (
      <nav class="navbar navbar-expand-lg bg-dark navbar-dark justify-content-end">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand m-auto text-light font-weight-bold" to="/">
          <GiStarSwirl></GiStarSwirl> Vandium
        </Link>
        {/* <button class="btn btn-success ml-auto mr-1">Always Show</button> */}
        <Link to="/Basket" class="mr-1 text-light" style={{ fontSize: '1.6rem' }}>
          <GiShoppingCart></GiShoppingCart>{' '}
          {this.props.basket.length > 0 && (
            <span
              style={{ fontSize: '.6rem' }}
              class="badge badge-pill badge-success "
            >
              {totalQuantity}
            </span>
          )}
        </Link>
        <div
          class="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav text-center">
            <li class="nav-item active">
              <Link class="nav-link" to="/About">
                About
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/Newsletter">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
