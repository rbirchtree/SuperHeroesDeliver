import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import {stripeAPIKey} from '../config';

class SecureCheckOut extends Component {
  render() {
    return (
      <StripeProvider apiKey={stripeAPIKey}>
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