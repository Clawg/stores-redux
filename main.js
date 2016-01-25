import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import storeApp from './reducers/reducers';
import App from './app';

import { Router, Route } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'


class AllStores extends React.Component {
	render() {
		//console.log('AllStores')
		return (<div>Foo</div>)
	}
}


class EditStore extends React.Component {
	render() {
		//console.log('EDIT Stores')
		return (<div>Edit store</div>)
	}
}


//
// Combine the routing reducer from redux-router and the stores reducers
//

//const reducer = combineReducers({
//	stores: storeApp,
//	routing: routeReducer
//});
//
//const history = createHistory();
//const store = createStore(reducer);
//
//syncReduxAndRouter(history, store);

//ReactDOM.render(
//		<Provider store={store}>
//			<Router history={history}>
//				<Route path="/" component={App}>
//					<Route path="all" component={AllStores}/>
//					<Route path="edit" component={EditStore}/>
//				</Route>
//			</Router>
//		</Provider>,
//		document.getElementById('app')
//)

const store = createStore(storeApp);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);