var React = require('react');
var Peg = require('./Peg');

function ConfirmationButton(props) {
	return (
		<span className="confirm-btn action-element" onClick={props.onClick}>OK!</span>
	)
}

class Row extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isActive: false,
			activeIndex: 0,
		}
		console.log(props);
	}
	componentDidMount() {
		//this.initRow(this.props.rowLength,this.props.pegs);
	}
	componentWillUpdate() {
		//this.initRow(this.props.rowLength,this.props.pegs);		
	}
	render() {
		//console.log(this.props.pegs);
		return (
			<div className="row-wrapper">
				<ul className="game-pegs">
					{this.props.pegs.map(function(pegFill,index){
						return (
							<Peg key={index} pegType="user" fill={pegFill}/>
						) 
					},this)}
				</ul>
				{this.props.isActive && this.props.isFull == true &&
				<ConfirmationButton rowNum={this.props.rowNum} onClick={this.props.checkHandler} />
				}
				<ul className="result-pegs">
					{this.props.resultPegs.map(function(pegFill, index){
						return (
							<Peg key={this.props.index} pegType="result" fill={pegFill}/>
						)
					},this)}
				</ul>
			</div>
		)
	}
}

module.exports = Row;