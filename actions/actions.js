export const ADD_STORE = 'ADD_STORE';
export const DELETE_STORE = 'DELETE_STORE';
export const ALL_STORES = 'ALL_STORES';
export const EDIT_STORE = 'EDIT_STORE';
export const TOGGLE_STORE = 'TOGGLE_STORE';
export const TOGGLE_ADD_FORM_VISIBILITY = 'TOGGLE_ADD_FORM_VISIBILITY';

export function bs(store) {
	return {
		type: BS,
		store
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

