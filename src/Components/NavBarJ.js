import React, { Component } from "react";
import { Link } from "react-router-dom";
import vanadium from '../Images/vanadium_atomic.png';

export default class NavBarJ extends Component {
  render() {
    return (
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
              <li className="nav-item">
                <Link className="nav-link" to="/Newsletter">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
