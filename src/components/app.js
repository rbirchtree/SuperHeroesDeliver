import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter,Link, BrowserRouter as Router} from 'react-router-dom';
import './app.css';
import HeaderBar from './header-bar';
import About from './about';
import LandingPage from './landing-page';
import Orders from './orders';
import Demo from './demo';
import RegistrationPage from './registration-page';
import NotFound from './NotFound';
import AllOrders from './allOrders';

import {refreshAuthToken} from '../actions/auth';

class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
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
                    <Route exact path="/dashboard" component={Orders} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/allorders" component={AllOrders} />
                    <Route exact path="/demo" component={Demo} />
                    <Route component={NotFound} />
                </Switch>
                <ul className="footer">
                    <li><Link className="demoAbout" to="/about">About</Link></li>
                    <li><Link className="demoAbout" to="/demo">Demo</Link></li>   
                </ul>                  
                </div>
            </Router>
            
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - 
export default withRouter(connect(mapStateToProps)(App));
