import React from 'react';
import './superhero.css';

import Batman from '../images/Batman.jpg';
import Spiderman from '../images/Spiderman.jpg';
import Superman from '../images/Superman.jpg';

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