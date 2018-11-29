import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import {stripeAPIKEY} from './keys';

class SecureCheckOut extends Component {
  render() {
    return (
      <StripeProvider apiKey={stripeAPIKEY}>
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