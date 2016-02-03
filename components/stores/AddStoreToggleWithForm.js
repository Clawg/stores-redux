import React from 'react';
import AddStore from './AddStore';

const AddStoreToggleWithForm = ({formVisible, submitStore, onInputChange, toggleAddForm, newStore}) => {

		return (
			<div>
				<ul>

					{formVisible.visible ?
						<li><a href="#" onClick={toggleAddForm}> - </a></li>
						:
						<li><a href="#" onClick={toggleAddForm}> + </a></li>
					}
				</ul>

				{formVisible.visible ? <AddStore
					newStore={newStore}
					submitStore={submitStore}
					onInputChange={onInputChange}
				/>
					: null}

			</div>
		)


}

export default AddStoreToggleWithForm;

