import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const CURRENT_ORDERS = 'CURRENT_ORDERS';
export const currentOrders = () => ({
    type: CURRENT_ORDERS
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

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
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const deleteOrder = deleteSuccess => ({
    type: DELETE_SUCCESS,
    deleteSuccess
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};

export const getCurrentOrders = (orders) => dispatch => {
    return (
            fetch(`${API_BASE_URL}/order`,{
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
        .then(res => dispatch(currentOrders))
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
                //res.json(console.log("success lol make a dispatch")))
            //
            //action to display success console.log("success lol make a dispatch")
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