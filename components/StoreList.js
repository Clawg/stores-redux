import './StoreList.css';
import React from 'react';
import { pushPath } from 'redux-simple-router';


class StoreList extends React.Component {

	constructor() {
		super();
		let uniqid = Date.now();
		this.state = {}; // Manages the editable inputs state
	}

	handleDelete(e, storeId) {
		e.preventDefault();
		this.props.onStoreDelete(storeId);
	}

	handleToggle(e, store) {
		e.preventDefault();
		this.props.onStoreToggle(store);
	}

	handleEdit(e, storeId) {

		const target  = e.target;

		let newValue = {
			id: storeId
		};

		newValue[target.name] = target.value;

		this.props.onStoreEdit(newValue); // Pass in the new state
	}


	render() {

		return (
			<ul className="list-group">
				{this.props.storesArray.stores.stores.map((store, index) => (
						<li key={store.id}>
							{store.toggle ? (

								<form>
									<input onChange={(e) => this.handleEdit(e, store.id)} name="name" value={store.name} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="address" value={store.address} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="postCode" value={store.postCode} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="suburb" value={store.suburb} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="city" value={store.city} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="phone" value={store.phone} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="longitude" value={store.longitude} type="text"  /><br />
									<input onChange={(e) => this.handleEdit(e, store.id)} name="latitude" value={store.latitude} type="text"  />
									<span onClick={(e) => this.handleToggle(e, store.id)}>close</span>
								</form>

							) :
								<div>{store.name}, {store.address}
									<a href="#" onClick={(e) => this.handleDelete(e, store.id)}>X</a>
									<a href="#" onClick={(e) => this.handleToggle(e, store.id)}>Edit</a>
								</div>
							}

						</li>
				))}

			</ul>
		)


	}

}

StoreList.PropTypes = {
	stores: React.PropTypes.object.isRequired
};

export default StoreList;
//export default CSSModules(StoreList, styles);

