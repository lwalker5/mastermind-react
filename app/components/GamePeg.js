import React from 'react';

const GamePeg = (props) => {
	var colorMap = {
		0: 'empty',
		1: 'red', 
		2: 'orange',
		3: 'yellow',
		4: 'green',
		5: 'teal', 
		6: 'purple',
		7: 'pink', 
		8: 'white',
	};	 
	return (
		<li 
			className={(props.actionItem == true ? "action-element " : "") + "game-peg" + " game-peg--"+colorMap[props.fill]}
			onClick={props.clickHandler}
		>{colorMap[props.fill]}</li>
	)
}

export default GamePeg;