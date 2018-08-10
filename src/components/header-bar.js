import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import './header-bar.css';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

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
                <button className="logoutBtn" onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
                <Link to={'/'}><h1>Superheros Deliver<span className="exclamation">!</span></h1></Link>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
