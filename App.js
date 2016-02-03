import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import ContactForm from './components/ContactForm/ContactForm'


function App({ push, children }) {

	return (
		<div>
			<header>
				Links:
				{' '}
				<Link to="/">Home</Link>
				{' '}
				<Link to="/contact">Contact form</Link>
				{' '}
				<Link to="/foo">Foo</Link>
				{' '}
				<Link to="/bar">Bar</Link>
				{' '}
				<Link to="/stores/list">Stores</Link>
			</header>
			<div>
				<button onClick={() => push('/foo')}>Go to /foo</button>

			</div>
			<div style={{ marginTop: '1.5em' }}>{children}</div>

		</div>
	)
}

//export default connect()(App)
export default connect(
	null,
	routeActions
)(App)