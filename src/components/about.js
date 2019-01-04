import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import './about.css';

export default function About(){
	return (
		<div>
			<div class="container">
					<h1 className="aboutTitle">About</h1>
			</div>
			<p className="about"><span className="logo">Superheroes Deliver</span><span className="punction">!</span> is a non sequitur way to deliver laughter to children
			 and adults who are in the hospital for a prolong period of time, or whatever reason. Flowers are nice, 
			 but they are better when delivered by a superhero. 
			 <span className="logo">Superheroes Deliver</span><span className="punction">!</span> was founded by Rob Birch. 
			 If you have issues, please call (512) 515-1628.</p>
			 <ul className="footer">
                <li><Link className="demoAbout" to="/about">About</Link></li>
                <li><Link className="demoAbout" to="/demo">Demo</Link></li>   
            </ul>    
		</div>
		)
}