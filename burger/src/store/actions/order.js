import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/order.json',orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
           })
        .catch(error =>{
            dispatch(purchaseBurgerFail(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHSE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};

export const fetchOrdersFail = (error) =>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
        error:error
    };
};

export const fetchOrdersStart = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    
    return dispatch=> {
        dispatch(fetchOrdersStart());
        axios.get('/order.json')
        .then(res =>{
            const fetchedOrder =[];

            for(let key in res.data)
            {
                fetchedOrder.push({
                    ...res.data[key],
                    id:key
                });
            }
           dispatch(fetchOrdersSuccess(fetchedOrder));
        })
        .catch( err =>{
            dispatch(fetchOrdersFail(err));
        } );
    };
}