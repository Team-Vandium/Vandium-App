import React, { Component } from 'react';

function getTotal(acc, obj){
    return acc + obj.price;
}

export default class Basket extends Component {
    render() {
    const basketBoolean = this.props.state.viewBasket;   
        return (
            <div>
            Items in Basket: {this.props.state.basket.length} &nbsp;
            Total: €{this.props.state.basket.reduce(getTotal, 0.00).toFixed(2)} <br></br>
            <button onClick = {()=>this.props.emptyBasket()}>Empty Basket</button> &nbsp; 
            <button onClick ={()=>this.props.viewBasket()}>View Basket</button>
            {basketBoolean? //ternary operator to diplay basket when view basket pressed, if false display nothing
             <table class = "table" >
             <thead class="thead=dark">
                  <tr>  
                     <th>Item Number</th>  
                     <th>Item Name</th>
                     <th>Manufacturer</th>
                     <th>Price</th>  
                     <th>Delivery charge</th>
                     <th>Total price</th>
                      
                 </tr> 
             </thead>    
             <tbody>
                 {this.props.state.basket.map((i, index) =>(
                     <tr key = {index}>  
                         <td>{index+1}</td>
                         <td>{i.name} </td>
                         <td>{i.manufacturer} </td>
                         <td>€{i.price}</td> 
                         <td>€Delivery</td>
                         <td>€Total price</td>
                         <td><button onClick = {()=>this.props.removeFromBasket(i.id)}>Remove Item</button></td>
                     </tr>
                 ))} 
             </tbody> 
         </table>
          : ""} 
                 
            </div> 
            
            
        )
    }
}