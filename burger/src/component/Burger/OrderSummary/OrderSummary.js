import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
        return (
            <li key ={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
            );
    });
     
    return (
    <Aux>
        <h3> Your Order </h3>
        <p> Delicious burger with following ingredients: </p>
        <ul>{ingredientSummary}
         </ul>      
         <p> <strong>Your Total Bill is : {props.price} &#8377;</strong> </p>
         <p> Ready to Checkout?</p>
         <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
         <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>   
    );
};

export default orderSummary;