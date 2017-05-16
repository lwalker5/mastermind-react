var React = require('react');
var ReactDOM = require('react-dom');

require('./index.css');

var App = require('./components/app');

ReactDOM.render(
	<App />,
	document.getElementById('app')
);