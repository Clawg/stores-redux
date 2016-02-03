import React, { Component } from 'react';
import StoreHeader from './StoreHeader';

const Stores = ({children}) => {
	return (
		<div>
			<StoreHeader />
			{children}
		</div>
	)
}

export default Stores;