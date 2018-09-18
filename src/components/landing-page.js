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
        <div>
            <h2>Can't cheer up your love one? A Superhero can!</h2>
            <h3>Get Batman to deliver flowers to them! <span role="img" aria-label="bat">🦇</span></h3>
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
