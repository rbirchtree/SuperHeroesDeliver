import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';

class Order extends React.Component {
	onSubmit(values) {
		return fetch('/api/orders', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (!res.ok) {
				
			}
		})
	}
}
