import React from 'react';
import Radium from 'radium';

const StoreInput = ({styles, text, identifier, onChange}) => {

	return (
		<div style={styles.row}>
			<label htmlFor="name" style={[styles.label, styles.even]}>{text}</label>
			<input id={identifier} name={identifier} type={identifier} onChange={onChange} />
		</div>
	)
}


export default Radium(StoreInput);