import React, { Component } from "react";
import { Link } from "react-router-dom";
import vanadium from '../Images/vanadium_atomic.png';

export default class NavBar extends Component {
  render() {
    return (
<<<<<<< HEAD:src/Components/Navbar.js
      <div>
        {/* NavBar format code taken from default Yeti theme in Bootswatch 
            https://bootswatch.com/yeti/                                */}

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/Home">
            <img src={vanadium} width="50" height="50" alt="Vanadium" />
          </Link>

          {/* NOT SURE WHAT THIS BUTTON IS DOING */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Products">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
=======
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
          <GiShoppingCart></GiShoppingCart>{' '}
          {/*this.props.basket.length > 0 && (
            <span
              style={{ fontSize: '.6rem' }}
              class="badge badge-pill badge-success "
            >
              {this.props.basket.length}
            </span>
          )*/}
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
>>>>>>> 70cd1322c03e0cd1d8f137b591e66ef4e37cd76b:src/Components/NavbarC.js
    );
  }
}
