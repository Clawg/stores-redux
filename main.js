import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {reducer as formReducer} from 'redux-form';


import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';


import storeReducers from './reducers/reducers';
import formUI from './reducers/formUI';

// Routes
import Foo from './components/Foo.js';
import Bar from './components/Bar.js';


import App from './app';
	import Contact from './components/ContactForm/Contact.js';
	import Stores from './components/stores/Stores.js';
		import StoresList from './components/stores/StoresList.js';
		import StoresUpdate from './components/stores/StoresUpdate.js';



//
// Combine the routing reducer from redux-router and the stores reducers
//

const reducer = combineReducers(Object.assign({}, {
	routing: routeReducer,
	stores: storeReducers,
	form: formReducer,
	formUI: formUI
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const appStateStore = createStoreWithMiddleware(reducer)

//console.log(appStateStore.getState())

//const getStoreState = () => appStateStore.getState();


// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(appStateStore)

//console.log(appStateStore.getState())



ReactDOM.render(
		<Provider store={appStateStore}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<Route path="/contact" component={Contact}/>
					<Route path="stores" component={Stores}>
						<Route path="list" component={StoresList} />
						<Route path="update" component={StoresUpdate} />
					</Route>
					<Route path="/foo" component={Foo}/>
					<Route path="/bar" component={Bar}/>
				</Route>
			</Router>
		</Provider>,
		document.getElementById('app')
);