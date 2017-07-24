import React from 'react';
import Code from './Code';
import Button from './Button';

const GameOverModal = (props) => {
	return (
		<div>
			<div className="haze">
			</div>
			<div className="game-modal">
				<h3>You Cracked the Code!</h3>
				<Code code={props.code}/>
				<div className="buttons-wrapper">
					<Button clickHandler={props.resetFunction} btnText='New Game'/>
				</div>
			</div>
		</div>
	)
}

export default GameOverModal;
