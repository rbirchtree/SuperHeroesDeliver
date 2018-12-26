import React, {Component} from 'react';
import moment from 'moment';
import requiresLogin from './requires-login';
import Superhero from './superhero';
import SecureCheckOut from './SecureCheckOut';
import renderDatePicker from './scheduledate';
import {reduxForm, Field} from 'redux-form';
import {submitOrder} from '../actions/orders';
import './orders.css';
import {required, nonEmpty} from '../validators';

class Orders extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hero: 'Spiderman',
			ordering: false
		};
	}

    onSubmit(values){
    	const {phoneNumber,giftTo, giftFrom, superhero, gift, deliveryPlace, deliveryDate, instructions, payment} = values;
    	const order = {phoneNumber,giftTo, giftFrom, superhero, gift, deliveryDate, deliveryPlace, instructions, payment};
    	this.props.dispatch(submitOrder(order))
    	this.setState({
    		ordering: true
    	});
    }


    onChange  = (event,newValue,previousValue,name,allValues) => {
    	this.setState({
    		hero: newValue
    	});
    }
    render() {
    	if (this.state.ordering) {
    		return(
    				<div className="mainContainer">
    					<div className="success">Superheros 
    					Deliver charges <b>$175</b> via Credit Card
    					<SecureCheckOut/>
    					</div>
					</div>
    			)
    	}

    	const { handleSubmit } = this.props;
        const message = "order submitted";
        return (
    		<form id="orderForm" 
    		onSubmit={handleSubmit(values => this.onSubmit(values)
    			)}>
    			<div className="mainContainer">
    			 <div className="leftContainer">
		        	<div className="row">
		        		{this.props.orders && message}
		        		<div className="column">
				        	<label>To</label>
				        	<Field
				        	 id="giftTo"
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
				        	 id="giftFrom"
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
				        	 <label>Superhero</label>
					          <Field name="superhero" component="select"
					          onChange={this.onChange}>
					            <option />
					            <option value="Batman">Batman</option>
					            <option value="Superman">Superman</option>
					            <option value="Spiderman">Spiderman</option>
					            <option value="CaptainAmerica">Captain America</option>
					            <option value="WonderWoman">WonderWoman</option>
					          </Field>
				          </div>
				          <div className="column">
					          <label>Gift</label>
					          <Field name="gift" component="select">
					            <option />
					            <option value="Flowers">Flowers</option>
					            <option value="none">-none-</option>
					          </Field>
				          </div>
			          </div>
				  <div className="row">
		        		<div className="column">
		          		<label> Delivery Place</label>
		          	<Field
		          		rows="5"
			          	name="deliveryPlace"
			          	component="textarea"
			          	placeholder="*ONLY AUSTIN AREA ADDRESSES!*1500 Red River St, Austin, TX 78701, 
			          	Suite 201 Patient: John Doe"
			          	validate={[required, nonEmpty]}
			          	>	
					</Field>
						</div>
						<div className="column">
		          	<label>Special Instructions</label>
			          <Field
			          	rows="5"
			          	name="instructions"
			          	component="textarea"
			          	placeholder="Deliver to Room #201. Say happy birthday from Batman, your dad is sorry he couldn't make it. This is the best he could do."
			          	validate={[required, nonEmpty]}
			          	/>
			          
					</div>
				  </div>
				  <div className="row">
		        	<div className="column">
			          	<label>Delivery Date</label>	
		          		 <Field
						  name="deliveryDate"
						  id="deliveryDate"
						  inputValueFormat="YYYY-MM-DD"
						  dateFormat="L"
						  dateFormatCalendar="dddd"
						  fixedHeight
						  showMonthDropdown
						  showYearDropdown
						  dropdownMode="select"
						  normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
						  component={renderDatePicker}
						/>	
					</div>
			       <div className="column">
			       <label>Phone Number</label>
			        <Field
			        	name="phoneNumber"
			        	id="phoneNumber"
			        	type="text"
			          	component="input"
			          	placeholder="512-555-555"
			          	validate={[required, nonEmpty]}
			          	/>
	          	  </div>
	          	  </div>
	          	  </div>
	          	  <div className="rightContainer">
	          	  	<label className="heroLabel">Hero Selected</label>
			   		<Superhero hero={this.state.hero}/>
			   </div>
			   </div>
    	     <button type="submit" disabled>Submit</button>
    		</form>
        );
    }
}

export default reduxForm({
	form: 'orderForm',
	requiresLogin
})(Orders)