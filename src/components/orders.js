import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {reduxForm, Field} from 'redux-form';
import {fetchProtectedData} from '../actions/protected-data';
import './orders.css';



class Orders extends React.Component {
    /*componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }*/

    onSubmit(values){
    	console.log(values)
    }

    render() {
    	const { handleSubmit } = this.props;
        return (
    		<form 
    		onSubmit={handleSubmit(values => this.onSubmit(values))}>
    			<label>Superhero Selection</label>
		        <div>
		          <Field name="superhero" component="select">
		            <option />
		            <option value="Batman">Batman</option>
		            <option value="Superman">Superman</option>
		            <option value="Spiderman">Spiderman</option>
		          </Field>
		        </div>
		        <div>
		          <label>Gift Selection</label>
		          <Field name="gift" component="select">
		            <option />
		            <option value="Chocolate">Chocolate</option>
		            <option value="Flowers">Flowers</option>
		            <option value="none">-none-</option>
		          </Field>
		          <label>Delivery Date</label>
		          <Field
			          name="notes"
			          component="textarea"
			          placeholder="8/1/18 @ 3:00PM"
			        />
		          
		        </div>
    			<button type="submit">Submit</button>
    			<img src={require('../images/Batman.jpg')} alt="Batman" />
    			<img src={require('../images/Superman.jpg')} alt="Superman" />
    			<img src={require('../images/Spiderman.jpg')} alt="Spiderman" />
    		</form>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const now = String(new Date)
    console.log(now)
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        dateToday: now
    };
};


//export default requiresLogin()(connect(reduxForm({ form: 'OrderForm'})(Orders)
export default reduxForm({
	form: 'OrderForm',
	requiresLogin
})(Orders)

