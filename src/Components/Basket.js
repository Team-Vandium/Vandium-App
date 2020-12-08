import React, { Component } from 'react';
import { GiShoppingCart } from 'react-icons/gi';

  
    class Basket extends Component {
        constructor(props) {
            super(props);
            this.state = {
              freeDelivery: false,
              deliveryCharge: 0,
            };

            
            this.toTitleCase = this.toTitleCase.bind(this);
            this.getTotal = this.getTotal.bind(this);
        }
    deliveryCost(){
        if (this.props.state.basket.reduce(this.getTotal, 0.00).toFixed(2) >= this.props.freeDeliveryThreshold){
            return "FREE";
        
        }
    }

    getTotal(acc, obj){
        return acc + obj.price;
    }
    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
    );}
    

    render() {
    const freeDelivery = this.state.freeDelivery;
    const freeDeliveryThreshold = this.props.state.freeDeliveryThreshold;
    const id = this.props.state.product;
    const image =(id) => require(`../Images/${id}.jpg`);  
    let total = this.props.state.basket.reduce(this.getTotal, 0.00).toFixed(2);
    let basketSize = this.props.state.basket.length;
        return (
            
            <div>
              { //displays basic basket details when there is at least one element in the basket array
              basketSize > 0 &&  
                <div>
                    Items in Basket: {this.props.state.basket.length} &nbsp;
                    Total: €{total} &nbsp;
                    Delivery charge: {this.deliveryCost()}  &nbsp;
                    <button type="button" className=" btn btn-link"
                    onClick = {()=>this.props.emptyBasket()}>
                    <GiShoppingCart></GiShoppingCart> Empty Basket 
                    </button> 
                    
                </div>
                }
                {//display message when basket is empty
                basketSize === 0 &&
                <p><br></br>
                <h3>Your basket is empty.</h3><br></br><br></br>
                Start shopping Irish products now.
                </p>}
            {//mapped table of basket items displays when there are elements in basket array
            basketSize > 0 &&            
             <table class = "table" >
             <thead class="thead=dark">
                  <tr>  
                     <th>Item</th> 
                     <th></th> 
                     <th>Item Name</th>
                     <th>Quantity</th>
                     <th>Manufacturer</th>
                     <th>Price</th>   
                 </tr> 
             </thead>    
             <tbody>
                 {this.props.state.basket.map((i, index) =>(
                     <tr key = {index}>  
                         <td>{index+1}</td>
                         <td><img src= {image(i.id).default} class="img-responsive" alt={i.name} width="100" height="100"/></td>
                         <td>{this.toTitleCase(i.name)} </td>
                         
                         <td><button type="button" className="btn btn-group-xs">-</button>&nbsp;
                         <b>1</b> &nbsp;
                         <button type="button" className="btn btn-group-xs">+</button>
                         </td>
                         
                         <td>{this.toTitleCase(i.manufacturer)} </td>
                         <td>€{i.price}</td> 
                         
                         <td><button type="button" className=" btn btn-link" onClick = {()=>this.props.removeFromBasket(i.id)}>Remove Item</button></td>
                     </tr>
                 ))} 
             </tbody> 
             </table>
            }
            {//displays checkout features when there is at least one element in basket array
            basketSize > 0 &&  
                <div>
                    Subtotal({this.props.state.basket.length} items): 
                    €{total} &nbsp;                        
                    <button className="btn btn-success btn-block" onClick={()=> this.props.checkoutButton()}>
                    <GiShoppingCart></GiShoppingCart>Checkout</button>
                </div>
            }         
            </div> 
        )
    }
}
export default Basket;