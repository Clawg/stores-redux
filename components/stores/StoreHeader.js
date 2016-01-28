import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

const StoreHeader = () => {
 return (
	 <header>
	 Links:
	 {' '}
	 <Link to="/stores/list">List</Link>
	 {' '}
	 <Link to="/stores/update">update</Link>
    </header>
 )
}

export default StoreHeader;