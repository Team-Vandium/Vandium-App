import React, { Component } from 'react';

import {Link} from 'react-router-dom';
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
        return acc + (obj.price * obj.quantity);
    }
    getDelivery(acc, obj) {
        return acc + (obj.deliveryCost * obj.quantity);
    }
    getTotalItems(acc, obj) {
        return acc + (obj.quantity);
    }
    //fixed case issues we saw from our JSON file
    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    getItems(id) {
        return function (b) {
            return b.id === id;
        }
    }
    render() {//variables specifically for basket component
        const freeDeliveryThreshold = this.props.state.freeDeliveryThreshold;
        const image = (id) => require(`../Images/${id}.jpg`);
        let totalPrice = this.props.state.basket.reduce(this.getTotal, 0.00).toFixed(2);
        let totalDelivery = this.props.state.basket.reduce(this.getDelivery, 0.00).toFixed(2);
        let totalQuantity = this.props.state.basket.reduce(this.getTotalItems, 0);
        let basketSize = this.props.state.basket.length;
        return (

            <div>
                { //displays basic basket details when there is at least one element in the basket array
                    basketSize > 0 &&
                    <div>
                        Items in Basket: {totalQuantity} &nbsp;
                        Total: €{totalPrice} &nbsp;
                        {totalPrice <= freeDeliveryThreshold && <>Delivery charge: {totalDelivery}</>} &nbsp;
                        {totalPrice > freeDeliveryThreshold && <>Delivery charge: FREE</>} &nbsp;
                        <button type="button" className=" btn btn-link"
                            onClick={() => this.props.emptyBasket()}>
                            <GiShoppingCart></GiShoppingCart> Empty Basket
                    </button>
                    </div>
                }
                {//display message when basket is empty
                    basketSize === 0 && this.state.checkout === false &&
                    <p><br></br>
                    <h3>Your basket is empty.</h3><br></br><br></br>
                    <Link to="/"><br></br><GiStarSwirl></GiStarSwirl> Start shopping Irish products now...</Link>
                </p>
                }
                {//display message when checkout is selected and there are no items in the basket
                    basketSize === 0 && this.state.checkout === true &&
                    <p><br></br>
                    <h3>Congratulations!</h3><br></br><br></br>
                    You have successfully completed your purchase of Irish Gifts.
                    <Link to="/"><br></br><GiStarSwirl></GiStarSwirl> Return to shopping...</Link>
                </p>
                }
                {//mapped table of basket items displays when there are elements in basket array
                    basketSize > 0 &&
                    <table class="table" >
                        <thead class="thead=dark">
                            <tr>
                                <th>Item</th>
                                <th></th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Manufacturer</th>
                                <th>Price</th>
                                <th>Delivery</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.state.basket.map((i, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={image(i.id).default} class="img-responsive" alt={i.name} width="100" height="100" /></td>
                                    <td>{this.toTitleCase(i.name)} </td>
                                    <td><button type="button" className="btn btn-group-xs" 
                                    onClick={() => this.props.decrement(i.id)}>-</button>&nbsp;
                                    <b>{i.quantity}</b> &nbsp;
                                    <button type="button" className="btn btn-group-xs" 
                                    onClick={() => this.props.addToBasket(i.id)}>+</button>
                                    </td>
                                    <td>{this.toTitleCase(i.manufacturer)} </td>
                                    <td>€{(i.price * i.quantity).toFixed(2)}</td>
                                    {totalPrice <= freeDeliveryThreshold && <td>{(i.deliveryCost * i.quantity).toFixed(2)}</td>}
                                    {totalPrice > freeDeliveryThreshold && <td>FREE</td>}
                                    <td><button type="button" className=" btn btn-link" 
                                        onClick={() => this.props.removeFromBasket(i.id)}>Remove
                                        </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {//displays checkout features when there is at least one element in basket array
                    basketSize > 0 &&
                    <div>
                        Subtotal({totalQuantity} items):
                        €{totalPrice} &nbsp;
                        <button className="btn btn-success btn-block" 
                            onClick={() => { this.props.checkoutButton(); this.setState({ checkout: true }) }}>
                            <GiShoppingCart></GiShoppingCart>Checkout
                        </button>
                    </div>
                }
            </div>
        )
    }
}
export default Basket;