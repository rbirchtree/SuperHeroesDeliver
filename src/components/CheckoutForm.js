import React, {Component} from 'react';
import {CardNumberElement,CardExpiryElement, CardCVCElement,injectStripe,StripeProvider} from 'react-stripe-elements';
import './checkoutForm.css';
import CreditCards from '../images/creditcards.jpg';

class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {complete: false,
                 value: "John Doe"};
  this.submit = this.submit.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

  async submit(ev) {
  let {token} = await this.props.stripe.createToken({name: this.state.value});
  
  let response = await fetch("https://superheroesdeliverserver.herokuapp.com/api/stripe/charge", {
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
        <StripeProvider apiKey="pk_live_vtVDsFJjoX417gqmdyamimQb00pRxUP8Lx">
          <div className="checkout">
            <form>
              <label>
                Full Name:
              </label>
                <input className="ccName" type="text" value={this.state.value} onChange={this.handleChange}/>
              <div className="centering">
                <CardNumberElement />
                <CardExpiryElement/>
                <CardCVCElement/>
              </div>
              <img src={CreditCards}/>
            <button onClick={this.submit}>Send</button>
            </form>
          </div>
        </StripeProvider> 
      );
  }
}

export default injectStripe(CheckoutForm);