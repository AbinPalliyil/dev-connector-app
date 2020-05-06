import React, { Fragment } from 'react';
import spinner from '../../img/soinnner.gif';

const Spinner = () => {
	return (
		<Fragment>
			<img
				src={spinner}
				style={{ width: '20px', margin: 'auto', display: 'block', alignItems: 'center' }}
				alt='Loading....'
			/>
		</Fragment>
	);
};

export default Spinner;
