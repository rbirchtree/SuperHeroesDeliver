import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './header-bar.css';

import AllOrders from './allOrders.js';
import Orders from './orders.js';

class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <ul>
                    <li><Link className="logout btn" to="/" onClick={() => this.logOut()}>Log out</Link></li>
                    <li><Link className="currentOrders btn" to="/allorders" Component={AllOrders}>Your Orders </Link></li>
                    <li><Link className="newOrder btn" to="/dashboard" Component={Orders}>New Order</Link></li>
                </ul>
            );
        }
        return (
            <div className="header-bar">
                <Link to="/" className="headerLink">Superheroes Deliver<span className="exclamation">!</span></Link>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
