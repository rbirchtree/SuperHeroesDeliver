import React from 'react';
import './superhero.css';

export default function Superhero(props){
	return (
		<img src={require(`../images/${props.hero}.jpg`)} alt={props.hero} />
		)
}

