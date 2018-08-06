import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../component/UI/Button/Button';
import axios from '../../axios-orders';
import Input from '../../component/UI/Input/Input';
import { connect } from 'react-redux';

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
                                value: '',
                                valid: true,
                                validation:{}
                                
                            },
                          },
                     formIsValid:false,
                     loading:false
       }
       
    

    orderburger = (event)=>{
       
        
       event.preventDefault();
        this.setState({loading: true});
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

        axios.post('/order.json',order)
        .then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
    })
        .catch(error => this.setState({loading:false }));

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
        ings:state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);