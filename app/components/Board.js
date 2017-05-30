var React = require('react');
var PropTypes = require('prop-types');


function Peg(props) {
	//peg type is 'user' for larger playable pegs and 'result' for small result markers 
	var colorMap = {
		0: 'empty',
		1: 'red', 
		2: 'orange',
		3: 'yellow',
		4: 'green',
		5: 'teal', 
		6: 'purple',
		7: 'pink',
		8: 'white',
		9: 'black'
	};	 
	return (
		<li 
			className={(props.pegType == 'user' ? "game-peg" : "result-peg") + " peg-"+colorMap[props.fill]}
			onClick={props.clickHandler}
		>{colorMap[props.fill]}</li>
	)
}

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

function ConfirmationButton(props) {
	return (
		<span className="confirm-btn" onClick={props.onClick}>OK!</span>
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

class Row extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isActive: false,
			activeIndex: 0,
		}
	}
	componentDidMount() {
		//this.initRow(this.props.rowLength,this.props.pegs);
	}
	componentWillUpdate() {
		//this.initRow(this.props.rowLength,this.props.pegs);		
	}
	/*initRow(rowLength) {
		console.log(this.props.pegs);
		var pegArray = [];
		for (var p = 0; p < rowLength; p++) {
			pegArray.push(0);
		}

		this.setState(function(){
			return {
				pegs: pegArray
			}
		})
	}*/
	render() {
		//console.log(this.props.pegs);
		return (
			<div className="row-wrapper">
				<ul>
					<span>Row {this.props.rowNum}</span>
					{this.props.pegs.map(function(pegFill,index){
						return (
							<Peg key={index} pegType="user" fill={pegFill}/>
						) 
					},this)}
				</ul>
				<ul>
					{this.props.resultPegs.map(function(pegFill, index){
						return (
							<Peg key={index} pegType="result" fill={pegFill}/>
						)
					},this)}
					<br/>
				</ul>
			</div>
		)
	}
}


class Board extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			activeRow: 0,
			activeIndex: 0,
			numRows: 10,
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
				activeRow: (prevState.activeRow + 1),
				activeIndex: 0,
				board: currBoard
			}
		});			
	}
	render() {
		return (
			<div className="board-wrapper">
				<ul className="board">
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
				<PegSelector
					onSelect = {this.fillNextSlot}
				/>
				<SecretCode code={this.state.code}/>
			</div>
		)
	}
}

module.exports = Board;