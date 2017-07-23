var React = require('react'),
	Peg = require('./Peg');

const Code = (props) => {
	//hide this later - show for debugging
	return (
		<section className="code-reveal">
			<ul className="code-wrapper">
				{props.code.map(function(peg,index){
					return (
						<Peg key={index}
							fill={peg} 
							pegType="user"
						/>
					)
				})}
			</ul>
		</section>
	)
}

module.exports = Code;