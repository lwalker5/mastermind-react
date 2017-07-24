import React from 'react';
import GamePeg from './GamePeg';

const PegSelector = (props) => {
	var pegOptions = [1,2,3,4,5,6,7,8]; 

	return (
		<ul className="peg-selector">
			{pegOptions.map((peg) => {
				return (
					<GamePeg 
						key={peg}
						fill={peg}
						actionItem={true}
						clickHandler={props.onSelect.bind(null,peg)}
					/>

				)
			})}
			<li onClick={props.removePeg.bind(null)} className="action-element">Undo</li>
		</ul>
	)	
}

export default PegSelector;