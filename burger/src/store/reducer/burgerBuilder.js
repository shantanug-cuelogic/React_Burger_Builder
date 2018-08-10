import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState ={
    ingredients : null,
    totalPrice : 30,
    error:false,
    building: false
};

const INGREDIENT_PRICES = {
    salad : 20,
    bacon : 35,
    meat : 30,
    cheese : 15
};
const addIngredient = (state, action) =>{
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}   
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) =>{
    const updatedIngr = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}   
    const updatedIngrs = updateObject(state.ingredients,updatedIngr);
    const updatedSt = {
        ingredients : updatedIngrs,
        totalPrice: state.totalPrice  - INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedSt);
        
}

const setIngredient = (state, action) =>{
    return updateObject(state,{ 
        ingredients:{
        salad:action.ingredients.salad,
        bacon:action.ingredients.bacon,
        cheese:action.ingredients.cheese,
        meat:action.ingredients.meat
    },
    totalPrice:30,
    error:false,
    building:false

    })
}

const fetchIngredientFailed = (state,action) =>{
    return updateObject(state, {error:true});
}

const reducer = (state = initialState, action) =>{
    switch(action.type){

        case actionTypes.ADD_INGREDIENT :
           return addIngredient(state,action);
        
        case actionTypes.REMOVE_INGREDIENT : 
            return removeIngredient(state,action);

        case actionTypes.SET_INGREDIENT : 
            return setIngredient(state,action);
        
        case actionTypes.FETCH_INGREDIENTS_FAILED : 
            return fetchIngredientFailed(state,action);

        default :
           return state;
    }
    

};

export default reducer;