import * as actionTypes from './actions';

const initialState ={
    ingredients : {
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
    },
    totalPrice : 30
};

const INGREDIENT_PRICES = {
    salad : 20,
    bacon : 35,
    meat : 30,
    cheese : 15
};

const reducer = (state = initialState, action) =>{
    switch(action.type){

        case actionTypes.ADD_INGREDIENT :
            return{
                 ...state,
                 ingredients : {
                     ...state.ingredients,
                     [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                 } ,
                 totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName]
            };
        
        case actionTypes.REMOVE_INGREDIENT : 
            return{
                ...state,
                 ingredients : {
                     ...state.ingredients,
                     [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                 } ,
                 totalPrice: state.totalPrice  - INGREDIENT_PRICES[action.ingredientName]
          
            };  
        default :
           return state;
    }
    return state;

};

export default reducer;