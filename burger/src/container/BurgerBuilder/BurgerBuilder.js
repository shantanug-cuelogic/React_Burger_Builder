import React ,{ Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger'
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 20,
    bacon : 35,
    meat : 30,
    cheese : 15
}
class BurgerBuilder extends Component{
    

    state = {
        ingredients:null,
        totalPrice: 30,
        purchasable: false,
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
    purchaseHandle = (ingredients) => {
        let newPurchasableState = false ;
        if(Object.values(ingredients))
        {
            newPurchasableState=true;
        }
        this.setState({purchasable : newPurchasableState});

    }
    addIngredientHandle = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.purchaseHandle(updatedIngredients);
    }

    removeIngredientHandle = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0)
        {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeletion;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.purchaseHandle(newPrice);   
    }
    
    modalShowHandle = () => {
        this.setState({purchasing:true});
    }

    modalHideHandle = () => {
        this.setState({purchasing:false});
    }

    purchaseContinue = () => {
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
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
        .then(response => this.setState({loading:false , purchasing : false}))
        .catch(error => this.setState({loading:false , purchasing : false}));
}

    render(){

       let  disableInfo ={
            ...this.state.ingredients
        };

        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p> Ingridients can't be loaded</p>:<Spinner />
        if(this.state.ingredients)
        {
            burger = (<Aux>
                                    <Burger ingredients={this.state.ingredients}/>
                                    <BuildControls  
                                        ingredientAdded={this.addIngredientHandle}
                                        ingredientRemoved ={this.removeIngredientHandle}
                                        disabled = {disableInfo}
                                        price = {this.state.totalPrice}
                                        purchasable = {this.state.purchasable}
                                        ordered = {this.modalShowHandle}/>
                                     </Aux>);
                                     orderSummary =  <OrderSummary ingredients={this.state.ingredients} 
                                     purchaseContinue={this.purchaseContinue}
                                     purchaseCancel ={this.modalHideHandle}
                                     price = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios) ;