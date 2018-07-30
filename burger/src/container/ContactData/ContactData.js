import React, { Component } from 'react';
import classes from './ContactData';
import Button from '../../component/UI/Button/Button';
import axios from '../../axios-orders';

class ContactData extends Component {
    state={
        name: "",
        email: '',
        address:{
            street:'',
            postal:'',
        },
        loading:false
    }

    orderburger = (event)=>{
       
        console.log(this.props.ingredients);
       event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            customer : {
                name: "Shantanu Gade",
                address : {
                   street: "teststreet",
                   zipcode: 12345,
                   country : "India"
                },
                email: "xyz@gmail.com",
                
            },
            deliveryMethod : "fastest"
        }

        axios.post('/order.json',order)
        .then(response => this.setState({loading:false}))
        .catch(error => this.setState({loading:false }));
    }


    render(){
        return(
            <div className={classes.ContactData}>
                <h4> Enter Your Details </h4>
                <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Your Mail'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
                <Button btnType="Success" clicked={this.orderburger} > Order</Button>
                </form>
          
            </div>    

        );
    }
}

export default ContactData;