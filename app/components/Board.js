var React = require('react');
var PropTypes = require('prop-types');


function Peg(props) {
	var colorMap = {
		0: 'empty',
		1: 'red',
		2: 'orange',
		3: 'yellow',
		4: 'green',
		5: 'teal',
		6: 'purple',
		7: 'pink',
		8: 'white'
	};	 
	return (
		<li 
			className={"game-peg peg-"+colorMap[props.fill]}
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
	console.log(props.code);
	return (
		<section className="code-reveal">
			<h2>Code</h2>
			<ul className="code-wrapper">
				{props.code.map(function(peg,index){
					return (
						<Peg key={index}
							fill={peg} />
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
		console.log(this.props.pegs);
		return (
			<ul>
				<span>Row {this.props.rowNum}</span>
				{this.props.pegs.map(function(pegFill){
					return (
						<Peg fill={pegFill}/>
					)
				},this)}
				<br/>
			</ul>
		)
	}
}


class Board extends React.Component {
	constructor(props) {
		super();
		this.state = { 
			activeRow: 0,
			activeIndex: 0,
			numRows: 3,
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
		this.setCode(this.state.numRows);
	}
	fillNextSlot(chosenPeg) {
		var board = this.state.board;
		board.rows[this.state.activeRow].pegs[this.state.activeIndex] = chosenPeg;
		if (this.state.activeIndex >= this.state.rowLength) {
			//disable color selector for now
			console.log('you can\'t do that');
		} else {
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
		for (var j = 0; j <= codeLength; j++) {
			var randNum = Math.floor((Math.random()*7)+1);
			code.push(randNum);
		} 
		console.log(code);
		this.setState({
			code: code
		});
	}
	checkRow() {
		this.setState(function(prevState,props) {
			return {
				activeRow: (prevState.activeRow + 1),
				activeIndex: 0
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
								<Row pegs={row.pegs} rowNum={index} rowLength={this.state.rowLength}/>
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