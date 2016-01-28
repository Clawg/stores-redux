import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allStores } from './../../actions/actions';
import StoreListItems from './StoreListItems.js';
import './StoreList.css';


class StoresList extends React.Component {

	render() {

		const { storeList } = this.props;

		return (

			<ul className="list-group">
				{storeList.stores.map((store, index) => (

					<StoreListItems
							key={store.id}
							storeDetails={store}
							showEdits={false}
							tigerStripe={index % 2 === 0 ? 'even' : 'odd'} />

				))}

			</ul>
		)

	}

}

StoresList.PropTypes = {
	stores: React.PropTypes.object.isRequired
};


function getAllStores(state) {
	return {
		storeList: allStores(state.stores.stores)
	}
}

export default connect(getAllStores)(StoresList);

