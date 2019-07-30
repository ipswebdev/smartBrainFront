import React from 'react';
//import  './Rank.css';

const Rank = ({name, entries}) => {
return(
	<div>
	<div>
	{`${name} , your current count for search is...`}
      <div className='white f1 '>
       {entries}
      </div>
	</div>
	</div>
	);

}

export default Rank;