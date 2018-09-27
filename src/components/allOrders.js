import React, { Component } from 'react';
import _ from "lodash";
import { connect } from 'react-redux';
import { getCurrentOrders } from '../actions/orders';
import './allOrders.css';
//import { getCurrentOrders } from '../actions/orders';

class AllOrders extends Component {
	componentDidMount(){
			this.props.getCurrentOrders();
	}

	renderOrders() {
		let i = 0;
		return _.map(this.props.orders, order => {
			i = i + 1
			
			return (
				<ul className="order" data-key={i} key={order.toString()}>
					<li className="orderInfo">Order #: <span className="orderInfoSpan">{i}</span></li>
					<li className="orderInfo">Delivery Date: <span className="orderInfoSpan">{order.deliveryDate}</span></li>
					<li className="orderInfo">Delivery Place: <span className="orderInfoSpan">{order.deliveryPlace}</span></li>
					<li className="orderInfo">To: <span className="orderInfoSpan">{order.giftTo}</span></li>
					<li className="orderInfo">Gift: <span className="orderInfoSpan">{order.gift}</span></li>
					<li className="orderInfo">Instructions: <span className="orderInfoSpan">{order.instructions}</span></li>
					<li className="orderInfo">Superhero: <span className="orderInfoSpan">{order.superhero}</span></li>
				</ul>
				)
			//console.log(i,'what is this')
		})
	}
	render(){
		
		return(
			<div>
				<h3>Your Orders</h3>
				
					{this.renderOrders()}
				
			</div>
			)
	}
}


function mapStateToProps(state){
	return { orders: state.order.order};
}
//export default connect(mapStateToProps)(AllOrders)
export default connect(mapStateToProps, {getCurrentOrders})(AllOrders)