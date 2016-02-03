export const ADD_STORE = 'ADD_STORE';
export const DELETE_STORE = 'DELETE_STORE';
export const ALL_STORES = 'ALL_STORES';
export const EDIT_STORE = 'EDIT_STORE';
export const TOGGLE_STORE = 'TOGGLE_STORE';
export const TOGGLE_ADD_FORM_VISIBILITY = 'TOGGLE_ADD_FORM_VISIBILITY';

export const CREATE_NEW_STORE = 'CREATE_NEW_STORE';
export const RESET_NEW_STORE = 'RESET_NEW_STORE';

export const INPUT_IS_DISABLED = 'INPUT_IS_DISABLED';
export const FETCH_REGION = 'FETCH_REGION';
export const PASS_STRENGTH = 'PASS_STRENGTH';


export function passStrength(passwordStrength) {
	return {
		type: PASS_STRENGTH,
		passwordStrength
	}
}

export function fetchRegion(regionName) {
	return {
		type: FETCH_REGION,
		regionName
	}
}

export function isDisabled(disabledState) {
	return {
		type: INPUT_IS_DISABLED,
		disabledState
	}
}

export function createNewStore(store) {
	return {
		type: CREATE_NEW_STORE,
		store
	}
}

export function resetNewStore() {
	return {
		type: RESET_NEW_STORE
	}
}

export function addStore(store) {
	return {
		type: ADD_STORE,
		store
	}
}

export function allStores(stores) {
	return {
		type: ALL_STORES,
		stores
	}
}

export function deleteStore(id) {
	return {
		type: DELETE_STORE,
		id
	}
}

export function editStore(updateItems) {
	return {
		type: EDIT_STORE,
		updateItems
	}
}

export function toggleStore(id) {
	return {
		type: TOGGLE_STORE,
		id
	}
}

export function toggleAddFormVisibility(visibleState) {

	return {
		type: TOGGLE_ADD_FORM_VISIBILITY,
		visibleState
	}
}

