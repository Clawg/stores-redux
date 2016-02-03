import React from 'react';
import Button from './../Button';
import StoreInput from './StoreInput.js';
import randomiseMe from '../../misc.js'

function standardFormInputs() {

	return [
		{txt: 'Name', fieldName: 'name'},
		{txt: 'Address', fieldName: 'address'},
		{txt: 'City', fieldName: 'city'},
		{txt: 'Suburb', fieldName: 'suburb'},
		{txt: 'Postcode', fieldName: 'postCode'},
		{txt: 'Phone No.', fieldName: 'phone'}
	]
}

const AddStore = ({ onInputChange, submitStore }) => {

	return (

		<form style={styles.addStoreForm} onSubmit={submitStore}>

			{standardFormInputs().map((value, index) => (

				<StoreInput key={index}
				            text={value.txt}
				            identifier={value.fieldName}
				            onChange={onInputChange}
				            styles={styles} />

			))}

			<div style={styles.row}>
				<label htmlFor="latitude" style={styles.label}>Location</label>
				<div style={styles.inlineBlocked}>
					<input id="latitude" name="latitude" type="text" onChange={onInputChange} placeholder="latitude" style={styles.smallInput} />
					<input id="longitude" name="longitude" type="text" onChange={onInputChange} placeholder="longitude"  style={styles.smallInput} />
				</div>
			</div>

			<Button kind={randomiseMe(['primary', 'warning'])}>Submit</Button>

		</form>
	)


};

AddStore.propTypes = {
	name: React.PropTypes.string.isRequired,
	address: React.PropTypes.string.isRequired,
	city: React.PropTypes.string.isRequired,
	suburb: React.PropTypes.string.isRequired,
	postCode: React.PropTypes.number.isRequired,
	phone: React.PropTypes.string.isRequired,
	latitude: React.PropTypes.number.isRequired,
	longitude: React.PropTypes.number.isRequired
};

AddStore.defaultProps = {
	name: '',
	address: '',
	city: '',
	suburb: '',
	postCode: 0,
	phone: '',
	latitude: 0,
	longitude: 0
};

var styles = {

	row: {
		marginBottom: '10px'
	},


	label: {
		width: '150px',
		color: 'grey',
		display: 'inline-block',
		fontWeight: 'normal',
		fontSize: '16px'
	},


	inlineBlocked: {
		display: 'inline-block'
	},

	smallInput: {
		width: '100px',
		marginRight: '10px'
	},

	addStoreForm: {
		marginBottom: '20px'
	}
}

export default AddStore;


