import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import orderReducer from './reducers/order';
import {setAuthToken, refreshAuthToken} from './actions/auth';
 

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        orderReducer: orderReducer 
    }),
    applyMiddleware(thunk)
);
//order: orderReducer add back in
// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
