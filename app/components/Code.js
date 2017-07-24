import React from 'react';
import GamePeg from './GamePeg';

const Code = (props) => {
	return (
		<section className="game-modal__code-reveal">
			<ul>
				{props.code.map(function(peg,index){
					return (
						<GamePeg key={index}
							fill={peg} 
						/>
					)
				})}
			</ul>
		</section>
	)
}
export default Code;