import React from 'react';

const ResultMarker = (props) => {
	var colorMap = {
		0: 'empty',
		8: 'white',
		9: 'black'
	};	 
	return (
		<li 
			className={(props.actionItem == true ? "action-element " : " ") + "result__marker" + " result__marker--"+colorMap[props.fill]}
			onClick={props.clickHandler}
		>{colorMap[props.fill]}</li>
	)
}

export default ResultMarker;