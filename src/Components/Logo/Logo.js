import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import Brain from './Brain.png'
const Logo = () => {
return(
	<div className='ma4 mt0'>
	 <Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 150, width: 150 }} >
     <div className="Tilt-inner pa3"><img alt='icon' style={{paddingTop: '5px'}} src={Brain}/></div>
</Tilt>
	</div>
	);

}

export default Logo;