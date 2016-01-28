import React from 'react';
import Radium from 'radium';

const StoreInput = (props) => {

	return (
		<div style={props.styles.row}>
			<label htmlFor="name" style={[props.styles.label, props.styles.even]}>{props.text}</label>
			<input id={props.identifier} name={props.identifier} type={props.identifier} onChange={props.onChange} />
		</div>
	)
}


export default Radium(StoreInput);