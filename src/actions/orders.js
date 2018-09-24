
import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import {normalizeResponseErrors} from './utils';
import { authError } from './auth.js'
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
}