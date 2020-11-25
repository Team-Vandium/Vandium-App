import React, { Component } from 'react';

export default class Basket extends Component {
    
    render() {

        console.log(this.props.state);

        return (
            <ul>
                {this.props.state.basket.map((i) =>(
                    <li key = {i.id}>   
                    {i.name}, {i.manufacturer}, {i.price} 
                    </li>
                ))} 
                
            </ul>
        )
    }
}