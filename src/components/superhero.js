import React from 'react';
import './superhero.css';

import Batman from '../images/Batman.jpg';
import Spiderman from '../images/Spiderman.jpg';
import Superman from '../images/Superman.jpg';
import WonderWoman from '../images/WonderWoman.jpg';
import CaptainAmerica from '../images/CaptainAmerica.jpg';

export default function Superhero(props){
	
	let heroPic;
	if (props.hero === 'Batman') {
		heroPic = Batman
	} else if (props.hero === 'Spiderman'){
		heroPic = Spiderman;
	} else if (props.hero === 'WonderWoman'){
		heroPic = WonderWoman;
	} else if (props.hero === 'CaptainAmerica'){
		heroPic = CaptainAmerica;
	} else {
		heroPic = Superman;
	}
	return (
		<img className="hero" src={heroPic} alt={props.hero} />
		)
};