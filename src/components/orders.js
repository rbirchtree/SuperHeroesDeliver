import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import './orders.css';

class Orders extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
    		<form onSubmit={e => e.preventDefault()}>
    			<div>
    				<label htmlFor="hero-selection">Hero Selection</label>
    					<select name="hero" id="hero">
							<option value="Batman">Batman</option>
	    					<option value="Spiderman">Spiderman</option>
	    					<option value="Captain America">Captain America</option>
	    					<option value="Wonder Woman">Wonder Woman</option>
	    					<option value="Storm">Storm</option>
    					</select>
					<label htmlFor="places-selection">Places to Deliver</label>
					<select name="places" id="places">
						<option value="Dell Children">Dell Children's Medical Center (Hospital)
												4900 Mueller Blvd 
												Austin, TX 78723
						</option>
						<option value="Seton">Seton Medical Center
											   1201 W 38th St 
											   Austin, TX 78705
						</option>
						<option value="St.Davids">St. Davids
											   919 East 32nd Street
											   Austin, TX 78705-2709
						</option>
						<option value="DellSeton">Dell Seton Medical Center @ UT
											   1500 Red River St
											   Austin, TX 78701
						</option>
					</select>
						<label for="deliveryDate">Delivery Date</label>
						<input id="deliveryDate" type="date" value="2018-08-09"/>
						<label for="instructions">Special Instructions</label>
					<textarea rows="5" cols="30"  id="instructions">Your dad says get well soon and happy birthday.
					</textarea>
					<select name="payment">
						<option value="paypal">Paypal</option>
						<option value="creditcard">Credit Card</option>
					</select>
    			<button>Submit</button>
    			</div>
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

export default requiresLogin()(connect(mapStateToProps)(Orders));
