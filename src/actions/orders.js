import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import {normalizeResponseErrors} from './utils';
import { authError } from './auth.js'
import { AUTH_ERROR } from './auth.js'
export const REQUEST_ORDERS = 'REQUEST_ORDERS';

export const requestOrders = (orders) => ({
    type: REQUEST_ORDERS,
    orders
});

export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const receiveOrders = (orders) => ({
  type: RECEIVE_ORDERS,
});

export const getCurrentOrders = (orders) => dispatch => {
    return (
            fetch(`${API_BASE_URL}/order/allorders`,{
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(
                        orders
                    )
            })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
		  dispatch(requestOrders(res))
		})
        .catch(err => {
           const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to submit order, please log in again';
        dispatch(authError(err));
        return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            )
        })
        )
};

export const ORDER_FAIL = 'ORDER_FAIL';
export const orderFail = error => ({
    type: AUTH_ERROR,
    error
});

export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const orderSuccess = order => ({
    type: ORDER_SUCCESS,
    order
});
/*export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const deleteOrder = deleteSuccess => ({
    type: DELETE_SUCCESS,
    deleteSuccess
});*/

export const submitOrder = (order) => dispatch => {
    return (
        fetch(`${API_BASE_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(
                order
            )
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => dispatch(orderSuccess(res)))
            //.then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to submit order, please log in again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};