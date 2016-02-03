import React from 'react';
import StoreEditForm from './StoreUpdateForm.js';

var styles = {
	even: {
		backgroundColor: '#fffaaa'
	},
	odd: {
		backgroundColor: '#fffccc'
	}
}

const StoreListItems = ({storeDetails, toggleStore, tigerStripe, showEdits, editStore, deleteStore}) => {

	return (
		<li style={styles[tigerStripe]}>

			{storeDetails.toggle ?

				<StoreEditForm
		            storeDetails={storeDetails}
		            toggleStore={toggleStore}
					editStore={editStore}
		            />
		    :

		    <div>{storeDetails.name}, {storeDetails.address}
		        {showEdits ?
		            <span>
		                <a href="#" onClick={toggleStore}>Edit me</a>
			            <a href="#" onClick={deleteStore}>X</a>
		            </span> : null}
		    </div>}

		 </li>
	)

};

export default StoreListItems;