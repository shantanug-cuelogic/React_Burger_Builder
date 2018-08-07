import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../component/UI/Button/Button';
import axios from '../../axios-orders';
import Input from '../../component/UI/Input/Input';
import Spinner from '../../component/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
             state={
                    orderForm: {
                            name: {
                                elementType: 'input',
                                elementConfig:{
                                    type: 'text',
                                    placeholder:'Your Name'
                                },
                                value:'',
                                validation:{
                                    required:true,
                                    
                                },
                                valid:false,
                                touched:false

                            },
                            street: {
                                elementType: 'input',
                                elementConfig:{
                                    type: 'text',
                                    placeholder:'Street'
                                },
                                value:'',
                                validation:{
                                    required:true,
                                    
                                },
                                valid:false,
                                touched:false
                            },
                            zipcode: {
                                elementType: 'input',
                                elementConfig:{
                                    type: 'text',
                                    placeholder:'ZIP Code'
                                },
                                value:'',
                                validation:{
                                    required:true,
                                    minLength : 5,
                                    maxLength :5
                                },
                                valid:false,
                                touched:false
                            },
                            country :{
                                elementType: 'input',
                                elementConfig:{
                                    type: 'text',
                                    placeholder:'Country'
                                },
                                value:'',
                                validation:{
                                    required:true,
                                    
                                },
                                valid:false,
                                touched:false
                            },
                            email:{
                                elementType: 'input',
                                elementConfig:{
                                    type: 'email',
                                    placeholder:'Your E-Mail'
                                },
                                value:'',
                                validation:{
                                    required:true,
                                    
                                },
                                valid:false,
                                touched:false
                            },
                            
                            deliveryMethod :{
                                elementType: 'select',
                                elementConfig:{
                                    options : [
                                            {value:'fastest',display:'Fastest'},
                                            {value:'cheapest',display:'Cheapest'}
                                                ]
                                },
                                value: 'fastest',
                                valid: true,
                                validation:{}
                                
                            },
                          },
                     formIsValid:false,
                  
       }
       
    

    orderburger = (event)=>{
       
        
       event.preventDefault();
        
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients : this.props.ings,
            price : this.props.price,
            orderData : formData,
        }

        this.props.onOrderBurger(this.props.token,order);
    }

    checkValidity (value,rules) {
        let isValid = true;

        if(!rules)
        {
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;;
        }

        if(rules.minLength)
        {
            isValid = value.length >=rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length <=rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputOnChangeHandler = (event, inputIdentifier) =>{
       
        const updatedOrderForm = {
             ...this.state.orderForm
        };
        
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        let formIsValid = true;

        for(let inputIdentity in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentity].valid && formIsValid;
        }
       
        this.setState({orderForm: updatedOrderForm,formIsValid:formIsValid});


    }


    render(){

       const inputArrayElemet =[];
        for(let key in this.state.orderForm)
        {
            inputArrayElemet.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        
        let form =(
            <form onSubmit={this.orderburger}>
            
                 {inputArrayElemet.map(formELement=>(
                  <Input 
                    key={formELement.id}
                    elementType={formELement.config.elementType}
                    elementConfig={formELement.config.elementConfig}
                    value={formELement.config.value}
                    invalid={!formELement.config.valid}
                    shouldValidate={formELement.config.validation}
                    touched={formELement.config.touched}
                    clicked={(event)=>this.inputOnChangeHandler(event,formELement.id)}
                  />   
                 ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} > Order</Button>
        </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4> Enter Your Details </h4>
               {form}
          
            </div>    

        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch=>{
  return{
    onOrderBurger: (token,orderData) => dispatch (actions.purchaseBurger(token,orderData))

  }
   }; 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));