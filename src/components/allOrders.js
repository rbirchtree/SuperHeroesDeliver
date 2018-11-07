import React, { Component } from 'react';
import _ from "lodash";
import { connect } from 'react-redux';
import { getCurrentOrders } from '../actions/orders';
import './allOrders.css';

class AllOrders extends Component {
	componentDidMount(){
			this.props.getCurrentOrders();
	}

	renderOrders() {
		console.log(this.props,'props')
		return _.map(this.props.orders, order => {
			return (
					<ul className="allOrders" key={order.giftTo}>
						<li className="orderInfo"><span className="orderInfoSpan">Order #: </span> {order._id}</li>
						<li className="orderInfo"><span className="orderInfoSpan">Delivery Date:</span> {order.deliveryDate}</li>
						<li className="orderInfo"><span className="orderInfoSpan">Delivery Place:</span> {order.deliveryPlace}</li>
						<li className="orderInfo"><span className="orderInfoSpan">To:</span> {order.giftTo}</li>
						<li className="orderInfo"><span className="orderInfoSpan">Gift:</span> {order.gift}</li>
						<li className="orderInfo"><span className="orderInfoSpan">Instructions:</span> {order.instructions}</li>
						<li className="orderInfo"><span className="orderInfoSpan">Superhero:</span> {order.superhero}</li>
					</ul>
				)
		})
	}

	render(){
		
		return(
			<div className="centerDiv">
				<h3 className="allOrdersTitle">Your Orders</h3>
					{this.renderOrders()}
			</div>
			)
	}
}


function mapStateToProps(state){
	return { orders: state.orderReducer.orders};
}

export default connect(mapStateToProps, {getCurrentOrders})(AllOrders)