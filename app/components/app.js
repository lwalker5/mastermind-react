var React = require('react');
var Board = require('./Board');
var Header = require('./Header');

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<Board />
			</div>
		)
	}
}

module.exports = App;
