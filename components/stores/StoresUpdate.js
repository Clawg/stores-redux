import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import AddStoreToggleWithForm from './AddStoreToggleWithForm';
import StoreListItems from './StoreListItems.js';
import { addStore, editStore, toggleStore, deleteStore, allStores, toggleAddFormVisibility, createNewStore, resetNewStore } from './../../actions/actions';


const StoresUpdate = ({
	storeList,
	formVisible,
	onToggleStoreClick,
	onDeleteStoreClick,
	onHandleEditChange,
	onSubmitStore,
	toggleAddForm,
	onAddStoreInputChange,
	newStore}) => {

		return (

			<div>

				<AddStoreToggleWithForm
					storeList={storeList}
					formVisible={formVisible}
					newStore={newStore}
					submitStore={(e) => {e.preventDefault(); onSubmitStore(e, newStore)}}
					onInputChange={(e) => {e.preventDefault(); onAddStoreInputChange(e)}}
				    toggleAddForm={(e) => {e.preventDefault(); toggleAddForm(e, formVisible)}}
				/>

				<ul className="list-group">
					{storeList.stores.map((store, index) => (
						<StoreListItems
							key={store.id}
							storeDetails={store}
							showEdits={true}
							tigerStripe={index % 2 === 0 ? 'even' : 'odd'}
							toggleStore={(e) => {e.preventDefault(); onToggleStoreClick(store.id)}}
							editStore={(e) => {e.preventDefault(); onHandleEditChange(e, store.id)}}
							deleteStore={(e) => {e.preventDefault(); onDeleteStoreClick(store.id)}}
						/>
					))}

				</ul>

			</div>
		)
}


const mapStateToProps = (state) => {
	return {
		storeList: allStores(state.stores.stores),
		formVisible: state.stores.addStoreVisibility,
		newStore: state.stores.newStore
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onToggleStoreClick: (id) => {
			dispatch(
				toggleStore(id)
			);
		},

		onDeleteStoreClick: (id) => {
			dispatch(
				deleteStore(id)
			)
		},

		onHandleEditChange: (e, id) => {

			const target  = e.target;
			const newValue = {
				id: id
			};

			newValue[target.name] = target.value;

			dispatch(
				editStore(newValue)
			)
		},

		toggleAddForm: (e, bool) => {
			console.log(bool)
			dispatch(
				toggleAddFormVisibility(bool)
			)
		},

		onAddStoreInputChange: (e) => {
			const target  = e.target;
			dispatch(createNewStore({k: target.id, v: target.value}));
		},

		onSubmitStore: (e, store) => {
			e.preventDefault();
			const uniqid = Date.now();
			const newState = store;
			newState.id = uniqid;
			dispatch(addStore(newState));
			dispatch(resetNewStore());
		}

	};

}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoresUpdate);


//function getAllStores(state) {
//
//	return {
//		storeList: allStores(state.stores.stores),
//		formVisible: state.stores.addStoreVisibility
//	}
//}
//
//
//export default connect(getAllStores)(StoresUpdate)
