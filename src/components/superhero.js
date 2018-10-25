import React from 'react';
import './superhero.css';

import Batman from '../images/Batman.jpg';
import Spiderman from '../images/Spiderman.jpg';
import Superman from '../images/Superman.jpg';
// Create an img element which displays test.png
//const image = <img src={TestImage} />;
//if statement logic for batman, superman and spiderman
//import store
export default function Superhero(props){
	
	let heroPic;
	if (props.hero === 'Batman') {
		heroPic = Batman
	} else if (props.hero === 'Spiderman'){
		heroPic = Spiderman;
	} else {
		heroPic = Superman;
	}
	return (
		<img src={heroPic} alt={props.hero} />
		)
}