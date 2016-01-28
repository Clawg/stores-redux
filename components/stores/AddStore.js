import React from 'react';
import update from 'react-addons-update';
import Button from './../Button';
import { addStore } from './../../actions/actions';
import StoreInput from './StoreInput.js';



class AddStore extends React.Component {

	constructor() {
		super();

		// We have a local state, independent of the redux store state.
		// This allows us to handle the onchange event and we only update teh redux store onSubmit which
		// should be when a form is fully valid

		this.state = {
			name: '',
			address: '',
			city: '',
			suburb: '',
			postCode: null,
			phone: '',
			latitude: null,
			longitude: null
		};
	}



	handleChange(e) {
		const target  = e.target;
		const inputState = {};
		inputState[target.id] = target.value;
		this.setState(inputState);
	}

	handleSubmit(e) {
		e.preventDefault();
		const uniqid = Date.now();
		const newState = this.state;
		newState.id = uniqid;
		this.props.dispatch(addStore(newState))
	}

	randomButtonStyleGenerator() {
		const buttonClassName = ['primary', 'warning'];
		const rand = buttonClassName[Math.floor(Math.random() * buttonClassName.length)];
		return rand;
	}

	standardFormInputs() {

		const formInputs = [
			{txt: 'Name', fieldName: 'name'},
			{txt: 'Address', fieldName: 'address'},
			{txt: 'City', fieldName: 'city'},
			{txt: 'Suburb', fieldName: 'suburb'},
			{txt: 'Postcode', fieldName: 'postCode'},
			{txt: 'Phone No.', fieldName: 'phone'}
		]

		return formInputs;
	}


	render() {




		return (
			<form style={styles.addStoreForm} onSubmit={(e) => this.handleSubmit(e)}>

				{this.standardFormInputs().map((value, index) => (

					<StoreInput key={index}
					            text={value.txt}
					            identifier={value.fieldName}
					            onChange={(e) => this.handleChange(e)}
					            styles={styles} />

				))}


				<div style={styles.row}>
					<label htmlFor="latitude" style={styles.label}>Location</label>
					<div style={styles.inlineBlocked}>
						<input id="latitude" name="latitude" type="text" onChange={(e) => this.handleChange(e)} placeholder="latitude" style={styles.smallInput} />
						<input id="longitude" name="longitude" type="text" onChange={(e) => this.handleChange(e)} placeholder="longitude"  style={styles.smallInput} />
					</div>
				</div>

				<Button kind={this.randomButtonStyleGenerator()}>Submit</Button>

			</form>
		)
	}
}

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

//export default Radium(AddStore);
export default AddStore;


