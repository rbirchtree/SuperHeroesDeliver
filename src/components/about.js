import React from 'react';

import './about.css';

export default function About(){
	return (
		<div>
			<div className="container">
					<h1 className="aboutTitle">About</h1>
			</div>
			<p className="about"><span className="logo">Superheroes Deliver</span><span className="punction">!</span> 
			is a non sequitur way to deliver laughter to children
			 and adults for whatever reason. Flowers are nice, 
			 but they are better when delivered by a superhero.
			 </p>
			 <p className="about">
			 Artwork is by Terry Huddleston, his website is <a className="aboutlinks" href="https://www.terryhuddlestonart.com/">terryhuddlestonart.com</a>. 
			 Like us on <a className="aboutlinks" href="https://www.facebook.com/SuperHeroesDeliver">Facebook</a>
			 <span className="logo">. Superheroes Deliver</span><span className="punction">!</span> was founded by Rob Birch. 
			 If you have issues, please call (512) 515-1628.
			 </p>
		</div>
		)
}