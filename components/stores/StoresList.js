import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreListItems from './StoreListItems.js';
import { allStores } from './../../actions/actions';
import './StoreList.css';

const StoresList = ({storeList}) => {

	return (

		<ul className="list-group">
			{storeList.stores.map((store, index) => (

				<StoreListItems
						key={store.id}
						storeDetails={store}
						showEdits={false}
						tigerStripe={index % 2 === 0 ? 'even' : 'odd'}
				/>

			))}

		</ul>
	)

}

StoresList.PropTypes = {
	stores: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		storeList: allStores(state.stores.stores)
	}
}


export default connect(
	mapStateToProps
)(StoresList);