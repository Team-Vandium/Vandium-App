import React, { Component } from 'react';

function getTotal(acc, obj){
    return acc + obj.price;
}


export default class Basket extends Component {
      

    render() {

        //console.log(this.props.state);

        return (
            <div>
            Items in Basket: {this.props.state.basket.length} &nbsp;
            Total: €{this.props.state.basket.reduce(getTotal, 0.00)} &nbsp; 
            <button onClick = {()=>this.props.emptyBasket()}>Empty Basket</button>
            <ul>
                {this.props.state.basket.map((i) =>(
                    <li key = {i.id}>   
                    {i.name}, {i.manufacturer}, {i.price} 
                    </li>
                ))}    
            </ul>
            </div>
        )
    }
}