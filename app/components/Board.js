var React = require('react');
var PropTypes = require('prop-types');
var Row = require('./Row');
var PegSelector = require('./PegSelector');
var Peg = require('./Peg');

function ConfirmationButton(props) {
	return (
		<span className="confirm-btn" onClick={props.onClick}>OK!</span>
	)
}

function ProgressIndicator(props) {
	var distFromBottom = (props.position) * 48;
	return (
		<span className="progress-indicator" style={{top:distFromBottom}}>Ahoy></span>
	)
}


function SecretCode(props) {
	//hide this later - show for debugging
	return (
		<section className="code-reveal">
			<h2>Code</h2>
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


/*SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};*/


class Board extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			activeRow: 4,
			activeIndex: 0,
			numRows: 5,
			rowLength: 4,
			code: [],
			board: {rows: []}
		};

		this.fillNextSlot = this.fillNextSlot.bind(this);
		this.checkRow = this.checkRow.bind(this);
	}
	componentDidMount() {
		//this.fillNextSlot(this.state.selectedLanguage);
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

		for (var i = 0; i < code.length; i++) {
			if (guess[i] === code[i]) {
				blackPegCount += 1;
				resultPegs.push(resultPegTypes.BLACK);
				guess.splice(i,1);
				code.splice(i,1);
				i--;
			}

		}

		for (var j = 0; j < guess.length; j++) {
			var matchIndex = code.indexOf(guess[j]);
			if (guess[j] != null && matchIndex !== -1) {
				resultPegs.push(resultPegTypes.WHITE);
				whitePegCount += 1;
				code.splice(matchIndex,1);
				guess.splice(j,1);

				j--;
			}
			else {
				resultPegs.push(resultPegTypes.EMPTY);
			}
		}

		console.log(resultPegs);
		currBoard.rows[this.state.activeRow].resultPegs = resultPegs;

		console.log(blackPegCount);
		console.log(whitePegCount);
		this.setState(function(prevState,props) {
			return {
				activeRow: (prevState.activeRow - 1),
				activeIndex: 0,
				board: currBoard
			}
		});			
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
									<Row pegs={row.pegs} resultPegs={row.resultPegs} rowNum={index} rowLength={this.state.rowLength}/>
									{this.state.activeIndex >= this.state.rowLength && this.state.activeRow == index &&
										<ConfirmationButton rowNum={index} onClick={this.checkRow} />
									}
								</li>
							)
						},this)}
					</ul>
				</div>
				<PegSelector
					onSelect = {this.fillNextSlot}
				/>
				<SecretCode code={this.state.code}/>
			</div>
		)
	}
}

module.exports = Board;