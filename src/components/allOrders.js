import React, { Component } from 'react';
import _ from "lodash";
import { connect } from 'react-redux';
import { getCurrentOrders } from '../actions/orders'
//import { getCurrentOrders } from '../actions/orders';

class AllOrders extends Component {
	componentDidMount(){
			this.props.getCurrentOrders();
	}

	renderOrders() {
		return _.map(this.props.orders, order => {
			return (
				<li>{order.deliveryDate}</li>
				)
		})
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

/*const mapDispatchToProps = dispatch => {
	return { getCurrentOrders:() => dispatch(getCurrentOrders())}
};*/

/*const mapDispatchToProps = {
	getCurrentOrders
};*/

function mapStateToProps(state){
	console.log(state)
	return { orders: state.order.order};
}
//export default connect(mapStateToProps)(AllOrders)
export default connect(mapStateToProps, {getCurrentOrders})(AllOrders)