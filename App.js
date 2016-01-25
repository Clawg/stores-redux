import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addStore, deleteStore, allStores, editStore, toggleStore } from './actions/actions';
import AddStore from './components/AddStore';
import StoreList from './components/StoreList';
import { Router, Route, Link, browserHistory } from 'react-router';
import { pushPath } from 'redux-simple-router';



class App extends React.Component {



	render() {

		// visible stores should be what is displayed in the url

		const { dispatch, visibleStores } = this.props;

		return (
			<div>
				{<AddStore onStoreAdd={data => dispatch(addStore(data))} />}
				{<StoreList
						storesArray={visibleStores}
						onStoreDelete={storeId => dispatch(deleteStore(storeId))}
						onStoreEdit={(storeItemsToUpdate) => dispatch(editStore(storeItemsToUpdate))}
						onStoreToggle={(storeId) => dispatch(toggleStore(storeId))}/>}

						{/*onStoreEdit={storeId => dispatch(editStore(storeId))}/>*/}

			</div>
		)
	}


}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.

function select(state) {
	return {
		visibleStores: allStores(state.stores)
	}
}

//module.exports = connect(
//		null,
//		{ pushPath }
//)(App);

export default connect(select)(App)

