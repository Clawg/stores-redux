import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm.js';
import { isDisabled, fetchRegion, passStrength } from './../../actions/actions';


class Contact extends React.Component {

	render() {

		const {dispatch, formUI, onCheckDisabledClick, onRegionChange, onPasswordChange} = this.props;

		return (
			<div>
				<ContactForm
					onSubmit={data => {console.log(data);}}
					formUI={formUI}
					checkDisabled={(e) => {e.preventDefault(); onCheckDisabledClick(store.id)}}
					region={(e) => {e.preventDefault(); onRegionChange(store.id)}}
					passwordStrength={(e) => {e.preventDefault(); onPasswordChange(store.id)}}
					dispatch={dispatch}

				/>
			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		formUI: state.formUI
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onCheckDisabledClick: (id) => {
			dispatch(isDisabled(id));
		},

		onRegionChange: (id) => {
			dispatch(fetchRegion(id));
		},

		onPasswordChange: (id) => {
			dispatch(passStrength(id));
		},

		dispatch: dispatch

	}

}

export default connect(
	mapStateToProps,
	mapDispatchToProps)
(Contact)

