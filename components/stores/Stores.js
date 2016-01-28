import React, { Component } from 'react';
import StoreHeader from './StoreHeader';

const Stores = (props) => {
	return (
		<div>
			<StoreHeader />
			{props.children}
		</div>
	)
}

export default Stores;