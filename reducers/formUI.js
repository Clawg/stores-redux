import { combineReducers } from 'redux';
import { INPUT_IS_DISABLED, FETCH_REGION, PASS_STRENGTH } from '../actions/actions';

import deepFreeze from 'deep-freeze';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import Immutable from 'immutable';


//const regions = ['Auckland', 'Bay of Plenty', 'Canterbury', 'Chatham Islands', 'Gisborne', 'Hawkes Bay', 'Manawatu & Wanganui', 'Marlborough', 'Nelson', 'Northland', 'Otago', 'Southland', 'Taranaki', 'Tasman', 'Waikato', 'Wellington', 'West Coast'];

const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981'];

const regions = ['Auckland', 'Northland'];
const towns = {
	auckland: ['Auckland City', 'Franklin', 'Manukau', 'North Shore', 'Papakura', 'Rodney', 'Waitakere'],
	northland: ['Far North', 'Kaipara', 'Whangarei']
}

const initialState = {
	isDisabled: true,
	towns: [],
	regions: regions,
	days: days,
	months: months,
	years: years,
	passwordStrength: 0
}

function formUI (state = initialState, action) {
	switch (action.type) {
		case INPUT_IS_DISABLED:
			const disabled1 = Immutable.fromJS(state);
			const disabled2 = disabled1.set('isDisabled', action.disabledState);
			return disabled2.toJSON();
		case FETCH_REGION:
			//console.log('FETCH_REGION')

			const regionName = action.regionName ? action.regionName.toLowerCase() : undefined;
			const townName = towns[regionName] !== undefined ? towns[regionName] : [];

			const towns1 = Immutable.fromJS(state);
			const towns2 = towns1.set('towns', townName);
			return towns2.toJSON();
		case PASS_STRENGTH:
			console.log('PASS_STRENGTH')


			const passStrength1 = Immutable.fromJS(state);
			const passStrength2 = passStrength1.set('passwordStrength', action.passwordStrength);
			return passStrength2.toJSON();

		default:
			return state
	}
}

export default formUI;