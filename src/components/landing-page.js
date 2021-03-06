import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';
import Banner from './banner'

export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="landing">
            <Banner />
            <LoginForm />
            <Link className="register" to="/register">Register</Link>
            <ul className="reviews">
                    <li>"She loved it!" -Dave</li>
                    <li>"THAT.IS.AWESOMe!" -Jennifer</li>
                    <li>"So awesome!" -Doug</li>
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);