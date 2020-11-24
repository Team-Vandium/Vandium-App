import React, { Component } from 'react';

export default class Basket extends Component {
    addToBasket(id){ //use unique ID from map function to filter for element in apiData
        let item = this.state.apiData.filter( //variable item to hold the element
            this.getItem(id) //call getItem function to return object
        );
        this.setState({basket: this.state.basket.concat(item)}); //add item to basket array
    }

    getItem(a){
        return function(obj){
            return obj.products.id === a;
        }
    }

    render() {
        return (
            <ul>
                {this.state.apiData.map((i) =>(
                    <li key = {i.products.id}>   
                    {i.products.name}, {i.products.manufacturer}, {i.products.price} 
                    <button onClick = {()=>this.addToBasket(i.id)}>Add To Basket</button>
                    </li>
                ))}
                
            </ul>
        )
    }
}