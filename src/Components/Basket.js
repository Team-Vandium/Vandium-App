import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { GiStarSwirl, GiShoppingCart } from 'react-icons/gi';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    };
    this.toTitleCase = this.toTitleCase.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getDelivery = this.getDelivery.bind(this);
    this.getTotalItems = this.getTotalItems.bind(this);
  }
  //reduce functionalities used for totaling Price/Quantity/Delivery charge of basket state
  getTotal(acc, obj) {
    return acc + obj.price * obj.quantity;
  }
  getDelivery(acc, obj) {
    return acc + obj.deliveryCost * obj.quantity;
  }
  getTotalItems(acc, obj) {
    return acc + obj.quantity;
  }
  //fixed case issues we saw from our JSON file
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  getItems(id) {
    return function (b) {
      return b.id === id;
    };
  }
  render() {
    //variables specifically for basket component
    const freeDeliveryThreshold = this.props.state.freeDeliveryThreshold;


    const image = (id) => require(`../Images/${id}.jpg`);

    
    let totalPrice = this.props.state.basket
      .reduce(this.getTotal, 0.0)
      .toFixed(2);
    let totalDelivery = this.props.state.basket
      .reduce(this.getDelivery, 0.0)
      .toFixed(2);
    let basketSize = this.props.state.basket.length;
    return (
      <div>
        {
          //display message when basket is empty
          basketSize === 0 && this.state.checkout === false && (
            <p>
              <br></br>
              <h3>Your basket is empty.</h3>
              <br></br>
              <br></br>
              <Link to="/">
                <br></br>
                <GiStarSwirl></GiStarSwirl> Start shopping Irish products now...
              </Link>
            </p>
          )
        }
        {
          //display message when checkout is selected and there are no items in the basket
          basketSize === 0 && this.state.checkout === true && (
            <p>
              <br></br>
              <h3>Congratulations!</h3>
              <br></br>
              <br></br>
              You have successfully completed your purchase of Irish Gifts.
              <Link to="/">
                <br></br>
                <GiStarSwirl></GiStarSwirl> Return to shopping...
              </Link>
            </p>
          )
        }
        {
          //mapped table of basket items displays when there are elements in basket array
          basketSize > 0 && (
            <>
              <h1 className="text-left mt-2"><GiShoppingCart></GiShoppingCart> Your Basket</h1>
              <table class="table table-striped table-sm mt-4">
                <thead>
                  <tr className="table-primary text-left">
                    <th colSpan="2"></th>
                    <th>Name</th>
                    <th colspan="3">Quantity</th>
                    <th className="d-none d-sm-table-cell">Manufacturer</th>
                    <th>Delivery</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.state.basket.map((i, index) => (
                    <tr key={index} className="text-left">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={image(i.id).default}
                          class="img-responsive"
                          alt={i.name}
                          width="40"
                          height="40"
                        />
                      </td>
                      <td className="text-left ">
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          to={`/Products/${i.id}`}
                        >
                          {this.toTitleCase(i.name)}
                        </Link>{' '}
                      </td>
                      <td>
                        <i
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.props.decrement(i.id)}
                          class="fas fa-minus"
                        ></i>
                      </td>
                      <td>
                        <b>{i.quantity}</b> &nbsp;
                      </td>
                      <td>
                        <i
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.props.addToBasket(i.id)}
                          class="fas fa-plus"
                        ></i>
                      </td>
                      <td className="d-none d-sm-table-cell">
                        {this.toTitleCase(i.manufacturer)}{' '}
                      </td>
                      {totalPrice <= freeDeliveryThreshold && (
                        <td>€{(i.deliveryCost * i.quantity).toFixed(2)}</td>
                      )}
                      {totalPrice > freeDeliveryThreshold && <td>FREE</td>}
                      <td>€{(i.price * i.quantity).toFixed(2)}</td>
                      <td>
                        <i
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.props.removeFromBasket(i.id)}
                          class="fas fa-trash-alt"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr class="table-secondary">
                  <td colspan="6"></td>
                  <td className="d-none d-sm-table-cell"></td>
                  <td>
                    <strong>Subtotal </strong>
                  </td>
                  <td>
                    <strong>€{totalPrice}</strong>
                  </td>
                  <td></td>
                </tr>
                <tr class="table-secondary">
                  <td colspan="6"></td>
                  <td className="d-none d-sm-table-cell"></td>
                  <td>
                    <strong>Delivery </strong>
                  </td>
                  <td>
                    <strong>
                      {totalPrice > freeDeliveryThreshold
                        ? 'FREE'
                        : `€${totalDelivery}`}
                    </strong>
                  </td>
                  <td></td>
                </tr>
                <tr class="table-secondary">
                  <td colspan="6"></td>
                  <td className="d-none d-sm-table-cell"></td>
                  <td>
                    <strong>Total </strong>
                  </td>
                  <td>
                    <strong>€{totalPrice}</strong>
                  </td>
                  <td></td>
                </tr>
              </table>
            </>
          )
        }
        {
          //displays checkout features when there is at least one element in basket array
          basketSize > 0 && (
            <>
              <button
                className="btn btn-success btn-block"
                onClick={() => {this.props.checkoutButton(); this.setState({checkout:true})}}
                >
                <GiShoppingCart></GiShoppingCart>Checkout
              </button>
              <button
                type="button"
                className=" btn btn-danger btn-block"
                onClick={() => this.props.emptyBasket()}
              >
                <GiShoppingCart></GiShoppingCart> Empty Basket
              </button>
            </>
          )
        }
      </div>
    );
  }
}
export default Basket;
