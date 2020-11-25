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
            Total: €{this.props.state.basket.reduce(getTotal, 0.00)} <br></br>
            <button onClick = {()=>this.props.emptyBasket()}>Empty Basket</button> &nbsp;
            <button onClick ={()=>this.props.viewBasket()}>View Basket</button>
            {basketBoolean? //ternary operator to diplay basket when view basket pressed, if false display nothing
             <table class = "table" >
             <thead class="thead=dark">
                  <tr>  
                     <th>Item Name</th>
                     <th>Manufacturer</th>
                     <th>Price</th>     
                 </tr> 
             </thead>    
             <tbody>
                 {this.props.state.basket.map((i) =>(
                     <tr key = {i.id}> 
                         <td>{i.name} </td>
                         <td>{i.manufacturer} </td>
                         <td>€{i.price}</td> 
                         <td><button>Remove Item</button></td>
                     </tr>
                 ))} 
             </tbody> 
         </table>
          : ""} 
                 
            </div> 
            
            
        )
    }
}