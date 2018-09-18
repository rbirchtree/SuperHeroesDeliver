import React, { Component } from 'react';
import _ from "lodash";
import {connect} from 'react-redux';
//import from auth getcurrent orders and dispatch?
import { getCurrentOrders } from '../actions/auth';

class AllOrders extends Component {
	componentDidMount(){
		this.props.getCurrentOrders();
	}

	renderOrders(){
		return _.map(this.props.orders, order =>
			{ 
			 return (
			 	<li>
			 		{order.deliveryDate}
			 		{order.instructions}
			 	</li>
			 	)
			});
	}
	
	render(){
		return(
			<div>
				<h3>Your Orders</h3>
				<ul>
					{this.renderOrders()}
				</ul>
			</div>
			)
	}
}

function mapStateToProps(state){
	return { orders: state.orders};
}

export default connect(mapStateToProps, getCurrentOrders) (AllOrders)