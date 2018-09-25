import _ from "lodash";

import {
    REQUEST_ORDERS,
    RECEIVE_ORDERS
} from '../actions/orders'

const initialState = {
     // authToken !== null does not mean it has been validated
    loading: false,
    error: null,
    order: null,
    orders: null
};

export default function reducer(state = initialState, action) {
    if (action.type === REQUEST_ORDERS){ 
        console.log(action,action.type)
        return Object.assign({},state, {
            order: action.orders,
            loading: false
        });
    } else if (action.type === RECEIVE_ORDERS){
        return Object.assign({},state,{
            order: action.orders,
            loading: true
        })
    }
    return state;
}