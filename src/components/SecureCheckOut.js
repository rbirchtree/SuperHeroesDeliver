import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
const keys = require('./keys');

class SecureCheckOut extends Component {
  render() {
    return (
      <StripeProvider apiKey={keys.stripe.developmentStripe}>
        <div>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default SecureCheckOut;