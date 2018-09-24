import _ from "lodash";
import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ORDER_FAIL,
    ORDER_SUCCESS,
    /*REQUEST_ORDERS,
    RECEIVE_ORDERS*/
} from '../actions/auth';

import {
    REQUEST_ORDERS,
    RECEIVE_ORDERS
} from '../actions/orders'

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null,
    order: null,
    orders: null
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser
        }); 
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === ORDER_FAIL){
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === ORDER_SUCCESS){
        return Object.assign({}, state, {
            order: action.order
        });
    } else if (action.type === REQUEST_ORDERS){ 
        console.log(action,action.type)
        return Object.assign({},state, {
            order: action.orders,
            loading: false
        });
    } else if (action.type === RECEIVE_ORDERS){
        return Object.assign({},state,{
            order: action.order,
            loading: true
        })
    }
    return state;
}
