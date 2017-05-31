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
						clickHandler={props.onSelect.bind(null,peg)}
					/>
				)
			})}
		</ul>
	)	
}

module.exports = PegSelector;