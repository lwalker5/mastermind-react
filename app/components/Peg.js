var React = require('react');

function Peg(props) {
	//peg type is 'user' for larger playable pegs and 'result' for small result markers 
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
		9: 'black'
	};	 
	return (
		<li 
			className={(props.pegType == 'user' ? "game-peg" : "result-peg") + " peg-"+colorMap[props.fill]}
			onClick={props.clickHandler}
		>{colorMap[props.fill]}</li>
	)
}

module.exports = Peg;