import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
const keys = require('./keys');

class SecureCheckOut extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ARlDsbrXPfRp3RxSfAYYIIMw">
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