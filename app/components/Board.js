import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import PegSelector from './PegSelector';
import GameOverModal from './GameOverModal';
import Code from './Code';
import Peg from './Peg';
import '../styles/board.scss';

const ProgressIndicator = (props) => {
	var distFromBottom = (props.position) * 48;
	return (
		<span className="board__progress-indicator" style={{top:distFromBottom}}>
			<img style={{height: '36px'}} src={require('../assets/arrow.svg')}/>
		</span>
	)
}

class Board extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			activeRow: props.rowCount - 1,
			activeIndex: 0,
			numRows: props.rowCount,
			rowLength: 4,
			code: [],
			board: {rows: []},
			gameOver: false,
			winner: false,
		};

		this.fillNextSlot = this.fillNextSlot.bind(this);
		this.undoSelection = this.undoSelection.bind(this);
		this.checkRow = this.checkRow.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}
	componentDidMount() {
		//this.fillNextSlot(this.state.selectedLanguage);
		this.createBoard();

	}
	createBoard() {
		var board = {
			rows: []
		}
		for (var i = 0; i < this.state.numRows; i++) {
			board.rows.push({
				pegs: [0,0,0,0],
				resultMarkers: [0,0,0,0]
			}); 
		}
		this.setState(() => {
			return {
				board: board
			}
		})
		this.setCode(this.state.rowLength);
	}
	fillNextSlot(chosenPeg) {
		var board = this.state.board;
		if (this.state.activeIndex >= this.state.rowLength) {
			//disable color selector for now
			console.log('you can\'t do that');
		} else {
			board.rows[this.state.activeRow].pegs[this.state.activeIndex] = chosenPeg;
			this.setState((prevState,props) => {
				return {
					board: board,
					activeIndex: (prevState.activeIndex + 1)
				}
			}); 			
		}
	}
	undoSelection(){
		var board = this.state.board;
		if (this.state.activeIndex >= 1) {
			board.rows[this.state.activeRow].pegs[this.state.activeIndex-1] = 0;

			this.setState((prevState,props) => {
				return {
					board: board,
					activeIndex: (prevState.activeIndex - 1)
				}
			})
		}

	}
	resetGame() {
		this.createBoard();
		this.setState({
			winner: false,
			gameOver: false,
			activeRow: this.props.rowCount - 1,
			activeIndex: 0,
		});
	}
	setCode(codeLength) {
		var code = []
		for (var j = 0; j < codeLength; j++) {
			var randNum = Math.floor((Math.random()*7)+1);
			code.push(randNum);
		} 
		this.setState({
			code: code
		});
		console.log(code);
	}
	checkRow() {
		var resultMarkerTypes = {
			EMPTY : 0,
			BLACK : 9,
			WHITE: 8
		}

		//code and guess are array copies, need to use slice to prevent updating the state values by reference
		var code = this.state.code.slice(),
			guess = this.state.board.rows[this.state.activeRow].pegs.slice(),
			currBoard = Object.assign({},this.state.board),
			resultMarkers = [],
			blackPegCount = 0,
			whitePegCount = 0;

		//check for correct color and spot
		for (var i = 0; i < code.length; i++) {
			if (guess[i] === code[i]) {
				blackPegCount += 1;
				resultMarkers.push(resultMarkerTypes.BLACK);
				guess.splice(i,1);
				code.splice(i,1);
				i--;
			}
		}

		//check for correct color only
		for (var j = 0; j < guess.length; j++) {
			var matchIndex = code.indexOf(guess[j]);
			if (guess[j] != null && matchIndex !== -1) {
				resultMarkers.push(resultMarkerTypes.WHITE);
				whitePegCount += 1;
				code.splice(matchIndex,1);
				guess.splice(j,1);
				j--;
			}
		}

		//fill the rest of the results with empties
		while (guess.length > 0) {
			resultMarkers.push(resultMarkerTypes.EMPTY);
			guess.splice(0,1);
		}

		currBoard.rows[this.state.activeRow].resultMarkers = resultMarkers;

		if (blackPegCount == this.state.rowLength) {
			this.setState({
				winner: true,
				gameOver: true,
				board: currBoard
			});
		} else if (this.state.activeRow === 0) {
			this.setState({
				winner: false,
				gameOver: true,
				board: currBoard,
				activeIndex: 0
			})
		} else {	
			this.setState((prevState,props) => {
				return {
					activeRow: (prevState.activeRow - 1),
					activeIndex: 0,
					board: currBoard
				}
			});			
		}
	}
	render() {
		return (
			<div className="board-wrapper">
				<div className="board">
					<ProgressIndicator position={this.state.activeRow} />
					<ul className="board__rows">
						{this.state.board.rows.map((row,index) => {
							return (
								<Row key={index} pegs={row.pegs} checkHandler={this.checkRow} activeIndex={this.state.activeIndex} isActive={this.state.activeRow == index} isFull={this.state.activeIndex >= this.state.rowLength} resultMarkers={row.resultMarkers} rowNum={index} rowLength={this.state.rowLength}/>
							)
						},this)}
					</ul>
				</div>
				<PegSelector
					onSelect = {this.fillNextSlot}
					removePeg = {this.undoSelection}
				/>
				{this.state.gameOver && <GameOverModal isWinner={this.state.winner} code={this.state.code} resetFunction={this.resetGame}/>}
			</div>
		)
	}
}

export { Board };