import React , { Component} from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
class Checkout extends Component {

        state={
            ingredients:null,
            totalPrice: 0
        }

        componentWillMount() {
            const query = new URLSearchParams(this.props.location.search);
            const ingredients ={};
            let totalprice =0;
            for(let param of query.entries())
            {
                if(param[0]==='price')
                {
                    totalprice=param[1]
                }
                else{
                    ingredients[param[0]]= +param[1]
                }
            }
            this.setState({ingredients:ingredients , totalPrice:totalprice});
        }

        cancelCheckoutHandler = () =>{
            this.props.history.goBack();
        }

        continueCheckoutHandler = () =>{
            this.props.history.replace('/checkout/contact-data');
        }

        render() {


            return (
               <div>
                    <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    clickedCancelled={this.cancelCheckoutHandler}
                    clickedContinued={this.continueCheckoutHandler}/>

                    <Route path={this.props.match.path +'/contact-data'} 
                    render={(props)=>(
                     <ContactData  ingredients={this.state.ingredients} {...props} price={this.state.totalPrice}/>   
                    )} />
               </div>
            );
        }
}

export default Checkout;