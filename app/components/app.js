import React from 'react';
import { Board } from './Board';
import Header from './Header';

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<Board />
			</div>
		)
	}
}
