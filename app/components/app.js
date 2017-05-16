var React = require('react');
var Board = require('./Board');

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Board />
			</div>
		)
	}
}

module.exports = App;
