var React = require('react');
var Peg = require('./Peg');

function PegSelector(props) {
	var pegOptions = [1,2,3,4,5,6,7,8]; 

	return (
		<ul className="peg-selector">
			{pegOptions.map(function(peg){
				return (
					<Peg 
						key={peg}
						fill={peg}
						pegType="user"
						actionItem={true}
						clickHandler={props.onSelect.bind(null,peg)}
					/>

				)
			})}
			<li onClick={props.removePeg.bind(null)} className="action-element">Undo</li>
		</ul>
	)	
}

module.exports = PegSelector;