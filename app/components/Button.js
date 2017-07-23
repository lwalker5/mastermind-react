var React = require('react');

const Button = (props) => {
	return (
		<button className="button" onClick={props.clickHandler}>{props.btnText}</button>
	)
}

module.exports = Button;