import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link, withRouter,Redirect, BrowserRouter as Router} from 'react-router-dom';

import HeaderBar from './header-bar';
import About from './about';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import NotFound from './NotFound';

import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            
            <Router>
                <div>
                    <HeaderBar />    
                <Switch>
                    
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
                </div>
            </Router>
            
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
