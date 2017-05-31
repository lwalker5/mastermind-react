var React = require('react');
var Peg = require('./Peg');

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

module.exports = Row;