import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {reduxForm, Field} from 'redux-form';
import {submitOrder} from '../actions/auth';
import './orders.css';



class Orders extends React.Component {
    onSubmit(values){
    	return this.props.dispatch(submitOrder(values));  	
    }

    render() {
    	const { handleSubmit } = this.props;
        return (
    		<form 
    		onSubmit={handleSubmit(values => this.onSubmit(values))}>
    			
		        <div>
	        	<label>To</label>
	        	<Field
	        	 name="giftTo"
	        	 component="input"
	        	 type="text"
	        	 placeholder="John Doe"
	        	 />
	        	 <label>From</label>
	        	 <Field
	        	 name="giftFrom"
	        	 component="input"
	        	 type="text"
	        	 placeholder="Jane Doe"
	        	 />
	        	 <label>Superhero Selection</label>
		          <Field name="superhero" component="select">
		            <option />
		            <option value="Batman">Batman</option>
		            <option value="Superman">Superman</option>
		            <option value="Spiderman">Spiderman</option>
		          </Field>
		          <label>Gift Selection</label>
		          <Field name="gift" component="select">
		            <option />
		            <option value="Chocolate">Chocolate</option>
		            <option value="Flowers">Flowers</option>
		            <option value="none">-none-</option>
		          </Field>
		          <label> Delivery Place</label>
		          <Field name="deliveryPlace" component="select">
						<option>Dell Children's Medical Center (Hospital)
												4900 Mueller Blvd 
												Austin, TX 78723
						</option>
						<option>Seton Medical Center
											   1201 W 38th St 
											   Austin, TX 78705
						</option>
						<option>St. David's
											   919 East 32nd Street
											   Austin, TX 78705-2709
						</option>
						<option>Dell Seton Medical Center @ UT
											   1500 Red River St
											   Austin, TX 78701
						</option>
					</Field>
		          <label>Delivery Date</label>
		          <Field
			          name="deliveryDate"
			          component="textarea"
			          placeholder="8/1/18 @ 3:00PM"
			        />
		          <label>Special Instructions</label>
		          <Field
		          	rows="5"
		          	name="instructions"
		          	component="textarea"
		          	placeholder="Deliver to Room #123. Say happy birthday from Batman, your dad is sorry he couldn't make it. This is the best he could do."
		          	/>
		          <label>Payment</label>
	          	  <Field name="payment" component="select">
	          	  	<option/>
	          	  	<option value="Credit Card">Credit Card</option>
	          	  	<option value="Paypal">Paypal</option>
	          	  </Field>
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

