var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');


function Peg(props) {
	var colorMap = {
		0: 'empty',
		1: 'red',
		2: 'orange',
		3: 'yellow',
		4: 'green',
		5: 'teal',
		6: 'indigo',
		7: 'purple',
		8: 'whitee'
	};	 
	return (
		<li 
			className="game-peg peg-{colorMap[peg]}"
			onClick={props.clickHandler}
		>{colorMap[props.fill]}</li>
	)
}

function PegSelector(props) {
	var pegOptions = [0,1,2,3,4,5,6,7,8,'back'];

	return (
		<ul className="pegOptions">
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
			selectedLanguage: 'All',
			activeRow: 0,
			activeIndex: 0,
			numRows: 3,
			rowLength: 4,
			board: {rows: []}
		};

		this.fillNextSlot = this.fillNextSlot.bind(this);
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
	}
	fillNextSlot(chosenPeg) {
		var board = this.state.board;
		board.rows[this.state.activeRow].pegs[this.state.activeIndex] = chosenPeg;
		this.setState(function() {
			return {
				board: board,
				activeIndex: (this.state.activeIndex + 1)
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
							</li>
						)
					},this)}
				</ul>
				<PegSelector
					onSelect = {this.fillNextSlot}
				/>
			</div>
		)
	}
}

module.exports = Board;