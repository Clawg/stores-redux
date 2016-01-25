import React from 'react';
import update from 'react-addons-update';


class AddStore extends React.Component {

	constructor() {
		super();

		let uniqid = Date.now();

		this.state = {
			name: '',
			address: ''//,
			//id: uniqid
		};

	}



	handleChange(e) {
		const target  = e.target;
		let inputState = {};
		inputState[target.id] = target.value;
		this.setState(inputState);
	}

	handleSubmit(e) {
		e.preventDefault();

		let uniqid = Date.now();

		var newState = this.state;
		newState.id = uniqid;

		this.props.onStoreAdd(this.state);
	}



	render() {

		var row = {
			marginBottom: '10px'
		};

		var label = {
			width: '150px',
			color: 'grey',
			display: 'inline-block',
			fontWeight: 'normal',
			fontSize: '16px'
		};

		var inlineBlocked = {
			display: 'inline-block'
		}

		var smallInput = {
			width: '100px',
			marginRight: '10px'
		}

		return (
			<form onSubmit={(e) => this.handleSubmit(e)}>

				<div style={row}>
					<label htmlFor="name" style={label}>Name</label>
					<input id="name" name="name" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="address" style={label}>Address</label>
					<input id="address" name="address" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="city" style={label}>City</label>
					<input id="city" name="city" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="city" style={label}>Suburb</label>
					<input id="suburb" name="suburb" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="postCode" style={label}>Post code</label>
					<input id="postCode" name="postCode" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="phone" style={label}>Phone number</label>
					<input id="phone" name="phone" type="text" onChange={(e) => this.handleChange(e)} />
				</div>
				<div style={row}>
					<label htmlFor="latitude" style={label}>Location</label>
					<div style={inlineBlocked}>
						<input id="latitude" name="latitude" type="text" onChange={(e) => this.handleChange(e)} placeholder="latitude" style={smallInput} />
						<input id="longitude" name="longitude" type="text" onChange={(e) => this.handleChange(e)} placeholder="longitude"  style={smallInput} />
					</div>
				</div>

				<input type="submit" />
			</form>
		)
	}
}

export default AddStore;


