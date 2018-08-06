import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger'
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component{
    

    state = {
        purchasing : false,
        
    }    

    componentDidMount(){
        this.props.onInitIngredients();
    }
    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys( ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }) 
        .reduce((sum,el)=> {
            return sum+el;
        },0);
        return sum >0

        // let newPurchasableState = false ;
        // if(Object.values(ingredients))
        // {
        //     newPurchasableState=true;
        // }
        // this.setState({purchasable : newPurchasableState});

    }
    
    
    modalShowHandle = () => {
        this.setState({purchasing:true});
    }

    modalHideHandle = () => {
        this.setState({purchasing:false});
    }

  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
}   

    render(){

       let  disableInfo ={
            ...this.props.ings
        };

        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.props.error ? <p> Ingridients can't be loaded</p>:<Spinner />
        if(this.props.ings)
        {
            burger = (<Aux>
                                    <Burger ingredients={this.props.ings}/>
                                    <BuildControls  
                                        ingredientAdded={this.props.onIngredientAdded}
                                        ingredientRemoved ={this.props.onIngredientRemoved}
                                        disabled = {disableInfo}
                                        price = {this.props.price}
                                        purchasable = {this.updatePurchaseState(this.props.ings)}
                                        ordered = {this.modalShowHandle}/>
                                     </Aux>);
                                     orderSummary =  <OrderSummary ingredients={this.props.ings} 
                                     purchaseContinue={this.purchaseContinue}
                                     purchaseCancel ={this.modalHideHandle}
                                     price = {this.props.price}
                                     />   
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.modalHideHandle}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>   

        );
    }

}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}
const mapDispatchToProps = dispatch =>{
return{
    onIngredientAdded :(ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved :(ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients : () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.purchaseInit())
}
}
export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)) ;