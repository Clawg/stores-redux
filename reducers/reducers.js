import { combineReducers } from 'redux';
import { ADD_STORE, DELETE_STORE, EDIT_STORE, TOGGLE_STORE, ALL_STORES, TOGGLE_ADD_FORM_VISIBILITY } from '../actions/actions';
import storeObj from '../data/stores-small';
import deepFreeze from 'deep-freeze';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import Immutable from 'immutable';


const initialState = {
	stores: storeObj.result,
	addStoreVisibility: {visible: false}
};

function storeReducers(state = initialState, action) {

	switch (action.type) {

		case TOGGLE_ADD_FORM_VISIBILITY:

			// ****************************************
			//  With immutable.js
			// ****************************************

			const isVisible = Immutable.fromJS(state);
			const isVisible2 = isVisible.toJSON();
			isVisible2.addStoreVisibility.visible = action.visibleState;
			return isVisible2;

			// ****************************************
			//  Withput immutable.js
			// ****************************************

			//return Object.assign({}, state, {addStoreVisibility: {visible: action.visibleState}})

			break;

		case ALL_STORES:

			return Object.assign({}, state.stores);

			break;

		case ADD_STORE:

			return Object.assign({}, state, {
					stores: [
						...state.stores,
						{
							name: action.store.name,
							address: action.store.address,
							id: action.store.id,
							city: action.store.city,
							cityId: action.store.cityId,
							crmId: action.store.crmId,
							distance: action.store.distance,
							latitude: action.store.latitude,
							longitude: action.store.longitude,
							phone: action.store.phone,
							postCode: action.store.postCode,
							suburb: action.store.suburb,
							suburbId: action.store.suburbId
						}
					]
				}
			);


			break;

		case DELETE_STORE:

			//
			// Filter out the given store. (filter returns a new array)
			//

			const FilteredObj = state.stores.filter(store =>
					store.id !== action.id
			);


			return Object.assign({}, state, {stores: FilteredObj})


			break;

		case TOGGLE_STORE:

		// ****************************************
		//  With immutable.js
		// ****************************************

			// Get the index of the current store so we know what object to change later
			// Set the current state so it will not be mutated
			// Check the toggle value on this current store and assign the appropriate toggle value to the toggleValue const
			// Create a copy of the immutatable state and update its store value to contain a toggle value
			// Return the JSON object

			const pos = state.stores.map(function(e) {
				return e.id;
			}).indexOf(action.id);

			const store1 = Immutable.fromJS(state);
			const toggleValue = store1.getIn(['stores', pos, 'toggle']) === true ? false : true;
			const store2 = store1.setIn(['stores', pos, 'toggle'], toggleValue);
			return store2.toJSON();


		// ****************************************
		//
		//  Without immutable.js
		//
		// Get the index of the current store so we know what object to change later
		// Find the store using filter, this returns an array of results which in this case should be only 1
		// Determine what the toggleValue is based on the stores current toggle value
		// Modify/update the store, adding a toggle to it.  Note how we use Object.assign to create a new version of this object.  If we don't the state will be mutated
		// Return and build the stores array.  This requires taking a slice of the array before and after the updated store item,
		// then piecing it all back together an a non mutated object, using the Object.assign for the mutated part
		//
		// ****************************************

			/*
			const pos = state.stores.map(function(e) {
				return e.id;
			}).indexOf(action.id);

			const filterdStore = state.stores.filter(store =>
				store.id === action.id
			);

			const toggleValue = filterdStore[0].toggle === true ? false : true;
			const modifyStore =  Object.assign({}, filterdStore[0], {toggle:toggleValue});

			return {
				stores: [
					...state.stores.slice(0, pos),                          // Bit of array before modified object
					Object.assign({}, state.stores[pos], modifyStore),      // Modified object
					...state.stores.slice(pos + 1)                          // Bit after array after modified object
				]
			}

			*/

			break;

		case EDIT_STORE:

		// ****************************************
		//
		//  With immutable.js
		//
		// Make the original state immutable, then copy it to a new one converting it to JSON
		// Map over the stores updating the copy for the matching store id with the key/values passed from the submitted form via the actions.updateItems
		//
		// ****************************************


			const editState = Immutable.fromJS(state);
			const editState2 = editState.toJSON();

			editState2.stores.map(function (value) {
				if(value.id === action.updateItems.id) {
					Object.keys(action.updateItems).forEach((key) => {
						value[key] = action.updateItems[key];
					});
				}
			});

			return editState2;



		// ****************************************
		//
		//  Without immutable.js
		//
		// Find the store using filter, this will return an array with a single object
		// Get position of store in array so we can add it back in at the correct place
		// Use Object assign to create a unique copy of the store so we can mutate it, assigning to the storeCopy const
		// Loop over action.updateItems object assigning its key/values to storeCopy
		// Return the stores array, creating an array which represents the items before the mutated item, the mutated item and the items after.
		// Note the use of object assign when placing the mutated object back into the new array
		//
		// ****************************************

			/*
			const filterdEditStore = state.stores.filter(store =>
					store.id === action.updateItems.id
			);

			const editItemPos = state.stores.map((e) =>
				e.id
			).indexOf(action.updateItems.id);

			const storeCopy =  Object.assign({}, filterdEditStore[0]);
			Object.keys(action.updateItems).forEach((key) => {
				storeCopy[key] = action.updateItems[key]
			});

			return {
				stores: [
					...state.stores.slice(0, editItemPos),                          // Bit of array before modified object
					Object.assign({}, state.stores[editItemPos], storeCopy),        // Modified object
					...state.stores.slice(editItemPos + 1)                          // Bit after array after modified object
				]
			}
			*/

			break;

		default:
			return state
	}
}


