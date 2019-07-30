import React from 'react';
import  './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
return(
	<div>
		<p className='f3'>
			{'This Magic Brain will detect faces in your pictures.'}
		</p>
		<div className='center'>
		<div className='form center pa4 br3 shadow-5' >
			<input className='f4 pa2 w-70 center' type='text' 
			onChange={onInputChange}/>
			<button className='f6 ph2 pv-2 dib link grey bg-lightest-blue w-30 center grow pointer' 
			onClick={onButtonSubmit}>Detect!</button>
		</div>
		</div>
	</div>
	);

}

export default ImageLinkForm;