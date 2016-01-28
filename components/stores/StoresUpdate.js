import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { allStores, toggleAddFormVisibility } from './../../actions/actions';
import AddStore from './AddStore';
import StoreListItems from './StoreListItems.js';
import { addStore,  } from './../../actions/actions';


class StoresUpdate extends React.Component {


	render() {

		const { dispatch, storeList, formVisible } = this.props;

		console.log(formVisible)

		return (
			<div>

				<div>
					<ul>

						{formVisible.visible ?
							<li><a href="#" onClick={(e) => {e.preventDefault(); dispatch(toggleAddFormVisibility(false))}}> - </a></li>
							:
							<li><a href="#" onClick={(e) => {e.preventDefault(); dispatch(toggleAddFormVisibility(true))}}> + </a></li>
						}
					</ul>

					{formVisible.visible ? <AddStore dispatch={dispatch} /> : null}

				</div>


				<ul className="list-group">
					{storeList.stores.map((store, index) => (

						<StoreListItems
							key={store.id}
							storeDetails={store}
							showEdits={true}
							dispatch={dispatch}
							tigerStripe={index % 2 === 0 ? 'even' : 'odd'} />

					))}

				</ul>

			</div>
		)
	}

}


function getAllStores(state) {

	console.log(state)

	return {
		storeList: allStores(state.stores.stores),
		formVisible: state.stores.addStoreVisibility
	}
}


export default connect(getAllStores)(StoresUpdate)
