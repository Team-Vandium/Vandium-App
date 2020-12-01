import React, { Component } from 'react';

function getTotal(acc, obj){
    return acc + obj.price;
}
//function calculateDelivery(){
 //   {this.props.state.basket.map((d, index)=>(
 //       <div key = index> </div>
 //   ))}
//}
export default class Basket extends Component {
    render() {
    const deliveryDetails = this.props.state.deliveryDetails; 
    const id = this.props.state.product;
    const image =(id) => require(`../Images/${id}.jpg`);  
        return (
            <div>
            Items in Basket: {this.props.state.basket.length} &nbsp;
            Total: €{this.props.state.basket.reduce(getTotal, 0.00).toFixed(2)} <br></br>
            <button onClick = {()=>this.props.emptyBasket()}>Empty Basket</button> &nbsp; 
            <button onClick ={()=>this.props.deliveryDetails()}>Delivery charge breakdown</button>
            {deliveryDetails? "Delivery": ""} 
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
                         <td>{i.name.toUpperCase()} </td>
                         <td><button>-</button>&nbsp;
                         <b>1</b> &nbsp;
                         <button>+</button>
                         </td>
                         <td>{i.manufacturer.toUpperCase()} </td>
                         <td>€{i.price}</td> 
                         <td><button onClick = {()=>this.props.removeFromBasket(i.id)}>Remove Item</button></td>
                     </tr>
                 ))} 
             </tbody> 
         </table>
          
                 
            </div> 
            
            
        )
    }
}