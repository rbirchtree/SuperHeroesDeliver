import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Superhero from './superhero';
import {reduxForm, Field, focus, formValueSelector} from 'redux-form';
import {submitOrder} from '../actions/auth';
import './orders.css';
import {required, nonEmpty} from '../validators';


class Orders extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			order: "No Order"
		};
	}

    onSubmit(values){
    	const {giftTo, giftFrom, superhero, gift, deliveryPlace, deliveryDate, instructions, payment} = values;    	
    	const order = {giftTo, giftFrom, superhero, gift, deliveryDate, deliveryPlace, instructions, payment};
    	console.log(order,'order');
    	//return this.props.dispatch(submitOrder(order))
    	if(this.props.order){
    		return <p>Order received</p>	
    	}
    }

    render() {
    	const { handleSubmit,error } = this.props;
        return (
    		<form id="orderForm" 
    		onSubmit={handleSubmit(values => this.onSubmit(values))}>
		        <div>
		        	<div className="row">
		        		<div className="column">
				        	<label>To</label>
				        	<Field
				        	 name="giftTo"
				        	 component="input"
				        	 type="text"
				        	 placeholder="John Doe"
				        	 validate={[required, nonEmpty]}
				        	 />
			        	 </div>
			        	 <div className="column">
				        	 <label>From</label>
				        	 <Field
				        	 name="giftFrom"
				        	 component="input"
				        	 type="text"
				        	 placeholder="Jane Doe"
				        	 validate={[required, nonEmpty]}
				        	 />
			        	 </div>
		        	 </div>
	        	 	<div className="row">
		        		<div className="column">
				        	 <label>Superhero Selection</label>
					          <Field name="superhero" component="select">
					            <option />
					            <option value="Batman">Batman</option>
					            <option value="Superman">Superman</option>
					            <option value="Spiderman">Spiderman</option>
					          </Field>
				          </div>
				          <div className="column">
					          <label>Gift Selection</label>
					          <Field name="gift" component="select">
					            <option />
					            <option value="Chocolate">Chocolate</option>
					            <option value="Flowers">Flowers</option>
					            <option value="none">-none-</option>
					          </Field>
				          </div>
			          </div>
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
			          validate={[required, nonEmpty]}
			        />
		          <label>Special Instructions</label>
		          <Field
		          	rows="5"
		          	name="instructions"
		          	component="textarea"
		          	placeholder="Deliver to Room #123. Say happy birthday from Batman, your dad is sorry he couldn't make it. This is the best he could do."
		          	validate={[required, nonEmpty]}
		          	/>
		          <label>Payment</label>
	          	  <Field name="payment" component="select">
	          	  	<option/>
	          	  	<option value="Credit Card">Credit Card</option>
	          	  	<option value="Paypal">Paypal</option>
	          	  </Field>
		        </div>
    			<button type="submit"
    			 disabled={this.props.pristine || this.props.submitting}
    			>Submit</button>
    			<Superhero hero={this.state.hero}/>
    			{error && <strong>{error}</strong>}
    		</form>
        );
    }
}


//does this work with my actions and reducers

//export default requiresLogin()(connect(reduxForm({ form: 'OrderForm'})(Orders)
function mapStateToProps(state) {
	return {...state}
}
Orders = connect(mapStateToProps)(Orders)
Orders = reduxForm({
	form: 'OrderForm',
	requiresLogin
})(Orders)

export default Orders;
