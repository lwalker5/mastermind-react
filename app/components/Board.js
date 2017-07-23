var React = require('react');
var PropTypes = require('prop-types');
var Row = require('./Row');
var PegSelector = require('./PegSelector');
var Peg = require('./Peg'),
	Code = require('./Code'),
	GameOverModal = require('./GameOverModal');

require('../styles/board.scss')


function ProgressIndicator(props) {
	var distFromBottom = (props.position) * 48;
	return (
		<span className="progress-indicator" style={{top:distFromBottom}}>
			<img style={{height: '36px'}} src={require('../assets/arrow.svg')}/>
		</span>
	)
}

/*SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};*/


class Board extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			activeRow: 11,
			activeIndex: 0,
			numRows: 12,
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
		console.log(this);
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
				resultPegs: [0,0,0,0]
			}); 
		}
		this.setState(function() {
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
			this.setState(function(prevState,props) {
				return {
					board: board,
					activeIndex: (prevState.activeIndex + 1)
				}
			}); 			
		}
	}
	undoSelection(){
		console.log(this);
		var board = this.state.board;
		if (this.state.activeIndex >= 1) {
			board.rows[this.state.activeRow].pegs[this.state.activeIndex-1] = 0;

			this.setState(function(prevState,props) {
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
			activeRow: 11,
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
		var resultPegTypes = {
			EMPTY : 0,
			BLACK : 9,
			WHITE: 8
		}

		//code and guess are array copies, need to use slice to prevent updating the state values by reference
		var code = this.state.code.slice(),
			guess = this.state.board.rows[this.state.activeRow].pegs.slice(),
			currBoard = Object.assign({},this.state.board),
			resultPegs = [],
			blackPegCount = 0,
			whitePegCount = 0;

		//check for correct color and spot
		for (var i = 0; i < code.length; i++) {
			if (guess[i] === code[i]) {
				blackPegCount += 1;
				resultPegs.push(resultPegTypes.BLACK);
				guess.splice(i,1);
				code.splice(i,1);
				i--;
			}
		}

		//check for correct color only
		for (var j = 0; j < guess.length; j++) {
			var matchIndex = code.indexOf(guess[j]);
			if (guess[j] != null && matchIndex !== -1) {
				resultPegs.push(resultPegTypes.WHITE);
				whitePegCount += 1;
				code.splice(matchIndex,1);
				guess.splice(j,1);
				j--;
			}
		}

		//fill the rest of the results with empties
		while (guess.length > 0) {
			resultPegs.push(resultPegTypes.EMPTY);
			guess.splice(0,1);
		}

		console.log(resultPegs);
		currBoard.rows[this.state.activeRow].resultPegs = resultPegs;

		if (blackPegCount == this.state.rowLength) {
			this.setState({
				winner: true,
				gameOver: true,
				board: currBoard
			});
		} else {	
			this.setState(function(prevState,props) {
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
					<ul className="rows">
						{this.state.board.rows.map(function(row,index){
							return (
								<li key={index}>
									<Row pegs={row.pegs} checkHandler={this.checkRow} activeIndex={this.state.activeIndex} isActive={this.state.activeRow == index} isFull={this.state.activeIndex >= this.state.rowLength} resultPegs={row.resultPegs} rowNum={index} rowLength={this.state.rowLength}/>

								</li>
							)
						},this)}
					</ul>
				</div>
				<PegSelector
					onSelect = {this.fillNextSlot}
					removePeg = {this.undoSelection}
				/>
				<Code code={this.state.code}/>
				{this.state.gameOver && <GameOverModal isWinner={this.state.winner} code={this.state.code} resetFunction={this.resetGame}/>}
			</div>
		)
	}
}

module.exports = Board;