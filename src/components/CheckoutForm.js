import React, {Component} from 'react';
import {CardNumberElement,CardExpiryElement, CardCVCElement,injectStripe} from 'react-stripe-elements';
import './checkoutForm.css';


class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {complete: false,
                 value: "Batman"};
  this.submit = this.submit.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

  async submit(ev) {
  let {token} = await this.props.stripe.createToken({name: this.state.value});
  
  let response = await fetch("https://fierce-oasis-81437.herokuapp.com/api/stripe/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    mode: "no-cors",
    body: token.id
  });
  if (response.ok === false) this.setState({complete: true});
}

    handleChange(event) {
      this.setState({value: event.target.value});
    }

  render() {
    if (this.state.complete){
      return (
          <div className="black">Thank you for your order! Please log out! Only submit once!</div>
        )
    }
      return (
        <div className="checkout">
          <form>
            <label>
              Full Name:
            </label>
              <input class="ccName" type="text" value={this.state.value} onChange={this.handleChange}/>
            
          </form>
            <CardNumberElement/>
            <CardExpiryElement/>
            <CardCVCElement/>
          <button onClick={this.submit}>Send</button>
        </div>
      );
  }
}

export default injectStripe(CheckoutForm);