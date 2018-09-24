import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import './header-bar.css';
import AllOrders from './allOrders.js';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        //add get all orders...
        //delete all
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <ul>
                    <li><Link className="logoutBtn" to="/" onClick={() => this.logOut()}>Log out</Link></li>
                    <li><Link className="currentOrdersBtn" to="/allorders" Component={AllOrders}>Current Orders </Link></li>
                </ul>
            );
        }
        return (
            <div className="header-bar">
                <Link className="homepage"to={'/'}><h1>Superheroes Deliver<span className="exclamation">!</span></h1></Link>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
