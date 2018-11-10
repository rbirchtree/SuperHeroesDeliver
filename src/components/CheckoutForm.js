import React, {Component} from 'react';
import {CardNumberElement,CardExpiryElement, CardCVCElement,injectStripe} from 'react-stripe-elements';
import './checkoutForm.css';


class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {complete: false};
  this.submit = this.submit.bind(this);
}

  async submit(ev) {
  let {token} = await this.props.stripe.createToken({name: "Name"});
  
  let response = await fetch("https://fierce-oasis-81437.herokuapp.com/api/stripe/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    mode: "no-cors",
    body: token.id
  });
  if (response.ok === false) this.setState({complete: true});
}
  render() {
    if (this.state.complete){
      return (
          <div className="black">Thank you for your order! Please log out!</div>
        )
    }
      return (
        <div className="checkout">
          <CardNumberElement/>
          <CardExpiryElement/>
          <CardCVCElement/>
          <button onClick={this.submit}>Send</button>
        </div>
      );
  }
}

export default injectStripe(CheckoutForm);