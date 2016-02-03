import React from 'react';

const StoreEditForm = ({storeDetails, editStore, toggleStore}) => {

	return (
		<form>
			<input onChange={editStore} name="name" value={storeDetails.name} type="text"  /><br />
			<input onChange={editStore} name="address" value={storeDetails.address} type="text"  /><br />
			<input onChange={editStore} name="postCode" value={storeDetails.postCode} type="text"  /><br />
			<input onChange={editStore} name="suburb" value={storeDetails.suburb} type="text"  /><br />
			<input onChange={editStore} name="city" value={storeDetails.city} type="text"  /><br />
			<input onChange={editStore} name="phone" value={storeDetails.phone} type="text"  /><br />
			<input onChange={editStore} name="longitude" value={storeDetails.longitude} type="text"  /><br />
			<input onChange={editStore} name="latitude" value={storeDetails.latitude} type="text"  />
			<span onClick={toggleStore}>close</span>
		</form>
	)

};

//<span onClick={(e) => {e.preventDefault(); props.dispatch(toggleStore(storeDetails.id))}}>close</span>

export default StoreEditForm;

