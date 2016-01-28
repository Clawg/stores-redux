import React from 'react';
import { editStore, toggleStore } from './../../actions/actions';


const handleEdit = (e, props) => {

	const target  = e.target;

	const newValue = {
		id: props.storeDetails.id
	};

	newValue[target.name] = target.value;

	props.dispatch(editStore(newValue))
};

const StoreUpdateForm = (props) => {

	return (
		<form>
			<input onChange={(e) => handleEdit(e, props)} name="name" value={props.storeDetails.name} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="address" value={props.storeDetails.address} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="postCode" value={props.storeDetails.postCode} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="suburb" value={props.storeDetails.suburb} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="city" value={props.storeDetails.city} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="phone" value={props.storeDetails.phone} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="longitude" value={props.storeDetails.longitude} type="text"  /><br />
			<input onChange={(e) => handleEdit(e, props)} name="latitude" value={props.storeDetails.latitude} type="text"  />
			<span onClick={(e) => {e.preventDefault(); props.dispatch(toggleStore(props.storeDetails.id))}}>close</span>
		</form>
	)

};

export default StoreUpdateForm;

