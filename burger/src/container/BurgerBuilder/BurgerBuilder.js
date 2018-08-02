import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
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
        loading : false,
        error:false
    }    

    componentDidMount(){
        axios.get('https://burgerbuilder-41477.firebaseio.com/ingridients.json')
        .then(response => {
            this.setState({ingredients:response.data})
        })
        .catch(error => {
            this.setState({error:true});
        });
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
        
        let burger = this.state.error ? <p> Ingridients can't be loaded</p>:<Spinner />
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

        if(this.state.loading)
        {
           orderSummary= <Spinner /> 
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
        ings : state.ingredients,
        price : state.totalPrice
    };
}
const mapDispatchToProps = dispatch =>{
return{
    onIngredientAdded :(ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
    onIngredientRemoved :(ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName}),

}
}
export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)) ;