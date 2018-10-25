import {
    REQUEST_ORDERS,
    RECEIVE_ORDERS,
    ORDER_FAIL,
    ORDER_SUCCESS
} from '../actions/orders';

const initialState = {
    loading: false,
    error: null,
    order: null,
    orders: null
};

export default function reducer(state = initialState, action) {
    if (action.type === REQUEST_ORDERS){ 
        return Object.assign({},state, {
            orders: action.orders,
            loading: false
        });
    } else if (action.type === RECEIVE_ORDERS){
        return Object.assign({},state,{
            orders: action.orders,
            loading: true
        })
    } else if (action.type === ORDER_FAIL){
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === ORDER_SUCCESS){
        return Object.assign({}, state, {
            order: action.order
        });
    } 
    return state;
}