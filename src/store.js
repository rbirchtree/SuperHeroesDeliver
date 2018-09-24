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
        order: orderReducer,
        /*notification: (state, action) => {
    		if(action.type === "@@redux-form/SET_SUBMIT_SUCCEEDED" && action.meta.form === "registration") {
    			return "registration succeded //switch for order form"
    		}
        	console.log(action)
        	return null

        }*/
        
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
