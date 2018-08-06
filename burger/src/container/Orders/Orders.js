import React, { Component } from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state={
        orders :[],
        loading : true
    }

    componentDidMount(){
        axios.get('order.json')
        .then(res =>{
            const fetchedOrder =[];

            for(let key in res.data)
            {
                fetchedOrder.push({
                    ...res.data[key],
                    id:key
                });
            }
            this.setState({loading:false,orders:fetchedOrder});
            console.log(this.state.orders);
        })
    }


    render(){
        return(
            <div>
               {this.state.orders.map(order => (
                    <Order 
                    key={order.id} 
                    price={order.price}
                    ingredients={order.ingredients}
                    />    
               ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);