// *******************************************************************************************
// UNIT TESTS USING EXPECT LIB
// *******************************************************************************************

	// ************************************************************************************
	// Change the toggle state of the 'add store form', making sure we dont mutate the date
	// ************************************************************************************

	const testToggleAddStoreForm = () => {

		const toggledTrueState = {stores:[],addStoreVisibility:{visible: true}}
		const toggledFalseState = {stores:[],addStoreVisibility:{visible: false}}

		const defaultState = {
			stores: [],
			addStoreVisibility: {visible: false}
		};

		deepFreeze(defaultState);

		// Add Toggle to item
		const showForm = storeReducers(defaultState, {type: 'TOGGLE_ADD_FORM_VISIBILITY', visibleState: true});
		expect(showForm).toEqual(toggledTrueState);

		const hideForm = storeReducers(defaultState, {type: 'TOGGLE_ADD_FORM_VISIBILITY', visibleState: false});
		expect(hideForm).toEqual(toggledFalseState);

		const noChangeForm = storeReducers(defaultState, {type: 'TOGGLE_ADD_FORM_VISIBILITY', visibleState: false});
		expect(noChangeForm).toEqual(toggledFalseState);

	};


	// *******************************************************************************************
	// Add Store
	// *******************************************************************************************


		const hasDefaultValue = {"stores":[{"name":"Test store","id":1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};

		// Add Test data

		const addedItem5 = {"stores":[{"name":"Test store","id":1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4},{address: 'Test street', city: 'Test town', cityId: 666, crmId: 666, distance: null, id: 5, latitude: -42, longitude: 32, name: 'Test store 5', phone: '123456789', postCode: '0000', suburb: 'Testville', suburbId: 666 }]};
		const addedItem6 = {"stores":[{"name":"Test store","id":1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4},{address: 'Test street', city: 'Test town', cityId: 666, crmId: 666, distance: null, id: 5, latitude: -42, longitude: 32, name: 'Test store 5', phone: '123456789', postCode: '0000', suburb: 'Testville', suburbId: 666 },{address: 'Test street', city: 'Test town', cityId: 666, crmId: 666, distance: null, id: 6, latitude: -42, longitude: 32, name: 'Test store 5', phone: '123456789', postCode: '0000', suburb: 'Testville', suburbId: 666 }]};


		// ******************************
		// default state is NEVER mutated
		// ******************************

		const testAddMutations = () => {

			const testStore =  {"result":[{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			deepFreeze(defaultState);

			// Add a 5 item and check the default state too
			const addItem = storeReducers(defaultState, {type: 'ADD_STORE', store: {address: 'Test street', city: 'Test town', cityId: 666, crmId: 666, distance: null, id: 5, latitude: -42, longitude: 32, name: 'Test store 5', phone: '123456789', postCode: '0000', suburb: 'Testville', suburbId: 666 }});
			expect(addItem).toEqual(addedItem5);
			expect(defaultState).toEqual(hasDefaultValue);

			// Add a 6 item and check the default state too
			const addItem2 = storeReducers(addItem, {type: 'ADD_STORE', store: {address: 'Test street', city: 'Test town', cityId: 666, crmId: 666, distance: null, id: 6, latitude: -42, longitude: 32, name: 'Test store 5', phone: '123456789', postCode: '0000', suburb: 'Testville', suburbId: 666 }});
			expect(addItem2).toEqual(addedItem6);
			expect(defaultState).toEqual(hasDefaultValue);


		};

	// *******************************************************************************************
	// Edit Store
	// *******************************************************************************************


		// Edit Test data
		const hasEditName2 = {"stores":[{"name":"Test store","id":1},{"name":"New shop name 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
		const hasEditName2_4 = {"stores":[{"name":"Test store","id":1},{"name":"New shop name 2","id":2},{"name":"Test store 3","id":3},{"name":"New shop name 4","id":4}]};


		// ******************************
		// default state is NEVER mutated
		// ******************************

		const testEditMutations = () => {

			const testStore =  {"result":[{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			deepFreeze(defaultState);

			// Add Toggle to item AND test if its been added and check the default state has not been modified
			const editItem = storeReducers(defaultState, {type: 'EDIT_STORE', updateItems: {name: 'New shop name 2', id: 2}});
			expect(editItem).toEqual(hasEditName2);
			expect(defaultState).toEqual(hasDefaultValue);


			// Add Toggle to item AND test if its been added and check the default state has not been modified
			const editItem2 = storeReducers(editItem, {type: 'EDIT_STORE', updateItems: {name: 'New shop name 4', id: 4}});
			expect(editItem2).toEqual(hasEditName2_4);
			expect(defaultState).toEqual(hasDefaultValue);

		};

	// *******************************************************************************************
	// Delete Store
	// *******************************************************************************************

		// Delete Test data
		const item2Deleted = {"stores":[{"name":"Test store","id":1},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
		const item2_4Deleted = {"stores":[{"name":"Test store","id":1},{"name":"Test store 3","id":3}]};


		// ************************************************************
		// Make sure item is deleted AND default state is NEVER mutated
		// ************************************************************

		const testDeleteMutations = () => {

			const testStore =  {"result":[{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			deepFreeze(defaultState);

			// Add Toggle to item AND test if its been added and check the default state has not been modified
			const delete2 = storeReducers(defaultState, {type: 'DELETE_STORE', id:2});
			expect(delete2).toEqual(item2Deleted);
			expect(defaultState).toEqual(hasDefaultValue);


			// Add Toggle to item AND test if its been added and check the default state has not been modified
			const delete4 = storeReducers(delete2, {type: 'DELETE_STORE', id:4});
			expect(delete4).toEqual(item2_4Deleted);
			expect(defaultState).toEqual(hasDefaultValue);

		};

	// *******************************************************************************************
	// Toggle Store
	// *******************************************************************************************

		// Toggle Test data


		const hasFalseValue = {"stores":[{"name":"Test store","id":1},{"name":"Test store 2","id":2,"toggle":false},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
		const hasTrueValue = {"stores":[{"name":"Test store","id":1},{"name":"Test store 2","id":2,"toggle":true},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};


		// ****************************************
		// Make sure default state is NEVER mutated
		// ****************************************

		const testToggleMutations = () => {
			const testStore =  {"result":[{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			deepFreeze(defaultState);

			// Add Toggle to item AND test if its been added and check the default state has not been modified
			const updatedState = storeReducers(defaultState, {type: 'TOGGLE_STORE', id:2});
			expect(updatedState).toEqual(hasTrueValue);
			expect(defaultState).toEqual(hasDefaultValue);

			// Toggle true to false AND test if its been added and check the default state has not been modified
			const toggleFalse = storeReducers(updatedState, {type: 'TOGGLE_STORE', id:2});
			expect(toggleFalse).toEqual(hasFalseValue);
			expect(defaultState).toEqual(hasDefaultValue);

			// Toggle false to true AND test if its been added and check the default state has not been modified
			const toggleTrue = storeReducers(toggleFalse, {type: 'TOGGLE_STORE', id:2});
			expect(toggleTrue).toEqual(hasTrueValue);
			expect(defaultState).toEqual(hasDefaultValue);

		};

		// ***************************************************************************
		// Follow the mutation, and then check at the end that default has not mutated
		// ***************************************************************************

		const testToggle = () => {

			const testStore =  {"result":[{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			deepFreeze(defaultState);

			// Add Toggle to item
			const addToggle = storeReducers(defaultState, {type: 'TOGGLE_STORE', id:2});
			expect(addToggle).toEqual(hasTrueValue);

			// Toggle true to false
			const toggleFalse = storeReducers(addToggle, {type: 'TOGGLE_STORE', id:2});
			expect(toggleFalse).toEqual(hasFalseValue);

			// Toggle false to true
			const toggleTrue = storeReducers(toggleFalse, {type: 'TOGGLE_STORE', id:2});
			expect(toggleTrue).toEqual(hasTrueValue);

			expect(defaultState).toEqual(hasDefaultValue);

		};

		// ***********************************************************************
		// The default toggle will have a false value, so it should toggle to true
		// ***********************************************************************

		const testDefaultFalseToggle = () => {

			const testStore = {"result": [{name: "Test store", id: 1},{"name":"Test store 2","id":2,toggle: false},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {stores: testStore.result}

			// Add Toggle to item
			var changeFalseToggle = storeReducers(defaultState, {type: 'TOGGLE_STORE', id: 2});

			deepFreeze(defaultState);

			expect(changeFalseToggle).toEqual(hasTrueValue);

		};

		// ***********************************************************************
		// The default toggle will have a true value, so it should toggle to false
		// ***********************************************************************


		const testDefaultTrueToggle = () => {

			const testStore = {"result": [{name: "Test store", id: 1},{"name":"Test store 2","id":2, toggle: true},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {stores: testStore.result}

			// Add Toggle to item
			var changeTrueToggle = storeReducers(defaultState, {type: 'TOGGLE_STORE', id: 2});

			expect(changeTrueToggle).toEqual(hasFalseValue);

		};

		// *********************************************************************
		// Pass in a action that is not available so should return default state
		// *********************************************************************

		const testDefaultToggle = () => {
			const testStore = {"result": [{name: "Test store", id: 1},{"name":"Test store 2","id":2},{"name":"Test store 3","id":3},{"name":"Test store 4","id":4}]};
			const defaultState = {
				stores: testStore.result
			};

			const noAction = storeReducers(defaultState, {type: 'NO_ACTION', id: 2});
			expect(noAction).toEqual(hasDefaultValue);
		};

testToggleAddStoreForm();
testAddMutations();
testEditMutations();
testDeleteMutations();
testToggleMutations();
testToggle();
testDefaultFalseToggle();
testDefaultTrueToggle();
testDefaultToggle();

console.log('test passed')

//export default function todos(state = [], action) {
//	switch (action.type) {
//		case 'ADD_TODO':
//			return state.concat([ action.text ])
//		default:
//			return state
//	}
//}

//
//const reducers = combineReducers({
//	stores,
//	todos
//});



//console.log('reducer')
//console.log(storeApp)
export default storeReducers;
//export default storeApp;