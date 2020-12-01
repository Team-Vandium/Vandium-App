import React, { Component } from "react";
import { Link } from "react-router-dom";
import vanadium from '../Images/vanadium_atomic.png';

export default class NavBar extends Component {
  render() {
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
        <a className="navbar-brand m-auto text-light font-weight-bold" href="/">
          <GiStarSwirl></GiStarSwirl> Vandium
        </a>
        {/* <button class="btn btn-success ml-auto mr-1">Always Show</button> */}
        <a href="/" class="mr-1 text-light" style={{ fontSize: '1.6rem' }}>
          {/* <GiShoppingCart></GiShoppingCart>{' '}
          {this.props.basket.length > 0 && (
            <span
              style={{ fontSize: '.6rem' }}
              class="badge badge-pill badge-success "
            >
              {this.props.basket.length}
            </span>
          )} */}
        </a>
        <div
          class="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav text-center">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
