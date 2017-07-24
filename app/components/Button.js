import React from 'react';

const Button = (props) => {
	return (
		<button className="button" onClick={props.clickHandler}>{props.btnText}</button>
	)
}

export default Button;