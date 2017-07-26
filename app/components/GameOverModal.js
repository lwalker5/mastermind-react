import React from 'react';
import Code from './Code';
import Button from './Button';

const GameOverModal = (props) => {
	let message = (props.isWinner) ? 'You Cracked the Code!' : 'You Failed to Crack the Code';
	return (
		<div>
			<div className="haze">
			</div>
			<div className="game-modal">
				<h3>{message}</h3>
				<Code code={props.code}/>
				<div className="buttons-wrapper">
					<Button clickHandler={props.resetFunction} btnText='New Game'/>
				</div>
			</div>
		</div>
	)
}

export default GameOverModal;
