import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h4>You're far away and can't cheer up your love one, but a superhero can do it!</h4>
            <h5>We can get Batman to deliver flowers to your love one 🦇</h5>
            <LoginForm />
            <Link className="registerLink" to="/register">Register</Link>
            <Link className="aboutLink" to="/about">About</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
