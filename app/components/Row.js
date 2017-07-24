import React from 'react';
import GamePeg from './GamePeg';
import ResultMarker from './ResultMarker';

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
	}
	componentDidMount() {
		//this.initRow(this.props.rowLength,this.props.pegs);
	}
	componentWillUpdate() {
		//this.initRow(this.props.rowLength,this.props.pegs);		
	}
	render() {
		return (
			<li className="row">
				<ul className="row__section game-pegs">
					{this.props.pegs.map((pegFill,index) => {
						return (
							<GamePeg key={index} fill={pegFill}/>
						) 
					},this)}
				</ul>
				{this.props.isActive && this.props.isFull == true &&
				<ConfirmationButton rowNum={this.props.rowNum} onClick={this.props.checkHandler} />
				}
				<ul className="row__section result">
					{this.props.resultMarkers.map((pegFill, index) => {
						return (
							<ResultMarker key={index} fill={pegFill}/>
						)
					},this)}
				</ul>
			</li>
		)
	}
}

export default Row;