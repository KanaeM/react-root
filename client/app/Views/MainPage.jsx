import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan100, blue200, blueGrey200} from 'material-ui/styles/colors'

const style = {
	paper: {
	height: '100%', //550,
	width: '100%', //1075,
	margin: 10,
	// textAlign: 'center',
	backgroundColor: "#F7F2F7",

	},
	custom: {
		height: 525,
		width: 750,
	}
};

class MainPage extends Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		// alert('Iwas clicked');
		// console.log('event', e.native);	// does get ahold of event
		const route = '/provider'
		console.log('route', route)
		browserHistory.push(route);
	}

	render() {
		console.log('Main Page', this.props);
		
		return (
				<Paper style={style.paper} zDepth={5} onClick={this.handleClick} >

				</Paper>
		);
	}
}
export default MainPage;