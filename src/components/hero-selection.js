import React from 'react';
import {connect} from 'react-redux';
import './hero-selection.css';

export default function  HeroSelectionForm(props){
	return (
		<form onSubmit={ e => e.preventDefault()}>
			<div>
				<label htmlFor="hero-selection">Hero Selection</label>
					<select name="hero">
						<option value="Batman">Batman</option>
						<option value="Spiderman">Spiderman</option>
						<option value="Captain America">Captain America</option>
						<option value="Wonder Woman">Wonder Woman</option>
					</select>
				<label htmlFor="places-selection">Places to Deliver</label>
					<select name="places">
						<option value="Dell Children">Dell Children's Medical Center (Hospital)
												4900 Mueller Blvd 
												Austin, TX 78723
						</option>
						<option value="Seton">Seton Medical Center
											   1201 W 38th St 
											   Austin, TX 78705
						</option>
					</select>
				<label htmlFor="delivery-choices">Delivery Choice</label>
					<select name="choices">
						<option value="chocolate">Chocolate</option>
						<option value="flowers">Flowers</option>
					</select>
			</div>
		<button>Submit</button>
		</form>
		)
}