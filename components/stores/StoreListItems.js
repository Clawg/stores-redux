import React from 'react';
import StoreEditForm from './StoreUpdateForm.js';
import { deleteStore, toggleStore } from './../../actions/actions';

var styles = {
	even: {
		backgroundColor: '#fffaaa'
	},
	odd: {
		backgroundColor: '#fffccc'
	}
}

const StoreListItems = (props) => {
	
		return (
			<li style={styles[props.tigerStripe]}>
				{props.storeDetails.toggle ?

					<StoreEditForm
						storeDetails={props.storeDetails}
						dispatch={props.dispatch}/>

					:

					<div>{props.storeDetails.name}, {props.storeDetails.address}
						{props.showEdits ?
							<span>
								<a href="#" onClick={(e) => {e.preventDefault(); props.dispatch(toggleStore(props.storeDetails.id))}}>Edit</a>
								<a href="#" onClick={(e) => {e.preventDefault(); props.dispatch(deleteStore(props.storeDetails.id))}}>X</a>
							</span> : null}
					</div>}
			</li>
		)

};

export default StoreListItems;