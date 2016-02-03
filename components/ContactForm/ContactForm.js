import React, {Component, PropTypes} from 'react';
import InputElement from 'react-input-mask';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import { isDisabled, fetchRegion, passStrength } from './../../actions/actions';
//var InputPassword = require('react-ux-password-field');
import PasswordStrengthMeter from 'react-password-strength-meter';

//import PasswordStrengthMeter from '../PasswordStrenghtIdicator';

import './ContactForm.css';

//import { townsRelatedToRegions  } from './../../actions/actions';
//const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//const years = ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981'];



const validate = (values, someit) => {


	console.log(values)


	const requiredTxt = 'Required';
	const errors = {};


	//
	// Email validation rules
	//

	if (!values.email) {
		errors.email = requiredTxt;
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	//
	// First name validation rules
	//

	if (!values.firstName) {
		errors.firstName = requiredTxt;
	} else if (values.firstName.length < 2) {
		errors.firstName = 'Must be more than a single character';
	}

	//
	// Last name validation rules
	//

	if (!values.lastName) {
		errors.lastName= requiredTxt;
	} else if (values.lastName.length < 2) {
		errors.lastName = 'Must be more than a single character';
	}


	//
	// Password validation rules
	//

	// Todo
	// Password must contain a number and be between 8 and 30 chars
	// Email adddress pattern - /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/; email check
	// Check first and last name only contains letters or numbers - /^[a-z\s]+$/i;

	if (!values.password) {
		errors.password = requiredTxt;
	}

	//
	// Bank account validaiton rules
	//

	if (!values.bankaccount) {
		errors.bankaccount= requiredTxt;
	} else if (isNaN(Number(values.bankaccount))) {
		errors.bankaccount = 'Must be a number';
	} else if (Number(values.bankaccount) < 18) {
		errors.age = 'Sorry, you must be at least 18 years old';
	}

	//
	// Gender validation rules
	//

	if (!values.gender) {
		errors.gender = requiredTxt;
	}
	//if (!values.age) {
	//	errors.age = 'Required';
	//} else if (isNaN(Number(values.age))) {
	//	errors.age = 'Must be a number';
	//} else if (Number(values.age) < 18) {
	//	errors.age = 'Sorry, you must be at least 18 years old';
	//}



	//if(!values.region) {
	//	this.setState({disableLocation, })
	//}
	//
	////
	// Date of birth validation rules
	//
	// With DOB we need to construct a date from the selected dropdowns, populating a hidden from filed
	// This is the field we are interested in being valid
	//

	const dateArray = [];
	values.dob = '';

	if (!values.dobDay) {
		errors.dobDay = true;
		errors.dob = requiredTxt;
	} else {
		dateArray[0] = values.dobDay;
	}

	if (!values.dobMonth) {
		errors.dobMonth = true;
		errors.dob = requiredTxt;
	} else {
		dateArray[1] = values.dobMonth;
	}

	if (!values.dobYear) {
		errors.dobYear = true;
		errors.dob = requiredTxt;
	} else {
		dateArray[2] = values.dobYear;
	}

	if (dateArray[0] !== undefined && dateArray[1] !== undefined && dateArray[2] !== undefined) {
		const newDob = new Date(dateArray[2] +'-'+ dateArray[1] +'-'+  dateArray[0]);
		values.dob = newDob;
	}


	if (!values.region) {
		errors.region = requiredTxt;
		someit.dispatch(fetchRegion())
		someit.dispatch(isDisabled(true))
	} else {
		someit.dispatch(fetchRegion(values.region))
		someit.dispatch(isDisabled(false))
	}





	return errors;
};


const updatePassStatus2 = function(oldVal, newVal) {
	console.log(oldVal, newVal)
}

class ContactForm extends Component {

	constructor() {
		super()
	}

	//constructor(props) {
	//	super(props);
	//	//this.state = {
	//		passwordStrength: 0,
	//		//disableLocation: true
	//	}
	//
	//}


	updatePassStatus(oldVal, newVal) {
		console.log('updatePassStatus');
		console.log(oldVal)
		console.log(newVal)

		//var input = this.refs.myInput;
		//console.log(this.refs.myInput)
		//var inputValue = input.value;

		//console.log(oldVal)
		//console.log(newVal)
		//console.log(newVal)
		//this.setState({passwordStrength: newVal})
		//console.log(dispatch)
		this.props.dispatch(passStrength(newVal))
	}



	//handleLocationFetch(e) {
	//	const target = e.target;
	//	const region = target.value;
	//	//console.log(region)
	//
	//}

	//getState(select = state => state) {
	//	return select(this.state);
	//}

	onChange(event){
		console.log(event)
	}

	render() {

		const {
			fields: {
					email, 
					firstName, 
					lastName,
					password,
					dob,
					dobDay,
					dobMonth,
					dobYear,
					promoResults, 
					promoJPotReminder, 
					jackpotReached, 
					promoIK, 
					region, 
					location, 
					gender, 
					phone, 
					bankaccount, 
					securityQuestion, 
					securityAnswer,
					favoriteColor
				},
				handleSubmit,
				resetForm,
				submitting,
				isDisabled,
				load,
				dispatch
			} = this.props;


			//const { dispatch, storeList, formVisible } = this.props;

			//console.log(dispatch)
			//console.log(this.props)

//console.log('this.props')
//console.log(this.props)
//console.log(this.props.extForm)

		//console.log(this.props.formUI)

		return (<form onSubmit={handleSubmit} className="contact-form">

				<div className={email.touched && email.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="email">Email</label>
					<div>
						<input id="email" type="email" placeholder="Email" {...email}/>
					</div>
					{email.touched && email.error && <div className="error">{email.error}</div>}
				</div>
				
				<div className={firstName.touched && firstName.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="firstName">First Name</label>
					<div>
						<input id="firstName" type="text" placeholder="First Name" {...firstName}/>
					</div>
					{firstName.touched && firstName.error && <div className="error">{firstName.error}</div>}
				</div>

				<div className={lastName.touched && lastName.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="lastName">Last Name</label>
					<div>
						<input id="lastName" type="text" placeholder="Last Name" {...lastName}/>
					</div>
					{lastName.touched && lastName.error && <div className="error">{lastName.error}</div>}
				</div>

				<div className={password.touched && password.error ? 'row password-row password-row-error': 'row password-row'}>
					<label className="hide" htmlFor="password">Password</label>
					<div className={'password-strength-' + this.props.formUI.passwordStrength}>
						{/*<input id="password" type="password" placeholder="Password" {...password}/>*/}
						{/*<InputPassword id="password" type="password" placeholder="Password" {...password} changeCb={(newVal, oldVal) => this.updatePassStatus(newVal, oldVal)}  />*/}
						<PasswordStrengthMeter
							passwordText={"Password"}
							{...password} />
					</div>
					<p className="input-helper-text">Passwords should be 8-30 characters and contain atleast 1 number.</p>
					{password.touched && password.error && <div className="error">{password.error}</div>}
				</div>

				<div className="row">

					<div className={dobDay.touched && dobDay.error ? 'select-block select-block-error': 'select-block'}>
						<label className="hide" htmlFor="dobDay">Day</label>
						<div>
							<select {...dobDay} value={dobDay.value || ''}>
								<option value="">Day</option>
								{this.props.formUI.days.map(day => <option id="dobDay" value={day} key={day}>{day}</option>)}
							</select>
						</div>
					</div>

					<div className={dobMonth.touched && dobMonth.error ? 'select-block select-block-error': 'select-block'}>
						<label className="hide" htmlFor="dobMonth">Month</label>
						<div>
							<select {...dobMonth} value={dobMonth.value || ''}>
								<option value="">Month</option>
								{this.props.formUI.months.map(month => <option id="dobMonth" value={month} key={month}>{month}</option>)}
							</select>
						</div>
					</div>

					<div className={dobYear.touched && dobYear.error ? 'select-block select-block-error': 'select-block'}>
						<label className="hide" htmlFor="dobMonth">Year</label>
						<div>
							<select {...dobYear} value={dobYear.value || ''}>
								<option value="">Year</option>
								{this.props.formUI.years.map(year => <option id="dobYear" value={year} key={year}>{year}</option>)}
							</select>
						</div>
					</div>

					<input id="dob" type="hidden" placeholder="Email" {...dob}/>
					{dob.touched && dob.error && <div className="error">{dob.error}</div>}


				</div>



				<div className="row-block">
					<h2 className="fake-label">Email preferences</h2>
					<div className="row">
						<label htmlFor="promoJPotReminder">
							<input id="promoJPotReminder" type="checkbox" {...promoJPotReminder}/> <span className="check-radio-fakelabel">Results + Promotions</span>
						</label>
					</div>

					<div className="row">
						<label htmlFor="jackpotReached">
							<input id="jackpotReached" type="checkbox" {...jackpotReached}/> <span className="check-radio-fakelabel">Jackpots reminders + Promotions</span>
						</label>

						<label>Tell me when the jackpot reaches:</label>
						<div>
							<select {...dobYear} value={dobYear.value || ''}>
								<option value="">Year</option>
								{this.props.formUI.years.map(year => <option id="dobYear" value={year} key={year}>{year}</option>)}
							</select>
						</div>

					</div>

					<div className="row">
						<label htmlFor="promoIK">
							<input id="promoIK" type="checkbox" {...promoIK}/> <span className="check-radio-fakelabel">IK Reminders</span>
						</label>
					</div>

				</div>


				<div className="row-block">
					<label className="hide" htmlFor="region">Region</label>
					<div className="row">
						<select {...region} >
							<option value="">Region</option>
							{this.props.formUI.regions.map(region => <option id="region" value={region} key={region}>{region}</option>)}
						</select>
					</div>
					<div className="row">
						<select {...location} value={location.value || ''} disabled={this.props.formUI.isDisabled ? 'disabled' : null}>
							<option value="">Location</option>
							{this.props.formUI.towns.map(location => <option id="location" value={location} key={location}>{location}</option>)}
						</select>
					</div>
				</div>



				<div className={gender.touched && gender.error ? 'row row-error': 'row'}>
					<label>Gender</label>
					<div>
						<label htmlFor="gender-male" className="inline-label">
							<input id="gender-male" type="radio" {...gender} value="male" checked={gender.value === 'male'}/> Male
						</label>
						<label htmlFor="gender-female" className="inline-label">
							<input id="gender-female" type="radio" {...gender} value="female" checked={gender.value === 'female'}/> Female
						</label>
					</div>
					{gender.touched && gender.error && <div><br /><div className="error cleft">{gender.error}</div></div>}
				</div>

				<div className={phone.touched && phone.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="phone">phone</label>
					<div>
						<input id="phone" type="phone" placeholder="phone" {...phone}/>
					</div>
					{phone.touched && phone.error && <div className="error">{phone.error}</div>}
				</div>

				<div className={bankaccount.touched && bankaccount.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="bankaccount">Bank account number</label>
					<div>
						<InputElement className="fakeinput" mask="9999-9999-9999-9999" placeholder="0000-0000-0000-0000" defaultValue="29-00-2016" {...bankaccount} />
					</div>
					{bankaccount.touched && bankaccount.error && <div className="error">{bankaccount.error}</div>}
				</div>

				<div className={securityQuestion.touched && securityQuestion.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="securityQuestion">Bank account number</label>
					<div>
						<input id="securityQuestion" type="securityQuestion" placeholder="0000-0000-0000-0000" {...securityQuestion}/>
					</div>
					{securityQuestion.touched && securityQuestion.error && <div className="error">{securityQuestion.error}</div>}
				</div>

				<div className={securityAnswer.touched && securityAnswer.error ? 'row row-error': 'row'}>
					<label className="hide" htmlFor="securityAnswer">Bank account number</label>
					<div>
						<input id="securityAnswer" type="securityAnswer" placeholder="0000-0000-0000-0000" {...securityAnswer}/>
					</div>
					{securityAnswer.touched && securityAnswer.error && <div className="error">{securityAnswer.error}</div>}
				</div>				
				
				
				{/*
				



				<div className="row">
					<label>Favorite Color</label>
					<div>
						<select

							{...favoriteColor}
							value={favoriteColor.value || ''}  // required syntax for reset form to work
							// undefined will not change value to first empty option
							// when resetting
						>
							<option></option>
							<option value="ff0000">Red</option>
							<option value="00ff00">Green</option>
							<option value="0000ff">Blue</option>
						</select>
					</div>
				</div>
				<div className="row">
					<label>
						<input type="checkbox" {...employed}/> Employed
					</label>
				</div>
				<div className="row">
					<label>Notes</label>
					<div>
            <textarea
	            {...notes}
	            value={notes.value || ''} // required for reset form to work (only on textarea's)
	            // see: https://github.com/facebook/react/issues/2533
            />
					</div>
				</div>

				*/}

				<div className="row">
					<button type="submit" disabled={submitting}>
						{submitting ? <i/> : <i/>} Submit
					</button>
					<button type="button" disabled={submitting} onClick={resetForm}>
						Clear Values
					</button>
				</div>
			</form>
		);
	}
}

ContactForm.propTypes = {
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	resetForm: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
};



ContactForm = reduxForm({
		form: 'simple',
		fields: ['favoriteColor', 'email', 'firstName', 'lastName', 'password', 'dob', 'dobDay', 'dobMonth', 'dobYear', 'promoResults', 'promoJPotReminder', 'jackpotReached', 'promoIK', 'region', 'location', 'gender', 'phone', 'bankaccount', 'securityQuestion', 'securityAnswer'],
		validate
})(ContactForm);



export default ContactForm;

//
//var styles = {
//
//	row: {
//		overflow: 'hidden',
//		borderBottom: 'solid 1px #f5f5f5',
//		padding: '10px'
//	},
//
//	label: {
//		display: 'block',
//		width: '40%',
//		float: 'left'
//	},
//
//	input: {
//		display: 'block',
//		width: '50%',
//		float: 'left'
//	}
//
//}